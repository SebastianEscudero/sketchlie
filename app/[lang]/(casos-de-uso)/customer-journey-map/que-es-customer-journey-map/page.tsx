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
import customerJourneyMapTranslations from "@/public/locales/customer-journey-map/que-es-customer-journey-map";
import { Language } from "@/types/canvas";

// Generate metadata for the page
export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
    const lang = params.lang;
    return customerJourneyMapTranslations[lang as Language].metadata;
}

const LandingPage = ({ params }: { params: { lang: string } }) => {
    const lang = params.lang;
    const t = customerJourneyMapTranslations[lang as Language];

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
                            <Link href={`/${lang}/customer-journey-map/`} title={t.breadcrumbs.customerJourneyMap}>{t.breadcrumbs.customerJourneyMap}</Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage className="text-white">{t.breadcrumbs.completeGuide}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <div className="md:flex mt-10 items-center justify-between">
                <h1 className="lg:text-6xl md:text-5xl text-4xl md:px-5 md:text-left text-center" style={{ lineHeight: "1.2" }}>
                    {t.hero.title}
                </h1>
                <Image
                    src="/placeholders/customer-journey-map.png"
                    alt={t.hero.title}
                    width={1920}
                    height={1080}
                    className="rounded-2xl border border-black md:max-w-[60%] md:mt-0 mt-10"
                />
            </div>
            <p className="text-xl mt-5 mb-10">
                {t.hero.description}
            </p>
            <div className="flex flex-col-reverse lg:flex-row justify-between mt-[3%]">
                <div className="lg:max-w-[70%] text-xl">
                    {t.sections.map((section) => (
                        <div key={section.id}>
                            <div id={section.id} className="h-[80px] mt-[-80px]"></div>
                            <h2 className="text-4xl md:text-5xl mb-10">{section.title}</h2>
                            {section.content.map((content, index) => (
                                typeof content === 'string' 
                                    ? <p key={index} className="mb-10">{content}</p>
                                    : <ul key={index} style={{ listStyleType: 'disc' }}>
                                        {content.map((item, i) => (
                                            <li key={i} className="mb-5 ml-5">{item}</li>
                                        ))}
                                      </ul>
                            ))}
                        </div>
                    ))}
                </div>
                <div className="lg:w-[30%] xl:ml-10 lg:ml-5 border border-black rounded-lg p-10 bg-white lg:sticky lg:z-30 lg:top-24 lg:h-[50%] lg:mb-0 mb-10">
                    <h3 className="text-2xl mb-3">
                        {t.sections.map((section, index) => (
                            <li key={index} className="mb-4">
                                <Link href={`#${section.id}`} className="text-custom-blue hover:underline mb-10">
                                    {`${section.id}. ${section.title}`}
                                </Link>
                            </li>
                        ))}
                    </h3>
                </div>
            </div>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5 md:my-20 my-5">
                <BlogLinks blogTitle="Mapa Conceptual Online" blogImage="/placeholders/mapa-conceptual-online.png" blogHref="/mapa-conceptual/" blogDescription="Descubre cómo desatar tu creatividad y potenciar la colaboración en tiempo real con Sketchlie." />
                <BlogLinks blogTitle="Mapa de Procesos" blogImage="/placeholders/mapa-de-procesos.png" blogHref="/mapas-de-procesos" blogDescription="El mapa de procesos ayuda a los equipos a mapear y implementar mejoras. Registrate hoy con una 3 espacios de trabajo gratuitos para empezar a utilizar la mejor herramienta de mapa de procesos." />
                <BlogLinks blogTitle="Mapas Mentales" blogImage="/placeholders/mapa-mental.png" blogHref="/mapa-mental-online/" blogDescription="Explora nuestras herramientas para simplificar la creación de mapas mentales. Organiza tus ideas de manera jerárquica y potencia tu creatividad con nuestro intuitivo creador de mapas mentales." />
            </div>
        </div>
    );
}

export default LandingPage;