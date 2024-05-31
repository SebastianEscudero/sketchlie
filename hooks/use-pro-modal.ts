import { create } from "zustand";

interface useProModalStore {
    isOpen: boolean;
    activeOrganization: string | null;
    onOpen: (activeOrganization: string | null) => void;
    onClose: () => void;
};

export const useProModal = create<useProModalStore>((set) => ({
    isOpen: false,
    activeOrganization: null,
    onOpen: (activeOrganization: string | null) => set({ isOpen: true, activeOrganization }),
    onClose: () => set({ isOpen: false, activeOrganization: null }),
}));