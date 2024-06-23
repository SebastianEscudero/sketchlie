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

export const metadata: Metadata = {
    title: "Realiza una lluvia de ideas online | Sketchlie",
    description: "Potencia tu creatividad con Sketchlie, la plataforma líder en lluvia de ideas online. Colabora en tiempo real, visualiza conceptos y transforma ideas en acción. Prueba gratis hoy.",
    keywords: ["lluvia de ideas", "brainstorming", "ideación visual", "colaboración creativa", "mapas mentales", "Sketchlie"],
    alternates: {
        canonical: "https://www.sketchlie.com/lluvia-de-ideas/",
    }
};

const LluviaDeIdeas = () => {

    const steps = [
        {
            trigger: "1. Establecer objetivo",
            text: "Antes de comenzar, define claramente qué problema o pregunta estás tratando de resolver. Establece los límites del tema a explorar para evitar desviaciones durante la sesión de lluvia de ideas."
        },
        {
            trigger: "2. Reunir equipo",
            text: "Invita a personas con diferentes antecedentes, experiencias y perspectivas relevantes al tema en cuestión. La diversidad en el equipo puede conducir a una mayor variedad y calidad de ideas."
        },
        {
            trigger: "3. Generar ideas",
            text: "Durante la sesión de lluvia de ideas, anima a todos los participantes a compartir todas las ideas que se les ocurran, sin importar lo absurdas que puedan parecer. Fomenta un ambiente libre de críticas para estimular la creatividad y la participación."
        },
        {
            trigger: "4. Registrar y categorizar",
            text: "A medida que se generan las ideas, registra cada una de manera clara y visible para todos los participantes. Luego, organiza las ideas en categorías o temas similares para facilitar su análisis y evaluación posterior."
        },
        {
            trigger: "5. Evaluar y planificar acción",
            text: "Una vez que se han generado suficientes ideas, revisa y evalúa cada una para identificar las más prometedoras o relevantes para el objetivo establecido. Luego, desarrolla un plan de acción basado en estas ideas seleccionadas, asignando responsabilidades y estableciendo plazos."
        }
    ];





    const faqData = [
        {
            value: "item-1",
            trigger: "¿Qué es una lluvia de ideas?",
            content: "Una lluvia de ideas, también conocida como brainstorming, es una técnica ampliamente utilizada para generar ideas de manera creativa y sin restricciones. Se basa en la colaboración y el intercambio de ideas dentro de un grupo, sin críticas ni juicios, con el objetivo de explorar nuevas perspectivas y encontrar soluciones innovadoras a problemas específicos."
        },
        {
            value: "item-2",
            trigger: "¿Quién debe participar en una sesión de lluvia de ideas?",
            content: "Idealmente, deben participar personas con diferentes antecedentes, experiencias y perspectivas relevantes al tema en cuestión. La diversidad en el equipo puede conducir a una mayor variedad y calidad de ideas."
        },
        {
            value: "item-3",
            trigger: "¿Cuánto tiempo debe durar una sesión de lluvia de ideas?",
            content: "El tiempo ideal puede variar dependiendo de la complejidad del tema y el tamaño del grupo, pero generalmente una sesión de lluvia de ideas puede durar entre 30 minutos y 1 hora para mantener la concentración y la creatividad."
        },
        {
            value: "item-4",
            trigger: "¿Cómo puedo garantizar que las ideas de mi lluvia de ideas?",
            content: "Para fomentar la originalidad, anima a los participantes a pensar fuera de lo común y a construir sobre las ideas de los demás. Además, establece un ambiente libre de críticas donde se valore la creatividad y la diversidad de pensamiento."
        },
        {
            value: "item-5",
            trigger: "¿Qué hago si la sesión de lluvia de ideas se estanca?",
            content: "Si la sesión se estanca, prueba a cambiar el enfoque o la técnica de generación de ideas. Puedes realizar ejercicios de estimulación creativa, como analogías o asociaciones aleatorias, para reactivar la creatividad del grupo."
        },
        {
            value: "item-6",
            trigger: "¿Cómo selecciono las mejores ideas de la lluvia de ideas?",
            content: "Después de generar una amplia variedad de ideas, revisa y evalúa cada una para identificar aquellas que son más prometedoras o relevantes para el objetivo establecido. Luego, puedes utilizar técnicas de votación o consenso para seleccionar las mejores ideas."
        },
        {
            value: "item-7",
            trigger: "¿Cuál es el siguiente paso después de una lluvia de ideas?",
            content: "Después de una lluvia de ideas, el siguiente paso es evaluar las ideas generadas, desarrollar un plan de acción basado en las ideas seleccionadas y asignar responsabilidades para su implementación. Es importante llevar a cabo un seguimiento de las acciones acordadas para garantizar su ejecución."
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
                        <BreadcrumbPage>Lluvia de Ideas</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <BlogStructure
                title="Desata tu Creatividad con Lluvia de Ideas Visual"
                description="Transforma tu proceso de ideación con Sketchlie. Colabora en tiempo real, visualiza conceptos y lleva tus mejores ideas del pensamiento a la acción. Nuestra plataforma intuitiva hace que la lluvia de ideas sea más efectiva, divertida y productiva que nunca."
                cta="Empieza Gratis"
                alt="Lluvia de Ideas"
                img="/placeholders/lluvia-de-ideas.png"
            />
            <LogoSlider />
            <LandingVideo />
            <BlogSection
                title="Lienzo Infinito para Ideas Sin Límites"
                text="Libera tu creatividad en nuestro lienzo digital ilimitado. Captura cada chispa de inspiración con notas adhesivas virtuales, dibujos a mano alzada y elementos multimedia. Organiza y reorganiza tus ideas con facilidad, permitiendo que los patrones y conexiones emerjan naturalmente."
                alt="Modelo Canvas"
                img="/placeholders/modelo-canvas.png"
                side="right"
            />
            <BlogSection
                title="Colaboración en Tiempo Real para Mentes Brillantes"
                text="Reúne a tu equipo, sin importar dónde se encuentren. Sketchlie permite que todos contribuyan simultáneamente, viendo las ideas fluir en tiempo real. Fomenta la participación equitativa y aprovecha la diversidad de pensamiento para generar soluciones verdaderamente innovadoras."
                alt="Mapa de Procesos"
                img="/placeholders/mapa-de-procesos.png"
                side="right"
            />
            <BlogSection
                title="Visualización Poderosa para Claridad Conceptual"
                text="Transforma ideas abstractas en conceptos tangibles con nuestras herramientas de visualización. Crea mapas mentales, diagramas de flujo y esquemas visuales que clarifican el pensamiento y revelan nuevas perspectivas. Haz que las ideas complejas sean fácilmente comprensibles y accionables."
                alt="Customer Journey Map"
                img="/placeholders/customer-journey-map.png"
                side="right"
            />
            <BlogSection
                title="De la Ideación a la Acción: Prioriza y Ejecuta"
                text="No dejes que las grandes ideas se queden en el aire. Utiliza nuestras funciones de votación y priorización para identificar los conceptos más prometedores. Convierte ideas en tareas accionables y sigue su progreso, asegurando que la inspiración se traduzca en resultados tangibles."
                img="/placeholders/diagrama-ishikawa.png"
                alt="Diagrama Ishikawa"
                side="right"
            />
            <HowToCreate steps={steps} title="¿Cómo se hacer una sesión de lluvia de ideas?" img="/templates/lluvia-de-ideas.png" alt="Lluvia de ideas" cta="Hacer lluvia de ideas"/>
            <TemplatesSlider />
            <div className="mt-10 mb-20">
                <PlatformYouCanTrust />
            </div>
            <FaqSection accordionData={faqData} sectionTitle="lluvia de ideas y Sketchlie" />
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 xl:mx-[10%] lg:mx-[7%] md:mx-[5%] mx-[5%] gap-5 md:my-10 my-5">
                <VerMas title="¿Qué es una lluvia de ideas?" href="/lluvia-de-ideas/que-es-lluvia-de-ideas/" />
                <VerMas title="Consejos y Trucos para una Lluvia de Ideas Exitosa" href="/lluvia-de-ideas/que-es-lluvia-de-ideas/" />
                <VerMas title="Tipos de Lluvia de Ideas" href="/lluvia-de-ideas/que-es-lluvia-de-ideas/" />
            </div>
        </div>
    );
}

export default LluviaDeIdeas;