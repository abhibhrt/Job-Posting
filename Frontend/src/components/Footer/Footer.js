import React from 'react';
import './footer.css';
import { FaLinkedin, FaEnvelope, FaPhone, FaFacebook, FaInstagram } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="footer-section">
            <div className="footer-container">
                <div className="footer-brand">
                    <h2>HR Zone</h2>
                    <p>Your trusted partner for finding meaningful career opportunities that match your passion and potential.</p>
                </div>

                <div className="footer-links">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/jobs">Jobs</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                        <li><Link to="/admin">Admin</Link></li>
                    </ul>
                </div>

                <div className="footer-contact">
                    <h4>Contact Us</h4>
                    <p><FaEnvelope /> hrzone@example.com</p>
                    <p><FaPhone /> +91 9876543210</p>
                    <div className="footer-socials">
                        <a href="/"><FaFacebook /></a>
                        <a href="/"><FaInstagram /></a>
                        <a href="/"><FaLinkedin /></a>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} HR Zone. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
