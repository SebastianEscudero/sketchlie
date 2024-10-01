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
import { diagramaIshikawaTranslations } from "@/public/locales/diagrama-ishikawa/diagrama-ishikiawa";

export async function generateMetadata({ params }: { params: { lang: Language } }): Promise<Metadata> {
    const lang = params.lang;
    return diagramaIshikawaTranslations[lang].metadata;
}

const LandingPage = ({ params }: { params: { lang: Language } }) => {
    const lang = params.lang;
    const t = diagramaIshikawaTranslations[lang];

    return (
        <div>
            <Breadcrumb className="xl:px-[15%] lg:px-[7%] md:px-[5%] px-[5%] pt-5 bg-amber-50">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <Link href={`/${lang}`} title={t.breadcrumbs.home}>{t.breadcrumbs.home}</Link>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage className="text-black">{t.breadcrumbs.diagramaIshikawa}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <BlogStructure
                title={t.blogStructure.title}
                description={t.blogStructure.description}
                cta={t.blogStructure.cta}
                alt={t.blogStructure.alt}
                img="/placeholders/diagrama-ishikawa.png"
            />
            
            <div className="mb:my-28 my-14">
                <BlogSection
                    title={t.blogSections[0].title}
                    text={t.blogSections[0].text}
                />
            </div>
            <BlogSection
                title={t.blogSections[1].title}
                text={t.blogSections[1].text}
                alt={t.blogSections[1].alt}
                img="/templates/diagrama-ishikawa.png"
                side="right"
            />
            <BlogSection
                title={t.blogSections[2].title}
                text={t.blogSections[2].text}
                alt={t.blogSections[2].alt}
                img="/placeholders/improve-performance.png"
                side="right"
            />
            <BlogSection
                title={t.blogSections[3].title}
                text={t.blogSections[3].text}
                alt={t.blogSections[3].alt}
                img="/placeholders/diagrama-de-flujo.png"
                side="right"
            />
            <HowToCreate 
                steps={t.howToCreate.steps} 
                title={t.howToCreate.title} 
                img="/templates/diagrama-ishikawa.png" 
                alt={t.howToCreate.alt} 
                cta={t.howToCreate.cta}
            />
            <TemplatesSlider />
            <div className="my-20">
                <PlatformYouCanTrust lang={lang}/>
            </div>
            <FaqSection accordionData={t.faq.questions} sectionTitle={t.faq.sectionTitle} />
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 xl:px-[15%] lg:px-[7%] md:px-[5%] px-[5%] gap-5 md:my-10 my-5">
                {t.verMas.map((item, index) => (
                    <VerMas key={index} title={item.title} href={item.href} />
                ))}
            </div>
        </div>
    );
}

export default LandingPage;