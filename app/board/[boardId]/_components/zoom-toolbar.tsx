import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { FramesLayersIcon } from "@/public/custom-icons/frames";
import { Minus, Plus } from "lucide-react";
import React, { useState } from "react";
import { Layers } from "@/types/canvas";
import { FramesPanel } from "./frames-panel";
import { Socket } from "socket.io-client";

interface ZoomToolbarProps {
    zoom: number;
    setZoom: (zoom: number) => void;
    camera: { x: number, y: number };
    setCamera: (camera: { x: number, y: number }) => void;
    liveLayers: Layers;
    liveLayerIds: string[];
    setLiveLayerIds: (frameIds: string[]) => void;
    cameraRef: React.RefObject<{ x: number; y: number }>;
    zoomRef: React.RefObject<number>;
    forcedRender: boolean;
    boardId: string;
    socket: Socket | null;
}

const PREDEFINED_PERCENTAGES = [10, 25, 50, 100, 150, 200, 300, 400];

export const ZoomToolbar = ({
    zoom,
    setZoom,
    camera,
    setCamera,
    liveLayers,
    liveLayerIds,
    setLiveLayerIds,
    cameraRef,
    zoomRef,
    forcedRender,
    boardId,
    socket
}: ZoomToolbarProps) => {
    const [showFrames, setShowFrames] = useState(false);

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
        setShowFrames(!showFrames);
    };

    const zoomPercentage = zoomToPercentage(zoom);

    return (
        <>
            <div className="border dark:border-zinc-800 shadow-md absolute h-[52px] bottom-4 right-4 rounded-xl py-2 items-center lg:flex hidden bg-white dark:bg-zinc-800 pointer-events-auto">
                <Hint label="Zoom out" sideOffset={4}>
                    <Button onClick={handleZoomOut} className="ml-2 px-2" variant="board">
                        <Minus className="h-4 w-4" />
                    </Button>
                </Hint>
                <Hint label="Reset zoom" sideOffset={4}>
                    <Button onClick={handleResetZoom} variant="board" className="px-2 text-xs">
                        {zoomPercentage}%
                    </Button>
                </Hint>
                <Hint label="Zoom in" sideOffset={4}>
                    <Button onClick={handleZoomIn} className="mr-2 px-2" variant="board">
                        <Plus className="h-4 w-4" />
                    </Button>
                </Hint>
                <Hint label="Frames" sideOffset={4}>
                    <Button onClick={handleFramesClick} className="mr-2 px-2" variant="board">
                        <FramesLayersIcon />
                    </Button>
                </Hint>
            </div>
            {showFrames && (
                <FramesPanel
                    liveLayers={liveLayers}
                    liveLayerIds={liveLayerIds}
                    setLiveLayerIds={setLiveLayerIds}
                    onClose={() => setShowFrames(false)}
                    setCamera={setCamera}
                    setZoom={setZoom}
                    cameraRef={cameraRef}
                    zoomRef={zoomRef}
                    forceRender={forcedRender}
                    boardId={boardId}
                    socket={socket}
                />
            )}
        </>
    );
};
