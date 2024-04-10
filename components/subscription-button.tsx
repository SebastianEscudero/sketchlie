"use client";

import { Zap } from "lucide-react";
import { Button } from "./ui/button";
import axios from "axios";
import { toast } from "sonner";

interface SubscriptionButtonProps {
    selectedOrganization: any;
    plan: any;
}

export const SubscriptionButton = ({
    selectedOrganization,
    plan,
}: SubscriptionButtonProps) => {
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
            Upgrade <Zap className="w-4 h-4 ml-2 fill-white"/>
        </Button>
    )
}