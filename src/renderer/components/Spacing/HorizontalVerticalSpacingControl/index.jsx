import React, { useEffect, useState } from 'react';
import useStyleStore from '../../../store/styleStore';

import EditorSection from '../../EditorSection';
import EditorSmallTitle from '../../EditorSmallTitle';
import EditorInputGroup from '../../EditorInputGroup';

import isStyleModified from '../../../utils/ElementUtils';

function HorizontalVerticalSpacingControl({
  title,
  topValue,
  bottomValue,
  initialValue = '0px',
  onChange,
  selectedElement,
}) {
  const { modifiedElements } = useStyleStore((state) => state);
  const [combinedValue, setCombinedValue] = useState(initialValue);
  const SPACING_AREA = 'spacing';

  useEffect(() => {
    setCombinedValue(initialValue);
  }, [initialValue]);

  const handleCombinedChange = (newValue) => {
    setCombinedValue(newValue);
    onChange(title.includes('Vertical') ? 'Top' : 'Right', newValue);
    onChange(title.includes('Vertical') ? 'Bottom' : 'Left', newValue);
  };

  const isVerticalModified =
    isStyleModified(
      'paddingTop',
      selectedElement,
      modifiedElements,
      SPACING_AREA,
    ) &&
    isStyleModified(
      'paddingBottom',
      selectedElement,
      modifiedElements,
      SPACING_AREA,
    );

  const isHorizontalModified =
    isStyleModified(
      'paddingRight',
      selectedElement,
      modifiedElements,
      SPACING_AREA,
    ) &&
    isStyleModified(
      'paddingLeft',
      selectedElement,
      modifiedElements,
      SPACING_AREA,
    );

  return (
    <div className="spacing-controls">
      <EditorSection>
        <EditorSmallTitle
          title={title}
          isActive={
            title.includes('Vertical')
              ? isVerticalModified
              : isHorizontalModified
          }
        />
        <EditorInputGroup
          value={combinedValue}
          onChange={handleCombinedChange}
        />
      </EditorSection>
      <EditorSection>
        <EditorSmallTitle
          title={title.includes('Horizontal') ? 'Padding-Right' : 'Padding-Top'}
          isActive={isStyleModified(
            title.includes('Horizontal') ? 'paddingRight' : 'paddingTop',
            selectedElement,
            modifiedElements,
            SPACING_AREA,
          )}
        />
        <EditorInputGroup
          value={topValue}
          onChange={(value) =>
            onChange(title.includes('Horizontal') ? 'Right' : 'Top', value)
          }
        />
      </EditorSection>
      <EditorSection>
        <EditorSmallTitle
          title={
            title.includes('Horizontal') ? 'Padding-Left' : 'Padding-Bottom'
          }
          isActive={isStyleModified(
            title.includes('Horizontal') ? 'paddingLeft' : 'paddingBottom',
            selectedElement,
            modifiedElements,
            SPACING_AREA,
          )}
        />
        <EditorInputGroup
          value={bottomValue}
          onChange={(value) =>
            onChange(title.includes('Horizontal') ? 'Left' : 'Bottom', value)
          }
        />
      </EditorSection>
    </div>
  );
}

export default HorizontalVerticalSpacingControl;
