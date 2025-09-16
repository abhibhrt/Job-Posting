import React, { useState } from 'react';
import { useGlobalData } from '../../GlobalDataContext';
import { useAlert } from '../../components/Alert/Alert';
import './activejobs.css';
import JobForm from '../../components/Forms/JobForm';

const ActiveJobs = () => {
  const { jobs, loading, refetch, candidates } = useGlobalData();
  const { showAlert, AlertComponent } = useAlert();
  const [showForm, setShowForm] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showApplications, setShowApplications] = useState(false);
  const [jobApplications, setJobApplications] = useState([]);
  const [selectedJobForApps, setSelectedJobForApps] = useState(null);

  const handleEdit = (job) => {
    setSelectedJob(job);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this job?');
    if (!confirm) return;

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/jobs/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        refetch();
        showAlert('Job deleted successfully!', 'success');
      }
    } catch (err) {
      showAlert('Failed to delete job', 'error');
    }
  };

  const handleShowApplications = (job) => {
    setSelectedJobForApps(job);
    const apps = candidates.filter(app => {
      if (!app.jobId) return false;
      if (typeof app.jobId === 'object') {
        return app.jobId._id === job._id;
      }
      return app.jobId === job._id;
    });
    setJobApplications(apps);
    setShowApplications(true);
  };

  const filteredJobs = jobs.filter(job => 
    job.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.jobRole?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="activejobs-wrapper">
      <AlertComponent />
      <div className='activejobs-header'>
        <div>
          <h2 className="secondglobal-heading">Active Job Listings</h2>
        </div>
        <div className="activejobs-controls">
          <div className="activejobs-search">
            <input
              type="text"
              placeholder="Search jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="search-icon">🔍</span>
          </div>
          <button className='activejobs-add-btn' onClick={() => setShowForm(true)}>
            + Add New Job
          </button>
        </div>
      </div>

      {loading ? (
        <div className="activejobs-loading">
          <div className="loading-spinner"></div>
          <p>Loading jobs...</p>
        </div>
      ) : filteredJobs.length === 0 ? (
        <div className="activejobs-empty">
          <p>No jobs found</p>
          {searchTerm && (
            <button 
              className="clear-search"
              onClick={() => setSearchTerm('')}
            >
              Clear search
            </button>
          )}
        </div>
      ) : (
        <div className="activejobs-list">
          {filteredJobs.map((job, index) => (
            <div 
              className="activejobs-item" 
              key={job._id}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="job-logo">
                <img 
                  src={job.logo || 'https://via.placeholder.com/50'} 
                  alt="Company Logo" 
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/50';
                  }}
                />
              </div>
              <div className="job-content">
                <div className="job-header">
                  <div>
                    <h3 className="job-title">{job.jobRole}</h3>
                    <p className="job-company">{job.companyName}</p>
                  </div>
                  <span className={`job-type ${job.jobType?.toLowerCase()}`}>
                    {job.jobType}
                  </span>
                </div>
                <div className="job-details">
                  <div className="job-detail">
                    <span className="detail-icon"></span>
                    <span>{job.location}</span>
                  </div>
                  <div className="job-detail">
                    <span className="detail-icon"></span>
                    <span>{job.openings || 'N/A'} openings</span>
                  </div>
                </div>
              </div>
              <div className="job-actions">
                <button 
                  className="job-btn job-btn--edit"
                  onClick={() => handleEdit(job)}
                >
                  Edit
                </button>
                <button 
                  className="job-btn job-btn--delete"
                  onClick={() => handleDelete(job._id)}
                >
                  Delete
                </button>
                <button 
                  className="job-btn job-btn--apps"
                  onClick={() => handleShowApplications(job)}
                >
                  Applications
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <JobForm
          existingJob={selectedJob}
          onClose={() => {
            setShowForm(false);
            setSelectedJob(null);
          }}
          onSuccess={refetch}
        />
      )}

      {showApplications && (
        <div className="candidates-modal-overlay" onClick={() => setShowApplications(false)}>
          <div className="candidates-modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setShowApplications(false)}>&times;</button>
            <h3 className="candidates-modal-title">
              Applications for {selectedJobForApps?.jobRole} at {selectedJobForApps?.companyName}
            </h3>
            {jobApplications.length === 0 ? (
              <div className="candidates-empty">No applications for this job.</div>
            ) : (
              <ul className="candidates-list">
                {jobApplications.map((app, idx) => (
                  <li key={app._id} className="candidates-item" style={{ animationDelay: `${idx * 0.1}s` }}>
                    <div className="candidate-avatar">{app.name.charAt(0).toUpperCase()}</div>
                    <div className="candidates-summary">
                      <h3 className="candidates-name">{app.name}</h3>
                      <p className="candidates-job"><span className="label">Email:</span> <span className="value">{app.email}</span></p>
                      <p className="candidates-job"><span className="label">Mobile:</span> <span className="value">{app.mobile}</span></p>
                      <p className="candidates-job"><span className="label">Current Location:</span> <span className="value">{app.currentLocation || 'N/A'}</span></p>
                      <p className="candidates-job"><span className="label">Available for Joining:</span> <span className="value">{app.availableForJoining ? 'Yes' : 'No'}</span></p>
                      <p className="candidates-date"><span className="label">Applied On:</span> <span className="value">{new Date(app.createdAt).toLocaleDateString()}</span></p>
                    </div>
                    <div className="candidates-actions">
                      <a href={app.resumeLink} target="_blank" rel="noreferrer" className="details-candidate-btn">View Resume</a>
                      <a href={app.adharLink} target="_blank" rel="noreferrer" className="details-candidate-btn">View Adhar</a>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default ActiveJobs;