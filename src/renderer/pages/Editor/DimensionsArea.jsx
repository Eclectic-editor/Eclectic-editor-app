import React, { useEffect, useState } from 'react';
import useStyleStore from '../../store/styleStore';

import EditorButton from '../../components/EditorButton';
import EditorSection from '../../components/EditorSection';
import EditorTitle from '../../components/EditorTitle';
import EditorInputWithButtons from '../../components/EditorInputWithButtons';

import { camelToKebabCase } from '../../utils/styleUtils';
import isStyleModified from '../../utils/ElementUtils';

import './style.scss';

function DimensionsArea({ onBack, selectedElement }) {
  const [width, setWidth] = useState('0px');
  const [height, setHeight] = useState('0px');
  const [maxWidth, setMaxWidth] = useState('none');
  const [minWidth, setMinWidth] = useState('0px');
  const [maxHeight, setMaxHeight] = useState('none');
  const [minHeight, setMinHeight] = useState('0px');
  const addModification = useStyleStore((state) => state.addModification);
  const modifiedElements = useStyleStore((state) => state.modifiedElements);
  const DIMENSIONS_AREA = 'dimensions';

  useEffect(() => {
    if (selectedElement) {
      const {
        width: selectedWidth,
        height: selectedHeight,
        maxWidth: selectedMaxWidth,
        minWidth: selectedMinWidth,
        maxHeight: selectedMaxHeight,
        minHeight: selectedMinHeight,
      } = selectedElement.style;

      setWidth(selectedWidth || '0px');
      setHeight(selectedHeight || '0px');
      setMaxWidth(selectedMaxWidth || 'none');
      setMinWidth(selectedMinWidth || '0px');
      setMaxHeight(selectedMaxHeight || 'none');
      setMinHeight(selectedMinHeight || '0px');
    }
  }, [selectedElement]);

  const handleStyleChange = (property, value) => {
    switch (property) {
      case 'width':
        setWidth(value);
        break;
      case 'height':
        setHeight(value);
        break;
      case 'maxWidth':
        setMaxWidth(value);
        break;
      case 'minWidth':
        setMinWidth(value);
        break;
      case 'maxHeight':
        setMaxHeight(value);
        break;

      case 'minHeight':
        setMinHeight(value);
        break;
      default:
        break;
    }

    if (selectedElement) {
      addModification(
        selectedElement.xPath,
        DIMENSIONS_AREA,
        property,
        value,
        selectedElement.friendlyIdentifier,
      );

      window.electronAPI.applyStyle({
        xPath: selectedElement.xPath,
        cssText: `${camelToKebabCase(property)}: ${value}`,
      });
    }
  };

  return (
    <div className="editor-container">
      <EditorButton text="Dimensions" isActive onClick={onBack} />
      <article className="content-editor">
        <EditorSection>
          <EditorTitle
            title="Width"
            isActive={isStyleModified(
              'width',
              selectedElement,
              modifiedElements,
              DIMENSIONS_AREA,
            )}
          />
          <EditorInputWithButtons
            value={width}
            onChange={(value) => handleStyleChange('width', value)}
          />
        </EditorSection>
        <EditorSection>
          <EditorTitle
            title="Height"
            isActive={isStyleModified(
              'height',
              selectedElement,
              modifiedElements,
              DIMENSIONS_AREA,
            )}
          />
          <EditorInputWithButtons
            value={height}
            onChange={(value) => handleStyleChange('height', value)}
          />
        </EditorSection>
        <EditorSection>
          <EditorTitle
            title="Max Width"
            isActive={isStyleModified(
              'maxWidth',
              selectedElement,
              modifiedElements,
              DIMENSIONS_AREA,
            )}
          />
          <EditorInputWithButtons
            value={maxWidth}
            onChange={(value) => handleStyleChange('maxWidth', value)}
          />
        </EditorSection>
        <EditorSection>
          <EditorTitle
            title="Min Width"
            isActive={isStyleModified(
              'minWidth',
              selectedElement,
              modifiedElements,
              DIMENSIONS_AREA,
            )}
          />
          <EditorInputWithButtons
            value={minWidth}
            onChange={(value) => handleStyleChange('minWidth', value)}
          />
        </EditorSection>
        <EditorSection>
          <EditorTitle
            title="Max Height"
            isActive={isStyleModified(
              'maxHeight',
              selectedElement,
              modifiedElements,
              DIMENSIONS_AREA,
            )}
          />
          <EditorInputWithButtons
            value={maxHeight}
            onChange={(value) => handleStyleChange('maxHeight', value)}
          />
        </EditorSection>

        <EditorSection>
          <EditorTitle
            title="Min Height"
            isActive={isStyleModified(
              'minHeight',
              selectedElement,
              modifiedElements,
              DIMENSIONS_AREA,
            )}
          />
          <EditorInputWithButtons
            value={minHeight}
            onChange={(value) => handleStyleChange('minHeight', value)}
          />
        </EditorSection>
      </article>
    </div>
  );
}

export default DimensionsArea;
