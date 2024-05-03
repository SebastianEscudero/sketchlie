"use client";

import { memo, useMemo } from "react";

import { Layers, LayerType, Side, XYWH } from "@/types/canvas";
import { useSelectionBounds } from "@/hooks/use-selection-bounds";

interface SelectionBoxProps {
  onResizeHandlePointerDown: (corner: Side, initialBounds: XYWH) => void;
  selectedLayers: string[];
  liveLayers: Layers;
};

const HANDLE_WIDTH = 4;

export const SelectionBox = memo(({
  onResizeHandlePointerDown,
  selectedLayers,
  liveLayers
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

  const bounds = useSelectionBounds(selectedLayers, liveLayers);

  if (!bounds) {
    return null;
  }

  return (
    <>
      <rect
        onContextMenu={handleRightClick}
        className="fill-transparent stroke-blue-500 pointer-events-none"
        style={{
          strokeWidth: 0.7,
          transform: `translate(${bounds.x}px, ${bounds.y}px)`,
        }}
        x={0}
        y={0}
        width={bounds.width}
        height={bounds.height}
      />
      {isShowingHandles && (
        <>
        {!isTextLayer && (
          <rect
            className="fill-white stroke-blue-500"
            x={0}
            y={0}
            style={{
              strokeWidth: 0.5,
              cursor: "nwse-resize",
              width: `${HANDLE_WIDTH}px`,
              height: `${HANDLE_WIDTH}px`,
              transform: `
                translate(
                  ${bounds.x - HANDLE_WIDTH / 2}px,
                  ${bounds.y - HANDLE_WIDTH / 2}px
                )
              `
            }}
            onPointerDown={(e) => {
              e.stopPropagation();
              onResizeHandlePointerDown(Side.Top + Side.Left, bounds);
            }}
          />
        )}
          {!isTextLayer && (
            <rect
              className="fill-white stroke-1 stroke-blue-500"
              x={0}
              y={0}
              style={{
                cursor: "ns-resize",
                width: `${HANDLE_WIDTH}px`,
                height: `${HANDLE_WIDTH}px`,
                transform: `
        translate(
          ${bounds.x + bounds.width / 2 - HANDLE_WIDTH / 2}px, 
          ${bounds.y - HANDLE_WIDTH / 2}px
        )
      `
              }}
              onPointerDown={(e) => {
                e.stopPropagation();
                onResizeHandlePointerDown(Side.Top, bounds);
              }}
            />
          )}
          {!isTextLayer && (
          <rect
            className="fill-white stroke-blue-500"
            x={0}
            y={0}
            style={{
              strokeWidth: 0.5,
              cursor: "nesw-resize",
              width: `${HANDLE_WIDTH}px`,
              height: `${HANDLE_WIDTH}px`,
              transform: `
                translate(
                  ${bounds.x - HANDLE_WIDTH / 2 + bounds.width}px,
                  ${bounds.y - HANDLE_WIDTH / 2}px
                )`
            }}
            onPointerDown={(e) => {
              e.stopPropagation();
              onResizeHandlePointerDown(Side.Top + Side.Right, bounds);
            }}
          />
          )}
          <rect
            className="fill-white stroke-blue-500"
            x={0}
            y={0}
            style={{
              strokeWidth: 0.5,
              cursor: "ew-resize",
              width: `${HANDLE_WIDTH}px`,
              height: `${HANDLE_WIDTH}px`,
              transform: `
                translate(
                  ${bounds.x - HANDLE_WIDTH / 2 + bounds.width}px, 
                  ${bounds.y + bounds.height / 2 - HANDLE_WIDTH / 2}px
                )`
            }}
            onPointerDown={(e) => {
              e.stopPropagation();
              onResizeHandlePointerDown(Side.Right, bounds);
            }}
          />
          {!isTextLayer && (
          <rect
            className="fill-white stroke-blue-500"
            x={0}
            y={0}
            style={{
              strokeWidth: 0.5,
              cursor: "nwse-resize",
              width: `${HANDLE_WIDTH}px`,
              height: `${HANDLE_WIDTH}px`,
              transform: `
                translate(
                  ${bounds.x - HANDLE_WIDTH / 2 + bounds.width}px, 
                  ${bounds.y - HANDLE_WIDTH / 2 + bounds.height}px
                )`
            }}
            onPointerDown={(e) => {
              e.stopPropagation();
              onResizeHandlePointerDown(Side.Bottom + Side.Right, bounds);
            }}
          />
          )}
          {!isTextLayer && (
            <rect
              className="fill-white stroke-1 stroke-blue-500"
              x={0}
              y={0}
              style={{
                cursor: "ns-resize",
                width: `${HANDLE_WIDTH}px`,
                height: `${HANDLE_WIDTH}px`,
                transform: `
        translate(
          ${bounds.x + bounds.width / 2 - HANDLE_WIDTH / 2}px,
          ${bounds.y - HANDLE_WIDTH / 2 + bounds.height}px
        )`
              }}
              onPointerDown={(e) => {
                e.stopPropagation();
                onResizeHandlePointerDown(Side.Bottom, bounds);
              }}
            />
          )}
          {!isTextLayer && (
          <rect
            className="fill-white stroke-blue-500"
            x={0}
            y={0}
            style={{
              strokeWidth: 0.5,
              cursor: "nesw-resize",
              width: `${HANDLE_WIDTH}px`,
              height: `${HANDLE_WIDTH}px`,
              transform: `
                translate(
                  ${bounds.x - HANDLE_WIDTH / 2}px,
                  ${bounds.y - HANDLE_WIDTH / 2 + bounds.height}px
                )`
            }}
            onPointerDown={(e) => {
              e.stopPropagation();
              onResizeHandlePointerDown(Side.Bottom + Side.Left, bounds);
            }}
          />
          )}
          <rect
            className="fill-white stroke-blue-500"
            x={0}
            y={0}
            style={{
              strokeWidth: 0.5,
              cursor: "ew-resize",
              width: `${HANDLE_WIDTH}px`,
              height: `${HANDLE_WIDTH}px`,
              transform: `
                translate(
                  ${bounds.x - HANDLE_WIDTH / 2}px,
                  ${bounds.y - HANDLE_WIDTH / 2 + bounds.height / 2}px
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