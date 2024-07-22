import React, { useState, useEffect } from 'react';

import './style.scss';

function Modal() {
  const [resolutions, setResolutions] = useState({
    mobile: { width: 375, height: 812 },
    tablet: { width: 768, height: 1024 },
    desktop: { width: 1440, height: 900 },
  });

  useEffect(() => {
    window.electronAPI.receive('currentResolutions', (currentResolutions) => {
      setResolutions(currentResolutions);
    });

    return () => {
      window.electronAPI.removeListener('currentResolutions', setResolutions);
    };
  }, []);

  const handleCloseModal = () => {
    window.electronAPI.closeModal();
  };

  const handleInputChange = (device, dimension, value) => {
    setResolutions((prev) => ({
      ...prev,
      [device]: {
        ...prev[device],
        [dimension]: value,
      },
    }));
  };

  const handleSave = () => {
    const isValid = (device, dimension, min, max) => {
      const value = Number(resolutions[device][dimension]);
      return value >= min && value <= max;
    };

    if (
      isValid('mobile', 'width', 320, 600) &&
      isValid('mobile', 'height', 480, 800) &&
      isValid('tablet', 'width', 601, 1024) &&
      isValid('tablet', 'height', 801, 1280) &&
      isValid('desktop', 'width', 1025, 2560) &&
      isValid('desktop', 'height', 768, 1440)
    ) {
      window.electronAPI.updateResolutions(resolutions);
      handleCloseModal();
    } else {
      alert('입력 값이 유효한 범위를 벗어났습니다.');
    }
  };

  return (
    <div className="modal-setting">
      <div className="content">
        <h1 className="title">Resolution Settings</h1>
        <div className="box-setting">
          <h2 className="title-resolution">Desktop</h2>
          <div className="box-input">
            <label htmlFor="desktop-width" className="blind">
              Desktop Width
            </label>
            <input
              type="number"
              className="input-setting"
              value={resolutions.desktop.width}
              min="1025"
              max="2560"
              onChange={(e) =>
                handleInputChange('desktop', 'width', e.target.value)
              }
              id="desktop-width"
            />
          </div>
          <div className="box-input">
            <label htmlFor="desktop-height" className="blind">
              Desktop Height
            </label>
            <input
              type="number"
              className="input-setting"
              value={resolutions.desktop.height}
              min="768"
              max="1440"
              onChange={(e) =>
                handleInputChange('desktop', 'height', e.target.value)
              }
              id="desktop-height"
            />
          </div>
          <p className="resolution-range">최소: 1025x768, 최대: 2560x1440</p>
        </div>
        <div className="box-setting">
          <h2 className="title-resolution">Tablet</h2>
          <div className="box-input">
            <label htmlFor="tablet-width" className="blind">
              Tablet Width
            </label>
            <input
              type="number"
              className="input-setting"
              value={resolutions.tablet.width}
              min="601"
              max="1024"
              onChange={(e) =>
                handleInputChange('tablet', 'width', e.target.value)
              }
              id="tablet-width"
            />
          </div>
          <div className="box-input">
            <label htmlFor="tablet-height" className="blind">
              Tablet Height
            </label>
            <input
              type="number"
              className="input-setting"
              value={resolutions.tablet.height}
              min="801"
              max="1280"
              onChange={(e) =>
                handleInputChange('tablet', 'height', e.target.value)
              }
              id="tablet-height"
            />
          </div>
          <p className="resolution-range">최소: 601x801, 최대: 1024x1280</p>
        </div>
        <div className="box-setting">
          <h2 className="title-resolution">Mobile</h2>
          <div className="box-input">
            <label htmlFor="mobile-width" className="blind">
              Mobile Width
            </label>
            <input
              type="number"
              className="input-setting"
              value={resolutions.mobile.width}
              min="320"
              max="600"
              onChange={(e) =>
                handleInputChange('mobile', 'width', e.target.value)
              }
              id="mobile-width"
            />
          </div>
          <div className="box-input">
            <label htmlFor="mobile-height" className="blind">
              Mobile Height
            </label>
            <input
              type="number"
              className="input-setting"
              value={resolutions.mobile.height}
              min="480"
              max="800"
              onChange={(e) =>
                handleInputChange('mobile', 'height', e.target.value)
              }
              id="mobile-height"
            />
          </div>
          <p className="resolution-range">최소: 320x480, 최대: 600x800</p>
        </div>
      </div>
      <button type="button" className="button-save" onClick={handleSave}>
        Save
      </button>
      <button type="button" className="button-close" onClick={handleCloseModal}>
        Close
      </button>
    </div>
  );
}

export default Modal;
