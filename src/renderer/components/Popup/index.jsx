import React from 'react';

import './style.scss';

function Popup({ show, onClose, children }) {
  if (!show) {
    return null;
  }

  return (
    <div className="popup-overlay">
      <div className="popup">
        <div className="content">{children}</div>
        <button type="button" className="button-close" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default Popup;
