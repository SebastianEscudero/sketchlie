import { useState, useRef, useCallback, useEffect } from 'react';
import { Laugh } from "lucide-react";
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { createPortal } from 'react-dom';

interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void;
}

export const EmojiPicker = ({ onEmojiSelect }: EmojiPickerProps) => {
    const [showPicker, setShowPicker] = useState(false);
    const buttonRef = useRef<HTMLDivElement>(null);
    const pickerRef = useRef<HTMLDivElement>(null);

    const togglePicker = () => {
        setShowPicker(!showPicker);
    };

    const handleClickOutside = useCallback((event: MouseEvent) => {
        if (buttonRef.current && !buttonRef.current.contains(event.target as Node) &&
            pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
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

    useEffect(() => {
        if (showPicker && buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            if (pickerRef.current) {
                pickerRef.current.style.position = 'fixed';
                pickerRef.current.style.left = `${rect.left - 115}px`;
                pickerRef.current.style.bottom = `${window.innerHeight - rect.top + 5}px`;
            }
        }
    }, [showPicker]);

    return (
        <>
            <div className="relative" ref={buttonRef}>
                <div onClick={togglePicker} className="cursor-pointer">
                    <Laugh className='w-4 h-4 text-zinc-500' />
                </div>
            </div>
            {showPicker && createPortal(
                <div 
                    ref={pickerRef}
                    className="h-[350px] w-[352px] overflow-hidden"
                    onWheel={(e) => e.stopPropagation()}
                >
                    <Picker
                        data={data}
                        onEmojiSelect={handleEmojiSelect}
                        theme={document.documentElement.classList.contains("dark") ? "dark" : "light"}
                        previewPosition="none"
                        skinTonePosition="none"
                        perLine={8}
                        emojiSize={20}
                        emojiButtonSize={28}
                    />
                </div>,
                document.body
            )}
        </>
    );
};