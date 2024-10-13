import { colorToCss } from '@/lib/utils';
import { LineLayer } from '@/types/canvas';
import React, { useState, useEffect } from 'react';

interface LineProps {
  id: string;
  layer: LineLayer;
  onPointerDown?: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
  forcedRender?: boolean;
  showOutlineOnHover?: boolean;
};

export const Line = ({
  id,
  layer,
  selectionColor,
  onPointerDown,
  forcedRender = false,
  showOutlineOnHover = false,
}: LineProps) => {
  const { fill, x, y, width, height, center } = layer;
  const fillColor = colorToCss(fill);
  const [strokeColor, setStrokeColor] = useState(selectionColor || colorToCss(fill));
  const end = { x: x + width, y: y + height };

  useEffect(() => {
    setStrokeColor(selectionColor || colorToCss(fill));
  }, [selectionColor, fill, forcedRender]);

  const isTransparent = fillColor === 'rgba(0,0,0,0)';

  let pathData;
  if (center) {
    pathData = `M ${x} ${y} L ${center.x} ${center.y} L ${end.x} ${end.y}`;
  }

  const handlePointerDown = (e: React.PointerEvent) => {
    setStrokeColor(selectionColor || colorToCss(fill));
    if (onPointerDown) {
      onPointerDown(e, id);
    }
  }

  return (
    <path
      onPointerDown={handlePointerDown}
      d={pathData}
      fill="none"
      stroke={selectionColor || (isTransparent ? "rgba(29, 29, 29, 1)" : strokeColor)}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      pointerEvents="auto"
      onPointerEnter={() => { if (showOutlineOnHover) { setStrokeColor("#3390FF") } }}
      onPointerLeave={() => setStrokeColor(selectionColor || colorToCss(fill))}
    />
  );
};