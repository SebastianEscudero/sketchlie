import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

interface FaqItem {
    value: string;
    trigger: string;
    content: string;
  }
  
  interface FaqSectionProps {
    accordionData: FaqItem[];
    sectionTitle: string;
  }

export const FaqSection = ({
    accordionData,
    sectionTitle,
}: FaqSectionProps) => {
    return (
        <div className="xl:mx-[10%] lg:mx-[7%] md:mx-[5%] mx-[5%] mb-10">
            <div className="my-10 font-normal text-[#1c1c1e]">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl sm:text-left text-center">
                    Preguntas frecuentes sobre {sectionTitle}.
                </h2>
            </div>
            <Accordion type="single" collapsible className="text-xl md:text-2xl bg-white p-3 mb-0 sm:mb-20 rounded-lg border border-black">
                {accordionData.map(item => (
                    <AccordionItem value={item.value} key={item.value}>
                        <AccordionTrigger className="my-3">{item.trigger}</AccordionTrigger>
                        <AccordionContent className="px-4 text-lg" style={{ whiteSpace: 'pre-line' }}>
                            {item.content}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    )
}