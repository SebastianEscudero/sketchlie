import Image from "next/image";
import { cn } from '@/lib/utils';
import React from "react";

interface BlogSectionProps {
    title: string;
    text?: string | React.ReactNode;
    text2?: string | React.ReactNode;
    alt?: string;
    img?: string;
    side?: 'left' | 'right';
}

export const BlogSection = ({
    title,
    text,
    text2,
    alt,
    img,
    side = 'right',
}: BlogSectionProps) => {
    const imageElement = img && (
        <div className="flex-1 w-full overflow-hidden rounded-lg shadow-lg">
            <Image
                src={img}
                alt={alt || 'Blog image'}
                className="w-full object-cover"
                width={1919}
                height={1079}
            />
        </div>
    );

    return (
        <div className={cn(
            "lg:py-10 py-0 flex flex-col xl:px-[15%] lg:px-[7%] md:px-[5%] px-[5%] md:flex-row items-center my-14 md:space-x-20 xl:space-x-28",
            !img && 'text-center',
            side === 'left' && 'flex-col-reverse'
        )}>
            {side === 'left' && imageElement}
            <div className="flex-1">
                <h2 className={cn(
                    "mb-10 leading-snug space-y-5 text-blue-900 font-bold",
                    text && img ? 'text-3xl lg:text-4xl text-left' : 'text-3xl lg:text-4xl lg:mx-[20%] mx-[2%]'
                )} style={{ lineHeight: "1.2" }}>
                    {title}
                </h2>
                {text && (
                    <p className={cn(
                        "text-lg lg:text-xl text-black md:mb-0 mb-5",
                        !img ? 'lg:mx-[20%] mx-[2%] text-center' : 'text-justify'
                    )}>
                        {text}
                    </p>
                )}
                {text2 && (
                    <p className={cn(
                        "mt-5 text-lg lg:text-xl text-black md:mb-0 mb-5",
                        !img ? 'lg:mx-[20%] mx-[2%] text-center' : 'text-justify'
                    )}>
                        {text2}
                    </p>
                )}
            </div>
            {side === 'right' && imageElement}
        </div>
    )
}