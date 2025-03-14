import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import React from "react";

interface FaqItem {
    value: string;
    trigger: string;
    content: string | React.ReactNode;
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
        <div className="xl:px-[15%] lg:px-[7%] md:px-[5%] px-[5%] mb-10">
            <div className="text-[#1c1c1e] mb-14 md:w-1/2">
                <h2 className="text-4xl lg:text-5xl sm:text-left text-center" style={{ lineHeight: 1.2 }}>
                    Preguntas frecuentes sobre {sectionTitle}.
                </h2>
            </div>
            <Accordion type="single" collapsible className="text-xl md:text-2xl bg-white p-3 mb-0 sm:mb-20 rounded-lg border border-black text-black">
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