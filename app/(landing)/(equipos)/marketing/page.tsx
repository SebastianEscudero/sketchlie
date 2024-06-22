import { BlogStructure } from "@/components/blog-structure";
import { Metadata } from "next";
import { BlogSection } from "@/components/blog-section";
import { LogoSlider } from "@/components/logo-slider";
import { FaqSection } from "@/components/faq-section";
import { LandingVideo } from "@/components/landing-video";
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
import { BlogLinks } from "@/components/blog-links";

export const metadata: Metadata = {
    title: "Herramienta de colaboración para equipos de marketing | Sketchlie",
    description: "Potencia tu estrategia de marketing con Sketchlie. Planifica campañas, visualiza el recorrido del cliente y colabora en tiempo real con tu equipo.",
    keywords: ["marketing digital", "estrategia de marketing", "colaboración en marketing", "planificación de campañas", "Sketchlie"],
    alternates: {
        canonical: "https://www.sketchlie.com/marketing/",
    }
};

const LandingPage = () => {

    const steps = [
        {
            trigger: "1. Planifica tu estrategia",
            text: "Utiliza nuestros tableros interactivos para diseñar y planificar campañas de marketing impactantes que capturan la atención de tu audiencia."
        },
        {
            trigger: "2. Visualiza el recorrido del cliente",
            text: "Crea mapas detallados de la experiencia del cliente para optimizar cada punto de contacto y aumentar la conversión."
        },
        {
            trigger: "3. Realiza sesiones de brainstorming",
            text: "Reúne a tu equipo en sesiones virtuales de lluvia de ideas que fomentan la creatividad y generan conceptos de marketing innovadores."
        },
        {
            trigger: "4. Gestiona proyectos de principio a fin",
            text: "Mantén todos tus proyectos de marketing organizados y en tiempo con nuestras herramientas de gestión visual."
        },
        {
            trigger: "5. Analiza y optimiza en tiempo real",
            text: "Visualiza datos de rendimiento, identifica tendencias y ajusta tus estrategias sobre la marcha con nuestros tableros de análisis interactivos."
        }
    ];

    const faqData = [
        {
            value: "item-1",
            trigger: "¿Cómo puede Sketchlie mejorar la colaboración en equipos de marketing globales?",
            content: "Sketchlie permite la conexión de especialistas de marketing sin importar su ubicación, facilitando una colaboración fluida y productiva en cualquier momento a través de nuestra plataforma en línea."
        },
        {
            value: "item-2",
            trigger: "¿Qué herramientas ofrece Sketchlie para la creación de contenido de marketing?",
            content: "Sketchlie proporciona plantillas personalizables y herramientas de diseño intuitivas para crear infografías, posts para redes sociales y otros materiales visuales de marketing con facilidad."
        },
        {
            value: "item-3",
            trigger: "¿Cómo ayuda Sketchlie a mantener la consistencia de la marca?",
            content: "Nuestras herramientas de gestión de activos digitales y guías de estilo interactivas ayudan a mantener la consistencia de tu marca a través de todos los canales de marketing."
        },
        {
            value: "item-4",
            trigger: "¿Se puede medir el ROI de las campañas de marketing con Sketchlie?",
            content: "Sí, Sketchlie ofrece tableros de KPI personalizables para rastrear, analizar y reportar el retorno de inversión de tus esfuerzos de marketing con precisión."
        },
        {
            value: "item-5",
            trigger: "¿Qué beneficios ofrece Sketchlie para la planificación de campañas de marketing?",
            content: "Sketchlie proporciona tableros interactivos que permiten diseñar, iterar y lanzar campañas de marketing que capturan la atención de tu audiencia de manera efectiva."
        }
    ];

    return (
        <div>
            <Breadcrumb className="xl:mx-[10%] lg:mx-[7%] md:mx-[5%] mx-[5%] mt-5">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <Link href="/" title="Home">Home</Link>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Marketing</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <BlogStructure
                title="Potencia tu estrategia de marketing con Sketchlie"
                description="Transforma tus ideas en campañas exitosas con nuestra plataforma de colaboración visual para equipos de marketing."
                cta="Regístrate gratis"
                alt="Estrategia de Marketing"
                img="/placeholders/mapa-de-procesos.png"
            />
            <LogoSlider />
            <LandingVideo />
            <BlogSection
                title="Planifica campañas de marketing que impactan"
                text="Utiliza nuestros tableros interactivos para diseñar, iterar y lanzar campañas de marketing que capturan la atención de tu audiencia."
                alt="Planificación de Campaña"
                img="/placeholders/pizarra-online.png"
                side="right"
            />
            <BlogSection
                title="Visualiza el recorrido del cliente como nunca antes"
                text="Crea mapas de experiencia del cliente detallados para optimizar cada punto de contacto y aumentar la conversión."
                alt="Mapa de Experiencia del Cliente"
                img="/placeholders/linea-de-tiempo.png"
                side="right"
            />
            <BlogSection
                title="Brainstorming colaborativo para ideas de marketing innovadoras"
                text="Reúne a tu equipo en sesiones de lluvia de ideas virtuales que fomentan la creatividad y generan conceptos de marketing únicos."
                alt="Sesión de Brainstorming"
                img="/placeholders/wireframe.png"
                side="right"
            />
            <BlogSection
                title="Analiza y optimiza tus estrategias de marketing en tiempo real"
                text="Visualiza datos de rendimiento, identifica tendencias y ajusta tus estrategias sobre la marcha con nuestros tableros de análisis interactivos."
                img="/placeholders/customer-journey-map.png"
                side="right"
            />
            <HowToCreate steps={steps} title="Cómo potenciar tu marketing con Sketchlie" img="/templates/lluvia-de-ideas.png" alt="Marketing Canvas" cta="Iniciar proyecto de marketing"/>
            <TemplatesSlider />
            <div className="mt-10 mb-20">
                <PlatformYouCanTrust />
            </div>
            <FaqSection accordionData={faqData} sectionTitle="marketing con Sketchlie" />
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5 md:my-20 my-5 xl:mx-[10%] lg:mx-[7%] md:mx-[5%] mx-[5%]">
                <BlogLinks blogTitle="Mapa Conceptual Online" blogImage="/placeholders/mapa-conceptual-online.png" blogHref="/mapa-conceptual/" blogDescription="Descubre cómo desatar tu creatividad y potenciar la colaboración en tiempo real con Sketchlie." />
                <BlogLinks blogTitle="Mapa de Procesos" blogImage="/placeholders/mapa-de-procesos.png" blogHref="/mapas-de-procesos" blogDescription="El mapa de procesos ayuda a los equipos a mapear y implementar mejoras. Registrate hoy con una 3 espacios de trabajo gratuitos para empezar a utilizar la mejor herramienta de mapa de procesos." />
                <BlogLinks blogTitle="Mapas Mentales" blogImage="/placeholders/mapa-mental.png" blogHref="/mapa-mental-online/" blogDescription="Explora nuestras herramientas para simplificar la creación de mapas mentales. Organiza tus ideas de manera jerárquica y potencia tu creatividad con nuestro intuitivo creador de mapas mentales." />
            </div>
        </div>
    );
}

export default LandingPage;