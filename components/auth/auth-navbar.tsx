"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";
import { usePathname } from "next/navigation";

export const AuthNavbar = () => {
    const user = useCurrentUser();
    const pathname = usePathname();

    const linkPath = pathname === "/auth/login/" ? "/auth/register/" : "/auth/login/";
    const buttonText = pathname === "/auth/login/" ? "Sign Up" : "Login";

    return (
        <nav className="border-b border-black bg-amber-50 sticky top-0 z-50 h-[88px] flex items-center transition-transform duration-300">
            <div className="flex items-center w-full h-full xl:px-[15%] lg:px-[7%] md:px-[5%] px-[5%] justify-between">
                <div className="flex items-center">
                    <Link href="/" className="flex items-center mr-3">
                        <div className="mr-4">
                            <Image
                                height={50}
                                width={50}
                                alt="Logo"
                                src="/logos/logo.svg"
                            />
                        </div>
                        <p className="text-2xl font-bold text-[#38322C] ">
                            Sketchlie
                        </p>
                    </Link>
                </div>
                <Link href={linkPath}>
                    <Button variant="golden" className="rounded-lg text-md">
                        {user ? "Ir al Tablero" : buttonText}
                    </Button>
                </Link>
            </div>
        </nav>
    )
}