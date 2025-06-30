import React from 'react';
import './jobpopup.css';

const JobPopup = ({ job, onClose }) => {
  return (
    <div className="job-popup-overlay">
      <div className="job-popup-container">
        <button className="close-btn" onClick={onClose}>×</button>
        
        <div className="job-popup-header">
          <div className="company-logo-container">
            <img src={job.logo} alt={`${job.companyName} logo`} className="company-logo" />
          </div>
          <div className="job-title-container">
            <h2 className="job-role">{job.jobRole}</h2>
            <h3 className="company-name">{job.companyName}</h3>
          </div>
        </div>
        
        <div className="job-details-grid">
          <div className="detail-item">
            <span className="detail-label">Location:</span>
            <span className="detail-value">{job.location}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Job Type:</span>
            <span className="detail-value">{job.jobType}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Salary:</span>
            <span className="detail-value">₹{job.salary}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Working Hours:</span>
            <span className="detail-value">{job.workingHours}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Openings:</span>
            <span className="detail-value">{job.openings}</span>
          </div>
        </div>
        
        <div className="job-description">
          <h4 className="description-title">Job Description</h4>
          <p className="description-content">{job.description}</p>
        </div>
    
      </div>
    </div>
  );
};

export default JobPopup;