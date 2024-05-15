import { Kalam } from "next/font/google";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";

import { LayerType, NoteLayer, UpdateLayerMutation } from "@/types/canvas";
import { cn, colorToCss, getContrastingTextColor } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { useRoom } from "@/components/room";
import { throttle } from "lodash";

const font = Kalam({
  subsets: ["latin"],
  weight: ["400"],
});

interface NoteProps {
  id: string;
  layer: NoteLayer;
  onPointerDown?: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
  updateLayer?: UpdateLayerMutation;
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
}: NoteProps) => {
  const noteRef = useRef<any>(null);
  const { x, y, width, height, fill, outlineFill, value: initialValue, textFontSize } = layer;
  const [value, setValue] = useState(initialValue);
  const { liveLayers, socket, board } = useRoom();
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
      throttledUpdateLayer(updateLayer, socket, board._id, id, liveLayers[id]);
    }
  };

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
      onPointerDown={onPointerDown ? (e) => onPointerDown(e, id) : undefined}
      style={{
        borderColor: `${selectionColor || colorToCss(outlineFill || fill)}`,
        backgroundColor: fillColor,
        boxShadow: '0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06)',
      }}
      className="shadow-md flex items-center justify-center border-[1.5px] border-spacing-3"
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
      />
    </foreignObject>
  );
};