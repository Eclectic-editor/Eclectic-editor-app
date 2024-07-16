import React from 'react';

import EditorButton from '../../components/EditorButton';

import './style.scss';

function DimensionsArea({ onBack }) {
  return <EditorButton text="Dimensions" isActive onClick={onBack} />;
}

export default DimensionsArea;
