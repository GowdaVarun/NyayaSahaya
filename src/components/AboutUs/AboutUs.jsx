import React, { useState } from 'react';
import './AboutUs.css';

const AboutUs = () => {
  // State for the contact form
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && message) {
      const mailtoLink = `mailto:varungowdar2004@gmail.com?subject=Contact%20Form%20Submission&body=Email:%20${email}%0D%0AMessage:%20${message}`;
      window.location.href = mailtoLink; // This will open the default mail client
    } else {
      alert("Please fill in both fields.");
    }
  };

  return (
    <div className="aboutus-container">
      <section className="team-section">
        <h2>Meet Our Team</h2>
        <div className="team-grid">
          {/* Replace with your actual team members' details */}
          {["Sumadhva Krishna", "Varun Gowda", "Apurva Sankol", "Jason Rohith", "Maheshkumar"].map((name, index) => (
            <div key={index} className="team-member-card">
              <div className="team-member-avatar">{name[0]}</div> {/* Avatar with initials */}
              <h3>{name}</h3>
              {/* <p>{`${name} is a dedicated member of our legal AI development team.`}</p> */}
            </div>
          ))}
        </div>
      </section>

      <section className="contact-section">
        <h2>Contact Us</h2>
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <label htmlFor="email">Your Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Your Message</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>
          <button type="submit">Send</button>
        </form>
      </section>

      <section className="other-info-section">
        <h2>Additional Information</h2>
        <p>
          NyayaSahaya is an AI-powered legal assistant platform designed to make legal assistance accessible, accurate, and timely.
        </p>
      </section>
    </div>
  );
};

export default AboutUs;
