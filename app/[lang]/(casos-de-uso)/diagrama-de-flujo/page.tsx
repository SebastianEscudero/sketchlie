import { BlogStructure } from "@/components/blog-structure";
import { Metadata } from "next";
import { BlogSection } from "@/components/blog-section";
import { FaqSection } from "@/components/faq-section";
import { HowToCreate } from "@/components/how-to-create";
import { PlatformYouCanTrust } from "@/components/platform-you-can-trust";
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
import diagramaDeFlujoContentTranslations from "@/public/locales/diagrama-de-flujo/diagrama-de-flujo";

export async function generateMetadata({ params: { lang } }: { params: { lang: Language } }): Promise<Metadata> {
    const t = diagramaDeFlujoContentTranslations[lang];
    return {
        title: t.metadata.title,
        description: t.metadata.description,
        keywords: t.metadata.keywords,
        alternates: {
            canonical: `https://www.sketchlie.com/${lang}/diagrama-de-flujo/`,
        }
    };
}

const LandingPage = ({ params: { lang } }: { params: { lang: Language } }) => {
    const t = diagramaDeFlujoContentTranslations[lang];

    return (
        <div>
            <Breadcrumb className="xl:px-[15%] lg:px-[7%] md:px-[5%] px-[5%] pt-5 bg-blue-600">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <Link href="/" title={t.breadcrumb.home}>{t.breadcrumb.home}</Link>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage className="text-white">{t.breadcrumb.flowchart}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <BlogStructure
                title={t.blogStructure.title}
                description={t.blogStructure.description}
                cta={t.blogStructure.cta}
                alt={t.blogStructure.alt}
                img="/placeholders/diagrama-de-flujo.png"
            />
            
            <div className="mb:my-28 my-14">
                <BlogSection
                    title={t.section1.title}
                    text={t.section1.text}
                />
            </div>
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
                img="/placeholders/diagrama-de-flujo.png"
                side="right"
            />
            <BlogSection
                title={t.section5.title}
                text={t.section5.text}
                alt={t.section5.alt}
                img="/placeholders/pizarra-online.png"
                side="right"
            />
            <HowToCreate steps={t.howToCreate.steps} title={t.howToCreate.title} img="/templates/diagrama-de-flujo.png" alt={t.howToCreate.alt} cta={t.howToCreate.cta}/>
            <TemplatesSlider />
            <div className="my-20">
                <PlatformYouCanTrust lang={lang}/>
            </div>
            <FaqSection accordionData={t.faqSection.faq} sectionTitle={t.faqSection.title} />
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 xl:px-[15%] lg:px-[7%] md:px-[5%] px-[5%] gap-5 md:my-10 my-5">
                {t.verMas.map((item, index) => (
                    <VerMas key={index} title={item.title} href={item.href} />
                ))}
            </div>
        </div>
    );
}

export default LandingPage;