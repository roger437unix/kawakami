import React from 'react';
import ReactDOM from 'react-dom/client';
import Historico from './historico.jsx';

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <Historico />
  </React.StrictMode>
);