import { create } from 'zustand';

const useStyleStore = create((set, get) => ({
  modifiedElements: {},
  addModification: (elementPath, area, property, value, friendlyIdentifier) =>
    set((state) => {
      const element = state.modifiedElements[elementPath] || {};
      const areaModifications = element[area] || {};

      return {
        modifiedElements: {
          ...state.modifiedElements,
          [elementPath]: {
            ...element,
            [area]: {
              ...areaModifications,
              [property]: value,
            },
            friendlyIdentifier,
          },
        },
      };
    }),
  resetModifications: () => set({ modifiedElements: {} }),
  getStylesDocument: () => {
    const { modifiedElements } = get();
    let document = '';
    Object.entries(modifiedElements).forEach(([xPath, element]) => {
      const identifier = element.friendlyIdentifier;
      document += `Element: ${identifier}\nXPath: ${xPath}\n`;
      Object.entries(element).forEach(([area, properties]) => {
        if (area !== 'friendlyIdentifier') {
          Object.entries(properties).forEach(([property, value]) => {
            document += `${property}: ${value};\n`;
          });
        }
      });
      document += '\n';
    });
    return document;
  },
}));

export default useStyleStore;
