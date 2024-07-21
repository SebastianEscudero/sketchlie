"use client";

import { memo, useMemo } from "react";

import { ArrowHandle, ArrowHead, ArrowLayer, ArrowOrientation, ArrowType, CanvasMode, Layers, LayerType, Point, Side, XYWH } from "@/types/canvas";
import { useSelectionBounds } from "@/hooks/use-selection-bounds";

interface SelectionBoxProps {
  zoom: number;
  onResizeHandlePointerDown: (corner: Side, initialBounds: XYWH) => void;
  onArrowResizeHandlePointerDown: (handle: ArrowHandle, initialBounds: XYWH) => void;
  selectedLayers: string[];
  liveLayers: Layers;
  setLiveLayers: (layers: Layers) => void;
  forceRender?: boolean;
  setCurrentPreviewLayer: (layer: any) => void;
  mousePosition: Point;
  setCanvasState: (state: any) => void;
  setStartPanPoint: (point: Point) => void;
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
  setCurrentPreviewLayer,
  mousePosition,
  setCanvasState,
  setStartPanPoint,
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
    bounds.centerEdited = arrowLayer.centerEdited;

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
  const offset = 12;

  const arrowPreviewHandle = (e: any, startPoint: Point, endPoint: Point, orientation: ArrowOrientation) => {
    e.stopPropagation();

    let start = startPoint;
    let end = endPoint;
    let center = { x: (start.x + end.x) / 2, y: (start.y + end.y) / 2 };
    const widthArrow = end.x - start.x;
    const heightArrow = end.y - start.y;

    setCurrentPreviewLayer({
      x: start.x,
      y: start.y,
      center: center,
      width: widthArrow,
      height: heightArrow,
      type: LayerType.Arrow,
      fill: { r: 29, g: 29, b: 29, a: 1 },
      startArrowHead: ArrowHead.None,
      endArrowHead: ArrowHead.Triangle,
      startConnectedLayerId: soleLayerId,
      orientation: orientation,
    });

    setCanvasState({
      mode: CanvasMode.Inserting,
      layerType: LayerType.Arrow,
    })
    setStartPanPoint(startPoint);
  }

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
      {soleLayerId && (
        <>
          <circle
            cx={bounds.x + bounds.width / 2}
            cy={bounds.y - offset / zoom}
            r={sideHandleSize}
            className="fill-white stroke-blue-500 hover:cursor-hand"
            onPointerDown={(e) => arrowPreviewHandle(e, { x: bounds.x + bounds.width / 2, y: bounds.y }, mousePosition, ArrowOrientation.Vertical)}
            strokeWidth={strokeWidth}
          />
          {/* Middle Bottom Handle */}
          <circle
            cx={bounds.x + bounds.width / 2}
            cy={bounds.y + bounds.height + offset / zoom}
            r={sideHandleSize}
            className="fill-white stroke-blue-500 hover:cursor-hand"
            onPointerDown={(e) => arrowPreviewHandle(e, { x: bounds.x + bounds.width / 2, y: bounds.y + bounds.height }, mousePosition, ArrowOrientation.Vertical)}
            strokeWidth={strokeWidth}
          />
          {/* Middle Left Handle */}
          <circle
            cx={bounds.x - offset / zoom}
            cy={bounds.y + bounds.height / 2}
            r={sideHandleSize}
            className="fill-white stroke-blue-500 hover:cursor-hand"
            onPointerDown={(e) => arrowPreviewHandle(e, { x: bounds.x, y: bounds.y + bounds.height / 2 }, mousePosition, ArrowOrientation.Horizontal)}
            strokeWidth={strokeWidth}
          />
          {/* Middle Right Handle */}
          <circle
            cx={bounds.x + bounds.width + offset / zoom}
            cy={bounds.y + bounds.height / 2}
            r={sideHandleSize}
            className="fill-white stroke-blue-500 hover:cursor-hand"
            onPointerDown={(e) => arrowPreviewHandle(e, { x: bounds.x + bounds.width, y: bounds.y + bounds.height / 2 }, mousePosition, ArrowOrientation.Horizontal)}
            strokeWidth={strokeWidth}
          />
        </>
      )}
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
          y={-3 / zoom}
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
        x={bounds.width - sideHandleSize + 3 / zoom}
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
          y={bounds.height - sideHandleSize + 3 / zoom}
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
        x={-3 / zoom}
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
  );
});

SelectionBox.displayName = "SelectionBox";