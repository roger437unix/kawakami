import React from 'react';
import ReactDOM from 'react-dom/client';
import Candidatos from './candidatos.jsx';

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <Candidatos />
  </React.StrictMode>
);
