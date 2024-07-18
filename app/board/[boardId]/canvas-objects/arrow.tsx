import { useRoom } from '@/components/room';
import { colorToCss, getArrowHeadAngle, getArrowPath } from '@/lib/utils';
import { ArrowHead, ArrowLayer, ArrowType } from '@/types/canvas';

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
  const { liveLayers } = useRoom();

  const startConnectedLayer = liveLayers[layer.startConnectedLayerId as string];
  const endConnectedLayer = liveLayers[layer.endConnectedLayerId as string];



  let start = { x: x, y: y };
  let end = { x: x + width, y: y + height };

  const fillColor = colorToCss(fill);

  const isTransparent = fillColor === 'rgba(0,0,0,0)';

  let pathData;
  let startAngle, endAngle;
  if (center) {
    ({ startAngle, endAngle } = getArrowHeadAngle(start, center, end, layer.arrowType || ArrowType.Straight, startConnectedLayer, endConnectedLayer));
    pathData = getArrowPath(layer.arrowType || ArrowType.Straight, start, center, end, startConnectedLayer, endConnectedLayer);
  }

  const arrowheadPath = `M -6 -4 L 0 0 L -6 4`;

  return (
    <>
      {startArrowHead === ArrowHead.Triangle && (
        <path
          d={arrowheadPath}
          stroke={selectionColor || (isTransparent ? "rgba(29, 29, 29, 1)" : fillColor)}
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
        stroke={selectionColor || (isTransparent ? "rgba(29, 29, 29, 1)" : fillColor)}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {endArrowHead === ArrowHead.Triangle && (
        <path
          d={arrowheadPath}
          stroke={selectionColor || (isTransparent ? "rgba(29, 29, 29, 1)" : fillColor)}
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