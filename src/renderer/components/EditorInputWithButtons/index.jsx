import React from 'react';

import { getUnit, getNumericValue } from '../../utils/styleUtils';

import './style.scss';

function EditorInputWithButtons({ value, onChange }) {
  const handleInputChange = (e) => {
    const newValue = e.target.value;
    onChange(newValue);
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

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      handleIncrement();
      e.preventDefault();
    } else if (e.key === 'ArrowDown') {
      handleDecrement();
      e.preventDefault();
    }
  };

  return (
    <div className="editor-input-with-buttons">
      <input
        type="text"
        className="input-text"
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
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

export default EditorInputWithButtons;
