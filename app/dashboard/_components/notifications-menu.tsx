"use client";

import { InviteMenu } from "@/components/auth/invite-menu";
import { DropdownMenu, DropdownMenuContent } from "@/components/ui/dropdown-menu"
import { useCurrentUser } from "@/hooks/use-current-user";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { Bell } from "lucide-react"

export const NotificationsMenu = () => {
    const user = useCurrentUser();
    if (!user) return null;
    const invitations = user.invitations;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="xs:flex hidden">
                <Bell className="h-6 w-6" />
                {invitations.length > 0 && (
                    <p className="bg-custom-blue text-white px-1 text-[10px] rounded-sm items-center animate-popup">{invitations.length}</p>
                )}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="rounded-lg drop-shadow-md">
                <div className="w-full mr-10">
                    <div className="flex flex-row mb-3 items-center p-5 pb-0">
                        <Bell className="h-6 w-6" />
                        <div className="ml-3">
                            <p className="text-md font-semibold">
                                Notifications
                            </p>
                        </div>
                    </div>
                    {invitations.length > 0 ? (
                        <InviteMenu invitations={invitations} />
                    ) :
                        <div className="flex flex-col p-5">
                            <p className="text-sm">
                                You have no notifications
                            </p>
                        </div>
                    }
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}