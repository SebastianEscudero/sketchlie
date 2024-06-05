import { getSvgPathFromPoints } from "@/lib/utils";

interface PathProps {
    x: number;
    y: number;
    points: number[][];
    fill: string;
    onPointerDown?: (e: React.PointerEvent) => void;
    stroke?: string;
    strokeSize?: number | undefined;
};

export const Path = ({
    x,
    y,
    points,
    fill,
    onPointerDown,
    stroke,
    strokeSize,
}: PathProps) => {

    const isTransparent = fill === 'rgba(0,0,0,0)';
    const isHalfTransparent = /rgba\(\d+,\s*\d+,\s*\d+,\s*0.5\)/.test(fill);

    if (!points || points.length === 0) {
        return null;
    }

    return (
        <path
            onPointerDown={onPointerDown}
            d={getSvgPathFromPoints(points)}
            style={{
                transform: `translate(${x}px, ${y}px)`,
                pointerEvents: "all"
            }}
            x={0}
            y={0}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            stroke={stroke ? (isHalfTransparent ? `${stroke}80` : stroke) : (isTransparent ? '#000' : fill)}
            strokeWidth={strokeSize}
            />
    );
};