import React, { useState, useEffect } from 'react';
import { useGlobalData } from '../../GlobalDataContext';
import './jobcards.css';
import ApplyForm from '../Forms/ApplyForm';
import JobPopup from '../JobPopup/JobPopup';

const JobList = () => {
  const { jobs } = useGlobalData();
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [selectedJobForDetails, setSelectedJobForDetails] = useState(null); // 👈 this replaces showDetails

  useEffect(() => {
    setFilteredJobs(jobs);
  }, [jobs]);

  const handleApplyClick = (jobId) => {
    setSelectedJobId(jobId);
    setShowApplyModal(true);
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = jobs.filter((job) =>
      job.companyName?.toLowerCase().includes(query) ||
      job.salary?.toLowerCase().includes(query) ||
      job.location?.toLowerCase().includes(query) ||
      job.description?.toLowerCase().includes(query) ||
      job.jobType?.toLowerCase().includes(query) ||
      job.workingHours?.toLowerCase().includes(query)
    );

    setFilteredJobs(filtered);
  };

  return (
    <section className="jobcards-wrapper">
      <h2 className="jobcards-title">Latest Job Openings</h2>

      <div className="job-search-bar">
        <input
          type="text"
          placeholder="Search by title, location, salary..."
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      <div className="jobcards-container">
        {filteredJobs.length === 0 ? (
          <p className="no-jobs">No matching jobs found.</p>
        ) : (
          filteredJobs.map((job) => (
            <div className="jobcard" key={job._id}>
              <div className="jobcard-header">
                <img src={job.logo || "https://via.placeholder.com/50"} alt="Company Logo" />
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
