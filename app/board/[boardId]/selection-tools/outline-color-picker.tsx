"use client";

import { Color, SelectorType } from "@/types/canvas";
import { colorToCss } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import { ColorButton } from "./color-picker";
import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";

interface OutlineColorPickerProps {
  onChange: (color: Color) => void;
  handleOpacityChange: (opacity: number[]) => void;
  layers: any;
  openSelector: SelectorType | null;
  setOpenSelector: (Selector: SelectorType | null) => void;
};


export const OutlineColorPicker = ({
  onChange,
  handleOpacityChange,
  layers,
  openSelector,
  setOpenSelector,
}: OutlineColorPickerProps) => {

  let colorButtonColor = layers[0].outlineFill;

  if (!colorButtonColor) {
    colorButtonColor = { r: 0, g: 0, b: 0, a: 0 };
  }

  const opacity = colorButtonColor.a;

  return (
    <div className="relative text-left">
      <OutlineColorButton color={colorButtonColor} onClick={() => setOpenSelector(openSelector === SelectorType.OutlineColor ? null : SelectorType.OutlineColor)} />
      {openSelector === SelectorType.OutlineColor && (
        <div
          className={`p-3 pt-5 pb-2 origin-top-right absolute right-0 top-full mt-2 w-[165px] translate-x-1/3 rounded-lg shadow-sm bg-white dark:bg-zinc-800`}
        >
          <Slider
            defaultValue={[opacity || 1]}
            min={0.1}
            max={1}
            step={0.1}
            onValueChange={handleOpacityChange}
          />
          <div className="grid grid-cols-4 gap-x-1 pt-2" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <ColorButton color={{ r: 0, g: 0, b: 0, a: 0 }} onClick={onChange} selectedColor={colorButtonColor} />
            <ColorButton color={{ r: 255, g: 255, b: 255, a: 1 }} onClick={onChange} selectedColor={colorButtonColor} />
            <ColorButton color={{ r: 29, g: 29, b: 29, a: 1 }} onClick={onChange} selectedColor={colorButtonColor} />
            <ColorButton color={{ r: 159, g: 168, b: 178, a: 1 }} onClick={onChange} selectedColor={colorButtonColor} />
            <ColorButton color={{ r: 255, g: 240, b: 0, a: 1 }} onClick={onChange} selectedColor={colorButtonColor} />
            <ColorButton color={{ r: 252, g: 225, b: 156, a: 1 }} onClick={onChange} selectedColor={colorButtonColor} />
            <ColorButton color={{ r: 225, g: 133, b: 244, a: 1 }} onClick={onChange} selectedColor={colorButtonColor} />
            <ColorButton color={{ r: 174, g: 62, b: 201, a: 1 }} onClick={onChange} selectedColor={colorButtonColor} />
            <ColorButton color={{ r: 68, g: 101, b: 233, a: 1 }} onClick={onChange} selectedColor={colorButtonColor} />
            <ColorButton color={{ r: 75, g: 161, b: 241, a: 1 }} onClick={onChange} selectedColor={colorButtonColor} />
            <ColorButton color={{ r: 255, g: 165, b: 0, a: 1 }} onClick={onChange} selectedColor={colorButtonColor} />
            <ColorButton color={{ a: 1, b: 42, g: 142, r: 252 }} onClick={onChange} selectedColor={colorButtonColor} />
            <ColorButton color={{ r: 7, g: 147, b: 104, a: 1 }} onClick={onChange} selectedColor={colorButtonColor} />
            <ColorButton color={{ a: 1, b: 99, g: 202, r: 68 }} onClick={onChange} selectedColor={colorButtonColor} />
            <ColorButton color={{ r: 248, g: 119, b: 119, a: 1 }} onClick={onChange} selectedColor={colorButtonColor} />
            <ColorButton color={{ r: 224, g: 49, b: 49, a: 1 }} onClick={onChange} selectedColor={colorButtonColor} />
          </div>
        </div>
      )}
    </div>
  )
};

const OutlineColorButton = ({
  onClick,
  color,
}: any) => {
  const buttonStyle = color.r === 0 && color.g === 0 && color.b === 0 && color.a === 0
    ? { background: 'white' }
    : { background: colorToCss(color) };

  return (
    <Hint label="Outline Color" side="top">
      <Button
        variant="icon"
        size="icon"
        onClick={() => onClick(color)}
      >
      <div
        className="w-[22px] h-[22px] my-1 items-center flex justify-center transition mx-2 border border-neutral-300 dark:border-zinc-600 rounded-[50%] bg-white dark:bg-[#383838]"
        style={buttonStyle}
      >
        <div
          className="h-4 w-4 rounded-[50%] border border-neutral-300 dark:border-zinc-500 relative z-50 bg-white dark:bg-zinc-800"
        >
          {color.r === 0 && color.g === 0 && color.b === 0 && color.a === 0 && (
            <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 1 1">
              <line x1="0.15" y1="0.15" x2="0.85" y2="0.85" stroke="#d4d4d4" strokeWidth="0.05" />
            </svg>
          )}
        </div>
      </div>
      </Button>
    </Hint>
  )
}