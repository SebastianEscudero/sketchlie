import { NoteLayer } from "@/types/canvas";
import { memo } from "react";
import { BaseShape } from "./base-shape";
import { Socket } from "socket.io-client";

interface NoteProps {
  id: string;
  layer: NoteLayer;
  boardId?: string;
  onPointerDown?: (e: any, id: string) => void;
  selectionColor?: string;
  expired?: boolean;
  socket?: Socket;
  focused?: boolean;
  forcedRender?: boolean;
  setAddedByLabel?: (addedBy: string) => void;
}; 

export const Note = memo(({ ...props }: NoteProps) => {
  const { width, height } = props.layer;
  
  // Text container dimensions - using full dimensions for sticky note
  const textContainer = {
    width: width,      // Full width
    height: height,    // Full height
    x: 0,             // No offset needed
    y: 0              // No offset needed
  };

  return (
    <BaseShape
      {...props}
      renderShape={(fillColor) => (
        <g filter="url(#drop-shadow)">
          <rect
            width={width}
            height={height}
            fill={fillColor}
            strokeWidth="1"
          />
        </g>
      )}
      foreignObjectDimensions={textContainer}
    />
  );
});

Note.displayName = 'Note';