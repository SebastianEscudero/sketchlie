import { FrameLayer } from "@/types/canvas";
import React, { memo, useState, useEffect } from "react";
import { useUpdateValue } from "./utils/canvas-objects-utils";
import { cn } from "@/lib/utils";

interface FrameProps {
    id: string;
    layer: FrameLayer;
    expired?: boolean;
    socket?: any;
    boardId?: string;
    onPointerDown?: (e: any, id: string) => void;
    frameNumber?: number;
    forcedRender?: boolean;
    selectionColor?: string;
    setAddedByLabel?: (addedBy: string) => void;
    focused?: boolean; // Added focused prop
};

export const Frame = memo(({
    layer,
    expired,
    socket,
    boardId,
    onPointerDown,
    id,
    frameNumber,
    selectionColor,
    forcedRender,
    setAddedByLabel,
    focused
}: FrameProps) => {
    const { x, y, width, height, value: initialValue, addedBy } = layer;
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(initialValue || `Frame ${frameNumber || ""}`);
    const updateValue = useUpdateValue();

    useEffect(() => {
        setValue(initialValue || `Frame ${frameNumber || ""}`);
    }, [frameNumber, initialValue]);

    const handleDoubleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsEditing(true);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
        updateValue(boardId!, id, layer, e.target.value, expired!, socket, setValue);
    };

    const handleInputBlur = () => {
        setIsEditing(false);
    };

    const fontSize = Math.min(width, height) * 0.05;
    const padding = fontSize * 0.5;
    const borderWidth = Math.min(width, height) * 0.04;
    const baseStroke = selectionColor ? selectionColor : document.documentElement.classList.contains("dark") ? "#a4a2a1" : "black";

    const borders = [
        // Top border
        { x: 0, y: 0, width, height: borderWidth },
        // Bottom border
        { x: 0, y: height - borderWidth, width, height: borderWidth },
        // Left border
        { x: 0, y: borderWidth, width: borderWidth, height: height - 2 * borderWidth },
        // Right border
        { x: width - borderWidth, y: borderWidth, width: borderWidth, height: height - 2 * borderWidth }
    ];

    return (
        <g
            transform={`translate(${x}, ${y})`}
            data-id={`frame-${frameNumber}`}
            className="group"
        >
            {isEditing ? (
                <foreignObject x={padding} y={-(padding + fontSize)} width={width - 2 * padding} height={fontSize + 10}>
                    <input
                        value={value}
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                        style={{
                            width: '100%',
                            height: '100%',
                            fontSize: `${fontSize}px`,
                            background: 'transparent',
                            border: 'none',
                            outline: 'none',
                            color: baseStroke,
                        }}
                        autoFocus
                    />
                </foreignObject>
            ) : (
                focused && (
                    <text
                        x={padding}
                        y={-(padding)}
                        fontSize={fontSize}
                        fill={baseStroke}
                        className="font-semibold cursor-text pointer-events-auto"
                        onPointerDown={(e) => {
                            console.log("pointer down");
                            e.stopPropagation();
                            setIsEditing(true);
                        }}
                    >
                        {value}
                    </text>
                )
            )}

            <g
                style={{
                    '--base-stroke': baseStroke
                } as React.CSSProperties}
                className={cn(
                    "stroke-[var(--base-stroke)]",
                    "[#canvas.shapes-hoverable_.group:hover_&]:stroke-[#3390FF]",
                )}
            >
                {/* Interactive border areas */}
                <g className="group/borders">
                    {borders.map((border, index) => (
                        <rect
                            key={index}
                            {...border}
                            className="transition-colors duration-200 group-hover/borders:fill-blue-500/10"
                            fill="transparent"
                            onPointerDown={(e) => onPointerDown?.(e, id)}
                            onDoubleClick={handleDoubleClick}
                            onPointerEnter={() => setAddedByLabel?.(addedBy || '')}
                            onPointerLeave={() => setAddedByLabel?.('')}
                            pointerEvents="auto"
                            stroke="none"
                        />
                    ))}
                </g>

                {/* Visual border */}
                <rect
                    width={width}
                    height={height}
                    fill="transparent"
                    strokeWidth={Math.min(Math.max(1, borderWidth / 10), 5)}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray={Math.min(Math.max(2, borderWidth / 10 * 2), 10)}
                    pointerEvents="none"
                />
            </g>
        </g>
    );
});

Frame.displayName = 'Frame';
