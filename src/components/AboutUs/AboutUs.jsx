import React, { useState } from 'react';
import './AboutUs.css';

const AboutUs = () => {
  // State for the contact form
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email && message) {
        try {
            const response = await fetch('https://script.google.com/macros/s/AKfycbyY2_16MYWsIQjjSLl8uQ9xDYwrEDeYjwYb9SRCmKQNILktSzWPPNS3OAn5sFSZGDdGjg/exec', {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, message }),
            });
            if (response.ok) {
                alert("Your message has been sent successfully.");
            } else {
                alert("Your message has been sent successfully");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("There was an error sending your message. Please try again later.");
        }
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
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
          />
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Your message"
          />
          <button type="submit">Send</button>
        </form>
      </section>

      {/* <section className="other-info-section">
        <h2>Additional Information</h2>
        <p>
          NyayaSahaya is an AI-powered legal assistant platform designed to make legal assistance accessible, accurate, and timely.
        </p>
      </section> */}
    </div>
  );
};

export default AboutUs;
