import React, { useState, useEffect } from 'react';
import AdminAuth from './AdminAuth';
import AdminDashboard from './AdminDashboard';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');

  // Restore auth state from localStorage
  useEffect(() => {
    const storedAuth = localStorage.getItem('admin-auth');
    const storedUser = localStorage.getItem('admin-username');
    if (storedAuth === 'true' && storedUser) {
      setIsAuthenticated(true);
      setUsername(storedUser);
    }
  }, []);

  const handleLoginSuccess = (user) => {
    setIsAuthenticated(true);
    setUsername(user);
    localStorage.setItem('admin-auth', 'true');
    localStorage.setItem('admin-username', user);
  };

  const handleLogout = () => {
    localStorage.removeItem('admin-auth');
    localStorage.removeItem('admin-username');
    setIsAuthenticated(false);
    setUsername('');
  };

  return (
    <div className="admin-panel">
      {!isAuthenticated ? (
        <AdminAuth onLoginSuccess={handleLoginSuccess} />
      ) : (
        <AdminDashboard username={username} onLogout={handleLogout} />
      )}
    </div>
  );
};

export default Admin;
