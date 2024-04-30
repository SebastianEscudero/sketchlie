"use client";

import { nanoid } from "nanoid";
import { useCallback, useMemo, useState, useEffect } from "react";

import {
  colorToCss,
  connectionIdToColor,
  findIntersectingLayersWithRectangle,
  penPointsToPathLayer,
  resizeBounds,
} from "@/lib/utils";

import {
  Camera,
  CanvasMode,
  CanvasState,
  Color,
  Layers,
  LayerType,
  Point,
  Presence,
  Side,
  XYWH,
} from "@/types/canvas";
import { useDisableScrollBounce } from "@/hooks/use-disable-scroll-bounce";
import { Info } from "./info";
import { Path } from "./path";
import { Toolbar } from "./toolbar";
import { Participants } from "./participants";
import { LayerPreview } from "./layer-preview";
import { SelectionBox } from "./selection-box";
import { SelectionTools } from "./selection-tools";
import { CursorsPresence } from "./cursors-presence";
import { useProModal } from "@/hooks/use-pro-modal";
import { getMaxCapas } from "@/lib/planLimits";
import { api } from "@/convex/_generated/api";
import { useRoom } from "@/components/room";
import { useApiMutation } from "@/hooks/use-api-mutation";

interface CanvasProps {
  boardId: any;
};

export const Canvas = ({
  boardId,
}: CanvasProps) => {
  const [isClickingLayer, setIsClickingLayer] = useState(false);
  const [zoom, setZoom] = useState(1);
  const proModal = useProModal();
  const { liveLayers, liveLayerIds, User, otherUsers, setLiveLayers, setLiveLayerIds, org } = useRoom();
  const [copiedLayers, setCopiedLayers] = useState<Map<string, any>>(new Map());
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [pencilDraft, setPencilDraft] = useState<[number, number, number][]>([]);
  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None,
  });
  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [rightClickPanning, setIsRightClickPanning] = useState(false);
  const [startPanPoint, setStartPanPoint] = useState({ x: 0, y: 0 });
  const [lastUsedColor, setLastUsedColor] = useState<Color>({
    r: 0,
    g: 0,
    b: 0,
  });
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [selectedLayers, setSelectedLayers] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [myPresence, setMyPresence] = useState<Presence | null>(null);
  const { socket } = useRoom();
  const { mutate: addLayer } = useApiMutation(api.board.addLayer);
  const { mutate: updateLayer } = useApiMutation(api.board.updateLayer);

  useDisableScrollBounce();

  const insertLayer = useCallback((layerType: LayerType, position: Point) => {
    if (org && liveLayerIds.length >= getMaxCapas(org)) {
      proModal.onOpen();
      return;
    }

    const layerId = nanoid();

    let layer

    if (layerType === LayerType.Text) {
      layer = {
        type: layerType,
        x: position.x,
        y: position.y,
        height: 100,
        width: 100,
        fill: lastUsedColor,
        textFontSize: 40
      };
    } else {
      layer = {
        type: layerType,
        x: position.x,
        y: position.y,
        height: 100,
        width: 100,
        fill: lastUsedColor,
      };
    }

    const newLayers = { ...liveLayers, [layerId]: layer };
    const newLayerIds = [...liveLayerIds, layerId];

    setLiveLayerIds(newLayerIds);
    setLiveLayers(newLayers as Layers);

    const newPresence: Presence = {
      ...myPresence,
      selection: [layerId]
    };

    setMyPresence(newPresence);
    if (socket) {
      socket.emit('presence', myPresence, User.userId);
    }

    if (socket) {
      socket.emit('layer-update', layerId, layer);
    }

    addLayer({
      boardId: boardId,
      layerId: layerId,
      layer: layer
    })

    setCanvasState({ mode: CanvasMode.None });
  }, [lastUsedColor, liveLayers, liveLayerIds, myPresence, socket, org, proModal, User.userId, setLiveLayers, setLiveLayerIds, boardId, addLayer]);

  const insertImage = useCallback((
    layerType: LayerType.Image,
    position: Point,
    selectedImage: string,
  ) => {

    if (org && liveLayerIds.length >= getMaxCapas(org)) {
      proModal.onOpen();
      return;
    }

    const layerId = nanoid();


    if (selectedImage === "") {
      return;
    }

    const layer = {
      type: layerType,
      x: position.x,
      y: position.y,
      height: 100,
      width: 100,
      src: selectedImage,
      fill: null,
      value: "",
    };

    const newLayers = { ...liveLayers, [layerId]: layer };
    const newLayerIds = [...liveLayerIds, layerId];

    setLiveLayerIds(newLayerIds);
    setLiveLayers(newLayers as Layers);

    const newPresence: Presence = {
      ...myPresence,
      selection: [layerId]
    };

    setMyPresence(newPresence);
    if (socket) {
      socket.emit('presence', myPresence, User.userId);
    }

    if (socket) {
      socket.emit('layer-update', layerId, layer);
    }

    addLayer({
      boardId: boardId,
      layerId: layerId,
      layer: layer
    })

    setCanvasState({ mode: CanvasMode.None });
  }, [liveLayers, liveLayerIds, myPresence, socket, org, proModal, User.userId, setLiveLayers, setLiveLayerIds, boardId, addLayer]);

  const translateSelectedLayers = useCallback((mousePosition: Point) => {
    if (canvasState.mode !== CanvasMode.Translating) {
      return;
    }

    const offset = {
      x: mousePosition.x - canvasState.current.x,
      y: mousePosition.y - canvasState.current.y
    };

    const newLayers = { ...liveLayers };
      
    selectedLayers.forEach(id => {
        const layer = newLayers[id];
        
        if (layer) {
          const newLayer = { ...layer };
          newLayer.x += offset.x;
          newLayer.y += offset.y;
          newLayers[id] = newLayer;
        }

        if (socket) {
          socket.emit('layer-update', id, newLayers[id]);
        }
      });

    setLiveLayers(newLayers);
    setCanvasState({ mode: CanvasMode.Translating, current: mousePosition });
  }, [canvasState, selectedLayers, setCanvasState, setLiveLayers, socket, liveLayers]);

  const unselectLayers = useCallback(() => {
    if (selectedLayers.length > 0) {
      setSelectedLayers([]);
      const newPresence: Presence = {
        ...myPresence,
        selection: []
      };

      setMyPresence(newPresence);
    }
  }, [selectedLayers, setMyPresence, myPresence]);

  const updateSelectionNet = useCallback((current: Point, origin: Point) => {
    setCanvasState({
      mode: CanvasMode.SelectionNet,
      origin,
      current,
    });

    const ids = findIntersectingLayersWithRectangle(
      liveLayerIds,
      liveLayers,
      origin,
      current,
    );

    setSelectedLayers(ids);

    const newPresence: Presence = {
      ...myPresence,
      selection: ids,
      cursor: current,
    };

    setMyPresence(newPresence);
  }, [liveLayers, liveLayerIds, setMyPresence, myPresence]);

  const startMultiSelection = useCallback((
    current: Point,
    origin: Point,
  ) => {
    if (
      Math.abs(current.x - origin.x) + Math.abs(current.y - origin.y) > 5
    ) {
      setCanvasState({
        mode: CanvasMode.SelectionNet,
        origin,
        current,
      });
    }
  }, []);

  const startDrawing = useCallback((point: Point, pressure: number) => {
    const pencilDraft: [number, number, number][] = [[point.x, point.y, pressure]];
    setPencilDraft(pencilDraft);
    const newPresence: Presence = {
      ...myPresence,
      pencilDraft: pencilDraft
    };

    setMyPresence(newPresence);
  }, [myPresence, setMyPresence]);

  const continueDrawing = useCallback((point: Point, e: React.PointerEvent) => {
    if (
      canvasState.mode !== CanvasMode.Pencil ||
      e.buttons !== 1 ||
      pencilDraft == null
    ) {
      return;
    }

    setPencilDraft(pencilDraft.length === 1 &&
      pencilDraft[0][0] === point.x &&
      pencilDraft[0][1] === point.y
      ? pencilDraft
      : [...pencilDraft, [point.x, point.y, e.pressure]]);


    const newPresence: Presence = {
      ...myPresence,
      cursor: point,
      pencilDraft:
        pencilDraft.length === 1 &&
          pencilDraft[0][0] === point.x &&
          pencilDraft[0][1] === point.y
          ? pencilDraft
          : [...pencilDraft, [point.x, point.y, e.pressure]],
    };

    setMyPresence(newPresence);

  }, [canvasState.mode, pencilDraft, myPresence, setMyPresence]);

  const insertPath = useCallback(() => {

    if (org && liveLayerIds.length >= getMaxCapas(org)) {
      proModal.onOpen();
      return;
    }

    if (
      pencilDraft == null ||
      pencilDraft.length < 2
    ) {
      setPencilDraft([]);
      return;
    }

    const id = nanoid();
    liveLayers[id] = penPointsToPathLayer(pencilDraft, lastUsedColor);

    liveLayerIds.push(id);

    setPencilDraft([]);
    setLiveLayers({ ...liveLayers });
    setLiveLayerIds([...liveLayerIds]);

    const newPresence: Presence = {
      ...myPresence,
      pencilDraft: null,
    };

    setMyPresence(newPresence);

    addLayer({
      boardId: boardId,
      layerId: id,
      layer: liveLayers[id]
    })

    if (socket) {
      socket.emit('layer-update', id, liveLayers[id]);
    }

    setCanvasState({ mode: CanvasMode.Pencil });
  }, [lastUsedColor, pencilDraft, liveLayers, setLiveLayers, setLiveLayerIds, myPresence, org, proModal, liveLayerIds, socket, boardId, addLayer]);

  const resizeSelectedLayer = useCallback((point: Point) => {
    if (canvasState.mode !== CanvasMode.Resizing) {
      return;
    }


    const layer = liveLayers[selectedLayers[0]];

    const bounds = resizeBounds(
      layer?.type,
      canvasState.initialBounds,
      canvasState.corner,
      point,
    );

    if (layer) {
      Object.assign(layer, bounds);
      liveLayers[selectedLayers[0]] = layer;
      setLiveLayers({ ...liveLayers });

      if (socket) {
        socket.emit('layer-update', selectedLayers[0], layer);
      }

    }

  }, [canvasState, liveLayers, selectedLayers, setLiveLayers, socket]);

  const onResizeHandlePointerDown = useCallback((
    corner: Side,
    initialBounds: XYWH,
  ) => {
    setCanvasState({
      mode: CanvasMode.Resizing,
      initialBounds,
      corner,
    });
  }, []);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey) {
        e.preventDefault();
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, []);

  const onWheel = useCallback((e: React.WheelEvent) => {
    const svgRect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - svgRect.left;
    const y = e.clientY - svgRect.top;

    if (e.ctrlKey) {
      let newZoom = zoom;
      if (e.deltaY < 0) {
        newZoom = Math.min(zoom * 1.1, 3);
      } else {
        newZoom = Math.max(zoom / 1.1, 0.5);
      }

      const zoomFactor = newZoom / zoom;
      const newX = x - (x - camera.x) * zoomFactor;
      const newY = y - (y - camera.y) * zoomFactor;

      setZoom(newZoom);
      setCamera({ x: newX, y: newY });
    }
    else {
      setCamera((camera) => ({
        x: camera.x - e.deltaX / zoom,
        y: camera.y - e.deltaY / zoom,
      }));
    }
  }, [zoom, camera]);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    e.preventDefault();

    setMousePosition({
      x: (Math.round(e.clientX) - camera.x) / zoom,
      y: (Math.round(e.clientY) - camera.y) / zoom,
    });

    if (rightClickPanning) {
      const newCameraPosition = {
        x: camera.x + e.clientX - startPanPoint.x,
        y: camera.y + e.clientY - startPanPoint.y,
      };
      setCamera(newCameraPosition);
      setStartPanPoint({ x: e.clientX, y: e.clientY });
    }

    if (canvasState.mode === CanvasMode.Moving && isPanning) {
      const newCameraPosition = {
        x: camera.x + e.clientX - startPanPoint.x,
        y: camera.y + e.clientY - startPanPoint.y,
      };
      setCamera(newCameraPosition);
      setStartPanPoint({ x: e.clientX, y: e.clientY });
    }

    const newPresence: Presence = {
      ...myPresence,
      cursor: { x: mousePosition.x, y: mousePosition.y },
    };

    setMyPresence(newPresence);

    if (socket) {
      socket.emit('presence', myPresence, User.userId);
    }

    if (canvasState.mode === CanvasMode.Pressing) {
      startMultiSelection(mousePosition, canvasState.origin);
    } else if (canvasState.mode === CanvasMode.SelectionNet) {
      updateSelectionNet(mousePosition, canvasState.origin);
    } else if (canvasState.mode === CanvasMode.Translating) {
      translateSelectedLayers(mousePosition);
    } else if (canvasState.mode === CanvasMode.Resizing) {
      resizeSelectedLayer(mousePosition);
    } else if (canvasState.mode === CanvasMode.Pencil) {
      continueDrawing(mousePosition, e);
    }
  },
    [
      continueDrawing,
      camera,
      canvasState,
      resizeSelectedLayer,
      translateSelectedLayers,
      startMultiSelection,
      updateSelectionNet,
      isPanning,
      rightClickPanning,
      setCamera,
      startPanPoint,
      setMyPresence,
      myPresence,
      socket,
      User.userId,
      mousePosition,
      zoom
    ]);

  const onPointerLeave = useCallback(() => {
    const newPresence: Presence = {
      ...myPresence,
      cursor: null,
    };

    setMyPresence(newPresence);

    if (socket) {
      socket.emit('presence', null, User.userId);
    }
  }, [setMyPresence, myPresence, socket, User.userId]);

  const onPointerDown = useCallback((
    e: React.PointerEvent,
  ) => {
    if (e.button === 0) {
      if (canvasState.mode === CanvasMode.Moving) {
        setIsPanning(true);
        setStartPanPoint({ x: e.clientX, y: e.clientY });
        document.body.style.cursor = 'grabbing';
      }

      if (canvasState.mode === CanvasMode.Inserting) {
        return;
      }

      if (canvasState.mode === CanvasMode.Moving) {
        return;
      }

      if (canvasState.mode === CanvasMode.Pencil) {
        startDrawing(mousePosition, e.pressure);
        return;
      }

      setCanvasState({ origin: mousePosition, mode: CanvasMode.Pressing });
    } else if (e.button === 2) {
      setIsRightClickPanning(true);
      setStartPanPoint({ x: e.clientX, y: e.clientY });
      document.body.style.cursor = 'grabbing';
    }
  }, [canvasState.mode, setCanvasState, startDrawing, setIsPanning, setIsRightClickPanning, mousePosition]);

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    setIsRightClickPanning(false);
    document.body.style.cursor = 'default';
    if (canvasState.mode === CanvasMode.Moving) {
      document.body.style.cursor = 'pointer';
    }
    if (
      canvasState.mode === CanvasMode.None ||
      canvasState.mode === CanvasMode.Pressing
    ) {
      setIsClickingLayer(false);
      unselectLayers();
      setCanvasState({
        mode: CanvasMode.None,
      });
    } else if (canvasState.mode === CanvasMode.Pencil) {
      insertPath();
    } else if (canvasState.mode === CanvasMode.Inserting && canvasState.layerType === LayerType.Image) {
      setSelectedImage("");
      insertImage(LayerType.Image, mousePosition, selectedImage);
    } else if (canvasState.mode === CanvasMode.Inserting && canvasState.layerType !== LayerType.Image) {
      insertLayer(canvasState.layerType, mousePosition);
    } else if (canvasState.mode === CanvasMode.Moving) {
      setIsPanning(false);
    } else if (canvasState.mode === CanvasMode.Translating) {
      selectedLayers.forEach(id => {
        const newLayer = liveLayers[id];
        if (newLayer) {
          updateLayer({
            boardId: boardId,
            layerId: id,
            layerUpdates: newLayer
          });
        }
      });
      setCanvasState({
        mode: CanvasMode.None,
      });
    } else if (canvasState.mode === CanvasMode.Resizing) {
      selectedLayers.forEach(id => {
        const newLayer = liveLayers[id];
        if (newLayer) {
          updateLayer({
            boardId: boardId,
            layerId: id,
            layerUpdates: newLayer
          });
        }
      });
      setCanvasState({
        mode: CanvasMode.None,
      });
    } else {
      setCanvasState({
        mode: CanvasMode.None,
      });
    }

  },
    [
      setCanvasState,
      canvasState,
      insertLayer,
      unselectLayers,
      insertPath,
      setIsPanning,
      selectedImage,
      setSelectedImage,
      insertImage,
      mousePosition,
      selectedLayers,
      liveLayers,
      updateLayer,
      boardId,
    ]);

  const onLayerPointerDown = useCallback((e: React.PointerEvent, layerId: string) => {
    setIsClickingLayer(true);

    if (
      canvasState.mode === CanvasMode.Pencil ||
      canvasState.mode === CanvasMode.Inserting
    ) {
      return;
    }

    e.stopPropagation();

    setCanvasState({ mode: CanvasMode.Translating, current: mousePosition });

    if (selectedLayers.includes(layerId)) {
      return;
    }

    const newPresence: Presence = {
      ...myPresence,
      selection: [layerId],
      cursor: mousePosition
    };

    setMyPresence(newPresence);

    setSelectedLayers([layerId]);

  }, [setCanvasState, canvasState.mode, selectedLayers, myPresence, setMyPresence, mousePosition]);

  const layerIdsToColorSelection = useMemo(() => {
    const layerIdsToColorSelection: Record<string, string> = {};

    if (otherUsers) {
      for (const user of otherUsers) {
        const connectionId = user.userId;
        const selection = user.presence?.selection || [];
  
        for (const layerId of selection) {
          layerIdsToColorSelection[layerId] = connectionIdToColor(connectionId)
        }
      }
    }

    return layerIdsToColorSelection;
  }, [otherUsers]);

  const copySelectedLayers = useCallback(() => {
    const copied = new Map();
    for (const id of selectedLayers) {
      const layer = liveLayers[id];
      if (layer) {
        // Deep copy the layer object
        const copiedLayer = JSON.parse(JSON.stringify(layer));
        copied.set(id, copiedLayer);
      }
    }
    setCopiedLayers(copied);
  }, [selectedLayers, liveLayers]);


  const pasteCopiedLayers = useCallback((mousePosition: any) => {

    if (org && liveLayerIds.length >= getMaxCapas(org)) {
      proModal.onOpen();
      return;
    }

    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    copiedLayers.forEach((layer) => {
      minX = Math.min(minX, layer.x);
      minY = Math.min(minY, layer.y);
      maxX = Math.max(maxX, layer.x + layer.width);
      maxY = Math.max(maxY, layer.y + layer.height);
    });

    // Calculate the center of the copied layers
    const centerX = (minX + maxX) / 2;
    const centerY = (minY + maxY) / 2;

    // Calculate the offset from the mouse position
    const offsetX = mousePosition.x - centerX;
    const offsetY = mousePosition.y - centerY;

    const newSelection = [] as string[];
    const newLiveLayers = { ...liveLayers };
    const newLiveLayerIds = [...liveLayerIds];
    copiedLayers.forEach((layer) => {
      const newId = nanoid();
      newSelection.push(newId);
      newLiveLayerIds.push(newId);
      const clonedLayer = { ...layer };
      clonedLayer.x = clonedLayer.x + offsetX;
      clonedLayer.y = clonedLayer.y + offsetY;
      newLiveLayers[newId] = clonedLayer;

      if (socket) {
        socket.emit('layer-update', newId, clonedLayer);
      }

      addLayer({
        boardId: boardId,
        layerId: newId,
        layer: clonedLayer
      })

    });

    setLiveLayers(newLiveLayers);
    setLiveLayerIds(newLiveLayerIds);


    const newPresence: Presence = {
      ...myPresence,
      selection: newSelection
    };

    setMyPresence(newPresence);

  }, [copiedLayers, myPresence, setLiveLayers, setLiveLayerIds, setMyPresence, org, proModal, liveLayerIds, socket, liveLayers, addLayer, boardId]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      switch (e.key.toLocaleLowerCase()) {
        case "c": {
          if (e.ctrlKey || e.metaKey) {
            copySelectedLayers();
          }
          break;
        }
        case "v": {
          if (e.ctrlKey || e.metaKey) {
            if (isClickingLayer === false) {
              pasteCopiedLayers(mousePosition);
            }
          }
          break;
        }
        // case "z": {
        //   if (e.ctrlKey || e.metaKey) {
        //     if (e.shiftKey) {
        //       history.redo();
        //     } else {
        //       history.undo();
        //     }
        //     break;
        //   }
        // }
      }
    }

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown)
    }
  }, [copySelectedLayers, pasteCopiedLayers, mousePosition, isClickingLayer]);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      const handleContextMenu = (e: MouseEvent) => {
        e.preventDefault();
      };

      document.addEventListener('contextmenu', handleContextMenu);

      return () => {
        document.removeEventListener('contextmenu', handleContextMenu);
      };
    }
  }, []);

  useEffect(() => {
    if (canvasState.mode === CanvasMode.Moving) {
      document.body.style.cursor = 'pointer';
    } else {
      document.body.style.cursor = 'default';
    }
  }, [canvasState.mode]);

  return (
    <main
      className="h-full w-full relative bg-neutral-100 touch-none overscroll-none" style={{ backgroundImage: "url(/dot-grid.png)", backgroundSize: 'cover' }}
    >
      <Info boardId={boardId} />
      <Participants
        otherUsers={otherUsers}
        User={User}
      />
      <Toolbar
        isUploading={isUploading}
        setIsUploading={setIsUploading}
        onImageSelect={setSelectedImage}
        canvasState={canvasState}
        setCanvasState={setCanvasState}
        org={org}
      />
      <SelectionTools
        updateLayer={updateLayer}
        boardId={boardId}
        socket={socket}
        setLiveLayerIds={setLiveLayerIds}
        setLiveLayers={setLiveLayers}
        liveLayerIds={liveLayerIds}
        liveLayers={liveLayers}
        selectedLayers={selectedLayers}
        zoom={zoom}
        camera={camera}
        setLastUsedColor={setLastUsedColor}
      />
      <svg
        id="canvas"
        className="h-[100vh] w-[100vw]"
        onWheel={onWheel}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
      >
        <g
          style={{
            transform: `translate(${camera.x}px, ${camera.y}px) scale(${zoom})`,
            transformOrigin: 'top left',
          }}
        >
          {liveLayerIds.map((layerId: any) => (
            <LayerPreview
              updateLayer={updateLayer}
              setLiveLayers={setLiveLayers}
              liveLayers={liveLayers}
              key={layerId}
              id={layerId}
              onLayerPointerDown={onLayerPointerDown}
              selectionColor={layerIdsToColorSelection[layerId]}
            />
          ))}
          <SelectionBox
            liveLayers={liveLayers}
            selectedLayers={selectedLayers}
            onResizeHandlePointerDown={onResizeHandlePointerDown}
          />
          {canvasState.mode === CanvasMode.SelectionNet && canvasState.current != null && (
            <rect
              className="fill-blue-500/5 stroke-blue-500 stroke-1"
              x={Math.min(canvasState.origin.x, canvasState.current.x)}
              y={Math.min(canvasState.origin.y, canvasState.current.y)}
              width={Math.abs(canvasState.origin.x - canvasState.current.x)}
              height={Math.abs(canvasState.origin.y - canvasState.current.y)}
            />
          )}
          {otherUsers && <CursorsPresence otherUsers={otherUsers} />}
          {pencilDraft != null && pencilDraft.length > 0 && (
            <Path
              points={pencilDraft}
              fill={colorToCss(lastUsedColor)}
              x={0}
              y={0}
            />
          )}
        </g>
      </svg>
    </main>
  );
};