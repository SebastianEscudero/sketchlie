"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserPlus, User } from "lucide-react";
import { useCurrentUser } from "@/hooks/use-current-user";
import { getPlanColor } from "@/lib/orgUtils";
import { OrgImage } from "./org-image";
import { MembersTab } from "../org-settings/members-tab";
import { SettingsTab } from "../org-settings/settings-tab";
import { OrganizationInvite } from "./organization-invite";

interface OrganizationSettingsProps {
    activeOrganization: string | null;
    setActiveOrganization: (id: any) => void;
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
}

export const OrganizationSettings = ({
    activeOrganization,
    setActiveOrganization,
    isOpen,
    setIsOpen,
}: OrganizationSettingsProps) => {
    const user = useCurrentUser();
    const activeOrg = user?.organizations.find(org => org.id === activeOrganization);
    const usersRole = activeOrg?.users.find((u: any) => u.id === user?.id)?.role;
    const Initial = activeOrg?.name.charAt(0).toUpperCase();
    const { color, letterColor } = getPlanColor(activeOrg?.subscriptionPlan);

    if (!user || !activeOrg) return null;

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="max-h-[90%] w-full max-w-[90%] lg:max-w-[60%] xl:max-w-[50%]">
                <Tabs defaultValue="members" className="w-full">
                    <DialogHeader>
                        <div className="flex mb-3 items-center pb-0">
                            <OrgImage
                                width="42px"
                                height="42px"
                                letter={Initial || ""}
                                color={color}
                                letterColor={letterColor}
                            />
                            <div className="ml-2 truncate w-[230px] font-medium">
                                <p className="ml-2 text-base truncate">{activeOrg.name}</p>
                                <p className="ml-2 text-sm truncate flex flex-row items-center">
                                    {activeOrg.subscriptionPlan} - <User className="h-[11px] w-[11px] mx-1" />{activeOrg.users.length}
                                </p>
                            </div>
                        </div>
                        <DialogTitle>
                            Organization settings
                        </DialogTitle>
                        <DialogDescription>
                            Manage your organization&apos;s settings and members.
                        </DialogDescription>
                    </DialogHeader>
                    <TabsList className="grid grid-cols-2 mt-2 w-full">
                        <TabsTrigger value="members">Members</TabsTrigger>
                        <TabsTrigger value="settings">Settings</TabsTrigger>
                    </TabsList>
                    <TabsContent value="members">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">Organization Members</h3>
                            {usersRole === 'Admin' && (
                                <OrganizationInvite
                                    activeOrganization={activeOrganization}
                                >
                                    <Button size="sm" variant="sketchlieBlue" className="sm:flex hidden">
                                        <UserPlus className="mr-2 h-4 w-4" />
                                        Invite Member
                                    </Button>
                                </OrganizationInvite>
                            )}
                        </div>
                        <MembersTab
                            activeOrg={activeOrg}
                            user={user}
                            usersRole={usersRole}
                            setActiveOrganization={setActiveOrganization}
                        />
                    </TabsContent>
                    <TabsContent value="settings">
                        <SettingsTab
                            activeOrg={activeOrg}
                            user={user}
                            usersRole={usersRole}
                            setActiveOrganization={setActiveOrganization}
                        />
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
};