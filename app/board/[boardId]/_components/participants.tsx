"use client";

import { connectionIdToColor } from "@/lib/utils";
import { User } from "@/types/canvas";
import { UserAvatar } from "./user-avatar";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { OrganizationInvite } from "@/components/auth/organization-invite";
import { UserIcon } from "lucide-react";
import { UsersDialogBoard } from "./users-dialog-board";

const MAX_SHOWN_USERS = 5;

interface ParticipantsProps {
    otherUsers: User[] | null;
    User: User
    org: any;
    socket: any;
    expired: boolean;
}

export const Participants = ({
    otherUsers,
    User,
    org,
    socket,
    expired
}: ParticipantsProps) => {

    const hasMoreUsers = otherUsers && otherUsers.length > MAX_SHOWN_USERS;

    return (
        <div className="absolute h-12 right-0 bg-white dark:bg-[#383838] rounded-bl-lg p-3 flex items-center shadow-custom-1 dark:shadow-custom-3">
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
                                fallback={information?.name?.[0] || "T"}
                            />
                        );

                    })}

                {User && (
                    <UserAvatar
                        borderColor={connectionIdToColor(User.connectionId)}
                        src={User.information?.picture}
                        name={`${User.information?.name} (You)`}
                        fallback={User.information?.name?.[0] || "T"}
                    />
                )}

                {hasMoreUsers && (
                    <UserAvatar
                        name={`${otherUsers.length - MAX_SHOWN_USERS} more`}
                        fallback={`+${otherUsers.length - MAX_SHOWN_USERS}`}
                    />
                )}
            </div>
            {org && expired !== true && User.information.role !== "Guest" && (
                <Dialog>
                    <DialogTrigger asChild className="xs:ml-3">
                        <Button variant="sketchlieBlue" className="h-8 w-24">
                            <UserIcon className="h-4 w-4 mr-2" />
                            Invite
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="min-h-[500px] max-h-[90%] w-full max-w-[90%] lg:max-w-[50%] xl:max-w-[40%] overflow-y-auto">
                        <OrganizationInvite
                            activeOrganization={org.id}
                        />
                    </DialogContent>
                </Dialog>
            )}
        </div>
    )
}

export const ParticipantsSkeleton = () => {
    return (
        <div className="absolute h-12 right-0 bg-white rounded-bl-lg p-3 flex items-center shadow-md w-[100px]" />
    );
};