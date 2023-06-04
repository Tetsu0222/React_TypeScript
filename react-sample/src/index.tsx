import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
//import App from './App'; 
//import Hello from './components/Hello' 
//import Name from './components/Name' 
import Message from './components/Message' 
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Message />
  </React.StrictMode>
);

reportWebVitals();
