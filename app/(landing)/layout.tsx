"use client";

import { BotNavbar } from "@/components/bottom-navbar";
import { LandingNavbar } from "@/components/landing-navbar";
import { themeCheck } from "@/lib/theme-utilts";
import { useEffect } from "react";

const LandingLayout = ({
    children
}: {
    children: React.ReactNode;
}) => {

    useEffect(() => {
        themeCheck();
    }, [])

    return ( 
        <main className= "bg-[#F9FAFB] dark:bg-[#0a101f] font-sans">
            <div className="mx-auto h-full">
                <LandingNavbar />
                {children}
                <BotNavbar />
            </div>
        </main>
     );
}
 
export default LandingLayout;