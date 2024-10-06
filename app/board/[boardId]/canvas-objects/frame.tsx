import { FrameLayer } from "@/types/canvas";
import React, { memo, useRef, useEffect } from "react";

interface FrameProps {
    id: string;
    layer: FrameLayer;
    onPointerDown?: (e: any, id: string) => void;
    frameNumber?: number;
    forcedRender?: boolean;
};

export const Frame = memo(({
    layer,
    onPointerDown,
    id,
    frameNumber,
}: FrameProps) => {
    const { x, y, width, height } = layer;
    const fontSize = Math.min(width, height) * 0.05;
    const padding = fontSize * 0.5;
    const contentRef = useRef<SVGGElement>(null);

    useEffect(() => {
        if (contentRef.current) {
            contentRef.current.setAttribute('data-frame-content', `frame-${frameNumber}-content`);
        }
    }, [frameNumber]);

    return (
        <g
            transform={`translate(${x}, ${y})`}
            onPointerDown={(e) => onPointerDown?.(e, id)}
            pointerEvents="auto"
            data-id={`frame-${frameNumber}`}
        >
            <text
                x={padding}
                y={- (padding)}
                fontSize={fontSize}
                fill={document.documentElement.classList.contains("dark") ? "#FFFFFF" : "#000000"}
                className="font-bold"
            >
                Frame {frameNumber}
            </text>
            <rect
                width={width}
                height={height}
                fill="transparent"
                stroke={document.documentElement.classList.contains("dark") ? "#FFFFFF" : "#000000"}
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <g ref={contentRef}>
                <rect
                    x={1}
                    y={1}
                    width={width - 2}
                    height={height - 2}
                    fill="transparent"
                    pointerEvents="none"
                />
            </g>
        </g>
    );
});

Frame.displayName = 'Frame';