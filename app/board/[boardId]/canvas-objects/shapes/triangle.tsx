import { TriangleLayer } from "@/types/canvas";
import { memo } from "react";
import { BaseShape } from "./base-shape";
import { Socket } from "socket.io-client";

interface TriangleProps {
  id: string;
  layer: TriangleLayer;
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

export const Triangle = memo(({ ...props }: TriangleProps) => {
  const { width, height } = props.layer;
  
  // Text container dimensions - using 40% width and 60% height for better fit
  const textContainer = {
    width: width * 0.40,     // 40% of triangle width
    height: height * 0.60,   // 60% of triangle height
    x: (width - width * 0.40) / 2,  // Centered horizontally
    y: height - height * 0.60       // Positioned at bottom
  };

  return (
    <BaseShape
      {...props}
      renderShape={(fillColor, strokeColor) => (
        <polygon
          points={`${width / 2}, 0 ${width},${height} 0,${height}`}
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

Triangle.displayName = 'Triangle';