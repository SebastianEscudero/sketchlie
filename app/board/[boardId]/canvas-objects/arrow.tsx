import { colorToCss, getArrowHeadAngle, getArrowPath } from '@/lib/utils';
import { ArrowHead, ArrowLayer, ArrowType, Layer } from '@/types/canvas';
import { useState, useEffect, memo } from 'react';

interface ArrowProps {
  id: string;
  layer: ArrowLayer;
  onPointerDown?: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
  startConnectedLayer?: Layer;
  endConnectedLayer?: Layer;
  forcedRender?: boolean;
  showOutlineOnHover?: boolean;
  setAddedByLabel?: (addedBy: string) => void;
};

export const Arrow = memo(({
  id,
  layer,
  selectionColor,
  onPointerDown,
  forcedRender = false,
  showOutlineOnHover = false,
  setAddedByLabel,
}: ArrowProps) => {
  const { fill, width, height, center, x, y, startArrowHead, endArrowHead, orientation, addedBy } = layer;
  const [strokeColor, setStrokeColor] = useState(selectionColor || colorToCss(fill));

  useEffect(() => {
    setStrokeColor(selectionColor || colorToCss(fill));
  }, [selectionColor, fill, forcedRender]);

  let start = { x: x, y: y };
  let end = { x: x + width, y: y + height };

  const fillColor = colorToCss(fill);

  const isTransparent = fillColor === 'rgba(0,0,0,0)';

  let pathData;
  let startAngle, endAngle;
  if (center) {
    ({ startAngle, endAngle } = getArrowHeadAngle(start, center, end, layer.arrowType || ArrowType.Straight, orientation));
    pathData = getArrowPath(layer.arrowType || ArrowType.Straight, start, center, end, orientation);
  }

  const arrowheadPath = `M -6 -4 L 0 0 L -6 4`;
  const handlePointerDown = (e: React.PointerEvent) => {
    setStrokeColor(selectionColor || colorToCss(fill));
    if (onPointerDown) {
      onPointerDown(e, id);
    }
  }

  return (
    <>
      {startArrowHead === ArrowHead.Triangle && (
        <path
          d={arrowheadPath}
          stroke={selectionColor || (isTransparent ? "rgba(29, 29, 29, 1)" : strokeColor)}
          fill="none"
          onPointerDown={handlePointerDown}
          transform={`translate(${start.x}, ${start.y}) rotate(${startAngle})`}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin='round'
          pointerEvents="auto"
        />
      )}
      <path
        onPointerDown={handlePointerDown}
        d={pathData}
        fill="none"
        stroke={selectionColor || (isTransparent ? "rgba(29, 29, 29, 1)" : strokeColor)}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        pointerEvents="auto"
        onPointerEnter={() => { if (showOutlineOnHover) { setStrokeColor("#3390FF"); setAddedByLabel?.(addedBy || '') } }}
        onPointerLeave={() => { setStrokeColor(selectionColor || colorToCss(fill)); setAddedByLabel?.('') }}
      />
      {endArrowHead === ArrowHead.Triangle && (
        <path
          d={arrowheadPath}
          stroke={selectionColor || (isTransparent ? "rgba(29, 29, 29, 1)" : strokeColor)}
          fill="none"
          onPointerDown={handlePointerDown}
          transform={`translate(${end.x}, ${end.y}) rotate(${endAngle})`}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin='round'
          pointerEvents="auto"
        />
      )}
    </>
  );
});

Arrow.displayName = 'Arrow';