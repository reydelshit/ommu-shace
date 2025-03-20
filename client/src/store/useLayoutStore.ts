// First, create a store file: src/store/useLayoutStore.ts
import { create } from 'zustand';

export const GRID_LAYOUTS = {
  Single: 'grid-cols-1',
  Double: 'grid-cols-2',
  Triple: 'grid-cols-3',
  Quad: 'grid-cols-4',
  Masonry: 'columns-2 md:columns-3',
  Sidebar: 'grid-cols-[250px_1fr]',
};

export type GridLayout = keyof typeof GRID_LAYOUTS;

interface LayoutState {
  layout: GridLayout;
  setLayout: (layout: GridLayout) => void;
}

export const useLayoutStore = create<LayoutState>((set) => ({
  layout: 'Single',
  setLayout: (layout) => set({ layout }),
}));
