"use client";

import { Color } from "@/types/canvas";
import { colorToCss } from "@/lib/utils";

interface ColorPickerProps {
  onChange: (color: Color) => void;
};

import { useState } from 'react';
import { Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Hint } from "@/components/hint";

export const ColorPicker = ({
  onChange,
}: ColorPickerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      <Hint label="Choose Color">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          variant="board"
          size="icon"
        >
          <Palette/>
        </Button>
      </Hint>

      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-[200px] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
        >
          <div className="p-3 grid grid-cols-4 gap-3" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <ColorButton color={{ r: 0, g: 0, b: 0 }} onClick={onChange} />
            <ColorButton color={{ r: 255, g: 255, b: 255 }} onClick={onChange} />
            <ColorButton color={{ r: 243, g: 82, b: 35 }} onClick={onChange} />
            <ColorButton color={{ r: 255, g: 249, b: 177 }} onClick={onChange} />
            <ColorButton color={{ r: 255, g: 244, b: 69 }} onClick={onChange} />
            <ColorButton color={{ r: 68, g: 202, b: 99 }} onClick={onChange} />
            <ColorButton color={{ r: 39, g: 142, b: 237 }} onClick={onChange} />
            <ColorButton color={{ r: 155, g: 105, b: 245 }} onClick={onChange} />
            <ColorButton color={{ r: 252, g: 142, b: 42 }} onClick={onChange} />
            <ColorButton color={{ r: 1, g: 1, b: 1 }} onClick={onChange} />
            <ColorButton color={{ r: 65, g: 75, b: 178 }} onClick={onChange} />
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

const ColorButton = ({
  onClick,
  color,
}: ColorButtonProps) => {
  return (
    <button
      className="w-8 h-8 items-center flex justify-center hover:opacity-75 transition relative"
      onClick={() => onClick(color)}
    >
      <div 
        className="h-8 w-8 rounded-md border border-neutral-300 relative"
        style={{ background: colorToCss(color) }}
      >
        {color.r === 0 && color.g === 0 && color.b === 0 && (
          <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 1 1">
            <line x1="0" y1="0" x2="1" y2="1" stroke="#d4d4d4" strokeWidth="0.05" />
          </svg>
        )}
      </div>
    </button>
  )
}