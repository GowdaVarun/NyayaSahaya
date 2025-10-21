import React, { useEffect } from 'react';

const DocSummariser = () => {
  const docSummariserUrl = import.meta.env.VITE_DOC_SUMMARISER_URL || "https://example.com";
  
  useEffect(() => {
    window.location.href = docSummariserUrl;
  }, [docSummariserUrl]);

  return null;
};

export default DocSummariser;
