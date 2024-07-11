"use client";

import { connectionIdToColor } from "@/lib/utils";
import { User } from "@/types/canvas";
import { UserAvatar } from "./user-avatar";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { OrganizationInvite } from "@/components/auth/organization-invite";
import { UserIcon } from "lucide-react";

const MAX_SHOWN_USERS = 5;

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
        <div className="absolute h-12 right-0 bg-white rounded-bl-lg p-3 flex items-center shadow-custom-1">
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