import { Metadata } from "next";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Image from "next/image";
import Link from "next/link";
import { BlogLinks } from "@/components/blog-links";
import { QueEsLineaDeTiempoTranslation } from "@/public/locales/linea-de-tiempo/que-es-linea-de-tiempo";
import { Language } from "@/types/canvas";
import React from "react";

export async function generateMetadata({ params: { lang } }: { params: { lang: Language } }): Promise<Metadata> {
    const t = QueEsLineaDeTiempoTranslation[lang];
    return t.metadata;
}

const LandingPage = ({ params: { lang } }: { params: { lang: Language } }) => {
    const t = QueEsLineaDeTiempoTranslation[lang];

    return (
        <div className="xl:mx-[5%] lg:mx-[4%] md:mx-[3%] mx-[3%] text-black">
              <div className="mt-[3%]">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <Link href={`/${lang}`} title={t.breadcrumbs.home}>{t.breadcrumbs.home}</Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <Link href={`/${lang}/linea-de-tiempo/`} title={t.breadcrumbs.lineaDeTiempo}>{t.breadcrumbs.lineaDeTiempo}</Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage className="text-black">{t.breadcrumbs.queEsLineaDeTiempo}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <div className="md:flex mt-10 items-center justify-between">
                <h1 className="lg:text-6xl md:text-5xl text-4xl md:px-5 md:text-left text-center" style={{ lineHeight: "1.2" }}>
                    {t.title}
                </h1>
                <Image
                    src="/placeholders/linea-de-tiempo.png"
                    alt={t.title}
                    width={1920}
                    height={1080}
                    className="rounded-2xl border border-black md:max-w-[60%] md:mt-0 mt-10"
                />
            </div>
            <div className="flex flex-col-reverse lg:flex-row justify-between mt-[3%]">
                <div className="lg:max-w-[70%] text-xl">
                    {t.sections.map((section) => (
                        <React.Fragment key={section.id}>
                            <div id={section.id} className="h-[80px] mt-[-80px]"></div>
                            <h2 className="text-4xl md:text-5xl mb-10">{section.title}</h2>
                            {section.content.map((paragraph, index) => (
                                <p key={index} className="mb-10">{paragraph}</p>
                            ))}
                        </React.Fragment>
                    ))}
                </div>
                <div className="lg:w-[30%] xl:ml-10 lg:ml-5 border border-black rounded-lg p-10 bg-white lg:sticky lg:z-30 lg:top-24 lg:h-[50%] lg:mb-0 mb-10">
                    <h3 className="text-2xl mb-3">
                        {lang === 'es' ? 'Índice' : lang === 'en' ? 'Index' : 'Índice'}
                    </h3>
                    <ul>
                        {t.sections.map((section) => (
                            <li key={section.id} className="mb-4">
                                <Link href={`#${section.id}`} className="text-custom-blue hover:underline mb-10">{section.title}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5 md:my-20 my-5">
                {t.blogLinks.map((link, index) => (
                    <BlogLinks
                        key={index}
                        blogTitle={link.title}
                        blogImage={link.image}
                        blogHref={link.href}
                        blogDescription={link.description}
                    />
                ))}
            </div>
        </div>
    );
}

export default LandingPage;