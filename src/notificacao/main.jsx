import React from 'react';
import ReactDOM from 'react-dom/client';
import Notificacao from './notificacao.jsx';

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <Notificacao />
  </React.StrictMode>
);