import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { 
  ArrowHandle,
  Camera, 
  Color, 
  Layer, 
  LayerType, 
  PathLayer, 
  Point, 
  Side, 
  XYWH
} from "@/types/canvas";
import { toJpeg, toPng } from 'html-to-image';

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
  "#FFFFFF", // White
  "#1D1D1D", // Dark Gray
  "#9FA8B2", // Light Gray
  "#FFF000", // Yellow
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
  return {
    x: (Math.round(e.clientX) - camera.x) / zoom,
    y: (Math.round(e.clientY) - camera.y) / zoom,
  };
};

export function connectionIdToColor(connectionId: number): string {
  return COLORS[connectionId % COLORS.length];
};


export function colorToCss(color: Color) {
  return `rgba(${color.r},${color.g},${color.b},${color.a})`;
}

export function resizeBounds(
  type: any,
  bounds: XYWH, 
  corner: Side, 
  point: Point,
  textareaRef?: React.RefObject<HTMLTextAreaElement>,
  layer?: Layer
): XYWH {

  const result = {
    x: bounds.x,
    y: bounds.y,
    width: bounds.width,
    height: bounds.height,
    textFontSize: 0
  };

  if (layer?.type === LayerType.Text) {
    result.textFontSize = layer.textFontSize;
  }

  const isCorner = corner === (Side.Top + Side.Left) || corner === (Side.Top + Side.Right) || corner === (Side.Bottom + Side.Left) || corner === (Side.Bottom + Side.Right);
  const aspectRatio = bounds.width / bounds.height;

  if ((type === LayerType.Text || type === LayerType.Image) && isCorner) {
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

  if (layer && Math.abs((layer?.height / layer?.width) - (result.height / result.width)) < 0.0001 && layer.height !== result.height && layer.width !== result.width
  && textareaRef && textareaRef.current && layer.type === LayerType.Text) {
    const newFontSize = result.width / layer.width * layer.textFontSize
    result.textFontSize = newFontSize
    return result
  }

  if (!isCorner && textareaRef && textareaRef.current) {
    result.height = textareaRef.current.scrollHeight;
    return result
  } 

  return result;
};

export function resizeArrowBounds(
  bounds: any, 
  point: Point,
  handle: ArrowHandle,
): any {

  const result = {
    x: bounds.x,
    y: bounds.y,
    width: bounds.width,
    height: bounds.height,
    center: bounds.center,
  };

  if (handle === ArrowHandle.start) {
    const endPoint = { x: bounds.x + bounds.width, y: bounds.y + bounds.height };
    result.x = point.x;
    result.y = point.y;
    result.width = endPoint.x - point.x;
    result.height = endPoint.y - point.y;
  } else if (handle === ArrowHandle.end) {
    result.width = point.x - bounds.x;
    result.height = point.y - bounds.y;
  } else if (handle === ArrowHandle.center) {
    result.center.x += point.x - result.center.x;
    result.center.y += point.y - result.center.y;
  }

  if (handle === ArrowHandle.start || handle === ArrowHandle.end) {
    result.center.x = result.x + result.width / 2;
    result.center.y = result.y + result.height / 2;
  }

  return result;
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

export function findIntersectingLayersWithPoint(
  layerIds: readonly string[],
  layers: { [key: string]: Layer },
  point: Point,
  zoom: number
) {
  const tolerance = Math.max(4, 4/zoom);
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

export const exportToPNG = async (title: string) => {
  const screenShot = document.getElementById("canvas") as HTMLElement;
  screenShot.style.backgroundColor = '#F4F4F4';
  toPng(screenShot, { quality: 1 }).then((dataUrl) => {
    var anchor = document.createElement("a");
    anchor.setAttribute("href", dataUrl);
    anchor.setAttribute("download", `${title}.png`);
    anchor.click();
    anchor.remove();
  })
};

export const exportToSVG = async (title: string) => {
  // implement
};

export function checkIfPathIsEllipse(pencilDraft: number[][], tolerance: number): {isEllipse: boolean, ellipseCheck: number} {
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

  return {isEllipse: maxDeviation < tolerance, ellipseCheck: maxDeviation};
}

export function checkIfPathIsRectangle(pencilDraft: number[][], tolerance: number): {isRectangle: boolean, RectangleCheck: number} {
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

  const ratio = Math.abs(pathArea/boundingBoxArea);

  return {isRectangle: ratio > tolerance, RectangleCheck: ratio};
}

export function checkIfPathIsLine(pencilDraft: number[][], tolerance: number): {isLine: boolean, lineCheck: number} {
  const [[x1, y1], [x2, y2]] = [pencilDraft[0], pencilDraft[pencilDraft.length - 1]];

  const lineLength = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

  const distancesToLine = pencilDraft.map(([x, y]) => {
    // Distance from point to line formula
    return Math.abs((y2 - y1) * x - (x2 - x1) * y + x2 * y1 - y2 * x1) / lineLength;
  });

  const maxDeviation = Math.max(...distancesToLine);

  return {isLine: maxDeviation < tolerance, lineCheck: maxDeviation};
}

export function checkIfPathIsTriangle(pencilDraft: number[][]): {isTriangle: boolean, triangleCheck: number} {
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
  return {isTriangle: convexHull.length <= 10, triangleCheck: convexHull.length};
}

export function getShapeType(pencilDraft: number[][], circleTolerance: number, rectangleTolerance: number, lineTolerance: number, triangleTolerance: number): any {
  const {isEllipse, ellipseCheck} = checkIfPathIsEllipse(pencilDraft, circleTolerance);
  const {isRectangle, RectangleCheck} = checkIfPathIsRectangle(pencilDraft, rectangleTolerance);
  const {isLine, lineCheck} = checkIfPathIsLine(pencilDraft, lineTolerance);
  const {isTriangle, triangleCheck} = checkIfPathIsTriangle(pencilDraft);
  
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