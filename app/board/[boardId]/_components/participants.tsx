"use client";

import { connectionIdToColor } from "@/lib/utils";
import { User } from "@/types/canvas";
import { UserAvatar } from "./user-avatar";
import { Button } from "@/components/ui/button";
import { OrganizationInvite } from "@/components/auth/organization-invite";
import { UsersDialogBoard } from "./users-dialog-board";
import { Play, UserPlus } from "lucide-react";

const MAX_SHOWN_USERS = 5;

interface ParticipantsProps {
    otherUsers: User[] | null;
    User: User;
    org: any;
    socket: any;
    expired: boolean;
    board: any;
    setPresenting: (presenting: boolean) => void;
}

export const Participants = ({
    otherUsers,
    User,
    org,
    socket,
    expired,
    board,
    setPresenting
}: ParticipantsProps) => {

    const hasMoreUsers = otherUsers && otherUsers.length > MAX_SHOWN_USERS;

    return (
        <div className="border dark:border-zinc-800 shadow-md absolute h-12 right-4 top-2 bg-white dark:bg-zinc-800 rounded-xl p-3 flex items-center pointer-events-auto">
            <div className="hidden xs:flex items-center">
                <UsersDialogBoard
                    Me={User}
                    otherUsers={otherUsers}
                    orgId={org.id}
                    socket={socket}
                />
                <div className="flex -space-x-2 mx-1">
                    {otherUsers && otherUsers.slice(0, MAX_SHOWN_USERS)
                        .map(({ userId, connectionId, information }, index) => {
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
            </div>
            {/*<Button variant="presentation" className="hidden md:flex ml-2 h-8 w-24 p-1 text-sm" onClick={() => setPresenting(true)}>
                <Play className="h-4 w-4 mr-1" strokeWidth={2} />
                Present
            </Button>*/}
            {org && expired !== true && User.information.role === "Admin" && (
                <OrganizationInvite
                    activeOrganization={org.id}
                    isPrivate={board.private}
                    boardId={board._id}
                >
                    <Button variant="sketchlieBlue" className="h-8 w-20 p-1 text-sm">
                        <UserPlus className="h-4 w-4 mr-1" strokeWidth={2.5} />
                        Share
                    </Button>
                </OrganizationInvite>
            )}
        </div>
    )
}

export const ParticipantsSkeleton = () => {
    return (
        <div className="absolute h-12 right-0 bg-white rounded-bl-lg p-3 flex items-center shadow-md w-[100px]" />
    );
};