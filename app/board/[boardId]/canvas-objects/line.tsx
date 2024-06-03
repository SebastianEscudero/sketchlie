import { colorToCss } from '@/lib/utils';
import { LineLayer } from '@/types/canvas';
import React from 'react';

interface LineProps {
    id: string;
    layer: LineLayer;
    onPointerDown?: (e: React.PointerEvent, id: string) => void;
    selectionColor?: string;
};

export const Line = ({
  id,
  layer,
  selectionColor,
  onPointerDown,
}: LineProps) => {
  const { fill, x, y, width, height, center } = layer;

  const end = { x: x + width, y: y + height };

  const fillColor = colorToCss(fill);

  const isTransparent = fillColor === 'rgba(0,0,0,0)';

  let pathData;
  if (center) {
    pathData = `M ${x} ${y} L ${center.x} ${center.y} L ${end.x} ${end.y}`;
  }
        
  return (
    <path
      onPointerDown={onPointerDown ? (e) => onPointerDown(e, id) : undefined}
      d={pathData}
      fill="none"
      stroke={selectionColor || (isTransparent ? "#000" : fillColor)}
      strokeWidth="2"
    />
  );
};