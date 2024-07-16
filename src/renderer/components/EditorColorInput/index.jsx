import React, { useState } from 'react';
import { ColorPicker, useColor } from 'react-color-palette';

import 'react-color-palette/dist/css/rcp.css';
import './style.scss';

function EditorColorInput({ id, label, value, onChange }) {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [color, setColor] = useColor('rgba', value);
  const [tempColor, setTempColor] = useState(color);

  const handleClick = () => {
    setTempColor(color);
    setDisplayColorPicker(true);
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  const handleSubmit = () => {
    setColor(tempColor);
    onChange(tempColor);
    setDisplayColorPicker(false);
  };

  const handleChange = (newColor) => {
    setTempColor(newColor);
  };

  const formatRgba = (rgba) => {
    const r = Math.round(rgba.r);
    const g = Math.round(rgba.g);
    const b = Math.round(rgba.b);
    const a = rgba.a === 1 ? '1' : rgba.a.toFixed(1);
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  };

  return (
    <div className="editor-color-input">
      <label htmlFor={id} className="blind">
        {label}
      </label>
      <div className="color-input-wrapper">
        <input
          type="text"
          value={formatRgba(color.rgb)}
          id={id}
          className="box-input"
          readOnly
          onClick={handleClick}
        />
        <div
          className="color-swatch"
          style={{ backgroundColor: formatRgba(color.rgb) }}
          onClick={handleClick}
        />
        {displayColorPicker && (
          <div className="popup-color">
            <ColorPicker
              height={150}
              color={tempColor}
              onChange={handleChange}
              hideInput={['hsv']}
            />
            <div className="popup-color-button">
              <button type="button" onClick={handleClose}>
                Cancel
              </button>
              <button type="button" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default EditorColorInput;
