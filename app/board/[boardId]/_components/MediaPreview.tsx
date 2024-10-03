import { memo } from "react";
import { InsertVideo } from "../canvas-objects/video";
import { InsertLink } from "../canvas-objects/link";
import { CanvasState, Layer, LayerType } from "@/types/canvas";

interface MediaPreviewProps {
  id: string;
  layer: Layer; // Replace with the appropriate type
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  focused?: boolean;
  zoom: number;
  camera: { x: number; y: number };
  canvasState: CanvasState;
  svgRef: React.RefObject<SVGSVGElement>;
}

export const MediaPreview = memo(({
    id,
    layer,
    onPointerDown,
    focused,
    zoom,
    camera,
    canvasState,
    svgRef,
}: MediaPreviewProps) => {

  switch (layer.type) {
    case LayerType.Video:
      return (
        <InsertVideo
          id={id}
          layer={layer}
          onPointerDown={onPointerDown}
          focused={focused}
          zoom={zoom}
          camera={camera}
          svgRef={svgRef}
          canvasState={canvasState}
        />
      );
    case LayerType.Link:
      return (
        <InsertLink
          id={id}
          layer={layer}
          onPointerDown={onPointerDown}
          focused={focused}
          zoom={zoom}
          camera={camera}
          canvasState={canvasState}
          svgRef={svgRef}
        />
      );
    default:
      return null;
  }
});

MediaPreview.displayName = "MediaPreview";