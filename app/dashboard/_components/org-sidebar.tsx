"use client";

import Link from "next/link";
import { Folder, LayoutDashboard, Rocket, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { SearchInput } from "./search-input";
import { SketchlieButton } from "./sketchlie-button";
import { NewFolderButton } from "./new-folder-button";
import { useOrganization } from "@/app/contexts/organization-context";
import { cn } from "@/lib/utils";
import { OrganizationSwitcher } from "@/components/auth/org-switcher";
import { useProModal } from "@/hooks/use-pro-modal";

interface OrgSidebarProps {
    mobile: boolean;
}

export const OrgSidebar = ({ mobile }: OrgSidebarProps) => {
    const proModal = useProModal();
    const searchParams = useSearchParams();
    const favorites = searchParams.get("favorites");
    const { currentOrganization, isLoading } = useOrganization();

    if (isLoading || !currentOrganization) return <OrgSidebarSkeleton mobile={mobile} />;

    return (
        <div className={cn(
            "flex flex-col h-full dark:bg-[#2C2C2C] text-black dark:text-white bg-zinc-100 space-y-2 justify-between w-[240px] pt-5 select-none",
            mobile ? "" : "hidden lg:flex"
        )}>
            <div className="flex flex-col space-y-4 px-5">
                <SketchlieButton />
                <SearchInput />
                <div className="w-full space-y-1">
                    <Button
                        variant={favorites ? "dashboard" : "dashboardActive"}
                        asChild
                        size="sm"
                        className="justify-start px-4 w-full font-semibold"
                    >
                        <Link href="/dashboard/">
                            <LayoutDashboard className="h-4 w-4 mr-2" />
                            Team boards
                        </Link>
                    </Button>
                    <Button
                        variant={favorites ? "dashboardActive" : "dashboard"}
                        asChild
                        size="sm"
                        className="justify-start px-4 w-full font-semibold"
                    >
                        <Link href={{
                            pathname: "/dashboard/",
                            query: { favorites: true }
                        }}>
                            <Star className="h-4 w-4 mr-2" />
                            Favorite boards
                        </Link>
                    </Button>
                    <NewFolderButton>
                        <Button
                            variant="dashboard"
                            asChild
                            size="sm"
                            className="justify-start px-4 w-full font-semibold hover:cursor-pointer"
                        >
                            <div className="flex flex-row">
                                <Folder className="h-4 w-4 mr-2" />
                                New Folder
                            </div>
                        </Button>
                    </NewFolderButton>
                </div>
                <div className="flex flex-col space-y-2 border-t dark:border-zinc-600 pt-2">
                    <p className="text-sm font-semibold">Organization</p>
                    <OrganizationSwitcher />
                </div>
                <Button
                    onClick={proModal.onOpen}
                    className="text-sm font-semibold rounded-md flex flex-row items-center justyf-center w-full bg-transparent dark:bg-transparent border dark:border-zinc-600 text-black dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-800"
                    size="sm"
                >
                <Rocket className="w-4 h-4 mr-2 fill-blue-600 stroke-blue-600" />
                    Upgrade organization
                </Button>
            </div>
        </div>
    );
};

OrgSidebar.displayName = "OrgSidebar";

export const OrgSidebarSkeleton = ({ mobile }: { mobile: boolean }) => {
    return (
        <div className={cn(
            "flex flex-col h-full dark:bg-[#2C2C2C] text-black dark:text-white bg-zinc-100 space-y-2 justify-between w-[240px] pt-5 select-none animate-pulse",
            mobile ? "" : "hidden lg:flex"
        )}>
            <div className="flex flex-col space-y-4 px-5">
                {/* Sketchlie Button Skeleton */}
                <div className="h-10 bg-zinc-200 dark:bg-zinc-700 rounded-md" />
                
                {/* Search Input Skeleton */}
                <div className="h-10 bg-zinc-200 dark:bg-zinc-700 rounded-md" />
                
                {/* Navigation Buttons Skeleton */}
                <div className  ="w-full space-y-1">
                    <div className="h-8 bg-zinc-200 dark:bg-zinc-700 rounded-md" />
                    <div className="h-8 bg-zinc-200 dark:bg-zinc-700 rounded-md" />
                    <div className="h-8 bg-zinc-200 dark:bg-zinc-700 rounded-md" />
                </div>

                {/* Organization Section Skeleton */}
                <div className="flex flex-col space-y-2 border-t dark:border-zinc-600 pt-2">
                    <div className="h-4 w-24 bg-zinc-200 dark:bg-zinc-700 rounded" />
                    <div className="h-10 bg-zinc-200 dark:bg-zinc-700 rounded-md" />
                </div>

                {/* Subscription Plan Skeleton */}
                <div className="h-10 bg-zinc-200 dark:bg-zinc-700 rounded-md" />
            </div>
        </div>
    );
};