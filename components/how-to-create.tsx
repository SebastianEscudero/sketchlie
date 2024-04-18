import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

interface StepItem {
    trigger: string;
    text: string;
  }

interface BlogSectionProps {
    steps: StepItem[];
    title: string;
}

export const HowToCreate = ({
    steps,
    title,
}: BlogSectionProps) => {
    return (
        <div className={`bg-[#fff] rounded-lg border border-black xl:mx-[10%] lg:mx-[7%] md:mx-[5%] mx-[5%] text-[#1c1c1e] p-4`}>
            <h2 className="text-3xl lg:text-4xl xl:text-5xl text-center my-8">
                {title}
            </h2>
            <Accordion type="single" collapsible className="bg-white p-5 rounded-lg">
                {steps.map(item => (
                    <AccordionItem value={item.trigger} key={item.trigger}>
                        <AccordionTrigger className="my-3 text-lg md:text-xl xl:text-2xl">{item.trigger}</AccordionTrigger>
                        <AccordionContent className="px-4 text-lg md:text-xl xl:text-2xl" style={{ whiteSpace: 'pre-line' }}>
                            <p>{item.text}</p>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    )
}