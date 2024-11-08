import { colorToCss, getArrowHeadAngle, getArrowPath } from '@/lib/utils';
import { ArrowHead, ArrowLayer, ArrowType, Layer } from '@/types/canvas';
import { memo } from 'react';
import { cn } from '@/lib/utils';

interface ArrowProps {
  id: string;
  layer: ArrowLayer;
  onPointerDown?: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
  startConnectedLayer?: Layer;
  endConnectedLayer?: Layer;
  forcedRender?: boolean;
  setAddedByLabel?: (addedBy: string) => void;
};

export const Arrow = memo(({
  id,
  layer,
  selectionColor,
  onPointerDown,
  setAddedByLabel,
}: ArrowProps) => {
  const { fill, width, height, center, x, y, startArrowHead, endArrowHead, orientation, addedBy } = layer;
  const fillColor = colorToCss(fill);
  const isTransparent = fillColor === 'rgba(0,0,0,0)';
  const baseStroke = selectionColor || (isTransparent ? "rgba(29, 29, 29, 1)" : fillColor);

  let start = { x: x, y: y };
  let end = { x: x + width, y: y + height };
  let pathData;
  let startAngle, endAngle;
  
  if (center) {
    ({ startAngle, endAngle } = getArrowHeadAngle(start, center, end, layer.arrowType || ArrowType.Straight, orientation));
    pathData = getArrowPath(layer.arrowType || ArrowType.Straight, start, center, end, orientation);
  }

  const arrowheadPath = `M -6 -4 L 0 0 L -6 4`;

  return (
    <g className="group">
      {startArrowHead === ArrowHead.Triangle && (
        <path
          d={arrowheadPath}
          style={{
            '--base-stroke': baseStroke
          } as React.CSSProperties}
          className={cn(
            "transition-[stroke]",
            "stroke-[var(--base-stroke)]",
            "[#canvas.shapes-hoverable_.group:hover_&]:stroke-[#3390FF]"
          )}
          fill="none"
          onPointerDown={(e) => onPointerDown?.(e, id)}
          transform={`translate(${start.x}, ${start.y}) rotate(${startAngle})`}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin='round'
          pointerEvents="auto"
        />
      )}
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
      {endArrowHead === ArrowHead.Triangle && (
        <path
          d={arrowheadPath}
          style={{
            '--base-stroke': baseStroke
          } as React.CSSProperties}
          className={cn(
            "transition-[stroke]",
            "stroke-[var(--base-stroke)]",
            "[#canvas.shapes-hoverable_.group:hover_&]:stroke-[#3390FF]"
          )}
          fill="none"
          onPointerDown={(e) => onPointerDown?.(e, id)}
          transform={`translate(${end.x}, ${end.y}) rotate(${endAngle})`}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin='round'
          pointerEvents="auto"
        />
      )}
    </g>
  );
});

Arrow.displayName = 'Arrow';