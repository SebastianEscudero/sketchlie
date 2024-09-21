"use client";

import { BlogSection } from "./blog-section";
import { PlatformYouCanTrust } from "./platform-you-can-trust";
import { BlogLinks } from "./blog-links";
import { TemplatesSlider } from "./templates-slider";
import landingContentTranslations from '@/public/locales/landing-content';
import { Language } from '@/types/canvas';

export const LandingContent = ({ lang }: { lang: any }) => {
    const t = landingContentTranslations[lang as Language];

    return (
        <div>
            <div id="about" className="md:my-14 lg:my-16 my-10">
                <BlogSection
                    alt="Landing"
                    title={t.section1.title}
                />
            </div>
            <BlogSection
                alt="Mapa de Proceso"
                title={t.section2.title}
                text={t.section2.text}
                img="/placeholders/mapa-de-procesos.png"
                side="right"
            />
            <BlogSection
                title={t.section3.title}
                text={t.section3.text}
                alt="Diagrama de Flujo"
                img="/placeholders/diagrama-de-flujo.png"
                side="right"
            />
            <BlogSection
                title={t.section4.title}
                text={t.section4.text}
                alt="Mapa mental"
                img="/placeholders/mapa-mental.png"
                side="right"
            />
            <TemplatesSlider />
            <div className="my-20">
                <PlatformYouCanTrust lang={lang}/>
            </div>  
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 xl:px-[15%] lg:px-[7%] md:px-[5%] px-[5%] gap-5 my-10">
                <BlogLinks blogTitle={t.blogLinks.link1.title} blogImage="/placeholders/mapa-conceptual-online.png" blogHref="/blog/mapa-conceptual/" blogDescription={t.blogLinks.link1.description} isNew={true} />
                <BlogLinks blogTitle={t.blogLinks.link2.title} blogImage="/placeholders/pizarra-online.png" blogHref="/blog/pizarra-online/" blogDescription={t.blogLinks.link2.description} isNew={true} />
                <BlogLinks blogTitle={t.blogLinks.link3.title} blogImage="/placeholders/wireframe.png" blogHref="/blog/wireframes-online/" blogDescription={t.blogLinks.link3.description} isNew={true} />
            </div>
        </div>
    )
}