import { LayerType, PreviewLayer } from "@/types/canvas";
import { memo } from "react";
import { Rectangle } from "../canvas-objects/rectangle";
import { Ellipse } from "../canvas-objects/ellipse";
import { Note } from "../canvas-objects/note";
import { Text } from "../canvas-objects/text";
import { Arrow } from "../canvas-objects/arrow";

interface PreviewLayerProps {
    layer: PreviewLayer;
};


export const CurrentPreviewLayer = memo(({
    layer,
}: PreviewLayerProps) => {

    switch (layer.type) {
        case LayerType.Rectangle:
            return (
                <Rectangle
                    id="PreviewRectangle"
                    layer={layer}
                />
            );
        case LayerType.Ellipse:
            return (
                <Ellipse
                    id="EllipsePreview"
                    layer={layer}
                />
            );
        case LayerType.Text:
            return (
                <Text
                    id="TextPreview"
                    layer={layer}
                />
            );
        case LayerType.Note:
            return (
                <Note
                    id="NotePreview"
                    layer={layer}
                />
            );
        case LayerType.Arrow:
            return (
                <Arrow
                    id="ArrowPreview"
                    layer={layer}
                />
            )
    }
});

CurrentPreviewLayer.displayName = "currentLayerPreview";