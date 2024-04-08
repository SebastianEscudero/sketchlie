"use client";

import { Zap } from "lucide-react";
import { Button } from "./ui/button";
import axios from "axios";
import { toast } from "sonner";
import { useCurrentUser } from "@/hooks/use-current-user";
import { checkSubscription } from "@/lib/subscription";

export const SubscriptionButton = () => {
    const user = useCurrentUser();
    
    const isPro = checkSubscription(user);

    const onClick = async () => {
        try {
            const { data } = await axios.post("/api/mercadoPago");
            console.log(data);
            window.location.href = data.init_point;
        } catch (error) {
            toast.error("Coming soon!");
        }
    }

    return (
        <Button variant="auth" onClick={onClick}>
            {isPro ? "Pausar Subscripcion" : "Upgrade"}
            {!isPro && <Zap className="w-4 h-4 ml-2 fill-white"/>}
        </Button>
    )
}