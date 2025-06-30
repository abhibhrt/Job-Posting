import React, { useState, useMemo } from 'react';
import { useGlobalData } from '../../GlobalDataContext';
import './featuredjobs.css';
import ApplyForm from '../Forms/ApplyForm';
import JobPopup from '../JobPopup/JobPopup';

const FeaturedJobs = () => {
  const { jobs } = useGlobalData();
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [selectedJobForDetails, setSelectedJobForDetails] = useState(null);

  const sortedJobs = useMemo(() => {
    return [...jobs]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 3);
  }, [jobs]);

  const handleApplyClick = (jobId) => {
    setSelectedJobId(jobId);
    setShowApplyModal(true);
  };

  return (
    <section className="featured-wrapper">
      <div className="featured-header">
        <h2>Latest Openings</h2>
        <button className="featured-see-all" onClick={() => window.location.href = '/jobs'}>
          See All Jobs
        </button>
      </div>

      <div className="featured-cards">
        {sortedJobs.map((job) => (
          <div className="featured-card" key={job._id}>
            <div className="card-header">
              <img src={job.logo || "https://via.placeholder.com/50"} alt="Company Logo" />
              <div>
                <h3>{job.companyName}</h3>
                <span>{job.jobType}</span>
              </div>
            </div>
            <div className="card-body">
              <p><strong>Location:</strong> {job.location}</p>
              <p><strong>Salary:</strong> {job.salary}</p>
              <p className="description">{job.description.slice(0, 80)}...</p>
            </div>
            <div className="card-actions">
              <button className="btn apply" onClick={() => handleApplyClick(job._id)}>Apply</button>
              <button className="btn details" onClick={() => setSelectedJobForDetails(job)}>
                Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {showApplyModal && (
        <ApplyForm
          jobId={selectedJobId}
          onClose={() => setShowApplyModal(false)}
        />
      )}

      {/* Details Popup */}
      {selectedJobForDetails && (
        <JobPopup
          job={selectedJobForDetails}
          onClose={() => setSelectedJobForDetails(null)}
        />
      )}
    </section>
  );
};

export default FeaturedJobs;
