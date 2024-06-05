"use client";

import { memo } from "react";
import { colorToCss } from "@/lib/utils";
import { Layer, LayerType, UpdateLayerMutation } from "@/types/canvas";
import { Path } from "../canvas-objects/path";
import { Note } from "../canvas-objects/note";
import { Text } from "../canvas-objects/text";
import { Ellipse } from "../canvas-objects/ellipse";
import { Rectangle } from "../canvas-objects/rectangle";
import { InsertImage } from "../canvas-objects/image";
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

interface LayerPreviewProps {
  id: string;
  onLayerPointerDown: (e: React.PointerEvent, layerId: string) => void;
  selectionColor?: string;
  layer: Layer;
  setLiveLayers: (layers: any) => void;
  updateLayer: UpdateLayerMutation;
  onRefChange?: (ref: React.RefObject<any>) => void;
  zoomRef?: React.RefObject<any>;
  socket: any;
  board: any;
  expired: boolean;
};

export const LayerPreview = memo(({
  id,
  onLayerPointerDown,
  selectionColor,
  layer,
  setLiveLayers,
  updateLayer,
  onRefChange,
  socket,
  board,
  expired
}: LayerPreviewProps) => {

  if (!layer) {
    return null;
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
          stroke={selectionColor}
          strokeSize={layer.strokeSize}
        />
      )
    case LayerType.Note:
      return (
        <Note
          updateLayer={updateLayer}
          id={id}
          layer={layer}
          onPointerDown={onLayerPointerDown}
          selectionColor={selectionColor}
          onRefChange={onRefChange}
          socket={socket}
          board={board}
          expired={expired}
        />
      );
    case LayerType.Text:
      return (
        <Text
          onRefChange={onRefChange}
          updateLayer={updateLayer}
          setLiveLayers={setLiveLayers}
          id={id}
          layer={layer}
          onPointerDown={onLayerPointerDown}
          selectionColor={selectionColor}
          socket={socket}
          board={board}
          expired={expired}
        />
      );
    case LayerType.Ellipse:
      return (
        <Ellipse
          updateLayer={updateLayer}
          id={id}
          layer={layer}
          onPointerDown={onLayerPointerDown}
          selectionColor={selectionColor}
          onRefChange={onRefChange}
          socket={socket}
          board={board}
          expired={expired}
        />
      );
    case LayerType.Rectangle:
      return (
        <Rectangle
          updateLayer={updateLayer}
          id={id}
          layer={layer}
          onPointerDown={onLayerPointerDown}
          selectionColor={selectionColor}
          onRefChange={onRefChange}
          socket={socket}
          board={board}
          expired={expired}
        />
      );
    case LayerType.Rhombus:
      return (
        <Rhombus
          updateLayer={updateLayer}
          id={id}
          layer={layer}
          onPointerDown={onLayerPointerDown}
          selectionColor={selectionColor}
          onRefChange={onRefChange}
          socket={socket}
          board={board}
          expired={expired}
        />
      );
    case LayerType.Triangle:
      return (
        <Triangle
          updateLayer={updateLayer}
          id={id}
          layer={layer}
          onPointerDown={onLayerPointerDown}
          selectionColor={selectionColor}
          onRefChange={onRefChange}
          socket={socket}
          board={board}
          expired={expired}
        />
      );
    case LayerType.Star:
      return (
        <Star
          updateLayer={updateLayer}
          id={id}
          layer={layer}
          onPointerDown={onLayerPointerDown}
          selectionColor={selectionColor}
          onRefChange={onRefChange}
          socket={socket}
          board={board}
          expired={expired}
        />
      );
    case LayerType.Hexagon:
      return (
        <Hexagon
          updateLayer={updateLayer}
          id={id}
          layer={layer}
          onPointerDown={onLayerPointerDown}
          selectionColor={selectionColor}
          onRefChange={onRefChange}
          socket={socket}
          board={board}
          expired={expired}
        />
      );
    case LayerType.CommentBubble:
      return (
        <CommentBubble
          updateLayer={updateLayer}
          id={id}
          layer={layer}
          onPointerDown={onLayerPointerDown}
          selectionColor={selectionColor}
          onRefChange={onRefChange}
          socket={socket}
          board={board}
          expired={expired}
        />
      );
    case LayerType.Line:
      return (
        <Line
          id={id}
          layer={layer}
          onPointerDown={onLayerPointerDown}
          selectionColor={selectionColor}
        />
      );
    case LayerType.BigArrowLeft:
      return (
        <BigArrowLeft
          updateLayer={updateLayer}
          id={id}
          layer={layer}
          onPointerDown={onLayerPointerDown}
          selectionColor={selectionColor}
          onRefChange={onRefChange}
          socket={socket}
          board={board}
          expired={expired}
        />
      );
    case LayerType.BigArrowRight:
      return (
        <BigArrowRight
          updateLayer={updateLayer}
          id={id}
          layer={layer}
          onPointerDown={onLayerPointerDown}
          selectionColor={selectionColor}
          onRefChange={onRefChange}
          socket={socket}
          board={board}
          expired={expired}
        />
      );
    case LayerType.BigArrowUp:
      return (
        <BigArrowUp
          updateLayer={updateLayer}
          id={id}
          layer={layer}
          onPointerDown={onLayerPointerDown}
          selectionColor={selectionColor}
          onRefChange={onRefChange}
          socket={socket}
          board={board}
          expired={expired}
        />
      );
    case LayerType.BigArrowDown:
      return (
        <BigArrowDown
          updateLayer={updateLayer}
          id={id}
          layer={layer}
          onPointerDown={onLayerPointerDown}
          selectionColor={selectionColor}
          onRefChange={onRefChange}
          socket={socket}
          board={board}
          expired={expired}
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
        />
      );
    case LayerType.Arrow:
      return (
        <Arrow
          id={id}
          layer={layer}
          onPointerDown={onLayerPointerDown}
          selectionColor={selectionColor}
        />
      );
    default:
      return null;
  }
});

LayerPreview.displayName = "LayerPreview";