"use client";

import { OrganizationSwitcher } from "@/components/auth/org-switcher";
import { UserButton } from "@/components/auth/user-button";
import { MobileSidebar } from "./mobile-sidebar/mobile-sidebar";
import { Button } from "@/components/ui/button";
import { UserPlus, Zap } from "lucide-react";
import { useProModal } from "@/hooks/use-pro-modal";
import { useCurrentUser } from "@/hooks/use-current-user";
import { NotificationsMenu } from "./notifications-menu";
import { OrganizationInvite } from "@/components/auth/organization-invite";
import { useOrganization } from "@/app/contexts/organization-context";
import { OrganizationList } from "./org-list";

export const Navbar = () => {
    const { currentOrganization, isLoading } = useOrganization();
    const user = useCurrentUser();
    const proModal = useProModal();
    const usersRole = currentOrganization?.users.find((u: any) => u.id === user?.id)?.role;

    if (isLoading || !currentOrganization) return <NavbarSkeleton />;

    return (
        <div className="flex flex-wrap items-center gap-x-2 gap-y-2 px-3 py-3 justify-between bg-zinc-100 dark:bg-[#2C2C2C]">
            <OrganizationList />
            <div className="flex lg:hidden items-center gap-x-4 flex-grow">
                <MobileSidebar />
                <OrganizationSwitcher />
            </div>
            <div className="flex items-center gap-x-2 justify-between md:w-auto w-full">
                <div className="flex items-center space-x-2">
                    {usersRole === "Admin" && (
                        <OrganizationInvite>
                            <Button variant="sketchlieBlue">
                                <UserPlus className="h-4 w-4 mr-2" />
                                Invite Members
                            </Button>
                        </OrganizationInvite>
                    )}
                    {currentOrganization.subscriptionPlan === "Gratis" && (
                        <Button variant="premium" onClick={proModal.onOpen} className="font-bold">
                            Upgrade
                            <Zap className="w-4 h-4 ml-2 fill-blue-500" />
                        </Button>
                    )}
                    {currentOrganization.subscriptionPlan === "Starter" && (
                        <Button variant="business" onClick={proModal.onOpen} className="font-bold">
                            Business
                            <Zap className="w-4 h-4 ml-2 fill-white" />
                        </Button>
                    )}
                </div>
                <div className="xs:mx-2 flex flex-row xs:space-x-4 items-center justify-center">
                    <NotificationsMenu />
                    <UserButton />
                </div>
            </div>
        </div>
    )
}

export const NavbarSkeleton = () => {
    return (
        <div className="flex flex-wrap items-center gap-x-2 gap-y-2 px-3 py-3 justify-between bg-zinc-100 dark:bg-[#2C2C2C]">
            <div className="hidden lg:flex flex-row space-x-3 p-3 flex-1 overflow-hidden">
                {/* NewOrgButton and List skeleton */}
                <div className="h-10 w-32 bg-zinc-200 dark:bg-zinc-700 rounded-md animate-pulse" />
                <div className="h-10 w-48 bg-zinc-200 dark:bg-zinc-700 rounded-md animate-pulse" />
            </div>
            <div className="flex lg:hidden items-center gap-x-4 flex-grow">
                {/* Mobile controls skeleton */}
                <div className="h-10 w-10 bg-zinc-200 dark:bg-zinc-700 rounded-md animate-pulse" />
                <div className="h-10 w-32 bg-zinc-200 dark:bg-zinc-700 rounded-md animate-pulse" />
            </div>
            <div className="flex items-center gap-x-2">
                {/* Right side buttons skeleton */}
                <div className="flex items-center space-x-2">
                    <div className="h-10 w-32 bg-zinc-200 dark:bg-zinc-700 rounded-md animate-pulse" />
                    <div className="h-10 w-24 bg-zinc-200 dark:bg-zinc-700 rounded-md animate-pulse" />
                </div>
                <div className="xs:mx-2 flex flex-row xs:space-x-4 items-center">
                    <div className="h-8 w-8 bg-zinc-200 dark:bg-zinc-700 rounded-full animate-pulse" />
                    <div className="h-8 w-8 bg-zinc-200 dark:bg-zinc-700 rounded-full animate-pulse" />
                </div>
            </div>
        </div>
    );
};