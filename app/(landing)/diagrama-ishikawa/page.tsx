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
    title: "Creador de diagramas de espina o pescado | Sketchlie",
    description: "Crea diagramas de espina de pescado en línea con Sketchlie. Utiliza nuestra herramienta de diagrama de Ishikawa para identificar y visualizar causas y efectos.",
    keywords: ["diagrama de espina de pescado", "diagrama de ishikawa", "diagrama de causa y efecto", "diagrama de pescado", "diagrama de espina de pescado en línea"],
    alternates: {
        canonical: "https://www.sketchlie.com/diagrama-ishikawa/",
    }
};

const LandingPage = () => {
    const faqData = [
        {
            value: "item-1",
            trigger: "¿Qué es un Diagrama de Ishikawa?",
            content: "El Diagrama de Ishikawa, también conocido como diagrama de espina de pescado o diagrama de causa y efecto, es una herramienta utilizada para identificar y visualizar las posibles causas de un problema o un efecto no deseado en un proceso. Se utiliza ampliamente en diversos campos, desde la manufactura hasta la gestión empresarial, para analizar y abordar problemas de manera sistemática."
        },
        {
            value: "item-2",
            trigger: "¿Cómo se crea un Diagrama de Ishikawa?",
            content: "Para crear un diagrama de pescado, primero se define claramente el problema que se desea analizar. Luego, se identifican y categorizan las posibles causas del problema en espina principal del pescado, que representan las categorías generales de posibles causas, y se subdivide cada espina en huesos, que representan causas más específicas dentro de esa categoría. Finalmente, se analizan y priorizan las causas identificadas para desarrollar un plan de acción."
        },
        {
            value: "item-3",
            trigger: "¿Cuándo se debe utilizar un Diagrama de Ishikawa?",
            content: "El Diagrama de Ishikawa es útil cuando se enfrenta a problemas complejos que requieren un análisis exhaustivo de las posibles causas subyacentes. Se puede utilizar en una variedad de contextos, desde la manufactura hasta la gestión empresarial y la resolución de problemas en equipo. Es especialmente eficaz para problemas multifactoriales donde se necesita comprender la interacción entre diferentes variables."
        },
        {
            value: "item-4",
            trigger: "¿Qué representan las espinas y los huesos en un Diagrama de Ishikawa?",
            content: "En un diagrama de espinas de pescado, las espinas son las líneas principales que se ramifican desde la cabeza del pescado y representan las categorías generales de posibles causas relacionadas con el problema. Los huesos son las subdivisiones de cada espina y representan causas más específicas dentro de esa categoría. Cada hueso puede contener múltiples factores que podrían contribuir al problema."
        },
        {
            value: "item-5",
            trigger: "¿Cuáles son las ventajas de utilizar un Diagrama de Ishikawa?",
            content: "Entre las ventajas de utilizar un Diagrama de Ishikawa se incluyen su capacidad para visualizar y organizar las posibles causas de un problema de manera sistemática, lo que facilita el análisis y la identificación de soluciones efectivas. Además, fomenta la colaboración entre equipos al proporcionar una estructura clara y compartida para el análisis de problemas."
        },
        {
            value: "item-7",
            trigger: "¿Cuáles son las categorías típicas utilizadas en un Diagrama de Ishikawa?",
            content: "En un Diagrama de Ishikawa, las categorías típicas incluyen:\n\n1. Personal: Factores relacionados con las personas involucradas en el proceso, como habilidades, capacitación, motivación y actitudes.\n2. Procesos: Aspectos del proceso de trabajo, incluidos los métodos, procedimientos, flujos de trabajo y sistemas utilizados.\n3. Producto: Características del producto o servicio que pueden influir en el problema, como calidad, diseño, materiales y especificaciones.\n4. Máquinas: Elementos relacionados con el equipo, maquinaria o herramientas utilizadas en el proceso, incluyendo mantenimiento, calibración y funcionamiento.\n5. Medio ambiente: Condiciones ambientales que podrían afectar al proceso, como temperatura, humedad, iluminación y condiciones de trabajo."
          }
    ]          

    const steps = [
        {
            trigger: "1. Eliga la plantilla de diagrama ishikawa",
            text: <>
                    Elige nuestra <Link href="/plantillas/diagrama-ishakawa/" className="text-custom-blue hover:underline" target="_blank">plantilla de diagrama</Link> de espina de pescado para comenzar a crear tu diagrama. Puedes personalizar la plantilla con tus propios colores, fuentes y estilos para que se adapte a tus necesidades.
                  </>
        },
        {
            trigger: "2. Identifica el problema",
            text: "Después de identificar el problema escribelo en la cabeza del pescado en el triángulo a la derecha de la línea horizontal."
        },
        {
            trigger: "3. Identifica las causas",
            text: "Escribe las causas que crees que están contribuyendo al problema en las espinas del pescado. Puedes agregar tantas espinas como sea necesario para representar todas las posibles causas del problema."
        },
        {
            trigger: "4 Agrega ramas adicionales",
            text: "Si es necesario, puedes agregar ramas adicionales a las espinas para representar causas secundarias o sub-causas del problema. Esto te ayudará a identificar las relaciones entre las diferentes causas y a comprender mejor cómo se relacionan entre sí."
        },
        {
            trigger: "5. Analiza las causas",
            text: "Una vez que hayas identificado todas las posibles causas del problema, analízalas para determinar cuáles son las más importantes o relevantes. Esto te ayudará a priorizar las causas y a identificar las áreas en las que debes enfocar tus esfuerzos para resolver el problema."
        }
    ]

    return (
        <div>
            <Breadcrumb className="xl:mx-[10%] lg:mx-[7%] md:mx-[5%] mx-[5%] mt-5">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <Link href="/">Home</Link>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Diagrama Ishikawa</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <BlogStructure
                title="Herramienta de diagrama de espina de pescado"
                description="Utiliza nuestras herramientas de diseño para simplificar datos complicados. Explora nuestra variedad de íconos y colores, y agrega enlaces o incrusta elementos en tu diagrama de ishikawa."
                cta="Crear diagrama"
                alt="Diagrama Ishikawa"
                img="/placeholders/diagrama-ishikawa.png"
            />
            <LogoSlider />
            <LandingVideo />
            <div className="mb:my-28 my-14">
                <BlogSection
                    title="Analiza las causas y los efectos con nuestra plantilla de diagrama de espina de pescado"
                    text="Convierte problemas complejos en soluciones claras con nuestro creador de diagramas de espina de pescado. Nuestra plantilla de diagrama de Ishikawa te permite identificar y visualizar las posibles causas de un problema o un efecto no deseado en un proceso. Organiza y analiza datos complejos de manera efectiva y colabora con tu equipo en tiempo real para encontrar soluciones rápidas y efectivas."
                />
            </div>
            <BlogSection
                title="Comienza gratis con nuestra plantilla"
                text={
                    <>
                        Puedes accelerar tu flujo de trabajo con nuestra <Link href="/plantillas/diagrama-ishikawa/" className="text-custom-blue hover:underline">plantilla de diagrama ishikawa</Link>. Puedes personalizar la plantilla con tus propios colores, fuentes y estilos para que se adapte a tus necesidades, encontrar soluciones pertinentes y escalables nunca había sido tan fácil.
                    </>
                }
                img="/templates/diagrama-ishikawa.png"
                side="right"
            />
            <BlogSection
                title="Colabora en tiempo real con tu equipo"
                text="Sketchlie fue creado con el proposito de ser utilizado por equipos de todo el mundo. Nuestra plataforma en línea te permite colaborar con tu equipo en tiempo real, sin importar dónde se encuentren. Trabaja juntos en la creación de diagramas de espina de pescado, comparte ideas y comentarios, y toma decisiones informadas de manera rápida y eficiente."
                img="/placeholders/improve-performance.png"
                side="right"
            />
            <BlogSection
                title="Crea un Diagrama de Flujo Online de Forma Intuitiva con Sketchlie"
                text="Descubre cómo crear diagramas de flujo de manera intuitiva y colaborativa con Sketchlie. Nuestra plataforma en línea te ofrece herramientas poderosas para visualizar procesos, organizar información y colaborar con tu equipo en tiempo real. Simplifica la comunicación y la planificación de proyectos con nuestras funciones intuitivas y fáciles de usar. ¡Comienza a mapear tus flujos hoy mismo con Sketchlie!"
                img="/placeholders/diagrama-de-flujo.png"
                side="right"
            />
            <TemplatesSlider />
            <div className="my-20">
                <PlatformYouCanTrust />
            </div>
            <HowToCreate steps={steps} title="Cómo hacer un diagrama de flujo"/>
            <FaqSection accordionData={faqData} sectionTitle="diagramas de flujo" />
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 xl:mx-[10%] lg:mx-[7%] md:mx-[5%] mx-[5%] gap-5 md:my-10 my-5">
                <VerMas title="Que significa cada parte del diagrama de pescado" href="/diagrama-ishikawa/que-es-diagrama-ishikawa/" />
                <VerMas title="Pasos para Crear un Diagrama Ishikawa en Línea" href="/diagrama-ishikawa/que-es-diagrama-ishikawa/" />
                <VerMas title="Consejos para un Diagrama Ishikawa Efectivo" href="/diagrama-ishikawa/que-es-diagrama-ishikawa/" />
            </div>
        </div>

    );
}

export default LandingPage;