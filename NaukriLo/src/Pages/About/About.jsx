import React, { useEffect, useRef } from 'react';
import './about.css';

const About = () => {
  const counters = useRef([
    { target: 183, current: 0, element: null },
    { target: 7, current: 0, element: null },
    { target: 350, current: 0, element: null },
    { target: 9, current: 0, element: null },
    { target: 3, current: 0, element: null }
  ]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          startCounting();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    const aboutSection = document.getElementById('about-section');
    if (aboutSection) {
      observer.observe(aboutSection);
    }

    return () => {
      if (aboutSection) {
        observer.unobserve(aboutSection);
      }
    };
  }, []);

  const startCounting = () => {
    const duration = 5000; // Animation duration in ms
    const increment = (target, current, element) => {
      const step = target / (duration / 16);
      if (current < target) {
        current += step;
        if (current > target) current = target;
        element.textContent = Math.floor(current) + (target === 183 ? 'K+' : target === 7 ? 'K' : target === 350 ? '+' : target === 9 ? 'K' : 'K');
        requestAnimationFrame(() => increment(target, current, element));
      } else {
        element.textContent = target + (target === 183 ? 'K+' : target === 7 ? 'K' : target === 350 ? '+' : target === 9 ? 'K' : 'K');
      }
    };

    counters.current.forEach(counter => {
      if (counter.element) {
        increment(counter.target, counter.current, counter.element);
      }
    });
  };

  return (
    <section id='about-section' className='page-section'>
      <h2 className="global-heading">About Us</h2>
      <div className="about-container">
        <div className="about-image">
          <img src="happypic.png" alt="About-Image" />
        </div>
        <div className="about-content">
          <h2 className="about-title">Our Mission</h2>
          <p className="about-text">
            Our mission is to help implement technology for commercial use thereby helping our clients manage change through high-quality, cost effective, simple and practical solutions. Our experienced and certified engineers provide service and support for the latest platforms and technologies, to make the most of your existing investment.
          </p>
          <div className="about-stats">
            <div className="about-stat">
              <div className="about-stat-number" ref={el => counters.current[0].element = el}>0K+</div>
              <div className="about-stat-label">GlobalUser</div>
              <div className="about-stat-sublabel">Participation</div>
            </div>

            <div className="about-stat">
              <div className="about-stat-number" ref={el => counters.current[1].element = el}>0K</div>
              <div className="about-stat-label">Satisfied People</div>
            </div>

            <div className="about-stat">
              <div className="about-stat-number" ref={el => counters.current[2].element = el}>0+</div>
              <div className="about-stat-label">Company</div>
            </div>

            <div className="about-stat">
              <div className="about-stat-number" ref={el => counters.current[3].element = el}>0K</div>
              <div className="about-stat-label">Job Vacancy</div>
            </div>

            <div className="about-stat">
              <div className="about-stat-number" ref={el => counters.current[4].element = el}>0K</div>
              <div className="about-stat-label">Success Stories</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;