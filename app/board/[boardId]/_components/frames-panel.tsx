import React, { useState, useEffect, useCallback, memo } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Layers, LayerType, FrameLayer } from "@/types/canvas";
import { LayerPreview } from "@/app/board/[boardId]/_components/layer-preview";
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface FramesPanelProps {
    liveLayers: Layers;
    liveLayerIds: string[];
    setLiveLayerIds: (frameIds: string[]) => void;
    onClose: () => void;
    setCamera: (camera: { x: number; y: number }) => void;
    setZoom: (zoom: number) => void;
    cameraRef: React.RefObject<{ x: number; y: number }>;
    zoomRef: React.RefObject<number>;
    forceRender: boolean;
}

interface SortableFramePreviewProps {
    frameId: string;
    index: number;
    liveLayers: Layers;
    liveLayerIds: string[];
    setCamera: (camera: { x: number; y: number }) => void;
    setZoom: (zoom: number) => void;
    cameraRef: React.RefObject<{ x: number; y: number }>;
    zoomRef: React.RefObject<number>;
    forceRender: boolean;
}

const SortableFramePreview = memo<SortableFramePreviewProps>(({
    frameId,
    liveLayers,
    liveLayerIds,
    setCamera,
    setZoom,
    cameraRef,
    zoomRef,
    forceRender
}) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: frameId });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

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

    const onDoubleClick = useCallback(() => {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        // Calculate the target zoom level to fit the frame with padding
        const zoomX = (viewportWidth) / frame.width * 0.9;
        const zoomY = (viewportHeight) / frame.height * 0.9;
        let targetZoom = Math.min(zoomX, zoomY);

        // Adjust zoom for small frames (zoom in if necessary)
        const minZoom = 0.3;
        const maxZoom = 10;
        targetZoom = Math.max(minZoom, Math.min(maxZoom, targetZoom));

        // Calculate the target camera position
        const targetCameraX = viewportWidth / 2 - (frame.x + frame.width / 2) * targetZoom;
        const targetCameraY = viewportHeight / 2 - (frame.y + frame.height / 2) * targetZoom;

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
            setCamera(currentCamera);
            setZoom(currentZoom);

            // Continue animation if not finished
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }, [frame, cameraRef, zoomRef, setCamera, setZoom]);

    return (
        <div 
            ref={setNodeRef} 
            style={style} 
            {...attributes} 
            {...listeners}
            onDoubleClick={onDoubleClick}
            className="relative flex flex-col items-center border rounded-sm border-zinc-200 h-[180px] cursor-hand active:cursor-grab transition-colors duration-200 hover:bg-zinc-100 dark:hover:bg-zinc-700"
        >
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
                            forcedRender={forceRender}
                            setLiveLayers={() => { }}
                            socket={null}
                            expired={false}
                            boardId=""
                        />
                    ))}
                </g>
            </svg>
        </div>
    );
});

SortableFramePreview.displayName = 'SortableFramePreview';

export const FramesPanel = memo<FramesPanelProps>(({
    liveLayers,
    liveLayerIds,
    setLiveLayerIds,
    onClose,
    setCamera,
    setZoom,
    cameraRef,
    zoomRef,
    forceRender
}) => {
    const [frameIds, setFrameIds] = useState<string[]>([]);

    useEffect(() => {
        const frameIdsList = liveLayerIds.filter(id => liveLayers[id].type === LayerType.Frame);
        setFrameIds(frameIdsList);
    }, [liveLayers, liveLayerIds]);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = useCallback((event: DragEndEvent) => {
        const { active, over } = event;

        if (active.id !== over?.id) {
            setFrameIds((items) => {
                const oldIndex = items.indexOf(active.id as string);
                const newIndex = items.indexOf(over?.id as string);

                const newOrder = arrayMove(items, oldIndex, newIndex);
                const nonFrameLayerIds = liveLayerIds.filter(id => liveLayers[id].type !== LayerType.Frame);
                setLiveLayerIds([...newOrder, ...nonFrameLayerIds]);

                return newOrder;
            });
        }
    }, [liveLayerIds, liveLayers, setLiveLayerIds]);

    return (
        <div
            onWheel={(e) => e.stopPropagation()}
            className="border dark:border-zinc-800 pointer-events-auto absolute top-[64px] right-4 bottom-[80px] w-[320px] bg-white dark:bg-zinc-800 rounded-sm shadow-lg overflow-hidden"
        >
            <div className="flex justify-between items-center p-4 border-b dark:border-zinc-700">
                <h2 className="text-lg font-semibold">Frames</h2>
                <Button onClick={onClose} variant="ghost" size="sm">
                    <X className="h-4 w-4" />
                </Button>
            </div>
            <ScrollArea className="h-[calc(100%-60px)] p-4">
                {frameIds.length > 0 ? (
                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={handleDragEnd}
                    >
                        <SortableContext
                            items={frameIds}
                            strategy={verticalListSortingStrategy}
                        >
                            <div className="space-y-4">
                                {frameIds.map((frameId, index) => (
                                    liveLayers[frameId] && (
                                        <div key={frameId} className="flex flex-col">
                                            <h1 className="text-xs font-semibold text-left text-zinc-500 mb-2">
                                                {(liveLayers[frameId] as FrameLayer).value || `Frame ${index + 1}`}
                                            </h1>
                                            <SortableFramePreview
                                                frameId={frameId}
                                                index={index}
                                                liveLayers={liveLayers}
                                                liveLayerIds={liveLayerIds}
                                                setCamera={setCamera}
                                                setZoom={setZoom}
                                                cameraRef={cameraRef}
                                                zoomRef={zoomRef}
                                                forceRender={forceRender}
                                            />
                                        </div>
                                    )
                                ))}
                            </div>
                        </SortableContext>
                    </DndContext>
                ) : (
                    <p className="text-center text-zinc-500">No frames to preview.</p>
                )}
            </ScrollArea>
        </div>
    );
});

FramesPanel.displayName = 'FramesPanel';
