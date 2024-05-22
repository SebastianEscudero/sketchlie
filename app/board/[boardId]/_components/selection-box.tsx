"use client";

import { memo, useMemo } from "react";

import { ArrowHandle, ArrowLayer, CanvasMode, Layers, LayerType, Side, XYWH } from "@/types/canvas";
import { useSelectionBounds } from "@/hooks/use-selection-bounds";
import { pointerEventToCanvasPoint } from "@/lib/utils";

interface SelectionBoxProps {
  zoom: number;
  onResizeHandlePointerDown: (corner: Side, initialBounds: XYWH) => void;
  onArrowResizeHandlePointerDown: (handle: ArrowHandle, initialBounds: XYWH) => void;
  selectedLayers: string[];
  liveLayers: Layers;
  setCanvasState: (state: any) => void;
  camera: any;
};

const HANDLE_SIZE = 6;
const STROKE_WIDTH = 2.5;

export const SelectionBox = memo(({
  zoom,
  onResizeHandlePointerDown,
  onArrowResizeHandlePointerDown,
  selectedLayers,
  liveLayers,
  setCanvasState,
  camera,
}: SelectionBoxProps) => {

  const handleRightClick = (event: React.MouseEvent) => {
    event.preventDefault();
  };

  const soleLayerId = selectedLayers.length === 1 ? selectedLayers[0] : null;

  const isShowingHandles = useMemo(() => {
    if (soleLayerId) {
      const soleLayer = liveLayers[soleLayerId];
      return soleLayer && soleLayer.type !== LayerType.Path;
    }
    return false;
  }, [soleLayerId, liveLayers]);

  const isTextLayer = useMemo(() => {
    if (soleLayerId) {
      const soleLayer = liveLayers[soleLayerId];
      return soleLayer && soleLayer.type === LayerType.Text;
    }
    return false;
  }, [soleLayerId, liveLayers]);

  const isArrowLayer = useMemo(() => {
    if (soleLayerId) {
      const soleLayer = liveLayers[soleLayerId];
      return soleLayer && soleLayer.type === LayerType.Arrow;
    }
    return false;
  }, [soleLayerId, liveLayers]);

  const bounds = useSelectionBounds(selectedLayers, liveLayers);

  if (!bounds) {
    return null;
  }

  if (isArrowLayer && soleLayerId && selectedLayers.length === 1) {
    const arrowLayer = liveLayers[soleLayerId] as ArrowLayer;
    bounds.center = arrowLayer.center;
    const handleRadius = HANDLE_SIZE / zoom;
    const strokeWidth = STROKE_WIDTH / zoom;

    return (
      <>
        <circle
          className="fill-white stroke-blue-500 hover:cursor-hand active:cursor-grab"
          cx={arrowLayer.x}
          cy={arrowLayer.y}
          r={handleRadius}
          strokeWidth={strokeWidth}
          onPointerDown={(e) => {
            e.stopPropagation();
            onArrowResizeHandlePointerDown(ArrowHandle.start, bounds);
          }}
        />
        <circle
          className="fill-blue-500 stroke-white hover:cursor-hand active:cursor-grab"
          cx={arrowLayer?.center?.x}
          cy={arrowLayer?.center?.y}
          r={handleRadius}
          strokeWidth={strokeWidth}
          onPointerDown={(e) => {
            e.stopPropagation();
            onArrowResizeHandlePointerDown(ArrowHandle.center, bounds);
          }}
        />
        <circle
          className="fill-white stroke-blue-500 hover:cursor-hand active:cursor-grab"
          cx={arrowLayer.x + arrowLayer.width}
          cy={arrowLayer.y + arrowLayer.height}
          r={handleRadius}
          strokeWidth={strokeWidth}
          onPointerDown={(e) => {
            e.stopPropagation();
            onArrowResizeHandlePointerDown(ArrowHandle.end, bounds);
          }}
        />
      </>
    );
  }

  const handleSize = HANDLE_SIZE / zoom;
  const strokeWidth = STROKE_WIDTH / zoom;
  return (
    <>
      <rect
        onContextMenu={handleRightClick}
        className="fill-transparent stroke-blue-500"
        style={{
          strokeWidth: strokeWidth,
          transform: `translate(${bounds.x}px, ${bounds.y}px)`,
        }}
        x={0}
        y={0}
        width={bounds.width}
        height={bounds.height}
        onPointerDown={(e) => {
          e.stopPropagation();
          const position = pointerEventToCanvasPoint(e, camera, zoom)
          setCanvasState({
            mode: CanvasMode.Translating,
            current: position
          })
        }}
      />
      {isShowingHandles && (
        <>
          <rect
            className="fill-white stroke-blue-500"
            x={0}
            y={0}
            style={{
              strokeWidth: strokeWidth,
              cursor: "nwse-resize",
              width: `${handleSize}px`,
              height: `${handleSize}px`,
              transform: `translate(${bounds.x - handleSize / 2}px, ${bounds.y - handleSize / 2}px)`
            }}
            onPointerDown={(e) => {
              e.stopPropagation();
              onResizeHandlePointerDown(Side.Top + Side.Left, bounds);
            }}
          />
          {!isTextLayer && (
            <rect
              className="fill-white stroke-1 stroke-blue-500"
              x={0}
              y={0}
              style={{
                strokeWidth: strokeWidth,
                cursor: "ns-resize",
                width: `${handleSize}px`,
                height: `${handleSize}px`,
                transform: `
                            translate(${bounds.x + bounds.width / 2 - handleSize / 2}px, ${bounds.y - handleSize / 2}px)`
              }}
              onPointerDown={(e) => {
                e.stopPropagation();
                onResizeHandlePointerDown(Side.Top, bounds);
              }}
            />
          )}
          <rect
            className="fill-white stroke-blue-500"
            x={0}
            y={0}
            style={{
              strokeWidth: strokeWidth,
              cursor: "nesw-resize",
              width: `${handleSize}px`,
              height: `${handleSize}px`,
              transform: `
                translate(${bounds.x - handleSize / 2 + bounds.width}px, ${bounds.y - handleSize / 2}px)`
            }}
            onPointerDown={(e) => {
              e.stopPropagation();
              onResizeHandlePointerDown(Side.Top + Side.Right, bounds);
            }}
          />
          <rect
            className="fill-white stroke-blue-500"
            x={0}
            y={0}
            style={{
              strokeWidth: strokeWidth,
              cursor: "ew-resize",
              width: `${handleSize}px`,
              height: `${handleSize}px`,
              transform: `
                translate(${bounds.x - handleSize / 2 + bounds.width}px, ${bounds.y + bounds.height / 2 - handleSize / 2}px)`
            }}
            onPointerDown={(e) => {
              e.stopPropagation();
              onResizeHandlePointerDown(Side.Right, bounds);
            }}
          />
          <rect
            className="fill-white stroke-blue-500"
            x={0}
            y={0}
            style={{
              strokeWidth: strokeWidth,
              cursor: "nwse-resize",
              width: `${handleSize}px`,
              height: `${handleSize}px`,
              transform: `
                translate(${bounds.x - handleSize / 2 + bounds.width}px, ${bounds.y - handleSize / 2 + bounds.height}px)`
            }}
            onPointerDown={(e) => {
              e.stopPropagation();
              onResizeHandlePointerDown(Side.Bottom + Side.Right, bounds);
            }}
          />
          {!isTextLayer && (
            <rect
              className="fill-white stroke-1 stroke-blue-500"
              x={0}
              y={0}
              style={{
                strokeWidth: strokeWidth,
                cursor: "ns-resize", width: `${handleSize}px`, height: `${handleSize}px`,
                transform: `translate(${bounds.x + bounds.width / 2 - handleSize / 2}px, ${bounds.y - handleSize / 2 + bounds.height}px)`
              }}
              onPointerDown={(e) => {
                e.stopPropagation();
                onResizeHandlePointerDown(Side.Bottom, bounds);
              }}
            />)}
          <rect
            className="fill-white stroke-blue-500"
            x={0}
            y={0}
            style={{
              strokeWidth: strokeWidth,
              cursor: "nesw-resize",
              width: `${handleSize}px`,
              height: `${handleSize}px`,
              transform: `
                translate(
                  ${bounds.x - handleSize / 2}px,
                  ${bounds.y - handleSize / 2 + bounds.height}px
                )`
            }}
            onPointerDown={(e) => {
              e.stopPropagation();
              onResizeHandlePointerDown(Side.Bottom + Side.Left, bounds);
            }}
          />
          <rect
            className="fill-white stroke-blue-500"
            x={0}
            y={0}
            style={{
              strokeWidth: strokeWidth,
              cursor: "ew-resize",
              width: `${handleSize}px`,
              height: `${handleSize}px`,
              transform: `
                translate(
                  ${bounds.x - handleSize / 2}px,
                  ${bounds.y - handleSize / 2 + bounds.height / 2}px
                )`
            }}
            onPointerDown={(e) => {
              e.stopPropagation();
              onResizeHandlePointerDown(Side.Left, bounds);
            }}
          />
        </>
      )}
    </>
  );
});

SelectionBox.displayName = "SelectionBox";