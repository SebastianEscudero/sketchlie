import React, { useCallback, useState, useEffect, memo } from 'react';
import { ImageLayer } from "@/types/canvas";
import { MoveCameraToLayer } from '../../_components/canvasUtils';

// Image cache for preloading
const imageCache = new Map<string, HTMLImageElement>();

// Signed URL cache
const signedUrlCache = new Map<string, { url: string, expiry: number }>();

const MAX_PRESIGNED_URL_DURATION = 604800; // 7 days in seconds

const isS3Image = (src: string): boolean => {
  const s3Patterns = [
    'sketchlie.s3.us-east-2.amazonaws.com',
    's3.us-east-2.amazonaws.com/sketchlie'
  ];
  return s3Patterns.some(pattern => src.includes(pattern));
};

const getSignedUrl = async (key: string): Promise<string> => {
  const now = Date.now();
  const cached = signedUrlCache.get(key);
  
  if (cached && cached.expiry > now) {
    return cached.url;
  }

  const response = await fetch(`/api/get-presigned-url?key=${encodeURIComponent(key)}`);
  if (!response.ok) throw new Error('Failed to fetch presigned URL');
  const data = await response.json();
  
  signedUrlCache.set(key, { url: data.url, expiry: now + MAX_PRESIGNED_URL_DURATION * 1000 });

  return data.url;
};

const preloadImage = (src: string) => {
  if (!imageCache.has(src)) {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;
    imageCache.set(src, img);
    return img;
  }
  return imageCache.get(src)!;
};

interface ImageProps {
  isUploading: boolean;
  id: string;
  layer: ImageLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  setCamera?: (camera: any) => void;
  setZoom?: (zoom: number) => void;
  focused?: boolean;
  cameraRef?: React.RefObject<any>;
  zoomRef?: React.RefObject<any>;
  selectionColor?: string;
  showOutlineOnHover?: boolean;
  setAddedByLabel?: (addedBy: string) => void;
};

export const InsertImage = memo(({
  isUploading,
  id,
  layer,
  onPointerDown,
  selectionColor,
  setCamera,
  setZoom,
  focused,
  cameraRef,
  zoomRef,
  showOutlineOnHover = false,
  setAddedByLabel,
}: ImageProps) => {
  const { x, y, width, height, src, addedBy } = layer;
  const [strokeColor, setStrokeColor] = useState(selectionColor || "none");
  const [isLoading, setIsLoading] = useState(true);
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    const fetchAndPreloadImage = async () => {
      try {
        let finalSrc = src;
        if (isS3Image(src)) {
          const key = src.split('.com/')[1];
          finalSrc = await getSignedUrl(key);
        }
        setImageSrc(finalSrc);

        const img = preloadImage(finalSrc);
        if (img.complete) {
          setIsLoading(false);
        } else {
          img.onload = () => setIsLoading(false);
        }
      } catch (error) {
        console.error('Error fetching or preloading image:', error);
        setIsLoading(false);
      }
    };

    fetchAndPreloadImage();
  }, [src]);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    setStrokeColor(selectionColor || "none");
    if (focused) {
      e.preventDefault();
    } else {
      onPointerDown(e, id);
    }
  }, [focused, selectionColor, id, onPointerDown]);

  const onDoubleClick = useCallback(() => {
    MoveCameraToLayer({
      targetX: x,
      targetY: y,
      targetWidth: width,
      targetHeight: height,
      setCamera: setCamera!,
      setZoom: setZoom!,
      cameraRef: cameraRef!,
      zoomRef: zoomRef!,
      padding: 0.7,
      duration: 200
    });
  }, [cameraRef, zoomRef, height, width, x, y, setCamera, setZoom]);

  return (
    <g
      onPointerDown={handlePointerDown}
      onDoubleClick={onDoubleClick}
      onPointerEnter={() => { if (showOutlineOnHover) { setStrokeColor("#3390FF"); setAddedByLabel?.(addedBy || '') } }}
      onPointerLeave={() => { setStrokeColor(selectionColor || "none"); setAddedByLabel?.('') }}
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
          x={x + width / 2 - 12}
          y={y + height / 2 - 12}
          width="24"
          height="24"
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
      {imageSrc && (
        <image
          crossOrigin="anonymous"
          id={id}
          href={imageSrc}
          x={x}
          y={y}
          width={width}
          height={height}
          onLoad={() => setIsLoading(false)}
        />
      )}
    </g>
  );
});

InsertImage.displayName = 'InsertImage';

export default InsertImage;
