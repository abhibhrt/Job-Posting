import React, { useState } from 'react';
import './subscribe.css';

const Subscribe = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSubmitted(false);

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Something went wrong');
      }

      setSubmitted(true);
      setEmail('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="subscribe-container">
      <form onSubmit={handleSubmit} className="subscribe-form">
        <h4>Subscribe for future updates</h4>
        <div className="subscribe-input-group">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="subscribe-input"
          />
          <button
            type="submit"
            className={`subscribe-button ${loading ? 'subscribe-button--loading' : ''}`}
            disabled={loading}
          >
            <span className="subscribe-button-text">
              {loading ? 'Sending...' : 'Subscribe'}
            </span>
            {loading && (
              <span className="subscribe-button-loader">
                <span className="subscribe-button-loader-dot"></span>
                <span className="subscribe-button-loader-dot"></span>
                <span className="subscribe-button-loader-dot"></span>
              </span>
            )}
          </button>
        </div>

        {submitted && (
          <div className="subscribe-message-container">
            <p className="subscribe-message subscribe-message--success">
              <svg className="subscribe-message-icon" viewBox="0 0 24 24">
                <path fill="currentColor" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
              </svg>
              Thanks for subscribing! We'll be in touch from now.
            </p>
            <div className="subscribe-confetti">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="subscribe-confetti-piece"></div>
              ))}
            </div>
          </div>
        )}
        {error && (
          <p className="subscribe-message subscribe-message--error">
            <svg className="subscribe-message-icon" viewBox="0 0 24 24">
              <path fill="currentColor" d="M13,13H11V7H13M13,17H11V15H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
            </svg>
            {error}
          </p>
        )}
      </form>
    </div>
  );
};

export default Subscribe;