import { colorToCss } from '@/lib/utils';
import { LineLayer } from '@/types/canvas';
import { cn } from '@/lib/utils';

interface LineProps {
  id: string;
  layer: LineLayer;
  onPointerDown?: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
  setAddedByLabel?: (addedBy: string) => void;
};

export const Line = ({
  id,
  layer,
  selectionColor,
  onPointerDown,
  setAddedByLabel,
}: LineProps) => {
  const { fill, x, y, width, height, center, addedBy } = layer;
  const fillColor = colorToCss(fill);
  const isTransparent = fillColor === 'rgba(0,0,0,0)';
  const baseStroke = selectionColor || (isTransparent ? "rgba(29, 29, 29, 1)" : fillColor);
  const end = { x: x + width, y: y + height };

  let pathData;
  if (center) {
    pathData = `M ${x} ${y} L ${center.x} ${center.y} L ${end.x} ${end.y}`;
  }

  return (
    <g className="group">
      <path
        onPointerDown={(e) => onPointerDown?.(e, id)}
        onPointerEnter={() => setAddedByLabel?.(addedBy || '')}
        onPointerLeave={() => setAddedByLabel?.('')}
        d={pathData}
        style={{
          '--base-stroke': baseStroke
        } as React.CSSProperties}
        className={cn(
          "transition-[stroke]",
          "stroke-[var(--base-stroke)]",
          "[#canvas.shapes-hoverable_.group:hover_&]:stroke-[#3390FF]"
        )}
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        pointerEvents="auto"
      />
    </g>
  );
};