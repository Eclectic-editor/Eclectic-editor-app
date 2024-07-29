const isStyleModified = (property, selectedElement, modifiedElements, area) => {
  if (
    !selectedElement ||
    !modifiedElements ||
    !modifiedElements[selectedElement.xPath] ||
    !modifiedElements[selectedElement.xPath][area]
  ) {
    return false;
  }

  const areaModifications = modifiedElements[selectedElement.xPath][area];

  const result = Object.prototype.hasOwnProperty.call(
    areaModifications,
    property,
  );
  return result;
};

export default isStyleModified;
