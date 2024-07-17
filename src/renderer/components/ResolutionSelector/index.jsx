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
    { label: 'Mobile', icon: iconMobile },
    { label: 'Tablet', icon: iconTablet },
    { label: 'Desktop', icon: iconDesktop },
    { label: 'Responsive', icon: iconResponsive },
  ];

  const openModal = () => {
    window.electronAPI.showModal();
  };

  return (
    <div className="resolution-tool">
      <div className="resolution-selector">
        <div className="tooltip-container">
          <button
            type="button"
            className="resolution-button"
            onClick={openModal}
          >
            <img src={iconSetting} alt="setting" />
          </button>
          <div className="tooltip">Settings</div>
        </div>
        <div className="tooltip-container">
          <button type="button" className="resolution-button">
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
      </div>
    </div>
  );
}

export default ResolutionSelector;
