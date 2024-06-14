import { Kalam } from "next/font/google";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";

import { LayerType, RhombusLayer, UpdateLayerMutation } from "@/types/canvas";
import { cn, colorToCss, getContrastingTextColor, removeHighlightFromText } from "@/lib/utils";
import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { throttle } from "lodash";

const font = Kalam({
  subsets: ["latin"],
  weight: ["400"],
});

interface RhombusProps {
  id: string;
  layer: RhombusLayer;
  onPointerDown?: (e: any, id: string) => void;
  selectionColor?: string;
  updateLayer?: UpdateLayerMutation;
  expired?: boolean;
  socket?: any;
  board?: any;
  focused?: boolean;
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

export const Rhombus = memo(({
  layer,
  onPointerDown,
  id,
  selectionColor,
  updateLayer,
  expired,
  socket,
  board,
  focused = false,
}: RhombusProps) => {
  const { x, y, width, height, fill, outlineFill, value: initialValue, textFontSize } = layer;
  const alignX = layer.alignX || "center";
  const alignY = layer.alignY || "center";
  const [value, setValue] = useState(initialValue);
  const fillColor = colorToCss(fill);
  const RhombusRef = useRef<any>(null);

  useEffect(() => {
    setValue(layer.value);
  }, [id, layer]);

  useEffect(() => {
    if (!focused) {
      removeHighlightFromText();
    }
  }, [focused])


  const updateValue = useCallback((newValue: string) => {
    if (layer && layer.type === LayerType.Rhombus) {
      const RhombusLayer = layer as RhombusLayer;
      RhombusLayer.value = newValue;
      setValue(newValue);
      if (expired !== true) {
        throttledUpdateLayer(updateLayer, socket, board, id, layer);
      }
    }
  }, [id, layer, expired, updateLayer, socket, board]);

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

    if (e.pointerType === "touch") {
      return;
    }

    if (e.target === RhombusRef.current) {

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
      RhombusRef.current.focus();
    }

    if (onPointerDown) {
      onPointerDown(e, id);
    }
  };

  const handleTouchDown = (e: React.TouchEvent) => {
    if (e.touches.length > 1 || document.activeElement === RhombusRef.current) {
      e.preventDefault();
      return;
    }

    if (e.target === RhombusRef.current) {
      if (focused) {
        e.stopPropagation();
      } else {
        e.preventDefault();
        if (onPointerDown) onPointerDown(e, id);
      }
      return;
    }

    if (!focused && onPointerDown) {
      onPointerDown(e, id);
    }
  }

  const divWidth = width * 0.50;
  const divHeight = height * 0.50;

  // Calculate the position to center the foreignObject within the Rhombus
  const foreignObjectX = (width - divWidth) / 2;
  const foreignObjectY = (height - divHeight) / 2;

  if (!fill) {
    return null;
  }

  return (
    <g
      transform={`translate(${x}, ${y})`}
      onPointerDown={(e) => handlePointerDown(e)}
      onTouchStart={(e) => handleTouchDown(e)}
    >
      <path
        d={`M ${width / 2} 0 L ${width} ${height / 2} L ${width / 2} ${height} L 0 ${height / 2} Z`}
        fill={fillColor}
        stroke={selectionColor || colorToCss(outlineFill || fill)}
        strokeWidth="2"
      />
      <foreignObject
        x={foreignObjectX} // Adjust x position to center the foreignObject
        y={foreignObjectY} // Adjust y position to center the foreignObject
        width={divWidth} // Adjust width to 80% of the Rhombus's width
        height={divHeight} // Adjust height to 80% of the Rhombus's height
        onDragStart={(e) => e.preventDefault()}
      >
        <div
          className={`h-full w-full flex ${alignY === 'top' ? 'items-start' : alignY === 'bottom' ? 'items-end' : 'items-center'} ${alignX === 'left' ? 'justify-start' : alignX === 'right' ? 'justify-end' : 'justify-center'} p-1`}
        >
          <ContentEditable
            innerRef={RhombusRef}
            html={value || ""}
            onChange={handleContentChange}
            onPaste={handlePaste}
            onKeyDown={(e) => {
              // Check if the pressed key is Enter
              if (e.key === 'Enter') {
                e.preventDefault(); // Prevent the default Enter key behavior
                
                // Insert a new line at the current cursor position
                document.execCommand('insertHTML', false, '<br><br>');
              }
            }}
            className={cn(
              "outline-none w-full",
              font.className
            )}
            style={{
              fontSize: textFontSize,
              color: fill ? getContrastingTextColor(fill) : "#000",
              textWrap: "wrap",
              WebkitUserSelect: 'auto',
              textAlign: alignX
            }}
            spellCheck={false}
            onDragStart={(e) => e.preventDefault()}
          />
        </div>
      </foreignObject>
    </g>
  );
});

Rhombus.displayName = 'Rhombus';