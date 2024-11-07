import React, { memo, useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { Author, Camera, Comment as CommentType, Reply, User } from '@/types/canvas';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import ContentEditable from 'react-contenteditable';
import { ArrowUp, X, CircleCheck, MailCheck, PencilIcon, Trash2 } from 'lucide-react';
import { formatDistanceToNowStrict } from 'date-fns';
import { useDeleteReply, useMarkCommentAsReload, useUpdateComment, useUpdateReplies } from './utils/canvas-objects-utils';
import { Socket } from 'socket.io-client';
import { ScrollArea } from "@/components/ui/scroll-area"
import { EmojiPicker } from '../_components/emoji-picker';
import { MentionUser } from '../_components/mention-user';
import { Hint } from '@/components/hint';
import { toast } from 'sonner';

interface CommentProps {
    id: string;
    layer: CommentType;
    zoom: number;
    onPointerDown?: (e: any, id: string) => void;
    selectionColor?: string;
    isCommentBoxOpen: boolean;
    setOpenCommentBoxId: (id: string | null) => void;
    user: User;
    orgTeammates: any;
    isMoving: boolean;
    setActiveHoveredCommentId: (id: string | null) => void;
}

export const Comment = memo(({ id, layer, zoom, onPointerDown, selectionColor, setOpenCommentBoxId, isCommentBoxOpen, user, isMoving, setActiveHoveredCommentId }: CommentProps) => {
    const [isCommentPreviewOpen, setIsCommentPreviewOpen] = useState(false);

    useEffect(() => {
        setIsCommentPreviewOpen(false);
    }, [isCommentBoxOpen]);

    if (!layer) return null;

    const { x, y, author, width, height } = layer;
    const initial = author?.information.name?.[0]?.toUpperCase() || '?';
    const commentContainerWidth = isCommentPreviewOpen ? width + 200 : width;

    return (
        <g transform={`translate(${x}, ${y + height}) scale(${1 / zoom})`}>
            <foreignObject
                x={0}
                y={-height}
                width={commentContainerWidth}
                height={height}
                className={`overflow-visible pointer-events-auto ${isMoving ? 'cursor-move' : 'cursor-default'}`}
            >
                <div className='h-full w-full flex items-end'>
                    <CommentAvatar
                        id={id}
                        layer={layer}
                        initial={initial}
                        onPointerDown={onPointerDown}
                        isCommentBoxOpen={isCommentBoxOpen}
                        setOpenCommentBoxId={setOpenCommentBoxId}
                        selectionColor={selectionColor}
                        isCommentPreviewOpen={isCommentPreviewOpen}
                        setIsCommentPreviewOpen={setIsCommentPreviewOpen}
                        user={user}
                        isMoving={isMoving}
                        setActiveHoveredCommentId={setActiveHoveredCommentId}
                    />
                </div>
            </foreignObject>
        </g>
    );
});

const CommentAvatar = memo(({ id, layer, initial, onPointerDown, setOpenCommentBoxId, isCommentBoxOpen, selectionColor, isCommentPreviewOpen, setIsCommentPreviewOpen, user, isMoving, setActiveHoveredCommentId }: { id: string, layer: CommentType, initial: string, onPointerDown?: (e: any, id: string) => void, showOutlineOnHover?: boolean, setOpenCommentBoxId: (commentId: string) => void, isCommentBoxOpen: boolean, selectionColor?: string, isCommentPreviewOpen: boolean, setIsCommentPreviewOpen: (isOpen: boolean) => void, user: User, isMoving: boolean, setActiveHoveredCommentId: (id: string | null) => void }) => {
    const { author, createdAt, height, width, content, replies } = layer;
    const [hoverHeight, setHoverHeight] = useState(52);
    const [isHovered, setIsHovered] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    const minWidth = 250;

    const isMentioned = useMemo(() => {
        const mentionCheck = (text: string) => text.includes(`data-user-id="${user.userId}"`);
        return mentionCheck(content || '') || replies?.some(reply => mentionCheck(reply.content));
    }, [content, replies, user.userId]);

    useEffect(() => {
        if (contentRef.current) {
            const contentHeight = contentRef.current.scrollHeight;
            setHoverHeight(Math.max(52, contentHeight + 20)); // 20px for padding
        }
    }, [content, isCommentPreviewOpen]);

    useEffect(() => {
        if (isMoving) {
            setActiveHoveredCommentId(null);
            setIsCommentPreviewOpen(false);
        }
    }, [isMoving, setIsCommentPreviewOpen, setActiveHoveredCommentId]);

    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        e.stopPropagation();
        onPointerDown?.(e, id);
    }

    const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
        if (e.button === 0) {
            setOpenCommentBoxId(id);
        }
    }

    const getBackgroundColor = () => {
        if (isMentioned) {
            return isHovered && !isMoving ? 'bg-blue-50 dark:bg-blue-50' : 'bg-zinc-300 dark:bg-zinc-800';
        }

        return isHovered ? 'bg-white dark:bg-zinc-800' : 'bg-zinc-300 dark:bg-zinc-800';
    };

    const getStrokeColor = (): string => {
        if (selectionColor) {
            return selectionColor;
        }
        if (isMentioned || isHovered || isCommentBoxOpen) {
            return '#3390FF'; // blue-500
        }
        return document.documentElement.classList.contains("dark") ? '#e4e4e7' : '#a1a1aa'; // zinc-200 for dark, zinc-400 for light
    };

    return (
        <div
            className={`flex flex-row rounded-tr-[18px] rounded-tl-[18px] rounded-br-[18px] transition-all duration-100 ${getBackgroundColor()}`}
            style={{
                minWidth: isCommentPreviewOpen ? `${Math.max(width, minWidth)}px` : `${width}px`,
                height: isCommentPreviewOpen ? `${hoverHeight}px` : `${height}px`,
                padding: isCommentPreviewOpen ? '6px' : '0px',
                outline: getStrokeColor() !== 'none' ? `2px solid ${getStrokeColor()}` : 'none',
            }}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerEnter={() => {
                if (!isMoving && !isCommentBoxOpen) {
                    setActiveHoveredCommentId(id);
                    setIsHovered(true);
                    setIsCommentPreviewOpen(true);
                }
            }}
            onPointerLeave={() => {
                setActiveHoveredCommentId(null);
                setIsHovered(false);
                setIsCommentPreviewOpen(false);
            }}
        >
            <Avatar
                className={`border-4 z-[1] ${isMentioned && isHovered ? 'border-blue-500' : 'border-zinc-300 dark:border-zinc-800'}`}
                style={{ height: height, width: width }}
            >
                <AvatarImage src={author?.information.picture || ''} />
                <AvatarFallback className="text-xs font-semibold">
                    {initial}
                </AvatarFallback>
            </Avatar>
            {isMentioned && (
                <div className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs font-bold px-1 py-0.5 rounded-full z-10">
                    @
                </div>
            )}
            {isCommentPreviewOpen && (
                <div
                    ref={contentRef}
                    className="absolute left-12 w-[190px]"
                >
                    <div className={`text-xs overflow-hidden ${isMentioned ? 'text-blue-800' : 'text-zinc-800 dark:text-zinc-200'}`}>
                        <div className="flex flex-row items-center space-x-1 truncate">
                            <p className="font-bold w-[120px] truncate">{author?.information.name}</p>
                            <p className={`text-xs ${isMentioned ? 'text-blue-600' : 'text-zinc-900 dark:text-zinc-300'}`}>{formatTimeAgo(createdAt!)} </p>
                        </div>
                        <p className="w-[190px] overflow-x-hidden">
                            {content ? (
                                <span dangerouslySetInnerHTML={{ __html: content }} />
                            ) : (
                                'No comment'
                            )}
                        </p>
                        {replies && replies.length > 0 && (
                            <p className="mt-1 text-xs text-zinc-400">
                                {replies.length} {replies.length === 1 ? 'reply' : 'replies'}
                            </p>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
})

export const CommentBox = memo(({
    id,
    layer,
    setOpenCommentBoxId,
    zoomRef,
    cameraRef,
    boardId,
    expired,
    socket,
    user,
    isMoving,
    orgTeammates,
    deleteLayers,
    forceUpdateLayerLocalLayerState
}: {
    id: string,
    layer: CommentType,
    setOpenCommentBoxId: (commentId: string | null) => void,
    zoomRef: React.MutableRefObject<number>,
    cameraRef: React.MutableRefObject<Camera>,
    boardId: string,
    expired: boolean,
    socket: Socket | null,
    user: User,
    isMoving: boolean,
    orgTeammates: any,
    deleteLayers: (layerIds: string[]) => void,
    forceUpdateLayerLocalLayerState: (layerId: string, updatedLayer: CommentType) => void,
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(layer?.content || '');
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const lastPosition = useRef({ x: 0, y: 0 });
    const commentBoxRef = useRef<HTMLDivElement>(null);

    const [mentionListVisible, setMentionListVisible] = useState(false);
    const [mentionFilter, setMentionFilter] = useState('');

    const updateReplies = useUpdateReplies();
    const markCommentAsRead = useMarkCommentAsReload();

    const replyContentRef = useRef<HTMLElement>(null);
    const [replyContent, setReplyContent] = useState('');

    const [editingId, setEditingId] = useState<string | null>(null);

    const focusTextInput = () => {
        if (replyContentRef.current) {
            replyContentRef.current.focus();
        }
    }

    useEffect(() => {
        setTimeout(focusTextInput, 0);
    }, []);

    useEffect(() => {
        setValue(layer?.content || '');
    }, [layer?.content]);

    useEffect(() => {
        const zoom = zoomRef.current;
        const camera = cameraRef.current;
        const commentBoxWidth = commentBoxRef.current?.offsetWidth || 300;
        const commentBoxHeight = commentBoxRef.current?.offsetHeight || 300;
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const toolbarHeight = 90;

        let x = (layer?.x * zoom + camera.x + layer?.width * 1.5);
        let y = ((layer?.y + layer?.height) * zoom + camera.y - commentBoxHeight / 2);

        // Constrain x position
        x = Math.max(0, Math.min(x, viewportWidth - commentBoxWidth));

        // Ensure the CommentBox is fully visible vertically
        if (y + commentBoxHeight + toolbarHeight > viewportHeight) {
            // If the bottom would be cut off, move it up
            y = viewportHeight - commentBoxHeight - toolbarHeight;
        }

        // Ensure the top is not cut off
        y = Math.max(0, y);

        setPosition({ x, y });
    }, [layer?.x, layer?.y, layer?.height, layer?.width, cameraRef, zoomRef]);

    useEffect(() => {
        if (isMoving) setOpenCommentBoxId(null);
    }, [isMoving, setOpenCommentBoxId]);

    const onPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
        e.stopPropagation();
        setIsDragging(true);
        lastPosition.current = { x: e.clientX, y: e.clientY };
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
    }, []);

    const onPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
        if (isDragging) {
            const dy = (e.clientY - lastPosition.current.y);
            const dx = (e.clientX - lastPosition.current.x);
            setPosition(prev => {

                // this check is just to make sure we dont go over the top so the user can keep moving the comment box with the header
                let newY = prev.y + dy
                newY = Math.max(0, newY);
                return { x: prev.x + dx, y: newY };
            });

            lastPosition.current = { x: e.clientX, y: e.clientY };
        }
    }, [isDragging]);

    const onPointerUp = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
        setIsDragging(false);
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    }, []);

    const handleReplyChange = (e: React.FormEvent<HTMLDivElement>) => {
        const newContent = e.currentTarget.innerHTML;
        setReplyContent(newContent === '<br>' ? '' : newContent);

        const textContent = e.currentTarget.textContent || '';
        const lastWord = textContent.split(/\s/).pop() || '';

        if (lastWord.startsWith('@')) {
            setMentionListVisible(true);
            setMentionFilter(lastWord.slice(1));
        } else {
            setMentionListVisible(false);
        }
    };

    const handleReplySubmit = () => {
        if (replyContent.trim() && socket) {
            const newReply: Reply = {
                id: Date.now().toString(),
                author: user,
                content: replyContent,
                createdAt: new Date(),
            };
            updateReplies(boardId, id, layer, newReply, expired, socket);
            setReplyContent('');
        }
    }

    const handleMarkAsRead = useCallback(() => {
        const updatedLayer = markCommentAsRead(boardId, id, layer, user, expired, socket);
        forceUpdateLayerLocalLayerState(id, updatedLayer);
        toast.success('Marked as read');
    }, [boardId, id, layer, user, expired, socket, markCommentAsRead, forceUpdateLayerLocalLayerState]);

    const handleEmojiSelect = (emoji: string) => {
        setReplyContent(replyContent + emoji);
        replyContentRef.current?.focus();
    }

    const handleMentionSelect = (user: User) => {
        insertMention(user);
        setMentionListVisible(false);
    };

    const insertMention = (user: typeof orgTeammates[0]) => {
        const mentionHtml = `<span class="mention text-blue-500" contenteditable="false" data-user-id="${user.id}">@${user.name}</span>&nbsp;`;
        const newValue = replyContent.replace(/@\w*$/, '') + mentionHtml;
        setReplyContent(newValue);
        setMentionListVisible(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            if (mentionListVisible) {
                e.preventDefault();
                return;
            } else {
                handleReplySubmit();
            }
        }
    }

    const handleResolve = () => {
        deleteLayers([id]);
        toast.success('Comment resolved');
        setOpenCommentBoxId(null);
    };

    if (!layer) return null;

    return (
        <div
            onKeyDown={handleKeyDown}
            ref={commentBoxRef}
            className={`bg-zinc-100 dark:bg-zinc-800 rounded-xl text-sm flex flex-col shadow-xl pointer-events-auto border-2 ${isDragging ? "border-blue-500" : "border-zinc-300 dark:border-zinc-700"}`}
            style={{
                transform: `translate(${position.x}px, ${position.y}px)`,
                width: "370px",
                maxHeight: `calc(100vh - 180px)`
            }}
        >
            {/* Header - remains outside ScrollArea */}
            <div
                className={`flex justify-between items-center p-3 border-b border-zinc-300 dark:border-zinc-700 ${isDragging ? 'cursor-grab' : 'cursor-hand'}`}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerCancel={onPointerUp}
            >
                <span className="font-semibold text-zinc-800 dark:text-zinc-200">Comment</span>
                <div className="flex items-center space-x-3">
                    <Hint label="Mark as resolved" sideOffset={8} side="bottom">
                        <CircleCheck
                            className="w-4 h-4 text-zinc-600 dark:text-zinc-400 cursor-pointer hover:text-green-500 transition-colors"
                            onClick={handleResolve}
                        />
                    </Hint>
                    <Hint label="Mark as read" sideOffset={8} side="bottom">
                        <MailCheck
                            className="w-4 h-4 text-zinc-600 dark:text-zinc-400 cursor-pointer hover:text-blue-500 transition-colors"
                            onClick={handleMarkAsRead}
                        />
                    </Hint>
                    <X className="w-4 h-4 text-zinc-600 dark:text-zinc-400 cursor-pointer" onClick={() => setOpenCommentBoxId(null)} />
                </div>
            </div>

            {/* ScrollArea for the rest of the content */}
            <ScrollArea 
                className="flex-1 h-full flex flex-col"
                onWheel={(e) => e.stopPropagation()}
            >
                <div className="p-3">
                    <CommentContent
                        commentId={id}
                        id={id}
                        author={layer.author}
                        content={value}
                        createdAt={layer.createdAt}
                        editingId={editingId}
                        setEditingId={setEditingId}
                        orgTeammates={orgTeammates}
                        boardId={boardId}
                        layer={layer}
                        expired={expired}
                        socket={socket}
                        forceUpdateLayerLocalLayerState={forceUpdateLayerLocalLayerState}
                        currentUser={user}
                    />

                    {/* Replies */}
                    {layer?.replies && layer?.replies.length > 0 && (
                        <div className="space-y-3">
                            {layer.replies.map((reply) => (
                                <CommentContent
                                    commentId={id}
                                    id={reply.id}
                                    key={reply.id}
                                    author={reply.author}
                                    content={reply.content}
                                    createdAt={reply.createdAt}
                                    isReply={true}
                                    editingId={editingId}
                                    setEditingId={setEditingId}
                                    orgTeammates={orgTeammates}
                                    boardId={boardId}
                                    layer={layer}
                                    expired={expired}
                                    socket={socket}
                                    forceUpdateLayerLocalLayerState={forceUpdateLayerLocalLayerState}
                                    currentUser={user}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </ScrollArea>

            {/* Reply input - remains outside ScrollArea */}
            <div className="p-3 flex flex-col space-y-2 border-t border-zinc-300 dark:border-zinc-700" >
                <div className="relative">
                    <ContentEditable
                        innerRef={replyContentRef}
                        className="p-2 text-zinc-800 dark:text-zinc-200 text-xs cursor-text outline-none min-h-10 bg-zinc-200 dark:bg-zinc-700 rounded-lg"
                        html={isEditing ? replyContent : replyContent || 'Add a comment...'}
                        onChange={handleReplyChange}
                        onFocus={() => setIsEditing(true)}
                        onBlur={() => setIsEditing(false)}
                    />
                </div>
                <div className='flex items-center justify-between pt-2 border-t border-zinc-300 dark:border-zinc-700 px-1'>
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
                        className={`flex items-center justify-center rounded-full p-0.5 cursor-pointer ${replyContent ? 'bg-blue-500' : 'bg-zinc-400 dark:bg-zinc-600'}`}
                        onClick={handleReplySubmit}
                    >
                        <ArrowUp className='w-4 h-4 text-white dark:text-zinc-200' />
                    </div>
                </div>
            </div>
        </div>
    )
})

const CommentContent = ({ 
    commentId,
    id,
    author, 
    content, 
    createdAt, 
    isReply = false,
    editingId,
    setEditingId,
    orgTeammates,
    boardId,
    layer,
    expired,
    socket,
    forceUpdateLayerLocalLayerState,
    currentUser, // Add this prop
}: {
    commentId: string,
    id: string, 
    author: Author,
    content: string,
    createdAt: Date,
    isReply?: boolean,
    editingId: string | null,
    setEditingId: (id: string | null) => void,
    orgTeammates: any[],
    boardId: string,
    layer: CommentType,
    expired: boolean,
    socket: Socket | null,
    forceUpdateLayerLocalLayerState: (layerId: string, updatedLayer: CommentType) => void,
    currentUser: User, // Add this type
}) => {
    const [editContent, setEditContent] = useState(content);
    const [mentionListVisible, setMentionListVisible] = useState(false);
    const [mentionFilter, setMentionFilter] = useState('');
    const contentEditableRef = useRef<HTMLDivElement>(null);
    const updateComment = useUpdateComment();
    const deleteReply = useDeleteReply();

    useEffect(() => {
        if (contentEditableRef.current && editingId === id) {
            setTimeout(() => contentEditableRef.current?.focus(), 0);
            
            // Move cursor to the end
            const range = document.createRange();
            const selection = window.getSelection();
            range.selectNodeContents(contentEditableRef.current);
            range.collapse(false);  // false means collapse to end
            selection?.removeAllRanges();
            selection?.addRange(range);
        }
    }, [editingId, id]);

    const authorName = author?.information?.name || "Anonymous";
    const authorInitial = authorName[0]?.toUpperCase() || "?";
    const formattedTime = formatDistanceToNowStrict(new Date(createdAt), { addSuffix: true });

    const isAuthor = currentUser.userId === author.userId;

    const handleEmojiSelect = (emoji: string) => {
        setEditContent(editContent + emoji);
        contentEditableRef.current?.focus();
    };

    const handleMentionSelect = (user: User) => {
        insertMention(user);
        setMentionListVisible(false);
    };

    const insertMention = (user: typeof orgTeammates[0]) => {
        const mentionHtml = `<span class="mention text-blue-500" contenteditable="false" data-user-id="${user.id}">@${user.name}</span>&nbsp;`;
        const newValue = editContent.replace(/@\w*$/, '') + mentionHtml;
        setEditContent(newValue);
        setMentionListVisible(false);
    };

    const handleContentChange = (e: React.FormEvent<HTMLDivElement>) => {
        const newContent = e.currentTarget.innerHTML;
        setEditContent(newContent);

        const textContent = e.currentTarget.textContent || '';
        const lastWord = textContent.split(/\s/).pop() || '';

        if (lastWord.startsWith('@')) {
            setMentionListVisible(true);
            setMentionFilter(lastWord.slice(1));
        } else {
            setMentionListVisible(false);
        }
    };

    const handleSave = () => {
        if (isReply) {
            updateComment(boardId, commentId, layer, editContent, id, expired, socket, forceUpdateLayerLocalLayerState);
        } else {
            updateComment(boardId, commentId, layer, editContent, null, expired, socket, forceUpdateLayerLocalLayerState);
        }
        setEditingId(null);
    };

    const handleDelete = () => {
        deleteReply(boardId, commentId, id, layer, expired, socket, forceUpdateLayerLocalLayerState);
        toast.success('Reply deleted');
        setEditingId(null);
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        e.stopPropagation();
        if (e.key === 'Enter') {
            if (mentionListVisible) {
                e.preventDefault();
                return;
            } else {
                handleSave();
            }
        }
    }

    return (
        <div className={`flex items-start space-x-2 ${isReply ? 'mb-3' : 'mb-4'}`}>
            <Avatar className={isReply ? "w-7 h-7" : "w-8 h-8"}>
                <AvatarImage src={author?.information?.picture} alt={authorName} />
                <AvatarFallback className="text-xs font-semibold bg-zinc-300 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200">{authorInitial}</AvatarFallback>
            </Avatar>
            <div className="flex-grow space-y-1">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <span className={`font-semibold text-zinc-800 dark:text-zinc-200 truncate ${isReply ? 'w-[144px]' : 'w-[140px]'}`}>{authorName}</span>
                        <span className="text-zinc-600 dark:text-zinc-400 text-xs">{formattedTime}</span>
                    </div>
                    {isAuthor && (
                        <div className="flex items-center space-x-2">
                            <PencilIcon className="w-4 h-4 text-zinc-600 dark:text-zinc-400 cursor-pointer" onPointerDown={() => editingId === null ? setEditingId(id) : setEditingId(null)} />
                            {isReply && <Trash2 className="w-4 h-4 text-red-500 cursor-pointer" onPointerDown={handleDelete} />}
                        </div>
                    )}
                </div>
                {editingId === id && isAuthor ? (
                    <div className="space-y-2" onKeyDown={handleKeyDown}>
                        <ContentEditable
                            innerRef={contentEditableRef}
                            className="p-2 text-zinc-800 dark:text-zinc-200 text-xs cursor-text outline-none min-h-10 bg-zinc-200 dark:bg-zinc-700 rounded-lg"
                            html={editContent}
                            onChange={handleContentChange}
                        />
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <EmojiPicker onEmojiSelect={handleEmojiSelect} />
                                <MentionUser
                                    orgTeammates={orgTeammates}
                                    onMentionSelect={handleMentionSelect}
                                    mentionFilter={mentionFilter}
                                    mentionListVisible={mentionListVisible}
                                    setMentionListVisible={setMentionListVisible}
                                />
                            </div>
                            <div className="flex items-center space-x-2">
                                <button 
                                    className="bg-zinc-700 text-zinc-200 text-xs px-2 py-1 rounded-md cursor-pointer hover:bg-zinc-600" 
                                    onPointerDown={() => setEditingId(null)} 
                                >
                                    Close
                                </button>
                                <button 
                                    className="bg-blue-500 text-zinc-200 text-xs px-2 py-1 rounded-md cursor-pointer hover:bg-blue-600" 
                                    onPointerDown={handleSave} 
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div
                        className={`text-zinc-800 dark:text-zinc-200 ${isReply ? 'text-xs' : 'text-sm'}`}
                        dangerouslySetInnerHTML={{ __html: content || 'No comment' }}
                    />
                )}
            </div>
        </div>
    );
};

export function formatTimeAgo(date: Date | number): string {
    const distance = formatDistanceToNowStrict(date, { addSuffix: true });
    return distance
        .replace('about ', '')
        .replace('less than a minute ago', 'just now')
        .replace('minute', 'min');
}

Comment.displayName = "Comment";
CommentAvatar.displayName = "CommentAvatar";
CommentBox.displayName = "CommentBox";