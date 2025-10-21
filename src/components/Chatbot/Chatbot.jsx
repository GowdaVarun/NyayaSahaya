import React, { useState, useEffect, useRef } from "react";
import './Chatbot.css';

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [error, setError] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const BASE_URL = import.meta.env.VITE_CHATBOT_API_URL || "http://localhost:8000";

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (input.trim()) {
      setMessages(prev => [...prev, { sender: "user", text: input }]);
      setIsTyping(true);
      try {
        const response = await fetch(`${BASE_URL}/api/chat`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question: input }),
        });
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        const data = await response.json();
        setMessages(prev => [...prev, { sender: "bot", text: data.answer }]);
      } catch (err) {
        console.error("Error sending message:", err);
        setMessages(prev => [
          ...prev,
          { sender: "bot", text: "An error occurred. Please try again later." }
        ]);
        setError(err.message);
      } finally {
        setIsTyping(false);
        setInput("");
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chat-window">
        <div className="chat-header">
          <div className="bot-avatar">🤖</div>
          <div className="chat-title">NyayaSahaya Assistant</div>
        </div>

        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${msg.sender === "user" ? "user-message" : "bot-message"}`}
            >
              <div className="avatar-container">
                <span className="avatar">
                  {msg.sender === "user" ? "🧑‍💼" : "🤖"}
                </span>
              </div>
              <div className="message-content">
                {msg.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="typing-indicator">
              <div className="typing-dot"></div>
              <div className="typing-dot"></div>
              <div className="typing-dot"></div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        <div className="chat-input-container">
          <div className="chat-input-wrapper">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              className="chat-input"
              placeholder="Type your message..."
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || isTyping}
              className="send-button"
            >
              Send
            </button>
          </div>
          {error && (
            <div className="error-message">{error}</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Chatbot;
