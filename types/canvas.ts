import { TableColumn, TableRow } from "@/app/board/[boardId]/canvas-objects/table";

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
  Video,
  Link,
  Frame,
  Svg,
  Comment,
  Table,
};

export type BaseShapeLayer = {
  type: LayerType;
  x: number;
  y: number;
  height: number;
  width: number;
  fill: Color;
  outlineFill: Color | null;
  textFontSize: number;
  value?: string;
  fontFamily?: string;
  alignX?: "left" | "center" | "right";
  alignY?: "top" | "center" | "bottom";
  connectedArrows?: string[];
  addedBy?: string;
};

export type RectangleLayer = BaseShapeLayer & {
  type: LayerType.Rectangle;
};

export type EllipseLayer = BaseShapeLayer & {
  type: LayerType.Ellipse;
};

export type RhombusLayer = BaseShapeLayer & {
  type: LayerType.Rhombus;
};

export type TriangleLayer = BaseShapeLayer & {
  type: LayerType.Triangle;
};

export type StarLayer = BaseShapeLayer & {
  type: LayerType.Star;
};

export type HexagonLayer = BaseShapeLayer & {
  type: LayerType.Hexagon;
};

export type BigArrowLeftLayer = BaseShapeLayer & {
  type: LayerType.BigArrowLeft;
};

export type BigArrowRightLayer = BaseShapeLayer & {
  type: LayerType.BigArrowRight;
};

export type BigArrowDownLayer = BaseShapeLayer & {
  type: LayerType.BigArrowDown;
};

export type BigArrowUpLayer = BaseShapeLayer & {
  type: LayerType.BigArrowUp;
};

export type CommentBubbleLayer = BaseShapeLayer & {
  type: LayerType.CommentBubble;
};

export type TextLayer = BaseShapeLayer & {
  type: LayerType.Text;
};

export type NoteLayer = BaseShapeLayer & {
  type: LayerType.Note;
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
  centerEdited?: boolean;
  arrowType?: ArrowType;
  orientation?: ArrowOrientation;
  addedBy?: string;
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
  centerEdited?: boolean;
  arrowType?: ArrowType;
  orientation?: ArrowOrientation;
  addedBy?: string;
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
  connectedArrows?: string[];
  addedBy?: string;
};

export type ImageLayer = {
  type: LayerType.Image;
  x: number;
  y: number;
  width: number;
  height: number;
  src: string;
  connectedArrows?: string[];
  addedBy?: string;
};

export type SvgLayer = {
  type: LayerType.Svg;
  x: number;
  y: number;
  width: number;
  height: number;
  src: string;
  fill: Color;
  connectedArrows?: string[];
  addedBy?: string;
};

export type VideoLayer = {
  type: LayerType.Video;
  x: number;
  y: number;
  width: number;
  height: number;
  src: string;
  connectedArrows?: string[];
  addedBy?: string;
};

export type LinkLayer = {
  type: LayerType.Link;
  x: number;
  y: number;
  width: number;
  height: number;
  src: string;
  connectedArrows?: string[];
  addedBy?: string;
};

export type FrameLayer = {
  type: LayerType.Frame
  x: number;
  y: number;
  width: number;
  height: number;
  connectedArrows?: string[];
  value?: string;
  addedBy?: string;
};

export type Comment = {
  type: LayerType.Comment
  x: number;
  y: number;
  width: number;
  height: number;
  author: Author;
  content: string;
  createdAt: Date;
  replies?: Reply[];
}

export type TableLayer = {
  type: LayerType.Table;
  x: number;
  y: number;
  width: number;
  height: number;
  data: TableRow[];
  columns: TableColumn[];
  connectedArrows?: string[];
  availableStatuses?: { label: string; color: string; }[];
};

export type Reply = {
  id: string;
  author: Author;
  content: string;
  createdAt: Date;
}

export type Author = {
  userId: string;
  information: {
      name?: string;
      picture?: string;
    };
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
    | LayerType.CommentBubble | LayerType.Path | LayerType.Arrow | LayerType.Frame | LayerType.Comment | LayerType.Table;
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
| HexagonLayer | BigArrowDownLayer | BigArrowLeftLayer | BigArrowRightLayer | BigArrowUpLayer 
| PathLayer | CommentBubbleLayer |TextLayer | NoteLayer | ImageLayer | ArrowLayer | LineLayer 
| VideoLayer | LinkLayer | FrameLayer | SvgLayer | Comment | TableLayer;

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
      role: string;
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

export enum ArrowType {
  Straight,
  Curved,
  Diagram,
}

export enum ArrowOrientation {
  Horizontal,
  Vertical,
}

export type PreviewLayer = RectangleLayer | EllipseLayer | RhombusLayer | 
TriangleLayer | StarLayer | HexagonLayer | BigArrowDownLayer | BigArrowLeftLayer | LineLayer
| BigArrowRightLayer | BigArrowUpLayer | CommentBubbleLayer | TextLayer | NoteLayer | ArrowLayer | FrameLayer | Comment;

export enum SelectorType {
  Color,
  OutlineColor,
  ArrowHead,
  TextJustify,
  ArrowType,
  TextColor,
  TextHighlightColor,
  FontFamily,
};

export enum ToolbarMenu {
  None,
  Shapes,
  Arrows,
  PenEraserLaser,
  Frames,
  Media,
}

export type Language = 'en' | 'pt' | 'es';
