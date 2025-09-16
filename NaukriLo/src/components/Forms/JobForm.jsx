import React, { useState, useEffect } from 'react';
import { useAlert } from '../Alert/Alert';
import './forms.css';

const JobForm = ({ onClose, onSuccess, existingJob }) => {
  const [formData, setFormData] = useState({
    logo: 'logo.jpeg',
    companyName: '',
    salary: '',
    location: '',
    jobRole: '',
    jobType: '',
    workingHours: '',
    openings: '',
    description: ''
  });
  const { showAlert, AlertComponent } = useAlert();

  useEffect(() => {
    if (existingJob) setFormData(existingJob);
  }, [existingJob]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = existingJob
      ? `${import.meta.env.VITE_API_URL}/jobs/${existingJob._id}` : `${import.meta.env.VITE_API_URL}/jobs`;

    const method = existingJob ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!res.ok) throw new Error('Failed to submit job');

      const result = await res.json();
      showAlert(`Job ${existingJob ? 'updated' : 'created'} successfully`, 'success');
      onSuccess(result);
      onClose();
    } catch (err) {
      console.error(err);
      showAlert('Something went wrong', 'error');
    }
  };

  return (
    <div className="form-modal-overlay">
      <AlertComponent />
      <div className="form-modal-box">
        <h2>{existingJob ? 'Edit Job' : 'Post New Job'}</h2>
        <form className="form-modal-form" onSubmit={handleSubmit}>
          <div className="form-input-group">
            <input className="form-input" name="companyName" placeholder="Company Name" required value={formData.companyName} onChange={handleChange} />
          </div>
          <div className="form-input-group">
            <input className="form-input" name="jobRole" placeholder="Job Role" required value={formData.jobRole} onChange={handleChange} />
          </div>
          <div className="form-input-group">
            <input className="form-input" name="salary" placeholder="Salary" value={formData.salary} onChange={handleChange} />
          </div>
          <div className="form-input-group">
            <input className="form-input" name="location" placeholder="Location" value={formData.location} onChange={handleChange} />
          </div>
          <div className="form-input-group">
            <input className="form-input" name="jobType" placeholder="Job Type" required value={formData.jobType} onChange={handleChange} />
          </div>
          <div className="form-input-group">
            <input className="form-input" name="workingHours" placeholder="Working Hours" value={formData.workingHours} onChange={handleChange} />
          </div>
          <div className="form-input-group">
            <input className="form-input" type="number" name="openings" placeholder="Openings" value={formData.openings} onChange={handleChange} />
          </div>
          <div className="form-input-group">
            <input className="form-input" name="logo" placeholder="Logo URL" value={formData.logo} onChange={handleChange} />
          </div>
          <div className="form-input-group">
            <textarea className="form-input form-textarea" name="description" placeholder="Job Description" required value={formData.description} onChange={handleChange} />
          </div>
          <div className="form-actions">
            <button type="submit" className="form-btn form-btn-primary">{existingJob ? 'Update' : 'Create'}</button>
            <button type="button" className="form-btn form-btn-secondary" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobForm;
