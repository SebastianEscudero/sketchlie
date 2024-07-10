export type Color = {
  r: number;
  g: number;
  b: number;
  a: number;
};

export type Camera = {
  x: number;
  y: number;
};

export enum LayerType {
  Rectangle,
  Ellipse,
  Rhombus,
  Triangle,
  Star,
  Hexagon,
  BigArrowDown,
  BigArrowUp,
  BigArrowLeft,
  BigArrowRight,
  CommentBubble,
  Line,
  Path,
  Text,
  Note,
  Image,
  Arrow,
};

export type ArrowLayer = {
  type: LayerType.Arrow;
  x: number;
  y: number;
  center?: Point;
  height: number;
  width: number;
  fill: Color;
  startArrowHead: ArrowHead;
  endArrowHead: ArrowHead;
  startConnectedLayerId?: string;
  endConnectedLayerId?: string;
};

export type RectangleLayer = {
  type: LayerType.Rectangle;
  x: number;
  y: number;
  height: number;
  width: number;
  fill: Color;
  outlineFill: Color | null;
  textFontSize: number;
  value?: string;
  alignX?: "left" | "center" | "right";
  alignY?: "top" | "center" | "bottom";
  connectedArrows?: string[];
};

export type EllipseLayer = {
  type: LayerType.Ellipse;
  x: number;
  y: number;
  height: number;
  width: number;
  fill: Color;
  outlineFill: Color | null;
  textFontSize: number;
  value?: string;
  alignX?: "left" | "center" | "right";
  alignY?: "top" | "center" | "bottom";
  connectedArrows?: string[];
};

export type RhombusLayer = {
  type: LayerType.Rhombus;
  x: number;
  y: number;
  height: number;
  width: number;
  fill: Color;
  outlineFill: Color | null;
  textFontSize: number;
  value?: string;
  alignX?: "left" | "center" | "right";
  alignY?: "top" | "center" | "bottom";
  connectedArrows?: string[];
};

export type TriangleLayer = {
  type: LayerType.Triangle;
  x: number;
  y: number;
  height: number;
  width: number;
  fill: Color;
  outlineFill: Color | null;
  textFontSize: number;
  value?: string;
  alignX?: "left" | "center" | "right";
  alignY?: "top" | "center" | "bottom";
  connectedArrows?: string[];
};

export type StarLayer = {
  type: LayerType.Star;
  x: number;
  y: number;
  height: number;
  width: number;
  fill: Color;
  outlineFill: Color | null;
  textFontSize: number;
  value?: string;
  alignX?: "left" | "center" | "right";
  alignY?: "top" | "center" | "bottom";
  connectedArrows?: string[];
};

export type HexagonLayer = {
  type: LayerType.Hexagon;
  x: number;
  y: number;
  height: number;
  width: number;
  fill: Color;
  outlineFill: Color | null;
  textFontSize: number;
  value?: string;
  alignX?: "left" | "center" | "right";
  alignY?: "top" | "center" | "bottom";
  connectedArrows?: string[];
};

export type BigArrowLeftLayer = {
  type: LayerType.BigArrowLeft;
  x: number;
  y: number;
  height: number;
  width: number;
  fill: Color;
  outlineFill: Color | null;
  textFontSize: number;
  value?: string;
  alignX?: "left" | "center" | "right";
  alignY?: "top" | "center" | "bottom";
  connectedArrows?: string[];
};

export type BigArrowRightLayer = {
  type: LayerType.BigArrowRight;
  x: number;
  y: number;
  height: number;
  width: number;
  fill: Color;
  outlineFill: Color | null;
  textFontSize: number;
  value?: string;
  alignX?: "left" | "center" | "right";
  alignY?: "top" | "center" | "bottom";
  connectedArrows?: string[];
};

export type BigArrowDownLayer = {
  type: LayerType.BigArrowDown;
  x: number;
  y: number;
  height: number;
  width: number;
  fill: Color;
  outlineFill: Color | null;
  textFontSize: number;
  value?: string;
  alignX?: "left" | "center" | "right";
  alignY?: "top" | "center" | "bottom";
  connectedArrows?: string[];
};

export type BigArrowUpLayer = {
  type: LayerType.BigArrowUp;
  x: number;
  y: number;
  height: number;
  width: number;
  fill: Color;
  outlineFill: Color | null;
  textFontSize: number;
  value?: string;
  alignX?: "left" | "center" | "right";
  alignY?: "top" | "center" | "bottom";
  connectedArrows?: string[];
};

export type CommentBubbleLayer = {
  type: LayerType.CommentBubble;
  x: number;
  y: number;
  height: number;
  width: number;
  fill: Color;
  outlineFill: Color | null;
  textFontSize: number;
  value?: string;
  alignX?: "left" | "center" | "right";
  alignY?: "top" | "center" | "bottom";
  connectedArrows?: string[];
};

export type LineLayer = {
  type: LayerType.Line;
  x: number;
  y: number;
  center?: Point;
  height: number;
  width: number;
  fill: Color;
  startConnectedLayerId?: string;
  endConnectedLayerId?: string;
};

export type PathLayer = {
  type: LayerType.Path;
  x: number;
  y: number;
  height: number;
  width: number;
  fill: Color;
  points: number[][];
  strokeSize?: number;
};

export type ImageLayer = {
  type: LayerType.Image;
  x: number;
  y: number;
  width: number;
  height: number;
  src: string;
  opacity?: number;
  connectedArrows?: string[];
};

export type TextLayer = {
  type: LayerType.Text;
  x: number;
  y: number;
  height: number;
  width: number;
  fill: Color;
  outlineFill: Color | null;
  value?: string;
  textFontSize: number;
  alignX?: "left" | "center" | "right";
  alignY?: "top" | "center" | "bottom";
  connectedArrows?: string[];
};

export type NoteLayer = {
  type: LayerType.Note;
  x: number;
  y: number;
  height: number;
  width: number;
  fill: Color;
  outlineFill: Color | null;
  value?: string;
  textFontSize: number;
  alignX?: "left" | "center" | "right";
  alignY?: "top" | "center" | "bottom";
  connectedArrows?: string[];
};


export type Point = {
  x: number;
  y: number;
};

export type XYWH = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export enum Side {
  Top = 1,
  Bottom = 2,
  Left = 4,
  Right = 8,
};

export enum ArrowHandle {
  start,
  center,
  end
};

export type CanvasState =
  | {
    mode: CanvasMode.None;
  }
  | {
    mode: CanvasMode.SelectionNet,
    origin: Point;
    current?: Point;
  }
  | {
    mode: CanvasMode.Translating,
    current: Point;
  }
  | {
    mode: CanvasMode.Inserting,
    layerType: LayerType.Ellipse | LayerType.Rectangle | LayerType.Rhombus | LayerType.Triangle 
    | LayerType.Star | LayerType.Hexagon | LayerType.BigArrowDown | LayerType.BigArrowUp  | LayerType.Line
    | LayerType.BigArrowLeft | LayerType.BigArrowRight | LayerType.Text | LayerType.Note 
    | LayerType.CommentBubble | LayerType.Image | LayerType.Path | LayerType.Arrow;
  }
  | {
    mode: CanvasMode.Pencil,
  }
  | {
    mode: CanvasMode.Laser,
  }
  | {
    mode: CanvasMode.Highlighter,
  }
  | {
    mode: CanvasMode.Eraser,
  }
  | {
    mode: CanvasMode.Pressing,
    origin: Point;
  }
  | {
    mode: CanvasMode.ArrowResizeHandler,
    initialBounds: XYWH;
    handle: ArrowHandle;
  }
  | {
    mode: CanvasMode.Resizing,
    initialBounds: XYWH;
    corner: Side;
  }
  | {
    mode: CanvasMode.Moving,
  }

export enum CanvasMode {
  None,
  Pressing,
  SelectionNet,
  Translating,
  Inserting,
  Resizing,
  ArrowResizeHandler,
  Pencil,
  Laser,
  Highlighter,
  Eraser,
  Moving
};

export type Layer = RectangleLayer | EllipseLayer | RhombusLayer | TriangleLayer | StarLayer 
| HexagonLayer | BigArrowDownLayer | BigArrowLeftLayer | BigArrowRightLayer | BigArrowUpLayer | PathLayer 
| CommentBubbleLayer |TextLayer | NoteLayer | ImageLayer | ArrowLayer | LineLayer;

export interface Layers {
  [key: string]: Layer;
}

export type Presence = {
  cursor?: { x: number, y: number } | null,
  selection?: string[];
  pencilDraft?: [x: number, y: number, pressure: number][] | null;
  pathStrokeColor?: Color;
  pathStrokeSize?: number;
};

export type User = {
  userId: string;
  connectionId: number;
  presence: Presence | null;
  information: {
      name?: string;
      picture?: string;
    };
};

export type UpdateLayerMutation = (args: {
  board: any;
  layerId: string;
  layerUpdates: Record<string, unknown>;
}) => Promise<any>;

export enum ArrowHead {
  None = "None",
  Triangle = "Triangle",
}

export type PreviewLayer = RectangleLayer | EllipseLayer | RhombusLayer | 
TriangleLayer | StarLayer | HexagonLayer | BigArrowDownLayer | BigArrowLeftLayer | LineLayer
| BigArrowRightLayer | BigArrowUpLayer | CommentBubbleLayer | TextLayer | NoteLayer | ArrowLayer;

export enum SelectorType {
  Color,
  OutlineColor,
  ArrowHead,
  TextJustify,
  FontSize
};