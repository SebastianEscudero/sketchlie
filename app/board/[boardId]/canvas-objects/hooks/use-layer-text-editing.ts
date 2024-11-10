import { create } from 'zustand';

interface LayerTextEditingState {
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
}

export const useLayerTextEditingStore = create<LayerTextEditingState>((set) => ({
  isEditing: false,
  setIsEditing: (isEditing) => set({ isEditing }),
}));