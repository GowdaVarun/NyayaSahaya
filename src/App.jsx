import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import './App.css';
import DocSummariser from './components/DocSummariser';
import AboutUs from './components/AboutUs';
const Home = () => (
  <div>
    <h2>Welcome to Nyayasahaya</h2>
    <p>Select a service from the navigation menu.</p>
  </div>
);

const NotFound = () => (
  <div>
    <h2>Page Not Found</h2>
    <p>The page you are looking for does not exist.</p>
    <Link to="/">Go Back to Home</Link>
  </div>
);

const NyayasahayaChatbotRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.location.href = "http://localhost:8000/chatbot-ui";
  }, [navigate]);

  return (
    <div>
      <h2>Redirecting to Nyayasahaya Chatbot...</h2>
    </div>
  );
};

const DocGeneratorRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.location.href = "http://localhost:8502/doc-generator-ui";
  }, [navigate]);

  return (
    <div>
      <h2>Redirecting to DocGenerator...</h2>
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
        <div className="navbar">
          <h1>Nyaya<span style={{ color: 'blue' }}>Sahaya</span></h1>
          <nav>
            <ul>
              <li><Link to="/" className="nav-link">Home</Link></li>
              <li><Link to="/doc-generator" className="nav-link">DocGenerator</Link></li>
              <li><Link to="/chatbot" className="nav-link">Nyayasahaya Chatbot</Link></li>
              <li><Link to="/doc-summariser" className="nav-link">DocSummariser</Link></li>
              <li><Link to="/about" className="nav-link">About Us</Link></li>
            </ul>
          </nav>
        </div>
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/doc-generator" element={<DocGeneratorRedirect />} />
            <Route path="/chatbot" element={<NyayasahayaChatbotRedirect />} />
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
