import { CanvasMode, LayerType } from "@/types/canvas";
import {
    ArrowBigDown,
    ArrowBigLeft,
    ArrowBigRight,
    ArrowBigUp,
    Circle,
    Diamond,
    Hexagon,
    MessageSquare,
    Square,
    Star,
    Triangle,
} from "lucide-react";
import { ToolButton } from "./tool-button";
import { LineIcon } from "@/public/custom-cursors/line";

interface ShapesMenuProps {
    setCanvasState: (state: any) => void;
    canvasState: any;
}

export const ShapesMenu = ({
    setCanvasState,
    canvasState,
}: ShapesMenuProps) => {
    return (
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
    )
};