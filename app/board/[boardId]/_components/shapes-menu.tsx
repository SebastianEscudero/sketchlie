import { CanvasMode, LayerType, ToolbarMenu } from "@/types/canvas";
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
import { ExtraSmallToolButton } from "./tool-button";
import { LineIcon } from "@/public/custom-icons/line";
import { AnimatedToolbarMenu } from "./toolbar";

interface ShapesMenuProps {
  setCanvasState: (state: any) => void;
  canvasState: any;
  isShapesMenuOpen: boolean;
  setToolbarMenu: (menu: ToolbarMenu) => void;
}

export const ShapesMenu = ({
  setCanvasState,
  canvasState,
  isShapesMenuOpen,
  setToolbarMenu,
}: ShapesMenuProps) => {
  const shapes = [
    { icon: Square, type: LayerType.Rectangle },
    { icon: Circle, type: LayerType.Ellipse },
    { icon: Diamond, type: LayerType.Rhombus },
    { icon: Triangle, type: LayerType.Triangle },
    { icon: Star, type: LayerType.Star },
    { icon: Hexagon, type: LayerType.Hexagon },
    { icon: MessageSquare, type: LayerType.CommentBubble },
    { icon: LineIcon, type: LayerType.Line },
    { icon: ArrowBigLeft, type: LayerType.BigArrowLeft },
    { icon: ArrowBigUp, type: LayerType.BigArrowUp },
    { icon: ArrowBigDown, type: LayerType.BigArrowDown },
    { icon: ArrowBigRight, type: LayerType.BigArrowRight },
  ];

  return (
    <AnimatedToolbarMenu
      isOpen={isShapesMenuOpen}
      className="left-[20px] bottom-16"
    >
      <div className="grid grid-cols-4 gap-1 auto-rows-auto">
        {shapes.map((shape) => (
          <ExtraSmallToolButton
            key={shape.type}
            icon={shape.icon}
            onClick={() => {
              setCanvasState({
                mode: CanvasMode.Inserting,
                layerType: shape.type,
              })
              setToolbarMenu(ToolbarMenu.None)
            }}
            isActive={
              canvasState.mode === CanvasMode.Inserting &&
              canvasState.layerType === shape.type
            }
          />
        ))}
      </div>
    </AnimatedToolbarMenu>
  );
};