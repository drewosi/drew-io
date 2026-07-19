import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/styles.css';
import './styles/app.css';
import App from './App.jsx';

/* Level three — for whoever opens the panel. */
console.log(
  '%cDREW.OS%c // you found the instrument panel. one rAF loop, two curves, nothing bounces. ctrl-k for the palette.',
  'font-family:monospace;letter-spacing:0.18em;color:#C7E2F2;',
  'font-family:monospace;color:#74838D;'
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
