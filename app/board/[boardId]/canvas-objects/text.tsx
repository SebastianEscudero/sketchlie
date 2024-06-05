import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { TextLayer, UpdateLayerMutation } from "@/types/canvas";
import { cn, colorToCss } from "@/lib/utils";
import { Kalam } from "next/font/google";
import { throttle } from 'lodash';

const font = Kalam({
    subsets: ["latin"],
    weight: ["400"],
});

interface TextProps {
    setLiveLayers?: (layers: any) => void;
    id: string;
    layer: TextLayer;
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


  export const Text = memo(({
    layer,
    onPointerDown,
    id,
    selectionColor,
    setLiveLayers,
    updateLayer,
    onRefChange,
    expired,
    socket,
    board,
}: TextProps) => {
    const { x, y, width, height, fill, value: initialValue, textFontSize } = layer;
    const [value, setValue] = useState(initialValue);
    const textRef = useRef<any>(null);
    const fillColor = colorToCss(layer.fill);
    const isTransparent = fillColor === 'rgba(0,0,0,0)';

    const handlePointerDown = useCallback((e: React.PointerEvent) => {
        e.preventDefault();
        onPointerDown?.(e, id);
        onRefChange?.(textRef);
    }, [onPointerDown, id, onRefChange]);

    const handleOnTouchDown = useCallback((e: React.TouchEvent) => {
        e.preventDefault();
        if (e.touches.length > 1) {
          return;
        }
        onPointerDown?.(e, id);
        onRefChange?.(textRef);
    }, [onPointerDown, id, onRefChange]);

    const handleContentChange = useCallback((newValue: string) => {
        setValue(newValue);
        const newLayer = { ...layer, value: newValue };
        textRef.current.style.height = `${textFontSize*1.5}px`;
        newLayer.height = textRef.current.scrollHeight;
        if (setLiveLayers) {
            setLiveLayers((prevLayers: any) => {
                return { ...prevLayers, [id]: { ...newLayer } };
            });
            throttledUpdateLayer(updateLayer, socket, board, id, newLayer); // Pass newLayer instead of layer
        }
    }, [layer, textFontSize, setLiveLayers, updateLayer, socket, board, id]);

    useEffect(() => {
        if (onRefChange) {
            onRefChange(textRef);
        }
    }, [textRef, onRefChange]);

    useEffect(() => {
        if (textRef.current) {
            textRef.current.focus();
        }
    }, []);

    useEffect(() => {        
        textRef.current.style.height = `${textFontSize*1.5}px`;
        textRef.current.style.height = `${textRef.current.scrollHeight}px`;
    }, [width, value, id, height, layer, textFontSize]);
    
    if (!fill) {
        return null;
    }

    return (
        <g transform={`translate(${x}, ${y})`}>
            <foreignObject
                width={width}
                height={height}
                style={{
                    outline: selectionColor ? `2px solid ${selectionColor}` : "none",
                }}
                onPointerMove={(e) => {
                    if (e.buttons === 1) {
                        handlePointerDown(e);
                    }
                }}
                onPointerDown={(e) => handlePointerDown(e)}
                onTouchStart={(e) => handleOnTouchDown(e)}
            >
                <textarea
                    ref={textRef}
                    value={value || ""}
                    onChange={e => handleContentChange(e.target.value)}
                    autoComplete="off"
                    autoCapitalize="off"
                    autoCorrect="off"
                    spellCheck={false}
                    disabled={expired}
                    placeholder='Type something...'
                    className={cn(
                        "outline-none w-full h-full text-left flex px-0.5 bg-transparent",
                        font.className
                    )}
                    style={{
                        color: isTransparent ? "#000" : fillColor,
                        wordWrap: 'break-word',
                        overflowWrap: 'break-word',
                        wordBreak: 'break-all',
                        resize: "none",
                        overflowY: "hidden",
                        overflowX: "hidden",
                        userSelect: "none",
                        fontSize: textFontSize,
                    }}
                />
            </foreignObject>
        </g>
    );
});

Text.displayName = 'Text';