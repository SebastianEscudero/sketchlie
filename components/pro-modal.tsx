"use client";

import { Card } from "@/components/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useProModal } from "@/hooks/use-pro-modal";
import { Check, ChevronsDown } from "lucide-react";
import { Badge } from "./ui/badge";
import { SubscriptionButton } from "./subscription-button";
import { useState } from "react";
import { useCurrentUser } from "@/hooks/use-current-user";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Button } from "./ui/button";

const subscriptionPlans = [
    {
        label: "Starter",
        description: "Desbloquea espacios de trabajo infinitos con todas las herramientas que necesitas.",
        price: 14990,
        features: {
            "Boards": "Ilimitados",
            'Imagenes': "Hasta 10MB",
            "Objetos máximos": "1000",
            "Herramientas": "Todas",
            "Soporte": "Básico",
            "Export a PDF": "Sí",
            "Equipos": "10",
        },
    },
    {
        label: "Business",
        description: "Escala tu equipo con herramientas de colaboración avanzadas y soporte prioritario.",
        price: 19990,
        features: {
            "Boards": "Ilimitados",
            'Imagenes': "Hasta 25MB",
            "Objetos máximos": "Ilimitados",
            "Herramientas": "Todas",
            "Soporte": "Básico",
            "Export a PDF": "Sí",
            "Equipos": "Ilimitados",
        },
        extraFeatures: "Proteccón de datos con inicio de sesión",
        recommended: true
    },
]

export const ProModal = () => {
    const proModal = useProModal();
    const [selectedOrganization, setSelectedOrganization] = useState<any>("");
    const user = useCurrentUser();
    const organizations = user?.organizations;

    if (!organizations) {
        return null;
    }

    return (
        <div>
            <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
                <DialogContent className="max-w-[1080px] w-full overflow-y-auto md:h-auto h-[650px]">
                    <DialogHeader>
                        <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
                            <Badge className="uppercase text-sm py-1" variant="inProgress">
                                Pronto estará disponible
                            </Badge>
                            <div className="flex items-center gap-x-2 font-bold py-1">
                                Sketchlie
                                <Badge className="uppercase text-sm py-1" variant="outline">
                                    Pro
                                </Badge>
                            </div>
                        </DialogTitle>
                        <div className="flex justify-center text-xl sm:text-2xl items-center flex-wrap">
                            <p>Choose organization to upgrade:</p>
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <Button
                                        variant="selectOrg"
                                        className="text-2xl ml-1"
                                    >
                                        {selectedOrganization.name || "Select organization"}
                                        <ChevronsDown className="ml-2"/>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <div className="flex flex-col gap-y-2">
                                        {organizations.map((organization) => (
                                            <DropdownMenuItem
                                                className="w-[180px] truncate"
                                                key={organization.id}
                                            >
                                                <Button
                                                    onClick={() => setSelectedOrganization(organization)}
                                                    variant="selectOrg"
                                                    className="p-0 w-full flex justify-start">
                                                    <div className="ml-2 text-left">
                                                        <p className="truncate text-[14px]">
                                                            {organization.name}
                                                        </p>
                                                        <p className="truncate text-[12px] text-zinc-400">{organization.subscriptionPlan} - {organization.users.length} members </p>
                                                    </div>
                                                </Button>
                                            </DropdownMenuItem>
                                        ))}
                                    </div>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        <DialogDescription className="gap-4 text-zinc-900 font-medium flex flex-col md:flex-row max-h-[700px] pt-4">
                            {subscriptionPlans.map((subscriptionPlan) => (
                                <Card
                                    key={subscriptionPlan.label}
                                    className={`p-5 md:flex flex-col flex-1 ${subscriptionPlan.recommended && 'border-2 border-custom-blue'}`}>
                                    <div className="h-[120px]">
                                        <div className="gap-x-4 font-semibold text-xl mb-2 flex">
                                            {subscriptionPlan.recommended ?
                                                <>
                                                    {subscriptionPlan.label}
                                                    <Badge variant="outline" className="uppercase text-sm py-1">
                                                        Popular
                                                    </Badge>
                                                </>
                                                : subscriptionPlan.label}
                                        </div>
                                        <div className="font-normal text-sm mb-auto">
                                            {subscriptionPlan.description}
                                        </div>
                                    </div>
                                    <div className="flex font-bold text-xl">
                                        {subscriptionPlan.price}$/m
                                    </div>
                                    <p>por miembro</p>
                                    <div className="flex flex-col gap-y-2 mt-8 flex-1 mb-4">
                                        <p>Todas las características del plan gratis más:</p>
                                        {Object.entries(subscriptionPlan.features).map(([feature, value]) => (
                                            <div key={feature} className="flex items-center gap-x-2">
                                                <Check className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                                <span className="text-black-5">{feature}:</span>
                                                <span className="text-black-5 font-bold">{value}</span>
                                            </div>
                                        ))}
                                        {subscriptionPlan.extraFeatures && (
                                            <div className="flex items-center gap-x-2">
                                                <Check className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                                <span className="text-black-5 font-bold">{subscriptionPlan.extraFeatures}</span>
                                            </div>
                                        )}
                                    </div>
                                    <SubscriptionButton 
                                        plan={subscriptionPlan}
                                        selectedOrganization={selectedOrganization}
                                    />
                                </Card>
                            ))}
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}