import './home.css';
import FeaturedJobs from '../Featured/FeaturedJobs';
import { Link } from 'react-router-dom';
import AboutUs from '../About/About';
import Reviews from '../Reviews/Reviews';
import Contact from '../Contact/Contact';

const Home = () => {
  return (
    <div className="home-wrapper">
      <section className="home-hero">
        <div className="home-image">
          <img src="logo.jpeg" className='home-logo' alt="Job seekers visual" />
        </div>
        <div className="home-content">
          <h1>
            Discover, explore, and <span>apply</span> for jobs with <strong>HR Zone</strong>
          </h1>
          <div className="home-buttons">
            <Link className="home-btn primary" to="/jobs">Browse Jobs</Link>
            <a className="home-btn secondary" href='#contact'>Contact Now</a>
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <div className="home-features">
        <div className="feature-card">
          <img src="https://img.icons8.com/color/96/checked-user-male.png" alt="icon" />
          <p><strong>Verified jobs</strong> from trusted employers</p>
        </div>
        <div className="feature-card">
          <img src="https://img.icons8.com/color/96/find-matching-job.png" alt="icon" />
          <p>Filter by <strong>skill, location</strong> & experience</p>
        </div>
        <div className="feature-card">
          <img src="https://img.icons8.com/color/96/submit-resume.png" alt="icon" />
          <p><strong>Apply easily</strong> with your profile</p>
        </div>
      </div>
      <FeaturedJobs />
      <AboutUs />
      <Reviews />
      <Contact />
    </div>
  );
};

export default Home;
