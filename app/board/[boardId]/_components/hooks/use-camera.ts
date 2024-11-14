import { Camera } from "@/types/canvas";
import { create } from "zustand";

interface CameraState {
  camera: Camera;
  setCamera: (camera: Camera) => void;
}

export const useCamera = create<CameraState>((set) => ({
  camera: { x: 0, y: 0 },
  setCamera: (camera) => set({ camera }),
}));