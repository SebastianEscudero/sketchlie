import { memo } from "react";
import { InsertVideo } from "../canvas-objects/media/video";
import { InsertLink } from "../canvas-objects/media/link";
import { Layer, LayerType } from "@/types/canvas";

interface MediaPreviewProps {
  id: string;
  layer: Layer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  focused?: boolean;
  showOverlay: boolean;
}

export const MediaPreview = memo(({
    id,
    layer,
    onPointerDown,
    showOverlay,
}: MediaPreviewProps) => {

  switch (layer.type) {
    case LayerType.Video:
      return (
        <InsertVideo
          id={id}
          layer={layer}
          onPointerDown={onPointerDown}
          showOverlay={showOverlay}
        />
      );
    case LayerType.Link:
      return (
        <InsertLink
          id={id}
          layer={layer}
          onPointerDown={onPointerDown}
          showOverlay={showOverlay}
        />
      );
    default:
      return null;
  }
});

MediaPreview.displayName = "MediaPreview";