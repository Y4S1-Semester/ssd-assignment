import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.js';
import App from './App';
import { AuthContextProvider } from './context/auth.context.js';
import { Auth0Provider } from '@auth0/auth0-react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <Auth0Provider
      domain="dev-4mwdcljcud8z86l1.us.auth0.com"
      clientId="9lFhhsq4WUAjAJGArQKxxCvcK4juTj3s"
      redirectUri = {window.location.origin}
      >
    <App />
    </Auth0Provider>
    </AuthContextProvider>
  </React.StrictMode>
);