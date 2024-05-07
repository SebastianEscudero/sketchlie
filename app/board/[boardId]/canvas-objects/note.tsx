import { Kalam } from "next/font/google";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";

import { LayerType, NoteLayer, UpdateLayerMutation } from "@/types/canvas";
import { cn, colorToCss, getContrastingTextColor } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useRoom } from "@/components/room";
import { throttle } from "lodash";

const font = Kalam({
  subsets: ["latin"],
  weight: ["400"],
});

const calculateFontSize = (width: number, height: number) => {
  const maxFontSize = 96;
  const scaleFactor = 0.15;
  const fontSizeBasedOnHeight = height * scaleFactor;
  const fontSizeBasedOnWidth = width * scaleFactor;

  return Math.min(
    fontSizeBasedOnHeight, 
    fontSizeBasedOnWidth, 
    maxFontSize
  );
}

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
  const { x, y, width, height, fill, value: initialValue } = layer;
  const [value, setValue] = useState(initialValue);
  const { liveLayers, socket, board } = useRoom();
  const fillColor = colorToCss(fill);
  const isTransparent = fillColor === 'rgba(0,0,0,0)';

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
        outline: `${selectionColor || (isTransparent ? "#000" : "transparent")} 1px solid`,
        backgroundColor: fillColor,
      }}
      className="shadow-md drop-shadow-xl"
    >
      <ContentEditable
        html={value || "Text"}
        onChange={handleContentChange}
        onPaste={handlePaste}
        className={cn(
          "h-full w-full flex items-center justify-center text-center outline-none",
          font.className
        )}
        style={{
          fontSize: calculateFontSize(width, height),
          color: fill ? getContrastingTextColor(fill) : "#000",
          textWrap: "wrap",
        }}
        spellCheck={false}
      />
    </foreignObject>
  );
};