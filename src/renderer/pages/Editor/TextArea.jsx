import React from 'react';

import EditorButton from '../../components/EditorButton';

import './style.scss';

function TextArea({ onBack }) {
  return <EditorButton text="Text" isActive onClick={onBack} />;
}

export default TextArea;
