import React, { useState, useEffect } from 'react';

import iconSetting from '../../assets/icons/icon-setting.png';
import iconTilt from '../../assets/icons/icon-tilt.png';
import iconMobile from '../../assets/icons/icon-mobile.png';
import iconTablet from '../../assets/icons/icon-tablet.png';
import iconDesktop from '../../assets/icons/icon-desktop.png';
import iconMultiView from '../../assets/icons/icon-multi-view.png';

import './style.scss';

function ResolutionSelector() {
  const [isMultiViewMode, setIsMultiViewMode] = useState(false);
  const [selectedResolution, setSelectedResolution] = useState('desktop');
  const [resolutionLabel, setResolutionLabel] = useState('Desktop: 1280px');

  useEffect(() => {
    const handleResolutionUpdate = (resolutions) => {
      const res = resolutions[selectedResolution];
      const label = `${selectedResolution.charAt(0).toUpperCase() + selectedResolution.slice(1)}: ${res.width}px`;
      setResolutionLabel(label);
    };

    window.electronAPI.receive(
      'update-resolution-label',
      handleResolutionUpdate,
    );

    return () => {
      window.electronAPI.removeListener(
        'update-resolution-label',
        handleResolutionUpdate,
      );
    };
  }, [selectedResolution]);

  const handleOpenModal = () => {
    window.electronAPI.showModal();
  };

  const handleEnableMultiView = () => {
    setIsMultiViewMode(true);
    window.electronAPI.enableMultiViewMode();
  };

  const handleTiltViews = () => {
    window.electronAPI.tiltViews();
  };

  const handleSetResolution = (key) => {
    setIsMultiViewMode(false);
    setSelectedResolution(key);
    window.electronAPI.setResolution(key);
  };

  const getIconByKey = (key) => {
    if (key === 'mobile') return iconMobile;
    if (key === 'tablet') return iconTablet;
    return iconDesktop;
  };

  return (
    <div className="resolution-container">
      <h1 className="logo">
        eclectic
        <br />
        editor
      </h1>
      <div className="resolution-tool">
        <div className="resolution-selector">
          <div className="tooltip-container">
            <button
              type="button"
              className="resolution-button"
              onClick={handleOpenModal}
            >
              <img src={iconSetting} alt="setting" />
            </button>
            <div className="tooltip">Settings</div>
          </div>
          <div className="tooltip-container">
            <button
              type="button"
              className="resolution-button"
              onClick={handleTiltViews}
            >
              <img src={iconTilt} alt="tilt" />
            </button>
            <div className="tooltip">Tilt</div>
          </div>
        </div>
        <div className="resolution-selector">
          {['mobile', 'tablet', 'desktop'].map((key) => (
            <div className="tooltip-container" key={key}>
              <button
                type="button"
                className="resolution-button"
                onClick={() => handleSetResolution(key)}
              >
                <img src={getIconByKey(key)} alt={key} />
              </button>
              <div className="tooltip">
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </div>
            </div>
          ))}
          <div className="tooltip-container">
            <button
              type="button"
              className={`resolution-button ${isMultiViewMode ? 'is-active' : ''}`}
              onClick={handleEnableMultiView}
            >
              <img src={iconMultiView} alt="Multi-View" />
            </button>
            <div className="tooltip">Multi-View</div>
          </div>
        </div>
      </div>
      {!isMultiViewMode && (
        <span className="resolution-label">{resolutionLabel}</span>
      )}
    </div>
  );
}

export default ResolutionSelector;
