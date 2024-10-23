import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { FramesLayersIcon } from "@/public/custom-icons/frames";
import { Minus, Plus, Maximize2, Minimize2, Focus } from "lucide-react";
import React, { memo, useState, useCallback, useEffect } from "react";

interface BottomRightViewProps {
    zoom: number;
    setZoom: (zoom: number) => void;
    camera: { x: number, y: number };
    setCamera: (camera: { x: number, y: number }) => void;
    setFocusMode: (mode: boolean) => void;
    focusMode: boolean;
    setRightMiddleContainerView: (view: string | null) => void;
}

const PREDEFINED_PERCENTAGES = [10, 25, 50, 100, 150, 200, 300, 400];

export const BottomRightView = memo(({
    zoom,
    setZoom,
    camera,
    setCamera,
    setFocusMode,
    focusMode,
    setRightMiddleContainerView,
}: BottomRightViewProps) => {
    const [isFullscreen, setIsFullscreen] = useState(false);

    const baseZoom = 1;

    const zoomToPercentage = (zoom: number) => {
        if (zoom < baseZoom) {
            return Math.round(((zoom - 0.3) / (baseZoom - 0.3)) * (100 - 10) + 10);
        } else {
            return Math.round(((zoom - baseZoom) / (10 - baseZoom)) * (400 - 100) + 100);
        }
    };

    const percentageToZoom = (percentage: number) => {
        if (percentage <= 100) {
            return ((percentage - 10) / (100 - 10)) * (baseZoom - 0.3) + 0.3;
        } else {
            return ((percentage - 100) / (400 - 100)) * (10 - baseZoom) + baseZoom;
        }
    };

    const findClosestZoom = (currentZoom: number, direction: 'up' | 'down') => {
        const currentPercentage = zoomToPercentage(currentZoom);
        let closestPercentage;

        if (direction === 'up') {
            closestPercentage = PREDEFINED_PERCENTAGES.find(p => p > currentPercentage) || PREDEFINED_PERCENTAGES[PREDEFINED_PERCENTAGES.length - 1];
        } else {
            closestPercentage = [...PREDEFINED_PERCENTAGES].reverse().find(p => p < currentPercentage) || PREDEFINED_PERCENTAGES[0];
        }

        return percentageToZoom(closestPercentage);
    };

    const setZoomAndCamera = (newZoom: number) => {
        newZoom = Math.max(0.3, Math.min(10, newZoom));

        const zoomFactor = newZoom / zoom;
        const newX = window.innerWidth / 2 - (window.innerWidth / 2 - camera.x) * zoomFactor;
        const newY = window.innerHeight / 2 - (window.innerHeight / 2 - camera.y) * zoomFactor;

        setZoom(newZoom);
        setCamera({ x: newX, y: newY });
    }

    const handleZoomIn = () => {
        const newZoom = findClosestZoom(zoom, 'up');
        setZoomAndCamera(newZoom);
    };

    const handleZoomOut = () => {
        const newZoom = findClosestZoom(zoom, 'down');
        setZoomAndCamera(newZoom);
    };

    const handleResetZoom = () => {
        setZoomAndCamera(baseZoom);
    };

    const handleFramesClick = () => {
        //just to suppress the type error
        setRightMiddleContainerView(((prev: any) => prev === "frames" ? null : "frames") as any);
    };

    const toggleFocusMode = () => {
        const newFocusMode = !focusMode;
        setFocusMode(newFocusMode);

        if (newFocusMode && !document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else if (!newFocusMode && document.fullscreenElement) {
            document.exitFullscreen();
        }
    };

    const zoomPercentage = zoomToPercentage(zoom);

    const toggleFullscreen = useCallback(() => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    }, []);

    useEffect(() => {
        const fullscreenChangeHandler = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };

        document.addEventListener('fullscreenchange', fullscreenChangeHandler);

        return () => {
            document.removeEventListener('fullscreenchange', fullscreenChangeHandler);
        };
    }, []);

    if (focusMode) {
        return (
            <div className="border dark:border-zinc-800 space-x-1 px-2 shadow-md absolute h-[52px] bottom-4 right-4 rounded-xl py-2 items-center lg:flex hidden bg-white dark:bg-zinc-800 pointer-events-auto">
                <Hint label="Exit Focus Mode" sideOffset={4}>
                    <Button onClick={toggleFocusMode} variant="boardActive">
                        <Focus className="h-4 w-4" />
                    </Button>
                </Hint>
            </div>
        );
    }

    return (
        <div className="border dark:border-zinc-800 space-x-1 px-2 shadow-md absolute h-[52px] bottom-4 right-4 rounded-xl py-2 items-center lg:flex hidden bg-white dark:bg-zinc-800 pointer-events-auto">
            <div className="flex items-center border-r pr-1">
                <Hint label="Focus Mode" sideOffset={4}>
                    <Button onClick={toggleFocusMode} className="px-2" variant="board">
                        <Focus className="h-4 w-4" />
                    </Button>
                </Hint>
            </div>
            <Hint label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"} sideOffset={4}>
                <Button onClick={toggleFullscreen} className="px-2" variant="board">
                    {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                </Button>
            </Hint>
            <Hint label="Zoom out" sideOffset={4}>
                <Button onClick={handleZoomOut} className="px-2" variant="board">
                    <Minus className="h-4 w-4" />
                </Button>
            </Hint>
            <Hint label="Reset zoom" sideOffset={4}>
                <Button onClick={handleResetZoom} variant="board" className="px-2 text-xs">
                    {zoomPercentage}%
                </Button>
            </Hint>
            <Hint label="Zoom in" sideOffset={4}>
                <Button onClick={handleZoomIn} className="px-2" variant="board">
                    <Plus className="h-4 w-4" />
                </Button>
            </Hint>
            <div className="flex items-center border-l pl-1">
                <Hint label="Frames" sideOffset={4}>
                    <Button onClick={handleFramesClick} className="px-2" variant="board">
                        <FramesLayersIcon />
                    </Button>
                </Hint>
            </div>
        </div>
    );
});

BottomRightView.displayName = "BottomRightView";
