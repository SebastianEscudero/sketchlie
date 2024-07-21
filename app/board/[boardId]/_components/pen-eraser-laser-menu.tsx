import { Eraser, Highlighter, Pen } from "lucide-react";
import { ToolButton } from "./tool-button";
import { CanvasMode } from "@/types/canvas";
import { LaserIcon } from "@/public/custom-cursors/laser";

interface PenEraserMenuProps {
    setCanvasState: (state: any) => void;
    canvasState: any;
    setIsPenMenuOpen: (state: boolean) => void;
    isPenMenuOpen: boolean;
}

export const PenEraserMenu = ({
    setCanvasState,
    canvasState,
    setIsPenMenuOpen,
    isPenMenuOpen,
}: PenEraserMenuProps) => {
    return (
        <div className="absolute left-5 bottom-16 p-2 bg-white dark:bg-[#383838] rounded-lg shadow-custom-1 flex flex-row space-x-1 items-center cursor-default">
            <ToolButton
                label={!isPenMenuOpen ? "Pen" : undefined}
                icon={Pen}
                onClick={() => {
                    setCanvasState({
                        mode: CanvasMode.Pencil,
                    });
                    setIsPenMenuOpen(!isPenMenuOpen);
                }}
                isActive={canvasState.mode === CanvasMode.Pencil}
            />
            <ToolButton
                label={!isPenMenuOpen ? "Eraser" : undefined}
                icon={Eraser}
                onClick={() => {
                    setCanvasState({
                        mode: CanvasMode.Eraser,
                    });
                }}
                isActive={canvasState.mode === CanvasMode.Eraser}
            />
            <ToolButton
                label={!isPenMenuOpen ? "Highlighter" : undefined}
                icon={Highlighter}
                onClick={() => {
                    setCanvasState({
                        mode: CanvasMode.Highlighter,
                    });
                    setIsPenMenuOpen(!isPenMenuOpen);
                }}
                isActive={canvasState.mode === CanvasMode.Highlighter}
            />
            <ToolButton
                label={!isPenMenuOpen ? "Laser" : undefined}
                icon={LaserIcon}
                onClick={() => {
                    setCanvasState({
                        mode: CanvasMode.Laser,
                    });
                }}
                isActive={canvasState.mode === CanvasMode.Laser}
            />
        </div>
    )
}