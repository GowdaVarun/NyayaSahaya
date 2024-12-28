import React, { useEffect, useState } from 'react';

const NyayasahayaChatbot = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/start-chatbot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(response => {
      if (response.ok) {
        setLoading(false);
      } else {
        console.error("Failed to start the chatbot app");
      }
    }).catch(error => {
      console.error("Error:", error);
    });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <iframe src="http://localhost:8000/chatbot-ui" width="100%" height="100%" style={{ border: 'none' }}></iframe>
  );
};

export default NyayasahayaChatbot;
