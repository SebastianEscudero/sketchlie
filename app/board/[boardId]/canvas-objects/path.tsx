import { getSvgPathFromPoints } from "@/lib/utils";
import { useState, useEffect, memo } from "react";

interface PathProps {
    x: number;
    y: number;
    points: number[][];
    fill: string;
    onPointerDown?: (e: React.PointerEvent) => void;
    selectionColor?: string;
    strokeSize?: number | undefined;
    showOutlineOnHover?: boolean;
    addedBy?: string;
    setAddedByLabel?: (label: string) => void;
};

export const Path = memo(({
    x,
    y,
    points,
    fill,
    onPointerDown,
    selectionColor,
    strokeSize,
    showOutlineOnHover,
    addedBy,
    setAddedByLabel
}: PathProps) => {
    const [strokeColor, setStrokeColor] = useState(selectionColor || fill);
    const isTransparent = fill === 'rgba(0,0,0,0)';
    const isHalfTransparent = /rgba\(\d+,\s*\d+,\s*\d+,\s*0.5\)/.test(fill);
    const isLaser = fill === "#FF0000";

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

    if (isLaser) {
        const glowColor = "#FF6666"; // Lighter red for the glow effect

        return (
            <>
                {/* Glow effect */}
                <path
                    d={getSvgPathFromPoints(points)}
                    style={{
                        transform: `translate(${x}px, ${y}px)`,
                        filter: "blur(3px)",
                        opacity: 0.7,
                    }}
                    stroke={glowColor}
                    strokeWidth={(strokeSize || 1) * 3}
                    fill="none"
                />
                {/* Main laser path */}
                <path
                    onPointerDown={handlePointerDown}
                    d={getSvgPathFromPoints(points)}
                    style={{
                        transform: `translate(${x}px, ${y}px)`,
                        pointerEvents: "all"
                    }}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    stroke={strokeColor}
                    strokeWidth={strokeSize}
                    pointerEvents="auto"
                />
            </>
        );
    }

    // Original path rendering for non-laser paths
    return (
        <path
            onPointerEnter={() => { if (showOutlineOnHover) { setStrokeColor("#3390FF"); setAddedByLabel?.(addedBy || '') } }}
            onPointerLeave={() => { setStrokeColor(selectionColor || fill); setAddedByLabel?.('') }}
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
});

Path.displayName = 'Path';
