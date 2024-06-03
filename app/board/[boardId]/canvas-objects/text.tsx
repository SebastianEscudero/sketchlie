import React, { useEffect, useRef } from 'react';
import { TextLayer, UpdateLayerMutation } from "@/types/canvas";
import { cn, colorToCss } from "@/lib/utils";
import { Kalam } from "next/font/google";
import { useRoom } from '@/components/room';
import { throttle } from 'lodash';

const font = Kalam({
    subsets: ["latin"],
    weight: ["400"],
});

interface TextProps {
    id: string;
    layer: TextLayer;
    onPointerDown?: (e: any, id: string) => void;
    selectionColor?: string;
    setLiveLayers?: (layers: any) => void;
    liveLayers?: any;
    updateLayer?: UpdateLayerMutation;
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


export const Text = ({
    layer,
    onPointerDown,
    id,
    selectionColor,
    setLiveLayers,
    updateLayer,
    onRefChange,
}: TextProps) => {
    const { x, y, width, height, fill, value, textFontSize } = layer;
    const { liveLayers, board, socket, expired } = useRoom();
    const textRef = useRef<any>(null);
    const fillColor = colorToCss(layer.fill);
    const isTransparent = fillColor === 'rgba(0,0,0,0)';

    const handlePointerDown = (e: React.PointerEvent) => {
        e.preventDefault();
        if (onPointerDown) {
            onPointerDown(e, id);
        }

        if (onRefChange) {
            onRefChange(textRef);
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
            onRefChange(textRef);
        }
    };

    const updateValue = (newValue: string) => {
        layer.value = newValue;
        return layer;
    };

    const handleContentChange = (newValue: string) => {
        const newLayer = updateValue(newValue);
        textRef.current.style.height = `${textFontSize*1.5}px`;
        newLayer.height = textRef.current.scrollHeight;
        if (setLiveLayers) {
            const layers = { ...liveLayers };
            layers[id] = newLayer;
            setLiveLayers(layers);
            throttledUpdateLayer(updateLayer, socket, board, id, liveLayers[id]);
        }
    };

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
        <foreignObject
            x={x}
            y={y}
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
                    "outline-none w-full h-full text-left flex px-0.5",
                    font.className
                )}
                style={{
                    color: isTransparent ? "#000" : fillColor,
                    wordWrap: 'break-word',
                    overflowWrap: 'break-word',
                    wordBreak: 'break-all',
                    backgroundColor: 'transparent',
                    resize: "none",
                    overflowY: "hidden",
                    overflowX: "hidden",
                    userSelect: "none",
                    fontSize: textFontSize,
                }}
            />
        </foreignObject>
    );
};