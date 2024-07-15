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
  Pen,
  Redo2,
  Shapes,
  Square,
  Star,
  StickyNote,
  Triangle,
  Type,
  Undo2,
  WandSparkles,
} from "lucide-react";

import { CanvasMode, CanvasState, Color, LayerType } from "@/types/canvas";

import { ToolButton } from "./tool-button";

import { ImageButton } from "./image-button";
import { Dispatch, SetStateAction, useEffect } from "react";
import { ColorButton } from "../selection-tools/color-picker";
import { Slider } from "@/components/ui/slider";
import { LaserIcon } from "@/public/custom-cursors/laser";
import { LineIcon } from "@/public/custom-cursors/line";
import { Button } from "@/components/ui/button";
import { Hint } from "@/components/hint";

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
  isPenMenuOpen: boolean;
  setIsPenMenuOpen: Dispatch<SetStateAction<boolean>>;
  isShapesMenuOpen: boolean;
  setIsShapesMenuOpen: Dispatch<SetStateAction<boolean>>;
  isPenEraserSwitcherOpen: boolean;
  setIsPenEraserSwitcherOpen: Dispatch<SetStateAction<boolean>>;
  pathColor: Color;
  magicPathAssist: boolean;
  setMagicPathAssist: Dispatch<SetStateAction<boolean>>;
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
  isPenMenuOpen,
  setIsPenMenuOpen,
  isShapesMenuOpen,
  setIsShapesMenuOpen,
  isPenEraserSwitcherOpen,
  setIsPenEraserSwitcherOpen,
  pathColor,
  isPlacingLayer,
  magicPathAssist,
  setMagicPathAssist,
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
            if (canvasState.mode === CanvasMode.None) {
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
            canvasState.mode === CanvasMode.Inserting && canvasState.layerType !== LayerType.Image && canvasState.layerType !== LayerType.Text && canvasState.layerType !== LayerType.Arrow && canvasState.layerType !== LayerType.Note
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
        <div className="p-3 pt-5 pb-2 absolute left-8 bottom-32 bg-white dark:bg-[#383838] rounded-lg shadow-custom-1 w-[165px] flex flex-col items-center cursor-default">
          <Slider
            defaultValue={[pathStrokeSize]}
            min={1}
            max={8}
            step={1}
            className='bg-white dark:bg-[#383838] w-[90%] cursor-pointer'
            onValueChange={handleStrokeSizeChange}
          />
          <div className="grid grid-cols-4 gap-x-1 pt-2" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <ColorButton color={{ r: 0, g: 0, b: 0, a: 0 }} onClick={onPathColorChange} selectedColor={pathColor} />
            <ColorButton color={{ r: 255, g: 255, b: 255, a: 1 }} onClick={onPathColorChange} selectedColor={pathColor} />
            <ColorButton color={{ r: 29, g: 29, b: 29, a: 1 }} onClick={onPathColorChange} selectedColor={pathColor} />
            <ColorButton color={{ r: 159, g: 168, b: 178, a: 1 }} onClick={onPathColorChange} selectedColor={pathColor} />
            <ColorButton color={{ r: 255, g: 240, b: 0, a: 1 }} onClick={onPathColorChange} selectedColor={pathColor} />
            <ColorButton color={{ r: 252, g: 225, b: 156, a: 1 }} onClick={onPathColorChange} selectedColor={pathColor} />
            <ColorButton color={{ r: 225, g: 133, b: 244, a: 1 }} onClick={onPathColorChange} selectedColor={pathColor} />
            <ColorButton color={{ r: 174, g: 62, b: 201, a: 1 }} onClick={onPathColorChange} selectedColor={pathColor} />
            <ColorButton color={{ r: 68, g: 101, b: 233, a: 1 }} onClick={onPathColorChange} selectedColor={pathColor} />
            <ColorButton color={{ r: 75, g: 161, b: 241, a: 1 }} onClick={onPathColorChange} selectedColor={pathColor} />
            <ColorButton color={{ r: 255, g: 165, b: 0, a: 1 }} onClick={onPathColorChange} selectedColor={pathColor} />
            <ColorButton color={{ a: 1, b: 42, g: 142, r: 252 }} onClick={onPathColorChange} selectedColor={pathColor} />
            <ColorButton color={{ r: 7, g: 147, b: 104, a: 1 }} onClick={onPathColorChange} selectedColor={pathColor} />
            <ColorButton color={{ a: 1, b: 99, g: 202, r: 68 }} onClick={onPathColorChange} selectedColor={pathColor} />
            <ColorButton color={{ r: 248, g: 119, b: 119, a: 1 }} onClick={onPathColorChange} selectedColor={pathColor} />
            <ColorButton color={{ r: 224, g: 49, b: 49, a: 1 }} onClick={onPathColorChange} selectedColor={pathColor} />
          </div>
        </div>
      }

      {isShapesMenuOpen && canvasState.mode === CanvasMode.Inserting && canvasState.layerType !== LayerType.Image && canvasState.layerType !== LayerType.Text && canvasState.layerType !== LayerType.Arrow && canvasState.layerType !== LayerType.Note &&
        <div className="absolute left-[60px] bottom-16 p-2 bg-white dark:bg-[#383838] rounded-lg shadow-custom-1 grid grid-cols-4 grid-rows-3 gap-2 h-[144px] w-[160px] sm:w-[192px] items-center cursor-default">
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
        <div className="absolute left-5 bottom-16 p-2 bg-white dark:bg-[#383838] rounded-lg shadow-custom-1 flex flex-row space-x-1 items-center cursor-default">
          {/* <Hint label="Magic Drawing" side="right" sideOffset={14}>
            <Button className="h-8 w-8 xs:h-10 xs:w-10 p-2" variant={magicPathAssist ? "magicAssistActive" : "magicAssist"} onClick={() => setMagicPathAssist(!magicPathAssist)}>
              <WandSparkles className="w-5 h-5"/>
            </Button>
          </Hint> */}
          <ToolButton
            icon={Pen}
            onClick={() => {
              setCanvasState({
                mode: CanvasMode.Pencil,
              });
              setIsPenMenuOpen(!isPenMenuOpen);
            }}
            isActive={canvasState.mode === CanvasMode.Pencil}
          />
          <ToolButton
            icon={Eraser}
            onClick={() => {
              setCanvasState({
                mode: CanvasMode.Eraser,
              });
            }}
            isActive={canvasState.mode === CanvasMode.Eraser}
          />
          <ToolButton
            icon={Highlighter}
            onClick={() => {
              setCanvasState({
                mode: CanvasMode.Highlighter,
              });
              setIsPenMenuOpen(!isPenMenuOpen);
            }}
            isActive={canvasState.mode === CanvasMode.Highlighter}
          />
          <ToolButton
            icon={LaserIcon}
            onClick={() => {
              setCanvasState({
                mode: CanvasMode.Laser,
              });
            }}
            isActive={canvasState.mode === CanvasMode.Laser}
          />
        </div>
      }
    </div>
  );
};

export const ToolbarSkeleton = () => {
  return (
    <div className="absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4 bg-white dark:bg-[#383838] h-[360px] w-[52px] shadow-custom-1 rounded-md" />
  );
};