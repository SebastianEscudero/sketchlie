"use client";

import { memo, useMemo } from "react";

import { ArrowHandle, ArrowLayer, Layers, LayerType, Side, XYWH } from "@/types/canvas";
import { useSelectionBounds } from "@/hooks/use-selection-bounds";

interface SelectionBoxProps {
  zoom: number;
  onResizeHandlePointerDown: (corner: Side, initialBounds: XYWH) => void;
  onArrowResizeHandlePointerDown: (handle: ArrowHandle, initialBounds: XYWH) => void;
  selectedLayers: string[];
  liveLayers: Layers;
  setLiveLayers: (layers: Layers) => void;
};

const HANDLE_SIZE = 8;
const STROKE_WIDTH = 2.5;

export const SelectionBox = memo(({
  zoom,
  onResizeHandlePointerDown,
  onArrowResizeHandlePointerDown,
  selectedLayers,
  liveLayers,
  setLiveLayers,
}: SelectionBoxProps) => {

  const handleRightClick = (event: React.MouseEvent) => {
    event.preventDefault();
  };

  const soleLayerId = selectedLayers.length === 1 ? selectedLayers[0] : null;

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
      return soleLayer && soleLayer.type === LayerType.Arrow || soleLayer && soleLayer.type === LayerType.Line;
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
    const handleRadius = 5 / zoom;
    const strokeWidth = STROKE_WIDTH / zoom;
    let start = { x: arrowLayer.x, y: arrowLayer.y };
    let end = { x: arrowLayer.x + arrowLayer.width, y: arrowLayer.y + arrowLayer.height };

    return (
      <>
        <circle
          className="fill-white stroke-blue-500 hover:cursor-hand"
          cx={start.x}
          cy={start.y}
          r={handleRadius}
          onClick={() => {
            document.body.style.cursor = "grab";
          }}
          strokeWidth={strokeWidth}
          onPointerDown={(e) => {
            e.stopPropagation();
            e.preventDefault();
            onArrowResizeHandlePointerDown(ArrowHandle.start, bounds);
            arrowLayer.startConnectedLayerId = undefined;
            setLiveLayers({ ...liveLayers, [soleLayerId]: arrowLayer });
          }}
        />
        <circle
          className="fill-blue-500 stroke-white hover:cursor-hand"
          cx={arrowLayer?.center?.x}
          cy={arrowLayer?.center?.y}
          r={handleRadius}
          onClick={() => {
            document.body.style.cursor = "grab";
          }}
          strokeWidth={strokeWidth}
          onPointerDown={(e) => {
            e.stopPropagation();
            onArrowResizeHandlePointerDown(ArrowHandle.center, bounds);
          }}
        />
        <circle
          className="fill-white stroke-blue-500 hover:cursor-hand"
          cx={end.x}
          cy={end.y}
          r={handleRadius}
          onClick={() => {
            document.body.style.cursor = "grab";
          }}
          strokeWidth={strokeWidth}
          onPointerDown={(e) => {
            e.stopPropagation();
            e.preventDefault();
            onArrowResizeHandlePointerDown(ArrowHandle.end, bounds);
            arrowLayer.endConnectedLayerId = undefined;
            setLiveLayers({ ...liveLayers, [soleLayerId]: arrowLayer });
          }}
        />
      </>
    );
  }

  const handleSize = HANDLE_SIZE / zoom;
  const strokeWidth = STROKE_WIDTH / zoom;
  const sideHandleSize = 5 / zoom;
  return (
    <>
      <rect
        onContextMenu={handleRightClick}
        className=" stroke-blue-500 fill-transparent pointer-events-none"
        style={{
          strokeWidth: strokeWidth,
          transform: `translate(${bounds.x}px, ${bounds.y}px)`,
        }}
        x={0}
        y={0}
        width={bounds.width}
        height={bounds.height}
      />
        <>
          <rect
            className="fill-white stroke-blue-500 p-4"
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
              className="fill-transparent cursor-ns-resize"
              x={0}
              y={-3/zoom}
              width={bounds.width}
              height={sideHandleSize} // Adjust this value as needed
              onPointerDown={(e) => {
                e.stopPropagation();
                onResizeHandlePointerDown(Side.Top, bounds);
              }}
              style={{
                transform: `translate(${bounds.x}px, ${bounds.y}px)`,
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
            className="fill-transparent cursor-ew-resize"
            x={bounds.width - sideHandleSize + 3/zoom}
            y={0}
            width={sideHandleSize}
            height={bounds.height}
            onPointerDown={(e) => {
              e.stopPropagation();
              onResizeHandlePointerDown(Side.Right, bounds);
            }}
            style={{
              transform: `translate(${bounds.x}px, ${bounds.y}px)`,
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
              className="fill-transparent cursor-ns-resize"
              x={0}
              y={bounds.height - sideHandleSize + 3/zoom}
              width={bounds.width}
              height={sideHandleSize}
              onPointerDown={(e) => {
                e.stopPropagation();
                onResizeHandlePointerDown(Side.Bottom, bounds);
              }}
              style={{
                transform: `translate(${bounds.x}px, ${bounds.y}px)`,
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
            className="fill-transparent cursor-ew-resize"
            x={-3/zoom}
            y={0}
            width={sideHandleSize}
            height={bounds.height}
            onPointerDown={(e) => {
              e.stopPropagation();
              onResizeHandlePointerDown(Side.Left, bounds);
            }}
            style={{
              transform: `translate(${bounds.x}px, ${bounds.y}px)`,
            }}
          />
        </>
    </>
  );
});

SelectionBox.displayName = "SelectionBox";