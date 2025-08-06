import React, { useState, useEffect } from 'react';
import './admin.css';
import ActiveJobs from './ActiveJobs';
import ManageReviews from './ManageReviews';
import Candidates from './Candidates';
import ManageUpdates from './ManageUpdates';
import { useGlobalData } from '../GlobalDataContext';

const Admin = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [loginError, setLoginError] = useState('');
    const [selected, setSelected] = useState(null);
    const { jobs, candidates, reviews, loading } = useGlobalData();

    // Password change states
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [passwordData, setPasswordData] = useState({ username: '', oldPassword: '', newPassword: '' });
    const [passwordMessage, setPasswordMessage] = useState('');
    const [passwordError, setPasswordError] = useState('');

    // Restore auth state on refresh
    useEffect(() => {
        const storedAuth = localStorage.getItem('admin-auth');
        const storedUser = localStorage.getItem('admin-username');
        if (storedAuth === 'true' && storedUser) {
            setIsAuthenticated(true);
            setCredentials((prev) => ({ ...prev, username: storedUser }));
        }
    }, []);

    // Handle login
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
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            // Save auth state
            localStorage.setItem('admin-auth', 'true');
            localStorage.setItem('admin-username', username);
            setIsAuthenticated(true);

        } catch (error) {
            setLoginError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    // Handle logout
    const handleLogout = () => {
        localStorage.removeItem('admin-auth');
        localStorage.removeItem('admin-username');
        setIsAuthenticated(false);
        setCredentials({ username: '', password: '' });
    };

    // Handle login input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials((prev) => ({ ...prev, [name]: value }));
        if (loginError) setLoginError('');
    };

    // Handle password change
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
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    oldPassword,
                    newPassword,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to update password');
            }

            setPasswordMessage('Password updated successfully!');
            setPasswordData({ oldPassword: '', newPassword: '' });
        } catch (error) {
            setPasswordError(error.message);
        }
    };

    return (
        <div className="admin-panel">
            {!isAuthenticated ? (
                <div className="admin-panel__login-container">
                    <div className="admin-panel__login-card">
                        <div className="admin-panel__login-header">
                            <div className="admin-panel__logo">
                                <h2 className="admin-panel__logo-text">HR Zone Admin</h2>
                            </div>
                            <p className="admin-panel__login-subtitle">
                                {showChangePassword
                                    ? 'Change your password securely'
                                    : 'Enter your credentials to access the dashboard'}
                            </p>
                        </div>

                        {!showChangePassword ? (
                            // ---------------------- LOGIN MODE ----------------------
                            <form onSubmit={handleLogin} className="admin-panel__login-form">
                                <div className="admin-panel__form-group">
                                    <label htmlFor="username" className="admin-panel__form-label">Username</label>
                                    <input
                                        type="text"
                                        id="username"
                                        name="username"
                                        value={credentials.username}
                                        placeholder="Enter your username"
                                        onChange={handleChange}
                                        className="admin-panel__form-input"
                                        required
                                    />
                                </div>

                                <div className="admin-panel__form-group">
                                    <label htmlFor="password" className="admin-panel__form-label">Password</label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={credentials.password}
                                        placeholder="Enter your password"
                                        onChange={handleChange}
                                        className="admin-panel__form-input"
                                        required
                                    />
                                </div>

                                {loginError && <div className="admin-panel__error-message">{loginError}</div>}

                                <p
                                    className="update-password-btn"
                                    onClick={() => {
                                        setShowChangePassword(true);
                                        setLoginError('');
                                    }}>
                                    Change Password?
                                </p>

                                <button
                                    type="submit"
                                    className={`admin-panel__login-button ${isLoading ? 'admin-panel__login-button--loading' : ''}`}
                                    disabled={isLoading}
                                >
                                    {isLoading ? <span className="admin-panel__loading-spinner"></span> : 'Login'}
                                </button>
                            </form>
                        ) : (
                            // ---------------------- CHANGE PASSWORD MODE ----------------------
                            <form onSubmit={handlePasswordChange} className="admin-panel__login-form">
                                <div className="admin-panel__form-group">
                                    <label htmlFor="username" className="admin-panel__form-label">Username</label>
                                    <input
                                        type="text"
                                        id="username"
                                        placeholder="Enter Username"
                                        value={passwordData.username}
                                        onChange={(e) => setPasswordData({ ...passwordData, username: e.target.value })}
                                        className="admin-panel__form-input"
                                        required
                                    />
                                </div>

                                <div className="admin-panel__form-group">
                                    <label htmlFor="oldPassword" className="admin-panel__form-label">Old Password</label>
                                    <input
                                        type="password"
                                        id="oldPassword"
                                        placeholder="Old Password"
                                        value={passwordData.oldPassword}
                                        onChange={(e) =>
                                            setPasswordData({ ...passwordData, oldPassword: e.target.value })
                                        }
                                        className="admin-panel__form-input"
                                        required
                                    />
                                </div>

                                <div className="admin-panel__form-group">
                                    <label htmlFor="newPassword" className="admin-panel__form-label">New Password</label>
                                    <input
                                        type="password"
                                        id="newPassword"
                                        placeholder="New Password"
                                        value={passwordData.newPassword}
                                        onChange={(e) =>
                                            setPasswordData({ ...passwordData, newPassword: e.target.value })
                                        }
                                        className="admin-panel__form-input"
                                        required
                                    />
                                </div>

                                {passwordError && <div className="admin-panel__error-message">{passwordError}</div>}
                                {passwordMessage && <div className="admin-panel__success-message">{passwordMessage}</div>}

                                <p
                                    className='update-password-btn'
                                    onClick={() => setShowChangePassword(false)}>
                                    Back to Login
                                </p>
                                <button
                                    type="submit"
                                    className="admin-panel__login-button">
                                    Update Password
                                </button>
                            </form>
                        )}
                    </div>
                </div>

            ) : (
                <div className="admin-panel__dashboard">
                    <header className="admin-panel__dashboard-header">
                        <div className="admin-panel__dashboard-header-content">
                            <h1 className="admin-panel__dashboard-title">
                                Welcome, <span className="admin-panel__dashboard-title-highlight">
                                    {credentials.username || 'Admin'}
                                </span>
                            </h1>
                            <div>
                                <button
                                    onClick={handleLogout}
                                    className="admin-panel__logout-button"
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    </header>

                    <main className="admin-panel__dashboard-main">
                        <nav className="admin-panel__dashboard-nav">
                            <button
                                className={`admin-panel__nav-button ${selected === 1 ? "admin-panel__nav-button--active" : ""}`}
                                onClick={() => setSelected(1)}
                            >
                                <span className="admin-panel__nav-text">Jobs</span>
                            </button>
                            <button
                                className={`admin-panel__nav-button ${selected === 2 ? "admin-panel__nav-button--active" : ""}`}
                                onClick={() => setSelected(2)}
                            >
                                <span className="admin-panel__nav-text">Reviews</span>
                            </button>
                            <button
                                className={`admin-panel__nav-button ${selected === 3 ? "admin-panel__nav-button--active" : ""}`}
                                onClick={() => setSelected(3)}
                            >
                                <span className="admin-panel__nav-text">Candidates</span>
                            </button>
                            <button
                                className={`admin-panel__nav-button ${selected === 4 ? "admin-panel__nav-button--active" : ""}`}
                                onClick={() => setSelected(4)}
                            >
                                <span className="admin-panel__nav-text">Updates</span>
                            </button>
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
                            <div>
                                {selected === 1 && <ActiveJobs />}
                                {selected === 2 && <ManageReviews />}
                                {selected === 3 && <Candidates />}
                                {selected === 4 && <ManageUpdates />}
                            </div>
                        </div>
                    </main>
                </div>
            )}
        </div>
    );
};

export default Admin;
