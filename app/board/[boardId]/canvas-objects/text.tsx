import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { LayerType, TextLayer } from "@/types/canvas";
import { cn, colorToCss, removeHighlightFromText } from "@/lib/utils";
import { throttle } from 'lodash';
import { updateR2Bucket } from '@/lib/r2-bucket-functions';
import { DEFAULT_FONT, defaultFont } from '../selection-tools/selectionToolUtils';
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";

interface TextProps {
  setLiveLayers?: (layers: any) => void;
  id: string;
  layer: TextLayer;
  onPointerDown?: (e: any, id: string) => void;
  selectionColor?: string;
  expired?: boolean;
  socket?: any;
  onRefChange?: (ref: React.RefObject<any>) => void;
  focused?: boolean;
  boardId?: string;
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

  useEffect(() => {
    setValue(layer.value);
  }, [id, layer]);

  useEffect(() => {
    onRefChange?.(textRef);
  }, [onRefChange]);

  useEffect(() => {
    if (!focused) {
      removeHighlightFromText();
    }
  }, [focused]);

  const updateValue = useCallback((newValue: string) => {
    if (layer && layer.type === LayerType.Text) {
      const textLayer = layer as TextLayer;
      textLayer.value = newValue;
      setValue(newValue);

      // Adjust height based on content
      if (textRef.current) {
        textRef.current.style.height = 'auto';
        const newHeight = textRef.current.scrollHeight;
        textLayer.height = newHeight;
        textRef.current.style.height = `${newHeight}px`;
      }

      if (expired !== true) {
        throttledUpdateLayer(boardId, id, textLayer);
        if (socket) {
          socket.emit('layer-update', id, textLayer);
        }
      }
      if (setLiveLayers) {
        setLiveLayers((prevLayers: any) => ({
          ...prevLayers,
          [id]: textLayer,
        }));
      }
    }
  }, [id, layer, expired, socket, boardId, setLiveLayers]);

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

  const contentEditablePointerDown = (e: React.PointerEvent) => {
    if (focused) {
      e.stopPropagation();
    } else {
      e.preventDefault();
    }
  }

  const handlePointerDown = (e: React.PointerEvent) => {
    if (focused) {
      e.stopPropagation();
      e.preventDefault();
      textRef.current.focus();
    }

    if (onPointerDown) onPointerDown(e, id);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length > 1) {
      return;
    }

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
        <ContentEditable
          innerRef={textRef}
          html={value || ""}
          onChange={handleContentChange}
          onPaste={handlePaste}
          onPointerDown={contentEditablePointerDown}
          className={cn(
            "outline-none w-full",
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
          spellCheck={false}
          onDragStart={(e) => e.preventDefault()}
        />
      </foreignObject>
    </g>
  );
});

Text.displayName = 'Text';