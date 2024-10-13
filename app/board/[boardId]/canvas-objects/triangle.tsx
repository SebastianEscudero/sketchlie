import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { TriangleLayer } from "@/types/canvas";
import { cn, colorToCss, getContrastingTextColor } from "@/lib/utils";
import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { DEFAULT_FONT, defaultFont } from "../selection-tools/selectionToolUtils";
import { useHandlePaste, useUpdateValue } from "./canvas-objects-utils";
import { Socket } from "socket.io-client";

interface TriangleProps {
  id: string;
  layer: TriangleLayer;
 boardId?: string;
  onPointerDown?: (e: any, id: string) => void;
  selectionColor?: string;
  expired?: boolean;
  socket?: Socket;
  focused?: boolean;
  forcedRender?: boolean;
};

export const Triangle = memo(({
  layer,
  boardId,
  onPointerDown,
  id,
  selectionColor,
  expired,
  socket,
  focused = false,
  forcedRender = false,
}: TriangleProps) => {
  const { x, y, width, height, fill, outlineFill, value, textFontSize, fontFamily } = layer;
  const alignX = layer.alignX || "center";
  const alignY = layer.alignY || "center";
  const [editableValue, setEditableValue] = useState(value);
  const [strokeColor, setStrokeColor] = useState(selectionColor || colorToCss(outlineFill || fill));
  const fillColor = colorToCss(fill);
  const TriangleRef = useRef<HTMLDivElement>(null);
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
      TriangleRef.current?.focus();
    }

    if (onPointerDown) onPointerDown(e, id);
    setStrokeColor(selectionColor || colorToCss(outlineFill || fill));
  };

  const handleTouchStart = (e: React.TouchEvent) => {

    if (e.touches.length > 1) {
      return;
    }

    if (e.target === TriangleRef.current) {

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
    }

    if (onPointerDown) {
      onPointerDown(e, id);
    }
  }

  const divWidth = width * 0.40;
  const divHeight = height * 0.60;

  // Calculate the position to center the foreignObject within the Triangle
  const foreignObjectX = (width - divWidth) / 2;
  const foreignObjectY = (height - divHeight);

  return (
    <g
      transform={`translate(${x}, ${y})`}
      pointerEvents="auto"
      onPointerDown={(e) => handlePointerDown(e)}
      onTouchStart={(e) => handleTouchStart(e)}
      onPointerEnter={(e) => {if (e.buttons === 0 && document.body.style.cursor === 'default') {setStrokeColor("#3390FF")}}}
      onPointerLeave={() => setStrokeColor(selectionColor || colorToCss(outlineFill || fill))}
    >
      <polygon
        points={`${width / 2}, 0 ${width},${height} 0,${height}`}
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <foreignObject
        x={foreignObjectX} // Adjust x position to center the foreignObject
        y={foreignObjectY} // Adjust y position to center the foreignObject
        width={divWidth} // Adjust width to 80% of the Triangle's width
        height={divHeight} // Adjust height to 80% of the Triangle's height
        onDragStart={(e) => e.preventDefault()}
      >
        <div
          className={`h-full w-full flex ${alignY === 'top' ? 'items-start' : alignY === 'bottom' ? 'items-end' : 'items-center'} ${alignX === 'left' ? 'justify-start' : alignX === 'right' ? 'justify-end' : 'justify-center'} p-1`}
        >
          <ContentEditable
            innerRef={TriangleRef}
            html={editableValue || ""}
            onChange={handleContentChange}
            onPaste={handlePaste}
            onPointerDown={contentEditablePointerDown}
            className={cn(
              "outline-none w-full p-1 text-wrap",
              defaultFont.className
            )} style={{
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

Triangle.displayName = 'Triangle';