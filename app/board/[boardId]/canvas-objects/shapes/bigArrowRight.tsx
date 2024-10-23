import { BigArrowRightLayer } from "@/types/canvas";
import { memo } from "react";
import { BaseShape } from "./base-shape";
import { Socket } from "socket.io-client";

interface BigArrowRightProps {
  id: string;
  layer: BigArrowRightLayer;
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

export const BigArrowRight = memo(({ ...props }: BigArrowRightProps) => {
  const { width, height } = props.layer;
  
  // Arrow dimensions
  const arrowHeadWidth = Math.min(height * 0.8, width * 0.7);  // Arrow head takes up to 80% height or 70% width
  
  // Text container dimensions
  const textContainer = {
    width: width - arrowHeadWidth / 2,     // Full width minus half arrow head
    height: height * 0.5,                  // 50% of total height
    x: 0,                                 // Start from left
    y: (height - height * 0.5) / 2        // Centered vertically
  };

  return (
    <BaseShape
      {...props}
      renderShape={(fillColor, strokeColor) => (
        <path
          d={`M ${width} ${height / 2} L ${width - arrowHeadWidth / 2} 0 L ${width - arrowHeadWidth / 2} ${height / 4} L 0 ${height / 4} L 0 ${height * 3 / 4} L ${width - arrowHeadWidth / 2} ${height * 3 / 4} L ${width - arrowHeadWidth / 2} ${height} Z`}
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

BigArrowRight.displayName = 'BigArrowRight';