"use client";

import { LoaderCircle, Zap } from "lucide-react";
import { Button } from "./ui/button";
import axios from "axios";
import { toast } from "sonner";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useState } from "react";

interface SubscriptionButtonProps {
    selectedOrganization: any;
    plan: any;
}

export const SubscriptionButton = ({
    selectedOrganization,
    plan,
}: SubscriptionButtonProps) => {

    const user = useCurrentUser();
    const activeOrg = user?.organizations.find((org: any) => org.id === selectedOrganization);

    const [isLoading, setIsLoading] = useState(false);

    const onClick = async () => {
        if (!selectedOrganization) {
            return toast.error("Choose an organization to upgrade.");
        }
        setIsLoading(true);
        try {
            const { data } = await axios.post("/api/mercadoPago", { organization: activeOrg, plan});
            window.location.href = data.init_point;
        } catch (error) {
            console.error("Mercado Pago", error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Button variant="sketchlieBlue" onClick={onClick} disabled={isLoading}> 
            {isLoading ? <LoaderCircle className="animate-spin w-5 h-5 text-white"/> : <>Upgrade <Zap className="w-4 h-4 ml-2 fill-white"/></>}
        </Button>
    )
}