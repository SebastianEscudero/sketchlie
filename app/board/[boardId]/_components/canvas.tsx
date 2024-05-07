"use client";

import { customAlphabet } from "nanoid";
import { useCallback, useMemo, useState, useEffect, useRef } from "react";

import {
    colorToCss,
    connectionIdToColor,
    findIntersectingLayersWithRectangle,
    penPointsToPathLayer,
    resizeArrowBounds,
    pointerEventToCanvasPoint,
    resizeBounds,
} from "@/lib/utils";

import {
    ArrowHandle,
    Camera,
    CanvasMode,
    CanvasState,
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
import { getMaxCapas } from "@/lib/planLimits";
import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { CurrentPreviewLayer } from "./current-preview-layer";
import { useRoom } from "@/components/room";

const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const nanoid = customAlphabet(alphabet, 21);

interface CanvasProps {
    boardId: any;
};

export const Canvas = ({
    boardId,
}: CanvasProps) => {
    const mousePositionRef = useRef({ x: 0, y: 0 });
    const { liveLayers, liveLayerIds, User, otherUsers, setLiveLayers, setLiveLayerIds, org, socket, board } = useRoom();
    const selectedLayersRef = useRef<string[]>([]);
    const [zoom, setZoom] = useState(1);
    const [copiedLayers, setCopiedLayers] = useState<Map<string, any>>(new Map());
    const [pencilDraft, setPencilDraft] = useState<[number, number, number][]>([]);
    const [textRef, setTextRef] = useState<any>(null);
    const [canvasState, setCanvasState] = useState<CanvasState>({
        mode: CanvasMode.None,
    });
    const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 });
    const [isPanning, setIsPanning] = useState(false);
    const [rightClickPanning, setIsRightClickPanning] = useState(false);
    const [startPanPoint, setStartPanPoint] = useState({ x: 0, y: 0 });
    const [selectedImage, setSelectedImage] = useState<string>("");
    const [isUploading, setIsUploading] = useState(false);
    const [currentPreviewLayer, setCurrentPreviewLayer] = useState<PreviewLayer | null>(null);
    const [myPresence, setMyPresence] = useState<Presence | null>(null);
    const updateLayerMutation = useRef(useApiMutation(api.board.updateLayer).mutate);
    const addLayerMutation = useRef(useApiMutation(api.board.addLayer).mutate);
    const deleteLayerMutation = useRef(useApiMutation(api.board.deleteLayer).mutate);
    const addLayer = useCallback((args: { boardId: string; layer: any; layerId: string; }) => addLayerMutation.current(args), []);
    const updateLayer = useCallback((args: { boardId: string; layerId: any; layerUpdates: any; }) => updateLayerMutation.current(args), []);
    const deleteLayer = useCallback((args: { boardId: string; layerId: any; }) => deleteLayerMutation.current(args), []);
    const proModal = useProModal();

    useDisableScrollBounce();

    const insertLayer = useCallback((layerType: LayerType, position: Point, width: number, height: number, center?: Point) => {
        if (org && liveLayerIds.length >= getMaxCapas(org)) {
            proModal.onOpen();
            return;
        }

        const layerId = nanoid();

        let layer;
        let fillColor = { r: 0, g: 0, b: 0, a: 0 }
        if (layerType === LayerType.Note) {
            fillColor = { r: 255, g: 249, b: 177, a: 1 }
        }

        if (layerType === LayerType.Text) {

            if (width < 130) {
                width = 130;
            }

            layer = {
                type: layerType,
                x: position.x,
                y: position.y,
                height: height,
                width: width,
                fill: fillColor,
                textFontSize: 12,
            };
        } else if (layerType === LayerType.Note) {
            layer = {
                type: layerType,
                x: position.x,
                y: position.y,
                height: height,
                width: width,
                fill: fillColor,
                textFontSize: 12,
            };
        } else if (layerType === LayerType.Arrow) {
            layer = {
                type: layerType,
                x: position.x,
                y: position.y,
                center: center,
                height: height,
                width: width,
                fill: fillColor,
            };
        } else {
            layer = {
                type: layerType,
                x: position.x,
                y: position.y,
                height: height,
                width: width,
                fill: fillColor,
            };
        }

        const newLayers = { ...liveLayers, [layerId]: layer };
        const newLayerIds = [...liveLayerIds, layerId];

        if (layer.type !== LayerType.Text) {
            selectedLayersRef.current = [layerId];
        }
        setLiveLayerIds(newLayerIds);
        setLiveLayers(newLayers as Layers);

        const newPresence: Presence = {
            ...myPresence,
            selection: [layerId]
        };

        setMyPresence(newPresence);

        if (socket) {
            socket.emit('presence', myPresence, User.userId);
            socket.emit('layer-update', layerId, layer);
        }

        addLayer({
            boardId: boardId,
            layerId: layerId,
            layer: layer
        })
        setCanvasState({ mode: CanvasMode.None });
    }, [liveLayers, liveLayerIds, myPresence, socket, org, proModal, User.userId, setLiveLayers, setLiveLayerIds, boardId, addLayer]);

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
            socket.emit('layer-update', layerId, layer);
        }

        addLayer({
            boardId: boardId,
            layerId: layerId,
            layer: layer
        })

        setCanvasState({ mode: CanvasMode.None });
    }, [liveLayers, liveLayerIds, myPresence, socket, org, proModal, User.userId, setLiveLayers, setLiveLayerIds, boardId, addLayer]);

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

        selectedLayersRef.current.forEach(id => {
            const layer = newLayers[id];

            if (layer) {
                const newLayer = { ...layer };
                newLayer.x += offset.x;
                newLayer.y += offset.y;
                if (layer.type === LayerType.Arrow && 'center' in newLayer && newLayer.center) {
                    newLayer.center.x += offset.x;
                    newLayer.center.y += offset.y
                }
                updatedLayers.push(newLayer);
                newLayers[id] = newLayer;
            }
        });

        if (socket) {
            socket.emit('layer-update', selectedLayersRef.current, updatedLayers);
        }

        setLiveLayers(newLayers);
        setCanvasState({ mode: CanvasMode.Translating, current: point });
    }, [canvasState, selectedLayersRef.current, setCanvasState, setLiveLayers, socket, liveLayers]);

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
        liveLayers[id] = penPointsToPathLayer(pencilDraft, { r: 0, g: 0, b: 0, a: 0 });

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
    }, [pencilDraft, liveLayers, setLiveLayers, setLiveLayerIds, myPresence, org, proModal, liveLayerIds, socket, boardId, addLayer]);

    const resizeSelectedLayer = useCallback((point: Point) => {
        const layer = liveLayers[selectedLayersRef.current[0]];
        let bounds

        if (canvasState.mode === CanvasMode.Resizing) {
            if (layer.type === LayerType.Text) {
                bounds = resizeBounds(
                    layer?.type,
                    canvasState.initialBounds,
                    canvasState.corner,
                    point,
                    textRef,
                    layer,
                );
            } else {
                bounds = resizeBounds(
                    layer?.type,
                    canvasState.initialBounds,
                    canvasState.corner,
                    point,
                );
            }
        } else if (canvasState.mode === CanvasMode.ArrowResizeHandler) {
            bounds = resizeArrowBounds(
                canvasState.initialBounds,
                point,
                canvasState.handle,
            );
        } else {
            return;
        }

        if (layer) {
            if (layer.type === LayerType.Note) {
                bounds.textFontSize = layer.textFontSize;
            }
            Object.assign(layer, bounds);
            liveLayers[selectedLayersRef.current[0]] = layer;
            setLiveLayers({ ...liveLayers });

            if (socket) {
                socket.emit('layer-update', selectedLayersRef.current[0], layer);
            }

        }

    }, [canvasState, liveLayers, selectedLayersRef, socket, textRef]);

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

        let newZoom = zoom;
        if (e.deltaY < 0) {
            newZoom = Math.min(zoom * 1.1, 3.5);
        } else {
            newZoom = Math.max(zoom / 1.1, 0.3);
        }

        const zoomFactor = newZoom / zoom;
        const newX = x - (x - camera.x) * zoomFactor;
        const newY = y - (y - camera.y) * zoomFactor;

        setZoom(newZoom);
        setCamera({ x: newX, y: newY });
    }, [zoom, camera]);

    const onPointerDown = useCallback((
        e: React.PointerEvent,
    ) => {
        const point = pointerEventToCanvasPoint(e, camera, zoom);

        if (e.button === 0) {
            if (canvasState.mode === CanvasMode.Moving) {
                setIsPanning(true);
                setStartPanPoint({ x: e.clientX, y: e.clientY });
                document.body.style.cursor = 'url(/custom-cursors/grab.svg) 8 8, auto';
                return;
            }

            if (canvasState.mode === CanvasMode.Inserting) {
                const point = pointerEventToCanvasPoint(e, camera, zoom);
                setStartPanPoint(point);
                setIsPanning(false);
                return;
            }

            if (canvasState.mode === CanvasMode.Pencil) {
                startDrawing(point, e.pressure);
                return;
            }

            setCanvasState({ origin: point, mode: CanvasMode.Pressing });
        } else if (e.button === 2 || e.button === 1) {
            setIsRightClickPanning(true);
            setStartPanPoint({ x: e.clientX, y: e.clientY });
            document.body.style.cursor = 'url(/custom-cursors/grab.svg) 8 8, auto';
        }
    }, [camera, canvasState.mode, setCanvasState, startDrawing, setIsPanning, setIsRightClickPanning, zoom]);


    const onPointerMove = useCallback((e: React.PointerEvent) => {
        e.preventDefault();

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

        const current = pointerEventToCanvasPoint(e, camera, zoom);

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
        } else if (canvasState.mode === CanvasMode.Translating) {
            translateSelectedLayers(current);
        } else if (canvasState.mode === CanvasMode.Resizing) {
            resizeSelectedLayer(current);
        } else if (canvasState.mode === CanvasMode.ArrowResizeHandler) {
            resizeSelectedLayer(current);
        } else if (canvasState.mode === CanvasMode.Pencil) {
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
            const widthArrow = point.x - startPanPoint.x;
            const heightArrow = point.y - startPanPoint.y;
            const x = Math.min(point.x, startPanPoint.x);
            const y = Math.min(point.y, startPanPoint.y);
            const width = Math.abs(point.x - startPanPoint.x);
            const height = Math.abs(point.y - startPanPoint.y);
            setIsPanning(true);

            switch (canvasState.layerType) {
                case LayerType.Rectangle:
                    setCurrentPreviewLayer({ x, y, width, height, type: LayerType.Rectangle, fill: { r: 0, g: 0, b: 0, a: 0 } });
                    break;
                case LayerType.Ellipse:
                    setCurrentPreviewLayer({ x, y, width, height, type: LayerType.Ellipse, fill: { r: 0, g: 0, b: 0, a: 0 } });
                    break;
                case LayerType.Text:
                    setCurrentPreviewLayer({ x, y, width, height: 20, type: LayerType.Rectangle, fill: { r: 0, g: 0, b: 0, a: 0 } });
                    break;
                case LayerType.Note:
                    setCurrentPreviewLayer({ x, y, width, height, textFontSize: 12, type: LayerType.Note, fill: { r: 255, g: 249, b: 177, a: 1 } });
                    break;
                case LayerType.Arrow:
                    setCurrentPreviewLayer({
                        x: startPanPoint.x,
                        y: startPanPoint.y,
                        center: { x: startPanPoint.x + widthArrow / 2, y: startPanPoint.y + heightArrow / 2 },
                        width: widthArrow,
                        height: heightArrow,
                        type: LayerType.Arrow,
                        fill: { r: 0, g: 0, b: 0, a: 0 }
                    });
            }
        }
    },
        [continueDrawing, camera, canvasState, resizeSelectedLayer, translateSelectedLayers, startMultiSelection, updateSelectionNet, isPanning, rightClickPanning, setCamera, User.userId, zoom, myPresence, startPanPoint]);

    const onPointerUp = useCallback((e: React.PointerEvent) => {
        setIsRightClickPanning(false);
        const point = pointerEventToCanvasPoint(e, camera, zoom);

        if (
            canvasState.mode === CanvasMode.None ||
            canvasState.mode === CanvasMode.Pressing
        ) {
            document.body.style.cursor = 'default';
            unselectLayers();
            setCanvasState({
                mode: CanvasMode.None,
            });
        } else if (canvasState.mode === CanvasMode.Pencil) {
            document.body.style.cursor = "url(/custom-cursors/pencil.svg) 2 18, auto";
            insertPath();
        } else if (canvasState.mode === CanvasMode.Inserting && canvasState.layerType === LayerType.Image) {
            setSelectedImage("");
            insertImage(LayerType.Image, point, selectedImage);
        } else if (canvasState.mode === CanvasMode.Inserting && canvasState.layerType !== LayerType.Image) {
            const layerType = canvasState.layerType;
            if (isPanning && currentPreviewLayer) {
                if (layerType === LayerType.Arrow && currentPreviewLayer.type === LayerType.Arrow) {
                    insertLayer(layerType, { x: currentPreviewLayer.x, y: currentPreviewLayer.y }, currentPreviewLayer.width, currentPreviewLayer.height, currentPreviewLayer.center)
                    setCurrentPreviewLayer(null);
                } else {
                    insertLayer(layerType, { x: currentPreviewLayer.x, y: currentPreviewLayer.y }, currentPreviewLayer.width, currentPreviewLayer.height);
                    setCurrentPreviewLayer(null);
                }
            } else if (layerType !== LayerType.Arrow) {
                let width
                let height
                if (layerType === LayerType.Text) {
                    width = 130;
                    height = 37;
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
                setIsPanning(false);
            }
        } else if (canvasState.mode === CanvasMode.Moving) {
            document.body.style.cursor = 'url(/custom-cursors/hand.svg) 8 8, auto';
            setIsPanning(false);
        } else if (canvasState.mode === CanvasMode.Translating) {
            let layerIds: any = [];
            let layerUpdates: any = [];

            selectedLayersRef.current.forEach(id => {
                const newLayer = liveLayers[id];
                if (newLayer) {
                    layerIds.push(id);
                    layerUpdates.push(newLayer);
                }
            });

            if (layerIds.length > 0) {
                updateLayer({
                    boardId: boardId,
                    layerId: layerIds,
                    layerUpdates: layerUpdates
                });
            }
            setCanvasState({
                mode: CanvasMode.None,
            });
        } else if (canvasState.mode === CanvasMode.Resizing || canvasState.mode === CanvasMode.ArrowResizeHandler) {
            let layerIds: any = [];
            let layerUpdates: any = [];

            selectedLayersRef.current.forEach(id => {
                const newLayer = liveLayers[id];
                if (newLayer) {
                    layerIds.push(id);
                    layerUpdates.push(newLayer);
                }
            });

            if (layerIds.length > 0) {
                updateLayer({
                    boardId: boardId,
                    layerId: layerIds,
                    layerUpdates: layerUpdates
                });
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
            updateLayer,
            boardId,
            camera,
            zoom,
            currentPreviewLayer,
            isPanning,
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

    const onLayerPointerDown = useCallback((e: React.PointerEvent, layerId: string) => {
        if (
            canvasState.mode === CanvasMode.Pencil ||
            canvasState.mode === CanvasMode.Inserting
        ) {
            return;
        }

        e.stopPropagation();

        setCanvasState({ mode: CanvasMode.Translating, current: mousePositionRef.current });

        if (selectedLayersRef.current.includes(layerId)) {
            return;
        }

        const newPresence: Presence = {
            ...myPresence,
            selection: [layerId],
            cursor: mousePositionRef.current
        };

        setMyPresence(newPresence);

        selectedLayersRef.current = [layerId];

    }, [selectedLayersRef, canvasState]);

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
        for (const id of selectedLayersRef.current) {
            const layer = liveLayers[id];
            if (layer) {
                const copiedLayer = JSON.parse(JSON.stringify(layer));
                copied.set(id, copiedLayer);
            }
        }
        setCopiedLayers(copied);
    }, [liveLayers, selectedLayersRef]);

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
        const newIds: any = [];
        const clonedLayers: any = [];
        copiedLayers.forEach((layer) => {
            const newId = nanoid();
            newSelection.push(newId);
            newLiveLayerIds.push(newId);
            const clonedLayer = JSON.parse(JSON.stringify(layer));
            clonedLayer.x = clonedLayer.x + offsetX;
            clonedLayer.y = clonedLayer.y + offsetY;
            if (clonedLayer.type === LayerType.Arrow) {
                clonedLayer.center.x += offsetX;
                clonedLayer.center.y += offsetY;
            }
            newLiveLayers[newId] = clonedLayer;
            newIds.push(newId);
            clonedLayers.push(clonedLayer);
        });

        addLayer({
            boardId: boardId,
            layerId: newIds,
            layer: clonedLayers
        })

        if (socket) {
            socket.emit('layer-update', newIds, clonedLayers);
        }

        setLiveLayers(newLiveLayers);
        setLiveLayerIds(newLiveLayerIds);



        const newPresence: Presence = {
            ...myPresence,
            selection: newSelection
        };

        setMyPresence(newPresence);

    }, [copiedLayers, myPresence, setLiveLayers, setLiveLayerIds, setMyPresence, org, proModal, liveLayerIds, socket, liveLayers, addLayer, boardId]);

    useEffect(() => {
        const onMouseMove = (e: any) => {
            if (e.buttons === 0) {
                mousePositionRef.current = pointerEventToCanvasPoint(e, camera, zoom);
            }
        };

        document.addEventListener('mousemove', onMouseMove);

        function onKeyDown(e: KeyboardEvent) {
            switch (e.key.toLocaleLowerCase()) {
                case "c": {
                    if (e.ctrlKey || e.metaKey) {
                        copySelectedLayers();
                    }
                    break;
                }
                case "v": {
                    if (document.activeElement instanceof HTMLTextAreaElement) {
                        break;
                    }
                    if (e.ctrlKey || e.metaKey) {
                        if (copiedLayers.size > 0) {
                            e.preventDefault();
                            pasteCopiedLayers(mousePositionRef.current);
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
                        const newLayers = { ...liveLayers };
                        selectedLayersRef.current.forEach(id => {
                            delete newLayers[id];
                        });

                        deleteLayer({
                            boardId: board._id,
                            layerId: selectedLayersRef.current
                        });

                        if (socket) {
                            socket.emit('layer-delete', selectedLayersRef.current);
                        }

                        setLiveLayers(newLayers);
                        setLiveLayerIds(liveLayerIds.filter(id => !selectedLayersRef.current.includes(id)));
                        selectedLayersRef.current = ([]);
                    }
            }
        }

        document.addEventListener("keydown", onKeyDown);

        return () => {
            document.removeEventListener("keydown", onKeyDown);
            document.removeEventListener('mousemove', onMouseMove);
        }
    }, [copySelectedLayers, pasteCopiedLayers, camera, zoom, liveLayers, selectedLayersRef.current, copiedLayers, liveLayerIds]);

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
        if (canvasState.mode === CanvasMode.Inserting) {
            if (canvasState.layerType === LayerType.Text) {
                document.body.style.cursor = 'url(/custom-cursors/text-cursor.svg) 8 8, auto';
            } else {
                document.body.style.cursor = 'url(/custom-cursors/inserting.svg) 12 12, auto';
            }
        } else if (canvasState.mode === CanvasMode.Pencil) {
            document.body.style.cursor = 'url(/custom-cursors/pencil.svg) 2 18, auto';
        } else if (canvasState.mode === CanvasMode.Moving) {
            document.body.style.cursor = 'url(/custom-cursors/hand.svg) 8 8, auto';
        } else {
            document.body.style.cursor = 'default';
        }
    }, [canvasState.mode, canvasState]);

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
            {canvasState.mode === CanvasMode.None && (
                <SelectionTools
                    setLiveLayerIds={setLiveLayerIds}
                    setLiveLayers={setLiveLayers}
                    liveLayerIds={liveLayerIds}
                    liveLayers={liveLayers}
                    selectedLayers={selectedLayersRef.current}
                    zoom={zoom}
                    camera={camera}
                    updateLayer={updateLayer}
                    socket={socket}
                    boardId={boardId}
                />
            )}
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
                            selectionColor={layerIdsToColorSelection[layerId]}
                            onLayerPointerDown={onLayerPointerDown}
                            liveLayers={liveLayers}
                            setLiveLayers={setLiveLayers}
                            updateLayer={updateLayer}
                            key={layerId}
                            id={layerId}
                            onRefChange={setTextRef}
                        />
                    ))}
                    {currentPreviewLayer && (
                        <CurrentPreviewLayer
                            layer={currentPreviewLayer}
                        />
                    )}
                    <SelectionBox
                        zoom={zoom}
                        liveLayers={liveLayers}
                        selectedLayers={selectedLayersRef.current}
                        onResizeHandlePointerDown={onResizeHandlePointerDown}
                        onArrowResizeHandlePointerDown={onArrowResizeHandlePointerDown}
                    />
                    {canvasState.mode === CanvasMode.SelectionNet && canvasState.current != null && (
                        <rect
                            style={{
                                fill: 'rgba(59, 130, 246, 0.3)',
                                stroke: '#3B82F6',
                                strokeWidth: 0.5
                            }}
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
                            fill={colorToCss({r: 0 ,g: 0, b: 0, a: 0,})}
                            x={0}
                            y={0}
                        />
                    )}
                </g>
            </svg>
        </main>
    );
};