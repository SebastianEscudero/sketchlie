"use client";

import { connectionIdToColor } from "@/lib/utils";
import { User } from "@/types/canvas";
import { UserAvatar } from "./user-avatar";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { OrganizationInvite } from "@/components/auth/organization-invite";
import { ChevronsDown, UserIcon } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const MAX_SHOWN_USERS = typeof window !== 'undefined'
    ? window.innerWidth <= 376
        ? 4
        : window.innerWidth <= 768
            ? 3
            : 6
    : 6;

interface ParticipantsProps {
    otherUsers: User[] | null;
    User: User
    org: any;
}

export const Participants = ({
    otherUsers,
    User,
    org
}: ParticipantsProps) => {

    const hasMoreUsers = otherUsers && otherUsers.length > MAX_SHOWN_USERS;

    return (
        <div className="absolute h-12 top-2 right-2 bg-white rounded-md p-3 flex items-center drop-shadow-md">
            <DropdownMenu>
                <DropdownMenuTrigger className="xs:hidden flex">
                    <ChevronsDown className="h-5 w-5" />
                </DropdownMenuTrigger>
                <DropdownMenuContent sideOffset={20}>
                    <div className="gap-x-2 flex flex-row p-1">
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
                </DropdownMenuContent>
            </DropdownMenu>
            <div className="hidden xs:flex gap-x-2">
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
            {org && (
                <Dialog>
                    <DialogTrigger asChild className="ml-3">
                        <Button variant="auth" className="h-8 w-24">
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
        <div className="absolute h-12 top-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md w-[100px]" />
    );
};