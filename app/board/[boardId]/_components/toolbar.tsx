import {
  Eraser,
  Frame,
  Highlighter,
  Image,
  Link,
  MessageCircle,
  MousePointer2,
  MoveUpRight,
  Pen,
  Redo,
  Redo2,
  Shapes,
  StickyNote,
  Table2,
  TrendingUp,
  Type,
  Undo2,
} from "lucide-react";

import { ArrowType, CanvasMode, CanvasState, Color, LayerType, Point, ToolbarMenu } from "@/types/canvas";
import { ToolButton } from "./tool-button";
import { MediaButton } from "./media-button";
import { Dispatch, memo, SetStateAction, useEffect } from "react";
import { LaserIcon } from "@/public/custom-icons/laser";
import { Button } from "@/components/ui/button";
import { Hint } from "@/components/hint";
import { ShapesMenu } from "./shapes-menu";
import { PenEraserLaserMenu } from "./pen-eraser-laser-menu";
import { ArrowMenu } from "./arrow-menu";
import { LinkButton } from "./link-button";
import { PresentationModeToolbar } from "./presentation-mode-toolbar";
import { FrameMenu } from "./frame-menu";
import { MediaMenu } from "./media-menu";
import { PencilToolbar } from "./pencil-toolbar";

interface ToolbarProps {
  canvasState: CanvasState;
  setCanvasState: (newState: any) => void;
  org: any;
  pathStrokeSize: number;
  setPathColor: any;
  setPathStrokeSize: any;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  arrowTypeInserting: ArrowType;
  setArrowTypeInserting: (type: ArrowType) => void;
  pathColor: Color;
  expired: boolean;
  insertMedia: (mediaItems: { layerType: LayerType.Image | LayerType.Video | LayerType.Link | LayerType.Svg, position: Point, info: any, zoom: number }[]) => void;
  camera: any;
  svgRef: any;
  zoom: number;
  presentationMode: boolean;
  setPresentationMode: (mode: boolean) => void;
  frameIds: string[];
  currentFrameIndex: number;
  goToFrame: (index: number) => void;
  showToolbar: boolean;
  insertLayer: (layerType: LayerType, position: any, width: number, height: number) => void;
  toolbarMenu: ToolbarMenu;
  setToolbarMenu: (menu: ToolbarMenu) => void;
  highlighterColor: Color;
  setHighlighterColor: (color: Color) => void;
  highlighterStrokeSize: number;
  setHighlighterStrokeSize: (size: number) => void;
}

export const Toolbar = memo(({
  canvasState,
  setCanvasState,
  org,
  pathStrokeSize,
  setPathColor,
  setPathStrokeSize,
  undo,
  redo,
  canUndo,
  canRedo,
  arrowTypeInserting,
  setArrowTypeInserting,
  pathColor,
  expired,
  insertMedia,
  camera,
  svgRef,
  zoom,
  presentationMode,
  setPresentationMode,
  frameIds,
  currentFrameIndex,
  goToFrame,
  showToolbar,
  toolbarMenu,
  setToolbarMenu,
  insertLayer,
  highlighterColor,
  setHighlighterColor,
  highlighterStrokeSize,
  setHighlighterStrokeSize,
}: ToolbarProps) => {

  useEffect(() => {
    if (canvasState.mode !== CanvasMode.None && canvasState.mode !== CanvasMode.Inserting && toolbarMenu !== ToolbarMenu.PathColor && toolbarMenu !== ToolbarMenu.PathStrokeSize) {
      setToolbarMenu(ToolbarMenu.None);
    }
  }, [canvasState.mode, toolbarMenu, setToolbarMenu]);

  if (expired) {
    return null;
  }

  if (canvasState.mode === CanvasMode.Pencil || canvasState.mode === CanvasMode.Highlighter || canvasState.mode === CanvasMode.Laser || canvasState.mode === CanvasMode.Eraser) {
    return (
      <PencilToolbar
        setCanvasState={setCanvasState}
        canvasState={canvasState}
        highlighterColor={highlighterColor}
        setHighlighterColor={setHighlighterColor}
        pathColor={pathColor}
        setPathColor={setPathColor}
        pathStrokeSize={pathStrokeSize}
        setPathStrokeSize={setPathStrokeSize}
        toolbarMenu={toolbarMenu}
        setToolbarMenu={setToolbarMenu}
        highlighterStrokeSize={highlighterStrokeSize}
        setHighlighterStrokeSize={setHighlighterStrokeSize}
        undo={undo}
        redo={redo}
        canUndo={canUndo}
        canRedo={canRedo}
      />
    )
  }

  if (presentationMode) {
    return (
      <PresentationModeToolbar
        setPresentationMode={setPresentationMode}
        setCanvasState={setCanvasState}
        canvasState={canvasState}
        undo={undo}
        redo={redo}
        canUndo={canUndo}
        canRedo={canRedo}
        frameIds={frameIds}
        currentFrameIndex={currentFrameIndex}
        goToFrame={goToFrame}
        showToolbar={showToolbar}
      />
    )
  }

  return (
    <div
      className={`
      absolute bottom-4 left-[50%] translate-x-[-50%] flex sm:flex-row flex-col-reverse sm:gap-x-4 gap-x-0 sm:gap-y-0 gap-y-2 pointer-events-auto
      transition-all duration-300 ease-in-out
      ${showToolbar ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
    `}
    >      
      <div className="border dark:border-zinc-800 shadow-md bg-white dark:bg-zinc-800 rounded-xl p-1.5 flex gap-x-1 flex-row items-center">
        <ToolButton
          label="Select"
          icon={MousePointer2}
          onClick={() => setCanvasState({
            mode: CanvasMode.None
          })}
          isActive={
            canvasState.mode === CanvasMode.None ||
            canvasState.mode === CanvasMode.Translating ||
            canvasState.mode === CanvasMode.SelectionNet ||
            canvasState.mode === CanvasMode.Pressing ||
            canvasState.mode === CanvasMode.Resizing
          }
        />
        <ToolButton
          label="Pencil"
          icon={Pen}
          onClick={() => setCanvasState({mode: CanvasMode.Pencil})}
        />
        <ToolButton
          label={toolbarMenu !== ToolbarMenu.Shapes ? "Shapes" : undefined}
          icon={Shapes}
          onClick={() => {
            if (toolbarMenu !== ToolbarMenu.Shapes) {
              setCanvasState({
                mode: CanvasMode.Inserting,
                layerType: LayerType.Rectangle
              });
            }
            setToolbarMenu(
              toolbarMenu === ToolbarMenu.Shapes 
                ? ToolbarMenu.None 
                : ToolbarMenu.Shapes
            );
          }}
          isActive={
            canvasState.mode === CanvasMode.Inserting &&
            canvasState.layerType !== LayerType.Text &&
            canvasState.layerType !== LayerType.Arrow &&
            canvasState.layerType !== LayerType.Note &&
            canvasState.layerType !== LayerType.Frame &&
            canvasState.layerType !== LayerType.Comment &&
            canvasState.layerType !== LayerType.Table
          }
        />
        <ToolButton
          label="Arrow"
          icon={arrowTypeInserting === ArrowType.Straight ? MoveUpRight : arrowTypeInserting === ArrowType.Curved ? Redo : TrendingUp}
          onClick={() => {
            setCanvasState({
              mode: CanvasMode.Inserting,
              layerType: LayerType.Arrow,
            });
            setToolbarMenu(
              toolbarMenu === ToolbarMenu.Arrows 
                ? ToolbarMenu.None 
                : ToolbarMenu.Arrows
            );
          }}
          isActive={
            canvasState.mode === CanvasMode.Inserting &&
            canvasState.layerType === LayerType.Arrow
          }
        />
        <ToolButton
          label="Note"
          icon={StickyNote}
          onClick={() => setCanvasState({
            mode: CanvasMode.Inserting,
            layerType: LayerType.Note,
          })}
          isActive={
            canvasState.mode === CanvasMode.Inserting &&
            canvasState.layerType === LayerType.Note
          }
        />
        <ToolButton
          label="Text"
          icon={Type}
          onClick={() => setCanvasState({
            mode: CanvasMode.Inserting,
            layerType: LayerType.Text,
          })}
          isActive={
            canvasState.mode === CanvasMode.Inserting &&
            canvasState.layerType === LayerType.Text
          }
        />
        <ToolButton
          label="Comment"
          icon={MessageCircle}
          onClick={() => setCanvasState({
            mode: CanvasMode.Inserting,
            layerType: LayerType.Comment,
          })}
          isActive={
            canvasState.mode === CanvasMode.Inserting &&
            canvasState.layerType === LayerType.Comment
          }
        />
        <ToolButton
          label="Frame"
          icon={Frame}
          onClick={() => {
            setCanvasState({
              mode: CanvasMode.Inserting,
              layerType: LayerType.Frame,
            });
            setToolbarMenu(
              toolbarMenu === ToolbarMenu.Frames 
                ? ToolbarMenu.None 
                : ToolbarMenu.Frames
            );
          }}
          isActive={
            canvasState.mode === CanvasMode.Inserting &&
            canvasState.layerType === LayerType.Frame
          }
        />
        <ToolButton 
          label="Media"
          icon={Image}
          onClick={() => toolbarMenu !== ToolbarMenu.Media ? setToolbarMenu(ToolbarMenu.Media) : setToolbarMenu(ToolbarMenu.None)}
          isActive={toolbarMenu === ToolbarMenu.Media}
        />
        <LinkButton
          label="Link"
          icon={Link}
          camera={camera}
          svgRef={svgRef}
          zoom={zoom}
          insertMedia={insertMedia}
        />
      </div>
      <div className="border dark:border-zinc-800 shadow-md bg-white dark:bg-zinc-800 rounded-xl p-1.5 sm:w-auto w-[80px] xs:w-[90px] flex flex-row items-center">
        <ToolButton
          label="Undo"
          icon={Undo2}
          onClick={undo}
          disabled={!canUndo}
        />
        <ToolButton
          label="Redo"
          icon={Redo2}
          onClick={redo}
          disabled={!canRedo}
        />
      </div>
      {toolbarMenu === ToolbarMenu.Shapes && canvasState.mode === CanvasMode.Inserting && canvasState.layerType !== LayerType.Text && canvasState.layerType !== LayerType.Arrow && canvasState.layerType !== LayerType.Note &&
        <ShapesMenu
          setCanvasState={setCanvasState}
          canvasState={canvasState}
          isShapesMenuOpen={toolbarMenu === ToolbarMenu.Shapes}
        />
      }
      {toolbarMenu === ToolbarMenu.Arrows && canvasState.mode === CanvasMode.Inserting && canvasState.layerType === LayerType.Arrow &&
        <ArrowMenu
          setCanvasState={setCanvasState}
          arrowTypeInserting={arrowTypeInserting}
          setArrowTypeInserting={setArrowTypeInserting}
          isArrowsMenuOpen={toolbarMenu === ToolbarMenu.Arrows}
        />
      }
      {toolbarMenu === ToolbarMenu.Frames && canvasState.mode === CanvasMode.Inserting && canvasState.layerType === LayerType.Frame &&
        <FrameMenu
          isFrameMenuOpen={toolbarMenu === ToolbarMenu.Frames}
          camera={camera}
          zoom={zoom}
          insertLayer={insertLayer}
          svgRef={svgRef}
        />
      }
      {toolbarMenu === ToolbarMenu.Media &&
        <MediaMenu
          isMediaMenuOpen={toolbarMenu === ToolbarMenu.Media}
          org={org}
          insertMedia={insertMedia}
          camera={camera}
          svgRef={svgRef}
          zoom={zoom}
        />
      }
    </div>
  );
});

Toolbar.displayName = "Toolbar";

export const ToolbarSkeleton = () => {
  return (
    <div className="border dark:border-zinc-800 shadow-md absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4 bg-white dark:bg-zinc-800 h-[360px] w-[52px] rounded-xl" />
  );
};

interface AnimatedToolbarMenuProps {
  isOpen: boolean;
  children: React.ReactNode;
  className?: string;
}

export const AnimatedToolbarMenu: React.FC<AnimatedToolbarMenuProps> = ({
  isOpen,
  children,
  className = '',
}) => {
  return (
    <div
      className={`
        absolute p-2 bg-white dark:bg-zinc-800 rounded-lg shadow-md
        transition-all duration-300 border dark:border-zinc-800
        ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
        animate-in fade-in slide-in-from-bottom-4
        ${className}
      `}
    >
      {children}
    </div>
  );
};
