"use client";

import { memo, useCallback, useEffect, useState } from "react";
import { BringToFront, Copy, SendToBack, Sparkles, Trash2, WandSparkles } from "lucide-react";
import { Hint } from "@/components/hint";
import { Camera, CanvasMode, Color, Layer, LayerType, Presence, SelectorType } from "@/types/canvas";
import { Button } from "@/components/ui/button";
import { useSelectionBounds } from "@/hooks/use-selection-bounds";
import { ColorPicker } from "../selection-tools/color-picker";
import { FontSizePicker } from "../selection-tools/font-size-picker"
import { Socket } from "socket.io-client";
import { OutlineColorPicker } from "../selection-tools/outline-color-picker";
import { ArrowHeadSelection } from "../selection-tools/arrow-head-selection";
import { PathStokeSizeSelection } from "../selection-tools/path-stroke-size-selection";
import { customAlphabet } from "nanoid";
import { TextJustifySelector } from "../selection-tools/text-justify-selector";
import { updateR2Bucket } from "@/lib/r2-bucket-functions";
import { DeleteLayerCommand, InsertLayerCommand } from "@/lib/commands";
import { SketchlieAiDropdown } from "./sketchlie-ai-dropdown";

interface SelectionToolsProps {
  board: any;
  boardId: string;
  camera: Camera;
  zoom: number;
  selectedLayersRef: any
  liveLayers: any;
  liveLayerIds: string[];
  setLiveLayers: (layers: any) => void;
  setLiveLayerIds: (ids: string[]) => void;
  socket: Socket | null;
  performAction: (command: any) => void;
  org: any;
  proModal: any;
  myPresence: Presence | null;
  setMyPresence: (presence: Presence) => void;
  canvasState: CanvasMode;
};

export const SelectionTools = memo(({
  board,
  boardId,
  camera,
  zoom,
  selectedLayersRef,
  setLiveLayers,
  setLiveLayerIds,
  liveLayers,
  liveLayerIds,
  socket,
  performAction,
  org,
  proModal,
  myPresence,
  setMyPresence,
  canvasState
}: SelectionToolsProps) => {
  const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const nanoid = customAlphabet(alphabet, 21);
  const [openSelector, setOpenSelector] = useState<SelectorType | null>(null);

  let hasText = true, isImageLayer = false, hasOutline = true, isArrowLayer = true, isLineLayer = true, isPathLayer = true;

  selectedLayersRef.current.forEach((id: string) => {
    const type = liveLayers[id]?.type;
    const isTextType = [LayerType.Text, LayerType.Note, LayerType.Rectangle, LayerType.Ellipse, LayerType.Rhombus, LayerType.Triangle, LayerType.Star, LayerType.Hexagon, LayerType.BigArrowLeft, LayerType.BigArrowRight, LayerType.BigArrowUp, LayerType.BigArrowDown, LayerType.CommentBubble].includes(type);
    const isOutlineType = [LayerType.Note, LayerType.Rectangle, LayerType.Ellipse, LayerType.Rhombus, LayerType.Triangle, LayerType.Star, LayerType.Hexagon, LayerType.BigArrowLeft, LayerType.BigArrowRight, LayerType.BigArrowUp, LayerType.BigArrowDown, LayerType.CommentBubble].includes(type);
  
    // Update conditions based on the current layer type
    hasText = hasText && isTextType;
    isImageLayer = isImageLayer || type === LayerType.Image;
    hasOutline = hasOutline && isOutlineType;
    isArrowLayer = isArrowLayer && type === LayerType.Arrow;
    isLineLayer = isLineLayer && type === LayerType.Line;
    isPathLayer = isPathLayer && type === LayerType.Path;
  });
  
  // Continue with the rest of the code
  const layers = selectedLayersRef.current.map((id: string) => liveLayers[id]);
  const [initialPosition, setInitialPosition] = useState<{ x: number, y: number } | null>(null);
  const selectionBounds = useSelectionBounds(selectedLayersRef.current, liveLayers);

  useEffect(() => {
    if (canvasState !== CanvasMode.None) {
      setOpenSelector(null);
    }
  }, [canvasState]);

  useEffect(() => {
    if (selectionBounds) {
      let x, y;
      if (isArrowLayer || isLineLayer) {
        const arrowLayer = liveLayers[selectedLayersRef.current[0]];
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
  }, [selectedLayersRef.current, zoom, camera, liveLayers]);

  const moveToFront = useCallback(() => {
    const indices: number[] = [];

    if (!liveLayerIds) {
      return;
    }

    let arr = [...liveLayerIds];

    for (let i = 0; i < arr.length; i++) {
      if (selectedLayersRef.current.includes(arr[i])) {
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

  }, [selectedLayersRef.current, setLiveLayerIds, liveLayerIds, boardId, socket]);

  const moveToBack = useCallback(() => {
    const indices: number[] = [];

    if (!liveLayerIds) {
      return;
    }

    let arr = [...liveLayerIds];

    for (let i = 0; i < arr.length; i++) {
      if (selectedLayersRef.current.includes(arr[i])) {
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

  }, [selectedLayersRef.current, setLiveLayerIds, liveLayerIds, boardId, socket]);

  const setFill = useCallback((fill: Color) => {
    setLiveLayers((prevLayers: any) => {
      const newLayers = { ...prevLayers };
      const updatedIds: any = [];
      const updatedLayers: any = [];

      selectedLayersRef.current.forEach((id: string) => {
        const layer = newLayers[id];
        let opacity = layer.fill.a;
        
        if (fill.a === 0) {
          opacity = 0;
        } else {
          if (layer.fill.a === 0) {
            opacity = 1;
          }
        }

        newLayers[id] = { ...layer, fill: { ...fill, a: opacity } };
        updatedIds.push(id);
        updatedLayers.push(newLayers[id]);
      });

      if (updatedIds.length > 0) {
        updateR2Bucket('/api/r2-bucket/updateLayer', boardId, updatedIds, updatedLayers);
      }

      if (socket) {
        socket.emit('layer-update', updatedIds, updatedLayers);
      }

      return newLayers;
    });
  }, [selectedLayersRef.current, setLiveLayers, socket, boardId]);

  const setOutlineFill = useCallback((outlineFill: Color) => {
    setLiveLayers((prevLayers: any) => {
      const newLayers = { ...prevLayers };
      const updatedIds: any = [];
      const updatedLayers: any = [];

      selectedLayersRef.current.forEach((id: string) => {
        const layer = newLayers[id];
        let opacity = layer.outlineFill.a;

        if (outlineFill.a === 0) {
          opacity = 0;
        } else {
          if (layer.outlineFill.a === 0) {
            opacity = 1;
          }
        }

        newLayers[id] = { ...layer, outlineFill: { ...outlineFill, a: opacity } };
        updatedIds.push(id);
        updatedLayers.push(newLayers[id]);
      });

      updateR2Bucket('/api/r2-bucket/updateLayer', boardId, updatedIds, updatedLayers);


      if (socket) {
        socket.emit('layer-update', updatedIds, updatedLayers);
      }

      return newLayers;
    });
  }, [selectedLayersRef.current, setLiveLayers, boardId, socket]);

  const setOpacity = useCallback((opacity: number[]) => {
    setLiveLayers((prevLayers: any) => {
      const newLayers = { ...prevLayers };
      const updatedIds: any = [];
      const updatedLayers: any = [];

      selectedLayersRef.current.forEach((id: string) => {
        const layer = newLayers[id];
        if (layer) {
          newLayers[id] = { ...layer, fill: { ...layer.fill, a: opacity[0] } };
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
  }, [selectedLayersRef.current, setLiveLayers, boardId, socket])

  const setOutlineOpacity = useCallback((opacity: number[]) => {
    setLiveLayers((prevLayers: any) => {
      const newLayers = { ...prevLayers };
      const updatedIds: any = [];
      const updatedLayers: any = [];

      selectedLayersRef.current.forEach((id: string) => {
        const layer = newLayers[id];
        if (layer) {
          newLayers[id] = { ...layer, outlineFill: { ...layer.outlineFill, a: opacity[0] } };
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
  }, [selectedLayersRef.current, setLiveLayers, boardId, socket])

  const duplicateLayers = useCallback(() => {
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    selectedLayersRef.current.forEach((id: string) => {
      const layer = liveLayers[id];
      minX = Math.min(minX, layer.x);
      minY = Math.min(minY, layer.y);
      maxX = Math.max(maxX, layer.x + layer.width);
      maxY = Math.max(maxY, layer.y + layer.height);
    });
  
    const offsetX = maxX - minX + 10; // Offset by 10 units for visibility
  
    const idMap = new Map();
    const newLayers: Record<string, Layer> = {};
    selectedLayersRef.current.forEach((id: string) => {
        const layer = { ...liveLayers[id] };

        const newId = nanoid();
        const clonedLayer = JSON.parse(JSON.stringify(layer));
        clonedLayer.x = clonedLayer.x + offsetX;
        if (clonedLayer.type === LayerType.Arrow || clonedLayer.type === LayerType.Line) {
            clonedLayer.center.x += offsetX;
        }
        idMap.set(id, newId);
        newLayers[newId] = clonedLayer;
    });

    Object.values(newLayers).forEach((layer) => {
      if (layer.type === LayerType.Arrow) {
          if (layer.startConnectedLayerId && idMap.has(layer.startConnectedLayerId)) {
              layer.startConnectedLayerId = idMap.get(layer.startConnectedLayerId);
          } else {
              layer.startConnectedLayerId = "";
          }
          if (layer.endConnectedLayerId && idMap.has(layer.endConnectedLayerId)) {
              layer.endConnectedLayerId = idMap.get(layer.endConnectedLayerId);
          } else {
              layer.endConnectedLayerId = "";
          }
      } else if (layer.type === LayerType.Rectangle && layer.connectedArrows) {
          layer.connectedArrows = layer.connectedArrows.map(arrowId => idMap.get(arrowId) || arrowId);
      }
  });

  const newIds = Object.keys(newLayers);
  const clonedLayers = Object.values(newLayers);
  
    const command = new InsertLayerCommand(newIds, clonedLayers, setLiveLayers, setLiveLayerIds, boardId, socket, org, proModal);
    performAction(command);

    selectedLayersRef.current = newIds;
  
    const newPresence: Presence = {
      ...myPresence,
      selection: newIds
    };
  
    setMyPresence(newPresence);
  
  }, [selectedLayersRef.current, myPresence, setLiveLayers, setLiveLayerIds, setMyPresence, org, proModal, liveLayerIds, socket, liveLayers, performAction, InsertLayerCommand, boardId, nanoid]);

  const deleteLayers = useCallback(() => {
    let newLiveLayers = { ...liveLayers };
    let newLiveLayerIds = liveLayerIds.filter(id => !selectedLayersRef.current.includes(id));

    const command = new DeleteLayerCommand(selectedLayersRef.current, liveLayers, liveLayerIds, setLiveLayers, setLiveLayerIds, boardId, socket);
    performAction(command);

    selectedLayersRef.current.forEach((id: string) => {
      delete newLiveLayers[id];
    });

    setLiveLayers(newLiveLayers);
    setLiveLayerIds(newLiveLayerIds);
  }, [liveLayers, liveLayerIds, selectedLayersRef.current, socket, setLiveLayers, setLiveLayerIds, performAction, DeleteLayerCommand, boardId]);

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
      className="absolute p-1 rounded-lg bg-white border-zinc-300 shadow-custom-1 border flex select-none gap-x-2 items-center"
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
          selectedLayers={selectedLayersRef.current}
          setLiveLayers={setLiveLayers}
          liveLayers={liveLayers}
          socket={socket}
          boardId={boardId}
        />
      )}
      {isArrowLayer && (
        <ArrowHeadSelection
          selectedLayers={selectedLayersRef.current}
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
          selectedLayers={selectedLayersRef.current}
          setLiveLayers={setLiveLayers}
          liveLayers={liveLayers}
          socket={socket}
          boardId={boardId}
          openSelector={openSelector}
          setOpenSelector={setOpenSelector}
          expandUp={position + 50 + 460 > window.innerHeight}
          layers={layers}
        />
      )}
      {hasText && (
        <TextJustifySelector
          selectedLayers={selectedLayersRef.current}
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
          handleOpacityChange={setOutlineOpacity}
          onChange={setOutlineFill}
          openSelector={openSelector}
          setOpenSelector={setOpenSelector}
          expandUp={position + 50 + 205 > window.innerHeight}
        />
      )}
      {!isImageLayer && (
        <ColorPicker
          layers={layers}
          handleOpacityChange={setOpacity}
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
      <Hint label="Send to back">
        <Button
          onClick={moveToBack}
          variant="board"
          size="icon"
        >
          <SendToBack />
        </Button>
      </Hint>
      {/* <SketchlieAiDropdown 
        title={board.title}
        liveLayers={liveLayers}
        setLiveLayers={setLiveLayers}
        selectedLayersRef={selectedLayersRef}
        boardId={boardId}
        socket={socket}
        performAction={performAction}
      /> */}
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