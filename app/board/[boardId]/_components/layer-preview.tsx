"use client";

import { memo } from "react";
import { colorToCss } from "@/lib/utils";
import { Layer, Layers, LayerType } from "@/types/canvas";
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
  focused?: boolean;
  selectionColor?: string;
  layer: Layer;
  setLiveLayers: (layers: any) => void;
  onRefChange?: (ref: React.RefObject<any>) => void;
  zoomRef?: React.RefObject<any>;
  socket: any;
  expired: boolean;
  boardId: string;
  forcedRender?: boolean;
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