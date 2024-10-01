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
import { diagramaDeFlujoQueEsTranslation } from "@/public/locales/diagrama-de-flujo/que-es-diagrama-de-flujo";
import { Language } from "@/types/canvas";

export async function generateMetadata({ params: { lang } }: { params: { lang: Language } }): Promise<Metadata> {
    const t = diagramaDeFlujoQueEsTranslation[lang];
    return {
        title: t.metadata.title,
        description: t.metadata.description,
        keywords: t.metadata.keywords,
        alternates: {
            canonical: `https://www.sketchlie.com/${lang}/diagrama-de-flujo/que-es-diagrama-de-flujo/`,
        },
    };
}

export default function LandingPage({ params: { lang } }: { params: { lang: Language } }) {
    const t = diagramaDeFlujoQueEsTranslation[lang];

    return (
        <div className="xl:mx-[5%] lg:mx-[4%] md:mx-[3%] mx-[3%] text-black">
            <div className="mt-[3%]">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <Link href={`/${lang}`} title={t.breadcrumb.home}>{t.breadcrumb.home}</Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <Link href={`/${lang}/diagrama-de-flujo/`} title={t.breadcrumb.flowchart}>{t.breadcrumb.flowchart}</Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage className="text-black">{t.breadcrumb.whatIsFlowchart}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <div className="md:flex mt-10 items-center justify-between">
                <h1 className="lg:text-6xl md:text-5xl text-4xl md:px-5 md:text-left text-center" style={{ lineHeight: "1.2" }}>
                    {t.mainTitle}
                </h1>
                <Image
                    src="/placeholders/mapa-conceptual.png"
                    alt={t.mainTitle}
                    width={1920}
                    height={1080}
                    className="rounded-2xl border border-black md:max-w-[60%] md:mt-0 mt-10"
                />
            </div>
            <div className="flex flex-col-reverse lg:flex-row justify-between mt-[3%]">
                <div className="lg:max-w-[70%] text-xl">
                    <p className="mb-10">{t.intro}</p>
                    {t.sections.map((section, index) => (
                        <div key={index} id={`${index + 1}`}>
                            <h2 className="text-4xl md:text-5xl mb-10">{section.title}</h2>
                            <p className="mb-10">{section.content}</p>
                            {section.items && (
                                <ul style={{ listStyleType: 'disc' }}>
                                    {section.items.map((item, itemIndex) => (
                                        <li key={itemIndex} className="mb-10 ml-5">
                                            <strong>{item.title}</strong> {item.content}
                                        </li>
                                    ))}
                                </ul>
                            )}
                            {section.extra && <p className="mb-10">{section.extra}</p>}
                            {section.extra2 && <p className="mb-10">{section.extra2}</p>}
                        </div>
                    ))}
                </div>
                <div className="lg:w-[30%] xl:ml-10 lg:ml-5 border border-black rounded-lg p-10 bg-white lg:sticky lg:z-30 lg:top-24 lg:h-[50%] lg:mb-0 mb-10">
                    <h3 className="text-2xl mb-3">
                        {t.index}
                    </h3>
                    <ul>
                        {t.sections.map((section, index) => (
                            <li key={index} className="mb-4">
                                <Link href={`#${index + 1}`} className="text-custom-blue hover:underline mb-10">{section.title}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5 md:my-20 my-5">
                {t.blogLinks.map((blog, index) => (
                    <BlogLinks 
                        key={index} 
                        blogTitle={blog.title} 
                        blogImage={blog.image} 
                        blogHref={blog.href} 
                        blogDescription={blog.description} 
                    />
                ))}
            </div>
        </div>
    );
}