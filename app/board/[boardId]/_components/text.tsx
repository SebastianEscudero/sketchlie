import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { TextLayer } from "@/types/canvas";
import { colorToCss } from "@/lib/utils";
import { useMutation } from "@/liveblocks.config";

// const calculateFontSize = (width: number, height: number) => {
//     const scaleFactor = 0.3;
//     const fontSizeBasedOnHeight = height * scaleFactor;
  
//     return Math.min(
//       fontSizeBasedOnHeight, 
//     );
//   }

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
        const layer = liveLayers.get(id);
        layer?.set("value", newValue);
    }, []);

    const updateHeight = useMutation((
        { storage },
        newHeight: number,
    ) => {
        const liveLayers = storage.get("layers");
        const layer = liveLayers.get(id);
        layer?.update({ height: newHeight })
    }, []);

    const handleContentChange = (e: ContentEditableEvent) => {
        updateValue(e.target.value);
        updateHeight(e.currentTarget.scrollHeight);
    };

    function handleKeyDown(e: React.KeyboardEvent) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            const selection = document.getSelection();
            if (selection && selection.rangeCount > 0) {
                const range = selection.getRangeAt(0);
                const br = document.createElement('br');
                range.insertNode(br);
                range.setStartAfter(br);
                range.setEndAfter(br);
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
            style={{
                outline: selectionColor ? `1px solid ${selectionColor}` : "none",
            }}
            onPointerDown={(e) => onPointerDown(e, id)}
        >
            <ContentEditable
                html={value || "Text"}
                onChange={handleContentChange}
                onPaste={handlePaste}
                onKeyDown={handleKeyDown}
                className="outline-none w-full h-full text-center justify-center items-center flex"
                style={{
                    fontSize: 25,
                    color: colorToCss(fill) === "transparent" ? "#000" : colorToCss(fill),
                    wordWrap: 'break-word',
                    overflowWrap: 'break-word',
                    wordBreak: 'break-all',
                    display: 'flex',
                    minHeight: 100,
                }}
                spellCheck={false}
            />
        </foreignObject>
    );
};