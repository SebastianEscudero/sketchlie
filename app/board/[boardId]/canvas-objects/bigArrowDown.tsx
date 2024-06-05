import { Kalam } from "next/font/google";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";

import { LayerType, BigArrowDownLayer, UpdateLayerMutation } from "@/types/canvas";
import { cn, colorToCss, getContrastingTextColor } from "@/lib/utils";
import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { throttle } from "lodash";

const font = Kalam({
    subsets: ["latin"],
    weight: ["400"],
});

interface BigArrowDownProps {
    id: string;
    layer: BigArrowDownLayer;
    onPointerDown?: (e: any, id: string) => void;
    selectionColor?: string;
    updateLayer?: UpdateLayerMutation;
    expired?: boolean;
    socket?: any;
    board?: any;
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

export const BigArrowDown = memo(({
    layer,
    onPointerDown,
    id,
    selectionColor,
    updateLayer,
    onRefChange,
    expired,
    socket,
    board,
}: BigArrowDownProps) => {
    const BigArrowDownRef = useRef<any>(null);
    const { x, y, width, height, fill, outlineFill, value: initialValue, textFontSize } = layer;
    const [value, setValue] = useState(initialValue);
    const fillColor = colorToCss(fill);

    useEffect(() => {
        setValue(layer.value);
    }, [id, layer]);

    const updateValue = useCallback((newValue: string) => {
        if (layer && layer.type === LayerType.BigArrowDown) {
            const BigArrowDownLayer = layer as BigArrowDownLayer;
            BigArrowDownLayer.value = newValue;
            setValue(newValue);
            if (expired !== true) {
                throttledUpdateLayer(updateLayer, socket, board, id, layer);
            }
        }
    }, [id, layer, expired, updateLayer, socket, board]);

    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
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
    }, []);

    const handlePointerDown = useCallback((e: React.PointerEvent) => {
        e.preventDefault();
        if (onPointerDown) onPointerDown(e, id);
        if (onRefChange) {
            onRefChange(BigArrowDownRef);
        }
    }, [onPointerDown, id, onRefChange]);

    const handleOnTouchDown = useCallback((e: React.TouchEvent) => {
        e.preventDefault();
        if (e.touches.length > 1) {
            return;
        }
        if (onPointerDown) {
            onPointerDown(e, id);
        }
        if (onRefChange) {
            onRefChange(BigArrowDownRef);
        }
    }, [onPointerDown, id, onRefChange, BigArrowDownRef]);

    const handleContentChange = useCallback((e: ContentEditableEvent) => {
        updateValue(e.target.value);
    }, [updateValue]);

    const handlePaste = useCallback(async (e: React.ClipboardEvent) => {
        e.preventDefault();
        const text = await navigator.clipboard.readText();
        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            range.deleteContents();
            range.insertNode(document.createTextNode(text));
        }
    }, []);

    useEffect(() => {
        if (onRefChange) {
            onRefChange(BigArrowDownRef);
        }
    }, [layer]);

    if (!fill) {
        return null;
    }

    return (
        <g
            transform={`translate(${x}, ${y + height / 2})`}
            onPointerMove={(e) => {
                if (e.buttons === 1) {
                    handlePointerDown(e);
                }
            }}
            onPointerDown={(e) => handlePointerDown(e)}
            onTouchStart={(e) => handleOnTouchDown(e)}
        >
            <path
                d={`M ${width / 2} ${height - height / 2} L 0 ${height / 2 - height / 2} L ${width / 4} ${height / 2 - height / 2} L ${width / 4} ${0 - height / 2} L ${width * 3 / 4} ${0 - height / 2} L ${width * 3 / 4} ${height / 2 - height / 2} L ${width} ${height / 2 - height / 2} Z`} fill={fillColor}
                stroke={selectionColor || colorToCss(outlineFill || fill)}
                strokeWidth="2"
            />
            <foreignObject
                x={0}
                y={-height / 2}
                width={width}
                height={height}
                className="flex items-center justify-center"
            >
                <ContentEditable
                    innerRef={BigArrowDownRef}
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
});

BigArrowDown.displayName = 'BigArrowDown';