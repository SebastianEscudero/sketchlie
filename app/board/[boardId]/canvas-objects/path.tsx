import { getSvgPathFromPoints } from "@/lib/utils";
import { useState, useEffect } from "react";

interface PathProps {
    x: number;
    y: number;
    points: number[][];
    fill: string;
    onPointerDown?: (e: React.PointerEvent) => void;
    selectionColor?: string;
    strokeSize?: number | undefined;
    showOutlineOnHover?: boolean;
};

export const Path = ({
    x,
    y,
    points,
    fill,
    onPointerDown,
    selectionColor,
    strokeSize,
    showOutlineOnHover
}: PathProps) => {
    const [strokeColor, setStrokeColor] = useState(selectionColor || fill);
    const isTransparent = fill === 'rgba(0,0,0,0)';
    const isHalfTransparent = /rgba\(\d+,\s*\d+,\s*\d+,\s*0.5\)/.test(fill);

    useEffect(() => {
        setStrokeColor(selectionColor || fill);
    }, [selectionColor, fill]);

    if (!points || points.length === 0) {
        return null;
    }

    const handlePointerDown = (e: React.PointerEvent) => {
        setStrokeColor(selectionColor || fill);
        if (onPointerDown) {
          onPointerDown(e);
        }
      }

    return (
        <path
            onPointerEnter={() => { if (showOutlineOnHover) { setStrokeColor("#3390FF") } }}
            onPointerLeave={() => { setStrokeColor(selectionColor || fill) }}
            onPointerDown={handlePointerDown}
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
            stroke={strokeColor ? (isHalfTransparent ? `${strokeColor}80` : strokeColor) : (isTransparent ? '#000' : fill)}
            strokeWidth={strokeSize}
            pointerEvents="auto"
        />
    );
};