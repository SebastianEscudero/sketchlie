"use client";

import { customAlphabet } from "nanoid";
import React, { useState, useRef } from "react";

import {
    removeHighlightFromText,
    SketchlieCopilot,
} from "@/lib/utils";

import {
    ArrowType,
    Camera,
    CanvasMode,
    CanvasState,
    Layers,
    Presence,
    PreviewLayer,
} from "@/types/canvas";

import { useDisableScrollBounce } from "@/hooks/use-disable-scroll-bounce";
import { useProModal } from "@/hooks/use-pro-modal";
import { getMaxImageSize } from "@/lib/planLimits";
import { useRoom } from "@/components/room";
import { Command } from "@/lib/commands";
import { SketchlieAiInput } from "./sketchlie-ai-input";
import { Background } from "./background";
import { useArrowResizeHandlePointerDown, useContinueDrawing, useCopySelectedLayers, useCursorListener, useDragLeave, useDragOver, useEraserDeleteLayers, useFocusInitialTextLayer, useInsertHighlight, useInsertLayer, useInsertMedia, useInsertPath, useKeyboardListener, useLayerIdsToColorSelection, useLayerPointerDown, useNoDanglingPoints, useOnDrop, useOnWheel, usePasteCopiedLayers, usePerformAction, usePointerDown, usePointerLeave, usePointerMove, usePointerUp, usePreventDefaultSafariGestures, useRedo, useResizeHandlePointerDown, useResizeSelectedLayers, useStartDrawing, useStartMultiSelection, useTouchDown, useTouchMove, useTouchUp, useTranslateSelectedLayers, useTranslateSelectedLayersWithDelta, useUndo, useUndoInitialStateListener, useUnselectLayers, useUpdateSelectionNet, useUpdateVisibleLayers } from "./canvasUtils";
import { CanvasOverlay } from "./canvas-overlay";
import { CanvasContent } from "./canvas-content";

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
    // Room and User related
    const { liveLayers, liveLayerIds, User, otherUsers, setLiveLayers, setLiveLayerIds, org, socket, board, expired } = useRoom();
    const [myPresence, setMyPresence] = useState<Presence | null>(null);
    const proModal = useProModal();
    const maxFileSize = org && getMaxImageSize(org) || 0;

    // Canvas state and controls
    const [canvasState, setCanvasState] = useState<CanvasState>({ mode: CanvasMode.None });
    const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [background, setBackground] = useState(() => localStorage.getItem('background') || 'none');
    const [visibleLayers, setVisibleLayers] = useState<string[]>([]);

    // Refs
    const zoomRef = useRef(zoom);
    const cameraRef = useRef(camera);
    const canvasStateRef = useRef(canvasState);
    const svgRef = useRef(null);
    const selectedLayersRef = useRef<string[]>([]);
    const layersToDeleteEraserRef = useRef<Set<string>>(new Set());

    // Layer manipulation
    const [initialLayers, setInitialLayers] = useState<Layers>({});
    const [history, setHistory] = useState<Command[]>([]);
    const [redoStack, setRedoStack] = useState<Command[]>([]);
    const [copiedLayerIds, setCopiedLayerIds] = useState<string[]>([]);
    const [layerRef, setLayerRef] = useState<any>(null);
    const [currentPreviewLayer, setCurrentPreviewLayer] = useState<PreviewLayer | null>(null);
    const [suggestedLayers, setSuggestedLayers] = useState<Layers>({});
    const [suggestedLayerIds, setSuggestedLayerIds] = useState<string[]>([]);

    // Drawing and erasing
    const [erasePath, setErasePath] = useState<[number, number][]>([]);
    const [pencilDraft, setPencilDraft] = useState<[number, number, number][]>([]);
    const [pathColor, setPathColor] = useState({ r: 29, g: 29, b: 29, a: 1 });
    const [pathStrokeSize, setPathStrokeSize] = useState(5);
    const [layerWithAssistDraw, setLayerWithAssistDraw] = useState(false);

    // UI states
    const [isArrowPostInsertMenuOpen, setIsArrowPostInsertMenuOpen] = useState(false);
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
    const [forceSelectionBoxRender, setForceSelectionBoxRender] = useState(false);
    const [forceLayerPreviewRender, setForceLayerPreviewRender] = useState(false);

    // Panning and zooming
    const [isPanning, setIsPanning] = useState(false);
    const [rightClickPanning, setIsRightClickPanning] = useState(false);
    const [startPanPoint, setStartPanPoint] = useState({ x: 0, y: 0 });
    const [lastPanPoint, setLastPanPoint] = useState<{ x: number, y: number } | null>(null);
    const [pinchStartDist, setPinchStartDist] = useState<number | null>(null);
    const [activeTouches, setActiveTouches] = useState(0);

    // Misc
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [arrowTypeInserting, setArrowTypeInserting] = useState<ArrowType>(ArrowType.Straight);

    useDisableScrollBounce();

    const performAction = usePerformAction(liveLayerIds, liveLayers, setHistory, setRedoStack);
    const undo = useUndo(history, liveLayerIds, liveLayers, setHistory, setRedoStack);
    const redo = useRedo(redoStack, liveLayerIds, liveLayers, setRedoStack, setHistory);


    const insertLayer = useInsertLayer(
        expired,
        setCanvasState,
        liveLayers,
        setLiveLayers,
        setLiveLayerIds,
        boardId,
        socket,
        org,
        proModal,
        arrowTypeInserting,
        performAction,
        setLayerWithAssistDraw,
        setJustInsertedText,
        setIsArrowPostInsertMenuOpen,
        selectedLayersRef,
        layerWithAssistDraw
    );

    useFocusInitialTextLayer(justInsertedText, layerRef);


    const insertMedia = useInsertMedia(
        socket,
        org,
        proModal,
        setLiveLayers,
        setLiveLayerIds,
        boardId,
        performAction,
        setCanvasState
    );

    const translateSelectedLayers = useTranslateSelectedLayers(
        expired,
        selectedLayersRef,
        myPresence,
        setMyPresence,
        canvasState,
        setCanvasState,
        liveLayers,
        setLiveLayers,
        socket,
        zoom
    );

    const translateSelectedLayersWithDelta = useTranslateSelectedLayersWithDelta(
        expired,
        selectedLayersRef,
        myPresence,
        setMyPresence,
        liveLayers,
        setLiveLayers,
        socket,
        zoom
    );

    const unselectLayers = useUnselectLayers(selectedLayersRef, setMyPresence, myPresence);
    const updateSelectionNet = useUpdateSelectionNet(setCanvasState, liveLayerIds, liveLayers, selectedLayersRef, setMyPresence, myPresence);
    const EraserDeleteLayers = useEraserDeleteLayers(liveLayerIds, liveLayers, setLiveLayers, setErasePath, erasePath, layersToDeleteEraserRef);
    const startMultiSelection = useStartMultiSelection(setCanvasState);


    const startDrawing = useStartDrawing(setPencilDraft, myPresence, setMyPresence);
    const continueDrawing = useContinueDrawing(
        canvasState,
        pencilDraft,
        myPresence,
        setMyPresence,
        pathColor,
        pathStrokeSize,
        zoom,
        expired,
        setPencilDraft
    );

    const insertPath = useInsertPath(
        expired,
        pencilDraft,
        liveLayers,
        setLiveLayers,
        setLiveLayerIds,
        myPresence,
        org,
        proModal,
        socket,
        boardId,
        pathColor,
        performAction,
        pathStrokeSize,
        activeTouches,
        setPencilDraft,
        setMyPresence,
        setCanvasState
    );

    const insertHighlight = useInsertHighlight(expired, pencilDraft, liveLayers, setLiveLayers, setLiveLayerIds, myPresence, setMyPresence, org, proModal, socket, zoom, activeTouches, boardId, pathColor, performAction, setPencilDraft, setCanvasState);
    const resizeSelectedLayers = useResizeSelectedLayers(expired, selectedLayersRef, myPresence, setMyPresence, canvasState, liveLayers, liveLayerIds, layerRef, zoom, socket, setLiveLayers);
    const onResizeHandlePointerDown = useResizeHandlePointerDown(setCanvasState);
    const onArrowResizeHandlePointerDown = useArrowResizeHandlePointerDown(setCanvasState);
    const onWheel: React.WheelEventHandler<HTMLDivElement> = useOnWheel(zoom, setZoom, camera, setCamera);

    const onPointerDown = usePointerDown(
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
        canvasState,
        setIsPenEraserSwitcherOpen,
        setIsPenMenuOpen,
        startDrawing,
        setIsPanning,
        setStartPanPoint,
        setIsRightClickPanning,
        socket
    );

    const onPointerMove = usePointerMove(
        activeTouches,
        setPencilDraft,
        setIsMoving,
        rightClickPanning,
        camera,
        startPanPoint,
        setCamera,
        setStartPanPoint,
        setIsRightClickPanning,
        canvasState,
        isPanning,
        cameraRef,
        zoomRef,
        svgRef,
        setMousePosition,
        myPresence,
        setMyPresence,
        socket,
        User,
        startMultiSelection,
        updateSelectionNet,
        EraserDeleteLayers,
        translateSelectedLayers,
        resizeSelectedLayers,
        removeHighlightFromText,
        continueDrawing,
        setIsPanning,
        setCurrentPreviewLayer,
        liveLayerIds,
        liveLayers,
        zoom,
        currentPreviewLayer,
        arrowTypeInserting
    );

    const onPointerUp = usePointerUp(
        setCanvasState,
        canvasState,
        insertLayer,
        insertPath,
        setIsPanning,
        selectedLayersRef,
        liveLayers,
        camera,
        zoom,
        svgRef,
        currentPreviewLayer,
        isPanning,
        initialLayers,
        socket,
        myPresence,
        setMyPresence,
        User,
        boardId,
        expired,
        insertHighlight,
        liveLayerIds,
        performAction,
        setLiveLayerIds,
        setLiveLayers,
        setPencilDraft,
        setErasePath,
        layersToDeleteEraserRef,
        setCurrentPreviewLayer,
        setJustChanged,
        setIsRightClickPanning
    );


    const onPointerLeave = usePointerLeave(
        setMyPresence,
        myPresence,
        socket,
        User.userId,
        setPencilDraft
    );

    const onLayerPointerDown = useLayerPointerDown(
        canvasStateRef,
        expired,
        cameraRef,
        zoomRef,
        svgRef,
        setCanvasState,
        selectedLayersRef,
        setMyPresence,
        socket,
        User.userId
    );

    const layerIdsToColorSelection = useLayerIdsToColorSelection(otherUsers);

    const onDragOver = useDragOver(expired, setIsDraggingOverCanvas);

    const onDragLeave = useDragLeave(expired, setIsDraggingOverCanvas);

    const onDrop = useOnDrop(
        expired,
        setIsDraggingOverCanvas,
        camera,
        zoom,
        maxFileSize,
        User.userId,
        insertMedia
    );

    const onTouchDown = useTouchDown(setIsMoving, setActiveTouches, selectedLayersRef);

    const onTouchUp = useTouchUp(setIsMoving, setActiveTouches);

    const onTouchMove = useTouchMove(
        zoom,
        pinchStartDist,
        camera,
        lastPanPoint,
        canvasState,
        setIsMoving,
        setActiveTouches,
        setPinchStartDist,
        setLastPanPoint,
        setZoom,
        setCamera
    );

    const copySelectedLayers = useCopySelectedLayers(selectedLayersRef, setCopiedLayerIds);

    const pasteCopiedLayers = usePasteCopiedLayers(
        copiedLayerIds,
        myPresence,
        setLiveLayers,
        setLiveLayerIds,
        setMyPresence,
        org,
        proModal,
        socket,
        boardId,
        performAction,
        liveLayers
    );

    useUndoInitialStateListener(
        liveLayers,
        setInitialLayers,
        setIsArrowPostInsertMenuOpen,
        setStartPanPoint
    );

    useKeyboardListener(
        expired,
        copySelectedLayers,
        pasteCopiedLayers,
        setCanvasState,
        selectedLayersRef,
        liveLayerIds,
        socket,
        myPresence,
        User,
        setMyPresence,
        setForceSelectionBoxRender,
        forceSelectionBoxRender,
        liveLayers,
        setLiveLayers,
        setLiveLayerIds,
        boardId,
        performAction,
        unselectLayers,
        undo,
        redo,
        history,
        redoStack,
        mousePosition,
        setIsMoving,
        translateSelectedLayersWithDelta,
        initialLayers,
        canvasState
    );


    useNoDanglingPoints(
        canvasState,
        setPencilDraft,
        canvasStateRef,
        zoomRef,
        cameraRef,
        zoom,
        camera
    );
    usePreventDefaultSafariGestures();


    useCursorListener(canvasState, rightClickPanning, selectedLayersRef);

    useUpdateVisibleLayers(
        svgRef,
        camera,
        zoom,
        liveLayerIds,
        liveLayers,
        setVisibleLayers
    );

    return (
        <>
            <Background
                background={background}
                zoom={zoom}
                camera={camera}
                isDraggingOverCanvas={isDraggingOverCanvas}
            />
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
                    <CanvasOverlay
                        board={board}
                        org={org}
                        setBackground={setBackground}
                        background={background}
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
                        otherUsers={otherUsers}
                        expired={expired}
                        pathColor={pathColor}
                        pathStrokeSize={pathStrokeSize}
                        setPathColor={setPathColor}
                        setPathStrokeSize={setPathStrokeSize}
                        isUploading={isUploading}
                        setIsUploading={setIsUploading}
                        canvasState={canvasState}
                        undo={undo}
                        redo={redo}
                        history={history}
                        redoStack={redoStack}
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
                        currentPreviewLayer={currentPreviewLayer}
                        insertMedia={insertMedia}
                        svgRef={svgRef}
                        setZoom={setZoom}
                        setCamera={setCamera}
                        isMoving={isMoving}
                        activeTouches={activeTouches}
                        liveLayerIds={liveLayerIds}
                        liveLayers={liveLayers}
                        boardId={boardId}
                        proModal={proModal}
                        myPresence={myPresence}
                        setMyPresence={setMyPresence}
                        isArrowPostInsertMenuOpen={isArrowPostInsertMenuOpen}
                        setIsArrowPostInsertMenuOpen={setIsArrowPostInsertMenuOpen}
                    />
                    <CanvasContent
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
                        visibleLayers={visibleLayers}
                        liveLayers={liveLayers}
                        selectedLayersRef={selectedLayersRef}
                        zoom={zoom}
                        camera={camera}
                        canvasState={canvasState}
                        onLayerPointerDown={onLayerPointerDown}
                        svgRef={svgRef}
                        layerIdsToColorSelection={layerIdsToColorSelection}
                        setLiveLayers={setLiveLayers}
                        setLayerRef={setLayerRef}
                        socket={socket}
                        expired={expired}
                        boardId={boardId}
                        forceLayerPreviewRender={forceLayerPreviewRender}
                        isMoving={isMoving}
                        activeTouches={activeTouches}
                        onResizeHandlePointerDown={onResizeHandlePointerDown}
                        onArrowResizeHandlePointerDown={onArrowResizeHandlePointerDown}
                        forceSelectionBoxRender={forceSelectionBoxRender}
                        setCurrentPreviewLayer={setCurrentPreviewLayer}
                        mousePosition={mousePosition}
                        setCanvasState={setCanvasState}
                        setStartPanPoint={setStartPanPoint}
                        setArrowTypeInserting={setArrowTypeInserting}
                        currentPreviewLayer={currentPreviewLayer}
                        suggestedLayers={suggestedLayers}
                        erasePath={erasePath}
                        otherUsers={otherUsers}
                        pencilDraft={pencilDraft}
                        pathColor={pathColor}
                        pathStrokeSize={pathStrokeSize}
                        justChanged={justChanged}
                    />
                </div>
            </main>
        </>
    );
};