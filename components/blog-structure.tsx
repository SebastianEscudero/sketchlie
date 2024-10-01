"use client";

import Link from "next/link"
import { Button } from "./ui/button"
import Image from "next/image";
import { LogoSlider } from "./logo-slider";
import { LandingVideo } from "./landing-video";
import { ArrowRightIcon } from "lucide-react";

interface BlogStructureProps {
    title: string;
    description: string;
    cta: string;
    img: string;
    alt: string
}

export const BlogStructure = ({
    title,
    description,
    cta,
    img,
    alt
}: BlogStructureProps) => {
    const imageElement = (
        <div className="flex-1 w-full md:block hidden rounded-sm border border-black">
            <Image
                src={img}
                alt={alt}
                className="w-full rounded-[3px]"
                width={1919}
                height={1079}
                priority
            />
        </div>
    );

    return (
        <div className="bg-amber-50 text-black xl:px-[15%] lg:px-[10%] md:px-[7%] px-[5%] py-20 md:py-20 lg:py-16 xl:py-24">
            <div className="flex flex-col md:flex-row md:space-x-10 xl:space-x-18 items-center md:text-left text-center">
                <div className="space-y-10 flex-1 text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
                    <h1>
                        {title}
                    </h1>
                    <p className="sm:text-lg text-base text-zinc-600 md:pr-[25%] px-auto">
                        {description}
                    </p>
                    <div className="mt-20 flex items-center md:justify-start justify-center">
                        <Link href={"/auth/register/"} title={cta}>
                            <Button variant="golden" className="transition-all duration-300 transform hover:scale-105 rounded-full p-6 px-8 text-lg w-auto flex items-center justify-center">
                                {cta}
                                <ArrowRightIcon className="w-4 h-4 ml-2" />
                            </Button>
                        </Link>
                    </div>
                </div>
                {imageElement}
            </div>
            <LogoSlider />
            <LandingVideo />
        </div>
    )
}