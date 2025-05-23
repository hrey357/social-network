import { create } from 'zustand';
import { persist } from 'zustand/middleware';


interface ModalState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const useModalStore = create<ModalState>()(
  persist(
    ( set ) => ( {
      isOpen: false,
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false })
    } ),
    { name: 'Modals-store' }
  )

);