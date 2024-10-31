"use client";

import { memo, useCallback, useEffect, useRef, useState } from "react";
import { Copy, BringToFront, SendToBack, Trash2 } from "lucide-react";
import { Hint } from "@/components/hint";
import { Camera, CanvasMode, Color, Layer, LayerType, Presence, SelectorType } from "@/types/canvas";
import { Button } from "@/components/ui/button";
import { useSelectionBounds } from "@/hooks/use-selection-bounds";
import { ColorPicker } from "../selection-tools/color-picker";
import { TextOptions } from "../selection-tools/text-options"
import { Socket } from "socket.io-client";
import { OutlineColorPicker } from "../selection-tools/outline-color-picker";
import { ArrowHeadSelection } from "../selection-tools/arrow-head-selection";
import { PathStokeSizeSelection } from "../selection-tools/path-stroke-size-selection";
import { customAlphabet } from "nanoid";
import { updateR2Bucket } from "@/lib/r2-bucket-functions";
import { InsertLayerCommand } from "@/lib/commands";
import { DownloadButton } from "../selection-tools/download-button";
import { useLayerTextEditingStore } from "../canvas-objects/utils/use-layer-text-editing";

interface SelectionToolsProps {
    boardId: string;
    camera: Camera;
    zoom: number;
    selectedLayers: string[]
    selectedLayersRef: any;
    liveLayers: any;
    liveLayerIds: string[];
    setLiveLayers: (layers: any) => void;
    setLiveLayerIds: (ids: string[]) => void;
    socket: Socket | null;
    performAction: (command: any) => void;
    org: any;
    proModal: any;
    myPresence: Presence | null;
    setMyPresence: (presence: Presence) => void;
    canvasState: CanvasMode;
    deleteLayers: (layerIds: string[]) => void;
};

export const SelectionTools = memo(({
    boardId,
    camera,
    zoom,
    selectedLayers,
    selectedLayersRef,
    setLiveLayers,
    setLiveLayerIds,
    liveLayers,
    liveLayerIds,
    socket,
    performAction,
    org,
    proModal,
    myPresence,
    setMyPresence,
    canvasState,
    deleteLayers,
}: SelectionToolsProps) => {
    const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const nanoid = customAlphabet(alphabet, 21);
    const [openSelector, setOpenSelector] = useState<SelectorType | null>(null);

    let hasText = true, isMediaLayer = true, hasOutline = true, isArrowLayer = true, isLineLayer = true, isPathLayer = true, noFill = true;

    selectedLayers.forEach((id: string) => {
        const type = liveLayers[id]?.type;
        const isTextType = [LayerType.Text, LayerType.Note, LayerType.Rectangle, LayerType.Ellipse, LayerType.Rhombus, LayerType.Triangle, LayerType.Star, LayerType.Hexagon, LayerType.BigArrowLeft, LayerType.BigArrowRight, LayerType.BigArrowUp, LayerType.BigArrowDown, LayerType.CommentBubble].includes(type);
        const isOutlineType = [LayerType.Note, LayerType.Rectangle, LayerType.Ellipse, LayerType.Rhombus, LayerType.Triangle, LayerType.Star, LayerType.Hexagon, LayerType.BigArrowLeft, LayerType.BigArrowRight, LayerType.BigArrowUp, LayerType.BigArrowDown, LayerType.CommentBubble].includes(type);

        // Update conditions based on the current layer type
        hasText = hasText && isTextType;
        isMediaLayer = isMediaLayer && (type === LayerType.Image || type === LayerType.Video || type === LayerType.Link || type === LayerType.Svg);
        noFill = noFill && (type === LayerType.Image || type === LayerType.Video || type === LayerType.Link || type === LayerType.Frame);
        hasOutline = hasOutline && isOutlineType;
        isArrowLayer = isArrowLayer && type === LayerType.Arrow;
        isLineLayer = isLineLayer && type === LayerType.Line;
        isPathLayer = isPathLayer && type === LayerType.Path;
    });

    // Continue with the rest of the code
    const layers = selectedLayers.map((id: string) => liveLayers[id]);
    const [initialPosition, setInitialPosition] = useState<{ x: number, y: number } | null>(null);
    const selectionBounds = useSelectionBounds(selectedLayers, liveLayers);
    const isEditingText = useLayerTextEditingStore(state => state.isEditing);
    const containerRef = useRef<HTMLDivElement>(null);
    const [containerWidth, setContainerWidth] = useState(0);

    useEffect(() => {
        if (!containerRef.current) return;

        const resizeObserver = new ResizeObserver(entries => {
            for (let entry of entries) {
                setContainerWidth(entry.contentRect.width);
            }
        });

        resizeObserver.observe(containerRef.current);

        return () => {
            resizeObserver.disconnect();
        };
    }, []);

    useEffect(() => {
        if (canvasState !== CanvasMode.None) {
            setOpenSelector(null);
        }
    }, [canvasState]);

    useEffect(() => {
        if (selectionBounds) {
            let x, y;
            if (isArrowLayer || isLineLayer) {
                const arrowLayer = liveLayers[selectedLayers[0]];
                const centerY = arrowLayer.center.y
                const startY = arrowLayer.y
                const endY = arrowLayer.y + arrowLayer.height
                x = (arrowLayer.width / 2 + arrowLayer.x) * zoom + camera.x;
                y = Math.min(centerY, startY, endY) * zoom + camera.y;

                if (y < 130) {
                    y = Math.max(centerY, startY, endY) * zoom + camera.y + 130;
                }
            } else {
                x = (selectionBounds.width / 2 + selectionBounds.x) * zoom + camera.x;
                y = (selectionBounds.y) * zoom + camera.y;
            }
            setInitialPosition({ x, y });
        }
    }, [selectedLayers, zoom, camera, liveLayers, isArrowLayer, isLineLayer, selectionBounds]);

    const moveToFront = useCallback(() => {
        const indices: number[] = [];

        if (!liveLayerIds) {
            return;
        }

        let arr = [...liveLayerIds];

        for (let i = 0; i < arr.length; i++) {
            if (selectedLayers.includes(arr[i])) {
                indices.push(i);
            }
        }

        const move = (arr: any[], fromIndex: number, toIndex: number) => {
            var element = arr[fromIndex];
            arr.splice(fromIndex, 1);
            arr.splice(toIndex, 0, element);
        }

        for (let i = 0; i < indices.length; i++) {
            move(arr, indices[i], arr.length - indices.length + i);
        }

        setLiveLayerIds(arr);

        updateR2Bucket('/api/r2-bucket/updateLayerIds', boardId, arr);

        if (socket) {
            socket.emit('layer-send', arr);
        }

    }, [selectedLayers, setLiveLayerIds, liveLayerIds, boardId, socket]);

    const moveToBack = useCallback(() => {
        const indices: number[] = [];

        if (!liveLayerIds) {
            return;
        }

        let arr = [...liveLayerIds];

        for (let i = 0; i < arr.length; i++) {
            if (selectedLayers.includes(arr[i])) {
                indices.push(i);
            }
        }

        const move = (arr: any[], fromIndex: number, toIndex: number) => {
            var element = arr[fromIndex];
            arr.splice(fromIndex, 1);
            arr.splice(toIndex, 0, element);
        }

        for (let i = 0; i < indices.length; i++) {
            move(arr, indices[i], i);
        }

        setLiveLayerIds(arr);

        updateR2Bucket('/api/r2-bucket/updateLayerIds', boardId, arr);

        if (socket) {
            socket.emit('layer-send', arr);
        }

    }, [selectedLayers, setLiveLayerIds, liveLayerIds, boardId, socket]);

    const setFill = useCallback((fill: Color) => {
        setLiveLayers((prevLayers: any) => {
            const newLayers = { ...prevLayers };
            const updatedIds: any = [];
            const updatedLayers: any = [];

            selectedLayers.forEach((id: string) => {
                const layer = newLayers[id];
                let opacity = layer.fill.a;

                if (fill.a === 0) {
                    opacity = 0;
                } else {
                    if (layer.fill.a === 0) {
                        opacity = 1;
                    }
                }

                newLayers[id] = { ...layer, fill: { ...fill, a: opacity } };
                updatedIds.push(id);
                updatedLayers.push(newLayers[id]);
            });

            if (updatedIds.length > 0) {
                updateR2Bucket('/api/r2-bucket/updateLayer', boardId, updatedIds, updatedLayers);
            }

            if (socket) {
                socket.emit('layer-update', updatedIds, updatedLayers);
            }

            return newLayers;
        });
    }, [selectedLayers, setLiveLayers, socket, boardId]);

    const setOutlineFill = useCallback((outlineFill: Color) => {
        setLiveLayers((prevLayers: any) => {
            const newLayers = { ...prevLayers };
            const updatedIds: any = [];
            const updatedLayers: any = [];

            selectedLayers.forEach((id: string) => {
                const layer = newLayers[id];
                let opacity = layer.outlineFill.a;

                if (outlineFill.a === 0) {
                    opacity = 0;
                } else {
                    if (layer.outlineFill.a === 0) {
                        opacity = 1;
                    }
                }

                newLayers[id] = { ...layer, outlineFill: { ...outlineFill, a: opacity } };
                updatedIds.push(id);
                updatedLayers.push(newLayers[id]);
            });

            updateR2Bucket('/api/r2-bucket/updateLayer', boardId, updatedIds, updatedLayers);


            if (socket) {
                socket.emit('layer-update', updatedIds, updatedLayers);
            }

            return newLayers;
        });
    }, [selectedLayers, setLiveLayers, boardId, socket]);

    const setOpacity = useCallback((opacity: number[]) => {
        setLiveLayers((prevLayers: any) => {
            const newLayers = { ...prevLayers };
            const updatedIds: any = [];
            const updatedLayers: any = [];

            selectedLayers.forEach((id: string) => {
                const layer = newLayers[id];
                if (layer) {
                    newLayers[id] = { ...layer, fill: { ...layer.fill, a: opacity[0] } };
                    updatedIds.push(id);
                    updatedLayers.push(newLayers[id]);
                }
            });

            updateR2Bucket('/api/r2-bucket/updateLayer', boardId, updatedIds, updatedLayers);

            if (socket) {
                socket.emit('layer-update', updatedIds, updatedLayers);
            }

            return newLayers;
        });
    }, [selectedLayers, setLiveLayers, boardId, socket])

    const setOutlineOpacity = useCallback((opacity: number[]) => {
        setLiveLayers((prevLayers: any) => {
            const newLayers = { ...prevLayers };
            const updatedIds: any = [];
            const updatedLayers: any = [];

            selectedLayers.forEach((id: string) => {
                const layer = newLayers[id];
                if (layer) {
                    newLayers[id] = { ...layer, outlineFill: { ...layer.outlineFill, a: opacity[0] } };
                    updatedIds.push(id);
                    updatedLayers.push(newLayers[id]);
                }
            });

            updateR2Bucket('/api/r2-bucket/updateLayer', boardId, updatedIds, updatedLayers);

            if (socket) {
                socket.emit('layer-update', updatedIds, updatedLayers);
            }

            return newLayers;
        });
    }, [selectedLayers, setLiveLayers, boardId, socket])

    const duplicateLayers = useCallback(() => {
        let minX = Infinity;
        let minY = Infinity;
        let maxX = -Infinity;
        let maxY = -Infinity;
        selectedLayers.forEach((id: string) => {
            const layer = liveLayers[id];
            minX = Math.min(minX, layer.x);
            minY = Math.min(minY, layer.y);
            maxX = Math.max(maxX, layer.x + layer.width);
            maxY = Math.max(maxY, layer.y + layer.height);
        });

        const offsetX = maxX - minX + 10; // Offset by 10 units for visibility

        const idMap = new Map();
        const newLayers: Record<string, Layer> = {};
        selectedLayers.forEach((id: string) => {
            const layer = { ...liveLayers[id] };

            const newId = nanoid();
            const clonedLayer = JSON.parse(JSON.stringify(layer));
            clonedLayer.x = clonedLayer.x + offsetX;
            if (clonedLayer.type === LayerType.Arrow || clonedLayer.type === LayerType.Line) {
                clonedLayer.center.x += offsetX;
            }
            idMap.set(id, newId);
            newLayers[newId] = clonedLayer;
        });

        Object.values(newLayers).forEach((layer) => {
            if (layer.type === LayerType.Arrow) {
                if (layer.startConnectedLayerId && idMap.has(layer.startConnectedLayerId)) {
                    layer.startConnectedLayerId = idMap.get(layer.startConnectedLayerId);
                } else {
                    layer.startConnectedLayerId = "";
                }
                if (layer.endConnectedLayerId && idMap.has(layer.endConnectedLayerId)) {
                    layer.endConnectedLayerId = idMap.get(layer.endConnectedLayerId);
                } else {
                    layer.endConnectedLayerId = "";
                }
            } else if (layer.type !== LayerType.Line && layer.type !== LayerType.Comment && layer.connectedArrows) {
                layer.connectedArrows = layer.connectedArrows.map(arrowId => idMap.get(arrowId) || arrowId);
            }
        });

        const newIds = Object.keys(newLayers);
        const clonedLayers = Object.values(newLayers);

        const command = new InsertLayerCommand(newIds, clonedLayers, setLiveLayers, setLiveLayerIds, boardId, socket, org, proModal);
        performAction(command);

        selectedLayersRef.current = newIds;

        const newPresence: Presence = {
            ...myPresence,
            selection: newIds
        };

        setMyPresence(newPresence);

    }, [selectedLayersRef, selectedLayers, myPresence, setLiveLayers, setLiveLayerIds, setMyPresence, org, proModal, socket, liveLayers, performAction, boardId, nanoid]);

    if (!selectionBounds) {
        return null;
    }

    let position = 0
    if (initialPosition) {
        position = initialPosition.y < 130
            ? initialPosition.y + selectionBounds.height * zoom + 30
            : initialPosition.y - 30;
    }

    if (canvasState === CanvasMode.Translating) {
        return null;
    }

    return (
        <div
            ref={containerRef}
            className="absolute p-1 rounded-xl bg-white dark:bg-zinc-800 border dark:border-zinc-800 shadow-sm flex select-none gap-x-1 items-center pointer-events-auto"
            style={{
                transform: initialPosition
                    ? `translate(
          calc(${Math.min(Math.max(initialPosition.x, containerWidth / 2), window.innerWidth - containerWidth / 2)}px - 50%),
          ${initialPosition.y < 130
                        ? `calc(${initialPosition.y + selectionBounds.height * zoom + 30}px)`
                        : `calc(${initialPosition.y - 30}px - 100%)`
                    }
        )`
                    : undefined
            }}
        >
            {isEditingText ? (
                // Only show text-related options when editing text
                <>
                    {hasText && (
                        <TextOptions
                            selectedLayers={selectedLayers}
                            setLiveLayers={setLiveLayers}
                            liveLayers={liveLayers}
                            socket={socket}
                            boardId={boardId}
                            openSelector={openSelector}
                            setOpenSelector={setOpenSelector}
                            expandUp={position + 50 + 150 > window.innerHeight}
                            layers={layers}
                        />
                    )}
                </>
            ) : (
                // Show all options when not editing text
                <>
                    {hasOutline && (
                        <>
                            <OutlineColorPicker
                                layers={layers}
                                handleOpacityChange={setOutlineOpacity}
                                onChange={setOutlineFill}
                                openSelector={openSelector}
                                setOpenSelector={setOpenSelector}
                                expandUp={position + 50 + 205 > window.innerHeight}
                            />
                            <ToolbarSeparator />
                        </>
                    )}
                    {!noFill && (
                        <>
                            <ColorPicker
                                layers={layers}
                                handleOpacityChange={setOpacity}
                                onChange={setFill}
                                openSelector={openSelector}
                                setOpenSelector={setOpenSelector}
                                expandUp={position + 50 + 205 > window.innerHeight}
                            />
                            <ToolbarSeparator />
                        </>
                    )}
                    {isPathLayer && (
                        <>
                            <PathStokeSizeSelection
                                selectedLayers={selectedLayers}
                                setLiveLayers={setLiveLayers}
                                liveLayers={liveLayers}
                                socket={socket}
                                boardId={boardId}
                            />
                            <ToolbarSeparator />
                        </>
                    )}
                    {isArrowLayer && (
                        <>
                            <ArrowHeadSelection
                                selectedLayers={selectedLayers}
                                setLiveLayers={setLiveLayers}
                                liveLayers={liveLayers}
                                socket={socket}
                                boardId={boardId}
                                openSelector={openSelector}
                                setOpenSelector={setOpenSelector}
                                expandUp={position + 50 + 80 > window.innerHeight}
                            />
                            <ToolbarSeparator />
                        </>
                    )}
                    {hasText && (
                        <>
                            <TextOptions
                                selectedLayers={selectedLayers}
                                setLiveLayers={setLiveLayers}
                                liveLayers={liveLayers}
                                socket={socket}
                                boardId={boardId}
                                openSelector={openSelector}
                                setOpenSelector={setOpenSelector}
                                expandUp={position + 50 + 150 > window.innerHeight}
                                layers={layers}
                            />
                            <ToolbarSeparator />
                        </>
                    )}
                    {isMediaLayer && (
                        <>
                            <DownloadButton
                                layers={layers}
                            />
                            <ToolbarSeparator />
                        </>
                    )}
                    <Hint label="Duplicate">
                        <Button
                            onClick={duplicateLayers}
                            variant="icon"
                            size="icon"
                        >
                            <Copy className="h-5 w-5" />
                        </Button>
                    </Hint>
                    <ToolbarSeparator />
                    <Hint label="Bring to front">
                        <Button
                            onClick={moveToFront}
                            variant="icon"
                            size="icon"
                        >
                            <BringToFront className="h-5 w-5" />
                        </Button>
                    </Hint>
                    <ToolbarSeparator />
                    <Hint label="Send to back">
                        <Button
                            onClick={moveToBack}
                            variant="icon"
                            size="icon"
                        >
                            <SendToBack className="h-5 w-5" />
                        </Button>
                    </Hint>
                    <ToolbarSeparator />
                    {/* <SketchlieAiDropdown 
                        title={board.title}
                        liveLayers={liveLayers}
                        setLiveLayers={setLiveLayers}
                        selectedLayersRef={selectedLayersRef}
                        boardId={boardId}
                        socket={socket}
                        performAction={performAction}
                    /> */}
                    <Hint label="Delete">
                        <Button
                            variant="icon"
                            size="icon"
                            onClick={() => deleteLayers(selectedLayers)}
                        >
                            <Trash2 className="h-5 w-5" />
                        </Button>
                    </Hint>
                </>
            )}
        </div>
    );
});

export const ToolbarSeparator = () => {
    return <div className="h-8 w-[1px] bg-zinc-300 dark:bg-zinc-400" />;
};

SelectionTools.displayName = "SelectionTools";

