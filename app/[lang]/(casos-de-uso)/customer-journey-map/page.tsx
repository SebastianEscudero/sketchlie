import { BlogStructure } from "@/components/blog-structure";
import { Metadata } from "next";
import { BlogSection } from "@/components/blog-section";
import { FaqSection } from "@/components/faq-section";
import { PlatformYouCanTrust } from "@/components/platform-you-can-trust";
import { HowToCreate } from "@/components/how-to-create";
import { VerMas } from "@/components/ver-mas";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Link from "next/link";
import { TemplatesSlider } from "@/components/templates-slider";
import { Language } from "@/types/canvas";
import customerJourneyMapContentTranslations from "@/public/locales/customer-journey-map/customer-journey-map";

export async function generateMetadata({ params: { lang } }: { params: { lang: Language } }): Promise<Metadata> {
    const t = customerJourneyMapContentTranslations[lang];
    
    return {
        title: t.metadata.title,
        description: t.metadata.description,
        keywords: t.metadata.keywords,
        alternates: {
            canonical: `https://www.sketchlie.com/${lang}/customer-journey-map/`,
        }
    };
}

const LandingPage = ({ params: { lang } }: { params: { lang: Language } }) => {
    const t = customerJourneyMapContentTranslations[lang as Language];
    const steps = t.howToCreate.steps;

    const faqData = t.faqSection.faq.map((item, index) => ({
        value: `item-${index + 1}`,
        trigger: item.question,
        content: item.answer
    }));

    return (
        <div>
            <Breadcrumb className="xl:px-[15%] lg:px-[7%] md:px-[5%] px-[5%] pt-5 bg-amber-50">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <Link href={`/${lang}`} title={t.breadcrumb.home}>{t.breadcrumb.home}</Link>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage className="text-black">{t.breadcrumb.customerJourneyMap}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <BlogStructure
                title={t.blogStructure.title}
                description={t.blogStructure.description}
                cta={t.blogStructure.cta}
                alt={t.blogStructure.alt}
                img="/placeholders/customer-journey-map.png"
            />
            
            <BlogSection
                title={t.section1.title}
                text={
                    <>
                        {t.section1.text} <Link href={`/${lang}/plantillas/customer-journey-map/`} className="text-custom-blue hover:underline">{t.section1.linkText}</Link>.
                    </>
                }
                text2={t.section1.text2}
                alt={t.section1.alt}
                img="/placeholders/lluvia-de-ideas.png"
                side="right"
            />
            <BlogSection
                title={t.section2.title}
                text={t.section2.text}
                alt={t.section2.alt}
                img="/placeholders/mapa-mental.png"
                side="right"
            />
            <BlogSection
                title={t.section3.title}
                text={t.section3.text}
                alt={t.section3.alt}
                img="/placeholders/improve-performance.png"
                side="right"
            />
            <BlogSection
                title={t.section4.title}
                text={t.section4.text}
                alt={t.section4.alt}
                img="/placeholders/pizarra-online.png"
                side="right"
            />
            <HowToCreate 
                steps={steps} 
                title={t.howToCreate.title} 
                img="/templates/customer-journey-map.png" 
                alt={t.howToCreate.alt} 
                cta={t.howToCreate.cta}
            />
            <TemplatesSlider />
            <div className="my-20">
                <PlatformYouCanTrust lang={lang}/>
            </div>
            <FaqSection accordionData={faqData} sectionTitle={t.faqSection.title} />
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 xl:px-[15%] lg:px-[7%] md:px-[5%] px-[5%] gap-5 md:my-10 my-5">
                {t.verMas.map((item, index) => (
                    <VerMas 
                        key={index}
                        title={item.title} 
                        href={`/${lang}/customer-journey-map/que-es-customer-journey-map/`} 
                    />
                ))}
            </div>
        </div>
    );
}

export default LandingPage;