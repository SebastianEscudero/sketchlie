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
import { Language } from "@/types/canvas";
import { translations } from "@/public/locales/diagrama/que-es-diagrama";

export async function generateMetadata({ params }: { params: { lang: Language } }): Promise<Metadata> {
    const lang = params.lang;
    const t = translations[lang];

    return {
        title: t.metadata.title,
        description: t.metadata.description,
        keywords: t.metadata.keywords,
        alternates: {
            canonical: `https://www.sketchlie.com/${lang}/diagrama/que-es-diagrama/`,
        },
    };
}

const LandingPage = ({ params }: { params: { lang: Language } }) => {
    const lang = params.lang
    const t = translations[lang];

    return (
        <div className="xl:mx-[5%] lg:mx-[4%] md:mx-[3%] mx-[3%] text-black">
            <div className="mt-[3%]">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <Link href="/" title="Home">{t.breadcrumb.home}</Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <Link href={`/${lang}/diagrama/`} title="Diagrama">{t.breadcrumb.diagram}</Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage className="text-white">{t.breadcrumb.whatIsDiagram}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <div className="md:flex mt-10 items-center justify-between">
                <h1 className="lg:text-6xl md:text-5xl text-4xl md:px-5 md:text-left text-center" style={{ lineHeight: "1.2" }}>
                    {t.mainTitle}
                </h1>
                <Image
                    src="/placeholders/diagrama-de-flujo.png"
                    alt="Diagrama"
                    width={1920}
                    height={1080}
                    className="rounded-2xl border border-black md:max-w-[60%] md:mt-0 mt-10"
                    loading="eager"
                />
            </div>
            <div className="flex flex-col-reverse lg:flex-row justify-between mt-[3%]">
                <div className="lg:max-w-[70%] text-xl">
                    <p className="mb-10">{t.intro}</p>

                    {t.sections.map((section: any, index: number) => (
                        <div key={index}>
                            <div id={`${index + 1}`} className="h-[80px] mt-[-80px]"></div>
                            <h2 className="text-4xl md:text-5xl mb-10">{section.title}</h2>
                            <p className="mb-10">{section.content}</p>

                            {section.items && (
                                <ul style={{ listStyleType: 'disc' }}>
                                    {section.items.map((item: any, itemIndex: number) => (
                                        <li key={itemIndex} className="mb-10 ml-5">
                                            <strong>{item.title}</strong> {item.content}{' '}
                                            {item.href && item.link && (
                                                <Link className="text-custom-blue hover:underline"  href={`/${lang}${item.href}`}>
                                                    {item.link}
                                                </Link>
                                            )}
                                            .
                                        </li>
                                    ))}
                                </ul>
                            )}

                            {section.quote && (
                                <blockquote className="border-l-4 border-custom-blue pl-4 italic mb-10">
                                    {section.quote}
                                </blockquote>
                            )}

                            {section.extra && (
                                <p className="mb-10">
                                    {section.extra}{' '}
                                    {section.href && section.link && (
                                        <Link className="text-custom-blue hover:underline"  href={`/${lang}${section.href}`}>
                                            {section.link}
                                        </Link>
                                    )}
                                    .
                                </p>
                            )}

                            {section.links && (
                                <p className="mb-10">
                                    {section.extra}{' '}
                                    {section.links.map((link: any, linkIndex: number) => (
                                        <span key={linkIndex}>
                                            {link.href && (
                                                <Link className="text-custom-blue hover:underline" href={`/${lang}${link.href}`}>
                                                    {link.text}
                                                </Link>

                                            )}
                                            {linkIndex < section.links.length - 1 ? ' and ' : '.'}
                                        </span>
                                    ))}
                                </p>
                            )}
                        </div>
                    ))}

                    <p className="mb-10">{t.conclusion}</p>
                </div>
                <div className="lg:w-[30%] xl:ml-10 lg:ml-5 border border-black rounded-lg p-10 bg-white lg:sticky lg:z-30 lg:top-24 lg:h-[50%] lg:mb-0 mb-10">
                    <h3 className="text-2xl mb-3">
                        {t.index}
                    </h3>
                    <ul style={{ listStyleType: 'none' }}>
                        {t.sections.map((section, index) => (
                            <li key={index} className="mb-4">
                                <Link href={`/${lang}#${index + 1}`} className="text-custom-blue hover:underline mb-10">{section.title}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5 md:my-20 my-5">
                {t.blogLinks.map((blog, index) => (
                    <BlogLinks key={index} blogTitle={blog.title} blogImage={blog.image} blogHref={blog.href} blogDescription={blog.description} />
                ))}
            </div>
        </div>
    );
}

export default LandingPage;