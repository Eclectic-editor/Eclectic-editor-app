import React, { useState, useEffect } from 'react';

import './style.scss';

function EditorInput({ id, label, value, onChange }) {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleBlur = () => {
    onChange(inputValue);
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onChange(inputValue);
    }
  };

  return (
    <div className="editor-input">
      <label htmlFor={id} className="blind">
        {label}
      </label>
      <input
        type="text"
        value={inputValue}
        id={id}
        className="box-input"
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}

export default EditorInput;
