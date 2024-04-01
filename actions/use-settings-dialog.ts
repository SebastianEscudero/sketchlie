import { create } from "zustand";

interface useSettingsDialogStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

export const useSettingsDialog = create<useSettingsDialogStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));