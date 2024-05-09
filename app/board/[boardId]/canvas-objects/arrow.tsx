import { colorToCss } from '@/lib/utils';
import { ArrowHead, ArrowLayer } from '@/types/canvas';
import React from 'react';

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
  const { fill, x, y, width, height, center, startArrowHead, endArrowHead } = layer;

  const start = { x, y };
  const end = { x: x + width, y: y + height };

  const fillColor = colorToCss(fill);

  const isTransparent = fillColor === 'rgba(0,0,0,0)';

  let pathData;
  let startAngle, endAngle;
  if (center) {
    startAngle = Math.atan2(center.y - start.y, center.x - start.x) * (180 / Math.PI) - 180;
    endAngle = Math.atan2(end.y - center.y, end.x - center.x) * (180 / Math.PI);
    pathData = `M ${x} ${y} L ${center.x} ${center.y} L ${end.x} ${end.y}`;
  }

  const arrowheadPath = `M 4 0 l -15 -5 l 0 10 l 15 -5 Z`;
        
  return (
    <>
      {startArrowHead === ArrowHead.Triangle && (
        <path
          d={arrowheadPath}
          fill={selectionColor || (isTransparent ? "#000" : fillColor)}
          onPointerDown={onPointerDown ? (e) => onPointerDown(e, id) : undefined}
          transform={`translate(${start.x}, ${start.y}) rotate(${startAngle})`}
        />
      )}
      <path
        onPointerDown={onPointerDown ? (e) => onPointerDown(e, id) : undefined}
        d={pathData}
        fill="none"
        stroke={selectionColor || (isTransparent ? "#000" : fillColor)}
        strokeWidth="2"
      />
      {endArrowHead === ArrowHead.Triangle && (
        <path
          d={arrowheadPath}
          fill={selectionColor || (isTransparent ? "#000" : fillColor)}
          onPointerDown={onPointerDown ? (e) => onPointerDown(e, id) : undefined}
          transform={`translate(${end.x}, ${end.y}) rotate(${endAngle})`}
        />
      )}
    </>
  );
};