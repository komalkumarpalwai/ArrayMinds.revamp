import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server.js';
import { AuthProvider } from './context/AuthContext';
import AppRoutes from './routes/AppRoutes';

export function render(url) {
  const html = renderToString(
    <AuthProvider>
      <StaticRouter location={url}>
        <AppRoutes />
      </StaticRouter>
    </AuthProvider>
  );
  return { html };
}
