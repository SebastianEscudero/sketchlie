"use client";

import { OrgImage } from "@/components/auth/org-image";
import { Hint } from "@/components/hint";
import { useCurrentUser } from "@/hooks/use-current-user";
import { cn } from "@/lib/utils";
import { getPlanColor } from "@/lib/orgUtils";
import { useOrganization } from "@/app/contexts/organization-context";
import { Plus } from "lucide-react";
import { CreateOrganization } from "@/components/auth/create-organization";
import { useState } from "react";

export const OrganizationList = () => {
    const [isCreateBoardDialogOpen, setIsCreateBoardDialogOpen] = useState(false);
    const { currentOrganization, setCurrentOrganizationId } = useOrganization();
    const user = useCurrentUser();

    return (
        <div className="hidden lg:flex flex-row space-x-3 p-3 flex-1 overflow-hidden">
             <Hint label="Create Organization" side="bottom" align="center" sideOffset={18}>
                <button className="bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-500 border-2 border-zinc-500 dark:border-zinc-500 lg:h-[36px] lg:w-[36px] h-[45px] w-[45px] rounded-md flex items-center justify-center transition"
                    onClick={() => setIsCreateBoardDialogOpen(true)}
                >
                    <Plus className="text-black dark:text-white sm:h-5 sm:w-5 h-8 w-8" />
                </button>
            </Hint>
            {isCreateBoardDialogOpen && (
                <CreateOrganization
                    isOpen={isCreateBoardDialogOpen}
                    setIsOpen={setIsCreateBoardDialogOpen}
                />
            )}
            <div className="space-y-4 lg:space-y-0 lg:space-x-3 flex flex-row items-center justify-center">
                {user?.organizations.map((org) => (
                    <div
                        key={org.id}
                        className={cn(
                            "rounded-md cursor-pointer opacity-80 hover:opacity-100 transition aspect-square relative",
                            currentOrganization?.id === org.id && "opacity-100 ring-2 ring-blue-500"
                        )}
                        onClick={() => setCurrentOrganizationId(org.id)}
                    >
                        <Hint label={org.name} side="bottom" align="center" sideOffset={18}>
                            <div className='lg:w-[35px] lg:h-[35px] h-full w-full'>
                                <OrgImage
                                    width="100%"
                                    height="100%"
                                    letter={org.name.charAt(0).toUpperCase()}
                                    color={getPlanColor(org.subscriptionPlan).color}
                                    letterColor={getPlanColor(org.subscriptionPlan).letterColor}
                                />
                            </div>
                        </Hint>
                    </div>
                ))}
            </div>
        </div>
    );
};