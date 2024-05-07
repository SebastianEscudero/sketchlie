import { colorToCss } from '@/lib/utils';
import { ArrowLayer } from '@/types/canvas';
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
    const { fill, x, y, width, height, center } = layer;
  
    const end = { x: x + width, y: y + height };
  
    const fillColor = colorToCss(fill);

    const isTransparent = fillColor === 'rgba(0,0,0,0)';

    let pathData;
    let angle;
    if (center) {
      pathData = `M ${x} ${y} L ${center.x} ${center.y} L ${end.x} ${end.y}`;
      angle = Math.atan2(end.y - center.y, end.x - center.x) * (180 / Math.PI);
    }
  
    const arrowheadPath = `M ${end.x+3} ${end.y} l -15 -5 l 0 10 l 15 -5 Z`;
          
    return (
      <>
        <path
          onPointerDown={onPointerDown ? (e) => onPointerDown(e, id) : undefined}
          d={pathData}
          fill="none"
          stroke={selectionColor || (isTransparent ? "#000" : fillColor)}
          strokeWidth="2"
        />
        <path
          d={arrowheadPath}
          fill={selectionColor || (isTransparent ? "#000" : fillColor)}
          onPointerDown={onPointerDown ? (e) => onPointerDown(e, id) : undefined}
          transform={`rotate(${angle}, ${end.x}, ${end.y})`}
        />
      </>
    );
  };