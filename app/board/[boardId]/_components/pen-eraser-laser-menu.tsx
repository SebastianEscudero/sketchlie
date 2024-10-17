import { Eraser, Highlighter, Pen } from "lucide-react";
import { CanvasMode, Color } from "@/types/canvas";
import { LaserIcon } from "@/public/custom-icons/laser";
import { Slider } from "@/components/ui/slider";
import { ColorButton } from "../selection-tools/color-picker";
import { SmallToolButton } from "./tool-button";
import { AnimatedToolbarMenu } from "./toolbar";

interface PenEraserLaserMenuProps {
    setCanvasState: (state: any) => void;
    canvasState: any;
    pathColor: Color;
    pathStrokeSize: number;
    onPathColorChange: (color: Color) => void;
    handleStrokeSizeChange: (value: number[]) => void;
    isPenEraserLaserMenuOpen: boolean;
}

export const PenEraserLaserMenu = ({
    setCanvasState,
    canvasState,
    pathColor,
    pathStrokeSize,
    onPathColorChange,
    handleStrokeSizeChange,
    isPenEraserLaserMenuOpen,
}: PenEraserLaserMenuProps) => {
    return (
        <AnimatedToolbarMenu
            isOpen={isPenEraserLaserMenuOpen}
            className="left-5 bottom-16 flex flex-col items-center cursor-default pt-3"
        >
            <div className="flex flex-row space-x-1 pb-1 items-center border-b dark:border-zinc-300">
                <SmallToolButton
                    label="Pen"
                    icon={Pen}
                    onClick={() => setCanvasState({ mode: CanvasMode.Pencil })}
                    isActive={canvasState.mode === CanvasMode.Pencil}
                />
                <SmallToolButton
                    label="Eraser"
                    icon={Eraser}
                    onClick={() => setCanvasState({ mode: CanvasMode.Eraser })}
                    isActive={canvasState.mode === CanvasMode.Eraser}
                />
                <SmallToolButton
                    label="Highlighter"
                    icon={Highlighter}
                    onClick={() => setCanvasState({ mode: CanvasMode.Highlighter })}
                    isActive={canvasState.mode === CanvasMode.Highlighter}
                />
                <SmallToolButton
                    label="Laser"
                    icon={LaserIcon}
                    onClick={() => setCanvasState({ mode: CanvasMode.Laser })}
                    isActive={canvasState.mode === CanvasMode.Laser}
                />
            </div>
            <div className="p-1 pt-3 pb-0 w-[150px] flex flex-col items-center">
                <Slider
                    defaultValue={[pathStrokeSize]}
                    min={1}
                    max={8}
                    step={1}
                    className='bg-white dark:bg-[#383838] w-[90%] cursor-pointer'
                    onValueChange={handleStrokeSizeChange}
                />
                <div className="grid grid-cols-4 gap-x-1 pt-2" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    <ColorButton color={{ r: 0, g: 0, b: 0, a: 0 }} onClick={onPathColorChange} selectedColor={pathColor} />
                    <ColorButton color={{ r: 255, g: 255, b: 255, a: 1 }} onClick={onPathColorChange} selectedColor={pathColor} />
                    <ColorButton color={{ r: 29, g: 29, b: 29, a: 1 }} onClick={onPathColorChange} selectedColor={pathColor} />
                    <ColorButton color={{ r: 159, g: 168, b: 178, a: 1 }} onClick={onPathColorChange} selectedColor={pathColor} />
                    <ColorButton color={{ r: 255, g: 240, b: 0, a: 1 }} onClick={onPathColorChange} selectedColor={pathColor} />
                    <ColorButton color={{ r: 252, g: 225, b: 156, a: 1 }} onClick={onPathColorChange} selectedColor={pathColor} />
                    <ColorButton color={{ r: 225, g: 133, b: 244, a: 1 }} onClick={onPathColorChange} selectedColor={pathColor} />
                    <ColorButton color={{ r: 174, g: 62, b: 201, a: 1 }} onClick={onPathColorChange} selectedColor={pathColor} />
                    <ColorButton color={{ r: 68, g: 101, b: 233, a: 1 }} onClick={onPathColorChange} selectedColor={pathColor} />
                    <ColorButton color={{ r: 75, g: 161, b: 241, a: 1 }} onClick={onPathColorChange} selectedColor={pathColor} />
                    <ColorButton color={{ r: 255, g: 165, b: 0, a: 1 }} onClick={onPathColorChange} selectedColor={pathColor} />
                    <ColorButton color={{ a: 1, b: 42, g: 142, r: 252 }} onClick={onPathColorChange} selectedColor={pathColor} />
                    <ColorButton color={{ r: 7, g: 147, b: 104, a: 1 }} onClick={onPathColorChange} selectedColor={pathColor} />
                    <ColorButton color={{ a: 1, b: 99, g: 202, r: 68 }} onClick={onPathColorChange} selectedColor={pathColor} />
                    <ColorButton color={{ r: 248, g: 119, b: 119, a: 1 }} onClick={onPathColorChange} selectedColor={pathColor} />
                    <ColorButton color={{ r: 224, g: 49, b: 49, a: 1 }} onClick={onPathColorChange} selectedColor={pathColor} />
                </div>
            </div>
        </AnimatedToolbarMenu>
    )
}
