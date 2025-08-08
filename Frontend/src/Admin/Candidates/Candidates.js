import { useState, useEffect } from 'react';
import { useGlobalData } from '../../GlobalDataContext';
import { useAlert } from '../../components/Alert/Alert';
import './candidates.css';

const Candidates = () => {
  const { candidates: globalApplications, loading } = useGlobalData();
  const { showAlert, AlertComponent } = useAlert();
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    setApplications(globalApplications);
  }, [globalApplications]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this application?')) return;

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/candidates/applications/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setApplications(prev => prev.filter(app => app._id !== id));
        showAlert('Application deleted successfully!', 'success');
      } else {
        alert('Failed to delete.');
        showAlert('Failed to delete application', 'error');
      }
    } catch (err) {
      showAlert('Failed to delete application', 'error');
    }
  };

  const filteredApplications = applications.filter(app =>
    app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (app.jobId && typeof app.jobId === 'object' && app.jobId.jobRole && app.jobId.jobRole.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="candidates-section">
      <AlertComponent />
      <div className="candidates-header">
        <h2 className="secondglobal-heading">Candidate Applications</h2>
        <div className="candidates-search">
          <input
            type="text"
            placeholder="Search candidates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="search-icon">🔍</span>
        </div>
      </div>

      {loading ? (
        <div className="candidates-loading">
          <div className="loading-spinner"></div>
          <p>Loading applications...</p>
        </div>
      ) : filteredApplications.length === 0 ? (
        <div className="candidates-empty">
          <p>No applications found</p>
          {searchTerm && (
            <button
              className="candidates-clear-search"
              onClick={() => setSearchTerm('')}
            >
              Clear search
            </button>
          )}
        </div>
      ) : (
        <ul className="candidates-list">
          {filteredApplications.map((app, index) => (
            <li
              key={app._id}
              className="candidates-item"
              style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="candidate-avatar">
                {app.name.charAt(0).toUpperCase()}
              </div>
              <div className="candidates-summary">
                <h3 className="candidates-name">{app.name}</h3>
                <p className="candidates-job">
                  <span className="label">Applied for:</span>
                  <span className="value">{app.jobId && typeof app.jobId === 'object' && app.jobId.jobRole ? app.jobId.jobRole : 'N/A'}</span>
                </p>
                <p className="candidates-date">
                  <span className="label">Date:</span>
                  <span className="value">{new Date(app.createdAt).toLocaleDateString()}</span>
                </p>
              </div>
              <div className="candidates-actions">
                <button
                  onClick={() => setSelectedCandidate(app)}
                  className="candidates-btn candidates-btn-details">
                  View Details
                </button>
                <button
                  onClick={() => handleDelete(app._id)}
                  className="candidates-btn candidates-btn-delete">
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {selectedCandidate && (
        <div className="candidates-modal-overlay" onClick={() => setSelectedCandidate(null)}>
          <div className="candidates-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close-btn"
              onClick={() => setSelectedCandidate(null)}
            >
              &times;
            </button>
            <h3 className="candidates-modal-title">
              <span className="modal-avatar">
                {selectedCandidate.name.charAt(0).toUpperCase()}
              </span>
              {selectedCandidate.name}
            </h3>

            <div className="modal-details-grid">
              <div className="modal-detail">
                <span className="detail-label">Email:</span>
                <span className="detail-value">{selectedCandidate.email}</span>
              </div>
              <div className="modal-detail">
                <span className="detail-label">Mobile:</span>
                <span className="detail-value">{selectedCandidate.mobile}</span>
              </div>
              <div className="modal-detail">
                <span className="detail-label">Location:</span>
                <span className="detail-value">{selectedCandidate.currentLocation}</span>
              </div>
              <div className="modal-detail">
                <span className="detail-label">Available:</span>
                <span className="detail-value">
                  {selectedCandidate.availableForJoining ? (
                    <span className="available-yes">Yes</span>
                  ) : (
                    <span className="available-no">No</span>
                  )}
                </span>
              </div>
            </div>

            <div className="modal-resume">
              <a
                href={selectedCandidate.resumeLink}
                target="_blank"
                rel="noreferrer"
                className="resume-link">
                View Resume
              </a>
              <a href={selectedCandidate.adharLink}
                target="_blank"
                rel="noreferrer"
                className="resume-link">
                View Adhar
              </a>
            </div>

            <div className="modal-notes">
              <h4>Additional Notes:</h4>
              <p>{selectedCandidate.notes || 'No additional notes provided.'}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Candidates;
