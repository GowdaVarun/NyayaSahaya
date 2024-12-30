import React from 'react';
import './Home.css';

const Home = () => {
  const features = [
    {
      title: "Legal Document Generation",
      description: "Generate accurate legal documents tailored to your specific needs",
      icon: "📄"
    },
    {
      title: "AI Legal Assistant",
      description: "Get instant answers to your legal queries through our intelligent chatbot",
      icon: "🤖"
    },
    {
      title: "Document Summarizer",
      description: "Convert complex legal documents into clear, concise summaries",
      icon: "📝"
    },
    {
      title: "24/7 Availability",
      description: "Access legal assistance anytime, anywhere",
      icon: "⏰"
    }
  ];

  const faqs = [
    {
      question: "What is NyayaSahaya?",
      answer: "NyayaSahaya is an AI-powered legal assistant platform that helps users with document generation, legal queries, and document summarization."
    },
    {
      question: "Is my data secure?",
      answer: "Yes, we prioritize data security and ensure all information is encrypted and handled with strict confidentiality."
    },
    {
      question: "How accurate is the legal information?",
      answer: "Our AI is trained on verified legal sources, but we recommend consulting with a legal professional for final verification."
    }
  ];

  return (
    <div className="home-container">
      <section className="hero-section">
        <h1>Welcome to NyayaSahaya</h1>
        <p className="hero-text">Your AI-Powered Legal Assistant</p>
        <div className="hero-description">
          Simplifying legal processes through artificial intelligence, making legal assistance accessible to everyone.
        </div>
      </section>

      <section className="features-section">
        <h2>Our Features</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-grid">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-card">
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <p>&copy; {new Date().getFullYear()} NyayaSahaya. All Rights Reserved.</p>
          <p>
            Made with ❤️ by the NyayaSahaya Team 
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
