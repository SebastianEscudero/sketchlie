import { BlogStructure } from "@/components/blog-structure";
import { Metadata } from "next";
import { BlogSection } from "@/components/blog-section";
import { LogoSlider } from "@/components/logo-slider";
import { FaqSection } from "@/components/faq-section";
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
import { LandingVideo } from "@/components/landing-video";

export const metadata: Metadata = {
    title: "Crea un modelo canvas online | Sketchlie",
    description: "Un modelo canvas es una herramienta de gestión estratégica que te permite visualizar y planificar tu modelo de negocio de manera clara y concisa.",
    keywords: ["modelo canvas", "canvas online", "modelo de negocio", "plan de negocio", "herramienta de gestión", "herramienta de planificación", "herramienta de visualización", "herramienta de estrategia", "herramienta de organización", "herramienta de creatividad", "herramienta de productividad", "herramienta de colaboración", "herramienta de brainstorming", "herramienta de toma de decisiones", "herramienta de innovación", "herramienta de diseño", "herramienta de desarrollo", "herramienta de análisis", "herramienta de evaluación", "herramienta de implementación", "herramienta de seguimiento", "herramienta de mejora", "herramienta de optimización", "herramienta de crecimiento", "herramienta de éxito", "herramienta de eficacia", "herramienta de eficiencia", "herramienta de rentabilidad", "herramienta de sostenibilidad", "herramienta de competitividad", "herramienta de diferenciación", "herramienta de posicionamiento", "herramienta de marketing", "herramienta de ventas", "herramienta de distribución", "herramienta de comunicación", "herramienta de servicio", "herramienta de soporte", "herramienta de atención al cliente", "herramienta de fidelización", "herramienta de retención", "herramienta de expansión", "herramienta de internacionalización", "herramienta de diversificación", "herramienta de innovación", "herramienta de transformación", "herramienta de adaptación", "herramienta de cambio", "herramienta de evolución", "herramienta de revolución", "herramienta de disrupción", "herramienta de impacto", "herramienta de éxito", "herramienta de crecimiento", "herramienta de liderazgo", "herramienta de emprendimiento", "herramienta de startup"],
    alternates: {
        canonical: "https://www.sketchlie.com/modelo-canvas/",
    }
};

const LandingPage = () => {
    const faqData = [
        {
            value: "item-1",
            trigger: "¿Qué es el modelo canvas?",
            content: "El modelo canvas, también conocido como Business Model canvas, es una herramienta de gestión estratégica que permite describir, diseñar, desafiar, inventar y pivotar tu modelo de negocio de manera visual y sencilla."
        },
        {
            value: "item-2",
            trigger: "¿Cuáles son los 9 bloques del modelo canvas?",
            content: "Los 9 bloques del modelo canvas son: Segmentos de clientes, Propuesta de valor, Canales, Relación con clientes, Fuentes de ingresos, Recursos clave, Actividades clave, Socios clave y Estructura de costes."
        },
        {
            value: "item-3",
            trigger: "¿Cómo se usa el modelo canvas?",
            content: "El modelo canvas se usa completando cada uno de los 9 bloques con información relevante de tu negocio. Se comienza por el segmento de clientes y se va avanzando, permitiendo visualizar todos los aspectos clave del modelo de negocio en una sola página."
        },
        {
            value: "item-4",
            trigger: "¿Cuáles son las ventajas del modelo canvas?",
            content: "Las principales ventajas del modelo canvas son su simplicidad visual, flexibilidad para adaptarse a diferentes tipos de negocios, capacidad para fomentar la innovación, y facilidad para compartir y colaborar en el desarrollo de modelos de negocio."
        },
        {
            value: "item-5",
            trigger: "¿Quién creó el modelo canvas?",
            content: "El modelo canvas fue creado por Alexander Osterwalder e Yves Pigneur, y fue presentado en el libro 'Business Model Generation' publicado en 2010."
        }
    ]

    const steps = [
        {
            trigger: "1. Identificar el segmento de clientes:",
            text: "Define claramente quiénes son tus clientes objetivos. Considera sus características demográficas, necesidades y comportamientos. Esta etapa es crucial para entender a quién vas a servir con tu propuesta de valor."
        },
        {
            trigger: "2. Desarrollar la propuesta de valor:",
            text: "Determina qué problema resuelves o qué necesidad satisfaces para tus clientes. Tu propuesta de valor debe ser única y atractiva, diferenciándote de la competencia y justificando por qué los clientes deberían elegirte."
        },
        {
            trigger: "3. Establecer canales y relaciones con clientes:",
            text: "Define cómo llegarás a tus clientes y cómo mantendrás la relación con ellos. Esto incluye canales de comunicación, distribución y venta, así como estrategias para fidelización y atención al cliente."
        },
        {
            trigger: "4. Determinar recursos y actividades clave:",
            text: "Identifica los recursos (físicos, intelectuales, humanos, financieros) y las actividades esenciales para que tu modelo de negocio funcione. Esto te ayudará a entender qué necesitas para crear y entregar tu propuesta de valor."
        },
        {
            trigger: "5. Analizar estructura de costes y fuentes de ingresos:",
            text: "Calcula los costes asociados a tu modelo de negocio y define cómo generarás ingresos. Esta etapa es vital para asegurar la viabilidad económica de tu proyecto y determinar tu estrategia de precios."
        }
    ]

    return (
        <div>
            <Breadcrumb className="xl:mx-[10%] lg:mx-[7%] md:mx-[5%] mx-[5%] mt-5">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <Link href="/" title="Home">Home</Link>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Modelo canvas</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <BlogStructure
                title="Creador de modelos canvas"
                description="Analiza tu empresa y planifica tu modelo de negocio con un modelo canvas. Visualiza tus ideas, identifica tus recursos clave y define tu propuesta de valor de manera clara y concisa. Crea un modelo canvas online y potencia tu creatividad y productividad."
                cta="Crea un modelo canvas"
                alt="Modelo canvas"
                img="/placeholders/modelo-canvas.png"
            />
            <LogoSlider />
            <LandingVideo />
            <div className="mb:my-28 my-14">
                <BlogSection
                    title="Visualiza tu modelo de negocio completo"
                    text="El modelo canvas te permite capturar toda la esencia de tu negocio en una sola página. Desde tus clientes hasta tus finanzas, obtén una vista panorámica de tu empresa y descubre nuevas oportunidades de crecimiento."
                />
            </div>
            <BlogSection
                title="Innova con facilidad y rapidez"
                text="Utiliza el lienzo canvas para iterar rápidamente sobre nuevas ideas. Su formato visual facilita la identificación de áreas de mejora y la generación de soluciones creativas para impulsar tu negocio hacia adelante."
                alt="Wireframe"
                img="/placeholders/wireframe.png"
                side="right"
            />
            <BlogSection
                title="Colabora eficazmente con tu equipo"
                text="El modelo canvas es una herramienta perfecta para el trabajo en equipo. Reúne a tus colaboradores, comparte ideas y construye una visión común de tu negocio. La claridad visual fomenta discusiones productivas y decisiones informadas."
                alt="Mapa de Proceso"
                img="/placeholders/improve-performance.png"
                side="right"
            />
            <BlogSection
                title="Adapta tu estrategia al mercado cambiante"
                text={
                    <>
                        Con el canvas, puedes ajustar rápidamente tu modelo de negocio a las nuevas realidades del mercado. Su flexibilidad te permite experimentar con diferentes escenarios y pivotear con confianza cuando sea necesario. Utiliza nuestra <Link href="/plantillas/modelo-canvas/" className="text-custom-blue hover:underline">plantilla de modelo canvas</Link> o parte desde cero.
                    </>
                }
                alt="Diagrama de Flujo"
                img="/placeholders/diagrama-de-flujo.png"
                side="right"
            />
            <BlogSection
                title="Desbloquea el potencial oculto de tu negocio"
                text="El modelo canvas actúa como una lupa para tu empresa, revelando conexiones y oportunidades que podrían pasar desapercibidas. Al mapear todos los elementos clave de tu negocio, podrás identificar fortalezas inexploradas, optimizar procesos y descubrir nuevas fuentes de valor para tus clientes y tu organización."
                alt="Pizarra Online"
                img="/placeholders/pizarra-online.png"
                side="right"
            />
            <HowToCreate steps={steps} title="¿Cómo se crea un modelo canvas?" img="/templates/modelo-canvas.png" alt="Modelo canvas" cta="Crear modelo canvas"/>
            <TemplatesSlider />
            <FaqSection accordionData={faqData} sectionTitle="el modelo canvas" />
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 xl:mx-[10%] lg:mx-[7%] md:mx-[5%] mx-[5%] gap-5 md:my-10 my-5">
                <VerMas title="¿Qué es el Modelo Canvas?" href="/modelo-canvas/que-es-modelo-canvas/" />
                <VerMas title="Los 9 bloques del Modelo Canvas" href="/modelo-canvas/que-es-modelo-canvas/" />
                <VerMas title="Consejos para optimizar tu Modelo Canvas" href="/modelo-canvas/que-es-modelo-canvas/" />
            </div>
        </div>
    );
}

export default LandingPage;