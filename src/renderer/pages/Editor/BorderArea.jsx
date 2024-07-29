import React, { useEffect, useState } from 'react';
import useStyleStore from '../../store/styleStore';

import EditorButton from '../../components/EditorButton';
import EditorTitle from '../../components/EditorTitle';
import AllBorderControl from '../../components/Border/AllBorderControl';
import EditorOptionSelection from '../../components/EditorOptionSelection';
import BorderControl from '../../components/Border/BorderControl';

import { BORDER_AREA, BORDER_OPTIONS } from '../../constants/border';
import { camelToKebabCase } from '../../utils/styleUtils';

import './style.scss';

function BorderArea({ onBack, selectedElement }) {
  const [borderTopWidth, setBorderTopWidth] = useState('0px');
  const [borderRightWidth, setBorderRightWidth] = useState('0px');
  const [borderBottomWidth, setBorderBottomWidth] = useState('0px');
  const [borderLeftWidth, setBorderLeftWidth] = useState('0px');
  const [borderTopColor, setBorderTopColor] = useState('rgb(255, 255, 255)');
  const [borderRightColor, setBorderRightColor] =
    useState('rgb(255, 255, 255)');
  const [borderBottomColor, setBorderBottomColor] =
    useState('rgb(255, 255, 255)');
  const [borderLeftColor, setBorderLeftColor] = useState('rgb(255, 255, 255)');
  const [borderTopStyle, setBorderTopStyle] = useState('none');
  const [borderRightStyle, setBorderRightStyle] = useState('none');
  const [borderBottomStyle, setBorderBottomStyle] = useState('none');
  const [borderLeftStyle, setBorderLeftStyle] = useState('none');
  const [borderTopLeftRadius, setBorderTopLeftRadius] = useState('0px');
  const [borderTopRightRadius, setBorderTopRightRadius] = useState('0px');
  const [borderBottomRightRadius, setBorderBottomRightRadius] = useState('0px');
  const [borderBottomLeftRadius, setBorderBottomLeftRadius] = useState('0px');
  const [selectedBorderOption, setSelectedBorderOption] = useState('all');
  const addModification = useStyleStore((state) => state.addModification);

  useEffect(() => {
    if (selectedElement) {
      const {
        borderTopWidth: selectedBorderTopWidth,
        borderRightWidth: selectedBorderRightWidth,
        borderBottomWidth: selectedBorderBottomWidth,
        borderLeftWidth: selectedBorderLeftWidth,
        borderTopColor: selectedBorderTopColor,
        borderRightColor: selectedBorderRightColor,
        borderBottomColor: selectedBorderBottomColor,
        borderLeftColor: selectedBorderLeftColor,
        borderTopStyle: selectedBorderTopStyle,
        borderRightStyle: selectedBorderRightStyle,
        borderBottomStyle: selectedBorderBottomStyle,
        borderLeftStyle: selectedBorderLeftStyle,
        borderTopLeftRadius: selectedBorderTopLeftRadius,
        borderTopRightRadius: selectedBorderTopRightRadius,
        borderBottomRightRadius: selectedBorderBottomRightRadius,
        borderBottomLeftRadius: selectedBorderBottomLeftRadius,
      } = selectedElement.style;

      setBorderTopWidth(selectedBorderTopWidth || '0px');
      setBorderRightWidth(selectedBorderRightWidth || '0px');
      setBorderBottomWidth(selectedBorderBottomWidth || '0px');
      setBorderLeftWidth(selectedBorderLeftWidth || '0px');
      setBorderTopColor(selectedBorderTopColor || 'rgb(255, 255, 255)');
      setBorderRightColor(selectedBorderRightColor || 'rgb(255, 255, 255)');
      setBorderBottomColor(selectedBorderBottomColor || 'rgb(255, 255, 255)');
      setBorderLeftColor(selectedBorderLeftColor || 'rgb(255, 255, 255)');
      setBorderTopStyle(selectedBorderTopStyle || 'none');
      setBorderRightStyle(selectedBorderRightStyle || 'none');
      setBorderBottomStyle(selectedBorderBottomStyle || 'none');
      setBorderLeftStyle(selectedBorderLeftStyle || 'none');
      setBorderTopLeftRadius(selectedBorderTopLeftRadius || '0px');
      setBorderTopRightRadius(selectedBorderTopRightRadius || '0px');
      setBorderBottomRightRadius(selectedBorderBottomRightRadius || '0px');
      setBorderBottomLeftRadius(selectedBorderBottomLeftRadius || '0px');
    }
  }, [selectedElement]);

  const handleStyleChange = (property, value, all = false) => {
    const newProperties = {};

    if (all) {
      if (property === 'borderWidth') {
        newProperties.borderTopWidth = value;
        newProperties.borderRightWidth = value;
        newProperties.borderBottomWidth = value;
        newProperties.borderLeftWidth = value;
        setBorderTopWidth(value);
        setBorderRightWidth(value);
        setBorderBottomWidth(value);
        setBorderLeftWidth(value);
      } else if (property === 'borderColor') {
        newProperties.borderTopColor = value;
        newProperties.borderRightColor = value;
        newProperties.borderBottomColor = value;
        newProperties.borderLeftColor = value;
        setBorderTopColor(value);
        setBorderRightColor(value);
        setBorderBottomColor(value);
        setBorderLeftColor(value);
      } else if (property === 'borderStyle') {
        newProperties.borderTopStyle = value;
        newProperties.borderRightStyle = value;
        newProperties.borderBottomStyle = value;
        newProperties.borderLeftStyle = value;
        setBorderTopStyle(value);
        setBorderRightStyle(value);
        setBorderBottomStyle(value);
        setBorderLeftStyle(value);
      } else if (property === 'borderRadius') {
        newProperties.borderTopLeftRadius = value;
        newProperties.borderTopRightRadius = value;
        newProperties.borderBottomRightRadius = value;
        newProperties.borderBottomLeftRadius = value;
        setBorderTopLeftRadius(value);
        setBorderTopRightRadius(value);
        setBorderBottomRightRadius(value);
        setBorderBottomLeftRadius(value);
      }

      if (selectedElement) {
        addModification(
          selectedElement.xPath,
          BORDER_AREA,
          property,
          newProperties,
          selectedElement.friendlyIdentifier,
          true,
        );

        Object.entries(newProperties).forEach(([prop, val]) => {
          window.electronAPI.applyStyle({
            xPath: selectedElement.xPath,
            cssText: `${camelToKebabCase(prop)}: ${val}`,
          });
        });
      }
    } else {
      switch (property) {
        case 'borderTopWidth':
          setBorderTopWidth(value);
          break;
        case 'borderRightWidth':
          setBorderRightWidth(value);
          break;
        case 'borderBottomWidth':
          setBorderBottomWidth(value);
          break;
        case 'borderLeftWidth':
          setBorderLeftWidth(value);
          break;
        case 'borderTopColor':
          setBorderTopColor(value);
          break;
        case 'borderRightColor':
          setBorderRightColor(value);
          break;
        case 'borderBottomColor':
          setBorderBottomColor(value);
          break;
        case 'borderLeftColor':
          setBorderLeftColor(value);
          break;
        case 'borderTopStyle':
          setBorderTopStyle(value);
          break;
        case 'borderRightStyle':
          setBorderRightStyle(value);
          break;
        case 'borderBottomStyle':
          setBorderBottomStyle(value);
          break;
        case 'borderLeftStyle':
          setBorderLeftStyle(value);
          break;
        case 'borderTopLeftRadius':
          setBorderTopLeftRadius(value);
          break;
        case 'borderTopRightRadius':
          setBorderTopRightRadius(value);
          break;
        case 'borderBottomRightRadius':
          setBorderBottomRightRadius(value);
          break;
        case 'borderBottomLeftRadius':
          setBorderBottomLeftRadius(value);
          break;
        default:
          break;
      }

      if (selectedElement) {
        addModification(
          selectedElement.xPath,
          BORDER_AREA,
          property,
          value,
          selectedElement.friendlyIdentifier,
        );

        window.electronAPI.applyStyle({
          xPath: selectedElement.xPath,
          cssText: `${camelToKebabCase(property)}: ${value}`,
        });
      }
    }
  };

  return (
    <div className="editor-container">
      <EditorButton text="Border" isActive onClick={onBack} />
      <article className="content-editor">
        <section className="border-section">
          <EditorTitle title="Border" />
          <EditorOptionSelection
            options={BORDER_OPTIONS}
            selectedOption={selectedBorderOption}
            setSelectedOption={setSelectedBorderOption}
          />
          {selectedBorderOption === 'all' && (
            <AllBorderControl
              title="All Border"
              initialValues={{
                width: borderTopWidth,
                color: borderTopColor,
                style: borderTopStyle,
                radius: borderTopLeftRadius,
              }}
              onChange={(property, value) => {
                handleStyleChange(property, value, true);
              }}
              selectedElement={selectedElement}
            />
          )}
          {selectedBorderOption === 'top' && (
            <BorderControl
              side="Top"
              borderWidth={borderTopWidth}
              borderColor={borderTopColor}
              borderStyle={borderTopStyle}
              borderRadius={borderTopLeftRadius}
              onChange={handleStyleChange}
              selectedElement={selectedElement}
            />
          )}
          {selectedBorderOption === 'right' && (
            <BorderControl
              side="Right"
              borderWidth={borderRightWidth}
              borderColor={borderRightColor}
              borderStyle={borderRightStyle}
              borderRadius={borderTopRightRadius}
              onChange={handleStyleChange}
              selectedElement={selectedElement}
            />
          )}
          {selectedBorderOption === 'bottom' && (
            <BorderControl
              side="Bottom"
              borderWidth={borderBottomWidth}
              borderColor={borderBottomColor}
              borderStyle={borderBottomStyle}
              borderRadius={borderBottomRightRadius}
              onChange={handleStyleChange}
              selectedElement={selectedElement}
            />
          )}
          {selectedBorderOption === 'left' && (
            <BorderControl
              side="Left"
              borderWidth={borderLeftWidth}
              borderColor={borderLeftColor}
              borderStyle={borderLeftStyle}
              borderRadius={borderBottomLeftRadius}
              onChange={handleStyleChange}
              selectedElement={selectedElement}
            />
          )}
        </section>
      </article>
    </div>
  );
}

export default BorderArea;
