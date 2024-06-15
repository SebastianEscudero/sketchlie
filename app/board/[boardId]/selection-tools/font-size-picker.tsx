import { LayerType, SelectorType } from '@/types/canvas';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';

interface FontSizePickerProps {
    selectedLayers: any;
    setLiveLayers: (layers: any) => void;
    liveLayers: any;
    updateLayer: any;
    board: any;
    socket: Socket | null;
    openSelector: SelectorType | null;
    setOpenSelector: (Selector: SelectorType | null) => void;
    expandUp: boolean;
};

const fontSizes = [10, 12, 14, 18, 24, 36, 48, 56, 64, 80, 144];

export const FontSizePicker = ({
    selectedLayers,
    setLiveLayers,
    liveLayers,
    updateLayer,
    board,
    socket,
    openSelector,
    setOpenSelector,
    expandUp = false
}: FontSizePickerProps) => {
    const [inputFontSize, setInputFontSize] = useState(liveLayers[selectedLayers[0]].textFontSize);
    
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
        setInputFontSize(fontSize);
      };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputFontSize(parseInt(event.target.value));
    };

    const handleInputBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        let fontSize = parseInt(event.target.value);
        if (!isNaN(fontSize)) {
            if (fontSize > 144) {
                fontSize = 144;
            } else if (fontSize < 10) {
                fontSize = 10
            }
            handleFontSizeChange(fontSize);
        }
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

    const selectorPositionClass = expandUp ? 'bottom-[100%] mb-3' : 'top-[100%] mt-3';

    return (
        <div className="relative inline-block text-left">
            <div className='flex flex-row items center justify-center'>
                <div onClick={() => setOpenSelector(openSelector === SelectorType.FontSize ? null : SelectorType.FontSize)}>
                    <input
                        id="font-size-menu"
                        type="number"
                        value={Math.round(inputFontSize)}
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                        onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.blur()}
                        className='h-8 w-8 text-center text-sm'
                    />
                </div>
                <div className='flex flex-col pl-3'>
                    <button onClick={() => handleArrowClick('up')}><ChevronUp className="h-4 w-4" /></button>
                    <button onClick={() => handleArrowClick('down')}><ChevronDown className="h-4 w-4" /></button>
                </div>
            </div>
            {openSelector === SelectorType.FontSize && (
                <div
                    className={`absolute ${selectorPositionClass} right-5 w-[65px] bg-white ring-1 ring-black ring-opacity-5`}
                >
                    <div className="py-5 px-3 grid grid-cols-1 gap-5 w-full text-sm" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        {fontSizes.map(fontSize => (
                            <button key={fontSize} onClick={() => handleFontSizeChange(fontSize)}>
                                {fontSize}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
};