const isStyleModified = (property, selectedElement, modifiedElements, area) =>
  selectedElement &&
  modifiedElements[selectedElement.xPath] &&
  modifiedElements[selectedElement.xPath][area] &&
  Object.prototype.hasOwnProperty.call(
    modifiedElements[selectedElement.xPath][area],
    property,
  );

export default isStyleModified;
