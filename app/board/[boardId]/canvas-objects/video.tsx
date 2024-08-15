import { VideoLayer } from "@/types/canvas";
import { useEffect, useState } from "react";

interface VideoProps {
  id: string;
  layer: VideoLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
  focused?: boolean;
  zoom: number;
  camera: { x: number; y: number };
};

export const InsertVideo = ({
  id,
  layer,
  onPointerDown,
  selectionColor,
  focused,
  zoom,
  camera,
}: VideoProps) => {
  const { x, y, width, height, src } = layer;
  const transformedX = x * zoom + camera.x;
  const transformedY = y * zoom + camera.y;
  const transformedWidth = width * zoom;
  const transformedHeight = height * zoom;

  const [visibleControls, setVisibleControls] = useState(false);

  useEffect(() => {
    if (!focused) setVisibleControls(false);
  }, [focused]);

  return (
    <div
      style={{
        position: 'absolute',
        transform: `translate(${transformedX}px, ${transformedY}px)`,
        width: `${transformedWidth}px`,
        height: `${transformedHeight}px`,
        zIndex: 1,  // Keep this positive but lower than UI layer
        outline: `1px solid ${selectionColor}`
      }}
      onPointerDown={(e) => onPointerDown(e, id)}
      onPointerUp={() => setVisibleControls(true)}
    >
      <video
        width="100%"
        height="100%"
        autoPlay
        loop
        playsInline
        controls={visibleControls}
        src={src}
        onBlur={() => setVisibleControls(false)}
        style={{
          pointerEvents: visibleControls ? 'auto' : 'none',
        }}
      />
    </div>
  );
};