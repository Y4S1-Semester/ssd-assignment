import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.js';
import App from './App';
import { AuthContextProvider } from './context/auth.context.js';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
    <App />
    </AuthContextProvider>
  </React.StrictMode>
);