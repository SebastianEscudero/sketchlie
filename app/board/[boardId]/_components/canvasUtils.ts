import { useCallback, useEffect, useMemo } from 'react';
import { Command, DeleteLayerCommand, InsertLayerCommand, TranslateLayersCommand } from "@/lib/commands";
import { ArrowHandle, ArrowHead, ArrowLayer, ArrowOrientation, ArrowType, Camera, CanvasMode, Layer, Layers, LayerType, Point, Presence, Side, XYWH } from "@/types/canvas";
import { applyStraightnessAssist, calculateBoundingBox, checkIfTextarea, connectionIdToColor, findIntersectingLayerForConnection, findIntersectingLayersWithPath, findIntersectingLayersWithPoint, findIntersectingLayersWithRectangle, getClosestEndPoint, getClosestPointOnBorder, isLayerVisible, penPointsToPathLayer, pointerEventToCanvasPoint, removeHighlightFromText, resizeArrowBounds, resizeBounds, resizeBox, updateArrowPosition, updatedLayersConnectedArrows } from '@/lib/utils';
import { nanoid } from 'nanoid';
import { smoothLastPoint } from '@/lib/smooth-points';
import { setCursorWithFill } from '@/lib/theme-utils';
import { toast } from 'sonner';

export const usePerformAction = (
  liveLayerIds: string[],
  liveLayers: Layers,
  setHistory: React.Dispatch<React.SetStateAction<Command[]>>,
  setRedoStack: React.Dispatch<React.SetStateAction<Command[]>>
) => {
  return useCallback((command: Command) => {
    command.execute(liveLayerIds, liveLayers);
    setHistory((prevHistory) => [...prevHistory, command]);
    setRedoStack([]); // clear redo stack when new action is performed
  }, [liveLayerIds, liveLayers, setHistory, setRedoStack]);
};

export const useUndo = (
  history: Command[],
  liveLayerIds: string[],
  liveLayers: Layers,
  setHistory: React.Dispatch<React.SetStateAction<Command[]>>,
  setRedoStack: React.Dispatch<React.SetStateAction<Command[]>>
) => {
  return useCallback(() => {
    const lastCommand = history[history.length - 1];
    lastCommand.undo(liveLayerIds, liveLayers);
    setHistory(history.slice(0, -1));
    setRedoStack((prevRedoStack) => [...prevRedoStack, lastCommand]);
  }, [history, liveLayerIds, liveLayers, setHistory, setRedoStack]);
};

export const useRedo = (
  redoStack: Command[],
  liveLayerIds: string[],
  liveLayers: Layers,
  setRedoStack: React.Dispatch<React.SetStateAction<Command[]>>,
  setHistory: React.Dispatch<React.SetStateAction<Command[]>>
) => {
  return useCallback(() => {
    const lastCommand = redoStack[redoStack.length - 1];
    lastCommand.execute(liveLayerIds, liveLayers);
    setRedoStack(redoStack.slice(0, -1));
    setHistory((prevHistory) => [...prevHistory, lastCommand]);
  }, [redoStack, liveLayerIds, liveLayers, setRedoStack, setHistory]);
};

export const useInsertLayer = (
  expired: boolean,
  setCanvasState: (state: any) => void,
  liveLayers: Layers,
  setLiveLayers: (layers: Layers) => void,
  setLiveLayerIds: (ids: string[]) => void,
  boardId: string,
  socket: any,
  org: any,
  proModal: any,
  arrowTypeInserting: ArrowType,
  performAction: (command: any) => void,
  setLayerWithAssistDraw: (value: boolean) => void,
  setJustInsertedText: (value: boolean) => void,
  setIsArrowPostInsertMenuOpen: (value: boolean) => void,
  selectedLayersRef: React.MutableRefObject<string[]>,
  layerWithAssistDraw: boolean
) => {
  return useCallback((
    layerType: LayerType,
    position: Point,
    width: number,
    height: number,
    center?: Point,
    startConnectedLayerId?: string,
    endConnectedLayerId?: string,
    arrowType?: ArrowType,
    orientation?: ArrowOrientation
  ) => {
    if (expired) {
      setCanvasState({ mode: CanvasMode.None });
      return;
    }

    const layerId = nanoid();
    const ratio = 12 / 80;

    let layer;
    let fillColor = { r: 0, g: 0, b: 0, a: 0 }
    if (layerType === LayerType.Note) {
      if (width < 10 && height < 10) {
        width = 80
        height = 80
      }
      fillColor = { r: 252, g: 225, b: 156, a: 1 }
    }

    if (layerType === LayerType.Text) {
      if (width < 95) {
        width = 95;
      }

      layer = {
        type: layerType,
        x: position.x,
        y: position.y,
        height: height,
        width: width,
        fill: { r: 29, g: 29, b: 29, a: 1 },
        textFontSize: 12,
        value: "",
        outlineFill: null,
        alignX: 'left',
      };
      setJustInsertedText(true);
    } else if (layerType === LayerType.Note) {
      layer = {
        type: layerType,
        x: position.x,
        y: position.y,
        height: height,
        width: width,
        fill: fillColor,
        value: "",
        outlineFill: { r: 0, g: 0, b: 0, a: 0 },
        textFontSize: Math.min(width, height) * ratio,
        alignX: 'center',
        alignY: 'center',
      };
    } else if (layerType === LayerType.Arrow) {
      layer = {
        type: layerType,
        x: position.x,
        y: position.y,
        center: center,
        height: height,
        width: width,
        fill: { r: 29, g: 29, b: 29, a: 1 },
        startArrowHead: ArrowHead.None,
        endArrowHead: ArrowHead.Triangle,
        startConnectedLayerId: startConnectedLayerId,
        endConnectedLayerId: endConnectedLayerId,
        arrowType: arrowTypeInserting,
        orientation: orientation
      };

      if (startConnectedLayerId && !endConnectedLayerId) {
        const connectedLayer = liveLayers[startConnectedLayerId];
        const updatedLayer = updatedLayersConnectedArrows(connectedLayer, layerId);
        liveLayers[startConnectedLayerId] = updatedLayer;
        setLiveLayers({ ...liveLayers });
        setIsArrowPostInsertMenuOpen(true);
      }

      if (endConnectedLayerId) {
        const endLayer = liveLayers[endConnectedLayerId];
        const updatedEndLayer = updatedLayersConnectedArrows(endLayer, layerId);
        liveLayers[endConnectedLayerId] = updatedEndLayer;

        if (startConnectedLayerId) {
          const startLayer = liveLayers[startConnectedLayerId];
          const updatedStartLayer = updatedLayersConnectedArrows(startLayer, layerId);
          liveLayers[startConnectedLayerId] = updatedStartLayer;
        }

        setLiveLayers({ ...liveLayers });
      }

    } else if (layerType === LayerType.Line) {
      layer = {
        type: layerType,
        x: position.x,
        y: position.y,
        center: center,
        height: height,
        width: width,
        fill: { r: 29, g: 29, b: 29, a: 1 },
      };
    } else {
      if (width < 10 && height < 10) {
        width = 80
        height = 80
      }
      layer = {
        type: layerType,
        x: position.x,
        y: position.y,
        height: height,
        width: width,
        fill: fillColor,
        value: "",
        outlineFill: { r: 29, g: 29, b: 29, a: 1 },
        textFontSize: Math.min(width, height) * ratio,
        alignX: 'center',
        alignY: 'center',
      };
    }

    const command = new InsertLayerCommand([layerId], [layer], setLiveLayers, setLiveLayerIds, boardId, socket, org, proModal);
    performAction(command);

    if (layer.type !== LayerType.Text) {
      selectedLayersRef.current = [layerId];
    }

    if (layerWithAssistDraw) {
      setLayerWithAssistDraw(false);
      setCanvasState({ mode: CanvasMode.Pencil });
    } else {
      setCanvasState({ mode: CanvasMode.None });
    }

  }, [expired, setCanvasState, liveLayers, setLiveLayers, setLiveLayerIds, boardId, socket, org, proModal, arrowTypeInserting, performAction, setLayerWithAssistDraw, setJustInsertedText, setIsArrowPostInsertMenuOpen, selectedLayersRef, layerWithAssistDraw]);
};

export const useInsertMedia = (
  socket: any,
  org: any,
  proModal: any,
  setLiveLayers: (layers: any) => void,
  setLiveLayerIds: (ids: string[]) => void,
  boardId: string,
  performAction: (command: any) => void,
  setCanvasState: (state: any) => void
) => {
  return useCallback((
    layerType: LayerType.Image | LayerType.Video | LayerType.Link,
    position: Point,
    info: any,
    zoom: number,
  ) => {
    const layerId = nanoid();

    if (!info || !info.url) {
      return;
    }

    if (!info.dimensions.width) {
      info.dimensions.width = window.innerWidth / 2;
    }

    if (!info.dimensions.height) {
      info.dimensions.height = window.innerHeight / 2;
    }

    const aspectRatio = info.dimensions.width / info.dimensions.height;
    const height = window.innerHeight / (2 * zoom);
    const width = height * aspectRatio;

    const layer = {
      type: layerType,
      x: position.x - width / 2,
      y: position.y - height / 2,
      height: height,
      width: width,
      src: info.url,
    };

    console.log(layer);

    const command = new InsertLayerCommand([layerId], [layer], setLiveLayers, setLiveLayerIds, boardId, socket, org, proModal);
    performAction(command);
    setCanvasState({ mode: CanvasMode.None });
  }, [socket, org, proModal, setLiveLayers, setLiveLayerIds, boardId, performAction, setCanvasState]);
};

export const useTranslateSelectedLayers = (
  expired: boolean,
  selectedLayersRef: React.MutableRefObject<string[]>,
  myPresence: Presence | null,
  setMyPresence: (presence: Presence) => void,
  canvasState: any,
  setCanvasState: (state: any) => void,
  liveLayers: any,
  setLiveLayers: (layers: any) => void,
  socket: any,
  zoom: number
) => {
  return useCallback((point: Point) => {
    if (expired) {
      selectedLayersRef.current = [];
      const newPresence: Presence = {
        ...myPresence!,
        selection: []
      };
      setMyPresence(newPresence);
      return;
    }

    if (canvasState.mode !== CanvasMode.Translating) {
      return;
    }

    const offset = {
      x: (point.x - canvasState.current.x),
      y: (point.y - canvasState.current.y)
    };

    const newLayers = { ...liveLayers };
    const updatedLayers: any = [];
    const updatedLayerIds: string[] = [...selectedLayersRef.current];

    const soleLayer = selectedLayersRef.current.length === 1;

    if (soleLayer) {
      const layer = newLayers[selectedLayersRef.current[0]];
      if (layer.type === LayerType.Arrow) {
        const updatedLayer = { ...layer };
        updatedLayer.endConnectedLayerId = undefined;
        updatedLayer.startConnectedLayerId = undefined;
        newLayers[selectedLayersRef.current[0]] = updatedLayer;
      }
    }

    selectedLayersRef.current.forEach(id => {
      const layer = newLayers[id];

      if (layer) {
        const newLayer = { ...layer };
        newLayer.x += offset.x;
        newLayer.y += offset.y;
        if ((newLayer.type === LayerType.Arrow || newLayer.type === LayerType.Line) && newLayer.center) {
          const newCenter = {
            x: newLayer.center.x + offset.x,
            y: newLayer.center.y + offset.y
          };
          newLayer.center = newCenter;
        }
        updatedLayers.push(newLayer);
        newLayers[id] = newLayer;

        // Update connected arrows
        if (layer.type !== LayerType.Arrow && layer.type !== LayerType.Line && selectedLayersRef.current.length === 1) {
          if (layer.connectedArrows) {
            layer.connectedArrows.forEach((arrowId: string) => {
              const arrowLayer = newLayers[arrowId] as ArrowLayer;
              if (arrowLayer) {
                const startConnectedLayerId = arrowLayer.startConnectedLayerId || "";
                const endConnectedLayerId = arrowLayer.endConnectedLayerId || "";
                const updatedArrow = updateArrowPosition(arrowLayer, id, newLayer, startConnectedLayerId, endConnectedLayerId, liveLayers, zoom);
                updatedLayers.push(updatedArrow);
                newLayers[arrowId] = updatedArrow;
                updatedLayerIds.push(arrowId);
              }
            });
          }
        }
      }
    });

    if (socket) {
      socket.emit('layer-update', updatedLayerIds, updatedLayers);
    }

    setLiveLayers(newLayers);
    setCanvasState({ mode: CanvasMode.Translating, current: point });
  }, [expired, selectedLayersRef, myPresence, setMyPresence, canvasState, setCanvasState, liveLayers, setLiveLayers, socket, zoom]);
};

export const useTranslateSelectedLayersWithDelta = (
  expired: boolean,
  selectedLayersRef: React.MutableRefObject<string[]>,
  myPresence: Presence | null,
  setMyPresence: (presence: Presence) => void,
  liveLayers: any,
  setLiveLayers: (layers: any) => void,
  socket: any,
  zoom: number
) => {
  return useCallback((delta: Point) => {
    if (expired) {
      selectedLayersRef.current = [];
      const newPresence: Presence = {
        ...myPresence!,
        selection: []
      };
      setMyPresence(newPresence);
      return;
    }

    const newLayers = { ...liveLayers };
    const updatedLayers: any = [];
    const updatedLayerIds: string[] = [...selectedLayersRef.current];

    const soleLayer = selectedLayersRef.current.length === 1;

    if (soleLayer) {
      const layer = newLayers[selectedLayersRef.current[0]];
      if (layer.type === LayerType.Arrow) {
        const updatedLayer = { ...layer };
        updatedLayer.endConnectedLayerId = undefined;
        updatedLayer.startConnectedLayerId = undefined;
        newLayers[selectedLayersRef.current[0]] = updatedLayer;
      }
    }

    selectedLayersRef.current.forEach(id => {
      const layer = newLayers[id];

      if (layer) {
        const newLayer = { ...layer };
        newLayer.x += delta.x;
        newLayer.y += delta.y;
        if ((newLayer.type === LayerType.Arrow || newLayer.type === LayerType.Line) && newLayer.center) {
          const newCenter = {
            x: newLayer.center.x + delta.x,
            y: newLayer.center.y + delta.y
          };
          newLayer.center = newCenter;
        }
        updatedLayers.push(newLayer);
        newLayers[id] = newLayer;

        // Update connected arrows
        if (layer.type !== LayerType.Arrow && layer.type !== LayerType.Line && selectedLayersRef.current.length === 1) {
          if (layer.connectedArrows) {
            layer.connectedArrows.forEach((arrowId: string) => {
              const arrowLayer = newLayers[arrowId] as ArrowLayer;
              if (arrowLayer) {
                const startConnectedLayerId = arrowLayer.startConnectedLayerId || "";
                const endConnectedLayerId = arrowLayer.endConnectedLayerId || "";
                const updatedArrow = updateArrowPosition(arrowLayer, id, newLayer, startConnectedLayerId, endConnectedLayerId, liveLayers, zoom);
                updatedLayers.push(updatedArrow);
                newLayers[arrowId] = updatedArrow;
                updatedLayerIds.push(arrowId);
              }
            });
          }
        }
      }
    });

    if (socket) {
      socket.emit('layer-update', updatedLayerIds, updatedLayers);
    }

    setLiveLayers(newLayers);
  }, [expired, selectedLayersRef, myPresence, setMyPresence, liveLayers, setLiveLayers, socket, zoom]);
};

export const useUnselectLayers = (
  selectedLayersRef: React.MutableRefObject<string[]>,
  setMyPresence: (presence: Presence) => void,
  myPresence: Presence | null
) => {
  return useCallback(() => {
    if (selectedLayersRef.current.length > 0) {
      selectedLayersRef.current = [];
      const newPresence: Presence = {
        ...myPresence!,
        selection: []
      };
      setMyPresence(newPresence);
    }
  }, [setMyPresence, myPresence, selectedLayersRef]);
};

export const useUpdateSelectionNet = (
  setCanvasState: (state: any) => void,
  liveLayerIds: string[],
  liveLayers: any,
  selectedLayersRef: React.MutableRefObject<string[]>,
  setMyPresence: (presence: Presence) => void,
  myPresence: Presence | null
) => {
  return useCallback((current: Point, origin: Point) => {
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

    selectedLayersRef.current = ids;

    const newPresence: Presence = {
      ...myPresence!,
      selection: ids,
      cursor: current,
    };

    setMyPresence(newPresence);
  }, [liveLayers, liveLayerIds, setMyPresence, myPresence, setCanvasState, selectedLayersRef]);
};

export const useEraserDeleteLayers = (
  liveLayerIds: string[],
  liveLayers: any,
  setLiveLayers: (layers: any) => void,
  setErasePath: (path: [number, number][]) => void,
  erasePath: [number, number][],
  layersToDeleteEraserRef: React.MutableRefObject<Set<string>>
) => {
  return useCallback((current: Point) => {
    const currentTuple: [number, number] = [current.x, current.y];
    setErasePath(erasePath.length === 0 ? [currentTuple] : [...erasePath, currentTuple]);

    const ids = findIntersectingLayersWithPath(
      liveLayerIds,
      liveLayers,
      erasePath,
    );

    const unprocessedIds = ids.filter((id: string) => !layersToDeleteEraserRef.current.has(id));

    if (unprocessedIds.length > 0) {
      const newLiveLayers = { ...liveLayers };
      for (const id of unprocessedIds) {
        delete newLiveLayers[id];
        layersToDeleteEraserRef.current.add(id);
      }
      setLiveLayers(newLiveLayers);
    }
  }, [liveLayerIds, liveLayers, setLiveLayers, setErasePath, erasePath, layersToDeleteEraserRef]);
};

export const useStartMultiSelection = (setCanvasState: (state: any) => void) => {
  return useCallback((
    current: Point,
    origin: Point,
  ) => {
    if (
      Math.abs(current.x - origin.x) + Math.abs(current.y - origin.y) > 1
    ) {
      setCanvasState({
        mode: CanvasMode.SelectionNet,
        origin,
        current,
      });
    }
  }, [setCanvasState]);
};

export const useInsertHighlight = (
  expired: boolean,
  pencilDraft: [number, number, number][],
  liveLayers: any,
  setLiveLayers: (layers: any) => void,
  setLiveLayerIds: (ids: string[]) => void,
  myPresence: Presence | null,
  setMyPresence: (presence: Presence) => void,
  org: any,
  proModal: any,
  socket: any,
  zoom: number,
  activeTouches: number,
  boardId: string,
  pathColor: any,
  performAction: (command: any) => void,
  setPencilDraft: (draft: [number, number, number][]) => void,
  setCanvasState: (state: any) => void
) => {
  return useCallback(() => {
    if (
      pencilDraft.length === 0 ||
      (pencilDraft[0] && pencilDraft[0].length < 2) ||
      activeTouches > 1 ||
      expired
    ) {
      setPencilDraft([]);
      const newPresence: Presence = {
        ...myPresence!,
        pencilDraft: null,
      };
      setMyPresence(newPresence);
      return;
    }

    const id = nanoid();
    liveLayers[id] = penPointsToPathLayer(pencilDraft, { ...pathColor, a: 0.7 }, 30 / zoom);

    const command = new InsertLayerCommand(
      [id],
      [liveLayers[id]],
      setLiveLayers,
      setLiveLayerIds,
      boardId,
      socket,
      org,
      proModal
    );

    performAction(command);

    const newPresence: Presence = {
      ...myPresence!,
      pencilDraft: null,
    };

    setMyPresence(newPresence);
    setPencilDraft([]);
    setCanvasState({ mode: CanvasMode.Highlighter });
  }, [expired, pencilDraft, liveLayers, setLiveLayers, setLiveLayerIds, myPresence, org, proModal, socket, zoom, activeTouches, boardId, pathColor, performAction, setPencilDraft, setCanvasState, setMyPresence]);
};

export const useResizeSelectedLayers = (
  expired: boolean,
  selectedLayersRef: React.MutableRefObject<string[]>,
  myPresence: Presence | null,
  setMyPresence: (presence: Presence) => void,
  canvasState: any,
  liveLayers: any,
  liveLayerIds: string[],
  layerRef: any,
  zoom: number,
  socket: any,
  setLiveLayers: (layers: any) => void
) => {
  return useCallback((point: Point) => {
    if (expired) {
      selectedLayersRef.current = [];
      const newPresence: Presence = {
        ...myPresence!,
        selection: []
      };
      setMyPresence(newPresence);
      return;
    }

    const initialBoundingBox = calculateBoundingBox(selectedLayersRef.current.map(id => liveLayers[id]));
    let bounds: any;
    let hasMediaOrText = selectedLayersRef.current.some(id =>
      liveLayers[id].type === LayerType.Image ||
      liveLayers[id].type === LayerType.Text ||
      liveLayers[id].type === LayerType.Video ||
      liveLayers[id].type === LayerType.Link
    );
    let mantainAspectRatio = hasMediaOrText
    let singleLayer = selectedLayersRef.current.length === 1

    const updatedLayerIds: string[] = [...selectedLayersRef.current];
    const updatedLayers: { [key: string]: Layer } = {};

    selectedLayersRef.current.forEach(id => {
      const newLayer = { ...liveLayers[id] };

      if (canvasState.mode === CanvasMode.Resizing) {
        const newBoundingBox = resizeBounds(
          canvasState.initialBounds,
          canvasState.corner,
          point,
          mantainAspectRatio
        );

        if (newLayer.type === LayerType.Text) {
          bounds = resizeBox(initialBoundingBox, newBoundingBox, newLayer, canvasState.corner, singleLayer, layerRef);
        } else {
          bounds = resizeBox(initialBoundingBox, newBoundingBox, newLayer, canvasState.corner, singleLayer);
        }
      } else if (canvasState.mode === CanvasMode.ArrowResizeHandler) {
        if (newLayer.type === LayerType.Arrow) {
          let intersectingStartLayer = newLayer.startConnectedLayerId
          let intersectingEndLayer = newLayer.endConnectedLayerId
          let intersectingStartLayers: string[] = []
          let intersectingEndLayers: string[] = []

          if (canvasState.handle === ArrowHandle.end) {
            intersectingEndLayers = findIntersectingLayerForConnection(liveLayerIds, liveLayers, point, zoom) || undefined;
            if (intersectingEndLayer) {
              newLayer.endConnectedLayerId = intersectingEndLayer;
              const connectedLayer = liveLayers[intersectingEndLayer];
              const layerWithUpdatedArrows = updatedLayersConnectedArrows(connectedLayer, id)
              updatedLayers[intersectingEndLayer] = layerWithUpdatedArrows;
              updatedLayerIds.push(intersectingEndLayer);
            } else {
              newLayer.endConnectedLayerId = undefined;
            }
            const start = { x: newLayer.x, y: newLayer.y };
            intersectingStartLayers = findIntersectingLayerForConnection(liveLayerIds, liveLayers, start, zoom) || undefined;
          } else if (canvasState.handle === ArrowHandle.start) {
            intersectingStartLayers = findIntersectingLayerForConnection(liveLayerIds, liveLayers, point, zoom) || undefined;
            if (intersectingStartLayer) {
              newLayer.startConnectedLayerId = intersectingStartLayer;
              const connectedLayer = liveLayers[intersectingStartLayer];
              const layerWithUpdatedArrows = updatedLayersConnectedArrows(connectedLayer, id)
              updatedLayers[intersectingStartLayer] = layerWithUpdatedArrows;
              updatedLayerIds.push(intersectingStartLayer);
            } else {
              newLayer.startConnectedLayerId = undefined;
            }
            const end = { x: newLayer.x + newLayer.width, y: newLayer.y + newLayer.height };
            intersectingEndLayers = findIntersectingLayerForConnection(liveLayerIds, liveLayers, end, zoom) || undefined;
          }

          if (canvasState.handle === ArrowHandle.start || canvasState.handle === ArrowHandle.end) {
            const filteredStartLayers = intersectingStartLayers.filter(layer => !intersectingEndLayers.includes(layer));
            const filteredEndLayers = intersectingEndLayers.filter(layer => !intersectingStartLayers.includes(layer));

            intersectingStartLayers = filteredStartLayers;
            intersectingEndLayers = filteredEndLayers;

            intersectingStartLayer = intersectingStartLayers.pop();
            intersectingEndLayer = intersectingEndLayers.pop();

            if (intersectingStartLayer === intersectingEndLayer) {
              newLayer.startConnectedLayerId = undefined;
              newLayer.endConnectedLayerId = undefined;
            } else {
              newLayer.startConnectedLayerId = intersectingStartLayer;
              newLayer.endConnectedLayerId = intersectingEndLayer;
            }
          }

          bounds = resizeArrowBounds(
            canvasState.initialBounds,
            point,
            canvasState.handle,
            newLayer,
            liveLayers,
            zoom,
          );
        } else {
          bounds = resizeArrowBounds(
            canvasState.initialBounds,
            point,
            canvasState.handle,
            newLayer,
            liveLayers,
            zoom,
          );
        }
      }

      Object.assign(newLayer, bounds);
      updatedLayers[id] = newLayer;

      // Update connected arrows
      if (newLayer.type !== LayerType.Arrow && newLayer.type !== LayerType.Line && newLayer.connectedArrows) {
        newLayer.connectedArrows.forEach((arrowId: string) => {
          if (!updatedLayerIds.includes(arrowId)) {
            const arrowLayer = liveLayers[arrowId] as ArrowLayer;
            if (arrowLayer) {
              const startConnectedLayerId = arrowLayer.startConnectedLayerId || "";
              const endConnectedLayerId = arrowLayer.endConnectedLayerId || "";
              const updatedArrow = updateArrowPosition(arrowLayer, id, newLayer, startConnectedLayerId, endConnectedLayerId, liveLayers, zoom);
              updatedLayers[arrowId] = updatedArrow;
              updatedLayerIds.push(arrowId);
            }
          }
        });
      }
    });

    // Update liveLayers with the new layers
    setLiveLayers({ ...liveLayers, ...updatedLayers });

    if (socket) {
      socket.emit('layer-update', updatedLayerIds, Object.values(updatedLayers));
    }
  }, [canvasState, liveLayers, liveLayerIds, selectedLayersRef, layerRef, zoom, expired, socket, setLiveLayers, setMyPresence, myPresence]);
};

export const useStartDrawing = (
  setPencilDraft: (draft: [number, number, number][]) => void,
  myPresence: Presence | null,
  setMyPresence: (presence: Presence) => void
) => {
  return useCallback((point: Point, pressure: number) => {
    const pencilDraft: [number, number, number][] = [[point.x, point.y, pressure]];
    setPencilDraft(pencilDraft);
    const newPresence: Presence = {
      ...myPresence!,
      pencilDraft: pencilDraft
    };

    if (pencilDraft.length > 1) {
      setMyPresence(newPresence);
    }
  }, [myPresence, setMyPresence, setPencilDraft]);
};

export const useContinueDrawing = (
  canvasState: { mode: CanvasMode },
  pencilDraft: [number, number, number][],
  myPresence: Presence | null,
  setMyPresence: (presence: Presence) => void,
  pathColor: any,
  pathStrokeSize: number,
  zoom: number,
  expired: boolean,
  setPencilDraft: (draft: [number, number, number][]) => void
) => {
  return useCallback((point: Point, e: React.PointerEvent) => {
    if (
      (canvasState.mode !== CanvasMode.Pencil && canvasState.mode !== CanvasMode.Laser && canvasState.mode !== CanvasMode.Highlighter) ||
      pencilDraft.length === 0 ||
      expired
    ) {
      return;
    }

    const newPoint: [number, number, number] = [point.x, point.y, e.pressure];
    const smoothedPoints = smoothLastPoint([...pencilDraft, newPoint]);
    setPencilDraft(smoothedPoints);

    const newPresence: Presence = {
      ...myPresence!,
      cursor: point,
      pencilDraft: smoothedPoints,
      pathStrokeSize: canvasState.mode === CanvasMode.Laser
        ? 5 / zoom
        : canvasState.mode === CanvasMode.Highlighter
          ? 30 / zoom // Increase stroke size for highlighter
          : pathStrokeSize,
      pathStrokeColor: canvasState.mode === CanvasMode.Laser
        ? { r: 243, g: 82, b: 35, a: 1 }
        : canvasState.mode === CanvasMode.Highlighter
          ? { ...pathColor, a: 0.7 } // Semi-transparent yellow
          : pathColor,
    };

    setMyPresence(newPresence);
  }, [canvasState.mode, pencilDraft, myPresence, setMyPresence, pathColor, pathStrokeSize, zoom, expired, setPencilDraft]);
};

export const useInsertPath = (
  expired: boolean,
  pencilDraft: [number, number, number][],
  liveLayers: any,
  setLiveLayers: (layers: any) => void,
  setLiveLayerIds: (ids: string[]) => void,
  myPresence: Presence | null,
  org: any,
  proModal: any,
  socket: any,
  boardId: string,
  pathColor: any,
  performAction: (command: any) => void,
  pathStrokeSize: number,
  activeTouches: number,
  setPencilDraft: (draft: [number, number, number][]) => void,
  setMyPresence: (presence: Presence) => void,
  setCanvasState: (state: any) => void
) => {
  return useCallback(() => {
    if (
      pencilDraft.length === 0 ||
      (pencilDraft[0] && pencilDraft[0].length < 2) ||
      activeTouches > 1 ||
      expired
    ) {
      setPencilDraft([]);
      const newPresence: Presence = {
        ...myPresence!,
        pencilDraft: null,
      };
      setMyPresence(newPresence);
      return;
    }

    const id = nanoid();
    liveLayers[id] = penPointsToPathLayer(pencilDraft, pathColor, pathStrokeSize);

    // Create a new InsertLayerCommand
    const command = new InsertLayerCommand(
      [id],
      [liveLayers[id]],
      setLiveLayers,
      setLiveLayerIds,
      boardId,
      socket,
      org,
      proModal
    );

    // Add the command to the command stack    
    setPencilDraft([]);
    performAction(command);

    const newPresence: Presence = {
      ...myPresence!,
      pencilDraft: null,
    };

    setMyPresence(newPresence);

    setCanvasState({ mode: CanvasMode.Pencil });
  }, [expired, pencilDraft, liveLayers, setLiveLayers, setLiveLayerIds, myPresence, org, proModal, socket, boardId, pathColor, performAction, pathStrokeSize, activeTouches, setPencilDraft, setMyPresence, setCanvasState]);
};

export const useResizeHandlePointerDown = (
  setCanvasState: (state: any) => void
) => {
  return useCallback((
    corner: Side,
    initialBounds: XYWH,
  ) => {
    setCanvasState({
      mode: CanvasMode.Resizing,
      initialBounds,
      corner,
    });
  }, [setCanvasState]);
};

export const useArrowResizeHandlePointerDown = (
  setCanvasState: (state: any) => void
) => {
  return useCallback((
    handle: ArrowHandle,
    initialBounds: XYWH,
  ) => {
    setCanvasState({
      mode: CanvasMode.ArrowResizeHandler,
      initialBounds,
      handle,
    });
  }, [setCanvasState]);
};

export const useOnWheel = (
  zoom: number,
  setZoom: (zoom: number) => void,
  camera: Camera,
  setCamera: (camera: Camera) => void
) => {
  return useCallback((e: React.WheelEvent) => {
    const svgRect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - svgRect.left;
    const y = e.clientY - svgRect.top;

    const isMouseWheel = Math.abs(e.deltaY) % 100 === 0 && e.deltaX === 0;

    if (isMouseWheel || e.ctrlKey) {
      // Zooming
      let newZoom = zoom;
      if (e.deltaY < 0) {
        newZoom = Math.min(zoom * 1.1, 10);
      } else {
        newZoom = Math.max(zoom / 1.1, 0.3);
      }

      const zoomFactor = newZoom / zoom;
      const newX = x - (x - camera.x) * zoomFactor;
      const newY = y - (y - camera.y) * zoomFactor;

      setZoom(newZoom);
      setCamera({ x: newX, y: newY });
    } else if (e.shiftKey) {
      // Panning horizontally
      const newCameraPosition = {
        y: camera.y - e.deltaX,
        x: camera.x - e.deltaY,
      };

      setCamera(newCameraPosition);
    } else {
      // Panning
      const newCameraPosition = {
        x: camera.x - e.deltaX,
        y: camera.y - e.deltaY,
      };

      setCamera(newCameraPosition);
    }
  }, [zoom, camera, setZoom, setCamera]);
};

export const usePointerDown = (
  expired: boolean,
  cameraRef: React.MutableRefObject<{ x: number; y: number }>,
  zoomRef: React.MutableRefObject<number>,
  svgRef: React.RefObject<SVGSVGElement>,
  selectedLayersRef: React.MutableRefObject<string[]>,
  liveLayers: any,
  setCanvasState: (state: any) => void,
  unselectLayers: () => void,
  activeTouches: number,
  isPanning: boolean,
  canvasState: { mode: CanvasMode },
  setIsPenEraserSwitcherOpen: (isOpen: boolean) => void,
  setIsPenMenuOpen: (isOpen: boolean) => void,
  startDrawing: (point: Point, pressure: number) => void,
  setIsPanning: (isPanning: boolean) => void,
  setStartPanPoint: (point: Point) => void,
  setIsRightClickPanning: (isRightClickPanning: boolean) => void,
  socket: any
) => {
  return useCallback((e: React.PointerEvent) => {
    if (expired) {
      return;
    }

    const point = pointerEventToCanvasPoint(e, cameraRef.current, zoomRef.current, svgRef);
    if (point && selectedLayersRef.current.length > 0) {
      const bounds = calculateBoundingBox(selectedLayersRef.current.map(id => liveLayers[id]));
      if (bounds && point.x > bounds.x &&
          point.x < bounds.x + bounds.width &&
          point.y > bounds.y &&
          point.y < bounds.y + bounds.height) {
        setCanvasState({ mode: CanvasMode.Translating, current: point });
        return;
      }
    }

    removeHighlightFromText();
    unselectLayers();

    if (activeTouches > 1) {
      return;
    }

    if (e.button === 0 && !isPanning) {
      if (canvasState.mode === CanvasMode.Eraser) {
        setIsPenEraserSwitcherOpen(false);
        setIsPenMenuOpen(false);
        return;
      }

      if (canvasState.mode === CanvasMode.Laser || canvasState.mode === CanvasMode.Pencil || canvasState.mode === CanvasMode.Highlighter) {
        setIsPenEraserSwitcherOpen(false);
        setIsPenMenuOpen(false);
        startDrawing(point, e.pressure);
        return;
      }

      if (canvasState.mode === CanvasMode.Moving) {
        setIsPanning(true);
        setStartPanPoint({ x: e.clientX, y: e.clientY });
        document.body.style.cursor = 'url(/custom-cursors/grab.svg) 12 12, auto';
        return;
      }

      if (canvasState.mode === CanvasMode.Inserting) {
        const insertPoint = pointerEventToCanvasPoint(e, cameraRef.current, zoomRef.current, svgRef);
        setStartPanPoint(insertPoint);
        setIsPanning(false);
        return;
      }

      setCanvasState({ origin: point, mode: CanvasMode.Pressing });
    } else if (e.button === 2 || e.button === 1) {
      setIsRightClickPanning(true);
      setStartPanPoint({ x: e.clientX, y: e.clientY });
      document.body.style.cursor = 'url(/custom-cursors/grab.svg) 12 12, auto';
    }

    if (selectedLayersRef.current.length > 0) {
      if (socket) {
        socket.emit('layer-update', selectedLayersRef.current, liveLayers);
      }
    }
  }, [
    expired,
    cameraRef,
    zoomRef,
    svgRef,
    selectedLayersRef,
    liveLayers,
    setCanvasState,
    unselectLayers,
    activeTouches,
    isPanning,
    canvasState.mode,
    setIsPenEraserSwitcherOpen,
    setIsPenMenuOpen,
    startDrawing,
    setIsPanning,
    setStartPanPoint,
    setIsRightClickPanning,
    socket
  ]);
};

const handleRightClickPanning = (
  e: React.PointerEvent,
  camera: { x: number; y: number },
  startPanPoint: Point,
  setCamera: (camera: { x: number; y: number }) => void,
  setStartPanPoint: (point: Point) => void,
  setIsRightClickPanning: (isRightClickPanning: boolean) => void
) => {
  const newCameraPosition = {
    x: camera.x + e.clientX - startPanPoint.x,
    y: camera.y + e.clientY - startPanPoint.y,
  };
  setCamera(newCameraPosition);
  setStartPanPoint({ x: e.clientX, y: e.clientY });
  setIsRightClickPanning(true);
};

const handleMoving = (
  e: React.PointerEvent,
  camera: { x: number; y: number },
  startPanPoint: Point,
  setCamera: (camera: { x: number; y: number }) => void,
  setStartPanPoint: (point: Point) => void
) => {
  const newCameraPosition = {
    x: camera.x + e.clientX - startPanPoint.x,
    y: camera.y + e.clientY - startPanPoint.y,
  };
  setCamera(newCameraPosition);
  setStartPanPoint({ x: e.clientX, y: e.clientY });
};

const handleInserting = (
  e: React.PointerEvent,
  cameraRef: React.MutableRefObject<{ x: number; y: number }>,
  zoomRef: React.MutableRefObject<number>,
  svgRef: React.RefObject<SVGSVGElement>,
  startPanPoint: Point,
  canvasState: { layerType: LayerType },
  setCurrentPreviewLayer: (layer: any) => void,
  liveLayerIds: string[],
  liveLayers: any,
  zoom: number,
  currentPreviewLayer: ArrowLayer | null,
  arrowTypeInserting: ArrowType
) => {
  const point = pointerEventToCanvasPoint(e, cameraRef.current, zoomRef.current, svgRef);
  let widthArrow = point.x - startPanPoint.x;
  let heightArrow = point.y - startPanPoint.y;
  const x = Math.min(point.x, startPanPoint.x);
  const y = Math.min(point.y, startPanPoint.y);
  const width = Math.abs(point.x - startPanPoint.x);
  const height = Math.abs(point.y - startPanPoint.y);

  const baseLayer = { x, y, width, height, textFontSize: 12, fill: { r: 0, g: 0, b: 0, a: 0 }, outlineFill: { r: 29, g: 29, b: 29, a: 1 } };

  switch (canvasState.layerType) {
    case LayerType.Rectangle:
    case LayerType.Triangle:
    case LayerType.Star:
    case LayerType.Hexagon:
    case LayerType.BigArrowLeft:
    case LayerType.BigArrowRight:
    case LayerType.BigArrowUp:
    case LayerType.BigArrowDown:
    case LayerType.CommentBubble:
    case LayerType.Rhombus:
    case LayerType.Ellipse:
      setCurrentPreviewLayer({ ...baseLayer, type: canvasState.layerType });
      break;
    case LayerType.Text:
    case LayerType.Note:
      setCurrentPreviewLayer({ ...baseLayer, type: LayerType.Note, fill: { r: 252, g: 225, b: 156, a: 1 }, outlineFill: { r: 0, g: 0, b: 0, a: 0 } });
      break;
    case LayerType.Arrow:
      let intersectingStartLayers: string[] = findIntersectingLayerForConnection(liveLayerIds, liveLayers, startPanPoint, zoom);
      let intersectingEndLayers: string[] = findIntersectingLayerForConnection(liveLayerIds, liveLayers, point, zoom);

      const filteredStartLayers = intersectingStartLayers.filter(layer => !intersectingEndLayers.includes(layer));
      const filteredEndLayers = intersectingEndLayers.filter(layer => !intersectingStartLayers.includes(layer));

      const intersectingStartLayer = filteredStartLayers.pop();
      const intersectingEndLayer = filteredEndLayers.pop();
      const STRAIGHTNESS_THRESHOLD = 4 / zoom;

      let startConnectedLayerId: any = intersectingStartLayer;
      let endConnectedLayerId: any = intersectingEndLayer;
      let start = startPanPoint;
      let end = point;

      if (startConnectedLayerId !== endConnectedLayerId) {
        if (intersectingStartLayer) {
          if ((currentPreviewLayer as ArrowLayer)?.orientation === ArrowOrientation.Horizontal) {
            if (end.x >= liveLayers[startConnectedLayerId].x && end.x <= liveLayers[startConnectedLayerId].x + liveLayers[startConnectedLayerId].width) {
              (currentPreviewLayer as ArrowLayer).orientation = ArrowOrientation.Vertical;
            }
          } else if ((currentPreviewLayer as ArrowLayer)?.orientation === ArrowOrientation.Vertical) {
            if (end.y >= liveLayers[startConnectedLayerId].y && end.y <= liveLayers[startConnectedLayerId].y + liveLayers[startConnectedLayerId].height) {
              (currentPreviewLayer as ArrowLayer).orientation = ArrowOrientation.Horizontal;
            }
          }

          const startConnectedLayer = liveLayers[startConnectedLayerId];
          start = getClosestEndPoint(startConnectedLayer, point, (currentPreviewLayer as ArrowLayer)?.arrowType || ArrowType.Straight, currentPreviewLayer as ArrowLayer);
          end = applyStraightnessAssist(point, start, STRAIGHTNESS_THRESHOLD, (currentPreviewLayer as ArrowLayer)?.arrowType || ArrowType.Straight);
        }

        if (intersectingEndLayer) {
          const endConnectedLayer = liveLayers[endConnectedLayerId];
          end = getClosestPointOnBorder(endConnectedLayer, end, start, zoom, (currentPreviewLayer as ArrowLayer)?.arrowType || ArrowType.Straight, currentPreviewLayer as ArrowLayer);
        }
      } else {
        startConnectedLayerId = "";
        endConnectedLayerId = "";
      }

      let center = { x: (start.x + end.x) / 2, y: (start.y + end.y) / 2 };
      widthArrow = end.x - start.x;
      heightArrow = end.y - start.y;

      if (!startConnectedLayerId && !endConnectedLayerId && (currentPreviewLayer as ArrowLayer)?.arrowType === ArrowType.Diagram) {
        const isHorizontal = Math.abs((currentPreviewLayer as ArrowLayer)?.width || 0) >= Math.abs((currentPreviewLayer as ArrowLayer)?.height || 0);
        (currentPreviewLayer as ArrowLayer).orientation = isHorizontal ? ArrowOrientation.Horizontal : ArrowOrientation.Vertical;
      }

      setCurrentPreviewLayer({
        x: start.x,
        y: start.y,
        center: center,
        width: widthArrow,
        height: heightArrow,
        type: LayerType.Arrow,
        fill: { r: 29, g: 29, b: 29, a: 1 },
        startArrowHead: ArrowHead.None,
        endArrowHead: ArrowHead.Triangle,
        startConnectedLayerId: (currentPreviewLayer as ArrowLayer)?.startConnectedLayerId || startConnectedLayerId,
        endConnectedLayerId: endConnectedLayerId,
        arrowType: arrowTypeInserting,
        orientation: (currentPreviewLayer as ArrowLayer)?.orientation || ArrowOrientation.Horizontal,
      });
      break;
    case LayerType.Line:
      setCurrentPreviewLayer({
        x: startPanPoint.x,
        y: startPanPoint.y,
        center: { x: startPanPoint.x + widthArrow / 2, y: startPanPoint.y + heightArrow / 2 },
        width: widthArrow,
        height: heightArrow,
        type: LayerType.Line,
        fill: { r: 29, g: 29, b: 29, a: 1 },
      });
      break;
  }
};

export const usePointerMove = (
  activeTouches: number,
  setPencilDraft: (draft: any[]) => void,
  setIsMoving: (isMoving: boolean) => void,
  rightClickPanning: boolean,
  camera: { x: number; y: number },
  startPanPoint: Point,
  setCamera: (camera: { x: number; y: number }) => void,
  setStartPanPoint: (point: Point) => void,
  setIsRightClickPanning: (isRightClickPanning: boolean) => void,
  canvasState: any,
  isPanning: boolean,
  cameraRef: React.MutableRefObject<{ x: number; y: number }>,
  zoomRef: React.MutableRefObject<number>,
  svgRef: React.RefObject<SVGSVGElement>,
  setMousePosition: (position: Point) => void,
  myPresence: Presence | null,
  setMyPresence: (presence: Presence) => void,
  socket: any,
  User: { userId: string },
  startMultiSelection: (point: Point, origin: Point) => void,
  updateSelectionNet: (point: Point, origin: Point) => void,
  EraserDeleteLayers: (point: Point) => void,
  translateSelectedLayers: (point: Point) => void,
  resizeSelectedLayers: (point: Point) => void,
  removeHighlightFromText: () => void,
  continueDrawing: (point: Point, e: React.PointerEvent) => void,
  setIsPanning: (isPanning: boolean) => void,
  setCurrentPreviewLayer: (layer: any) => void,
  liveLayerIds: string[],
  liveLayers: any,
  zoom: number,
  currentPreviewLayer: any,
  arrowTypeInserting: ArrowType
) => {
  return useCallback((e: React.PointerEvent) => {
    e.preventDefault();

    if (activeTouches > 1) {
      setPencilDraft([]);
      return;
    }

    setIsMoving(false);
    if (rightClickPanning || e.buttons === 2 || e.buttons === 4) {
      handleRightClickPanning(e, camera, startPanPoint, setCamera, setStartPanPoint, setIsRightClickPanning);
      return;
    }

    if (canvasState.mode === CanvasMode.Moving && isPanning) {
      handleMoving(e, camera, startPanPoint, setCamera, setStartPanPoint);
    }

    const current = pointerEventToCanvasPoint(e, cameraRef.current, zoomRef.current, svgRef);
    setMousePosition(current);

    const newPresence: Presence = {
      ...myPresence,
      cursor: { x: current.x, y: current.y },
    };

    setMyPresence(newPresence);

    if (socket) {
      socket.emit('presence', myPresence, User.userId);
    }

    switch (canvasState.mode) {
      case CanvasMode.Pressing:
        startMultiSelection(current, canvasState.origin);
        break;
      case CanvasMode.SelectionNet:
        updateSelectionNet(current, canvasState.origin);
        break;
      case CanvasMode.Eraser:
        if (e.buttons === 1) EraserDeleteLayers(current);
        break;
      case CanvasMode.Translating:
        setIsMoving(true);
        translateSelectedLayers(current);
        break;
      case CanvasMode.Resizing:
      case CanvasMode.ArrowResizeHandler:
        resizeSelectedLayers(current);
        removeHighlightFromText();
        break;
      case CanvasMode.Pencil:
      case CanvasMode.Laser:
      case CanvasMode.Highlighter:
        if (e.buttons === 1) continueDrawing(current, e);
        break;
      case CanvasMode.Inserting:
        if (e.buttons === 1 && startPanPoint && canvasState.layerType !== LayerType.Path &&
            (startPanPoint.x !== 0 || startPanPoint.y !== 0)) {
          setIsPanning(true);
          handleInserting(e, cameraRef, zoomRef, svgRef, startPanPoint, canvasState, setCurrentPreviewLayer, liveLayerIds, liveLayers, zoom, currentPreviewLayer, arrowTypeInserting);
        }
        break;
    }
  }, [
    activeTouches, setPencilDraft, setIsMoving, rightClickPanning, camera, startPanPoint, setCamera, setStartPanPoint,
    setIsRightClickPanning, canvasState, isPanning, cameraRef, zoomRef, svgRef, setMousePosition, myPresence, setMyPresence,
    socket, User.userId, startMultiSelection, updateSelectionNet, EraserDeleteLayers, translateSelectedLayers,
    resizeSelectedLayers, removeHighlightFromText, continueDrawing, setIsPanning, setCurrentPreviewLayer, liveLayerIds,
    liveLayers, zoom, currentPreviewLayer, arrowTypeInserting
  ]);
};

export const usePointerUp = (
  setCanvasState: (state: any) => void,
  canvasState: any,
  insertLayer: (layerType: LayerType, point: Point, width: number, height: number, center?: Point, startConnectedLayerId?: string, endConnectedLayerId?: string, arrowType?: any, orientation?: any) => void,
  insertPath: () => void,
  setIsPanning: (isPanning: boolean) => void,
  selectedLayersRef: React.MutableRefObject<string[]>,
  liveLayers: any,
  camera: { x: number; y: number },
  zoom: number,
  svgRef: React.RefObject<SVGSVGElement>,
  currentPreviewLayer: any,
  isPanning: boolean,
  initialLayers: any,
  socket: any,
  myPresence: Presence | null,
  setMyPresence: (presence: Presence) => void,
  User: { userId: string },
  boardId: string,
  expired: boolean,
  insertHighlight: () => void,
  liveLayerIds: string[],
  performAction: (command: any) => void,
  setLiveLayerIds: (ids: string[]) => void,
  setLiveLayers: (layers: any) => void,
  setPencilDraft: (draft: any[]) => void,
  setErasePath: (path: any[]) => void,
  layersToDeleteEraserRef: React.MutableRefObject<Set<string>>,
  setCurrentPreviewLayer: (layer: any | null) => void,
  setJustChanged: (changed: boolean) => void,
  setIsRightClickPanning: (isRightClickPanning: boolean) => void
) => {
  return useCallback((e: React.PointerEvent) => {
    setIsRightClickPanning(false);
    const point = pointerEventToCanvasPoint(e, camera, zoom, svgRef);

    if (
      canvasState.mode === CanvasMode.None ||
      canvasState.mode === CanvasMode.Pressing
    ) {
      document.body.style.cursor = 'default';
      setCanvasState({ mode: CanvasMode.None });
    } else if (canvasState.mode === CanvasMode.Pencil) {
      document.body.style.cursor = 'url(/custom-cursors/pencil.svg) 1 16, auto';
      insertPath();
    } else if (canvasState.mode === CanvasMode.Highlighter) {
      document.body.style.cursor = 'url(/custom-cursors/highlighter.svg) 2 18, auto';
      insertHighlight();
    } else if (canvasState.mode === CanvasMode.Laser) {
      document.body.style.cursor = 'url(/custom-cursors/laser.svg) 4 18, auto';
      setPencilDraft([]);
      const newPresence: Presence = { ...myPresence, pencilDraft: null };
      setMyPresence(newPresence);
      if (socket && !expired) {
        socket.emit('presence', newPresence, User.userId);
      }
    } else if (canvasState.mode === CanvasMode.Eraser) {
      setErasePath([]);
      document.body.style.cursor = 'url(/custom-cursors/eraser.svg) 8 16, auto';
      if (layersToDeleteEraserRef.current.size > 0) {
        const command = new DeleteLayerCommand(Array.from(layersToDeleteEraserRef.current), initialLayers, liveLayerIds, setLiveLayers, setLiveLayerIds, boardId, socket);
        performAction(command);
        layersToDeleteEraserRef.current.clear();
      }
    } else if (canvasState.mode === CanvasMode.Inserting) {
      if (e.button === 2 || e.button === 1) {
        setCursorWithFill('/custom-cursors/inserting.svg', document.documentElement.classList.contains("dark") ? '#ffffff' : '#000000', 10, 10);
      }

      const layerType = canvasState.layerType;
      setIsPanning(false);
      if (isPanning && currentPreviewLayer) {
        if ((layerType === LayerType.Arrow && currentPreviewLayer.type === LayerType.Arrow) ||
            (layerType === LayerType.Line && currentPreviewLayer.type === LayerType.Line)) {
          insertLayer(layerType, { x: currentPreviewLayer.x, y: currentPreviewLayer.y }, currentPreviewLayer.width, currentPreviewLayer.height, currentPreviewLayer.center, currentPreviewLayer.startConnectedLayerId, currentPreviewLayer.endConnectedLayerId, currentPreviewLayer.arrowType, currentPreviewLayer.orientation);
        } else {
          insertLayer(layerType, { x: currentPreviewLayer.x, y: currentPreviewLayer.y }, currentPreviewLayer.width, currentPreviewLayer.height);
        }
        setCurrentPreviewLayer(null);
      } else if (layerType !== LayerType.Arrow && layerType !== LayerType.Line) {
        let width, height;
        if (layerType === LayerType.Text) {
          width = 100;
          height = 18;
          point.x = point.x - width / 20;
          point.y = point.y - height / 2;
        } else {
          width = 80;
          height = 80;
          point.x = point.x - width / 2;
          point.y = point.y - height / 2;
        }
        insertLayer(layerType, point, width, height);
      }
    } else if (canvasState.mode === CanvasMode.Moving) {
      document.body.style.cursor = 'url(/custom-cursors/hand.svg) 0 10, auto';
      setIsPanning(false);
    } else if (canvasState.mode === CanvasMode.Translating) {
      const initialLayer = JSON.stringify(initialLayers[selectedLayersRef.current[0]]);
      const liveLayer = JSON.stringify(liveLayers[selectedLayersRef.current[0]]);
      const changed = initialLayer !== liveLayer;

      setCanvasState({ mode: CanvasMode.None });

      if (!changed && selectedLayersRef.current.length > 1) {
        const intersectingLayers = findIntersectingLayersWithPoint(liveLayerIds, liveLayers, point, zoom);
        const id = intersectingLayers[intersectingLayers.length - 1];
        if (selectedLayersRef.current.includes(id)) {
          selectedLayersRef.current = [id];
          return;
        }
      }

      setJustChanged(changed);

      if (selectedLayersRef.current.length > 0 && changed === true) {
        const updatedLayerIds: string[] = [...selectedLayersRef.current];
        selectedLayersRef.current.forEach(id => {
          const layer = liveLayers[id];
          if (layer.type !== LayerType.Arrow && layer.type !== LayerType.Line && layer.type !== LayerType.Path && selectedLayersRef.current.length === 1) {
            if (layer.connectedArrows) {
              layer.connectedArrows.forEach((arrowId: string) => {
                updatedLayerIds.push(arrowId);
              });
            }
          }
        });

        const command = new TranslateLayersCommand(updatedLayerIds, initialLayers, liveLayers, setLiveLayers, boardId, socket);
        performAction(command);
      }

      setCanvasState({ mode: CanvasMode.None });
    } else if (canvasState.mode === CanvasMode.Resizing || canvasState.mode === CanvasMode.ArrowResizeHandler) {
      const initialLayer = JSON.stringify(initialLayers[selectedLayersRef.current[0]]);
      const liveLayer = JSON.stringify(liveLayers[selectedLayersRef.current[0]]);
      const changed = initialLayer !== liveLayer;
      setJustChanged(changed);

      if (selectedLayersRef.current.length > 0 && changed === true) {
        const command = new TranslateLayersCommand(selectedLayersRef.current, initialLayers, liveLayers, setLiveLayers, boardId, socket);
        performAction(command);
      }
      setCanvasState({ mode: CanvasMode.None });
    } else {
      document.body.style.cursor = 'default';
      setCanvasState({ mode: CanvasMode.None });
    }

    if (e.pointerType !== "mouse") {
      const newPresence: Presence = { ...myPresence, cursor: null, pencilDraft: null };
      setPencilDraft([]);
      setMyPresence(newPresence);
      if (socket) {
        socket.emit('presence', newPresence, User.userId);
      }
      return;
    }

    if (selectedLayersRef.current.length === 0) {
      const newPresence: Presence = { ...myPresence, selection: [], pencilDraft: null };
      if (socket) {
        socket.emit('presence', newPresence, User.userId);
      }
    }
  }, [
    setCanvasState, canvasState, insertLayer, insertPath, setIsPanning, selectedLayersRef, liveLayers, camera, zoom,
    svgRef, currentPreviewLayer, isPanning, initialLayers, socket, myPresence, User.userId, boardId, expired,
    insertHighlight, liveLayerIds, performAction, setLiveLayerIds, setLiveLayers, setPencilDraft, setErasePath,
    layersToDeleteEraserRef, setCurrentPreviewLayer, setJustChanged, setMyPresence
  ]);
};

export const usePointerLeave = (
  setMyPresence: (presence: Presence | null) => void,
  myPresence: Presence | null,
  socket: any,
  userId: string,
  setPencilDraft: (draft: any[]) => void
) => {
  return useCallback((e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") {
      return;
    }

    const newPresence: Presence = {
      ...myPresence,
      cursor: null,
      pencilDraft: null
    };

    setPencilDraft([]);
    setMyPresence(newPresence);

    if (socket) {
      socket.emit('presence', newPresence, userId);
    }
  }, [setMyPresence, myPresence, socket, userId, setPencilDraft]);
};

export const useLayerPointerDown = (
  canvasStateRef: React.MutableRefObject<{ mode: CanvasMode }>,
  expired: boolean,
  cameraRef: React.MutableRefObject<{ x: number; y: number }>,
  zoomRef: React.MutableRefObject<number>,
  svgRef: React.RefObject<SVGSVGElement>,
  setCanvasState: (state: any) => void,
  selectedLayersRef: React.MutableRefObject<string[]>,
  setMyPresence: (presence: Presence | null) => void,
  socket: any,
  userId: string
) => {
  return useCallback((e: React.PointerEvent, layerId: string) => {
    if (
      canvasStateRef.current.mode === CanvasMode.Pencil ||
      canvasStateRef.current.mode === CanvasMode.Inserting ||
      canvasStateRef.current.mode === CanvasMode.Moving ||
      canvasStateRef.current.mode === CanvasMode.Eraser ||
      canvasStateRef.current.mode === CanvasMode.Laser ||
      canvasStateRef.current.mode === CanvasMode.Highlighter ||
      (e.pointerType && e.button !== 0) ||
      expired === true
    ) {
      return;
    }

    e.stopPropagation();
    const point = pointerEventToCanvasPoint(e, cameraRef.current, zoomRef.current, svgRef);
    setCanvasState({ mode: CanvasMode.Translating, current: point });

    if (selectedLayersRef.current.includes(layerId)) {
      return;
    }

    const newPresence: Presence = {
      selection: [layerId],
      cursor: point
    };

    setMyPresence(newPresence);

    selectedLayersRef.current = [layerId];

    if (socket) {
      socket.emit('presence', newPresence, userId);
    }
  }, [canvasStateRef, expired, cameraRef, zoomRef, svgRef, setCanvasState, selectedLayersRef, setMyPresence, socket, userId]);
};

export const useLayerIdsToColorSelection = (otherUsers: any[]) => {
  return useMemo(() => {
    const layerIdsToColorSelection: Record<string, string> = {};

    if (otherUsers) {
      for (const user of otherUsers) {
        const connectionId = user.connectionId;
        const selection = user.presence?.selection || [];

        for (const layerId of selection) {
          layerIdsToColorSelection[layerId] = connectionIdToColor(connectionId);
        }
      }
    }

    return layerIdsToColorSelection;
  }, [otherUsers]);
};

export const useDragOver = (
  expired: boolean,
  setIsDraggingOverCanvas: (isDragging: boolean) => void
) => {
  return useCallback((event: React.DragEvent) => {
    event.preventDefault();
    if (expired) {
      return;
    }

    setIsDraggingOverCanvas(true);
  }, [setIsDraggingOverCanvas, expired]);
};

export const useDragLeave = (
  expired: boolean,
  setIsDraggingOverCanvas: (isDragging: boolean) => void
) => {
  return useCallback((event: React.DragEvent) => {
    event.preventDefault();
    if (expired) {
      return;
    }

    setIsDraggingOverCanvas(false);
  }, [setIsDraggingOverCanvas, expired]);
};

export const useOnDrop = (
  expired: boolean,
  setIsDraggingOverCanvas: (isDragging: boolean) => void,
  camera: { x: number; y: number },
  zoom: number,
  maxFileSize: number,
  userId: string,
  insertMedia: (layerType: LayerType.Image | LayerType.Video | LayerType.Link, position: Point, info: any, zoom: number) => void
) => {
  return useCallback((event: React.DragEvent) => {
    event.preventDefault();
    if (expired) {
      return;
    }

    setIsDraggingOverCanvas(false);
    let x = (Math.round(event.clientX) - camera.x) / zoom;
    let y = (Math.round(event.clientY) - camera.y) / zoom;
    const files = event.dataTransfer.files;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
        toast.error('File type not accepted. Please upload an image or video file.');
        continue;
      }

      // Check file size
      const fileSizeInMB = file.size / 1024 / 1024;
      if (fileSizeInMB > maxFileSize) {
        toast.error(`File size has to be lower than ${maxFileSize}MB. Please try again.`);
        continue;
      }

      const toastId = toast.loading("Media is being processed, please wait...");
      const formData = new FormData();
      formData.append('file', file);
      formData.append('userId', userId);

      fetch('/api/aws-s3-images', {
        method: 'POST',
        body: formData
      })
        .then(async (res: Response) => {
          if (!res.ok) {
            throw new Error('Network response was not ok');
          }
          const url = await res.text();

          if (file.type.startsWith('image/')) {
            const img = new Image();
            const imgLoad = new Promise<{ url: string, dimensions: { width: number, height: number }, type: string }>((resolve) => {
              img.onload = () => {
                const dimensions = { width: img.width, height: img.height };
                resolve({ url, dimensions, type: 'image' });
              };
            });
            img.src = url;
            const info = await imgLoad;
            insertMedia(LayerType.Image, { x, y }, info, zoom);
          } else if (file.type.startsWith('video/')) {
            const video = document.createElement('video');
            const videoLoad = new Promise<{ url: string, dimensions: { width: number, height: number }, type: string }>((resolve) => {
              video.onloadedmetadata = () => {
                const dimensions = { width: video.videoWidth, height: video.videoHeight };
                resolve({ url, dimensions, type: 'video' });
              };
            });
            video.src = url;
            const info = await videoLoad;
            insertMedia(LayerType.Video, { x, y }, info, zoom);
          }
        })
        .catch(error => {
          console.error('Error:', error);
        })
        .finally(() => {
          toast.dismiss(toastId);
          toast.success(`${file.type.startsWith('image/') ? 'Image' : 'Video'} uploaded successfully`);
        });
    }
  }, [expired, setIsDraggingOverCanvas, camera, zoom, maxFileSize, userId, insertMedia]);
};

export const useTouchDown = (
  setIsMoving: (isMoving: boolean) => void,
  setActiveTouches: (touches: number) => void,
  selectedLayersRef: React.MutableRefObject<string[]>
) => {
  return useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    setIsMoving(false);
    setActiveTouches(e.touches.length);

    if (e.touches.length > 1) {
      selectedLayersRef.current = [];
    }
  }, [setIsMoving, setActiveTouches, selectedLayersRef]);
};

export const useTouchUp = (
  setIsMoving: (isMoving: boolean) => void,
  setActiveTouches: (touches: number) => void
) => {
  return useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    setIsMoving(false);
    setActiveTouches(e.changedTouches.length);
  }, [setIsMoving, setActiveTouches]);
};

export const useTouchMove = (
  zoom: number,
  pinchStartDist: number | null,
  camera: { x: number; y: number },
  lastPanPoint: { x: number; y: number } | null,
  canvasState: { mode: CanvasMode },
  setIsMoving: (isMoving: boolean) => void,
  setActiveTouches: (touches: number) => void,
  setPinchStartDist: (dist: number | null) => void,
  setLastPanPoint: (point: { x: number; y: number } | null) => void,
  setZoom: (zoom: number) => void,
  setCamera: (camera: { x: number; y: number }) => void
) => {
  return useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    if (canvasState.mode === CanvasMode.Translating) {
      setIsMoving(true);
    }
    setActiveTouches(e.touches.length);

    if (e.touches.length < 2) {
      setPinchStartDist(null);
      setLastPanPoint(null);
      return;
    }

    const touch1 = e.touches[0];
    const touch2 = e.touches[1];

    const dist = Math.hypot(
      touch1.clientX - touch2.clientX,
      touch1.clientY - touch2.clientY
    );

    const svgRect = e.currentTarget.getBoundingClientRect();
    const x = ((touch1.clientX + touch2.clientX) / 2) - svgRect.left;
    const y = ((touch1.clientY + touch2.clientY) / 2) - svgRect.top;

    if (pinchStartDist === null) {
      setPinchStartDist(dist);
      setLastPanPoint({ x, y });
      return;
    }

    const isZooming = Math.abs(dist - pinchStartDist) > 10;

    if (isZooming) {
      const zoomSpeed = 1; // Adjust this value to control zoom sensitivity
      const zoomFactor = dist / pinchStartDist;
      const targetZoom = zoom * zoomFactor;
      const newZoom = zoom + (targetZoom - zoom) * zoomSpeed;

      // Clamp zoom level
      const clampedZoom = Math.max(0.3, Math.min(newZoom, 10));

      const zoomRatio = clampedZoom / zoom;
      const newX = x - (x - camera.x) * zoomRatio;
      const newY = y - (y - camera.y) * zoomRatio;

      setZoom(clampedZoom);
      setCamera({ x: newX, y: newY });
    } else if (lastPanPoint) {
      // Panning logic using delta values
      const dx = x - lastPanPoint.x;
      const dy = y - lastPanPoint.y;

      const panSpeed = 1; // Adjust this value to control pan sensitivity

      setCamera({
        x: camera.x + dx * panSpeed,
        y: camera.y + dy * panSpeed,
      });
    }

    setPinchStartDist(dist);
    setLastPanPoint({ x, y });
  }, [zoom, pinchStartDist, camera, lastPanPoint, canvasState, setIsMoving, setActiveTouches, setPinchStartDist, setLastPanPoint, setZoom, setCamera]);
};

export const useCopySelectedLayers = (
  selectedLayersRef: React.MutableRefObject<string[]>,
  setCopiedLayerIds: (ids: string[]) => void
) => {
  return useCallback(() => {
    setCopiedLayerIds(selectedLayersRef.current);
  }, [selectedLayersRef, setCopiedLayerIds]);
};

export const usePasteCopiedLayers = (
  copiedLayerIds: string[],
  myPresence: Presence | null,
  setLiveLayers: (layers: Record<string, Layer>) => void,
  setLiveLayerIds: (ids: string[]) => void,
  setMyPresence: (presence: Presence) => void,
  org: any,
  proModal: any,
  socket: any,
  boardId: string,
  performAction: (command: any) => void,
  liveLayers: Record<string, Layer>
) => {
  return useCallback((mousePosition: { x: number; y: number }) => {
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;

    copiedLayerIds.forEach((id) => {
      const layer = liveLayers[id];
      minX = Math.min(minX, layer.x);
      minY = Math.min(minY, layer.y);
      maxX = Math.max(maxX, layer.x + layer.width);
      maxY = Math.max(maxY, layer.y + layer.height);
    });

    const centerX = (minX + maxX) / 2;
    const centerY = (minY + maxY) / 2;

    const offsetX = mousePosition.x - centerX;
    const offsetY = mousePosition.y - centerY;

    const idMap = new Map();
    const newLayers: Record<string, Layer> = {};
    copiedLayerIds.forEach((id) => {
      const layer = { ...liveLayers[id] };

      const newId = nanoid();
      const clonedLayer = JSON.parse(JSON.stringify(layer));
      clonedLayer.x = clonedLayer.x + offsetX;
      clonedLayer.y = clonedLayer.y + offsetY;
      if (clonedLayer.type === LayerType.Arrow || clonedLayer.type === LayerType.Line) {
        clonedLayer.center.x += offsetX;
        clonedLayer.center.y += offsetY;
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
      } else if (layer.type !== LayerType.Line && layer.connectedArrows) {
        layer.connectedArrows = layer.connectedArrows.map(arrowId => idMap.get(arrowId) || arrowId);
      }
    });

    const newIds = Object.keys(newLayers);
    const clonedLayers = Object.values(newLayers);

    const command = new InsertLayerCommand(newIds, clonedLayers, setLiveLayers, setLiveLayerIds, boardId, socket, org, proModal);
    performAction(command);

    const newPresence: Presence = {
      ...myPresence,
      selection: newIds
    };

    setMyPresence(newPresence);

  }, [copiedLayerIds, myPresence, setLiveLayers, setLiveLayerIds, setMyPresence, org, proModal, socket, boardId, performAction, liveLayers]);
};

export const useKeyboardListener = (
  expired: boolean,
  copySelectedLayers: () => void,
  pasteCopiedLayers: (position: { x: number; y: number }) => void,
  setCanvasState: (state: any) => void,
  selectedLayersRef: React.MutableRefObject<string[]>,
  liveLayerIds: string[],
  socket: any,
  myPresence: Presence | null,
  User: { userId: string },
  setMyPresence: (presence: Presence) => void,
  setForceSelectionBoxRender: (force: boolean) => void,
  forceSelectionBoxRender: boolean,
  liveLayers: any,
  setLiveLayers: (layers: any) => void,
  setLiveLayerIds: (ids: string[]) => void,
  boardId: string,
  performAction: (command: any) => void,
  unselectLayers: () => void,
  undo: () => void,
  redo: () => void,
  history: any[],
  redoStack: any[],
  mousePosition: { x: number; y: number },
  setIsMoving: (isMoving: boolean) => void,
  translateSelectedLayersWithDelta: (delta: { x: number; y: number }) => void,
  initialLayers: any,
  canvasState: { mode: CanvasMode }
) => {
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (!e.key || expired) {
        return;
      }

      const isInsideTextArea = checkIfTextarea();
      const key = e.key.toLowerCase();

      if (key === "z") {
        if (e.ctrlKey || e.metaKey) {
          if (!isInsideTextArea) {
            e.preventDefault();
            if (e.shiftKey && redoStack.length > 0) {
              redo();
              return;
            } else if (!e.shiftKey && history.length > 0) {
              selectedLayersRef.current = [];
              undo();
              return;
            }
          }
        }
      } else if (key === "c") {
        if (!isInsideTextArea) {
          if (e.ctrlKey || e.metaKey) {
            copySelectedLayers();
          } else {
            setCanvasState({ mode: CanvasMode.Inserting, layerType: LayerType.Ellipse });
          }
        }
      } else if (key === "v") {
        if (!isInsideTextArea) {
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            pasteCopiedLayers(mousePosition);
          }
        }
      } else if (key === "a") {
        if (!isInsideTextArea) {
          if ((e.ctrlKey || e.metaKey)) {
            e.preventDefault();
            selectedLayersRef.current = liveLayerIds;

            if (socket) {
              const newPresence: Presence = {
                ...myPresence,
                selection: liveLayerIds
              };
              socket.emit('presence', newPresence, User.userId);
              setMyPresence(newPresence);
            }

            setForceSelectionBoxRender(!forceSelectionBoxRender);
          } else {
            setCanvasState({ mode: CanvasMode.Inserting, layerType: LayerType.Arrow });
          }
        }
      } else if (key === "tab") {
        if (expired) {
            e.preventDefault();
            return;
        }
        // if (!isInsideTextArea) {
        //     e.preventDefault();
        //     const layerId = nanoid();
        //     const command = new InsertLayerCommand([layerId], [suggestedLayers], setLiveLayers, setLiveLayerIds, boardId, socket, org, proModal);
        //     performAction(command);
        //     selectedLayersRef.current = [layerId];
        //     setSuggestedLayers({});
        // }
      } else if (key === "backspace" || key === "delete") {
        if (selectedLayersRef.current.length > 0 && !isInsideTextArea) {
          const command = new DeleteLayerCommand(selectedLayersRef.current, liveLayers, liveLayerIds, setLiveLayers, setLiveLayerIds, boardId, socket);
          performAction(command);
          unselectLayers();
        }
      } else if (!isInsideTextArea) {
        if (key === "s") {
          setCanvasState({ mode: CanvasMode.None })
        } else if (key === "d") {
          setCanvasState({ mode: CanvasMode.Pencil });
        } else if (key === "e") {
          setCanvasState({ mode: CanvasMode.Eraser });
        } else if (key === "h") {
          setCanvasState({ mode: CanvasMode.Moving });
        } else if (key === "n") {
          setCanvasState({ mode: CanvasMode.Inserting, layerType: LayerType.Note });
        } else if (key === "t") {
          setCanvasState({ mode: CanvasMode.Inserting, layerType: LayerType.Text });
        } else if (key === "l") {
          setCanvasState({ mode: CanvasMode.Inserting, layerType: LayerType.Line });
        } else if (key === "r") {
          setCanvasState({ mode: CanvasMode.Inserting, layerType: LayerType.Rectangle });
        } else if (key === "k") {
          setCanvasState({ mode: CanvasMode.Laser });
        } else if (key === "arrowup" || key === "arrowdown" || key === "arrowleft" || key === "arrowright") {
          if (selectedLayersRef.current.length > 0) {
            const moveAmount = 1; // You can adjust this value to change the movement speed
            let deltaX = 0;
            let deltaY = 0;

            switch (key) {
              case "arrowup":
                deltaY = -moveAmount;
                break;
              case "arrowdown":
                deltaY = moveAmount;
                break;
              case "arrowleft":
                deltaX = -moveAmount;
                break;
              case "arrowright":
                deltaX = moveAmount;
                break;
            }

            setCanvasState({ mode: CanvasMode.Translating, current: { x: deltaX, y: deltaY } });
            setIsMoving(true);
            translateSelectedLayersWithDelta({ x: deltaX, y: deltaY });
          }
        }
      }
    }

    function onKeyUp(e: KeyboardEvent) {
      const key = e.key.toLowerCase();
      if (key === "arrowup" || key === "arrowdown" || key === "arrowleft" || key === "arrowright") {
        if (canvasState.mode === CanvasMode.Translating) {
          const command = new TranslateLayersCommand(selectedLayersRef.current, initialLayers, liveLayers, setLiveLayers, boardId, socket);
          performAction(command);
          setCanvasState({ mode: CanvasMode.None });
          setIsMoving(false);
        }
      }
    }

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keyup", onKeyUp);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("keyup", onKeyUp);
    }
  }, [
    expired, copySelectedLayers, pasteCopiedLayers, setCanvasState, selectedLayersRef, liveLayerIds, socket, myPresence, User.userId,
    setMyPresence, setForceSelectionBoxRender, forceSelectionBoxRender, liveLayers, setLiveLayers, setLiveLayerIds, boardId,
    performAction, unselectLayers, undo, redo, history, redoStack, mousePosition, setIsMoving, translateSelectedLayersWithDelta,
    initialLayers, canvasState
  ]);
};

export const useCursorListener = (
  canvasState: { mode: CanvasMode; layerType?: LayerType },
  rightClickPanning: boolean,
  selectedLayersRef: React.MutableRefObject<string[]>
) => {
  useEffect(() => {
    if (rightClickPanning) {
      document.body.style.cursor = 'url(/custom-cursors/grab.svg) 12 12, auto';
      return;
    }

    switch (canvasState.mode) {
      case CanvasMode.Inserting:
        selectedLayersRef.current = [];
        if (canvasState.layerType === LayerType.Text) {
          setCursorWithFill('/custom-cursors/text-cursor.svg', document.documentElement.classList.contains("dark") ? '#ffffff' : '#000000', 8, 0);
        } else {
          setCursorWithFill('/custom-cursors/inserting.svg', document.documentElement.classList.contains("dark") ? '#ffffff' : '#000000', 10, 10);
        }
        break;
      case CanvasMode.Pencil:
        document.body.style.cursor = 'url(/custom-cursors/pencil.svg) 1 16, auto';
        selectedLayersRef.current = [];
        break;
      case CanvasMode.Highlighter:
        document.body.style.cursor = 'url(/custom-cursors/highlighter.svg) 2 18, auto';
        selectedLayersRef.current = [];
        break;
      case CanvasMode.Laser:
        document.body.style.cursor = 'url(/custom-cursors/laser.svg) 4 18, auto';
        selectedLayersRef.current = [];
        break;
      case CanvasMode.Eraser:
        document.body.style.cursor = 'url(/custom-cursors/eraser.svg) 8 16, auto';
        selectedLayersRef.current = [];
        break;
      case CanvasMode.Moving:
        document.body.style.cursor = 'url(/custom-cursors/hand.svg) 8 8, auto';
        break;
      case CanvasMode.ArrowResizeHandler:
        document.body.style.cursor = 'url(/custom-cursors/grab.svg) 12 12, auto';
        break;
      default:
        document.body.style.cursor = 'default';
    }
  }, [canvasState.mode, canvasState.layerType, rightClickPanning, selectedLayersRef]);
};

export const usePreventDefaultSafariGestures = () => {
  useEffect(() => {
    // Prevent Safari from going back/forward
    const preventDefault = (e: Event) => {
      if ('scale' in e && (e as any).scale !== 1) {
        e.preventDefault();
      }
    };

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    window.addEventListener('wheel', preventDefault, { passive: false });
    document.addEventListener('gesturestart', preventDefault);
    document.addEventListener('gesturechange', preventDefault);
    document.addEventListener('gestureend', preventDefault);

    if (typeof document !== 'undefined') {
      document.addEventListener('contextmenu', handleContextMenu);
    }

    return () => {
      window.removeEventListener('wheel', preventDefault);
      document.removeEventListener('gesturestart', preventDefault);
      document.removeEventListener('gesturechange', preventDefault);
      document.removeEventListener('gestureend', preventDefault);
      if (typeof document !== 'undefined') {
        document.removeEventListener('contextmenu', handleContextMenu);
      }
    };
  }, []);
};

export const useUndoInitialStateListener = (
  liveLayers: any,
  setInitialLayers: (layers: any) => void,
  setIsArrowPostInsertMenuOpen: (isOpen: boolean) => void,
  setStartPanPoint: (point: { x: number; y: number }) => void
) => {
  useEffect(() => {
    const onPointerDown = (e: PointerEvent) => {
      const deepCopy = JSON.parse(JSON.stringify(liveLayers));
      setInitialLayers(deepCopy);
      setIsArrowPostInsertMenuOpen(false);
      if (e.buttons === 2 || e.buttons === 4) {
        setStartPanPoint({ x: e.clientX, y: e.clientY });
      }
    };

    document.addEventListener('pointerdown', onPointerDown);

    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [liveLayers, setInitialLayers, setIsArrowPostInsertMenuOpen, setStartPanPoint]);
};

export const useNoDanglingPoints = (
  canvasState: { mode: CanvasMode },
  setPencilDraft: (draft: any[]) => void,
  canvasStateRef: React.MutableRefObject<{ mode: CanvasMode }>,
  zoomRef: React.MutableRefObject<number>,
  cameraRef: React.MutableRefObject<{ x: number; y: number }>,
  zoom: number,
  camera: { x: number; y: number }
) => {
  useEffect(() => {
    // Clear pencil draft when canvas mode is None to avoid dangling points
    if (canvasState.mode === CanvasMode.None) {
      setPencilDraft([]);
    }

    // Sync refs with current state
    canvasStateRef.current = canvasState;
    zoomRef.current = zoom;
    cameraRef.current = camera;
  }, [canvasState, zoom, camera, setPencilDraft, canvasStateRef, zoomRef, cameraRef]);
};

export const useUpdateVisibleLayers = (
  svgRef: React.RefObject<SVGSVGElement>,
  camera: { x: number; y: number },
  zoom: number,
  liveLayerIds: string[],
  liveLayers: Record<string, Layer>,
  setVisibleLayers: (layers: string[]) => void
) => {
  useEffect(() => {
    const updateVisibleLayers = () => {
      if (!svgRef.current) return;

      const svg = svgRef.current;
      const viewBox = svg.viewBox.baseVal;
      const visibleRect = {
        x: -camera.x / zoom,
        y: -camera.y / zoom,
        width: viewBox.width / zoom,
        height: viewBox.height / zoom
      };

      const newVisibleLayers = liveLayerIds.filter((layerId: string) => {
        const layer = liveLayers[layerId];
        if (layer) {
          return isLayerVisible(layer, visibleRect);
        }
        return false;
      });

      setVisibleLayers(newVisibleLayers);
    };

    updateVisibleLayers();
  }, [svgRef, camera, zoom, liveLayerIds, liveLayers, setVisibleLayers]);
};

export const useFocusInitialTextLayer = (
  justInsertedText: boolean,
  layerRef: React.RefObject<HTMLElement>
) => {
  useEffect(() => {
    if (justInsertedText && layerRef && layerRef.current) {
      layerRef.current.focus();
    }
  }, [justInsertedText, layerRef]);
};