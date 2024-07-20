import React, { useState, useEffect } from 'react';

import EditorButton from '../../components/EditorButton';
import EditorSection from '../../components/EditorSection';
import EditorTitle from '../../components/EditorTitle';
import EditorDropdown from '../../components/EditorDropdown';
import EditorColorInput from '../../components/EditorColorInput';
import EditorUnitInput from '../../components/EditorUnitInput';

import {
  FONT_FAMILY_ITEMS,
  FONT_WEIGHT_ITEMS,
  FONT_STYLE_ITEMS,
  FONT_VARIANT_ITEMS,
  TEXT_DECORATION_ITEMS,
} from '../../constants/fonts';
import {
  cleanFontFamily,
  toFixedTwo,
  camelToKebabCase,
} from '../../utils/styleUtils';

import './style.scss';

function FontArea({ onBack, selectedElement }) {
  const [fontFamily, setFontFamily] = useState('Arial');
  const [color, setColor] = useState('rgb(255, 255, 255)');
  const [fontSize, setFontSize] = useState('17px');
  const [lineHeight, setLineHeight] = useState('24px');
  const [fontWeight, setFontWeight] = useState('normal');
  const [fontStyle, setFontStyle] = useState('normal');
  const [fontVariant, setFontVariant] = useState('normal');
  const [textDecoration, setTextDecoration] = useState('none');

  useEffect(() => {
    if (selectedElement) {
      const {
        fontFamily: selectedFontFamily,
        color: selectedColor,
        fontSize: selectedFontSize,
        lineHeight: selectedLineHeight,
        fontWeight: selectedFontWeight,
        fontStyle: selectedFontStyle,
        fontVariant: selectedFontVariant,
        textDecorationLine: selectedTextDecoration,
      } = selectedElement.style;

      setFontFamily(cleanFontFamily(selectedFontFamily) || 'Arial');
      setColor(selectedColor || 'rgb(255, 255, 255)');
      setFontSize(toFixedTwo(selectedFontSize) || '17px');
      setLineHeight(toFixedTwo(selectedLineHeight) || '24px');
      setFontWeight(selectedFontWeight || 'normal');
      setFontStyle(selectedFontStyle || 'normal');
      setFontVariant(selectedFontVariant || 'normal');
      setTextDecoration(selectedTextDecoration || 'none');
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
      case 'fontFamily':
        setFontFamily(value);
        break;
      case 'color':
        setColor(value);
        break;
      case 'fontSize':
        setFontSize(value);
        break;
      case 'lineHeight':
        setLineHeight(value);
        break;
      case 'fontWeight':
        setFontWeight(value);
        break;
      case 'fontStyle':
        setFontStyle(value);
        break;
      case 'fontVariant':
        setFontVariant(value);
        break;
      case 'textDecoration':
        setTextDecoration(value);
        break;
      default:
        break;
    }
    applyStyle(`${camelToKebabCase(property)}: ${value}`);
  };

  return (
    <>
      <EditorButton text="Font" isActive onClick={onBack} />
      <article className="content-editor">
        <EditorSection>
          <EditorTitle title="Font Family" />
          <EditorDropdown
            defaultText={fontFamily}
            items={FONT_FAMILY_ITEMS}
            onSelect={(value) => handleStyleChange('fontFamily', value)}
          />
        </EditorSection>
        <EditorSection>
          <EditorTitle title="Color" />
          <EditorColorInput
            id="font-color"
            label="Color"
            value={color}
            onChange={(value) => handleStyleChange('color', value)}
          />
        </EditorSection>
        <EditorSection>
          <EditorTitle title="Font Size (px)" />
          <EditorUnitInput
            id="font-size"
            label="Font Size (px)"
            unit="px"
            value={fontSize}
            onChange={(value) => handleStyleChange('fontSize', value)}
          />
        </EditorSection>
        <EditorSection>
          <EditorTitle title="Line Height (px)" />
          <EditorUnitInput
            id="line-height"
            label="Line Height (px)"
            unit="px"
            value={lineHeight}
            onChange={(value) => handleStyleChange('lineHeight', value)}
          />
        </EditorSection>
        <EditorSection>
          <EditorTitle title="Font Weight" />
          <EditorDropdown
            defaultText={fontWeight}
            items={FONT_WEIGHT_ITEMS}
            onSelect={(value) => handleStyleChange('fontWeight', value)}
          />
        </EditorSection>
        <EditorSection>
          <EditorTitle title="Font Style" />
          <EditorDropdown
            defaultText={fontStyle}
            items={FONT_STYLE_ITEMS}
            onSelect={(value) => handleStyleChange('fontStyle', value)}
          />
        </EditorSection>
        <EditorSection>
          <EditorTitle title="Font Variant" />
          <EditorDropdown
            defaultText={fontVariant}
            items={FONT_VARIANT_ITEMS}
            onSelect={(value) => handleStyleChange('fontVariant', value)}
          />
        </EditorSection>
        <EditorSection>
          <EditorTitle title="Text Decoration" />
          <EditorDropdown
            defaultText={textDecoration}
            items={TEXT_DECORATION_ITEMS}
            onSelect={(value) => handleStyleChange('textDecoration', value)}
          />
        </EditorSection>
      </article>
    </>
  );
}

export default FontArea;
