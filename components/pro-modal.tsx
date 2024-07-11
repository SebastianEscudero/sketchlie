"use client";

import { Card } from "@/components/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useProModal } from "@/hooks/use-pro-modal";
import { Check, ChevronsDown } from "lucide-react";
import { Badge } from "./ui/badge";
import { SubscriptionButton } from "./subscription-button";
import { useEffect, useState } from "react";
import { useCurrentUser } from "@/hooks/use-current-user";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { subscriptionPlans } from "@/lib/subscriptionPlans";

const paidPlans = subscriptionPlans.filter(plan => plan.label !== "Gratis");

export const ProModal = () => {
    const proModal = useProModal();
    const liveOrg = proModal.activeOrganization;
    const [selectedOrganization, setSelectedOrganization] = useState<any>(liveOrg || localStorage.getItem("activeOrganization") || "");
    const user = useCurrentUser();
    const activeOrg = user?.organizations.find(org => org.id === selectedOrganization);
    const organizations = user?.organizations;

    useEffect(() => {
        setSelectedOrganization(liveOrg);
    }, [liveOrg]);

    if (!organizations) {
        return null;
    }

    return (
        <div onWheel={(e) => e.stopPropagation()}>
            <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
                <DialogContent className="max-w-[90%] lg:max-w-[65%] xl:max-w-[55%] 2xl:max-w-[50%] w-full overflow-y-auto max-h-[90%] pt-10">
                    <DialogHeader>
                        <div className="flex justify-center text-xl md:text-2xl items-center flex-wrap text-center">
                            <DialogTitle className="text-xl md:text-2xl flex flex-row items-center font-normal">Choose organization to upgrade:</DialogTitle>
                            <DropdownMenu>
                                <DropdownMenuTrigger className="text-xl md:text-2xl flex flex-row items-center ml-3 text-blue-600">
                                    {activeOrg ? activeOrg.name : "Select organization"}
                                    <ChevronsDown className="ml-2" />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <div className="flex flex-col gap-y-2">
                                        {organizations.map((organization) => (
                                            <DropdownMenuItem
                                                className="w-[200px] truncate text-blue-600 hover:bg-accent hover:cursor-pointer"
                                                key={organization.id}
                                                onClick={() => {
                                                    setSelectedOrganization(organization.id)
                                                }}
                                            >
                                                <div className="flex flex-col ml-2">
                                                    <p className="text-sm truncate">
                                                        {organization.name}
                                                    </p>
                                                    <p className="truncate text-[10px] md:text-[12px] text-zinc-400">{organization.subscriptionPlan} - {organization.users.length} members </p>
                                                </div>
                                            </DropdownMenuItem>
                                        ))}
                                    </div>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </DialogHeader>
                    <div className="gap-4 text-zinc-900 font-medium flex flex-col md:flex-row max-h-[700px] pt-4 text-sm md:text-base ">
                        {paidPlans.map((subscriptionPlan) => (
                            <Card
                                key={subscriptionPlan.label}
                                className={`p-5 md:flex flex-col flex-1 ${subscriptionPlan.recommended && 'border-2 border-blue-600'}`}
                            >
                                <div className="h-[100px]">
                                    <div className="gap-x-4 font-semibold text-lg md:text-xl mb-2 flex">
                                        {subscriptionPlan.recommended ?
                                            <>
                                                {subscriptionPlan.label}
                                                <Badge variant="sketchlieBlue" className="uppercase text-xs md:text-sm py-1">
                                                    Popular
                                                </Badge>
                                            </>
                                            : subscriptionPlan.label}
                                    </div>
                                    <div className="text-xs md:text-sm mb-auto">
                                        {subscriptionPlan.description}
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <p className="font-bold text-3xl">${subscriptionPlan.price}/m</p>
                                    <p className="text-sm md:text-base">por miembro</p>
                                </div>
                                <div className="flex flex-col gap-y-2 mt-8 flex-1 mb-4 text-sm md:text-base">
                                    <p>{subscriptionPlan.characteristicsDescription}</p>
                                    {Object.entries(subscriptionPlan.features).map(([feature, value]) => (
                                        <div key={feature} className="flex items-center gap-x-2">
                                            <Check className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                            <span className="text-black-5">{feature}:</span>
                                            <span className="text-black-5 font-bold">{value}</span>
                                        </div>
                                    ))}
                                </div>
                                <SubscriptionButton
                                    plan={subscriptionPlan}
                                    selectedOrganization={selectedOrganization}
                                />
                            </Card>
                        ))}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}