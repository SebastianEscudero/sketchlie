"use client";

import { LoaderCircle } from "lucide-react";
import { Button } from "./ui/button";
import axios from "axios";
import { toast } from "sonner";
import { useState } from "react";
import { getUsersCurrency } from "@/lib/utils";
import Link from "next/link";
import { Organization } from "@prisma/client";

interface SubscriptionButtonProps {
    selectedOrganization: Organization | null;
    plan: any;
    className?: string;
    children: React.ReactNode;
}

export const SubscriptionButton = ({
    selectedOrganization,
    plan,
    className,
    children,
}: SubscriptionButtonProps) => {

    const [isLoading, setIsLoading] = useState(false);

    const onClick = async () => {
        if (!selectedOrganization) {
            return toast.error("Choose an organization to upgrade.");
        }
        setIsLoading(true);
        try {
            const usersCurrency = await getUsersCurrency();
            const { data } = await axios.post("/api/mercadoPago", { organization: selectedOrganization, plan, currency: usersCurrency });
            window.location.href = data.init_point;
        } catch (error) {
            console.error("Mercado Pago", error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        plan.label === "Enterprise" ? (
            <Link href="/contact" target="_blank">
                <Button variant="sketchlieBlue" disabled={isLoading} className={className}> 
                    {isLoading ? <LoaderCircle className="animate-spin w-5 h-5 text-white"/> : children}
                </Button>
            </Link>
        ) : (
            <Button variant="sketchlieBlue" onClick={onClick} disabled={isLoading} className={className}> 
                {isLoading ? 
                    <LoaderCircle className={`animate-spin w-5 h-5 ${plan.label === "Starter" ? "text-black" : "text-white"}`}/> 
                    : children}
            </Button>
        )
    )
}