"use client";

import { OrganizationSwitcher } from "@/components/auth/org-switcher";
import { UserButton } from "@/components/auth/user-button";
import { InviteButton } from "./org-invite-button";
import { SearchInput } from "./search-input";
import { MobileSidebar } from "./mobile-sidebar/mobile-sidebar";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import { useProModal } from "@/hooks/use-pro-modal";
import { useCurrentUser } from "@/hooks/use-current-user";
import { NotificationsMenu } from "./notifications-menu";
import { NewOrgButton } from "@/components/auth/org-button";
import { List } from "./sidebar/list";

interface NavbarProps {
    activeOrganization: string | null;
    setActiveOrganization: (id: string) => void;
    activeOrg: any
}

export const Navbar = ({
    activeOrganization,
    setActiveOrganization,
    activeOrg
}: NavbarProps) => {
    const user = useCurrentUser();
    const usersRole = activeOrg?.users.find((u: any) => u.id === user?.id)?.role;
    const proModal = useProModal();
    const onClick = () => {
        proModal.onOpen(activeOrganization);
    }

    let plan = null;
    if (activeOrg) {
        plan = activeOrg.subscriptionPlan
    }

    return (
        <div className="flex flex-wrap items-center gap-x-2 gap-y-2 px-3 lg:py-0 py-3 justify-between lg:bg-gray-800 shadow-custom-1">
            <div className="hidden lg:flex flex-row space-x-4 p-3 flex-1 overflow-hidden">
                <NewOrgButton 
                    activeOrganization={activeOrganization}
                    setActiveOrganization={setActiveOrganization}
                />
                <List 
                    activeOrganization={activeOrganization}
                    setActiveOrganization={setActiveOrganization}
                />
            </div>
            <div className="flex lg:hidden items-center gap-x-4 flex-grow">
                <MobileSidebar
                    activeOrganization={activeOrganization}
                    setActiveOrganization={setActiveOrganization}
                />
                <OrganizationSwitcher
                    plan={plan}
                    setActiveOrganization={setActiveOrganization}
                    activeOrganization={activeOrganization}
                />
            </div>
            <div className="flex items-center gap-x-2 justify-between md:w-auto w-full">
                {activeOrg && (
                    <div className="flex items-center space-x-2">
                        {usersRole === "Admin" && (
                            <InviteButton
                                activeOrganization={activeOrganization}
                            />
                        )}
                        {activeOrg.subscriptionPlan === "Gratis" && (
                            <Button variant="premium" onClick={onClick}>
                                Upgrade
                                <Zap className="w-4 h-4 ml-2 fill-white" />
                            </Button>
                        )}
                        {activeOrg.subscriptionPlan === "Starter" && (
                            <Button variant="business" onClick={onClick}>
                                Business
                                <Zap className="w-4 h-4 ml-2 fill-white" />
                            </Button>
                        )}
                    </div>
                )}
                <div className="xs:mx-2 flex flex-row xs:space-x-4 items-center justify-center">
                    <NotificationsMenu 
                        setActiveOrganization={setActiveOrganization}
                    />
                    <UserButton />
                </div>
            </div>
        </div>
    )
}