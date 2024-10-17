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
    checkIfTextarea,
    findIntersectingLayersWithPath,
    isLayerVisible,
    applyStraightnessAssist,
    SketchlieCopilot,
} from "@/lib/utils";

import {
    ArrowHandle,
    ArrowHead,
    ArrowLayer,
    ArrowOrientation,
    ArrowType,
    Camera,
    CanvasMode,
    CanvasState,
    FrameLayer,
    Layer,
    Layers,
    LayerType,
    Point,
    Presence,
    PreviewLayer,
    Side,
    SvgLayer,
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
import { CurrentPreviewLayer } from "./current-preview-layer";
import { useRoom } from "@/components/room";
import { toast } from "sonner";
import { ZoomToolbar } from "./zoom-toolbar";
import { Command, DeleteLayerCommand, InsertLayerCommand, TranslateLayersCommand } from "@/lib/commands";
import { SketchlieAiInput } from "./sketchlie-ai-input";
import { ArrowConnectionOutlinePreview } from "./arrow-connection-outline-preview";
import { setCursorWithFill } from "@/lib/theme-utils";
import { ArrowPostInsertMenu } from "./arrow-post-insert-menu";
import { EraserTrail } from "./eraser-trail";
import { CurrentSuggestedLayer } from "./current-suggested-layer";
import { smoothLastPoint } from "@/lib/smooth-points";
import { Background } from "./background";
import { MediaPreview } from "./MediaPreview";
import { MoveBackToContent } from "./move-back-to-content";
import { Frame } from "../canvas-objects/frame";
import { uploadFilesAndInsertThemIntoCanvas } from "./canvasUtils";
import { DragIndicatorOverlay } from "./drag-indicator-overlay";

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
    // Room and user-related states
    const { liveLayers, liveLayerIds, User, otherUsers, setLiveLayers, setLiveLayerIds, org, socket, board, expired } = useRoom();
    const [myPresence, setMyPresence] = useState<Presence | null>(null);
    const proModal = useProModal();

    // Canvas state and controls
    const [canvasState, setCanvasState] = useState<CanvasState>({ mode: CanvasMode.None });
    const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [isPanning, setIsPanning] = useState(false);
    const [rightClickPanning, setIsRightClickPanning] = useState(false);
    const [startPanPoint, setStartPanPoint] = useState({ x: 0, y: 0 });
    const [isNearBorder, setIsNearBorder] = useState(false);
    const [borderMove, setBorderMove] = useState({ x: 0, y: 0 });
    const [presentationMode, setPresentationMode] = useState(false);
    const [background, setBackground] = useState(() => localStorage.getItem('background') || 'circular-grid');

    // Layer management
    const [initialLayers, setInitialLayers] = useState<Layers>({});
    const [visibleLayers, setVisibleLayers] = useState<string[]>([]);
    const selectedLayersRef = useRef<string[]>([]);
    const [copiedLayerIds, setCopiedLayerIds] = useState<string[]>([]);
    const [currentPreviewLayer, setCurrentPreviewLayer] = useState<PreviewLayer | null>(null);
    const [suggestedLayers, setSuggestedLayers] = useState<Layers>({});
    const [suggestedLayerIds, setSuggestedLayerIds] = useState<string[]>([]);

    // Drawing and editing tools
    const [pencilDraft, setPencilDraft] = useState<[number, number, number][]>([]);
    const [erasePath, setErasePath] = useState<[number, number][]>([]);
    const [pathColor, setPathColor] = useState({ r: 29, g: 29, b: 29, a: 1 });
    const [pathStrokeSize, setPathStrokeSize] = useState(5);
    const [arrowTypeInserting, setArrowTypeInserting] = useState<ArrowType>(ArrowType.Straight);

    // UI states
    const [isShowingAIInput, setIsShowingAIInput] = useState(false);
    const [isMoving, setIsMoving] = useState(false);
    const [justChanged, setJustChanged] = useState(false);
    const [isArrowsMenuOpen, setIsArrowsMenuOpen] = useState(false);
    const [isPenMenuOpen, setIsPenMenuOpen] = useState(false);
    const [isShapesMenuOpen, setIsShapesMenuOpen] = useState(false);
    const [isPenEraserSwitcherOpen, setIsPenEraserSwitcherOpen] = useState(false);
    const [isDraggingOverCanvas, setIsDraggingOverCanvas] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [justInsertedText, setJustInsertedText] = useState(false);
    const [IsArrowPostInsertMenuOpen, setIsArrowPostInsertMenuOpen] = useState(false);
    const [focusMode, setFocusMode] = useState(false);

    // Undo/Redo
    const [history, setHistory] = useState<Command[]>([]);
    const [redoStack, setRedoStack] = useState<Command[]>([]);

    // Touch and mobile-related states
    const [pinchStartDist, setPinchStartDist] = useState<number | null>(null);
    const [activeTouches, setActiveTouches] = useState(0);

    // Misc
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [layerRef, setLayerRef] = useState<any>(null);
    const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
    const [forceSelectionBoxRender, setForceSelectionBoxRender] = useState(false);
    const [forceLayerPreviewRender, setForceLayerPreviewRender] = useState(false);

    // Preferences
    const [quickInserting, setQuickInserting] = useState(false);
    const [eraserDeleteAnyLayer, setEraserDeleteAnyLayer] = useState(false);

    // Refs
    const zoomRef = useRef(zoom);
    const cameraRef = useRef(camera);
    const canvasStateRef = useRef(canvasState);
    const svgRef = useRef(null);
    const layersToDeleteEraserRef = useRef<Set<string>>(new Set());

    // Computed values
    const frameIds = useMemo(() => {
        if (!liveLayerIds || !liveLayers) return [];
        return liveLayerIds.filter(id => {
            const layer = liveLayers[id];
            return layer && layer.type === LayerType.Frame;
        });
    }, [liveLayerIds, liveLayers]);

    useDisableScrollBounce();

    // const throttledSketchlieCopilot = throttle(
    //     (liveLayers, visibleLayers, title) => SketchlieCopilot(liveLayers, visibleLayers, title),
    //     1000
    // );

    const performAction = useCallback(async (command: Command) => {
        command.execute(liveLayerIds, liveLayers);
        setHistory([...history, command]);
        setRedoStack([]); // clear redo stack when new action is performed

        // const data = await throttledSketchlieCopilot(liveLayers, visibleLayers, board.title);
        // console.log(data);

        // if (data) {
        //     const layerId = data.layerId[0];
        //     const layer = data.layer;
        //     console.log(layer);
        //     setSuggestedLayers({ ...layer });
        //     setSuggestedLayerIds([layerId]);
        // }
    }, [liveLayerIds, liveLayers, history]);

    const undo = useCallback(() => {
        const lastCommand = history[history.length - 1];
        lastCommand.undo(liveLayerIds, liveLayers);
        setHistory(history.slice(0, -1));
        setRedoStack([...redoStack, lastCommand]);
    }, [history, liveLayerIds, liveLayers, redoStack]);

    const redo = useCallback(() => {
        const lastCommand = redoStack[redoStack.length - 1];
        lastCommand.execute(liveLayerIds, liveLayers);
        setRedoStack(redoStack.slice(0, -1));
        setHistory([...history, lastCommand]);
    }, [redoStack, liveLayerIds, liveLayers, history]);

    const insertLayer = useCallback((layerType: LayerType, position: Point, width: number, height: number, center?: Point, startConnectedLayerId?: string, endConnectedLayerId?: string, arrowType?: ArrowType, orientation?: ArrowOrientation) => {

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
                textFontSize: width * ratio,
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
                textFontSize: width * ratio,
                alignX: 'center',
                alignY: 'center',
            };
        }

        const command = new InsertLayerCommand([layerId], [layer], setLiveLayers, setLiveLayerIds, boardId, socket, org, proModal);
        performAction(command);

        if (layer.type !== LayerType.Text) {
            selectedLayersRef.current = [layerId];
        }

        if (layerType === LayerType.Frame) {
            setLiveLayerIds(prevIds => {
                const existingFrames = prevIds.filter(id => liveLayers[id] && liveLayers[id].type === LayerType.Frame);
                const nonFrames = prevIds.filter(id => liveLayers[id] && liveLayers[id].type !== LayerType.Frame);

                if (existingFrames.length > 0) {
                    // If there are existing frames, place the new frame as the last frame
                    return [...existingFrames, layerId, ...nonFrames];
                } else {
                    // If there are no existing frames, place the new frame as the first element
                    return [layerId, ...nonFrames];
                }
            });
        }

        // return the user to the default mode
        if (!quickInserting) {
            setCanvasState({ mode: CanvasMode.None });
        }

    }, [socket, org, proModal, setLiveLayers, setLiveLayerIds, boardId, arrowTypeInserting, liveLayers, performAction, expired, quickInserting]);

    useEffect(() => {
        if (justInsertedText && layerRef && layerRef.current) {
            layerRef.current?.focus();
        }
    }, [justInsertedText, layerRef]);

    const insertMedia = useCallback((
        mediaItems: Array<{
            layerType: LayerType.Image | LayerType.Video | LayerType.Link | LayerType.Svg,
            position: Point,
            info: any,
            zoom: number
        }>
    ) => {
        if (expired) {
            setCanvasState({ mode: CanvasMode.None });
            return;
        }

        const newLayers: Layer[] = [];
        const newLayerIds: string[] = [];

        mediaItems.forEach(({ layerType, position, info }) => {
            const layerId = nanoid();
            newLayerIds.push(layerId);

            if (!info || !info.url) {
                return;
            }

            let layer: any = {
                type: layerType,
                x: position.x,
                y: position.y,
                height: info.dimensions.height,
                width: info.dimensions.width,
                src: info.url,
            };

              // Add fill color for SVG layers
            if (layerType === LayerType.Svg) {
                (layer as SvgLayer).fill = { r: 29, g: 29, b: 29, a: 1 }; // Default to black
            }

            newLayers.push(layer);

        });

        if (newLayers.length > 0) {
            const command = new InsertLayerCommand(newLayerIds, newLayers, setLiveLayers, setLiveLayerIds, boardId, socket, org, proModal);
            performAction(command);
            selectedLayersRef.current = newLayerIds;
        }

        setCanvasState({ mode: CanvasMode.None });

    }, [socket, org, proModal, setLiveLayers, setLiveLayerIds, boardId, performAction, expired]);

    const translateSelectedLayers = useCallback((point: Point) => {

        if (expired) {
            selectedLayersRef.current = [];
            const newPresence: Presence = {
                ...myPresence,
                selection: []
            };
            setMyPresence(newPresence);
            return;
        }

        if (canvasState.mode !== CanvasMode.Translating || activeTouches > 1) {
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
                if (layer.type !== LayerType.Arrow && layer.type !== LayerType.Line && selectedLayersRef.current.length === 1) {
                    if (layer.connectedArrows) {
                        layer.connectedArrows.forEach(arrowId => {
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
    }, [canvasState, setCanvasState, setLiveLayers, socket, liveLayers, expired, zoom, setMyPresence, myPresence, activeTouches]);

    const translateSelectedLayersWithDelta = useCallback((delta: Point) => {
        if (expired) {
            selectedLayersRef.current = [];
            const newPresence: Presence = {
                ...myPresence,
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
                        layer.connectedArrows.forEach(arrowId => {
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
    }, [setLiveLayers, socket, liveLayers, expired, zoom, setMyPresence, myPresence]);

    const unselectLayers = useCallback(() => {
        if (selectedLayersRef.current.length > 0) {
            selectedLayersRef.current = ([]);
            const newPresence: Presence = {
                ...myPresence,
                selection: []
            };

            setMyPresence(newPresence);
        }
    }, [setMyPresence, myPresence]);

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
            presentationMode
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

        const currentTuple: [number, number] = [current.x, current.y];
        setErasePath(erasePath.length === 0 ? [currentTuple] : [...erasePath, currentTuple]);

        const ids = findIntersectingLayersWithPath(
            liveLayerIds,
            liveLayers,
            erasePath,
            eraserDeleteAnyLayer,
            zoom
        );

        const unprocessedIds = ids.filter(id => !layersToDeleteEraserRef.current.has(id));

        if (unprocessedIds.length > 0) {
            const newLiveLayers = { ...liveLayers };
            for (const id of unprocessedIds) {
                delete newLiveLayers[id];
                layersToDeleteEraserRef.current.add(id);
            }
            setLiveLayers(newLiveLayers);
        }

    }, [liveLayerIds, liveLayers, setLiveLayers, setErasePath, erasePath, eraserDeleteAnyLayer, zoom]);

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
            pencilDraft.length === 0 ||
            expired
        ) {
            return;
        }

        const newPoint: [number, number, number] = [point.x, point.y, e.pressure];
        const smoothedPoints = smoothLastPoint([...pencilDraft, newPoint]);
        setPencilDraft(smoothedPoints);


        const newPresence: Presence = {
            ...myPresence,
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

    }, [canvasState.mode, pencilDraft, myPresence, setMyPresence, pathColor, pathStrokeSize, zoom, expired]);

    const insertPath = useCallback(() => {
        if (
            pencilDraft.length === 0 ||
            (pencilDraft[0] && pencilDraft[0].length < 2) ||
            activeTouches > 1 ||
            expired
        ) {
            setPencilDraft([]);
            const newPresence: Presence = {
                ...myPresence,
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
            ...myPresence,
            pencilDraft: null,
        };

        setMyPresence(newPresence);

        setCanvasState({ mode: CanvasMode.Pencil });
    }, [expired, pencilDraft, liveLayers, setLiveLayers, setLiveLayerIds, myPresence, org, proModal, socket, boardId, pathColor, performAction, pathStrokeSize, activeTouches]);

    const insertHighlight = useCallback(() => {
        if (
            pencilDraft.length === 0 ||
            (pencilDraft[0] && pencilDraft[0].length < 2) ||
            activeTouches > 1 ||
            expired
        ) {
            setPencilDraft([]);
            const newPresence: Presence = {
                ...myPresence,
                pencilDraft: null,
            };
            setMyPresence(newPresence);
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
    }, [expired, pencilDraft, liveLayers, setLiveLayers, setLiveLayerIds, myPresence, org, proModal, socket, zoom, activeTouches, boardId, pathColor, performAction]);

    const resizeSelectedLayers = useCallback((point: Point) => {

        if (expired) {
            selectedLayersRef.current = [];
            const newPresence: Presence = {
                ...myPresence,
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
            liveLayers[id].type === LayerType.Svg
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
                newLayer.connectedArrows.forEach(arrowId => {
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

        const isMouseWheel = Math.abs(e.deltaY) > 90 && e.deltaX === 0;

        if (e.ctrlKey || isMouseWheel) {
            // Zooming
            const zoomSpeed = isMouseWheel ? 1.3 : 1.2;
            let newZoom = zoom;
            if (e.deltaY < 0) {
                newZoom = Math.min(zoom * zoomSpeed, 10);
            } else {
                newZoom = Math.max(zoom / zoomSpeed, 0.3);
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
                const point = pointerEventToCanvasPoint(e, cameraRef.current, zoomRef.current, svgRef);
                setStartPanPoint(point);
                setIsPanning(false);
                return;
            }

            setCanvasState({ origin: point, mode: CanvasMode.Pressing });
        } else if (e.button === 2 || e.button === 1) {
            setPresentationMode(false);
            setIsRightClickPanning(true);
            setStartPanPoint({ x: e.clientX, y: e.clientY });
            document.body.style.cursor = 'url(/custom-cursors/grab.svg) 12 12, auto';
        }

        if (selectedLayersRef.current.length > 0) {
            if (socket) {
                socket.emit('layer-update', selectedLayersRef.current, liveLayers);
            }
        }
    }, [canvasState.mode, setCanvasState, startDrawing, setIsPanning, setIsRightClickPanning, activeTouches, expired, isPanning, unselectLayers, liveLayers, socket, setPresentationMode]);

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
        const current = pointerEventToCanvasPoint(e, cameraRef.current, zoomRef.current, svgRef);
        setMousePosition(current);

        if (canvasState.mode !== CanvasMode.None) {
            const borderThreshold = 10; // pixels from the edge to start moving
            const moveSpeed = 5; // pixels to move per frame

            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;

            let newBorderMove = { x: 0, y: 0 };

            if (e.clientX < borderThreshold) newBorderMove.x = moveSpeed;
            if (e.clientX > viewportWidth - borderThreshold) newBorderMove.x = -moveSpeed;
            if (e.clientY < borderThreshold) newBorderMove.y = moveSpeed;
            if (e.clientY > viewportHeight - borderThreshold) newBorderMove.y = -moveSpeed;

            const isNearBorderNow = newBorderMove.x !== 0 || newBorderMove.y !== 0;

            setIsNearBorder(isNearBorderNow);
            setBorderMove(newBorderMove);
        } else {
            setIsNearBorder(false);
            setBorderMove({ x: 0, y: 0 });
        }

        const newPresence: Presence = {
            ...myPresence,
            cursor: { x: current.x, y: current.y },
        };

        setMyPresence(newPresence);

        if (socket) {
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
            (startPanPoint.x !== 0 || startPanPoint.y !== 0)
        ) {
            const point = pointerEventToCanvasPoint(e, cameraRef.current, zoomRef.current, svgRef);
            let widthArrow = point.x - startPanPoint.x;
            let heightArrow = point.y - startPanPoint.y;
            const x = Math.min(point.x, startPanPoint.x);
            const y = Math.min(point.y, startPanPoint.y);
            const width = Math.abs(point.x - startPanPoint.x);
            const height = Math.abs(point.y - startPanPoint.y);
            setIsPanning(true);

            switch (canvasState.layerType) {
                case LayerType.Rectangle:
                    setCurrentPreviewLayer({ x, y, width, height, textFontSize: 12, type: LayerType.Rectangle, fill: { r: 0, g: 0, b: 0, a: 0 }, outlineFill: { r: 29, g: 29, b: 29, a: 1 } });
                    break;
                case LayerType.Triangle:
                    setCurrentPreviewLayer({ x, y, width, height, textFontSize: 12, type: LayerType.Triangle, fill: { r: 0, g: 0, b: 0, a: 0 }, outlineFill: { r: 29, g: 29, b: 29, a: 1 } });
                    break;
                case LayerType.Star:
                    setCurrentPreviewLayer({ x, y, width, height, textFontSize: 12, type: LayerType.Star, fill: { r: 0, g: 0, b: 0, a: 0 }, outlineFill: { r: 29, g: 29, b: 29, a: 1 } });
                    break;
                case LayerType.Hexagon:
                    setCurrentPreviewLayer({ x, y, width, height, textFontSize: 12, type: LayerType.Hexagon, fill: { r: 0, g: 0, b: 0, a: 0 }, outlineFill: { r: 29, g: 29, b: 29, a: 1 } });
                    break;
                case LayerType.BigArrowLeft:
                    setCurrentPreviewLayer({ x, y, width, height, textFontSize: 12, type: LayerType.BigArrowLeft, fill: { r: 0, g: 0, b: 0, a: 0 }, outlineFill: { r: 29, g: 29, b: 29, a: 1 } });
                    break;
                case LayerType.BigArrowRight:
                    setCurrentPreviewLayer({ x, y, width, height, textFontSize: 12, type: LayerType.BigArrowRight, fill: { r: 0, g: 0, b: 0, a: 0 }, outlineFill: { r: 29, g: 29, b: 29, a: 1 } });
                    break;
                case LayerType.BigArrowUp:
                    setCurrentPreviewLayer({ x, y, width, height, textFontSize: 12, type: LayerType.BigArrowUp, fill: { r: 0, g: 0, b: 0, a: 0 }, outlineFill: { r: 29, g: 29, b: 29, a: 1 } });
                    break;
                case LayerType.BigArrowDown:
                    setCurrentPreviewLayer({ x, y, width, height, textFontSize: 12, type: LayerType.BigArrowDown, fill: { r: 0, g: 0, b: 0, a: 0 }, outlineFill: { r: 29, g: 29, b: 29, a: 1 } });
                    break;
                case LayerType.CommentBubble:
                    setCurrentPreviewLayer({ x, y, width, height, textFontSize: 12, type: LayerType.CommentBubble, fill: { r: 0, g: 0, b: 0, a: 0 }, outlineFill: { r: 29, g: 29, b: 29, a: 1 } });
                    break;
                case LayerType.Rhombus:
                    setCurrentPreviewLayer({ x, y, width, height, textFontSize: 12, type: LayerType.Rhombus, fill: { r: 0, g: 0, b: 0, a: 0 }, outlineFill: { r: 29, g: 29, b: 29, a: 1 } });
                    break;
                case LayerType.Ellipse:
                    setCurrentPreviewLayer({ x, y, width, height, textFontSize: 12, type: LayerType.Ellipse, fill: { r: 0, g: 0, b: 0, a: 0 }, outlineFill: { r: 29, g: 29, b: 29, a: 1 } });
                    break;
                case LayerType.Text:
                    setCurrentPreviewLayer({ x, y, width, height: 18, textFontSize: 12, type: LayerType.Rectangle, fill: { r: 0, g: 0, b: 0, a: 0 }, outlineFill: { r: 75, g: 161, b: 241, a: 1 } });
                    break;
                case LayerType.Note:
                    setCurrentPreviewLayer({ x, y, width, height, textFontSize: 12, type: LayerType.Note, fill: { r: 252, g: 225, b: 156, a: 1 }, outlineFill: { r: 0, g: 0, b: 0, a: 0 } });
                    break;
                case LayerType.Frame:
                    setCurrentPreviewLayer({ x, y, width, height, type: LayerType.Frame });
                    break;
                case LayerType.Arrow:
                    let intersectingStartLayers: string[] = findIntersectingLayerForConnection(liveLayerIds, liveLayers, startPanPoint, zoom);
                    let intersectingEndLayers: string[] = findIntersectingLayerForConnection(liveLayerIds, liveLayers, point, zoom);

                    const filteredStartLayers = intersectingStartLayers.filter(layer => !intersectingEndLayers.includes(layer));
                    const filteredEndLayers = intersectingEndLayers.filter(layer => !intersectingStartLayers.includes(layer));

                    // Assigning the filtered results back
                    const intersectingStartLayer = filteredStartLayers.pop();
                    const intersectingEndLayer = filteredEndLayers.pop();
                    const STRAIGHTNESS_THRESHOLD = 4 / zoom;

                    let startConnectedLayerId: any = intersectingStartLayer;
                    let endConnectedLayerId: any = intersectingEndLayer;
                    let start = startPanPoint;
                    let end = point;

                    if (startConnectedLayerId !== endConnectedLayerId) {
                        if (intersectingStartLayer) {

                            if ((currentPreviewLayer as ArrowLayer).orientation === ArrowOrientation.Horizontal) {
                                if (end.x >= liveLayers[startConnectedLayerId].x && end.x <= liveLayers[startConnectedLayerId].x + liveLayers[startConnectedLayerId].width) {
                                    (currentPreviewLayer as ArrowLayer).orientation = ArrowOrientation.Vertical;
                                }
                            } else if ((currentPreviewLayer as ArrowLayer).orientation === ArrowOrientation.Vertical) {
                                if (end.y >= liveLayers[startConnectedLayerId].y && end.y <= liveLayers[startConnectedLayerId].y + liveLayers[startConnectedLayerId].height) {
                                    (currentPreviewLayer as ArrowLayer).orientation = ArrowOrientation.Horizontal;
                                }
                            }

                            const startConnectedLayer = liveLayers[startConnectedLayerId];
                            start = getClosestEndPoint(startConnectedLayer, point, (currentPreviewLayer as ArrowLayer)?.arrowType || ArrowType.Straight, (currentPreviewLayer as ArrowLayer))
                            end = applyStraightnessAssist(point, start, STRAIGHTNESS_THRESHOLD, (currentPreviewLayer as ArrowLayer)?.arrowType || ArrowType.Straight);
                        }

                        if (intersectingEndLayer) {
                            const endConnectedLayer = liveLayers[endConnectedLayerId];
                            end = getClosestPointOnBorder(endConnectedLayer, end, start, zoom, (currentPreviewLayer as ArrowLayer)?.arrowType || ArrowType.Straight, (currentPreviewLayer as ArrowLayer))
                        }
                    } else {
                        startConnectedLayerId = "";
                        endConnectedLayerId = "";
                    }

                    let center = { x: (start.x + end.x) / 2, y: (start.y + end.y) / 2 };
                    widthArrow = end.x - start.x;
                    heightArrow = end.y - start.y;

                    if (!startConnectedLayerId && !endConnectedLayerId && (currentPreviewLayer as ArrowLayer)?.arrowType === ArrowType.Diagram) {
                        const isHorizontal = Math.abs((currentPreviewLayer as ArrowLayer).width) >= Math.abs((currentPreviewLayer as ArrowLayer).height);
                        if (isHorizontal) {
                            (currentPreviewLayer as ArrowLayer).orientation = ArrowOrientation.Horizontal;
                        } else {
                            (currentPreviewLayer as ArrowLayer).orientation = ArrowOrientation.Vertical;
                        }
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
            EraserDeleteLayers,
            arrowTypeInserting,
            currentPreviewLayer,
            liveLayerIds,
            liveLayers
        ]);

    const onPointerUp = useCallback((e: React.PointerEvent) => {
        setIsRightClickPanning(false);
        const point = pointerEventToCanvasPoint(e, camera, zoom, svgRef);

        if (
            canvasState.mode === CanvasMode.None ||
            canvasState.mode === CanvasMode.Pressing
        ) {
            document.body.style.cursor = 'default';
            setCanvasState({
                mode: CanvasMode.None,
            });
        } else if (canvasState.mode === CanvasMode.Pencil) {
            document.body.style.cursor = 'url(/custom-cursors/pencil.svg) 1 16, auto';
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
            setErasePath([]);
            document.body.style.cursor = 'url(/custom-cursors/eraser.svg) 8 16, auto';
            if (layersToDeleteEraserRef.current.size > 0) {
                const command = new DeleteLayerCommand(Array.from(layersToDeleteEraserRef.current), initialLayers, liveLayerIds, setLiveLayers, setLiveLayerIds, boardId, socket);
                performAction(command);
                layersToDeleteEraserRef.current.clear();
                return;
            }
            return;
        } else if (canvasState.mode === CanvasMode.Inserting) {
            if (e.button === 2 || e.button === 1) {
                setCursorWithFill('/custom-cursors/inserting.svg', document.documentElement.classList.contains("dark") ? '#ffffff' : '#000000', 10, 10);
            }

            const layerType = canvasState.layerType;
            setIsPanning(false);
            if (isPanning && currentPreviewLayer) {
                if (layerType === LayerType.Arrow && currentPreviewLayer.type === LayerType.Arrow
                    || layerType === LayerType.Line && currentPreviewLayer.type === LayerType.Line
                ) {
                    insertLayer(layerType, { x: currentPreviewLayer.x, y: currentPreviewLayer.y }, currentPreviewLayer.width, currentPreviewLayer.height, currentPreviewLayer.center, currentPreviewLayer.startConnectedLayerId, currentPreviewLayer.endConnectedLayerId, currentPreviewLayer.arrowType, currentPreviewLayer.orientation)
                    setCurrentPreviewLayer(null);
                } else {
                    insertLayer(layerType, { x: currentPreviewLayer.x, y: currentPreviewLayer.y }, currentPreviewLayer.width, currentPreviewLayer.height);
                    setCurrentPreviewLayer(null);
                }
            } else if (layerType !== LayerType.Arrow && layerType !== LayerType.Line) {
                let width
                let height
                if (layerType === LayerType.Text) {
                    width = 100;
                    height = 18;
                    point.x = point.x - width / 20
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
            document.body.style.cursor = 'url(/custom-cursors/hand.svg) 12 12, auto';
            setIsPanning(false);
        } else if (canvasState.mode === CanvasMode.Translating) {
            const initialLayer = JSON.stringify(initialLayers[selectedLayersRef.current[0]]);
            const liveLayer = JSON.stringify(liveLayers[selectedLayersRef.current[0]]);
            const changed = initialLayer !== liveLayer;

            setCanvasState({
                mode: CanvasMode.None,
            });

            if (!changed && selectedLayersRef.current.length > 1) {

                // If the user is pressing ctrl or command, we don't want to unselect the others
                if (e.ctrlKey || e.metaKey) {
                    return;
                }

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
                            layer.connectedArrows.forEach(arrowId => {
                                updatedLayerIds.push(arrowId);
                            })
                        };
                    }
                });


                const command = new TranslateLayersCommand(updatedLayerIds, initialLayers, liveLayers, setLiveLayers, boardId, socket);
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

        if (e.pointerType !== "mouse") {
            const newPresence: Presence = {
                ...myPresence,
                cursor: null,
                pencilDraft: null
            };

            setPencilDraft([]);
            setMyPresence(newPresence);

            if (socket) {
                socket.emit('presence', newPresence, User.userId);
            }
            return;
        }

        if (selectedLayersRef.current.length === 0) {
            const newPresence: Presence = {
                ...myPresence,
                selection: [],
                pencilDraft: null,
            };
            if (socket) {
                socket.emit('presence', newPresence, User.userId);
            }
        }
    },
        [
            setCanvasState,
            canvasState,
            insertLayer,
            insertPath,
            setIsPanning,
            selectedLayersRef,
            liveLayers,
            camera,
            zoom,
            currentPreviewLayer,
            isPanning,
            initialLayers,
            socket,
            myPresence,
            User.userId,
            boardId,
            expired,
            insertHighlight,
            liveLayerIds,
            performAction,
            setLiveLayerIds,
            setLiveLayers,
        ]);

    const onPointerLeave = useCallback((e: any) => {

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
        const point = pointerEventToCanvasPoint(e, cameraRef.current, zoomRef.current, svgRef);
        setCanvasState({ mode: CanvasMode.Translating, current: point });

        if (selectedLayersRef.current.includes(layerId)) {
            return;
        }

        let newSelection: string[]

        if (e.ctrlKey || e.metaKey) {
            newSelection = [...selectedLayersRef.current, layerId];
        } else {
            newSelection = [layerId];
        }

        const newPresence: Presence = {
            selection: newSelection,
            cursor: point
        };

        setMyPresence(newPresence);

        selectedLayersRef.current = newSelection;

        if (socket) {
            socket.emit('presence', newPresence, User.userId);
        }

    }, [selectedLayersRef, expired, socket, User.userId]);

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

    const onDragOver = useCallback((e: React.DragEvent) => {

        e.preventDefault();
        if (expired) {
            return;
        }

        setIsDraggingOverCanvas(true);

    }, [setIsDraggingOverCanvas, expired]);

    const onDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        if (expired) {
            return;
        }

        // Check if we're actually leaving the canvas
        const rect = e.currentTarget.getBoundingClientRect();
        const { clientX, clientY } = e;

        if (
            clientX <= rect.left ||
            clientX >= rect.right ||
            clientY <= rect.top ||
            clientY >= rect.bottom
        ) {
            setIsDraggingOverCanvas(false);
        }

    }, [setIsDraggingOverCanvas, expired]);

    const onDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        if (expired) {
            return;
        }

        setIsDraggingOverCanvas(false);
        let x = (Math.round(e.clientX) - camera.x) / zoom;
        let y = (Math.round(e.clientY) - camera.y) / zoom;
        const files = Array.from(e.dataTransfer.files);
        uploadFilesAndInsertThemIntoCanvas(files, org, User, zoom, x, y, insertMedia);
    }, [setIsDraggingOverCanvas, camera, zoom, org, User, insertMedia, expired]);

    const onTouchStart = useCallback((e: React.TouchEvent) => {
        setIsMoving(false);
        setActiveTouches(e.touches.length);
    
        if (e.touches.length > 1) {
            selectedLayersRef.current = [];
        }
    
        // Reset pinch and pan values at the start of a new touch interaction
        setPinchStartDist(null);
        setStartPanPoint({ x: 0, y: 0 });
    
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
    
    const onTouchEnd = useCallback((e: React.TouchEvent) => {
        setIsMoving(false);
        setActiveTouches(e.changedTouches.length);
    
        // Reset pinch and pan values when the touch interaction ends
        if (e.touches.length < 2) {
            setPinchStartDist(null);
        }
        if (e.touches.length === 0) {
            setStartPanPoint({ x: 0, y: 0 });
        }
    }, []);
    const copySelectedLayers = useCallback(() => {
        setCopiedLayerIds(selectedLayersRef.current);
    }, [selectedLayersRef]);

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
            } else if (layer.type !== LayerType.Line && layer.connectedArrows) {
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

    }, [copiedLayerIds, myPresence, setLiveLayers, setLiveLayerIds, setMyPresence, org, proModal, socket, boardId, performAction, liveLayers]);

    useEffect(() => {
        const onPointerDown = (e: PointerEvent) => {
            const deepCopy = JSON.parse(JSON.stringify(liveLayers));
            setInitialLayers(deepCopy);
            setIsArrowPostInsertMenuOpen(false);
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

            if (!e.key || expired) {
                return;
            }

            const isInsideTextArea = checkIfTextarea();
            const key = e.key.toLocaleLowerCase();

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
                        e.preventDefault();
                        copySelectedLayers();
                        navigator.clipboard.writeText('').catch(err => {
                            console.error("Failed to clear clipboard:", err);
                        });
                    } else {
                        setCanvasState({ mode: CanvasMode.Inserting, layerType: LayerType.Ellipse });
                    }
                }
            } else if (key === "v") {
                if (!isInsideTextArea && (e.ctrlKey || e.metaKey)) {
                    e.preventDefault();

                    // First, check the system clipboard for content
                    navigator.clipboard.read().then(async items => {
                        let hasImage = false;
                        let hasText = false;

                        for (const item of items) {
                            // Check for image
                            if (item.types.includes('image/png') || item.types.includes('image/jpeg')) {
                                hasImage = true;
                                try {
                                    const blob = await item.getType('image/png');
                                    const randomImageId = nanoid();
                                    const file = new File([blob], `${randomImageId}.png`, { type: "image/png" });

                                    const toastId = toast.loading("Image is being processed, please wait...");
                                    const formData = new FormData();
                                    formData.append('file', file);
                                    formData.append('userId', User.userId);
                                    formData.append('imageId', randomImageId);

                                    const res = await fetch('/api/aws-s3-images', {
                                        method: 'POST',
                                        body: formData
                                    });

                                    if (!res.ok) {
                                        throw new Error('Network response was not ok');
                                    }

                                    const url = await res.text();
                                    const img = new Image();
                                    const imgLoad = new Promise<{ url: string, dimensions: { width: number, height: number }, type: string }>((resolve) => {
                                        img.onload = () => {
                                            const dimensions = { width: img.width, height: img.height };
                                            resolve({ url, dimensions, type: 'image' });
                                        };
                                    });
                                    img.src = url;
                                    const info = await imgLoad;

                                    insertMedia([{ layerType: LayerType.Image, position: { x: mousePosition.x, y: mousePosition.y }, info, zoom }]);
                                    toast.dismiss(toastId);
                                    toast.success("Image uploaded successfully");
                                } catch (err) {
                                    console.error("Error processing image from clipboard:", err);
                                    toast.error("Failed to process image from clipboard");
                                }
                                break; // Exit the loop after handling the first image
                            }

                            // Check for text
                            //if (item.types.includes('text/plain')) {
                            //  hasText = true;
                            //  try {
                            //    const text = await item.getType('text/plain');
                            //   const textContent = await text.text();
                            //    insertLayer(LayerType.Text, mousePosition, 100, 18, undefined, undefined, undefined, undefined, undefined, textContent);
                            //  } catch (err) {
                            //    console.error("Error reading text from clipboard:", err);
                            //  }
                            //  break; // Exit the loop after handling the text
                            //}
                        }

                        // If no image or text was found in the clipboard, paste copied layers
                        if (!hasImage && !hasText && copiedLayerIds.length > 0) {
                            pasteCopiedLayers(mousePosition);
                        }
                    }).catch(err => {
                        console.error("Error accessing clipboard:", err);
                        // If there was an error accessing the clipboard, fall back to pasting copied layers
                        if (copiedLayerIds.length > 0) {
                            pasteCopiedLayers(mousePosition);
                        }
                    });
                }
            } else if (key === "a") {
                if (!isInsideTextArea && !presentationMode) {
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
                } else if (key === "f") {
                    setCanvasState({ mode: CanvasMode.Inserting, layerType: LayerType.Frame });
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

    }, [copySelectedLayers, pasteCopiedLayers, camera, zoom, liveLayers, copiedLayerIds, liveLayerIds, myPresence, socket, User.userId, forceSelectionBoxRender, canvasState, presentationMode,
        boardId, history.length, mousePosition, performAction, redo, redoStack.length, setLiveLayerIds, setLiveLayers, undo, unselectLayers, expired, translateSelectedLayersWithDelta, initialLayers]);

    useEffect(() => {
        // just to make sure there are no dangling points
        if (canvasState.mode === CanvasMode.None) {
            setPencilDraft([]);
        }

        // stop presentation mode if we are moving
        if (canvasState.mode === CanvasMode.Moving) {
            setPresentationMode(false);
        }

        canvasStateRef.current = canvasState;
        zoomRef.current = zoom;
        cameraRef.current = camera;
    }, [canvasState, zoom, camera]);

    // This moves the camera when the user is near the border of the canvas
    useEffect(() => {
        let animationFrameId: number;

        if (presentationMode || canvasState.mode === CanvasMode.None) {
            return;
        }

        const moveCameraLoop = () => {
            if (isNearBorder) {
                setCamera(prevCamera => ({
                    x: prevCamera.x + borderMove.x,
                    y: prevCamera.y + borderMove.y
                }));
                animationFrameId = requestAnimationFrame(moveCameraLoop);
            }
        };

        if (isNearBorder) {
            animationFrameId = requestAnimationFrame(moveCameraLoop);
        }

        return () => {
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
        };
    }, [isNearBorder, borderMove, setCamera, canvasState.mode, presentationMode]);

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
        if (rightClickPanning) {
            document.body.style.cursor = 'url(/custom-cursors/grab.svg) 12 12, auto';
            return;
        }

        if (canvasState.mode === CanvasMode.Inserting) {
            selectedLayersRef.current = [];
            if (canvasState.layerType === LayerType.Text) {
                setCursorWithFill('/custom-cursors/text-cursor.svg', document.documentElement.classList.contains("dark") ? '#ffffff' : '#000000', 8, 0);
            } else {
                setCursorWithFill('/custom-cursors/inserting.svg', document.documentElement.classList.contains("dark") ? '#ffffff' : '#000000', 10, 10);
            }
        } else if (canvasState.mode === CanvasMode.Pencil) {
            document.body.style.cursor = 'url(/custom-cursors/pencil.svg) 1 16, auto';
            selectedLayersRef.current = [];
        } else if (canvasState.mode === CanvasMode.Highlighter) {
            document.body.style.cursor = 'url(/custom-cursors/highlighter.svg) 2 18, auto';
            selectedLayersRef.current = [];
        } else if (canvasState.mode === CanvasMode.Laser) {
            document.body.style.cursor = 'url(/custom-cursors/laser.svg) 4 18, auto';
            selectedLayersRef.current = [];
        } else if (canvasState.mode === CanvasMode.Eraser) {
            document.body.style.cursor = 'url(/custom-cursors/eraser.svg) 8 16, auto';
            selectedLayersRef.current = [];
        } else if (canvasState.mode === CanvasMode.Moving) {
            document.body.style.cursor = 'url(/custom-cursors/hand.svg) 12 12, auto';
        } else if (canvasState.mode === CanvasMode.ArrowResizeHandler) {
            document.body.style.cursor = 'url(/custom-cursors/grab.svg) 12 12, auto';
        } else if (canvasState.mode === CanvasMode.Translating) {
            document.body.style.cursor = 'move';
        } else {
            document.body.style.cursor = 'default';
        }
    }, [canvasState.mode, canvasState, rightClickPanning]);

    useEffect(() => {
        const updateVisibleLayers = () => {
            if (!svgRef.current) return;

            const svg = svgRef.current as SVGSVGElement;
            const viewBox = svg.viewBox.baseVal;
            let visibleRect: XYWH;

            // Check if we're in presentation mode and have frames
            if (presentationMode && frameIds.length > 0) {
                const currentFrameId = frameIds[currentFrameIndex];
                const currentFrame = liveLayers[currentFrameId] as FrameLayer;

                // Set the visible rectangle to the current frame's dimensions
                visibleRect = {
                    x: currentFrame.x,
                    y: currentFrame.y,
                    width: currentFrame.width,
                    height: currentFrame.height
                };
            } else {
                // If not in presentation mode, calculate visible area based on camera and zoom
                visibleRect = {
                    x: -camera.x / zoom,
                    y: -camera.y / zoom,
                    width: viewBox.width / zoom,
                    height: viewBox.height / zoom
                };
            }

            // Filter layers to only include those visible within the current visible rectangle
            const newVisibleLayers = liveLayerIds.filter((layerId: string) => {
                const layer = liveLayers[layerId];
                if (layer) {
                    return isLayerVisible(layer, visibleRect);
                }
            });

            setVisibleLayers(newVisibleLayers);
        };

        updateVisibleLayers();
    }, [liveLayerIds, liveLayers, camera, zoom, presentationMode, frameIds, currentFrameIndex]);

    const goToFrame = useCallback((index: number) => {
        const totalFrames = frameIds.length;
        if (totalFrames === 0) return;

        // Ensure the index is within bounds using modulo
        const safeIndex = ((index % totalFrames) + totalFrames) % totalFrames;

        const frameId = frameIds[safeIndex];
        const frame = liveLayers[frameId] as FrameLayer;

        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        // Adjust the vertical space to account for the toolbar
        const toolbarHeight = 40; // Estimated height of the toolbar
        const adjustedViewportHeight = viewportHeight - toolbarHeight;

        const zoomX = (viewportWidth) / frame.width * 0.95;
        const zoomY = (adjustedViewportHeight) / frame.height * 0.95;
        const targetZoom = Math.min(zoomX, zoomY, 10);

        const targetCameraX = viewportWidth / 2 - (frame.x + frame.width / 2) * targetZoom;
        // Adjust the Y position to move the frame up
        const targetCameraY = (adjustedViewportHeight / 2 - (frame.y + frame.height / 2) * targetZoom) - toolbarHeight / 2;

        setZoom(targetZoom);
        setCamera({ x: targetCameraX, y: targetCameraY });
        setCurrentFrameIndex(safeIndex);
    }, [frameIds, liveLayers, setZoom, setCamera, presentationMode]);

    const goToNextFrame = useCallback(() => {
        goToFrame(currentFrameIndex + 1);
    }, [currentFrameIndex, goToFrame]);

    const goToPreviousFrame = useCallback(() => {
        goToFrame(currentFrameIndex - 1);
    }, [currentFrameIndex, goToFrame]);

    useEffect(() => {
        const enterFullscreenAndGoToFrame = async () => {
            if (presentationMode) {
                if (document.documentElement.requestFullscreen) {
                    try {
                        await document.documentElement.requestFullscreen();
                        // Wait a bit for the browser to update window dimensions
                        await new Promise(resolve => setTimeout(resolve, 10));
                        goToFrame(0);
                    } catch (error) {
                        console.error("Couldn't enter fullscreen:", error);
                        // If fullscreen fails, still go to the first frame
                        goToFrame(0);
                    }
                } else {
                    // If fullscreen is not supported, just go to the first frame
                    goToFrame(0);
                }
            }
        };

        enterFullscreenAndGoToFrame();
    }, [presentationMode, goToFrame]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (presentationMode) {
                if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                    goToNextFrame();
                } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                    goToPreviousFrame();
                }
            }
        };

        const handleFullscreenChange = () => {
            if (!document.fullscreenElement && presentationMode) {
                setPresentationMode(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        document.addEventListener('fullscreenchange', handleFullscreenChange);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
        };
    }, [presentationMode, goToNextFrame, goToPreviousFrame, setPresentationMode]);

    return (
        <>
            <Background background={background} zoom={zoom} camera={camera} presentationMode={presentationMode} forcedRender={forceLayerPreviewRender} />
            <main
                className="fixed h-full w-full touch-none overscroll-none"
                style={{
                    WebkitOverflowScrolling: 'touch',
                    WebkitUserSelect: 'none',
                    touchAction: 'none',
                }}
            >
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
                <div className="h-full w-full">
                    <div className="z-20 absolute h-full w-full pointer-events-none">
                        <Toolbar
                            pathColor={pathColor}
                            pathStrokeSize={pathStrokeSize}
                            setPathColor={setPathColor}
                            setPathStrokeSize={setPathStrokeSize}
                            isUploading={isUploading}
                            setIsUploading={setIsUploading}
                            canvasState={canvasState}
                            setCanvasState={setCanvasState}
                            org={org}
                            undo={undo}
                            redo={redo}
                            canUndo={history.length > 0}
                            canRedo={redoStack.length > 0}
                            arrowTypeInserting={arrowTypeInserting}
                            setArrowTypeInserting={setArrowTypeInserting}
                            isArrowsMenuOpen={isArrowsMenuOpen}
                            setIsArrowsMenuOpen={setIsArrowsMenuOpen}
                            isPenMenuOpen={isPenMenuOpen}
                            setIsPenMenuOpen={setIsPenMenuOpen}
                            isShapesMenuOpen={isShapesMenuOpen}
                            setIsShapesMenuOpen={setIsShapesMenuOpen}
                            isPenEraserSwitcherOpen={isPenEraserSwitcherOpen}
                            setIsPenEraserSwitcherOpen={setIsPenEraserSwitcherOpen}
                            isPlacingLayer={currentPreviewLayer !== null}
                            expired={expired}
                            insertMedia={insertMedia}
                            camera={cameraRef.current}
                            svgRef={svgRef}
                            zoom={zoom}
                            presentationMode={presentationMode}
                            setPresentationMode={setPresentationMode}
                            frameIds={frameIds}
                            currentFrameIndex={currentFrameIndex}
                            goToFrame={goToFrame}
                        />
                        {!presentationMode && (
                            <>
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
                                    setForcedRender={setForceLayerPreviewRender}
                                    User={User}
                                    svgRef={svgRef}
                                    quickInserting={quickInserting}
                                    setQuickInserting={setQuickInserting}
                                    eraserDeleteAnyLayer={eraserDeleteAnyLayer}
                                    setEraserDeleteAnyLayer={setEraserDeleteAnyLayer}
                                />
                                <MoveBackToContent
                                    setCamera={setCamera}
                                    setZoom={setZoom}
                                    showButton={visibleLayers.length === 0 && liveLayerIds.length > 0}
                                    liveLayers={liveLayers}
                                    cameraRef={cameraRef}
                                    zoomRef={zoomRef}
                                />
                                <Participants
                                    org={org}
                                    otherUsers={otherUsers}
                                    User={User}
                                    socket={socket}
                                    expired={expired}
                                    board={board}
                                    setPresentationMode={setPresentationMode}
                                />
                                {!IsArrowPostInsertMenuOpen && !isMoving && canvasState.mode !== CanvasMode.Resizing && canvasState.mode !== CanvasMode.ArrowResizeHandler && canvasState.mode !== CanvasMode.SelectionNet && activeTouches < 2 && (
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
                                {liveLayers[selectedLayersRef.current[0]] && IsArrowPostInsertMenuOpen && (
                                    <ArrowPostInsertMenu
                                        selectedLayersRef={selectedLayersRef}
                                        liveLayers={liveLayers}
                                        zoom={zoom}
                                        camera={camera}
                                        setLiveLayers={setLiveLayers}
                                        setLiveLayerIds={setLiveLayerIds}
                                        boardId={boardId}
                                        socket={socket}
                                        org={org}
                                        proModal={proModal}
                                        performAction={performAction}
                                        setIsArrowPostInsertMenuOpen={setIsArrowPostInsertMenuOpen}
                                    />
                                )}
                                <ZoomToolbar
                                    zoom={zoom}
                                    setZoom={setZoom}
                                    setCamera={setCamera}
                                    camera={camera}
                                    liveLayers={liveLayers}
                                    liveLayerIds={liveLayerIds}
                                    setLiveLayerIds={setLiveLayerIds}
                                    cameraRef={cameraRef}
                                    zoomRef={zoomRef}
                                    forcedRender={forceLayerPreviewRender}
                                    boardId={boardId}
                                    socket={socket}
                                    setPresentationMode={setPresentationMode}
                                    focusMode={focusMode}
                                    setFocusMode={setFocusMode}
                                />
                            </>
                        )}
                    </div>
                    <div
                        id="canvas"
                        className="z-10 absolute selection-keep-text-color"
                        onWheel={onWheel}
                        onDragOver={onDragOver}
                        onDrop={onDrop}
                        onDragLeave={onDragLeave}
                        onTouchStart={onTouchStart}
                        onTouchMove={onTouchMove}
                        onTouchEnd={onTouchEnd}
                        onPointerMove={onPointerMove}
                        onPointerLeave={onPointerLeave}
                        onPointerDown={onPointerDown}
                        onPointerUp={onPointerUp}
                    >
                        <div className="z-10">
                            {visibleLayers.map((layerId: string) => {
                                const layer = liveLayers[layerId];
                                if (layer && (layer.type === LayerType.Video || layer.type === LayerType.Link)) {
                                    return (
                                        <MediaPreview
                                            key={layerId}
                                            id={layerId}
                                            layer={layer}
                                            onPointerDown={onLayerPointerDown}
                                            focused={selectedLayersRef.current.includes(layerId)}
                                            zoom={zoom}
                                            camera={camera}
                                            canvasState={canvasState}
                                            svgRef={svgRef}
                                        />
                                    );
                                }
                            })}
                        </div>
                        <div
                            className="z-20 relative pointer-events-none"
                        >
                            <svg
                                ref={svgRef}
                                className="h-[100vh] w-[100vw]"
                                viewBox={`0 0 ${window.innerWidth} ${window.innerHeight}`}
                            >
                                <g
                                    style={{
                                        transform: `translate(${camera.x}px, ${camera.y}px) scale(${zoom})`,
                                        transformOrigin: 'top left',
                                        willChange: 'transform',
                                    }}
                                >
                                    {currentPreviewLayer && currentPreviewLayer.type === LayerType.Frame && (
                                        <Frame
                                            id="FramePreview"
                                            layer={currentPreviewLayer}
                                        />
                                    )}
                                    {visibleLayers.map((layerId: string) => {
                                        const isFocused = selectedLayersRef.current.length === 1 && selectedLayersRef.current[0] === layerId && !justChanged;
                                        const showOutlineOnHover = canvasState.mode === CanvasMode.None && !presentationMode;
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
                                                forcedRender={forceLayerPreviewRender}
                                                setCamera={setCamera}
                                                setZoom={setZoom}
                                                cameraRef={cameraRef}
                                                zoomRef={zoomRef}
                                                liveLayerIds={liveLayerIds}
                                                liveLayers={liveLayers}
                                                showOutlineOnHover={showOutlineOnHover}
                                            />
                                        );
                                    })}
                                    <SelectionBox
                                        zoom={zoom}
                                        liveLayers={liveLayers}
                                        selectedLayers={selectedLayersRef.current}
                                        onResizeHandlePointerDown={onResizeHandlePointerDown}
                                        onArrowResizeHandlePointerDown={onArrowResizeHandlePointerDown}
                                        setLiveLayers={setLiveLayers}
                                        forceRender={forceSelectionBoxRender}
                                        setCurrentPreviewLayer={setCurrentPreviewLayer}
                                        mousePosition={mousePosition}
                                        setCanvasState={setCanvasState}
                                        setStartPanPoint={setStartPanPoint}
                                        setArrowTypeInserting={setArrowTypeInserting}
                                        showHandles={!isMoving && activeTouches < 2 && canvasState.mode !== CanvasMode.ArrowResizeHandler}
                                    />
                                    {currentPreviewLayer && (
                                        <CurrentPreviewLayer
                                            layer={currentPreviewLayer}
                                        />
                                    )}
                                    {suggestedLayers && (
                                        <CurrentSuggestedLayer
                                            layer={suggestedLayers}
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
                                    {(canvasState.mode === CanvasMode.Eraser) && erasePath.length > 0 && (
                                        <EraserTrail mousePosition={mousePosition} zoom={zoom} />
                                    )}
                                    {canvasState.mode === CanvasMode.SelectionNet && canvasState.current != null && activeTouches < 2 && (
                                        <rect
                                            style={{
                                                fill: 'rgba(59, 130, 246, 0.3)',
                                                stroke: '#3B82F6',
                                                strokeWidth: 1 / zoom,
                                            }}
                                            x={Math.min(canvasState.origin.x, canvasState.current.x)}
                                            y={Math.min(canvasState.origin.y, canvasState.current.y)}
                                            width={Math.abs(canvasState.origin.x - canvasState.current.x)}
                                            height={Math.abs(canvasState.origin.y - canvasState.current.y)}
                                        />
                                    )}
                                    {otherUsers && 
                                        <CursorsPresence otherUsers={otherUsers} zoom={zoom} />
                                    }
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
                    </div>
                </div>
            </main>
            <DragIndicatorOverlay isDraggingOverCanvas={isDraggingOverCanvas} />
        </>
    );
};