"use client";

import Link from "next/link";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { OrganizationSwitcher } from "@/components/auth/org-switcher";
import { LayoutDashboard, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { useCurrentUser } from "@/hooks/use-current-user";
import { SubscriptionPlanDropdown } from "./subscription-plan-dropdown";

const font = Poppins({
    subsets: ["latin"],
    weight: ["600"],
});

interface OrgSidebarProps {
    activeOrganization: string | null;
    setActiveOrganization: (id: string) => void;
}

export const OrgSidebar = ({
    activeOrganization,
    setActiveOrganization,
}: OrgSidebarProps) => {

    const searchParams = useSearchParams();
    const favorites = searchParams.get("favorites");
    const user = useCurrentUser();
    const activeOrg = user?.organizations.find(org => org.id === activeOrganization);
    const subscriptionPlan = activeOrg ? activeOrg.subscriptionPlan : null;

    return (
        <div className="hidden lg:flex flex-col space-y-2 w-[206px] pl-5 pt-5 select-none">
            <Link href="/">
                <div className="flex items-center gap-x-2">
                    <Image
                        src="/logo.svg"
                        alt="Logo"
                        height={60}
                        width={60}
                    />
                    <span className={cn(
                        "font-semibold text-2xl",
                        font.className,
                    )}>
                        Sketchlie
                    </span>
                </div>
            </Link>
            {activeOrg && (
                <SubscriptionPlanDropdown 
                    activeOrg={activeOrg}
                    subscriptionPlan={subscriptionPlan}
                />
            )}
            <OrganizationSwitcher
                plan={subscriptionPlan}
                setActiveOrganization={setActiveOrganization}
                activeOrganization={activeOrganization}
            />
            <div className="space-y-1 w-full">
                <Button
                    variant={favorites ? "ghost" : "secondary"}
                    asChild
                    size="lg"
                    className="justify-start px-2 w-full"
                >
                    <Link href="/dashboard/">
                        <LayoutDashboard className="h-4 w-4 mr-2" />
                        Team boards
                    </Link>
                </Button>
                <Button
                    variant={favorites ? "secondary" : "ghost"}
                    asChild
                    size="lg"
                    className="justify-start px-2 w-full"
                >
                    <Link href={{
                        pathname: "/dashboard/",
                        query: { favorites: true }
                    }}>
                        <Star className="h-4 w-4 mr-2" />
                        Favorite boards
                    </Link>
                </Button>
            </div>
        </div>
    );
};