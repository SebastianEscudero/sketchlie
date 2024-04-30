"use client";

import { memo } from "react";
import { colorToCss } from "@/lib/utils";
import { LayerType, UpdateLayerMutation } from "@/types/canvas";
import { Path } from "./path";
import { Note } from "./note";
import { Text } from "./text";
import { Ellipse } from "./ellipse";
import { Rectangle } from "./rectangle";
import { InsertImage } from "./image";

interface LayerPreviewProps {
  id: string;
  onLayerPointerDown: (e: React.PointerEvent, layerId: string) => void;
  selectionColor?: string;
  liveLayers: any;
  setLiveLayers: (layers: any) => void;
  updateLayer: UpdateLayerMutation;
};

export const LayerPreview = memo(({
  id,
  onLayerPointerDown,
  selectionColor,
  liveLayers,
  setLiveLayers,
  updateLayer
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
          onPointerDown={(e) => onLayerPointerDown(e, id)}
          x={layer.x}
          y={layer.y}
          fill={layer.fill ? colorToCss(layer.fill) : "#000"}
          stroke={selectionColor}
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
        />
      );
    case LayerType.Text:
      return (
        <Text
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
          id={id}
          layer={layer}
          onPointerDown={onLayerPointerDown}
          selectionColor={selectionColor}
        />
      );
    case LayerType.Rectangle:
      return (
        <Rectangle
          id={id}
          layer={layer}
          onPointerDown={onLayerPointerDown}
          selectionColor={selectionColor}
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
      default:
      return null;
  }
});

LayerPreview.displayName = "LayerPreview";