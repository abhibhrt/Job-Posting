import './Home.css';
import { NavLink } from 'react-router-dom';

const Home = () => {
  return (
    <section className="home-section">
      <div className="home-content-wrapper">
        <div className="home-text-content">
          <h1 className="home-heading">
            <span className="home-heading-primary">Find Your Dream Job</span>
            <br /><br />
            <span className="home-heading-subtitle">Empowering Careers, One Opportunity at a Time</span>
          </h1>
          <p className="home-description">
            We connect job seekers with top employers across India. Our mission is simple: to provide{' '}
            <strong>genuine, budget-friendly, and skill-based employment opportunities</strong> tailored to your aspirations.
          </p>

          <div className="home-cta">
            <NavLink to="/jobs" className="btn-primary home-get-started">
              Get Started
            </NavLink>
            <div className="home-members-info">
              <div className="home-members-avatars">
                <img src="https://img.freepik.com/free-photo/brunette-business-woman-with-wavy-long-hair-blue-eyes-stands-holding-notebook-hands_197531-343.jpg?semt=ais_hybrid&w=740" alt="User 1" className="avatar" />
                <img src="https://st5.depositphotos.com/1000975/65034/i/450/depositphotos_650343012-stock-photo-young-employee-working-office.jpg" alt="User 2" className="avatar" />
                <img src="https://img.freepik.com/free-photo/businesswoman-posing_23-2148142829.jpg?semt=ais_hybrid&w=740" alt="User 3" className="avatar" />
                <img src="https://media.istockphoto.com/id/1399565382/photo/young-happy-mixed-race-businessman-standing-with-his-arms-crossed-working-alone-in-an-office.jpg?s=612x612&w=0&k=20&c=buXwOYjA_tjt2O3-kcSKqkTp2lxKWJJ_Ttx2PhYe3VM=" alt="User 4" className="avatar" />
              </div>
              <span className="home-members-count">5K+ Active Members</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
