import React, { useState, useEffect } from 'react';
import useStyleStore from '../../store/styleStore';

import EditorButton from '../../components/EditorButton';
import EditorSection from '../../components/EditorSection';
import EditorTitle from '../../components/EditorTitle';
import EditorColorInput from '../../components/EditorColorInput';
import EditorPositionSelector from '../../components/EditorPositionSelector';
import EditorImageInput from '../../components/EditorImageInput';
import EditorDropdown from '../../components/EditorDropdown';
import EditorInput from '../../components/EditorInput';

import {
  BACKGROUND_REPEAT_OPTIONS,
  BACKGROUND_ATTACHMENT_OPTIONS,
  BACKGROUND_ORIGIN_OPTIONS,
  BACKGROUND_CLIP_OPTIONS,
} from '../../constants/background';
import isStyleModified from '../../utils/ElementUtils';

import './style.scss';

function BackgroundArea({ onBack, selectedElement }) {
  const [backgroundColor, setBackgroundColor] = useState('rgb(255, 255, 255)');
  const [backgroundPosition, setBackgroundPosition] = useState('left top');
  const [backgroundImage, setBackgroundImage] = useState('');
  const [backgroundRepeat, setBackgroundRepeat] = useState('repeat');
  const [backgroundAttachment, setBackgroundAttachment] = useState('scroll');
  const [backgroundSize, setBackgroundSize] = useState('auto');
  const [backgroundOrigin, setBackgroundOrigin] = useState('padding-box');
  const [backgroundClip, setBackgroundClip] = useState('border-box');
  const addModification = useStyleStore((state) => state.addModification);
  const modifiedElements = useStyleStore((state) => state.modifiedElements);
  const BACKGROUND_AREA = 'background';

  useEffect(() => {
    if (selectedElement) {
      const {
        backgroundColor: selectedBackgroundColor,
        backgroundImage: selectedBackgroundImage,
        backgroundPosition: selectedBackgroundPosition,
        backgroundRepeat: selectedBackgroundRepeat,
        backgroundAttachment: selectedBackgroundAttachment,
        backgroundSize: selectedBackgroundSize,
        backgroundOrigin: selectedBackgroundOrigin,
        backgroundClip: selectedBackgroundClip,
      } = selectedElement.style;

      setBackgroundColor(selectedBackgroundColor || 'rgb(255, 255, 255)');
      setBackgroundPosition(selectedBackgroundPosition || 'left top');
      setBackgroundRepeat(selectedBackgroundRepeat || 'repeat');
      setBackgroundAttachment(selectedBackgroundAttachment || 'scroll');
      setBackgroundSize(selectedBackgroundSize || 'auto');
      setBackgroundOrigin(selectedBackgroundOrigin || 'padding-box');
      setBackgroundClip(selectedBackgroundClip || 'border-box');

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

  const handleStyleChange = (property, value) => {
    let css = '';

    switch (property) {
      case 'backgroundColor':
        setBackgroundColor(value);
        css = `background-color: ${value}`;
        break;
      case 'backgroundImage':
        if (value === null || value === '') {
          setBackgroundImage('');
          css = 'background-image: none';
        } else {
          setBackgroundImage(value);
          const imageValue = `url("${value}")`;
          css = `background-image: ${imageValue}`;
        }
        break;
      case 'backgroundPosition':
        setBackgroundPosition(value);
        css = `background-position: ${value}`;
        break;
      case 'backgroundRepeat':
        setBackgroundRepeat(value);
        css = `background-repeat: ${value}`;
        break;
      case 'backgroundAttachment':
        setBackgroundAttachment(value);
        css = `background-attachment: ${value}`;
        break;
      case 'backgroundSize':
        setBackgroundSize(value);
        css = `background-size: ${value}`;
        break;
      case 'backgroundOrigin':
        setBackgroundOrigin(value);
        css = `background-origin: ${value}`;
        break;
      case 'backgroundClip':
        setBackgroundClip(value);
        css = `background-clip: ${value}`;
        break;
      default:
        break;
    }

    if (selectedElement) {
      addModification(
        selectedElement.xPath,
        BACKGROUND_AREA,
        property,
        value,
        selectedElement.friendlyIdentifier,
      );

      window.electronAPI.applyStyle({
        xPath: selectedElement.xPath,
        cssText: css,
      });
    }
  };

  return (
    <div className="editor-container">
      <EditorButton text="Background" isActive onClick={onBack} />
      <article className="content-editor">
        <EditorSection>
          <EditorTitle
            title="Background Color"
            isActive={isStyleModified(
              'backgroundColor',
              selectedElement,
              modifiedElements,
              BACKGROUND_AREA,
            )}
          />
          <EditorColorInput
            id="background-color"
            label="Background Color"
            value={backgroundColor}
            onChange={(value) => handleStyleChange('backgroundColor', value)}
          />
        </EditorSection>
        <EditorSection>
          <EditorTitle
            title="Background Image"
            isActive={isStyleModified(
              'backgroundImage',
              selectedElement,
              modifiedElements,
              BACKGROUND_AREA,
            )}
          />
          <EditorImageInput
            id="background-image"
            label="Background Image"
            value={backgroundImage}
            onImageChange={(value) =>
              handleStyleChange('backgroundImage', value)
            }
          />
        </EditorSection>
        <EditorSection>
          <EditorTitle
            title="Background Position"
            isActive={isStyleModified(
              'backgroundPosition',
              selectedElement,
              modifiedElements,
              BACKGROUND_AREA,
            )}
          />
          <EditorPositionSelector
            selectedPosition={backgroundPosition}
            onSelect={(value) => handleStyleChange('backgroundPosition', value)}
          />
        </EditorSection>
        <EditorSection>
          <EditorTitle
            title="Background Repeat"
            isActive={isStyleModified(
              'backgroundRepeat',
              selectedElement,
              modifiedElements,
              BACKGROUND_AREA,
            )}
          />
          <EditorDropdown
            defaultText={backgroundRepeat}
            items={BACKGROUND_REPEAT_OPTIONS}
            onSelect={(value) => handleStyleChange('backgroundRepeat', value)}
          />
        </EditorSection>
        <EditorSection>
          <EditorTitle
            title="Background Attachment"
            isActive={isStyleModified(
              'backgroundAttachment',
              selectedElement,
              modifiedElements,
              BACKGROUND_AREA,
            )}
          />
          <EditorDropdown
            defaultText={backgroundAttachment}
            items={BACKGROUND_ATTACHMENT_OPTIONS}
            onSelect={(value) =>
              handleStyleChange('backgroundAttachment', value)
            }
          />
        </EditorSection>
        <EditorSection>
          <EditorTitle
            title="Background Size"
            isActive={isStyleModified(
              'backgroundSize',
              selectedElement,
              modifiedElements,
              BACKGROUND_AREA,
            )}
          />
          <EditorInput
            id="background-size-custom"
            label="Background Size Custom"
            value={backgroundSize}
            onChange={(value) => handleStyleChange('backgroundSize', value)}
          />
        </EditorSection>
        <EditorSection>
          <EditorTitle
            title="Background Origin"
            isActive={isStyleModified(
              'backgroundOrigin',
              selectedElement,
              modifiedElements,
              BACKGROUND_AREA,
            )}
          />
          <EditorDropdown
            defaultText={backgroundOrigin}
            items={BACKGROUND_ORIGIN_OPTIONS}
            onSelect={(value) => handleStyleChange('backgroundOrigin', value)}
          />
        </EditorSection>
        <EditorSection>
          <EditorTitle
            title="Background Clip"
            isActive={isStyleModified(
              'backgroundClip',
              selectedElement,
              modifiedElements,
              BACKGROUND_AREA,
            )}
          />
          <EditorDropdown
            defaultText={backgroundClip}
            items={BACKGROUND_CLIP_OPTIONS}
            onSelect={(value) => handleStyleChange('backgroundClip', value)}
          />
        </EditorSection>
      </article>
    </div>
  );
}

export default BackgroundArea;
