"use client";

import { ArrowLeftRight, ChevronDown, PlusIcon, Settings, User } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCurrentUser } from "@/hooks/use-current-user";
import { CreateOrganization } from "./create-organization";
import { OrganizationSettings } from "./org-settings";
import { OrgImage } from "./org-image";
import { getPlanColor } from "@/lib/orgUtils";
import { useState } from "react";
import { useOrganization } from "@/app/contexts/organization-context";
import { InviteMenu } from "./invite-menu";
import { OrganizationMembers } from "./org-members";

export const OrganizationSwitcher = () => {
    const [isSettingsDialogOpen, setIsSettingsDialogOpen] = useState(false);
    const [isMembersDialogOpen, setIsMembersDialogOpen] = useState(false);
    const [isCreateBoardDialogOpen, setIsCreateBoardDialogOpen] = useState(false);
    const { currentOrganization, setCurrentOrganizationId } = useOrganization();
    const user = useCurrentUser();

    if (!user || !currentOrganization) return null;

    const hasOrg = user.organizations.length > 0;
    const otherOrgs = user.organizations.filter(org => org.id !== currentOrganization?.id);
    const invitations = user.invitations;
    const Initial = currentOrganization?.name.charAt(0).toUpperCase() ?? "";

    const { color, letterColor } = getPlanColor(currentOrganization?.subscriptionPlan);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="border dark:border-zinc-600 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-lg px-2 py-1.5 flex items-center w-full outline-none">
                {hasOrg && currentOrganization ? (
                    <div className="flex items-center truncate">
                        <div className="aspect-square relative w-[34px] flex-shrink-0">
                            <OrgImage
                                height="34px"
                                width="34px"
                                letter={Initial}
                                color={color}
                                letterColor={letterColor}
                            />
                        </div>
                        <div className="flex items-center truncate w-full sm:max-w-[150px] max-w-[200px]">
                            <div className="flex flex-col text-left w-full font-medium">
                                <p className="ml-3 text-[13px] font-semibold truncate">{currentOrganization.name}</p>
                                <p className="ml-3 text-xs truncate flex flex-row items-center">
                                    {currentOrganization.subscriptionPlan} - <User className="h-[11px] w-[11px] mx-1" />
                                    {currentOrganization.users.length}
                                </p>
                            </div>
                            {invitations.length > 0 && (
                                <p className="ml-2 bg-custom-blue text-white px-1 mt-0.5 text-[10px] rounded-sm items-center animate-popup">
                                    {invitations.length}
                                </p>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center truncate pr-2">
                        <p className="ml-3 text-sm truncate">No organization selected</p>
                        {invitations.length > 0 && (
                            <p className="ml-2 bg-custom-blue text-white px-1 mt-0.5 text-[10px] rounded-sm items-center animate-popup">
                                {invitations.length}
                            </p>
                        )}
                    </div>
                )}
                <ChevronDown className="ml-auto text-zinc-800 dark:text-zinc-200 flex-shrink-0" width={20} />
            </DropdownMenuTrigger>
            {isSettingsDialogOpen ? (
                <OrganizationSettings
                    isOpen={isSettingsDialogOpen}
                    setIsOpen={setIsSettingsDialogOpen}
                />
            ) : isMembersDialogOpen ? (
                <OrganizationMembers
                    isOpen={isMembersDialogOpen}
                    setIsOpen={setIsMembersDialogOpen}
                />
            ) : isCreateBoardDialogOpen ? (
                <CreateOrganization
                    isOpen={isCreateBoardDialogOpen}
                    setIsOpen={setIsCreateBoardDialogOpen}
                />
            ) : (
                <DropdownMenuContent align="start" className="w-[300px]">
                    {hasOrg && currentOrganization && (
                        <>
                            <div className="flex items-center p-4">
                                <OrgImage
                                    height="45px"
                                    width="45px"
                                    letter={Initial}
                                    color={color}
                                    letterColor={letterColor}
                                />
                                <div className="ml-3 truncate">
                                    <p className="font-medium truncate">{currentOrganization.name}</p>
                                    <p className="text-xs text-muted-foreground truncate flex items-center">
                                        {currentOrganization.subscriptionPlan} - <User className="h-3 w-3 mx-1" />
                                        {currentOrganization.users.length}
                                    </p>
                                </div>
                            </div>
                            <div className="border-t px-1 py-2">
                                <DropdownMenuItem 
                                    onClick={() => setIsMembersDialogOpen(true)}
                                    className="py-2 px-3"
                                >
                                    <User className="h-4 w-4 mr-2" />
                                    Members
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                    onClick={() => setIsSettingsDialogOpen(true)}
                                    className="py-2 px-3"
                                >
                                    <Settings className="h-4 w-4 mr-2" />
                                    Settings
                                </DropdownMenuItem>
                            </div>
                        </>
                    )}
                    {invitations.length > 0 && (
                        <InviteMenu invitations={invitations} />
                    )}
                    {otherOrgs.length > 0 && (
                        <div className="border-t px-1 py-2">
                            <p className="text-xs font-medium text-muted-foreground px-3 py-2">
                                Switch Organization
                            </p>
                            {otherOrgs.map((org) => (
                                <DropdownMenuItem
                                    key={org.id}
                                    onClick={() => setCurrentOrganizationId(org.id)}
                                    className="py-2 px-3"
                                >
                                    <OrgImage
                                        height="32px"
                                        width="32px"
                                        letter={org.name.charAt(0).toUpperCase()}
                                        color={getPlanColor(org.subscriptionPlan).color}
                                        letterColor={getPlanColor(org.subscriptionPlan).letterColor}
                                    />
                                    <span className="ml-2 flex-1 truncate">{org.name}</span>
                                    <ArrowLeftRight className="h-4 w-4 text-muted-foreground" />
                                </DropdownMenuItem>
                            ))}
                        </div>
                    )}
                    <div className="border-t px-1 py-2">
                        <DropdownMenuItem 
                            onClick={() => setIsCreateBoardDialogOpen(true)}
                            className="py-2 px-3"
                        >
                            <PlusIcon className="h-4 w-4 mr-2" />
                            Create Organization
                        </DropdownMenuItem>
                    </div>
                </DropdownMenuContent>
            )}
        </DropdownMenu>
    );
};