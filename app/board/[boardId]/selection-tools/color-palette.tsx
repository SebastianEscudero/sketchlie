import { Color } from "@/types/canvas";
import { ColorButton } from "./color-picker";

interface ColorPaletteProps {
  onColorSelect: (color: Color) => void;
  selectedColor: Color;
  className?: string;
}

const colorPalette: Color[] = [
  { r: 0, g: 0, b: 0, a: 0 },
  { r: 255, g: 255, b: 255, a: 1 },
  { r: 29, g: 29, b: 29, a: 1 },
  { r: 159, g: 168, b: 178, a: 1 },
  { r: 255, g: 240, b: 0, a: 1 },
  { r: 252, g: 225, b: 156, a: 1 },
  { r: 225, g: 133, b: 244, a: 1 },
  { r: 174, g: 62, b: 201, a: 1 },
  { r: 68, g: 101, b: 233, a: 1 },
  { r: 75, g: 161, b: 241, a: 1 },
  { r: 255, g: 165, b: 0, a: 1 },
  { r: 252, g: 142, b: 42, a: 1 },
  { r: 7, g: 147, b: 104, a: 1 },
  { r: 68, g: 202, b: 99, a: 1 },
  { r: 248, g: 119, b: 119, a: 1 },
  { r: 224, g: 49, b: 49, a: 1 }
];

export const ColorPalette = ({ onColorSelect, selectedColor, className = "" }: ColorPaletteProps) => {
  return (
    <div className={`p-3 pb-2 grid grid-cols-4 gap-x-1 ${className}`}>
      {colorPalette.map((color, index) => (
        <ColorButton
          key={index}
          color={color}
          onClick={onColorSelect}
          selectedColor={selectedColor}
        />
      ))}
    </div>
  );
};
