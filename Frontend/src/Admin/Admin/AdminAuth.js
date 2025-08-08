import React, { useState } from 'react';
import './admin.css';

const AdminAuth = ({ onLoginSuccess }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [passwordData, setPasswordData] = useState({ username: '', oldPassword: '', newPassword: '' });
  const [passwordMessage, setPasswordMessage] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
    if (loginError) setLoginError('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { username, password } = credentials;
    if (!username || !password) {
      setLoginError('Please enter both username and password');
      return;
    }

    setIsLoading(true);
    setLoginError('');

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Login failed');

      onLoginSuccess(username);
    } catch (error) {
      setLoginError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    const { username, oldPassword, newPassword } = passwordData;
    if (!oldPassword || !newPassword || !username) {
      setPasswordError('Please fill all fields');
      return;
    }

    setPasswordError('');
    setPasswordMessage('');

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/change-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, oldPassword, newPassword }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to update password');

      setPasswordMessage('Password updated successfully!');
      setPasswordData({ username: '', oldPassword: '', newPassword: '' });
    } catch (error) {
      setPasswordError(error.message);
    }
  };

  return (
    <div className="admin-panel__login-container">
      <div className="admin-panel__login-card">
        <div className="admin-panel__login-header">
          <div className="admin-panel__logo">
            <h2 className="admin-panel__logo-text">HR Zone Admin</h2>
          </div>
          <p className="admin-panel__login-subtitle">
            {showChangePassword ? 'Change your password securely' : 'Enter your credentials to access the dashboard'}
          </p>
        </div>

        {!showChangePassword ? (
          <form onSubmit={handleLogin} className="admin-panel__login-form">
            <div className="admin-panel__form-group">
              <label htmlFor="username" className="admin-panel__form-label">Username</label>
              <input type="text" id="username" name="username" value={credentials.username}
                placeholder="Enter your username" onChange={handleChange} className="admin-panel__form-input" required />
            </div>

            <div className="admin-panel__form-group">
              <label htmlFor="password" className="admin-panel__form-label">Password</label>
              <input type="password" id="password" name="password" value={credentials.password}
                placeholder="Enter your password" onChange={handleChange} className="admin-panel__form-input" required />
            </div>

            {loginError && <div className="admin-panel__error-message">{loginError}</div>}

            <p className="update-password-btn" onClick={() => setShowChangePassword(true)}>Change Password?</p>

            <button type="submit" className={`admin-panel__login-button ${isLoading ? 'admin-panel__login-button--loading' : ''}`} disabled={isLoading}>
              {isLoading ? <span className="admin-panel__loading-spinner"></span> : 'Login'}
            </button>
          </form>
        ) : (
          <form onSubmit={handlePasswordChange} className="admin-panel__login-form">
            <div className="admin-panel__form-group">
              <label htmlFor="username" className="admin-panel__form-label">Username</label>
              <input type="text" id="username" placeholder="Enter Username" value={passwordData.username}
                onChange={(e) => setPasswordData({ ...passwordData, username: e.target.value })}
                className="admin-panel__form-input" required />
            </div>

            <div className="admin-panel__form-group">
              <label htmlFor="oldPassword" className="admin-panel__form-label">Old Password</label>
              <input type="password" id="oldPassword" placeholder="Old Password" value={passwordData.oldPassword}
                onChange={(e) => setPasswordData({ ...passwordData, oldPassword: e.target.value })}
                className="admin-panel__form-input" required />
            </div>

            <div className="admin-panel__form-group">
              <label htmlFor="newPassword" className="admin-panel__form-label">New Password</label>
              <input type="password" id="newPassword" placeholder="New Password" value={passwordData.newPassword}
                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                className="admin-panel__form-input" required />
            </div>

            {passwordError && <div className="admin-panel__error-message">{passwordError}</div>}
            {passwordMessage && <div className="admin-panel__success-message">{passwordMessage}</div>}

            <p className="update-password-btn" onClick={() => setShowChangePassword(false)}>Back to Login</p>
            <button type="submit" className="admin-panel__login-button">Update Password</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AdminAuth;
