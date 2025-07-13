import React, { useState } from 'react';
import { useGlobalData } from '../../GlobalDataContext';
import { useAlert } from '../../components/Alert/Alert';
import './reviews.css';

const Reviews = () => {
  const { reviews, loading, refetch } = useGlobalData();
  const { showAlert, AlertComponent } = useAlert();
  const [form, setForm] = useState({ name: '', email: '', rating: 0, review: '' });
  const [hoverRating, setHoverRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRatingClick = (rating) => {
    setForm({ ...form, rating });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setForm({ name: '', email: '', rating: 5, review: '' });
      setSubmitted(true);
      refetch();
      setTimeout(() => setSubmitted(false), 3000);
      if (res.ok) {
        showAlert('Review submitted successfully!', 'success');
      } else {
        showAlert(data.message || 'Failed to submit review', 'error');
      }
    } catch (err) {
      console.error('Submission error:', err);
      showAlert('Something went wrong while submitting review', 'error');
    }
  };

  const averageRating = reviews.length
    ? (reviews.reduce((acc, cur) => acc + cur.rating, 0) / reviews.length).toFixed(1)
    : 0;

  return (
    <section id="review-section" className='page-section'>
      <h2 className="global-heading">What Our Users Say</h2>
      <AlertComponent />
      <div className="review-container">
        <form className="review-form" onSubmit={handleSubmit}>
          <h3>Share Your Experience</h3>
          <div className="form-group">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
            />
          </div>

          <div className="form-group">
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Your Email"
              required
            />
          </div>

          <div className="form-group">
            <div className="star-rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`star ${star <= (hoverRating || form.rating) ? 'active' : ''}`}
                  onClick={() => handleRatingClick(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                >
                  ★
                </span>
              ))}
              <span className="rating-text">
                {form.rating} Star{form.rating > 1 ? 's' : ''}
              </span>
            </div>
          </div>

          <div className="form-group">
            <textarea
              name="review"
              value={form.review}
              onChange={handleChange}
              placeholder="Write your review..."
              required
            />
          </div>

          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? (
              <span className="spinner"></span>
            ) : submitted ? (
              'Thank You!'
            ) : (
              'Submit Review'
            )}
          </button>
        </form>

        <div className="review-content">
          <div className="overall-rating">
            <div className="avg-number">{averageRating}</div>
            <div className="stars">
              {'★'.repeat(Math.round(averageRating))}
              {'☆'.repeat(5 - Math.round(averageRating))}
            </div>
            <p className="review-count">{reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}</p>
          </div>

          <div className="review-list">
            {reviews.length > 0 ? (
              reviews.map((review, idx) => (
                <div key={idx} className="review-card" style={{ animationDelay: `${idx * 0.1}s` }}>
                  <div className="review-header">
                    <div className="reviewer-info">
                      <div className="reviewer-avatar">
                        {review.name.charAt(0).toUpperCase()}
                      </div>
                      <strong>{review.name}</strong>
                    </div>
                    <div className="stars">
                      {'★'.repeat(review.rating)}
                      {'☆'.repeat(5 - review.rating)}
                    </div>
                  </div>
                  <p className="review-text">"{review.review}"</p>
                  <span className="review-date">{new Date(review.createdAt || new Date()).toLocaleDateString()}</span>
                </div>
              ))
            ) : (
              <div className="no-reviews">
                <p>No reviews yet. Be the first to share your experience!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;