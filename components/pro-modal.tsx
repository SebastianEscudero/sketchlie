"use client";

import { Card } from "@/components/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useProModal } from "@/hooks/use-pro-modal";
import { Check, ChevronsDown, Zap, Infinity } from "lucide-react";
import { Badge } from "./ui/badge";
import { SubscriptionButton } from "./subscription-button";
import { useEffect, useState } from "react";
import { useCurrentUser } from "@/hooks/use-current-user";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { subscriptionPlans } from "@/lib/subscriptionPlans";
import { ScrollArea } from "./ui/scroll-area";

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
                <DialogContent className="max-w-[90%] lg:max-w-[80%] xl:max-w-[70%] 2xl:max-w-[60%] w-full overflow-y-auto max-h-[90%] pt-10">
                    <DialogHeader>
                        <DialogTitle className="text-3xl font-bold text-center">Choose Your Plan</DialogTitle>
                        <p className="text-xl text-gray-600 dark:text-gray-400 text-center mb-8">Everything you need to collaborate with your team</p>
                        <div className="flex justify-center items-center flex-wrap text-center mb-8">
                            <span className="text-xl mr-3">Organization:</span>
                            <DropdownMenu>
                                <DropdownMenuTrigger className="text-xl flex flex-row items-center text-blue-600 dark:text-blue-400">
                                    {activeOrg ? activeOrg.name : "Select organization"}
                                    <ChevronsDown className="ml-2" />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <div className="flex flex-col gap-y-2">
                                        {organizations.map((organization) => (
                                            <DropdownMenuItem
                                                className="w-[200px] truncate text-blue-600 dark:text-blue-500 hover:bg-accent hover:cursor-pointer"
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
                    <ScrollArea className="pr-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {paidPlans.map((subscriptionPlan) => (
                                <Card
                                    key={subscriptionPlan.label}
                                    className={`p-6 flex flex-col h-full bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 hover:shadow-xl ${
                                        subscriptionPlan.recommended 
                                            ? 'border-2 border-blue-500 dark:border-blue-400 scale-100' 
                                            : subscriptionPlan.label === "Enterprise"
                                            ? 'border-2 border-purple-500 dark:border-purple-400 scale-95'
                                            : 'border border-gray-200 dark:border-gray-700 scale-95'
                                    }`}
                                >
                                    <div className="flex flex-col h-full">
                                        <div className="mb-4">
                                            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">{subscriptionPlan.label}</h2>
                                            {subscriptionPlan.recommended && (
                                                <Badge variant="sketchlieBlue" className="mt-2">
                                                    Popular
                                                </Badge>
                                            )}
                                            {subscriptionPlan.label === "Enterprise" && (
                                                <Badge variant="secondary" className="mt-2 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                                                    Most Powerful
                                                </Badge>
                                            )}
                                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{subscriptionPlan.description}</p>
                                        </div>
                                        <div className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                                            ${subscriptionPlan.price}<span className="text-lg font-normal text-gray-600 dark:text-gray-400">/month</span>
                                        </div>
                                        <div className="flex-grow">
                                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">{subscriptionPlan.characteristicsDescription}</p>
                                            {subscriptionPlan.label === "Enterprise" ? (
                                                <>
                                                    <div className="flex items-center gap-x-3 text-sm mb-2">
                                                        <Infinity className="w-5 h-5 text-purple-500 dark:text-purple-400 flex-shrink-0" />
                                                        <span className="font-semibold text-gray-800 dark:text-gray-200">Todo lo que necesites</span>
                                                    </div>
                                                    <div className="flex items-center gap-x-3 text-sm mb-2">
                                                        <Check className="w-5 h-5 text-purple-500 dark:text-purple-400 flex-shrink-0" />
                                                        <span className="font-semibold text-gray-800 dark:text-gray-200">Todas las herramientas de IA</span>
                                                    </div>
                                                    <div className="flex items-center gap-x-3 text-sm mb-2">
                                                        <Check className="w-5 h-5 text-purple-500 dark:text-purple-400 flex-shrink-0" />
                                                        <span className="font-semibold text-gray-800 dark:text-gray-200">Soporte de clase mundial</span>
                                                    </div>
                                                    <div className="flex items-center gap-x-3 text-sm mb-2">
                                                        <Check className="w-5 h-5 text-purple-500 dark:text-purple-400 flex-shrink-0" />
                                                        <span className="font-semibold text-gray-800 dark:text-gray-200">Protección de datos</span>
                                                    </div>
                                                </>
                                            ) : (
                                                subscriptionPlan.features && Object.entries(subscriptionPlan.features).map(([feature, value]) => (
                                                    <div key={feature} className="flex items-center gap-x-3 text-sm mb-2">
                                                        <Check className="w-5 h-5 text-green-500 dark:text-green-400 flex-shrink-0" />
                                                        <span className="text-gray-600 dark:text-gray-400">{feature}:</span>
                                                        <span className="font-semibold text-gray-800 dark:text-gray-200">{value}</span>
                                                    </div>
                                                ))
                                            )}
                                            {subscriptionPlan.extraFeatures && (
                                                <div className="flex items-center gap-x-3 text-sm mb-2">
                                                    <Check className="w-5 h-5 text-green-500 dark:text-green-400 flex-shrink-0" />
                                                    <span className="font-semibold text-gray-800 dark:text-gray-200">{subscriptionPlan.extraFeatures}</span>
                                                </div>
                                            )}
                                        </div>
                                        <SubscriptionButton
                                            plan={subscriptionPlan}
                                            selectedOrganization={selectedOrganization}
                                            className={`w-full mt-6 text-lg ${
                                                subscriptionPlan.label === "Enterprise"
                                                    ? "bg-purple-600 text-white hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600"
                                                    : subscriptionPlan.label === "Starter"
                                                    ? "bg-white text-black hover:bg-zinc-200 border border-zinc-500"
                                                    : subscriptionPlan.recommended
                                                    ? "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600"
                                                    : "border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900"
                                            }`}
                                        >
                                            {subscriptionPlan.label === "Enterprise" 
                                                ? "Contáctanos" 
                                                : subscriptionPlan.label === "Starter"
                                                ? "Buy Starter"
                                                : "Upgrade"}
                                            {subscriptionPlan.recommended && <Zap className="w-4 h-4 ml-2 fill-current" />}
                                        </SubscriptionButton>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </ScrollArea>
                </DialogContent>
            </Dialog>
        </div>
    )
}