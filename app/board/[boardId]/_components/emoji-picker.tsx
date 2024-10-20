import { useState, useRef, useCallback, useEffect } from 'react';
import { Laugh } from "lucide-react";
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void;
}

export const EmojiPicker = ({ onEmojiSelect }: EmojiPickerProps) => {
    const [showPicker, setShowPicker] = useState(false);
    const [openUpwards, setOpenUpwards] = useState(false);
    const buttonRef = useRef<HTMLDivElement>(null);
    const pickerRef = useRef<HTMLDivElement>(null);

    const togglePicker = () => {
        if (!showPicker) {
            checkPosition();
        }
        setShowPicker(!showPicker);
    };

    const checkPosition = () => {
        if (buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            const spaceBelow = window.innerHeight - rect.bottom;
            setOpenUpwards(spaceBelow < 220); // Adjusted for new picker height
        }
    };

    const handleClickOutside = useCallback((event: MouseEvent) => {
        if (buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
            setShowPicker(false);
        }
    }, []);

    const handleEmojiSelect = (emoji: any) => {
        onEmojiSelect(emoji.native);
        setShowPicker(false);
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [handleClickOutside]);

    return (
        <div className="relative" ref={buttonRef}>
            <div onClick={togglePicker} className="cursor-pointer">
                <Laugh className='w-4 h-4 text-zinc-400' />
            </div>
            {showPicker && (
                <div 
                    ref={pickerRef}
                    className={`h-72 w-72 overflow-hidden absolute ${openUpwards ? 'bottom-20' : 'top-8'} left-0 z-50`}
                    onWheel={(e) => e.stopPropagation()}
                >
                    <Picker
                        data={data}
                        onEmojiSelect={handleEmojiSelect}
                        theme="dark"
                        previewPosition="none"
                        skinTonePosition="none"
                        perLine={8}
                        emojiSize={20}
                        emojiButtonSize={28}
                        dynamicHeight={true}
                    />
                </div>
            )}
        </div>
    );
};
