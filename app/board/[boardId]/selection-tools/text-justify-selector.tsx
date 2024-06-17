"use client";

import { useEffect, useState } from 'react';
import { AlignCenter, AlignLeft, AlignRight, ArrowDownToLine, ArrowUpToLine, FoldVertical } from "lucide-react";
import { LayerType, SelectorType } from '@/types/canvas';
import { Button } from '@/components/ui/button';
import { Socket } from 'socket.io-client';
import { updateR2Bucket } from '@/lib/r2-bucket-functions';

interface TextJustifySelectorProps {
    selectedLayers: any;
    setLiveLayers: (layers: any) => void;
    liveLayers: any;
    socket: Socket | null;
    boardId: string;
    openSelector: SelectorType | null;
    setOpenSelector: (Selector: SelectorType | null) => void;
    expandUp: boolean;
};

export const TextJustifySelector = ({
    selectedLayers,
    setLiveLayers,
    liveLayers,
    socket,
    boardId,
    openSelector,
    setOpenSelector,
    expandUp = false
}: TextJustifySelectorProps) => {
    let alignX = liveLayers[selectedLayers[0]].alignX || "center";
    let alignY = liveLayers[selectedLayers[0]].alignY || "center";
    let hasTextLayer = selectedLayers.some((layerId: string) => liveLayers[layerId].type === LayerType.Text);

    const updateAlignment = (newAlignX: string | null, newAlignY: string | null) => {
        const newLayers = { ...liveLayers };
        const updatedIds: any = [];
        const updatedLayers: any = [];

        selectedLayers.map((layerId: string) => {
            const layer = newLayers[layerId];

            if (newAlignX) {
                newLayers[layerId] = { ...layer, alignX: newAlignX };
            }

            if (newAlignY) {
                newLayers[layerId] = { ...layer, alignY: newAlignY };
            }
            updatedIds.push(layerId);
            updatedLayers.push({
                ...newLayers[layerId],
            });
        });

        if (updatedIds.length > 0) {
            updateR2Bucket('/api/r2-bucket/updateLayer', boardId, updatedIds, updatedLayers);
        }

        if (socket) {
            socket.emit('layer-update', updatedIds, updatedLayers);
        }

        setLiveLayers(newLayers);
        setOpenSelector(null);
    };

    const selectorPositionClass = expandUp ? 'bottom-[100%] mb-4' : 'top-[100%] mt-4';

    return (
        <div className="relative text-left border-r pr-1.5 border-neutral-200 flex justify-center">

            {alignX === 'left' && <AlignLeft className='w-6 h-6 mx-2 hover:cursor-pointer' onClick={() => setOpenSelector(openSelector === SelectorType.TextJustify ? null : SelectorType.TextJustify)} />}
            {alignX === 'right' && <AlignRight className='w-6 h-6 mx-2 hover:cursor-pointer' onClick={() => setOpenSelector(openSelector === SelectorType.TextJustify ? null : SelectorType.TextJustify)} />}
            {alignX === 'center' && <AlignCenter className='w-6 h-6 mx-2 hover:cursor-pointer' onClick={() => setOpenSelector(openSelector === SelectorType.TextJustify ? null : SelectorType.TextJustify)} />}

            {openSelector === SelectorType.TextJustify && (
                <div className={`p-3 absolute ${selectorPositionClass} left-1/2 transform -translate-x-1/2 w-[140px] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5`}>
                    <div className='flex flex-row justify-center items-center mb-1'>
                        {/* Horizontal Alignment Buttons */}
                        <Button onClick={() => updateAlignment('left', null)} variant={alignX === 'left' ? "alignedActive" : "aligned"} className='px-1'>
                            <AlignLeft className='w-5 h-5 mx-2' />
                        </Button>
                        <Button onClick={() => updateAlignment('center', null)} variant={alignX === 'center' ? "alignedActive" : "aligned"} className='px-1'>
                            <AlignCenter className='w-5 h-5 mx-2' />
                        </Button>
                        <Button onClick={() => updateAlignment('right', null)} variant={alignX === 'right' ? "alignedActive" : "aligned"} className='px-1'>
                            <AlignRight className='w-5 h-5 mx-2' />
                        </Button>
                    </div>
                    {!hasTextLayer && (
                        <div className='flex flex-row justify-center items-center border-t pt-1'>
                            {/* Vertical Alignment Buttons */}
                            <Button onClick={() => updateAlignment(null, 'top')} variant={alignY === 'top' ? "alignedActive" : "aligned"} className='px-1'>
                                <ArrowUpToLine className='w-5 h-5 mx-2' />
                            </Button>
                            <Button onClick={() => updateAlignment(null, 'center')} variant={alignY === 'center' ? "alignedActive" : "aligned"} className='px-1'>
                                <FoldVertical className='w-5 h-5 mx-2' />
                            </Button>
                            <Button onClick={() => updateAlignment(null, 'bottom')} variant={alignY === 'bottom' ? "alignedActive" : "aligned"} className='px-1'>
                                <ArrowDownToLine className='w-5 h-5 mx-2' />
                            </Button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};