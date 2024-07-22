import React, { useState, useEffect } from 'react';

import './style.scss';

function Modal() {
  const [resolutions, setResolutions] = useState({
    mobile: { width: 375, height: 812 },
    tablet: { width: 768, height: 1024 },
    desktop: { width: 1440, height: 900 },
  });
  const [tempResolutions, setTempResolutions] = useState(resolutions);
  const [errors, setErrors] = useState({
    mobile: { width: '', height: '' },
    tablet: { width: '', height: '' },
    desktop: { width: '', height: '' },
  });

  const ranges = {
    mobile: {
      min: { width: 320, height: 480 },
      max: { width: 767, height: 1024 },
    },
    tablet: {
      min: { width: 768, height: 1024 },
      max: { width: 1024, height: 1366 },
    },
    desktop: {
      min: { width: 1025, height: 768 },
      max: { width: 3840, height: 2160 },
    },
  };

  useEffect(() => {
    const handleCurrentResolutions = (currentResolutions) => {
      setResolutions(currentResolutions);
      setTempResolutions(currentResolutions);
    };

    window.electronAPI.receive('currentResolutions', handleCurrentResolutions);

    return () => {
      window.electronAPI.removeListener(
        'currentResolutions',
        handleCurrentResolutions,
      );
    };
  }, []);

  const handleResolutionChange = (device, dimension, value) => {
    const numValue = value.replace(/[^0-9]/g, '');
    setTempResolutions((prevResolutions) => ({
      ...prevResolutions,
      [device]: {
        ...prevResolutions[device],
        [dimension]: numValue === '' ? '' : Number(numValue),
      },
    }));
  };

  const validateResolutions = (tempRes) => {
    const newErrors = {
      mobile: { width: '', height: '' },
      tablet: { width: '', height: '' },
      desktop: { width: '', height: '' },
    };
    let isValid = true;

    Object.keys(tempRes).forEach((device) => {
      const { width, height } = tempRes[device];
      const { min, max } = ranges[device];
      if (width < min.width || width > max.width) {
        newErrors[device].width =
          `너비는 ${min.width}px에서 ${max.width}px 사이여야 합니다.`;
        isValid = false;
      }
      if (height < min.height || height > max.height) {
        newErrors[device].height =
          `높이는 ${min.height}px에서 ${max.height}px 사이여야 합니다.`;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSaveResolutions = () => {
    if (validateResolutions(tempResolutions)) {
      setResolutions(tempResolutions);
      window.electronAPI.updateResolutions(tempResolutions);
      window.electronAPI.closeModal();
    }
  };

  const handleCloseModal = () => {
    window.electronAPI.closeModal();
  };

  return (
    <div className="modal-setting">
      <div className="content">
        <h1 className="title">Resolution Settings</h1>
        {['desktop', 'tablet', 'mobile'].map((device) => (
          <div className="box-setting" key={device}>
            <h2 className="title-resolution">
              {device.charAt(0).toUpperCase() + device.slice(1)}
            </h2>
            <div className="input-group">
              <div className="box-input">
                <label htmlFor={`${device}-width`} className="label-setting">
                  Width
                </label>
                <input
                  type="text"
                  className="input-setting"
                  id={`${device}-width`}
                  value={tempResolutions[device].width}
                  onChange={(e) =>
                    handleResolutionChange(device, 'width', e.target.value)
                  }
                />
                {errors[device].width && (
                  <div className="error-message">{errors[device].width}</div>
                )}
                <div className="range-info">
                  (최소: {ranges[device].min.width}px, 최대:{' '}
                  {ranges[device].max.width}px)
                </div>
              </div>
              <div className="box-input">
                <label htmlFor={`${device}-height`} className="label-setting">
                  Height
                </label>
                <input
                  type="text"
                  className="input-setting"
                  id={`${device}-height`}
                  value={tempResolutions[device].height}
                  onChange={(e) =>
                    handleResolutionChange(device, 'height', e.target.value)
                  }
                />
                {errors[device].height && (
                  <div className="error-message">{errors[device].height}</div>
                )}
                <div className="range-info">
                  (최소: {ranges[device].min.height}px, 최대:{' '}
                  {ranges[device].max.height}px)
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="box-buttons">
        <button
          type="button"
          className="button-save"
          onClick={handleSaveResolutions}
        >
          Save
        </button>
        <button
          type="button"
          className="button-close"
          onClick={handleCloseModal}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default Modal;
