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
    title: "Gestión de Proyectos de TI y Colaboración en Equipos Tecnológicos | Sketchlie",
    description: "Potencia la eficiencia de tus equipos de TI con Sketchlie. Optimiza la gestión de proyectos, planificación de infraestructura, desarrollo ágil y resolución de incidentes en una plataforma colaborativa.",
    keywords: ["gestión de proyectos de TI", "colaboración en equipos de TI", "planificación de infraestructura tecnológica", "desarrollo ágil de software", "resolución de incidentes de TI", "Sketchlie"],
    alternates: {
        canonical: "https://www.sketchlie.com/equipos-de-ti/",
    }
};

const LandingPage = () => {

    const steps = [
        {
            trigger: "1. Centraliza la documentación y recursos de TI",
            text: "Utiliza Sketchlie para mantener todos tus documentos técnicos, diagramas de red y recursos de proyecto en un repositorio centralizado y seguro, accesible para todo tu equipo de TI en tiempo real."
        },
        {
            trigger: "2. Diseña arquitecturas de sistemas y flujos de trabajo",
            text: "Aprovecha nuestras herramientas intuitivas para crear diagramas de arquitectura, mapas de infraestructura y flujos de procesos que optimicen tus operaciones de TI y faciliten la toma de decisiones estratégicas."
        },
        {
            trigger: "3. Implementa metodologías ágiles en tus proyectos de TI",
            text: "Utiliza tableros Kanban personalizables y herramientas de sprint planning para gestionar proyectos de desarrollo de software y transformación digital de manera ágil y eficiente."
        },
        {
            trigger: "4. Gestiona incidentes y problemas de TI",
            text: "Crea un sistema visual de seguimiento de incidentes que permita priorizar, asignar y resolver problemas de TI rápidamente, mejorando los tiempos de respuesta y la satisfacción del usuario."
        },
        {
            trigger: "5. Analiza y optimiza el rendimiento de TI",
            text: "Utiliza dashboards interactivos y reportes automatizados para monitorear KPIs críticos, identificar áreas de mejora y tomar decisiones basadas en datos que impulsen la eficiencia operativa de tu departamento de TI."
        }
    ];

    const faqData = [
        {
            value: "item-1",
            trigger: "¿Cómo mejora Sketchlie la colaboración en equipos de TI distribuidos?",
            content: "Sketchlie ofrece un espacio de trabajo virtual centralizado donde los equipos de TI pueden colaborar en tiempo real, independientemente de su ubicación. Facilita la creación y edición conjunta de diagramas técnicos, documentación de proyectos y planificación de sprints, mejorando la comunicación y reduciendo los silos de información en entornos de trabajo remoto o híbrido."
        },
        {
            value: "item-2",
            trigger: "¿Qué tipos de diagramas técnicos y modelos de TI se pueden crear con Sketchlie?",
            content: "Con Sketchlie, puedes crear una amplia variedad de diagramas y modelos esenciales para la gestión de TI, incluyendo diagramas de red, arquitecturas de sistemas, flujos de procesos ITIL, mapas de infraestructura cloud, diagramas de seguridad, y modelos de bases de datos. Nuestras plantillas personalizables y herramientas intuitivas se adaptan a las necesidades específicas de cualquier proyecto de TI."
        },
        {
            value: "item-3",
            trigger: "¿Cómo ayuda Sketchlie en la gestión ágil de proyectos de desarrollo de software?",
            content: "Sketchlie proporciona herramientas especializadas para la gestión ágil, como tableros Kanban personalizables, planificación de sprints, y backlog de producto. Estas funcionalidades permiten a los equipos de desarrollo visualizar el flujo de trabajo, priorizar tareas, y colaborar eficientemente en cada fase del ciclo de desarrollo de software, desde la concepción hasta el despliegue y mantenimiento."
        },
        {
            value: "item-4",
            trigger: "¿Qué medidas de seguridad ofrece Sketchlie para proteger la información sensible de TI?",
            content: "Sketchlie implementa robustas medidas de seguridad, incluyendo encriptación de datos en tránsito y en reposo, autenticación de dos factores, controles de acceso basados en roles, y cumplimiento con estándares como GDPR e ISO 27001. Además, ofrecemos opciones de alojamiento on-premise para organizaciones con requisitos de seguridad específicos, garantizando la protección de tu valiosa información de TI."
        },
        {
            value: "item-5",
            trigger: "¿Cómo facilita Sketchlie la gestión de incidentes y problemas de TI?",
            content: "Sketchlie proporciona tableros visuales para el seguimiento de incidentes, permitiendo a los equipos de TI priorizar, asignar y resolver problemas eficientemente. Puedes crear flujos de trabajo personalizados para la gestión de incidentes, visualizar cuellos de botella, y generar informes de rendimiento. Esto mejora los tiempos de respuesta, facilita la colaboración entre equipos de soporte, y ayuda a identificar problemas recurrentes para implementar soluciones proactivas."
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
                        <BreadcrumbPage>Equipos de TI</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <BlogStructure
                title="Optimiza la gestión de proyectos de TI y potencia la innovación tecnológica"
                description="Impulsa la eficiencia y colaboración de tu equipo de TI con nuestra plataforma visual todo en uno. Desde la planificación estratégica hasta la resolución de incidentes, Sketchlie es tu aliado para el éxito en la era digital."
                cta="Comienza gratis"
                alt="Equipo de TI colaborando"
                img="/placeholders/customer-journey-map.png"
            />
            <LogoSlider />
            <LandingVideo />
            <BlogSection
                title="Simplifica la planificación de infraestructura de TI y mejora la visibilidad de tus sistemas"
                text="Diseña y visualiza arquitecturas de sistemas complejos con nuestras herramientas de diagramación intuitivas. Optimiza tu infraestructura, identifica dependencias y planifica escalabilidad futura con facilidad, todo en un entorno colaborativo que fomenta la innovación y la eficiencia operativa."
                alt="Planificación de infraestructura de TI"
                img="/placeholders/lluvia-de-ideas.png"
                side="right"
            />
            <BlogSection
                title="Agiliza el desarrollo de software y acelera los ciclos de entrega con tableros Kanban visuales"
                text="Mejora la productividad de tu equipo de desarrollo con flujos de trabajo personalizables y en tiempo real. Visualiza el progreso del proyecto, identifica cuellos de botella y optimiza los procesos de desarrollo para entregar software de alta calidad más rápidamente, manteniendo a todos los miembros del equipo alineados y enfocados."
                alt="Desarrollo de software ágil"
                img="/placeholders/wireframe.png"
                side="right"
            />
            <BlogSection
                title="Gestiona incidentes de TI con mayor eficacia y minimiza el tiempo de inactividad"
                text="Utiliza nuestros tableros interactivos para priorizar y resolver problemas de TI más rápidamente. Mejora la comunicación entre equipos, realiza un seguimiento de los SLAs y analiza tendencias para implementar mejoras proactivas, garantizando la continuidad del negocio y la satisfacción del usuario final."
                alt="Gestión de incidentes de TI"
                img="/placeholders/modelo-canvas.png"
                side="right"
            />
            <BlogSection
                title="Colaboración sin fronteras para equipos de TI distribuidos en la era del trabajo remoto"
                text="Conecta a tus especialistas de TI en cualquier lugar del mundo con nuestra plataforma de colaboración en la nube. Fomenta la innovación, comparte conocimientos y mantén a tu equipo alineado, sin importar las zonas horarias o ubicaciones geográficas, creando un ambiente de trabajo cohesivo y productivo en la nueva normalidad."
                img="/placeholders/linea-de-tiempo.png"
                side="right"
            />
            <HowToCreate steps={steps} title="Cómo potenciar la eficiencia de tu equipo de TI" img="/templates/lluvia-de-ideas.png" alt="Gestión de proyectos de TI" cta="Optimiza tu TI ahora"/>
            <TemplatesSlider />
            <div className="mt-10 mb-20">
                <PlatformYouCanTrust />
            </div>
            <FaqSection accordionData={faqData} sectionTitle="gestión de TI y Sketchlie" />
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5 md:my-20 my-5 xl:mx-[10%] lg:mx-[7%] md:mx-[5%] mx-[5%]">
                <BlogLinks blogTitle="Mapa Conceptual Online" blogImage="/placeholders/mapa-conceptual-online.png" blogHref="/mapa-conceptual/" blogDescription="Descubre cómo desatar tu creatividad y potenciar la colaboración en tiempo real con Sketchlie." />
                <BlogLinks blogTitle="Mapa de Procesos" blogImage="/placeholders/mapa-de-procesos.png" blogHref="/mapas-de-procesos" blogDescription="El mapa de procesos ayuda a los equipos a mapear y implementar mejoras. Registrate hoy con una 3 espacios de trabajo gratuitos para empezar a utilizar la mejor herramienta de mapa de procesos." />
                <BlogLinks blogTitle="Mapas Mentales" blogImage="/placeholders/mapa-mental.png" blogHref="/mapa-mental-online/" blogDescription="Explora nuestras herramientas para simplificar la creación de mapas mentales. Organiza tus ideas de manera jerárquica y potencia tu creatividad con nuestro intuitivo creador de mapas mentales." />
            </div>
        </div>
    );
}

export default LandingPage;