import { Hint } from '@/components/hint';
import { Button } from '@/components/ui/button';
import { updateR2Bucket } from '@/lib/r2-bucket-functions';
import { LayerType, SelectorType } from '@/types/canvas';
import { ChevronDown, ChevronUp, Bold, Underline, Italic, Strikethrough, Type } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Socket } from 'socket.io-client';
import { DEFAULT_FONT, fontFamilies, getSelectorPositionClass, searchFonts } from './selectionToolUtils';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from '@/components/ui/input';

interface TextOptionsProps {
    selectedLayers: any;
    setLiveLayers: (layers: any) => void;
    liveLayers: any;
    socket: Socket | null;
    boardId: string;
    openSelector: SelectorType | null;
    setOpenSelector: (Selector: SelectorType | null) => void;
    expandUp: boolean;
    layers: any;
};

const fontSizes = [1, 2, 4, 6, 8, 10, 12, 14, 18, 24, 36, 48, 56, 64, 80, 144];

export const TextOptions = ({
    selectedLayers,
    setLiveLayers,
    liveLayers,
    socket,
    boardId,
    openSelector,
    setOpenSelector,
    expandUp = false,
    layers
}: TextOptionsProps) => {
    const [inputFontSize, setInputFontSize] = useState(layers[0].textFontSize || 12);
    const [textStyles, setTextStyles] = useState({
        bold: false,
        italic: false,
        underline: false,
        strikethrough: false,
    });
    const [fontFamily, setFontFamily] = useState(layers[0].fontFamily || DEFAULT_FONT);

    // Search Fonts
    const [fontSearchQuery, setFontSearchQuery] = useState('');
    const filteredFonts = searchFonts(fontSearchQuery);
    const inputRef = useRef<HTMLInputElement>(null);

    // Ensure the current font is always in the list
    const fontsToDisplay = filteredFonts.some(font => font.value === fontFamily)
        ? filteredFonts
        : [fontFamilies.find(font => font.value === fontFamily)!, ...filteredFonts];

    const updateTextStyles = useCallback(() => {
        setTextStyles({
            bold: document.queryCommandState('bold'),
            italic: document.queryCommandState('italic'),
            underline: document.queryCommandState('underline'),
            strikethrough: document.queryCommandState('strikethrough'),
        });
    }, []);

    useEffect(() => {
        document.addEventListener('selectionchange', updateTextStyles);
        return () => document.removeEventListener('selectionchange', updateTextStyles);
    }, [updateTextStyles]);

    useEffect(() => {
        setInputFontSize(layers[0].textFontSize || 12);
        setFontFamily(layers[0].fontFamily || DEFAULT_FONT);
    }, [layers])

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

    const handleStyleChange = useCallback((style: 'bold' | 'italic' | 'underline' | 'strikethrough') => {
        const selection = window.getSelection();
        if (selection && !selection.isCollapsed) {
            document.execCommand(style, false);
        }
    }, []);

    const toggleSelector = () => {
        setOpenSelector(openSelector === SelectorType.TextStyle ? null : SelectorType.TextStyle);
    };

    const renderStyleButton = (style: 'bold' | 'italic' | 'underline' | 'strikethrough', Icon: any, label: string) => (
        <Hint label={label} side="bottom">
            <Button
                variant="board"
                size="icon"
                onClick={() => handleStyleChange(style)}
                className={`${textStyles[style] ? 'bg-blue-500/20' : ''}`}
            >
                <Icon strokeWidth={2} />
            </Button>
        </Hint>
    );

    const handleFontFamilyChange = (newFontFamily: string) => {
        const newLayers = { ...liveLayers };
        const updatedIds: string[] = [];
        const updatedLayers: any[] = [];

        selectedLayers.forEach((layerId: string) => {
            const layer = newLayers[layerId];
            newLayers[layerId] = { ...layer, fontFamily: newFontFamily };

            updatedIds.push(layerId);
            updatedLayers.push({ fontFamily: newFontFamily });
        });

        if (updatedIds.length > 0) {
            updateR2Bucket('/api/r2-bucket/updateLayer', boardId, updatedIds, updatedLayers);
        }

        if (socket) {
            socket.emit('layer-update', updatedIds, updatedLayers);
        }

        setLiveLayers(newLayers);
        setTextStyles(prev => ({ ...prev, fontFamily: newFontFamily }));
    };

    const handleFontSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFontSearchQuery(e.target.value);
        // Ensure the input keeps focus after state update
        setTimeout(() => {
            inputRef.current?.focus();
        }, 0);
    };

    return (
        <div className="relative inline-block text-left">
            <div className='flex flex-row items-center justify-center space-x-2'>
                <div onClick={() => setOpenSelector(openSelector === SelectorType.FontSize ? null : SelectorType.FontSize)}>
                    <input
                        id="font-size-menu"
                        type="number"
                        value={Math.round(inputFontSize)}
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                        onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.blur()}
                        className='h-8 w-8 text-center text-sm bg-transparent'
                    />
                </div>
                <div className='flex flex-col'>
                    <button onClick={() => handleArrowClick('up')}><ChevronUp className="h-4 w-4" /></button>
                    <button onClick={() => handleArrowClick('down')}><ChevronDown className="h-4 w-4" /></button>
                </div>
                <div>
                    <Hint label="Text Style" side="top">
                        <Button
                            variant="board"
                            size="icon"
                            onClick={toggleSelector}
                            className={`flex items-center ${openSelector === SelectorType.TextStyle ? 'bg-blue-500/20' : ''}`}
                        >
                            <Type strokeWidth={2} />
                        </Button>
                    </Hint>

                    {openSelector === SelectorType.TextStyle && (
                        <div className="absolute flex flex-row items-center justify-center left-0 mt-2 w-[308px] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100">
                            <Select onValueChange={handleFontFamilyChange} value={fontFamily}>
                                <SelectTrigger className="w-[120px]">
                                    <SelectValue placeholder={fontFamily} />
                                </SelectTrigger>
                                <SelectContent>
                                    <div className="p-2">
                                        <Input
                                            ref={inputRef}
                                            type="text"
                                            placeholder="Search fonts..."
                                            value={fontSearchQuery}
                                            onChange={handleFontSearchChange}
                                            className="w-full mb-2"
                                        />
                                    </div>
                                    <SelectGroup>
                                        {fontsToDisplay.map(font => (
                                            <SelectItem key={font.value} value={font.value} style={{ fontFamily: font.value }}>
                                                {font.label}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <div className="p-1 space-x-1">
                                {renderStyleButton('bold', Bold, 'Bold')}
                                {renderStyleButton('italic', Italic, 'Italic')}
                                {renderStyleButton('underline', Underline, 'Underline')}
                                {renderStyleButton('strikethrough', Strikethrough, 'Strikethrough')}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {openSelector === SelectorType.FontSize && (
                <div
                    className={`shadow-custom-1 rounded-lg absolute ${getSelectorPositionClass(expandUp)} w-[55px] bg-white dark:bg-[#272727] ring-1 ring-black ring-opacity-5`}
                >
                    <div className="py-4 grid grid-cols-1 gap-5 w-full text-xs" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        {fontSizes.slice(5).map(fontSize => (
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