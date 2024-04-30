"use client";

import { connectionIdToColor } from "@/lib/utils";
import { User } from "@/types/canvas";
import { UserAvatar } from "./user-avatar";

const MAX_SHOWN_USERS = 4;

interface ParticipantsProps {
    otherUsers: User[] | null;
    User: User
}

export const Participants = ({
    otherUsers,
    User
}: ParticipantsProps) => {

    const hasMoreUsers = otherUsers && otherUsers.length> MAX_SHOWN_USERS;

    return(
        <div className="absolute h-12 top-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md">
            <div className="flex gap-x-2">
                {otherUsers && otherUsers.slice(0, MAX_SHOWN_USERS)
                    .map(({ userId, information}) => {
                        return(
                            <UserAvatar
                                borderColor={connectionIdToColor(userId)}
                                key={userId}
                                src={information?.picture}
                                name={information?.name}
                                fallback={information?.name?.[0] || "T"}
                            />
                        );
                    
                    })}

                    {User && (
                        <UserAvatar
                            borderColor={connectionIdToColor(User.userId)}
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
        </div>
    )
}

export const ParticipantsSkeleton = () => {
    return(
        <div className="absolute h-12 top-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md w-[100px]"/>
    );
};