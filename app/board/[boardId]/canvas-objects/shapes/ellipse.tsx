import { EllipseLayer } from "@/types/canvas";
import { memo } from "react";
import { BaseShape } from "./base-shape";
import { Socket } from "socket.io-client";

interface EllipseProps {
  id: string;
  layer: EllipseLayer;
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

export const Ellipse = memo(({ ...props }: EllipseProps) => {
  const { width, height } = props.layer;
  
  // Text container dimensions - using 70% of ellipse dimensions for better fit
  const textContainer = {
    width: width * 0.70,    // 70% of ellipse width
    height: height * 0.70,  // 70% of ellipse height
    x: (width - width * 0.70) / 2,  // Centered horizontally
    y: (height - height * 0.70) / 2  // Centered vertically
  };

  return (
    <BaseShape
      {...props}
      renderShape={(fillColor, strokeColor) => (
        <ellipse
          cx={width / 2}    // Center X coordinate
          cy={height / 2}   // Center Y coordinate
          rx={width / 2}    // Radius X (half the width)
          ry={height / 2}   // Radius Y (half the height)
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

Ellipse.displayName = 'Ellipse';