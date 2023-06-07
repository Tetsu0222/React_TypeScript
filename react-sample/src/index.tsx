import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
//import App from './App'; 
//import Hello from './components/Hello' 
//import Name from './components/Name' 
//import Message from './components/Message' 
//import Parent from './components/ContainerSample' 
//import Page from './components/ContextSample' 
import CounterUseState from './components/CounterUseState' 
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
      <CounterUseState />
  </React.StrictMode>
);

reportWebVitals();
