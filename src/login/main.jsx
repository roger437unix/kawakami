import React from 'react';
import ReactDOM from 'react-dom/client';
import Login from './Login.jsx';

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <Login />
  </React.StrictMode>
);