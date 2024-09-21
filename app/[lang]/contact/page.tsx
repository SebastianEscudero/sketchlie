import { Metadata } from "next";
import Link from "next/link";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import ContactForm from "./form";
import { contactPageTranslations } from "@/public/locales/contact/contact-page";
import { Language } from "@/types/canvas";

export async function generateMetadata({ params }: { params: { lang: Language } }): Promise<Metadata> {
    const lang = params.lang;
    const t = contactPageTranslations[lang];

    return {
        title: t.metadata.title,
        description: t.metadata.description,
        keywords: t.metadata.keywords,
        alternates: {
            canonical: `https://www.sketchlie.com/${lang}/contact/`,
        },
    };
}

const ContactPage = ({ params }: { params: { lang: Language } }) => {
    const lang = params.lang;
    const t = contactPageTranslations[lang];

    return (
        <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
            <Breadcrumb className="xl:mx-[15%] lg:mx-[5%] mx-[2%] pt-5">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <Link href="/" title={t.breadcrumb.home}>{t.breadcrumb.home}</Link>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>{t.breadcrumb.contact}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="flex flex-col justify-center items-center py-16 xl:mx-[15%] lg:mx-[5%] mx-[2%]">
                <h1 className="text-4xl font-bold text-center mb-4">{t.title}</h1>
                <p className="text-xl text-gray-600 text-center mb-8">{t.subtitle}</p>
                <ContactForm lang={lang} />
            </div>
        </div>
    );
}

export default ContactPage;