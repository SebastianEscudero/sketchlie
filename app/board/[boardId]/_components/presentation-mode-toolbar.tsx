import { Button } from "@/components/ui/button";
import { Hint } from "@/components/hint";
import { ToolButton } from "./tool-button";
import { MousePointer2, Pen, StickyNote, Undo2, Redo2, ChevronLeft, ChevronRight } from "lucide-react";
import { LaserIcon } from "@/public/custom-icons/laser";
import { CanvasMode, CanvasState, LayerType } from "@/types/canvas";

interface PresentationModeToolbarProps {
    setPresentationMode: (mode: boolean) => void;
    setCanvasState: (newState: CanvasState) => void;
    canvasState: CanvasState;
    undo: () => void;
    redo: () => void;
    canUndo: boolean;
    canRedo: boolean;
    frameIds: string[];
    currentFrameIndex: number;
    goToFrame: (index: number) => void;
    showToolbar: boolean;
}

export const PresentationModeToolbar = ({
    setPresentationMode,
    setCanvasState,
    canvasState,
    undo,
    redo,
    canUndo,
    canRedo,
    frameIds,
    currentFrameIndex,
    goToFrame,
    showToolbar
}: PresentationModeToolbarProps) => {
    return (
        <div
            className={`
            absolute bottom-4 left-[50%] translate-x-[-50%] flex flex-row gap-x-4 pointer-events-auto
            transition-all duration-300 ease-in-out
            ${showToolbar ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
        `}
        >
            <div className="border dark:border-zinc-800 shadow-md bg-white dark:bg-zinc-800 rounded-xl p-1.5 flex gap-x-1 flex-row items-center">
                <ToolButton
                    label="Select"
                    icon={MousePointer2}
                    onClick={() => setCanvasState({ mode: CanvasMode.None })}
                    isActive={canvasState.mode === CanvasMode.None}
                />
                <ToolButton
                    label="Pencil"
                    icon={Pen}
                    onClick={() => setCanvasState({ mode: CanvasMode.Pencil })}
                    isActive={canvasState.mode === CanvasMode.Pencil}
                />
                <ToolButton
                    label="Sticky Note"
                    icon={StickyNote}
                    onClick={() => setCanvasState({
                        mode: CanvasMode.Inserting,
                        layerType: LayerType.Note
                    })}
                    isActive={
                        canvasState.mode === CanvasMode.Inserting &&
                        canvasState.layerType === LayerType.Note
                    }
                />
                <ToolButton
                    label="Laser"
                    icon={LaserIcon}
                    onClick={() => setCanvasState({ mode: CanvasMode.Laser })}
                    isActive={canvasState.mode === CanvasMode.Laser}
                />
                <div className="flex items-center gap-x-2 ml-2">
                    <Hint label="Previous Frame" sideOffset={14}>
                        <Button
                            onClick={() => goToFrame(currentFrameIndex - 1)}
                            disabled={currentFrameIndex === 0}
                            size="sm"
                            variant="ghost"
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                    </Hint>
                    <span className="text-sm font-medium">
                        {currentFrameIndex + 1}/{frameIds.length}
                    </span>
                    <Hint label="Next Frame" sideOffset={14}>
                        <Button
                            onClick={() => goToFrame(currentFrameIndex + 1)}
                            disabled={currentFrameIndex === frameIds.length - 1}
                            size="sm"
                            variant="ghost"
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </Hint>
                </div>
                <Hint label="Exit Presentation" sideOffset={14}>
                    <Button
                        onClick={() => setPresentationMode(false)}
                        variant="destructive"
                        size="sm"
                    >
                        Stop
                    </Button>
                </Hint>
            </div>
            <div className="border dark:border-zinc-800 shadow-md bg-white dark:bg-zinc-800 rounded-xl p-1.5 flex flex-row items-center">
                <Hint label="Undo" sideOffset={14}>
                    <Button
                        disabled={!canUndo}
                        onClick={undo}
                        className="h-10 w-10 p-2"
                        variant="ghost"
                    >
                        <Undo2 className="h-5 w-5" />
                    </Button>
                </Hint>
                <Hint label="Redo" sideOffset={14}>
                    <Button
                        disabled={!canRedo}
                        onClick={redo}
                        className="h-10 w-10 p-2"
                        variant="ghost"
                    >
                        <Redo2 className="h-5 w-5" />
                    </Button>
                </Hint>
            </div>
        </div>
    )
}