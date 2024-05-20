"use client";

import { Color } from "@/types/canvas";
import { colorToCss } from "@/lib/utils";
import { useState } from 'react';

interface ColorPickerProps {
  onChange: (color: Color) => void;
  layers: any;
};


export const ColorPicker = ({
  onChange,
  layers
}: ColorPickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  let colorButtonColor
  if (layers.length === 1) {
    colorButtonColor = layers[0].fill;
  } else {
    colorButtonColor = { r: 0, g: 0, b: 0, a: 0 };
  }

  return (
    <div className="relative text-left border-r px-1 border-neutral-200">
      <ColorButton color={colorButtonColor} onClick={() => setIsOpen(!isOpen)}/>
      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-[210px] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
        >
          <div className="p-3 grid grid-cols-4 gap-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <ColorButton color={{ r: 0, g: 0, b: 0, a: 0 }} onClick={onChange} />
            <ColorButton color={{ r: 255, g: 255, b: 255, a: 1 }} onClick={onChange} />
            <ColorButton color={{ r: 243, g: 82, b: 35, a: 1 }} onClick={onChange} />
            <ColorButton color={{ r: 255, g: 249, b: 177, a: 1 }} onClick={onChange} />
            <ColorButton color={{ r: 255, g: 244, b: 69, a: 1 }} onClick={onChange} />
            <ColorButton color={{ r: 68, g: 202, b: 99, a: 1 }} onClick={onChange} />
            <ColorButton color={{ r: 39, g: 142, b: 237, a: 1 }} onClick={onChange} />
            <ColorButton color={{ r: 155, g: 105, b: 245, a: 1 }} onClick={onChange} />
            <ColorButton color={{ r: 252, g: 142, b: 42, a: 1 }} onClick={onChange} />
            <ColorButton color={{ r: 1, g: 1, b: 1, a: 1 }} onClick={onChange} />
            <ColorButton color={{ r: 65, g: 75, b: 178, a: 1 }} onClick={onChange} />
            <ColorButton color={{ r: 128, g: 128, b: 128, a: 1 }} onClick={onChange} />
          </div>
        </div>
      )}
    </div>
  )
};

interface ColorButtonProps {
  onClick: (color: Color) => void;
  color: Color;
};

export const ColorButton = ({
  onClick,
  color,
}: ColorButtonProps) => {
  return (
    <button
      className="w-8 h-8 my-1 items-center flex justify-center transition mx-2"
      onClick={() => onClick(color)}
    >
      <div
        className="h-8 w-8 rounded-md border border-neutral-300 relative"
        style={{ background: colorToCss(color) }}
      >
        {color.r === 0 && color.g === 0 && color.b === 0 && color.a === 0 && (
          <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 1 1">
            <line x1="0" y1="0" x2="1" y2="1" stroke="#d4d4d4" strokeWidth="0.05" />
          </svg>
        )}
      </div>
    </button>
  )
}