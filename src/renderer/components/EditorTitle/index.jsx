import React from 'react';

import './style.scss';

function EditorTitle({ title, isActive }) {
  return (
    <h2 className={`editor-title ${isActive ? 'is-active' : ''}`}>{title}</h2>
  );
}

export default EditorTitle;
