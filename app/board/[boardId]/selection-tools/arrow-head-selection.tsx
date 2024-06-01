import { Button } from '@/components/ui/button';
import { ArrowHead } from '@/types/canvas';
import { MoveLeft, MoveRight, RefreshCcw } from 'lucide-react';
import { useState } from 'react';
import { Socket } from 'socket.io-client';

interface ArrowHeadSelectionProps {
    selectedLayers: any;
    setLiveLayers: (layers: any) => void;
    liveLayers: any;
    updateLayer: any;
    board: any;
    socket: Socket | null;
};

export const ArrowHeadSelection = ({
    selectedLayers,
    setLiveLayers,
    liveLayers,
    updateLayer,
    board,
    socket,
}: ArrowHeadSelectionProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedHead, setSelectedHead] = useState<'start' | 'end'>('start');
    const layer = liveLayers[selectedLayers[0]]
    const startArrowHead = layer.startArrowHead;
    const endArrowHead = layer.endArrowHead;

    const handleArrowHeadChange = (newArrowHead: ArrowHead) => {
        const newLayers = { ...liveLayers };
        const updatedIds: any = [];
        const updatedLayers: any = [];

        selectedLayers.map((layerId: string) => {
            if (selectedHead === 'start') {
                newLayers[layerId].startArrowHead = newArrowHead;
            } else {
                newLayers[layerId].endArrowHead = newArrowHead;
            }

            updatedIds.push(layerId);
            updatedLayers.push({
                startArrowHead: newLayers[layerId].startArrowHead,
                endArrowHead: newLayers[layerId].endArrowHead,
            });
        });

        if (updatedIds.length > 0) {
            updateLayer({
                board: board,
                layerId: updatedIds,
                layerUpdates: updatedLayers
            });
        }

        if (socket) {
            socket.emit('layer-update', updatedIds, updatedLayers);
        }

        setLiveLayers(newLayers);
        setIsOpen(false);
    }

    const reverseHeads = (startArrowHead: ArrowHead, endArrowHead: ArrowHead) => {
        const newLayers = { ...liveLayers };
        const updatedIds: any = [];
        const updatedLayers: any = [];

        selectedLayers.map((layerId: string) => {
            newLayers[layerId].startArrowHead = endArrowHead;
            newLayers[layerId].endArrowHead = startArrowHead;

            updatedIds.push(layerId);
            updatedLayers.push({
                startArrowHead: newLayers[layerId].startArrowHead,
                endArrowHead: newLayers[layerId].endArrowHead,
            });
        });

        if (updatedIds.length > 0) {
            updateLayer({
                board: board,
                layerId: updatedIds,
                layerUpdates: updatedLayers
            });
        }

        if (socket) {
            socket.emit('layer-update', updatedIds, updatedLayers);
        }

        setLiveLayers(newLayers);
    }

    return (
        <div className="relative inline-block text-left pl-1">
            <div className='flex flex-row items center justify-center gap-x-1'>
                <Button variant="board" size="default" onClick={() => { setIsOpen(!isOpen); setSelectedHead('start') }}>
                    {startArrowHead === ArrowHead.Triangle ? <MoveLeft /> : <span>None</span>}
                </Button>
                <Button variant="board" size="icon" onClick={() => reverseHeads(startArrowHead, endArrowHead)}>
                    <RefreshCcw />
                </Button>
                <Button variant="board" size="default" onClick={() => { setIsOpen(!isOpen); setSelectedHead('end') }}>
                    {endArrowHead === ArrowHead.Triangle ? <MoveRight /> : <span>None</span>}
                </Button>
            </div>
            {isOpen && (
                <div
                    className={`absolute mt-3 ${selectedHead === 'start' ? 'left-[-10px]' : 'right-[-10px]'} w-[75px] bg-white ring-1 ring-black ring-opacity-5`}
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