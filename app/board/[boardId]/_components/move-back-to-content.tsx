import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { Layers } from "@/types/canvas";
import { ArrowRightIcon } from "lucide-react";
import { memo, useCallback } from "react";
import { getRestrictedZoom } from "./canvasUtils";

interface MoveBackToContentProps {
    setCamera: (camera: { x: number, y: number }) => void;
    setZoom: (zoom: number) => void;
    showButton: boolean;
    liveLayers: Layers;
    liveLayerIds: string[];
    cameraRef: React.RefObject<{ x: number, y: number }>;
    zoomRef: React.RefObject<number>;
}

export const MoveBackToContent = memo(({ setCamera, setZoom, showButton, liveLayers, liveLayerIds, cameraRef, zoomRef }: MoveBackToContentProps) => {
    const goToCenter = useCallback(() => {
        if (liveLayerIds.length === 0) return;

        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;

        liveLayerIds.forEach(id => {
            const layer = liveLayers[id];
            if (!layer || !layer.x || !layer.y || !layer.width || !layer.height) return;
            minX = Math.min(minX, layer.x);
            minY = Math.min(minY, layer.y);
            maxX = Math.max(maxX, layer.x + Math.abs(layer.width));
            maxY = Math.max(maxY, layer.y + Math.abs(layer.height));
        });

        const contentWidth = maxX - minX;
        const contentHeight = maxY - minY;
        const centerX = (minX + maxX) / 2;
        const centerY = (minY + maxY) / 2;

        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        const zoomX = (viewportWidth) / contentWidth * 0.9;
        const zoomY = (viewportHeight) / contentHeight * 0.9;
        let targetZoom = Math.min(zoomX, zoomY);

        targetZoom = getRestrictedZoom(targetZoom);

        const targetCameraX = viewportWidth/2 - centerX * targetZoom;
        const targetCameraY = viewportHeight/2 - centerY * targetZoom;

        const startCamera = cameraRef.current || { x: 0, y: 0 };
        const startZoom = zoomRef.current || 1;

        const animationDuration = 500;
        const startTime = Date.now();

        const animate = () => {
            const elapsedTime = Date.now() - startTime;
            const progress = Math.min(elapsedTime / animationDuration, 1);
            
            const easeProgress = 1 - Math.pow(1 - progress, 3);

            const currentZoom = startZoom + (targetZoom - startZoom) * easeProgress;
            const currentCamera = {
                x: startCamera.x + (targetCameraX - startCamera.x) * easeProgress,
                y: startCamera.y + (targetCameraY - startCamera.y) * easeProgress
            };

            setCamera(currentCamera);
            setZoom(currentZoom);

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }, [liveLayers, setCamera, setZoom, cameraRef, zoomRef, liveLayerIds]);

    if (!showButton) return;

    return (
        <div className="border dark:border-zinc-800 shadow-md bg-white dark:bg-zinc-800 absolute top-16 left-4 rounded-xl p-1 h-12 items-center pointer-events-auto flex" >
            <Hint label="Go to content" side="bottom" sideOffset={10}>
            <Button
                variant="icon"
                onClick={goToCenter}
            >
                Go to content <ArrowRightIcon className="ml-2 w-4 h-4" />
            </Button>
            </Hint>
        </div>
    )
});

MoveBackToContent.displayName = "MoveBackToContent";
