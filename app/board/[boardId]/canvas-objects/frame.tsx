import { FrameLayer } from "@/types/canvas";
import React, { memo, useRef, useEffect, useState } from "react";
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
};

export const Frame = memo(({
    layer,
    expired,
    socket,
    boardId,
    onPointerDown,
    id,
    frameNumber,
}: FrameProps) => {
    const { x, y, width, height, value: initialValue } = layer;
    const fontSize = Math.min(width, height) * 0.05;
    const padding = fontSize * 0.5;
    const contentRef = useRef<SVGGElement>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(initialValue || `Frame ${frameNumber}`);

    useEffect(() => {
        if (contentRef.current) {
            contentRef.current.setAttribute('data-frame-content', `frame-${frameNumber}-content`);
        }
    }, [frameNumber]);

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
                    fill={document.documentElement.classList.contains("dark") ? "#FFFFFF" : "#000000"}
                    className="font-bold"
                >
                    {value}
                </text>
            )}
            <rect
                width={width}
                height={height}
                fill="transparent"
                stroke={document.documentElement.classList.contains("dark") ? "#FFFFFF" : "#000000"}
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <g ref={contentRef}>
                <rect
                    x={1}
                    y={1}
                    width={width - 2}
                    height={height - 2}
                    fill="transparent"
                    pointerEvents="none"
                />
            </g>
        </g>
    );
});

Frame.displayName = 'Frame';