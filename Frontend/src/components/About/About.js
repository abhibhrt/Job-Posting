import React from 'react';
import './about.css';

const AboutUs = () => {
  return (
    <section className="about-section" id='about-section'>
      <div className="about-container">
        <h2 className="global-heading">About HR Zone</h2>
        <p className="about-description">
          At <strong>HR Zone</strong>, we believe in empowering individuals by connecting them with opportunities that align with their goals and aspirations. Whether you're a fresher seeking your first job or a seasoned professional exploring new horizons, we're here to guide you every step of the way.
        </p>

        <div className="about-grid">
          <div className="about-card" style={{ animationDelay: '0.1s' }}>
            <div className="card-icon">💼</div>
            <h3>Our Mission</h3>
            <p>
              To bridge the gap between talent and opportunity by creating a reliable and transparent job platform for everyone.
            </p>
          </div>
          <div className="about-card" style={{ animationDelay: '0.3s' }}>
            <div className="card-icon">🔍</div>
            <h3>Why Choose Us</h3>
            <p>
              With expert HR insights, verified listings, and personalized job matching, we help job seekers find roles where they can truly thrive.
            </p>
          </div>
          <div className="about-card" style={{ animationDelay: '0.5s' }}>
            <div className="card-icon">🤝</div>
            <h3>Trusted by Employers</h3>
            <p>
              Our partnerships with top companies ensure high-quality listings and real-time openings across various sectors.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;