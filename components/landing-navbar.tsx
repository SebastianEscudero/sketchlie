"use client";

import Image from "next/image";
import Link from "next/link";
import { NavigationMenuLanding } from "./navigation-menu";
import { MobileSidebar } from "./mobile-sidebar";
import { Button } from "./ui/button";

export const LandingNavbar = () => {
    return (
        <nav className="py-3 bg-white dark:bg-[#020817] shadow-custom-1 sticky top-0 z-50 h-[71px]">
            <div className="flex items-center justify-between xl:mx-[10%] lg:mx-[7%] md:mx-[5%] mx-[5%] h-[40px]">
                <div className="flex items-center">
                    <MobileSidebar />
                    <Link href="/" className="flex items-center mr-2 ml-2" title="Sketchlie">
                        <div className="mr-4 h-full w-full">
                            <Image
                                height={50}
                                width={50}
                                alt="Sketchlie Logo"
                                src="/logo.svg"    
                                loading="lazy"
                            />
                        </div>
                        <p className="text-2xl font-bold text-[#38322C] dark:text-white font-roobert">
                            Sketchlie
                        </p>
                    </Link>
                    <NavigationMenuLanding />
                </div>
                <div className="hidden sm:flex items-center gap-x-2">
                    <Link href="/auth/register/" title="Regístrate gratis">
                        <Button variant="auth" className="rounded-lg">
                            Regístrate gratis
                        </Button>
                    </Link>
                </div>
            </div>
        </nav>
    )
}