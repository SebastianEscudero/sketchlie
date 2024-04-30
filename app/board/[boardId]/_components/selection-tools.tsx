"use client";

import { memo, useCallback } from "react";
import { BringToFront, SendToBack, Trash2 } from "lucide-react";

import { Hint } from "@/components/hint";
import { Camera, Color, UpdateLayerMutation  } from "@/types/canvas";
import { Button } from "@/components/ui/button";
import { useSelectionBounds } from "@/hooks/use-selection-bounds";
import { ColorPicker } from "./color-picker";
import { Socket } from "socket.io-client";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";

interface SelectionToolsProps {
  boardId: string;
  camera: Camera;
  setLastUsedColor: (color: Color) => void;
  zoom: number;
  selectedLayers: string[];
  liveLayers: any;
  liveLayerIds: string[];
  setLiveLayers: (layers: any) => void;
  setLiveLayerIds: (ids: string[]) => void;
  socket: Socket | null;
  updateLayer: UpdateLayerMutation;
};

export const SelectionTools = memo(({
  boardId,
  camera,
  setLastUsedColor,
  zoom,
  selectedLayers,
  setLiveLayers,
  setLiveLayerIds,
  liveLayers,
  liveLayerIds,
  socket,
  updateLayer
}: SelectionToolsProps) => {
  const { mutate: updateLayerIds } = useApiMutation(api.board.updateLayerIds);
  const { mutate: deleteLayer } = useApiMutation(api.board.deleteLayer);
  const moveToFront = useCallback(() => {
    const indices: number[] = [];
  
    if (!liveLayerIds) {
      return;
    }
  
    let arr = [...liveLayerIds];

    for (let i = 0; i < arr.length; i++) {
      if (selectedLayers.includes(arr[i])) {
        indices.push(i);
      }
    }
  
    const move = (arr: any[], fromIndex: number, toIndex: number) => {
      var element = arr[fromIndex];
      arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, element);
    }
  
    for (let i = 0; i < indices.length; i++) {
      move(arr, indices[i], arr.length - indices.length + i);
    }
    
    setLiveLayerIds(arr);
    
    updateLayerIds({ 
      boardId: boardId,
      layerIds: arr
    });

    if (socket) {
      socket.emit('layer-send', arr);
    }

  }, [selectedLayers, setLiveLayerIds, liveLayerIds, updateLayerIds, boardId, socket]);
  
  const moveToBack = useCallback(() => {
    const indices: number[] = [];
  
    if (!liveLayerIds) {
      return;
    }
  
    let arr = [...liveLayerIds];
  
    for (let i = 0; i < arr.length; i++) {
      if (selectedLayers.includes(arr[i])) {
        indices.push(i);
      }
    }
  
    const move = (arr: any[], fromIndex: number, toIndex: number) => {
      var element = arr[fromIndex];
      arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, element);
    }
  
    for (let i = 0; i < indices.length; i++) {
      move(arr, indices[i], i);
    }
    
    setLiveLayerIds(arr);

    updateLayerIds({ 
      boardId: boardId,
      layerIds: arr
    });

    if (socket) {
      socket.emit('layer-send', arr);
    }

  }, [selectedLayers, setLiveLayerIds, liveLayerIds, updateLayerIds, boardId, socket]);
  
  const setFill = useCallback((fill: Color) => {
    setLastUsedColor(fill);
  
    setLiveLayers((prevLayers: any) => {
      const newLayers = { ...prevLayers };
  
      selectedLayers.forEach((id) => {
        const layer = newLayers[id];
        if (layer) {
          newLayers[id].fill = fill;
        }
        if (socket) {
          socket.emit('layer-update', id, newLayers[id]);
        }
        
        updateLayer({ 
          boardId: boardId,
          layerId: id,
          layerUpdates: { fill }
        });

      });

      return newLayers;
    });
  }, [selectedLayers, setLastUsedColor, setLiveLayers, socket, updateLayer, boardId]);

  const deleteLayers = useCallback(() => {  
    let newLiveLayers = { ...liveLayers };
    let newLiveLayerIds = liveLayerIds.filter(id => !selectedLayers.includes(id));
  
    selectedLayers.forEach((id) => {
      delete newLiveLayers[id];
  
      if (socket) {
        socket.emit('layer-delete', id);
      }
  
      deleteLayer({ 
        boardId: boardId,
        layerId: id 
      });
    });
  
    setLiveLayers(newLiveLayers);
    setLiveLayerIds(newLiveLayerIds);
  
  }, [selectedLayers, liveLayers, setLiveLayers, liveLayerIds, setLiveLayerIds, socket, deleteLayer, boardId]);

  const selectionBounds = useSelectionBounds(selectedLayers, liveLayers);

  if (!selectionBounds) {
    return null;
  }

  const x = (selectionBounds.width / 2 + selectionBounds.x) * zoom + camera.x;
  const y = (selectionBounds.y) * zoom + camera.y;

  return (
    <div
      className="absolute p-3 rounded-xl bg-white shadow-sm border flex select-none gap-x-2 items-center"
      style={{
        transform: `translate(
          calc(${x}px - 50%),
          calc(${y - 16}px - 100%)
        )`
      }}
    >
      <ColorPicker
        onChange={setFill}
      />
      <Hint label="Bring to front">
        <Button
          onClick={moveToFront}
          variant="board"
          size="icon"
        >
          <BringToFront />
        </Button>
      </Hint>
      <Hint label="Send to back" side="bottom">
        <Button
          onClick={moveToBack}
          variant="board"
          size="icon"
        >
          <SendToBack />
        </Button>
      </Hint>
      <div className="flex items-center pl-2 ml-2 border-l border-neutral-200">
        <Hint label="Delete">
          <Button
            variant="board"
            size="icon"
            onClick={deleteLayers}
          >
            <Trash2 />
          </Button>
        </Hint>
      </div>
    </div>
  );
});

SelectionTools.displayName = "SelectionTools";