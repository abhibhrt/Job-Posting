import { BrowserRouter as Router, Routes, Route, useLocation  } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import './App.css';
import { FaWhatsapp } from 'react-icons/fa';
import { useEffect } from 'react';

// Context
import { GlobalDataProvider } from './GlobalDataContext';
import Scroller from './Main-Page/Scoller/Scroller';
import FeaturedJobs from './Main-Page/Featured/FeaturedJobs';
import About from './Main-Page/About/About';
import Services from './Main-Page/Services/Services';
import Reviews from './components/Reviews/Reviews';
import Contact from './components/Contact/Contact';
import Companies from './components/Companies/Comapnies';

// Lazy loaded components
const Navbar = lazy(() => import('./Main-Page/Navbar/Navbar'));
const Footer = lazy(() => import('./components/Footer/Footer'));
const Home = lazy(() => import('./Main-Page/Home/Home'));
const JobList = lazy(() => import('./components/Jobs/JobList'));
const Admin = lazy(() => import('./components/Admin/Admin'));
const Updates = lazy(() => import('./components/Updates/Updates'));

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function MainSection(){
  return (
    <>
      <Home/>
      <About />
      <Scroller/>
      <FeaturedJobs/>
      <Services/>
      <Reviews/>
    </>
  )
}

function App() {
  return (
    <GlobalDataProvider>
      <Router>
        <div className="App">
          <Suspense fallback={<div className="loading">Loading...</div>}>
            <Navbar />
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<MainSection />} />
              <Route path="/jobs" element={<JobList />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/updates" element={<Updates />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/companies" element={<Companies />} />
              <Route path="/about" element={<About />} />
            </Routes>
            <Footer />
          </Suspense>
          <div className="whatsapp-icon">
            <a href="https://whatsapp.com/channel/0029Vb5wEZPFCCodX8MMlz0U" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
              <FaWhatsapp size={42} color="#25D366" />
            </a>
          </div>
        </div>
      </Router>
    </GlobalDataProvider>
  );
}

export default App;
