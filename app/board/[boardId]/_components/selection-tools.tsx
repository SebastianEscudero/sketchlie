"use client";

import { memo, useCallback, useEffect, useState } from "react";
import { BringToFront, SendToBack, Trash2 } from "lucide-react";
import { Hint } from "@/components/hint";
import { Camera, Color, LayerType, UpdateLayerMutation  } from "@/types/canvas";
import { Button } from "@/components/ui/button";
import { useSelectionBounds } from "@/hooks/use-selection-bounds";
import { ColorPicker } from "../selection-tools/color-picker";
import { FontSizePicker } from "../selection-tools/font-size-picker"
import { Socket } from "socket.io-client";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";

interface SelectionToolsProps {
  boardId: string;
  camera: Camera;
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
  zoom,
  selectedLayers,
  setLiveLayers,
  setLiveLayerIds,
  liveLayers,
  liveLayerIds,
  socket,
  updateLayer,
}: SelectionToolsProps) => {
  const { mutate: updateLayerIds } = useApiMutation(api.board.updateLayerIds);
  const { mutate: deleteLayer } = useApiMutation(api.board.deleteLayer);

  let isTextOrNoteLayer = selectedLayers.every(layer => 
    liveLayers[layer]?.type === LayerType.Text || liveLayers[layer]?.type === LayerType.Note
  );
  let isImageLayer = selectedLayers.every(layer => liveLayers[layer]?.type === LayerType.Image);
  let isArrowLayer = selectedLayers.every(layer => liveLayers[layer]?.type === LayerType.Arrow);
  const layers = selectedLayers.map(id => liveLayers[id]);
  const [initialPosition, setInitialPosition] = useState<{x: number, y: number} | null>(null);
  const selectionBounds = useSelectionBounds(selectedLayers, liveLayers);

  useEffect(() => {
    if (selectionBounds) {
      let x, y;
      if (isArrowLayer) {
        const arrowLayer = liveLayers[selectedLayers[0]];
        const centerY = arrowLayer.center.y
        const startY = arrowLayer.y
        const endY = arrowLayer.y + arrowLayer.height
        x = (arrowLayer.width / 2 + arrowLayer.x) * zoom + camera.x;
        y = Math.min(centerY, startY, endY) * zoom + camera.y;
      } else {
        x = (selectionBounds.width / 2 + selectionBounds.x) * zoom + camera.x;
        y = (selectionBounds.y) * zoom + camera.y;
      }
      setInitialPosition({x, y});
    }
  }, [selectedLayers, zoom, camera]);

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
    setLiveLayers((prevLayers: any) => {
      const newLayers = { ...prevLayers };
      const updatedIds: any = [];
      const updatedLayers: any = [];
  
      selectedLayers.forEach((id) => {
        const layer = newLayers[id];
        if (layer) {
          newLayers[id].fill = fill;
          updatedIds.push(id);
          updatedLayers.push(newLayers[id]);
        }
      });
  
      if (updatedIds.length > 0) {
        updateLayer({ 
          boardId: boardId,
          layerId: updatedIds,
          layerUpdates: updatedLayers.map(() => ({ fill }))
        });
      }
  
      if (socket) {
        socket.emit('layer-update', updatedIds, updatedLayers);
      }
  
      return newLayers;
    });
  }, [selectedLayers, setLiveLayers, socket, updateLayer, boardId]);

  const deleteLayers = useCallback(() => {  
    let newLiveLayers = { ...liveLayers };
    let newLiveLayerIds = liveLayerIds.filter(id => !selectedLayers.includes(id));
  
    deleteLayer({ 
      boardId: boardId,
      layerId: selectedLayers 
    });

    selectedLayers.forEach((id) => {
      delete newLiveLayers[id];
    });
  
    if (socket) {
      socket.emit('layer-delete', selectedLayers);
    }

    setLiveLayers(newLiveLayers);
    setLiveLayerIds(newLiveLayerIds);
  }, [liveLayers, liveLayerIds, selectedLayers, socket, deleteLayer, boardId]);

  if (!selectionBounds) {
    return null;
  }

  return (
    <div
      className="absolute p-1 rounded-sm bg-white shadow-sm border flex select-none gap-x-2 items-center"
      style={{
        transform: initialPosition
          ? `translate(
              calc(${initialPosition.x}px - 50%),
              calc(${initialPosition.y - 30}px - 100%)
            )`
          : undefined
      }}
    >
      {isTextOrNoteLayer && (
        <FontSizePicker
          selectedLayers={selectedLayers}
          setLiveLayers={setLiveLayers}
          liveLayers={liveLayers}
          updateLayer={updateLayer}
          boardId={boardId}
          socket={socket}
        />
      )}
      {!isImageLayer && (
        <ColorPicker
          layers={layers}
          onChange={setFill}
        />
      )}
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
      <div className="flex items-center pl-2 border-l border-neutral-200">
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