import React from 'react';
import useStyleStore from '../../../store/styleStore';

import EditorSection from '../../EditorSection';
import EditorSmallTitle from '../../EditorSmallTitle';
import EditorInputGroup from '../../EditorInputGroup';
import EditorColorInput from '../../EditorColorInput';
import EditorDropdown from '../../EditorDropdown';

import {
  BORDER_AREA,
  BORDER_RADIUS_PROPERTIES,
  BORDER_STYLE,
} from '../../../constants/border';
import isStyleModified from '../../../utils/ElementUtils';

function BorderControl({
  side,
  borderWidth,
  borderColor,
  borderStyle,
  borderRadius,
  handleStyleChange,
  selectedElement,
}) {
  const { modifiedElements } = useStyleStore((state) => state);

  return (
    <div>
      <EditorSection>
        <EditorSmallTitle
          title={`Border ${side} Width`}
          isActive={isStyleModified(
            `border${side}Width`,
            selectedElement,
            modifiedElements,
            BORDER_AREA,
          )}
        />
        <EditorInputGroup
          value={borderWidth}
          onChange={(value) => handleStyleChange(`border${side}Width`, value)}
        />
      </EditorSection>
      <EditorSection>
        <EditorSmallTitle
          title={`Border ${side} Color`}
          isActive={isStyleModified(
            `border${side}Color`,
            selectedElement,
            modifiedElements,
            BORDER_AREA,
          )}
        />
        <EditorColorInput
          value={borderColor}
          onChange={(value) => handleStyleChange(`border${side}Color`, value)}
        />
      </EditorSection>
      <EditorSection>
        <EditorSmallTitle
          title={`Border ${side} Style`}
          isActive={isStyleModified(
            `border${side}Style`,
            selectedElement,
            modifiedElements,
            BORDER_AREA,
          )}
        />
        <EditorDropdown
          defaultText={borderStyle}
          items={BORDER_STYLE}
          onSelect={(value) => handleStyleChange(`border${side}Style`, value)}
        />
      </EditorSection>
      {BORDER_RADIUS_PROPERTIES[side] && (
        <EditorSection>
          <EditorSmallTitle
            title={`Border ${side} Radius`}
            isActive={isStyleModified(
              BORDER_RADIUS_PROPERTIES[side],
              selectedElement,
              modifiedElements,
              BORDER_AREA,
            )}
          />
          <EditorInputGroup
            value={borderRadius}
            onChange={(value) =>
              handleStyleChange(BORDER_RADIUS_PROPERTIES[side], value)
            }
          />
        </EditorSection>
      )}
    </div>
  );
}

export default BorderControl;
