import React, { useEffect, useState } from 'react';
import './navbar.css';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    setTimeout(() => setLoaded(true), 100);

    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const handleNavClick = () => {
    setMenuOpen(false);
  };

  return (
    <header className={`navbar-wrapper ${loaded ? 'navbar-appear' : ''} ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-logo">
          <img src="logo.jpeg" alt="HR Logo" className="logo-img" />
          <span className="logo-text">HR Zone</span>
        </div>


        <nav className={`navbar-menu ${menuOpen ? 'navbar-menu-open' : ''}`}>
          <NavLink to="/" className="navbar-link" onClick={handleNavClick}>
            <span>Home</span>
          </NavLink>
          <NavLink to="/jobs" className="navbar-link" onClick={handleNavClick}>
            <span>Jobs</span>
          </NavLink>
          <NavLink to="/companies" className="navbar-link" onClick={handleNavClick}>
            <span>Companies</span>
          </NavLink>
          <NavLink to="/updates" className="navbar-link" onClick={handleNavClick}>
            <span>Updates</span>
          </NavLink>
          <NavLink to="/reviews" className="navbar-link" onClick={handleNavClick}>
            <span>Reviews</span>
          </NavLink>
          <NavLink to="/about" className="navbar-link" onClick={handleNavClick}>
            <span>About Us</span>
          </NavLink>
          <NavLink to="/contact" className="navbar-link" onClick={handleNavClick}>
            <span>Contact Us</span>
          </NavLink>
        </nav>
        <label className="toggle-switch">
          <input
            type="checkbox"
            checked={theme === 'dark'}
            onChange={toggleTheme} />
          <span className="toggle-slider"></span>
        </label>
        <div
          className={`navbar-toggle ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu">
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
