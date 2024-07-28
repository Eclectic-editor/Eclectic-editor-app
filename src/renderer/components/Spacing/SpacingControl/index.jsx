import React from 'react';
import useStyleStore from '../../../store/styleStore';

import EditorSection from '../../EditorSection';
import EditorSmallTitle from '../../EditorSmallTitle';
import EditorInputGroup from '../../EditorInputGroup';

import isStyleModified from '../../../utils/ElementUtils';

const SPACING_AREA = 'spacing';

function SpacingControl({ title, values, onChange, selectedElement }) {
  const { modifiedElements } = useStyleStore((state) => state);
  const { top, right, bottom, left } = values;

  return (
    <div className="spacing-controls">
      <EditorSection>
        <EditorSmallTitle
          title={`${title} Top`}
          isActive={isStyleModified(
            `${title.toLowerCase()}Top`,
            selectedElement,
            modifiedElements,
            SPACING_AREA,
          )}
        />
        <EditorInputGroup
          value={top}
          onChange={(value) => onChange('top', value)}
        />
      </EditorSection>
      <EditorSection>
        <EditorSmallTitle
          title={`${title} Right`}
          isActive={isStyleModified(
            `${title.toLowerCase()}Right`,
            selectedElement,
            modifiedElements,
            SPACING_AREA,
          )}
        />
        <EditorInputGroup
          value={right}
          onChange={(value) => onChange('right', value)}
        />
      </EditorSection>
      <EditorSection>
        <EditorSmallTitle
          title={`${title} Bottom`}
          isActive={isStyleModified(
            `${title.toLowerCase()}Bottom`,
            selectedElement,
            modifiedElements,
            SPACING_AREA,
          )}
        />
        <EditorInputGroup
          value={bottom}
          onChange={(value) => onChange('bottom', value)}
        />
      </EditorSection>
      <EditorSection>
        <EditorSmallTitle
          title={`${title} Left`}
          isActive={isStyleModified(
            `${title.toLowerCase()}Left`,
            selectedElement,
            modifiedElements,
            SPACING_AREA,
          )}
        />
        <EditorInputGroup
          value={left}
          onChange={(value) => onChange('left', value)}
        />
      </EditorSection>
    </div>
  );
}

export default SpacingControl;
