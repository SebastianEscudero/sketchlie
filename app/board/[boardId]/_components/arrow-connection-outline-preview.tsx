"use client";

import { useSelectionBounds } from "@/hooks/use-selection-bounds";
import { ArrowHandle, ArrowType } from "@/types/canvas";
import { memo } from "react";

interface ArrowConnectionOutlinePreviewProps {
    zoom: number;
    selectedArrow: any
    liveLayers: any;
    mousePosition: { x: number, y: number };
    handle: ArrowHandle;
};

const STROKE_WIDTH = 1.5;

export const ArrowConnectionOutlinePreview = memo(({
    zoom,
    selectedArrow,
    liveLayers,
    mousePosition,
    handle
}: ArrowConnectionOutlinePreviewProps) => {

    const bounds = useSelectionBounds(
        handle === ArrowHandle.start ? [selectedArrow.startConnectedLayerId] : handle === ArrowHandle.end ? [selectedArrow.endConnectedLayerId] : [],
        liveLayers
    );

    const strokeWidth = STROKE_WIDTH / zoom;

    if (!bounds) {
        return;
    }

    const centerX = bounds.x + bounds.width / 2;
    const centerY = bounds.y + bounds.height / 2;

    let HOT_ZONE_BASE_SIZE = 0.4;

    if (selectedArrow.arrowType === ArrowType.Diagram) {
        HOT_ZONE_BASE_SIZE = 1;
    }

    const X_BASE_SIZE = 6; // Base size for X drawing
    const MAX_X_SIZE = Math.min(bounds.width, bounds.height) * 0.4;

    const baseHotZoneWidth = bounds.width * HOT_ZONE_BASE_SIZE;
    const baseHotZoneHeight = bounds.height * HOT_ZONE_BASE_SIZE;
    
    // Adjust hot zone size based on zoom, ensuring it's not smaller than 60% of layer's dimensions
    const adjustedHotZoneWidth = Math.max(baseHotZoneWidth, bounds.width * HOT_ZONE_BASE_SIZE / zoom);
    const adjustedHotZoneHeight = Math.max(baseHotZoneHeight, bounds.height * HOT_ZONE_BASE_SIZE / zoom);
    
    // Ensure hot zone does not exceed the actual bounds of the layer
    const finalHotZoneWidth = Math.min(bounds.width, adjustedHotZoneWidth);
    const finalHotZoneHeight = Math.min(bounds.height, adjustedHotZoneHeight);
    
    // Calculate hot zone boundaries
    const hotZoneXStart = centerX - finalHotZoneWidth / 2;
    const hotZoneYStart = centerY - finalHotZoneHeight / 2;
    const hotZoneXEnd = centerX + finalHotZoneWidth / 2;
    const hotZoneYEnd = centerY + finalHotZoneHeight / 2;

    // Check if mouse is inside the adjusted hot zone
    const isMouseInsideHotZone = mousePosition.x >= hotZoneXStart && mousePosition.x <= hotZoneXEnd && mousePosition.y >= hotZoneYStart && mousePosition.y <= hotZoneYEnd;

    // Adjust the size of the X based on zoom, ensuring it does not exceed the maximum size
    const minDimension = Math.min(bounds.width, bounds.height);
    const minSize = minDimension * 0.2;
    
    // Adjust the size of the X based on zoom, ensuring it does not exceed the maximum size and is not smaller than 20% of the minimum dimension of bounds
    const xSize = Math.max(minSize, Math.min(MAX_X_SIZE, X_BASE_SIZE / zoom));
    const adjustedStrokeWidth = Math.max(1, Math.min(2, 1 / zoom));

    return (
        <>
            <rect
                className="stroke-blue-500 fill-transparent pointer-events-none"
                style={{
                    strokeWidth: strokeWidth,
                    transform: `translate(${bounds.x}px, ${bounds.y}px)`,
                }}
                x={0}
                y={0}
                width={bounds.width}
                height={bounds.height}
            />
            {isMouseInsideHotZone && (
                <>
                    <line
                        x1={centerX - xSize / 2}
                        y1={centerY - xSize / 2}
                        x2={centerX + xSize / 2}
                        y2={centerY + xSize / 2}
                        stroke="#CCCCCC"
                        strokeWidth={adjustedStrokeWidth}
                        />
                    <line
                        x1={centerX + xSize / 2}
                        y1={centerY - xSize / 2}
                        x2={centerX - xSize / 2}
                        y2={centerY + xSize / 2}
                        stroke="#CCCCCC"
                        strokeWidth={adjustedStrokeWidth}
                    />
                </>
            )}
        </>
    );
});

ArrowConnectionOutlinePreview.displayName = "ArrowConnectionOutlinePreview";