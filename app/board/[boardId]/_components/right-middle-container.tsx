import { memo } from "react";
import { Layers, User } from "@/types/canvas";
import { FramesPanel } from "./frames-panel";
import { Socket } from "socket.io-client";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { CommentsPanel } from "./comments-panel";

interface RightMiddleContainerProps {
    rightMiddleContainerView: string | null;
    liveLayers: Layers;
    liveLayerIds: string[];
    setLiveLayerIds: (frameIds: string[]) => void;
    cameraRef: React.RefObject<{ x: number; y: number }>;
    zoomRef: React.RefObject<number>;
    forcedRender: boolean;
    boardId: string;
    socket: Socket | null;
    setPresentationMode: (mode: boolean) => void;
    setRightMiddleContainerView: (view: string | null) => void;
    setCamera: (camera: { x: number, y: number }) => void;
    setZoom: (zoom: number) => void;
    commentIds: string[];
    openCommentBoxId: string | null;
    setOpenCommentBoxId: (commentId: string | null) => void;
    user: User;
    title: string;
}

export const RightMiddleContainer = memo(({
    rightMiddleContainerView,
    liveLayers,
    liveLayerIds,
    setLiveLayerIds,
    cameraRef,
    zoomRef,
    forcedRender,
    boardId,
    socket,
    setPresentationMode,
    setRightMiddleContainerView,
    setCamera,
    setZoom,
    commentIds,
    openCommentBoxId,
    setOpenCommentBoxId,
    user,
    title
}: RightMiddleContainerProps) => {
    if (rightMiddleContainerView === null) return null;

    return (
        <div
            onWheel={(e) => e.stopPropagation()}
            className="rounded-lg border dark:border-zinc-800 pointer-events-auto absolute top-[64px] right-4 bottom-[80px] w-[320px] bg-white dark:bg-zinc-800 shadow-lg overflow-hidden"
        >
            <div className="flex justify-between items-center p-4 border-b dark:border-zinc-400">
                <h2 className="text-lg font-semibold">{rightMiddleContainerView.charAt(0).toUpperCase() + rightMiddleContainerView.slice(1)}</h2>
                <Button onClick={() => setRightMiddleContainerView(null)} variant="ghost" size="sm">
                    <X className="h-4 w-4" />
                </Button>
            </div>
            {rightMiddleContainerView === "frames" && (
                <FramesPanel
                    liveLayers={liveLayers}
                    liveLayerIds={liveLayerIds}
                    setLiveLayerIds={setLiveLayerIds}
                    setCamera={setCamera}
                    setZoom={setZoom}
                    cameraRef={cameraRef}
                    zoomRef={zoomRef}
                    forceRender={forcedRender}
                    boardId={boardId}
                    socket={socket}
                    setPresentationMode={setPresentationMode}
                    title={title}
                />
            )}
            {rightMiddleContainerView === "comments" && 
                <CommentsPanel
                    commentIds={commentIds}
                    liveLayers={liveLayers}
                    openCommentBoxId={openCommentBoxId}
                    setOpenCommentBoxId={setOpenCommentBoxId}
                    setCamera={setCamera}
                    setZoom={setZoom}
                    cameraRef={cameraRef}
                    zoomRef={zoomRef}
                    user={user}
                />
            }
        </div>
    )
});

RightMiddleContainer.displayName = "RightMiddleContainer";
