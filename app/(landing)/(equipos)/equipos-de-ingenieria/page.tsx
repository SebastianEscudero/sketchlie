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
    title: "Equipos de Ingeniería: Colaboración y Productividad | Sketchlie",
    description: "Potencia la colaboración de tus equipos de ingeniería con Sketchlie. Diseña, itera y construye proyectos de ingeniería de manera eficiente.",
    keywords: ["equipos de ingeniería", "colaboración en ingeniería", "gestión de proyectos de ingeniería", "Sketchlie"],
    alternates: {
        canonical: "https://www.sketchlie.com/equipos-de-ingenieria/",
    }
};

const LandingPage = () => {

    const steps = [
        {
            trigger: "1. Centraliza la documentación técnica",
            text: "Utiliza Sketchlie para mantener todos tus documentos, planos y especificaciones en un solo lugar, accesible para todo tu equipo en tiempo real."
        },
        {
            trigger: "2. Crea diagramas técnicos y prototipos",
            text: "Aprovecha nuestras herramientas intuitivas para diseñar diagramas, prototipos y modelos que lleven tus proyectos de ingeniería al siguiente nivel."
        },
        {
            trigger: "3. Colabora en tiempo real",
            text: "Conecta a tus ingenieros sin importar dónde se encuentren, permitiendo una colaboración fluida y productiva en cualquier momento."
        },
        {
            trigger: "4. Gestiona proyectos de principio a fin",
            text: "Utiliza Sketchlie para manejar cada fase de tus proyectos de ingeniería, desde la concepción hasta la implementación."
        },
        {
            trigger: "5. Realiza seguimiento en tiempo real",
            text: "Mantén a todos los miembros del equipo actualizados con dashboards en vivo y reportes de progreso automatizados."
        }
    ];

    const faqData = [
        {
            value: "item-1",
            trigger: "¿Cómo puede Sketchlie mejorar la colaboración en equipos de ingeniería?",
            content: "Sketchlie ofrece un espacio de trabajo centralizado donde los equipos pueden crear diagramas, compartir documentos y colaborar en tiempo real, mejorando la comunicación y la eficiencia en los proyectos de ingeniería."
        },
        {
            value: "item-2",
            trigger: "¿Qué tipos de diagramas técnicos se pueden crear con Sketchlie?",
            content: "Con Sketchlie, puedes crear una amplia variedad de diagramas técnicos, incluyendo diagramas de flujo, esquemas eléctricos, planos arquitectónicos, y más, adaptándose a las necesidades específicas de tu proyecto de ingeniería."
        },
        {
            value: "item-3",
            trigger: "¿Cómo ayuda Sketchlie en la gestión de proyectos de ingeniería?",
            content: "Sketchlie proporciona herramientas para la planificación, seguimiento y colaboración en proyectos, permitiendo a los equipos de ingeniería gestionar eficientemente todas las fases del proyecto, desde la concepción hasta la implementación."
        },
        {
            value: "item-4",
            trigger: "¿Es seguro compartir información técnica sensible en Sketchlie?",
            content: "Sí, Sketchlie ofrece robustas medidas de seguridad y opciones de cumplimiento normativo para proteger tus valiosos diseños e información técnica, garantizando la confidencialidad de tus proyectos."
        },
        {
            value: "item-5",
            trigger: "¿Cómo facilita Sketchlie la innovación en equipos de ingeniería?",
            content: "Sketchlie proporciona herramientas para sesiones de lluvia de ideas virtuales y colaboración en tiempo real, fomentando la creatividad y permitiendo a los equipos de ingeniería generar y desarrollar nuevas ideas de manera eficiente."
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
                        <BreadcrumbPage>Equipos de Ingeniería</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <BlogStructure
                title="Potencia la colaboración de tus equipos de ingeniería"
                description="Descubre cómo Sketchlie puede transformar la forma en que tus equipos de ingeniería trabajan juntos, mejorando la eficiencia y la innovación."
                cta="Comienza gratis"
                alt="Equipo de ingeniería colaborando"
                img="/placeholders/modelo-canvas.png"
            />
            <LogoSlider />
            <LandingVideo />
            <BlogSection
                title="Diseña, itera y construye con confianza"
                text="Utiliza nuestras herramientas intuitivas para crear diagramas técnicos, prototipos y modelos que lleven tus proyectos al siguiente nivel. Sketchlie te permite visualizar y perfeccionar tus ideas de ingeniería con facilidad."
                alt="Diseño de ingeniería"
                img="/placeholders/lluvia-de-ideas.png"
                side="right"
            />
            <BlogSection
                title="Centraliza la documentación técnica"
                text="Mantén todos tus documentos, planos y especificaciones en un solo lugar, accesible para todo tu equipo en tiempo real. Olvídate de las versiones desactualizadas y los correos electrónicos perdidos."
                alt="Documentación técnica centralizada"
                img="/placeholders/diagrama-ishikawa.png"
                side="right"
            />
            <BlogSection
                title="Visualiza procesos complejos con facilidad"
                text="Crea diagramas de flujo, mapas de procesos y esquemas técnicos que simplifiquen incluso los proyectos más complejos. Sketchlie te ayuda a comunicar ideas complicadas de manera clara y efectiva."
                alt="Visualización de procesos"
                img="/placeholders/mapa-conceptual.png"
                side="right"
            />
            <BlogSection
                title="Colaboración sin fronteras para equipos distribuidos"
                text="Conecta a tus ingenieros sin importar dónde se encuentren, permitiendo una colaboración fluida y productiva en cualquier momento. Sketchlie elimina las barreras geográficas y temporales."
                img="/placeholders/mapa-de-procesos.png"
                side="right"
            />
            <HowToCreate steps={steps} title="Cómo potenciar tu equipo de ingeniería con Sketchlie" img="/templates/lluvia-de-ideas.png" alt="Plantilla de ingeniería" cta="Empieza ahora"/>
            <TemplatesSlider />
            <div className="mt-10 mb-20">
                <PlatformYouCanTrust />
            </div>
            <FaqSection accordionData={faqData} sectionTitle="equipos de ingeniería y Sketchlie" />
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5 md:my-20 my-5 xl:mx-[10%] lg:mx-[7%] md:mx-[5%] mx-[5%]">
                <BlogLinks blogTitle="Mapa Conceptual Online" blogImage="/placeholders/mapa-conceptual-online.png" blogHref="/mapa-conceptual/" blogDescription="Descubre cómo desatar tu creatividad y potenciar la colaboración en tiempo real con Sketchlie." />
                <BlogLinks blogTitle="Mapa de Procesos" blogImage="/placeholders/mapa-de-procesos.png" blogHref="/mapas-de-procesos" blogDescription="El mapa de procesos ayuda a los equipos a mapear y implementar mejoras. Registrate hoy con una 3 espacios de trabajo gratuitos para empezar a utilizar la mejor herramienta de mapa de procesos." />
                <BlogLinks blogTitle="Mapas Mentales" blogImage="/placeholders/mapa-mental.png" blogHref="/mapa-mental-online/" blogDescription="Explora nuestras herramientas para simplificar la creación de mapas mentales. Organiza tus ideas de manera jerárquica y potencia tu creatividad con nuestro intuitivo creador de mapas mentales." />
            </div>
        </div>
    );
}

export default LandingPage;