import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
//import App from './App'; 
import Hello from './components/Hello' 
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

//AppからHelloへ変更
root.render(
  <React.StrictMode>
    <Hello />
  </React.StrictMode>
);

reportWebVitals();
