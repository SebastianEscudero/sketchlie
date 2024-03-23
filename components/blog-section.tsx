import Image from "next/image";
import { cn } from '@/lib/utils';

interface BlogSectionProps {
    title: string;
    text?: string;
    text2?: string;
    img?: string;
    side?: 'left' | 'right';
}

export const BlogSection = ({
    title,
    text,
    text2,
    img,
    side = 'right',
}: BlogSectionProps) => {
    const imageElement = img && (
        <div className="flex-1 w-full border border-[#837D7C]">
            <Image
                src={img}
                alt="Logo"
                layout="responsive"
                width={10}
                height={10}
                
            />
        </div>
    );

    return (
        <div className={`flex flex-col xl:mx-[10%] lg:mx-[7%] md:mx-[5%] mx-[5%] md:flex-row items-center my-14 md:space-x-20 xl:space-x-30 text-[#1c1c1e] ${!img && 'text-center'} ${side === 'left' && 'flex-col-reverse'}`}>
            {side === 'left' && imageElement}
            <div className="flex-1">
                <h2 className={cn("mb-10 leading-snug space-y-5", {
                    'text-3xl sm:text-4xl lg:text-5xl': text && img,
                    'text-3xl sm:text-4xl lg:text-5xl lg:mx-[20%] mx-[2%]': !img 
                })} style={{ lineHeight: "1.2" }}>
                    {title}
                </h2>
                {text && (
                    <p className={cn("sm:text-lg lg:text-xl text-[#1c1c1e] md:mb-0 mb-5", {
                        'lg:mx-[20%] mx-[2%]': !img
                    })}>
                        {text}
                    </p>
                )}
                {text2 && (
                    <p className={cn("mt-5 sm:text-lg lg:text-xl text-[#1c1c1e] md:mb-0 mb-5", {
                        'lg:mx-[20%] mx-[2%]': !img
                    })}>
                        {text2}
                    </p>
                )}
            </div>
            {side === 'right' && imageElement}
        </div>
    )
}