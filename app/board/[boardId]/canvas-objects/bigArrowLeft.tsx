import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { BigArrowLeftLayer } from "@/types/canvas";
import { cn, colorToCss, getContrastingTextColor } from "@/lib/utils";
import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { DEFAULT_FONT, defaultFont } from "../selection-tools/selectionToolUtils";
import { useHandlePaste, useUpdateValue } from "./canvas-objects-utils";
import { Socket } from "socket.io-client";

interface BigArrowLeftProps {
  id: string;
  layer: BigArrowLeftLayer;
 boardId?: string;
  onPointerDown?: (e: any, id: string) => void;
  selectionColor?: string;
  expired?: boolean;
  socket?: Socket;
  focused?: boolean;
  forcedRender?: boolean;
};

export const BigArrowLeft = memo(({
  layer,
  boardId,
  onPointerDown,
  id,
  selectionColor,
  expired,
  socket,
  focused = false,
  forcedRender = false,
}: BigArrowLeftProps) => {
  const { x, y, width, height, fill, outlineFill, value, textFontSize, fontFamily } = layer;
  const alignX = layer.alignX || "center";
  const alignY = layer.alignY || "center";
  const [editableValue, setEditableValue] = useState(value);
  const [strokeColor, setStrokeColor] = useState(selectionColor || colorToCss(outlineFill || fill));
  const fillColor = colorToCss(fill);
  const BigArrowLeftRef = useRef<HTMLDivElement>(null);
  const updateValue = useUpdateValue();
  const handlePaste = useHandlePaste();

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
      e.stopPropagation();
    } else {
      e.preventDefault();
    }
  }

  const handlePointerDown = (e: React.PointerEvent) => {
    if (focused) {
      e.stopPropagation();
      e.preventDefault();
      BigArrowLeftRef.current?.focus();
    }

    if (onPointerDown) onPointerDown(e, id);
  };

  const handleTouchStart = (e: React.TouchEvent) => {

    if (e.touches.length > 1) {
      return;
    }

    if (e.target === BigArrowLeftRef.current) {

      if (focused) {
        e.stopPropagation();
        BigArrowLeftRef.current.focus();
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

  const arrowHeadWidth = Math.min(height*0.8, width*0.7)
  const divWidth = width - arrowHeadWidth/2;
  const divHeight = height * 0.50;

  // Calculate the position to center the foreignObject within the BigArrowLeft
  const foreignObjectX = (width - divWidth);
  const foreignObjectY = (height - divHeight) / 2;

  return (
    <g
      transform={`translate(${x}, ${y})`}
      pointerEvents="auto"
      onPointerDown={(e) => handlePointerDown(e)}
      onTouchStart={(e) => handleTouchStart(e)}
      onPointerEnter={() => setStrokeColor("#3390FF")}
      onPointerLeave={() => setStrokeColor(selectionColor || colorToCss(outlineFill || fill))}
    >
      <path
        d={`M ${arrowHeadWidth / 2} ${height} L 0 ${height / 2} L ${arrowHeadWidth / 2} ${0} L ${arrowHeadWidth / 2} ${height / 4} L ${width} ${height / 4} L ${width} ${height * 3 / 4} L ${arrowHeadWidth / 2} ${height * 3 / 4} Z`} fill={fillColor}
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <foreignObject
        x={foreignObjectX} // Adjust x position to center the foreignObject
        y={foreignObjectY} // Adjust y position to center the foreignObject
        width={divWidth} // Adjust width to 80% of the BigArrowLeft's width
        height={divHeight} // Adjust height to 80% of the BigArrowLeft's height
        onDragStart={(e) => e.preventDefault()}
      >
        <div
          className={`h-full w-full flex ${alignY === 'top' ? 'items-start' : alignY === 'bottom' ? 'items-end' : 'items-center'} ${alignX === 'left' ? 'justify-start' : alignX === 'right' ? 'justify-end' : 'justify-center'} p-1`}
        >
          <ContentEditable
            innerRef={BigArrowLeftRef}
            html={editableValue || ""}
            onChange={handleContentChange}
            onPaste={handlePaste}
            onPointerDown={contentEditablePointerDown}
            className={cn(
              "outline-none w-full p-1 text-wrap",
              defaultFont.className
            )} 
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

BigArrowLeft.displayName = 'BigArrowLeft';