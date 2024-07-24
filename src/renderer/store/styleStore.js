import { create } from 'zustand';

const useStyleStore = create((set) => ({
  modifiedElements: {},
  addModification: (elementPath, area, property) =>
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
              [property]: true,
            },
          },
        },
      };
    }),
  resetModifications: () => set({ modifiedElements: {} }),
}));

export default useStyleStore;
