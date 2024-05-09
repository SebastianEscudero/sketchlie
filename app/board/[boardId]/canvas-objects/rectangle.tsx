import { colorToCss } from "@/lib/utils";
import { RectangleLayer } from "@/types/canvas";

interface RectangleProps {
  id: string;
  layer: RectangleLayer;
  onPointerDown?: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
};

export const Rectangle = ({
  id,
  layer,
  onPointerDown,
  selectionColor,
}: RectangleProps) => {
  const { x, y, width, height, fill, outlineFill} = layer;

  if (!fill) {
    return null;
  }

  const fillColor = colorToCss(fill);
  const outlineColor = outlineFill ? colorToCss(outlineFill) : null;

  return (
    <rect
      className="drop-shadow-md"
      onPointerDown={onPointerDown ? (e) => onPointerDown(e, id) : undefined}
      style={{
        transform: `translate(${x}px, ${y}px)`,
      }}
      x={0}
      y={0}
      width={width}
      height={height}
      strokeWidth={2}
      fill={fillColor}
      stroke={selectionColor || outlineColor || undefined}
    />
  );
};