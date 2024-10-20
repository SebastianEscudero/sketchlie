import React, { useCallback, useState, useEffect, memo } from 'react';
import { ImageLayer } from "@/types/canvas";
import { MoveCameraToLayer } from '../_components/canvasUtils';
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
  setAddedByLabel?: (addedBy: string) => void;
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
  setAddedByLabel,
}: ImageProps) => {
  const { x, y, width, height, src, addedBy } = layer;
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
    MoveCameraToLayer({
      targetX: x,
      targetY: y,
      targetWidth: width,
      targetHeight: height,
      setCamera: setCamera!,
      setZoom: setZoom!,
      cameraRef: cameraRef!,
      zoomRef: zoomRef!,
      padding: 0.7,
      duration: 200
    });
  }, [cameraRef, zoomRef, height, width, x, y, setCamera, setZoom]);

  return (
    <g
      onPointerDown={handlePointerDown}
      onDoubleClick={onDoubleClick}
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
        fill="transparent"
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <image
        crossOrigin="anonymous"
        id={id}
        href={src}
        x={x}
        y={y}
        width={width}
        height={height}
      />
    </g>
)});

InsertImage.displayName = 'InsertImage';
