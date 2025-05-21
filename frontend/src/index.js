


import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Navbar from './pages/Navbar';
import Footer from './components/Footer';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
    <Navbar/>
    <Footer/>
    
  </BrowserRouter>
);
