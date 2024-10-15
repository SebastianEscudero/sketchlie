"use client";

import { useState, useEffect, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { NavigationMenuLanding } from "./navigation-menu";
import { MobileSidebar } from "./mobile-sidebar";
import { Button } from "./ui/button";
import landingNavbarTranslations from "@/public/locales/landing-navbar";
import { LanguageContext } from "@/providers/language-provider";
import { Language } from "@/types/canvas";

// Custom hook to track scroll direction
const useScrollDirection = () => {
    const [scrollDirection, setScrollDirection] = useState("up");

    useEffect(() => {
        let lastScrollY = window.pageYOffset;

        const updateScrollDirection = () => {
            const scrollY = window.pageYOffset;
            const direction = scrollY > lastScrollY ? "down" : "up";
            if (direction !== scrollDirection && (scrollY - lastScrollY > 10 || scrollY - lastScrollY < -10)) {
                setScrollDirection(direction);
            }
            lastScrollY = scrollY > 0 ? scrollY : 0;
        };

        window.addEventListener("scroll", updateScrollDirection);
        return () => {
            window.removeEventListener("scroll", updateScrollDirection);
        }
    }, [scrollDirection]);

    return scrollDirection;
};

export const LandingNavbar = () => {
    const scrollDirection = useScrollDirection();
    const lang = useContext(LanguageContext);
    const t = landingNavbarTranslations[lang as Language];

    return (
        <nav className={`border-b border-black bg-amber-50 sticky top-0 z-50 h-[88px] flex items-center transition-transform duration-300 ${
            scrollDirection === "down" ? "-translate-y-[71px]" : "translate-y-0"
        }`}>
            <div className="flex items-center w-full h-full xl:px-[15%] lg:px-[7%] md:px-[5%] px-[5%]">
                <div className="flex items-center justify-between w-full max-w-7xl">
                    <div className="flex items-center">
                        <MobileSidebar translations={t} lang={lang} />
                        <Link href={`/${lang}/`} className="flex items-center mr-2 ml-2 h-[50px]" title="Sketchlie">
                            <div className="mr-2 h-full w-full">
                                <Image
                                    height={50}
                                    width={50}
                                    alt="Sketchlie Logo"
                                    src="/logos/logo.svg"    
                                    loading="lazy"
                                />
                            </div>
                            <p className="text-2xl font-bold text-black xs:flex hidden">
                                Sketchlie
                            </p>
                        </Link>
                    </div>
                    <NavigationMenuLanding translations={t} lang={lang}/>
                    <Link href="/auth/register/" title={t.cta}>
                        <Button variant="golden" className="rounded-lg">
                            {t.cta}
                        </Button>
                    </Link>
                </div>
            </div>
        </nav>
    )
}