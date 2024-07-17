import React from 'react';

import './style.scss';

function Modal() {
  const handleCloseModal = () => {
    window.electronAPI.closeModal();
  };

  return (
    <div className="modal-setting">
      <div className="content">
        <h1 className="title">Resolution Settings</h1>
        <div className="box-setting">
          <label htmlFor="desktop" className="label-setting">
            Desktop
          </label>
          <input
            type="number"
            className="input-setting"
            placeholder="Desktop size"
            id="desktop"
          />
        </div>
        <div className="box-setting">
          <label htmlFor="tablet" className="label-setting">
            Tablet
          </label>
          <input
            type="number"
            className="input-setting"
            placeholder="Tablet size"
            id="tablet"
          />
        </div>
        <div className="box-setting">
          <label htmlFor="mobile" className="label-setting">
            Mobile
          </label>
          <input
            type="number"
            className="input-setting"
            placeholder="Mobile size"
            id="mobile"
          />
        </div>
      </div>
      <button type="button" className="button-close" onClick={handleCloseModal}>
        Close
      </button>
    </div>
  );
}

export default Modal;
