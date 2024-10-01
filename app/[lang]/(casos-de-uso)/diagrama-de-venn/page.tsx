import { Metadata } from "next";
import { BlogStructure } from "@/components/blog-structure";
import { BlogSection } from "@/components/blog-section";
import { FaqSection } from "@/components/faq-section";
import { HowToCreate } from "@/components/how-to-create";
import { PlatformYouCanTrust } from "@/components/platform-you-can-trust";
import { VerMas } from "@/components/ver-mas";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import Link from "next/link";
import { TemplatesSlider } from "@/components/templates-slider";
import { diagramaDeVennContentTranslations } from "@/public/locales/diagrama-de-venn/diagrama-de-venn";
import { Language } from "@/types/canvas";

export async function generateMetadata({ params: { lang } }: { params: { lang: Language } }): Promise<Metadata> {
    const t = diagramaDeVennContentTranslations[lang];
    return t.metadata;
}

const LandingPage = ({ params: { lang } }: { params: { lang: Language } }) => {
    const t = diagramaDeVennContentTranslations[lang];

    return (
        <div>
            <Breadcrumb className="xl:px-[15%] lg:px-[7%] md:px-[5%] px-[5%] pt-5 bg-amber-50">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <Link href="/" title={t.breadcrumb.home}>{t.breadcrumb.home}</Link>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage className="text-black">{t.breadcrumb.vennDiagram}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <BlogStructure
                title={t.blogStructure.title}
                description={t.blogStructure.description}
                cta={t.blogStructure.cta}
                alt={t.blogStructure.alt}
                img="/placeholders/diagrama-de-venn.png"
            />
            
            <div className="mb:my-28 my-14">
                <BlogSection
                    title={t.sections[0].title}
                    text={t.sections[0].text}
                />
            </div>
            {t.sections.slice(1).map((section, index) => (
                <BlogSection
                    key={index}
                    title={section.title}
                    text={section.text}
                    alt={section.alt}
                    img={section.img}
                    side="right"
                />
            ))}
            <HowToCreate steps={t.howToCreate.steps} title={t.howToCreate.title} img="/templates/diagrama-de-venn.png" alt={t.howToCreate.alt} cta={t.howToCreate.cta}/>
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