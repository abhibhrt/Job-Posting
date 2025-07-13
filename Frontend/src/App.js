import { BrowserRouter as Router, Routes, Route, useLocation  } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import './App.css';
import { FaWhatsapp } from 'react-icons/fa';
import { useEffect } from 'react';

// Context
import { GlobalDataProvider } from './GlobalDataContext';
import Scroller from './components/Scoller/Scroller';
import FeaturedJobs from './Pages/Featured/FeaturedJobs';
import About from './Pages/About/About';
import Services from './Pages/Services/Services';
import Reviews from './Pages/Reviews/Reviews';
import Contact from './Pages/Contact/Contact';
import Companies from './Pages/Companies/Comapnies';

// Lazy loaded components
const Navbar = lazy(() => import('./components/Navbar/Navbar'));
const Footer = lazy(() => import('./components/Footer/Footer'));
const Home = lazy(() => import('./Pages/Home/Home'));
const JobList = lazy(() => import('./Pages/Jobs/JobList'));
const Admin = lazy(() => import('./Admin/Admin'));
const Updates = lazy(() => import('./Pages/Updates/Updates'));

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
