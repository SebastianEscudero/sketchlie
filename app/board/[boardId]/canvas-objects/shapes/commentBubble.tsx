import { CommentBubbleLayer } from "@/types/canvas";
import { memo } from "react";
import { BaseShape } from "./base-shape";
import { Socket } from "socket.io-client";

interface CommentBubbleProps {
  id: string;
  layer: CommentBubbleLayer;
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

export const CommentBubble = memo(({ ...props }: CommentBubbleProps) => {
  const { width, height } = props.layer;
  
  // Bubble dimensions
  const bubbleHeight = height * 4/5;  // Main bubble takes 80% of height
  const tailWidth = width / 5;        // Tail width is 20% of total width
  const tailHeight = height - bubbleHeight; // Remaining height for tail
  
  // Text container dimensions
  const textContainer = {
    width: width,          // Full width
    height: bubbleHeight,  // Height of main bubble (80%)
    x: 0,                 // Start from left
    y: 0                  // Start from top
  };

  return (
    <BaseShape
      {...props}
      renderShape={(fillColor, strokeColor) => (
        <path
          d={`M 0 0 
             L ${width} 0 
             L ${width} ${bubbleHeight} 
             L ${width / 2.5} ${bubbleHeight} 
             L ${tailWidth} ${height} 
             L ${tailWidth} ${bubbleHeight} 
             L 0 ${bubbleHeight} 
             Z`}
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

CommentBubble.displayName = 'CommentBubble';