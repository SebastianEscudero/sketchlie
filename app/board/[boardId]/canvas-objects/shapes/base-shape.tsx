"use client";

import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { BaseShapeLayer } from "@/types/canvas";
import { cn, colorToCss, getContrastingTextColor } from "@/lib/utils";
import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { DEFAULT_FONT, defaultFont } from "../../selection-tools/selectionToolUtils";
import { useHandlePaste, useUpdateValue } from "../utils/canvas-objects-utils";
import { Socket } from "socket.io-client";
import { useLayerTextEditingStore } from "../utils/use-layer-text-editing";

interface BaseShapeProps {
  id: string;
  layer: BaseShapeLayer;
  boardId?: string;
  onPointerDown?: (e: any, id: string) => void;
  selectionColor?: string;
  expired?: boolean;
  socket?: Socket;
  focused?: boolean;
  forcedRender?: boolean;
  showOutlineOnHover?: boolean;
  setAddedByLabel?: (addedBy: string) => void;
  renderShape: (fillColor: string, strokeColor: string) => React.ReactNode;
  foreignObjectDimensions: {
    width: number;
    height: number;
    x: number;
    y: number;
  };
}

export const BaseShape = memo(({
  layer,
  boardId,
  onPointerDown,
  id,
  selectionColor,
  expired,
  socket,
  focused = false,
  forcedRender = false,
  showOutlineOnHover = false,
  setAddedByLabel,
  renderShape,
  foreignObjectDimensions
}: BaseShapeProps) => {
  const { x, y, fill, outlineFill, value, textFontSize, fontFamily, addedBy } = layer;
  const alignX = layer.alignX || "center";
  const alignY = layer.alignY || "center";
  const [editableValue, setEditableValue] = useState(value);
  const [strokeColor, setStrokeColor] = useState(selectionColor || colorToCss(outlineFill || fill));
  const fillColor = colorToCss(fill);
  const shapeRef = useRef<HTMLDivElement>(null);
  const updateValue = useUpdateValue();
  const handlePaste = useHandlePaste();
  const setIsEditing = useLayerTextEditingStore(state => state.setIsEditing);

  useEffect(() => {
    setEditableValue(value);
  }, [value]);

  useEffect(() => {
    setStrokeColor(selectionColor || colorToCss(outlineFill || fill));
  }, [selectionColor, outlineFill, fill, forcedRender]);

  const handleContentChange = useCallback((e: ContentEditableEvent) => {
    updateValue(boardId!, id, layer, e.target.value, expired!, socket!, setEditableValue);
  }, [updateValue, boardId, id, layer, expired, socket]);

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
      shapeRef.current?.focus();
    }

    if (onPointerDown) onPointerDown(e, id);
    setStrokeColor(selectionColor || colorToCss(outlineFill || fill));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length > 1) return;

    if (e.target === shapeRef.current) {
      if (focused) {
        setIsEditing(true);
        e.stopPropagation();
      } else {
        e.preventDefault();
        if (onPointerDown) onPointerDown(e, id);
      }
      return;
    } else if (focused) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (onPointerDown) onPointerDown(e, id);
  }

  const { width: divWidth, height: divHeight, x: foreignObjectX, y: foreignObjectY } = foreignObjectDimensions;

  return (
    <g
      transform={`translate(${x}, ${y})`}
      pointerEvents="auto"
      onPointerDown={handlePointerDown}
      onTouchStart={handleTouchStart}
      onPointerEnter={() => { if (showOutlineOnHover) { setStrokeColor("#3390FF"); setAddedByLabel?.(addedBy || '') } }}
      onPointerLeave={() => { setStrokeColor(selectionColor || colorToCss(outlineFill || fill)); setAddedByLabel?.('') }}
    >
      {renderShape(fillColor, strokeColor)}
      <foreignObject
        x={foreignObjectX}
        y={foreignObjectY}
        width={divWidth}
        height={divHeight}
        onDragStart={(e) => e.preventDefault()}
      >
        <div className={`h-full w-full flex ${alignY === 'top' ? 'items-start' : alignY === 'bottom' ? 'items-end' : 'items-center'} ${alignX === 'left' ? 'justify-start' : alignX === 'right' ? 'justify-end' : 'justify-center'} p-1`}>
          <ContentEditable
            id={id}
            innerRef={shapeRef}
            html={editableValue || ""}
            onChange={handleContentChange}
            onPaste={handlePaste}
            onPointerDown={contentEditablePointerDown}
            className={cn("outline-none w-full p-1 text-wrap", defaultFont.className)}
            style={{
              fontSize: textFontSize,
              color: fill ? getContrastingTextColor(fill) : "#000",
              WebkitUserSelect: 'auto',
              textAlign: alignX,
              cursor: focused && 'text',
              fontFamily: fontFamily || DEFAULT_FONT,
            }}
            spellCheck={false}
            onDragStart={(e) => e.preventDefault()}
          />
        </div>
      </foreignObject>
    </g>
  );
});

BaseShape.displayName = 'BaseShape';