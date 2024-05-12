"use client";

import { templates } from "@/app/dashboard/templates/templates"
import Image from "next/image"
import { useRef } from "react"
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

export const TemplatesSlider = () => {
    const scrollContainerRef = useRef<HTMLDivElement>(null)

    const scroll = (scrollOffset: number) => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTo({
                left: scrollContainerRef.current.scrollLeft + scrollOffset,
                behavior: 'smooth'
            });
        }
    }

    return (
        <div>
            <h2 className="text-4xl font-roobert xl:mx-[10%] lg:mx-[7%] md:mx-[5%] mx-[2%]">Explora nuestras plantillas</h2>
            <div className="relative">
                <Button className="px-2 absolute top-1/2 left-[8%] z-10 transform -translate-y-1/2  border border-black" variant="business" onClick={() => scroll(-600)}>
                    <ChevronLeft size={24} />
                </Button>
                <div ref={scrollContainerRef} className="no-scrollbar px-10 flex flex-row overflow-x-auto gap-5 md:mb-20 md:mt-8 my-5 items-center">
                    <div className="flex-shrink-0 w-[0%] xl:w-[7%]"></div>
                    {templates.slice(0, 10).map((template, index) => (
                        <TemplateInSlider
                            key={index}
                            name={template.name}
                            image={template.image}
                            href={template.href}
                        />
                    ))}
                </div>
                <Button className="px-2 absolute top-1/2 right-[8%] transform -translate-y-1/2 border border-black" variant="business" onClick={() => scroll(600)}>
                    <ChevronRight size={24} />
                </Button>
            </div>
        </div>
    )
}

const TemplateInSlider = ({
    name,
    image,
    href
}: {
    name: string,
    image: string,
    href: string
}) => {
    return (
        <Link
            href={href}
            className="flex flex-col flex-shrink-0 rounded-xl border border-zinc-500 hover:border-black my-5 bg-[#f4f4f4] mb-5 transform transition-all duration-150 hover:scale-102">
            <p className="my-5 text-center text-xl font-roobert font-semibold">{name}</p>
            <Image
                src={image}
                alt={`Plantilla de ${name}`}
                width={300}
                height={300}
                className="rounded-xl w-auto h-auto"
            />
        </Link>
    )
}