"use client";

import { memo } from "react";
import { colorToCss } from "@/lib/utils";
import { CanvasMode, CanvasState, Layer, Layers, LayerType } from "@/types/canvas";
import { Path } from "../canvas-objects/path";
import { Note } from "../canvas-objects/note";
import { Text } from "../canvas-objects/text";
import { Ellipse } from "../canvas-objects/ellipse";
import { Rectangle } from "../canvas-objects/rectangle";
import { Arrow } from "../canvas-objects/arrow";
import { Rhombus } from "../canvas-objects/rhombus";
import { Triangle } from "../canvas-objects/triangle";
import { Star } from "../canvas-objects/star";
import { Hexagon } from "../canvas-objects/hexagon";
import { BigArrowLeft } from "../canvas-objects/bigArrowLeft";
import { BigArrowRight } from "../canvas-objects/bigArrowRight";
import { BigArrowUp } from "../canvas-objects/bigArrowUp";
import { BigArrowDown } from "../canvas-objects/bigArrowDown";
import { CommentBubble } from "../canvas-objects/commentBubble";
import { Line } from "../canvas-objects/line";
import { InsertImage } from "../canvas-objects/image";
import { Frame } from "../canvas-objects/frame";
import { SVGLayer } from "../canvas-objects/svg-layer";

interface LayerPreviewProps {
  id: string;
  onLayerPointerDown: (e: React.PointerEvent, layerId: string) => void;
  layer: Layer;
  setLiveLayers: (layers: any) => void;
  socket: any;
  expired: boolean;
  boardId: string;
  focused?: boolean;
  setCamera?: (camera: any) => void;
  setZoom?: (zoom: number) => void;
  onRefChange?: (ref: React.RefObject<any>) => void;
  selectionColor?: string;
  zoomRef?: React.RefObject<any>;
  forcedRender?: boolean;
  cameraRef?: React.RefObject<any>;
  liveLayerIds?: string[];
  liveLayers?: Layers;
  showOutlineOnHover?: boolean;
};

export const LayerPreview = memo(({
  id,
  onLayerPointerDown,
  focused,
  selectionColor,
  layer,
  setLiveLayers,
  onRefChange,
  socket,
  expired,
  boardId,
  forcedRender,
  setCamera,
  setZoom,
  cameraRef,
  zoomRef,
  liveLayerIds,
  liveLayers,
  showOutlineOnHover,
}: LayerPreviewProps) => {

  if (!layer) {
    return null;
  }

  let frameNumber;
  if (layer.type === LayerType.Frame && liveLayerIds && liveLayers) {
    frameNumber = liveLayerIds.filter(id => liveLayers[id] && liveLayers[id].type === LayerType.Frame).indexOf(id) + 1;
  }

  switch (layer.type) {
    case LayerType.Path:
      return (
        <Path
          key={id}
          points={layer.points}
          onPointerDown={(e) => onLayerPointerDown(e, id)}
          x={layer.x}
          y={layer.y}
          fill={layer.fill ? colorToCss(layer.fill) : "#000"}
          selectionColor={selectionColor}
          strokeSize={layer.strokeSize}
          showOutlineOnHover={showOutlineOnHover}
        />
      )
    case LayerType.Note:
      return (
        <Note
          id={id}
          layer={layer}
          boardId={boardId}
          onPointerDown={onLayerPointerDown}
          selectionColor={selectionColor}
          socket={socket}
          expired={expired}
          focused={focused}
          forcedRender={forcedRender}
          showOutlineOnHover={showOutlineOnHover}
        />
      );
    case LayerType.Text:
      return (
        <Text
          onRefChange={onRefChange}
          setLiveLayers={setLiveLayers}
          id={id}
          layer={layer}
          onPointerDown={onLayerPointerDown}
          selectionColor={selectionColor}
          socket={socket}
          expired={expired}
          focused={focused}
          boardId={boardId}
          forcedRender={forcedRender}
          showOutlineOnHover={showOutlineOnHover}
        />
      );
    case LayerType.Ellipse:
      return (
        <Ellipse
          id={id}
          layer={layer}
          boardId={boardId}
          onPointerDown={onLayerPointerDown}
          selectionColor={selectionColor}
          socket={socket}
          expired={expired}
          focused={focused}
          forcedRender={forcedRender}
          showOutlineOnHover={showOutlineOnHover}
        />
      );
    case LayerType.Rectangle:
      return (
        <Rectangle
          id={id}
          layer={layer}
          boardId={boardId}
          onPointerDown={onLayerPointerDown}
          selectionColor={selectionColor}
          socket={socket}
          expired={expired}
          focused={focused}
          forcedRender={forcedRender}
          showOutlineOnHover={showOutlineOnHover}
        />
      );
    case LayerType.Rhombus:
      return (
        <Rhombus
          id={id}
          layer={layer}
          boardId={boardId}
          onPointerDown={onLayerPointerDown}
          selectionColor={selectionColor}
          socket={socket}
          expired={expired}
          focused={focused}
          forcedRender={forcedRender}
          showOutlineOnHover={showOutlineOnHover}
        />
      );
    case LayerType.Triangle:
      return (
        <Triangle
          id={id}
          layer={layer}
          boardId={boardId}
          onPointerDown={onLayerPointerDown}
          selectionColor={selectionColor}
          socket={socket}
          expired={expired}
          focused={focused}
          forcedRender={forcedRender}
        />
      );
    case LayerType.Star:
      return (
        <Star
          id={id}
          layer={layer}
          boardId={boardId}
          onPointerDown={onLayerPointerDown}
          selectionColor={selectionColor}
          socket={socket}
          expired={expired}
          focused={focused}
          forcedRender={forcedRender}
          showOutlineOnHover={showOutlineOnHover}
        />
      );
    case LayerType.Hexagon:
      return (
        <Hexagon
          id={id}
          layer={layer}
          boardId={boardId}
          onPointerDown={onLayerPointerDown}
          selectionColor={selectionColor}
          socket={socket}
          expired={expired}
          focused={focused}
          forcedRender={forcedRender}
        />
      );
    case LayerType.CommentBubble:
      return (
        <CommentBubble
          id={id}
          layer={layer}
          boardId={boardId}
          onPointerDown={onLayerPointerDown}
          selectionColor={selectionColor}
          socket={socket}
          expired={expired}
          focused={focused}
          forcedRender={forcedRender}
        />
      );
    case LayerType.Line:
      return (
        <Line
          id={id}
          layer={layer}
          onPointerDown={onLayerPointerDown}
          selectionColor={selectionColor}
          forcedRender={forcedRender}
          showOutlineOnHover={showOutlineOnHover}
        />
      );
    case LayerType.BigArrowLeft:
      return (
        <BigArrowLeft
          id={id}
          layer={layer}
          boardId={boardId}
          onPointerDown={onLayerPointerDown}
          selectionColor={selectionColor}
          socket={socket}
          expired={expired}
          focused={focused}
          forcedRender={forcedRender}
          showOutlineOnHover={showOutlineOnHover}
        />
      );
    case LayerType.BigArrowRight:
      return (
        <BigArrowRight
          id={id}
          layer={layer}
          boardId={boardId}
          onPointerDown={onLayerPointerDown}
          selectionColor={selectionColor}
          socket={socket}
          expired={expired}
          focused={focused}
          forcedRender={forcedRender}
          showOutlineOnHover={showOutlineOnHover}
        />
      );
    case LayerType.BigArrowUp:
      return (
        <BigArrowUp
          id={id}
          layer={layer}
          boardId={boardId}
          onPointerDown={onLayerPointerDown}
          selectionColor={selectionColor}
          socket={socket}
          expired={expired}
          focused={focused}
          forcedRender={forcedRender}
          showOutlineOnHover={showOutlineOnHover}
        />
      );
    case LayerType.BigArrowDown:
      return (
        <BigArrowDown
          id={id}
          layer={layer}
          boardId={boardId}
          onPointerDown={onLayerPointerDown}
          selectionColor={selectionColor}
          socket={socket}
          expired={expired}
          focused={focused}
          forcedRender={forcedRender}
          showOutlineOnHover={showOutlineOnHover}
        />
      );
    case LayerType.Image:
      return (
        <InsertImage
          isUploading={false}
          id={id}
          layer={layer}
          onPointerDown={onLayerPointerDown}
          selectionColor={selectionColor}
          setCamera={setCamera}
          setZoom={setZoom}
          focused={focused}
          cameraRef={cameraRef}
          zoomRef={zoomRef}
          showOutlineOnHover={showOutlineOnHover}
        />
      );
    case LayerType.Svg:
      return (
        <SVGLayer
          isUploading={false}
          id={id}
          layer={layer}
          onPointerDown={onLayerPointerDown}
          selectionColor={selectionColor}
          setCamera={setCamera}
          setZoom={setZoom}
          focused={focused}
          cameraRef={cameraRef}
          zoomRef={zoomRef}
          showOutlineOnHover={showOutlineOnHover}
        />
      );
    case LayerType.Arrow:
      return (
        <Arrow
          id={id}
          layer={layer}
          onPointerDown={onLayerPointerDown}
          selectionColor={selectionColor}
          forcedRender={forcedRender}
          showOutlineOnHover={showOutlineOnHover}
        />
      );
    case LayerType.Frame:
      return (
        <Frame
          id={id}
          layer={layer}
          onPointerDown={onLayerPointerDown}
          frameNumber={frameNumber}
          expired={expired}
          socket={socket}
          boardId={boardId}
          forcedRender={forcedRender}
          showOutlineOnHover={showOutlineOnHover}
        />
      );
    default:
      return null;
  }
});

LayerPreview.displayName = "LayerPreview";