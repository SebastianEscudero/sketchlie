import { LayerType, PreviewLayer } from "@/types/canvas";
import { memo } from "react";
import { Rectangle } from "../canvas-objects/rectangle";
import { Ellipse } from "../canvas-objects/ellipse";
import { Note } from "../canvas-objects/note";
import { Text } from "../canvas-objects/text";
import { Arrow } from "../canvas-objects/arrow";
import { Rhombus } from "../canvas-objects/rhombus";
import { Triangle } from "../canvas-objects/triangle";
import { Star } from "../canvas-objects/star";
import { Hexagon } from "../canvas-objects/hexagon";
import { BigArrowLeft } from "../canvas-objects/bigArrowLeft";
import { BigArrowRight } from "../canvas-objects/bigArrowRight";
import { BigArrowUp } from "../canvas-objects/bigArrowUp";
import { BigArrowDown } from "../canvas-objects/bigArrowDown";
import { CommentBubble } from "../canvas-objects/commentBubble";
import { Pentagon } from "../canvas-objects/pentagon";

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
        case LayerType.Rhombus:
            return (
                <Rhombus
                    id="RhombusPreview"
                    layer={layer}
                />
            );
        case LayerType.Triangle:
            return (
                <Triangle
                    id="TrianglePreview"
                    layer={layer}
                />
            );
        case LayerType.Star:
            return (
                <Star   
                    id="StarPreview"
                    layer={layer}
                />
            );
        case LayerType.Hexagon:
            return (
                <Hexagon  
                    id="HexagonPreview"
                    layer={layer}
                />
            );
        case LayerType.BigArrowLeft:
            return (
                <BigArrowLeft  
                    id="BigArrowLeftPreview"
                    layer={layer}
                />
            );
        case LayerType.BigArrowRight:
            return (
                <BigArrowRight 
                    id="BigArrowRightPreview"
                    layer={layer}
                />
            );
        case LayerType.BigArrowUp:
            return (
                <BigArrowUp 
                    id="BigArrowUpPreview"
                    layer={layer}
                />
            );
        case LayerType.BigArrowDown:
            return (
                <BigArrowDown
                    id="BigArrowDownPreview"
                    layer={layer}
                />
        );
        case LayerType.CommentBubble:
            return (
                <CommentBubble
                    id="CommentBubblePreview"
                    layer={layer}
                />
            );
        case LayerType.Pentagon:
            return (
                <Pentagon
                    id="PentagonPreview"
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