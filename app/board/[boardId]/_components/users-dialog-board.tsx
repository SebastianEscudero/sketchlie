import React from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { User } from "@/types/canvas";
import { ChevronsDown } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { connectionIdToColor } from '@/lib/utils';
import { UserAvatar } from './user-avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from 'sonner';
import { editUserRole } from '@/actions/edit-role';
import { useSession } from 'next-auth/react';

interface UsersDialogBoardProps {
    Me: User;
    otherUsers: User[] | null;
    orgId: string;
    socket: any
}

const roles = ["Guest", "Member", "Admin"];

export const UsersDialogBoard = ({
    Me,
    otherUsers,
    orgId,
    socket
}: UsersDialogBoardProps) => {
    const allUsers = [Me, ...(otherUsers || [])];
    const { update } = useSession();

    const handleRoleChange = async (userId: string, newRole: any) => {
        const user = allUsers.find(u => u.userId === userId);
        if (user) {
            const result = await editUserRole(orgId, userId, newRole);
            if (result.success) {
                toast.success(result.success);
                // Emit socket event to update role for all clients
                socket?.emit('role-update', userId, newRole);
            } else {
                toast.error(result.error);
            }
            update();
        }
    };

    return (
        <Dialog>
            <DialogTrigger>
                <ChevronsDown className="h-5 w-5" />
            </DialogTrigger>
            <DialogContent className="min-h-[500px] max-h-[90%] w-full max-w-[90%] lg:max-w-[50%] xl:max-w-[40%]">
                <DialogTitle>Participants</DialogTitle>
                <ScrollArea className="h-[400px] w-full rounded-md border border-zinc-200 p-4">
                    {allUsers.map((user) => (
                        <div key={user.userId} className="flex items-center justify-between space-x-4 mb-4 pr-2">
                            <div className="flex items-center space-x-4">
                                <UserAvatar
                                    borderColor={connectionIdToColor(user.connectionId)}
                                    src={user.information?.picture}
                                    name={user.information?.name?.toUpperCase()}
                                    fallback={user.information?.name?.[0]?.toUpperCase() || "T"}
                                />
                                <div className="ml-2">
                                    <p className="truncate xs:w-auto w-[140px] text-sm font-semibold">
                                        {user.information.name}
                                        {Me.connectionId === user?.connectionId && (
                                            <span className="bg-[#D8E0FC] px-[4px] py-[2px] rounded-sm text-[12px] text-blue-600 ml-2">You</span>
                                        )}
                                    </p>
                                </div>
                            </div>
                                <Select
                                    onValueChange={(value) => handleRoleChange(user.userId, value)}
                                    defaultValue={user.information.role}
                                    disabled={Me.information.role !== "Admin" || Me.userId === user.userId}
                                >
                                    <SelectTrigger className="w-[100px]">
                                        <SelectValue placeholder="Select role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {roles.map((role) => (
                                            <SelectItem key={role} value={role}>
                                                {role}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                        </div>
                    ))}
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}