import React, { useCallback, useState, useEffect, memo, useMemo } from 'react';
import { ImageLayer } from "@/types/canvas";
import { MoveCameraToLayer } from '../../_components/canvasUtils';

// Image cache for preloading
const imageCache = new Map<string, HTMLImageElement>();

const preloadImage = (src: string) => {
  if (!imageCache.has(src)) {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;
    imageCache.set(src, img);
    return img;
  }
  return imageCache.get(src)!;
};

interface ImageProps {
  id: string;
  layer: ImageLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  setCamera?: (camera: any) => void;
  setZoom?: (zoom: number) => void;
  cameraRef?: React.RefObject<any>;
  zoomRef?: React.RefObject<any>;
  selectionColor?: string;
  showOutlineOnHover?: boolean;
  setAddedByLabel?: (addedBy: string) => void;
};

export const InsertImage = memo(({
  id,
  layer,
  onPointerDown,
  selectionColor,
  setCamera,
  setZoom,
  cameraRef,
  zoomRef,
  showOutlineOnHover = false,
  setAddedByLabel,
}: ImageProps) => {
  const { x, y, width, height, src, addedBy } = layer;
  const [strokeColor, setStrokeColor] = useState(selectionColor || "none");
  const [isLoading, setIsLoading] = useState(true);

  // Preload image
  useEffect(() => {
    const img = preloadImage(src);
    img.onload = () => setIsLoading(false);
  }, [src]);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    setStrokeColor(selectionColor || "none");
    onPointerDown(e, id);
  }, [selectionColor, id, onPointerDown]);

  return (
    <g
      onPointerDown={handlePointerDown}
      onPointerEnter={() => { if (showOutlineOnHover) { setStrokeColor("#3390FF"); setAddedByLabel?.(addedBy || '') } }}
      onPointerLeave={() => { setStrokeColor(selectionColor || "none"); setAddedByLabel?.('') }}
      pointerEvents="auto"
    >
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        stroke={strokeColor}
        strokeWidth="1"
        fill={isLoading ? "#f4f4f5" : "none"}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      {isLoading && (
        <svg
          x={x + width / 2 - 12}
          y={y + height / 2 - 12}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path d="M21 12a9 9 0 1 1-6.219-8.56" stroke="#3390FF">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 12 12"
              to="360 12 12"
              dur="1s"
              repeatCount="indefinite"
            />
          </path>
        </svg>
      )}
      <image
        crossOrigin="anonymous"
        id={id}
        href={src}
        x={x}
        y={y}
        width={width}
        height={height}
        onLoad={() => setIsLoading(false)}
      />
    </g>
  );
});

InsertImage.displayName = 'InsertImage';
