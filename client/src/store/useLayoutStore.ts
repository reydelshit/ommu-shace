import { create } from 'zustand';

export const GRID_LAYOUTS = {
  Single: 'grid-cols-1',
  Double: 'grid-cols-2',
  Triple: 'grid-cols-3',
  Quad: 'grid-cols-4',
  Sidebar: 'grid-cols-[250px_1fr]',
};

export type GridLayout = keyof typeof GRID_LAYOUTS;

interface LayoutState {
  layout: GridLayout;
  setLayout: (layout: GridLayout) => void;
}

export const useLayoutStore = create<LayoutState>((set) => {
  const savedLayout = (localStorage.getItem('gridLayout') as GridLayout) || 'Double';

  return {
    layout: savedLayout,
    setLayout: (layout) => {
      localStorage.setItem('gridLayout', layout);
      set({ layout });
    },
  };
});
