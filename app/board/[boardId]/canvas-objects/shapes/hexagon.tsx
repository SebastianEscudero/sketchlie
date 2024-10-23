import { HexagonLayer } from "@/types/canvas";
import { memo } from "react";
import { BaseShape } from "./base-shape";
import { Socket } from "socket.io-client";

interface HexagonProps {
  id: string;
  layer: HexagonLayer;
  boardId?: string;
  onPointerDown?: (e: any, id: string) => void;
  selectionColor?: string;
  expired?: boolean;
  socket?: Socket;
  focused?: boolean;
  forcedRender?: boolean;
  showOutlineOnHover?: boolean;
  setAddedByLabel?: (addedBy: string) => void;
}; 

export const Hexagon = memo(({ ...props }: HexagonProps) => {
  const { width, height } = props.layer;
  
  // Define hexagon points
  const points = {
    topCenter: { x: width * 0.5, y: 0 },           // Top point
    topRight: { x: width, y: height * 0.25 },      // Top right point
    bottomRight: { x: width, y: height * 0.75 },   // Bottom right point
    bottomCenter: { x: width * 0.5, y: height },   // Bottom point
    bottomLeft: { x: 0, y: height * 0.75 },        // Bottom left point
    topLeft: { x: 0, y: height * 0.25 }           // Top left point
  };

  // Text container dimensions - using 65% of hexagon dimensions for better fit
  const textContainer = {
    width: width * 0.65,    // 65% of hexagon width
    height: height * 0.65,  // 65% of hexagon height
    x: (width - width * 0.65) / 2,  // Centered horizontally
    y: (height - height * 0.65) / 2  // Centered vertically
  };

  return (
    <BaseShape
      {...props}
      renderShape={(fillColor, strokeColor) => (
        <path
          d={`M ${width * 0.5},0 L ${width},${height * 0.25} L ${width},${height * 0.75} L ${width * 0.5},${height} L 0,${height * 0.75} L 0,${height * 0.25} Z`}
          fill={fillColor}
          stroke={strokeColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
      foreignObjectDimensions={textContainer}
    />
  );
});

Hexagon.displayName = 'Hexagon';