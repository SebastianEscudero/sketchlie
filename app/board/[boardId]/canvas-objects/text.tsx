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
    onPointerDown?: (e: React.PointerEvent, id: string) => void;
    selectionColor?: string;
    setLiveLayers?: (layers: any) => void;
    liveLayers?: any;
    updateLayer?: UpdateLayerMutation;
    onRefChange?: (ref: React.RefObject<any>) => void;
};

const throttledUpdateLayer = throttle((updateLayer, socket, boardId, layerId, layerUpdates) => {
    if (updateLayer) {
      updateLayer({
        boardId,
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

    const { liveLayers, board, socket } = useRoom();
    const textRef = useRef<any>(null);
    const fillColor = colorToCss(layer.fill);
    const isTransparent = fillColor === 'rgba(0,0,0,0)';

    const updateValue = (newValue: string) => {
        layer.value = newValue;
        return layer;
    };

    const handleContentChange = (newValue: string) => {
        const newLayer = updateValue(newValue);
        newLayer.height = textRef.current.scrollHeight;
        if (setLiveLayers) {
            const layers = { ...liveLayers };
            layers[id] = newLayer;
            setLiveLayers(layers);
            throttledUpdateLayer(updateLayer, socket, board._id, id, liveLayers[id]);
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
    }, [textRef]);

    useEffect(() => {
        const newHeight = textRef.current?.scrollHeight || height;
        layer.height = newHeight;
        textRef.current.style.height = 'auto';
        textRef.current.style.height = `${textRef.current.scrollHeight}px`;
    }, [width, value, height, id, layer]);
    
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
            onPointerDown={onPointerDown ? (e) => onPointerDown(e, id) : undefined}
        >
            <textarea
                ref={textRef}
                value={value || ""}
                onChange={e => handleContentChange(e.target.value)}
                autoComplete="off"
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck={false}
                placeholder='Type something...'
                className={cn(
                    "outline-none w-full h-full text-center flex",
                    font.className
                )}
                style={{
                    color: isTransparent ? "#000" : fillColor,
                    wordWrap: 'break-word',
                    overflowWrap: 'break-word',
                    wordBreak: 'break-all',
                    display: 'flex',
                    backgroundColor: 'transparent',
                    textAlign: 'left',
                    resize: "none",
                    overflowY: "hidden",
                    overflowX: "hidden",
                    userSelect: "none",
                    fontSize: textFontSize,
                    padding: 0.5,
                    margin: 0,
                }}
            />
        </foreignObject>
    );
};