import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import App from './App';
import Home from './pages/Home';

import './styles/global.scss';
import './styles/variables.scss';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/app" element={<App />} />
    </Routes>
  </Router>,
);
