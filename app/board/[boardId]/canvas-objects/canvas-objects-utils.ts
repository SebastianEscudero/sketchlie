import { throttle } from "lodash";
import { updateR2Bucket } from "@/lib/r2-bucket-functions";
import { useCallback } from "react";
import { Socket } from "socket.io-client";

const throttledUpdateLayer = throttle((boardId, layerId, layerUpdates) => {
  updateR2Bucket('/api/r2-bucket/updateLayer', boardId, layerId, layerUpdates);
}, 1000);

export const useUpdateValue = () => {
  return useCallback((boardId: string, id: string, layer: any, newValue: string, expired: boolean, socket: Socket, setEditableValue: (newValue: string) => void) => {
    setEditableValue(newValue);
    layer.value = newValue;
    const layerUpdates = { ...layer, value: newValue };
    if (expired !== true) {
      throttledUpdateLayer(boardId, id, layerUpdates);
      if (socket) {
        socket.emit('layer-update', id, layerUpdates);
      }
    }
  }, []);
};

export const useHandlePaste = () => {
  return useCallback(async (e: React.ClipboardEvent) => {
    e.preventDefault();
    const text = await navigator.clipboard.readText();
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      range.deleteContents();
      range.insertNode(document.createTextNode(text));
    }
  }, []);
};