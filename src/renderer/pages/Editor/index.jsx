import React, { useEffect, useState } from 'react';
import useStyleStore from '../../store/styleStore';

import EditorButton from '../../components/EditorButton';
import FontArea from './FontArea';
import TextArea from './TextArea';
import BackgroundArea from './BackgroundArea';
import DimensionsArea from './DimensionsArea';
import SpacingArea from './SpacingArea';
import BorderArea from './BorderArea';

import EDITOR_CATEGORY from '../../constants/editor';
import { BORDER_PROPERTIES } from '../../constants/border';

import iconDownload from '../../assets/icons/icon-download.png';

import './style.scss';

function Editor() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedElement, setSelectedElement] = useState(null);
  const getStylesDocument = useStyleStore((state) => state.getStylesDocument);

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

  const renderBadge = (elementPath, area) => {
    const { modifiedElements } = useStyleStore.getState();

    if (
      !modifiedElements[elementPath] ||
      !modifiedElements[elementPath][area]
    ) {
      return null;
    }

    const modifications = modifiedElements[elementPath][area];
    const groupKeys = BORDER_PROPERTIES;
    const groupCount = new Set();

    Object.keys(groupKeys).forEach((groupKey) => {
      if (groupKeys[groupKey].some((prop) => modifications[prop])) {
        groupCount.add(groupKey);
      }
    });

    Object.keys(modifications).forEach((prop) => {
      if (
        !Object.values(groupKeys).flat().includes(prop) &&
        prop !== 'groupProperties'
      ) {
        groupCount.add(prop);
      }
    });

    const count = groupCount.size;

    return count > 0 ? <span className="badge">{count}</span> : null;
  };

  const handleDownload = () => {
    const document = getStylesDocument();
    window.electronAPI.saveDocument(document);
  };

  const editorComponents = {
    font: (
      <FontArea
        selectedElement={selectedElement}
        onBack={() => setSelectedCategory(null)}
      />
    ),
    text: (
      <TextArea
        selectedElement={selectedElement}
        onBack={() => setSelectedCategory(null)}
      />
    ),
    background: (
      <BackgroundArea
        selectedElement={selectedElement}
        onBack={() => setSelectedCategory(null)}
      />
    ),
    dimensions: (
      <DimensionsArea
        selectedElement={selectedElement}
        onBack={() => setSelectedCategory(null)}
      />
    ),
    spacing: (
      <SpacingArea
        selectedElement={selectedElement}
        onBack={() => setSelectedCategory(null)}
      />
    ),
    border: (
      <BorderArea
        selectedElement={selectedElement}
        onBack={() => setSelectedCategory(null)}
      />
    ),
  };

  return (
    <div className="page-editor">
      {!selectedCategory ? (
        <>
          {EDITOR_CATEGORY.map((category) => (
            <div key={category.id} className="button-editor-box">
              <EditorButton
                text={category.name}
                onClick={() => handleCategoryClick(category.id)}
              />
              {selectedElement &&
                renderBadge(selectedElement.xPath, category.id)}
            </div>
          ))}
          <div className="button-container">
            <button
              type="button"
              className="button-download-modified"
              onClick={handleDownload}
            >
              <img src={iconDownload} alt="Download Modified Styles" />
            </button>
            <div className="tooltip">Download Modified Styles</div>
          </div>
        </>
      ) : (
        editorComponents[selectedCategory]
      )}
    </div>
  );
}

export default Editor;
