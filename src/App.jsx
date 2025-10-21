import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import DocSummariser from './components/DocSummariser';
import AboutUs from './components/AboutUs/AboutUs';
import Chatbot from './components/Chatbot/Chatbot';
import Home from './components/Home';
import ParticlesComponent from './components/particles/particles';


const NotFound = () => (
  <div>
    <h2>Page Not Found</h2>
    <p>The page you are looking for does not exist.</p>
    <Link to="/">Go Back to Home</Link>
  </div>
);

const DocGenerator = () => {
  const docGeneratorUrl = import.meta.env.VITE_DOC_GENERATOR_URL || "http://localhost:8501";
  return (
    <div>
      <h2>DocGenerator</h2>
      <iframe
        src={docGeneratorUrl}
        width="100%"
        height="675px"
        style={{ border: 'none' }}
        title="DocGenerator"
      ></iframe>
    </div>
  );
};

const App = () => {
  useEffect(() => {
    window.history.pushState(null, null, window.location.pathname);
    window.addEventListener('popstate', () => {
      window.history.pushState(null, null, window.location.pathname);
    });
  }, []);

  return (
    <Router>
      <div>
        <ParticlesComponent />
        <div className="navbar">
          <h1><Link to="/" className="home">Nyaya<span style={{ color: 'blue' }}>Sahaya</span></Link></h1>
          <nav>
            <ul>
              <li><Link to="/" className="nav-link">Home</Link></li>
              <li><Link to="/doc-generator" className="nav-link">DocGenerator</Link></li>
              <li><Link to="/Chatbot" className="nav-link">Nyayasahaya Chatbot</Link></li>
              <li><Link to="/doc-summariser" className="nav-link">DocSummariser</Link></li>
              <li><Link to="/about" className="nav-link">About Us</Link></li>
            </ul>
          </nav>
        </div>
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/doc-generator" element={<DocGenerator />} />
            <Route path="/chatbot" element={<Chatbot />} />
            <Route path="/doc-summariser" element={<DocSummariser />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
