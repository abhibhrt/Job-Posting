import React, { useState } from 'react';
import { useGlobalData } from '../../GlobalDataContext';
import { useAlert } from '../../components/Alert/Alert';
import './manageUpdates.css';

const ManageUpdates = () => {
  const { updates, loading, refetch } = useGlobalData();
  const { showAlert, AlertComponent } = useAlert();
  const [newMessage, setNewMessage] = useState('');
  const [editId, setEditId] = useState(null);
  const [editMessage, setEditMessage] = useState('');
  const [image, setImages] = useState(null);
  const [updateSave, setUpdateSave] = useState(false);
  const [visibleUpdates, setVisibleUpdates] = useState(3); // Show first 3 updates by default

  const handleCreate = async (e) => {
    e.preventDefault();
    setUpdateSave(true);
    if (!newMessage.trim()) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/updates`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: newMessage, images: image })
      });
      if (!res.ok) throw new Error('Failed to create update');
      setNewMessage('');
      setUpdateSave(false)
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setImages(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleUpdate = async (id) => {
    if (!editMessage.trim()) return;
    setUpdateSave(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/updates/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: editMessage, images: image })
      });
      if (!res.ok) throw new Error('Failed to update');
      setEditId(null);
      setEditMessage('');
      setUpdateSave(false);
      refetch();
      showAlert('Update updated successfully!', 'success');
    } catch (err) {
      showAlert('Failed to update', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this update?')) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/updates/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      refetch();
      showAlert('Update deleted successfully!', 'success');
    } catch (err) {
      showAlert('Failed to delete update', 'error');
    }
  };

  const loadMoreUpdates = () => {
    setVisibleUpdates(prev => prev + 3); // Load 3 more updates
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
            disabled={updateSave}
            className="manage-updates-textarea"
          />
          <div className="handle-image">
            <input className='newproduct-input' type="file" accept="image/*" onChange={handleImageChange} />
            <p>Image size should be under 1MB only</p>
          </div>
        </div>
        <button
          type="submit"
          disabled={updateSave || !newMessage.trim()}
          className="manage-updates-add-btn">
          {updateSave ? 'Adding...' : 'Add Update'}
        </button>
      </form>

      {loading && !updates.length && (
        <div className="manage-updates-loading">
          <div className="loading-spinner"></div>
        </div>
      )}

      <div className="manage-updates-list">
        {updates.length > 0 ? (
          <>
            {updates.slice(0, visibleUpdates).map(update => (
              <div key={update._id} className="manage-updates-card">
                {editId === update._id ? (
                  <>
                    <div className="form-group">
                      <textarea
                        value={editMessage}
                        onChange={e => setEditMessage(e.target.value)}
                        rows={3}
                        disabled={updateSave}
                        className="manage-updates-textarea"
                      />
                      <div className="handle-image">
                        <input className='newproduct-input' type="file" accept="image/*" onChange={handleImageChange} />
                      </div>
                    </div>
                    <div className="manage-updates-actions">
                      <button
                        onClick={() => handleUpdate(update._id)}
                        disabled={updateSave || !editMessage.trim()}
                        className="manage-updates-save-btn">
                        {updateSave ? 'Saving...' : 'Save'}
                      </button>
                      <button
                        onClick={() => setEditId(null)}
                        disabled={updateSave}
                        className="manage-updates-cancel-btn">
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <div className='update-manage-list'>
                    {update.images?.url && (
                      <img src={update.images.url} alt="list-image" className='update-list-image' />
                    )}
                    <pre className="manage-updates-message">{update.message}</pre>
                    <div className="manage-updates-actions">
                      <button
                        onClick={() => handleEdit(update._id, update.message)}
                        disabled={updateSave}
                        className="manage-updates-edit-btn">
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(update._id)}
                        disabled={updateSave}
                        className="manage-updates-delete-btn">
                        Delete
                      </button>
                    </div>
                  </div>
                )}
                <div className="manage-updates-date">
                  {new Date(update.createdAt).toLocaleString()}
                </div>
              </div>
            ))}
            {visibleUpdates < updates.length && (
              <button 
                onClick={loadMoreUpdates}
                className="manage-updates-load-more">
                Show More Updates
              </button>
            )}
          </>
        ) : (
          !loading && <div className="manage-updates-empty">No updates found</div>
        )}
      </div>
    </div>
  );
};

export default ManageUpdates;