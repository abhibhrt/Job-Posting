import React, { useState } from 'react';
import { useAlert } from '../Alert/Alert';
import './forms.css';

const ApplyForm = ({ jobId, onClose }) => {
  const { showAlert, AlertComponent } = useAlert();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    resumeLink: '',
    adharLink: '',
    currentLocation: '',
    availableForJoining: false,
    jobId: jobId
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/candidates/apply/${jobId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      if (res.ok) {
        showAlert('Application submitted successfully!', 'success');
        setTimeout(() => {
          onClose();
        }, 3000);
      } else {
        showAlert(result.message || 'Error submitting application', 'error');
      }
    } catch (err) {
      console.error(err);
      showAlert('Something went wrong', 'error');
    }
  };

  return (
    <div className="form-modal-overlay">
      <AlertComponent />
      <div className="form-modal-box">
        <h2>Apply for this Job</h2>
        <form className="form-modal-form" onSubmit={handleSubmit}>
          <div className="form-input-group">
            <input className="form-input" type="text" name="name" placeholder="Your Name" required onChange={handleChange} />
          </div>
          <div className="form-input-group">
            <input className="form-input" type="email" name="email" placeholder="Email" required onChange={handleChange} />
          </div>
          <div className="form-input-group">
            <input className="form-input" type="text" name="mobile" placeholder="Mobile Number" required onChange={handleChange} />
          </div>
          <div className="form-input-group">
            <input className="form-input" type="url" name="resumeLink" placeholder="Resume Link (Google Drive, etc.)" required onChange={handleChange} />
          </div>
          <div className="form-input-group">
            <input className="form-input" type="url" name="adharLink" placeholder="Adhar Link (Google Drive, etc.)" onChange={handleChange} />
          </div>
          <div className="form-input-group">
            <input className="form-input" type="text" name="currentLocation" placeholder="Current Location" onChange={handleChange} />
          </div>
          <label className="form-checkbox-label">
            <input className="form-checkbox" type="checkbox" name="availableForJoining" onChange={handleChange} />
            Available to join immediately
          </label>
          <div className="form-actions">
            <button type="submit" className="form-btn form-btn-primary">Submit</button>
            <button type="button" className="form-btn form-btn-secondary" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyForm;
