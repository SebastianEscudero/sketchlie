import React, { useState, useEffect, useCallback, memo } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Frame, Play } from "lucide-react";
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
import { MoveCameraToLayer } from "./utils/zoom-utils";
import { exportFramesToPdf } from "@/lib/export";
import { ExportIcon } from "@/public/custom-icons/export";

interface FramesPanelProps {
    liveLayers: Layers;
    liveLayerIds: string[];
    setLiveLayerIds: (frameIds: string[]) => void;
    setCamera: (camera: { x: number; y: number }) => void;
    setZoom: (zoom: number) => void;
    cameraRef: React.RefObject<{ x: number; y: number }>;
    zoomRef: React.RefObject<number>;
    forceRender: boolean;
    boardId: string;
    socket: Socket | null;
    setPresentationMode: (mode: boolean) => void;
    title: string;
}

export const FramesPanel = memo<FramesPanelProps>(({
    liveLayers,
    liveLayerIds,
    setLiveLayerIds,
    setCamera,
    setZoom,
    cameraRef,
    zoomRef,
    forceRender,
    boardId,
    socket,
    setPresentationMode,
    title
}) => {
    // Calculate frameIds directly instead of using state
    const frameIds = liveLayerIds.filter(id => 
        liveLayers[id] && liveLayers[id].type === LayerType.Frame
    );

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = useCallback((event: DragEndEvent) => {
        const { active, over } = event;

        if (active.id !== over?.id) {
            const oldIndex = frameIds.indexOf(active.id as string);
            const newIndex = frameIds.indexOf(over?.id as string);

            const newOrder = arrayMove(frameIds, oldIndex, newIndex);
            const nonFrameLayerIds = liveLayerIds.filter(id => liveLayers[id].type !== LayerType.Frame);
            const newLayerIds = [...newOrder, ...nonFrameLayerIds];
            
            setLiveLayerIds(newLayerIds);

            // Update R2 bucket
            updateR2Bucket('/api/r2-bucket/updateLayerIds', boardId, newLayerIds);

            // Emit socket event
            if (socket) {
                socket.emit('layer-send', newLayerIds);
            }
        }
    }, [frameIds, liveLayerIds, liveLayers, setLiveLayerIds, boardId, socket]);

    return (
        <>
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
            <div className="h-[65px] border-t dark:border-zinc-700 space-x-2 p-4 flex flex-row items-center justify-center w-full">
                <Button variant="sketchlieBlue" onClick={() => setPresentationMode(true)}>
                    <Play className="h-4 w-4 mr-2 fill-white" strokeWidth={3} />
                    Present
                </Button>
                <Button variant="outline" onClick={() => exportFramesToPdf(title, false, liveLayers, liveLayerIds)}>
                    <ExportIcon className="h-4 w-4 mr-2" />
                    Export
                </Button>
            </div>
        </>
    );
});

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
    index,
    liveLayers,
    liveLayerIds,
    setCamera,
    setZoom,
    cameraRef,
    zoomRef,
    forceRender,
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
        MoveCameraToLayer({
            targetX: frame.x,
            targetY: frame.y,
            targetWidth: frame.width,
            targetHeight: frame.height,
            setCamera: setCamera!,
            setZoom: setZoom!,
            cameraRef: cameraRef!,
            zoomRef: zoomRef!,
            padding: 0.8,
            duration: 300
        });
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
FramesPanel.displayName = 'FramesPanel';
