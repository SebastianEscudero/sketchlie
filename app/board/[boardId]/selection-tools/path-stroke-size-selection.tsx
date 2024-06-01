import { Slider } from '@/components/ui/slider';
import { Socket } from 'socket.io-client';

interface PathStokeSizeSelectionProps {
    selectedLayers: any;
    setLiveLayers: (layers: any) => void;
    liveLayers: any;
    updateLayer: any;
    board: any;
    socket: Socket | null;
};

export const PathStokeSizeSelection = ({
    selectedLayers,
    setLiveLayers,
    liveLayers,
    updateLayer,
    board,
    socket,
}: PathStokeSizeSelectionProps) => {

    const strokeSize = liveLayers[selectedLayers[0]].strokeSize;

    const handleStrokeSizeChange = (newStrokeSize: number[]) => {
        const newLayers = { ...liveLayers };
        const updatedIds: any = [];
        const updatedLayers: any = [];

        selectedLayers.map((layerId: string) => {
            newLayers[layerId].strokeSize = newStrokeSize;

            updatedIds.push(layerId);
            updatedLayers.push({
                strokeSize: newLayers[layerId].strokeSize,
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