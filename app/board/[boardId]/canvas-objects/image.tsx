import React, { useCallback, useState, useEffect, memo } from 'react';
import { ImageLayer } from "@/types/canvas";

interface ImageProps {
  isUploading: boolean;
  id: string;
  layer: ImageLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  setCamera?: (camera: any) => void;
  setZoom?: (zoom: number) => void;
  focused?: boolean;
  cameraRef?: React.RefObject<any>;
  zoomRef?: React.RefObject<any>;
  selectionColor?: string;
  showOutlineOnHover?: boolean;
};

export const InsertImage = memo(({
  isUploading,
  id,
  layer,
  onPointerDown,
  selectionColor,
  setCamera,
  setZoom,
  focused,
  cameraRef,
  zoomRef,
  showOutlineOnHover = false,
}: ImageProps) => {
  const { x, y, width, height, src } = layer;

  const [strokeColor, setStrokeColor] = useState(selectionColor || "none");

  useEffect(() => {
    setStrokeColor(selectionColor || "none");
  }, [selectionColor]);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    setStrokeColor(selectionColor || "none");
    if (focused) {
      e.preventDefault();
    } else {
      onPointerDown(e, id);
    }
  }, [focused, selectionColor, id, onPointerDown]);

  const onDoubleClick = useCallback(() => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Calculate the target zoom level to fit the image with padding
    const zoomX = (viewportWidth) / width * 0.9;
    const zoomY = (viewportHeight) / height * 0.9;
    let targetZoom = Math.min(zoomX, zoomY);

    // Adjust zoom for small images (zoom in if necessary)
    const minZoom = 0.3;
    const maxZoom = 10;
    targetZoom = Math.max(minZoom, Math.min(maxZoom, targetZoom));

    // Calculate the target camera position
    const targetCameraX = viewportWidth / 2 - (x + width / 2) * targetZoom;
    const targetCameraY = viewportHeight / 2 - (y + height / 2) * targetZoom;

    // Get current camera and zoom
    const startCamera = cameraRef?.current || { x: 0, y: 0 };
    const startZoom = zoomRef?.current || 1;

    const animationDuration = 500; // 0.5 seconds
    const startTime = Date.now();

    const animate = () => {
      const elapsedTime = Date.now() - startTime;
      const progress = Math.min(elapsedTime / animationDuration, 1);

      // Easing function (ease-out cubic)
      const easeProgress = 1 - Math.pow(1 - progress, 3);

      const currentZoom = startZoom + (targetZoom - startZoom) * easeProgress;
      const currentCamera = {
        x: startCamera.x + (targetCameraX - startCamera.x) * easeProgress,
        y: startCamera.y + (targetCameraY - startCamera.y) * easeProgress
      };

      // Update camera and zoom
      setCamera && setCamera(currentCamera);
      setZoom && setZoom(currentZoom);

      // Continue animation if not finished
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [cameraRef, zoomRef, height, width, x, y, setCamera, setZoom]);

  const handlePointerEnter = useCallback(() => {
    if (showOutlineOnHover) {
      setStrokeColor("#3390FF");
    }
  }, [showOutlineOnHover]);

  const handlePointerLeave = useCallback(() => {
    setStrokeColor(selectionColor || "none");
  }, [selectionColor]);

  return (
    <>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        stroke={strokeColor}
        strokeWidth="1"
        fill="white"
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
        onDoubleClick={onDoubleClick}
        pointerEvents="auto"
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
      />
    </>
  );
});

InsertImage.displayName = 'InsertImage';