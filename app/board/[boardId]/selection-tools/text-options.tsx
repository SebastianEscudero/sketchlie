import { Hint } from '@/components/hint';
import { Button } from '@/components/ui/button';
import { updateR2Bucket } from '@/lib/r2-bucket-functions';
import { Color, SelectorType } from '@/types/canvas';
import { Bold, Underline, Italic, Strikethrough, Type } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Socket } from 'socket.io-client';
import { DEFAULT_FONT, fontFamilies, searchFonts } from './selectionToolUtils';
import { Input } from '@/components/ui/input';
import { colorToCss } from '@/lib/utils';
import { BaselineIcon } from '@/public/custom-icons/baseline';
import { TextSizePicker } from './text-size-picker';
import { HightlighterIcon } from '@/public/custom-icons/highlighter';
import { useLayerTextEditingStore } from '../canvas-objects/utils/use-layer-text-editing';
import { ToolbarSeparator } from '../_components/selection-tools';
import { TextJustifySelector } from './text-justify-selector';
import { ColorPalette } from './color-palette';
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

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
    const [fontFamily, setFontFamily] = useState(layers[0].fontFamily || DEFAULT_FONT);
    const isEditing = useLayerTextEditingStore(state => state.isEditing);
    const setIsEditing = useLayerTextEditingStore(state => state.setIsEditing);

    const [textStyles, setTextStyles] = useState({
        bold: false,
        italic: false,
        underline: false,
        strikethrough: false,
        color: { r: 0, g: 0, b: 0, a: 1 } as Color,
        highlightColor: { r: 0, g: 0, b: 0, a: 1 } as Color,
    });

    // Search Fonts
    const [fontSearchQuery, setFontSearchQuery] = useState('');
    const filteredFonts = searchFonts(fontSearchQuery);
    const inputRef = useRef<HTMLInputElement>(null);

    // Ensure the current font is always in the list
    const fontsToDisplay = filteredFonts.some(font => font.value === fontFamily)
        ? filteredFonts
        : [fontFamilies.find(font => font.value === fontFamily)!, ...filteredFonts];

    type StyleChange = TextStyle | 'color' | 'highlightColor';

    // Helper to check if a color is transparent
    const isTransparent = (color: Color) => {
        return color.r === 0 && color.g === 0 && color.b === 0 && color.a === 0;
    };

    const handleStyleChange = useCallback((style: StyleChange, color?: Color) => {
        switch (style) {
            case 'bold':
                document.execCommand('bold', false);
                break;
            case 'italic':
                document.execCommand('italic', false);
                break;
            case 'underline':
                document.execCommand('underline', false);
                break;
            case 'strikethrough':
                document.execCommand('strikethrough', false);
                break;
            case 'color':
                if (color) {
                    // If selecting transparent color, set all values to 0
                    const newColor = isTransparent(color)
                        ? { r: 0, g: 0, b: 0, a: 0 }
                        : color;
                    
                    const colorValue = isTransparent(color) ? 'transparent' : colorToCss(newColor);
                    document.execCommand('foreColor', false, colorValue);
                    setTextStyles(prev => ({ ...prev, color: newColor }));
                }
                break;
            case 'highlightColor':
                if (color) {
                    // If selecting transparent color, set all values to 0
                    const newColor = isTransparent(color)
                        ? { r: 0, g: 0, b: 0, a: 0 }
                        : { ...color, a: 0.7 };
                    
                    const colorValue = isTransparent(color) ? 'transparent' : colorToCss(newColor);
                    document.execCommand('hiliteColor', false, colorValue);
                    setTextStyles(prev => ({ ...prev, highlightColor: newColor }));
                }
                break;
        }

        // Close color selector if it was a color change
        if (style === 'color' || style === 'highlightColor') {
            setOpenSelector(null);
        }
    }, [selectedLayers, liveLayers, socket, setOpenSelector]);

    // Update text styles based on browser's command state
    const updateTextStyles = useCallback(() => {
        setTextStyles({
            bold: document.queryCommandState('bold'),
            italic: document.queryCommandState('italic'),
            underline: document.queryCommandState('underline'),
            strikethrough: document.queryCommandState('strikethrough'),
            color: rgbStringToColor(document.queryCommandValue('foreColor') || ''),
            highlightColor: rgbStringToColor(document.queryCommandValue('backColor') || ''),
        });
    }, []);

    useEffect(() => {
        document.addEventListener('selectionchange', updateTextStyles);
        return () => document.removeEventListener('selectionchange', updateTextStyles);
    }, [updateTextStyles]);

    useEffect(() => {
        setFontFamily(layers[0].fontFamily || DEFAULT_FONT);
    }, [layers])

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
        <div className="relative text-left">
            <div className='flex flex-row items-center justify-center space-x-2'>
                <TextSizePicker
                    layers={layers}
                    setLiveLayers={setLiveLayers}
                    liveLayers={liveLayers}
                    socket={socket}
                    boardId={boardId}
                    selectedLayers={selectedLayers}
                />
                <ToolbarSeparator />
                {isEditing && (
                    <>
                        <div className="relative">
                            <Button 
                                variant="board" 
                                className="w-[105px] px-2 justify-start font-normal"
                                onClick={() => setOpenSelector(openSelector === SelectorType.FontFamily ? null : SelectorType.FontFamily)}
                            >
                                <span className="truncate" style={{ fontFamily }}>
                                    Lorem ipsum
                                </span>
                            </Button>
                            {openSelector === SelectorType.FontFamily && (
                                <div className="absolute flex flex-col -translate-x-1/3 mt-2 w-[200px] rounded-md shadow-lg bg-white dark:bg-zinc-800">
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
                                    <ScrollArea className="flex flex-col flex-1 max-h-[200px]" onWheel={(e) => e.stopPropagation()}>
                                        <div className="p-2">
                                            {fontsToDisplay.map(font => (
                                                <Button
                                                    key={font.value}
                                                    variant="ghost"
                                                    className={cn(
                                                        "w-full justify-start font-normal mb-1",
                                                        fontFamily === font.value && "bg-blue-500/20"
                                                    )}
                                                    style={{ fontFamily: font.value }}
                                                    onClick={() => {
                                                        handleFontFamilyChange(font.value);
                                                        setOpenSelector(null);
                                                    }}
                                                >
                                                    {font.label}
                                                </Button>
                                            ))}
                                        </div>
                                    </ScrollArea>
                                </div>
                            )}
                        </div>
                        <ToolbarSeparator />
                    </>
                )}
                <TextJustifySelector
                    selectedLayers={selectedLayers}
                    setLiveLayers={setLiveLayers}
                    liveLayers={liveLayers}
                    socket={socket}
                    boardId={boardId}
                    openSelector={openSelector}
                    setOpenSelector={setOpenSelector}
                    expandUp={expandUp}
                />
                <ToolbarSeparator />
                <div>
                    <div className='flex flex-row items-center justify-center space-x-2'>
                        {!isEditing ? (
                            <Hint label="Edit Text" side="top">
                                <Button
                                    variant="board"
                                    size="icon"
                                    onClick={() => setIsEditing(!isEditing)}
                                    className="flex items-center"
                                >
                                    <Type className='w-5 h-5' />
                                </Button>
                            </Hint>
                        ) : (
                            <>
                                <TextStyleButtons
                                    onStyleChange={handleStyleChange}
                                    activeStyles={textStyles}
                                />
                                <ToolbarSeparator />
                                <Hint label="Highlight" side="top">
                                    <Button
                                        variant="board"
                                        size="icon"
                                        onClick={() => setOpenSelector(openSelector === SelectorType.TextHighlightColor ? null : SelectorType.TextHighlightColor)}
                                        className={`${openSelector === SelectorType.TextHighlightColor ? 'bg-blue-500/20' : ''} pt-1`}
                                    >
                                        <HightlighterIcon className='w-5 h-5' color={textStyles.highlightColor.a === 0 ? 'transparent' : colorToCss(textStyles.highlightColor)} />
                                    </Button>
                                </Hint>
                                <ToolbarSeparator />
                                <Hint label="Text Color" side="top">
                                    <Button
                                        variant="board"
                                        size="icon"
                                        onClick={() => setOpenSelector(openSelector === SelectorType.TextColor ? null : SelectorType.TextColor)}
                                        className={`${openSelector === SelectorType.TextColor ? 'bg-blue-500/20' : ''} pt-1`}
                                    >
                                        <BaselineIcon className='w-5 h-5' color={colorToCss(textStyles.color)} />
                                    </Button>
                                </Hint>
                            </>
                        )}
                    </div>
                </div>
            </div>
            {openSelector === SelectorType.TextColor && (
                <ColorPalette
                    onColorSelect={(color) => handleStyleChange('color', color)}
                    selectedColor={textStyles.color}
                    className="origin-top-right absolute right-0 w-[165px] translate-x-1/3 rounded-lg shadow-sm bg-white dark:bg-zinc-800"
                />
            )}
            {openSelector === SelectorType.TextHighlightColor && (
                <ColorPalette
                    onColorSelect={(color) => handleStyleChange('highlightColor', color)}
                    selectedColor={textStyles.highlightColor}
                    className="origin-top-right absolute right-12 w-[165px] translate-x-1/3 rounded-lg shadow-sm bg-white dark:bg-zinc-800"
                />
            )}
        </div>
    )
};

interface TextStyleButtonsProps {
    onStyleChange: (style: 'bold' | 'italic' | 'underline' | 'strikethrough') => void;
    activeStyles: {
        bold: boolean;
        italic: boolean;
        underline: boolean;
        strikethrough: boolean;
    };
}

const rgbStringToColor = (rgbString: string): Color => {
    const defaultColor: Color = { r: 0, g: 0, b: 0, a: 0.7 };

    try {
        const matches = rgbString.match(/\d*\.?\d+/g);
        if (!matches) return defaultColor;

        return {
            r: parseInt(matches[0], 10),
            g: parseInt(matches[1], 10),
            b: parseInt(matches[2], 10),
            a: matches[3] ? parseFloat(matches[3]) : 0.7
        };
    } catch (error) {
        return defaultColor;
    }
};

export const TextStyleButtons = ({ onStyleChange, activeStyles }: TextStyleButtonsProps) => {
    const renderStyleButton = (
        style: 'bold' | 'italic' | 'underline' | 'strikethrough',
        Icon: any,
        label: string
    ) => (
        <Hint label={label} side="top">
            <Button
                variant="board"
                size="icon"
                onClick={() => onStyleChange(style)}
                className={`${activeStyles[style] ? 'bg-blue-500/20' : ''}`}
            >
                <Icon className='w-5 h-5' />
            </Button>
        </Hint>
    );

    return (
        <div className="space-x-1 flex flex-row items-center justify-center">
            {renderStyleButton('bold', Bold, 'Bold')}
            {renderStyleButton('italic', Italic, 'Italic')}
            {renderStyleButton('underline', Underline, 'Underline')}
            {renderStyleButton('strikethrough', Strikethrough, 'Strikethrough')}
        </div>
    );
};

type TextStyle = 'bold' | 'italic' | 'underline' | 'strikethrough';

