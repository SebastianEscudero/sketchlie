import getStroke from "perfect-freehand";

import { getSvgPathFromStroke } from "@/lib/utils";

interface PathProps {
  x: number;
  y: number;
  points: number[][];
  fill: string;
  onPointerDown?: (e: React.PointerEvent) => void;
  onPathErase?: (e: React.PointerEvent) => void;
  stroke?: string;
  strokeSize?: number | undefined;
};

export const Path = ({
  x,
  y,
  points,
  fill,
  onPointerDown,
  onPathErase,
  stroke,
  strokeSize,
}: PathProps) => {

  const isTransparent = fill === 'rgba(0,0,0,0)';

  return (
    <path
      onPointerMove={onPathErase}
      onPointerDown={onPointerDown}
      d={getSvgPathFromStroke(
        getStroke(points, {
          size: strokeSize || 4,
          smoothing: 0.4,
          streamline: 0.4,
        })
      )}
      style={{
        transform: `translate(${x}px, ${y}px)`,
      }}
      x={0}
      y={0}
      fill={isTransparent ? '#000' : fill}
      stroke={stroke}
      strokeWidth={1}
    />
  );
};