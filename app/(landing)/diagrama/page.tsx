import { BlogStructure } from "@/components/blog-structure";
import { Metadata } from "next";
import { BlogSection } from "@/components/blog-section";
import { LogoSlider } from "@/components/logo-slider";
import { FaqSection } from "@/components/faq-section";
import { BlogLinks } from "@/components/blog-links";
import { PlatformYouCanTrust } from "@/components/platform-you-can-trust";
import { LandingVideo } from "@/components/landing-video";
import { HowToCreate } from "@/components/how-to-create";

export const metadata: Metadata = {
    title: "Herramienta para crear diagramas online | Sketchlie",
    description: "Crea diagramas online de forma gratuita con Sketchlie. Comienza ahora y colabora con tu equipo en el diseño de diagramas online.",
    keywords: ["diagrama", "diagrama online"],
    alternates: {
        canonical: "https://www.sketchlie.com/diagrama",
    }
};

const LandingPage = () => {

    const steps = [
        {
            trigger: "Paso 1: Definir el tipo de diagrama",
            text: "Comienza por determinar el tipo de diagrama que necesitas. ¿Buscas un diagrama de flujo, un diagrama de Gantt, o quizás un diagrama de Venn? Identifica el tipo que se ajuste mejor a tus necesidades y considera la posibilidad de utilizar herramientas de diagramación en línea para mayor comodidad y colaboración."
        },
        {
            trigger: "Paso 2: Recopilar datos y detalles relevantes",
            text: "Reúne toda la información necesaria para tu diagrama. Esto puede incluir datos específicos, fechas importantes y relaciones entre los elementos. Asegúrate de tener todo lo que necesitas antes de pasar al siguiente paso."
        },
        {
            trigger: "Paso 3: Seleccionar las herramientas adecuadas",
            text: "Elige las herramientas adecuadas para crear tu diagrama. Puedes optar por herramientas especializadas de diagramación en línea como Sketchlie, que ofrece características colaborativas y de almacenamiento en la nube, lo que facilita el trabajo en equipo y el acceso desde cualquier lugar."
        },
        {
            trigger: "Paso 4: Diseñar el diagrama",
            text: "Utiliza las herramientas seleccionadas para diseñar tu diagrama de manera clara y concisa. Sigue las convenciones del tipo de diagrama elegido y utiliza colores y formas para resaltar la información clave. Asegúrate de que sea fácil de entender para cualquier persona que lo vea."
        },
        {
            trigger: "Paso 5: Revisar y refinar",
            text: "Antes de finalizar tu diagrama, tómate el tiempo para revisarlo y refinarlo según sea necesario. Asegúrate de que todos los datos sean precisos y de que el diseño sea coherente. Solicita comentarios a tus colegas o colaboradores para obtener una perspectiva externa y realiza los ajustes necesarios para mejorar la calidad del diagrama."
        }
    ];
    
    
    

    const faqData = [
        {
            value: "item-1",
            trigger: "¿Qué es un diagrama?",
            content: "Un diagrama es una representación visual de ideas interrelacionadas que puede ser creado manualmente o utilizando herramientas en línea. Es una poderosa herramienta para organizar y estructurar información de manera clara y concisa. Con nodos que representan conceptos y líneas que conectan estos nodos para mostrar relaciones, los diagramas permiten una comprensión más profunda y una comunicación más efectiva."
        },
        {
            value: "item-2",
            trigger: "¿Cómo se crea un diagrama?",
            content: "Para crear un diagrama, primero debes identificar el tema o problema que deseas explorar. Luego, comienza a anotar los conceptos clave relacionados con el tema central. A medida que agregas conceptos, busca las relaciones entre ellos y agrúpalos en categorías o temas más amplios. Utiliza líneas o flechas para conectar los conceptos y mostrar cómo se relacionan entre sí. A medida que avances, puedes agregar detalles adicionales, como ejemplos, definiciones o explicaciones, para enriquecer tu diagrama. Al final, tu diagrama debe reflejar una estructura jerárquica clara y mostrar las relaciones entre los conceptos de manera visual. Puedes utilizar herramientas de software especializadas, como Sketchlie, para crear diagramas de forma rápida y sencilla, y compartirlos con otros usuarios para colaborar en tiempo real."
        },
        {
            value: "item-3",
            trigger: "¿Qué características tiene un diagrama?",
            content: "Un diagrama típico tiene varias características clave que lo hacen efectivo para organizar y representar información de manera visual. Estas características incluyen:\n\n• Jerarquía: Los conceptos se organizan en niveles jerárquicos, con el concepto principal en el centro y los conceptos secundarios o relacionados conectados a él.\n\n• Conexiones: Los conceptos se conectan con líneas o flechas para mostrar cómo se relacionan entre sí y forman una estructura coherente.\n\n• Categorización: Los conceptos se agrupan en categorías o temas más amplios para mostrar cómo se relacionan entre sí y forman un todo coherente.\n\n• Simplificación: Los diagramas simplifican la información compleja y la presentan de manera clara y concisa, lo que facilita la comprensión y el análisis.\n\n• Flexibilidad: Los diagramas son flexibles y se pueden modificar fácilmente para reflejar cambios en la información o en la comprensión del tema. Estas características hacen que los diagramas sean una herramienta poderosa para organizar y representar información de manera visual y comprensible."
        },
        {
            value: "item-4",
            trigger: "¿Cuáles son los beneficios de usar diagramas?",
            content: "Los diagramas ofrecen beneficios en la organización, comprensión, creatividad, planificación y comunicación. Son una herramienta poderosa para organizar, comprender y comunicar información de manera efectiva y eficiente."
        },
        {
            value: "item-5",
            trigger: "¿Para qué puedo usar un diagrama?",
            content: "Los diagramas son útiles en una amplia variedad de contextos, incluyendo:\n\n• Estudio: Los diagramas son una herramienta efectiva para organizar y comprender información compleja, lo que los hace útiles para estudiar y repasar temas académicos o profesionales.\n\n• Planificación: Los diagramas son útiles para planificar proyectos, presentaciones, informes y otros trabajos que requieren la organización y comprensión de información compleja.\n\n• Toma de decisiones: Los diagramas son útiles para analizar problemas, identificar soluciones y tomar decisiones informadas basadas en la comprensión clara de las relaciones entre los conceptos.\n\n• Comunicación: Los diagramas son útiles para comunicar ideas de manera clara y concisa, lo que los hace efectivos para presentaciones, informes, reuniones y otros contextos de comunicación.\n\n• Creatividad: Los diagramas fomentan la creatividad al permitir a los usuarios explorar y visualizar nuevas ideas y relaciones entre conceptos. Estos son solo algunos ejemplos de cómo se pueden utilizar los diagramas. En general, los diagramas son una herramienta versátil y poderosa para organizar, comprender y comunicar información de manera visual y efectiva."
        },
        {
            value: "item-6",
            trigger: "¿Se pueden hacer diagramas con Sketchlie?",
            content: "Sí, Sketchlie te permite crear diagramas de forma rápida y sencilla. Puedes agregar conceptos, conectarlos con líneas o flechas, y organizarlos en una estructura jerárquica para representar visualmente las relaciones entre los conceptos. Además, puedes compartir tu diagrama con otros usuarios para colaborar en tiempo real y enriquecerlo con ideas adicionales."
        },
        {
            value: "item-7",
            trigger: "¿Los diagramas de Sketchlie son gratuitos?",
            content: "Sí, puedes crear diagramas 100% gratuitos con Sketchlie. Además, puedes compartir tus diagramas con otros usuarios para colaborar en tiempo real sin costo adicional."
        }
    ];
    
    
    return ( 
        <div>
            <BlogStructure
                title="Crea diagramas online en minutos, no horas"
                description="Los diagramas son recursos esenciales que facilitan la organización y visualización de información de forma efectiva. Se componen de nodos que representan conceptos o ideas, conectados por enlaces que ilustran las relaciones entre ellos."
                cta="Crear diagrama"
                alt="Diagrama Image"
                img="/placeholders/mapa-conceptual-online.png"
            />
            <LogoSlider />
            <LandingVideo />
            <BlogSection 
                    title="Creador de diagramas online"
                    text="Descubre la forma perfecta para transformar conceptos complejos en un diagrama online digerible para ti, tus alumnos o tu equipo. Haz un diagrama de cualquier tema o de tu investigación para cualquier ocasión, ya sea sobre un nuevo producto de tu empresa o para presentar una lección abrumadora en clase. Estructura un diagrama online creativo a partir de la pizarra online de Sketchlie y aprovecha todas las herramientas y elementos de diseño y cautiva a tu publico."
                    img="/placeholders/wireframe.png"
                    side="right"
                />
            <BlogSection 
                title="Diagramas online para todos" 
                text="Sketchlie simplifica el proceso de creación de diagramas al ofrecer una amplia variedad de figuras estándar y herramientas avanzadas. Su editor intuitivo permite diseñar diagramas profesionales y efectivos en poco tiempo."
                text2="Una vez finalizado el trabajo, es posible presentarlo fácilmente utilizando el modo de presentación integrado en la plataforma. Además, las características avanzadas como formatos condicionales y vinculación de datos facilitan la captura de información de manera clara, incluso en diagramas complejos."
                img="/placeholders/mapa-mental.png"
                side="right"
            />
            <BlogSection
                title="Haz diagramas complejos con facilidad" 
                text="En Sketchlie, colaborar se vuelve simple, permitiendo compartir y trabajar en tiempo real con otros usuarios sin complicaciones. Al estar basado en la nube, ofrece una experiencia fluida y sin obstáculos, lo que facilita la colaboración entre equipos distribuidos geográficamente."
                text2="Con nosotros, es posible crear, compartir y colaborar en diagramas de manera eficiente y efectiva, mejorando significativamente el flujo de trabajo en la creación de diagramas online."
                img="/placeholders/improve-performance.png"
                side="right"
            />
            <BlogSection
                title="Anota las ideas y ponlas en práctica" 
                text="Lleva la colaboración a un nivel completamente nuevo. Desde sesiones de lluvia de ideas hasta reuniones de seguimiento de proyectos, esta herramienta versátil y fácil de usar está diseñada para potenciar la creatividad y la productividad de tu equipo. Únete a la revolución de la colaboración online con Sketchlie. Haz clic para crear diagramas en línea y compartirlos con tu equipo en tiempo real."
                img="/placeholders/pizarra-online.png"
                side="right"
            />
            <div className="my-20">
                <PlatformYouCanTrust/>
            </div>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 xl:mx-[10%] lg:mx-[7%] md:mx-[5%] mx-[5%] gap-5 md:my-20 my-5">
                <BlogLinks blogTitle="Diagramas de flujo" blogImage="/placeholders/mapa-conceptual.png" blogHref="/diagrama-de-flujo" blogDescription="Crea diagramas de flujo rápidamente y simplifica tus rutinas con el creador de diagramas de flujo de  con las herramientas de Sketchlie."/>
                <BlogLinks blogTitle="Pizarra Online" blogImage="/placeholders/improve-performance.png" blogHref="/pizarra-online" blogDescription="Sketchlie es una pizarra online rápida, gratuita y fácil de usar pensada para  ayudarte a colaborar con cualquier persona desde cualquier lugar."/>
                <BlogLinks blogTitle="Wireframes" blogImage="/placeholders/wireframe.png" blogHref="/wireframe" blogDescription="Empieza a visualizar tus ideas en minutos con nuestro intuitivo creador de wireframes. Crea esquemas de lo que necesites, desde páginas de inicio hasta formularios y menús, con nuestro creador de wireframes. "/>
            </div>
            <HowToCreate steps={steps} title="Cómo hacer un diagrama online"/>
            <FaqSection accordionData={faqData} sectionTitle="los diagramas"/>
        </div>

     );
}
 
export default LandingPage;
