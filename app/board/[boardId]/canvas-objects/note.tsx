import { Kalam } from "next/font/google";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";

import { LayerType, NoteLayer, UpdateLayerMutation } from "@/types/canvas";
import { cn, colorToCss, getContrastingTextColor } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";
import { useRoom } from "@/components/room";
import { throttle } from "lodash";

const font = Kalam({
  subsets: ["latin"],
  weight: ["400"],
});

interface NoteProps {
  id: string;
  layer: NoteLayer;
  onPointerDown?: (e: any, id: string) => void;
  selectionColor?: string;
  updateLayer?: UpdateLayerMutation;
  expired?: boolean;
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

export const Note = ({
  layer,
  onPointerDown,
  id,
  selectionColor,
  updateLayer,
  onRefChange
}: NoteProps) => {
  const noteRef = useRef<any>(null);
  const { x, y, width, height, fill, outlineFill, value: initialValue, textFontSize } = layer;
  const [value, setValue] = useState(initialValue);
  const { liveLayers, socket, board, expired } = useRoom();
  const fillColor = colorToCss(fill);

  useEffect(() => {
    if (liveLayers[id] && liveLayers[id].type === LayerType.Note) {
      const noteLayer = liveLayers[id] as NoteLayer;
      setValue(noteLayer.value);
    }
  }, [id, liveLayers]);

  const updateValue = (newValue: string) => {
    if (liveLayers[id] && liveLayers[id].type === LayerType.Note) {
      const noteLayer = liveLayers[id] as NoteLayer;
      noteLayer.value = newValue;
      setValue(newValue);
      if (expired !== true) {
        throttledUpdateLayer(updateLayer, socket, board._id, id, liveLayers[id]);
      }
    }
  };

  const handlePointerDown = (e: React.PointerEvent) => {
      e.preventDefault();
      if (onPointerDown) onPointerDown(e, id);
      if (onRefChange) {
        onRefChange(noteRef);
    }
  };

  const handleOnTouchDown = (e: React.TouchEvent) => {
    e.preventDefault();
    if (e.touches.length > 1) {
      return;
    }
    if (onPointerDown) {
      onPointerDown(e, id);
    }
    if (onRefChange) {
      onRefChange(noteRef);
    }
  }

  const handleContentChange = (e: ContentEditableEvent) => {
    updateValue(e.target.value);
  };

  const handlePaste = async (e: React.ClipboardEvent) => {
    e.preventDefault();
    const text = await navigator.clipboard.readText();
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      range.deleteContents();
      range.insertNode(document.createTextNode(text));
    }
  };

  useEffect(() => {
    if (noteRef.current) {
        noteRef.current.focus();
    }
}, []);

  if (!fill) {
    return null;
  }

  return (
    <foreignObject
      x={x}
      y={y}
      width={width}
      height={height}
      onPointerMove={(e) => {
        if (e.buttons === 1) {
            handlePointerDown(e);
        }
    }}
      strokeWidth={2}
      onPointerDown={(e) => handlePointerDown(e)}
      onTouchStart={(e) => handleOnTouchDown(e)}
      style={{
        borderColor: `${selectionColor || colorToCss(outlineFill || fill)}`,
        backgroundColor: fillColor,
      }}
      className="drop-shadow-lg flex items-center justify-center border-[2px] border-spacing-3"
    >
      <ContentEditable
        innerRef={noteRef}
        html={value || ""}
        onChange={handleContentChange}
        onPaste={handlePaste}
        className={cn(
          "h-full w-full flex items-center justify-center text-center outline-none",
          font.className
        )}
        style={{
          fontSize: textFontSize,
          color: fill ? getContrastingTextColor(fill) : "#000",
          textWrap: "wrap",
          lineHeight: value ? 'normal' : `${height}px`,
          WebkitUserSelect: 'auto'
        }}
        spellCheck={false}
        disabled={expired}
      />
    </foreignObject>
  );
};