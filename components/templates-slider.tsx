"use client";

import { templates } from "@/app/dashboard/templates/templates"
import Image from "next/image"
import { useRef } from "react"
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { UseLanguage } from "@/hooks/use-language";
import templatesSliderTranslations from "@/public/locales/templates-slider";

export const TemplatesSlider = () => {
    const scrollContainerRef = useRef<HTMLDivElement>(null)
    const language = UseLanguage();
    const t = templatesSliderTranslations[language];

    const scroll = (scrollOffset: number) => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTo({
                left: scrollContainerRef.current.scrollLeft + scrollOffset,
                behavior: 'smooth'
            });
        }
    }

    return (
        <div className="bg-white border border-black py-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-blue-900 xl:mx-[10%] lg:mx-[7%] mx-[5%] mb-8">
                {t.title}
            </h2>
            <div className="relative">
                <Button
                    className="px-2 absolute top-1/2 left-[5%] z-10 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={() => scroll(-600)}
                    aria-label="Scroll left"
                >
                    <ChevronLeft size={24} />
                </Button>
                <div ref={scrollContainerRef} className="no-scrollbar px-10 flex flex-row overflow-x-auto gap-5 md:mb-20 md:mt-8 my-5 items-center">
                    <div className="flex-shrink-0 w-[0%] xl:w-[7%]"></div>
                    {templates.slice(0, 11).map((template, index) => (
                        <TemplateInSlider
                            key={index}
                            name={template.name}
                            image={template.image}
                            href={template.href}
                        />
                    ))}
                </div>
                <Button
                    className="px-2 absolute top-1/2 right-[5%] transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={() => scroll(600)}
                    aria-label="Scroll right"
                >
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
            className="flex flex-col border border-black flex-shrink-0 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 bg-white">
            <div className="bg-[#f4f4f4] p-4">
                <p className="text-center text-xl font-semibold text-blue-900">{name}</p>
            </div>
            <Image
                src={image}
                alt={`Plantilla de ${name}`}
                width={300}
                height={300}
                className="min-w-full h-48 w-[246px] md:h-56 md:w-[280px] lg:h-64 lg:w-[330px] xl:h-72 xl:w-[370px] object-cover"
            />
        </Link>
    )
}