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
        <div className="bg-blur-background bg-cover font-normal py-24 mt-20">
            <div className="flex flex-col xl:mx-[10%] lg:mx-[7%] md:mx-[5%] mx-[5%] md:flex-row items-center my-10 md:space-x-20 xl:space-x-30 text-white text-center">
                <div className="flex-1">
                    <h3 className="mb-10 leading-snug space-y-5 text-3xl sm:text-4xl lg:text-5xl my-10 lg:mx-[20%] mx-[2%]">
                        {title}
                    </h3>
                    <p className="sm:text-lg lg:text-xl text-white] lg:mx-[20%] mx-[2%]">
                        {text}
                    </p>
                </div>
            </div>
            <Testimonials />
        </div>
    )
}