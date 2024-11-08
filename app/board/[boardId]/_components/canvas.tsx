"use client";

import { customAlphabet } from "nanoid";
import React, { useCallback, useMemo, useState, useEffect, useRef, memo } from "react";

import {
    colorToCss,
    connectionIdToColor,
    findIntersectingLayersWithRectangle,
    penPointsToPathLayer,
    resizeArrowBounds,
    pointerEventToCanvasPoint,
    resizeBounds,
    findIntersectingLayersWithPoint,
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
    isMouseLeftButton,
    isMouseRightButton,
    isMouseMiddleButton,
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
    ToolbarMenu,
    XYWH,
} from "@/types/canvas";

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
import { BottomRightView } from "./bottom-right-view";
import { Command, DeleteLayerCommand, InsertLayerCommand, TranslateLayersCommand } from "@/lib/commands";
import { ArrowConnectionOutlinePreview } from "./arrow-connection-outline-preview";
import { setCursorWithFill } from "@/lib/theme-utils";
import { ArrowPostInsertMenu } from "./arrow-post-insert-menu";
import { EraserTrail } from "./eraser-trail";
import { smoothLastPoint } from "@/lib/smooth-points";
import { Background } from "./background";
import { MediaPreview } from "./media-preview";
import { MoveBackToContent } from "./move-back-to-content";
import { Frame } from "../canvas-objects/frame";
import { getRestrictedZoom, MoveCameraToLayer } from "./utils/zoom-utils";
import { DragIndicatorOverlay } from "./drag-indicator-overlay";
import { AddedLayerByLabel } from "./added-layer-by-label";
import { Comment, CommentBox } from "../canvas-objects/comment";
import { Comment as CommentType } from "@/types/canvas";
import { RightMiddleContainer } from "./right-middle-container";
import { CommentPreview } from "../canvas-objects/comment-preview";
import { useLayerTextEditingStore } from "../canvas-objects/utils/use-layer-text-editing";
import { SelectionNet } from "./selection-net";
import { TableColumnType } from "../canvas-objects/table";
import { uploadFilesAndInsertThemIntoCanvas } from "../canvas-objects/utils/file-uploading-utils";
import { HighlighterIcon } from "@/public/custom-icons/highlighter";

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
    const [toolbarMenu, setToolbarMenu] = useState<ToolbarMenu>(ToolbarMenu.None);
    const [canvasState, setCanvasState] = useState<CanvasState>({ mode: CanvasMode.None });
    const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [startPanPoint, setStartPanPoint] = useState({ x: 0, y: 0 });
    const [isNearBorder, setIsNearBorder] = useState(false);
    const [borderMove, setBorderMove] = useState({ x: 0, y: 0 });
    const [presentationMode, setPresentationMode] = useState(false);
    const [background, setBackground] = useState(() => localStorage.getItem('background') || 'circular-grid');
    const setIsEditing = useLayerTextEditingStore(state => state.setIsEditing);

    // Layer management
    const [initialLayers, setInitialLayers] = useState<Layers>({});
    const selectedLayersRef = useRef<string[]>([]);
    const [copiedLayerIds, setCopiedLayerIds] = useState<string[]>([]);
    const [currentPreviewLayer, setCurrentPreviewLayer] = useState<PreviewLayer | null>(null);

    // this is the current comment box that is open
    const [openCommentBoxId, setOpenCommentBoxId] = useState<string | null>(null);
    const [activeHoveredCommentId, setActiveHoveredCommentId] = useState<string | null>(null);

    // Drawing and editing tools
    const [pencilDraft, setPencilDraft] = useState<[number, number, number][]>([]);
    const [erasePath, setErasePath] = useState<[number, number][]>([]);
    const [arrowTypeInserting, setArrowTypeInserting] = useState<ArrowType>(ArrowType.Straight);

    // Pencil
    const [pathColor, setPathColor] = useState({ r: 29, g: 29, b: 29, a: 1 });
    const [pathStrokeSize, setPathStrokeSize] = useState(2);

    // Highlighter
    const [highlighterColor, setHighlighterColor] = useState({ r: 255, g: 240, b: 0, a: 1 });
    const [highlighterStrokeSize, setHighlighterStrokeSize] = useState(20);

    // UI states
    const [isTranslatingLayers, setIsTranslatingLayers] = useState(false);
    const [justChanged, setJustChanged] = useState(false);
    const [isDraggingOverCanvas, setIsDraggingOverCanvas] = useState(false);
    const [justInsertedText, setJustInsertedText] = useState(false);
    const [IsArrowPostInsertMenuOpen, setIsArrowPostInsertMenuOpen] = useState(false);
    const [focusMode, setFocusMode] = useState(false);
    const [addedByLabel, setAddedByLabel] = useState('');
    const [showToolbar, setShowToolbar] = useState(true);
    const [lastMouseMove, setLastMouseMove] = useState(Date.now());
    const [isPointerDown, setIsPointerDown] = useState(false);
    const [rightMiddleContainerView, setRightMiddleContainerView] = useState<string | null>(null);

    // Undo/Redo
    const [history, setHistory] = useState<Command[]>([]);
    const [redoStack, setRedoStack] = useState<Command[]>([]);

    // Touch and mobile-related states
    const [pinchStartDist, setPinchStartDist] = useState<number | null>(null);
    const [activeTouches, setActiveTouches] = useState(0);
    const [startMobilePanPoint, setStartMobilePanPoint] = useState<{ x: number, y: number } | null>(null);

    // Misc
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [layerRef, setLayerRef] = useState<any>(null);
    const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
    const [forceSelectionBoxRender, setForceSelectionBoxRender] = useState(false);
    const [forceLayerPreviewRender, setForceLayerPreviewRender] = useState(false);
    const [canvasCursor, setCanvasCursor] = useState('default');

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

    const commentIds = useMemo(() => {
        if (!liveLayerIds || !liveLayers) return [];
        return liveLayerIds.filter(id => {
            const layer = liveLayers[id];
            return layer && layer.type === LayerType.Comment;
        });
    }, [liveLayerIds, liveLayers]);

    const visibleLayerIds = useMemo(() => {
        if (!liveLayerIds?.length || !liveLayers) return liveLayerIds || [];

        const visibleRect = presentationMode && frameIds.length > 0
            ? {
                x: liveLayers[frameIds[currentFrameIndex]].x,
                y: liveLayers[frameIds[currentFrameIndex]].y,
                width: liveLayers[frameIds[currentFrameIndex]].width,
                height: liveLayers[frameIds[currentFrameIndex]].height
            }
            : {
                x: -camera.x / zoom,
                y: -camera.y / zoom,
                width: window.innerWidth / zoom,
                height: window.innerHeight / zoom
            };

        return liveLayerIds.filter((layerId: string) => {
            const layer = liveLayers[layerId];
            return layer && isLayerVisible(layer, visibleRect);
        });
    }, [
        liveLayerIds,
        liveLayers,
        camera,
        zoom,
        presentationMode,
        frameIds,
        currentFrameIndex,
    ]);

    const filteredOrgTeammates = useMemo(() =>
        org.users.filter((user: typeof org.users[0]) => user.id !== User.userId),
        [User.userId, org]
    );

    const updatePresence = useCallback((presenceUpdates: Partial<Presence>) => {
        const newPresence: Presence = {
            ...myPresence,
            ...presenceUpdates
        };
    
        setMyPresence(newPresence);
    
        if (socket) {
            socket.emit('presence', newPresence, User.userId);
        }
    }, [myPresence, socket, User.userId]);

    const performAction = useCallback(async (command: Command, addToHistory = true) => {
        command.execute(liveLayerIds, liveLayers);
        if (addToHistory) {
            setHistory([...history, command]);
            setRedoStack([]);
        }
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

    const insertLayer = useCallback((layerType: LayerType, position: Point, width: number, height: number, center?: Point, startConnectedLayerId?: string, endConnectedLayerId?: string, arrowType?: ArrowType, orientation?: ArrowOrientation, commentContent?: string) => {

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
                addedBy: User?.information.name
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
                addedBy: User?.information.name
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
                orientation: orientation,
                addedBy: User?.information.name
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
                addedBy: User?.information.name
            };
        } else if (layerType === LayerType.Comment) {
            layer = {
                type: layerType,
                x: position.x,
                y: position.y,
                width: width,
                height: height,
                author: {
                    userId: User.userId,
                    information: {
                        name: User.information.name,
                        picture: User.information.picture,
                    }
                },
                content: commentContent,
                createdAt: new Date(),
                replies: []
            }
        } else if (layerType === LayerType.Table) {
            const ratio = 3;
            const width = innerWidth / 2;
            const height = width / ratio;

            // Define columns first
            const columns = [
                { type: TableColumnType.Text, key: 'title', title: 'Title' },
                { type: TableColumnType.Text, key: 'description', title: 'Description' },
                { type: TableColumnType.Person, key: 'assignee', title: 'Assignee' },
                { type: TableColumnType.Tag, key: 'status', title: 'Status' },
                { type: TableColumnType.Date, key: 'startDate', title: 'Start Date' },
                { type: TableColumnType.Date, key: 'dueDate', title: 'Due Date' },
            ];

            // Create data based on columns
            const sampleData = [
                {
                    title: "My first task",
                    description: "",
                    assignee: {
                        userId: User.userId,
                        name: User.information.name,
                        picture: User.information.picture
                    },
                    status: "To do",
                    startDate: "Oct 24",
                    dueDate: "Oct 30"
                },
                {
                    title: "My second task",
                    description: "",
                    status: "In progress",
                    startDate: "Oct 30",
                    dueDate: "Nov 5"
                },
                {
                    title: "My third task",
                    description: "",
                    status: "Done",
                    startDate: "Nov 5",
                    dueDate: "Nov 11"
                }
            ];

            layer = {
                type: layerType,
                x: position.x,
                y: position.y,
                width: width,
                height: height,
                columns: columns,
                data: sampleData
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
                addedBy: User?.information.name
            };
        }

        const command = new InsertLayerCommand([layerId], [layer], setLiveLayers, setLiveLayerIds, boardId, socket, org, proModal);
        performAction(command);
        updatePresence({ selection: [layerId] });
        setCurrentPreviewLayer(null);

        if (layer.type === LayerType.Comment) {
            setOpenCommentBoxId(layerId);
        }

        if (layer.type !== LayerType.Text) {
            selectedLayersRef.current = [layerId];
        }

        // return the user to the default mode
        if (!quickInserting) {
            setCanvasState({ mode: CanvasMode.None });
        }

    }, [User, socket, org, proModal, setLiveLayers, setLiveLayerIds, boardId, arrowTypeInserting, liveLayers, performAction, expired, quickInserting, setCurrentPreviewLayer, setOpenCommentBoxId, updatePresence]);

    useEffect(() => {
        if (justInsertedText && layerRef && layerRef.current) {
            layerRef.current?.focus();
        }
    }, [justInsertedText, layerRef]);

    const insertMedia = useCallback((
        mediaItems: Array<{
            layerType: LayerType.Image | LayerType.Video | LayerType.Link | LayerType.Svg
            position: Point,
            info: any,
            zoom: number,
            isPdfPage?: boolean
        }>
    ) => {
        if (expired) {
            setCanvasState({ mode: CanvasMode.None });
            return;
        }

        const newLayers: Layer[] = [];
        const newLayerIds: string[] = [];

        mediaItems.forEach(({ layerType, position, info, isPdfPage }) => {
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
                addedBy: User?.information.name
            };

            if (layerType === LayerType.Svg) {
                (layer as SvgLayer).fill = { r: 29, g: 29, b: 29, a: 1 }; // Default to black
            }

            newLayers.push(layer);

            if (isPdfPage) {
                const frameLayerId = nanoid();
                newLayerIds.push(frameLayerId);

                // Add some padding around the content
                const framePadding = 10 / zoom;

                const frameLayer: FrameLayer = {
                    type: LayerType.Frame,
                    x: position.x - framePadding / 2,
                    y: position.y - framePadding / 2,
                    height: info.dimensions.height + framePadding,
                    width: info.dimensions.width + framePadding,
                    addedBy: User?.information.name
                };

                newLayers.push(frameLayer);
            }
        });

        if (newLayers.length > 0) {
            const command = new InsertLayerCommand(newLayerIds, newLayers, setLiveLayers, setLiveLayerIds, boardId, socket, org, proModal);
            performAction(command);
            selectedLayersRef.current = newLayerIds;
        }

        setCanvasState({ mode: CanvasMode.None });

    }, [socket, org, proModal, setLiveLayers, setLiveLayerIds, boardId, performAction, expired, User]);

    const translateSelectedLayers = useCallback((e: any, point: Point) => {
        if (expired || activeTouches > 1 || canvasState.mode !== CanvasMode.Translating) {
            selectedLayersRef.current = [];
            const newPresence: Presence = {
                ...myPresence,
                selection: []
            };
            setMyPresence(newPresence);
            return;
        }

        const offset = {
            x: (point.x - canvasState.current.x),
            y: (point.y - canvasState.current.y)
        };

        const MOVEMENT_THRESHOLD = 120 / zoom;
        const movementDistance = Math.sqrt(offset.x * offset.x + offset.y * offset.y);

        if (e.pointerType === 'touch' && movementDistance > MOVEMENT_THRESHOLD) {
            // If movement is too large on mobile, cancel the translation (might be trying to pan)
            return;
        }

        setIsTranslatingLayers(true);

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
                if (layer.type !== LayerType.Arrow && layer.type !== LayerType.Line && layer.type !== LayerType.Comment && selectedLayersRef.current.length === 1) {
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
                if (layer.type !== LayerType.Arrow && layer.type !== LayerType.Line && layer.type !== LayerType.Comment && selectedLayersRef.current.length === 1) {
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
    }, [liveLayers, liveLayerIds, setMyPresence, myPresence, presentationMode]);

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
                    ? highlighterStrokeSize
                    : pathStrokeSize,
            pathStrokeColor: canvasState.mode === CanvasMode.Laser
                ? { r: 255, g: 0, b: 0, a: 1 }
                : canvasState.mode === CanvasMode.Highlighter
                    ? { ...highlighterColor, a: 0.3 }
                    : highlighterColor,
        };

        setMyPresence(newPresence);

    }, [canvasState.mode, pencilDraft, myPresence, setMyPresence, highlighterColor, highlighterStrokeSize, pathStrokeSize, zoom, expired]);

    const insertPath = useCallback((isHighlight: boolean) => {
        if (
            pencilDraft.length === 0 ||
            (pencilDraft[0] && pencilDraft[0].length < 2) ||
            activeTouches > 1 ||
            expired
        ) {
            setPencilDraft([]);
            setMyPresence({ ...myPresence, pencilDraft: null });
            return;
        }

        const id = nanoid();
        const color = isHighlight ? { ...highlighterColor, a: 0.3 } : pathColor;
        const strokeSize = isHighlight ? highlighterStrokeSize : pathStrokeSize;

        liveLayers[id] = penPointsToPathLayer(pencilDraft, color, strokeSize, User?.information.name);

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
        setPencilDraft([]);
        setMyPresence({ ...myPresence, pencilDraft: null });
        setCanvasState({ mode: isHighlight ? CanvasMode.Highlighter : CanvasMode.Pencil });
    }, [
        expired, pencilDraft, liveLayers, setLiveLayers, setLiveLayerIds,
        myPresence, org, proModal, socket, boardId, pathColor, highlighterColor,
        performAction, pathStrokeSize, highlighterStrokeSize, activeTouches, User
    ]);

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
            liveLayers[id].type === LayerType.Svg ||
            liveLayers[id].type === LayerType.Table ||
            liveLayers[id].type === LayerType.Link
        );
        let mantainAspectRatio = hasMediaOrText
        let singleLayer = selectedLayersRef.current.length === 1

        const updatedLayerIds: string[] = [...selectedLayersRef.current];
        const updatedLayers: { [key: string]: Layer } = {};

        selectedLayersRef.current.forEach(id => {
            const newLayer = { ...liveLayers[id] };

            if (newLayer.type === LayerType.Comment) {
                return;
            }

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
        setPresentationMode(false);

        const svgRect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - svgRect.left;
        const y = e.clientY - svgRect.top;

        const isMouseWheel = Math.abs(e.deltaY) > 90 && e.deltaX === 0;

        if (e.ctrlKey || isMouseWheel) {
            const delta = -e.deltaY;

            const multiplier = isMouseWheel ? 0.0015 : 0.02;  // Much smaller for mouse wheel
            const normalizedDelta = delta * multiplier * zoom;
            const newZoom = zoom + normalizedDelta;

            const clampedZoom = getRestrictedZoom(newZoom);

            const wx = (x - camera.x) / zoom;
            const wy = (y - camera.y) / zoom;

            setCamera({
                x: x - wx * clampedZoom,
                y: y - wy * clampedZoom
            });

            setZoom(clampedZoom);
        } else {
            setCamera(prev => ({
                x: prev.x - e.deltaX,
                y: prev.y - e.deltaY,
            }));
        }
    }, [zoom, camera]);

    const onPointerDown = useCallback((
        e: React.PointerEvent,
    ) => {

        if (expired || activeTouches > 1) {
            return;
        }

        setIsEditing(false);
        setIsPointerDown(true);

        if (isMouseLeftButton(e)) {
            const point = pointerEventToCanvasPoint(e, cameraRef.current, zoomRef.current, svgRef);
            if (point && selectedLayersRef.current.length > 0) {
                const bounds = calculateBoundingBox(selectedLayersRef.current.map(id => liveLayers[id]));
                if (bounds && point.x > bounds.x &&
                    point.x < bounds.x + bounds.width &&
                    point.y > bounds.y &&
                    point.y < bounds.y + bounds.height) {
                    setCanvasState({ mode: CanvasMode.Translating, current: point });
                    setIsEditing(false);
                    return;
                }
            }

            removeHighlightFromText();
            unselectLayers();

            // and this is to just close the comment box when the user clicks anywhere else
            setOpenCommentBoxId(null);
            // when the user is inserting a comment and then clicks somewhere else, we close the comment preview
            if (currentPreviewLayer) {
                setCurrentPreviewLayer(null);
                return;
            }

            //.When inserting a comment layer and we click anywhere else with left click, we close the comment layer preview
            if (canvasState.mode === CanvasMode.Eraser) {
                setToolbarMenu(ToolbarMenu.None);
                return;
            }

            if (canvasState.mode === CanvasMode.Laser || canvasState.mode === CanvasMode.Pencil || canvasState.mode === CanvasMode.Highlighter) {
                setToolbarMenu(ToolbarMenu.None);
                startDrawing(point, e.pressure);
                return;
            }

            if (canvasState.mode === CanvasMode.Moving) {
                setStartPanPoint({ x: e.clientX, y: e.clientY });
                return;
            }

            if (canvasState.mode === CanvasMode.Inserting) {
                // If the layer type is comment, set the current preview layer to the comment layer (we insert it once the user writes something)
                if (canvasState.layerType === LayerType.Comment) {
                    const commentSize = 36;
                    setCurrentPreviewLayer({
                        type: LayerType.Comment,
                        x: point.x,
                        y: point.y - commentSize,
                        width: commentSize,
                        height: commentSize,
                        author: {
                            userId: User.userId,
                            information: {
                                name: User.information.name,
                                picture: User.information.picture,
                            }
                        },
                        content: '',
                        createdAt: new Date(),
                    })
                    return;
                }

                setStartPanPoint(point);
                return;
            }

            setCanvasState({ origin: point, mode: CanvasMode.Pressing });
        } else if (isMouseRightButton(e) || isMouseMiddleButton(e)) {
            setPresentationMode(false);
            setStartPanPoint({ x: e.clientX, y: e.clientY });
        }

        if (selectedLayersRef.current.length > 0) {
            if (socket) {
                socket.emit('layer-update', selectedLayersRef.current, liveLayers);
            }
        }
    }, [canvasState.mode, setCanvasState, startDrawing, activeTouches, expired, unselectLayers, liveLayers, socket, setPresentationMode, User, zoom, setCurrentPreviewLayer, currentPreviewLayer, setIsEditing]);

    const onPointerMove = useCallback((e: React.PointerEvent) => {
        e.preventDefault();

        if (activeTouches > 1) {
            setPencilDraft([]);
            return;
        }

        if (focusMode || presentationMode) {
            setLastMouseMove(Date.now());
            setShowToolbar(true);
        }

        setIsTranslatingLayers(false);
        if (isMouseRightButton(e) || isMouseMiddleButton(e)) {
            const newCameraPosition = {
                x: camera.x + e.clientX - startPanPoint.x,
                y: camera.y + e.clientY - startPanPoint.y,
            };
            setCamera(newCameraPosition);
            setStartPanPoint({ x: e.clientX, y: e.clientY });
            setCanvasState({ mode: CanvasMode.Moving });
            return;
        }

        const current = pointerEventToCanvasPoint(e, cameraRef.current, zoomRef.current, svgRef);
        setMousePosition(current);
        updatePresence({ cursor: { x: current.x, y: current.y } });

        if (canvasState.mode === CanvasMode.Moving) {
            const newCameraPosition = {
                x: camera.x + e.clientX - startPanPoint.x,
                y: camera.y + e.clientY - startPanPoint.y,
            };
            setCamera(newCameraPosition);
            setStartPanPoint({ x: e.clientX, y: e.clientY });
        }

        if (isMouseLeftButton(e)) {
            const borderThreshold = 2;
            const moveSpeed = 5;

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

        if (canvasState.mode === CanvasMode.Pressing) {
            startMultiSelection(current, canvasState.origin);
        } else if (canvasState.mode === CanvasMode.SelectionNet) {
            updateSelectionNet(current, canvasState.origin);
        } else if (canvasState.mode === CanvasMode.Eraser && isMouseLeftButton(e)) {
            EraserDeleteLayers(current);
        } else if (canvasState.mode === CanvasMode.Translating) {
            translateSelectedLayers(e, current);
        } else if (canvasState.mode === CanvasMode.Resizing) {
            resizeSelectedLayers(current);
            removeHighlightFromText();
        } else if (canvasState.mode === CanvasMode.ArrowResizeHandler) {
            resizeSelectedLayers(current);
        } else if ([CanvasMode.Pencil, CanvasMode.Laser, CanvasMode.Highlighter].includes(canvasState.mode)) {
            continueDrawing(current, e);
        } else if (
            isMouseLeftButton(e) &&
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
        [continueDrawing, camera, canvasState, resizeSelectedLayers, translateSelectedLayers, startMultiSelection, updateSelectionNet, setCamera, zoom, startPanPoint, activeTouches, EraserDeleteLayers, arrowTypeInserting, currentPreviewLayer, liveLayerIds, liveLayers, focusMode, setLastMouseMove, presentationMode, updatePresence]);

    const onPointerUp = useCallback((e: React.PointerEvent) => {
        setIsPointerDown(false);
        const point = pointerEventToCanvasPoint(e, camera, zoom, svgRef);

        if (
            canvasState.mode === CanvasMode.None ||
            canvasState.mode === CanvasMode.Pressing
        ) {
            setCanvasState({
                mode: CanvasMode.None,
            });
        } else if (canvasState.mode === CanvasMode.Pencil) {
            insertPath(false);
        } else if (canvasState.mode === CanvasMode.Highlighter) {
            insertPath(true);
        } else if (canvasState.mode === CanvasMode.Laser) {
            setPencilDraft([]);
            updatePresence({ pencilDraft: null });
        } else if (canvasState.mode === CanvasMode.Eraser) {
            setErasePath([]);
            if (layersToDeleteEraserRef.current.size > 0) {
                const command = new DeleteLayerCommand(Array.from(layersToDeleteEraserRef.current), initialLayers, liveLayerIds, setLiveLayers, setLiveLayerIds, boardId, socket);
                performAction(command);
                layersToDeleteEraserRef.current.clear();
                return;
            }
            return;
        } else if (canvasState.mode === CanvasMode.Inserting) {
            const layerType = canvasState.layerType;

            if (canvasState.layerType === LayerType.Comment) {
                // we handle the comment layer insert in the comment component
                return;
            }

            if (currentPreviewLayer) {
                if (layerType === LayerType.Arrow && currentPreviewLayer.type === LayerType.Arrow
                    || layerType === LayerType.Line && currentPreviewLayer.type === LayerType.Line
                ) {
                    insertLayer(layerType, { x: currentPreviewLayer.x, y: currentPreviewLayer.y }, currentPreviewLayer.width, currentPreviewLayer.height, currentPreviewLayer.center, currentPreviewLayer.startConnectedLayerId, currentPreviewLayer.endConnectedLayerId, currentPreviewLayer.arrowType, currentPreviewLayer.orientation)
                } else {
                    insertLayer(layerType, { x: currentPreviewLayer.x, y: currentPreviewLayer.y }, currentPreviewLayer.width, currentPreviewLayer.height);
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
                    if (layer.type !== LayerType.Arrow && layer.type !== LayerType.Line && layer.type !== LayerType.Path && layer.type !== LayerType.Comment && selectedLayersRef.current.length === 1) {
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
            setCanvasState({
                mode: CanvasMode.None,
            });
        }

        if (e.pointerType !== "mouse") {
            setPencilDraft([]);
            updatePresence({ cursor: null, pencilDraft: null });
            return;
        }

        if (selectedLayersRef.current.length === 0) {
            updatePresence({ selection: [], pencilDraft: null });
        }
    },
        [
            setCanvasState,
            canvasState,
            insertLayer,
            insertPath,
            selectedLayersRef,
            liveLayers,
            camera,
            zoom,
            socket,
            currentPreviewLayer,
            initialLayers,
            boardId,
            liveLayerIds,
            performAction,
            setLiveLayerIds,
            setLiveLayers,
            updatePresence
        ]);

    const onPointerLeave = useCallback((e: any) => {
        if (e.pointerType !== "mouse") {
            return;
        }

        updatePresence({ cursor: null });
    }, [updatePresence]);

    const onLayerPointerDown = useCallback((e: React.PointerEvent, layerId: string) => {
        if (
            canvasStateRef.current.mode === CanvasMode.Pencil ||
            canvasStateRef.current.mode === CanvasMode.Inserting ||
            canvasStateRef.current.mode === CanvasMode.Moving ||
            canvasStateRef.current.mode === CanvasMode.Eraser ||
            canvasStateRef.current.mode === CanvasMode.Laser ||
            canvasStateRef.current.mode === CanvasMode.Highlighter ||
            (isMouseRightButton(e)) ||
            expired === true
        ) {
            return;
        }

        e.stopPropagation();
        const point = pointerEventToCanvasPoint(e, cameraRef.current, zoomRef.current, svgRef);
        setCanvasState({ mode: CanvasMode.Translating, current: point });
        setIsEditing(false);

        if (selectedLayersRef.current.includes(layerId)) {
            return;
        }

        let newSelection: string[]

        if (e.ctrlKey || e.metaKey) {
            newSelection = [...selectedLayersRef.current, layerId];
        } else {
            newSelection = [layerId];
        }

        selectedLayersRef.current = newSelection;
        updatePresence({ selection: newSelection, cursor: point });
    }, [selectedLayersRef, expired, setIsEditing]);

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
        setActiveTouches(e.touches.length);

        if (e.touches.length > 1) {
            selectedLayersRef.current = [];
        }

        // Reset pinch and pan values at the start of a new touch interaction
        setPinchStartDist(null);
        setStartMobilePanPoint(null);
    }, []);

    const onTouchMove = useCallback((e: React.TouchEvent) => {
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
            setStartMobilePanPoint({ x, y });
            return;
        }

        const isZooming = Math.abs(dist - pinchStartDist) > 10;

        if (isZooming) { // Zooming
            const zoomSpeed = 1;
            const zoomFactor = dist / pinchStartDist;
            const targetZoom = zoom * zoomFactor;
            const newZoom = zoom + (targetZoom - zoom) * zoomSpeed;

            const clampedZoom = getRestrictedZoom(newZoom);

            const zoomRatio = clampedZoom / zoom;
            const newX = x - (x - camera.x) * zoomRatio;
            const newY = y - (y - camera.y) * zoomRatio;

            setZoom(clampedZoom);
            setCamera({ x: newX, y: newY });
        } else if (startMobilePanPoint) { // Panning
            const dx = x - startMobilePanPoint.x;
            const dy = y - startMobilePanPoint.y;

            const newCameraPosition = {
                x: camera.x + dx,
                y: camera.y + dy,
            };

            setCamera(newCameraPosition);
        }

        setPinchStartDist(dist);
        setStartMobilePanPoint({ x, y });
    }, [zoom, pinchStartDist, camera, startMobilePanPoint]);

    const onTouchEnd = useCallback((e: React.TouchEvent) => {
        setActiveTouches(e.changedTouches.length);

        // Reset pinch and pan values when the touch interaction ends
        if (e.touches.length < 2) {
            setPinchStartDist(null);
        }
        if (e.touches.length === 0) {
            setStartMobilePanPoint(null);
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
            } else if (layer.type !== LayerType.Line && layer.type !== LayerType.Comment && layer.connectedArrows) {
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

    const deleteLayers = useCallback((layerIds: string[]) => {
        const command = new DeleteLayerCommand(layerIds, liveLayers, liveLayerIds, setLiveLayers, setLiveLayerIds, boardId, socket);
        performAction(command, true);
    }, [liveLayers, liveLayerIds, setLiveLayers, setLiveLayerIds, boardId, socket, performAction]);

    const forceUpdateLayerLocalLayerState = useCallback((layerId: string, updatedLayer: Layer) => {
        const updatedLayers = { ...liveLayers };
        updatedLayers[layerId] = updatedLayer;
        setLiveLayers(updatedLayers);
    }, [liveLayers, setLiveLayers]);

    useEffect(() => {
        const onPointerDown = (e: PointerEvent) => {
            const deepCopy = JSON.parse(JSON.stringify(liveLayers));
            setInitialLayers(deepCopy);
            setIsArrowPostInsertMenuOpen(false);
            if (isMouseRightButton(e) || isMouseMiddleButton(e)) {
                setStartPanPoint({ x: e.clientX, y: e.clientY });
            }
        }

        document.addEventListener('pointerdown', onPointerDown);

        return () => {
            document.removeEventListener('pointerdown', onPointerDown);
        }
    }, [liveLayers]);

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

        if (!isPointerDown) {
            return;
        }

        if (presentationMode ||
            (canvasState.mode !== CanvasMode.Inserting &&
                canvasState.mode !== CanvasMode.Translating &&
                canvasState.mode !== CanvasMode.SelectionNet
            )) {
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
    }, [isNearBorder, borderMove, setCamera, canvasState.mode, presentationMode, isPointerDown]);

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
        const updateCursor = async () => {
            if (canvasState.mode === CanvasMode.Inserting) {
                selectedLayersRef.current = [];
                if (canvasState.layerType === LayerType.Text) {
                    const fillColor = document.documentElement.classList.contains("dark") ? '#ffffff' : '#000000';
                    const cursorStyle = await setCursorWithFill('/custom-cursors/text-cursor.svg', fillColor, 8, 0);
                    setCanvasCursor(cursorStyle);
                } else if (canvasState.layerType === LayerType.Note) {
                    setCanvasCursor('url(/custom-cursors/add-note.svg) 10 10, auto');
                } else if (canvasState.layerType === LayerType.Comment) {
                    setCanvasCursor('url(/custom-cursors/add-comment.svg) 4 16, auto');
                } else {
                    const fillColor = document.documentElement.classList.contains("dark") ? '#ffffff' : '#000000';
                    const cursorStyle = await setCursorWithFill('/custom-cursors/inserting.svg', fillColor, 10, 10);
                    setCanvasCursor(cursorStyle);
                }
            } else if (canvasState.mode === CanvasMode.Pencil) {
                setCanvasCursor('url(/custom-cursors/pencil.svg) 1 16, auto');
                selectedLayersRef.current = [];
            } else if (canvasState.mode === CanvasMode.Highlighter) {
                const cursorUrl = HighlighterIcon.getCursor(colorToCss(highlighterColor));
                setCanvasCursor(`url(${cursorUrl}) 2 18, auto`);
                selectedLayersRef.current = [];
            } else if (canvasState.mode === CanvasMode.Laser) {
                setCanvasCursor('url(/custom-cursors/laser.svg) 4 18, auto');
                selectedLayersRef.current = [];
            } else if (canvasState.mode === CanvasMode.Eraser) {
                setCanvasCursor('url(/custom-cursors/eraser.svg) 8 16, auto');
                selectedLayersRef.current = [];
            } else if (canvasState.mode === CanvasMode.Moving) {
                setCanvasCursor('url(/custom-cursors/grab.svg) 12 12, auto');
            } else if (canvasState.mode === CanvasMode.ArrowResizeHandler) {
                setCanvasCursor('url(/custom-cursors/grab.svg) 12 12, auto');
            } else if (canvasState.mode === CanvasMode.Translating) {
                setCanvasCursor('move');
            } else {
                setCanvasCursor('default');
            }
        }

        updateCursor();
    }, [canvasState, setIsEditing, highlighterColor]);

    const goToFrame = useCallback((index: number) => {
        const totalFrames = frameIds.length;
        if (totalFrames === 0) return;

        const safeIndex = Math.max(0, Math.min(index, totalFrames - 1));

        const frameId = frameIds[safeIndex];
        const frame = liveLayers[frameId] as FrameLayer;

        MoveCameraToLayer({
            targetX: frame.x,
            targetY: frame.y,
            targetWidth: frame.width,
            targetHeight: frame.height,
            setCamera,
            setZoom,
            padding: 0.95,
            toolbarHeight: 40,
            duration: 0
        });

        setCurrentFrameIndex(safeIndex);
    }, [setZoom, setCamera, liveLayers, frameIds]);

    const goToNextFrame = useCallback(() => {
        goToFrame(currentFrameIndex + 1);
    }, [currentFrameIndex, goToFrame]);

    const goToPreviousFrame = useCallback(() => {
        goToFrame(currentFrameIndex - 1);
    }, [currentFrameIndex, goToFrame]);

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
                        setCanvasState({ mode: CanvasMode.Inserting, layerType: LayerType.Comment });
                    }
                }
            } else if (key === "v") {
                if (!isInsideTextArea && (e.ctrlKey || e.metaKey)) {
                    e.preventDefault();

                    navigator.clipboard.read().then(async items => {
                        let hasImage = false;
                        let hasText = false;

                        for (const item of items) {
                            if (item.types.includes('image/png') || item.types.includes('image/jpeg')) {
                                hasImage = true;
                                try {
                                    const blob = await item.getType('image/png');
                                    const file = new File([blob], `clipboard_${nanoid()}.png`, { type: "image/png" });

                                    // Use the same upload function as drag & drop
                                    uploadFilesAndInsertThemIntoCanvas(
                                        [file],
                                        org,
                                        User,
                                        zoom,
                                        mousePosition.x,
                                        mousePosition.y,
                                        insertMedia
                                    );
                                    break;
                                } catch (err) {
                                    console.error("Error processing image from clipboard:", err);
                                    toast.error("Failed to process image from clipboard");
                                }
                                break;
                            }
                        }

                        if (!hasImage && !hasText && copiedLayerIds.length > 0) {
                            pasteCopiedLayers(mousePosition);
                        }
                    }).catch(err => {
                        console.error("Error accessing clipboard:", err);
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
                        updatePresence({ selection: liveLayerIds });
                        setForceSelectionBoxRender(!forceSelectionBoxRender);
                    } else {
                        setCanvasState({ mode: CanvasMode.Inserting, layerType: LayerType.Arrow });
                    }
                }
            } else if (key === "escape") {
                if (presentationMode) {
                    setPresentationMode(false);
                    toast.success("Exited presentation mode");
                }
            } else if (key === "tab") {
                if (expired) {
                    e.preventDefault();
                    return;
                }
            } else if (key === "backspace" || key === "delete") {
                if (selectedLayersRef.current.length > 0 && !isInsideTextArea) {
                    deleteLayers(selectedLayersRef.current);
                }
            } else if (!isInsideTextArea) {
                if (key === "s") {
                    setCanvasState({ mode: CanvasMode.None })
                } else if (key === "d") {
                    setCanvasState({ mode: CanvasMode.Pencil });
                } else if (key === "e") {
                    setCanvasState({ mode: CanvasMode.Eraser });
                } else if (key === "h") {
                    setCanvasState({ mode: CanvasMode.Highlighter });
                } else if (key === "l") {
                    setCanvasState({ mode: CanvasMode.Laser });
                } else if (key === "n") {
                    setCanvasState({ mode: CanvasMode.Inserting, layerType: LayerType.Note });
                } else if (key === "t") {
                    setCanvasState({ mode: CanvasMode.Inserting, layerType: LayerType.Text });
                } else if (key === "r") {
                    setCanvasState({ mode: CanvasMode.Inserting, layerType: LayerType.Rectangle });
                } else if (key === "f") {
                    setCanvasState({ mode: CanvasMode.Inserting, layerType: LayerType.Frame });
                } else if (key === "k") {
                    setCanvasState({ mode: CanvasMode.Laser });
                } else if (key === "arrowup" || key === "arrowdown" || key === "arrowleft" || key === "arrowright") {
                    if (presentationMode) {
                        if (key === "arrowright") {
                            e.stopPropagation();
                            goToNextFrame();
                            return;
                        } else if (key === "arrowleft") {
                            e.stopPropagation();
                            goToPreviousFrame();
                            return;
                        }
                    }

                    if (selectedLayersRef.current.length > 0) {
                        const moveAmount = 1;
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
                        translateSelectedLayersWithDelta({ x: deltaX, y: deltaY });
                    }
                }
            }
        }

        function onKeyUp(e: KeyboardEvent) {
            const key = e.key.toLowerCase();

            if (presentationMode) {
                return;
            }

            if (key === "arrowup" || key === "arrowdown" || key === "arrowleft" || key === "arrowright") {
                if (canvasState.mode === CanvasMode.Translating) {
                    const command = new TranslateLayersCommand(selectedLayersRef.current, initialLayers, liveLayers, setLiveLayers, boardId, socket);
                    performAction(command);
                    setCanvasState({ mode: CanvasMode.None });
                }
            }
        }

        document.addEventListener("keydown", onKeyDown);
        document.addEventListener("keyup", onKeyUp);

        return () => {
            document.removeEventListener("keydown", onKeyDown);
            document.removeEventListener("keyup", onKeyUp);
        }

    }, [deleteLayers, insertMedia, copySelectedLayers, pasteCopiedLayers, socket, camera, zoom, liveLayers, copiedLayerIds, liveLayerIds, forceSelectionBoxRender, canvasState, presentationMode,
        boardId, history.length, mousePosition, performAction, redo, redoStack.length, setLiveLayerIds, setLiveLayers, undo, unselectLayers, expired, translateSelectedLayersWithDelta, initialLayers, goToNextFrame, goToPreviousFrame, User, org, updatePresence]);

    useEffect(() => {
        if (presentationMode) {

            if (frameIds && frameIds.length === 0) {
                toast.info("Add a frame to start presenting!");
                setPresentationMode(false);
                return;
            }

            if (currentFrameIndex === 0) {
                goToFrame(0);
            }
        } else {
            setCurrentFrameIndex(0);
        }
    }, [presentationMode, frameIds, goToFrame, currentFrameIndex]);


    // in presentation mode or if we are in focus mode we hide the toolbar
    useEffect(() => {
        if (!focusMode && !presentationMode) {
            setShowToolbar(true);
            return;
        }

        const hideToolbarTimer = setTimeout(() => {
            if (Date.now() - lastMouseMove > 3000) { // 3 seconds of inactivity
                setShowToolbar(false);
            }
        }, 3000);

        return () => clearTimeout(hideToolbarTimer);
    }, [focusMode, lastMouseMove, presentationMode]);

    return (
        <>
            <Background background={background} zoom={zoom} camera={camera} presentationMode={presentationMode} forcedRender={forceLayerPreviewRender} />
            <main
                className="fixed h-full w-full touch-none overscroll-none"
                style={{
                    WebkitOverflowScrolling: 'touch',
                    WebkitUserSelect: 'none',
                    touchAction: 'none',
                    contain: 'strict'
                }}
            >
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
                <div className="h-full w-full">
                    <div className="z-20 absolute h-full w-full pointer-events-none">
                        {/* We render the comment box first so its below the canvas overlay */}
                        {openCommentBoxId && (
                            <CommentBox
                                id={openCommentBoxId}
                                layer={liveLayers[openCommentBoxId] as CommentType}
                                setOpenCommentBoxId={setOpenCommentBoxId}
                                zoomRef={zoomRef}
                                cameraRef={cameraRef}
                                socket={socket}
                                boardId={boardId}
                                expired={expired}
                                user={User}
                                orgTeammates={filteredOrgTeammates}
                                deleteLayers={deleteLayers}
                                forceUpdateLayerLocalLayerState={forceUpdateLayerLocalLayerState}
                                isMoving={isTranslatingLayers}
                            />
                        )}
                        <Toolbar
                            pathColor={pathColor}
                            pathStrokeSize={pathStrokeSize}
                            highlighterColor={highlighterColor}
                            highlighterStrokeSize={highlighterStrokeSize}
                            setPathColor={setPathColor}
                            setPathStrokeSize={setPathStrokeSize}
                            setHighlighterColor={setHighlighterColor}
                            setHighlighterStrokeSize={setHighlighterStrokeSize}
                            canvasState={canvasState}
                            setCanvasState={setCanvasState}
                            org={org}
                            undo={undo}
                            redo={redo}
                            canUndo={history.length > 0}
                            canRedo={redoStack.length > 0}
                            arrowTypeInserting={arrowTypeInserting}
                            setArrowTypeInserting={setArrowTypeInserting}
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
                            showToolbar={showToolbar}
                            insertLayer={insertLayer}
                            toolbarMenu={toolbarMenu}
                            setToolbarMenu={setToolbarMenu}
                        />
                        {!presentationMode && canvasState.mode !== CanvasMode.Pencil && canvasState.mode !== CanvasMode.Eraser && canvasState.mode !== CanvasMode.Highlighter && canvasState.mode !== CanvasMode.Laser && (
                            <>
                                {!focusMode && (
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
                                            setForcedRender={setForceLayerPreviewRender}
                                            User={User}
                                            quickInserting={quickInserting}
                                            setQuickInserting={setQuickInserting}
                                            eraserDeleteAnyLayer={eraserDeleteAnyLayer}
                                            setEraserDeleteAnyLayer={setEraserDeleteAnyLayer}
                                        />
                                        <Participants
                                            org={org}
                                            otherUsers={otherUsers}
                                            User={User}
                                            socket={socket}
                                            expired={expired}
                                            board={board}
                                            setPresentationMode={setPresentationMode}
                                            setRightMiddleContainerView={setRightMiddleContainerView}
                                        />
                                    </>
                                )}
                                <BottomRightView
                                    zoom={zoom}
                                    setZoom={setZoom}
                                    setCamera={setCamera}
                                    camera={camera}
                                    focusMode={focusMode}
                                    setFocusMode={setFocusMode}
                                    setRightMiddleContainerView={setRightMiddleContainerView}
                                />
                                {/* this contains frames/comments preview */}
                                <RightMiddleContainer
                                    rightMiddleContainerView={rightMiddleContainerView}
                                    liveLayers={liveLayers}
                                    liveLayerIds={liveLayerIds}
                                    setLiveLayerIds={setLiveLayerIds}
                                    cameraRef={cameraRef}
                                    zoomRef={zoomRef}
                                    forcedRender={forceLayerPreviewRender}
                                    boardId={boardId}
                                    socket={socket}
                                    setPresentationMode={setPresentationMode}
                                    setRightMiddleContainerView={setRightMiddleContainerView}
                                    setCamera={setCamera}
                                    setZoom={setZoom}
                                    commentIds={commentIds}
                                    openCommentBoxId={openCommentBoxId}
                                    setOpenCommentBoxId={setOpenCommentBoxId}
                                    user={User}
                                    title={board.title}
                                />
                                <AddedLayerByLabel
                                    addedByLabel={addedByLabel}
                                />
                                <MoveBackToContent
                                    setCamera={setCamera}
                                    setZoom={setZoom}
                                    showButton={visibleLayerIds.length === 0 && liveLayerIds.length > 0}
                                    liveLayers={liveLayers}
                                    liveLayerIds={liveLayerIds}
                                    cameraRef={cameraRef}
                                    zoomRef={zoomRef}
                                />
                            </>
                        )}
                        {!IsArrowPostInsertMenuOpen && canvasState.mode !== CanvasMode.Resizing && canvasState.mode !== CanvasMode.ArrowResizeHandler && canvasState.mode !== CanvasMode.SelectionNet && activeTouches < 2 && (
                            <SelectionTools
                                boardId={boardId}
                                setLiveLayerIds={setLiveLayerIds}
                                setLiveLayers={setLiveLayers}
                                liveLayerIds={liveLayerIds}
                                liveLayers={liveLayers}
                                selectedLayers={selectedLayersRef.current.filter(layerId => liveLayers[layerId] && liveLayers[layerId].type !== LayerType.Comment)}
                                selectedLayersRef={selectedLayersRef}
                                zoom={zoom}
                                camera={camera}
                                socket={socket}
                                performAction={performAction}
                                org={org}
                                proModal={proModal}
                                updatePresence={updatePresence}
                                canvasState={canvasState.mode}
                                deleteLayers={deleteLayers}
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
                        style={{
                            cursor: canvasCursor,
                            contain: 'paint layout'
                        }}
                    >
                        <div 
                            className="z-10 pointer-events-auto" 
                            style={{
                                transform: `translate(${camera.x}px, ${camera.y}px) scale(${zoom})`,
                                transformOrigin: 'top left',
                                willChange: 'transform',
                            }}
                        >
                            {visibleLayerIds.map((layerId: string) => {
                                const layer = liveLayers[layerId];
                                const showOverlay = canvasState.mode === CanvasMode.None || canvasState.mode === CanvasMode.Pressing || canvasState.mode === CanvasMode.Translating;
                                if (layer && (layer.type === LayerType.Video || layer.type === LayerType.Link)) {
                                    return (
                                        <MediaPreview
                                            key={layerId}
                                            id={layerId}
                                            layer={layer}
                                            onPointerDown={onLayerPointerDown}
                                            showOverlay={showOverlay}
                                        />
                                    );
                                }
                            })}
                        </div>
                        <div className="z-20 relative pointer-events-none">
                            <svg
                                ref={svgRef}
                                className="h-[100vh] w-[100vw]"
                                viewBox={`0 0 ${window.innerWidth} ${window.innerHeight}`}
                            >
                                <defs >
                                    <filter id="drop-shadow" x="-20%" y="-20%" width="140%" height="140%">
                                        <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="rgba(0, 0, 0, 0.25)" />
                                    </filter>
                                </defs>
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
                                    {/* We render the frames first so they are always shown below the other layers */}
                                    {visibleLayerIds.filter(layerId => liveLayers[layerId] && liveLayers[layerId].type === LayerType.Frame).map((frameId: string) => {
                                        const frameNumber = liveLayerIds.filter(id => liveLayers[id] && liveLayers[id].type === LayerType.Frame).indexOf(frameId) + 1;
                                        const showOutlineOnHover = (canvasState.mode === CanvasMode.None || canvasState.mode === CanvasMode.Moving || (canvasState.mode === CanvasMode.Inserting && canvasState.layerType === LayerType.Arrow)) && !presentationMode;
                                        const isFocused = selectedLayersRef.current.length === 1 && selectedLayersRef.current[0] === frameId && !justChanged;

                                        return (
                                            <Frame
                                                key={frameId}
                                                id={frameId}
                                                layer={liveLayers[frameId] as FrameLayer}
                                                onPointerDown={onLayerPointerDown}
                                                frameNumber={frameNumber}
                                                expired={expired}
                                                socket={socket}
                                                boardId={boardId}
                                                forcedRender={forceLayerPreviewRender}
                                                showOutlineOnHover={showOutlineOnHover}
                                                setAddedByLabel={setAddedByLabel}
                                                focused={isFocused}
                                            />
                                        );
                                    })}
                                    {visibleLayerIds.map((layerId: string) => {
                                        const isFocused = selectedLayersRef.current.length === 1 && selectedLayersRef.current[0] === layerId && !justChanged;
                                        const showOutlineOnHover = (canvasState.mode === CanvasMode.None || canvasState.mode === CanvasMode.Moving || (canvasState.mode === CanvasMode.Inserting && canvasState.layerType === LayerType.Arrow)) && !presentationMode;
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
                                                showOutlineOnHover={showOutlineOnHover}
                                                setAddedByLabel={setAddedByLabel}
                                                orgTeammates={filteredOrgTeammates}
                                                forceUpdateLayerLocalLayerState={forceUpdateLayerLocalLayerState}
                                            />
                                        );
                                    })}
                                    <SelectionBox
                                        zoom={zoom}
                                        liveLayers={liveLayers}
                                        selectedLayers={selectedLayersRef.current.filter(layerId => liveLayers[layerId] && liveLayers[layerId].type !== LayerType.Comment)}
                                        onResizeHandlePointerDown={onResizeHandlePointerDown}
                                        onArrowResizeHandlePointerDown={onArrowResizeHandlePointerDown}
                                        setLiveLayers={setLiveLayers}
                                        forceRender={forceSelectionBoxRender}
                                        setCurrentPreviewLayer={setCurrentPreviewLayer}
                                        mousePosition={mousePosition}
                                        setCanvasState={setCanvasState}
                                        setStartPanPoint={setStartPanPoint}
                                        setArrowTypeInserting={setArrowTypeInserting}
                                        showHandles={activeTouches < 2 && canvasState.mode !== CanvasMode.ArrowResizeHandler}
                                    />
                                    {currentPreviewLayer && currentPreviewLayer.type !== LayerType.Comment && (
                                        <CurrentPreviewLayer
                                            layer={currentPreviewLayer}
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
                                        <SelectionNet
                                            origin={canvasState.origin}
                                            current={canvasState.current}
                                            zoom={zoom}
                                        />
                                    )}
                                    <>
                                        {/* This approach is just to make sure the hovered comment is always on top of the other comments */}
                                        {commentIds.filter((commentId) => commentId !== activeHoveredCommentId).map((commentId) => (
                                            <Comment
                                                key={commentId}
                                                id={commentId}
                                                layer={liveLayers[commentId] as CommentType}
                                                zoom={zoom}
                                                onPointerDown={onLayerPointerDown}
                                                selectionColor={layerIdsToColorSelection[commentId]}
                                                isCommentBoxOpen={openCommentBoxId === commentId}
                                                setOpenCommentBoxId={setOpenCommentBoxId}
                                                user={User}
                                                orgTeammates={filteredOrgTeammates}
                                                isMoving={isTranslatingLayers}
                                                setActiveHoveredCommentId={setActiveHoveredCommentId}
                                            />
                                        ))}

                                        {/* Render the hovered comment again on top */}
                                        {activeHoveredCommentId && (
                                            <Comment
                                                id={activeHoveredCommentId}
                                                layer={liveLayers[activeHoveredCommentId] as CommentType}
                                                zoom={zoom}
                                                onPointerDown={onLayerPointerDown}
                                                selectionColor={layerIdsToColorSelection[activeHoveredCommentId]}
                                                isCommentBoxOpen={openCommentBoxId === activeHoveredCommentId}
                                                setOpenCommentBoxId={setOpenCommentBoxId}
                                                user={User}
                                                orgTeammates={filteredOrgTeammates}
                                                isMoving={isTranslatingLayers}
                                                setActiveHoveredCommentId={setActiveHoveredCommentId}
                                            />
                                        )}
                                    </>
                                    {/* We render the comment preview here so its above every layer and the existing comments */}
                                    {currentPreviewLayer && currentPreviewLayer.type === LayerType.Comment && (
                                        <CommentPreview
                                            layer={currentPreviewLayer}
                                            zoom={zoom}
                                            insertLayer={insertLayer}
                                            orgTeammates={filteredOrgTeammates}
                                        />
                                    )}
                                    {
                                        pencilDraft.length > 0 && !pencilDraft.some(array => array.some(isNaN)) && (
                                            <Path
                                                points={pencilDraft}
                                                fill={canvasState.mode === CanvasMode.Highlighter ? colorToCss(highlighterColor) : colorToCss(pathColor)}
                                                x={0}
                                                y={0}
                                                strokeSize={canvasState.mode === CanvasMode.Highlighter ? highlighterStrokeSize : pathStrokeSize}
                                                isLaser={canvasState.mode === CanvasMode.Laser}
                                                isHighlighter={canvasState.mode === CanvasMode.Highlighter}
                                                zoom={zoom}
                                            />
                                        )
                                    }
                                    {otherUsers &&
                                        <CursorsPresence otherUsers={otherUsers} zoom={zoom} />
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