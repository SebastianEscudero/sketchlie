"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";
import { usePathname } from "next/navigation";

export const AuthNavbar = () => {
    const user = useCurrentUser();
    const pathname = usePathname();

    const linkPath = pathname === "/auth/login" ? "/auth/register" : "/auth/login";
    const buttonText = pathname === "/auth/login" ? "Sign Up" : "Login";

    return (
        <nav className="py-3 bg-[#FFFFFF] border-b border-zinc-600 sticky top-0 z-50 xl:px-[10%] lg:px-[7%] md:px-[5%] px-[3%]">
            <div className="flex items-center justify-between xl:mx-[5%] lg:mx-[3%] md:mx-[2%] mx-[1%]">
                <div className="flex items-center">
                    <Link href="/" className="flex items-center mr-3">
                        <div className="relative h-12 w-12 mr-4">
                            <Image
                                fill
                                alt="Logo"
                                src="/logo.svg"    
                            />
                        </div>
                        <p className="text-2xl font-bold text-[#38322C]">
                            Sketchlie
                        </p>
                    </Link>
                </div>
                <Link href={linkPath}>
                    <Button variant="auth" className="rounded-lg text-md">
                        {user ? "Ir al Tablero" : buttonText}
                    </Button>
                </Link>
            </div>
        </nav>
    )
}