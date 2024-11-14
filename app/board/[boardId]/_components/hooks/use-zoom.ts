import { create } from "zustand";

interface ZoomState {
  zoom: number;
  setZoom: (zoom: number) => void;
}

export const useZoom = create<ZoomState>((set) => ({
  zoom: 1,
  setZoom: (zoom) => set({ zoom }),
}));