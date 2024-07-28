import React from 'react';

import EditorInputWithButtons from '../EditorInputWithButtons';

import { getUnit, getNumericValue } from '../../utils/styleUtils';

import './style.scss';

function EditorInputGroup({ value, onChange }) {
  const handleInputChange = (newValue) => {
    onChange(newValue);
  };

  const handleRangeChange = (e) => {
    const numericValue = e.target.value;
    const unit = getUnit(value);
    onChange(`${numericValue}${unit}`);
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
      <EditorInputWithButtons value={value} onChange={handleInputChange} />
    </div>
  );
}

export default EditorInputGroup;
