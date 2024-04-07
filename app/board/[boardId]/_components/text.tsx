import ContentEditable, { ContentEditableEvent } from "react-contenteditable";

import { TextLayer } from "@/types/canvas";
import { cn, colorToCss } from "@/lib/utils";
import { useMutation } from "@/liveblocks.config";
import { Kalam } from "next/font/google";

const calculateFontSize = (width: number, height: number) => {
  const maxFontSize = 64;
  const scaleFactor = 0.5;
  const fontSizeBasedOnHeight = height * scaleFactor;
  const fontSizeBasedOnWidth = width * scaleFactor;

  return Math.min(
    fontSizeBasedOnHeight, 
    fontSizeBasedOnWidth, 
    maxFontSize
  );
}

const font = Kalam({
  subsets: ["latin"],
  weight: ["400"],
});

interface TextProps {
  id: string;
  layer: TextLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
};

export const Text = ({
  layer,
  onPointerDown,
  id,
  selectionColor,
}: TextProps) => {
  
  const { x, y, width, height, fill, value } = layer;

  const updateValue = useMutation((
    { storage },
    newValue: string,
  ) => {
    const liveLayers = storage.get("layers");

    liveLayers.get(id)?.set("value", newValue);
  }, []);

  const handleContentChange = (e: ContentEditableEvent) => {
    updateValue(e.target.value);
  };

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      // Get the current selection
      const selection = document.getSelection();
      if (selection && selection.rangeCount > 0) {
        // Get the first range of the selection
        const range = selection.getRangeAt(0);
        // Create a new line break node
        const br = document.createElement('br');
        // Insert the line break node at the current position
        range.insertNode(br);
        // Move the cursor after the line break node
        range.setStartAfter(br);
        range.setEndAfter(br);
        // Update the selection with the new range
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  }

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
        outline: selectionColor ? `1px solid ${selectionColor}` : "none"
      }}
    >
      <ContentEditable
        html={value || "Text"}
        onChange={handleContentChange}
        onPaste={handlePaste}
        onKeyDown={handleKeyDown}
        className={cn(
          "h-full w-full flex items-center justify-center text-center outline-none overflow-visible",
          font.className
          )}
        style={{
          fontSize: calculateFontSize(width, height),
          color: colorToCss(fill) === "transparent" ? "#000" : colorToCss(fill),
        }}
        spellCheck={false}
      />
      
    </foreignObject>
  );
};