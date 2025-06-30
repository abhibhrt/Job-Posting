import React, { useEffect, useState } from 'react';
import './navbar.css'; 
import { NavLink } from 'react-router-dom';


const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 100);
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`navbar-wrapper ${loaded ? 'navbar-appear' : ''} ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-logo">
          <img src="logo.jpeg" alt="HR Logo" className="logo-img" />
          <span className="logo-text">HR Zone</span>
        </div>
        
        <div 
          className={`navbar-toggle ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>

        <nav className={`navbar-menu ${menuOpen ? 'navbar-menu-open' : ''}`}>
          <NavLink 
            to="/" 
            className="navbar-link" 
            onClick={() => setMenuOpen(false)}
          >
            <span>Home</span>
          </NavLink>
          
          <NavLink 
            to="/updates" 
            className="navbar-link" 
            onClick={() => setMenuOpen(false)}
          >
            <span>Updates</span>
          </NavLink>
          
          <NavLink 
            to="/jobs" 
            className="navbar-link" 
            onClick={() => setMenuOpen(false)}
          >
            <span>Jobs</span>
          </NavLink>
          
          <NavLink 
            to="/admin" 
            className="navbar-link navbar-admin" 
            onClick={() => setMenuOpen(false)}
          >
            <span>Admin</span>
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;