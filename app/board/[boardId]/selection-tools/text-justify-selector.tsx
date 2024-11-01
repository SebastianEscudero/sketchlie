"use client";

import { AlignCenter, AlignLeft, AlignRight, ArrowDownToLine, ArrowUpToLine, FoldVertical } from "lucide-react";
import { LayerType, SelectorType } from '@/types/canvas';
import { Button } from '@/components/ui/button';
import { Socket } from 'socket.io-client';
import { updateR2Bucket } from '@/lib/r2-bucket-functions';
import { Hint } from "@/components/hint";
import { getSelectorPositionClass } from "./selectionToolUtils";

interface TextJustifySelectorProps {
    selectedLayers: any;
    setLiveLayers: (layers: any) => void;
    liveLayers: any;
    socket: Socket | null;
    boardId: string;
    openSelector: SelectorType | null;
    setOpenSelector: (Selector: SelectorType | null) => void;
};

export const TextJustifySelector = ({
    selectedLayers,
    setLiveLayers,
    liveLayers,
    socket,
    boardId,
    openSelector,
    setOpenSelector,
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
    };

    const toggleSelector = () => {
        setOpenSelector(openSelector === SelectorType.TextJustify ? null : SelectorType.TextJustify);
    };

    const getAlignIcon = () => {
        switch (alignX) {
            case 'left':
                return AlignLeft;
            case 'right':
                return AlignRight;
            default:
                return AlignCenter;
        }
    };

    const AlignIcon = getAlignIcon();

    return (
        <div className="relative text-left border-neutral-200 flex justify-center">

            <Hint label={`Align ${alignX}`} side="top">
                <Button
                    variant="icon"
                    size="icon"
                    onClick={toggleSelector}
                    className={openSelector === SelectorType.TextJustify ? 'bg-blue-500/20' : ''}
                >
                    <AlignIcon className='w-6 h-6' />
                </Button>
            </Hint>

            {openSelector === SelectorType.TextJustify && (
                <div className={`p-3 absolute top-full mt-2 left-1/2 transform -translate-x-1/2 w-[140px] rounded-lg shadow-sm bg-white dark:bg-zinc-800 ring-1 ring-black ring-opacity-5`}>
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
                        <div className='flex flex-row justify-center items-center border-t dark:border-zinc-300 pt-1'>
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