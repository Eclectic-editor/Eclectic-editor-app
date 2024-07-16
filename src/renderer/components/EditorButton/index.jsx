import React from 'react';

import './style.scss';

function EditorButton({ isActive, text, onClick }) {
  return (
    <button
      type="button"
      className={`button-editor ${isActive ? 'is-active' : ''}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default EditorButton;
