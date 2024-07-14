import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "./ui/button";
import Link from "next/link";

interface StepItem {
    trigger: string;
    text: string | React.ReactNode;
}

interface BlogSectionProps {
    steps: StepItem[];
    title: string;
    img: string;
    alt: string;
    cta: string;
}

export const HowToCreate = ({
    steps,
    title,
    img,
    alt,
    cta,
}: BlogSectionProps) => {
    return (
        <div className="pb-20">
            <div className="flex flex-col px-10 bg-white dark:bg-[#020817] lg:py-10 pb-10 rounded-lg border border-black dark:border-white xl:mx-[10%] mx-[2%] text-[#1c1c1e] dark:text-white p-4">
                <h2 className="px-8 text-4xl xl:text-5xl text-center lg:text-left mt-8 mb-3 lg:w-1/2">
                    {title}
                </h2>
                <div className="flex flex-col-reverse lg:flex-row">
                    <div className="w-full lg:w-1/2 flex flex-col justify-center">
                        <Accordion type="single" collapsible className= "p-5 rounded-lg">
                            {steps.map(item => (
                                <AccordionItem value={item.trigger} key={item.trigger} className="w-full">
                                    <AccordionTrigger className="my-3 text-lg md:text-xl xl:text-2xl">
                                        {item.trigger}
                                    </AccordionTrigger>
                                    <AccordionContent className="px-4 text-base md:text-lg xl:text-xl">
                                        {item.text}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                        <Link href={"/dashboard/"} title={cta} className="px-8">
                            <Button variant="auth" className="p-6 text-lg w-full md:w-auto">
                                {cta}
                            </Button>
                        </Link>
                    </div>
                    <div className="flex justify-center items-center rounded-md w-full lg:w-1/2 px-8 lg:pt-0 pt-5">
                        <img
                            src={img}
                            alt={alt}
                            className="w-full rounded-md border border-neutral-400"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}