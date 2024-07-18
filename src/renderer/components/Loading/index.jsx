import React from 'react';

import './style.scss';

function Loading() {
  return (
    <div className="loading-overlay">
      <div className="spinner" />
      <p>Loading...</p>
    </div>
  );
}

export default Loading;
