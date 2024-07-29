import React, { useState } from 'react';
import { ColorPicker, useColor } from 'react-color-palette';

import { convertColorFormat, formatRgba } from '../../utils/styleUtils';

import 'react-color-palette/dist/css/rcp.css';
import './style.scss';

function EditorColorInput({ id, label, value, onChange }) {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [color, setColor] = useColor(convertColorFormat(value));
  const [initialValue, setInitialValue] = useState(value);

  const handleClick = () => {
    setInitialValue(color);
    setDisplayColorPicker(true);
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  const handleCancel = () => {
    const formattedColor = formatRgba(initialValue.rgb);
    onChange(formattedColor);
    setDisplayColorPicker(false);
  };

  const handleColorChange = (newColor) => {
    setColor(newColor);
    const formattedColor = formatRgba(newColor.rgb);
    onChange(formattedColor);
  };

  return (
    <div className="editor-color-input">
      <label htmlFor={id} className="blind">
        {label}
      </label>
      <div className="color-input-wrapper">
        <input
          type="text"
          value={value}
          id={id}
          className="box-input"
          readOnly
          onClick={handleClick}
        />
        <div
          className="color-swatch"
          style={{ backgroundColor: value }}
          onClick={handleClick}
        />
        {displayColorPicker && (
          <div className="popup-color">
            <ColorPicker
              height={150}
              color={color}
              onChange={handleColorChange}
              hideInput={['hsv']}
            />
            <div className="popup-color-button">
              <button type="button" onClick={handleCancel}>
                Cancel
              </button>
              <button type="button" onClick={handleClose}>
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
