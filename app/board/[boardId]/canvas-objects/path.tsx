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

const HighlighterPath = memo(({ points, fill, x, y, strokeSize }: Omit<PathProps, 'isLaser' | 'isHighlighter'>) => {
    const [r, g, b] = fill.match(/\d+/g)!.map(Number);
    
    return (
        <path
            d={getSvgPathFromPoints(points)}
            style={{ transform: `translate(${x}px, ${y}px)` }}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            stroke={`rgba(${r}, ${g}, ${b}, 0.3)`}
            strokeWidth={strokeSize}
            pointerEvents="none"
        />
    );
});

const StandardPath = memo(({ 
    points, 
    fill, 
    x, 
    y, 
    strokeSize, 
    onPointerDown,
    selectionColor,
    showOutlineOnHover,
    addedBy,
    setAddedByLabel 
}: Omit<PathProps, 'isLaser' | 'isHighlighter' | 'zoom'>) => {
    const [strokeColor, setStrokeColor] = useState(selectionColor || "none");
    const isTransparent = fill === 'rgba(0,0,0,0)';

    useEffect(() => {
        setStrokeColor(selectionColor || fill);
    }, [selectionColor, fill]);

    const handlePointerDown = (e: React.PointerEvent) => {
        if (onPointerDown) onPointerDown(e);
        setStrokeColor(selectionColor || "none");
    }

    return (
        <path
            onPointerEnter={() => { 
                if (showOutlineOnHover) { 
                    setStrokeColor("#3390FF"); 
                    setAddedByLabel?.(addedBy || '') 
                } 
            }}
            onPointerLeave={() => { 
                setStrokeColor(selectionColor || "none"); 
                setAddedByLabel?.('') 
            }}
            onPointerDown={handlePointerDown}
            d={getSvgPathFromPoints(points)}
            style={{ transform: `translate(${x}px, ${y}px)` }}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            stroke={strokeColor !== "none" ? (isTransparent ? '#000' : strokeColor) : (isTransparent ? '#000' : fill)}
            strokeWidth={strokeSize}
            pointerEvents="auto"
        />
    );
});

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
    if (!points || points.length === 0) return null;

    const getAdjustedStrokeSize = () => {
        if (isLaser) return 5 / Math.sqrt(zoom);
        return strokeSize;
    };

    if (isLaser) {
        return (
            <Laser
                x={x}
                y={y}
                points={points}
                fill="#FF0000"
                strokeSize={getAdjustedStrokeSize()}
            />
        );
    }

    if (isHighlighter) {
        return (
            <HighlighterPath
                x={x}
                y={y}
                points={points}
                fill={fill}
                strokeSize={getAdjustedStrokeSize()}
            />
        );
    }

    return (
        <StandardPath
            x={x}
            y={y}
            points={points}
            fill={fill}
            strokeSize={getAdjustedStrokeSize()}
            onPointerDown={onPointerDown}
            selectionColor={selectionColor}
            showOutlineOnHover={showOutlineOnHover}
            addedBy={addedBy}
            setAddedByLabel={setAddedByLabel}
        />
    );
});

Path.displayName = 'Path';
HighlighterPath.displayName = 'HighlighterPath';
StandardPath.displayName = 'StandardPath';