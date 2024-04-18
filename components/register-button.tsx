"use client";

import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";
import Link from "next/link";

export const DashboardButton = () => {
    const user = useCurrentUser();
    return (
        <Link href="/auth/register">
            <Button variant="auth" className="md:text-lg p-4 md:p-6">
                {user ? "Ir al Tablero" : "Regístrate gratis"}
            </Button>
        </Link>
    );
}