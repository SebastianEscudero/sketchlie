"use client";

import Link from "next/link";
import { OrganizationSwitcher } from "@/components/auth/org-switcher";
import { Folder, LayoutDashboard, LayoutTemplate, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { useCurrentUser } from "@/hooks/use-current-user";
import { SubscriptionPlanDropdown } from "./subscription-plan-dropdown";
import { ShowAllTemplates } from "./show-all-templates";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { getMaxBoards } from "@/lib/planLimits";
import { useProModal } from "@/hooks/use-pro-modal";
import { updateR2Bucket } from "@/lib/r2-bucket-functions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { SearchInput } from "./search-input";
import { SketchlieButton } from "./sketchlie-button";
import { NewFolderButton } from "./new-folder-button";

interface OrgSidebarProps {
    activeOrganization: string | null;
    setActiveOrganization: (id: string) => void;
    mobile: boolean;
}

export const OrgSidebar = ({
    activeOrganization,
    setActiveOrganization,
    mobile
}: OrgSidebarProps) => {

    const searchParams = useSearchParams();
    const proModal = useProModal();
    const router = useRouter();
    const favorites = searchParams.get("favorites");
    const user = useCurrentUser();
    const activeOrg = user?.organizations.find(org => org.id === activeOrganization);
    const usersRole = activeOrg.users.find((u: any) => u.id === user?.id)?.role;
    const maxAmountOfBoards = getMaxBoards(activeOrg);
    const subscriptionPlan = activeOrg ? activeOrg.subscriptionPlan : null;
    const { mutate, pending } = useApiMutation(api.board.create);
    const data = useQuery(api.boards.get, {
        orgId: activeOrg.id,
    });

    if (!user) {
        return null;
    }

    const onClick = async (templateName: string, templateLayerIds: any, templateLayers: any) => {
        if (maxAmountOfBoards !== null && (data?.length ?? 0) < maxAmountOfBoards) {
            try {
                const id = await mutate({
                    orgId: activeOrg.id,
                    title: templateName,
                    userId: user.id,
                    userName: user.name,
                });
                await updateR2Bucket('/api/r2-bucket/createBoard', id, templateLayerIds, templateLayers);
                toast.success("Board created");
                await router.push(`/board/${id}`);
            } catch (error) {
                toast.error("Failed to create board");
            }
        } else {
            proModal.onOpen(activeOrg.id);
        }
    }

    return (
        <div className={`${mobile ? '' : 'hidden lg:'}flex flex-col h-full dark:bg-[#2C2C2C] text-black dark:text-white bg-zinc-100 space-y-2 justify-between w-[240px] pt-5 select-none`}>
            <div className="flex flex-col space-y-4 px-5">
                <SketchlieButton
                    activeOrg={activeOrg}
                />
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

                    <ShowAllTemplates
                        usersRole={usersRole}
                        pending={pending}
                        onClick={onClick}
                    >
                        <div className="w-full">
                            <Button
                                variant="dashboard"
                                className="justify-start px-4 w-full font-semibold"
                                size="sm"
                            >
                                <LayoutTemplate className="h-4 w-4 mr-2" />
                                Templates
                            </Button>
                        </div>
                    </ShowAllTemplates>
                    <NewFolderButton org={activeOrg}>
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
                    <OrganizationSwitcher
                        setActiveOrganization={setActiveOrganization}
                        activeOrganization={activeOrganization}
                    />
                </div>
                {activeOrg && (
                    <SubscriptionPlanDropdown
                        activeOrg={activeOrg}
                        subscriptionPlan={subscriptionPlan}
                    />
                )}
            </div>
        </div>
    );
};