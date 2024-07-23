import React, { useState, useEffect } from 'react';

import EditorInput from '../EditorInput';

import iconBottomLeft from '../../assets/icons/icon-position-bottom-left.png';
import iconBottomRight from '../../assets/icons/icon-position-bottom-right.png';
import iconTopLeft from '../../assets/icons/icon-position-top-left.png';
import iconTopRight from '../../assets/icons/icon-position-top-right.png';
import iconBottom from '../../assets/icons/icon-position-bottom.png';
import iconTop from '../../assets/icons/icon-position-top.png';
import iconLeft from '../../assets/icons/icon-position-left.png';
import iconRight from '../../assets/icons/icon-position-right.png';
import iconCenter from '../../assets/icons/icon-position-center.png';

import './style.scss';

const positions = [
  { position: 'left top', icon: iconTopLeft, label: 'Top Left' },
  { position: 'center top', icon: iconTop, label: 'Top Center' },
  { position: 'right top', icon: iconTopRight, label: 'Top Right' },
  { position: 'left center', icon: iconLeft, label: 'Center Left' },
  { position: 'center center', icon: iconCenter, label: 'Center' },
  { position: 'right center', icon: iconRight, label: 'Center Right' },
  { position: 'left bottom', icon: iconBottomLeft, label: 'Bottom Left' },
  { position: 'center bottom', icon: iconBottom, label: 'Bottom Center' },
  { position: 'right bottom', icon: iconBottomRight, label: 'Bottom Right' },
];

function EditorPositionSelector({ selectedPosition, onSelect }) {
  const [inputValue, setInputValue] = useState(selectedPosition);

  useEffect(() => {
    setInputValue(selectedPosition);
  }, [selectedPosition]);

  const handleInputChange = (value) => {
    setInputValue(value);
    onSelect(value);
  };

  const handleBlur = () => {
    setInputValue(inputValue);
    onSelect(inputValue);
  };

  const handleButtonClick = (position) => {
    setInputValue(position);
    onSelect(position);
  };

  return (
    <>
      <div className="editor-position-selector">
        {positions.map(({ position, icon, label }) => (
          <div className="tooltip-container" key={position}>
            <button
              type="button"
              className={`position-button ${selectedPosition === position ? 'is-selected' : ''}`}
              onClick={() => handleButtonClick(position)}
            >
              <img src={icon} alt={label} />
            </button>
            <div className="tooltip">{label}</div>
          </div>
        ))}
      </div>
      <div className="box-position-input">
        <strong className="box-position-title">Custom Position</strong>
        <EditorInput
          id="background-position"
          label="Background Position"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleBlur}
        />
      </div>
    </>
  );
}

export default EditorPositionSelector;
