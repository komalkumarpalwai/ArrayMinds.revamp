import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AppRoutes from './routes/AppRoutes';
import ScrollToTop from './components/common/ScrollToTop';
import SmoothScroll from './components/common/SmoothScroll';

function App() {
  return (
    <AuthProvider>
      <Router>
        <SmoothScroll>
          <ScrollToTop />
          <AppRoutes />
        </SmoothScroll>
      </Router>
    </AuthProvider>
  );
}

export default App;
