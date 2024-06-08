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
    title: "Herramienta para diseñar productos online | Sketchlie",
    description: "Diseña productos online con Sketchlie. Crea wireframes, prototipos y colabora en tiempo real con tu equipo.",
    keywords: ["diseño de producto", "diseño de experiencia de usuario", "diseño de interfaz de usuario", "diseño UX", "diseño UI", "Sketchlie"],
    alternates: {
        canonical: "https://www.sketchlie.com/diseno-de-producto/",
    }
};

const LandingPage = () => {

    const steps = [
        {
            trigger: "1. Identificar las necesidades del usuario",
            text: "Realiza investigaciones para comprender las necesidades y deseos de tus usuarios. Utiliza encuestas, entrevistas y análisis de datos para obtener información valiosa."
        },
        {
            trigger: "2. Definir los objetivos del producto",
            text: "Establece objetivos claros y medibles para tu producto. Define qué problemas resolverá y qué valor agregará para los usuarios."
        },
        {
            trigger: "3. Crear prototipos",
            text: "Registrate en Sketchlie y comienza a crear prototipos de tu producto. Puedes partir con nuestra plantillas o crear tus propios diseños desde cero."
        },
        {
            trigger: "4. Obtener retroalimentación",
            text: "Comparte tus prototipos con usuarios potenciales y recopila sus comentarios. Aprovecha esta retroalimentación para realizar iteraciones y mejorar la experiencia del usuario."
        },
        {
            trigger: "5. Iterar y mejorar",
            text: "Continúa iterando en base a la retroalimentación de los usuarios y los datos recopilados. Realiza pruebas de usabilidad, analiza métricas clave y realiza ajustes para garantizar que tu producto cumpla con las expectativas y necesidades de los usuarios."
        }
    ];
    



    const faqData = [
        {
            value: "item-1",
            trigger: "¿Por qué es importante el diseño de productos?",
            content: "El diseño de productos es crucial porque define la experiencia del usuario, la funcionalidad y la estética de un producto, lo que puede influir en su éxito en el mercado."
        },
        {
            value: "item-2",
            trigger: "¿Cómo puedo identificar las necesidades de los usuarios para mi producto?",
            content: "Puedes identificar las necesidades de los usuarios realizando investigaciones como encuestas, entrevistas y análisis de datos para comprender sus deseos, problemas y comportamientos."
        },
        {
            value: "item-3",
            trigger: "¿Qué herramientas puedo usar para crear prototipos de productos?",
            content: "Existen diversas herramientas como Sketch, Figma y Sketchlie que son populares para crear prototipos de productos. Estas herramientas te permiten visualizar y probar la funcionalidad de tu producto antes de la implementación final."
        },
        {
            value: "item-4",
            trigger: "¿Cómo puedo obtener retroalimentación de los usuarios para mi producto?",
            content: "Puedes obtener retroalimentación de los usuarios compartiendo tus prototipos y realizando pruebas de usabilidad. Además, puedes utilizar encuestas, entrevistas y análisis de datos para recopilar comentarios y mejorar tu producto."
        },
        {
            value: "item-5",
            trigger: "¿Cuál es el proceso de iteración en el diseño de productos?",
            content: "El proceso de iteración en el diseño de productos implica recibir retroalimentación de los usuarios, analizar datos y realizar ajustes en el diseño para mejorar la experiencia del usuario. Este proceso se repite varias veces hasta alcanzar un producto final satisfactorio."
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
                        <BreadcrumbPage>Diseño de Producto</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <BlogStructure
                title="Espacio de trabajo online donde equipos de diseño crean productos excepcionales"
                description="Invita a todo tu equipo para diseñar productos de manera colaborativa y eficiente. Crea wireframes, prototipos y diseños de alta calidad en un solo lugar."
                cta="Regístrate gratis"
                alt="Diagrama"
                img="/placeholders/customer-journey-map.png"
            />
            <LogoSlider />
            <LandingVideo />
            <BlogSection
                title="Comunicación y colaboración eficientes"
                text="Los espacios de trabajo en línea permiten una comunicación y colaboración sin barreras, facilitando la coordinación de tareas y la resolución de problemas en tiempo real desde cualquier ubicación. Esta capacidad de mantener la productividad y el flujo de trabajo sin interrupciones es crucial en un entorno empresarial globalizado y altamente competitivo."
                alt="Diagrama de flujo"
                img="/placeholders/diagrama-de-flujo.png"
                side="right"
            />
            <BlogSection
                title="Acelera el diseño de tus productos"
                text="La rapidez con la que se puede desarrollar y lanzar un producto al mercado se incrementa significativamente con un espacio de colaboración en línea. Los equipos de diseño pueden trabajar de manera simultánea, haciendo ajustes y perfeccionando detalles en tiempo real. Esta eficiencia no solo ahorra tiempo, sino que también reduce costos, permitiendo que las empresas inviertan más en innovación y desarrollo."
                alt="Lluvia de Ideas"
                img="/placeholders/lluvia-de-ideas.png"
                side="right"
            />
            <BlogSection
                title="Agiliza tu gestión empresarial"
                text="Para la gestión empresarial, estos espacios proporcionan una agilidad invaluable. Los gerentes pueden supervisar el progreso de los proyectos en tiempo real, asignar recursos de manera eficiente y asegurarse de que todos los miembros del equipo estén alineados con los objetivos corporativos. Adoptar un espacio de colaboración en línea optimiza las operaciones diarias y prepara a la empresa para un crecimiento sostenido y exitoso en el competitivo panorama actual."
                alt="Línea de tiempo"
                img="/placeholders/linea-de-tiempo.png"
                side="right"
            />
            <BlogSection
                title="Fomenta un entorno de productividad"
                text="Los espacios de trabajo en línea fomentan un entorno de trabajo más inclusivo y flexible. Al permitir que los empleados trabajen desde cualquier lugar, estos espacios apoyan una cultura de trabajo remoto y flexible, lo cual es especialmente valioso en situaciones donde la presencia física no es posible o conveniente. Esto no solo mejora la moral del equipo, sino que también amplía las posibilidades de contratación, ya que se puede acceder a talento de cualquier parte del mundo."
                img="/placeholders/diagrama-ishikawa.png"
                side="right"
            />
            <TemplatesSlider />
            <div className="mt-10 mb-20">
                <PlatformYouCanTrust />
            </div>
            <HowToCreate steps={steps} title="Cómo diseña un producto con Sketchlie" />
            <FaqSection accordionData={faqData} sectionTitle="el proceso de diseño de productos" />
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 xl:mx-[10%] lg:mx-[7%] md:mx-[5%] mx-[5%] gap-5 md:my-10 my-5">
                <VerMas title="¿Qué es el diseño de productos?" href="/diseno/que-es-diseno/" />
                <VerMas title="¿Qué es el diseño UI?" href="/diseno/que-es-diseno/" />
                <VerMas title="¿Cuál es la diferencia entre diseño UI y UX?" href="/diseno/que-es-diseno/" />
            </div>
        </div>

    );
}

export default LandingPage;
