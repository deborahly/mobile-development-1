import React from 'react';
import { AuthProvider } from './app/auth.js';
import Router from './app/router.js';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
};

export default App;
