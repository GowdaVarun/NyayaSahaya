  import React, { useState, useEffect, useRef } from "react";

  function Chatbot() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [error, setError] = useState(null);
    const chatEndRef = useRef(null);

    const BASE_URL = "http://localhost:8000";

    useEffect(() => {
      // Scroll to the bottom of the chat when new messages are added
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMessage = async () => {
      if (input.trim()) {
        setMessages((prev) => [...prev, { sender: "user", text: input }]);
        try {
          const response = await fetch(`${BASE_URL}/api/chat`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ question: input }),
          });
          if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
          }
          const data = await response.json();
          setMessages((prev) => [...prev, { sender: "bot", text: data.answer }]);
        } catch (err) {
          console.error("Error sending message:", err);
          setMessages((prev) => [
            ...prev,
            { sender: "bot", text: "An error occurred. Please try again later." },
          ]);
        }
        setInput("");
      }
    };
    
    return (
      <div className="bg-gray-950 min-h-screen flex flex-col">
        <div className="flex-1 max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-4 mt-6">
          <div className="overflow-y-auto h-96">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-4 flex items-start ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div className="flex items-center">
                  {msg.sender === "user" ? (
                    <span className="mr-2">👤</span>
                  ) : (
                    <span className="mr-2">🤖</span>
                  )}
                  <div
                    className={`inline-block px-4 py-2 rounded-lg ${
                      msg.sender === "user"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-300 text-gray-800"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
          <div className="flex mt-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type your message..."
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim()}
              className={`ml-2 px-4 py-2 rounded-lg ${
                input.trim()
                  ? "bg-blue-500 text-white hover:bg-blue-600"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Send
            </button>
          </div>
        </div>
        {error && (
          <div className="text-red-500 text-center mt-4">{`Error: ${error}`}</div>
        )}
      </div>
    );
  }

  export default Chatbot;
