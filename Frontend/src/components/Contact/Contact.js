import React from 'react';
import './contact.css';

const Contact = () => {


  return (
    <section className="contact-section" id="contact">
      <h2 className="global-heading">Get in Touch</h2>
      <div className="contact-container">
        <p className="contact-subtitle">
          Have questions or want to learn more? Send us a message and we'll get back to you soon.
        </p>

        <form className="contact-form" action="https://api.web3forms.com/submit" method="POST">
          <input type="hidden" name="access_key" value="89a0d58b-1773-4c0a-bd90-2eb8d40e1c33" />
          <div className={`contact-form-group`}>
            <input
              type="text"
              name="name"
              placeholder=" "
              required
              className="contact-input"
            />
            <label className="contact-label">Your Name</label>
            <div className="contact-focus-border"></div>
          </div>

          <div className={`contact-form-group`}>
            <input
              type="email"
              name="email"
              placeholder=" "
              required
              className="contact-input"
            />
            <label className="contact-label">Your Email</label>
            <div className="contact-focus-border"></div>
          </div>

          <div className={`contact-form-group`}>
            <input
              type="number"
              name="number"
              placeholder=" "
              required
              className="contact-input"
            />
            <label className="contact-label">Your Number</label>
            <div className="contact-focus-border"></div>
          </div>

          <div className={`contact-form-group`}>
            <textarea
              name="message"
              placeholder=" "
              required
              className="contact-textarea"
            />
            <label className="contact-label">Your Message</label>
            <div className="contact-focus-border"></div>
          </div>

          <button
            type="submit"
            className='contact-submit-btn'>
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
