import React from 'react';
import { AuthProvider } from './app/auth.js';
import Router from './app/router.js';

const App = () => {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
};

export default App;
