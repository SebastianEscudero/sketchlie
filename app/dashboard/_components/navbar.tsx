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
        <div className="flex flex-wrap items-center gap-x-2 gap-y-2 p-3 justify-between">
            <div className="hidden lg:flex lg:flex-1 pl-3">
                <SearchInput />
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
            <div className="flex items-center gap-x-2">
                {activeOrg && (
                    <>
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
                    </>
                )}
                <div className="mx-2 sm:flex hidden items-center justify-center">
                    <NotificationsMenu 
                        setActiveOrganization={setActiveOrganization}
                    />
                </div>
                <UserButton />
            </div>
        </div>
    )
}