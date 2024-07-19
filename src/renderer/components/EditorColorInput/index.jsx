import React, { useState } from 'react';
import { ColorPicker, useColor } from 'react-color-palette';

import { convertColorFormat } from '../../utils/styleUtils';

import 'react-color-palette/dist/css/rcp.css';
import './style.scss';

function EditorColorInput({ id, label, value, onChange }) {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [color, setColor] = useColor(convertColorFormat(value));

  const handleClick = () => {
    setDisplayColorPicker(true);
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  const handleSubmit = () => {
    const rgba = color.rgb;
    let formattedColor;

    if (rgba.a === 1) {
      formattedColor = `rgb(${Math.trunc(rgba.r)}, ${Math.trunc(rgba.g)}, ${Math.trunc(rgba.b)})`;
    } else {
      formattedColor = `rgba(${Math.trunc(rgba.r)}, ${Math.trunc(rgba.g)}, ${Math.trunc(rgba.b)}, ${Math.trunc(rgba.a)})`;
    }

    onChange(formattedColor);
    setDisplayColorPicker(false);
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
              onChange={setColor}
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
