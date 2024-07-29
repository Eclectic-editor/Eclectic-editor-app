import React, { useEffect, useState } from 'react';
import useStyleStore from '../../store/styleStore';

import EditorButton from '../../components/EditorButton';
import SpacingWidget from '../../components/Spacing/SpacingWidget';
import EditorTitle from '../../components/EditorTitle';
import AllSpacingControl from '../../components/Spacing/AllSpacingControl';
import HorizontalVerticalSpacingControl from '../../components/Spacing/HorizontalVerticalSpacingControl';
import SpacingControl from '../../components/Spacing/SpacingControl';
import EditorOptionSelection from '../../components/EditorOptionSelection';

import { SPACING_AREA, SPACING_OPTIONS } from '../../constants/spacing';
import { camelToKebabCase } from '../../utils/styleUtils';

import './style.scss';

function SpacingArea({ onBack, selectedElement }) {
  const [paddingTop, setPaddingTop] = useState('0px');
  const [paddingRight, setPaddingRight] = useState('0px');
  const [paddingBottom, setPaddingBottom] = useState('0px');
  const [paddingLeft, setPaddingLeft] = useState('0px');
  const [marginTop, setMarginTop] = useState('0px');
  const [marginRight, setMarginRight] = useState('0px');
  const [marginBottom, setMarginBottom] = useState('0px');
  const [marginLeft, setMarginLeft] = useState('0px');
  const [selectedPaddingOption, setSelectedPaddingOption] =
    useState('individual');
  const [selectedMarginOption, setSelectedMarginOption] =
    useState('individual');
  const addModification = useStyleStore((state) => state.addModification);

  useEffect(() => {
    if (selectedElement) {
      const {
        paddingTop: selectedPaddingTop,
        paddingRight: selectedPaddingRight,
        paddingBottom: selectedPaddingBottom,
        paddingLeft: selectedPaddingLeft,
        marginTop: selectedMarginTop,
        marginRight: selectedMarginRight,
        marginBottom: selectedMarginBottom,
        marginLeft: selectedMarginLeft,
      } = selectedElement.style;

      setPaddingTop(selectedPaddingTop || '0px');
      setPaddingRight(selectedPaddingRight || '0px');
      setPaddingBottom(selectedPaddingBottom || '0px');
      setPaddingLeft(selectedPaddingLeft || '0px');
      setMarginTop(selectedMarginTop || '0px');
      setMarginRight(selectedMarginRight || '0px');
      setMarginBottom(selectedMarginBottom || '0px');
      setMarginLeft(selectedMarginLeft || '0px');
    }
  }, [selectedElement]);

  const handleStyleChange = (property, value) => {
    switch (property) {
      case 'paddingTop':
        setPaddingTop(value);
        break;
      case 'paddingRight':
        setPaddingRight(value);
        break;
      case 'paddingBottom':
        setPaddingBottom(value);
        break;
      case 'paddingLeft':
        setPaddingLeft(value);
        break;
      case 'marginTop':
        setMarginTop(value);
        break;
      case 'marginRight':
        setMarginRight(value);
        break;
      case 'marginBottom':
        setMarginBottom(value);
        break;
      case 'marginLeft':
        setMarginLeft(value);
        break;
      default:
        break;
    }

    if (selectedElement) {
      addModification(
        selectedElement.xPath,
        SPACING_AREA,
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

  const paddingValues = {
    top: paddingTop,
    right: paddingRight,
    bottom: paddingBottom,
    left: paddingLeft,
  };

  const marginValues = {
    top: marginTop,
    right: marginRight,
    bottom: marginBottom,
    left: marginLeft,
  };

  return (
    <div className="editor-container">
      <EditorButton text="Spacing" isActive onClick={onBack} />
      <article className="content-editor">
        <SpacingWidget
          padding={paddingValues}
          margin={marginValues}
          paddingOption={selectedPaddingOption}
          marginOption={selectedMarginOption}
        />
        <section className="spacing-section">
          <EditorTitle title="Padding" />
          <EditorOptionSelection
            options={SPACING_OPTIONS}
            selectedOption={selectedPaddingOption}
            setSelectedOption={setSelectedPaddingOption}
          />
          {selectedPaddingOption === 'individual' && (
            <SpacingControl
              title="padding"
              values={paddingValues}
              onChange={(position, value) =>
                handleStyleChange(
                  `padding${position.charAt(0).toUpperCase() + position.slice(1)}`,
                  value,
                )
              }
              selectedElement={selectedElement}
            />
          )}
          {selectedPaddingOption === 'vertical' && (
            <HorizontalVerticalSpacingControl
              title="Vertical Padding"
              topValue={paddingTop}
              bottomValue={paddingBottom}
              initialValue={paddingTop}
              onChange={(position, value) =>
                handleStyleChange(
                  `padding${position.charAt(0).toUpperCase() + position.slice(1)}`,
                  value,
                )
              }
              selectedElement={selectedElement}
            />
          )}
          {selectedPaddingOption === 'horizontal' && (
            <HorizontalVerticalSpacingControl
              title="Horizontal Padding"
              topValue={paddingRight}
              bottomValue={paddingLeft}
              initialValue={paddingRight}
              onChange={(position, value) =>
                handleStyleChange(
                  `padding${position.charAt(0).toUpperCase() + position.slice(1)}`,
                  value,
                )
              }
              selectedElement={selectedElement}
            />
          )}
          {selectedPaddingOption === 'all' && (
            <AllSpacingControl
              title="All Padding"
              initialValue={paddingTop}
              onChange={(value) => {
                handleStyleChange('paddingTop', value);
                handleStyleChange('paddingRight', value);
                handleStyleChange('paddingBottom', value);
                handleStyleChange('paddingLeft', value);
              }}
              selectedElement={selectedElement}
            />
          )}
        </section>
        <section className="spacing-section">
          <EditorTitle title="Margin" />
          <EditorOptionSelection
            options={SPACING_OPTIONS}
            selectedOption={selectedMarginOption}
            setSelectedOption={setSelectedMarginOption}
          />
          {selectedMarginOption === 'individual' && (
            <SpacingControl
              title="margin"
              values={marginValues}
              onChange={(position, value) =>
                handleStyleChange(
                  `margin${position.charAt(0).toUpperCase() + position.slice(1)}`,
                  value,
                )
              }
              selectedElement={selectedElement}
            />
          )}
          {selectedMarginOption === 'vertical' && (
            <HorizontalVerticalSpacingControl
              title="Vertical Margin"
              topValue={marginTop}
              bottomValue={marginBottom}
              initialValue={marginTop}
              onChange={(position, value) =>
                handleStyleChange(
                  `margin${position.charAt(0).toUpperCase() + position.slice(1)}`,
                  value,
                )
              }
              selectedElement={selectedElement}
            />
          )}
          {selectedMarginOption === 'horizontal' && (
            <HorizontalVerticalSpacingControl
              title="Horizontal Margin"
              topValue={marginRight}
              bottomValue={marginLeft}
              initialValue={marginRight}
              onChange={(position, value) =>
                handleStyleChange(
                  `margin${position.charAt(0).toUpperCase() + position.slice(1)}`,
                  value,
                )
              }
              selectedElement={selectedElement}
            />
          )}
          {selectedMarginOption === 'all' && (
            <AllSpacingControl
              title="All Margin"
              initialValue={marginTop}
              onChange={(value) => {
                handleStyleChange('marginTop', value);
                handleStyleChange('marginRight', value);
                handleStyleChange('marginBottom', value);
                handleStyleChange('marginLeft', value);
              }}
              selectedElement={selectedElement}
            />
          )}
        </section>
      </article>
    </div>
  );
}

export default SpacingArea;
