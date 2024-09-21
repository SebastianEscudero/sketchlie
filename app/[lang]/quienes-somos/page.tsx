import { BlogStructure } from "@/components/blog-structure";
import { Metadata } from "next";
import { BlogSection } from "@/components/blog-section";
import { LogoSlider } from "@/components/logo-slider";
import { FaqSection } from "@/components/faq-section";
import { LandingVideo } from "@/components/landing-video";
import { HowToCreate } from "@/components/how-to-create";
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
import { BlogLinks } from "@/components/blog-links";
import { Language } from "@/types/canvas";
import { quienesSomosTranslations } from "@/public/locales/quienes-somos";

export async function generateMetadata({ params }: { params: { lang: Language } }): Promise<Metadata> {
    const lang = params.lang;
    const t = quienesSomosTranslations[lang];

    return {
        title: t.metadata.title,
        description: t.metadata.description,
        keywords: t.metadata.keywords,
        alternates: {
            canonical: `https://www.sketchlie.com/${lang}/quienes-somos/`,
        },
    };
}

const LandingPage = ({ params }: { params: { lang: Language } }) => {
    const lang = params.lang;
    const t = quienesSomosTranslations[lang];

    return (
        <div>
            <Breadcrumb className="xl:px-[15%] lg:px-[7%] md:px-[5%] px-[5%] pt-5 bg-blue-600">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <Link href="/" title={t.breadcrumb.home}>{t.breadcrumb.home}</Link>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage className="text-white">{t.breadcrumb.aboutUs}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <BlogStructure
                title={t.title}
                description={t.description}
                cta={t.cta}
                alt="Sketchlie team collaborating"
                img="/placeholders/customer-journey-map.png"
            />
            
            <BlogSection
                title={t.sections.mission.title}
                text={t.sections.mission.text}
                alt="Sketchlie Mission"
                img="/placeholders/diagrama-ishikawa.png"
                side="right"
            />
            <BlogSection
                title={t.sections.team.title}
                text={t.sections.team.text}
                alt="Sketchlie Team"
                img="/placeholders/linea-de-tiempo.png"
                side="right"
            />
            <BlogSection
                title={t.sections.technology.title}
                text={t.sections.technology.text}
                alt="Sketchlie Technology"
                img="/placeholders/mapa-mental.png"
                side="right"
            />
            <BlogSection
                title={t.sections.impact.title}
                text={t.sections.impact.text}
                img="/placeholders/mapa-de-procesos.png"
                side="right"
            />
            <HowToCreate steps={t.trajectory.steps} title={t.trajectory.title} img="/templates/mapa-de-proceso.png" alt="Sketchlie Trajectory" cta={t.trajectory.cta}/>
            <TemplatesSlider />
            <div className="mt-10 mb-20">
                <PlatformYouCanTrust lang={lang}/>
            </div>
            <FaqSection accordionData={t.faq.items} sectionTitle={t.faq.title} />
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5 md:my-20 my-5 xl:px-[15%] lg:px-[7%] md:px-[5%] px-[5%]">
                <BlogLinks blogTitle={t.blogLinks[0].title} blogImage="/placeholders/mapa-conceptual-online.png" blogHref={`/${lang}/mapa-conceptual/`} blogDescription={t.blogLinks[0].description} />
                <BlogLinks blogTitle={t.blogLinks[1].title} blogImage="/placeholders/mapa-de-procesos.png" blogHref={`/${lang}/mapas-de-procesos/`} blogDescription={t.blogLinks[1].description} />
                <BlogLinks blogTitle={t.blogLinks[2].title} blogImage="/placeholders/mapa-mental.png" blogHref={`/${lang}/mapa-mental-online/`} blogDescription={t.blogLinks[2].description} />
            </div>
        </div>
    );
}

export default LandingPage;