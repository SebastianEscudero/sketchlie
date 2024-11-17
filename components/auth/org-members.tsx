"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useOrganization } from "@/app/contexts/organization-context";
import { OrgImage } from "./org-image";
import { getPlanColor } from "@/lib/orgUtils";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { User, MoreVertical, ChevronDown, Shield, Users as UsersIcon, UserMinus, UserPlus } from "lucide-react";
import { editUserRole } from "@/actions/edit-role";
import { leaveOrganization } from "@/actions/leave-organizations";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { Role } from "@prisma/client";
import { deleteOrganization } from "@/actions/delete-organization";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { Badge } from "@/components/ui/badge";
import { ConfirmModal } from "../confirm-modal";
import { OrganizationInvite } from "./organization-invite";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useState } from "react";

interface OrganizationMembersProps {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
}

const roleIcons = {
    'Admin': <Shield className="h-4 w-4 text-blue-600" />,
    'Member': <UsersIcon className="h-4 w-4 text-green-600" />,
    'Guest': <User className="h-4 w-4 text-gray-600" />
};

export const OrganizationMembers = ({
    isOpen,
    setIsOpen,
}: OrganizationMembersProps) => {
    const user = useCurrentUser();
    const { currentOrganization, setCurrentOrganizationId, userRole } = useOrganization();
    const { color, letterColor } = getPlanColor(currentOrganization?.subscriptionPlan);
    const Initial = currentOrganization?.name?.charAt(0).toUpperCase() || "?";
    const { update } = useSession();
    const { mutate } = useApiMutation(api.board.remove);
    const [selectedRoleFilter, setSelectedRoleFilter] = useState<Role | "all">("all");

    const data = useQuery(api.boards.get, {
        orgId: currentOrganization?.id!,
        userId: user?.id,
    });

    if (!user || !currentOrganization) return null;

    const handleRoleChange = async (userId: string, newRole: Role) => {
        if (userRole !== 'Admin') {
            toast.error("Only admins can change roles");
            return;
        }

        const result = await editUserRole(currentOrganization.id, userId, newRole);
        if (result.error) {
            toast.error(result.error);
        } else {
            toast.success(result.success);
            update();
        }
    };

    const handleDelete = async () => {
        try {
            await Promise.all(
                (data?.map(board => mutate({ id: board._id, userId: user.id })) || [])
            );
            
            await deleteOrganization(currentOrganization.id);
            
            if (user.organizations && user.organizations.length > 0) {
                const firstOrgId = user.organizations[0].id;
                setCurrentOrganizationId(firstOrgId);
            } else {
                setCurrentOrganizationId(null);
            }
            
            update();
            setIsOpen(false);
            toast.success("Organization deleted successfully");
        } catch (error) {
            toast.error("Failed to delete organization");
        }
    };

    const handleLeaveOrganization = async (userId: string) => {
        try {
            if (currentOrganization.users.length <= 1) {
                await handleDelete();
                return;
            }

            const result = await leaveOrganization(currentOrganization.id, userId);
            
            if (result.error) {
                toast.error(result.error);
                return;
            }

            if (userId === user.id) {
                if (user.organizations && user.organizations.length > 0) {
                    const firstOrgId = user.organizations[0].id;
                    setCurrentOrganizationId(firstOrgId);
                } else {
                    setCurrentOrganizationId(null);
                }
                setIsOpen(false);
            }

            update();
            toast.success(userId === user.id ? "You have left the organization" : "User removed successfully");
        } catch (error) {
            toast.error("Failed to process request");
        }
    };

    const EmptyStateRows = () => {
        if (selectedRoleFilter !== "all") return null;

        const currentUserCount = currentOrganization.users.length;
        const emptyRowsCount = Math.max(3 - currentUserCount, 0); // Always show at least 3 rows total
        
        return (
            <>
                {Array.from({ length: emptyRowsCount }).map((_, i) => (
                    <div 
                        key={`empty-${i}`} 
                        className="flex items-center justify-between p-4 border border-dashed dark:border-zinc-700 rounded-lg bg-zinc-50/50 dark:bg-zinc-800/50"
                    >
                        <div className="flex items-center space-x-4 min-w-0">
                            <div className="h-10 w-10 rounded-full bg-zinc-100 dark:bg-zinc-700" />
                            <div className="min-w-0 max-w-[200px] sm:max-w-[300px] space-y-2">
                                <div className="h-4 w-32 bg-zinc-100 dark:bg-zinc-700 rounded" />
                                <div className="h-3 w-48 bg-zinc-100 dark:bg-zinc-700 rounded" />
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="h-8 w-24 bg-zinc-100 dark:bg-zinc-700 rounded" />
                        </div>
                    </div>
                ))}
            </>
        );
    };

    const filteredUsers = currentOrganization.users.filter((orgUser: any) => {
        if (selectedRoleFilter === "all") return true;
        return orgUser.role === selectedRoleFilter;
    }).sort((a: any, b: any) => {
        if (a.id === user?.id) return -1;
        if (b.id === user?.id) return 1;
        if (a.role === 'Admin' && b.role !== 'Admin') return -1;
        if (b.role === 'Admin' && a.role !== 'Admin') return 1;
        return 0;
    });

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="max-w-3xl h-auto max-h-[90vh] flex flex-col gap-6 pt-10">
                <DialogHeader className="flex-shrink-0 pb-2 border-b relative">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <OrgImage
                                width="42px"
                                height="42px"
                                letter={Initial}
                                color={color}
                                letterColor={letterColor}
                            />
                            <div>
                                <DialogTitle>{currentOrganization.name}</DialogTitle>
                                <DialogDescription>
                                    Manage organization members
                                </DialogDescription>
                            </div>
                        </div>
                        {userRole === 'Admin' && (
                            <OrganizationInvite>
                                <Button size="sm" variant="sketchlieBlue">
                                    <UserPlus className="h-4 w-4 mr-2" />
                                    Invite Members
                                </Button>
                            </OrganizationInvite>
                        )}
                    </div>
                </DialogHeader>

                <div className="flex items-center justify-between px-2">
                    <div className="text-sm text-muted-foreground">
                        {filteredUsers.length} of {currentOrganization.users.length} {currentOrganization.users.length === 1 ? 'member' : 'members'}
                    </div>
                    <Select
                        value={selectedRoleFilter}
                        onValueChange={(value: Role | "all") => setSelectedRoleFilter(value)}
                    >
                        <SelectTrigger className="w-[140px]">
                            <SelectValue>
                                {selectedRoleFilter === "all" ? (
                                    <span className="flex items-center">
                                        <UsersIcon className="h-4 w-4 mr-2" />
                                        All Roles
                                    </span>
                                ) : (
                                    <span className="flex items-center">
                                        {roleIcons[selectedRoleFilter as keyof typeof roleIcons]}
                                        <span className="ml-2">{selectedRoleFilter}s</span>
                                    </span>
                                )}
                            </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">
                                <span className="flex items-center">
                                    <UsersIcon className="h-4 w-4 mr-2" />
                                    All Roles
                                </span>
                            </SelectItem>
                            <SelectItem value="Admin">
                                <span className="flex items-center">
                                    <Shield className="h-4 w-4 mr-2 text-blue-600" />
                                    Admins
                                </span>
                            </SelectItem>
                            <SelectItem value="Member">
                                <span className="flex items-center">
                                    <UsersIcon className="h-4 w-4 mr-2 text-green-600" />
                                    Members
                                </span>
                            </SelectItem>
                            <SelectItem value="Guest">
                                <span className="flex items-center">
                                    <User className="h-4 w-4 mr-2 text-gray-600" />
                                    Guests
                                </span>
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <ScrollArea className="h-full flex-1 flex flex-col">
                    <div className="space-y-4 min-h-[300px] pr-6">
                        {filteredUsers.map((orgUser: any) => (
                            <div 
                                key={orgUser.id} 
                                className="flex items-center justify-between p-4 border dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-lg transition-colors"
                            >
                                <div className="flex items-center space-x-4 min-w-0">
                                    <Avatar className="h-10 w-10">
                                        <AvatarImage src={orgUser.image || ""} />
                                        <AvatarFallback className="bg-blue-600">
                                            <User className="text-white" />
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="min-w-0 max-w-[200px] sm:max-w-[300px]">
                                        <div className="flex items-center gap-2">
                                            <p className="font-medium truncate">
                                                {orgUser.name}
                                            </p>
                                            {orgUser.id === user?.id && (
                                                <Badge variant="secondary" className="h-5">
                                                    You
                                                </Badge>
                                            )}
                                        </div>
                                        <p className="text-sm text-muted-foreground truncate">
                                            {orgUser.email}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    {userRole === 'Admin' && orgUser.id !== user?.id ? (
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="sm">
                                                    {roleIcons[orgUser.role as keyof typeof roleIcons]}
                                                    <span className="ml-2 hidden sm:inline">{orgUser.role}</span>
                                                    <ChevronDown className="h-4 w-4 ml-0.5" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem onClick={() => handleRoleChange(orgUser.id, 'Admin')}>
                                                    <Shield className="h-4 w-4 mr-2 text-blue-600" />
                                                    Admin
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => handleRoleChange(orgUser.id, 'Member')}>
                                                    <UsersIcon className="h-4 w-4 mr-2 text-green-600" />
                                                    Member
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => handleRoleChange(orgUser.id, 'Guest')}>
                                                    <User className="h-4 w-4 mr-2 text-gray-600" />
                                                    Guest
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    ) : (
                                        <div className="flex items-center gap-2 px-3">
                                            {roleIcons[orgUser.role as keyof typeof roleIcons]}
                                            <span className="text-sm hidden sm:inline">{orgUser.role}</span>
                                        </div>
                                    )}
                                    {(userRole === 'Admin' || orgUser.id === user.id) && (
                                        <ConfirmModal
                                            header={orgUser.id === user.id ? "Leave organization" : "Remove member"}
                                            description={
                                                orgUser.id === user.id 
                                                    ? "Are you sure you want to leave this organization?"
                                                    : `Are you sure you want to remove ${orgUser.name}?`
                                            }
                                            onConfirm={() => handleLeaveOrganization(orgUser.id)}
                                        >
                                            <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                                                <UserMinus className="h-4 w-4" />
                                            </Button>
                                        </ConfirmModal>
                                    )}
                                </div>
                            </div>
                        ))}
                        {filteredUsers.length === 0 && selectedRoleFilter !== "all" ? (
                            <div className="flex flex-col items-center justify-center h-[300px] text-muted-foreground">
                                {roleIcons[selectedRoleFilter as keyof typeof roleIcons]}
                                <p className="mt-2">No {selectedRoleFilter.toLowerCase()}s found</p>
                            </div>
                        ) : (
                            <EmptyStateRows />
                        )}
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
};