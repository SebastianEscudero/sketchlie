"use client";

import { Zap } from "lucide-react";
import { Button } from "./ui/button";
import axios from "axios";
import { useCurrentUser } from "@/hooks/use-current-user";
import { checkSubscription } from "@/lib/subscription";
import { toast } from "sonner";

interface SubscriptionButtonProps {
    selectedOrganization: any;
    plan: any;
}

export const SubscriptionButton = ({
    selectedOrganization,
    plan,
}: SubscriptionButtonProps) => {
    const user = useCurrentUser();
    
    const isPro = checkSubscription(user);

    const onClick = async () => {
        if (!selectedOrganization) {
            return toast.error("Choose an organization to upgrade.");
        }
        try {
            const { data } = await axios.post("/api/mercadoPago", { organization: selectedOrganization, plan});
            console.log(data);
            window.location.href = data.init_point;
        } catch (error) {
            console.error("Mercado Pago", error);
        }
    }

    return (
        <Button variant="auth" onClick={onClick}>
            {isPro ? "Pausar Subscripcion" : "Upgrade"}
            {!isPro && <Zap className="w-4 h-4 ml-2 fill-white"/>}
        </Button>
    )
}