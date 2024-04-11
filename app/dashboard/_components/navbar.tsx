"use client";

import { OrganizationSwitcher } from "@/components/auth/org-switcher";
import { UserButton } from "@/components/auth/user-button";
import { InviteButton } from "./org-invite-button";
import { SearchInput } from "./search-input";
import { MobileSidebar } from "./mobile-sidebar/mobile-sidebar";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import { useProModal } from "@/hooks/use-pro-modal";
import { checkSubscription } from "@/lib/subscription";

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
    
    let IsbusinessPlan = false;

    if (activeOrg) {
        IsbusinessPlan = activeOrg.subscriptionPlan === "Business";
    }

    const proModal = useProModal();
    const onClick = () => {
        proModal.onOpen();
    }

    return (
        <div className="flex flex-wrap items-center gap-x-2 gap-y-2 p-3 justify-between">
            <div className="hidden lg:flex lg:flex-1">
                <SearchInput />
            </div>
            <div className="flex lg:hidden items-center gap-x-4 flex-grow">
                <MobileSidebar 
                    activeOrganization={activeOrganization}
                    setActiveOrganization={setActiveOrganization}
                />
                <OrganizationSwitcher 
                    setActiveOrganization={setActiveOrganization}
                    activeOrganization={activeOrganization}
                />
            </div>
            <div className="flex items-center gap-x-2">
                {activeOrg && (
                    <InviteButton 
                        activeOrganization={activeOrganization}
                    />
                )}
                <Button variant="premium" onClick={onClick}>
                    {IsbusinessPlan ? "Pausar Subscripcion" : "Upgrade"}
                    {!IsbusinessPlan && <Zap className="w-4 h-4 ml-2 fill-white"/>}
                </Button>
                <UserButton />
            </div>
        </div>
    )
}