import { Color } from "@/types/canvas";
import { ColorButton } from "../selection-tools/color-picker";
import { AnimatedToolbarMenu } from "./toolbar";

interface PathColorMenuProps {
    onPathColorChange: (color: Color) => void;
    selectedColor: any;
    editingColor: any;
}

export const PathColorMenu: React.FC<PathColorMenuProps> = ({ onPathColorChange, selectedColor, editingColor }) => {
    return (
        <AnimatedToolbarMenu isOpen={true} className="right-0 top-16 flex flex-col items-center cursor-default">
            <div className="grid grid-cols-8 gap-x-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                <ColorButton color={{ r: 0, g: 0, b: 0, a: 1 }} onClick={onPathColorChange} selectedColor={editingColor} />
                <ColorButton color={{ r: 255, g: 255, b: 255, a: 1 }} onClick={onPathColorChange} selectedColor={editingColor} />
                <ColorButton color={{ r: 29, g: 29, b: 29, a: 1 }} onClick={onPathColorChange} selectedColor={editingColor} />
                <ColorButton color={{ r: 159, g: 168, b: 178, a: 1 }} onClick={onPathColorChange} selectedColor={editingColor} />
                <ColorButton color={{ r: 255, g: 240, b: 0, a: 1 }} onClick={onPathColorChange} selectedColor={editingColor} />
                <ColorButton color={{ r: 252, g: 225, b: 156, a: 1 }} onClick={onPathColorChange} selectedColor={editingColor} />
                <ColorButton color={{ r: 225, g: 133, b: 244, a: 1 }} onClick={onPathColorChange} selectedColor={editingColor} />
                <ColorButton color={{ r: 174, g: 62, b: 201, a: 1 }} onClick={onPathColorChange} selectedColor={editingColor} />
                <ColorButton color={{ r: 68, g: 101, b: 233, a: 1 }} onClick={onPathColorChange} selectedColor={editingColor} />
                <ColorButton color={{ r: 75, g: 161, b: 241, a: 1 }} onClick={onPathColorChange} selectedColor={editingColor} />
                <ColorButton color={{ r: 255, g: 165, b: 0, a: 1 }} onClick={onPathColorChange} selectedColor={editingColor} />
                <ColorButton color={{ a: 1, b: 42, g: 142, r: 252 }} onClick={onPathColorChange} selectedColor={editingColor} />
                <ColorButton color={{ r: 7, g: 147, b: 104, a: 1 }} onClick={onPathColorChange} selectedColor={editingColor} />
                <ColorButton color={{ a: 1, b: 99, g: 202, r: 68 }} onClick={onPathColorChange} selectedColor={editingColor} />
                <ColorButton color={{ r: 248, g: 119, b: 119, a: 1 }} onClick={onPathColorChange} selectedColor={editingColor} />
                <ColorButton color={{ r: 224, g: 49, b: 49, a: 1 }} onClick={onPathColorChange} selectedColor={editingColor} />
            </div>
        </AnimatedToolbarMenu>
    )
};