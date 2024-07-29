import { create } from 'zustand';

const useStyleStore = create((set, get) => ({
  modifiedElements: {},
  addModification: (
    elementPath,
    area,
    property,
    value,
    friendlyIdentifier,
    isGroup = false,
  ) =>
    set((state) => {
      const element = state.modifiedElements[elementPath] || {};
      const areaModifications = element[area] || {};

      if (isGroup) {
        Object.entries(value).forEach(([prop, val]) => {
          areaModifications[prop] = val;
        });
        areaModifications.groupProperties =
          areaModifications.groupProperties || {};
        areaModifications.groupProperties[property] = true;
      } else {
        areaModifications[property] = value;
      }

      const newModifiedElements = {
        ...state.modifiedElements,
        [elementPath]: {
          ...element,
          [area]: areaModifications,
          friendlyIdentifier,
        },
      };

      return {
        modifiedElements: newModifiedElements,
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
            if (property !== 'groupProperties') {
              document[xPath].styles[property] = value;
            }
          });
        }
      });
    });
    return document;
  },
}));

export default useStyleStore;
