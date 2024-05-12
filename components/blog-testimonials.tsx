import { Testimonials } from "./testimonials";

interface BlogTestimonialsProps {
    title: string;
    text?: string;
}

export const BlogTestimonials = ({
    title,
    text,
}: BlogTestimonialsProps) => {
    return (
        <div className="bg-blur-background bg-cover py-24 mt-[3%]">
            <div className="flex flex-col xl:mx-[10%] lg:mx-[7%] md:mx-[5%] mx-[5%] md:flex-row items-center my-10 md:space-x-20 xl:space-x-30 text-white text-center">
                <div className="flex-1">
                    <h3 className="mb-10 leading-snug space-y-5 text-4xl lg:text-6xl my-10 lg:mx-[15%] mx-[2%] text-shadow">
                        {title}
                    </h3>
                    <p className="text-xl lg:text-2xl text-white lg:mx-[20%] mx-[2%]">
                        {text}
                    </p>
                </div>
            </div>
            <Testimonials />
        </div>
    )
}