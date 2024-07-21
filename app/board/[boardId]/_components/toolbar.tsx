import {
  Eraser,
  Hand,
  Highlighter,
  Image,
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

import { ArrowType, CanvasMode, CanvasState, Color, LayerType } from "@/types/canvas";
import { ToolButton } from "./tool-button";
import { ImageButton } from "./image-button";
import { Dispatch, SetStateAction, useEffect } from "react";
import { LaserIcon } from "@/public/custom-cursors/laser";
import { Button } from "@/components/ui/button";
import { Hint } from "@/components/hint";
import { PenMenu } from "./pen-menu";
import { ShapesMenu } from "./shapes-menu";
import { PenEraserMenu } from "./pen-eraser-laser-menu";
import { ArrowMenu } from "./arrow-menu";

interface ToolbarProps {
  isUploading: boolean;
  setIsUploading: Dispatch<SetStateAction<boolean>>;
  setSelectedImage: (info: any) => void;
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
}

export const Toolbar = ({
  isUploading,
  setIsUploading,
  canvasState,
  setCanvasState,
  setSelectedImage,
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
      if (canvasState.layerType === LayerType.Arrow || canvasState.layerType === LayerType.Note || canvasState.layerType === LayerType.Image || canvasState.layerType === LayerType.Text) {
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



  return (
    <div className="absolute bottom-2 left-[50%] translate-x-[-50%] flex md:flex-row flex-col gap-x-4">
      <div className="bg-custom-blue rounded-t-lg w-[65px] md:hidden flex">
        <Button disabled={!canUndo} onClick={undo} className="h-8 w-8 p-2" variant="ghost">
          <Undo2 className="h-5 w-5 text-white" />
        </Button>
        <Button disabled={!canRedo} onClick={redo} className="h-8 w-8 p-2" variant="ghost">
          <Redo2 className="h-5 w-5 text-white" />
        </Button>
      </div>
      <div className="bg-white dark:bg-[#383838] rounded-lg shadow-custom-3 p-1.5 flex gap-x-1 flex-row items-center">
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
            setCanvasState({
              mode: CanvasMode.Pencil,
            });
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
            canvasState.mode === CanvasMode.Inserting && canvasState.layerType !== LayerType.Image && canvasState.layerType !== LayerType.Text && canvasState.layerType !== LayerType.Arrow && canvasState.layerType !== LayerType.Note
          }
        />
<ToolButton
  label={!isArrowsMenuOpen ? (arrowTypeInserting === ArrowType.Straight ? "Straight" : arrowTypeInserting === ArrowType.Curved ? "Curved" : "Diagram") : undefined}
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
        <ImageButton
          label="Image"
          org={org}
          isUploading={isUploading}
          setIsUploading={setIsUploading}
          setSelectedImage={setSelectedImage}
          icon={Image}
          onClick={() => setCanvasState({
            mode: CanvasMode.Inserting,
            layerType: LayerType.Image,
          })}
          isActive={
            canvasState.mode === CanvasMode.Inserting &&
            canvasState.layerType === LayerType.Image
          }
        />
      </div>
      <div className="bg-white dark:bg-[#383838] rounded-md p-1.5 hidden md:flex flex-row items-center shadow-custom-3">
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

      {isShapesMenuOpen && canvasState.mode === CanvasMode.Inserting && canvasState.layerType !== LayerType.Image && canvasState.layerType !== LayerType.Text && canvasState.layerType !== LayerType.Arrow && canvasState.layerType !== LayerType.Note &&
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
    <div className="absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4 bg-white dark:bg-[#383838] h-[360px] w-[52px] shadow-custom-1 rounded-md" />
  );
};