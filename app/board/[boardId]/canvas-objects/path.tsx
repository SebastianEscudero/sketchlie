import { getSvgPathFromPoints } from "@/lib/utils";
import { memo } from "react";
import { Laser } from "./laser";
import { cn } from "@/lib/utils";

interface PathProps {
    x: number;
    y: number;
    points: number[][];
    fill: string;
    onPointerDown?: (e: React.PointerEvent) => void;
    selectionColor?: string;
    strokeSize?: number;
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
    addedBy,
    setAddedByLabel 
}: Omit<PathProps, 'isLaser' | 'isHighlighter' | 'zoom'>) => {
    const isTransparent = fill === 'rgba(0,0,0,0)';
    const baseStroke = selectionColor || (isTransparent ? '#000' : fill);

    return (
        <g className="group">
            <path
                onPointerEnter={() => setAddedByLabel?.(addedBy || '')}
                onPointerLeave={() => setAddedByLabel?.('')}
                onPointerDown={onPointerDown}
                d={getSvgPathFromPoints(points)}
                style={{ 
                    transform: `translate(${x}px, ${y}px)`,
                    '--base-stroke': baseStroke
                } as React.CSSProperties}
                className={cn(
                    "transition-[stroke]",
                    "stroke-[var(--base-stroke)]",
                    "[#canvas.shapes-hoverable_.group:hover_&]:stroke-[#3390FF]"
                )}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                strokeWidth={strokeSize}
                pointerEvents="auto"
            />
        </g>
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
            addedBy={addedBy}
            setAddedByLabel={setAddedByLabel}
        />
    );
});

Path.displayName = 'Path';
HighlighterPath.displayName = 'HighlighterPath';
StandardPath.displayName = 'StandardPath';