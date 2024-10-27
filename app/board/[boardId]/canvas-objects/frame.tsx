import { FrameLayer } from "@/types/canvas";
import React, { memo, useState, useEffect } from "react";
import { useUpdateValue } from "./utils/canvas-objects-utils";

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
    showOutlineOnHover?: boolean;
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
    showOutlineOnHover,
    setAddedByLabel,
    focused // Destructure focused prop
}: FrameProps) => {
    const { x, y, width, height, value: initialValue, addedBy } = layer;
    const fontSize = Math.min(width, height) * 0.05;
    const padding = fontSize * 0.5;
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(initialValue || `Frame ${frameNumber || ""}`);
    const [strokeColor, setStrokeColor] = useState(
        selectionColor || (document.documentElement.classList.contains("dark") ? "#404040" : "#e5e5e5")
    );

    useEffect(() => {
        setValue(initialValue || `Frame ${frameNumber || ""}`);
    }, [frameNumber, initialValue]);

    useEffect(() => {
        setStrokeColor(
            selectionColor || (document.documentElement.classList.contains("dark") ? "#404040" : "#e5e5e5")
        );
    }, [selectionColor, forcedRender]);

    const updateValue = useUpdateValue();

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
            style={{pointerEvents: showOutlineOnHover ? "auto" : "none"}}
            transform={`translate(${x}, ${y})`}
            onPointerDown={(e) => onPointerDown?.(e, id)}
            onDoubleClick={handleDoubleClick}
            pointerEvents="auto"
            data-id={`frame-${frameNumber}`}
            onPointerEnter={() => { if (showOutlineOnHover) { setAddedByLabel?.(addedBy || '') } }}
            onPointerLeave={() => { setAddedByLabel?.('') }}
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
        <defs>
            <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="rgba(0, 0, 0, 0.25)" />
            </filter>
        </defs>
            <rect
                width={width}
                height={height}
                fill={document.documentElement.classList.contains("dark") ? "#2c2c2c" : "#FFFFFF"}
                stroke={strokeColor}
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#shadow)"
            />
        </g>
    );
});

Frame.displayName = 'Frame';
