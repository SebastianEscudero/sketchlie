import { cn } from "@/lib/utils";
import { VideoLayer } from "@/types/canvas";
import { useEffect, useState } from "react";

interface VideoProps {
  id: string;
  layer: VideoLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  showOverlay: boolean;
  selectionColor?: string;
}

export const InsertVideo = ({
  id,
  layer,
  onPointerDown,
  selectionColor,
  showOverlay
}: VideoProps) => {
  const { x, y, width, height, src } = layer;
  const [visibleControls, setVisibleControls] = useState(false);

  useEffect(() => {
    if (!showOverlay) setVisibleControls(false);
  }, [showOverlay]);

  return (
    <div
      className="absolute group"
      style={{
        left: x,
        top: y,
        width: width,
        height: height,
        outline: selectionColor ? `1px solid ${selectionColor}` : visibleControls ? '1px solid #3390FF' : 'none',
      }}
      onPointerDown={(e) => onPointerDown(e, id)}
    >
      <video
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
            "bg-black bg-opacity-0",
            "[#canvas.shapes-hoverable_.group:hover_&]:bg-opacity-20",
            "shape-hover-effect"
          )}
          onClick={() => setVisibleControls(true)}
        />
      )}
    </div>
  );
};