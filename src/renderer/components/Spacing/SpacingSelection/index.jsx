import React from 'react';

import './style.scss';

function SpacingSelection({ selectedOption, setSelectedOption }) {
  return (
    <div className="spacing-selection">
      <button
        type="button"
        className={selectedOption === 'individual' ? 'is-active' : ''}
        onClick={() => setSelectedOption('individual')}
      >
        Individual
      </button>
      <button
        type="button"
        className={selectedOption === 'vertical' ? 'is-active' : ''}
        onClick={() => setSelectedOption('vertical')}
      >
        Vertical
      </button>
      <button
        type="button"
        className={selectedOption === 'horizontal' ? 'is-active' : ''}
        onClick={() => setSelectedOption('horizontal')}
      >
        Horizontal
      </button>
      <button
        type="button"
        className={selectedOption === 'all' ? 'is-active' : ''}
        onClick={() => setSelectedOption('all')}
      >
        All
      </button>
    </div>
  );
}

export default SpacingSelection;
