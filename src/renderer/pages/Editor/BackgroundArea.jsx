import React, { useState, useEffect } from 'react';

import EditorButton from '../../components/EditorButton';
import EditorSection from '../../components/EditorSection';
import EditorTitle from '../../components/EditorTitle';
import EditorColorInput from '../../components/EditorColorInput';
import EditorPositionSelector from '../../components/EditorPositionSelector';

import { camelToKebabCase } from '../../utils/styleUtils';

import './style.scss';

function BackgroundArea({ onBack, selectedElement }) {
  const [backgroundColor, setBackgroundColor] = useState('rgb(255, 255, 255)');
  const [backgroundPosition, setBackgroundPosition] = useState('left top');

  useEffect(() => {
    if (selectedElement) {
      const {
        backgroundColor: selectedBackgroundColor,
        backgroundPosition: selectedBackgroundPosition,
      } = selectedElement.style;

      setBackgroundColor(selectedBackgroundColor || 'rgb(255, 255, 255)');
      setBackgroundPosition(selectedBackgroundPosition || 'left top');
    }
  }, [selectedElement]);

  const applyStyle = (css) => {
    if (selectedElement) {
      window.electronAPI.applyStyle({
        xPath: selectedElement.xPath,
        cssText: css,
      });
    }
  };

  const handleStyleChange = (property, value) => {
    switch (property) {
      case 'backgroundColor':
        setBackgroundColor(value);
        break;
      case 'backgroundPosition':
        setBackgroundPosition(value);
        break;
      default:
        break;
    }
    applyStyle(`${camelToKebabCase(property)}: ${value}`);
  };

  return (
    <>
      <EditorButton text="Background" isActive onClick={onBack} />
      <article className="content-editor">
        <EditorSection>
          <EditorTitle title="Background Color" />
          <EditorColorInput
            id="background-color"
            label="Background Color"
            value={backgroundColor}
            onChange={(value) => handleStyleChange('backgroundColor', value)}
          />
        </EditorSection>
        <EditorSection>
          <EditorTitle title="Background Position" />
          <EditorPositionSelector
            selectedPosition={backgroundPosition}
            onSelect={(value) => handleStyleChange('backgroundPosition', value)}
          />
        </EditorSection>
      </article>
    </>
  );
}

export default BackgroundArea;
