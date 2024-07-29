import React from 'react';

import './style.scss';

function EditorOptionSelection({ options, selectedOption, setSelectedOption }) {
  return (
    <div className="editor-option-selection">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          className={selectedOption === option ? 'is-active' : ''}
          onClick={() => setSelectedOption(option)}
        >
          {option.charAt(0).toUpperCase() + option.slice(1)}
        </button>
      ))}
    </div>
  );
}

export default EditorOptionSelection;
