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
    const document = {};
    Object.entries(modifiedElements).forEach(([xPath, element]) => {
      const identifier = element.friendlyIdentifier;
      document[xPath] = {
        friendlyIdentifier: identifier,
        styles: {},
      };
      Object.entries(element).forEach(([area, properties]) => {
        if (area !== 'friendlyIdentifier') {
          Object.entries(properties).forEach(([property, value]) => {
            document[xPath].styles[property] = value;
          });
        }
      });
    });
    return document;
  },
}));

export default useStyleStore;
