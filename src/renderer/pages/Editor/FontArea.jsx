import React, { useState } from 'react';

import EditorButton from '../../components/EditorButton';
import EditorSection from '../../components/EditorSection';
import EditorTitle from '../../components/EditorTitle';
import EditorDropdown from '../../components/EditorDropdown';
import EditorColorInput from '../../components/EditorColorInput';
import EditorUnitInput from '../../components/EditorUnitInput';

import './style.scss';

function FontArea({ onBack }) {
  const [fontFamily, setFontFamily] = useState('Arial');
  const [color, setColor] = useState({ r: 255, g: 255, b: 255, a: 1 });
  const [fontSize, setFontSize] = useState('17px');
  const [lineHeight, setLineHeight] = useState('24px');
  const [fontStyle, setFontStyle] = useState('normal');
  const [fontVariant, setFontVariant] = useState('normal');
  const [textDecoration, setTextDecoration] = useState('none');

  const fontFamilyItems = [
    'Arial',
    'Verdana',
    'Times New Roman',
    'Noto Sans KR',
  ];
  const fontStyleItems = ['normal', 'italic', 'oblique'];
  const fontVariantItems = ['normal', 'small-caps'];
  const textDecorationItems = ['none', 'underline', 'overline', 'line-through'];

  const handleFontSelect = (selectedFont) => {
    setFontFamily(selectedFont);
  };

  const handleColorChange = (newColor) => {
    setColor(newColor);
  };

  const handleFontSizeChange = (newSize) => {
    setFontSize(newSize);
  };

  const handleLineHeightChange = (newHeight) => {
    setLineHeight(newHeight);
  };

  const handleFontStyleChange = (selectedStyle) => {
    setFontStyle(selectedStyle);
  };

  const handleFontVariantChange = (selectedVariant) => {
    setFontVariant(selectedVariant);
  };

  const handleTextDecorationChange = (selectedDecoration) => {
    setTextDecoration(selectedDecoration);
  };

  return (
    <>
      <EditorButton text="Font" isActive onClick={onBack} />
      <article className="content-editor">
        <EditorSection>
          <EditorTitle title="Font Family" />
          <EditorDropdown
            defaultText={fontFamily}
            items={fontFamilyItems}
            onSelect={handleFontSelect}
          />
        </EditorSection>
        <EditorSection>
          <EditorTitle title="Color" />
          <EditorColorInput
            id="font-color"
            label="Color"
            value={color}
            onChange={handleColorChange}
          />
        </EditorSection>
        <EditorSection>
          <EditorTitle title="Font Size (px)" />
          <EditorUnitInput
            id="font-size"
            label="Font Size (px)"
            unit="px"
            value={fontSize}
            onChange={handleFontSizeChange}
          />
        </EditorSection>
        <EditorSection>
          <EditorTitle title="Line Height (px)" />
          <EditorUnitInput
            id="line-height"
            label="Line Height (px)"
            unit="px"
            value={lineHeight}
            onChange={handleLineHeightChange}
          />
        </EditorSection>
        <EditorSection>
          <EditorTitle title="Font Style" />
          <EditorDropdown
            defaultText={fontStyle}
            items={fontStyleItems}
            onSelect={handleFontStyleChange}
          />
        </EditorSection>
        <EditorSection>
          <EditorTitle title="Font Variant" />
          <EditorDropdown
            defaultText={fontVariant}
            items={fontVariantItems}
            onSelect={handleFontVariantChange}
          />
        </EditorSection>
        <EditorSection>
          <EditorTitle title={textDecoration} />
          <EditorDropdown
            defaultText="Select Text Decoration"
            items={textDecorationItems}
            onSelect={handleTextDecorationChange}
          />
        </EditorSection>
      </article>
    </>
  );
}

export default FontArea;
