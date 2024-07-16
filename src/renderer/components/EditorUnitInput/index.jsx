import React, { useState, useEffect } from 'react';

import './style.scss';

function EditorUnitInput({ id, label, unit, value, onChange }) {
  const [internalValue, setInternalValue] = useState(value);

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  const handleInputChange = (e) => {
    const val = e.target.value.replace(/[^0-9]/g, '');
    setInternalValue(val);
  };

  const handleKeyDown = (e) => {
    const val = parseInt(internalValue.replace(/[^0-9]/g, ''), 10) || 0;
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const newValue = `${val + 1}${unit}`;
      setInternalValue(newValue);
      onChange(newValue);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const newValue = `${val - 1}${unit}`;
      setInternalValue(newValue);
      onChange(newValue);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const newValue = `${val}${unit}`;
      setInternalValue(newValue);
      onChange(newValue);
    }
  };

  const handleBlur = () => {
    const val = parseInt(internalValue.replace(/[^0-9]/g, ''), 10) || 0;
    const newValue = `${val}${unit}`;
    setInternalValue(newValue);
    onChange(newValue);
  };

  return (
    <div className="editor-input">
      <label htmlFor={id} className="blind">
        {label}
      </label>
      <input
        type="text"
        value={internalValue}
        id={id}
        className="box-input"
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
      />
    </div>
  );
}

export default EditorUnitInput;
