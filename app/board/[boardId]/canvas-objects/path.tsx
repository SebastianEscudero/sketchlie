import getStroke from "perfect-freehand";

import { getSvgPathFromStroke } from "@/lib/utils";

interface PathProps {
    x: number;
    y: number;
    points: number[][];
    fill: string;
    onPointerDown?: (e: React.PointerEvent) => void;
    onPathErase?: (e: React.PointerEvent) => void;
    stroke?: string;
    strokeSize?: number | undefined;
    zoomRef?: React.RefObject<any>;
};

export const Path = ({
    x,
    y,
    points,
    fill,
    onPointerDown,
    onPathErase,
    stroke,
    strokeSize,
    zoomRef,
}: PathProps) => {

    const isTransparent = fill === 'rgba(0,0,0,0)';
    const isHalfTransparent = /rgba\(\d+,\s*\d+,\s*\d+,\s*0.5\)/.test(fill);

    console.log(isHalfTransparent)
    console.log(stroke)

    return (
        <path
            onPointerEnter={onPathErase}
            onPointerDown={onPointerDown}
            d={getSvgPathFromStroke(
                getStroke(points, {
                    size: strokeSize || 4,
                    smoothing: 0.4,
                    streamline: 0.4,
                })
            )}
            style={{
                transform: `translate(${x}px, ${y}px)`,
                pointerEvents: "all"
            }}
            x={0}
            y={0}
            fill={stroke ? `${stroke}80` : (isTransparent ? '#000' : fill)}
            strokeWidth={strokeSize ?? 1 / (zoomRef?.current ?? 1)**(2)}
            />
    );
};