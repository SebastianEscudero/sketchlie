"use client";

import { memo } from "react";
import { colorToCss } from "@/lib/utils";
import { Layer, LayerType } from "@/types/canvas";
import { Path } from "../canvas-objects/path";
import { Note } from "../canvas-objects/shapes/note";
import { Text } from "../canvas-objects/text";
import { Ellipse } from "../canvas-objects/shapes/ellipse";
import { Rectangle } from "../canvas-objects/shapes/rectangle";
import { Arrow } from "../canvas-objects/arrow";
import { Rhombus } from "../canvas-objects/shapes/rhombus";
import { Triangle } from "../canvas-objects/shapes/triangle";
import { Star } from "../canvas-objects/shapes/star";
import { Hexagon } from "../canvas-objects/shapes/hexagon";
import { BigArrowLeft } from "../canvas-objects/shapes/bigArrowLeft";
import { BigArrowRight } from "../canvas-objects/shapes/bigArrowRight";
import { BigArrowUp } from "../canvas-objects/shapes/bigArrowUp";
import { BigArrowDown } from "../canvas-objects/shapes/bigArrowDown";
import { CommentBubble } from "../canvas-objects/shapes/commentBubble";
import { Line } from "../canvas-objects/line";
import { InsertImage } from "../canvas-objects/media/image";
import { SVGLayer } from "../canvas-objects/media/svg-layer";
import { Table } from "../canvas-objects/table";

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
  selectionColor?: string;
  zoomRef?: React.RefObject<any>;
  forcedRender?: boolean;
  cameraRef?: React.RefObject<any>;
  setAddedByLabel?: (label: string) => void;
  orgTeammates?: any;
  forceUpdateLayerLocalLayerState?: (layerId: string, updatedLayer: any) => void;
  justInsertedText?: boolean;
};

export const LayerPreview = memo(({
  id,
  onLayerPointerDown,
  focused,
  selectionColor,
  layer,
  setLiveLayers,
  socket,
  expired,
  boardId,
  forcedRender,
  setCamera,
  setZoom,
  cameraRef,
  zoomRef,
  setAddedByLabel,
  orgTeammates,
  forceUpdateLayerLocalLayerState,
  justInsertedText
}: LayerPreviewProps) => {

  if (!layer) {
    return null;
  }

  switch (layer.type) {
    case LayerType.Table:
      return (
        <Table
          x={layer.x}
          y={layer.y}
          width={layer.width}
          height={layer.height}
          data={layer.data}
          columns={layer.columns}
          orgTeammates={orgTeammates}
          boardId={boardId}
          layerId={id}
          layer={layer}
          expired={expired}
          socket={socket}
          forceUpdateLayerLocalLayerState={forceUpdateLayerLocalLayerState || (() => { })}
        />
      );
    case LayerType.Path:
      return (
        <Path
          points={layer.points}
          onPointerDown={(e) => onLayerPointerDown(e, id)}
          x={layer.x}
          y={layer.y}
          fill={layer.fill ? colorToCss(layer.fill) : "#000"}
          selectionColor={selectionColor}
          strokeSize={layer.strokeSize}
          addedBy={layer.addedBy}
          setAddedByLabel={setAddedByLabel}
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
          setAddedByLabel={setAddedByLabel}
        />
      );
    case LayerType.Text:
      return (
        <Text
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
          setAddedByLabel={setAddedByLabel}
          justInsertedText={justInsertedText}
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
          setAddedByLabel={setAddedByLabel}
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
          setAddedByLabel={setAddedByLabel}
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
          setAddedByLabel={setAddedByLabel}
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
          setAddedByLabel={setAddedByLabel}
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
          setAddedByLabel={setAddedByLabel}
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
          setAddedByLabel={setAddedByLabel}
        />
      );
    case LayerType.Line:
      return (
        <Line
          id={id}
          layer={layer}
          onPointerDown={onLayerPointerDown}
          selectionColor={selectionColor}
          setAddedByLabel={setAddedByLabel}
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
          setAddedByLabel={setAddedByLabel}
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
          setAddedByLabel={setAddedByLabel}
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
          setAddedByLabel={setAddedByLabel}
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
          setAddedByLabel={setAddedByLabel}
        />
      );
    case LayerType.Image:
      return (
        <InsertImage
          id={id}
          layer={layer}
          onPointerDown={onLayerPointerDown}
          selectionColor={selectionColor}
          setAddedByLabel={setAddedByLabel}
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
          forcedRender={forcedRender}
          cameraRef={cameraRef}
          zoomRef={zoomRef}
          setAddedByLabel={setAddedByLabel}
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
          setAddedByLabel={setAddedByLabel}
        />
      );
    default:
      return null;
  }
});

LayerPreview.displayName = "LayerPreview";