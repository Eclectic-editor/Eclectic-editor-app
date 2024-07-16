import React from 'react';

import EditorButton from '../../components/EditorButton';

import './style.scss';

function SpacingArea({ onBack }) {
  return <EditorButton text="Spacing" isActive onClick={onBack} />;
}

export default SpacingArea;
