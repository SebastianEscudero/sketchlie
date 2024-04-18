import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { 
  Camera, 
  Color, 
  Layer, 
  LayerType, 
  PathLayer, 
  Point, 
  Side, 
  XYWH
} from "@/types/canvas";

const COLORS = [
  "#DC2626", // Red
  "#D97706", // Amber
  "#059669", // Teal
  "#7C3AED", // Violet
  "#DB2777",  // Pink
  "#3AB624", // Emerald
  "#2E5ADA", // Dark Blue
  "#6D2AC2", // Purple
];

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function connectionIdToColor(connectionId: number): string {
  return COLORS[connectionId % COLORS.length];
};

export function pointerEventToCanvasPoint(
  e: React.PointerEvent,
  camera: Camera,
  zoom: number,
) {
  return {
    x: (Math.round(e.clientX) - camera.x) / zoom,
    y: (Math.round(e.clientY) - camera.y) / zoom,
  };
};

export function colorToCss(color: Color) {
  if (!color || (color.r === 0 && color.g === 0 && color.b === 0)) {
    return "transparent";
  }

  return `#${color.r.toString(16).padStart(2, "0")}${color.g.toString(16).padStart(2, "0")}${color.b.toString(16).padStart(2, "0")}`;
}

export function resizeBounds(
  type: any,
  bounds: XYWH, 
  corner: Side, 
  point: Point
): XYWH {
  const result = {
    x: bounds.x,
    y: bounds.y,
    width: bounds.width,
    height: bounds.height,
  };

  const isCorner = corner === (Side.Top + Side.Left) || corner === (Side.Top + Side.Right) || corner === (Side.Bottom + Side.Left) || corner === (Side.Bottom + Side.Right);
  const aspectRatio = bounds.width / bounds.height;

  if (type === 3 && isCorner) {
    let newWidth = (corner & Side.Left) === Side.Left ? Math.abs(bounds.x + bounds.width - point.x) : Math.abs(point.x - bounds.x);
    let newHeight = newWidth / aspectRatio;

    if ((corner & Side.Left) === Side.Left) {
      result.x = bounds.x + (bounds.width - newWidth);
      result.width = newWidth;
    }

    if ((corner & Side.Right) === Side.Right) {
      result.width = newWidth;
    }

    if ((corner & Side.Top) === Side.Top) {
      result.y = bounds.y + (bounds.height - newHeight);
      result.height = newHeight;
    }

    if ((corner & Side.Bottom) === Side.Bottom) {
      result.height = newHeight;
    }
  } else {
    if ((corner & Side.Left) === Side.Left) {
      result.x = Math.min(point.x, bounds.x + bounds.width);
      result.width = Math.abs(bounds.x + bounds.width - point.x);
    }

    if ((corner & Side.Right) === Side.Right) {
      result.x = Math.min(point.x, bounds.x);
      result.width = Math.abs(point.x - bounds.x);
    }

    if ((corner & Side.Top) === Side.Top) {
      result.y = Math.min(point.y, bounds.y + bounds.height);
      result.height = Math.abs(bounds.y + bounds.height - point.y);
    }

    if ((corner & Side.Bottom) === Side.Bottom) {
      result.y = Math.min(point.y, bounds.y);
      result.height = Math.abs(point.y - bounds.y);
    }
  }

  return result;
};

export function findIntersectingLayersWithRectangle(
  layerIds: readonly string[],
  layers: ReadonlyMap<string, Layer>,
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
    const layer = layers.get(layerId);

    if (layer == null) {
      continue;
    }

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

  return ids;
};

export function getContrastingTextColor(color: Color) {
  if (color.r === 0 && color.g === 0 && color.b === 0) {
    return "black";
  }

  const luminance = 0.299 * color.r + 0.587 * color.g + 0.114 * color.b;

  return luminance > 182 ? "black" : "white";
};

export function penPointsToPathLayer(
  points: number[][],
  color: Color,
): PathLayer {
  if (points.length < 2) {
    throw new Error("Cannot transform points with less than 2 points");
  }

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
    points: points
      .map(([x, y, pressure]) => [x - left, y - top, pressure]),
  };
};

export function getSvgPathFromStroke(stroke: number[][]) {
  if (!stroke.length) return "";

  const d = stroke.reduce(
    (acc, [x0, y0], i, arr) => {
      const [x1, y1] = arr[(i + 1) % arr.length];
      acc.push(x0, y0, (x0 + x1) / 2, (y0 + y1) / 2);
      return acc;
    },
    ["M", ...stroke[0], "Q"]
  );

  d.push("Z");
  return d.join(" ");
};

export const NAME = "Sketchlie";

export const exportToPdf = async (title: string) => {
  console.log("soon")
}