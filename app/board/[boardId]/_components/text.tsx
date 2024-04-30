import React, { useState, useEffect, useRef } from 'react';
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { LayerType, TextLayer, UpdateLayerMutation } from "@/types/canvas";
import { cn, colorToCss } from "@/lib/utils";
import { Kalam } from "next/font/google";
import { useRoom } from '@/components/room';
import { debounce } from 'lodash';

const font = Kalam({
    subsets: ["latin"],
    weight: ["400"],
});

interface TextProps {
    id: string;
    layer: TextLayer;
    onPointerDown: (e: React.PointerEvent, id: string) => void;
    selectionColor?: string;
    setLiveLayers: (layers: any) => void;
    updateLayer: UpdateLayerMutation;
};

export const Text = ({
    layer,
    onPointerDown,
    id,
    selectionColor,
    setLiveLayers,
    updateLayer
}: TextProps) => {
    const { x, y, width, height, fill, value, textFontSize } = layer;
    const initialFontsize = textFontSize
    const [prevWidth, setPrevWidth] = useState(width);
    const [prevHeight, setPrevHeight] = useState(height);
    const [fontSize, setFontSize] = useState(initialFontsize);
    const textRef = useRef<any>(null);
    const { liveLayers, socket, board } = useRoom();

    const updateValue = (newValue: string) => {
        const newLiveLayers = { ...liveLayers };
        if (newLiveLayers[id] && newLiveLayers[id].type === LayerType.Text) {
            const textLayer = newLiveLayers[id] as TextLayer;
            textLayer.value = newValue;
            textLayer.textFontSize = fontSize;
        }

        return newLiveLayers;
    };

    const handleContentChange = (e: ContentEditableEvent) => {
        const newLiveLayers = updateValue(e.target.value);
        setLiveLayers(newLiveLayers);

        if (socket) {
            socket.emit('layer-update', id, newLiveLayers[id]);
        }

        updateLayer({
            boardId: board._id,
            layerId: id,
            layerUpdates: newLiveLayers[id]
        })

    };

    const debouncedHandleContentChange = debounce(handleContentChange, 500);

    function handleKeyDown(e: React.KeyboardEvent) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            const selection = document.getSelection();
            if (selection && selection.rangeCount > 0) {
                const range = selection.getRangeAt(0);
                const br = document.createElement('br');
                range.insertNode(br);
                range.setStartAfter(br);
                range.setEndAfter(br);
                selection.removeAllRanges();
                selection.addRange(range);
            }
        }
    }

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
        if (width !== prevWidth && height !== prevHeight && liveLayers[id]?.type === LayerType.Text) {
            const widthScaleFactor = width / prevWidth;
            const heightScaleFactor = height / prevHeight;
            const newFontSize = fontSize * Math.min(widthScaleFactor, heightScaleFactor);
            setFontSize(newFontSize);
            const textLayer = liveLayers[id] as TextLayer;
            textLayer.textFontSize = newFontSize;
            setLiveLayers(liveLayers);
        }
    }, [width, height, prevWidth, prevHeight]);
    
    useEffect(() => {
        setPrevWidth(width);
        setPrevHeight(height);
    }, [width, height]);
    
    if (!fill) {
        return null;
    }

    return (
        <foreignObject
            x={x}
            y={y}
            width={width}
            height={height}
            style={{
                outline: selectionColor ? `1px solid ${selectionColor}` : "none",
            }}
            onPointerDown={(e) => onPointerDown(e, id)}
        >
            <ContentEditable
                ref={textRef}
                html={value || "Text"}
                onChange={debouncedHandleContentChange}
                onPaste={handlePaste}
                onKeyDown={handleKeyDown}
                className={cn(
                    "outline-none w-full h-full text-center justify-center items-center flex",
                    font.className
                )}
                style={{
                    fontSize: fontSize,
                    color: colorToCss(fill) === "transparent" ? "#000" : colorToCss(fill),
                    wordWrap: 'break-word',
                    overflowWrap: 'break-word',
                    wordBreak: 'break-all',
                    display: 'flex',
                }}
                spellCheck={false}
            />
        </foreignObject>
    );
};