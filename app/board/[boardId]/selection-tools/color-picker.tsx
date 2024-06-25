"use client";

import { Color, SelectorType } from "@/types/canvas";
import { colorToCss } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";

interface ColorPickerProps {
  onChange: (color: Color) => void;
  handleOpacityChange: (opacity: number[]) => void;
  layers: any;
  openSelector: SelectorType | null;
  setOpenSelector: (Selector: SelectorType | null) => void;
  expandUp: boolean;
};


export const ColorPicker = ({
  onChange,
  handleOpacityChange,
  layers,
  openSelector,
  setOpenSelector,
  expandUp = false
}: ColorPickerProps) => {

  let colorButtonColor = layers[0].fill;

  if (!colorButtonColor) {
    colorButtonColor = { r: 0, g: 0, b: 0, a: 0 };
  }

  const selectorPositionClass = expandUp ? 'bottom-[100%] mb-2' : 'top-[100%] mt-2';
  const opacity = colorButtonColor.a;

  return (
    <div className="relative text-left border-r pr-1.5 border-neutral-200">
      <ColorButton color={colorButtonColor} onClick={() => setOpenSelector(openSelector === SelectorType.Color ? null : SelectorType.Color)} />
      {openSelector === SelectorType.Color && (
        <div
          className={`p-4 origin-top-right absolute right-0 ${selectorPositionClass} w-[190px] translate-x-1/3 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5`}
        >
          <Slider
              defaultValue={[opacity || 1]}
              min={0.1}
              max={1}
              step={0.1}
              onValueChange={handleOpacityChange}
          />
          <div className="grid grid-cols-4 gap-x-2 pt-2" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <ColorButton color={{ r: 0, g: 0, b: 0, a: 0 }} onClick={onChange} />
            <ColorButton color={{ r: 255, g: 255, b: 255, a: 1 }} onClick={onChange} />
            <ColorButton color={{ r: 29, g: 29, b: 29, a: 1 }} onClick={onChange} />
            <ColorButton color={{ r: 159, g: 168, b: 178, a: 1 }} onClick={onChange} />
            <ColorButton color={{ r: 255, g: 240, b: 0, a: 1 }} onClick={onChange} />
            <ColorButton color={{ r: 252, g: 225, b: 156, a: 1 }} onClick={onChange} />
            <ColorButton color={{ r: 225, g: 133, b: 244, a: 1 }} onClick={onChange} />
            <ColorButton color={{ r: 174, g: 62, b: 201, a: 1 }} onClick={onChange} />
            <ColorButton color={{ r: 68, g: 101, b: 233, a: 1 }} onClick={onChange} />
            <ColorButton color={{ r: 75, g: 161, b: 241, a: 1 }} onClick={onChange} />
            <ColorButton color={{ r: 255, g: 165, b: 0, a: 1 }} onClick={onChange} />
            <ColorButton color={{ a: 1, b: 42, g: 142, r: 252 }} onClick={onChange} />
            <ColorButton color={{ r: 7, g: 147, b: 104, a: 1 }} onClick={onChange} />
            <ColorButton color={{ a: 1, b: 99, g: 202, r: 68 }} onClick={onChange} />
            <ColorButton color={{ r: 248, g: 119, b: 119, a: 1 }} onClick={onChange} />
            <ColorButton color={{ r: 224, g: 49, b: 49, a: 1 }} onClick={onChange} />
          </div>
        </div>
      )}
    </div>
  )
};

interface ColorButtonProps {
  onClick: (color: Color) => void;
  color: Color;
  pathColor?: Color;
};

export const ColorButton = ({
  onClick,
  color,
  pathColor
}: ColorButtonProps) => {

  const isSelected = color.r === pathColor?.r && color.g === pathColor?.g && color.b === pathColor?.b && color.a === pathColor?.a;
  return (
    <button
      className="w-8 h-8 my-1 items-center flex justify-center transition"
      onClick={() => onClick(color)}
    >
      <div
        className={`h-7 w-7 rounded-[50%] border relative ${isSelected ? 'border-2 border-custom-blue' : 'border-neutral-300'}`}
        style={{ background: colorToCss(color) }}
      >
        {color.r === 0 && color.g === 0 && color.b === 0 && color.a === 0 && (
          <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 1 1">
          <line x1="0.15" y1="0.15" x2="0.85" y2="0.85" stroke="#d4d4d4" strokeWidth="0.05" />
        </svg>
        )}
      </div>
    </button>
  )
}