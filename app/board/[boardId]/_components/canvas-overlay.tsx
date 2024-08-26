import { Info } from './info';
import { Participants } from './participants';
import { Toolbar } from './toolbar';
import { SelectionTools } from './selection-tools';
import { ArrowPostInsertMenu } from './arrow-post-insert-menu';
import { ZoomToolbar } from './zoom-toolbar';
import { CanvasMode, CanvasState, LayerType, Point } from "@/types/canvas";
import { Dispatch, SetStateAction } from 'react';

interface CanvasOverlayProps {
  board: any;
  org: any;
  setBackground: (background: string) => void;
  background: string;
  setLiveLayerIds: (ids: string[]) => void;
  setLiveLayers: (layers: any) => void;
  performAction: (action: any) => void;
  socket: any;
  setCanvasState: (state: any) => void;
  nanoid: () => string;
  zoom: number;
  camera: { x: number; y: number };
  selectedLayersRef: React.RefObject<string[]>;
  setIsShowingAIInput: (isShowing: boolean) => void;
  isShowingAIInput: boolean;
  setForcedRender: (force: boolean) => void;
  User: any;
  otherUsers: any[];
  expired: boolean;
  pathColor: { r: number; g: number; b: number; a: number };
  pathStrokeSize: number;
  setPathColor: (color: { r: number; g: number; b: number; a: number }) => void;
  setPathStrokeSize: (size: number) => void;
  isUploading: boolean;
  setIsUploading: Dispatch<SetStateAction<boolean>>;
  canvasState: CanvasState;
  undo: () => void;
  redo: () => void;
  history: any[];
  redoStack: any[];
  arrowTypeInserting: any;
  setArrowTypeInserting: (type: any) => void;
  isArrowsMenuOpen: boolean;
  setIsArrowsMenuOpen: Dispatch<SetStateAction<boolean>>;
  isPenMenuOpen: boolean;
  setIsPenMenuOpen: Dispatch<SetStateAction<boolean>>;
  isShapesMenuOpen: boolean;
  setIsShapesMenuOpen: Dispatch<SetStateAction<boolean>>;
  isPenEraserSwitcherOpen: boolean;
  setIsPenEraserSwitcherOpen: Dispatch<SetStateAction<boolean>>;
  currentPreviewLayer: any;
  insertMedia: (layerType: LayerType.Image | LayerType.Video | LayerType.Link, position: Point, info: any, zoom: number) => void;
  svgRef: React.RefObject<SVGSVGElement>;
  setZoom: (zoom: number) => void;
  setCamera: (camera: { x: number; y: number }) => void;
  isMoving: boolean;
  activeTouches: number;
  liveLayerIds: string[];
  liveLayers: any;
  boardId: string;
  proModal: any;
  myPresence: any;
  setMyPresence: (presence: any) => void;
  isArrowPostInsertMenuOpen: boolean;
  setIsArrowPostInsertMenuOpen: (isOpen: boolean) => void;
}

export const CanvasOverlay = ({
    board,
    org,
    setBackground,
    background,
    setLiveLayerIds,
    setLiveLayers,
    performAction,
    socket,
    setCanvasState,
    nanoid,
    zoom,
    camera,
    selectedLayersRef,
    setIsShowingAIInput,
    isShowingAIInput,
    setForcedRender,
    User,
    otherUsers,
    expired,
    pathColor,
    pathStrokeSize,
    setPathColor,
    setPathStrokeSize,
    isUploading,
    setIsUploading,
    canvasState,
    undo,
    redo,
    history,
    redoStack,
    arrowTypeInserting,
    setArrowTypeInserting,
    isArrowsMenuOpen,
    setIsArrowsMenuOpen,
    isPenMenuOpen,
    setIsPenMenuOpen,
    isShapesMenuOpen,
    setIsShapesMenuOpen,
    isPenEraserSwitcherOpen,
    setIsPenEraserSwitcherOpen,
    currentPreviewLayer,
    insertMedia,
    svgRef,
    setZoom,
    setCamera,
    isMoving,
    activeTouches,
    liveLayerIds,
    liveLayers,
    boardId,
    proModal,
    myPresence,
    setMyPresence,
    isArrowPostInsertMenuOpen,
    setIsArrowPostInsertMenuOpen
  }: CanvasOverlayProps) => (
    <div className="z-20 absolute h-full w-full pointer-events-none">
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
        setForcedRender={setForcedRender}
        User={User}
      />
      <Participants
        org={org}
        otherUsers={otherUsers}
        User={User}
        socket={socket}
        expired={expired}
      />
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
        camera={camera}
        svgRef={svgRef}
        zoom={zoom}
      />
      {!isArrowPostInsertMenuOpen && !isMoving && canvasState.mode !== CanvasMode.Resizing && canvasState.mode !== CanvasMode.ArrowResizeHandler && canvasState.mode !== CanvasMode.SelectionNet && activeTouches < 2 && (
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
    {selectedLayersRef.current && selectedLayersRef.current.length > 0 && liveLayers[selectedLayersRef.current[0]] && isArrowPostInsertMenuOpen && (
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
      <ZoomToolbar zoom={zoom} setZoom={setZoom} setCamera={setCamera} camera={camera} />
    </div>
  );