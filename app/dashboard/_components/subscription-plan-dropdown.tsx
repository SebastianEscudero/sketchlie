import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Infinity, Shapes, SquareMousePointer, Users, Zap } from "lucide-react";
import { useProModal } from "@/hooks/use-pro-modal";
import { Button } from "@/components/ui/button";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { getPlanColor } from "@/lib/orgUtils";

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
        proModal.onOpen(activeOrg.id);
    }

    let color = "#000000"; // default color
    let letterColor = "#FFFFFF"; // default letter color

    if (activeOrg) {
        ({ color, letterColor } = getPlanColor(subscriptionPlan || "Gratis"));
    }

    if (subscriptionPlan === "Business") {
        return;
    }

    return (
        // <div className="flex items-center">
        //     <DropdownMenu>
        //         <div className="flex flex-col outline-none w-full justify-center items-center space-y-2 bg-zinc-600 rounded-lg shadow-custom-3 p-4 border" style={{ borderColor: color }}>
        //         <Zap className="w-6 h-6" style={{ stroke: color, fill: color }} />
        //         <span className="text-[13px] font-medium text-center">Ready to go to the next level?</span>
        //             <DropdownMenuTrigger>
        //                 <div
        //                     className={`text-base py-2 px-4 rounded-md w-[150px]`}
        //                     style={{ backgroundColor: color, color: letterColor }}
        //                 >
        //                     <span className={cn(
        //                         "text-lg",
        //                         font.className,
        //                     )}>
        //                         View plans
        //                     </span>
        //                 </div>
        //             </DropdownMenuTrigger>
        //         </div>
        //         <DropdownMenuContent align="start" className="px-3 py-2 flex flex-col space-y-3 rounded-lg drop-shadow-md">
        //             <p className="font-semibold">{activeOrg.name} is on Plan {subscriptionPlan}</p>
        //             <div className="text-sm space-y-2">
        //                 {subscriptionPlan === "Gratis" && (
        //                     <div className="flex flex-col gap-y-2">
        //                         <div className="flex flex-row gap-x-2">
        //                             <SquareMousePointer className="h-4 w-4" />
        //                             <span>Boards: 3</span>
        //                         </div>
        //                         <div className="flex flex-row gap-x-2">
        //                             <Shapes className="h-4 w-4" />
        //                             <span>Maximum layers: 100</span>
        //                         </div>
        //                         <div className="flex flex-row gap-x-2">
        //                             <Users className="h-4 w-4" />
        //                             <span>Teams: 1</span>
        //                         </div>
        //                     </div>
        //                 )}
        //                 {subscriptionPlan === "Starter" && (
        //                     <div className="flex flex-col gap-y-2">
        //                         <div className="flex flex-row gap-x-2">
        //                             <SquareMousePointer className="h-4 w-4" />
        //                             <span>Boards: Unlimited</span>
        //                         </div>
        //                         <div className="flex flex-row gap-x-2">
        //                             <Shapes className="h-4 w-4" />
        //                             <span>Maximum layers: 1000</span>
        //                         </div>
        //                         <div className="flex flex-row gap-x-2">
        //                             <Users className="h-4 w-4" />
        //                             <span>Teams: 10</span>
        //                         </div>
        //                     </div>
        //                 )}
        //                 {subscriptionPlan === "Business" && (
        //                     <div className="flex flex-col gap-y-2">
        //                         <div className="flex flex-row gap-x-2">
        //                             <SquareMousePointer className="h-4 w-4" />
        //                             <span>Boards: Unlimited</span>
        //                         </div>
        //                         <div className="flex flex-row gap-x-2">
        //                             <Shapes className="h-4 w-4" />
        //                             <span>Objetos máximos: Unlimited</span>
        //                         </div>
        //                         <div className="flex flex-row gap-x-2">
        //                             <Users className="h-4 w-4" />
        //                             <span>Equipos: Unlimited</span>
        //                         </div>
        //                     </div>
        //                 )}
        //             </div>
        //             {subscriptionPlan !== "Business" && (
        //                 <div className="bg-blue-100/70 p-3 space-y-2">
        //                     <p className="flex flex-row items-center">
        //                         <Infinity className="w-4 h-4 mr-2 text-custom-blue" /> Create unlimited boards
        //                     </p>
        //                     <p className="flex flex-row items-center">
        //                         <Infinity className="w-4 h-4 mr-2 text-custom-blue" /> Unlimited layers
        //                     </p>
        //                     <Button variant="auth" onClick={onClick} className="w-full">
        //                         Upgrade <Zap className="w-4 h-4 ml-2 fill-white" />
        //                     </Button>
        //                 </div>
        //             )}
        //         </DropdownMenuContent>
        //     </DropdownMenu>
        // </div>
        <div className="flex flex-col outline-none w-full justify-center items-center space-y-2 dark:bg-[#383838] bg-zinc-100 rounded-lg shadow-custom-3 p-4 border" style={{ borderColor: color }}>
            <Zap className="w-6 h-6" style={{ stroke: color, fill: color }} />
            <span className="text-[13px] font-medium text-center">Ready to go to the next level?</span>
            <Button
                onClick={onClick}
                className="text-base rounded-md w-[150px]"
                style={{ backgroundColor: color, color: letterColor }}
            >
                <span className={cn(
                    "text-lg",
                    font.className,
                )}>
                    View plans
                </span>
            </Button>
        </div>
    )
}