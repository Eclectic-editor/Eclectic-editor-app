import React, { useState, useEffect } from 'react';

import EditorButton from '../../components/EditorButton';
import EditorSection from '../../components/EditorSection';
import EditorTitle from '../../components/EditorTitle';
import EditorDropdown from '../../components/EditorDropdown';
import EditorUnitInput from '../../components/EditorUnitInput';

import {
  TEXT_ALIGN_ITEMS,
  TEXT_TRANSFORM_ITEMS,
  VERTICAL_ALIGN_ITEMS,
  WHITE_SPACE_ITEMS,
} from '../../constants/text';
import { toFixedTwo, camelToKebabCase } from '../../utils/styleUtils';

import './style.scss';

function TextArea({ onBack, selectedElement }) {
  const [textAlign, setTextAlign] = useState('left');
  const [textIndent, setTextIndent] = useState('0px');
  const [textTransform, setTextTransform] = useState('none');
  const [wordSpacing, setWordSpacing] = useState('normal');
  const [letterSpacing, setLetterSpacing] = useState('normal');
  const [wordWrap, setWordWrap] = useState('normal');
  const [whiteSpace, setWhiteSpace] = useState('normal');
  const [verticalAlign, setVerticalAlign] = useState('baseline');

  useEffect(() => {
    if (selectedElement) {
      const {
        textAlign: selectedTextAlign,
        textIndent: selectedTextIndent,
        textTransform: selectedTextTransform,
        wordSpacing: selectedWordSpacing,
        letterSpacing: selectedLetterSpacing,
        wordWrap: selectedWordWrap,
        whiteSpace: selectedWhiteSpace,
        verticalAlign: selectedVerticalAlign,
      } = selectedElement.style;

      setTextAlign(selectedTextAlign || 'left');
      setTextIndent(toFixedTwo(selectedTextIndent) || '0px');
      setTextTransform(selectedTextTransform || 'none');
      setWordSpacing(toFixedTwo(selectedWordSpacing) || '0px');
      setLetterSpacing(toFixedTwo(selectedLetterSpacing) || '0px');
      setWordWrap(selectedWordWrap || 'normal');
      setWhiteSpace(selectedWhiteSpace || 'normal');
      setVerticalAlign(selectedVerticalAlign || 'baseline');
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
      case 'textAlign':
        setTextAlign(value);
        break;
      case 'textIndent':
        setTextIndent(value);
        break;
      case 'textTransform':
        setTextTransform(value);
        break;
      case 'wordSpacing':
        setWordSpacing(value);
        break;
      case 'letterSpacing':
        setLetterSpacing(value);
        break;
      case 'wordWrap':
        setWordWrap(value);
        break;
      case 'whiteSpace':
        setWhiteSpace(value);
        break;
      case 'verticalAlign':
        setVerticalAlign(value);
        break;
      default:
        break;
    }
    applyStyle(`${camelToKebabCase(property)}: ${value}`);
  };

  return (
    <>
      <EditorButton text="Text" isActive onClick={onBack} />
      <article className="content-editor">
        <EditorSection>
          <EditorTitle title="Text Align" />
          <EditorDropdown
            defaultText={textAlign}
            items={TEXT_ALIGN_ITEMS}
            onSelect={(value) => handleStyleChange('textAlign', value)}
          />
        </EditorSection>
        <EditorSection>
          <EditorTitle title="Text Indent (px)" />
          <EditorUnitInput
            id="text-indent"
            label="Text Indent (px)"
            unit="px"
            value={textIndent}
            onChange={(value) => handleStyleChange('textIndent', value)}
          />
        </EditorSection>
        <EditorSection>
          <EditorTitle title="Text Transform" />
          <EditorDropdown
            defaultText={textTransform}
            items={TEXT_TRANSFORM_ITEMS}
            onSelect={(value) => handleStyleChange('textTransform', value)}
          />
        </EditorSection>
        <EditorSection>
          <EditorTitle title="Word Spacing (px)" />
          <EditorUnitInput
            id="word-spacing"
            label="Word Spacing (px)"
            unit="px"
            value={wordSpacing}
            onChange={(value) => handleStyleChange('wordSpacing', value)}
          />
        </EditorSection>
        <EditorSection>
          <EditorTitle title="Letter Spacing (px)" />
          <EditorUnitInput
            id="letter-spacing"
            label="Letter Spacing (px)"
            unit="px"
            value={letterSpacing}
            onChange={(value) => handleStyleChange('letterSpacing', value)}
          />
        </EditorSection>
        <EditorSection>
          <EditorTitle title="Word Wrap" />
          <EditorDropdown
            defaultText={wordWrap}
            items={['normal', 'break-word']}
            onSelect={(value) => handleStyleChange('wordWrap', value)}
          />
        </EditorSection>
        <EditorSection>
          <EditorTitle title="White Space" />
          <EditorDropdown
            defaultText={whiteSpace}
            items={WHITE_SPACE_ITEMS}
            onSelect={(value) => handleStyleChange('whiteSpace', value)}
          />
        </EditorSection>
        <EditorSection>
          <EditorTitle title="Vertical Align" />
          <EditorDropdown
            defaultText={verticalAlign}
            items={VERTICAL_ALIGN_ITEMS}
            onSelect={(value) => handleStyleChange('verticalAlign', value)}
          />
        </EditorSection>
      </article>
    </>
  );
}

export default TextArea;
