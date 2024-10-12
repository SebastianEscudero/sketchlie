import {
  Eraser,
  Frame,
  Hand,
  Highlighter,
  Image,
  Lightbulb,
  Link,
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
import { Dispatch, SetStateAction, useEffect } from "react";
import { LaserIcon } from "@/public/custom-icons/laser";
import { Button } from "@/components/ui/button";
import { Hint } from "@/components/hint";
import { PenMenu } from "./pen-menu";
import { ShapesMenu } from "./shapes-menu";
import { PenEraserMenu } from "./pen-eraser-laser-menu";
import { ArrowMenu } from "./arrow-menu";
import { LinkButton } from "./link-button";
import { IconButton } from "./icon-button";

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
  isPenMenuOpen: boolean;
  setIsPenMenuOpen: Dispatch<SetStateAction<boolean>>;
  isShapesMenuOpen: boolean;
  setIsShapesMenuOpen: Dispatch<SetStateAction<boolean>>;
  isPenEraserSwitcherOpen: boolean;
  setIsPenEraserSwitcherOpen: Dispatch<SetStateAction<boolean>>;
  pathColor: Color;
  isPlacingLayer: boolean;
  expired: boolean;
  insertMedia: (mediaItems: {layerType: LayerType.Image | LayerType.Video | LayerType.Link, position: Point, info: any, zoom: number}[]) => void;
  camera: any;
  svgRef: any;
  zoom: number;
}

export const Toolbar = ({
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
  isPenMenuOpen,
  setIsPenMenuOpen,
  isShapesMenuOpen,
  setIsShapesMenuOpen,
  isPenEraserSwitcherOpen,
  setIsPenEraserSwitcherOpen,
  pathColor,
  isPlacingLayer,
  expired,
  insertMedia,
  camera,
  svgRef,
  zoom
}: ToolbarProps) => {
  const onPathColorChange = (color: any) => {
    setPathColor(color);
  }

  const handleStrokeSizeChange = (value: number[]) => {
    setPathStrokeSize(value[0]);
  }

  useEffect(() => {
    if (canvasState.mode !== CanvasMode.Pencil && canvasState.mode !== CanvasMode.Eraser && canvasState.mode !== CanvasMode.Laser && canvasState.mode !== CanvasMode.Highlighter) {
      setIsPenMenuOpen(false);
      setIsPenEraserSwitcherOpen(false);
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

  return (
    <div className="absolute bottom-4 left-[50%] translate-x-[-50%] flex sm:flex-row flex-col-reverse sm:gap-x-4 gap-x-0 sm:gap-y-0 gap-y-2 pointer-events-auto">
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
          label="Move"
          icon={Hand}
          onClick={() => setCanvasState({
            mode: CanvasMode.Moving
          })}
          isActive={
            canvasState.mode === CanvasMode.Moving
          }
        />
        <ToolButton
          label={
            !isPenEraserSwitcherOpen
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
            if (!isPenEraserSwitcherOpen) {
              setCanvasState({
                mode: CanvasMode.Pencil,
              });
            }
            setIsPenEraserSwitcherOpen(!isPenEraserSwitcherOpen);
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
            canvasState.layerType !== LayerType.Frame
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
        <IconButton
          label="Icon"
          org={org}
          icon={Lightbulb}
          camera={camera}
          svgRef={svgRef}
          zoom={zoom}
          insertMedia={insertMedia}
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

      {isPenMenuOpen && (canvasState.mode === CanvasMode.Highlighter || canvasState.mode === CanvasMode.Pencil) && isPenEraserSwitcherOpen &&
        <PenMenu
          pathColor={pathColor}
          pathStrokeSize={pathStrokeSize}
          onPathColorChange={onPathColorChange}
          handleStrokeSizeChange={handleStrokeSizeChange}
        />
      }

      {isShapesMenuOpen && canvasState.mode === CanvasMode.Inserting && canvasState.layerType !== LayerType.Text && canvasState.layerType !== LayerType.Arrow && canvasState.layerType !== LayerType.Note &&
        <ShapesMenu
          setCanvasState={setCanvasState}
          canvasState={canvasState}
        />
      }
      {isPenEraserSwitcherOpen && (canvasState.mode === CanvasMode.Pencil || canvasState.mode === CanvasMode.Eraser || canvasState.mode === CanvasMode.Laser || canvasState.mode === CanvasMode.Highlighter) &&
        <PenEraserMenu
          setCanvasState={setCanvasState}
          canvasState={canvasState}
          setIsPenMenuOpen={setIsPenMenuOpen}
          isPenMenuOpen={isPenMenuOpen}
        />
      }
      {isArrowsMenuOpen && canvasState.mode === CanvasMode.Inserting && canvasState.layerType === LayerType.Arrow &&
        <ArrowMenu
          setCanvasState={setCanvasState}
          arrowTypeInserting={arrowTypeInserting}
          setArrowTypeInserting={setArrowTypeInserting}
        />
      }
    </div>
  );
};

export const ToolbarSkeleton = () => {
  return (
    <div className="border dark:border-zinc-800 shadow-md absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4 bg-white dark:bg-zinc-800 h-[360px] w-[52px] rounded-xl" />
  );
};