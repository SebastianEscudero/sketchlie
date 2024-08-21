import { CanvasMode, CanvasState, LinkLayer } from "@/types/canvas";
import { useEffect, useState, useCallback } from "react";

interface LinkProps {
  id: string;
  layer: LinkLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  focused?: boolean;
  zoom: number;
  camera: { x: number; y: number };
  canvasState: CanvasState;
}

const isMobileSafari = () => {
  const ua = window.navigator.userAgent;
  const iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i);
  const webkit = !!ua.match(/WebKit/i);
  return iOS && webkit && !ua.match(/CriOS/i);
};

export const InsertLink = ({
  id,
  layer,
  onPointerDown,
  focused,
  zoom,
  camera,
  canvasState,
}: LinkProps) => {
  const { x, y, width, height, src } = layer;
  const [visibleControls, setVisibleControls] = useState(false);
  const [safariOffset, setSafariOffset] = useState(0);

  const calculateSafariOffset = useCallback(() => {
    if (isMobileSafari()) {
      setSafariOffset(38)
    }
  }, []);

  useEffect(() => {
    calculateSafariOffset();
  }, [calculateSafariOffset]);

  useEffect(() => {
    if (canvasState.mode !== CanvasMode.None) setVisibleControls(false);
  }, [canvasState.mode]);

  useEffect(() => {
    if (!focused) setVisibleControls(false);
  }, [focused]);

  const transformedX = x * zoom + camera.x;
  const transformedY = y * zoom + camera.y + safariOffset;
  const transformedWidth = width * zoom;
  const transformedHeight = height * zoom;

  return (
    <div
      className="absolute shadow-custom-2 rounded-md"
      style={{
        transform: `translate(${transformedX}px, ${transformedY}px)`,
        width: `${transformedWidth}px`,
        height: `${transformedHeight}px`,
      }}
      onPointerDown={(e) => onPointerDown(e, id)}
      onPointerUp={() => {setVisibleControls(true)}}
    >
      <iframe
        className="h-full w-full rounded-md"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        title="Link"
        allowFullScreen
        src={src}
        onBlur={() => setVisibleControls(false)}
        style={{
          pointerEvents: visibleControls ? "auto" : "none",
        }}
      />
    </div>
  );
};

interface LinkOutlineProps {
  selectionColor?: string;
  layer: any
};

export const LinkOutline = ({
  selectionColor,
  layer
}: LinkOutlineProps) => {
  const { x, y, width, height } = layer;

  return (
    <g transform={`translate(${x}, ${y})`} pointerEvents="auto">
      <rect
        width={width}
        height={height}
        stroke={selectionColor}
        strokeWidth="2"
        fill="none"
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </g>
  )
}