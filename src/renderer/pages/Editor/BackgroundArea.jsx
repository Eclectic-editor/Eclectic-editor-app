import React, { useState, useEffect } from 'react';

import EditorButton from '../../components/EditorButton';
import EditorSection from '../../components/EditorSection';
import EditorTitle from '../../components/EditorTitle';
import EditorColorInput from '../../components/EditorColorInput';
import EditorPositionSelector from '../../components/EditorPositionSelector';
import EditorImageInput from '../../components/EditorImageInput';

import './style.scss';

function BackgroundArea({ onBack, selectedElement }) {
  const [backgroundColor, setBackgroundColor] = useState('rgb(255, 255, 255)');
  const [backgroundPosition, setBackgroundPosition] = useState('left top');
  const [backgroundImage, setBackgroundImage] = useState('');

  useEffect(() => {
    if (selectedElement) {
      const {
        backgroundColor: selectedBackgroundColor,
        backgroundPosition: selectedBackgroundPosition,
        backgroundImage: selectedBackgroundImage,
      } = selectedElement.style;

      setBackgroundColor(selectedBackgroundColor || 'rgb(255, 255, 255)');
      setBackgroundPosition(selectedBackgroundPosition || 'left top');

      if (selectedBackgroundImage) {
        let cleanedImage = selectedBackgroundImage.trim();

        if (cleanedImage.startsWith('url(') && cleanedImage.endsWith(')')) {
          cleanedImage = cleanedImage.slice(4, -1);

          if (
            (cleanedImage.startsWith('"') && cleanedImage.endsWith('"')) ||
            (cleanedImage.startsWith("'") && cleanedImage.endsWith("'"))
          ) {
            cleanedImage = cleanedImage.slice(1, -1);
          }
        }

        if (cleanedImage === 'none' || cleanedImage === '(unknown)') {
          setBackgroundImage('');
        } else {
          setBackgroundImage(cleanedImage);
        }
      } else {
        setBackgroundImage('');
      }
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
        applyStyle(`background-color: ${value}`);
        break;
      case 'backgroundPosition':
        setBackgroundPosition(value);
        applyStyle(`background-position: ${value}`);
        break;
      case 'backgroundImage':
        if (value === null || value === '') {
          setBackgroundImage('');
          applyStyle('background-image: none');
        } else {
          setBackgroundImage(value);
          const imageValue = `url("${value}")`;
          applyStyle(`background-image: ${imageValue}`);
        }
        break;
      default:
        break;
    }
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
        <EditorSection>
          <EditorTitle title="Background Image" />
          <EditorImageInput
            id="background-image"
            label="Background Image"
            value={backgroundImage}
            onImageChange={(value) =>
              handleStyleChange('backgroundImage', value)
            }
          />
        </EditorSection>
      </article>
    </>
  );
}

export default BackgroundArea;
