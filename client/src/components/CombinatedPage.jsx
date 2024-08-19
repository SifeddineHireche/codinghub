import React from 'react';
import LandingPage from './LandingPage';
import AuthPage from './AuthPage';

const CombinedPage = () => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ flex: 1, overflow: 'hidden' }}>
        <LandingPage />
      </div>
      <div style={{ flex: 1, overflow: 'hidden' }}>
        <AuthPage />
      </div>
    </div>
  );
};

export default CombinedPage;