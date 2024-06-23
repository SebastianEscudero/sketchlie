import { BlogStructure } from "@/components/blog-structure";
import { Metadata } from "next";
import { BlogSection } from "@/components/blog-section";
import { LogoSlider } from "@/components/logo-slider";
import { FaqSection } from "@/components/faq-section";
import { HowToCreate } from "@/components/how-to-create";
import { PlatformYouCanTrust } from "@/components/platform-you-can-trust";
import { LandingVideo } from "@/components/landing-video";
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

export const metadata: Metadata = {
    title: "Mapa de Procesos Online Gratis | Sketchlie",
    description: "Crea mapas de procesos interactivos fácilmente. Colabora en tiempo real, usa plantillas personalizables y optimiza tus flujos de trabajo. Prueba Sketchlie gratis.",
    keywords: ["mapa de procesos", "diagrama de flujo", "colaboración en tiempo real", "gestión visual de procesos"],
    alternates: {
        canonical: "https://www.sketchlie.com/mapas-de-procesos/",
    }
};

const LandingPage = () => {
    const faqData = [
        {
            value: "item-1",
            trigger: "¿Qué es un mapa de procesos?",
            content: "Un mapa de procesos es una representación visual que muestra los pasos secuenciales de un proceso empresarial o una actividad específica. Estos mapas ayudan a comprender cómo se lleva a cabo un proceso, identificar áreas de mejora y optimizar la eficiencia operativa."
        },
        {
            value: "item-2",
            trigger: "¿Cuál es la importancia de crear un mapa de procesos?",
            content: "La creación de un mapa de procesos es importante porque proporciona una visión clara y detallada del flujo de trabajo de una organización. Permite identificar cuellos de botella, redundancias, oportunidades de mejora y áreas de riesgo dentro de los procesos, lo que ayuda a optimizar la eficiencia y la calidad del trabajo."
        },
        {
            value: "item-3",
            trigger: "¿Cuáles son los beneficios de utilizar un mapa de procesos?",
            content: "Algunos de los beneficios de utilizar un mapa de procesos incluyen: \n\n- Mejora de la comprensión del flujo de trabajo.\n\n- Identificación de áreas de mejora y oportunidades de optimización.\n\n- Establecimiento de estándares de calidad y eficiencia.\n\n- Facilitación de la comunicación y la colaboración entre los equipos.\n\n- Ayuda en la identificación y gestión de riesgos.\n\n- Facilitación de la capacitación de empleados y la integración de nuevos miembros al equipo."
        },
        {
            value: "item-4",
            trigger: "¿Qué herramientas se pueden utilizar para crear un mapa de procesos?",
            content: "Hay varias herramientas disponibles para crear mapas de procesos, desde software especializado hasta herramientas más simples como diagramas de flujo. Algunas opciones comunes incluyen Sketchlie, Lucidchart, draw.io y herramientas de diagramación disponibles en suites de oficina como Microsoft Office y Google Workspace."
        },
        {
            value: "item-5",
            trigger: "¿Cómo se puede mantener actualizado un mapa de procesos?",
            content: "Es importante revisar y actualizar regularmente los mapas de procesos para garantizar que reflejen con precisión los procesos actuales de la organización. Esto implica involucrar a los miembros relevantes del equipo en la revisión y actualización periódica, documentar los cambios en los procedimientos y asegurarse de que todos tengan acceso a la versión más reciente del mapa de procesos. Además, es útil establecer un proceso de retroalimentación continuo para capturar comentarios y sugerencias de mejora."
        }
    ];

    const steps = [
        {
            trigger: "1. Elige una plantilla o comienza desde cero",
            text: "Selecciona una de nuestras plantillas prediseñadas o inicia tu mapa de procesos desde una pizarra en blanco."
        },
        {
            trigger: "2. Agrega y conecta elementos",
            text: "Arrastra y suelta formas, conectores y texto para construir tu mapa de procesos. Personaliza colores y estilos para una mejor visualización."
        },
        {
            trigger: "3. Colabora con tu equipo",
            text: "Invita a miembros de tu equipo para editar y comentar en tiempo real. Asigna tareas y responsabilidades directamente en el mapa."
        },
        {
            trigger: "4. Analiza y optimiza",
            text: "Utiliza nuestras herramientas de análisis para identificar áreas de mejora. Itera y actualiza tu mapa de procesos continuamente para mantenerlo relevante."
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
                        <BreadcrumbPage>Mapa de procesos</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <BlogStructure
                title="Optimiza tus flujos de trabajo con mapas de procesos"
                description="Libera tu imaginación y organiza tus ideas de manera visual con nuestra herramienta para crear mapas mentales en línea. Descubre cómo el diseño de mapas mentales puede potenciar tu creatividad y mejorar tu productividad en proyectos personales y profesionales."
                cta="Crear mapa de procesos"
                alt="Mapa de Procesos"
                img="/placeholders/mapa-de-procesos.png"
            />
            <LogoSlider />
            <LandingVideo />
            <BlogSection
                title="Fomenta la colaboración y la transparencia"
                text={
                    <>
                        Con la <Link href="/plantillas/mapa-de-proceso/" className="text-custom-blue hover:underline">plantilla de mapa de proceso</Link> de Sketchlie, puedes crear mapas de procesos colaborativos que involucren a todo tu equipo. Esto fomenta la transparencia en tus operaciones y facilita la comunicación entre departamentos, lo que lleva a una mayor cohesión y eficacia en el cumplimiento de los objetivos.
                    </>
                }
                alt="Wireframe"
                img="/placeholders/wireframe.png"
                side="right"
            />
            <BlogSection
                title="Colaboración en tiempo real"
                text="Trabaja con tu equipo en el mismo mapa de procesos simultáneamente. Comenta, edita y actualiza en tiempo real, sin importar dónde se encuentren tus colaboradores."
                alt="Modelo Canvas"
                img="/placeholders/modelo-canvas.png"
                side="right"
            />

            <BlogSection
                title="Plantillas personalizables"
                text="Ahorra tiempo con nuestras plantillas prediseñadas para diferentes industrias y procesos. Personalízalas fácilmente para adaptarlas a las necesidades específicas de tu organización."
                alt="Lluvia de Ideas"
                img="/placeholders/lluvia-de-ideas.png"
                side="right"
            />

            <BlogSection
                title="Integración con tus herramientas favoritas"
                text="Conecta Sketchlie con las aplicaciones que ya utilizas. Importa datos, sincroniza cambios y mantén todos tus procesos actualizados automáticamente."
                alt="Customer Journey Map"
                img="/placeholders/customer-journey-map.png"
                side="right"
            />

            <BlogSection
                title="Análisis y optimización de procesos"
                text="Identifica cuellos de botella y oportunidades de mejora con nuestras herramientas de análisis integradas. Optimiza tus procesos basándote en datos reales y métricas clave."
                alt="Pizarra Online"
                img="/placeholders/pizarra-online.png"
                side="right"
            />
            <HowToCreate steps={steps} title="¿Cómo se crea un mapa de procesos?" img="/templates/mapa-de-proceso.png" alt="Mapa de procesos" cta="Crear mapa de procesos" />
            <TemplatesSlider />
            <div className="my-20">
                <PlatformYouCanTrust />
            </div>
            <FaqSection accordionData={faqData} sectionTitle="mapas mentales" />
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 xl:mx-[10%] lg:mx-[7%] md:mx-[5%] mx-[5%] gap-5 md:my-10 my-5">
                <VerMas title="¿Qué es un mapa de procesos?" href="/mapas-de-procesos/que-es-mapa-procesos" />
                <VerMas title="¿Cómo se crea un mapa de procesos?" href="/mapas-de-procesos/que-es-mapa-procesos" />
                <VerMas title="¿Cuáles son las ventajas de utilizar un mapa de procesos?" href="/mapas-de-procesos/que-es-mapa-procesos" />
            </div>
        </div>
    );
}

export default LandingPage;