import { Layer, Layers, LayerType } from "@/types/canvas";
import { useMemo } from "react";

export const boundingBox = (layers: Layer[]): any | null => {

  const first = layers[0];

  if (!first) {
    return null;
  }
  
  if (layers.length === 1) {
    let minX = first.x;
    let maxX = first.x + first.width;
    let minY = first.y;
    let maxY = first.y + first.height;

    for (let i = 1; i < layers.length; i++) {
      const layer = layers[i];

      if (layer.type === LayerType.Arrow && layer.center || layer.type === LayerType.Line && layer.center) {
        const { x, y, width, height, center } = layer;
        const length = Math.sqrt(width * width + height * height);
        const angle = Math.atan2(center.y - y, center.x - x);
        const end = {
          x: x + length * Math.cos(angle),
          y: y + length * Math.sin(angle),
        };

        minX = Math.min(minX, x, end.x);
        maxX = Math.max(maxX, x, end.x);
        minY = Math.min(minY, y, end.y);
        maxY = Math.max(maxY, y, end.y);
      } else {
        const { x, y, width, height } = layer;

        minX = Math.min(minX, x);
        maxX = Math.max(maxX, x + width);
        minY = Math.min(minY, y);
        maxY = Math.max(maxY, y + height);
      }
    }

    return {
      x: minX,
      y: minY,
      width: maxX - minX,
      height: maxY - minY,
    };
  };

  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;
  
  for (const layer of layers) {
    let x1 = layer.x;
    let x2 = layer.x + layer.width;
    let y1 = layer.y;
    let y2 = layer.y + layer.height;
  
    if (layer.type === LayerType.Arrow && layer.center || layer.type === LayerType.Line && layer.center) {
      const end = { x: layer.x + layer.width, y: layer.y + layer.height };
  
      x1 = Math.min(x1, layer.x, layer.center.x, end.x);
      x2 = Math.max(x2, layer.x, layer.center.x, end.x);
      y1 = Math.min(y1, layer.y, layer.center.y, end.y);
      y2 = Math.max(y2, layer.y, layer.center.y, end.y);
    }
  
    minX = Math.min(minX, x1);
    maxX = Math.max(maxX, x2);
    minY = Math.min(minY, y1);
    maxY = Math.max(maxY, y2);
  }
  
  return {
    x: minX,
    y: minY,
    width: maxX - minX,
    height: maxY - minY,
  };
}

export const useSelectionBounds = (selectedLayers: string[], liveLayers: Layers) => {
  return useMemo(() => {
    const selectedLayerObjects = selectedLayers
      .map((layerId) => liveLayers[layerId])
      .filter(Boolean);

    return boundingBox(selectedLayerObjects);
  }, [selectedLayers, liveLayers]);
};