import React, { useCallback, useState } from 'react';
import { ImageLayer } from "@/types/canvas";

interface ImageProps {
  isUploading: boolean;
  id: string;
  layer: ImageLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  setCamera: (camera: any) => void;
  setZoom: (zoom: number) => void;
  focused?: boolean;
  selectionColor?: string;
};

export const InsertImage = ({
  isUploading,
  id,
  layer,
  onPointerDown,
  selectionColor,
  setCamera,
  setZoom,
  focused,
}: ImageProps) => {
  const { x, y, width, height, src } = layer;

  const [strokeColor, setStrokeColor] = useState(selectionColor);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if (focused) {
      e.preventDefault();
      const padding = 50; // Padding around the image in pixels
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // Calculate the zoom level to fit the image with padding
      const zoomX = (viewportWidth - 2 * padding) / width;
      const zoomY = (viewportHeight - 2 * padding) / height;
      const newZoom = Math.min(zoomX, zoomY, 1); // Limit zoom to 1 (100%)

      // Calculate the new camera position
      const newCameraX = -(x + width / 2 - viewportWidth / 2 / newZoom);
      const newCameraY = -(y + height / 2 - viewportHeight / 2 / newZoom);

      setCamera({ x: newCameraX, y: newCameraY });
      setZoom(newZoom);
    } else {
      onPointerDown(e, id);
    }
  }, [focused, width, height, x, y, setCamera, setZoom, onPointerDown, id]);


  if (!isUploading) {
    return (
      <>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          stroke={strokeColor}
          strokeWidth="2"
          fill="none"
          strokeLinecap='round'
          strokeLinejoin='round'
          pointerEvents="auto"
        />
        <image
          crossOrigin="anonymous"
          id={id}
          href={src}
          x={x}
          y={y}
          width={width}
          height={height}
          onPointerDown={handlePointerDown}
          pointerEvents="auto"
          onPointerEnter={() => setStrokeColor("#3390FF")}
          onPointerLeave={() => setStrokeColor(selectionColor || "none")}
        />
      </>
    );
  } else {
    return null;
  }
};