import {
  Eraser,
  Frame,
  Hand,
  Highlighter,
  Image,
  Lightbulb,
  Link,
  MessageCircle,
  MousePointer2,
  MoveUpRight,
  Pen,
  Redo,
  Redo2,
  Shapes,
  StickyNote,
  TrendingUp,
  Type,
  Undo2,
} from "lucide-react";

import { ArrowType, CanvasMode, CanvasState, Color, LayerType, Point } from "@/types/canvas";
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

interface ToolbarProps {
  isUploading: boolean;
  setIsUploading: Dispatch<SetStateAction<boolean>>;
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
  isArrowsMenuOpen: boolean;
  setIsArrowsMenuOpen: Dispatch<SetStateAction<boolean>>;
  isShapesMenuOpen: boolean;
  setIsShapesMenuOpen: Dispatch<SetStateAction<boolean>>;
  isPenEraserLaserMenuOpen: boolean;
  setisPenEraserLaserMenuOpen: Dispatch<SetStateAction<boolean>>;
  pathColor: Color;
  isPlacingLayer: boolean;
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
}

export const Toolbar = memo(({
  isUploading,
  setIsUploading,
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
  isArrowsMenuOpen,
  setIsArrowsMenuOpen,
  isShapesMenuOpen,
  setIsShapesMenuOpen,
  isPenEraserLaserMenuOpen,
  setisPenEraserLaserMenuOpen,
  pathColor,
  isPlacingLayer,
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
}: ToolbarProps) => {
  const onPathColorChange = (color: any) => {
    setPathColor(color);
  }

  const handleStrokeSizeChange = (value: number[]) => {
    setPathStrokeSize(value[0]);
  }

  useEffect(() => {
    if (canvasState.mode !== CanvasMode.Pencil && canvasState.mode !== CanvasMode.Eraser && canvasState.mode !== CanvasMode.Laser && canvasState.mode !== CanvasMode.Highlighter) {
      setisPenEraserLaserMenuOpen(false);
    }

    if (canvasState.mode !== CanvasMode.Inserting || isPlacingLayer) {
      setIsShapesMenuOpen(false);
    } else {
      if (canvasState.layerType === LayerType.Arrow || canvasState.layerType === LayerType.Note || canvasState.layerType === LayerType.Text) {
        setIsShapesMenuOpen(false);
      }
    }

    if (canvasState.mode !== CanvasMode.Inserting || isPlacingLayer) {
      setIsArrowsMenuOpen(false);
    } else {
      if (canvasState.layerType !== LayerType.Arrow) {
        setIsArrowsMenuOpen(false
        );
      }
    }

  }, [canvasState, isPlacingLayer]);

  if (expired) {
    return null;
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
        {/* <ToolButton
          label="Move"
          icon={Hand}
          onClick={() => setCanvasState({
            mode: CanvasMode.Moving
          })}
          isActive={
            canvasState.mode === CanvasMode.Moving
          }
        /> */}
        <ToolButton
          label={
            !isPenEraserLaserMenuOpen
              ? canvasState.mode === CanvasMode.Laser
                ? "Laser"
                : canvasState.mode === CanvasMode.Eraser
                  ? "Eraser"
                  : canvasState.mode === CanvasMode.Highlighter
                    ? "Highlighter"
                    : "Pencil"
              : undefined
          }
          icon={
            canvasState.mode === CanvasMode.Laser
              ? LaserIcon
              : canvasState.mode === CanvasMode.Eraser
                ? Eraser
                : canvasState.mode === CanvasMode.Highlighter
                  ? Highlighter
                  : Pen
          }
          onClick={() => {
            if (!isPenEraserLaserMenuOpen) {
              setCanvasState({
                mode: CanvasMode.Pencil,
              });
            }
            setisPenEraserLaserMenuOpen(!isPenEraserLaserMenuOpen);
          }}
          isActive={
            canvasState.mode === CanvasMode.Pencil ||
            canvasState.mode === CanvasMode.Eraser ||
            canvasState.mode === CanvasMode.Laser ||
            canvasState.mode === CanvasMode.Highlighter
          }
        />
        <ToolButton
          label={!isShapesMenuOpen ? "Shapes" : undefined}
          icon={Shapes}
          onClick={() => {
            if (!isShapesMenuOpen) {
              setCanvasState({
                mode: CanvasMode.Inserting,
                layerType: LayerType.Rectangle
              });
            }
            setIsShapesMenuOpen(!isShapesMenuOpen);
          }}
          isActive={
            canvasState.mode === CanvasMode.Inserting &&
            canvasState.layerType !== LayerType.Text &&
            canvasState.layerType !== LayerType.Arrow &&
            canvasState.layerType !== LayerType.Note &&
            canvasState.layerType !== LayerType.Frame &&
            canvasState.layerType !== LayerType.Comment
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
            setIsArrowsMenuOpen(!isArrowsMenuOpen);
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
          onClick={() => setCanvasState({
            mode: CanvasMode.Inserting,
            layerType: LayerType.Frame,
          })}
          isActive={
            canvasState.mode === CanvasMode.Inserting &&
            canvasState.layerType === LayerType.Frame
          }
        />
        <MediaButton
          label="Media"
          org={org}
          isUploading={isUploading}
          setIsUploading={setIsUploading}
          insertMedia={insertMedia}
          icon={Image}
          camera={camera}
          svgRef={svgRef}
          zoom={zoom}
        />
        {/* <IconButton
          label="Icon"
          org={org}
          icon={Lightbulb}
          camera={camera}
          svgRef={svgRef}
          zoom={zoom}
          insertMedia={insertMedia}
        /> */}
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
        <Hint label="Undo" sideOffset={14}>
          <Button disabled={!canUndo} onClick={undo} className="h-8 w-8 xs:h-10 xs:w-10 p-2" variant="ghost">
            <Undo2 className="h-5 w-5" />
          </Button>
        </Hint>
        <Hint label="Redo" sideOffset={14}>
          <Button disabled={!canRedo} onClick={redo} className="h-8 w-8 xs:h-10 xs:w-10 p-2" variant="ghost">
            <Redo2 className="h-5 w-5" />
          </Button>
        </Hint>
      </div>
      {isShapesMenuOpen && canvasState.mode === CanvasMode.Inserting && canvasState.layerType !== LayerType.Text && canvasState.layerType !== LayerType.Arrow && canvasState.layerType !== LayerType.Note &&
        <ShapesMenu
          setCanvasState={setCanvasState}
          canvasState={canvasState}
          isShapesMenuOpen={isShapesMenuOpen}
        />
      }
      {isPenEraserLaserMenuOpen && (canvasState.mode === CanvasMode.Pencil || canvasState.mode === CanvasMode.Eraser || canvasState.mode === CanvasMode.Laser || canvasState.mode === CanvasMode.Highlighter) &&
        <PenEraserLaserMenu
          setCanvasState={setCanvasState}
          canvasState={canvasState}
          pathColor={pathColor}
          pathStrokeSize={pathStrokeSize}
          onPathColorChange={onPathColorChange}
          handleStrokeSizeChange={handleStrokeSizeChange}
          isPenEraserLaserMenuOpen={isPenEraserLaserMenuOpen}
        />
      }
      {isArrowsMenuOpen && canvasState.mode === CanvasMode.Inserting && canvasState.layerType === LayerType.Arrow &&
        <ArrowMenu
          setCanvasState={setCanvasState}
          arrowTypeInserting={arrowTypeInserting}
          setArrowTypeInserting={setArrowTypeInserting}
          isArrowsMenuOpen={isArrowsMenuOpen}
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