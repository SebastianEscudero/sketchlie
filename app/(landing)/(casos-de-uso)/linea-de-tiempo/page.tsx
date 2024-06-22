import { BlogStructure } from "@/components/blog-structure";
import { Metadata } from "next";
import { BlogSection } from "@/components/blog-section";
import { LogoSlider } from "@/components/logo-slider";
import { FaqSection } from "@/components/faq-section";
import { BlogLinks } from "@/components/blog-links";
import { PlatformYouCanTrust } from "@/components/platform-you-can-trust";
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

export const metadata: Metadata = {
    title: "Crea una Línea de Tiempo Online | Sketchlie",
    description: "Diseña líneas de tiempo interactivas y visualmente atractivas con Sketchlie. Organiza eventos, planifica proyectos y visualiza la historia de forma eficiente.",
    keywords: ["línea de tiempo", "timeline online", "herramienta de planificación", "visualización de eventos"],
    alternates: {
        canonical: "https://www.sketchlie.com/linea-de-tiempo/",
    }
};

const LandingPage = () => {

    const steps = [
        {
            trigger: "1. Definir el propósito",
            text: "Determina el objetivo de tu línea de tiempo. ¿Es para un proyecto, para visualizar la historia de una empresa, o para planificar eventos futuros?"
        },
        {
            trigger: "2. Recopilar información",
            text: "Reúne todos los datos relevantes, incluyendo fechas, eventos, hitos y cualquier detalle importante que quieras incluir en tu línea de tiempo."
        },
        {
            trigger: "3. Organizar cronológicamente",
            text: "Ordena tus eventos de forma cronológica. Decide si tu línea de tiempo será ascendente (del pasado al futuro) o descendente."
        },
        {
            trigger: "4. Diseñar la línea de tiempo",
            text: "Utiliza las herramientas de Sketchlie para crear una representación visual atractiva. Añade elementos gráficos, colores y formas para mejorar la legibilidad y el atractivo visual."
        },
        {
            trigger: "5. Añadir detalles y contexto",
            text: "Incluye descripciones breves, imágenes o enlaces para proporcionar más contexto a cada evento o hito en tu línea de tiempo."
        }
    ];

    const faqData = [
        {
            value: "item-1",
            trigger: "¿Qué es una línea de tiempo y para qué se utiliza?",
            content: "Una línea de tiempo es una representación gráfica que muestra eventos o hitos en orden cronológico. Se utiliza para visualizar la secuencia de eventos históricos, planificar proyectos, mostrar la evolución de una empresa o producto, y organizar información de manera clara y concisa."
        },
        {
            value: "item-2",
            trigger: "¿Qué tipos de líneas de tiempo puedo crear con Sketchlie?",
            content: "Con Sketchlie, puedes crear una amplia variedad de líneas de tiempo, incluyendo líneas de tiempo históricas, líneas de tiempo de proyectos, líneas de tiempo biográficas, líneas de tiempo de productos, y líneas de tiempo interactivas para presentaciones o sitios web."
        },
        {
            value: "item-3",
            trigger: "¿Cómo puedo personalizar mi línea de tiempo en Sketchlie?",
            content: "Sketchlie ofrece numerosas opciones de personalización. Puedes ajustar colores, fuentes, formas y estilos de línea. También puedes añadir imágenes, iconos y enlaces para hacer tu línea de tiempo más interactiva y atractiva visualmente."
        },
        {
            value: "item-4",
            trigger: "¿Puedo colaborar con otros en la creación de una línea de tiempo?",
            content: "Sí, Sketchlie permite la colaboración en tiempo real. Puedes invitar a miembros de tu equipo para trabajar juntos en la misma línea de tiempo, haciendo que sea fácil coordinar y compartir información en proyectos grupales."
        },
        {
            value: "item-5",
            trigger: "¿Es posible exportar o compartir mi línea de tiempo una vez terminada?",
            content: "Absolutamente. Sketchlie te permite exportar tu línea de tiempo en varios formatos, incluyendo PNG, PDF y SVG. También puedes compartir un enlace directo a tu línea de tiempo para que otros puedan verla o editarla, dependiendo de los permisos que establezcas."
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
                        <BreadcrumbPage>Línea de Tiempo</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <BlogStructure
                title="Crea Líneas de Tiempo Impactantes"
                description="Visualiza eventos, planifica proyectos y cuenta historias de manera efectiva con nuestras herramientas de línea de tiempo online. Sketchlie te ofrece una plataforma intuitiva para crear líneas de tiempo interactivas y visualmente atractivas."
                cta="Crea tu Línea de Tiempo Gratis"
                alt="Línea de Tiempo Interactiva"
                img="/placeholders/linea-de-tiempo.png"
            />
            <LogoSlider />
            <LandingVideo />
            <BlogSection
                title="Visualiza la Historia con Claridad"
                text={
                    <>
                        Transforma datos complejos en narrativas visuales convincentes con las líneas de tiempo de Sketchlie. Ya sea que estés mapeando la historia de tu empresa, planificando un proyecto a largo plazo o presentando una secuencia de eventos históricos, nuestra <Link href="/plantillas/linea-de-tiempo/" className="text-custom-blue hover:underline">plantilla de línea de tiempo</Link> te ayudará a comunicar tu mensaje de manera efectiva y memorable.
                    </>
                }
                alt="Línea de Tiempo Histórica"
                img="/placeholders/modelo-canvas.png"
                side="right"
            />
            <BlogSection
                title="Planificación de Proyectos Simplificada"
                text="Optimiza la gestión de tus proyectos con líneas de tiempo interactivas. Visualiza fases, hitos y deadlines de manera clara, permitiendo a tu equipo comprender fácilmente el progreso y los próximos pasos. Con Sketchlie, la planificación y seguimiento de proyectos se vuelve más intuitiva y eficiente."
                text2="Nuestras herramientas de colaboración en tiempo real aseguran que todos los miembros del equipo estén sincronizados y actualizados sobre el estado del proyecto."
                alt="Línea de Tiempo de Proyecto"
                img="/placeholders/mapa-de-procesos.png"
                side="right"
            />
            <BlogSection
                title="Presenta Datos de Forma Impactante"
                text="Convierte datos y estadísticas en visualizaciones atractivas con nuestras líneas de tiempo personalizables. Ideal para presentaciones, informes y análisis de tendencias, Sketchlie te permite crear líneas de tiempo que no solo informan, sino que también cautivan a tu audiencia."
                text2="Integra fácilmente gráficos, imágenes y enlaces para enriquecer tu línea de tiempo y proporcionar un contexto más profundo."
                alt="Línea de Tiempo de Datos"
                img="/placeholders/lluvia-de-ideas.png"
                side="right"
            />
            <BlogSection
                title="Colaboración Sin Límites"
                text="Fomenta la colaboración efectiva en tu equipo con nuestras funciones de edición en tiempo real. Trabaja simultáneamente en la misma línea de tiempo, compartiendo ideas y realizando ajustes al instante. Perfecto para equipos remotos o distribuidos, Sketchlie asegura que todos estén en la misma página, literalmente."
                alt="Colaboración en Línea de Tiempo"
                img="/placeholders/diagrama-ishikawa.png"
                side="right"
            />
            <HowToCreate steps={steps} title="Cómo Crear una Línea de Tiempo Efectiva" img="/templates/linea-de-tiempo.png" alt="Creación de Línea de Tiempo" cta="Crea tu Línea de Tiempo"/>
            <TemplatesSlider />
            <div className="my-20">
                <PlatformYouCanTrust />
            </div>
            <FaqSection accordionData={faqData} sectionTitle="líneas de tiempo" />
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 xl:mx-[10%] lg:mx-[7%] md:mx-[5%] mx-[5%] gap-5 md:my-10 my-5">
                <VerMas title="Cómo hacer una línea de tiempo" href="/linea-de-tiempo/que-es-linea-de-tiempo/" />
                <VerMas title="Tipos de líneas de tiempo" href="/linea-de-tiempo/que-es-linea-de-tiempo/" />
                <VerMas title="Razones para hacer un cronograma" href="/linea-de-tiempo/que-es-linea-de-tiempo/" />
            </div>
        </div>
    );
}

export default LandingPage;