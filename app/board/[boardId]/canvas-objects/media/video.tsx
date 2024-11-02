import { cn } from "@/lib/utils";
import { CanvasMode, CanvasState, VideoLayer } from "@/types/canvas";
import { useEffect, useState } from "react";

interface VideoProps {
  id: string;
  layer: VideoLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  showOverlay: boolean;
}

export const InsertVideo = ({
  id,
  layer,
  onPointerDown,
  showOverlay,
}: VideoProps) => {
  const { x, y, width, height, src } = layer;
  const [visibleControls, setVisibleControls] = useState(false);

  useEffect(() => {
    if (!showOverlay) setVisibleControls(false);
  }, [showOverlay]);

  return (
    <div
      className="absolute"
      style={{
        left: x,
        top: y,
        width: width,
        height: height,
      }}
      onPointerDown={(e) => onPointerDown(e, id)}
    >
      <video
        className="h-full w-full"
        loop
        playsInline
        controls={visibleControls}
        src={src}
        style={{
          pointerEvents: visibleControls ? 'auto' : 'none',
        }}
      />
      {!visibleControls && (
          <div 
            className={cn(
              "absolute w-full h-full flex items-center justify-center top-0 left-0",
              "transition-all duration-200",
              "bg-black bg-opacity-0 hover:bg-opacity-20"
            )}
            onClick={() => setVisibleControls(true)}
          />
        )}
    </div>
  );
};