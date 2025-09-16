import React, { useState, useMemo, useEffect } from 'react';
import { useGlobalData } from '../../GlobalDataContext';
import './featuredjobs.css';
import ApplyForm from '../../components/Forms/ApplyForm';
import JobPopup from '../../components/JobPopup/JobPopup';
import { NavLink } from 'react-router-dom';
import { FaMapMarkerAlt, FaMoneyBillWave, FaBriefcase } from 'react-icons/fa';

const FeaturedJobs = () => {
  const { jobs } = useGlobalData();
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [selectedJobForDetails, setSelectedJobForDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (Array.isArray(jobs)) {
        setLoading(false);
        setHasError(false);
      } else {
        setHasError(true);
        setLoading(false);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [jobs]);

  const sortedJobs = useMemo(() => {
    if (!Array.isArray(jobs)) return [];
    return [...jobs]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 3);
  }, [jobs]);

  const handleApplyClick = (jobId) => {
    setSelectedJobId(jobId);
    setShowApplyModal(true);
  };

  return (
    <section id="featured-section" className='page-section'>
      <h2 className="global-heading">Latest Openings</h2>
      <div className="featured-header">
        <NavLink className="featured-see-all" to="/jobs">
          See All &#10095;
        </NavLink>
      </div>

      {loading ? (
        <p className="status-message">Loading latest jobs...</p>
      ) : hasError ? (
        <p className="status-message error">Failed to load jobs. Please try again later.</p>
      ) : sortedJobs.length === 0 ? (
        <p className="status-message">No matching jobs found.</p>
      ) : (
        <div className="featured-cards">
          {sortedJobs.map((job) => (
            <div className="featured-card" key={job._id}>
              <div className="card-header">
                <img
                  src={job.logo || "https://via.placeholder.com/50"}
                  alt="Company Logo"
                  className="company-logo"
                />
                <div className="job-info">
                  <h3 className="company-name">{job.companyName}</h3>
                  <span className="job-type">
                    {job.jobType} • {job.jobMode}
                  </span>
                </div>
              </div>
              <div className="card-body">
                <p className="job-meta">
                  <FaMapMarkerAlt className="icon" />
                  <span>{job.location}</span>
                </p>
                <p className="job-meta">
                  <FaMoneyBillWave className="icon" />
                  <span>{job.salary}</span>
                </p>
                <p className="job-meta">
                  <FaBriefcase className="icon" />
                  <span>{job.experience || "0+ years"} experience</span>
                </p>
                <p className="description">
                  {job.description.slice(0, 15)}...
                </p>
              </div>
              <div className="card-actions">
                <button className="btn apply" onClick={() => handleApplyClick(job._id)}>
                  Apply
                </button>
                <button
                  className="btn details"
                  onClick={() => setSelectedJobForDetails(job)}
                >
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

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

export default FeaturedJobs;
