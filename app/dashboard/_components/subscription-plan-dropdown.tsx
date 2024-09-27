import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Infinity, Rocket, Shapes, SquareMousePointer, Users, Zap } from "lucide-react";
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

    if (subscriptionPlan === "Business") {
        return;
    }

    return (
        <Button
            onClick={onClick}
            className="text-sm font-semibold rounded-md flex flex-row items-center justyf-center w-full bg-transparent dark:bg-transparent border dark:border-zinc-600 text-black dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-800"
            size="sm"
        >
            <Rocket className="w-4 h-4 mr-2 fill-blue-600 stroke-blue-600" />
            Upgrade organization
        </Button>
    )
}