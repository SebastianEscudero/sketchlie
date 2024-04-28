"use client";

import { memo } from "react";
import { BringToFront, SendToBack, Sparkles, Trash2 } from "lucide-react";

import { Hint } from "@/components/hint";
import { Camera, Color, LayerType } from "@/types/canvas";
import { Button } from "@/components/ui/button";
import { useMutation, useSelf, useStorage } from "@/liveblocks.config";
import { useDeleteLayers } from "@/hooks/use-delete-layers";
import { useSelectionBounds } from "@/hooks/use-selection-bounds";

import { ColorPicker } from "./color-picker";

interface SelectionToolsProps {
  camera: Camera;
  setLastUsedColor: (color: Color) => void;
  zoom: number;
};

export const SelectionTools = memo(({
  camera,
  setLastUsedColor,
  zoom,
}: SelectionToolsProps) => {

  const soleLayerId = useSelf((me) =>
    me.presence.selection.length === 1 ? me.presence.selection[0] : null
  );

  const type = useStorage((root) =>
    soleLayerId && root.layers.get(soleLayerId)?.type)

  const layer = useStorage((root) => soleLayerId && root.layers.get(soleLayerId));

  const selection = useSelf((me) => me.presence.selection);

  function removeBackground(layer: any) {
    console.log(layer.src);

    // add logic to remove image background
  }

  const moveToFront = useMutation((
    { storage }
  ) => {
    const liveLayerIds = storage.get("layerIds");
    const indices: number[] = [];

    const arr = liveLayerIds.toImmutable();

    for (let i = 0; i < arr.length; i++) {
      if (selection.includes(arr[i])) {
        indices.push(i);
      }
    }

    for (let i = indices.length - 1; i >= 0; i--) {
      liveLayerIds.move(
        indices[i],
        arr.length - 1 - (indices.length - 1 - i)
      );
    }
  }, [selection]);

  const moveToBack = useMutation((
    { storage }
  ) => {
    const liveLayerIds = storage.get("layerIds");
    const indices: number[] = [];

    const arr = liveLayerIds.toImmutable();

    for (let i = 0; i < arr.length; i++) {
      if (selection.includes(arr[i])) {
        indices.push(i);
      }
    }

    for (let i = 0; i < indices.length; i++) {
      liveLayerIds.move(indices[i], i);
    }
  }, [selection]);

  const setFill = useMutation((
    { storage },
    fill: Color,
  ) => {
    const liveLayers = storage.get("layers");
    setLastUsedColor(fill);

    selection.forEach((id) => {
      liveLayers.get(id)?.set("fill", fill);
    })
  }, [selection, setLastUsedColor]);

  const deleteLayers = useDeleteLayers();

  const selectionBounds = useSelectionBounds();

  if (!selectionBounds) {
    return null;
  }

  const x = (selectionBounds.width / 2 + selectionBounds.x) * zoom + camera.x;
  const y = (selectionBounds.y) * zoom + camera.y;

  return (
    <div
      className="absolute p-3 rounded-xl bg-white shadow-sm border flex select-none gap-x-2 items-center"
      style={{
        transform: `translate(
          calc(${x}px - 50%),
          calc(${y - 16}px - 100%)
        )`
      }}
    >
      {type !== LayerType.Image &&
        <ColorPicker
          onChange={setFill}
        />}
      <Hint label="Bring to front">
        <Button
          onClick={moveToFront}
          variant="board"
          size="icon"
        >
          <BringToFront />
        </Button>
      </Hint>
      <Hint label="Send to back" side="bottom">
        <Button
          onClick={moveToBack}
          variant="board"
          size="icon"
        >
          <SendToBack />
        </Button>
      </Hint>
      {type === LayerType.Image &&
        <Hint label="Remove Background" side="bottom">
          <Button
            onClick={() => removeBackground(layer)}
            variant="board"
            size="icon"
          >
            <Sparkles className="fill-custom-blue text-custom-blue"/>
          </Button>
        </Hint>
      }
      <div className="flex items-center pl-2 ml-2 border-l border-neutral-200">
        <Hint label="Delete">
          <Button
            variant="board"
            size="icon"
            onClick={deleteLayers}
          >
            <Trash2 />
          </Button>
        </Hint>
      </div>
    </div>
  );
});

SelectionTools.displayName = "SelectionTools";