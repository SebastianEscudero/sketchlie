import { AtSign } from "lucide-react"
import { useCallback, useEffect, useRef, useState } from "react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { createPortal } from 'react-dom'

interface MentionUserProps {
  orgTeammates: any;
  onMentionSelect: (user: any) => void;
  mentionFilter: string;
  mentionListVisible: boolean;
  setMentionListVisible: (visible: boolean) => void;
}

export const MentionUser = ({ orgTeammates, onMentionSelect, mentionFilter, mentionListVisible, setMentionListVisible }: MentionUserProps) => {
    const [mentionIndex, setMentionIndex] = useState(0);
    const [openUpwards, setOpenUpwards] = useState(false);
    const buttonRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLDivElement>(null);

    const filteredUsers = orgTeammates.filter((user: any) => 
        user.name.toLowerCase().includes(mentionFilter.toLowerCase())
    );

    const checkPosition = () => {
        if (buttonRef.current && listRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            const spaceBelow = window.innerHeight - rect.bottom;
            setOpenUpwards(spaceBelow < listRef.current.clientHeight);
        }
    };

    const handleClickOutside = useCallback((event: MouseEvent) => {
        if (buttonRef.current && !buttonRef.current.contains(event.target as Node) &&
            listRef.current && !listRef.current.contains(event.target as Node)) {
            setMentionListVisible(false);
        }
    }, [setMentionListVisible]);

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (!mentionListVisible) return;
        e.stopPropagation();
        e.preventDefault();
        if (e.key === 'ArrowDown') {
            setMentionIndex((prev) => (prev + 1) % filteredUsers.length);
        } else if (e.key === 'ArrowUp') {
            setMentionIndex((prev) => (prev - 1 + filteredUsers.length) % filteredUsers.length);
        } else if (e.key === 'Enter' || e.key === 'Tab') {
            onMentionSelect(filteredUsers[mentionIndex]);
            setMentionListVisible(false);
        } else if (e.key === 'Escape') {
            setMentionListVisible(false);
        }
    }, [mentionListVisible, filteredUsers, mentionIndex, onMentionSelect, setMentionListVisible]);

    useEffect(() => {
        checkPosition();
    }, [mentionListVisible]);

    useEffect(() => {
        if (mentionListVisible) {
            document.addEventListener('keydown', handleKeyDown, true);
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('keydown', handleKeyDown, true);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [mentionListVisible, handleClickOutside, handleKeyDown]);

    return (
        <div className="relative">
            <div ref={buttonRef} onClick={(e) => { e.preventDefault(); setMentionListVisible(!mentionListVisible); }}>
                <AtSign className='w-4 h-4 text-zinc-400 cursor-pointer' />
            </div>
            {mentionListVisible && createPortal(
                <div 
                    ref={listRef} 
                    className={`absolute -left-8 bg-zinc-700 rounded-lg z-50 w-64`}
                    style={{
                        position: 'fixed',
                        left: buttonRef.current ? `${buttonRef.current.getBoundingClientRect().left - 32}px` : '-32px',
                        [openUpwards ? 'bottom' : 'top']: buttonRef.current 
                            ? `${openUpwards 
                                ? window.innerHeight - buttonRef.current.getBoundingClientRect().top + 12
                                : buttonRef.current.getBoundingClientRect().bottom + 12}px` 
                            : (openUpwards ? '12px' : '12px')
                    }}
                >
                    <ScrollArea className="max-h-[300px] flex-1 h-full flex flex-col" onWheel={(e) => e.stopPropagation()}>
                        {filteredUsers.map((user: any, index: number) => (
                            <div
                                key={user.id}
                                className={`p-2 cursor-pointer flex items-center hover:bg-zinc-600 space-x-2 ${index === mentionIndex ? 'bg-zinc-600' : ''}`}
                                onPointerDown={(e) => {
                                    e.preventDefault();
                                    onMentionSelect(user);
                                    setMentionListVisible(false);
                                }}
                            >
                                <Avatar className="h-8 w-8 flex-shrink-0">
                                    <AvatarImage src={user.image || ''} alt={user.name} />
                                    <AvatarFallback className="text-xs font-semibold text-black">
                                        {user.name?.[0]?.toUpperCase() || user.name?.[1]?.toUpperCase() || "?"}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col overflow-hidden">
                                    <span className="text-sm font-medium text-zinc-200 truncate">{user.name}</span>
                                    <span className="text-xs text-zinc-400 truncate">{user.email}</span>
                                </div>
                            </div>
                        ))}
                    </ScrollArea>
                </div>,
                document.body
            )}
        </div>
    )
}
