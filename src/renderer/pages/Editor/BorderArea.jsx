import React from 'react';

import EditorButton from '../../components/EditorButton';

import './style.scss';

function BorderArea({ onBack }) {
  return <EditorButton text="Border" isActive onClick={onBack} />;
}

export default BorderArea;
