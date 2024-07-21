import React from 'react';

import iconSetting from '../../assets/icons/icon-setting.png';
import iconTilt from '../../assets/icons/icon-tilt.png';
import iconMobile from '../../assets/icons/icon-mobile.png';
import iconTablet from '../../assets/icons/icon-tablet.png';
import iconDesktop from '../../assets/icons/icon-desktop.png';
import iconResponsive from '../../assets/icons/icon-responsive.png';

import './style.scss';

function ResolutionSelector() {
  const resolutions = [
    { label: 'Mobile', icon: iconMobile, width: 375, height: 667 },
    { label: 'Tablet', icon: iconTablet, width: 768, height: 1024 },
    { label: 'Desktop', icon: iconDesktop, width: 1440, height: 900 },
  ];

  const handleOpenModal = () => {
    window.electronAPI.showModal();
  };

  const handleOpenResponsiveViews = () => {
    window.electronAPI.openResponsiveViews();
  };

  const handleTiltViews = () => {
    window.electronAPI.tiltViews();
  };

  return (
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
        {resolutions.map((res) => (
          <div className="tooltip-container" key={res.label}>
            <button type="button" className="resolution-button">
              <img src={res.icon} alt={res.label} />
            </button>
            <div className="tooltip">{res.label}</div>
          </div>
        ))}
        <div className="tooltip-container">
          <button
            type="button"
            className="resolution-button"
            onClick={handleOpenResponsiveViews}
          >
            <img src={iconResponsive} alt="Responsive" />
          </button>
          <div className="tooltip">Responsive</div>
        </div>
      </div>
    </div>
  );
}

export default ResolutionSelector;
