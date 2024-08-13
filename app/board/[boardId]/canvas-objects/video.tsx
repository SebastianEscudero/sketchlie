import React from 'react';
import { VideoLayer } from "@/types/canvas";

interface VideoProps {
  isUploading: boolean;
  id: string;
  layer: VideoLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
  focused?: boolean;
};

export const InsertVideo = ({
  isUploading,
  id,
  layer,
  onPointerDown,
  selectionColor,
  focused,
}: VideoProps) => {
  const { x, y, width, height, src } = layer;

  if (!isUploading) {
    return (
      <>
        {selectionColor && (
          <rect
            x={x}
            y={y}
            width={width}
            height={height}
            stroke={selectionColor}
            strokeWidth="2"
            fill="none"
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        )}
        <foreignObject
          x={x}
          y={y}
          width={width}
          height={height}
          onPointerDown={(e) => onPointerDown(e, id)}
        >
          <video
            width="100%"
            height="100%"
            autoPlay
            loop
            playsInline
            controls={focused}
            src={src}
            style={{ pointerEvents: focused ? 'auto' : 'none' }}

          />
        </foreignObject>
      </>
    );
  } else {
    return null;
  }
};
