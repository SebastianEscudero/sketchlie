import { colorToCss } from '@/lib/utils';
import { ArrowHead, ArrowLayer } from '@/types/canvas';

interface ArrowProps {
  id: string;
  layer: ArrowLayer;
  onPointerDown?: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
};

export const Arrow = ({
  id,
  layer,
  selectionColor,
  onPointerDown,
}: ArrowProps) => {
  const { fill, width, height, center, x, y, startArrowHead, endArrowHead } = layer;

  let start = { x: x, y: y };
  let end = { x: x + width, y: y + height };

  const fillColor = colorToCss(fill);

  const isTransparent = fillColor === 'rgba(0,0,0,0)';

  let pathData;
  let startAngle, endAngle;
  if (center) {
    startAngle = Math.atan2(center.y - start.y, center.x - start.x) * (180 / Math.PI) - 180;
    endAngle = Math.atan2(end.y - center.y, end.x - center.x) * (180 / Math.PI);
    pathData = `M ${start.x} ${start.y} L ${center.x} ${center.y} L ${end.x} ${end.y}`;
  }

  const arrowheadPath = `M -6 -4 L 0 0 L -6 4`;

  return (
    <>
      {startArrowHead === ArrowHead.Triangle && (
        <path
          d={arrowheadPath}
          stroke={selectionColor || (isTransparent ? "#000" : fillColor)}
          fill="none"
          onPointerDown={onPointerDown ? (e) => onPointerDown(e, id) : undefined}
          transform={`translate(${start.x}, ${start.y}) rotate(${startAngle})`}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin='round'
        />
      )}
      <path
        onPointerDown={onPointerDown ? (e) => onPointerDown(e, id) : undefined}
        d={pathData}
        fill="none"
        stroke={selectionColor || (isTransparent ? "#000" : fillColor)}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {endArrowHead === ArrowHead.Triangle && (
        <path
          d={arrowheadPath}
          stroke={selectionColor || (isTransparent ? "#000" : fillColor)}
          fill="none"
          onPointerDown={onPointerDown ? (e) => onPointerDown(e, id) : undefined}
          transform={`translate(${end.x}, ${end.y}) rotate(${endAngle})`}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin='round'
        />
      )}
    </>
  );
};