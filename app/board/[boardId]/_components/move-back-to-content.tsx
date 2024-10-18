import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { Layers } from "@/types/canvas";
import { ArrowRightIcon } from "lucide-react";
import { memo, useCallback } from "react";

interface MoveBackToContentProps {
    setCamera: (camera: { x: number, y: number }) => void;
    setZoom: (zoom: number) => void;
    showButton: boolean;
    liveLayers: Layers;
    cameraRef: React.RefObject<{ x: number, y: number }>;
    zoomRef: React.RefObject<number>;
}

export const MoveBackToContent = memo(({ setCamera, setZoom, showButton, liveLayers, cameraRef, zoomRef }: MoveBackToContentProps) => {
    const goToCenter = useCallback(() => {
        const layerIds = Object.keys(liveLayers);
        if (layerIds.length === 0) return;

        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;

        layerIds.forEach(id => {
            const layer = liveLayers[id];
            minX = Math.min(minX, layer.x);
            minY = Math.min(minY, layer.y);
            maxX = Math.max(maxX, layer.x + layer.width);
            maxY = Math.max(maxY, layer.y + layer.height);
        });

        const contentWidth = maxX - minX;
        const contentHeight = maxY - minY;
        const centerX = (minX + maxX) / 2;
        const centerY = (minY + maxY) / 2;

        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        // Calculate the target zoom level to fit the content with padding
        const zoomX = (viewportWidth) / contentWidth * 0.9;
        const zoomY = (viewportHeight) / contentHeight * 0.9;
        let targetZoom = Math.min(zoomX, zoomY);

        // Adjust zoom (limit between 0.1 and 1)
        targetZoom = Math.max(0.1, Math.min(1, targetZoom));

        // Calculate the target camera position
        const targetCameraX = viewportWidth/2 - centerX * targetZoom;
        const targetCameraY = viewportHeight/2 - centerY * targetZoom;

        // Get current camera and zoom
        const startCamera = cameraRef.current || { x: 0, y: 0 };
        const startZoom = zoomRef.current || 1;

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
            setCamera(currentCamera);
            setZoom(currentZoom);

            // Continue animation if not finished
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }, [liveLayers, setCamera, setZoom, cameraRef, zoomRef]);

    if (!showButton) return;

    return (
        <div className="border dark:border-zinc-800 shadow-md bg-white dark:bg-zinc-800 absolute top-16 left-4 rounded-xl p-1 h-12 items-center pointer-events-auto flex" >
            <Hint label="Go to content" side="bottom" sideOffset={10}>
            <Button
                variant="infoIcons"
                onClick={goToCenter}
            >
                Go to content <ArrowRightIcon className="ml-2 w-4 h-4" />
            </Button>
            </Hint>
        </div>
    )
});

MoveBackToContent.displayName = "MoveBackToContent";
