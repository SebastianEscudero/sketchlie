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
};

export type RectangleLayer = {
  type: LayerType.Rectangle;
  x: number;
  y: number;
  height: number;
  width: number;
  fill: Color;
  outlineFill: Color | null;
};

export type EllipseLayer = {
  type: LayerType.Ellipse;
  x: number;
  y: number;
  height: number;
  width: number;
  fill: Color;
  outlineFill: Color | null;
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
  textFontSize: number
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
    layerType: LayerType.Ellipse | LayerType.Rectangle | LayerType.Text | LayerType.Note | LayerType.Image | LayerType.Path | LayerType.Arrow;
  }
  | {
    mode: CanvasMode.Pencil,
  }
  | {
    mode: CanvasMode.Laser,
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
  Eraser,
  Moving
};

export type Layer = RectangleLayer | EllipseLayer | PathLayer | TextLayer | NoteLayer | ImageLayer | ArrowLayer;

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
  presence: Presence | null;
  information: {
      name?: string;
      picture?: string;
    };
};

export type UpdateLayerMutation = (args: {
  boardId: string;
  layerId: string;
  layerUpdates: Record<string, unknown>;
}) => Promise<any>;

export enum ArrowHead {
  None = "None",
  Triangle = "Triangle",
}

export type PreviewLayer = RectangleLayer | EllipseLayer | TextLayer | NoteLayer | ArrowLayer;
