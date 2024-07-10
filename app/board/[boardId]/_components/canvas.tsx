"use client";

import { customAlphabet } from "nanoid";
import React, { useCallback, useMemo, useState, useEffect, useRef } from "react";

import {
    colorToCss,
    connectionIdToColor,
    findIntersectingLayersWithRectangle,
    penPointsToPathLayer,
    resizeArrowBounds,
    pointerEventToCanvasPoint,
    resizeBounds,
    findIntersectingLayersWithPoint,
    getShapeType,
    resizeBox,
    calculateBoundingBox,
    removeHighlightFromText,
    findIntersectingLayerForConnection,
    getClosestPointOnBorder,
    updateArrowPosition,
    updatedLayersConnectedArrows,
    getClosestEndPoint,
} from "@/lib/utils";

import {
    ArrowHandle,
    ArrowHead,
    ArrowLayer,
    Camera,
    CanvasMode,
    CanvasState,
    Layer,
    Layers,
    LayerType,
    Point,
    Presence,
    PreviewLayer,
    Side,
    XYWH,
} from "@/types/canvas";

import { useDisableScrollBounce } from "@/hooks/use-disable-scroll-bounce";
import { Info } from "./info";
import { Path } from "../canvas-objects/path";
import { Toolbar } from "./toolbar";
import { Participants } from "./participants";
import { LayerPreview } from "./layer-preview";
import { SelectionBox } from "./selection-box";
import { SelectionTools } from "./selection-tools";
import { CursorsPresence } from "./cursors-presence";
import { useProModal } from "@/hooks/use-pro-modal";
import { getMaxImageSize } from "@/lib/planLimits";
import { CurrentPreviewLayer } from "./current-preview-layer";
import { useRoom } from "@/components/room";
import { toast } from "sonner";
import { ZoomToolbar } from "./zoom-toolbar";
import { Command, DeleteLayerCommand, InsertLayerCommand, TranslateLayersCommand } from "@/lib/commands";
import { SketchlieAiInput } from "./sketchlie-ai-input";
import { ArrowConnectionOutlinePreview } from "./arrow-connection-outline-preview";

const preventDefault = (e: any) => {
    if (e.scale !== 1) {
        e.preventDefault();
    }
};

if (typeof window !== 'undefined') {
    window.addEventListener('wheel', preventDefault, { passive: false });
}

const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const nanoid = customAlphabet(alphabet, 21);

interface CanvasProps {
    boardId: string;
}

export const Canvas = ({
    boardId
}: CanvasProps) => {
    const [isShowingAIInput, setIsShowingAIInput] = useState(false);
    const [isMoving, setIsMoving] = useState(false);
    const [justChanged, setJustChanged] = useState(false);
    const [isPenMenuOpen, setIsPenMenuOpen] = useState(false);
    const [isShapesMenuOpen, setIsShapesMenuOpen] = useState(false);
    const [isPenEraserSwitcherOpen, setIsPenEraserSwitcherOpen] = useState(false);
    const [selectedTool, setSelectedTool] = useState(CanvasMode.None);
    const [initialLayers, setInitialLayers] = useState<Layers>({}); // used for undo/redo
    const [history, setHistory] = useState<Command[]>([]);
    const [redoStack, setRedoStack] = useState<Command[]>([]);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const { liveLayers, liveLayerIds, User, otherUsers, setLiveLayers, setLiveLayerIds, org, socket, board, expired } = useRoom();
    const maxFileSize = org && getMaxImageSize(org) || 0;
    const [isDraggingOverCanvas, setIsDraggingOverCanvas] = useState(false);
    const selectedLayersRef = useRef<string[]>([]);
    const [copiedLayerIds, setCopiedLayerIds] = useState<string[]>([]);
    const [pencilDraft, setPencilDraft] = useState<[number, number, number][]>([]);
    const [layerRef, setLayerRef] = useState<any>(null);
    const layersToDeleteEraserRef = useRef<Set<string>>(new Set());
    const [canvasState, setCanvasState] = useState<CanvasState>({
        mode: CanvasMode.None,
    });
    const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const zoomRef = useRef(zoom);
    const cameraRef = useRef(camera);
    const canvasStateRef = useRef(canvasState);
    const [isPanning, setIsPanning] = useState(false);
    const [rightClickPanning, setIsRightClickPanning] = useState(false);
    const [startPanPoint, setStartPanPoint] = useState({ x: 0, y: 0 });
    const [selectedImage, setSelectedImage] = useState<{ info: any } | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [currentPreviewLayer, setCurrentPreviewLayer] = useState<PreviewLayer | null>(null);
    const [myPresence, setMyPresence] = useState<Presence | null>(null);
    const [pathColor, setPathColor] = useState({ r: 29, g: 29, b: 29, a: 1 });
    const [pathStrokeSize, setPathStrokeSize] = useState(4);
    const [pinchStartDist, setPinchStartDist] = useState<number | null>(null);
    const [activeTouches, setActiveTouches] = useState(0);
    const [magicPathAssist, setMagicPathAssist] = useState(false);
    const [layerWithAssistDraw, setLayerWithAssistDraw] = useState(false);
    const proModal = useProModal();
    const [background, setBackground] = useState(() => {
        const storedValue = localStorage.getItem('background');
        return storedValue ? storedValue : 'none';
    });

    useDisableScrollBounce();

    const performAction = (command: Command) => {
        command.execute(liveLayerIds, liveLayers);
        setHistory([...history, command]);
        setRedoStack([]); // clear redo stack when new action is performed
    };

    const undo = () => {
        const lastCommand = history[history.length - 1];
        lastCommand.undo(liveLayerIds, liveLayers);
        setHistory(history.slice(0, -1));
        setRedoStack([...redoStack, lastCommand]);
    };

    const redo = () => {
        const lastCommand = redoStack[redoStack.length - 1];
        lastCommand.execute(liveLayerIds, liveLayers);
        setRedoStack(redoStack.slice(0, -1));
        setHistory([...history, lastCommand]);
    };

    const insertLayer = useCallback((layerType: LayerType, position: Point, width: number, height: number, center?: Point, startConnectedLayerId?: string, endConnectedLayerId?: string) => {
        const layerId = nanoid();

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
                textFontSize: 12,
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
            };

            if (startConnectedLayerId) {
                const connectedLayer = liveLayers[startConnectedLayerId];
                const updatedLayer = updatedLayersConnectedArrows(connectedLayer, layerId);
                liveLayers[startConnectedLayerId] = updatedLayer;
                setLiveLayers({ ...liveLayers });
            }

            if (endConnectedLayerId) {
                const connectedLayer = liveLayers[endConnectedLayerId];
                const updatedLayer = updatedLayersConnectedArrows(connectedLayer, layerId);
                liveLayers[endConnectedLayerId] = updatedLayer;
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
                textFontSize: 12,
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

    }, [myPresence, socket, org, proModal, User.userId, setLiveLayers, setLiveLayerIds, board, layerWithAssistDraw]);

    const insertImage = useCallback((
        layerType: LayerType.Image,
        position: Point,
        info: any
    ) => {

        const layerId = nanoid();

        if (!info || !info.url) {
            return;
        }

        if (info.dimensions.width === 0) {
            info.dimensions.width = 200;
        }

        if (info.dimensions.height === 0) {
            info.dimensions.height = 200;
        }

        const aspectRatio = info.dimensions.width / info.dimensions.height;
        const width = 200 / zoom
        const height = width / aspectRatio;


        const layer = {
            type: layerType,
            x: position.x - width / 2,
            y: position.y - height / 2,
            height: height,
            width: width,
            src: info.url,
            opacity: 1,
            fill: null,
        };

        const command = new InsertLayerCommand([layerId], [layer], setLiveLayers, setLiveLayerIds, boardId, socket, org, proModal);
        performAction(command);
        setCanvasState({ mode: CanvasMode.None });
    }, [myPresence, socket, org, proModal, User.userId, setLiveLayers, setLiveLayerIds, board, zoom]);

    const translateSelectedLayers = useCallback((point: Point) => {
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

        const soleLayer = selectedLayersRef.current.length === 1

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
                if (newLayer.type === LayerType.Arrow && newLayer.center || newLayer.type === LayerType.Line && newLayer.center) {
                    const newCenter = {
                        x: newLayer.center.x + offset.x,
                        y: newLayer.center.y + offset.y
                    };
                    newLayer.center = newCenter;
                }
                updatedLayers.push(newLayer);
                newLayers[id] = newLayer;

                // Update connected arrows
                if (layer.type !== LayerType.Arrow && layer.type !== LayerType.Line && layer.type !== LayerType.Path && selectedLayersRef.current.length === 1) {
                    if (layer.connectedArrows) {
                        layer.connectedArrows.forEach(arrowId => {
                            const arrowLayer = newLayers[arrowId] as ArrowLayer;
                            if (arrowLayer) {
                                const startConnectedLayerId = arrowLayer.startConnectedLayerId || "";
                                const endConnectedLayerId = arrowLayer.endConnectedLayerId || "";
                                const updatedArrow = updateArrowPosition(arrowLayer, id, newLayer, startConnectedLayerId, endConnectedLayerId, liveLayers);
                                updatedLayers.push(updatedArrow);
                                newLayers[arrowId] = updatedArrow;
                                updatedLayerIds.push(arrowId);                            
                            }
                        });
                    }
                }
            }
        });

        if (socket && expired !== true) {
            socket.emit('layer-update', updatedLayerIds, updatedLayers);
        }

        setLiveLayers(newLayers);
        setCanvasState({ mode: CanvasMode.Translating, current: point });
    }, [canvasState, setCanvasState, setLiveLayers, socket, liveLayers, expired]);

    const unselectLayers = useCallback(() => {
        if (selectedLayersRef.current.length > 0) {
            selectedLayersRef.current = ([]);
            const newPresence: Presence = {
                ...myPresence,
                selection: []
            };

            setMyPresence(newPresence);
        }
    }, [selectedLayersRef.current, setMyPresence, myPresence]);

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

        selectedLayersRef.current = ids;

        const newPresence: Presence = {
            ...myPresence,
            selection: ids,
            cursor: current,
        };

        setMyPresence(newPresence);
    }, [liveLayers, liveLayerIds, setMyPresence, myPresence]);

    const EraserDeleteLayers = useCallback((current: Point) => {
        const ids = findIntersectingLayersWithPoint(
            liveLayerIds,
            liveLayers,
            current,
            zoom
        );

        if (ids.length > 0) {
            setLiveLayers(prevLiveLayers => {
                let newLiveLayers;
                for (const id of ids) {
                    const isLayerDeleted = layersToDeleteEraserRef.current.has(id);
                    if (!isLayerDeleted) {
                        if (!newLiveLayers) {
                            newLiveLayers = { ...prevLiveLayers };
                        }
                        const layer = newLiveLayers[id];
                        newLiveLayers[id] = {
                            ...layer,
                            ...('fill' in layer && layer.fill ? { fill: { ...layer.fill, a: layer.fill.a / 4 } } : {}),
                            ...('outlineFill' in layer && layer.outlineFill ? { outlineFill: { ...layer.outlineFill, a: layer.outlineFill.a / 4 } } : {}),
                            ...('opacity' in layer && layer.opacity ? { opacity: layer.opacity / 4 } : {})
                        };
                        layersToDeleteEraserRef.current.add(id);
                    }
                }
                return newLiveLayers || prevLiveLayers;
            });
        }

    }, [liveLayerIds, liveLayers, setLiveLayers, zoom]);

    const startMultiSelection = useCallback((
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
    }, []);

    const startDrawing = useCallback((point: Point, pressure: number) => {
        const pencilDraft: [number, number, number][] = [[point.x, point.y, pressure]];
        setPencilDraft(pencilDraft);
        const newPresence: Presence = {
            ...myPresence,
            pencilDraft: pencilDraft
        };

        if (pencilDraft.length > 1) {
            setMyPresence(newPresence);
        }
    }, [myPresence, setMyPresence]);

    const continueDrawing = useCallback((point: Point, e: React.PointerEvent) => {
        if (
            (canvasState.mode !== CanvasMode.Pencil && canvasState.mode !== CanvasMode.Laser && canvasState.mode !== CanvasMode.Highlighter) ||
            pencilDraft.length === 0
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
            pencilDraft: pencilDraft.length === 1 &&
                pencilDraft[0][0] === point.x &&
                pencilDraft[0][1] === point.y
                ? pencilDraft
                : [...pencilDraft, [point.x, point.y, e.pressure]],
            pathStrokeSize: canvasState.mode === CanvasMode.Laser
                ? 5 / zoom
                : canvasState.mode === CanvasMode.Highlighter
                    ? 30 / zoom // Increase stroke size for highlighter
                    : pathStrokeSize,
            pathStrokeColor: canvasState.mode === CanvasMode.Laser
                ? { r: 243, g: 82, b: 35, a: 1 } // F35223 in RGB
                : canvasState.mode === CanvasMode.Highlighter
                    ? { ...pathColor, a: 0.7 } // Semi-transparent yellow
                    : pathColor,
        };

        setMyPresence(newPresence);

    }, [canvasState.mode, pencilDraft, myPresence, setMyPresence, pathColor, pathStrokeSize, zoom]);

    const insertPath = useCallback(() => {

        if (
            pencilDraft.length === 0 ||
            (pencilDraft[0] && pencilDraft[0].length < 2) ||
            activeTouches > 1
        ) {
            setPencilDraft([]);
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
            ...myPresence,
            pencilDraft: null,
        };

        setMyPresence(newPresence);

        setCanvasState({ mode: CanvasMode.Pencil });
    }, [pencilDraft, liveLayers, setLiveLayers, setLiveLayerIds, myPresence, org, proModal, liveLayerIds, socket, board, activeTouches]);

    // useEffect(() => {
    //     if (pencilDraft === null || magicPathAssist === false || pencilDraft.length === 0) {
    //         return;
    //     }

    //     const timeoutId = setTimeout(() => {

    //         if (pencilDraft[0] && pencilDraft[0].length < 2) {
    //             return;
    //         }

    //         const minX = Math.min(...pencilDraft.map(point => point[0]));
    //         const maxX = Math.max(...pencilDraft.map(point => point[0]));
    //         const minY = Math.min(...pencilDraft.map(point => point[1]));
    //         const maxY = Math.max(...pencilDraft.map(point => point[1]));
    //         const CircleTolerance = 0.30;
    //         const RectangleTolerance = 0.80;
    //         const LineTolerance = 20;
    //         const triangleTolerance = 0.80;

    //         const layerType = getShapeType(pencilDraft, CircleTolerance, RectangleTolerance, LineTolerance, triangleTolerance);

    //         if (layerType !== LayerType.Path) {

    //             let panX = minX;
    //             let panY = minY;
    //             let startX = minX
    //             let startY = minY;

    //             if (Math.abs(mousePositionRef.current.x - minX) < Math.abs(mousePositionRef.current.x - maxX)) {
    //               panX = maxX
    //             } else {
    //                 startX = maxX
    //             }

    //             if (Math.abs(mousePositionRef.current.y - minY) < Math.abs(mousePositionRef.current.y - maxY)) {
    //               panY = maxY
    //             } else {
    //                 startY = maxY
    //             }

    //             setPencilDraft([]);

    //             if (layerType === LayerType.Line) {

    //               const width =  panX - startX
    //               const height = panY - startY

    //               setCurrentPreviewLayer({
    //                 type: LayerType.Line,
    //                 x: startX,
    //                 y: startY,
    //                 center: { x: (minX + maxX) / 2, y: (minY + maxY) / 2 },
    //                 height,
    //                 width,
    //                 fill: { r: 0, g: 0, b: 0, a: 0 },
    //               });

    //               setStartPanPoint({ x: startX, y: startY });
    //             } else {

    //               const width = Math.abs(maxX - minX);
    //               const height = Math.abs(maxY - minY);

    //               setCurrentPreviewLayer({
    //                 x: Math.min(minX, maxX),
    //                 y: Math.min(minY, maxY),
    //                 width,
    //                 height,
    //                 textFontSize: 12,
    //                 type: layerType,
    //                 fill: { r: 0, g: 0, b: 0, a: 0 },
    //                 outlineFill: { r: 1, g: 1, b: 1, a: 1 },
    //               });
    //               setStartPanPoint({ x: panX, y: panY });
    //             }

    //             setCanvasState({ mode: CanvasMode.Inserting, layerType: layerType });
    //             setIsPanning(true);
    //             setLayerWithAssistDraw(true);
    //           }
    //     }, 1000);

    //     return () => clearTimeout(timeoutId);
    // }, [pencilDraft, setPencilDraft, zoom, magicPathAssist]);

    const insertHighlight = useCallback(() => {

        if (
            pencilDraft.length === 0 ||
            (pencilDraft[0] && pencilDraft[0].length < 2) ||
            activeTouches > 1
        ) {
            setPencilDraft([]);
            return;
        }

        const id = nanoid();
        liveLayers[id] = penPointsToPathLayer(pencilDraft, { ...pathColor, a: 0.7 }, 30 / zoom);

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
        performAction(command);

        const newPresence: Presence = {
            ...myPresence,
            pencilDraft: null,
        };

        setMyPresence(newPresence);
        setPencilDraft([]);
        setCanvasState({ mode: CanvasMode.Highlighter });
    }, [pencilDraft, liveLayers, setLiveLayers, setLiveLayerIds, myPresence, org, proModal, liveLayerIds, socket, board, zoom]);

    const resizeSelectedLayers = useCallback((point: Point) => {
        const initialBoundingBox = calculateBoundingBox(selectedLayersRef.current.map(id => liveLayers[id]));
        let bounds: any;
        let hasImageOrText = selectedLayersRef.current.some(id => liveLayers[id].type === LayerType.Image || liveLayers[id].type === LayerType.Text);
        let mantainAspectRatio = hasImageOrText
        let singleLayer = selectedLayersRef.current.length === 1

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
                            liveLayers[intersectingEndLayer] = layerWithUpdatedArrows;
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
                            liveLayers[intersectingStartLayer] = layerWithUpdatedArrows;
                        } else {
                            newLayer.startConnectedLayerId = undefined;
                        }
                        const end = { x: newLayer.x + newLayer.width, y: newLayer.y + newLayer.height };
                        intersectingEndLayers = findIntersectingLayerForConnection(liveLayerIds, liveLayers, end, zoom) || undefined;
                    }

                    const filteredStartLayers = intersectingStartLayers.filter(layer => !intersectingEndLayers.includes(layer));
                    const filteredEndLayers = intersectingEndLayers.filter(layer => !intersectingStartLayers.includes(layer));
                    
                    // Assigning the filtered results back
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
            liveLayers[id] = newLayer;

            if (socket && expired !== true) {
                socket.emit('layer-update', [id], [newLayer]);
            }

        })
        setLiveLayers({ ...liveLayers });

    }, [canvasState, liveLayers, liveLayerIds, selectedLayersRef, layerRef, zoom]);

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

    const onArrowResizeHandlePointerDown = useCallback((
        handle: ArrowHandle,
        initialBounds: XYWH,
    ) => {
        setCanvasState({
            mode: CanvasMode.ArrowResizeHandler,
            initialBounds,
            handle,
        });
    }, []);

    const onWheel = useCallback((e: React.WheelEvent) => {
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
        } else {
            // Panning
            const newCameraPosition = {
                x: camera.x - e.deltaX,
                y: camera.y - e.deltaY,
            };

            setCamera(newCameraPosition);
        }
    }, [zoom, camera]);

    const onPointerDown = useCallback((
        e: React.PointerEvent,
    ) => {

        const point = pointerEventToCanvasPoint(e, camera, zoom);
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

        if (e.button === 0 && expired !== true && !isPanning) {
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
                const point = pointerEventToCanvasPoint(e, camera, zoom);
                setStartPanPoint(point);
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
            if (socket && expired !== true) {
                socket.emit('layer-update', selectedLayersRef.current, liveLayers);
            }
        }
    }, [camera, canvasState.mode, setCanvasState, startDrawing, setIsPanning, setIsRightClickPanning, zoom, activeTouches, expired, isPanning, unselectLayers, liveLayers, myPresence]);

    const onPointerMove = useCallback((e: React.PointerEvent) => {
        e.preventDefault();

        if (activeTouches > 1) {
            setPencilDraft([]);
            return;
        }

        setIsMoving(false);
        if (rightClickPanning || e.buttons === 2 || e.buttons === 4) {
            const newCameraPosition = {
                x: camera.x + e.clientX - startPanPoint.x,
                y: camera.y + e.clientY - startPanPoint.y,
            };
            setCamera(newCameraPosition);
            setStartPanPoint({ x: e.clientX, y: e.clientY });

            if (!rightClickPanning) {
                setIsRightClickPanning(true);
            }
            return;
        }

        if (canvasState.mode === CanvasMode.Moving && isPanning) {
            const newCameraPosition = {
                x: camera.x + e.clientX - startPanPoint.x,
                y: camera.y + e.clientY - startPanPoint.y,
            };
            setCamera(newCameraPosition);
            setStartPanPoint({ x: e.clientX, y: e.clientY });
        }
        const current = pointerEventToCanvasPoint(e, camera, zoom);
        setMousePosition(current);

        const newPresence: Presence = {
            ...myPresence,
            cursor: { x: current.x, y: current.y },
        };

        setMyPresence(newPresence);

        if (socket && expired !== true) {
            socket.emit('presence', myPresence, User.userId);
        }

        if (canvasState.mode === CanvasMode.Pressing) {
            startMultiSelection(current, canvasState.origin);
        } else if (canvasState.mode === CanvasMode.SelectionNet) {
            updateSelectionNet(current, canvasState.origin);
        } else if (canvasState.mode === CanvasMode.Eraser && e.buttons === 1) {
            EraserDeleteLayers(current);
        } else if (canvasState.mode === CanvasMode.Translating) {
            setIsMoving(true);
            translateSelectedLayers(current);
        } else if (canvasState.mode === CanvasMode.Resizing) {
            resizeSelectedLayers(current);
            removeHighlightFromText();
        } else if (canvasState.mode === CanvasMode.ArrowResizeHandler) {
            resizeSelectedLayers(current);
        } else if (canvasState.mode === CanvasMode.Pencil && e.buttons === 1 || canvasState.mode === CanvasMode.Laser && e.buttons === 1 || canvasState.mode === CanvasMode.Highlighter && e.buttons === 1) {
            continueDrawing(current, e);
        } else if (
            e.buttons === 1 &&
            canvasState.mode === CanvasMode.Inserting &&
            startPanPoint &&
            canvasState.layerType !== LayerType.Path &&
            canvasState.layerType !== LayerType.Image &&
            (startPanPoint.x !== 0 || startPanPoint.y !== 0)
        ) {
            const point = pointerEventToCanvasPoint(e, camera, zoom);
            let widthArrow = point.x - startPanPoint.x;
            let heightArrow = point.y - startPanPoint.y;
            const x = Math.min(point.x, startPanPoint.x);
            const y = Math.min(point.y, startPanPoint.y);
            const width = Math.abs(point.x - startPanPoint.x);
            const height = Math.abs(point.y - startPanPoint.y);
            setIsPanning(true);

            switch (canvasState.layerType) {
                case LayerType.Rectangle:
                    setCurrentPreviewLayer({ x, y, width, height, textFontSize: 12, type: LayerType.Rectangle, fill: { r: 0, g: 0, b: 0, a: 0 }, outlineFill: { r: 1, g: 1, b: 1, a: 1 } });
                    break;
                case LayerType.Triangle:
                    setCurrentPreviewLayer({ x, y, width, height, textFontSize: 12, type: LayerType.Triangle, fill: { r: 0, g: 0, b: 0, a: 0 }, outlineFill: { r: 1, g: 1, b: 1, a: 1 } });
                    break;
                case LayerType.Star:
                    setCurrentPreviewLayer({ x, y, width, height, textFontSize: 12, type: LayerType.Star, fill: { r: 0, g: 0, b: 0, a: 0 }, outlineFill: { r: 1, g: 1, b: 1, a: 1 } });
                    break;
                case LayerType.Hexagon:
                    setCurrentPreviewLayer({ x, y, width, height, textFontSize: 12, type: LayerType.Hexagon, fill: { r: 0, g: 0, b: 0, a: 0 }, outlineFill: { r: 1, g: 1, b: 1, a: 1 } });
                    break;
                case LayerType.BigArrowLeft:
                    setCurrentPreviewLayer({ x, y, width, height, textFontSize: 12, type: LayerType.BigArrowLeft, fill: { r: 0, g: 0, b: 0, a: 0 }, outlineFill: { r: 1, g: 1, b: 1, a: 1 } });
                    break;
                case LayerType.BigArrowRight:
                    setCurrentPreviewLayer({ x, y, width, height, textFontSize: 12, type: LayerType.BigArrowRight, fill: { r: 0, g: 0, b: 0, a: 0 }, outlineFill: { r: 1, g: 1, b: 1, a: 1 } });
                    break;
                case LayerType.BigArrowUp:
                    setCurrentPreviewLayer({ x, y, width, height, textFontSize: 12, type: LayerType.BigArrowUp, fill: { r: 0, g: 0, b: 0, a: 0 }, outlineFill: { r: 1, g: 1, b: 1, a: 1 } });
                    break;
                case LayerType.BigArrowDown:
                    setCurrentPreviewLayer({ x, y, width, height, textFontSize: 12, type: LayerType.BigArrowDown, fill: { r: 0, g: 0, b: 0, a: 0 }, outlineFill: { r: 1, g: 1, b: 1, a: 1 } });
                    break;
                case LayerType.CommentBubble:
                    setCurrentPreviewLayer({ x, y, width, height, textFontSize: 12, type: LayerType.CommentBubble, fill: { r: 0, g: 0, b: 0, a: 0 }, outlineFill: { r: 1, g: 1, b: 1, a: 1 } });
                    break;
                case LayerType.Rhombus:
                    setCurrentPreviewLayer({ x, y, width, height, textFontSize: 12, type: LayerType.Rhombus, fill: { r: 0, g: 0, b: 0, a: 0 }, outlineFill: { r: 1, g: 1, b: 1, a: 1 } });
                    break;
                case LayerType.Ellipse:
                    setCurrentPreviewLayer({ x, y, width, height, type: LayerType.Ellipse, textFontSize: 12, fill: { r: 0, g: 0, b: 0, a: 0 }, outlineFill: { r: 1, g: 1, b: 1, a: 1 } });
                    break;
                case LayerType.Text:
                    setCurrentPreviewLayer({ x, y, width, height: 18, textFontSize: 12, type: LayerType.Rectangle, fill: { r: 0, g: 0, b: 0, a: 0 }, outlineFill: { r: 75, g: 161, b: 241, a: 1 } });
                    break;
                case LayerType.Note:
                    setCurrentPreviewLayer({ x, y, width, height, textFontSize: 12, type: LayerType.Note, fill: { r: 252, g: 225, b: 156, a: 1 }, outlineFill: { r: 0, g: 0, b: 0, a: 0 } });
                    break;
                case LayerType.Arrow:
                    let intersectingStartLayers: string[] = findIntersectingLayerForConnection(liveLayerIds, liveLayers, startPanPoint, zoom);
                    let intersectingEndLayers: string[]= findIntersectingLayerForConnection(liveLayerIds, liveLayers, point, zoom);

                    const filteredStartLayers = intersectingStartLayers.filter(layer => !intersectingEndLayers.includes(layer));
                    const filteredEndLayers = intersectingEndLayers.filter(layer => !intersectingStartLayers.includes(layer));
                    
                    // Assigning the filtered results back
                    const intersectingStartLayer = filteredStartLayers.pop();
                    const intersectingEndLayer = filteredEndLayers.pop();

                    let startConnectedLayerId: any = intersectingStartLayer;
                    let endConnectedLayerId: any = intersectingEndLayer;
                    let start = startPanPoint;
                    let end = point;

                    if (startConnectedLayerId !== endConnectedLayerId) {
                        if (intersectingStartLayer) {
                            const startConnectedLayer = liveLayers[startConnectedLayerId];
                            start = getClosestEndPoint(startConnectedLayer, point);
                        }
    
                        if (intersectingEndLayer) {
                            const endConnectedLayer = liveLayers[endConnectedLayerId];
                            end = getClosestPointOnBorder(endConnectedLayer, end, start, zoom);
                        }
                    } else {
                        startConnectedLayerId = "";
                        endConnectedLayerId = "";
                    }

                    let center = { x: (start.x + end.x) / 2, y: (start.y + end.y) / 2 };
                    widthArrow = end.x - start.x;
                    heightArrow = end.y - start.y;

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
                        startConnectedLayerId: startConnectedLayerId,
                        endConnectedLayerId: endConnectedLayerId,
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
        }
    },
        [continueDrawing,
            camera,
            canvasState,
            resizeSelectedLayers,
            translateSelectedLayers,
            startMultiSelection,
            updateSelectionNet,
            isPanning,
            rightClickPanning,
            setCamera,
            User.userId,
            zoom,
            myPresence,
            startPanPoint,
            socket,
            activeTouches,
            expired
        ]);

    const onPointerUp = useCallback((e: React.PointerEvent) => {
        setIsRightClickPanning(false);
        const point = pointerEventToCanvasPoint(e, camera, zoom);

        if (
            canvasState.mode === CanvasMode.None ||
            canvasState.mode === CanvasMode.Pressing
        ) {
            document.body.style.cursor = 'default';
            setCanvasState({
                mode: CanvasMode.None,
            });
        } else if (canvasState.mode === CanvasMode.Pencil) {
            document.body.style.cursor = 'url(/custom-cursors/pencil.svg) 2 18, auto';
            insertPath();
        } else if (canvasState.mode === CanvasMode.Highlighter) {
            document.body.style.cursor = 'url(/custom-cursors/highlighter.svg) 2 18, auto';
            insertHighlight();
        } else if (canvasState.mode === CanvasMode.Laser) {
            document.body.style.cursor = 'url(/custom-cursors/laser.svg) 4 18, auto';
            setPencilDraft([]);
            const newPresence: Presence = {
                ...myPresence,
                pencilDraft: null,
            };
            setMyPresence(newPresence);
            if (socket && expired !== true) {
                socket.emit('presence', newPresence, User.userId);
            }
        } else if (canvasState.mode === CanvasMode.Eraser) {
            document.body.style.cursor = 'url(/custom-cursors/eraser.svg) 8 8, auto';
            if (layersToDeleteEraserRef.current.size > 0) {
                const command = new DeleteLayerCommand(Array.from(layersToDeleteEraserRef.current), initialLayers, liveLayerIds, setLiveLayers, setLiveLayerIds, boardId, socket);
                performAction(command);
                layersToDeleteEraserRef.current.clear();
                return;
            }
            return;
        } else if (canvasState.mode === CanvasMode.Inserting && canvasState.layerType === LayerType.Image) {
            setSelectedImage(null);
            insertImage(LayerType.Image, point, selectedImage);
        } else if (canvasState.mode === CanvasMode.Inserting && canvasState.layerType !== LayerType.Image) {

            if (e.button === 2 || e.button === 1) {
                document.body.style.cursor = 'url(/custom-cursors/inserting.svg) 10 10, auto';
                return;
            }

            const layerType = canvasState.layerType;
            setIsPanning(false);
            if (isPanning && currentPreviewLayer) {
                if (layerType === LayerType.Arrow && currentPreviewLayer.type === LayerType.Arrow
                    || layerType === LayerType.Line && currentPreviewLayer.type === LayerType.Line
                ) {
                    insertLayer(layerType, { x: currentPreviewLayer.x, y: currentPreviewLayer.y }, currentPreviewLayer.width, currentPreviewLayer.height, currentPreviewLayer.center, currentPreviewLayer.startConnectedLayerId, currentPreviewLayer.endConnectedLayerId)
                    setCurrentPreviewLayer(null);
                } else {
                    insertLayer(layerType, { x: currentPreviewLayer.x, y: currentPreviewLayer.y }, currentPreviewLayer.width, currentPreviewLayer.height);
                    setCurrentPreviewLayer(null);
                }
            } else if (layerType !== LayerType.Arrow && layerType !== LayerType.Line) {
                let width
                let height
                if (layerType === LayerType.Text) {
                    width = 95;
                    height = 18;
                    point.x = point.x - width / 2
                    point.y = point.y - height / 2
                    insertLayer(layerType, point, width, height)
                } else {
                    width = 80;
                    height = 80;
                    point.x = point.x - width / 2
                    point.y = point.y - height / 2
                    insertLayer(layerType, point, width, height);
                }
            }
        } else if (canvasState.mode === CanvasMode.Moving) {
            document.body.style.cursor = 'url(/custom-cursors/hand.svg) 8 8, auto';
            setIsPanning(false);
        } else if (canvasState.mode === CanvasMode.Translating) {
            const initialLayer = JSON.stringify(initialLayers[selectedLayersRef.current[0]]);
            const liveLayer = JSON.stringify(liveLayers[selectedLayersRef.current[0]]);
            const changed = initialLayer !== liveLayer;

            setCanvasState({
                mode: CanvasMode.None,
            });

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
                const command = new TranslateLayersCommand(selectedLayersRef.current, initialLayers, liveLayers, setLiveLayers, boardId, socket);
                performAction(command);
            }

            setCanvasState({
                mode: CanvasMode.None,
            });
        } else if (canvasState.mode === CanvasMode.Resizing || canvasState.mode === CanvasMode.ArrowResizeHandler) {
            const initialLayer = JSON.stringify(initialLayers[selectedLayersRef.current[0]]);
            const liveLayer = JSON.stringify(liveLayers[selectedLayersRef.current[0]]);
            const changed = initialLayer !== liveLayer;
            setJustChanged(changed);

            if (selectedLayersRef.current.length > 0 && changed === true) {
                const command = new TranslateLayersCommand(selectedLayersRef.current, initialLayers, liveLayers, setLiveLayers, boardId, socket);
                performAction(command);
            }
            setCanvasState({
                mode: CanvasMode.None,
            });
        } else {
            document.body.style.cursor = 'default';
            setCanvasState({
                mode: CanvasMode.None,
            });
        }

        if (selectedLayersRef.current.length === 0) {
            const newPresence: Presence = {
                ...myPresence,
                selection: [],
                pencilDraft: null,
            };
            if (socket && expired !== true) {
                socket.emit('presence', newPresence, User.userId);
            }
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
            selectedLayersRef,
            liveLayers,
            board,
            camera,
            zoom,
            currentPreviewLayer,
            isPanning,
            initialLayers,
            history,
            layerRef,
            layersToDeleteEraserRef.current,
            socket,
            myPresence
        ]);

    const onPointerLeave = useCallback(() => {
        const newPresence: Presence = {
            ...myPresence,
            cursor: null,
            pencilDraft: null
        };

        setPencilDraft([]);
        setMyPresence(newPresence);

        if (socket && expired !== true) {
            socket.emit('presence', newPresence, User.userId);
        }
    }, [setMyPresence, myPresence, socket, User.userId]);

    const onLayerPointerDown = useCallback((e: React.PointerEvent, layerId: string) => {

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
        const point = pointerEventToCanvasPoint(e, cameraRef.current, zoomRef.current);
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
            socket.emit('presence', newPresence, User.userId);
        }

    }, [selectedLayersRef]);

    const layerIdsToColorSelection = useMemo(() => {
        const layerIdsToColorSelection: Record<string, string> = {};

        if (otherUsers) {
            for (const user of otherUsers) {
                const connectionId = user.connectionId;
                const selection = user.presence?.selection || [];

                for (const layerId of selection) {
                    layerIdsToColorSelection[layerId] = connectionIdToColor(connectionId)
                }
            }
        }

        return layerIdsToColorSelection;
    }, [otherUsers]);

    const onDragOver = useCallback((event: React.DragEvent) => {
        event.preventDefault();
        setIsDraggingOverCanvas(true);

    }, [setIsDraggingOverCanvas]);

    const onDragLeave = useCallback((event: React.DragEvent) => {
        event.preventDefault();
        setIsDraggingOverCanvas(false);

    }, [setIsDraggingOverCanvas]);

    const onDrop = useCallback((event: React.DragEvent) => {
        event.preventDefault();
        setIsDraggingOverCanvas(false);
        let x = (Math.round(event.clientX) - camera.x) / zoom;
        let y = (Math.round(event.clientY) - camera.y) / zoom;
        const files = event.dataTransfer.files;
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            if (!file.type.startsWith('image/')) {
                toast.error('File type not accepted. Please upload an image file.');
                continue;  // Skip if not an image
            }

            // Check file size
            const fileSizeInMB = file.size / 1024 / 1024;
            if (fileSizeInMB > maxFileSize) {
                toast.error(`File size has to be lower than ${maxFileSize}MB. Please try again.`);
                return;
            }

            const toastId = toast.loading("Image is being processed, please wait...");
            const formData = new FormData();
            formData.append('file', file);
            formData.append('userId', User.userId);

            fetch('/api/aws-s3-images', {
                method: 'POST',
                body: formData
            })
                .then(async (res: Response) => {
                    if (!res.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const url = await res.text();

                    const img = new Image();
                    const imgLoad = new Promise<{ url: string, dimensions: { width: number, height: number } }>((resolve) => {
                        img.onload = () => {
                            const dimensions = { width: img.width, height: img.height };
                            resolve({ url, dimensions });
                        };
                    });
                    img.src = url;
                    const info = await imgLoad;

                    // Insert the image into the canvas
                    insertImage(LayerType.Image, { x: x, y: y }, info);
                })
                .catch(error => {
                    console.error('Error:', error);
                })
                .finally(() => {
                    toast.dismiss(toastId);
                    toast.success("Image uploaded successfully, you can now add it to the board.")
                });
        }
    }, [setIsDraggingOverCanvas, camera, zoom, maxFileSize, User.userId, insertImage]);

    const onTouchDown = useCallback((e: React.TouchEvent) => {
        setIsMoving(false);
        setActiveTouches(e.touches.length);

        if (e.touches.length > 1) {
            selectedLayersRef.current = [];
        }

    }, []);

    const onTouchUp = useCallback((e: React.TouchEvent) => {
        setIsMoving(false);
        setActiveTouches(e.changedTouches.length);
    }, []);

    const onTouchMove = useCallback((e: React.TouchEvent) => {
        if (canvasState.mode === CanvasMode.Translating) {
            setIsMoving(true);
        }
        setActiveTouches(e.touches.length);

        if (e.touches.length < 2) {
            setPinchStartDist(null);
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
            setStartPanPoint({ x, y });
            return;
        }

        const isZooming = Math.abs(dist - pinchStartDist) > 10;

        if (isZooming) { // Zooming
            let newZoom = zoom;
            if (dist > pinchStartDist) {
                newZoom = Math.min(zoom * 1.1, 10);
            } else {
                newZoom = Math.max(zoom / 1.1, 0.3);
            }

            const zoomFactor = newZoom / zoom;
            const newX = x - (x - camera.x) * zoomFactor;
            const newY = y - (y - camera.y) * zoomFactor;

            setZoom(newZoom);
            setCamera({ x: newX, y: newY });
        } else if (startPanPoint) { // Panning
            const dx = x - startPanPoint.x;
            const dy = y - startPanPoint.y;

            const newCameraPosition = {
                x: camera.x + dx,
                y: camera.y + dy,
            };

            setCamera(newCameraPosition);
        }

        setPinchStartDist(dist);
        setStartPanPoint({ x, y });
    }, [zoom, pinchStartDist, camera, startPanPoint, canvasState]);

    const copySelectedLayers = useCallback(() => {
        setCopiedLayerIds(selectedLayersRef.current);
    }, [liveLayers, selectedLayersRef]);

    const pasteCopiedLayers = useCallback((mousePosition: any) => {
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

    }, [copiedLayerIds, copiedLayerIds, myPresence, setLiveLayers, setLiveLayerIds, setMyPresence, org, proModal, socket, boardId, performAction]);

    useEffect(() => {
        const onPointerDown = (e: PointerEvent) => {
            const deepCopy = JSON.parse(JSON.stringify(liveLayers));
            setInitialLayers(deepCopy);
            if (e.buttons === 2 || e.buttons === 4) {
                setStartPanPoint({ x: e.clientX, y: e.clientY });
            }
        }

        document.addEventListener('pointerdown', onPointerDown);

        return () => {
            document.removeEventListener('pointerdown', onPointerDown);
        }
    }, [liveLayers]);

    useEffect(() => {
        function onKeyDown(e: KeyboardEvent) {

            if (!e.key) {
                return;
            }

            switch (e.key.toLocaleLowerCase()) {
                case "z": {
                    if (e.ctrlKey || e.metaKey) {

                        if (
                            document.activeElement &&
                            document.activeElement.getAttribute('contentEditable') !== 'true' &&
                            document.activeElement.tagName !== 'TEXTAREA' &&
                            document.activeElement.tagName !== 'INPUT'
                        ) {
                            // if we are not inside a content editable or textarea
                            if (e.shiftKey && redoStack.length > 0) {
                                redo();
                                return;
                            } else if (!e.shiftKey && history.length > 0) {
                                undo();
                                return;
                            }
                            e.preventDefault();
                        }
                    }
                    break;
                }
                case "c": {
                    if (e.ctrlKey || e.metaKey) {
                        copySelectedLayers();
                    }
                    break;
                }
                case "v": {
                    if (
                        document.activeElement instanceof HTMLTextAreaElement ||
                        document.activeElement instanceof HTMLInputElement ||
                        (document.activeElement instanceof HTMLElement && document.activeElement.contentEditable === "true")
                    ) {
                        break;
                    }
                    if (e.ctrlKey || e.metaKey) {
                        if (copiedLayerIds.length > 0) {
                            e.preventDefault();
                            pasteCopiedLayers(mousePosition);
                        }
                    }
                    break;
                }
                case "a": {
                    if (e.ctrlKey || e.metaKey) {

                        if (
                            document.activeElement &&
                            document.activeElement.getAttribute('contentEditable') !== 'true' &&
                            document.activeElement.tagName !== 'TEXTAREA' &&
                            document.activeElement.tagName !== 'INPUT'
                        ) {
                            // if we are not inside a content editable or textarea
                            selectedLayersRef.current = liveLayerIds;
                        }
                    }
                    break;
                }
                case "backspace":
                    if (
                        document.activeElement instanceof HTMLTextAreaElement ||
                        document.activeElement instanceof HTMLInputElement ||
                        (document.activeElement instanceof HTMLElement && document.activeElement.contentEditable === "true")
                    ) {
                        break;
                    }
                    if (selectedLayersRef.current.length > 0) {
                        const command = new DeleteLayerCommand(selectedLayersRef.current, liveLayers, liveLayerIds, setLiveLayers, setLiveLayerIds, boardId, socket);
                        performAction(command);
                        unselectLayers();
                    }
            }
        }

        document.addEventListener("keydown", onKeyDown);

        return () => {
            document.removeEventListener("keydown", onKeyDown);
        }
    }, [copySelectedLayers, pasteCopiedLayers, camera, zoom, liveLayers, selectedLayersRef.current, copiedLayerIds, liveLayerIds]);


    useEffect(() => { // for on layer pointer down to update refts
        canvasStateRef.current = canvasState;
        zoomRef.current = zoom;
        cameraRef.current = camera;
    }, [canvasState, zoom, camera]);

    useEffect(() => {
        // prevent safari from going back/forward

        const preventDefault = (e: any) => {
            if (e.scale !== 1) {
                e.preventDefault();
            }
        };

        window.addEventListener('wheel', preventDefault, { passive: false });
        if (typeof document !== 'undefined') {
            const handleContextMenu = (e: MouseEvent) => {
                e.preventDefault();
            };

            document.addEventListener('contextmenu', handleContextMenu);

            return () => {
                document.removeEventListener('contextmenu', handleContextMenu);
            };
        }

        return () => {
            document.removeEventListener('gesturestart', preventDefault);
            document.removeEventListener('gesturechange', preventDefault);
            document.removeEventListener('gestureend', preventDefault);
            window.removeEventListener('wheel', preventDefault);
            window.removeEventListener('wheel', preventDefault);
        };
    }, []);

    useEffect(() => {
        // control the cursor
        if (rightClickPanning) {
            document.body.style.cursor = 'url(/custom-cursors/grab.svg) 12 12, auto';
            return;
        }

        if (canvasState.mode === CanvasMode.Inserting) {
            selectedLayersRef.current = [];
            if (canvasState.layerType === LayerType.Text) {
                document.body.style.cursor = 'url(/custom-cursors/text-cursor.svg) 8 0, auto';
            } else {
                document.body.style.cursor = 'url(/custom-cursors/inserting.svg) 10 10, auto';
            }
        } else if (canvasState.mode === CanvasMode.Pencil) {
            document.body.style.cursor = 'url(/custom-cursors/pencil.svg) 2 18, auto';
            selectedLayersRef.current = [];
        } else if (canvasState.mode === CanvasMode.Highlighter) {
            document.body.style.cursor = 'url(/custom-cursors/highlighter.svg) 2 18, auto';
            selectedLayersRef.current = [];
        } else if (canvasState.mode === CanvasMode.Laser) {
            document.body.style.cursor = 'url(/custom-cursors/laser.svg) 4 18, auto';
            selectedLayersRef.current = [];
        } else if (canvasState.mode === CanvasMode.Eraser) {
            document.body.style.cursor = 'url(/custom-cursors/eraser.svg) 8 8, auto';
            selectedLayersRef.current = [];
        } else if (canvasState.mode === CanvasMode.Moving) {
            document.body.style.cursor = 'url(/custom-cursors/hand.svg) 8 8, auto';
        } else if (canvasState.mode === CanvasMode.ArrowResizeHandler) {
            document.body.style.cursor = 'url(/custom-cursors/grab.svg) 12 12, auto';
        } else {
            document.body.style.cursor = 'default';
        }
    }, [canvasState.mode, canvasState, rightClickPanning]);

    return (
        <main
            className={`fixed h-full w-full touch-none overscroll-none ${isDraggingOverCanvas && 'bg-neutral-300 border-2 border-dashed border-custom-blue'}`}
            style={{
                backgroundImage: (background === 'grid') ? `
            linear-gradient(0deg, rgba(0,0,0,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)
          ` : (background === 'line') ? `
            linear-gradient(0deg, rgba(0,0,0,0.05) 1px, transparent 1px)
          ` : 'none',
                backgroundColor: '#F9FAFB',
                backgroundSize: (background === 'grid' || background === 'line') ? `${65 * zoom}px ${65 * zoom}px` : undefined,
                backgroundPosition: (background === 'grid' || background === 'line') ? `${camera.x}px ${camera.y}px` : undefined,
                WebkitOverflowScrolling: 'touch',
                WebkitUserSelect: 'none',
            }}
        >
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
            <Info
                board={board}
                org={org}
                setBackground={setBackground}
                Background={background}
                setLiveLayerIds={setLiveLayerIds}
                setLiveLayers={setLiveLayers}
                performAction={performAction}
                socket={socket}
                setCanvasState={setCanvasState}
                nanoid={nanoid}
                zoom={zoom}
                camera={camera}
                selectedLayersRef={selectedLayersRef}
                setIsShowingAIInput={setIsShowingAIInput}
                isShowingAIInput={isShowingAIInput}
            />
            <Participants
                org={org}
                otherUsers={otherUsers}
                User={User}
            />
            {expired !== true && (
                <Toolbar
                    pathColor={pathColor}
                    pathStrokeSize={pathStrokeSize}
                    setPathColor={setPathColor}
                    setPathStrokeSize={setPathStrokeSize}
                    isUploading={isUploading}
                    setIsUploading={setIsUploading}
                    setSelectedImage={setSelectedImage}
                    canvasState={canvasState}
                    setCanvasState={setCanvasState}
                    org={org}
                    undo={undo}
                    redo={redo}
                    canUndo={history.length > 0}
                    canRedo={redoStack.length > 0}
                    isPenMenuOpen={isPenMenuOpen}
                    setIsPenMenuOpen={setIsPenMenuOpen}
                    isShapesMenuOpen={isShapesMenuOpen}
                    setIsShapesMenuOpen={setIsShapesMenuOpen}
                    isPenEraserSwitcherOpen={isPenEraserSwitcherOpen}
                    setIsPenEraserSwitcherOpen={setIsPenEraserSwitcherOpen}
                    selectedTool={selectedTool}
                    setSelectedTool={setSelectedTool}
                    setMagicPathAssist={setMagicPathAssist}
                    magicPathAssist={magicPathAssist}
                    isPlacingLayer={currentPreviewLayer !== null}
                />
            )}
            {!isMoving && canvasState.mode !== CanvasMode.Resizing && canvasState.mode !== CanvasMode.ArrowResizeHandler && canvasState.mode !== CanvasMode.SelectionNet && activeTouches < 2 && (
                <SelectionTools
                    board={board}
                    boardId={boardId}
                    setLiveLayerIds={setLiveLayerIds}
                    setLiveLayers={setLiveLayers}
                    liveLayerIds={liveLayerIds}
                    liveLayers={liveLayers}
                    selectedLayersRef={selectedLayersRef}
                    zoom={zoom}
                    camera={camera}
                    socket={socket}
                    performAction={performAction}
                    org={org}
                    proModal={proModal}
                    myPresence={myPresence}
                    setMyPresence={setMyPresence}
                    canvasState={canvasState.mode}
                />
            )}
            <ZoomToolbar zoom={zoom} setZoom={setZoom} setCamera={setCamera} camera={camera} />
            {/* {isShowingAIInput && (
                <SketchlieAiInput 
                    setLiveLayers={setLiveLayers}
                    setLiveLayerIds={setLiveLayerIds}
                    boardId={boardId}
                    socket={socket}
                    org={org}
                    proModal={proModal}
                    performAction={performAction}
                />
            )} */}
            <div id="canvas">
                <svg
                    className="h-[100vh] w-[100vw]"
                    onWheel={onWheel}
                    onDragOver={onDragOver}
                    onDrop={onDrop}
                    onDragLeave={onDragLeave}
                    onTouchStart={onTouchDown}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchUp}
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
                        {liveLayerIds.map((layerId: any) => {
                            const isFocused = selectedLayersRef.current.length === 1 && selectedLayersRef.current[0] === layerId && !justChanged;
                            return (
                                <LayerPreview
                                    selectionColor={layerIdsToColorSelection[layerId]}
                                    onLayerPointerDown={onLayerPointerDown}
                                    focused={isFocused}
                                    layer={liveLayers[layerId]}
                                    setLiveLayers={setLiveLayers}
                                    key={layerId}
                                    id={layerId}
                                    onRefChange={setLayerRef}
                                    socket={socket}
                                    expired={expired}
                                    boardId={boardId}
                                />
                            );
                        })}
                        {currentPreviewLayer && (
                            <CurrentPreviewLayer
                                layer={currentPreviewLayer}
                            />
                        )}
                        {!isMoving && activeTouches < 2 && canvasState.mode !== CanvasMode.ArrowResizeHandler && (
                            <SelectionBox
                                zoom={zoom}
                                liveLayers={liveLayers}
                                selectedLayers={selectedLayersRef.current}
                                onResizeHandlePointerDown={onResizeHandlePointerDown}
                                onArrowResizeHandlePointerDown={onArrowResizeHandlePointerDown}
                                setLiveLayers={setLiveLayers}
                            />
                        )}
                        {((canvasState.mode === CanvasMode.ArrowResizeHandler && selectedLayersRef.current.length === 1) || (currentPreviewLayer?.type === LayerType.Arrow)) && (
                            <ArrowConnectionOutlinePreview 
                                zoom={zoom}
                                selectedArrow={currentPreviewLayer || liveLayers[selectedLayersRef.current[0]]}
                                liveLayers={liveLayers}
                                mousePosition={mousePosition}
                                handle={canvasState.mode === CanvasMode.ArrowResizeHandler ? canvasState.handle : ArrowHandle.end}
                            />
                        )}
                        {canvasState.mode === CanvasMode.SelectionNet && canvasState.current != null && activeTouches < 2 && (
                            <rect
                                style={{
                                    fill: 'rgba(59, 130, 246, 0.3)',
                                    stroke: '#3B82F6',
                                    strokeWidth: 1 / zoom
                                }}
                                x={Math.min(canvasState.origin.x, canvasState.current.x)}
                                y={Math.min(canvasState.origin.y, canvasState.current.y)}
                                width={Math.abs(canvasState.origin.x - canvasState.current.x)}
                                height={Math.abs(canvasState.origin.y - canvasState.current.y)}
                            />
                        )}
                        {otherUsers && <CursorsPresence otherUsers={otherUsers} zoom={zoom} />}
                        {
                            pencilDraft && !pencilDraft.some(array => array.some(isNaN)) && (
                                <Path
                                    points={pencilDraft}
                                    fill={
                                        canvasState.mode === CanvasMode.Laser
                                            ? '#F35223'
                                            : canvasState.mode === CanvasMode.Highlighter
                                                ? colorToCss({ ...pathColor, a: 0.7 }) // Semi-transparent yellow
                                                : colorToCss(pathColor)
                                    }
                                    x={0}
                                    y={0}
                                    strokeSize={
                                        canvasState.mode === CanvasMode.Laser
                                            ? 5 / zoom
                                            : canvasState.mode === CanvasMode.Highlighter
                                                ? 30 / zoom // Increase stroke size for highlighter
                                                : pathStrokeSize
                                    }
                                />
                            )
                        }
                    </g>
                </svg>
            </div>
        </main>
    );
};