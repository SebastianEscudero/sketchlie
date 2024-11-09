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
    const fontSize = Math.min(width, height) * 0.05;
    const padding = fontSize * 0.5;
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

    return (
        <g
            transform={`translate(${x}, ${y})`}
            onPointerDown={(e) => onPointerDown?.(e, id)}
            onDoubleClick={handleDoubleClick}
            pointerEvents="auto"
            data-id={`frame-${frameNumber}`}
            onPointerEnter={() => setAddedByLabel?.(addedBy || '')}
            onPointerLeave={() => setAddedByLabel?.('')}
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
                            color: document.documentElement.classList.contains("dark") ? "#FFFFFF" : "#000000",
                        }}
                        autoFocus
                    />
                </foreignObject>
            ) : (
                focused && ( // Conditionally render text based on focused
                    <text
                        x={padding}
                        y={-(padding)}
                        fontSize={fontSize}
                        fill={document.documentElement.classList.contains("dark") ? "#FFFFFF" : "#000000"}
                        className="font-semibold"
                    >
                        {value}
                    </text>
                )
            )}
            <rect
                width={width}
                height={height}
                fill={document.documentElement.classList.contains("dark") ? "#2c2c2c" : "#FFFFFF"}
                style={{
                    '--base-stroke': document.documentElement.classList.contains("dark") ? "white" : "black"
                } as React.CSSProperties}
                className={cn(
                    "stroke-[var(--base-stroke)]",
                    "[#canvas.shapes-hoverable_.group:hover_&]:stroke-[#3390FF]",
                    "drop-shadow-md"
                )}
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </g>
    );
});

Frame.displayName = 'Frame';
