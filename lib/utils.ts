import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import {
  ArrowHandle,
  ArrowLayer,
  ArrowOrientation,
  ArrowType,
  Camera,
  Color,
  Layer,
  LayerType,
  PathLayer,
  Point,
  Side,
  XYWH
} from "@/types/canvas";
import { Readable } from "stream";
import { toast } from "sonner";

const COLORS = [
  "#DC2626", // Red
  "#D97706", // Amber
  "#059669", // Teal
  "#7C3AED", // Violet
  "#DB2777",  // Pink
  "#3AB624", // Emerald
  "#2E5ADA", // Dark Blue
  "#6D2AC2", // Purple
  "#000000", // Black
  "#CCB800", // Yellow
  "#E185F4", // Light Purple
  "#AE3EC9", // Dark Purple
  "#4465E9", // Blue
  "#4BA1F1", // Light Blue
  "#FFA500", // Orange
  "#E16919", // Dark Orange
  "#079368", // Dark Green
  "#4DB05E", // Green
  "#F87777", // Light Red
  "#E03131", // Dark Red
];

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function pointerEventToCanvasPoint(
  e: any,
  camera: Camera,
  zoom: number,
) {
  let clientX, clientY;

  if (e.type === "touchstart") {
    clientX = e.touches[0].clientX;
    clientY = e.touches[0].clientY;
  } else {
    clientX = e.clientX;
    clientY = e.clientY;
  }

  return {
    x: (Math.round(clientX) - camera.x) / zoom,
    y: (Math.round(clientY) - camera.y) / zoom,
  };
};

export function connectionIdToColor(connectionId: number): string {
  return COLORS[connectionId % COLORS.length];
};


export function colorToCss(color: Color) {
  if (color.r === 29 && color.g === 29 && color.b === 29) {
    if (document.documentElement.classList.contains("dark")) {
      return `rgba(${255},${255},${255},${color.a})`;
    }
  }

  if (color.r === 255 && color.g === 255 && color.b === 255) {
    if (document.documentElement.classList.contains("dark")) {
      return `rgba(${29},${29},${29},${color.a})`;
    }
  }

  return `rgba(${color.r},${color.g},${color.b},${color.a})`;
}

export function resizeBounds(
  bounds: XYWH,
  corner: Side,
  point: Point,
  maintainAspectRatio = false
): XYWH {

  const result = {
    x: bounds.x,
    y: bounds.y,
    width: bounds.width,
    height: bounds.height,
  };

  const aspectRatio = bounds.width / bounds.height;

  if (corner === Side.Right) {
    result.x = Math.min(point.x, bounds.x);
    result.width = Math.abs(point.x - bounds.x);
    if (maintainAspectRatio) {
      result.height = result.width / aspectRatio;
    }
  }

  if (corner === Side.Top) {
    result.y = Math.min(point.y, bounds.y + bounds.height);
    result.height = Math.abs(bounds.y + bounds.height - point.y);
    if (maintainAspectRatio) {
      result.width = result.height * aspectRatio;
    }
  }

  if (corner === Side.Left) {
    result.x = Math.min(point.x, bounds.x + bounds.width);
    result.width = Math.abs(bounds.x + bounds.width - point.x);
    if (maintainAspectRatio) {
      result.height = result.width / aspectRatio;
    }
  }

  if (corner === Side.Bottom) {
    result.y = Math.min(point.y, bounds.y);
    result.height = Math.abs(point.y - bounds.y);
    if (maintainAspectRatio) {
      result.width = result.height * aspectRatio;
    }
  }

  if (corner === Side.Top + Side.Left) {
    const oldWidth = bounds.x + bounds.width - point.x;
    const oldHeight = bounds.y + bounds.height - point.y;
    if (maintainAspectRatio) {
      const newWidth = oldHeight * aspectRatio;
      const newHeight = oldWidth / aspectRatio;
      if (newWidth > oldWidth) {
        result.width = newWidth;
        result.height = oldHeight;
      } else {
        result.width = oldWidth;
        result.height = newHeight;
      }
    } else {
      result.width = oldWidth;
      result.height = oldHeight;
    }
    result.x = bounds.x + bounds.width - result.width;
    result.y = bounds.y + bounds.height - result.height;

    if (result.width < 0) {
      result.width = Math.abs(result.width);
      result.x -= result.width;
    }

    if (result.height < 0) {
      result.height = Math.abs(result.height);
      result.y -= result.height;
    }

  }

  if (corner === Side.Top + Side.Right) {
    const oldWidth = point.x - bounds.x;
    const oldHeight = bounds.y + bounds.height - point.y;
    if (maintainAspectRatio) {
      const newWidth = oldHeight * aspectRatio;
      const newHeight = oldWidth / aspectRatio;
      if (newWidth > oldWidth) {
        result.width = newWidth;
        result.height = oldHeight;
      } else {
        result.width = oldWidth;
        result.height = newHeight;
      }
    } else {
      result.width = oldWidth;
      result.height = oldHeight;
    }
    result.y = bounds.y + bounds.height - result.height;

    if (result.width < 0) {
      result.width = Math.abs(result.width);
      result.x -= result.width;
    }

    if (result.height < 0) {
      result.height = Math.abs(result.height);
      result.y -= result.height;
    }
  }

  if (corner === Side.Bottom + Side.Left) {
    const oldWidth = bounds.x + bounds.width - point.x;
    const oldHeight = point.y - bounds.y;
    if (maintainAspectRatio) {
      const newWidth = oldHeight * aspectRatio;
      const newHeight = oldWidth / aspectRatio;
      if (newWidth > oldWidth) {
        result.width = newWidth;
        result.height = oldHeight;
      } else {
        result.width = oldWidth;
        result.height = newHeight;
      }
    } else {
      result.width = oldWidth;
      result.height = oldHeight;
    }
    result.x = bounds.x + bounds.width - result.width;

    if (result.width < 0) {
      result.width = Math.abs(result.width);
      result.x -= result.width;
    }

    if (result.height < 0) {
      result.height = Math.abs(result.height);
      result.y -= result.height;
    }
  }

  if (corner === Side.Bottom + Side.Right) {
    const oldWidth = point.x - bounds.x;
    const oldHeight = point.y - bounds.y;
    if (maintainAspectRatio) {
      const newWidth = oldHeight * aspectRatio;
      const newHeight = oldWidth / aspectRatio;
      if (newWidth > oldWidth) {
        result.width = newWidth;
        result.height = oldHeight;
      } else {
        result.width = oldWidth;
        result.height = newHeight;
      }
    } else {
      result.width = oldWidth;
      result.height = oldHeight;
    }

    if (result.width < 0) {
      result.width = Math.abs(result.width);
      result.x -= result.width;
    }

    if (result.height < 0) {
      result.height = Math.abs(result.height);
      result.y -= result.height;
    }
  }

  return result;
};

export function resizePathLayer(
  bounds: XYWH,
  corner: Side,
  point: Point,
  layer: PathLayer
): PathLayer {

  const result = {
    ...layer,
    x: bounds.x,
    y: bounds.y,
    width: bounds.width,
    height: bounds.height,
  };

  let newWidth = (corner & Side.Left) === Side.Left ? bounds.x + bounds.width - point.x : point.x - bounds.x;
  let newHeight = (corner & Side.Top) === Side.Top ? bounds.y + bounds.height - point.y : point.y - bounds.y;

  newWidth = newWidth === 0 || isNaN(newWidth) ? 1 : newWidth;
  newHeight = newHeight === 0 || isNaN(newHeight) ? 1 : newHeight;

  if ((corner & Side.Left) === Side.Left) {
    result.x = newWidth < 0 ? point.x : bounds.x + bounds.width - newWidth;

    if (point.x > bounds.x + bounds.width) {
      result.x = bounds.x + bounds.width;
    }

    result.width = Math.abs(newWidth);
  }

  if ((corner & Side.Right) === Side.Right) {
    result.x = newWidth < 0 ? point.x : bounds.x;
    result.width = Math.abs(newWidth);
  }

  if ((corner & Side.Top) === Side.Top) {
    result.y = newHeight < 0 ? point.y : bounds.y + bounds.height - newHeight;

    if (point.y > bounds.y + bounds.height) {
      result.y = bounds.y + bounds.height;
    }

    result.height = Math.abs(newHeight);
  }

  if ((corner & Side.Bottom) === Side.Bottom) {
    result.y = newHeight < 0 ? point.y : bounds.y;
    result.height = Math.abs(newHeight);
  }

  if (layer) {
    const xRatio = result.width / layer.width;
    const yRatio = result.height / layer.height;

    result.points = layer.points.map(([x, y]) => [x * xRatio, y * yRatio]);
  }

  return result;
};

export function resizeArrowBounds(
  bounds: any,
  point: Point,
  handle: ArrowHandle,
  newLayer: any,
  liveLayers: any,
  zoom: number
): any {

  const result = {
    x: bounds.x,
    y: bounds.y,
    width: bounds.width,
    height: bounds.height,
    center: bounds.center,
    centerEdited: bounds.centerEdited,
    orientation: newLayer.orientation
  };

  let end = { x: bounds.x + bounds.width, y: bounds.y + bounds.height };
  let center = { x: bounds.center.x, y: bounds.center.y };

  if (handle === ArrowHandle.start) {
    result.x = point.x;
    result.y = point.y;
    result.width = end.x - point.x;
    result.height = end.y - point.y;

    if (newLayer.startConnectedLayerId) {
      const startConnectedLayer = liveLayers[newLayer.startConnectedLayerId];
      const startPoint = getClosestPointOnBorder(startConnectedLayer, point, center, zoom, newLayer.arrowType, newLayer);
      result.x = startPoint.x;
      result.y = startPoint.y;
      result.width = end.x - startPoint.x;
      result.height = end.y - startPoint.y;
    }

    if (newLayer.endConnectedLayerId && liveLayers[newLayer.endConnectedLayerId]) {

      if (newLayer.orientation === ArrowOrientation.Horizontal) {
        if (point.x >= liveLayers[newLayer.endConnectedLayerId].x && point.x <= liveLayers[newLayer.endConnectedLayerId].x + liveLayers[newLayer.endConnectedLayerId].width) {
          result.orientation = ArrowOrientation.Vertical;
        }
      } else if (newLayer.orientation === ArrowOrientation.Vertical) {
        if (point.y >= liveLayers[newLayer.endConnectedLayerId].y && point.y <= liveLayers[newLayer.endConnectedLayerId].y + liveLayers[newLayer.endConnectedLayerId].height) {
          result.orientation = ArrowOrientation.Horizontal;
        }
      }

      const endPoint = getClosestEndPoint(liveLayers[newLayer.endConnectedLayerId], center, newLayer.arrowType, newLayer);
      result.width = endPoint.x - result.x;
      result.height = endPoint.y - result.y;
    }

  } else if (handle === ArrowHandle.end) {
    result.width = point.x - bounds.x;
    result.height = point.y - bounds.y;

    if (newLayer.startConnectedLayerId && liveLayers[newLayer.startConnectedLayerId]) {
      if (newLayer.orientation === ArrowOrientation.Horizontal) {
        if (point.x >= liveLayers[newLayer.startConnectedLayerId].x && point.x <= liveLayers[newLayer.startConnectedLayerId].x + liveLayers[newLayer.startConnectedLayerId].width) {
          result.orientation = ArrowOrientation.Vertical;
        }
      } else if (newLayer.orientation === ArrowOrientation.Vertical) {
        if (point.y >= liveLayers[newLayer.startConnectedLayerId].y && point.y <= liveLayers[newLayer.startConnectedLayerId].y + liveLayers[newLayer.startConnectedLayerId].height) {
          result.orientation = ArrowOrientation.Horizontal;
        }
      }

      const startPoint = getClosestEndPoint(liveLayers[newLayer.startConnectedLayerId], center, newLayer.arrowType, newLayer);
      result.x = startPoint.x;
      result.y = startPoint.y;
      result.width = point.x - startPoint.x;
      result.height = point.y - startPoint.y;
    }

    if (newLayer.endConnectedLayerId) {
      const endConnectedLayer = liveLayers[newLayer.endConnectedLayerId];
      const endPoint = getClosestPointOnBorder(endConnectedLayer, point, center, zoom, newLayer.arrowType, newLayer);
      result.width = endPoint.x - result.x;
      result.height = endPoint.y - result.y;
    }

  } else if (handle === ArrowHandle.center) {
    result.centerEdited = true;
    result.center.x += point.x - result.center.x;
    result.center.y += point.y - result.center.y;

    if (newLayer.startConnectedLayerId && liveLayers[newLayer.startConnectedLayerId]) {
      const startPoint = getClosestEndPoint(liveLayers[newLayer.startConnectedLayerId], point, newLayer.arrowType, newLayer);
      result.x = startPoint.x;
      result.y = startPoint.y;
      result.width = end.x - startPoint.x;
      result.height = end.y - startPoint.y;
    }

    if (newLayer.endConnectedLayerId && liveLayers[newLayer.endConnectedLayerId]) {
      const endPoint = getClosestEndPoint(liveLayers[newLayer.endConnectedLayerId], point, newLayer.arrowType, newLayer);
      result.width = endPoint.x - result.x;
      result.height = endPoint.y - result.y;
    }

    if (newLayer.arrowType === ArrowType.Diagram) {
        if (newLayer.orientation === ArrowOrientation.Horizontal) {
          result.center.x = point.x;
          result.center.y = bounds.y + bounds.height / 2;
        } else {
          result.center.y = point.y;
          result.center.x = bounds.x + bounds.width / 2;
        }
    }
  }

  if (handle === ArrowHandle.start || handle === ArrowHandle.end) {
    if (result.centerEdited !== true || newLayer.arrowType === ArrowType.Diagram) {
      result.center.x = result.x + result.width / 2;
      result.center.y = result.y + result.height / 2;
    }
  }

  if (!newLayer.startConnectedLayerId && !newLayer.endConnectedLayerId && newLayer.arrowType === ArrowType.Diagram) {
    const isHorizontal = Math.abs(result.width) >= Math.abs(result.height);
    if (isHorizontal) {
      result.orientation = ArrowOrientation.Horizontal;
    } else {
      result.orientation = ArrowOrientation.Vertical;
    }
  }

  return result;
}

export function getArrowPath(type: ArrowType, start: Point, center: Point, end: Point, orientation?: ArrowOrientation): any {
  let pathData;

  if (type === ArrowType.Straight) {
    pathData = `M ${start.x} ${start.y} L ${center.x} ${center.y} L ${end.x} ${end.y}`;
  } else if (type === ArrowType.Diagram) {
    if (orientation === ArrowOrientation.Horizontal) {
      // Horizontal then vertical
      pathData = `M ${start.x} ${start.y} `;
      pathData += `L ${center.x} ${start.y} `;
      pathData += `L ${center.x} ${end.y} `;
      pathData += `L ${end.x} ${end.y}`;
    } else {
      // Vertical then horizontal
      pathData = `M ${start.x} ${start.y} `;
      pathData += `L ${start.x} ${center.y} `;
      pathData += `L ${end.x} ${center.y} `;
      pathData += `L ${end.x} ${end.y}`;
    }
  } else if (type === ArrowType.Curved) {
    // Directly involve the center point in the calculation of the control points
    // Create control points that are aligned with the center point but placed further out
    const test =1.335; // Magic number to make the control points look good
    const CP1 = {
      x: start.x + (center.x - start.x) * test, // Extend past the center for the first control point
      y: start.y + (center.y - start.y) * test
    };
    const CP2 = {
      x: end.x + (center.x - end.x) * test, // Extend past the center for the second control point
      y: end.y + (center.y - end.y) * test
    };

    // Generate the path data using the adjusted control points
    pathData = `M ${start.x} ${start.y} C ${CP2.x} ${CP2.y}, ${CP1.x} ${CP1.y}, ${end.x} ${end.y}`;
  } else {
    pathData = `M ${start.x} ${start.y} L ${center.x} ${center.y} L ${end.x} ${end.y}`;
  }
  
  return pathData;
}

export function getArrowHeadAngle(start: Point, center: Point, end: Point, type: ArrowType, orientation?: ArrowOrientation): { startAngle: number, endAngle: number } {
  let startAngle, endAngle;

  if (type === ArrowType.Diagram) {
    startAngle = Math.atan2(center.y - start.y, center.x - start.x) * (180 / Math.PI) - 180;

    if (orientation === ArrowOrientation.Horizontal) {
      startAngle = (start.x > center.x) ? 0 : 180;
      endAngle = (end.x > center.x) ? 0 : 180;
    } else {
      startAngle = (start.y > center.y) ? 90 : -90;
      endAngle = (end.y > center.y) ? 90 : -90;
    }
  } else if (type === ArrowType.Curved) {
    // Magic number to make the control points look good
    const test = 1.335;
    const CP1 = {
      x: start.x + (center.x - start.x) * test, // Extend past the center for the first control point
      y: start.y + (center.y - start.y) * test
    };
    const CP2 = {
      x: end.x + (center.x - end.x) * test, // Extend past the center for the second control point
      y: end.y + (center.y - end.y) * test
    };
  
    // Calculate the angle for the arrowhead at the start and end points
    // For the start angle, consider the direction from start towards CP1
    startAngle = Math.atan2(CP2.y - start.y, CP2.x - start.x) * (180 / Math.PI) - 180;
    // For the end angle, consider the direction from CP2 towards the end
    endAngle = Math.atan2(end.y - CP1.y, end.x - CP1.x) * (180 / Math.PI);
  } else {
    // For other types, calculate as before
    startAngle = Math.atan2(center.y - start.y, center.x - start.x) * (180 / Math.PI) - 180;
    endAngle = Math.atan2(end.y - center.y, end.x - center.x) * (180 / Math.PI);
  }

  return { startAngle, endAngle };
}

export function getLayerIdAtPointer(current: Point, layers: { [key: string]: Layer }): string | null {
  for (const layerId in layers) {
    const layer = layers[layerId];

    if (
      current.x >= layer.x &&
      current.x <= layer.x + layer.width &&
      current.y >= layer.y &&
      current.y <= layer.y + layer.height
    ) {
      return layerId;
    }
  }

  return null;
}

function doLinesIntersect(a: any, b: any, c: any, d: any) {
  const ccw = (p1: any, p2: any, p3: any) => (p3[1] - p1[1]) * (p2[0] - p1[0]) > (p2[1] - p1[1]) * (p3[0] - p1[0]);
  return ccw(a, c, d) !== ccw(b, c, d) && ccw(a, b, c) !== ccw(a, b, d);
}

export function findIntersectingLayersWithPath(
  layerIds: readonly string[],
  layers: { [key: string]: Layer },
  eraserPathPoints: [number, number][],
): string[] {
  const intersectingLayerIds: string[] = [];

  layerIds.forEach(layerId => {
    const layer = layers[layerId];
    if (!layer || layer.type !== LayerType.Path || !layer.points) return;

    for (let i = 0; i < layer.points.length - 1; i++) {
      const startLayerPoint = [layer.points[i][0] + layer.x, layer.points[i][1] + layer.y];
      const endLayerPoint = [layer.points[i + 1][0] + layer.x, layer.points[i + 1][1] + layer.y];

      for (let j = 0; j < eraserPathPoints.length - 1; j++) {
        const startEraserPoint = eraserPathPoints[j];
        const endEraserPoint = eraserPathPoints[j + 1];

        if (doLinesIntersect(startLayerPoint, endLayerPoint, startEraserPoint, endEraserPoint)) {
          intersectingLayerIds.push(layerId);
          break;
        }
      }
    }
  });

  return intersectingLayerIds.filter((value, index, self) => self.indexOf(value) === index); // Remove duplicates
}

export function findIntersectingLayersWithPoint(
  layerIds: readonly string[],
  layers: { [key: string]: Layer },
  point: Point,
  zoom: number
) {
  const tolerance = Math.max(4, 4 / zoom);
  // Create a small rectangle around the point
  const rect = {
    x: point.x - tolerance,
    y: point.y - tolerance,
    width: 2 * tolerance,
    height: 2 * tolerance,
  };

  // Use the same logic as before to find intersecting layers
  const ids = findIntersectingLayersWithRectangle(layerIds, layers, { x: rect.x, y: rect.y }, { x: rect.x + rect.width, y: rect.y + rect.height });

  return ids;
};

function lineIntersectsLine(a1: Point, a2: Point, b1: Point, b2: Point) {
  const denominator = ((b2.y - b1.y) * (a2.x - a1.x)) - ((b2.x - b1.x) * (a2.y - a1.y));

  if (denominator === 0) {
    return false;
  }

  const numerator1 = ((b2.x - b1.x) * (a1.y - b1.y)) - ((b2.y - b1.y) * (a1.x - b1.x));
  const numerator2 = ((a2.x - a1.x) * (a1.y - b1.y)) - ((a2.y - a1.y) * (a1.x - b1.x));

  if (numerator1 === 0 || numerator2 === 0) {
    return false;
  }

  const r = numerator1 / denominator;
  const s = numerator2 / denominator;

  return (r > 0 && r < 1) && (s > 0 && s < 1);
}

export function findIntersectingLayerForConnection(
  layerIds: readonly string[],
  layers: { [key: string]: Layer },
  point: Point,
  zoom: number
) {
  const tolerance = Math.max(4, 4 / zoom) + 5;
  // Create a small rectangle around the point
  const rect = {
    x: point.x - tolerance,
    y: point.y - tolerance,
    width: 2 * tolerance,
    height: 2 * tolerance,
  };

  // Filter out ArrowLayer, LineLayer, and PathLayer before finding intersections
  const filteredLayerIds = layerIds.filter(id => {
    const layer = layers[id];
    return layer.type !== LayerType.Arrow && layer.type !== LayerType.Line;
  });

  // Use the same logic as before to find intersecting layers, but with filtered IDs
  const ids = [];

  for (const layerId of filteredLayerIds) {
  const layer = layers[layerId];
  const { x, y, height, width } = layer;

    if (
      rect.x + rect.width > x &&
      rect.x < x + width &&
      rect.y + rect.height > y &&
      rect.y < y + height
    ) {
      ids.push(layerId);
    }
  }
  return ids
}

export function findIntersectingLayersWithRectangle(
  layerIds: readonly string[],
  layers: { [key: string]: Layer },
  a: Point,
  b: Point,
) {
  const rect = {
    x: Math.min(a.x, b.x),
    y: Math.min(a.y, b.y),
    width: Math.abs(a.x - b.x),
    height: Math.abs(a.y - b.y),
  };

  const ids = [];

  for (const layerId of layerIds) {
    const layer = layers[layerId];

    if (layer == null) {
      continue;
    }

    if (layer.type === LayerType.Arrow && layer.center || layer.type === LayerType.Line && layer.center) {
      const { x, y, center, width, height } = layer;

      const start = { x, y };
      const mid = { x: center.x, y: center.y };
      const end = { x: x + width, y: y + height };

      if (
        (start.x >= rect.x && start.x <= rect.x + rect.width && start.y >= rect.y && start.y <= rect.y + rect.height) &&
        (end.x >= rect.x && end.x <= rect.x + rect.width && end.y >= rect.y && end.y <= rect.y + rect.height)
      ) {
        ids.push(layerId);
        continue;
      }

      // Check if the rectangle intersects with the first part of the arrow
      if (
        lineIntersectsLine(start, mid, { x: rect.x, y: rect.y }, { x: rect.x + rect.width, y: rect.y }) ||
        lineIntersectsLine(start, mid, { x: rect.x + rect.width, y: rect.y }, { x: rect.x + rect.width, y: rect.y + rect.height }) ||
        lineIntersectsLine(start, mid, { x: rect.x + rect.width, y: rect.y + rect.height }, { x: rect.x, y: rect.y + rect.height }) ||
        lineIntersectsLine(start, mid, { x: rect.x, y: rect.y + rect.height }, { x: rect.x, y: rect.y })
      ) {
        ids.push(layerId);
        continue;
      }

      // Check if the rectangle intersects with the second part of the arrow
      if (
        lineIntersectsLine(mid, end, { x: rect.x, y: rect.y }, { x: rect.x + rect.width, y: rect.y }) ||
        lineIntersectsLine(mid, end, { x: rect.x + rect.width, y: rect.y }, { x: rect.x + rect.width, y: rect.y + rect.height }) ||
        lineIntersectsLine(mid, end, { x: rect.x + rect.width, y: rect.y + rect.height }, { x: rect.x, y: rect.y + rect.height }) ||
        lineIntersectsLine(mid, end, { x: rect.x, y: rect.y + rect.height }, { x: rect.x, y: rect.y })
      ) {
        ids.push(layerId);
      }

    } else if (layer.type === LayerType.Path) {
      for (const pathPoint of layer.points) {
        const pointX = pathPoint[0] + layer.x;
        const pointY = pathPoint[1] + layer.y;

        // Check if the point is inside the rectangle
        if (
          pointX >= rect.x &&
          pointX <= rect.x + rect.width &&
          pointY >= rect.y &&
          pointY <= rect.y + rect.height
        ) {
          ids.push(layerId);
          break;
        }
      }
    } else {
      const { x, y, height, width } = layer;

      if (
        rect.x + rect.width > x &&
        rect.x < x + width &&
        rect.y + rect.height > y &&
        rect.y < y + height
      ) {
        ids.push(layerId);
      }
    }
  }

  return ids;
};

export function getContrastingTextColor(color: Color) {
  if (color.r === 0 && color.g === 0 && color.b === 0) {
    if (document.documentElement.classList.contains("dark")) {
      return "white";
    }
    return "black";
  }

  if (color.r === 29 && color.g === 29 && color.b === 29) {
    if (document.documentElement.classList.contains("dark")) {
      return "black";
    }
    return "white";
  }

  if (color.r === 255 && color.g === 255 && color.b === 255) {
    if (document.documentElement.classList.contains("dark")) {
      return "white";
    }
    return "black";
  }

  const luminance = 0.299 * color.r + 0.587 * color.g + 0.114 * color.b;

  return luminance > 182 ? "black" : "white";
};

export function penPointsToPathLayer(
  points: number[][],
  color: Color,
  pathStrokeSize: number,
): PathLayer {

  let left = Number.POSITIVE_INFINITY;
  let top = Number.POSITIVE_INFINITY;
  let right = Number.NEGATIVE_INFINITY;
  let bottom = Number.NEGATIVE_INFINITY;

  for (const point of points) {
    const [x, y] = point;

    if (left > x) {
      left = x;
    }

    if (top > y) {
      top = y;
    }

    if (right < x) {
      right = x;
    }

    if (bottom < y) {
      bottom = y;
    }
  }

  return {
    type: LayerType.Path,
    x: left,
    y: top,
    width: right - left,
    height: bottom - top,
    fill: color,
    strokeSize: pathStrokeSize,
    points: points
      .map(([x, y, pressure]) => [x - left, y - top, pressure]),
  };
};

function toDomPrecision(v: number) {
  return Math.round(v * 1e4) / 1e4
}

function average(A: number[], B: number[]): string {
  return `${toDomPrecision((A[0] + B[0]) / 2)},${toDomPrecision((A[1] + B[1]) / 2)} `;
}

function precise(A: number[]): string {
  return `${toDomPrecision(A[0])},${toDomPrecision(A[1])} `;
}

export function getSvgPathFromPoints(points: number[][], closed = false): string {
  const len = points.length;

  // if (len < 2) {
  //   return '';
  // }

  let d = `M${precise(points[0])}`;

  for (let i = 0; i < len - 1; i++) {
    const midPoint = average(points[i], points[i + 1]);
    d += `Q${precise(points[i])} ${midPoint}`;
  }

  if (closed) {
    d += `Q${precise(points[len - 1])} ${precise(points[0])}Z`;
  } else {
    d += `L${precise(points[len - 1])}`;
  }

  return d;
}
export const NAME = "Sketchlie";

export function checkIfPathIsEllipse(pencilDraft: number[][], tolerance: number): { isEllipse: boolean, ellipseCheck: number } {
  const [minX, minY, maxX, maxY] = pencilDraft.reduce(
    ([minX, minY, maxX, maxY], [x, y]) => [
      Math.min(minX, x),
      Math.min(minY, y),
      Math.max(maxX, x),
      Math.max(maxY, y),
    ],
    [Infinity, Infinity, -Infinity, -Infinity]
  );

  const centerX = (minX + maxX) / 2;
  const centerY = (minY + maxY) / 2;
  const majorRadius = (maxX - minX) / 2;
  const minorRadius = (maxY - minY) / 2;

  const distancesToCenter = pencilDraft.map(([x, y]) => {
    const dx = x - centerX;
    const dy = y - centerY;
    return Math.sqrt((dx * dx) / (majorRadius * majorRadius) + (dy * dy) / (minorRadius * minorRadius));
  });

  const maxDeviation = Math.max(...distancesToCenter.map(d => Math.abs(d - 1)));

  return { isEllipse: maxDeviation < tolerance, ellipseCheck: maxDeviation };
}

export function checkIfPathIsRectangle(pencilDraft: number[][], tolerance: number): { isRectangle: boolean, RectangleCheck: number } {
  const [minX, minY, maxX, maxY] = pencilDraft.reduce(
    ([minX, minY, maxX, maxY], [x, y]) => [
      Math.min(minX, x),
      Math.min(minY, y),
      Math.max(maxX, x),
      Math.max(maxY, y),
    ],
    [Infinity, Infinity, -Infinity, -Infinity]
  );

  const boundingBoxArea = (maxX - minX) * (maxY - minY);

  const pathArea = Math.abs(pencilDraft.reduce((sum, [x1, y1], i) => {
    const [x2, y2] = pencilDraft[(i + 1) % pencilDraft.length];
    return sum + (x1 * y2 - x2 * y1);
  }, 0) / 2);

  const ratio = Math.abs(pathArea / boundingBoxArea);

  return { isRectangle: ratio > tolerance, RectangleCheck: ratio };
}

export function checkIfPathIsLine(pencilDraft: number[][], tolerance: number): { isLine: boolean, lineCheck: number } {
  const [[x1, y1], [x2, y2]] = [pencilDraft[0], pencilDraft[pencilDraft.length - 1]];

  const lineLength = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

  const distancesToLine = pencilDraft.map(([x, y]) => {
    // Distance from point to line formula
    return Math.abs((y2 - y1) * x - (x2 - x1) * y + x2 * y1 - y2 * x1) / lineLength;
  });

  const maxDeviation = Math.max(...distancesToLine);

  return { isLine: maxDeviation < tolerance, lineCheck: maxDeviation };
}

export function checkIfPathIsTriangle(pencilDraft: number[][]): { isTriangle: boolean, triangleCheck: number } {
  // Convex Hull algorithm (Gift wrapping aka Jarvis march algorithm)
  const points = [...pencilDraft];
  const convexHull = [];
  let pointOnHull = points.reduce((leftmost, point) => point[0] < leftmost[0] ? point : leftmost, points[0]);

  while (true) {
    convexHull.push(pointOnHull);
    let endpoint = points[0];

    for (let i = 1; i < points.length; i++) {
      const direction = ((endpoint[0] - pointOnHull[0]) * (points[i][1] - pointOnHull[1])) - ((endpoint[1] - pointOnHull[1]) * (points[i][0] - pointOnHull[0]));
      if (endpoint === pointOnHull || direction > 0) {
        endpoint = points[i];
      }
    }

    pointOnHull = endpoint;
    if (endpoint === convexHull[0]) break;
  }

  // If there are three points on the convex hull, it's a triangle
  return { isTriangle: convexHull.length <= 10, triangleCheck: convexHull.length };
}

export function getShapeType(pencilDraft: number[][], circleTolerance: number, rectangleTolerance: number, lineTolerance: number, triangleTolerance: number): any {
  const { isEllipse, ellipseCheck } = checkIfPathIsEllipse(pencilDraft, circleTolerance);
  const { isRectangle, RectangleCheck } = checkIfPathIsRectangle(pencilDraft, rectangleTolerance);
  const { isLine, lineCheck } = checkIfPathIsLine(pencilDraft, lineTolerance);
  const { isTriangle, triangleCheck } = checkIfPathIsTriangle(pencilDraft);

  if (isEllipse) {
    return LayerType.Ellipse;
  } else if (isRectangle) {
    return LayerType.Rectangle;
  } else if (isLine) {
    return LayerType.Line;
  } else if (isTriangle) {
    return LayerType.Triangle;
  } else {
    return LayerType.Path;
  }
}

export function calculateBoundingBox(layers: Layer[]): any | null {

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

export function resizeBox(
  initialBoundingBox: XYWH,
  newBoundingBox: XYWH,
  newLayer: Layer,
  corner: Side,
  singleLayer: boolean,
  textareaRef?: React.RefObject<HTMLTextAreaElement>,
) {
  const isCorner = corner === (Side.Top + Side.Left) || corner === (Side.Top + Side.Right) || corner === (Side.Bottom + Side.Left) || corner === (Side.Bottom + Side.Right);

  // Calculate the scale factors based on the initial bounding box
  const epsilon = 0.000001; // Sometimes it bugs out check it out if it causes
  const scaleX = newBoundingBox.width !== 0 ? newBoundingBox.width / initialBoundingBox.width : epsilon;
  const scaleY = newBoundingBox.height !== 0 ? newBoundingBox.height / initialBoundingBox.height : epsilon;

  // Calculate the new width, height, and position based on the scale factors
  let width = newLayer.width * scaleX
  let height = newLayer.height * scaleY
  // Calculate the relative positions of the layer within the bounding box
  let relativeX = (newLayer.x - initialBoundingBox.x) / initialBoundingBox.width;
  let relativeY = (newLayer.y - initialBoundingBox.y) / initialBoundingBox.height;

  // Apply the scaling factor to the relative positions
  let x = (relativeX * newBoundingBox.width) + newBoundingBox.x;
  let y = (relativeY * newBoundingBox.height) + newBoundingBox.y;

  // If the layer is an arrow, calculate the relative position of the center and apply the scaling factors
  let center;
  if ((newLayer.type === LayerType.Arrow || newLayer.type === LayerType.Line) && newLayer.center) {
    let relativeCenterX = (newLayer.center.x - initialBoundingBox.x) / initialBoundingBox.width;
    let relativeCenterY = (newLayer.center.y - initialBoundingBox.y) / initialBoundingBox.height;

    let centerX = (relativeCenterX * newBoundingBox.width) + newBoundingBox.x;
    let centerY = (relativeCenterY * newBoundingBox.height) + newBoundingBox.y;

    center = { x: centerX, y: centerY };
  }

  let textFontSize;
  if (
    newLayer.type !== LayerType.Path &&
    newLayer.type !== LayerType.Image &&
    newLayer.type !== LayerType.Line &&
    newLayer.type !== LayerType.Arrow
  ) {
    if (!singleLayer) {
      textFontSize = newLayer.textFontSize * scaleY;
    } else {
      textFontSize = newLayer.textFontSize;
    }
  }

  let points;

  if (newLayer.type === LayerType.Path) {
    points = newLayer.points.map(([x, y]) => {
      return [x * scaleX, y * scaleY];
    });
  }

  // Apply the scale factors to the layer
  let bounds = {
    x: x,
    y: y,
    width: width,
    height: height,
    center: center,
    textFontSize: textFontSize,
    points: points
  }

  if (newLayer && Math.abs((newLayer?.height / newLayer?.width) - (bounds.height / bounds.width)) < 0.0001 && newLayer.height !== bounds.height && newLayer.width !== bounds.width
    && textareaRef && textareaRef.current && newLayer.type === LayerType.Text) {
    const newFontSize = bounds.width / newLayer.width * newLayer.textFontSize
    bounds.textFontSize = newFontSize
  }

  if (!isCorner && textareaRef && textareaRef.current && newLayer.type === LayerType.Text && singleLayer) {
    bounds.height = textareaRef.current.scrollHeight;
  }

  return bounds
}

export function removeHighlightFromText() {
  const selection = window.getSelection();
  if (selection && selection.rangeCount > 0) {
    selection.removeAllRanges();
  }
}

export async function bodyToString(body: Blob | ReadableStream | Readable): Promise<string> {
  if (body instanceof ReadableStream || body instanceof Blob) {
    // Browser environment
    const reader = body instanceof ReadableStream ? body.getReader() : body.stream().getReader();
    let chunks = '';
    let result;
    while (!(result = await reader.read()).done) {
      const chunk = result.value;
      chunks += new TextDecoder().decode(chunk);
    }
    return chunks;
  } else {
    // Node.js environment, assuming body is a Readable stream
    return new Promise((resolve, reject) => {
      const chunks: Buffer[] = [];
      body.on('data', (chunk) => chunks.push(chunk));
      body.on('end', () => resolve(Buffer.concat(chunks as any).toString('utf-8')));
      body.on('error', reject);
    });
  }
}

export function getClosestPointOnBorder(connectedLayer: Layer, point: Point, oppositePoint: Point, zoom: number, arrowType: ArrowType, arrowLayer: ArrowLayer): Point {
  let closestPoint: Point = getClosestEndPoint(connectedLayer, point, arrowType, arrowLayer);
  let minDistance = Number.MAX_VALUE;

  let HOT_ZONE_BASE_SIZE = 0.4; // Base size for hot zone calculation

  if (arrowType === ArrowType.Diagram) {
    HOT_ZONE_BASE_SIZE = 1;
  }

  const offset = 5;

  // Calculate base hot zone dimensions as 60% of layer's dimensions
  const baseHotZoneWidth = connectedLayer.width * HOT_ZONE_BASE_SIZE;
  const baseHotZoneHeight = connectedLayer.height * HOT_ZONE_BASE_SIZE;

  // Adjust hot zone size based on zoom, ensuring it's not smaller than 60% of layer's dimensions
  const adjustedHotZoneWidth = Math.max(baseHotZoneWidth, connectedLayer.width * HOT_ZONE_BASE_SIZE / zoom);
  const adjustedHotZoneHeight = Math.max(baseHotZoneHeight, connectedLayer.height * HOT_ZONE_BASE_SIZE / zoom);

  // Calculate the hot zone boundaries based on the adjusted dimensions
  const centerX = connectedLayer.x + connectedLayer.width / 2;
  const centerY = connectedLayer.y + connectedLayer.height / 2;
  const hotZoneX = centerX - adjustedHotZoneWidth / 2;
  const hotZoneY = centerY - adjustedHotZoneHeight / 2;

  // Check if the point is within the adjusted hot zone
  if (point.x > hotZoneX && point.x < hotZoneX + adjustedHotZoneWidth && point.y > hotZoneY && point.y < hotZoneY + adjustedHotZoneHeight) {
    const closestPointToMiddle = getClosestEndPoint(connectedLayer, oppositePoint, arrowType, arrowLayer);
    return closestPointToMiddle;
  }

  // Check for left or right border and calculate closest point with offset
  if (oppositePoint.x < connectedLayer.x) {
    const distance = Math.abs(point.x - connectedLayer.x);
    if (distance < minDistance) {
      closestPoint = { x: connectedLayer.x - offset, y: point.y };
      minDistance = distance;
    }
  } else if (oppositePoint.x > connectedLayer.x + connectedLayer.width) {
    const distance = Math.abs(point.x - (connectedLayer.x + connectedLayer.width));
    if (distance < minDistance) {
      closestPoint = { x: connectedLayer.x + connectedLayer.width + offset, y: point.y };
      minDistance = distance;
    }
  }

  // Check for top or bottom border and calculate closest point with offset
  if (oppositePoint.y < connectedLayer.y) {
    const distance = Math.abs(point.y - connectedLayer.y);
    if (distance < minDistance) {
      closestPoint = { x: point.x, y: connectedLayer.y - offset };
      minDistance = distance;
    }
  } else if (oppositePoint.y > connectedLayer.y + connectedLayer.height) {
    const distance = Math.abs(point.y - (connectedLayer.y + connectedLayer.height));
    if (distance < minDistance) {
      closestPoint = { x: point.x, y: connectedLayer.y + connectedLayer.height + offset };
      minDistance = distance;
    }
  }

  return closestPoint;
}

export function getClosestEndPoint(connectedLayer: Layer, point: Point, arrowType: ArrowType, arrowLayer: ArrowLayer): Point {
  if (arrowType === ArrowType.Diagram) {
    
    // Calculate the middle points of each border
    let middlePoints = [
      { x: connectedLayer.x + connectedLayer.width / 2, y: connectedLayer.y }, // Top middle
      { x: connectedLayer.x + connectedLayer.width / 2, y: connectedLayer.y + connectedLayer.height }, // Bottom middle
      { x: connectedLayer.x, y: connectedLayer.y + connectedLayer.height / 2 }, // Left middle
      { x: connectedLayer.x + connectedLayer.width, y: connectedLayer.y + connectedLayer.height / 2 } // Right middle
    ];

    if (arrowLayer.orientation === ArrowOrientation.Horizontal) {
      middlePoints = [
        middlePoints[2],
        middlePoints[3]
      ]
    } else {
      middlePoints = [
        middlePoints[0],
        middlePoints[1]
      ]
    }

    // Find the closest middle point to the given point
    let closestMiddlePoint = middlePoints[0];
    let minDistance = Number.MAX_VALUE;
    for (const middlePoint of middlePoints) {
      const distance = Math.sqrt((middlePoint.x - point.x) ** 2 + (middlePoint.y - point.y) ** 2);
      if (distance < minDistance) {
        closestMiddlePoint = middlePoint;
        minDistance = distance;
      }
    }

    // Assuming the closestMiddlePoint has been found for ArrowType.Diagram

    // Calculate the direction vector from the closestMiddlePoint to the center of the connectedLayer
    const directionFromPointToCenter = {
      x: (connectedLayer.x + connectedLayer.width / 2) - closestMiddlePoint.x,
      y: (connectedLayer.y + connectedLayer.height / 2) - closestMiddlePoint.y,
    };

    // Normalize this direction vector
    const magnitude = Math.sqrt(directionFromPointToCenter.x ** 2 + directionFromPointToCenter.y ** 2);
    const normalizedDirection = {
      x: directionFromPointToCenter.x / magnitude,
      y: directionFromPointToCenter.y / magnitude,
    };

    // Move the closestMiddlePoint 5 units away from the center in the opposite direction
    closestMiddlePoint.x -= normalizedDirection.x * 5;
    closestMiddlePoint.y -= normalizedDirection.y * 5;

    // Return the adjusted closestMiddlePoint
    return closestMiddlePoint;
  } else {
    // Existing logic for other arrow types
    const direction = { x: connectedLayer.x + connectedLayer.width / 2 - point.x, y: connectedLayer.y + connectedLayer.height / 2 - point.y };
    const offset = -5;

    const magnitude = Math.sqrt(direction.x ** 2 + direction.y ** 2);
    const normalizedDirection = { x: direction.x / magnitude, y: direction.y / magnitude };

    const potentialEndPoints = [
      { x: connectedLayer.x, y: point.y + normalizedDirection.y * (connectedLayer.x - point.x) / normalizedDirection.x },
      { x: connectedLayer.x + connectedLayer.width, y: point.y + normalizedDirection.y * (connectedLayer.x + connectedLayer.width - point.x) / normalizedDirection.x },
      { y: connectedLayer.y, x: point.x + normalizedDirection.x * (connectedLayer.y - point.y) / normalizedDirection.y },
      { y: connectedLayer.y + connectedLayer.height, x: point.x + normalizedDirection.x * (connectedLayer.y + connectedLayer.height - point.y) / normalizedDirection.y }
    ];

    const validEndPoints = potentialEndPoints.filter(point =>
      point.x >= connectedLayer.x && point.x <= connectedLayer.x + connectedLayer.width &&
      point.y >= connectedLayer.y && point.y <= connectedLayer.y + connectedLayer.height
    );

    let closestEndPoint = validEndPoints[0];
    for (const endPoint of validEndPoints) {
      if (Math.sqrt((endPoint.x - point.x) ** 2 + (endPoint.y - point.y) ** 2) < Math.sqrt((closestEndPoint.x - point.x) ** 2 + (closestEndPoint.y - point.y) ** 2)) {
        closestEndPoint = endPoint;
      }
    }

    // Adjust the closest endpoint by the offset along the normalized direction
    closestEndPoint.x += normalizedDirection.x * offset;
    closestEndPoint.y += normalizedDirection.y * offset;

    return closestEndPoint;
  }
}

export function updateArrowPosition(arrowLayer: ArrowLayer, connectedLayerId: string, newLayer: Layer, startConnectedLayerId: string, endConnectedLayerId: string, liveLayers: any) {
  const updatedArrow = { ...arrowLayer };
  let start = { x: arrowLayer.x, y: arrowLayer.y };
  let end = { x: arrowLayer.x + arrowLayer.width, y: arrowLayer.y + arrowLayer.height };
  let center = arrowLayer.center || { x: (start.x + end.x) / 2, y: (start.y + end.y) / 2 };
  const startConnectedLayer = liveLayers[startConnectedLayerId];
  const endConnectedLayer = liveLayers[endConnectedLayerId];

  if (connectedLayerId === startConnectedLayerId) {
    const startPoint = getClosestEndPoint(newLayer, center, arrowLayer.arrowType || ArrowType.Straight, arrowLayer);
    updatedArrow.x = startPoint.x;
    updatedArrow.y = startPoint.y;
    updatedArrow.width = end.x - startPoint.x;
    updatedArrow.height = end.y - startPoint.y;
    start = startPoint;

    if (endConnectedLayerId && endConnectedLayer) {
      if (arrowLayer.orientation === ArrowOrientation.Horizontal) {
        const intersects = (
          startConnectedLayer.x < endConnectedLayer.x + endConnectedLayer.width &&
          startConnectedLayer.x + startConnectedLayer.width > endConnectedLayer.x
        );
  
        if (intersects) {
          arrowLayer.orientation = ArrowOrientation.Vertical;
        }
      } else if (arrowLayer.orientation === ArrowOrientation.Vertical) {
        const intersects = (
          startConnectedLayer.y < endConnectedLayer.y + endConnectedLayer.height &&
          startConnectedLayer.y + startConnectedLayer.height > endConnectedLayer.y
        );

        if (intersects) {
          arrowLayer.orientation = ArrowOrientation.Horizontal
        };
      }

      if ((arrowLayer.arrowType !== ArrowType.Diagram && arrowLayer.centerEdited !== true) || arrowLayer.arrowType === ArrowType.Diagram) {
        const endPoint = getClosestEndPoint(endConnectedLayer, center, arrowLayer.arrowType || ArrowType.Straight, arrowLayer);
        updatedArrow.width = endPoint.x - updatedArrow.x;
        updatedArrow.height = endPoint.y - updatedArrow.y;
        end = endPoint;
      }
    } else {
      if (arrowLayer.orientation === ArrowOrientation.Horizontal) {
        if (end.x >= startConnectedLayer.x && end.x <= startConnectedLayer.x + startConnectedLayer.width) {
          arrowLayer.orientation = ArrowOrientation.Vertical;
        }
      } else if (arrowLayer.orientation === ArrowOrientation.Vertical) {
        if (end.y >= startConnectedLayer.y && end.y <= startConnectedLayer.y + startConnectedLayer.height) {
          arrowLayer.orientation = ArrowOrientation.Horizontal;
        }
      }
    }
  } else if (connectedLayerId === endConnectedLayerId) {
    if (startConnectedLayerId && startConnectedLayer) {
      if (arrowLayer.orientation === ArrowOrientation.Horizontal) {
        const intersects = (
          endConnectedLayer.x < startConnectedLayer.x + startConnectedLayer.width &&
          endConnectedLayer.x + endConnectedLayer.width > startConnectedLayer.x
        );

        if (intersects) {
          arrowLayer.orientation = ArrowOrientation.Vertical;
        }

      } else if (arrowLayer.orientation === ArrowOrientation.Vertical) {
        const intersects = (
          endConnectedLayer.y < startConnectedLayer.y + startConnectedLayer.height &&
          endConnectedLayer.y + endConnectedLayer.height > startConnectedLayer.y
        )

        if (intersects) {
          arrowLayer.orientation = ArrowOrientation.Horizontal;
        }
      }

      if ((arrowLayer.arrowType !== ArrowType.Diagram && arrowLayer.centerEdited !== true) || arrowLayer.arrowType === ArrowType.Diagram) {
        const startPoint = getClosestEndPoint(startConnectedLayer, center, arrowLayer.arrowType || ArrowType.Straight, arrowLayer);
        updatedArrow.x = startPoint.x;
        updatedArrow.y = startPoint.y;
        start = startPoint;
      }
    } else {
      if (arrowLayer.orientation === ArrowOrientation.Horizontal) {
        if (start.x >= endConnectedLayer.x && start.x <= endConnectedLayer.x + endConnectedLayer.width) {
          arrowLayer.orientation = ArrowOrientation.Vertical;
        }
      } else if (arrowLayer.orientation === ArrowOrientation.Vertical) {
        if (start.y >= endConnectedLayer.y && start.y <= endConnectedLayer.y + endConnectedLayer.height) {
          arrowLayer.orientation = ArrowOrientation.Horizontal;
        }
      }
    }

    const endPoint = getClosestEndPoint(newLayer, center, arrowLayer.arrowType || ArrowType.Straight, arrowLayer);
    updatedArrow.width = endPoint.x - updatedArrow.x;
    updatedArrow.height = endPoint.y - updatedArrow.y;
    end = endPoint;
  }

  if (arrowLayer.centerEdited !== true || updatedArrow.arrowType === ArrowType.Diagram) {
    updatedArrow.center = { x: (start.x + end.x) / 2, y: (start.y + end.y) / 2 };
  }

  return updatedArrow;
};

export function updatedLayersConnectedArrows(connectedLayer: any, id: string) {
  connectedLayer.connectedArrows = connectedLayer.connectedArrows || [];
  // Check if the arrow's ID is already in the connectedLayer's connectedArrows array
  if (!connectedLayer.connectedArrows.includes(id)) {
    // Add the arrow's ID to the connectedLayer's connectedArrows array
    connectedLayer.connectedArrows.push(id);
  }

  return connectedLayer;
}

export function checkIfTextarea() {
  if (document.activeElement &&
    document.activeElement.getAttribute('contentEditable') !== 'true' &&
    document.activeElement.tagName !== 'TEXTAREA' &&
    document.activeElement.tagName !== 'INPUT'
  ) {
    return false;
  }
  return true;
}

export const getUsersCurrency = () => {
  return new Promise((resolve, reject) => {
    const success = async (position: any) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const geoApiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=es`;

      try {
        const response = await fetch(geoApiUrl);
        const data = await response.json();
        const countryCode = data.countryCode;

        // Mapping of country codes to currencies
        const currencyMap: any = {
          AR: 'ARS', // Argentine peso
          BR: 'BRL', // Brazilian real
          CL: 'CLP', // Chilean peso
          MX: 'MXN', // Mexican peso
          CO: 'COP', // Colombian peso
          PE: 'PEN', // Peruvian sol
          UY: 'UYU', // Uruguayan peso
        };

        const currency = currencyMap[countryCode] || 'MXN';
        resolve(currency);
      } catch (error) {
        reject('Failed to fetch currency');
      }
    };

    const error = () => {
      toast.info('Pedimos permiso para acceder a tu ubicación para mostrarte la moneda de tu país');
      reject('Permission denied');
    };

    navigator.geolocation.getCurrentPosition(success, error);
  });
};

export const getPrice = async (price: any, currency: any) => {
  if (currency === "ARS") {
    return price
  } else if (currency === "BRL") {
    return price * 0.006
  } else if (currency === "CLP") {
    return price
  } else if (currency === "MXN") {
    return price * 0.02
  } else if (currency === "COP") {
    return price * 4.3
  } else if (currency === "PEN") {
    return price * 0.004
  } else if (currency === "UYU") {
    return price * 0.044
  }
};