"use client";

import { BotNavbar } from "@/components/bottom-navbar";
import { LandingNavbar } from "@/components/landing-navbar";
import { cn } from "@/lib/utils";
import { mainFont } from "@/lib/font";
import { Locale } from "@/i18n.config";
import { LanguageProvider } from "@/providers/language-provider";

const LandingLayout = ({
    children,
    params
}: {
    children: React.ReactNode;
    params: { lang: Locale };
}) => {
    return (
        <LanguageProvider lang={params.lang}>
            <main className={cn("bg-amber-50", mainFont.className)} lang={params.lang}>
                <div className="mx-auto h-full">
                    <LandingNavbar />
                    {children}
                    <BotNavbar />
                </div>
            </main>
        </LanguageProvider>
    );
}

export default LandingLayout;