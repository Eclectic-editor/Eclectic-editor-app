import React, { useEffect, useState } from 'react';
import useStyleStore from '../../../store/styleStore';

import EditorSection from '../../EditorSection';
import EditorSmallTitle from '../../EditorSmallTitle';
import EditorInputGroup from '../../EditorInputGroup';
import EditorColorInput from '../../EditorColorInput';
import EditorDropdown from '../../EditorDropdown';

import { BORDER_AREA, BORDER_STYLE } from '../../../constants/border';
import isStyleModified from '../../../utils/ElementUtils';

function AllBorderControl({ title, initialValues, onChange, selectedElement }) {
  const [width, setWidth] = useState(initialValues.width);
  const [color, setColor] = useState(initialValues.color);
  const [style, setStyle] = useState(initialValues.style);
  const [radius, setRadius] = useState(initialValues.radius);
  const { modifiedElements } = useStyleStore((state) => state);

  useEffect(() => {
    setWidth(initialValues.width);
    setColor(initialValues.color);
    setStyle(initialValues.style);
    setRadius(initialValues.radius);
  }, [initialValues]);

  const handleWidthChange = (newValue) => {
    setWidth(newValue);
    onChange('borderWidth', newValue);
  };

  const handleColorChange = (newValue) => {
    setColor(newValue);
    onChange('borderColor', newValue);
  };

  const handleStyleChange = (newValue) => {
    setStyle(newValue);
    onChange('borderStyle', newValue);
  };

  const handleRadiusChange = (newValue) => {
    setRadius(newValue);
    onChange('borderRadius', newValue);
  };

  const areAllWidthsModified = [
    'borderTopWidth',
    'borderRightWidth',
    'borderBottomWidth',
    'borderLeftWidth',
  ].every((property) =>
    isStyleModified(property, selectedElement, modifiedElements, BORDER_AREA),
  );

  const areAllColorsModified = [
    'borderTopColor',
    'borderRightColor',
    'borderBottomColor',
    'borderLeftColor',
  ].every((property) =>
    isStyleModified(property, selectedElement, modifiedElements, BORDER_AREA),
  );

  const areAllStylesModified = [
    'borderTopStyle',
    'borderRightStyle',
    'borderBottomStyle',
    'borderLeftStyle',
  ].every((property) =>
    isStyleModified(property, selectedElement, modifiedElements, BORDER_AREA),
  );

  const areAllRadiiModified = [
    'borderTopLeftRadius',
    'borderTopRightRadius',
    'borderBottomRightRadius',
    'borderBottomLeftRadius',
  ].every((property) =>
    isStyleModified(property, selectedElement, modifiedElements, BORDER_AREA),
  );

  return (
    <div>
      <EditorSection>
        <EditorSmallTitle
          title={`${title} Width`}
          isActive={areAllWidthsModified}
        />
        <EditorInputGroup value={width} onChange={handleWidthChange} />
      </EditorSection>
      <EditorSection>
        <EditorSmallTitle
          title={`${title} Color`}
          isActive={areAllColorsModified}
        />
        <EditorColorInput value={color} onChange={handleColorChange} />
      </EditorSection>
      <EditorSection>
        <EditorSmallTitle
          title={`${title} Style`}
          isActive={areAllStylesModified}
        />
        <EditorDropdown
          defaultText={style}
          items={BORDER_STYLE}
          onSelect={handleStyleChange}
        />
      </EditorSection>
      <EditorSection>
        <EditorSmallTitle
          title={`${title} Radius`}
          isActive={areAllRadiiModified}
        />
        <EditorInputGroup value={radius} onChange={handleRadiusChange} />
      </EditorSection>
    </div>
  );
}

export default AllBorderControl;
