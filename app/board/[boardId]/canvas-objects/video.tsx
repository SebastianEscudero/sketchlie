import { VideoLayer } from "@/types/canvas";
import { useEffect, useState, useCallback } from "react";

interface VideoProps {
  id: string;
  layer: VideoLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
  focused?: boolean;
  zoom: number;
  camera: { x: number; y: number };
}

const isMobileSafari = () => {
  const ua = window.navigator.userAgent;
  const iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i);
  const webkit = !!ua.match(/WebKit/i);
  return iOS && webkit && !ua.match(/CriOS/i);
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
  const [visibleControls, setVisibleControls] = useState(false);
  const [safariOffset, setSafariOffset] = useState(0);

  const calculateSafariOffset = useCallback(() => {
    if (isMobileSafari()) {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.clientHeight;
      const offset = windowHeight - documentHeight;
      setSafariOffset(offset > 0 ? offset : 0);
    }
  }, []);

  useEffect(() => {
    calculateSafariOffset();

    const resizeObserver = new ResizeObserver(() => {
      calculateSafariOffset();
    });

    resizeObserver.observe(document.documentElement);

    return () => {
      resizeObserver.disconnect();
    };
  }, [calculateSafariOffset]);

  useEffect(() => {
    if (!focused) setVisibleControls(false);
  }, [focused]);

  const transformedX = x * zoom + camera.x;
  const transformedY = y * zoom + camera.y + safariOffset;
  const transformedWidth = width * zoom;
  const transformedHeight = height * zoom;

  return (
    <div
      className="absolute"
      style={{
        transform: `translate(${transformedX}px, ${transformedY}px)`,
        width: `${transformedWidth}px`,
        height: `${transformedHeight}px`,
      }}
      onPointerDown={(e) => onPointerDown(e, id)}
      onPointerUp={() => setVisibleControls(true)}
    >
      <video
        className="h-full w-full"
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

interface VideoOutlineProps {
  selectionColor?: string;
  layer: any
};

export const VideoOutline = ({
  selectionColor,
  layer
}: VideoOutlineProps) => {
  const { x, y, width, height } = layer;

  return (
    <g transform={`translate(${x}, ${y})`} pointerEvents="auto">
      {selectionColor && (
        <rect
          width={width}
          height={height}
          stroke={selectionColor}
          strokeWidth="2"
          fill="none"
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      )}
    </g>
  )
}