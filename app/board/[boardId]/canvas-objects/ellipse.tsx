import { colorToCss } from "@/lib/utils";
import { EllipseLayer } from "@/types/canvas";

interface EllipseProps {
  id: string;
  layer: EllipseLayer;
  onPointerDown?: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
};

export const Ellipse = ({
  id,
  layer,
  onPointerDown,
  selectionColor,
}: EllipseProps) => {

  const outlineColor = layer.outlineFill ? colorToCss(layer.outlineFill) : null;
  const fillColor = colorToCss(layer.fill);

  if (!layer.fill) {
    return null;
  }

  return (
    <ellipse
      className="drop-shadow-md"
      onPointerDown={onPointerDown ? (e) => onPointerDown(e, id) : undefined}
      style={{
        transform: `translate(
          ${layer.x}px,
          ${layer.y}px
        )`
      }}
      cx={layer.width / 2}
      cy={layer.height / 2}
      rx={layer.width / 2}
      ry={layer.height / 2}
      fill={fillColor}
      stroke={selectionColor || outlineColor || undefined}
      strokeWidth="2"
    />
  );
};