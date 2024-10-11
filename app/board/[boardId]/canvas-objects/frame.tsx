import { FrameLayer } from "@/types/canvas";
import React, { memo, useState, useEffect } from "react";
import { useUpdateValue } from "./canvas-objects-utils";

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
}: FrameProps) => {
    const { x, y, width, height, value: initialValue } = layer;
    const fontSize = Math.min(width, height) * 0.05;
    const padding = fontSize * 0.5;
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(initialValue || `Frame ${frameNumber || ""}`);
    const [strokeColor, setStrokeColor] = useState(selectionColor || document.documentElement.classList.contains("dark") ? "#FFFFFF" : "#000000");

    useEffect(() => {
        setValue(initialValue || `Frame ${frameNumber || ""}`);
    }, [frameNumber, initialValue]);

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
            transform={`translate(${x}, ${y})`}
            onPointerDown={(e) => onPointerDown?.(e, id)}
            onDoubleClick={handleDoubleClick}
            pointerEvents="auto"
            data-id={`frame-${frameNumber}`}
            onPointerEnter={(e) => { if (e.buttons === 0 && document.body.style.cursor === 'default') { setStrokeColor("#3390FF") } }}
            onPointerLeave={() => setStrokeColor(selectionColor || document.documentElement.classList.contains("dark") ? "#FFFFFF" : "#000000")}
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
                <text
                    x={padding}
                    y={-(padding)}
                    fontSize={fontSize}
                    fill={strokeColor}
                    className="font-bold"
                >
                    {value}
                </text>
            )}
            <rect
                width={width}
                height={height}
                fill={document.documentElement.classList.contains("dark") ? "#2c2c2c" : "#FFFFFF"}
                stroke={strokeColor}
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </g>
    );
});

Frame.displayName = 'Frame';