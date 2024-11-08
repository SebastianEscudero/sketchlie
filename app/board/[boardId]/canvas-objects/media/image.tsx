import { memo, useCallback, useState, useEffect } from 'react';
import { ImageLayer } from "@/types/canvas";
import { useImagePreloader } from '../../_components/utils/use-preload-image';

interface ImageProps {
  id: string;
  layer: ImageLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
  showOutlineOnHover?: boolean;
  setAddedByLabel?: (addedBy: string) => void;
};

export const InsertImage = memo(({
  id,
  layer,
  onPointerDown,
  selectionColor,
  showOutlineOnHover = false,
  setAddedByLabel,
}: ImageProps) => {
  const { x, y, width, height, src, addedBy } = layer;
  const [strokeColor, setStrokeColor] = useState(selectionColor || "none");
  const [isLoading, setIsLoading] = useState(true);
  const { preloadImage } = useImagePreloader();

  useEffect(() => {
    let isMounted = true;

    preloadImage(src)
      .then(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [src]);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    e.stopPropagation();
    setStrokeColor(selectionColor || "none");
    onPointerDown(e, id);
  }, [id, onPointerDown, selectionColor]);

  const handlePointerEnter = useCallback(() => {
    if (showOutlineOnHover) {
      setStrokeColor("#3390FF");
      setAddedByLabel?.(addedBy || '');
    }
  }, [showOutlineOnHover, addedBy, setAddedByLabel]);

  const handlePointerLeave = useCallback(() => {
    setStrokeColor(selectionColor || "none");
    setAddedByLabel?.('');
  }, [selectionColor, setAddedByLabel]);

  console.log('Image rerender, props changed:', {
    id,
    layer,
    selectionColor,
    showOutlineOnHover,
    hasSetAddedByLabel: !!setAddedByLabel
  });

  return (
    <g
      onPointerDown={handlePointerDown}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      pointerEvents="auto"
    >
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        stroke={strokeColor}
        strokeWidth="1"
        fill={isLoading ? "#f4f4f5" : "none"}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      {isLoading && (
        <svg
          x={x + width / 2 - (Math.min(width, height) * 0.05)}
          y={y + height / 2 - (Math.min(width, height) * 0.05)}
          width={Math.min(width, height) * 0.1}
          height={Math.min(width, height) * 0.1}
          viewBox="0 0 24 24"
          fill="none"
        >
          <path d="M21 12a9 9 0 1 1-6.219-8.56" stroke="#3390FF">
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
