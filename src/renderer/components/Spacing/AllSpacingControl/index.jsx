import React, { useEffect, useState } from 'react';
import useStyleStore from '../../../store/styleStore';

import EditorSection from '../../EditorSection';
import EditorSmallTitle from '../../EditorSmallTitle';
import EditorInputGroup from '../../EditorInputGroup';

import { SPACING_AREA } from '../../../constants/spacing';
import isStyleModified from '../../../utils/ElementUtils';

function AllSpacingControl({ title, initialValue, onChange, selectedElement }) {
  const { modifiedElements } = useStyleStore((state) => state);
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleChange = (newValue) => {
    setValue(newValue);
    onChange(newValue);
  };

  const areAllPaddingsModified = [
    'paddingTop',
    'paddingRight',
    'paddingBottom',
    'paddingLeft',
  ].every((property) =>
    isStyleModified(property, selectedElement, modifiedElements, SPACING_AREA),
  );

  const areAllMarginsModified = [
    'marginTop',
    'marginRight',
    'marginBottom',
    'marginLeft',
  ].every((property) =>
    isStyleModified(property, selectedElement, modifiedElements, SPACING_AREA),
  );

  return (
    <EditorSection>
      <EditorSmallTitle
        title={title}
        isActive={
          title.includes('Padding')
            ? areAllPaddingsModified
            : areAllMarginsModified
        }
      />
      <EditorInputGroup value={value} onChange={handleChange} />
    </EditorSection>
  );
}

export default AllSpacingControl;
