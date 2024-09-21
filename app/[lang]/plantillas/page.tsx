import { templates } from "@/app/dashboard/templates/templates";
import { BlogStructure } from "@/components/blog-structure";
import { TemplateLink } from "@/components/template-link";
import { Metadata } from "next";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Link from "next/link";
import templatesPageTranslations from "@/public/locales/templates-page";

const templatesPage = () => {
    const t = templatesPageTranslations["es"];

    return (
        <div>
            <Breadcrumb className="xl:px-[15%] lg:px-[7%] md:px-[5%] px-[5%] pt-5 bg-blue-600">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <Link href="/" title={t.breadcrumbHome}>{t.breadcrumbHome}</Link>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage className="text-white">{t.breadcrumbTemplates}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <BlogStructure
                title={t.structureTitle}
                description={t.structureDescription}
                img="/templates/diagrama-ishikawa.png"
                alt={t.structureTitle}
                cta={t.structureCta}
            />
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 xl:px-[15%] lg:px-[7%] md:px-[5%] px-[5%] gap-5 mt-[3%]">
                {templates.map((template, index) => (
                    <TemplateLink
                        key={index}
                        name={template.name}
                        image={template.image}
                        href={template.href}
                    />
                ))}
            </div>
        </div>
    )
}

export default templatesPage

export const metadata: Metadata = {
    title: templatesPageTranslations.es.title,
    description: templatesPageTranslations.es.description,
    keywords: templatesPageTranslations.es.keywords,
    alternates: {
        canonical: "https://www.sketchlie.com/plantillas/",
    }
};