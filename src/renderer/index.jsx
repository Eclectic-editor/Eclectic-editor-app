import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Editor from './pages/Editor';
import ResolutionSelector from './components/ResolutionSelector';
import Modal from './components/Modal';
import Loading from './components/Loading';

import './styles/global.scss';
import './styles/variables.scss';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/editor" element={<Editor />} />
      <Route path="/resolution" element={<ResolutionSelector />} />
      <Route path="/modal" element={<Modal />} />
      <Route path="/loading" element={<Loading />} />
    </Routes>
  </Router>,
);
