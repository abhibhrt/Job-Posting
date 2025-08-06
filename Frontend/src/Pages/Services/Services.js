import React, { useState } from 'react';
import './Services.css';

const Services = () => {
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <section id="services-section">
      <h2 className="global-heading">Career Growth</h2>
      <div className="services-container">
        <div className="services-header">
          <p className="services-description">
            We Help You Find the Right Job Quickly and Easily
          </p>
          <p className="services-text">
            At Employee Guide, we simplify your job search with our expert consultancy and AI-powered tools. Whether you're just starting or looking for your next big opportunity, we've got you covered.
          </p>
        </div>

        <div className="services-features">
          <div className="service-feature">
            <div className="feature-checkbox checked">&#9996;</div>
            <div className="feature-text">Explore Verified Job Opportunities</div>
          </div>
          <div className="service-feature">
            <div className="feature-checkbox checked">&#9996;</div>
            <div className="feature-text">Personalized Profile Matching</div>
          </div>
          <div className="service-feature">
            <div className="feature-checkbox checked">&#9996;</div>
            <div className="feature-text">Connect with Experts</div>
          </div>
          <div className="service-feature">
            <div className="feature-checkbox checked">&#9996;</div>
            <div className="feature-text">Stay in Touch</div>
          </div>
        </div>

        <button className="services-cta">
          Contact Us
        </button>

        <h2 className="global-heading">Frequently Asked Questions</h2>
        <div className="services-faqs">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className={`faq-item ${activeFaq === index ? 'active' : ''}`}
              onClick={() => toggleFaq(index)}
            >
              <div className="faq-question">
                {faq.question}
                <span className="faq-icon">{activeFaq === index ? '▲' : '▼'}</span>
              </div>
              <div className="faq-answer">
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const faqData = [
  {
    question: "How does your job matching system work?",
    answer: "Our AI-powered system analyzes your skills, experience, and preferences to match you with the most suitable job opportunities from our verified database."
  },
  {
    question: "Is there a cost to use your services?",
    answer: "Basic job search and matching services are free. We offer premium services like career coaching and resume optimization at competitive rates."
  },
  {
    question: "How long does it typically take to find a job?",
    answer: "While it varies by individual, our average user finds suitable opportunities within 2-4 weeks of active use of our platform."
  },
  {
    question: "Can I get help with interview preparation?",
    answer: "Yes! Our premium members get access to mock interviews with career experts and personalized feedback."
  },
  {
    question: "How do you verify job opportunities?",
    answer: "We partner directly with employers and use multiple verification methods to ensure all listings are legitimate and up-to-date."
  }
];

export default Services;