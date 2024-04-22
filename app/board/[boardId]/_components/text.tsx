import React, { useState, useEffect, useRef } from 'react';
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { TextLayer } from "@/types/canvas";
import { colorToCss } from "@/lib/utils";
import { useMutation } from "@/liveblocks.config";

const calculateFontSize = (width: number, height: number) => {
    const scaleFactor = 0.4;
    const fontSizeBasedOnHeight = height * scaleFactor;
    const fontSizeBasedOnWidth = width * scaleFactor;
    const ratio = width / height;
    console.log(ratio)
    return Math.min(
      fontSizeBasedOnHeight, 
      fontSizeBasedOnWidth
    );
}


interface TextProps {
    id: string;
    layer: TextLayer;
    onPointerDown: (e: React.PointerEvent, id: string) => void;
    selectionColor?: string;
};

export const Text = ({
    layer,
    onPointerDown,
    id,
    selectionColor,
}: TextProps) => {
    const { x, y, width, height, fill, value } = layer;
    const [prevWidth, setPrevWidth] = useState(width);
    const [prevHeight, setPrevHeight] = useState(height);
    const [fontSize, setFontSize] = useState(calculateFontSize(width, height));
    const textRef = useRef<any>(null);

    const updateValue = useMutation(( { storage }, newValue: string ) => {
        const liveLayers = storage.get("layers");
        const layer = liveLayers.get(id);
        layer?.set("value", newValue);
    }, []);

    const handleContentChange = (e: ContentEditableEvent) => {
        updateValue(e.target.value);
    };

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
        if (width !== prevWidth && height !== prevHeight) {
            const widthScaleFactor = width / prevWidth;
            const heightScaleFactor = height / prevHeight;
            const newFontSize = fontSize * Math.min(widthScaleFactor, heightScaleFactor);
            setFontSize(newFontSize);
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
                onChange={handleContentChange}
                onPaste={handlePaste}
                onKeyDown={handleKeyDown}
                className="outline-none w-full h-full text-center justify-center items-center flex"
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