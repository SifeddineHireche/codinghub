import React from 'react';
import LandingPage from './LandingPage';

const CombinedPage = () => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ flex: 1, overflow: 'hidden' }}>
        <LandingPage />
      </div>
    </div>
  );
};

export default CombinedPage;