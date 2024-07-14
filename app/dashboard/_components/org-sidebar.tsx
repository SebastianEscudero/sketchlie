"use client";

import Link from "next/link";
import { OrganizationSwitcher } from "@/components/auth/org-switcher";
import { LayoutDashboard, LayoutTemplate, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { useCurrentUser } from "@/hooks/use-current-user";
import { SubscriptionPlanDropdown } from "./subscription-plan-dropdown";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { ShowAllTemplates } from "./show-all-templates";
import { DialogContent } from "@/components/ui/dialog";
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

interface OrgSidebarProps {
    activeOrganization: string | null;
    setActiveOrganization: (id: string) => void;
}

export const OrgSidebar = ({
    activeOrganization,
    setActiveOrganization,
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
        <div className="hidden lg:flex flex-col dark:bg-[#2C2C2C] space-y-2 shadow-custom-2 justify-between w-[240px] px-5 pt-5 select-none">
            <div className="flex flex-col space-y-4">
                <SketchlieButton 
                    activeOrg={activeOrg}
                />
                <OrganizationSwitcher
                    setActiveOrganization={setActiveOrganization}
                    activeOrganization={activeOrganization}
                />
                <SearchInput />
                <div className="space-y-1 w-full">
                    <Button
                        variant={favorites ? "dashboard" : "dashboardActive"}
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
                        variant={favorites ? "dashboardActive" : "dashboard"}
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
                    <Dialog>
                        <div className="rounded-lg flex flex-col justify-between flex-1">
                            <DialogTrigger asChild className="flex justify-center">
                                <Button
                                    variant="dashboard"
                                    className="justify-start px-2 w-full"
                                    size="lg"
                                >
                                    <LayoutTemplate className="h-4 w-4 mr-2" />
                                    Templates
                                </Button>
                            </DialogTrigger>
                        </div>
                        <DialogContent className="w-full max-w-[80%] max-h-[85%] xl:max-w-[50%] overflow-y-auto">
                            <ShowAllTemplates
                                usersRole={usersRole}
                                pending={pending}
                                onClick={onClick}
                            />
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
            <div className="mt-auto pb-5">
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