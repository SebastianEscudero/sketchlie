import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Infinity, Shapes, SquareMousePointer, Users, Zap } from "lucide-react";
import { useProModal } from "@/hooks/use-pro-modal";
import { Button } from "@/components/ui/button";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Poppins({
    subsets: ["latin"],
    weight: ["600"],
});

interface SubscriptionPlanDropdownProps {
    subscriptionPlan: string | null;
    activeOrg: any;
}

export const SubscriptionPlanDropdown = ({
    subscriptionPlan,
    activeOrg,
}: SubscriptionPlanDropdownProps) => {

    const proModal = useProModal();
    const onClick = () => {
        proModal.onOpen();
    }

    return (
        <div className="flex items-center">
                    <DropdownMenu>
                        <DropdownMenuTrigger className="flex outline-none">
                            <div
                                className={`text-[16px] px-2 py-1 rounded-md ${
                                    subscriptionPlan === "Gratis" ? "bg-accent text-black hover:bg-accent/90 border border-black" :
                                    subscriptionPlan === "Starter" ? "bg-yellow-500 text-black hover:bg-yellow-600" :
                                    "bg-black text-white hover:bg-black/80"
                                }`}
                            >
                                <span className={cn(
                                    "text-lg",
                                    font.className,
                                )}>
                                    Plan {subscriptionPlan}
                                </span>
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start">
                            <div className="px-3 py-2 flex flex-col space-y-3">
                                <p className="font-semibold">{activeOrg.name} está con plan {subscriptionPlan}</p>
                                <div className="text-sm space-y-2">
                                    {subscriptionPlan === "Gratis" && (
                                        <div className="flex flex-col gap-y-2">
                                            <div className="flex flex-row gap-x-2">
                                                <SquareMousePointer className="h-4 w-4" />
                                                <span>Boards: 3</span>
                                            </div>
                                            <div className="flex flex-row gap-x-2">
                                                <Shapes className="h-4 w-4" />
                                                <span>Objetos máximos: 100</span>
                                            </div>
                                            <div className="flex flex-row gap-x-2">
                                                <Users className="h-4 w-4" />
                                                <span>Equipos: 1</span>
                                            </div>
                                        </div>
                                    )}
                                    {subscriptionPlan === "Starter" && (
                                        <div className="flex flex-col gap-y-2">
                                            <div className="flex flex-row gap-x-2">
                                                <SquareMousePointer className="h-4 w-4" />
                                                <span>Boards: Ilimitados</span>
                                            </div>
                                            <div className="flex flex-row gap-x-2">
                                                <Shapes className="h-4 w-4" />
                                                <span>Objetos máximos: 1000</span>
                                            </div>
                                            <div className="flex flex-row gap-x-2">
                                                <Users className="h-4 w-4" />
                                                <span>Equipos: 10</span>
                                            </div>
                                        </div>
                                    )}
                                    {subscriptionPlan === "Business" && (
                                        <div className="flex flex-col gap-y-2">
                                            <div className="flex flex-row gap-x-2">
                                                <SquareMousePointer className="h-4 w-4" />
                                                <span>Boards: Ilimitados</span>
                                            </div>
                                            <div className="flex flex-row gap-x-2">
                                                <Shapes className="h-4 w-4" />
                                                <span>Objetos máximos: Ilimitados</span>
                                            </div>
                                            <div className="flex flex-row gap-x-2">
                                                <Users className="h-4 w-4" />
                                                <span>Equipos: Ilimitados</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                {subscriptionPlan !== "Business" && (
                                    <div className="bg-blue-100/70 p-3 space-y-2">
                                        <p className="flex flex-row items-center">
                                            <Infinity className="w-4 h-4 mr-2 text-custom-blue" /> Crea tableros ilimitados
                                        </p>
                                        <p className="flex flex-row items-center">
                                            <Infinity className="w-4 h-4 mr-2 text-custom-blue" /> Objetos ilimitados
                                        </p>
                                        <Button variant="auth" onClick={onClick} className="w-full">
                                            Upgrade <Zap className="w-4 h-4 ml-2 fill-white" />
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
    )
}