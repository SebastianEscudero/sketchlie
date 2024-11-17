import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { User, MoreVertical, ChevronDown } from "lucide-react";
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
import { useOrganization } from "@/app/contexts/organization-context";
import { useCurrentUser } from "@/hooks/use-current-user";

interface MembersTabProps {
    onClose: () => void;
}

export const MembersTab = ({ onClose }: MembersTabProps) => {
    const { currentOrganization, setCurrentOrganizationId, userRole } = useOrganization();
    const user = useCurrentUser();

    const { update } = useSession();
    const { mutate } = useApiMutation(api.board.remove);

    const data = useQuery(api.boards.get, {
        orgId: currentOrganization?.id!,
        userId: user?.id,
    });

    if (!currentOrganization || !user) return null;

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
            // Delete all boards first
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
            onClose();
            toast.success("Organization deleted successfully");
        } catch (error) {
            toast.error("Failed to delete organization");
        }
    };

    const handleLeaveOrganization = async (userId: string) => {
        try {
            // If user is the last member, delete the organization
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
                onClose();
            }

            update();
            toast.success(userId === user.id ? "You have left the organization" : "User removed successfully");
        } catch (error) {
            toast.error("Failed to process request");
        }
    };

    return (
        <ScrollArea className="h-[50vh] w-full rounded-md">
            {currentOrganization.users
                .sort((a: any, b: any) => (a.id === user?.id ? -1 : b.id === user?.id ? 1 : 0))
                .map((orgUser: any) => (
                    <div key={orgUser.id} className="flex items-center justify-between p-2 border dark:border-zinc-300 rounded-md mb-2">
                        <div className="flex items-center space-x-4 bflex-grow min-w-0">
                            <Avatar className="flex-shrink-0">
                                <AvatarImage src={orgUser.image || ""} />
                                <AvatarFallback className="bg-blue-600">
                                    <User className="text-white" />
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col min-w-0 w-full max-w-[80px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]">
                                <p className="truncate font-medium">
                                    {orgUser.name}
                                    {orgUser.id === user?.id && (
                                        <span className="truncate bg-blue-100 text-blue-800 text-xs font-medium ml-2 px-2.5 py-0.5 rounded">You</span>
                                    )}
                                </p>
                                <p className="truncate text-sm text-gray-500">{orgUser.email}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-1">
                            {userRole === 'Admin' && orgUser.id !== user?.id ? (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="sm" className="text-sm text-gray-500">
                                            {orgUser.role} <ChevronDown className="h-4 w-4 ml-0.5" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem onClick={() => handleRoleChange(orgUser.id, 'Admin')}>
                                            Admin
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => handleRoleChange(orgUser.id, 'Member')}>
                                            Member
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => handleRoleChange(orgUser.id, 'Guest')}>
                                            Guest
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            ) : (
                                <span className="text-sm text-gray-500 px-4">{orgUser.role}</span>
                            )}
                            {userRole === 'Admin' && (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="sm">
                                            <MoreVertical className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem className="text-red-600" onClick={() => handleLeaveOrganization(orgUser.id)}>
                                            {orgUser.id === user?.id ? "Leave organization" : "Remove member"}
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            )}
                        </div>
                    </div>
                ))}
        </ScrollArea>
    );
};