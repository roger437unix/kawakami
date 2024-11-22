import React from 'react';
import ReactDOM from 'react-dom/client';
import Configuracao from './configuracao.jsx';

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <Configuracao />
  </React.StrictMode>
);
