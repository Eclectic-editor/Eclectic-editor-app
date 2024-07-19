import React, { useEffect, useState } from 'react';

import EditorButton from '../../components/EditorButton';
import FontArea from './FontArea';
import TextArea from './TextArea';
import BackgroundArea from './BackgroundArea';
import DimensionsArea from './DimensionsArea';
import SpacingArea from './SpacingArea';
import BorderArea from './BorderArea';

import EDITOR_CATEGORY from '../../constants/editor';

import './style.scss';

function Editor() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedElement, setSelectedElement] = useState(null);

  useEffect(() => {
    const handleElementClicked = (elementInfo) => {
      setSelectedElement(elementInfo);
    };

    window.electronAPI.receive('element-style', handleElementClicked);

    return () => {
      window.electronAPI.removeListener('element-style', handleElementClicked);
    };
  }, []);

  const handleCategoryClick = (id) => {
    setSelectedCategory(id);
  };

  const editorComponents = {
    font: (
      <FontArea
        selectedElement={selectedElement}
        onBack={() => setSelectedCategory(null)}
      />
    ),
    text: <TextArea onBack={() => setSelectedCategory(null)} />,
    background: <BackgroundArea onBack={() => setSelectedCategory(null)} />,
    dimensions: <DimensionsArea onBack={() => setSelectedCategory(null)} />,
    spacing: <SpacingArea onBack={() => setSelectedCategory(null)} />,
    border: <BorderArea onBack={() => setSelectedCategory(null)} />,
  };

  return (
    <div className="page-editor">
      {!selectedCategory
        ? EDITOR_CATEGORY.map((category) => (
            <EditorButton
              key={category.id}
              text={category.name}
              onClick={() => handleCategoryClick(category.id)}
            />
          ))
        : editorComponents[selectedCategory]}
    </div>
  );
}

export default Editor;
