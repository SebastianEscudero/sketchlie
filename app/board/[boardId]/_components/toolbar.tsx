import {
  Circle,
  Eraser,
  Hand,
  Image,
  MousePointer2,
  MoveUpRight,
  Pencil,
  Square,
  StickyNote,
  Type,
} from "lucide-react";

import { CanvasMode, CanvasState, LayerType } from "@/types/canvas";

import { ToolButton } from "./tool-button";

import { ImageButton } from "./image-button";
import { Dispatch, SetStateAction, useState } from "react";
import { ColorButton } from "../selection-tools/color-picker";
import { Slider } from "@/components/ui/slider";

interface ToolbarProps {
  isUploading: boolean;
  setIsUploading: Dispatch<SetStateAction<boolean>>
  onImageSelect: (src: string) => void;
  canvasState: CanvasState;
  setCanvasState: (newState: CanvasState) => void;
  org: any;
  pathStrokeSize: number;
  setPathColor: any;
  setPathStrokeSize: any;
};

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
}: ToolbarProps) => {
  const [isPenMenuOpen, setIsPenMenuOpen] = useState(false);

  const onPathColorChange = (color: any) => {
    setPathColor(color);
  }

  const handleStrokeSizeChange = (value: number[]) => {
    setPathStrokeSize(value[0]);
  }

  return (
    <div className="absolute h-600:top-[50%] h-600:translate-y-[-50%] h-600:bottom-auto bottom-2 h-600:left-2 h-600:translate-x-0 left-[50%] translate-x-[-50%] flex flex-col">
      <div className="bg-white rounded-md p-1.5 flex h-600:gap-y-1 h-600:gap-x-0 gap-x-1 h-600:flex-col flex-row items-center shadow-md">
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
          label="Pen"
          icon={Pencil}
          onClick={() => {
            setCanvasState({
              mode: CanvasMode.Pencil,
            });
            setIsPenMenuOpen(!isPenMenuOpen);
          }}
          isActive={
            canvasState.mode === CanvasMode.Pencil
          }
        />
        <ToolButton
          label="Eraser"
          icon={Eraser}
          onClick={() => {
            setCanvasState({
              mode: CanvasMode.Eraser,
            });
          }}
          isActive={
            canvasState.mode === CanvasMode.Eraser
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

      {isPenMenuOpen && canvasState.mode === CanvasMode.Pencil &&
        <div className="absolute h-600:left-[125%] h-600:top-10 h-600:bottom-auto bottom-16 p-2 bg-white rounded-lg shadow-sm w-[200px] space-y-4 flex flex-col items-center cursor-default">
          <Slider
            defaultValue={[pathStrokeSize]}
            min={1}
            max={8}
            step={1}
            className='bg-white w-[90%] pt-3 cursor-pointer'
            onValueChange={handleStrokeSizeChange}
          />
          <div className="grid grid-cols-4 gap-[2px]" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <ColorButton color={{ r: 0, g: 0, b: 0, a: 0 }} onClick={onPathColorChange} />
            <ColorButton color={{ r: 255, g: 255, b: 255, a: 1 }} onClick={onPathColorChange} />
            <ColorButton color={{ r: 243, g: 82, b: 35, a: 1 }} onClick={onPathColorChange} />
            <ColorButton color={{ r: 255, g: 249, b: 177, a: 1 }} onClick={onPathColorChange} />
            <ColorButton color={{ r: 255, g: 244, b: 69, a: 1 }} onClick={onPathColorChange} />
            <ColorButton color={{ r: 68, g: 202, b: 99, a: 1 }} onClick={onPathColorChange} />
            <ColorButton color={{ r: 39, g: 142, b: 237, a: 1 }} onClick={onPathColorChange} />
            <ColorButton color={{ r: 155, g: 105, b: 245, a: 1 }} onClick={onPathColorChange} />
            <ColorButton color={{ r: 252, g: 142, b: 42, a: 1 }} onClick={onPathColorChange} />
            <ColorButton color={{ r: 1, g: 1, b: 1, a: 1 }} onClick={onPathColorChange} />
            <ColorButton color={{ r: 65, g: 75, b: 178, a: 1 }} onClick={onPathColorChange} />
            <ColorButton color={{ r: 128, g: 128, b: 128, a: 1 }} onClick={onPathColorChange} />
          </div>
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