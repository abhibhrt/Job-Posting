import React, { useState } from 'react';
import './admin.css';
import ActiveJobs from '../Jobs/ActiveJobs';
import ManageReviews from '../Reviews/ManageReviews';
import Candidates from '../Candidates/Candidates';
import ManageUpdates from '../Updates/ManageUpdates';
import { useGlobalData } from '../../GlobalDataContext';

const AdminDashboard = ({ username, onLogout }) => {
  const [selected, setSelected] = useState(1);
  const { jobs, candidates, reviews, loading } = useGlobalData();

  return (
    <div className="admin-panel__dashboard">
      <header className="admin-panel__dashboard-header">
        <div className="admin-panel__dashboard-header-content">
          <h1 className="admin-panel__dashboard-title">
            Welcome, <span className="admin-panel__dashboard-title-highlight">{username || 'Admin'}</span>
          </h1>
          <button onClick={onLogout} className="admin-panel__logout-button">Logout</button>
        </div>
      </header>

      <main className="admin-panel__dashboard-main">
        <nav className="admin-panel__dashboard-nav">
          <button className={`admin-panel__nav-button ${selected === 1 ? "admin-panel__nav-button--active" : ""}`} onClick={() => setSelected(1)}>Jobs</button>
          <button className={`admin-panel__nav-button ${selected === 2 ? "admin-panel__nav-button--active" : ""}`} onClick={() => setSelected(2)}>Reviews</button>
          <button className={`admin-panel__nav-button ${selected === 3 ? "admin-panel__nav-button--active" : ""}`} onClick={() => setSelected(3)}>Candidates</button>
          <button className={`admin-panel__nav-button ${selected === 4 ? "admin-panel__nav-button--active" : ""}`} onClick={() => setSelected(4)}>Updates</button>
        </nav>

        <div className="admin-panel__dashboard-content">
          <div className="admin-panel__stats-grid">
            <div className="admin-panel__stat-card">
              <h3 className="admin-panel__stat-title">Active Jobs</h3>
              <p className="admin-panel__stat-value">{loading ? '-' : jobs.length}</p>
            </div>
            <div className="admin-panel__stat-card">
              <h3 className="admin-panel__stat-title">Applications</h3>
              <p className="admin-panel__stat-value">{loading ? '-' : candidates.length}</p>
            </div>
            <div className="admin-panel__stat-card">
              <h3 className="admin-panel__stat-title">Reviews</h3>
              <p className="admin-panel__stat-value">{loading ? '-' : reviews.length}</p>
            </div>
          </div>

          {selected === 1 && <ActiveJobs />}
          {selected === 2 && <ManageReviews />}
          {selected === 3 && <Candidates />}
          {selected === 4 && <ManageUpdates />}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;