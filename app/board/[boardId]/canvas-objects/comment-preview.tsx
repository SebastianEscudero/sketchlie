import React, { memo, useEffect, useRef, useState } from 'react';
import { Author, Comment as CommentType, LayerType, User } from '@/types/canvas';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import ContentEditable from 'react-contenteditable';
import { ArrowUp } from 'lucide-react';
import { EmojiPicker } from '../_components/emoji-picker';
import { MentionUser } from '../_components/mention-user';
import { ScrollArea } from '@/components/ui/scroll-area';

interface CommentPreviewProps {
    layer: CommentType;
    zoom: number;
    insertLayer?: any;
    orgTeammates: any;
}

export const CommentPreview = memo(({ layer, zoom, insertLayer, orgTeammates }: CommentPreviewProps) => {
    const { x, y, author, content, width, height } = layer;
    const initial = author?.information.name?.[0]?.toUpperCase() || '?';
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Trigger the animation after a short delay
        const timer = setTimeout(() => setIsVisible(true), 10);
        return () => clearTimeout(timer);
    }, []);
    
    const handleInsertComment = (commentContent: string) => {
        insertLayer(LayerType.Comment, { x, y }, width, height, undefined, undefined, undefined, undefined, undefined, commentContent);
    };

    return (
        <g transform={`translate(${x}, ${y + height}) scale(${1 / zoom})`}>
            <foreignObject
                x={0}
                y={-height}
                width={width + 300}
                height={height}
                className='overflow-visible pointer-events-auto cursor-default'
                onPointerDown={(e) => { e.stopPropagation(); }}
            >
                 <div 
                    className="h-full w-full relative flex items-end"
                    style={{
                        transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                        transform: isVisible 
                            ? 'translate3d(0, 0, 0) scale(1)' 
                            : 'translate3d(0, 20px, 0) scale(0.95)',
                        opacity: isVisible ? 1 : 0,
                    }}
                >
                    <CommentAvatar author={author} initial={initial} height={height} width={width} />
                    <CommentBox content={content} onInsert={handleInsertComment} orgTeammates={orgTeammates} />
                </div>
            </foreignObject>
        </g>
    );
});

const CommentAvatar = ({ author, initial, height, width }: { author?: Author, initial: string, height: number, width: number }) => {
    return (
        <div 
            className="flex flex-row rounded-tr-[18px] rounded-tl-[18px] rounded-br-[18px] dark:bg-zinc-800 bg-zinc-300 overflow-hidden"
            style={{ outline: '2px solid #3390FF' }}
        >
            <Avatar className="border-4 border-zinc-300 dark:border-zinc-800 z-[1]" style={{ height: height, width: width }}>
                <AvatarImage src={author?.information.picture || ''} />
                <AvatarFallback className="text-xs font-semibold">
                    {initial}
                </AvatarFallback>
            </Avatar>
        </div>
    )
}

const CommentBox = ({ content, onInsert, orgTeammates }: { content?: string, onInsert: (content: string) => void, orgTeammates: any }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(content || '');
    const contentEditableRef = useRef<HTMLElement>(null);
    const [mentionListVisible, setMentionListVisible] = useState(false);
    const [mentionFilter, setMentionFilter] = useState('');

    const focusTextInput = () => {
        if (contentEditableRef.current) {
            contentEditableRef.current.focus();
        }
    }

    useEffect(() => {
        setTimeout(focusTextInput, 0);
    }, []);

    const onChange = (e: React.FormEvent<HTMLDivElement>) => {
        const newContent = e.currentTarget.innerHTML;
        // Set value to an empty string if the content is just a <br> tag
        setValue(newContent === '<br>' ? '' : newContent);

        const textContent = e.currentTarget.textContent || '';
        const lastWord = textContent.split(/\s/).pop() || '';

        if (lastWord.startsWith('@')) {
            setMentionListVisible(true);
            setMentionFilter(lastWord.slice(1));
        } else {
            setMentionListVisible(false);
        }
    };

    const handleInsert = () => {
        if (value.trim()) {
            onInsert(value);
            setValue('');
            setIsEditing(false);
        }
    }

    const handleMentionSelect = (user: User) => {
        insertMention(user);
        setMentionListVisible(false);
    };

    const handleEmojiSelect = (emoji: string) => {
        setValue(value + emoji);
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            if (mentionListVisible) {
                e.preventDefault();
                return;
            } else {
                handleInsert();
            }
        }
    }

   const insertMention = (user: typeof orgTeammates[0]) => {
        const mentionHtml = `<span class="mention text-blue-500" contenteditable="false" data-user-id="${user.id}">@${user.name}</span>&nbsp;`;
        const newValue = value.replace(/@\w*$/, '') + mentionHtml;
        setValue(newValue);
        setMentionListVisible(false);

        // Focus and move cursor to the end
        setTimeout(() => {
            if (contentEditableRef.current) {
                contentEditableRef.current.focus();
                const range = document.createRange();
                range.selectNodeContents(contentEditableRef.current);
                range.collapse(false);
                const selection = window.getSelection();
                selection?.removeAllRanges();
                selection?.addRange(range);
            }
        }, 0);
    };

    return (
        <div 
            className="ml-2 p-2 dark:bg-zinc-800 bg-zinc-100 text-zinc-800 dark:text-zinc-400 font-semibold w-[300px] rounded-xl text-xs flex flex-col"
            style={{ outline: '2px solid #3390FF' }}
            onKeyDown={handleKeyDown}
        >
            <div className="relative">
                <ContentEditable
                    innerRef={contentEditableRef}
                    className="w-full pl-1 outline-none min-h-10 cursor-text"
                    html={isEditing ? value : value || 'Add a comment'}
                    onChange={onChange}
                    onFocus={() => setIsEditing(true)}
                    onBlur={() => setIsEditing(false)}
                />
        </div>
            <div className='flex items-center justify-between pt-2 border-t border-zinc-700 px-1'>
                <div className='flex items-center space-x-2'>
                    <EmojiPicker onEmojiSelect={handleEmojiSelect} />
                    <MentionUser 
                        orgTeammates={orgTeammates}
                        onMentionSelect={handleMentionSelect}
                        mentionFilter={mentionFilter}
                        mentionListVisible={mentionListVisible}
                        setMentionListVisible={setMentionListVisible}
                    />
                </div>
                <div 
                    className={`flex items-center justify-center rounded-full p-0.5 cursor-pointer ${value ? 'bg-blue-500' : 'bg-zinc-400'}`}
                    onClick={handleInsert}
                >
                    <ArrowUp className='w-4 h-4 text-zinc-200' />
                </div>
            </div>
        </div>
    )
}

CommentPreview.displayName = "CommentPreview";
