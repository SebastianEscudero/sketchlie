import { BlogStructure } from "@/components/blog-structure";
import { Metadata } from "next";
import { BlogSection } from "@/components/blog-section";
import { LogoSlider } from "@/components/logo-slider";
import { FaqSection } from "@/components/faq-section";
import { HowToCreate } from "@/components/how-to-create";
import { BlogLinks } from "@/components/blog-links";
import { PlatformYouCanTrust } from "@/components/platform-you-can-trust";
import { LandingVideo } from "@/components/landing-video";
import { VerMas } from "@/components/ver-mas";

export const metadata: Metadata = {
    title: "La herramienta de Mapa de Procesos | Sketchlie",
    description: "El mapa de procesos ayuda a los equipos a mapear y implementar mejoras. Registrate hoy con una 3 espacios de trabajo gratuitos para empezar a utilizar la mejor herramienta de mapa de procesos. Empieza hoy gratis.",
    keywords: ["mapa de procesos", "mapa de procesos online", "mapa de procesos gratis"],
    alternates: {
        canonical: "https://www.sketchlie.com/mapa-de-procesos",
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
            trigger: "1. Identificar el proceso:",
            text: "Define claramente cuál es el proceso que deseas mapear. Por ejemplo, podrías estar creando un mapa de procesos para el proceso de ventas, servicio al cliente, producción, etc."
        },
    
        {
            trigger: "2. Divide las etapas del proceso:",
            text: "Divide el proceso en etapas o pasos distintos y secuenciales. Por lo general, un proceso consta de cuatro a seis etapas principales. Para este ejemplo, utilizaremos cuatro etapas:\n\n- Inicio: Esta etapa representa el punto de partida del proceso. Puede incluir actividades como recibir una solicitud, iniciar un proyecto, etc.\n\n- Desarrollo: Aquí es donde se lleva a cabo la mayor parte del trabajo del proceso. Puede involucrar actividades como análisis, producción, ensamblaje, etc.\n\n- Revisión/Control: En esta etapa, se verifica la calidad del trabajo realizado en la etapa de desarrollo. Puede incluir inspecciones, pruebas, revisión de documentos, etc.\n\n- Finalización: Esta es la etapa final del proceso donde se completa el trabajo y se entrega el resultado final al cliente o al siguiente paso del proceso. Puede incluir actividades como la entrega del producto, la generación de informes finales, la facturación, etc."
        },
    
        {
            trigger: "3. Mapear las actividades:",
            text: "Para cada etapa del proceso, identifica las actividades específicas que se realizan. Puedes representar estas actividades utilizando cuadros o formas en el mapa de procesos y conectarlas con flechas para mostrar la secuencia."
        },
    
        {
            trigger: "4. Revisar y mejorar:",
            text: "Una vez que hayas creado el mapa de procesos, revísalo para asegurarte de que captura con precisión el flujo de trabajo. Identifica áreas donde puedas mejorar la eficiencia, reducir el desperdicio o eliminar pasos innecesarios. Ajusta el mapa de procesos según sea necesario y continúa revisándolo periódicamente para garantizar que siga siendo relevante y útil."
        }
    ];    
    
    return ( 
        <div>
            <BlogStructure
                title="Optimiza tus flujos de trabajo con mapas de procesos"
                description="Libera tu imaginación y organiza tus ideas de manera visual con nuestra herramienta para crear mapas mentales en línea. Descubre cómo el diseño de mapas mentales puede potenciar tu creatividad y mejorar tu productividad en proyectos personales y profesionales."
                cta="Mapear proceso gratis"
                alt="Mapa de Procesos Image"
                img="/placeholders/mapa-de-procesos.png"
            />
            <LogoSlider />
            <LandingVideo />
            <div className="mb:my-28 my-14">
                <BlogSection 
                    title="Mejora la eficiencia operativa con mapas de procesos" 
                    text="Los mapas de procesos te permiten identificar y analizar cada paso de tus operaciones. Con una visualización clara de tus procesos, podrás detectar posibles cuellos de botella y áreas de mejora para optimizar la eficiencia de tu equipo."
                />
            </div>
            <BlogSection 
                title="Fomenta la colaboración y la transparencia" 
                text="Con la herramienta adecuada, como Sketchlie, puedes crear mapas de procesos colaborativos que involucren a todo tu equipo. Esto fomenta la transparencia en tus operaciones y facilita la comunicación entre departamentos, lo que lleva a una mayor cohesión y eficacia en el cumplimiento de los objetivos."
                img="/placeholders/wireframe.png"
                side="right"
            />
            <BlogSection
                title="Reduce errores y minimiza riesgos" 
                text="Al visualizar tus procesos, puedes identificar fácilmente posibles puntos de error y tomar medidas preventivas para mitigar riesgos. La claridad proporcionada por los mapas de procesos ayuda a minimizar los errores y garantiza una ejecución más fluida y precisa de las tareas."
                img="/placeholders/improve-performance.png"
                side="right"
            />
            <BlogSection
                title="Impulsa la innovación y la mejora continua"
                text="Al comprender completamente tus procesos actuales, puedes identificar áreas para la innovación y la mejora continua. Los mapas de procesos te brindan una visión holística de tus operaciones, lo que te permite desarrollar nuevas ideas y estrategias para mantener la competitividad en un mercado en constante cambio."
                img="/placeholders/diagrama-de-flujo.png"
                side="right"
            />
            <BlogSection
                title="Maximiza la productividad del equipo" 
                text="Al simplificar y optimizar tus flujos de trabajo mediante mapas de procesos, puedes aumentar la productividad de tu equipo. Elimina la confusión y la redundancia, permitiendo que tus empleados se centren en tareas de mayor valor añadido y alcancen sus metas con mayor rapidez."
                img="/placeholders/pizarra-online.png"
                side="right"
            />
            <div className="my-20">
                <PlatformYouCanTrust/>
            </div>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 xl:mx-[10%] lg:mx-[7%] md:mx-[5%] mx-[5%] gap-5 md:my-20 my-5">
                <BlogLinks blogTitle="Mapa Conceptual Online" blogImage="/placeholders/mapa-conceptual-online.png" blogHref="/mapa-conceptual" blogDescription="Descubre cómo desatar tu creatividad y potenciar la colaboración en tiempo real con Sketchlie."/>
                <BlogLinks blogTitle="Pizarra Online" blogImage="/placeholders/improve-performance.png" blogHref="/pizarra-online" blogDescription="Sketchlie es una pizarra online rápida, gratuita y fácil de usar pensada para  ayudarte a colaborar con cualquier persona desde cualquier lugar."/>
                <BlogLinks blogTitle="Wireframes" blogImage="/placeholders/wireframe.png" blogHref="/wireframe" blogDescription="Empieza a visualizar tus ideas en minutos con nuestro intuitivo creador de wireframes. Crea esquemas de lo que necesites, desde páginas de inicio hasta formularios y menús, con nuestro creador de wireframes. "/>
            </div>
            <HowToCreate steps={steps} title="¿Cómo se crea un mapa mental?"/>
            <FaqSection accordionData={faqData} sectionTitle="mapas mentales" />
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 xl:mx-[10%] lg:mx-[7%] md:mx-[5%] mx-[5%] gap-5 md:my-10 my-5">
                <VerMas title="¿Qué es un mapa de procesos?" href="/mapas-de-procesos/que-es-mapa-procesos"/>
                <VerMas title="¿Cómo se crea un mapa de procesos?" href="/mapas-de-procesos/que-es-mapa-procesos"/>
                <VerMas title="¿Cuáles son las ventajas de utilizar un mapa de procesos?" href="/mapas-de-procesos/que-es-mapa-procesos"/>
            </div>
        </div>
     );
}
 
export default LandingPage;