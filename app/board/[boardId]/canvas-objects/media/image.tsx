import { memo, useCallback, useState, useEffect } from 'react';
import { ImageLayer } from "@/types/canvas";
import { useImagePreloader } from '../hooks/use-preload-image';
import { cn } from '@/lib/utils';

interface ImageProps {
  id: string;
  layer: ImageLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
  setAddedByLabel?: (addedBy: string) => void;
};

export const InsertImage = memo(({
  id,
  layer,
  onPointerDown,
  selectionColor,
  setAddedByLabel,
}: ImageProps) => {
  const { x, y, width, height, src, addedBy } = layer;
  const [isLoading, setIsLoading] = useState(true);
  const { preloadImage } = useImagePreloader();

  useEffect(() => {
    let isMounted = true;
    preloadImage(src)
      .then(() => {
        if (isMounted) setIsLoading(false);
      })
      .catch(() => {
        if (isMounted) setIsLoading(false);
      });
    return () => { isMounted = false; };
  }, [src]);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    e.stopPropagation();
    onPointerDown(e, id);
  }, [id, onPointerDown]);

  const handlePointerEnter = useCallback(() => {
    setAddedByLabel?.(addedBy || '');
  }, [addedBy, setAddedByLabel]);

  const handlePointerLeave = useCallback(() => {
    setAddedByLabel?.('');
  }, [setAddedByLabel]);

  return (
    <g
      onPointerDown={handlePointerDown}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      className={cn(
        "group",
        "[#canvas.shapes-hoverable_&]:pointer-events-auto",
        "[#canvas:not(.shapes-hoverable)_&]:pointer-events-none"
      )}
    >
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        style={{
          '--base-stroke': selectionColor || 'none'
        } as React.CSSProperties}
        className={cn(
          "transition-[stroke]",
          "stroke-[var(--base-stroke)]",
          "[#canvas.shapes-hoverable_.group:hover_&]:stroke-[#3390FF]"
        )}
        strokeWidth="2"
        fill={isLoading ? "#f4f4f5" : "none"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Rest of the component stays the same */}
      {isLoading && (
        <svg
          x={x + width / 2 - (Math.min(width, height) * 0.05)}
          y={y + height / 2 - (Math.min(width, height) * 0.05)}
          width={Math.min(width, height) * 0.1}
          height={Math.min(width, height) * 0.1}
          viewBox="0 0 24 24"
          fill="none"
        >
          <path d="M21 12a9 9 0 1 1-6.219-8.56" className="stroke-[#3390FF]">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 12 12"
              to="360 12 12"
              dur="1s"
              repeatCount="indefinite"
            />
          </path>
        </svg>
      )}
      <image
        crossOrigin="anonymous"
        id={id}
        href={src}
        x={x}
        y={y}
        width={width}
        height={height}
      />
    </g>
  );
});

InsertImage.displayName = 'InsertImage';
