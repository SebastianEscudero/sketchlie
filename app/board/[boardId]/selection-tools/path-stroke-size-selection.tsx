import { Slider } from '@/components/ui/slider';
import { updateR2Bucket } from '@/lib/r2-bucket-functions';
import { Socket } from 'socket.io-client';

interface PathStokeSizeSelectionProps {
    selectedLayers: any;
    setLiveLayers: (layers: any) => void;
    liveLayers: any;
    socket: Socket | null;
    boardId: string;
};

export const PathStokeSizeSelection = ({
    selectedLayers,
    setLiveLayers,
    liveLayers,
    socket,
    boardId,
}: PathStokeSizeSelectionProps) => {

    const strokeSize = liveLayers[selectedLayers[0]].strokeSize;

    const handleStrokeSizeChange = (newStrokeSize: number[]) => {
        const newLayers = { ...liveLayers };
        const updatedIds: any = [];
        const updatedLayers: any = [];

        selectedLayers.map((layerId: string) => {
            const layer = newLayers[layerId];
            newLayers[layerId] = { ...layer, strokeSize: newStrokeSize };

            updatedIds.push(layerId);
            updatedLayers.push({
                strokeSize: newLayers[layerId].strokeSize,
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
    
    return (
        <div className="relative inline-block text-left pl-1">
            <div className='flex flex-row items center justify-center gap-x-1'>
            <Slider
                defaultValue={[strokeSize || 2]}
                min={1}
                max={8}
                step={1}
                className='w-20 cursor-pointer'
                onValueChange={handleStrokeSizeChange}
            />
            </div>
        </div>
    )
};