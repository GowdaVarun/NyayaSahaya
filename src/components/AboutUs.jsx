import React, { useEffect } from 'react';

const AboutUs = () => {
  useEffect(() => {
    window.location.href = "https://example.com";
  }, []);
  
  return null; // No need to render anything
};

export default AboutUs;
