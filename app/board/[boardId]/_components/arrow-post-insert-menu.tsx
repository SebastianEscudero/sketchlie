"use client";

import { useSelectionBounds } from "@/hooks/use-selection-bounds";
import { memo, useCallback, useEffect, useState } from "react";
import { ArrowOrientation, ArrowType, Layers, LayerType, Point } from "@/types/canvas";
import {
    ArrowBigDown,
    ArrowBigLeft,
    ArrowBigRight,
    ArrowBigUp,
    Circle,
    Diamond,
    Hexagon,
    MessageSquare,
    Square,
    Star,
    StickyNote,
    Triangle,
} from "lucide-react";
import { ArrowShapesButton } from "./arrow-shapes-button";
import { InsertLayerCommand } from "@/lib/commands";
import { nanoid } from "nanoid";
import { Button } from "@/components/ui/button";

interface ArrowPostInsertMenuProps {
    selectedLayersRef: any;
    liveLayers: any;
    zoom: number;
    camera: any;
    boardId: string;
    socket: any;
    org: any;
    proModal: any;
    setLiveLayers: any;
    setLiveLayerIds: any;
    performAction: any;
    setIsArrowPostInsertMenuOpen: any;
}

export const ArrowPostInsertMenu = memo(({
    selectedLayersRef,
    liveLayers,
    zoom,
    camera,
    boardId,
    socket,
    org,
    proModal,
    setLiveLayers,
    setLiveLayerIds,
    performAction,
    setIsArrowPostInsertMenuOpen,
}: ArrowPostInsertMenuProps) => {
    const arrowId = selectedLayersRef.current[0]
    const arrowLayer = liveLayers[arrowId];
    const selectionBounds = useSelectionBounds([arrowId], liveLayers);
    const [initialPosition, setInitialPosition] = useState<{ x: number, y: number } | null>(null);

    useEffect(() => {
        let x, y;
        const endY = arrowLayer.y + arrowLayer.height
        x = (arrowLayer.width + arrowLayer.x) * zoom + camera.x;
        y = endY * zoom + camera.y - 40;

        if (arrowLayer.width < 0) {
            x -= 220;
        }

        setInitialPosition({ x, y });
    }, [arrowId, zoom, camera, liveLayers]);

    const insertLayer = useCallback(async (layerType: LayerType) => {
        const offset = 5;
        const startConnectedLayer = liveLayers[arrowLayer.startConnectedLayerId];
        const layerWidth = startConnectedLayer.width || 80;
        const layerHeight = startConnectedLayer.height || 80;

        let x = arrowLayer.x + arrowLayer.width + offset;
        let y = arrowLayer.y + arrowLayer.height - layerHeight / 2;

        if (arrowLayer.width < 0) {
            x -= 2*offset + layerWidth; 
        }

        if (arrowLayer.arrowType === ArrowType.Diagram) {
            if (arrowLayer.orientation === ArrowOrientation.Vertical) {
              if (arrowLayer.height > 0) {
                y = arrowLayer.y + arrowLayer.height + offset;
              } else {
                y = arrowLayer.y + arrowLayer.height - layerHeight + offset;
              }
              x = arrowLayer.x + arrowLayer.width - layerWidth/2;
            }
        } else {
            const isHorizontal = Math.abs(arrowLayer.width) > Math.abs(arrowLayer.height);
            if (!isHorizontal) {
                if (arrowLayer.height > 0) {
                    y = arrowLayer.y + arrowLayer.height + offset;
                  } else {
                    y = arrowLayer.y + arrowLayer.height - layerHeight + offset;
                  }
                  x = arrowLayer.x + arrowLayer.width - layerWidth/2;
            }
        }

        const layerId = nanoid();

        let layer;
        let fillColor = { r: 0, g: 0, b: 0, a: 0 }
        let isNote = layerType === LayerType.Note

        if (layerType === LayerType.Image || layerType === LayerType.Video) {
            layer = {
                type: layerType,
                x: x,
                y: y,
                height: layerHeight,
                width: layerWidth,
                fill: isNote ? { r: 252, g: 225, b: 156, a: 1 } : fillColor,
                value: "",
                outlineFill: isNote ? { r: 0, g: 0, b: 0, a: 0 } : { r: 29, g: 29, b: 29, a: 1 },
                textFontSize: 12,
                alignX: 'center',
                alignY: 'center',
                connectedArrows: [arrowId],
                src: startConnectedLayer.src || "",
            };
        } else {
            layer = {
                type: layerType,
                x: x,
                y: y,
                height: layerHeight,
                width: layerWidth,
                fill: isNote ? { r: 252, g: 225, b: 156, a: 1 } : fillColor,
                value: "",
                outlineFill: isNote ? { r: 0, g: 0, b: 0, a: 0 } : { r: 29, g: 29, b: 29, a: 1 },
                textFontSize: 12,
                alignX: 'center',
                alignY: 'center',
                connectedArrows: [arrowId]
            };
        }

        const command = new InsertLayerCommand([layerId], [layer], setLiveLayers, setLiveLayerIds, boardId, socket, org, proModal);
        await performAction(command)
        setLiveLayers((prevLiveLayers: Layers) => {
            const updatedLayers = {
                ...prevLiveLayers,
                [arrowId]: {
                    ...prevLiveLayers[arrowId],
                    endConnectedLayerId: layerId,
                },
            };

            if (socket) {
                socket.emit('layer-update', [arrowId], [{...prevLiveLayers[arrowId], endConnectedLayerId: layerId}]);
            }

            return updatedLayers;
        });
        selectedLayersRef.current = [layerId];

        setIsArrowPostInsertMenuOpen(false);
    }, [socket, org, proModal, setLiveLayers, setLiveLayerIds, boardId, liveLayers, arrowId, performAction, arrowLayer, selectedLayersRef, setIsArrowPostInsertMenuOpen]);

    if (!selectionBounds) {
        return null;
    }

    return (
        <div
            className="pointer-events-auto absolute p-3 rounded-lg shadow-sm h-[180px] w-[172px] cursor-default bg-white dark:bg-[#383838] border dark:border-zinc-500 select-none gap-x-2 items-center"
            style={{
                transform: initialPosition
                    ? `translate(
                        calc(${initialPosition.x + 110}px - 50%),
                        ${initialPosition.y < 130
                        ? `50px`
                        : `calc(${initialPosition.y + 150}px - 100%)`
                    })` : undefined
            }}
        >
                <Button
                    variant="auth"
                    className="w-full"
                    onPointerDown={() => {
                        const type = liveLayers[arrowLayer.startConnectedLayerId].type || LayerType.Rectangle;
                        insertLayer(type);
                    }}
                >
                    Same shape +
                </Button>
                <div className="grid grid-cols-4 grid-rows-3 gap-2 mt-1">

                <ArrowShapesButton
                    icon={StickyNote}
                    onClick={() => {
                        insertLayer(LayerType.Note);
                    }}
                />
                <ArrowShapesButton
                    icon={Square}
                    onClick={() => {
                        insertLayer(LayerType.Rectangle);
                    }}
                />
                <ArrowShapesButton
                    icon={Circle}
                    onClick={() => {
                        insertLayer(LayerType.Ellipse);
                    }}
                />
                <ArrowShapesButton
                    icon={Diamond}
                    onClick={() => {
                        insertLayer(LayerType.Rhombus);
                    }}
                />
                <ArrowShapesButton
                    icon={Triangle}
                    onClick={() => {
                        insertLayer(LayerType.Triangle);
                    }}
                />
                <ArrowShapesButton
                    icon={Star}
                    onClick={() => {
                        insertLayer(LayerType.Star);
                    }}
                />
                <ArrowShapesButton
                    icon={Hexagon}
                    onClick={() => {
                        insertLayer(LayerType.Hexagon);
                    }}  
                />
                <ArrowShapesButton
                    icon={MessageSquare}
                    onClick={() => {
                        insertLayer(LayerType.CommentBubble);
                    }}
                />
                <ArrowShapesButton
                    icon={ArrowBigLeft}
                    onClick={() => {
                        insertLayer(LayerType.BigArrowLeft);
                    }}
                />
                <ArrowShapesButton
                    icon={ArrowBigUp}
                    onClick={() => {
                        insertLayer(LayerType.BigArrowUp);
                    }}
                />
                <ArrowShapesButton
                    icon={ArrowBigDown}
                    onClick={() => {
                        insertLayer(LayerType.BigArrowDown);
                    }}
                />
                <ArrowShapesButton
                    icon={ArrowBigRight}
                    onClick={() => {
                        insertLayer(LayerType.BigArrowRight);
                    }}
                />
            </div>
        </div>
    )
});

ArrowPostInsertMenu.displayName = "ArrowPostInsertMenu";
