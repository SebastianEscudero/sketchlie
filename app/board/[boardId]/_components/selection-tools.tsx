"use client";

import { memo, useCallback, useEffect, useState } from "react";
import { BringToFront, Copy, SendToBack, Trash2 } from "lucide-react";
import { Hint } from "@/components/hint";
import { Camera, CanvasMode, Color, LayerType, Presence, SelectorType, UpdateLayerMutation } from "@/types/canvas";
import { Button } from "@/components/ui/button";
import { useSelectionBounds } from "@/hooks/use-selection-bounds";
import { ColorPicker } from "../selection-tools/color-picker";
import { FontSizePicker } from "../selection-tools/font-size-picker"
import { Socket } from "socket.io-client";
import { OutlineColorPicker } from "../selection-tools/outline-color-picker";
import { ArrowHeadSelection } from "../selection-tools/arrow-head-selection";
import { PathStokeSizeSelection } from "../selection-tools/path-stroke-size-selection";
import { customAlphabet } from "nanoid";
import { getMaxCapas } from "@/lib/planLimits";
import { TextJustifySelector } from "../selection-tools/text-justify-selector";
import { updateR2Bucket } from "@/lib/r2-bucket-functions";

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
  DeleteLayerCommand: any;
  performAction: any;
  org: any;
  proModal: any;
  InsertLayerCommand: any;
  myPresence: Presence | null;
  setMyPresence: (presence: Presence) => void;
  canvasState: CanvasMode;
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
  DeleteLayerCommand,
  performAction,
  org,
  proModal,
  InsertLayerCommand,
  myPresence,
  setMyPresence,
  canvasState
}: SelectionToolsProps) => {
  const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const nanoid = customAlphabet(alphabet, 21);
  const [openSelector, setOpenSelector] = useState<SelectorType | null>(null);

  const hasText = selectedLayers.every(layer =>
    liveLayers[layer]?.type === LayerType.Text ||
    liveLayers[layer]?.type === LayerType.Note ||
    liveLayers[layer]?.type === LayerType.Rectangle ||
    liveLayers[layer]?.type === LayerType.Ellipse ||
    liveLayers[layer]?.type === LayerType.Rhombus ||
    liveLayers[layer]?.type === LayerType.Triangle ||
    liveLayers[layer]?.type === LayerType.Star ||
    liveLayers[layer]?.type === LayerType.Hexagon ||
    liveLayers[layer]?.type === LayerType.BigArrowLeft ||
    liveLayers[layer]?.type === LayerType.BigArrowRight ||
    liveLayers[layer]?.type === LayerType.BigArrowUp ||
    liveLayers[layer]?.type === LayerType.BigArrowDown ||
    liveLayers[layer]?.type === LayerType.CommentBubble
  );

  const isImageLayer = selectedLayers.some(layer => liveLayers[layer]?.type === LayerType.Image);
  const hasOutline = selectedLayers.every(layer =>
    liveLayers[layer]?.type === LayerType.Note ||
    liveLayers[layer]?.type === LayerType.Rectangle ||
    liveLayers[layer]?.type === LayerType.Ellipse ||
    liveLayers[layer]?.type === LayerType.Rhombus ||
    liveLayers[layer]?.type === LayerType.Triangle ||
    liveLayers[layer]?.type === LayerType.Star ||
    liveLayers[layer]?.type === LayerType.Hexagon ||
    liveLayers[layer]?.type === LayerType.BigArrowLeft ||
    liveLayers[layer]?.type === LayerType.BigArrowRight ||
    liveLayers[layer]?.type === LayerType.BigArrowUp ||
    liveLayers[layer]?.type === LayerType.BigArrowDown ||
    liveLayers[layer]?.type === LayerType.CommentBubble
  );
  const isArrowLayer = selectedLayers.every(layer => liveLayers[layer]?.type === LayerType.Arrow);
  const isLineLayer = selectedLayers.every(layer => liveLayers[layer]?.type === LayerType.Line);
  const isPathLayer = selectedLayers.every(layer => liveLayers[layer]?.type === LayerType.Path);

  const layers = selectedLayers.map(id => liveLayers[id]);
  const [initialPosition, setInitialPosition] = useState<{ x: number, y: number } | null>(null);
  const selectionBounds = useSelectionBounds(selectedLayers, liveLayers);

  useEffect(() => {
    if (canvasState !== CanvasMode.None) {
      setOpenSelector(null);
    }
  }, [canvasState]);

  useEffect(() => {
    if (selectionBounds) {
      let x, y;
      if (isArrowLayer || isLineLayer) {
        const arrowLayer = liveLayers[selectedLayers[0]];
        const centerY = arrowLayer.center.y
        const startY = arrowLayer.y
        const endY = arrowLayer.y + arrowLayer.height
        x = (arrowLayer.width / 2 + arrowLayer.x) * zoom + camera.x;
        y = Math.min(centerY, startY, endY) * zoom + camera.y;

        if (y < 130) {
          y = Math.max(centerY, startY, endY) * zoom + camera.y + 130;
        }
      } else {
        x = (selectionBounds.width / 2 + selectionBounds.x) * zoom + camera.x;
        y = (selectionBounds.y) * zoom + camera.y;
      }
      setInitialPosition({ x, y });
    }
  }, [selectedLayers, zoom, camera, liveLayers]);

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

    updateR2Bucket('/api/r2-bucket/updateLayerIds', boardId, arr);

    if (socket) {
      socket.emit('layer-send', arr);
    }

  }, [selectedLayers, setLiveLayerIds, liveLayerIds, boardId, socket]);

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

    updateR2Bucket('/api/r2-bucket/updateLayerIds', boardId, arr);

    if (socket) {
      socket.emit('layer-send', arr);
    }

  }, [selectedLayers, setLiveLayerIds, liveLayerIds, boardId, socket]);

  const setFill = useCallback((fill: Color) => {
    setLiveLayers((prevLayers: any) => {
      const newLayers = { ...prevLayers };
      const updatedIds: any = [];
      const updatedLayers: any = [];

      selectedLayers.forEach((id) => {
        const layer = newLayers[id];
        if (layer) {
          newLayers[id] = { ...layer, fill: fill };
          updatedIds.push(id);
          updatedLayers.push(newLayers[id]);
        }
      });

      if (updatedIds.length > 0) {
        updateR2Bucket('/api/r2-bucket/updateLayer', boardId, updatedIds, updatedLayers);
      }

      if (socket) {
        socket.emit('layer-update', updatedIds, updatedLayers);
      }

      return newLayers;
    });
  }, [selectedLayers, setLiveLayers, socket, boardId]);

  const setOutlineFill = useCallback((outlineFill: Color) => {
    setLiveLayers((prevLayers: any) => {
      const newLayers = { ...prevLayers };
      const updatedIds: any = [];
      const updatedLayers: any = [];

      selectedLayers.forEach((id) => {
        const layer = newLayers[id];
        if (layer) {
          newLayers[id] = { ...layer, outlineFill: outlineFill };
          updatedIds.push(id);
          updatedLayers.push(newLayers[id]);
        }
      });

      updateR2Bucket('/api/r2-bucket/updateLayer', boardId, updatedIds, updatedLayers);


      if (socket) {
        socket.emit('layer-update', updatedIds, updatedLayers);
      }

      return newLayers;
    });
  }, [selectedLayers, setLiveLayers, boardId, socket]);

  const duplicateLayers = useCallback(() => {
    if (org && liveLayerIds.length >= getMaxCapas(org)) {
      proModal.onOpen(org._id);
      return;
    }
  
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    selectedLayers.forEach((id) => {
      const layer = liveLayers[id];
      minX = Math.min(minX, layer.x);
      minY = Math.min(minY, layer.y);
      maxX = Math.max(maxX, layer.x + layer.width);
      maxY = Math.max(maxY, layer.y + layer.height);
    });
  
    const offsetX = maxX - minX + 10; // Offset by 10 units for visibility
  
    const newSelection = [] as string[];
    const newLiveLayers = { ...liveLayers };
    const newLiveLayerIds = [...liveLayerIds];
    const newIds: any = [];
    const clonedLayers: any = [];
    selectedLayers.forEach((id) => {
      const layer = liveLayers[id];
      const newId = nanoid();
      newSelection.push(newId);
      newLiveLayerIds.push(newId);
      const clonedLayer = JSON.parse(JSON.stringify(layer));
      clonedLayer.x = clonedLayer.x + offsetX;
      if (clonedLayer.type === LayerType.Arrow || clonedLayer.type === LayerType.Line) {
        clonedLayer.center.x += offsetX;
      }
      newLiveLayers[newId] = clonedLayer;
      newIds.push(newId);
      clonedLayers.push(clonedLayer);
    });
  
    const command = new InsertLayerCommand(newIds, clonedLayers, liveLayers, liveLayerIds, setLiveLayers, setLiveLayerIds, boardId, socket);
    performAction(command);
    setLiveLayers(newLiveLayers);
    setLiveLayerIds(newLiveLayerIds);
  
    const newPresence: Presence = {
      ...myPresence,
      selection: newSelection
    };
  
    setMyPresence(newPresence);
  
  }, [selectedLayers, myPresence, setLiveLayers, setLiveLayerIds, setMyPresence, org, proModal, liveLayerIds, socket, liveLayers, performAction, InsertLayerCommand, boardId, nanoid]);

  const deleteLayers = useCallback(() => {
    let newLiveLayers = { ...liveLayers };
    let newLiveLayerIds = liveLayerIds.filter(id => !selectedLayers.includes(id));

    const command = new DeleteLayerCommand(selectedLayers, liveLayers, liveLayerIds, setLiveLayers, setLiveLayerIds, boardId, socket);
    performAction(command);

    selectedLayers.forEach((id) => {
      delete newLiveLayers[id];
    });

    setLiveLayers(newLiveLayers);
    setLiveLayerIds(newLiveLayerIds);
  }, [liveLayers, liveLayerIds, selectedLayers, socket, setLiveLayers, setLiveLayerIds, performAction, DeleteLayerCommand, boardId]);

  if (!selectionBounds) {
    return null;
  }

  let position = 0
  if (initialPosition) {
    position = initialPosition.y < 130
      ? initialPosition.y + selectionBounds.height * zoom + 30
      : initialPosition.y - 30;
  }

  return (
    <div
      className="absolute p-1 rounded-sm bg-white shadow-sm border flex select-none gap-x-2 items-center"
      style={{
        transform: initialPosition
          ? `translate(
          calc(${initialPosition.x < 300 ? 300 : initialPosition.x + 230 > window.innerWidth ? window.innerWidth - 230 : initialPosition.x}px - 50%),
          ${initialPosition.y < 130
            ? `calc(${initialPosition.y + selectionBounds.height * zoom + 30}px)`
            : `calc(${initialPosition.y - 30}px - 100%)`
          }
        )`
          : undefined
      }}
    >
      {isPathLayer && (
        <PathStokeSizeSelection
          selectedLayers={selectedLayers}
          setLiveLayers={setLiveLayers}
          liveLayers={liveLayers}
          socket={socket}
          boardId={boardId}
        />
      )}
      {isArrowLayer && (
        <ArrowHeadSelection
          selectedLayers={selectedLayers}
          setLiveLayers={setLiveLayers}
          liveLayers={liveLayers}
          socket={socket}
          boardId={boardId}
          openSelector={openSelector}
          setOpenSelector={setOpenSelector}
          expandUp={position + 50 + 80 > window.innerHeight}
        />
      )}
      {hasText && (
        <FontSizePicker
          selectedLayers={selectedLayers}
          setLiveLayers={setLiveLayers}
          liveLayers={liveLayers}
          socket={socket}
          boardId={boardId}
          openSelector={openSelector}
          setOpenSelector={setOpenSelector}
          expandUp={position + 50 + 460 > window.innerHeight}
        />
      )}
      {hasText && (
        <TextJustifySelector
          selectedLayers={selectedLayers}
          setLiveLayers={setLiveLayers}
          liveLayers={liveLayers}
          socket={socket}
          boardId={boardId}
          openSelector={openSelector}
          setOpenSelector={setOpenSelector}
          expandUp={position + 50 + 113 > window.innerHeight}
        />
      )}
      {hasOutline && (
        <OutlineColorPicker
          layers={layers}
          onChange={setOutlineFill}
          openSelector={openSelector}
          setOpenSelector={setOpenSelector}
          expandUp={position + 50 + 205 > window.innerHeight}
        />
      )}
      {!isImageLayer && (
        <ColorPicker
          layers={layers}
          onChange={setFill}
          openSelector={openSelector}
          setOpenSelector={setOpenSelector}
          expandUp={position + 50 + 205 > window.innerHeight}
        />
      )}
      <Hint label="Duplicate">
        <Button
          onClick={duplicateLayers}
          variant="board"
          size="icon"
        >
          <Copy />
        </Button>
      </Hint>
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