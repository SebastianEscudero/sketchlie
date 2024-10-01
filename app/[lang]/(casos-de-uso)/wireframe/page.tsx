import { BlogStructure } from "@/components/blog-structure";
import { Metadata } from "next";
import { BlogSection } from "@/components/blog-section";
import { FaqSection } from "@/components/faq-section";
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
import { PlatformYouCanTrust } from "@/components/platform-you-can-trust";
import { Language } from "@/types/canvas";
import { wireframeTranslations } from "@/public/locales/wireframe/wireframe";

export async function generateMetadata({ params: { lang } }: { params: { lang: Language } }): Promise<Metadata> {
    const t = wireframeTranslations[lang];
    return t.metadata;
}

const Wireframe = ({ params: { lang } }: { params: { lang: Language } }) => {
    const t = wireframeTranslations[lang];

    return (
        <div>
            <Breadcrumb className="xl:px-[15%] lg:px-[7%] md:px-[5%] px-[5%] pt-5 bg-amber-50">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <Link href={`/${lang}`} title={t.breadcrumbs.home}>{t.breadcrumbs.home}</Link>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage className="text-black">{t.breadcrumbs.wireframe}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <BlogStructure
                title={t.blogStructure.title}
                description={t.blogStructure.description}
                cta={t.blogStructure.cta}
                alt={t.blogStructure.alt}
                img="/placeholders/lluvia-de-ideas.png"
            />
            
            {t.blogSections.map((section, index) => (
                <BlogSection
                    key={index}
                    title={section.title}
                    text={section.text}
                    alt={section.alt}
                    img={section.img}
                    side="right"
                />
            ))}
            <HowToCreate steps={t.howToCreate.steps} title={t.howToCreate.title} img="/templates/wireframe.png" alt={t.howToCreate.alt} cta={t.howToCreate.cta}/>
            <TemplatesSlider />
            <div className="mt-10 mb-20">
                <PlatformYouCanTrust lang={lang}/>
            </div>
            <FaqSection accordionData={t.faqSection.data} sectionTitle={t.faqSection.title} />
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 xl:px-[15%] lg:px-[7%] md:px-[5%] px-[5%] gap-5 md:my-10 my-5">
                {t.verMas.map((item, index) => (
                    <VerMas key={index} title={item.title} href={item.href} />
                ))}
            </div>
        </div>
    );
}

export default Wireframe;