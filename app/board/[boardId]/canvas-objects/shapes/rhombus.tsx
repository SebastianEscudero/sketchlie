import { RhombusLayer } from "@/types/canvas";
import { memo } from "react";
import { BaseShape } from "./base-shape";
import { Socket } from "socket.io-client";

interface RhombusProps {
  id: string;
  layer: RhombusLayer;
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

export const Rhombus = memo(({ ...props }: RhombusProps) => {
  const { width, height } = props.layer;
  
  // Text container dimensions - using 50% of rhombus dimensions
  const textContainer = {
    width: width * 0.50,    // 50% of rhombus width
    height: height * 0.50,  // 50% of rhombus height
    x: (width - width * 0.50) / 2,  // Centered horizontally
    y: (height - height * 0.50) / 2  // Centered vertically
  };

  return (
    <BaseShape
      {...props}
      renderShape={(fillColor, strokeColor) => (
        <path
          d={`M ${width / 2} 0 L ${width} ${height / 2} L ${width / 2} ${height} L 0 ${height / 2} Z`}
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

Rhombus.displayName = 'Rhombus';