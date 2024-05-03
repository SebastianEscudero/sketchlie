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

export const metadata: Metadata = {
    title: "Realiza una lluvia de ideas online | Sketchlie",
    description: "Realiza una lluvia de ideas online de forma gratuita con Sketchlie. Comienza ahora y colabora con tu equipo en una sesion de lluvia de ideas.",
    keywords: ["lluvia de ideas", "colaboración en línea", "lluvia de ideas online"],
    alternates: {
        canonical: "https://www.sketchlie.com/lluvia-de-ideas/",
    }
};

const LandingPage = () => {

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
            <BlogStructure
                title="Realiza una lluvia de ideas efectiva"
                description="Una sesión de lluvia de ideas es un proceso grupal para generar ideas sobre un tema. Se sigue un proceso estructurado que incluye la identificación del problema, la generación de ideas y la selección de las más prometedoras para su desarrollo. Esto fomenta la creatividad y la innovación en diferentes contextos."
                cta="Empieza hoy gratis"
                alt="Lluvia de Ideas Image"
                img="/placeholders/lluvia-de-ideas.png"
            />
            <LogoSlider />
            <LandingVideo />
            <BlogSection 
                    title="El mejor lugar para lluvias de ideas"
                    text="Descubre cómo transformar conceptos complejos en ideas claras y creativas con una sesión de lluvia de ideas online. Utiliza la plataforma de Sketchlie para estructurar y capturar todas las ideas de tu equipo, ya sea para desarrollar un nuevo producto o para enriquecer una lección en clase. Aprovecha las herramientas de diseño disponibles para generar ideas innovadoras y cautivar a tu audiencia con soluciones únicas."
                    img="/placeholders/wireframe.png"
                    side="right"
                />
            <BlogSection 
                title="Organiza una sesión de lluvia de ideas efectiva" 
                text="Preparar una sesión de lluvia de ideas efectiva es clave para inspirar la creatividad y el pensamiento innovador en tu equipo. Con Sketchlie, simplifica este proceso al ofrecer una amplia gama de herramientas y funciones que facilitan la generación y captura de ideas."
                text2="Una vez finalizada la sesión, comparte fácilmente tus ideas utilizando el modo de presentación integrado en la plataforma. Además, características avanzadas como formatos condicionales y vinculación de datos garantizan una representación clara y organizada de las ideas."
                img="/placeholders/mapa-mental.png"
                side="right"
            />
            <BlogSection
                title="Convierte lluvias de ideas en soluciones innovadoras" 
                text="En Sketchlie, colaborar se vuelve simple, permitiendo compartir y trabajar en tiempo real con otros usuarios sin complicaciones. Al estar basado en la nube, ofrece una experiencia fluida y sin obstáculos, lo que facilita la colaboración entre equipos distribuidos geográficamente."
                text2="Con nosotros, es posible crear, compartir y colaborar en lluvias de ideas de manera eficiente y efectiva, mejorando significativamente el flujo de trabajo en la creación de soluciones."
                img="/placeholders/improve-performance.png"
                side="right"
            />
            <BlogSection
                title="Captura y da forma a tus ideas"
                text="Eleva la colaboración a un nivel superior, desde sesiones de lluvia de ideas hasta reuniones de seguimiento de proyectos, esta herramienta versátil y fácil de usar está diseñada para potenciar la creatividad y la productividad de tu equipo. Únete a la revolución de la colaboración online con Sketchlie y optimiza tus sesiones de lluvias de ideas."
                img="/placeholders/pizarra-online.png"
                side="right"
            />
            <div className="my-20">
                <PlatformYouCanTrust/>
            </div>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 xl:mx-[10%] lg:mx-[7%] md:mx-[5%] mx-[5%] gap-5 md:my-20 my-5">
                <BlogLinks blogTitle="Diagramas de flujo" blogImage="/placeholders/mapa-conceptual.png" blogHref="/diagrama-de-flujo/" blogDescription="Crea diagramas de flujo rápidamente y simplifica tus rutinas con el creador de diagramas de flujo de  con las herramientas de Sketchlie."/>
                <BlogLinks blogTitle="Pizarra Online" blogImage="/placeholders/improve-performance.png" blogHref="/pizarra-online/" blogDescription="Sketchlie es una pizarra online rápida, gratuita y fácil de usar pensada para  ayudarte a colaborar con cualquier persona desde cualquier lugar."/>
                <BlogLinks blogTitle="Wireframes" blogImage="/placeholders/wireframe.png" blogHref="/wireframe/" blogDescription="Empieza a visualizar tus ideas en minutos con nuestro intuitivo creador de wireframes. Crea esquemas de lo que necesites, desde páginas de inicio hasta formularios y menús, con nuestro creador de wireframes. "/>
            </div>
            <HowToCreate steps={steps} title="Cómo hacer una lluvia de ideas"/>
            <FaqSection accordionData={faqData} sectionTitle="las lluvias de ideas"/>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 xl:mx-[10%] lg:mx-[7%] md:mx-[5%] mx-[5%] gap-5 md:my-10 my-5">
                <VerMas title="¿Qué es una lluvia de ideas?" href="/lluvia-de-ideas/que-es-lluvia-de-ideas/"/>
                <VerMas title="Consejos y Trucos para una Lluvia de Ideas Exitosa" href="/lluvia-de-ideas/que-es-lluvia-de-ideas/"/>
                <VerMas title="Tipos de Lluvia de Ideas" href="/lluvia-de-ideas/que-es-lluvia-de-ideas/"/>
            </div>
        </div>

     );
}
 
export default LandingPage;
