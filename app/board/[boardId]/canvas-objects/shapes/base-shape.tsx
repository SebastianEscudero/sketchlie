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
  setAddedByLabel?: (addedBy: string) => void;
  renderShape: (fillColor: string) => React.ReactNode;
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
  setAddedByLabel,
  renderShape,
  foreignObjectDimensions
}: BaseShapeProps) => {
  const { x, y, fill, outlineFill, value, textFontSize, fontFamily, addedBy } = layer;
  const alignX = layer.alignX || "center";
  const alignY = layer.alignY || "center";
  const [editableValue, setEditableValue] = useState(value);
  const fillColor = colorToCss(fill);
  const defaultStroke = colorToCss(outlineFill || fill);
  const shapeRef = useRef<HTMLDivElement>(null);
  const updateValue = useUpdateValue();
  const handlePaste = useHandlePaste();
  const setIsEditing = useLayerTextEditingStore(state => state.setIsEditing);
  const isEditingText = useLayerTextEditingStore(state => state.isEditing);

  useEffect(() => {
    setEditableValue(value);
  }, [value]);

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
    }

    if (onPointerDown) onPointerDown(e, id);
  };

  const handlePointerEnter = useCallback(() => {
    setAddedByLabel?.(addedBy || '');
  }, [addedBy, setAddedByLabel]);

  const handlePointerLeave = useCallback(() => {
    setAddedByLabel?.('');
  }, [setAddedByLabel]);

  const { width: divWidth, height: divHeight, x: foreignObjectX, y: foreignObjectY } = foreignObjectDimensions;

  return (
    <g
      transform={`translate(${x}, ${y})`}
      pointerEvents="auto"
      onPointerDown={handlePointerDown}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      className="group"
    >
      <g 
        style={{
          '--base-stroke': selectionColor || defaultStroke,
        } as React.CSSProperties}
        className={cn("shape-stroke-effect")}
      >
        {renderShape(fillColor)}
      </g>
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
            draggable={false}
            disabled={!focused}
            spellCheck={false}
            html={editableValue || ""}
            onChange={handleContentChange}
            onPaste={handlePaste}
            onPointerDown={contentEditablePointerDown}
            className={cn(
              "outline-none w-full p-1 break-words whitespace-pre-wrap",
              defaultFont.className
            )}
            style={{
              fontSize: textFontSize,
              color: fill ? getContrastingTextColor(fill) : "#000",
              cursor: isEditingText && 'text',
              WebkitUserSelect: 'auto',
              textAlign: alignX,
              fontFamily: fontFamily || DEFAULT_FONT,
              wordWrap: 'break-word',
              overflowWrap: 'break-word',
            }}
          />
        </div>
      </foreignObject>
    </g>
  );
});

BaseShape.displayName = 'BaseShape';