import Image from "next/image"
import Marquee from "react-fast-marquee"

export const LogoSlider = () => {
    return (
        <div className="flex items-end mx-0 h-full py-16 justify-between">
            <div className="flex flex-col text-xs sm:text-base font-semibold text-zinc-400 py-4 whitespace-nowrap">
                <span>TRUSTED BY TEAMS</span>
                <span>AROUND THE WORLD</span>
            </div>
            <Marquee
                speed={50}
                autoFill={true}
                className="flex items-end space-x-8 ml-10"
            >
                <Image src="/marquee/universidad-chile.svg" alt="Universidad de Chile Logo" height={70} width={70} className="mx-[30px] grayscale h-[80px] w-auto" />
                <Image src="/marquee/sim.svg" alt="Brand Logo" width={70} height={70} className="mx-[30px] pt-8 pb-2 grayscale h-[80px] w-auto object-contain" />
                <Image src="/marquee/giphy-logo.svg" alt="Brand Logo" width={70} height={70} className="mx-[30px] pt-8 pb-2 grayscale h-[160px] w-auto" />
                <Image src="/marquee/pexels-logo.png" alt="Brand Logo" width={70} height={70} className="mx-[30px] pt-8 pb-2 grayscale h-[80px] w-auto" />
                <Image src="/marquee/5.svg" alt="Brand Logo" width={70} height={70} className="mx-[30px] pt-8 pb-2 grayscale h-[80px] w-auto" />
                <Image src="/marquee/6.svg" alt="Brand Logo" width={70} height={70} className="mx-[30px] pt-8 pb-2 grayscale h-[80px] w-auto" />
            </Marquee>
        </div>
    )
}