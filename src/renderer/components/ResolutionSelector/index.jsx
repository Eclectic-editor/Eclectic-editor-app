import React, { useRef, useEffect } from 'react';

import iconSetting from '../../assets/icons/icon-setting.png';
import iconTilt from '../../assets/icons/icon-tilt.png';
import iconMobile from '../../assets/icons/icon-mobile.png';
import iconTablet from '../../assets/icons/icon-tablet.png';
import iconDesktop from '../../assets/icons/icon-desktop.png';
import iconResponsive from '../../assets/icons/icon-responsive.png';

import './style.scss';

function ResolutionSelector() {
  const tooltipTimeoutRef = useRef(null);
  const currentTooltipRef = useRef('');

  const resolutions = [
    { label: 'Mobile', icon: iconMobile },
    { label: 'Tablet', icon: iconTablet },
    { label: 'Desktop', icon: iconDesktop },
    { label: 'Responsive', icon: iconResponsive },
  ];

  const showTooltip = (x, y, text) => {
    window.electronAPI.showTooltip({ x, y, text });
    currentTooltipRef.current = text;
  };

  const hideTooltip = () => {
    window.electronAPI.hideTooltip();
    currentTooltipRef.current = '';
  };

  const handleMouseOver = (e, label) => {
    if (currentTooltipRef.current !== label) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = Math.round(rect.left + rect.width / 2);
      const y = Math.round(rect.bottom + window.scrollY + 5);

      if (tooltipTimeoutRef.current) {
        clearTimeout(tooltipTimeoutRef.current);
      }

      tooltipTimeoutRef.current = setTimeout(() => {
        showTooltip(x, y, label);
      }, 300);
    }
  };

  const handleMouseOut = () => {
    if (tooltipTimeoutRef.current) {
      clearTimeout(tooltipTimeoutRef.current);
    }

    tooltipTimeoutRef.current = setTimeout(() => {
      hideTooltip();
    }, 300);
  };

  useEffect(
    () => () => {
      if (tooltipTimeoutRef.current) {
        clearTimeout(tooltipTimeoutRef.current);
      }
    },
    [],
  );

  return (
    <div className="resolution-tool">
      <div className="resolution-selector">
        <button
          type="button"
          className="resolution-button"
          onMouseOver={(e) => handleMouseOver(e, 'Settings')}
          onMouseOut={handleMouseOut}
          onFocus={(e) => handleMouseOver(e, 'Settings')}
          onBlur={handleMouseOut}
        >
          <img src={iconSetting} alt="setting" />
        </button>
        <button
          type="button"
          className="resolution-button"
          onMouseOver={(e) => handleMouseOver(e, 'Tilt')}
          onMouseOut={handleMouseOut}
          onFocus={(e) => handleMouseOver(e, 'Tilt')}
          onBlur={handleMouseOut}
        >
          <img src={iconTilt} alt="tilt" />
        </button>
      </div>
      <div className="resolution-selector">
        {resolutions.map((res) => (
          <button
            type="button"
            className="resolution-button"
            key={res.label}
            onMouseOver={(e) => handleMouseOver(e, res.label)}
            onMouseOut={handleMouseOut}
            onFocus={(e) => handleMouseOver(e, res.label)}
            onBlur={handleMouseOut}
          >
            <img src={res.icon} alt={res.label} />
          </button>
        ))}
      </div>
    </div>
  );
}

export default ResolutionSelector;
