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
    title: "Soluciones para Agencias y consultoras | Sketchlie",
    description: "Potencia la eficiencia y colaboración en tu agencia o consultoría con Sketchlie. Gestiona proyectos, mejora la comunicación con clientes y optimiza tus procesos creativos y estratégicos.",
    keywords: ["agencias", "consultora", "gestión de proyectos", "colaboración", "comunicación con clientes", "procesos creativos", "Sketchlie"],
    alternates: {
        canonical: "https://www.sketchlie.com/agencias-y-consultoras/",
    }
};

const LandingPage = () => {

    const steps = [
        {
            trigger: "1. Centraliza la información del cliente",
            text: "Utiliza Sketchlie para crear un hub centralizado de información del cliente, incluyendo briefs, feedback y activos del proyecto, asegurando que todo tu equipo tenga acceso a la información más actualizada en todo momento."
        },
        {
            trigger: "2. Planifica y visualiza estrategias",
            text: "Aprovecha nuestras herramientas intuitivas para crear mapas mentales, diagramas de flujo y tableros de estrategia que te ayuden a planificar y comunicar estrategias complejas de manera clara y efectiva."
        },
        {
            trigger: "3. Colabora en tiempo real",
            text: "Facilita la colaboración en tiempo real entre tu equipo y los clientes, permitiendo revisiones y aprobaciones instantáneas que agilizan el proceso creativo y reducen los ciclos de feedback."
        },
        {
            trigger: "4. Gestiona proyectos de forma visual",
            text: "Implementa metodologías ágiles o tradicionales con nuestros tableros Kanban y diagramas de Gantt personalizables, manteniendo a tu equipo enfocado y los proyectos en tiempo y presupuesto."
        },
        {
            trigger: "5. Presenta resultados de forma impactante",
            text: "Crea presentaciones visuales impactantes y dashboards interactivos para comunicar resultados y KPIs a tus clientes, demostrando el valor de tu trabajo de manera clara y convincente."
        }
    ];

    const faqData = [
        {
            value: "item-1",
            trigger: "¿Cómo mejora Sketchlie la colaboración entre agencias y clientes?",
            content: "Sketchlie ofrece un espacio de trabajo compartido donde agencias y clientes pueden colaborar en tiempo real. Facilita la creación y edición conjunta de estrategias, revisiones de diseño y aprobaciones de proyectos, mejorando la comunicación y reduciendo malentendidos. Los clientes pueden dar feedback directamente en los documentos y diseños, agilizando el proceso de revisión y aumentando la satisfacción del cliente."
        },
        {
            value: "item-2",
            trigger: "¿Qué tipos de proyectos se pueden gestionar con Sketchlie en una agencia o consultoría?",
            content: "Sketchlie es versátil y se adapta a una amplia gama de proyectos típicos de agencias y Consultora, incluyendo campañas de marketing, desarrollo de marca, estrategias de comunicación, proyectos de diseño UX/UI, planificación de eventos, y consultoría estratégica. Nuestras herramientas permiten crear mapas mentales para brainstorming, tableros Kanban para gestión de tareas, diagramas de Gantt para planificación temporal, y espacios de trabajo colaborativos para cualquier tipo de proyecto creativo o estratégico."
        },
        {
            value: "item-3",
            trigger: "¿Cómo ayuda Sketchlie en la gestión de múltiples clientes y proyectos simultáneos?",
            content: "Sketchlie permite crear espacios de trabajo separados para cada cliente o proyecto, manteniendo la información organizada y segura. Puedes personalizar los permisos de acceso para cada espacio, asegurando que los clientes solo vean la información relevante para ellos. Además, nuestros dashboards y vistas de portfolio te permiten tener una visión general de todos tus proyectos activos, recursos asignados y plazos, facilitando la gestión eficiente de múltiples clientes y proyectos simultáneamente."
        },
        {
            value: "item-4",
            trigger: "¿Qué medidas de seguridad ofrece Sketchlie para proteger la información confidencial de los clientes?",
            content: "Sketchlie implementa robustas medidas de seguridad para proteger la información sensible de tus clientes. Esto incluye encriptación de datos en tránsito y en reposo, autenticación de dos factores, controles de acceso basados en roles, y cumplimiento con estándares como GDPR. Puedes controlar quién tiene acceso a qué información dentro de cada proyecto, y nuestras funciones de auditoría te permiten rastrear quién ha accedido o modificado los documentos. Además, ofrecemos opciones de alojamiento on-premise para clientes con requisitos de seguridad específicos."
        },
        {
            value: "item-5",
            trigger: "¿Cómo facilita Sketchlie la presentación de resultados y reportes a los clientes?",
            content: "Sketchlie ofrece herramientas poderosas para crear presentaciones visuales impactantes y dashboards interactivos. Puedes diseñar informes personalizados que muestren KPIs clave, resultados de campañas y progreso de proyectos de forma clara y atractiva. Nuestras plantillas de presentación y opciones de visualización de datos te permiten transformar información compleja en historias convincentes que demuestran el valor de tu trabajo a los clientes. Además, puedes compartir estos reportes en tiempo real o exportarlos en varios formatos para presentaciones offline."
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
                        <BreadcrumbPage>Agencias y Consultora</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <BlogStructure
                title="Potencia tu Agencia o Consultoría"
                description="Impulsa la eficiencia y colaboración en tu agencia o consultoría con Sketchlie. Gestiona proyectos, mejora la comunicación con clientes y optimiza tus procesos creativos y estratégicos en una plataforma visual e intuitiva diseñada para el éxito de tu negocio."
                cta="Prueba Gratis"
                alt="Equipo de agencia colaborando"
                img="/placeholders/mapa-de-procesos.png"
            />
            <LogoSlider />
            <LandingVideo />
            <BlogSection
                title="Gestión Visual de Proyectos"
                text="Transforma la gestión de tus proyectos con nuestros tableros visuales y herramientas de planificación. Organiza tareas, asigna recursos y realiza un seguimiento del progreso de forma intuitiva, manteniendo a tu equipo y clientes alineados en cada fase del proyecto. Optimiza tus flujos de trabajo y entrega resultados excepcionales de manera consistente."
                alt="Gestión visual de proyectos"
                img="/placeholders/modelo-canvas.png"
                side="right"
            />
            <BlogSection
                title="Colaboración en Tiempo Real"
                text="Potencia la creatividad y eficiencia de tu equipo con nuestra plataforma de colaboración en tiempo real. Trabaja en documentos, diseños y estrategias de forma simultánea, sin importar la ubicación de tus colaboradores. Facilita la comunicación instantánea, el intercambio de ideas y la toma de decisiones ágil, acelerando el proceso creativo y mejorando los resultados."
                alt="Colaboración en tiempo real"
                img="/placeholders/lluvia-de-ideas.png"
                side="right"
            />
            <BlogSection
                title="Presentaciones Impactantes"
                text="Crea presentaciones visuales que impresionen a tus clientes y comuniquen tus ideas de manera efectiva. Utiliza nuestras plantillas personalizables y herramientas de diseño intuitivas para transformar datos complejos en historias convincentes. Presenta estrategias, resultados de campañas y propuestas de manera clara y atractiva, diferenciando tu agencia en un mercado competitivo."
                alt="Presentaciones impactantes"
                img="/placeholders/linea-de-tiempo.png"
                side="right"
            />
            <BlogSection
                title="Gestión de Clientes Simplificada"
                text="Centraliza toda la información y comunicación relacionada con tus clientes en un solo lugar. Desde briefs y feedback hasta activos del proyecto y reportes de progreso, mantén un registro organizado y accesible de cada interacción. Mejora la satisfacción del cliente con una comunicación transparente y una gestión eficiente de sus proyectos y expectativas."
                img="/placeholders/pizarra-online.png"
                side="right"
            />
            <HowToCreate steps={steps} title="Optimiza tu Agencia con Sketchlie" img="/templates/modelo-canvas.png" alt="Flujo de trabajo de agencia" cta="Empieza Ahora"/>
            <TemplatesSlider />
            <div className="mt-10 mb-20">
                <PlatformYouCanTrust />
            </div>
            <FaqSection accordionData={faqData} sectionTitle="agencias, Consultora y Sketchlie" />
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5 md:my-20 my-5 xl:mx-[10%] lg:mx-[7%] md:mx-[5%] mx-[5%]">
                <BlogLinks blogTitle="Mapa Conceptual Online" blogImage="/placeholders/mapa-conceptual-online.png" blogHref="/mapa-conceptual/" blogDescription="Descubre cómo desatar tu creatividad y potenciar la colaboración en tiempo real con Sketchlie." />
                <BlogLinks blogTitle="Mapa de Procesos" blogImage="/placeholders/mapa-de-procesos.png" blogHref="/mapas-de-procesos" blogDescription="El mapa de procesos ayuda a los equipos a mapear y implementar mejoras. Registrate hoy con una 3 espacios de trabajo gratuitos para empezar a utilizar la mejor herramienta de mapa de procesos." />
                <BlogLinks blogTitle="Mapas Mentales" blogImage="/placeholders/mapa-mental.png" blogHref="/mapa-mental-online/" blogDescription="Explora nuestras herramientas para simplificar la creación de mapas mentales. Organiza tus ideas de manera jerárquica y potencia tu creatividad con nuestro intuitivo creador de mapas mentales." />
            </div>
        </div>
    );
}

export default LandingPage;