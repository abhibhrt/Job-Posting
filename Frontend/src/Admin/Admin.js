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

    useEffect(() => {
        const storedAuth = localStorage.getItem('admin-auth');
        if (storedAuth === 'true') {
            setIsAuthenticated(true);
        }
    }, []);

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
            await new Promise(resolve => setTimeout(resolve, 1000));
            if (username === 'admin' && password === '123') {
                localStorage.setItem('admin-auth', 'true');
                setIsAuthenticated(true);
            } else {
                throw new Error('Invalid username or password');
            }
        } catch (error) {
            setLoginError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('admin-auth');
        setIsAuthenticated(false);
        setCredentials({ username: '', password: '' });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials((prev) => ({ ...prev, [name]: value }));
        if (loginError) setLoginError('');
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
                            <p className="admin-panel__login-subtitle">Enter your credentials to access the dashboard</p>
                        </div>

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

                            {loginError && (
                                <div className="admin-panel__error-message">
                                    {loginError}
                                </div>
                            )}

                            <button
                                type="submit"
                                className={`admin-panel__login-button ${isLoading ? 'admin-panel__login-button--loading' : ''}`}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <span className="admin-panel__loading-spinner"></span>
                                ) : (
                                    'Login'
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            ) : (
                <div className="admin-panel__dashboard">
                    <header className="admin-panel__dashboard-header">
                        <div className="admin-panel__dashboard-header-content">
                            <h1 className="admin-panel__dashboard-title">
                                Welcome, <span className="admin-panel__dashboard-title-highlight">Admin</span>
                            </h1>
                            <button
                                onClick={handleLogout}
                                className="admin-panel__logout-button">
                                Logout
                            </button>
                        </div>
                    </header>

                    <main className="admin-panel__dashboard-main">
                        <nav className="admin-panel__dashboard-nav">
                            <button className={`admin-panel__nav-button ${selected === 1 ? "admin-panel__nav-button--active" : ""}`}
                                onClick={() => setSelected(1)}>
                                <span className="admin-panel__nav-text">Jobs</span>
                            </button>
                            <button className={`admin-panel__nav-button ${selected === 2 ? "admin-panel__nav-button--active" : ""}`}
                                onClick={() => setSelected(2)}>
                                <span className="admin-panel__nav-text">Reviews</span>
                            </button>
                            <button className={`admin-panel__nav-button ${selected === 3 ? "admin-panel__nav-button--active" : ""}`}
                                onClick={() => setSelected(3)}>
                                <span className="admin-panel__nav-text">Candidates</span>
                            </button>
                            <button className={`admin-panel__nav-button ${selected === 4 ? "admin-panel__nav-button--active" : ""}`}
                                onClick={() => setSelected(4)}>
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
                            <div >
                                {
                                    selected === 1 && <ActiveJobs />
                                }
                                {
                                    selected === 2 && <ManageReviews/>
                                }
                                {
                                    selected === 3 && <Candidates />
                                }
                                {
                                    selected === 4 && <ManageUpdates />
                                }
                            </div>
                        </div>
                    </main>
                </div>
            )}
        </div>
    );
};

export default Admin;