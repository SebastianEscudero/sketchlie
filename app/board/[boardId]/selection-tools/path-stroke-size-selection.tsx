import { Slider } from '@/components/ui/slider';
import { Socket } from 'socket.io-client';

interface PathStokeSizeSelectionProps {
    selectedLayers: any;
    setLiveLayers: (layers: any) => void;
    liveLayers: any;
    updateLayer: any;
    boardId: string;
    socket: Socket | null;
};

export const PathStokeSizeSelection = ({
    selectedLayers,
    setLiveLayers,
    liveLayers,
    updateLayer,
    boardId,
    socket,
}: PathStokeSizeSelectionProps) => {

    const strokeSize = liveLayers[selectedLayers[0]].strokeSize;

    const handleStrokeSizeChange = (newStrokeSize: number[]) => {
        const newLayers = { ...liveLayers };
        const updatedIds: any = [];
        const updatedLayers: any = [];

        selectedLayers.map((layerId: string) => {
            newLayers[layerId].strokeSize = newStrokeSize[0];

            updatedIds.push(layerId);
            updatedLayers.push({
                startArrowHead: newLayers[layerId].startArrowHead,
                endArrowHead: newLayers[layerId].endArrowHead,
            });
        });

        if (updatedIds.length > 0) {
            updateLayer({
                boardId: boardId,
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
            <Slider
                defaultValue={[strokeSize || 2]}
                min={1}
                max={6}
                step={1}
                className='w-20 '
                onValueChange={handleStrokeSizeChange}
            />
            </div>
        </div>
    )
};