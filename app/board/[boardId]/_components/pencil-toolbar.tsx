import { CanvasMode, Color, ToolbarMenu } from "@/types/canvas";
import { Pen, Eraser, Highlighter, ChevronDown, Undo2, Redo2 } from "lucide-react";
import { CanvasState } from "@/types/canvas";
import { SmallToolButton } from "./tool-button";
import { LaserIcon } from "@/public/custom-icons/laser";
import { ToolbarSeparator } from "./selection-tools";
import { Button } from "@/components/ui/button";
import { memo, useEffect, useState } from "react";
import { colorToCss } from "@/lib/utils";
import { ScribbleIcon } from "@/public/custom-icons/scribble";
import { PathColorMenu } from "./path-color-menu";
import { PathStrokeSizeMenu } from "./path-stroke-size-menu";
import { Hint } from "@/components/hint";

interface PencilToolbarProps {
    setCanvasState: (state: CanvasState) => void;
    canvasState: CanvasState;
    highlighterColor: Color;
    setHighlighterColor: (color: Color) => void;
    pathColor: Color;
    setPathColor: (color: Color) => void;
    pathStrokeSize: number;
    setPathStrokeSize: (size: number) => void;
    toolbarMenu: ToolbarMenu;
    setToolbarMenu: (menu: ToolbarMenu) => void;
    highlighterStrokeSize: number;
    setHighlighterStrokeSize: (size: number) => void;
    undo: () => void;
    redo: () => void;
    canUndo: boolean;
    canRedo: boolean;
}

export const PencilToolbar = memo(({
    setCanvasState,
    canvasState,
    highlighterColor,
    setHighlighterColor,
    pathColor,
    setPathColor,
    pathStrokeSize,
    setPathStrokeSize,
    toolbarMenu,
    setToolbarMenu,
    highlighterStrokeSize,
    setHighlighterStrokeSize,
    undo,
    redo,
    canUndo,
    canRedo
}: PencilToolbarProps) => {
    const [pencilPresetColors, setPencilPresetColors] = useState<Color[]>([
        { r: 29, g: 29, b: 29, a: 1 },
        { r: 68, g: 101, b: 233, a: 1 },
        { r: 224, g: 49, b: 49, a: 1 }
    ]);

    const [highlighterPresetColors, setHighlighterPresetColors] = useState<Color[]>([
        { r: 255, g: 240, b: 0, a: 1 },
        { r: 7, g: 147, b: 104, a: 1 },
        { r: 75, g: 161, b: 241, a: 1 }
    ]);

    const [editingPresetIndex, setEditingPresetIndex] = useState<number | null>(null);

    useEffect(() => {
        setToolbarMenu(ToolbarMenu.None);
    }, [canvasState.mode, setToolbarMenu]);


    const onPathColorChange = (color: Color) => {
        if (canvasState.mode === CanvasMode.Pencil) {
            setPathColor(color);
        } else if (canvasState.mode === CanvasMode.Highlighter) {
            setHighlighterColor(color);
        }
    }

    const handleStrokeSizeChange = (value: number) => {
        if (canvasState.mode === CanvasMode.Pencil) {
            setPathStrokeSize(value);
        } else if (canvasState.mode === CanvasMode.Highlighter) {
            setHighlighterStrokeSize(value * 10);
        }
    }

    const strokeSizeButtonPointerDown = () => {
        if (canvasState.mode !== CanvasMode.Pencil && canvasState.mode !== CanvasMode.Highlighter) {
            return;
        }

        toolbarMenu !== ToolbarMenu.PathStrokeSize ? setToolbarMenu(ToolbarMenu.PathStrokeSize) : setToolbarMenu(ToolbarMenu.None);
    }

    const selectedColor = () => {
        if (canvasState.mode === CanvasMode.Pencil) {
            return pathColor;
        } else if (canvasState.mode === CanvasMode.Highlighter) {
            return highlighterColor;
        }
    }

    const selectedStrokeSize = () => {
        if (canvasState.mode === CanvasMode.Pencil) {
            return pathStrokeSize;
        } else if (canvasState.mode === CanvasMode.Highlighter) {
            return highlighterStrokeSize / 10;
        }
    }

    const handlePresetColorClick = (color: Color) => {
        onPathColorChange(color);
        setToolbarMenu(ToolbarMenu.None);
    };

    const handlePresetChevronClick = (index: number) => {
        if (toolbarMenu === ToolbarMenu.PathColor && editingPresetIndex === index) {
            setToolbarMenu(ToolbarMenu.None);
        } else {
            setEditingPresetIndex(index);
            setToolbarMenu(ToolbarMenu.PathColor);
        }
    };

    const currentPresetColors = () => {
        return canvasState.mode === CanvasMode.Pencil 
            ? pencilPresetColors 
            : highlighterPresetColors;
    };

    const setCurrentPresetColors = (colors: Color[]) => {
        if (canvasState.mode === CanvasMode.Pencil) {
            setPencilPresetColors(colors);
        } else {
            setHighlighterPresetColors(colors);
        }
    };

    return (
        <div
            className={`
            absolute top-2 left-[50%] translate-x-[-50%] flex flex-row gap-x-4 pointer-events-auto
            transition-all duration-300 ease-in-out
        `}
        >
            <div className="border dark:border-zinc-800 shadow-sm bg-white dark:bg-zinc-800 rounded-xl py-1.5 px-2 flex gap-x-1 flex-row items-center">
                <SmallToolButton
                    label="Undo"
                    icon={Undo2}
                    onClick={undo}
                    disabled={!canUndo}
                />
                <SmallToolButton
                    label="Redo"
                    icon={Redo2}
                    onClick={redo}
                    disabled={!canRedo}
                />
                <ToolbarSeparator />
                <SmallToolButton
                    label="Pencil"
                    icon={Pen}
                    onClick={() => setCanvasState({ mode: CanvasMode.Pencil })}
                    isActive={canvasState.mode === CanvasMode.Pencil}
                />
                <SmallToolButton
                    label="Highlighter"
                    icon={Highlighter}
                    onClick={() => setCanvasState({ mode: CanvasMode.Highlighter })}
                    isActive={canvasState.mode === CanvasMode.Highlighter}
                />
                <SmallToolButton
                    label="Eraser"
                    icon={Eraser}
                    onClick={() => setCanvasState({ mode: CanvasMode.Eraser })}
                    isActive={canvasState.mode === CanvasMode.Eraser}
                />
                <SmallToolButton
                    label="Laser"
                    icon={LaserIcon}
                    onClick={() => setCanvasState({ mode: CanvasMode.Laser })}
                    isActive={canvasState.mode === CanvasMode.Laser}
                />
                <ToolbarSeparator />
                <SmallToolButton
                    label="Stroke size"
                    icon={ScribbleIcon}
                    onClick={strokeSizeButtonPointerDown}
                    isActive={toolbarMenu === ToolbarMenu.PathStrokeSize}
                />
                <div className="flex items-center gap-x-1">
                    {currentPresetColors().map((color, index) => (
                        <div key={index} className="relative group">
                            <Button
                                variant={areColorsEqual(selectedColor()!, color) ? "iconActive" : "icon"}
                                className="h-8 w-8 p-1.2 rounded-full"
                                onClick={() => handlePresetColorClick(color)}
                            >
                                <div
                                    className="w-5 h-5 border border-zinc-600 dark:border-zinc-200 rounded-full group-hover:opacity-90"
                                    style={{ backgroundColor: colorToCss(color) }}
                                />
                                <div 
                                    className="border-2 absolute right-0 bottom-0 w-3 h-3 bg-white dark:bg-zinc-800 rounded-full flex items-center justify-center cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-700"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handlePresetChevronClick(index);
                                    }}
                                >
                                    <ChevronDown className="h-2 w-2" />
                                </div>
                            </Button>
                        </div>
                    ))}
                </div>
                <Button
                    variant="destructive"
                    size="sm"
                    className="px-3 h-8"
                    onClick={() => setCanvasState({ mode: CanvasMode.None })}
                >
                    Done drawing
                </Button>
            </div>
            {toolbarMenu === ToolbarMenu.PathColor && (
                <PathColorMenu
                    onPathColorChange={(color: Color) => {
                        if (editingPresetIndex !== null) {
                            const newPresetColors = [...currentPresetColors()];
                            newPresetColors[editingPresetIndex] = color;
                            setCurrentPresetColors(newPresetColors);
                            onPathColorChange(color);
                        }
                    }}
                    selectedColor={selectedColor()}
                    editingColor={editingPresetIndex !== null ? currentPresetColors()[editingPresetIndex] : selectedColor()}
                />
            )}
            {toolbarMenu === ToolbarMenu.PathStrokeSize && (
                <PathStrokeSizeMenu
                    onPathStrokeSizeChange={handleStrokeSizeChange}
                    selectedStrokeSize={selectedStrokeSize()}
                />
            )}
        </div>
    )
});

PencilToolbar.displayName = 'PencilToolbar';

const areColorsEqual = (color1: Color, color2: Color): boolean => {
    if (!color1 || !color2) {
        return false;
    }

    return color1.r === color2.r && 
           color1.g === color2.g && 
           color1.b === color2.b && 
           color1.a === color2.a;
};

