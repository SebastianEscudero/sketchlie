import { Button } from '@/components/ui/button';
import { updateR2Bucket } from '@/lib/r2-bucket-functions';
import { ArrowHead, ArrowType, SelectorType } from '@/types/canvas';
import { MoveLeft, MoveRight, MoveUpRight, Redo, RefreshCcw, TrendingUp } from 'lucide-react';
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
    const arrowBodyType = layer.arrowType || ArrowType.Straight;
    const startArrowHead = layer.startArrowHead;
    const endArrowHead = layer.endArrowHead;

    const handleArrowBodyChange = (newArrowBody: ArrowType) => {
        const newLayers = { ...liveLayers };
        const updatedIds: any = [];
        const updatedLayers: any = [];

        selectedLayers.map((layerId: string) => {
            const layer = newLayers[layerId];
            let center = layer.center;
            if (newArrowBody === ArrowType.Diagram) {
                center = { x: layer.x + layer.width / 2, y: layer.y + layer.height / 2 };
            }

            newLayers[layerId] = { ...layer, arrowType: newArrowBody, center: center };
            updatedIds.push(layerId);
            updatedLayers.push({
                arrowType: newLayers[layerId].newArrowBody,
            });
        });

        if (updatedIds.length > 0) {
            updateR2Bucket('/api/r2-bucket/updateLayer', boardId, updatedIds, updatedLayers);
        }

        if (socket) {
            socket.emit('layer-update', updatedIds, updatedLayers);
        }

        setLiveLayers(newLayers);
        setOpenSelector(openSelector === SelectorType.ArrowType ? null : SelectorType.ArrowType);
    };

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
                <Button variant="board" size="default" className='px-2.5' onClick={() => {
                    if (openSelector === SelectorType.ArrowHead && selectedHead === 'start') {
                        setOpenSelector(null);
                    } else {
                        setOpenSelector(SelectorType.ArrowHead);
                    }
                    setSelectedHead('start');
                }}>
                    {startArrowHead === ArrowHead.Triangle ? <MoveLeft className='w-5 h-5'/> : <span className='text-xs'>None</span>}
                </Button>
                <Button variant="board" size="icon" onClick={() => reverseHeads(startArrowHead, endArrowHead)}>
                    <RefreshCcw />
                </Button>
                <Button variant="board" size="default" className='px-2.5' onClick={() => {
                    if (openSelector === SelectorType.ArrowHead && selectedHead === 'end') {
                        setOpenSelector(null);
                    } else {
                        setOpenSelector(SelectorType.ArrowHead);
                    }
                    setSelectedHead('end');
                }}>
                    {endArrowHead === ArrowHead.Triangle ? <MoveRight className='w-5 h-5'/> : <span className='text-xs'>None</span>}
                </Button>
                <Button variant="board" size="default" className='px-2.5' onClick={() => {
                    if (openSelector === SelectorType.ArrowType) {
                        setOpenSelector(null);
                    } else {
                        setOpenSelector(SelectorType.ArrowType);
                    }
                }}>
                    {arrowBodyType === ArrowType.Straight ? <MoveUpRight className='w-5 h-5'/> : arrowBodyType === ArrowType.Curved ? <Redo className="w-5 h-5"/> : arrowBodyType === ArrowType.Diagram ? <TrendingUp className='w-5 h-5'/> : <MoveUpRight className='w-5 h-5'/>}
                </Button>
            </div>
            {openSelector === SelectorType.ArrowHead && (
                <div
                    className={`shadow-custom-1 rounded-lg absolute ${selectorPositionClass} ${selectedHead === 'start' ? 'left-[-10px]' : 'left-[84px]'} w-[75px] bg-white dark:bg-[#383838] ring-1 ring-black ring-opacity-5`}
                >
                    <div className="p-2 grid grid-cols-1 gap-2 w-full text-sm" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        <Button variant="board" size="default" className="text-xs" onClick={() => handleArrowHeadChange(ArrowHead.None)}>
                            None
                        </Button>
                        <Button variant="board" size="default" onClick={() => handleArrowHeadChange(ArrowHead.Triangle)}>
                            {selectedHead === 'start' ? <MoveLeft className='w-5 h-5'/> : <MoveRight className='w-5 h-5'/>}
                        </Button>
                    </div>
                </div>
            )}
            {openSelector === SelectorType.ArrowType && (
                <div
                    className={`shadow-custom-1 rounded-lg absolute ${selectorPositionClass} left-[126px] w-[75px] bg-white dark:bg-[#383838] ring-1 ring-black ring-opacity-5`}
                >
                    <div className="p-2 grid grid-cols-1 gap-2 w-full text-sm" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        <Button variant="board" size="default" onClick={() => handleArrowBodyChange(ArrowType.Straight)}>
                            <MoveUpRight className='w-5 h-5'/>
                        </Button>
                        <Button variant="board" size="default" onClick={() => handleArrowBodyChange(ArrowType.Curved)}>
                            <Redo className="w-5 h-5"/>
                        </Button>
                        <Button variant="board" size="default" onClick={() => handleArrowBodyChange(ArrowType.Diagram)}>
                            <TrendingUp className="w-5 h-5"/>
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
};