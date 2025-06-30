import { BrowserRouter as Router, Routes, Route, useLocation  } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import './App.css';
import { FaWhatsapp } from 'react-icons/fa';
import { useEffect } from 'react';

// Context
import { GlobalDataProvider } from './GlobalDataContext';

// Lazy loaded components
const Navbar = lazy(() => import('./components/Navbar/Navbar'));
const Footer = lazy(() => import('./components/Footer/Footer'));
const Home = lazy(() => import('./components/Home/Home'));
const FeaturedJobs = lazy(() => import('./components/Featured/FeaturedJobs'));
const JobList = lazy(() => import('./components/Jobs/JobList'));
const Admin = lazy(() => import('./components/Admin/Admin'));
const Updates = lazy(() => import('./components/Updates/Updates'));

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <GlobalDataProvider>
      <Router>
        <div className="App">
          <Suspense fallback={<div className="loading">Loading...</div>}>
            <Navbar />
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/featured" element={<FeaturedJobs />} />
              <Route path="/jobs" element={<JobList />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/updates" element={<Updates />} />
            </Routes>
            <Footer />
          </Suspense>
          <div className="whatsapp-icon">
            <a href="https://whatsapp.com/channel/0029Vb5wEZPFCCodX8MMlz0U" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
              <FaWhatsapp size={42} color="#25D366" />
            </a>
          </div>
        </div>
      </Router>
    </GlobalDataProvider>
  );
}

export default App;
