import { create } from "zustand";

interface useOrgButtonDialog {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

export const useOrgButton = create<useOrgButtonDialog>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));