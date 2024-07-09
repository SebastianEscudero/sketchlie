import { Kalam } from "next/font/google";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";

import { LayerType, EllipseLayer } from "@/types/canvas";
import { cn, colorToCss, getContrastingTextColor, removeHighlightFromText } from "@/lib/utils";
import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { throttle } from "lodash";
import { updateR2Bucket } from "@/lib/r2-bucket-functions";

const font = Kalam({
  subsets: ["latin"],
  weight: ["400"],
});

interface EllipseProps {
  id: string;
  layer: EllipseLayer;
  boardId?: string;
  onPointerDown?: (e: any, id: string) => void;
  selectionColor?: string;
  expired?: boolean;
  socket?: any;
  focused?: boolean;
};

const throttledUpdateLayer = throttle((boardId, layerId, layerUpdates) => {
  updateR2Bucket('/api/r2-bucket/updateLayer', boardId, layerId, layerUpdates);
}, 1000);

export const Ellipse = memo(({
  layer,
  boardId,
  onPointerDown,
  id,
  selectionColor,
  expired,
  socket,
  focused = false,
}: EllipseProps) => {
  const { x, y, width, height, fill, outlineFill, value: initialValue, textFontSize } = layer;
  const alignX = layer.alignX || "center";
  const alignY = layer.alignY || "center";
  const [value, setValue] = useState(initialValue);
  const fillColor = colorToCss(fill);
  const EllipseRef = useRef<any>(null);

  useEffect(() => {
    setValue(layer.value);
  }, [id, layer]);

  useEffect(() => {
    if (!focused) {
      removeHighlightFromText();
    }
  }, [focused])


  const updateValue = useCallback((newValue: string) => {
    if (layer && layer.type === LayerType.Ellipse) {
      const EllipseLayer = layer as EllipseLayer;
      EllipseLayer.value = newValue;
      setValue(newValue);
      if (expired !== true) {
        throttledUpdateLayer(boardId, id, layer);
        if (socket) {
          socket.emit('layer-update', id, layer);
        }
      }
    }
  }, [id, layer, expired, socket, boardId]);

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

  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === 'mouse') {
      if (e.target === EllipseRef.current) {

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
        EllipseRef.current.focus();
      }
  
      if (onPointerDown) {
        onPointerDown(e, id);
      }
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {

    if (e.touches.length > 1) {
      return;
    }

    if (e.target === EllipseRef.current) {

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

  const divWidth = width * 0.70;
  const divHeight = height * 0.70;

  // Calculate the position to center the foreignObject within the ellipse
  const foreignObjectX = (width - divWidth) / 2;
  const foreignObjectY = (height - divHeight) / 2;

  if (!fill) {
    return null;
  }

  return (
    <g
      transform={`translate(${x}, ${y})`}
      onPointerDown={(e) => handlePointerDown(e)}
      onTouchStart={(e) => handleTouchStart(e)}
    >
      <ellipse
        cx={width / 2}
        cy={height / 2}
        rx={width / 2}
        ry={height / 2}
        fill={fillColor}
        stroke={selectionColor || colorToCss(outlineFill || fill)}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <foreignObject
        x={foreignObjectX} // Adjust x position to center the foreignObject
        y={foreignObjectY} // Adjust y position to center the foreignObject
        width={divWidth} // Adjust width to 80% of the Ellipse's width
        height={divHeight} // Adjust height to 80% of the Ellipse's height
        onDragStart={(e) => e.preventDefault()}
      >
        <div
          className={`h-full w-full flex ${alignY === 'top' ? 'items-start' : alignY === 'bottom' ? 'items-end' : 'items-center'} ${alignX === 'left' ? 'justify-start' : alignX === 'right' ? 'justify-end' : 'justify-center'} p-1`}
        >
          <ContentEditable
            innerRef={EllipseRef}
            html={value || ""}
            onChange={handleContentChange}
            onPaste={handlePaste}
            onKeyDown={(e) => {
              // Check if the pressed key is Enter
              if (e.key === 'Enter') {
                e.preventDefault(); // Prevent the default Enter key behavior

                // Insert a new line at the current cursor position
                document.execCommand('insertText', false, '\n');
              }
            }}
            className={cn(
              "outline-none w-full p-1",
              font.className
            )}
            style={{
              fontSize: textFontSize,
              color: fill ? getContrastingTextColor(fill) : "#000",
              textWrap: "wrap",
              WebkitUserSelect: 'auto',
              textAlign: alignX,
              cursor: focused && 'text',
            }}
            spellCheck={false}
            onDragStart={(e) => e.preventDefault()}
          />
        </div>
      </foreignObject>
    </g>
  );
});

Ellipse.displayName = 'Ellipse';