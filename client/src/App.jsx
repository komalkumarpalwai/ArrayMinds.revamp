import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AppRoutes from './routes/AppRoutes';
import ScrollToTop from './components/common/ScrollToTop';
import SmoothScroll from './components/common/SmoothScroll';

function App() {
  useEffect(() => {
    // Globally block copying and cutting text outside of form input fields
    const blockCopy = (e) => {
      const target = e.target;
      const isInput =
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable);

      if (!isInput) {
        e.preventDefault();
      }
    };

    document.addEventListener('copy', blockCopy);
    document.addEventListener('cut', blockCopy);

    return () => {
      document.removeEventListener('copy', blockCopy);
      document.removeEventListener('cut', blockCopy);
    };
  }, []);

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
