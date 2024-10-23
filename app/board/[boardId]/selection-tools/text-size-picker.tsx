import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { LayerType } from "@/types/canvas";
import { updateR2Bucket } from "@/lib/r2-bucket-functions";
import { Input } from "@/components/ui/input";

interface TextSizePickerProps {
    layers: any;
    setLiveLayers: any;
    liveLayers: any;
    socket: any;
    boardId: string;
    selectedLayers: string[];
}

const fontSizes = [1, 2, 4, 6, 8, 10, 12, 14, 18, 24, 36, 48, 56, 64, 80, 144];

export const TextSizePicker = ({ 
    layers,
    setLiveLayers,
    liveLayers,
    socket,
    boardId,
    selectedLayers,
}: TextSizePickerProps) => {
    const [inputFontSize, setInputFontSize] = useState(layers[0].textFontSize || 12);

    useEffect(() => {
        setInputFontSize(layers[0].textFontSize || 12);
    }, [layers]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputFontSize(parseInt(event.target.value));
    };

    const handleInputBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        let fontSize = parseInt(event.target.value);
        if (!isNaN(fontSize)) {
            if (fontSize > 144) {
                fontSize = 144;
            } else if (fontSize < 1) {
                fontSize = 1
            }
            handleFontSizeChange(fontSize);
        }
    };

    const handleFontSizeChange = (fontSize: number) => {
        const newLayers = { ...liveLayers };
        const updatedIds: any = [];
        const updatedLayers: any = [];

        selectedLayers.map((layerId: string) => {
            const originalFontSize = newLayers[layerId].textFontSize;
            const scaleFactor = fontSize / originalFontSize;
            const layer = newLayers[layerId];
            newLayers[layerId] = { ...layer, textFontSize: fontSize };
            if (newLayers[layerId].type === LayerType.Text) {
                newLayers[layerId].width *= scaleFactor;
                newLayers[layerId].height *= scaleFactor;
            }


            updatedIds.push(layerId);
            updatedLayers.push({
                textFontSize: fontSize,
                width: newLayers[layerId].width,
                height: newLayers[layerId].height,
            });
        });

        if (updatedIds.length > 0) {
            updateR2Bucket('/api/r2-bucket/updateLayer', boardId, updatedIds, updatedLayers);
        }

        if (socket) {
            socket.emit('layer-update', updatedIds, updatedLayers);
        }

        setLiveLayers(newLayers);
        setInputFontSize(fontSize);
    };

    const handleArrowClick = (direction: string) => {
        let currentIndex = fontSizes.indexOf(inputFontSize);
        if (currentIndex === -1) {
            currentIndex = fontSizes.reduce((prev, curr, index) =>
                Math.abs(curr - inputFontSize) < Math.abs(fontSizes[prev] - inputFontSize) ? index : prev, 0);
        }
        if (direction === 'up' && currentIndex < fontSizes.length - 1) {
            handleFontSizeChange(fontSizes[currentIndex + 1]);
        } else if (direction === 'down' && currentIndex > 0) {
            handleFontSizeChange(fontSizes[currentIndex - 1]);
        }
    };


    return (
        <>
            <Input
                id="font-size-menu"
                type="number"
                value={Math.round(inputFontSize)}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.blur()}
                className='h-8 w-8 text-center text-sm bg-transparent p-0'
            />
            <div className='flex flex-col'>
                <button onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); handleArrowClick('up'); }}><ChevronUp className="h-4 w-4" /></button>
                <button onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); handleArrowClick('down'); }}><ChevronDown className="h-4 w-4" /></button>
            </div>
        </>
    )
};