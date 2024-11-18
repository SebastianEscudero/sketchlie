"use client";

import { connectionIdToColor } from "@/lib/utils";
import { LayerType, Point, User } from "@/types/canvas";
import { UserAvatar } from "./user-avatar";
import { Button } from "@/components/ui/button";
import { OrganizationInvite } from "@/components/auth/organization-invite";
import { UsersDialogBoard } from "./users-dialog-board";
import { ChevronDown, Play, UserPlus } from "lucide-react";
import { memo } from "react";
import { Hint } from "@/components/hint";
import { CommentsIcon } from "@/public/custom-icons/comments";
import { RecordingButton } from "./recording-button";
import { CanvasOverlayWrapper } from "./canvas-overlay-wrapper";

const MAX_SHOWN_USERS = 5;

interface ParticipantsProps {
    otherUsers: User[] | null;
    User: User;
    org: any;
    socket: any;
    expired: boolean;
    board: any;
    setPresentationMode: (mode: boolean) => void;
    setRightMiddleContainerView: (view: string | null) => void;
    insertMedia: (mediaItems: { layerType: LayerType.Image | LayerType.Video | LayerType.Link | LayerType.Svg, position: Point, info: any, zoom?: number }[]) => void;
}

export const Participants = memo(({
    otherUsers,
    User,
    org,
    socket,
    expired,
    board,
    setPresentationMode,
    setRightMiddleContainerView,
    insertMedia,
}: ParticipantsProps) => {

    const hasMoreUsers = otherUsers && otherUsers.length > MAX_SHOWN_USERS;
    const handleCommentsClick = () => {
        setRightMiddleContainerView(((prev: any) => prev === "comments" ? null : "comments") as any);
    };

    return (
        <CanvasOverlayWrapper className="absolute top-2 right-2 px-2 space-x-2">
            {/*<RecordingButton insertMedia={insertMedia} userId={User.userId} />*/}
            <Hint label="Comments" sideOffset={14}>
                <Button
                    variant="icon"
                    size="default"
                    className="px-2 xs:flex hidden"
                    onClick={handleCommentsClick}
                >
                    <CommentsIcon className="h-7 w-7" />
                </Button>
            </Hint>
            <UsersDialogBoard
                Me={User}
                otherUsers={otherUsers}
                orgId={org.id}
                socket={socket}
            >
                <div className="flex items-center bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-600 dark:hover:bg-zinc-700 rounded-full px-1 py-0.5">
                    <div className="flex -space-x-2 mr-1">
                        {otherUsers && otherUsers.slice(0, MAX_SHOWN_USERS)
                            .map(({ userId, connectionId, information }) => {
                                return (
                                    <UserAvatar
                                        borderColor={connectionIdToColor(connectionId)}
                                        key={userId}
                                        src={information?.picture}
                                        name={information?.name}
                                        fallback={information?.name?.[0]?.toUpperCase() || "T"}
                                    />
                                );
                            })}

                        {User && (
                            <UserAvatar
                                borderColor={connectionIdToColor(User.connectionId)}
                                src={User.information?.picture}
                                name={`${User.information?.name} (You)`}
                                fallback={User.information?.name?.[0]?.toUpperCase() || "T"}
                            />
                        )}
                        {hasMoreUsers && (
                            <UserAvatar
                                name={`${otherUsers.length - MAX_SHOWN_USERS} more`}
                                fallback={`+${otherUsers.length - MAX_SHOWN_USERS}`}
                            />
                        )}
                    </div>
                    <ChevronDown className="h-5 w-5" />
                </div>
            </UsersDialogBoard>
            <Button
                variant="presentation"
                className="hidden md:flex h-8 w-24 p-1 text-sm"
                onClick={() => setPresentationMode(true)}
            >
                <Play className="h-4 w-4 mr-1 fill-inherit" strokeWidth={2} />
                Present
            </Button>
            {org && expired !== true && User.information.role === "Admin" && (
                <OrganizationInvite
                    isPrivate={board.private}
                    boardId={board._id}
                >
                    <Button variant="sketchlieBlue" className="h-8 w-20 p-1 text-sm">
                        <UserPlus className="h-4 w-4 mr-1" strokeWidth={2.5} />
                        Share
                    </Button>
                </OrganizationInvite>
            )}
        </CanvasOverlayWrapper>
    )
});

Participants.displayName = "Participants";