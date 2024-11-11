import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { TextLayer, UpdateLayerMutation } from "@/types/canvas";
import { cn, colorToCss } from "@/lib/utils";
import { throttle } from 'lodash';
import { updateR2Bucket } from '@/lib/r2-bucket-functions';
import { DEFAULT_FONT, defaultFont } from '../selection-tools/selectionToolUtils';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';
import { useHandlePaste } from './utils/canvas-objects-utils';
import { useLayerTextEditingStore } from './hooks/use-layer-text-editing';

interface TextProps {
  setLiveLayers?: (layers: any) => void;
  id: string;
  layer: TextLayer;
  onPointerDown?: (e: any, id: string) => void;
  selectionColor?: string;
  updateLayer?: UpdateLayerMutation;
  forcedRender?: boolean;
  expired?: boolean;
  socket?: any;
  onRefChange?: (ref: React.RefObject<any>) => void;
  focused?: boolean;
  boardId?: string;
  setAddedByLabel?: (addedBy: string) => void;
  justInsertedText?: boolean;
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
  socket,
  focused = false,
  boardId,
  setAddedByLabel,
  justInsertedText = false,
}: TextProps) => {
  const { x, y, width, height, fill, value: initialValue, textFontSize, fontFamily, addedBy } = layer;
  const alignX = layer.alignX || "center";
  const [editableValue, setEditableValue] = useState(initialValue);
  const textRef = useRef<HTMLDivElement>(null);
  const fillColor = colorToCss(fill);
  const isTransparent = fillColor === 'rgba(0,0,0,0)';
  const handlePaste = useHandlePaste();
  const setIsEditing = useLayerTextEditingStore(state => state.setIsEditing);
  const isEditingText = useLayerTextEditingStore(state => state.isEditing);

  useEffect(() => {
    setEditableValue(layer.value);
  }, [id, layer]);

  useEffect(() => {
    if (textRef.current) {
      textRef.current.style.height = `${textFontSize * 1.5}px`;
      textRef.current.style.height = `${textRef.current.scrollHeight}px`;
    }
  }, [width, editableValue, id, height, layer, textFontSize]);

  useEffect(() => {
    if (justInsertedText && textRef.current) {
      console.log('just inserted')
      textRef.current.focus();
    }
  }, [justInsertedText]);

  const handleContentChange = useCallback((e: ContentEditableEvent) => {
    const newValue = e.target.value;
    setEditableValue(newValue);
    const newLayer = { ...layer, value: newValue };
    if (textRef.current) {
      textRef.current.style.height = `${textFontSize * 1.5}px`;
      newLayer.height = textRef.current.scrollHeight;
    }
    if (setLiveLayers) {
      setLiveLayers((prevLayers: any) => {
        return { ...prevLayers, [id]: { ...newLayer } };
      });
      throttledUpdateLayer(boardId, id, newLayer);
      if (socket) {
        socket.emit('layer-update', id, newLayer);
      }
    }
  }, [layer, textFontSize, setLiveLayers, socket, boardId, id]);

  const contentEditablePointerDown = (e: React.PointerEvent) => {
    if (focused) {
      setIsEditing(true);
      e.stopPropagation();
    } else {
      e.preventDefault();
    }
  }

  const handlePointerDown = (e: React.PointerEvent) => {
    if (focused) {
      setIsEditing(true);
      e.stopPropagation();
      e.preventDefault();
    }

    if (onPointerDown) onPointerDown(e, id);
  };

  const handlePointerEnter = useCallback(() => {
    setAddedByLabel?.(addedBy || '');
  }, [addedBy, setAddedByLabel]);

  const handlePointerLeave = useCallback(() => {
    setAddedByLabel?.('');
  }, [setAddedByLabel]);

  if (!fill) {
    return null;
  }

  return (
    <g
      transform={`translate(${x}, ${y})`}
      pointerEvents="auto"
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onPointerDown={handlePointerDown}
      className="group"
    >
      <rect
        width={width}
        height={height}
        style={{
          '--base-stroke': selectionColor || 'none',
        } as React.CSSProperties}
        className={cn("shape-stroke-effect", "fill-transparent")}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <foreignObject
        width={width}
        height={height}
      >
        <ContentEditable
          id={id}
          innerRef={textRef}
          draggable={false}
          spellCheck={false}
          html={editableValue || ""}
          onChange={handleContentChange}
          onPaste={handlePaste}
          onPointerDown={contentEditablePointerDown}
          className={cn(
            "outline-none w-full px-0.5 break-words whitespace-pre-wrap",
            defaultFont.className
          )}
          style={{
            fontSize: textFontSize,
            color: isTransparent
              ? (document.documentElement.classList.contains("dark") ? "#FFF" : "#000")
              : fillColor,
            cursor: isEditingText && 'text',
            WebkitUserSelect: 'auto',
            textAlign: alignX,
            fontFamily: fontFamily || DEFAULT_FONT,
            wordWrap: 'break-word',
            overflowWrap: 'break-word',
          }}
        />
      </foreignObject>
    </g>
  );
});

Text.displayName = 'Text';