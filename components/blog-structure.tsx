"use client";

import Link from "next/link"
import { Button } from "./ui/button"
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
    const imageElement = img && (
        <div className="flex-1 w-full border border-[#837D7C] rounded-sm md:block hidden">
            <Image
                src={img}
                alt={alt}
                className="w-full rounded-sm"
                width={1920}
                height={1080}
                
            />
        </div>
    );
    
    return (
        <div className={`text-[#1c1c1e] pt-32 flex flex-col md:flex-row md:space-x-10 xl:space-x-20 font-roobert ${img ? "xl:mx-[10%] lg:mx-[7%] md:mx-[5%] mx-[5%] items-center md:text-left text-center" : "lg:mx-[25%] md:mx-[15%] mx-[5%] text-center space-y-5"}`}>
            <div className={cn(`space-y-5 flex-1`, {
                'text-4xl md:text-5xl lg:text-6xl md:mb-0 mb-5': img,
                'text-4xl sm:text-5xl md:text-6xl lg:text-7xl': !img,
            })}>
                <h1>
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
                <p className="text-lg text-zinc-600 md:mr-[25%] mx-auto">
                    {description}
                </p>
                <div>
                    <Link href={"/auth/register/"}>
                        <Button variant="auth" className="p-6 text-lg w-full md:w-auto">
                            {cta}
                        </Button>
                    </Link>
                </div>
                <p className="text-zinc-400 text-xs md:text-sm">
                    No se requiere tarjeta de crédito
                </p>
            </div>
            {img && imageElement}
        </div>
    )
}