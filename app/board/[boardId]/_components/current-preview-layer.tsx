import { LayerType, PreviewLayer } from "@/types/canvas";
import { memo } from "react";
import { Rectangle } from "./rectangle";
import { Ellipse } from "./ellipse";
import { Note } from "./note";
import { Text } from "./text";

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
    }
});

CurrentPreviewLayer.displayName = "currentLayerPreview";