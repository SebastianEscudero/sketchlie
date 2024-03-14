"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import MobileSidebar from "./mobile-sidebar";
import { NavigationMenuLanding } from "./navigation-menu";
import { useUser } from "@clerk/nextjs";

export const LandingNavbar = () => {
    const { user } = useUser();

    return (
        <nav className="py-3 bg-[#FFFFFF] border-b border-zinc-600 sticky top-0 z-50">
            <div className="flex items-center justify-between xl:mx-[5%] lg:mx-[3%] md:mx-[2%] mx-[1%]">
                <div className="flex items-center">
                    <main>
                        <MobileSidebar />
                    </main>
                    <Link href="/" className="flex items-center mr-3">
                        <div className="relative h-12 w-12 mr-4">
                            <Image
                                fill
                                alt="Logo"
                                src="/logo.svg"    
                            />
                        </div>
                        <p className="text-2xl font-bold text-[#38322C] font-roobert">
                            Sketchlie
                        </p>
                    </Link>
                    <NavigationMenuLanding />
                </div>
                <div className="hidden sm:flex items-center gap-x-2">
                    <Link href={"/dashboard"}>
                        <Button variant="outline" className="rounded-lg">
                            {user ? "Ir al Tablero" : "Regístrate gratis"}
                        </Button>
                    </Link>
                </div>
            </div>
        </nav>
    )
}