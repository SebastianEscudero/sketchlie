"use client";

import { OrganizationSwitcher } from "@/components/auth/org-switcher";
import { UserButton } from "@/components/auth/user-button";
import { InviteButton } from "./org-invite-button";
import { SearchInput } from "./search-input";

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

    return (
        <div className="flex items-center gap-x-4 p-5">
            <div className="hidden lg:flex lg:flex-1">
                <SearchInput />
            </div>
            <div className="block lg:hidden flex-1">
                <OrganizationSwitcher 
                    setActiveOrganization={setActiveOrganization}
                    activeOrganization={activeOrganization}
                />
            </div>
            {activeOrg && (
                <InviteButton 
                    activeOrganization={activeOrganization}
                />
            )}
            <UserButton />
        </div>
    )
}