import Marquee from "react-fast-marquee"

export const LogoSlider = () => {
    return (
        <div className="md:py-10 py-3 mx-0 h-full">
            <div className="h-[130px]">
                <Marquee
                    speed={50}
                    autoFill={true}
                >
                    <img src="/marquee/1.svg" alt="Brand Logo" width={50} height={50} className="m-[30px] filter grayscale w-[55px] h-auto" />
                    <img src="/marquee/2.svg" alt="Brand Logo" width={50} height={50} className="m-[30px] filter grayscale w-[55px] h-auto" />
                    <img src="/marquee/3.svg" alt="Brand Logo" width={50} height={50} className="m-[30px] filter grayscale w-[55px] h-auto" />
                    <img src="/marquee/4.svg" alt="Brand Logo" width={50} height={50} className="m-[30px] filter grayscale w-[55px] h-auto" />
                    <img src="/marquee/5.svg" alt="Brand Logo" width={50} height={50} className="m-[30px] filter grayscale w-[55px] h-auto" />
                    <img src="/marquee/6.svg" alt="Brand Logo" width={50} height={50} className="m-[30px] filter grayscale w-[55px] h-auto" />
                    <img src="/marquee/7.svg" alt="Brand Logo" width={50} height={50} className="m-[30px] filter grayscale w-[55px] h-auto" />
                    <img src="/marquee/8.svg" alt="Brand Logo" width={50} height={50} className="m-[30px] filter grayscale w-[55px] h-auto" />
                    <img src="/marquee/9.svg" alt="Brand Logo" width={50} height={50} className="m-[30px] filter grayscale w-[55px] h-auto" />
                </Marquee>
            </div>
        </div>
    )
}