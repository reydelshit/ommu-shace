import { create } from 'zustand';

interface LoginModalStore {
  showLoginModal: boolean;
  setShowLoginModal: (show: boolean) => void;
}

export const useLoginModalStore = create<LoginModalStore>((set) => ({
  showLoginModal: false,
  setShowLoginModal: (show) => set({ showLoginModal: show }),
}));
