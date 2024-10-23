import { getSvgPathFromPoints } from "@/lib/utils";
import { memo } from "react";

interface LaserProps {
    x: number;
    y: number;
    points: number[][];
    fill: string;
    strokeSize: number;
}

export const Laser = memo(({
    x,
    y,
    points,
    fill,
    strokeSize,
}: LaserProps) => {
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
                strokeWidth={strokeSize * 3}
                fill="none"
            />
            {/* Main laser path */}
            <path
                d={getSvgPathFromPoints(points)}
                style={{
                    transform: `translate(${x}px, ${y}px)`,
                    pointerEvents: "all"
                }}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                stroke={fill}
                strokeWidth={strokeSize}
                pointerEvents="auto"
            />
        </>
    );
});

Laser.displayName = 'Laser';