import { StarLayer } from "@/types/canvas";
import { memo } from "react";
import { BaseShape } from "./base-shape";
import { Socket } from "socket.io-client";

interface StarProps {
  id: string;
  layer: StarLayer;
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

export const Star = memo(({ ...props }: StarProps) => {
  const { width, height } = props.layer;
  
  // Text container dimensions
  const textContainer = {
    width: width * 0.35,    // 35% of star width
    height: height * 0.4,   // 40% of star height
    x: (width - width * 0.35) / 2,  // Centered horizontally
    y: (height - height * 0.4) / 1.65  // Slightly above center vertically
  };

  return (
    <BaseShape
      {...props}
      renderShape={(fillColor, strokeColor) => (
        <path
          d={`M ${width * 0.5}, 0 L ${width * 0.67},${height * 0.35} L ${width},${height * 0.38} L ${width * 0.72},${height * 0.6} L ${width * 0.83},${height} L ${width * 0.5},${height * 0.77} L ${width * 0.17},${height} L ${width * 0.28},${height * 0.6} L 0,${height * 0.38} L ${width * 0.33},${height * 0.35} Z`}
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

Star.displayName = 'Star';