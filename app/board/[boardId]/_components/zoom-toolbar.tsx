import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { FramesLayersIcon } from "@/public/custom-icons/frames";
import { Minus, Plus, X } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { Layers, LayerType, FrameLayer } from "@/types/canvas";
import { LayerPreview } from "@/app/board/[boardId]/_components/layer-preview";

interface ZoomToolbarProps {
    zoom: number;
    setZoom: (zoom: number) => void;
    camera: { x: number, y: number };
    setCamera: (camera: { x: number, y: number }) => void;
    liveLayers: Layers;
    liveLayerIds: string[];
    setLiveLayerIds: (frameIds: string[]) => void;
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
}: ZoomToolbarProps) => {
    const [showFrames, setShowFrames] = useState(false);
    const [frameIds, setFrameIds] = useState<string[]>([]);
    const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
    const draggedIndexRef = useRef<number | null>(null);

    useEffect(() => {
        if (showFrames) {
            const frameIdsList = liveLayerIds.filter(id => liveLayers[id].type === LayerType.Frame);
            setFrameIds(frameIdsList);
        }
    }, [showFrames, liveLayers, liveLayerIds]);

    const onDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
        e.dataTransfer.setData('text/plain', index.toString());
        draggedIndexRef.current = index;
    };

    const onDragEnter = (index: number) => {
        if (draggedIndexRef.current !== null) {
            setDragOverIndex(index > draggedIndexRef.current ? index + 1 : index);
        }
    };

    const onDragLeave = () => {
        setDragOverIndex(null);
    };

    const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const onDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
        draggedIndexRef.current = null;
        setDragOverIndex(null);
        e.currentTarget.classList.remove('dragging');
    };

    const onDrop = (e: React.DragEvent<HTMLDivElement>, dropIndex: number) => {
        e.preventDefault();
        const dragIndex = draggedIndexRef.current;
        if (dragIndex !== null && dragIndex !== dropIndex) {
            const newFrameIds = [...frameIds];
            const [removed] = newFrameIds.splice(dragIndex, 1);
            newFrameIds.splice(dropIndex, 0, removed);
            setFrameIds(newFrameIds);

            const nonFrameLayerIds = liveLayerIds.filter(id => liveLayers[id].type !== LayerType.Frame);
            setLiveLayerIds([...newFrameIds, ...nonFrameLayerIds]);
        }
        draggedIndexRef.current = null;
        setDragOverIndex(null);
    };

    const FramePreview: React.FC<{ frameId: string; index: number }> = ({ frameId, index }) => {
        const frame = liveLayers[frameId] as FrameLayer;
        const layersInFrame = liveLayerIds
            .map(id => liveLayers[id])
            .filter(layer =>
                layer &&
                layer !== frame &&
                layer.x >= frame.x &&
                layer.x + layer.width <= frame.x + frame.width &&
                layer.y >= frame.y &&
                layer.y + layer.height <= frame.y + frame.height
            );

        const a4Width = 842;
        const a4Height = 595;
        const maxHeight = 180
        const maxWidth = 200 * a4Width / a4Height;
        const scaleX = maxWidth / frame.width;
        const scaleY = maxHeight / frame.height;
        const scale = Math.min(scaleX, scaleY, 1);

        const scaledWidth = frame.width * scale;
        const scaledHeight = frame.height * scale;

        return (
            <div
                draggable="true"
                onDragStart={(e) => onDragStart(e, index)}
                onDragOver={onDragOver}
                onDrop={(e) => onDrop(e, index)}
                onDragEnter={() => onDragEnter(index)}
                onDragLeave={onDragLeave}
                onDragEnd={onDragEnd}
                className="relative flex flex-col items-center border rounded-sm border-zinc-200 h-[180px] cursor-hand active:cursor-grab transition-colors duration-200 hover:bg-zinc-100 dark:hover:bg-zinc-700"
            >
                {dragOverIndex === index && (
                    <div className="absolute top-0 left-0 right-0 h-1 bg-blue-500 z-10" />
                )}
                <svg
                    width={scaledWidth}
                    height={scaledHeight}
                    viewBox={`0 0 ${scaledWidth} ${scaledHeight}`}
                >
                    <g transform={`scale(${scale}) translate(${-frame.x}, ${-frame.y})`}>
                        {layersInFrame.map((layer, layerIndex) => (
                            <LayerPreview
                                key={layerIndex}
                                id=""
                                layer={layer}
                                onLayerPointerDown={() => { }}
                                setLiveLayers={() => { }}
                                socket={null}
                                expired={false}
                                boardId=""
                                frameNumber={0}
                                setCamera={() => { }}
                                setZoom={() => { }}
                            />
                        ))}
                    </g>
                </svg>
                {dragOverIndex === index + 1 && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500" />
                )}
                <div
                    className="absolute inset-0 z-20"
                    onDragEnter={() => onDragEnter(index)}
                    onDragLeave={onDragLeave}
                />
            </div>
        );
    };

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
                <div
                    onWheel={(e) => { e.stopPropagation(); }}
                    className="pointer-events-auto absolute top-[64px] right-0 bottom-[80px] w-[320px] bg-white dark:bg-zinc-800 p-4 shadow-md overflow-y-auto"
                >
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold">Frames</h2>
                        <Button onClick={() => setShowFrames(false)} variant="ghost" size="sm">
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                    {frameIds.length > 0 ? (
                        <div className="space-y-2">
                            {frameIds.map((frameId, index) => (
                                <div key={frameId} className="flex flex-col">
                                    <h1 className="text-xs font-semibold text-left text-zinc-500">
                                        {(liveLayers[frameId] as FrameLayer).value || `Frame ${index + 1}`}
                                    </h1>
                                    <FramePreview frameId={frameId} index={index} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No frames to preview.</p>
                    )}
                </div>
            )}
        </>
    );
};