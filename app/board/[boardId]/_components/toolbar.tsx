import {
  ArrowBigDown,
  ArrowBigLeft,
  ArrowBigRight,
  ArrowBigUp,
  Circle,
  Diamond,
  Eraser,
  Hand,
  Hexagon,
  Highlighter,
  Image,
  MessageSquare,
  MousePointer2,
  MoveUpRight,
  Pencil,
  Redo2,
  Shapes,
  Square,
  Star,
  StickyNote,
  Triangle,
  Type,
  Undo2,
} from "lucide-react";

import { CanvasMode, CanvasState, Color, LayerType } from "@/types/canvas";

import { ToolButton } from "./tool-button";

import { ImageButton } from "./image-button";
import { Dispatch, SetStateAction, useEffect } from "react";
import { ColorButton } from "../selection-tools/color-picker";
import { Slider } from "@/components/ui/slider";
import { LaserIcon } from "@/public/custom-cursors/laser";
import { LineIcon } from "@/public/custom-cursors/line";

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

    if (canvasState.mode !== CanvasMode.Inserting) {
      setIsShapesMenuOpen(false);
    } else {
      if (canvasState.layerType === LayerType.Arrow || canvasState.layerType === LayerType.Note || canvasState.layerType === LayerType.Image || canvasState.layerType === LayerType.Text) {
        setIsShapesMenuOpen(false);
      }
    }
  }, [canvasState]);



  return (
    <div className="absolute h-600:top-[50%] h-600:translate-y-[-50%] h-600:bottom-auto bottom-2 h-600:left-2 h-600:translate-x-0 left-[50%] translate-x-[-50%] flex h-600:flex-col flex-row h-600:gap-y-4 h-600:gap-x-0 gap-x-4">
      <div className="bg-white rounded-md shadow-md p-1.5 flex h-600:gap-y-1 h-600:gap-x-0 gap-x-1 h-600:flex-col flex-row items-center">
        <ToolButton
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
          icon={Hand}
          onClick={() => setCanvasState({
            mode: CanvasMode.Moving
          })}
          isActive={
            canvasState.mode === CanvasMode.Moving
          }
        />
        <ToolButton
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
          icon={Undo2}
          onClick={undo}
          isDisabled={!canUndo}
        />
        <ToolButton
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
            <ColorButton color={{ r: 0, g: 0, b: 0, a: 0 }}  onClick={onPathColorChange} pathColor={pathColor}/>
            <ColorButton color={{ r: 255, g: 255, b: 255, a: 1 }}  onClick={onPathColorChange} pathColor={pathColor}/>
            <ColorButton color={{ r: 29, g: 29, b: 29, a: 1 }}  onClick={onPathColorChange} pathColor={pathColor}/>
            <ColorButton color={{ r: 159, g: 168, b: 178, a: 1 }}  onClick={onPathColorChange} pathColor={pathColor}/>
            <ColorButton color={{ r: 255, g: 240, b: 0, a: 1 }}  onClick={onPathColorChange} pathColor={pathColor}/>
            <ColorButton color={{ r: 255, g: 255, b: 0, a: 1 }}  onClick={onPathColorChange} pathColor={pathColor}/>
            <ColorButton color={{ r: 225, g: 133, b: 244, a: 1 }}  onClick={onPathColorChange} pathColor={pathColor}/>
            <ColorButton color={{ r: 174, g: 62, b: 201, a: 1 }}  onClick={onPathColorChange} pathColor={pathColor}/>
            <ColorButton color={{ r: 68, g: 101, b: 233, a: 1 }}  onClick={onPathColorChange} pathColor={pathColor}/>
            <ColorButton color={{ r: 75, g: 161, b: 241, a: 1 }}  onClick={onPathColorChange} pathColor={pathColor}/>
            <ColorButton color={{ r: 255, g: 165, b: 0, a: 1 }}  onClick={onPathColorChange} pathColor={pathColor}/>
            <ColorButton color={{ r: 225, g: 105, b: 25, a: 1 }}  onClick={onPathColorChange} pathColor={pathColor}/>
            <ColorButton color={{ r: 7, g: 147, b: 104, a: 1 }}  onClick={onPathColorChange} pathColor={pathColor}/>
            <ColorButton color={{ r: 77, g: 176, b: 94, a: 1 }}  onClick={onPathColorChange} pathColor={pathColor}/>
            <ColorButton color={{ r: 248, g: 119, b: 119, a: 1 }}  onClick={onPathColorChange} pathColor={pathColor}/>
            <ColorButton color={{ r: 224, g: 49, b: 49, a: 1 }}  onClick={onPathColorChange} pathColor={pathColor}/>
          </div>
        </div>
      }

      {isShapesMenuOpen && canvasState.mode === CanvasMode.Inserting && canvasState.layerType !== LayerType.Image && canvasState.layerType !== LayerType.Text && canvasState.layerType !== LayerType.Arrow && canvasState.layerType !== LayerType.Note &&
        <div className="absolute h-600:left-[115%] left-6 h-600:bottom-auto h-600:top-14 bottom-16 p-2 bg-white rounded-lg shadow-sm grid grid-cols-4 grid-rows-3 gap-2 h-[144px] w-[192px] items-center cursor-default">
          <ToolButton
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
          <ToolButton
            icon={Diamond}
            onClick={() => setCanvasState({
              mode: CanvasMode.Inserting,
              layerType: LayerType.Rhombus,
            })}
            isActive={
              canvasState.mode === CanvasMode.Inserting &&
              canvasState.layerType === LayerType.Rhombus
            }
          />
          <ToolButton
            icon={Triangle}
            onClick={() => setCanvasState({
              mode: CanvasMode.Inserting,
              layerType: LayerType.Triangle,
            })}
            isActive={
              canvasState.mode === CanvasMode.Inserting &&
              canvasState.layerType === LayerType.Triangle
            }
          />
          <ToolButton
            icon={Star}
            onClick={() => setCanvasState({
              mode: CanvasMode.Inserting,
              layerType: LayerType.Star,
            })}
            isActive={
              canvasState.mode === CanvasMode.Inserting &&
              canvasState.layerType === LayerType.Star
            }
          />
          <ToolButton
            icon={Hexagon}
            onClick={() => setCanvasState({
              mode: CanvasMode.Inserting,
              layerType: LayerType.Hexagon,
            })}
            isActive={
              canvasState.mode === CanvasMode.Inserting &&
              canvasState.layerType === LayerType.Hexagon
            }
          />
          <ToolButton
            icon={LineIcon}
            onClick={() => setCanvasState({
              mode: CanvasMode.Inserting,
              layerType: LayerType.Line,
            })}
            isActive={
              canvasState.mode === CanvasMode.Inserting &&
              canvasState.layerType === LayerType.Line
            }
          />
          <ToolButton
            icon={MessageSquare}
            onClick={() => setCanvasState({
              mode: CanvasMode.Inserting,
              layerType: LayerType.CommentBubble,
            })}
            isActive={
              canvasState.mode === CanvasMode.Inserting &&
              canvasState.layerType === LayerType.CommentBubble
            }
          />
          <ToolButton
            icon={ArrowBigLeft}
            onClick={() => setCanvasState({
              mode: CanvasMode.Inserting,
              layerType: LayerType.BigArrowLeft,
            })}
            isActive={
              canvasState.mode === CanvasMode.Inserting &&
              canvasState.layerType === LayerType.BigArrowLeft
            }
          />
          <ToolButton
            icon={ArrowBigUp}
            onClick={() => setCanvasState({
              mode: CanvasMode.Inserting,
              layerType: LayerType.BigArrowUp,
            })}
            isActive={
              canvasState.mode === CanvasMode.Inserting &&
              canvasState.layerType === LayerType.BigArrowUp
            }
          />
          <ToolButton
            icon={ArrowBigDown}
            onClick={() => setCanvasState({
              mode: CanvasMode.Inserting,
              layerType: LayerType.BigArrowDown,
            })}
            isActive={
              canvasState.mode === CanvasMode.Inserting &&
              canvasState.layerType === LayerType.BigArrowDown
            }
          />
          <ToolButton
            icon={ArrowBigRight}
            onClick={() => setCanvasState({
              mode: CanvasMode.Inserting,
              layerType: LayerType.BigArrowRight,
            })}
            isActive={
              canvasState.mode === CanvasMode.Inserting &&
              canvasState.layerType === LayerType.BigArrowRight
            }
          />
        </div>
      }
      {isPenEraserSwitcherOpen && (canvasState.mode === CanvasMode.Pencil || canvasState.mode === CanvasMode.Eraser || canvasState.mode === CanvasMode.Laser || canvasState.mode === CanvasMode.Highlighter) &&
        <div className="absolute h-600:left-[115%] left-20 h-600:bottom-auto h-600:top-20 bottom-16 p-2 bg-white rounded-lg shadow-sm h-600:space-y-1 flex flex-row h-600:space-x-0 space-x-1 h-600:flex-col items-center cursor-default">
          <ToolButton
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
          {/* <ToolButton
            icon={Eraser}
            onClick={() => {
              setSelectedTool(CanvasMode.Eraser);
              setCanvasState({
                mode: CanvasMode.Eraser,
              });
            }}
            isActive={selectedTool === CanvasMode.Eraser}
          /> */}
          <ToolButton
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