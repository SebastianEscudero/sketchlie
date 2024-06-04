"use client";

import { memo } from "react";
import { colorToCss } from "@/lib/utils";
import { LayerType, UpdateLayerMutation } from "@/types/canvas";
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
  onPathErase: (e: React.PointerEvent, layerId: string) => void;
  selectionColor?: string;
  liveLayers: any;
  setLiveLayers: (layers: any) => void;
  updateLayer: UpdateLayerMutation;
  onRefChange?: (ref: React.RefObject<any>) => void;
  zoomRef?: React.RefObject<any>;
};

export const LayerPreview = memo(({
  id,
  onPathErase,
  onLayerPointerDown,
  selectionColor,
  liveLayers,
  setLiveLayers,
  updateLayer,
  onRefChange,
  zoomRef
}: LayerPreviewProps) => {

  const layer = liveLayers[id];

  if (!layer) {
    return null;
  }

  switch (layer.type) {
    case LayerType.Path:
      return (
        <Path
          key={id}
          points={layer.points}
          onPathErase={(e) => onPathErase(e, id)}
          onPointerDown={(e) => onLayerPointerDown(e, id)}
          x={layer.x}
          y={layer.y}
          fill={layer.fill ? colorToCss(layer.fill) : "#000"}
          stroke={selectionColor}
          strokeSize={layer.strokeSize}
          zoomRef={zoomRef}
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