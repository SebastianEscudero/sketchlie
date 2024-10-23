import { RectangleLayer } from "@/types/canvas";
import { memo } from "react";
import { BaseShape } from "./base-shape";
import { Socket } from "socket.io-client";

interface RectangleProps {
  id: string;
  layer: RectangleLayer;
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

export const Rectangle = memo(({ ...props }: RectangleProps) => {
  const { width, height } = props.layer;
  
  // Text container dimensions - using full width/height of rectangle
  const textContainer = {
    width: width,      // 100% of rectangle width
    height: height,    // 100% of rectangle height
    x: 0,             // No offset needed as we're using full width
    y: 0              // No offset needed as we're using full height
  };

  return (
    <BaseShape
      {...props}
      renderShape={(fillColor, strokeColor) => (
        <rect
          width={width}
          height={height}
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

Rectangle.displayName = 'Rectangle';