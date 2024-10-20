import { ScrollArea } from "@/components/ui/scroll-area";
import { Camera, Layers } from "@/types/canvas";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Comment as CommentType } from "@/types/canvas";
import { formatTimeAgo } from "../canvas-objects/comment";
import { cn } from "@/lib/utils";
import { MoveCameraToLayer } from "./canvasUtils";
import { useCallback, useMemo, useState } from "react";
import { User } from "@/types/canvas";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const MAX_SHOWN_REPLIES = 5;

interface CommentsPanelProps {
    commentIds: string[];
    liveLayers: Layers;
    openCommentBoxId: string | null;
    setOpenCommentBoxId: (commentId: string | null) => void;
    setCamera: (camera: Camera) => void;
    setZoom: (zoom: number) => void;
    cameraRef: React.RefObject<Camera>;
    zoomRef: React.RefObject<number>;
    user: User;
}

export const CommentsPanel = ({
    commentIds,
    liveLayers,
    openCommentBoxId,
    setOpenCommentBoxId,
    setCamera,
    setZoom,
    cameraRef,
    zoomRef,
    user
}: CommentsPanelProps) => {
    const [commentFilter, setCommentFilter] = useState<'all' | 'mentions'>('all');

    // Sort comments chronologically, latest first
    const sortedCommentIds = useMemo(() => {
        return commentIds.sort((a, b) => {
            const commentA = liveLayers[a] as CommentType;
            const commentB = liveLayers[b] as CommentType;
            return new Date(commentB.createdAt!).getTime() - new Date(commentA.createdAt!).getTime();
        });
    }, [commentIds, liveLayers]);

    const handleCommentClick = useCallback((commentId: string) => {
        const comment = liveLayers[commentId] as CommentType;
        if (!comment) return;

        if (openCommentBoxId === commentId) {
            setOpenCommentBoxId(null);
            return;
        }

        MoveCameraToLayer({
            targetX: comment.x - comment.width * 3,
            targetY: comment.y - comment.height * 5,
            targetWidth: comment.width * 10,
            targetHeight: comment.height * 10,
            setCamera,
            setZoom,
            cameraRef,
            zoomRef,
            padding: 0.7,
            duration: 200
        }).then(() => {
            setOpenCommentBoxId(commentId);
        });
    }, [liveLayers, setCamera, setZoom, cameraRef, zoomRef, setOpenCommentBoxId, openCommentBoxId]);

    const isUserMentioned = useCallback((comment: CommentType) => {
        const mentionCheck = (text: string) => text.includes(`data-user-id="${user.userId}"`);
        return mentionCheck(comment.content || '') || comment.replies?.some(reply => mentionCheck(reply.content));
    }, [user.userId]);

    const filteredCommentIds = useMemo(() => {
        if (commentFilter === 'all') return sortedCommentIds;
        return sortedCommentIds.filter(commentId => {
            const comment = liveLayers[commentId] as CommentType;
            return isUserMentioned(comment);
        });
    }, [sortedCommentIds, commentFilter, liveLayers, isUserMentioned]);

    return (
        <div className="flex flex-col h-full">
            <div className="px-2 py-1">
                <Select
                    value={commentFilter}
                    onValueChange={(value: 'all' | 'mentions') => setCommentFilter(value)}
                >
                    <SelectTrigger className="font-semibold h-10 w-36 outline-none border-none focus:outline-none focus:border-none focus:ring-0 focus:ring-offset-0 shadow-none">
                        <SelectValue placeholder="Filter comments" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All comments</SelectItem>
                        <SelectItem value="mentions">Mentions</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <ScrollArea className="flex-1 p-1">
                {filteredCommentIds.map((commentId) => {
                    const comment = liveLayers[commentId] as CommentType;
                    if (!comment) return null;

                    const replyCount = comment.replies?.length || 0;
                    const uniqueRepliers = comment.replies
                        ? Array.from(new Set(comment.replies.map(reply => reply.author?.userId)))
                            .slice(0, MAX_SHOWN_REPLIES)
                            .map(userId => comment.replies!.find(reply => reply.author?.userId === userId)!)
                        : [];

                    const userMentioned = isUserMentioned(comment);

                    return (
                        <div
                            key={commentId}
                            className={cn(
                                "mb-3 border-b border-zinc-200 dark:border-zinc-400 p-3 last:border-b-0 overflow-hidden relative",
                                userMentioned && "bg-blue-50",
                                openCommentBoxId === commentId && "bg-blue-500/20 border-l-4 border-l-blue-500"
                            )}
                            onPointerDown={() => handleCommentClick(commentId)}
                        >
                            {userMentioned && (
                                <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                                    @
                                </span>
                            )}
                            <div className="flex items-start space-x-2">
                                <Avatar className="w-8 h-8 border-2 border-blue-500">
                                    <AvatarImage src={comment.author?.information?.picture} />
                                    <AvatarFallback className="text-xs font-semibold">{comment.author?.information?.name?.[0]?.toUpperCase() || '?'}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-1">
                                            <span className="font-semibold text-sm w-[165px] truncate">{comment.author?.information?.name || 'Anonymous'}</span>
                                        </div>
                                        <span className="text-xs text-zinc-500 dark:text-zinc-400">
                                            {formatTimeAgo(new Date(comment.createdAt!))}
                                        </span>
                                    </div>
                                    <p
                                        className="text-sm mt-1"
                                        dangerouslySetInnerHTML={{ __html: comment.content || '' }}
                                    />                                
                                    {replyCount > 0 && (
                                        <div className="mt-2 flex items-center">
                                            <div className="flex -space-x-2 mr-2">
                                                {uniqueRepliers.map((reply) => (
                                                    <Avatar key={reply.id} className="w-7 h-7 border border-zinc-300 dark:border-zinc-600">
                                                        <AvatarImage src={reply.author?.information?.picture} />
                                                        <AvatarFallback className="text-xs font-semibold border-2">{reply.author?.information?.name?.[0]?.toUpperCase() || '?'}</AvatarFallback>
                                                    </Avatar>
                                                ))}
                                            </div>
                                            <span className="text-xs text-blue-500 dark:text-blue-400 font-semibold">
                                                {replyCount} {replyCount === 1 ? 'reply' : 'replies'}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </ScrollArea>
        </div>
    );
};
