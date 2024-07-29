import React, { useState, useEffect } from 'react';
import useStyleStore from '../../store/styleStore';

import EditorButton from '../../components/EditorButton';
import EditorSection from '../../components/EditorSection';
import EditorTitle from '../../components/EditorTitle';
import EditorDropdown from '../../components/EditorDropdown';
import EditorInputGroup from '../../components/EditorInputGroup';

import {
  TEXT_AREA,
  TEXT_ALIGN_ITEMS,
  TEXT_TRANSFORM_ITEMS,
  VERTICAL_ALIGN_ITEMS,
  WHITE_SPACE_ITEMS,
} from '../../constants/text';
import { camelToKebabCase } from '../../utils/styleUtils';
import isStyleModified from '../../utils/ElementUtils';

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
  const addModification = useStyleStore((state) => state.addModification);
  const modifiedElements = useStyleStore((state) => state.modifiedElements);

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
      setTextIndent(selectedTextIndent || '0px');
      setTextTransform(selectedTextTransform || 'none');
      setWordSpacing(selectedWordSpacing || '0px');
      setLetterSpacing(selectedLetterSpacing || '0px');
      setWordWrap(selectedWordWrap || 'normal');
      setWhiteSpace(selectedWhiteSpace || 'normal');
      setVerticalAlign(selectedVerticalAlign || 'baseline');
    }
  }, [selectedElement]);

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

    if (selectedElement) {
      addModification(
        selectedElement.xPath,
        TEXT_AREA,
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
      <EditorButton text="Text" isActive onClick={onBack} />
      <article className="content-editor">
        <EditorSection>
          <EditorTitle
            title="Text Align"
            isActive={isStyleModified(
              'textAlign',
              selectedElement,
              modifiedElements,
              TEXT_AREA,
            )}
          />
          <EditorDropdown
            defaultText={textAlign}
            items={TEXT_ALIGN_ITEMS}
            onSelect={(value) => handleStyleChange('textAlign', value)}
          />
        </EditorSection>
        <EditorSection>
          <EditorTitle
            title="Text Indent"
            isActive={isStyleModified(
              'textIndent',
              selectedElement,
              modifiedElements,
              TEXT_AREA,
            )}
          />
          <EditorInputGroup
            value={textIndent}
            onChange={(value) => handleStyleChange('textIndent', value)}
          />
        </EditorSection>
        <EditorSection>
          <EditorTitle
            title="Text Transform"
            isActive={isStyleModified(
              'textTransform',
              selectedElement,
              modifiedElements,
              TEXT_AREA,
            )}
          />
          <EditorDropdown
            defaultText={textTransform}
            items={TEXT_TRANSFORM_ITEMS}
            onSelect={(value) => handleStyleChange('textTransform', value)}
          />
        </EditorSection>
        <EditorSection>
          <EditorTitle
            title="Word Spacing"
            isActive={isStyleModified(
              'wordSpacing',
              selectedElement,
              modifiedElements,
              TEXT_AREA,
            )}
          />
          <EditorInputGroup
            value={wordSpacing}
            onChange={(value) => handleStyleChange('wordSpacing', value)}
          />
        </EditorSection>
        <EditorSection>
          <EditorTitle
            title="Letter Spacing"
            isActive={isStyleModified(
              'letterSpacing',
              selectedElement,
              modifiedElements,
              TEXT_AREA,
            )}
          />
          <EditorInputGroup
            value={letterSpacing}
            onChange={(value) => handleStyleChange('letterSpacing', value)}
          />
        </EditorSection>
        <EditorSection>
          <EditorTitle
            title="Word Wrap"
            isActive={isStyleModified(
              'wordWrap',
              selectedElement,
              modifiedElements,
              TEXT_AREA,
            )}
          />
          <EditorDropdown
            defaultText={wordWrap}
            items={['normal', 'break-word']}
            onSelect={(value) => handleStyleChange('wordWrap', value)}
          />
        </EditorSection>
        <EditorSection>
          <EditorTitle
            title="White Space"
            isActive={isStyleModified(
              'whiteSpace',
              selectedElement,
              modifiedElements,
              TEXT_AREA,
            )}
          />
          <EditorDropdown
            defaultText={whiteSpace}
            items={WHITE_SPACE_ITEMS}
            onSelect={(value) => handleStyleChange('whiteSpace', value)}
          />
        </EditorSection>
        <EditorSection>
          <EditorTitle
            title="Vertical Align"
            isActive={isStyleModified(
              'verticalAlign',
              selectedElement,
              modifiedElements,
              TEXT_AREA,
            )}
          />
          <EditorDropdown
            defaultText={verticalAlign}
            items={VERTICAL_ALIGN_ITEMS}
            onSelect={(value) => handleStyleChange('verticalAlign', value)}
          />
        </EditorSection>
      </article>
    </div>
  );
}

export default TextArea;
