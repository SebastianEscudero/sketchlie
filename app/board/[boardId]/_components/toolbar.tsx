import {
  Circle,
  Eraser,
  Hand,
  Highlighter,
  Image,
  MousePointer2,
  MoveUpRight,
  Pencil,
  Redo2,
  Shapes,
  Square,
  StickyNote,
  Type,
  Undo2,
} from "lucide-react";

import { CanvasMode, CanvasState, Color, LayerType } from "@/types/canvas";

import { ToolButton } from "./tool-button";

import { ImageButton } from "./image-button";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ColorButton } from "../selection-tools/color-picker";
import { Slider } from "@/components/ui/slider";
import { LaserIcon } from "@/public/custom-cursors/laser";

interface ToolbarProps {
  isUploading: boolean;
  setIsUploading: Dispatch<SetStateAction<boolean>>;
  onImageSelect: (src: string) => void;
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
  isPenMenuOpen: boolean;
  setIsPenMenuOpen: Dispatch<SetStateAction<boolean>>;
  isShapesMenuOpen: boolean;
  setIsShapesMenuOpen: Dispatch<SetStateAction<boolean>>;
  isPenEraserSwitcherOpen: boolean;
  setIsPenEraserSwitcherOpen: Dispatch<SetStateAction<boolean>>;
  selectedTool: CanvasMode;
  setSelectedTool: Dispatch<SetStateAction<CanvasMode>>;
  pathColor: Color;
}

export const Toolbar = ({
  isUploading,
  setIsUploading,
  canvasState,
  setCanvasState,
  onImageSelect,
  org,
  pathStrokeSize,
  setPathColor,
  setPathStrokeSize,
  undo,
  redo,
  canUndo,
  canRedo,
  isPenMenuOpen,
  setIsPenMenuOpen,
  isShapesMenuOpen,
  setIsShapesMenuOpen,
  isPenEraserSwitcherOpen,
  setIsPenEraserSwitcherOpen,
  selectedTool,
  setSelectedTool,
  pathColor,
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

    if (canvasState.mode !== CanvasMode.Inserting || (canvasState.layerType === LayerType.Image || canvasState.layerType === LayerType.Text || canvasState.layerType === LayerType.Arrow || canvasState.layerType === LayerType.Note)) {
      setIsShapesMenuOpen(false);
    }
  }, [canvasState.mode]);



  return (
    <div className="absolute h-600:top-[50%] h-600:translate-y-[-50%] h-600:bottom-auto bottom-2 h-600:left-2 h-600:translate-x-0 left-[50%] translate-x-[-50%] flex h-600:flex-col flex-row h-600:gap-y-4 h-600:gap-x-0 gap-x-4">
      <div className="bg-white rounded-md shadow-md p-1.5 flex h-600:gap-y-1 h-600:gap-x-0 gap-x-1 h-600:flex-col flex-row items-center">
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
          label="Shapes"
          icon={Shapes}
          onClick={() => {
            setCanvasState({
              mode: CanvasMode.Inserting,
              layerType: LayerType.Rectangle
            });
            setIsShapesMenuOpen(!isShapesMenuOpen);
          }}
          isActive={
            canvasState.mode === CanvasMode.Inserting && canvasState.layerType !== LayerType.Image && canvasState.layerType !== LayerType.Text && canvasState.layerType !== LayerType.Arrow && canvasState.layerType !== LayerType.Note
          }
        />
        <ToolButton
          label={
            selectedTool === CanvasMode.Laser
              ? "Laser"
              : selectedTool === CanvasMode.Eraser
                ? "Eraser"
                : selectedTool === CanvasMode.Highlighter
                  ? "Highlighter"
                  : "Pencil"
          }
          icon={
            selectedTool === CanvasMode.Laser
              ? LaserIcon
              : selectedTool === CanvasMode.Eraser
                ? Eraser
                : selectedTool === CanvasMode.Highlighter
                  ? Highlighter 
                  : Pencil
          }
          onClick={() => {
            if (selectedTool === CanvasMode.None) {
              setSelectedTool(CanvasMode.Pencil);
              setCanvasState({
                mode: CanvasMode.Pencil,
              });
            } else {
              setCanvasState({
                mode: selectedTool,
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
          label="Arrow"
          icon={MoveUpRight}
          onClick={() => setCanvasState({
            mode: CanvasMode.Inserting,
            layerType: LayerType.Arrow,
          })}
          isActive={
            canvasState.mode === CanvasMode.Inserting &&
            canvasState.layerType === LayerType.Arrow
          }
        />
        <ToolButton
          label="Sticky note"
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
          org={org}
          isUploading={isUploading}
          setIsUploading={setIsUploading}
          onImageSelect={onImageSelect}
          label="Image"
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
      <div className="bg-white rounded-md p-1.5 flex h-600:flex-col flex-row items-center shadow-md">
        <ToolButton
          label="Undo"
          icon={Undo2}
          onClick={undo}
          isDisabled={!canUndo}
        />
        <ToolButton
          label="Redo"
          icon={Redo2}
          onClick={redo}
          isDisabled={!canRedo}
        />
      </div>

      {isPenMenuOpen && (canvasState.mode === CanvasMode.Highlighter || canvasState.mode === CanvasMode.Pencil) && isPenEraserSwitcherOpen &&
        <div className="absolute h-600:left-[235%] h-600:top-20 h-600:bottom-auto bottom-32 p-2 bg-white rounded-lg shadow-sm w-[206px] space-y-4 flex flex-col items-center cursor-default">
          <Slider
            defaultValue={[pathStrokeSize]}
            min={1}
            max={8}
            step={1}
            className='bg-white w-[90%] pt-3 cursor-pointer'
            onValueChange={handleStrokeSizeChange}
          />
          <div className="grid grid-cols-4 gap-[2px]" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <ColorButton color={{ r: 0, g: 0, b: 0, a: 0 }} onClick={onPathColorChange} pathColor={pathColor}/>
            <ColorButton color={{ r: 255, g: 255, b: 255, a: 1 }} onClick={onPathColorChange} pathColor={pathColor}/>
            <ColorButton color={{ r: 243, g: 82, b: 35, a: 1 }} onClick={onPathColorChange} pathColor={pathColor}/>
            <ColorButton color={{ r: 255, g: 249, b: 177, a: 1 }} onClick={onPathColorChange} pathColor={pathColor}/>
            <ColorButton color={{ r: 255, g: 244, b: 69, a: 1 }} onClick={onPathColorChange} pathColor={pathColor}/>
            <ColorButton color={{ r: 68, g: 202, b: 99, a: 1 }} onClick={onPathColorChange} pathColor={pathColor}/>
            <ColorButton color={{ r: 39, g: 142, b: 237, a: 1 }} onClick={onPathColorChange} pathColor={pathColor}/>
            <ColorButton color={{ r: 155, g: 105, b: 245, a: 1 }} onClick={onPathColorChange} pathColor={pathColor}/>
            <ColorButton color={{ r: 252, g: 142, b: 42, a: 1 }} onClick={onPathColorChange} pathColor={pathColor}/>
            <ColorButton color={{ r: 1, g: 1, b: 1, a: 1 }} onClick={onPathColorChange} pathColor={pathColor}/>
            <ColorButton color={{ r: 65, g: 75, b: 178, a: 1 }} onClick={onPathColorChange} pathColor={pathColor}/>
            <ColorButton color={{ r: 128, g: 128, b: 128, a: 1 }} onClick={onPathColorChange} pathColor={pathColor}/>
          </div>
        </div>
      }

      {isShapesMenuOpen && canvasState.mode === CanvasMode.Inserting && canvasState.layerType !== LayerType.Image && canvasState.layerType !== LayerType.Text && canvasState.layerType !== LayerType.Arrow && canvasState.layerType !== LayerType.Note &&
        <div className="absolute h-600:left-[115%] left-6 h-600:bottom-auto h-600:top-14 bottom-16 p-2 bg-white rounded-lg shadow-sm space-y-1 flex flex-col items-center cursor-default">
          <ToolButton
            label="Rectangle"
            icon={Square}
            onClick={() => setCanvasState({
              mode: CanvasMode.Inserting,
              layerType: LayerType.Rectangle,
            })}
            isActive={
              canvasState.mode === CanvasMode.Inserting &&
              canvasState.layerType === LayerType.Rectangle
            }
          />
          <ToolButton
            label="Ellipse"
            icon={Circle}
            onClick={() => setCanvasState({
              mode: CanvasMode.Inserting,
              layerType: LayerType.Ellipse,
            })}
            isActive={
              canvasState.mode === CanvasMode.Inserting &&
              canvasState.layerType === LayerType.Ellipse
            }
          />
        </div>
      }
      {isPenEraserSwitcherOpen && (canvasState.mode === CanvasMode.Pencil || canvasState.mode === CanvasMode.Eraser || canvasState.mode === CanvasMode.Laser || canvasState.mode === CanvasMode.Highlighter) &&
        <div className="absolute h-600:left-[115%] left-20 h-600:bottom-auto h-600:top-20 bottom-16 p-2 bg-white rounded-lg shadow-sm h-600:space-y-1 flex flex-row h-600:space-x-0 space-x-1 h-600:flex-col items-center cursor-default">
          <ToolButton
            label="Pen"
            icon={Pencil}
            onClick={() => {
              setSelectedTool(CanvasMode.Pencil);
              setCanvasState({
                mode: CanvasMode.Pencil,
              });
              setIsPenMenuOpen(!isPenMenuOpen);
            }}
            isActive={selectedTool === CanvasMode.Pencil}
          />
          <ToolButton
            label="Eraser"
            icon={Eraser}
            onClick={() => {
              setSelectedTool(CanvasMode.Eraser);
              setCanvasState({
                mode: CanvasMode.Eraser,
              });
            }}
            isActive={selectedTool === CanvasMode.Eraser}
          />
          <ToolButton
            label="Highlighter"
            icon={Highlighter}
            onClick={() => {
              setSelectedTool(CanvasMode.Highlighter);
              setCanvasState({
                mode: CanvasMode.Highlighter,
              });
              setIsPenMenuOpen(!isPenMenuOpen);
            }}
            isActive={selectedTool === CanvasMode.Highlighter}
          />
          <ToolButton
            label="Laser"
            icon={LaserIcon}
            onClick={() => {
              setSelectedTool(CanvasMode.Laser);
              setCanvasState({
                mode: CanvasMode.Laser,
              });
            }}
            isActive={selectedTool === CanvasMode.Laser}
          />
        </div>
      }
    </div>
  );
};

export const ToolbarSkeleton = () => {
  return (
    <div className="absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4 bg-white h-[360px] w-[52px] shadow-md rounded-md" />
  );
};