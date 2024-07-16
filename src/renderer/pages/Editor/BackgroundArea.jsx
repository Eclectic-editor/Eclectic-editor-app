import React from 'react';

import EditorButton from '../../components/EditorButton';

import './style.scss';

function BackgroundArea({ onBack }) {
  return <EditorButton text="Background" isActive onClick={onBack} />;
}

export default BackgroundArea;
