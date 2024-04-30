import { Kalam } from "next/font/google";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";

import { NoteLayer, UpdateLayerMutation } from "@/types/canvas";
import { cn, colorToCss, getContrastingTextColor } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useRoom } from "@/components/room";
import { debounce } from "lodash";

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
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
  updateLayer: UpdateLayerMutation;
};

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

  useEffect(() => {
    setValue(liveLayers[id]?.value);
  }, [id, liveLayers]);
  
  const updateValue = (newValue: string) => {
    if (liveLayers[id]) {
      liveLayers[id].value = newValue;
      setValue(newValue);
    }

    updateLayer({
      boardId: board._id,
      layerId: id,
      layerUpdates: liveLayers[id]
    });

    if (socket) {
      socket.emit('layer-update', id, liveLayers[id]);
    }

  };

  const handleContentChange = (e: ContentEditableEvent) => {
    updateValue(e.target.value);
  };

  const debouncedHandleContentChange = debounce(handleContentChange, 500);

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
      onPointerDown={(e) => onPointerDown(e, id)}
      style={{
          outline: selectionColor ? `1px solid ${selectionColor}` : (colorToCss(fill) === "transparent" ? "1px solid #000" : "1px solid transparent"),
          backgroundColor: fill ? colorToCss(fill) : "#000",
      }}
    >
      <ContentEditable
        html={value || "Text"}
        onChange={debouncedHandleContentChange}
        onPaste={handlePaste}
        className={cn(
          "h-full w-full flex items-center justify-center text-center outline-none",
          font.className
        )}
        style={{
          fontSize: calculateFontSize(width, height),
          color: fill ? getContrastingTextColor(fill) : "#000",
        }}
        spellCheck={false}
      />
    </foreignObject>
  );
};