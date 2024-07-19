import React, { useState, useEffect } from 'react';
import './style.scss';

function EditorUnitInput({ id, label, unit, value, onChange }) {
  const [internalValue, setInternalValue] = useState(value);

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  const handleInputChange = (e) => {
    let val = e.target.value.replace(/[^0-9.]/g, '');
    if ((val.match(/\./g) || []).length > 1) {
      val = val.slice(0, val.length - 1);
    }
    setInternalValue(val);
  };

  const handleKeyDown = (e) => {
    const val = parseFloat(internalValue.replace(/[^0-9.]/g, '')) || 0;
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const newValue = `${(val + 1).toFixed(2)}${unit}`;
      setInternalValue(newValue);
      onChange(newValue);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const newValue = `${(val - 1).toFixed(2)}${unit}`;
      setInternalValue(newValue);
      onChange(newValue);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const newValue = `${val.toFixed(2)}${unit}`;
      setInternalValue(newValue);
      onChange(newValue);
    }
  };

  const handleBlur = () => {
    const val = parseFloat(internalValue.replace(/[^0-9.]/g, '')) || 0;
    const newValue = `${val.toFixed(2)}${unit}`;
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
