import { Button } from '@/components/ui/button';
import { updateR2Bucket } from '@/lib/r2-bucket-functions';
import { ArrowHead, SelectorType } from '@/types/canvas';
import { MoveLeft, MoveRight, RefreshCcw } from 'lucide-react';
import { useState } from 'react';
import { Socket } from 'socket.io-client';

interface ArrowHeadSelectionProps {
    selectedLayers: any;
    setLiveLayers: (layers: any) => void;
    liveLayers: any;
    socket: Socket | null;
    boardId: string;
    openSelector: SelectorType | null;
    setOpenSelector: (Selector: SelectorType | null) => void;
    expandUp: boolean;
};

export const ArrowHeadSelection = ({
    selectedLayers,
    setLiveLayers,
    liveLayers,
    socket,
    boardId,
    openSelector,
    setOpenSelector,
    expandUp = false
}: ArrowHeadSelectionProps) => {
    const [selectedHead, setSelectedHead] = useState<'start' | 'end'>('start');
    const layer = liveLayers[selectedLayers[0]]
    const startArrowHead = layer.startArrowHead;
    const endArrowHead = layer.endArrowHead;

    const handleArrowHeadChange = (newArrowHead: ArrowHead) => {
        const newLayers = { ...liveLayers };
        const updatedIds: any = [];
        const updatedLayers: any = [];

        selectedLayers.map((layerId: string) => {
            const layer = newLayers[layerId];
            if (selectedHead === 'start') {
                newLayers[layerId] = { ...layer, startArrowHead: newArrowHead };
            } else {
                newLayers[layerId] = { ...layer, endArrowHead: newArrowHead };
            }

            updatedIds.push(layerId);
            updatedLayers.push({
                startArrowHead: newLayers[layerId].startArrowHead,
                endArrowHead: newLayers[layerId].endArrowHead,
            });
        });

        if (updatedIds.length > 0) {
            updateR2Bucket('/api/r2-bucket/updateLayer', boardId, updatedIds, updatedLayers);
        }

        if (socket) {
            socket.emit('layer-update', updatedIds, updatedLayers);
        }

        setLiveLayers(newLayers);
        setOpenSelector(openSelector === SelectorType.ArrowHead ? null : SelectorType.ArrowHead);
    }

    const reverseHeads = (startArrowHead: ArrowHead, endArrowHead: ArrowHead) => {
        const newLayers = { ...liveLayers };
        const updatedIds: any = [];
        const updatedLayers: any = [];

        selectedLayers.map((layerId: string) => {
            const layer = newLayers[layerId];
            newLayers[layerId] = { ...layer, startArrowHead: endArrowHead, endArrowHead: startArrowHead };


            updatedIds.push(layerId);
            updatedLayers.push({
                startArrowHead: newLayers[layerId].startArrowHead,
                endArrowHead: newLayers[layerId].endArrowHead,
            });
        });

        if (updatedIds.length > 0) {
            updateR2Bucket('/api/r2-bucket/updateLayer', boardId, updatedIds, updatedLayers);
        }

        if (socket) {
            socket.emit('layer-update', updatedIds, updatedLayers);
        }

        setLiveLayers(newLayers);
    }

    const selectorPositionClass = expandUp ? 'bottom-[100%] mb-3' : 'top-[100%] mt-3';

    return (
        <div className="relative inline-block text-left pl-1">
            <div className='flex flex-row items center justify-center gap-x-1'>
                <Button variant="board" size="default" onClick={() => {
                    if (openSelector === SelectorType.ArrowHead && selectedHead === 'start') {
                        setOpenSelector(null);
                    } else {
                        setOpenSelector(SelectorType.ArrowHead);
                    }
                    setSelectedHead('start');
                }}>
                    {startArrowHead === ArrowHead.Triangle ? <MoveLeft /> : <span>None</span>}
                </Button>
                <Button variant="board" size="icon" onClick={() => reverseHeads(startArrowHead, endArrowHead)}>
                    <RefreshCcw />
                </Button>
                <Button variant="board" size="default" onClick={() => {
                    if (openSelector === SelectorType.ArrowHead && selectedHead === 'end') {
                        setOpenSelector(null);
                    } else {
                        setOpenSelector(SelectorType.ArrowHead);
                    }
                    setSelectedHead('end');
                }}>
                    {endArrowHead === ArrowHead.Triangle ? <MoveRight /> : <span>None</span>}
                </Button>
            </div>
            {openSelector === SelectorType.ArrowHead && (
                <div
                    className={`drop-shadow-md absolute ${selectorPositionClass} ${selectedHead === 'start' ? 'left-[-10px]' : 'right-[-10px]'} w-[75px] bg-white ring-1 ring-black ring-opacity-5`}
                >
                    <div className="p-3 grid grid-cols-1 gap-2 w-full text-sm" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        <Button variant="board" size="default" onClick={() => handleArrowHeadChange(ArrowHead.None)}>
                            None
                        </Button>
                        <Button variant="board" size="default" onClick={() => handleArrowHeadChange(ArrowHead.Triangle)}>
                            {selectedHead === 'start' ? <MoveLeft /> : <MoveRight />}
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
};