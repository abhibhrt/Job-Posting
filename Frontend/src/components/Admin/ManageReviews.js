import { useState } from 'react';
import { useGlobalData } from '../../GlobalDataContext';
import { useAlert } from '../Alert/Alert';
import './managereviews.css';

const ManageReviews = () => {
  const { reviews, loading, refetch } = useGlobalData();
  const { showAlert, AlertComponent } = useAlert();
  const [searchTerm, setSearchTerm] = useState('');

  const handleDelete = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this review?');
    if (!confirm) return;

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/reviews/${id}`, { method: 'DELETE' });
      if (res.ok) {
        refetch();
        showAlert('Review deleted successfully!', 'success');
      }
    } catch (err) {
      showAlert('Failed to delete review', 'error');
    }
  };

  const filteredReviews = reviews.filter(review => 
    review.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    review.review?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="managereviews-container">
      <AlertComponent />
      <div className="managereviews-header">
        <h2 className="secondglobal-heading">Manage Reviews</h2>
        <div className="managereviews-search">
          <input
            type="text"
            placeholder="Search reviews..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="search-icon">🔍</span>
        </div>
      </div>

      {loading ? (
        <div className="managereviews-loading">
          <div className="loading-spinner"></div>
          <p>Loading Reviews...</p>
        </div>
      ) : filteredReviews.length === 0 ? (
        <div className="managereviews-empty">
          <p>No reviews found</p>
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
        <div className="managereviews-list">
          {filteredReviews.map((review, index) => (
            <div 
              className="managereviews-item" 
              key={review._id}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="review-avatar">
                {typeof review.name === 'string' && review.name.length > 0
                  ? review.name.charAt(0).toUpperCase()
                  : 'U'}
              </div>
              <div className="review-content">
                <div className="review-header">
                  <div>
                    <h3 className="review-name">{review.name || 'Anonymous'}</h3>
                    <p className="review-email">{review.email || 'No email provided'}</p>
                  </div>
                  <div className="review-rating">
                    <div className="stars">
                      {'★'.repeat(review.rating)}
                      {'☆'.repeat(5 - review.rating)}
                    </div>
                    <span className="rating-text">{review.rating}.0</span>
                  </div>
                </div>
                <p className="review-text">"{review.review}"</p>
                <p className="review-date">
                  {new Date(review.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
              <div className="review-actions">
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(review._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageReviews;