"use client";

import { connectionIdToColor } from "@/lib/utils";
import { User } from "@/types/canvas";
import { UserAvatar } from "./user-avatar";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { OrganizationInvite } from "@/components/auth/organization-invite";
import { UsersDialogBoard } from "./users-dialog-board";
import { UserPlus } from "lucide-react";

const MAX_SHOWN_USERS = 5;

interface ParticipantsProps {
    otherUsers: User[] | null;
    User: User;
    org: any;
    socket: any;
    expired: boolean;
    board: any;
}

export const Participants = ({
    otherUsers,
    User,
    org,
    socket,
    expired,
    board
}: ParticipantsProps) => {

    const hasMoreUsers = otherUsers && otherUsers.length > MAX_SHOWN_USERS;

    return (
        <div className="border dark:border-zinc-700 shadow-md absolute h-12 right-2 top-2 bg-white dark:bg-[#272727] rounded-lg p-3 flex items-center pointer-events-auto">
            <div className="hidden xs:flex gap-x-2">
                <UsersDialogBoard
                    Me={User}
                    otherUsers={otherUsers}
                    orgId={org.id}
                    socket={socket}
                />
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
            {org && expired !== true && User.information.role === "Admin" && (
                <OrganizationInvite
                    activeOrganization={org.id}
                    isPrivate={board.private}
                    boardId={board._id}
                >
                    <Button variant="sketchlieBlue" className="h-8 w-20 p-1 text-sm font-semibold">
                        <UserPlus className="h-4 w-4 mr-1" strokeWidth={3} />
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