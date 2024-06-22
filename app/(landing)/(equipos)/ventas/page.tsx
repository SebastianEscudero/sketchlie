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
    title: "Herramientas de Colaboración para Equipos de Ventas | Sketchlie",
    description: "Potencia tu equipo de ventas con Sketchlie. Optimiza estrategias, gestiona pipelines, y mejora la colaboración para impulsar el crecimiento de tus ventas.",
    keywords: ["ventas", "CRM visual", "pipeline de ventas", "estrategia de ventas", "colaboración en ventas", "Sketchlie"],
    alternates: {
        canonical: "https://www.sketchlie.com/ventas/",
    }
};

const LandingPage = () => {

    const steps = [
        {
            trigger: "1. Visualiza tu pipeline de ventas",
            text: "Utiliza Sketchlie para crear un pipeline de ventas visual e interactivo. Arrastra y suelta oportunidades entre etapas, asigna propietarios y actualiza el estado en tiempo real para mantener a todo tu equipo informado."
        },
        {
            trigger: "2. Planifica estrategias de venta",
            text: "Aprovecha nuestras herramientas de mapeo mental para diseñar estrategias de venta efectivas. Colabora con tu equipo para identificar oportunidades, definir tácticas y asignar recursos de manera eficiente."
        },
        {
            trigger: "3. Perfecciona tu proceso de ventas",
            text: "Crea diagramas de flujo interactivos de tu proceso de ventas. Identifica cuellos de botella, optimiza etapas y asegúrate de que todo tu equipo siga las mejores prácticas para cerrar más deals."
        },
        {
            trigger: "4. Analiza el rendimiento de ventas",
            text: "Diseña dashboards visuales personalizados para monitorear KPIs clave de ventas. Visualiza tendencias, compara el rendimiento del equipo y toma decisiones basadas en datos para mejorar continuamente."
        },
        {
            trigger: "5. Colabora en propuestas ganadoras",
            text: "Utiliza espacios de trabajo compartidos para crear propuestas de venta impactantes. Colabora en tiempo real con tu equipo, incorpora feedback del cliente y entrega presentaciones que cierren deals."
        }
    ];

    const faqData = [
        {
            value: "item-1",
            trigger: "¿Cómo ayuda Sketchlie a visualizar y gestionar el pipeline de ventas?",
            content: "Sketchlie permite crear pipelines de venta visuales e interactivos donde puedes arrastrar y soltar oportunidades entre etapas, asignar propietarios y actualizar estados en tiempo real. Esto proporciona una visión clara del flujo de deals, facilita la priorización y permite a los gerentes de ventas identificar rápidamente áreas que necesitan atención."
        },
        {
            value: "item-2",
            trigger: "¿Qué herramientas ofrece Sketchlie para la planificación estratégica de ventas?",
            content: "Sketchlie ofrece herramientas de mapeo mental y diagramación que son ideales para la planificación estratégica de ventas. Puedes crear mapas de territorio, definir buyer personas, diseñar estrategias de cuenta y planificar campañas de outreach. Estas herramientas visuales facilitan la colaboración del equipo y aseguran que todos estén alineados con la estrategia general."
        },
        {
            value: "item-3",
            trigger: "¿Cómo puede Sketchlie mejorar la colaboración en equipos de ventas remotos?",
            content: "Sketchlie proporciona un espacio de trabajo virtual compartido donde los equipos de ventas pueden colaborar en tiempo real, independientemente de su ubicación. Pueden trabajar juntos en estrategias, compartir mejores prácticas, realizar sesiones de coaching y revisar propuestas. Las funciones de chat y comentarios facilitan la comunicación asincrónica, mientras que las sesiones en vivo permiten brainstorming y revisiones de equipo efectivas."
        },
        {
            value: "item-4",
            trigger: "¿Puede Sketchlie integrarse con otras herramientas de ventas como CRM?",
            content: "Sí, Sketchlie ofrece integraciones con varias herramientas populares de CRM y ventas. Esto te permite sincronizar datos de oportunidades, visualizar información del CRM en tus tableros de Sketchlie y mantener tus sistemas actualizados. Además, nuestra API permite crear integraciones personalizadas para adaptarse a tu stack tecnológico específico."
        },
        {
            value: "item-5",
            trigger: "¿Cómo ayuda Sketchlie en la creación y presentación de propuestas de venta?",
            content: "Sketchlie proporciona plantillas y herramientas de diseño intuitivas para crear propuestas de venta visualmente atractivas. Puedes colaborar en tiempo real con tu equipo para desarrollar el contenido, incorporar feedback del cliente y personalizar la propuesta. Además, puedes usar Sketchlie durante las presentaciones de ventas para crear una experiencia interactiva y dinámica que impresione a tus prospectos."
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
                        <BreadcrumbPage>Ventas</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <BlogStructure
                title="Impulsa tus Ventas"
                description="Transforma tu proceso de ventas con Sketchlie. Visualiza pipelines, planifica estrategias y colabora en propuestas ganadoras. Potencia a tu equipo de ventas con herramientas visuales intuitivas diseñadas para impulsar el crecimiento y cerrar más deals."
                cta="Prueba Gratis"
                alt="Equipo de ventas colaborando"
                img="/placeholders/customer-journey-map.png"
            />
            <LogoSlider />
            <LandingVideo />
            <BlogSection
                title="Pipeline Visual"
                text="Transforma tu pipeline de ventas en un tablero visual e interactivo. Arrastra y suelta oportunidades entre etapas, asigna propietarios y actualiza estados en tiempo real. Obtén una visión clara de tu flujo de deals, identifica cuellos de botella y prioriza acciones para maximizar el cierre de ventas."
                alt="Pipeline de ventas visual"
                img="/placeholders/diagrama-ishikawa.png"
                side="right"
            />
            <BlogSection
                title="Estrategia de Ventas"
                text="Diseña estrategias de venta ganadoras con nuestras herramientas de mapeo mental y planificación visual. Colabora con tu equipo para identificar oportunidades de mercado, definir tácticas de outreach y asignar recursos de manera eficiente. Mantén a todo tu equipo alineado y enfocado en los objetivos de venta."
                alt="Estrategia de ventas colaborativa"
                img="/placeholders/linea-de-tiempo.png"
                side="right"
            />
            <BlogSection
                title="Análisis de Rendimiento"
                text="Crea dashboards visuales personalizados para monitorear KPIs clave de ventas en tiempo real. Visualiza tendencias, compara el rendimiento del equipo y profundiza en los datos para identificar áreas de mejora. Toma decisiones basadas en datos que impulsen el crecimiento continuo de tus ventas."
                alt="Dashboard de rendimiento de ventas"
                img="/placeholders/mapa-mental.png"
                side="right"
            />
            <BlogSection
                title="Propuestas Ganadoras"
                text="Colabora en tiempo real para crear propuestas de venta impactantes que cierren deals. Utiliza nuestras plantillas personalizables y herramientas de diseño intuitivas para desarrollar presentaciones visualmente atractivas. Incorpora feedback del cliente y entrega propuestas que destaquen tu valor único."
                img="/placeholders/mapa-de-procesos.png"
                side="right"
            />
            <HowToCreate steps={steps} title="Optimiza tu Proceso de Ventas" img="/templates/mapa-de-proceso.png" alt="Optimización del proceso de ventas" cta="Impulsa tus Ventas"/>
            <TemplatesSlider />
            <div className="mt-10 mb-20">
                <PlatformYouCanTrust />
            </div>
            <FaqSection accordionData={faqData} sectionTitle="ventas y Sketchlie" />
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5 md:my-20 my-5 xl:mx-[10%] lg:mx-[7%] md:mx-[5%] mx-[5%]">
                <BlogLinks blogTitle="Mapa Conceptual Online" blogImage="/placeholders/mapa-conceptual-online.png" blogHref="/mapa-conceptual/" blogDescription="Descubre cómo desatar tu creatividad y potenciar la colaboración en tiempo real con Sketchlie." />
                <BlogLinks blogTitle="Mapa de Procesos" blogImage="/placeholders/mapa-de-procesos.png" blogHref="/mapas-de-procesos" blogDescription="El mapa de procesos ayuda a los equipos a mapear y implementar mejoras. Registrate hoy con una 3 espacios de trabajo gratuitos para empezar a utilizar la mejor herramienta de mapa de procesos." />
                <BlogLinks blogTitle="Mapas Mentales" blogImage="/placeholders/mapa-mental.png" blogHref="/mapa-mental-online/" blogDescription="Explora nuestras herramientas para simplificar la creación de mapas mentales. Organiza tus ideas de manera jerárquica y potencia tu creatividad con nuestro intuitivo creador de mapas mentales." />
            </div>
        </div>
    );
}

export default LandingPage;