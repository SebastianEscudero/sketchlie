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

interface MembersTabProps {
    activeOrg: any;
    user: any;
    usersRole: any;
    setActiveOrganization: any;
}

export const MembersTab = ({ activeOrg, user, usersRole, setActiveOrganization }: MembersTabProps) => {
    const { update } = useSession();

    const handleRoleChange = async (userId: string, newRole: Role) => {
        if (usersRole !== 'Admin') {
            toast.error("Only admins can change roles");
            return;
        }

        const result = await editUserRole(activeOrg.id, userId, newRole);
        if (result.error) {
            toast.error(result.error);
        } else {
            toast.success(result.success);
            update();
        }
    };

    const handleLeaveOrganization = async (userId: string) => {
        leaveOrganization(activeOrg.id, userId)
        .then((result) => {
            if (result.isOrgDeleted || userId === user?.id) {
                if (user && user.organizations && user?.organizations?.length > 0) {
                    const firstOrgId = user.organizations[0].id;
                    setActiveOrganization(firstOrgId);
                    localStorage.setItem("activeOrganization", firstOrgId);
                } else {
                    setActiveOrganization(null);
                    localStorage.setItem("activeOrganization", '');
                }
            }
            update();
            if (result.isOrgDeleted) {
                toast.success("Organization deleted successfully");
            } else if (userId === user?.id) {
                toast.success("You have left the organization");
            } else {
                toast.success("User removed successfully");
            }
        })
    }

    return (
        <ScrollArea className="h-[50vh] w-full rounded-md">
            {activeOrg.users
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
                            {usersRole === 'Admin' && orgUser.id !== user?.id ? (
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
                            {usersRole === 'Admin' && (
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