const isStyleModified = (property, selectedElement, modifiedElements, area) =>
  selectedElement &&
  modifiedElements[selectedElement.xPath] &&
  modifiedElements[selectedElement.xPath][area] &&
  modifiedElements[selectedElement.xPath][area][property];

export default isStyleModified;
