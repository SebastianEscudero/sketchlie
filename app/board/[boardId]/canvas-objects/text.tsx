import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { TextLayer, UpdateLayerMutation } from "@/types/canvas";
import { cn, colorToCss } from "@/lib/utils";
import { throttle } from 'lodash';
import { updateR2Bucket } from '@/lib/r2-bucket-functions';
import { DEFAULT_FONT, defaultFont } from '../selection-tools/selectionToolUtils';

interface TextProps {
  setLiveLayers?: (layers: any) => void;
  id: string;
  layer: TextLayer;
  onPointerDown?: (e: any, id: string) => void;
  selectionColor?: string;
  updateLayer?: UpdateLayerMutation;
  expired?: boolean;
  socket?: any;
  onRefChange?: (ref: React.RefObject<any>) => void;
  focused?: boolean;
  boardId?: string;
  forcedRender?: boolean;
};

const throttledUpdateLayer = throttle((boardId, layerId, layerUpdates) => {
  updateR2Bucket('/api/r2-bucket/updateLayer', boardId, layerId, layerUpdates);
}, 1000);

export const Text = memo(({
  layer,
  onPointerDown,
  id,
  selectionColor,
  setLiveLayers,
  onRefChange,
  expired,
  socket,
  focused = false,
  boardId,
}: TextProps) => {
  const { x, y, width, height, fill, value: initialValue, textFontSize, fontFamily } = layer;
  const alignX = layer.alignX || "center";
  const [value, setValue] = useState(initialValue);
  const textRef = useRef<any>(null);
  const fillColor = colorToCss(fill);
  const isTransparent = fillColor === 'rgba(0,0,0,0)';
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    setValue(layer.value);
  }, [id, layer]);

  useEffect(() => {
    onRefChange?.(textRef);
  }, [onRefChange]);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {

    if (e.pointerType === "touch") {
      return;
    }

    onRefChange?.(textRef);

    if (e.target === textRef.current) {

      if (focused) {
        e.stopPropagation();
      } else {
        e.preventDefault();
        if (onPointerDown) onPointerDown(e, id);
      }
      return;
    } else if (focused) {
      e.preventDefault();
      e.stopPropagation();
      textRef.current.focus();
    }

    if (onPointerDown) {
      onPointerDown(e, id);
    }
  }, [onPointerDown, id, onRefChange, focused]);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length > 1) {
      return;
    }

    onRefChange?.(textRef);

    if (e.target === textRef.current) {

      if (focused) {
        e.stopPropagation();
        textRef.current.focus();
      } else {
        e.preventDefault();
        if (onPointerDown) onPointerDown(e, id);
      }
      return;
    } else if (focused) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (onPointerDown) {
      onPointerDown(e, id);
    }
  }

  const handleContentChange = useCallback((newValue: string) => {
    setValue(newValue);
    const newLayer = { ...layer, value: newValue };
    textRef.current.style.height = `${textFontSize * 1.5}px`;
    newLayer.height = textRef.current.scrollHeight;
    if (setLiveLayers) {
      setLiveLayers((prevLayers: any) => {
        return { ...prevLayers, [id]: { ...newLayer } };
      });
      throttledUpdateLayer(boardId, id, newLayer); // Pass newLayer instead of layer
      if (socket) {
        socket.emit('layer-update', id, newLayer);
      }
    }
  }, [layer, textFontSize, setLiveLayers, socket, boardId, id]);

  useEffect(() => {
    textRef.current.style.height = `${textFontSize * 1.5}px`;
    textRef.current.style.height = `${textRef.current.scrollHeight}px`;
  }, [width, value, id, height, layer, textFontSize]);

  if (!fill) {
    return null;
  }

  return (
    <g
      transform={`translate(${x}, ${y})`}
      pointerEvents="auto"
    >
      <foreignObject
        width={width}
        height={height}
        style={{
          outline: selectionColor ? `2px solid ${selectionColor}` : "none",
        }}
        onPointerDown={(e) => handlePointerDown(e)}
        onTouchStart={(e) => handleTouchStart(e)}
      >
        <textarea
          ref={textRef}
          value={value || ""}
          onChange={e => handleContentChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
          disabled={expired}
          placeholder={isFocused ? "" : 'Type something...'}
          className={cn(
            "outline-none w-full h-full text-left flex px-0.5 bg-transparent",
            defaultFont.className
          )}
          style={{
            color: isTransparent
              ? (document.documentElement.classList.contains("dark") ? "#FFF" : "#000")
              : fillColor, wordWrap: 'break-word',
            overflowWrap: 'break-word',
            wordBreak: 'break-all',
            resize: "none",
            overflowY: "hidden",
            overflowX: "hidden",
            userSelect: "none",
            fontSize: textFontSize,
            textAlign: alignX,
            cursor: focused ? 'text' : 'default',
            fontFamily: fontFamily || DEFAULT_FONT,
          }}
        />
      </foreignObject>
    </g>
  );
});

Text.displayName = 'Text';