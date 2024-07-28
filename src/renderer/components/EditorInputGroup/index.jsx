import React from 'react';

import './style.scss';

function EditorInputGroup({ value, onChange }) {
  const getNumericValue = (inputValue) => parseFloat(inputValue) || 0;
  const getUnit = (inputValue) =>
    inputValue.replace(getNumericValue(inputValue), '') || 'px';

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    const unit = getUnit(value);
    onChange(`${newValue}${unit}`);
  };

  const handleRangeChange = (e) => {
    const numericValue = e.target.value;
    const unit = getUnit(value);
    onChange(`${numericValue}${unit}`);
  };

  const handleIncrement = () => {
    const numericValue = getNumericValue(value);
    const unit = getUnit(value);
    onChange(`${numericValue + 1}${unit}`);
  };

  const handleDecrement = () => {
    const numericValue = getNumericValue(value);
    const unit = getUnit(value);
    onChange(`${numericValue - 1}${unit}`);
  };

  return (
    <div className="input-group">
      <input
        type="range"
        className="input-range"
        min="0"
        max="100"
        value={getNumericValue(value)}
        onChange={handleRangeChange}
      />
      <input
        type="text"
        className="input-text"
        value={value}
        onChange={handleInputChange}
      />
      <div className="box-buttons">
        <button type="button" onClick={handleIncrement}>
          +
        </button>
        <button type="button" onClick={handleDecrement}>
          -
        </button>
      </div>
    </div>
  );
}

export default EditorInputGroup;
