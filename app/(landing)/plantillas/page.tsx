import { templates } from "@/app/dashboard/templates/templates";
import { BlogStructure } from "@/components/blog-structure";
import { LogoSlider } from "@/components/logo-slider";
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

export const metadata: Metadata = {
    title: "Plantillas de Sketchlie | 30+ Elige tu plantilla",
    description: "Elige entre más de 30 plantillas de Sketchlie para crear mapas mentales, mapas conceptuales, diagramas de flujo, wireframes, mapas de procesos y más.",
    keywords: ["sketchlie plantillas", "plantillas", "plantilla de mapa conceptual", "plantilla de mapa mental", "plantilla de diagrama de flujo", "plantilla de wireframe", "plantilla de mapa de procesos", "plantilla de pizarra online", "plantilla de lluvia de ideas", "plantilla de customer journey map", "plantilla de diagrama", "plantilla de pizarra online", "plantilla de lluvia de ideas", "plantilla de customer journey map", "plantilla de diagrama", "plantilla de pizarra online", "plantilla de lluvia de ideas", "plantilla de customer journey map", "plantilla de diagrama", "plantilla de pizarra online", "plantilla de lluvia de ideas", "plantilla de customer journey map", "plantilla de diagrama", "plantilla de pizarra online", "plantilla de lluvia de ideas", "plantilla de customer journey map", "plantilla de diagrama", "plantilla de pizarra online", "plantilla de lluvia de ideas", "plantilla de customer journey map", "plantilla de diagrama", "plantilla de pizarra online", "plantilla de lluvia de ideas", "plantilla de customer journey map", "plantilla de diagrama", "plantilla de pizarra online", "plantilla de lluvia de ideas", "plantilla de customer journey map", "plantilla de diagrama", "plantilla de pizarra online", "plantilla de lluvia de ideas", "plantilla de customer journey map", "plantilla de diagrama", "plantilla de pizarra online", "plantilla de lluvia de ideas", "plantilla de customer journey map", "plantilla de diagrama", "plantilla de pizarra online", "plantilla de lluvia de ideas", "plantilla de customer journey map", "plantilla de diagrama", "plantilla de pizarra online", "plantilla de lluvia de ideas", "plantilla de customer journey map", "plantilla de diagrama", "plantilla de pizarra online", "plantilla de lluvia de ideas", "plantilla de customer journey map", "plantilla de diagrama", "plantilla de pizarra online", "plantilla de lluvia de ideas", "plantilla de customer journey"],
    alternates: {
        canonical: "https://www.sketchlie.com/plantillas/",
    }
};

const templatesPage = () => {
    return (
        <div>
            <Breadcrumb className="xl:mx-[10%] lg:mx-[7%] md:mx-[5%] mx-[5%] mt-5">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <Link href="/">Home</Link>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Plantillas</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <BlogStructure
                title="Plantillas de Sketchlie"
                description="Elige una de 30 plantillas de Sketchlie para crear mapas mentales, mapas conceptuales, diagramas de flujo, wireframes, mapas de procesos y más. Lo que tu necesites para mejorar tu flujo de trabajo."
                img="/templates/diagrama-ishikawa.png"
                alt="Plantillas de Sketchlie"
                cta="Explorar Plantillas"
            />
            <LogoSlider />
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 xl:mx-[10%] lg:mx-[7%] md:mx-[5%] mx-[5%] gap-5 mt-[3%]">
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