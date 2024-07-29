import React from 'react';
import useStyleStore from '../../../store/styleStore';

import EditorSection from '../../EditorSection';
import EditorSmallTitle from '../../EditorSmallTitle';
import EditorInputGroup from '../../EditorInputGroup';

import { SPACING_AREA } from '../../../constants/spacing';
import isStyleModified from '../../../utils/ElementUtils';

function SpacingControl({ title, values, onChange, selectedElement }) {
  const { modifiedElements } = useStyleStore((state) => state);
  const { top, right, bottom, left } = values;

  return (
    <>
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
    </>
  );
}

export default SpacingControl;
