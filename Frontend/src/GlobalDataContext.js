import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback
} from 'react';
import { useAlert } from './components/Alert/Alert';

const GlobalDataContext = createContext();

const fetchWithTimeout = async (resource, options = {}, timeout = 15000, retries = 2) => {
  let attempt = 0;

  while (attempt <= retries) {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(resource, {
        ...options,
        signal: controller.signal
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return await response.json();
    } catch (err) {
      if (attempt === retries) throw err;

      const delay = Math.pow(2, attempt) * 500; // exponential backoff
      await new Promise((resolve) => setTimeout(resolve, delay));
      attempt++;
    } finally {
      clearTimeout(id);
    }
  }
};

export const GlobalDataProvider = ({ children }) => {
  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
  const { showAlert, AlertComponent } = useAlert();

  const [jobs, setJobs] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const MIN_LOADING_TIME = 2000;

  const fetchInitialData = useCallback(async () => {
    const startTime = Date.now();
    setLoading(true);
    setError(null);

    try {
      const [jobsRes, candidatesRes, reviewsRes, updatesRes] = await Promise.all([
        fetchWithTimeout(`${apiUrl}/jobs`),
        fetchWithTimeout(`${apiUrl}/candidates/applications`),
        fetchWithTimeout(`${apiUrl}/reviews`),
        fetchWithTimeout(`${apiUrl}/updates`)
      ]);

      setJobs(jobsRes);
      setCandidates(candidatesRes);
      setReviews(reviewsRes);
      setUpdates(updatesRes);
    } catch (err) {
      if (err.name === 'AbortError') {
        showAlert('Request timed out. Please try again.', 'error');
      } else {
        showAlert('Failed to fetch data from server.', 'error');
      }
      setError('Something went wrong while loading global data.');
    } finally {
      const elapsed = Date.now() - startTime;
      const delay = Math.max(0, MIN_LOADING_TIME - elapsed);
      setTimeout(() => setLoading(false), delay);
    }
  }, [apiUrl, showAlert]);

  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  return (
    <GlobalDataContext.Provider
      value={{
        jobs,
        candidates,
        reviews,
        updates,
        loading,
        error,
        refetch: fetchInitialData
      }}
    >
      {loading && (
        <div className="loading-container">
          <span className="loader" />
        </div>
      )}
      <AlertComponent />
      {children}
    </GlobalDataContext.Provider>
  );
};

export const useGlobalData = () => useContext(GlobalDataContext);