import { BigArrowUpLayer } from "@/types/canvas";
import { memo } from "react";
import { BaseShape } from "./base-shape";
import { Socket } from "socket.io-client";

interface BigArrowUpProps {
  id: string;
  layer: BigArrowUpLayer;
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

export const BigArrowUp = memo(({ ...props }: BigArrowUpProps) => {
  const { width, height } = props.layer;
  
  // Arrow dimensions
  const arrowHeadHeight = Math.min(height * 0.8, width * 0.7);  // Arrow head takes up to 80% height or 70% width
  
  // Text container dimensions
  const textContainer = {
    width: width * 0.5,                    // 50% of total width
    height: height - arrowHeadHeight / 2,  // Full height minus half arrow head
    x: (width - width * 0.5) / 2,         // Centered horizontally
    y: arrowHeadHeight / 2                // Start below arrow head
  };

  return (
    <BaseShape
      {...props}
      renderShape={(fillColor, strokeColor) => (
        <path
          d={`M ${width / 2} 0 L 0 ${arrowHeadHeight / 2} L ${width / 4} ${arrowHeadHeight / 2} L ${width / 4} ${height} L ${width * 3 / 4} ${height} L ${width * 3 / 4} ${arrowHeadHeight / 2} L ${width} ${arrowHeadHeight / 2} Z`}
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

BigArrowUp.displayName = 'BigArrowUp';