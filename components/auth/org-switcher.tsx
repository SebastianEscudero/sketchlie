"use client";

import { ArrowLeftRight, ChevronsUpDown, PlusIcon, Settings, User } from "lucide-react"

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
import { InviteMenu } from "./invite-menu";
import { useState } from "react";

interface OrganizationSwitcherProps {
    activeOrganization: string | null;
    setActiveOrganization: (id: string) => void;
}

export const OrganizationSwitcher = ({
    activeOrganization,
    setActiveOrganization,
}: OrganizationSwitcherProps) => {
    const [isSettingsDialogOpen, setIsSettingsDialogOpen] = useState(false);
    const [isCreateBoardDialogOpen, setIsCreateBoardDialogOpen] = useState(false);

    const user = useCurrentUser();

    if (!user) return null;

    const hasOrg = user.organizations.length > 0
    const activeOrg = user?.organizations.find(org => org.id === activeOrganization);
    const otherOrgs = user.organizations.filter(org => org.id !== activeOrganization);
    const invitations = user.invitations;
    const Initial = activeOrg?.name.charAt(0).toUpperCase();

    let color = "#000000"; // default color
    let letterColor = "#FFFFFF"; // default letter color

    if (activeOrg) {
        ({ color, letterColor } = getPlanColor(activeOrg.subscriptionPlan));
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="border dark:border-zinc-600 border-zinc-400 dark:hover:bg-[#383838] hover:bg-zinc-200 rounded-lg p-[10px] flex items-center w-full outline-none">
                {hasOrg && activeOrg ? (
                    <div className="flex items-center truncate">
                        <div className="aspect-square relative w-[36px] flex-shrink-0">
                            <OrgImage
                                height="36px"
                                width="36px"
                                letter={Initial}
                                color={color}
                                letterColor={letterColor}
                            />
                        </div>
                        <div className="flex items-center truncate w-full sm:max-w-[150px] max-w-[200px]">
                            <div className="flex flex-col text-left w-full font-medium">
                                <p className="ml-3 text-sm truncate">{activeOrg.name}</p>
                                <p className="ml-3 text-xs truncate flex flex-row items-center">{activeOrg.subscriptionPlan} - <User className="h-[11px] w-[11px] mx-1" />{activeOrg.users.length}</p>
                            </div>
                            {invitations.length > 0 && (
                                <p className="ml-2 bg-custom-blue text-white px-1 mt-0.5 text-[10px] rounded-sm items-center animate-popup">{invitations.length}</p>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center truncate pr-2">
                        <p className="ml-3 text-sm truncate">No organization selected</p>
                        {invitations.length > 0 && (
                            <p className="ml-2 bg-custom-blue text-white px-1 mt-0.5 text-[10px] rounded-sm items-center animate-popup">{invitations.length}</p>
                        )}
                    </div>
                )}
                <ChevronsUpDown className="ml-auto text-zinc-400 flex-shrink-0" width={20} />
            </DropdownMenuTrigger>
            {isSettingsDialogOpen && activeOrg ? (
                <OrganizationSettings
                    isOpen={isSettingsDialogOpen}
                    setIsOpen={setIsSettingsDialogOpen}
                    setActiveOrganization={setActiveOrganization}
                    activeOrganization={activeOrganization}
                />
            ) : isCreateBoardDialogOpen ? (
                <CreateOrganization
                    activeOrganization={activeOrganization}
                    setActiveOrganization={setActiveOrganization}
                    isOpen={isCreateBoardDialogOpen}
                    setIsOpen={setIsCreateBoardDialogOpen}
                />
            ) : (
                <DropdownMenuContent align="start" className="rounded-lg drop-shadow-md w-[350px]">
                    {hasOrg && activeOrg && (
                        <>
                            <div className="flex mb-3 items-center p-5 pb-0">
                                <OrgImage
                                    height="45px"
                                    width="45px"
                                    letter={Initial}
                                    color={color}
                                    letterColor={letterColor}
                                />
                                <div className="ml-3 truncate w-[230px] font-medium">
                                    <p className="ml-3 text-sm truncate">{activeOrg.name}</p>
                                    <p className="ml-3 text-xs truncate flex flex-row items-center">{activeOrg.subscriptionPlan} - <User className="h-[11px] w-[11px] mx-1" />{activeOrg.users.length}</p>
                                </div>
                            </div>
                            <DropdownMenuItem className="border-b dark:border-zinc-200 py-3 px-8 text-[14px] hover:bg-slate-100 w-full hover:cursor-pointer" onClick={() => setIsSettingsDialogOpen(true)}>
                                <div className="flex items-center">
                                    <Settings className="h-4 w-4 mr-2" />
                                    <p className="ml-5">Manage organization</p>
                                </div>
                            </DropdownMenuItem>
                        </>
                    )}
                    {invitations.length > 0 && (
                        <InviteMenu
                            invitations={invitations}
                            setActiveOrganization={setActiveOrganization}
                        />
                    )}
                    {otherOrgs.length > 0 && (
                        <div className="py-2">
                            {otherOrgs.map((org) => {
                                const { color, letterColor } = getPlanColor(org.subscriptionPlan);
                                return (
                                    <DropdownMenuItem
                                        onClick={() => {
                                            setActiveOrganization(org.id)
                                            localStorage.setItem("activeOrganization", org.id)
                                        }}
                                        key={org.id}
                                        className="py-1.5 px-5 flex items-center hover:bg-zinc-100 cursor-pointer"
                                    >
                                        <OrgImage
                                            height="35px"
                                            width="35px"
                                            letter={org.name.charAt(0).toUpperCase()}
                                            color={color}
                                            letterColor={letterColor}
                                        />
                                        <div className="ml-3 truncate w-[230px] font-medium">
                                            <p className="ml-3 text-sm truncate">{org.name}</p>
                                            <p className="ml-3 text-xs truncate flex flex-row items-center">{org.subscriptionPlan} - <User className="h-[11px] w-[11px] mx-1" />{org.users.length}</p>
                                        </div>
                                        <ArrowLeftRight className="h-4 w-4 ml-auto text-zinc-400" />
                                    </DropdownMenuItem>
                                );
                            })}
                        </div>
                    )}
                    <DropdownMenuItem className="py-3 px-8 text-[14px] hover:bg-slate-100 dark:hover:bg-[#2C2C2C] border-t dark:border-zinc-200 rounded-none" onClick={() => setIsCreateBoardDialogOpen(true)}>
                        <button className="flex items-center">
                            <PlusIcon className="h-4 w-4 mr-2" />
                            <p className="ml-5">Create organization</p>
                        </button>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            )}
        </DropdownMenu>
    );
};