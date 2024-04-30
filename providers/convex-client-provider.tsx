"use client";

import {
    ConvexProvider,
    ConvexReactClient,
} from "convex/react";
import { getSession, SessionProvider } from "next-auth/react";
import { Session } from "next-auth/types";
import { useEffect, useState } from "react";

interface ConvexClientProviderProps {
    children: React.ReactNode;
};

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL!;

const convex = new ConvexReactClient(convexUrl!);

export const ConvexClientProvider = ({
    children,
}: ConvexClientProviderProps) => {
    const [session, setSession] = useState<Session | null>(null);

    useEffect(() => {
        const fetchSession = async () => {
            const session = await getSession();
            setSession(session);
            };

        fetchSession();
    }, []);

    return (
        <SessionProvider session={session}>
            <ConvexProvider client={convex}>
                {children}
            </ConvexProvider>
        </SessionProvider>
    );
};