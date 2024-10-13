import React, { useState, useEffect, useCallback, memo } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Frame, Play, X } from "lucide-react";
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
import { updateR2Bucket } from '@/lib/r2-bucket-functions';
import { Socket } from "socket.io-client";

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
    boardId: string;
    socket: Socket | null;
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
    boardId: string;
    socket: Socket | null;
}

const SortableFramePreview = memo<SortableFramePreviewProps>(({
    frameId,
    index,
    liveLayers,
    liveLayerIds,
    setCamera,
    setZoom,
    cameraRef,
    zoomRef,
    forceRender,
    boardId,
    socket
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
    const maxHeight = 200;
    const maxWidth = maxHeight * a4Width / a4Height;
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
            className="hover:bg-blue-500/20 relative flex flex-col items-center border rounded-sm border-zinc-200 h-[180px] cursor-hand active:cursor-grab transition-colors duration-200"
        >
            {/* Frame number indicator */}
            <div className="absolute top-3 left-3 w-6 h-6 bg-blue-500 rounded-sm flex items-center justify-center z-10">
                <span className="text-white text-xs font-semibold">{index + 1}</span>
            </div>
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
            {/* Transparent overlay to prevent interactions */}
            <div className="absolute inset-0" />
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
    forceRender,
    boardId,
    socket
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
                const newLayerIds = [...newOrder, ...nonFrameLayerIds];
                
                setLiveLayerIds(newLayerIds);

                // Update R2 bucket
                updateR2Bucket('/api/r2-bucket/updateLayerIds', boardId, newLayerIds);

                // Emit socket event
                if (socket) {
                    socket.emit('layer-send', newLayerIds);
                }

                return newOrder;
            });
        }
    }, [liveLayerIds, liveLayers, setLiveLayerIds, boardId, socket]);

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
            <ScrollArea className="h-[calc(100%-140px)] p-4">
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
                                                boardId={boardId}
                                                socket={socket}
                                            />
                                        </div>
                                    )
                                ))}
                            </div>
                        </SortableContext>
                    </DndContext>
                ) : (
                    <div className="flex flex-col items-center justify-center h-[calc(100vh-250px)] text-center">
                        <Frame className="h-12 w-12 mb-4" />
                        <h2 className="text-xl font-semibold mb-2">Start by creating your first frame</h2>
                        <p className="text-sm text-zinc-500">Frames help you arrange your work for easy exporting and presenting.</p>
                    </div>
                )}
            </ScrollArea>
            <div className="h-[65px] border-t dark:border-zinc-700 p-4 flex flex-row items-center justify-center w-full">
                <Button variant="sketchlieBlue">
                    <Play className="h-4 w-4 mr-2 fill-white" strokeWidth={3} />
                    Present
                </Button>
            </div>
        </div>
    );
});

FramesPanel.displayName = 'FramesPanel';
