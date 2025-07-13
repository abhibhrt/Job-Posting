import { useState, useEffect } from 'react';
import { useGlobalData } from '../../GlobalDataContext';
import './jobList.css';
import ApplyForm from '../../components/Forms/ApplyForm';
import JobPopup from '../../components/JobPopup/JobPopup';
import { Helmet } from "react-helmet";

const JobList = () => {
  const { jobs, loading, error } = useGlobalData();
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [selectedJobForDetails, setSelectedJobForDetails] = useState(null);


  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!Array.isArray(jobs)) {
        setFilteredJobs([]);
        return;
      }

      const query = searchQuery.toLowerCase();
      if (query.trim() === '') {
        setFilteredJobs(jobs);
        return;
      }

      const filtered = jobs.filter((job) =>
        job.companyName?.toLowerCase().includes(query) ||
        job.salary?.toLowerCase().includes(query) ||
        job.location?.toLowerCase().includes(query) ||
        job.description?.toLowerCase().includes(query) ||
        job.jobType?.toLowerCase().includes(query) ||
        job.workingHours?.toLowerCase().includes(query)
      );

      setFilteredJobs(filtered);
    }, 300); // debounce 300ms

    return () => clearTimeout(timeout);
  }, [searchQuery, jobs]);

  // 🧠 On mount or job update (initial display)
  useEffect(() => {
    if (Array.isArray(jobs)) setFilteredJobs(jobs);
  }, [jobs]);

  const handleApplyClick = (jobId) => {
    setSelectedJobId(jobId);
    setShowApplyModal(true);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <section id="joblist-section" className='page-section'>
      <Helmet>
        <title>Find Jobs | HR Zone</title>
        <meta
          name="description"
          content="Browse thousands of job openings in various industries across India. Get hired with HR Zone!"
        />
        <meta
          name="keywords"
          content="jobs, job portal, job openings, apply jobs, HR Zone"
        />
      </Helmet>
      <h2 className="global-heading">Latest Job Openings</h2>
      <div className="job-search-bar">
        <input
          type="text"
          placeholder="Search by title, location, salary..."
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      <div className="jobcards-container">
        {loading ? (
          <p className="status-message">Loading jobs...</p>
        ) : error ? (
          <p className="status-message error">Failed to load jobs. Please try again later.</p>
        ) : filteredJobs.length === 0 ? (
          <p className="no-jobs">No matching jobs found.</p>
        ) : (
          filteredJobs.map((job) => (
            <div className="jobcard" key={job._id}>
              <div className="jobcard-header">
                <img src={job.logo || 'https://via.placeholder.com/50'} alt="Company Logo" />
                <div>
                  <h3>{job.companyName}</h3>
                  <span>{job.jobType}</span>
                </div>
              </div>

              <div className="jobcard-body">
                <p><strong>Location:</strong> {job.location}</p>
                <p><strong>Salary:</strong> {job.salary}</p>
                <p><strong>Hours:</strong> {job.workingHours}</p>
              </div>

              <div className="jobcard-actions">
                <button className="btn apply-btn" onClick={() => handleApplyClick(job._id)}>Apply</button>
                <button className="btn details-btn" onClick={() => setSelectedJobForDetails(job)}>
                  Details
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {showApplyModal && (
        <ApplyForm
          jobId={selectedJobId}
          onClose={() => setShowApplyModal(false)}
        />
      )}

      {selectedJobForDetails && (
        <JobPopup
          job={selectedJobForDetails}
          onClose={() => setSelectedJobForDetails(null)}
        />
      )}
    </section>
  );
};

export default JobList;
