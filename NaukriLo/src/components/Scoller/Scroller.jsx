import React from 'react';
import './Scroller.css';

const companies = [
  { name: 'Amazon', src: '/assets/amazon.png' },
  { name: 'Flipkart', src: '/assets/flipkart.png' },
  { name: 'Tech Mahindra', src: '/assets/techmahindra.png' },
  { name: 'Swiggy', src: '/assets/swiggy.png' },
  { name: 'Teleperformance', src: '/assets/teleperformance.png' },
  { name: 'Blinkit', src: '/assets/blinkit.png' },
  { name: 'Startek', src: '/assets/startek.png' },
  { name: 'V5', src: '/assets/v5.png' }
];

const Scroller = () => {
  return (
    <section className="company-slider-section" id='companies'>
      <p className="company-slider-heading">
        Collaborating with <span className="highlight">3200+</span> internationally renowned companies.
      </p>
      <div className="company-slider-track-wrapper">
        <div className="company-slider-track">
          {[...companies, ...companies].map((company, index) => (
            <div key={index} className="company-slider-logo">
              <img src={company.src} alt={company.name} className="company-logo-img" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Scroller;
