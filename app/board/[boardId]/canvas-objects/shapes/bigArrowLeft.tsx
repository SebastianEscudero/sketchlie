import { BigArrowLeftLayer } from "@/types/canvas";
import { memo } from "react";
import { BaseShape } from "./base-shape";
import { Socket } from "socket.io-client";

interface BigArrowLeftProps {
  id: string;
  layer: BigArrowLeftLayer;
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

export const BigArrowLeft = memo(({ ...props }: BigArrowLeftProps) => {
  const { width, height } = props.layer;
  
  // Arrow dimensions
  const arrowHeadWidth = Math.min(height * 0.8, width * 0.7);  // Arrow head takes up to 80% height or 70% width
  
  // Text container dimensions
  const textContainer = {
    width: width - arrowHeadWidth / 2,     // Full width minus half arrow head
    height: height * 0.5,                  // 50% of total height
    x: arrowHeadWidth / 2,                // Start after arrow head
    y: (height - height * 0.5) / 2        // Centered vertically
  };

  return (
    <BaseShape
      {...props}
      renderShape={(fillColor, strokeColor) => (
        <path
          d={`M ${arrowHeadWidth / 2} ${height} L 0 ${height / 2} L ${arrowHeadWidth / 2} 0 L ${arrowHeadWidth / 2} ${height / 4} L ${width} ${height / 4} L ${width} ${height * 3 / 4} L ${arrowHeadWidth / 2} ${height * 3 / 4} Z`}
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

BigArrowLeft.displayName = 'BigArrowLeft';