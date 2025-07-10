import React from 'react';
import './companies.css';

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

const Companies = () => {
  return (
    <section className="companies-section">
      <h2 className="global-heading">Our Trusted Hiring Partners</h2>
      <p className="companies-description">
        We’re proud to collaborate with industry-leading companies that actively hire our skilled candidates. 
        From global giants to emerging startups, our partners trust us to deliver talent that makes an impact.
      </p>
      <div className="companies-grid">
        {companies.map((company, index) => (
          <div key={index} className="company-card">
            <img src={company.src} alt={company.name} className="company-logo" />
            <h4 className='partner-company-name'>{company.name}</h4>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Companies;
