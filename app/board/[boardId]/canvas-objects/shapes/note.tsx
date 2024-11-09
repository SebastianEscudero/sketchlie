import { NoteLayer } from "@/types/canvas";
import { memo } from "react";
import { BaseShape } from "./base-shape";
import { Socket } from "socket.io-client";
import { cn } from "@/lib/utils";

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
        <>
          <foreignObject
            width={width}
            height={height}
            style={{
              boxShadow: `
              rgba(15, 23, 31, 0.6) 0px 4.20817px 5px -5px,
              rgba(15, 23, 31, 0.38) 0px 9.5428px 11.5428px -8.75097px,
              rgba(15, 23, 44, 0.02) 0px 48px 10px -10px inset
            `,
            }}
          />
          <rect
            width={width}
            height={height}
            fill={fillColor}
          />
        </>
      )}
      foreignObjectDimensions={textContainer}
    />
  );
});

Note.displayName = 'Note';