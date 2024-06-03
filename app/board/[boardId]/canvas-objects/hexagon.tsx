import { Kalam } from "next/font/google";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";

import { HexagonLayer, LayerType, UpdateLayerMutation } from "@/types/canvas";
import { cn, colorToCss, getContrastingTextColor } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";
import { useRoom } from "@/components/room";
import { throttle } from "lodash";

const font = Kalam({
    subsets: ["latin"],
    weight: ["400"],
});

interface HexagonProps {
    id: string;
    layer: HexagonLayer;
    onPointerDown?: (e: any, id: string) => void;
    selectionColor?: string;
    updateLayer?: UpdateLayerMutation;
    expired?: boolean;
    onRefChange?: (ref: React.RefObject<any>) => void;
};

const throttledUpdateLayer = throttle((updateLayer, socket, board, layerId, layerUpdates) => {
    if (updateLayer) {
        updateLayer({
            board,
            layerId,
            layerUpdates
        });
    }

    if (socket) {
        socket.emit('layer-update', layerId, layerUpdates);
    }
}, 1000);

export const Hexagon = ({
    layer,
    onPointerDown,
    id,
    selectionColor,
    updateLayer,
    onRefChange
}: HexagonProps) => {
    const hexagonRef = useRef<any>(null);
    const { x, y, width, height, fill, outlineFill, value: initialValue, textFontSize } = layer;
    const [value, setValue] = useState(initialValue);
    const { liveLayers, socket, board, expired } = useRoom();
    const fillColor = colorToCss(fill);

    useEffect(() => {
        if (liveLayers[id] && liveLayers[id].type === LayerType.Hexagon) {
            const hexagonLayer = liveLayers[id] as HexagonLayer;
            setValue(hexagonLayer.value);
        }
    }, [id, liveLayers]);

    const updateValue = (newValue: string) => {
        if (liveLayers[id] && liveLayers[id].type === LayerType.Hexagon) {
            const hexagonLayer = liveLayers[id] as HexagonLayer;
            hexagonLayer.value = newValue;
            setValue(newValue);
            if (expired !== true) {
                throttledUpdateLayer(updateLayer, socket, board, id, liveLayers[id]);
            }
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const selection = window.getSelection();
            if (selection && selection.rangeCount > 0) {
                const range = selection.getRangeAt(0);
                range.deleteContents();
                const br = document.createElement('br');
                range.insertNode(br);
                // Create another <br> element
                const extraBr = document.createElement('br');
                range.insertNode(extraBr);
                // Move the cursor to the new line
                range.setStartAfter(extraBr);
                range.collapse(true);
                const newEvent = new Event('input', { bubbles: true });
                e.currentTarget.dispatchEvent(newEvent);
            }
        }
    };

    const handlePointerDown = (e: React.PointerEvent) => {
        e.preventDefault();
        if (onPointerDown) onPointerDown(e, id);
        if (onRefChange) {
            onRefChange(hexagonRef);
        }
    };

    const handleOnTouchDown = (e: React.TouchEvent) => {
        e.preventDefault();
        if (e.touches.length > 1) {
            return;
        }
        if (onPointerDown) {
            onPointerDown(e, id);
        }
        if (onRefChange) {
            onRefChange(hexagonRef);
        }
    }

    const handleContentChange = (e: ContentEditableEvent) => {
        updateValue(e.target.value);
    };

    const handlePaste = async (e: React.ClipboardEvent) => {
        e.preventDefault();
        const text = await navigator.clipboard.readText();
        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            range.deleteContents();
            range.insertNode(document.createTextNode(text));
        }
    };

    useEffect(() => {
        if (onRefChange) {
            onRefChange(hexagonRef);
        }
    }, [layer]);

    if (!fill) {
        return null;
    }

    return (
        <g
            transform={`translate(${x}, ${y})`}
            onPointerMove={(e) => {
                if (e.buttons === 1) {
                    handlePointerDown(e);
                }
            }}
            onPointerDown={(e) => handlePointerDown(e)}
            onTouchStart={(e) => handleOnTouchDown(e)}
        >
            <path
                d={`M ${width * 0.5},0 L ${width}, ${height * 0.25} L ${width}, ${height * 0.75} L ${width * 0.5}, ${height} L 0, ${height * 0.75} L 0, ${height * 0.25} Z`}
                fill={fillColor}
                stroke={selectionColor || colorToCss(outlineFill || fill)}
                strokeWidth="2"
            />
            <foreignObject
                x="0"
                y="0"
                width={width}
                height={height}
                className="flex items-center justify-center"
            >
                <ContentEditable
                    innerRef={hexagonRef}
                    onKeyDown={handleKeyDown}
                    html={value || ""}
                    onChange={handleContentChange}
                    onPaste={handlePaste}
                    className={cn(
                        "h-full w-full flex items-center justify-center text-center outline-none",
                        font.className
                    )}
                    style={{
                        fontSize: textFontSize,
                        color: fill ? getContrastingTextColor(fill) : "#000",
                        textWrap: "wrap",
                        lineHeight: value ? 'normal' : `${height}px`,
                        WebkitUserSelect: 'auto'
                    }}
                    spellCheck={false}
                    disabled={expired}
                />
            </foreignObject>
        </g>
    );
};