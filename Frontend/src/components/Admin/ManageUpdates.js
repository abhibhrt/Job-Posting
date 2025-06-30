import React, { useState } from 'react';
import { useGlobalData } from '../../GlobalDataContext';
import { useAlert } from '../Alert/Alert';
import './manageUpdates.css';

const ManageUpdates = () => {
  const { updates, loading, refetch } = useGlobalData();
  const { showAlert, AlertComponent } = useAlert();
  const [newMessage, setNewMessage] = useState('');
  const [editId, setEditId] = useState(null);
  const [editMessage, setEditMessage] = useState('');

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/updates`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: newMessage })
      });
      if (!res.ok) throw new Error('Failed to create update');
      setNewMessage('');
      refetch();
      showAlert('Update created successfully!', 'success');
    } catch (err) {
      showAlert('Failed to create update', 'error');
    }
  };

  const handleEdit = (id, message) => {
    setEditId(id);
    setEditMessage(message);
  };

  const handleUpdate = async (id) => {
    if (!editMessage.trim()) return;
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/updates/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: editMessage })
      });
      if (!res.ok) throw new Error('Failed to update');
      setEditId(null);
      setEditMessage('');
      refetch();
      showAlert('Update updated successfully!', 'success');
    } catch (err) {
      showAlert('Failed to update', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this update?')) return;
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/updates/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      refetch();
      showAlert('Update deleted successfully!', 'success');
    } catch (err) {
      showAlert('Failed to delete update', 'error');
    }
  };

  return (
    <div className="manage-updates-container">
      <AlertComponent />
      <h2 className="manage-updates-title">Manage Updates</h2>
      <form onSubmit={handleCreate} className="manage-updates-form">
        <div className="form-group">
          <textarea
            value={newMessage}
            onChange={e => setNewMessage(e.target.value)}
            placeholder="Enter new update message..."
            rows={3}
            disabled={loading}
            className="manage-updates-textarea"
          />
        </div>
        <button 
          type="submit" 
          disabled={loading || !newMessage.trim()} 
          className="manage-updates-add-btn"
        >
          {loading ? 'Adding...' : 'Add Update'}
        </button>
      </form>

      {loading && !updates.length && (
        <div className="manage-updates-loading">
          <div className="loading-spinner"></div>
        </div>
      )}

      <div className="manage-updates-list">
        {updates.length > 0 ? (
          updates.map(update => (
            <div key={update._id} className="manage-updates-card">
              {editId === update._id ? (
                <>
                  <div className="form-group">
                    <textarea
                      value={editMessage}
                      onChange={e => setEditMessage(e.target.value)}
                      rows={3}
                      disabled={loading}
                      className="manage-updates-textarea"
                    />
                  </div>
                  <div className="manage-updates-actions">
                    <button 
                      onClick={() => handleUpdate(update._id)} 
                      disabled={loading || !editMessage.trim()} 
                      className="manage-updates-save-btn"
                    >
                      {loading ? 'Saving...' : 'Save'}
                    </button>
                    <button 
                      onClick={() => setEditId(null)} 
                      disabled={loading} 
                      className="manage-updates-cancel-btn"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <pre className="manage-updates-message">{update.message}</pre>
                  <div className="manage-updates-actions">
                    <button 
                      onClick={() => handleEdit(update._id, update.message)} 
                      disabled={loading} 
                      className="manage-updates-edit-btn"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(update._id)} 
                      disabled={loading} 
                      className="manage-updates-delete-btn"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
              <div className="manage-updates-date">
                {new Date(update.createdAt).toLocaleString()}
              </div>
            </div>
          ))
        ) : (
          !loading && <div className="manage-updates-empty">No updates found</div>
        )}
      </div>
    </div>
  );
};

export default ManageUpdates;