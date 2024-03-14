import { BlogStructure } from "@/components/blog-structure";
import { Metadata } from "next";
import { BlogSection } from "@/components/blog-section";
import { LogoSlider } from "@/components/logo-slider";
import { FaqSection } from "@/components/faq-section";
import { BlogLinks } from "@/components/blog-links";
import { PlatformYouCanTrust } from "@/components/platform-you-can-trust";
import { LandingVideo } from "@/components/landing-video";

export const metadata: Metadata = {
    title: "Crea un Mapa Conceptual online gratis | Sketchlie",
    description: "Crea mapas conceptuales online de forma gratuita con Sketchlie. Comienza ahora y colabora con tu equipo en el diseño de mapas conceptuales.",
    keywords: ["mapa conceptual", "mapa conceptual online", "mapa conceptual gratis", "conceptos clave", "miembros de tu equipo", "frases de enlace", "conceptos complejos", "google drive", "creación de mapas", "plantillas de mapas conceptuales", "creador de mapas conceptuales", "compartir tu mapa conceptual", "forma rápida y sencilla", "temas y subtemas", "lluvia de ideas", "haz clic", "mapas conceptuales en línea", "colabora en tiempo real", "mapas conceptuales online"],
    alternates: {
        canonical: "https://www.sketchlie.com/mapa-conceptual",
    }
};

const LandingPage = () => {
    const faqData = [
        {
            value: "item-1",
            trigger: "¿Qué es un mapa conceptual?",
            content: "Un mapa conceptual es una representación gráfica de ideas y conceptos interconectados. Se utiliza para organizar información de manera visual y comprender mejor las relaciones entre diferentes temas o elementos. En un mapa conceptual, los conceptos principales se colocan en el centro y se conectan con líneas a conceptos secundarios o relacionados, creando una estructura jerárquica. Esto ayuda a ver cómo se relacionan las ideas y cómo se agrupan en categorías o temas más amplios. Los mapas conceptuales son útiles para estudiar, planificar proyectos, tomar decisiones y comunicar ideas de manera clara y concisa. Son ampliamente utilizados en entornos educativos y profesionales debido a su capacidad para simplificar información compleja y facilitar la comprensión."
        },
        {
            value: "item-2",
            trigger: "¿Cómo se crea un mapa conceptual?",
            content: "Para crear un mapa conceptual, primero debes identificar el tema o problema que deseas explorar. Luego, comienza a anotar los conceptos clave relacionados con el tema central. A medida que agregas conceptos, busca las relaciones entre ellos y agrúpalos en categorías o temas más amplios. Utiliza líneas o flechas para conectar los conceptos y mostrar cómo se relacionan entre sí. A medida que avances, puedes agregar detalles adicionales, como ejemplos, definiciones o explicaciones, para enriquecer tu mapa conceptual. Al final, tu mapa conceptual debe reflejar una estructura jerárquica clara y mostrar las relaciones entre los conceptos de manera visual. Puedes utilizar herramientas de software especializadas, como Sketchlie, para crear mapas conceptuales de forma rápida y sencilla, y compartirlos con otros usuarios para colaborar en tiempo real."
        },
        {
            value: "item-3",
            trigger: "¿Qué características tiene un mapa conceptual?",
            content: "Un mapa conceptual típico tiene varias características clave que lo hacen efectivo para organizar y representar información de manera visual. Estas características incluyen:\n\n• Jerarquía: Los conceptos se organizan en niveles jerárquicos, con el concepto principal en el centro y los conceptos secundarios o relacionados conectados a él.\n\n• Conexiones: Los conceptos se conectan con líneas o flechas para mostrar cómo se relacionan entre sí y forman una estructura coherente.\n\n• Categorización: Los conceptos se agrupan en categorías o temas más amplios para mostrar cómo se relacionan entre sí y forman un todo coherente.\n\n• Simplificación: Los mapas conceptuales simplifican la información compleja y la presentan de manera clara y concisa, lo que facilita la comprensión y el análisis.\n\n• Flexibilidad: Los mapas conceptuales son flexibles y se pueden modificar fácilmente para reflejar cambios en la información o en la comprensión del tema. Estas características hacen que los mapas conceptuales sean una herramienta poderosa para organizar y representar información de manera visual y comprensible."
        },
        {
            value: "item-4",
            trigger: "¿Cuáles son los beneficios de usar mapas conceptuales?",
            content: "Los mapas conceptuales ofrecen beneficios en la organización, comprensión, creatividad, planificación y comunicación. Son una herramienta poderosa para organizar, comprender y comunicar información de manera efectiva y eficiente."
        },
        {
            value: "item-5",
            trigger: "¿Para qué puedo usar un mapa conceptual?",
            content: "Los mapas conceptuales son útiles en una amplia variedad de contextos, incluyendo:\n\n• Estudio: Los mapas conceptuales son una herramienta efectiva para organizar y comprender información compleja, lo que los hace útiles para estudiar y repasar temas académicos o profesionales.\n\n• Planificación: Los mapas conceptuales son útiles para planificar proyectos, presentaciones, informes y otros trabajos que requieren la organización y comprensión de información compleja.\n\n• Toma de decisiones: Los mapas conceptuales son útiles para analizar problemas, identificar soluciones y tomar decisiones informadas basadas en la comprensión clara de las relaciones entre los conceptos.\n\n• Comunicación: Los mapas conceptuales son útiles para comunicar ideas de manera clara y concisa, lo que los hace efectivos para presentaciones, informes, reuniones y otros contextos de comunicación.\n\n• Creatividad: Los mapas conceptuales fomentan la creatividad al permitir a los usuarios explorar y visualizar nuevas ideas y relaciones entre conceptos. Estos son solo algunos ejemplos de cómo se pueden utilizar los mapas conceptuales. En general, los mapas conceptuales son una herramienta versátil y poderosa para organizar, comprender y comunicar información de manera visual y efectiva."
        },
        {
            value: "item-6",
            trigger: "¿Se pueden hacer mapas conceptuales con Sketchlie?",
            content: "Sí, Sketchlie te permite crear mapas conceptuales de forma rápida y sencilla. Puedes agregar conceptos, conectarlos con líneas o flechas, y organizarlos en una estructura jerárquica para representar visualmente las relaciones entre los conceptos. Además, puedes compartir tu mapa conceptual con otros usuarios para colaborar en tiempo real y enriquecerlo con ideas adicionales."
        },
        {
            value: "item-7",
            trigger: "¿Los mapas conceptuales de Sketchlie son gratuitos?",
            content: "Sí, puedes crear mapas conceptuales 100% gratuitos con Sketchlie. Además, puedes compartir tus mapas conceptuales con otros usuarios para colaborar en tiempo real sin costo adicional."
        }
    ];
    
    return ( 
        <div>
            <BlogStructure
                title="La manera más fácil de crear mapas conceptuales online"
                description="Crea mapas conceptuales online de forma gratuita con Sketchlie. Comienza ahora y colabora con tu equipo en el diseño de mapas conceptuales."
                cta="Crear mapa conceptual"
                img="/placeholders/mapa-conceptual.png"
            />
            <LogoSlider />
            <LandingVideo />
            <div className="mb:my-28 my-14">
                <BlogSection 
                    title="Crea un Mapa Conceptual Online de manera gratuita con Sketchlie" 
                    text="Descubre cómo desatar tu creatividad y potenciar la colaboración en tiempo real. Nuestra plataforma gratuita de mapas conceptuales te ofrece una forma intuitiva de visualizar ideas, compartir conocimientos y trabajar en proyectos de manera colaborativa. Con Sketchlie, rompe barreras geográficas y colabora sin límites. ¡Empieza a mapear tus ideas hoy mismo!"
                />
            </div>
            <BlogSection 
                title="Facilitando la Colaboración Remota con Mapas Conceptuales" 
                text="En un mundo cada vez más conectado, la colaboración remota se ha vuelto esencial. Descubre cómo los mapas conceptuales online pueden facilitar la comunicación, la planificación y la ejecución de proyectos, permitiendo a equipos dispersos trabajar de manera efectiva hacia objetivos comunes. Colabora en tiempo real con tu equipo y desbloquea la creatividad para abordar conceptos complejos."
                img="/placeholders/mapa-mental.png"
                side="right"
            />
            <BlogSection
                title="Potenciando la Creatividad Colectiva" 
                text="La colaboración en tiempo real se convierte en una experiencia fluida y dinámica. Imagina poder trabajar simultáneamente en un mapa conceptual con colegas de todo el mundo, intercambiando ideas y generando nuevas perspectivas en tiempo real. Descubre cómo esta herramienta puede transformar la forma en que trabajas. Utiliza plantillas de mapas conceptuales y frases de enlace para enriquecer tus sesiones de lluvia de ideas."
                img="/placeholders/improve-performance.png"
                side="right"
            />
            <BlogSection
                title="Desde la Idea hasta la Ejecución" 
                text="Simplifica la planificación y gestión de proyectos, proporcionando una plataforma centralizada para organizar tareas, asignar responsabilidades y realizar un seguimiento del progreso. Con herramientas integradas para la colaboración y la comunicación, llevar tus proyectos desde la concepción hasta la ejecución nunca ha sido tan fácil. Comparte tus mapas conceptuales directamente desde Google Drive para una colaboración aún más fluida."
                img="/placeholders/diagrama-de-flujo.png"
                side="right"
            />
            <BlogSection
                title="Tu Herramienta Esencial para la Creatividad Colaborativa" 
                text="Lleva la colaboración a un nivel completamente nuevo. Desde sesiones de lluvia de ideas hasta reuniones de seguimiento de proyectos, esta herramienta versátil y fácil de usar está diseñada para potenciar la creatividad y la productividad de tu equipo. Únete a la revolución de la colaboración online con Sketchlie. Haz clic para crear mapas conceptuales en línea y compartirlos con tu equipo en tiempo real."
                img="/placeholders/pizarra-online.png"
                side="right"
            />
            <div className="my-20">
                <PlatformYouCanTrust/>
            </div>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 lg:mx-[10%] mx-[5%]">
                <BlogLinks blogTitle="Diagramas de flujo" blogImage="/placeholders/mapa-conceptual.png" blogHref="/diagrama-de-flujo" blogDescription="Crea diagramas de flujo rápidamente y simplifica tus rutinas con el creador de diagramas de flujo de  con las herramientas de Sketchlie."/>
                <BlogLinks blogTitle="Pizarra Online" blogImage="/placeholders/improve-performance.png" blogHref="/pizarra-online" blogDescription="Sketchlie es una pizarra online rápida, gratuita y fácil de usar pensada para  ayudarte a colaborar con cualquier persona desde cualquier lugar."/>
                <BlogLinks blogTitle="Wireframes" blogImage="/placeholders/wireframe.png" blogHref="/wireframe" blogDescription="Empieza a visualizar tus ideas en minutos con nuestro intuitivo creador de wireframes. Crea esquemas de lo que necesites, desde páginas de inicio hasta formularios y menús, con nuestro creador de wireframes. "/>
            </div>
            <FaqSection accordionData={faqData} sectionTitle="un mapa conceptual"/>
        </div>

     );
}
 
export default LandingPage;
