import { getSvgPathFromPoints } from "@/lib/utils";
import { useState, useEffect, memo } from "react";
import { Laser } from "./laser";
import { colorToCss } from "@/lib/utils";

interface PathProps {
    x: number;
    y: number;
    points: number[][];
    fill: string;
    onPointerDown?: (e: React.PointerEvent) => void;
    selectionColor?: string;
    strokeSize?: number;
    showOutlineOnHover?: boolean;
    addedBy?: string;
    setAddedByLabel?: (label: string) => void;
    isLaser?: boolean;
    isHighlighter?: boolean;
    zoom?: number;
};

export const Path = memo(({
    x,
    y,
    points,
    fill,
    onPointerDown,
    selectionColor,
    strokeSize = 1,
    showOutlineOnHover,
    addedBy,
    setAddedByLabel,
    isLaser = false,
    isHighlighter = false,
    zoom = 1
}: PathProps) => {
    const [strokeColor, setStrokeColor] = useState(selectionColor || "none");
    const isTransparent = fill === 'rgba(0,0,0,0)';

    useEffect(() => {
        setStrokeColor(selectionColor || fill);
    }, [selectionColor, fill]);

    if (!points || points.length === 0) {
        return null;
    }

    const getFinalStrokeSize = () => {
        if (isLaser) return 5 / Math.sqrt(zoom);
        if (isHighlighter) return 30 / zoom;
        return strokeSize;
    }

    const getFinalFill = () => {
        if (isLaser) return '#FF0000';
        if (isHighlighter) {
            const [r, g, b] = fill.match(/\d+/g)!.map(Number);
            return `rgba(${r}, ${g}, ${b}, 0.7)`;
        } return fill;
    }

    if (isLaser) {
        return (
            <Laser
                x={x}
                y={y}
                points={points}
                fill={getFinalFill()}
                strokeSize={getFinalStrokeSize()}
            />
        );
    }

    const handlePointerDown = (e: React.PointerEvent) => {
        if (onPointerDown) onPointerDown(e);
        setStrokeColor(selectionColor || "none");
    }

    return (
        <path
            onPointerEnter={() => { if (showOutlineOnHover) { setStrokeColor("#3390FF"); setAddedByLabel?.(addedBy || '') } }}
            onPointerLeave={() => { setStrokeColor(selectionColor || "none"); setAddedByLabel?.('') }}
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
            stroke={strokeColor !== "none" ? (isTransparent ? '#000' : strokeColor) : (isTransparent ? '#000' : getFinalFill())}
            strokeWidth={getFinalStrokeSize()}
            pointerEvents="auto"
        />
    );
});

Path.displayName = 'Path';