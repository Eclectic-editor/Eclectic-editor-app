import React from 'react';

import './style.scss';

function EditorSmallTitle({ title, isActive }) {
  return (
    <strong className={`editor-small-title ${isActive ? 'is-active' : ''}`}>
      {title}
    </strong>
  );
}

export default EditorSmallTitle;
