import React, { useCallback, useState, useEffect, memo } from 'react';
import { SvgLayer } from "@/types/canvas";
import { colorToCss } from '@/lib/utils';

interface SVGLayerProps {
    isUploading: boolean;
    id: string;
    layer: SvgLayer;
    onPointerDown: (e: React.PointerEvent, id: string) => void;
    setCamera?: (camera: any) => void;
    setZoom?: (zoom: number) => void;
    focused?: boolean;
    cameraRef?: React.RefObject<any>;
    zoomRef?: React.RefObject<any>;
    selectionColor?: string;
    showOutlineOnHover?: boolean;
}

const parseSVGContent = (svgString: string): React.ReactNode[] => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgString, 'image/svg+xml');
    const svgElement = doc.querySelector('svg');
    
    if (!svgElement) return [];

    const createReactElement = (node: Element): React.ReactNode => {
        const attributes: { [key: string]: string } = {};
        Array.from(node.attributes).forEach(attr => {
            attributes[attr.name] = attr.value;
        });

        // Remove fill attribute to allow override
        delete attributes.fill;

        return React.createElement(
            node.tagName.toLowerCase(),
            { ...attributes, key: Math.random().toString() },
            Array.from(node.childNodes).map(child => 
                child.nodeType === Node.ELEMENT_NODE ? createReactElement(child as Element) : null
            ).filter(Boolean)
        );
    };

    return Array.from(svgElement.childNodes)
        .map(node => node.nodeType === Node.ELEMENT_NODE ? createReactElement(node as Element) : null)
        .filter(Boolean);
};

export const SVGLayer = memo(({
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
    showOutlineOnHover
}: SVGLayerProps) => {
    const { x, y, width, height, src, fill } = layer;
    const [strokeColor, setStrokeColor] = useState(selectionColor || "none");
    const [svgContent, setSvgContent] = useState<React.ReactNode[]>([]);

    useEffect(() => {
        setStrokeColor(selectionColor || "none");
    }, [selectionColor]);

    useEffect(() => {
        const content = parseSVGContent(src);
        setSvgContent(content);
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
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        // Calculate the target zoom level to fit the image with padding
        const zoomX = (viewportWidth) / width * 0.9;
        const zoomY = (viewportHeight) / height * 0.9;
        let targetZoom = Math.min(zoomX, zoomY);

        // Adjust zoom for small images (zoom in if necessary)
        const minZoom = 0.3;
        const maxZoom = 10;
        targetZoom = Math.max(minZoom, Math.min(maxZoom, targetZoom));

        // Calculate the target camera position
        const targetCameraX = viewportWidth / 2 - (x + width / 2) * targetZoom;
        const targetCameraY = viewportHeight / 2 - (y + height / 2) * targetZoom;

        // Get current camera and zoom
        const startCamera = cameraRef?.current || { x: 0, y: 0 };
        const startZoom = zoomRef?.current || 1;

        const animationDuration = 500; // 0.5 seconds
        const startTime = Date.now();

        const animate = () => {
            const elapsedTime = Date.now() - startTime;
            const progress = Math.min(elapsedTime / animationDuration, 1);

            // Easing function (ease-out cubic)
            const easeProgress = 1 - Math.pow(1 - progress, 3);

            const currentZoom = startZoom + (targetZoom - startZoom) * easeProgress;
            const currentCamera = {
                x: startCamera.x + (targetCameraX - startCamera.x) * easeProgress,
                y: startCamera.y + (targetCameraY - startCamera.y) * easeProgress
            };

            // Update camera and zoom
            setCamera && setCamera(currentCamera);
            setZoom && setZoom(currentZoom);

            // Continue animation if not finished
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }, [cameraRef, zoomRef, height, width, x, y, setCamera, setZoom]);

    const handlePointerEnter = useCallback(() => {
        if (showOutlineOnHover) {
            setStrokeColor("#3390FF");
        }
    }, [showOutlineOnHover]);

    const handlePointerLeave = useCallback(() => {
        setStrokeColor(selectionColor || "none");
    }, [selectionColor]);

    if (!fill) {
        return;
    }

    const fillColor = fill.a === 0 ? 'currentColor' : colorToCss(fill);

    return (
        <g
            onPointerDown={handlePointerDown}
            onDoubleClick={onDoubleClick}
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
                fill="transparent"
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <g
                transform={`translate(${x},${y}) scale(${width / 100},${height / 100})`}
                className="pointer-events-none"
                fill={fillColor}
            >
                {svgContent}
            </g>
        </g>
    );
});

SVGLayer.displayName = 'SVGLayer';
