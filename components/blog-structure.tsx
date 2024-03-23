"use client";

import Link from "next/link"
import { Button } from "./ui/button"
import { useUser } from "@clerk/nextjs";
import TypewriterComponent from "typewriter-effect";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface BlogStructureProps {
    title: string;
    description: string;
    cta: string;
    img?: string;
    alt: string
}

export const BlogStructure = ({
    title,
    description,
    cta,
    img,
    alt
}: BlogStructureProps) => {
    const { user } = useUser();

    const imageElement = img && (
        <div className="flex-1 w-full border border-[#837D7C] rounded-sm md:block hidden">
            <Image
                src={img}
                alt={alt}
                layout="responsive"
                width={10}
                height={10}
                
            />
        </div>
    );
    
    return (
        <div className={`text-[#1c1c1e] pt-20 flex flex-col md:flex-row md:space-x-10 xl:space-x-20 ${img ? "xl:mx-[10%] lg:mx-[7%] md:mx-[5%] mx-[5%] items-center md:text-left text-center" : "lg:mx-[25%] md:mx-[15%] mx-[5%] text-center space-y-5"}`}>
            <div className={cn(`space-y-5 flex-1 justify`, {
                'text-3xl sm:text-4xl lg:text-5xl xl:text-6xl 2xl:text-6xl md:mb-0 mb-5': img,
                'text-4xl sm:text-5xl md:text-6xl lg:text-7xl': !img,
            })}>
                <h1 style={{ lineHeight: "1.2" }}>
                    {title}
                </h1>
                <div className="bg-clip-text text-[#2E4DE6] leading-small">
                    <TypewriterComponent 
                        options = {{
                            strings: [
                                "Colabora.",
                                "Diseña.",
                                "Crea.",
                                "Enseña.",
                            ],
                            autoStart: true,
                            loop: true,
                        }}
                    />
                </div>
                <p className="text-sm md:text-md xl:text-lg font-normal text-zinc-800 mx-auto">
                    {description}
                </p>
                <div>
                    <Link href={"/dashboard"}>
                        <Button variant="outline" className="md:text-lg p-4 md:p-6 font-normal">
                            {user ? "Ir a Tablero" : cta}
                        </Button>
                    </Link>
                </div>
                <p className="text-zinc-400 text-xs md:text-sm font-normal">
                    No se requiere tarjeta de crédito
                </p>
            </div>
            {img && imageElement}
        </div>
    )
}