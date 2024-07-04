"use client";

import { ArrowLeftRight, ChevronsUpDown, PlusIcon, Settings } from "lucide-react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useCurrentUser } from "@/hooks/use-current-user";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { CreateOrganization } from "./create-organization";
import { OrganizationSettings } from "./org-settings";
import { OrgImage } from "./org-image";
import { getPlanColor } from "@/lib/orgUtils";
import { InviteMenu } from "./invite-menu";

interface OrganizationSwitcherProps {
    activeOrganization: string | null;
    setActiveOrganization: (id: string) => void;
    plan: string;
}

export const OrganizationSwitcher = ({
    activeOrganization,
    setActiveOrganization,
    plan
}: OrganizationSwitcherProps) => {
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
            <DropdownMenuTrigger className="border border-zinc-200 rounded-lg p-[10px] flex items-center hover:bg-zinc-200 w-full">
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
                        <div className="flex items-center truncate w-full sm:max-w-[150px] max-w-[200px] pr-2">
                            <p className="ml-3 text-sm truncate">{activeOrg.name}</p>
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
                            <div className="ml-3 truncate w-[230px]">
                                <p>{activeOrg.name}</p>
                            </div>
                        </div>
                        <Dialog>
                            <div className="border-b py-3 px-8 text-[14px] hover:bg-slate-100 w-full">
                                <DialogTrigger className="flex items-center">
                                    <Settings className="h-4 w-4 mr-2" />
                                    <p className="ml-5">Manage organization</p>
                                </DialogTrigger>
                            </div>
                            <DialogContent className="min-h-[500px] w-full max-w-[90%] lg:max-w-[65%] xl:max-w-[50%]">
                                <OrganizationSettings
                                    plan={plan}
                                    setActiveOrganization={setActiveOrganization}
                                    activeOrganization={activeOrganization}
                                />
                            </DialogContent>
                        </Dialog>
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
                                    <p className="ml-5 text-sm truncate">
                                        {org.name}
                                    </p>
                                    <ArrowLeftRight className="h-4 w-4 ml-auto text-zinc-400" />
                                </DropdownMenuItem>
                            );
                        })}
                    </div>
                )}
                <div className="py-3 px-8 text-[14px] hover:bg-slate-100 border-t">
                    <Dialog>
                        <DialogTrigger className="flex items-center">
                            <PlusIcon className="h-4 w-4 mr-2" />
                            <p className="ml-5">Create organization</p>
                        </DialogTrigger>
                        <CreateOrganization
                            activeOrganization={activeOrganization}
                            setActiveOrganization={setActiveOrganization}
                        />
                    </Dialog>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};