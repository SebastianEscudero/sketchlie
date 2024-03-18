import { BlogStructure } from "@/components/blog-structure";
import { Metadata } from "next";
import { BlogSection } from "@/components/blog-section";
import { LogoSlider } from "@/components/logo-slider";
import { FaqSection } from "@/components/faq-section";
import { HowToCreate } from "@/components/how-to-create";
import { BlogLinks } from "@/components/blog-links";
import { PlatformYouCanTrust } from "@/components/platform-you-can-trust";
import { LandingVideo } from "@/components/landing-video";

export const metadata: Metadata = {
    title: "Crea Wireframes online gratis | Sketchlie",
    description: "Diseña wireframes de aplicaciones y sitios web de manera sencilla utilizando Sketchlie, una herramienta gratuita para crear wireframes. Ideal para equipos que trabajan de forma remota.",
    keywords: ["wireframes", "wireframes online", "wireframes gratis"],
    alternates: {
        canonical: "https://www.sketchlie.com/wireframe",
    }
};

const LandingPage = () => {
    const faqData = [
        {
            value: "item-1",
            trigger: "¿Qué es un wireframe?",
            content: "Los wireframes son esquemas básicos que ayudan a los equipos a alinearse en cuanto a requisitos, manteniendo las conversaciones de diseño de experiencia de usuario (UX) enfocadas y constructivas. Piensa en tu wireframe como el esqueleto de tu aplicación, sitio web u otro producto final. En las primeras etapas de diseño, los wireframes de baja fidelidad utilizan texto lorem ipsum y formas simples como marcadores de posición para imágenes y videos. Esto ayuda al equipo de diseño, a los redactores y a otros miembros del equipo a centrarse en la funcionalidad básica para alinearse en la dirección correcta. Comenzar con un diseño de wireframe limpio y sencillo también brinda a los diseñadores de UI/UX espacio para iterar. Pueden recopilar comentarios tempranos de pruebas de usuario sobre elementos básicos de UX/UI, sin distraer a los usuarios con detalles de diseño visual. Los equipos de diseño prueban diferentes conceptos, flujos de usuarios y plantillas a medida que trabajan hacia la experiencia de usuario definitiva."
        },
        {
            value: "item-2",
            trigger: "5 mejores prácticas en el diseño de wireframes",
            content: "1. Identifica tus objetivos de diseño. \n\n Antes de comenzar a hacer bocetos o jugar con plantillas de wireframes, define tus objetivos de diseño. Considera las necesidades del usuario y las acciones que deseas que realicen para lograrlos. Alinea a tu equipo de diseño en torno a este objetivo para que tus diseños de wireframe avancen esa causa. \n\n 2. Escoge el tamaño adecuado para tu wireframe. \n\n Tus wireframes deben coincidir con el tamaño de la pantalla que utilizará tu audiencia objetivo. Naturalmente, un sitio web o aplicación se verá diferente en una computadora portátil que en un dispositivo móvil. Con eso en mente, los tamaños de wireframe estándar para tipos de pantalla son los siguientes: \n\n Móvil: 1080 píxeles de ancho por 1920 píxeles de largo \nTablet de 8 pulgadas: 800 píxeles de ancho por 1280 píxeles de largo \n Tablet de 10 pulgadas: 1200 píxeles de ancho por 1920 píxeles de largo \n Escritorio: 768 píxeles de ancho por 1366 píxeles de largo. \n\n 3. Mantén el diseño de tu wireframe simple. \n\n Comienza tu wireframe utilizando colores en escala de grises, limitando las fuentes y reemplazando los gráficos con cuadros. Asegúrate de que tu esquema cumpla con los requisitos del usuario al nivel más básico. Si te enfocas en detalles como errores de ortografía o esquemas de color, podrías pasar por alto un defecto en la experiencia del usuario. \n\n 4. Haz la navegación evidente. \n\n Tus flujos de usuario deben ser fluidos e intuitivos. Al aplicar arquitectura de información a tu wireframe, considera dónde podrías necesitar apoyarlo con navegación y señales de orientación. Si los usuarios tienen que consultar un mapa del sitio, tu navegación y arquitectura de información necesitan mejoras. \n\n 5. Aprovecha las herramientas de wireframing. \n\n Los equipos de diseño necesitan wireframes que puedan compartir, guardar y convertir en maquetas en línea. El kit de wireframes de Sketchlie viene con herramientas de diseño de arrastrar y soltar que facilitan a principiantes y profesionales del diseño crear wireframes personalizados de alta fidelidad."
        },
        {
            value: "item-3",
            trigger: "3 tipos de wireframes",
            content: "1. Los wireframes de baja fidelidad: \n\n Los wireframes de baja fidelidad son wireframes básicos centrados en el diseño de la disposición, navegación y arquitectura de la información. Muestran cómo se verá la interfaz, ilustrando los flujos de usuario con elementos clave de diseño de interfaz de usuario. Los bocetos físicos en pizarra blanca pueden funcionar en las primeras etapas de creación de wireframes, aunque no siempre son fáciles de compartir, guardar o modificar. Con la herramienta de creación de wireframes en línea de Figma, puedes crear, compartir e iterar rápidamente en wireframes de baja fidelidad. \n\n 2. Los wireframes de media fidelidad: \n\n Los wireframes de media fidelidad ayudan a los diseñadores a iterar y dar forma al diseño final. Los equipos de diseño pueden agregar anotaciones y contenido mientras prueban diferentes enfoques para los flujos de usuario y los elementos de diseño de la interfaz de usuario, mapeando la funcionalidad central y las interacciones clave. Esto permite a los equipos establecer el marco de diseño final del wireframe antes de agregar componentes de diseño visual.\n\n 3. Los wireframes de alta fidelidad: \n\n Los wireframes de alta fidelidad se asemejan a maquetas tempranas del producto, con elementos de diseño interactivo y visual, pero sin la funcionalidad de los prototipos de baja fidelidad. En este punto del proceso de diseño, es posible que desees agregar elementos de marca como fuentes, colores y logotipos. De esta manera, puedes capturar la apariencia y sensación del producto final para realizar pruebas de usuario."
        },
        {
            value: "item-4",
            trigger: "¿Para qué sirve un wireframe?",
            content: "Un wireframe es una herramienta fundamental en el proceso de diseño de páginas web y aplicaciones móviles. Sirve como un esquema visual básico que representa la estructura y disposición de los elementos en una interfaz digital, sin incluir detalles de diseño gráfico o contenido visual. \n\n La creación de un wireframe permite a los diseñadores y desarrolladores planificar la distribución de contenido, la navegación del usuario y la funcionalidad de manera eficiente. Además, proporciona una visión clara de la jerarquía de la información y las interacciones clave dentro de la interfaz."
        },
    ];

    const steps = [
        {
            trigger: "1. Definir el Objetivo Principal",
            text: "Considera el objetivo principal del sitio web y diseña el wireframe teniendo ese objetivo en mente, asegurando un enfoque centrado en el usuario para la interacción con la interfaz."
        },
        {
            trigger: "2. Estructurar la Base del Wireframe",
            text: "Comienza con un wireframe básico y de baja fidelidad que conste de tres secciones principales: el encabezado, que captura la atención del usuario en la parte superior; el cuerpo, donde reside el contenido principal; y el pie de página, que generalmente contiene información menos crítica."
        },
        {
            trigger: "3. Integrar Elementos de Navegación",
            text: "Incorpora elementos de navegación en el wireframe, como botones y enlaces, permitiendo a los usuarios acceder de manera fluida a secciones clave como áreas de contenido, funciones de búsqueda y opciones de inicio de sesión de usuario."
        },
        {
            trigger: "4. Anotar para Claridad y Comunicación",
            text: "Mejora la claridad del wireframe mediante la anotación de elementos clave para una mejor comprensión. Las anotaciones ayudan a transmitir funcionalidades y características específicas a los interesados, facilitando la comunicación y retroalimentación efectivas."
        }
    ]
    
    return ( 
            <div>
            <BlogStructure
                title="Herramienta para crear Wireframes Online"
                description="Diseña tus proyectos web de manera efectiva y eficiente con nuestro creador de wireframes en línea. Visualiza la estructura y el diseño de tu sitio web antes de empezar a codificar, asegurando una experiencia de usuario óptima desde el principio."
                cta="Crear wireframe"
                img="/placeholders/wireframe.png"
            />
            <LogoSlider />
            <LandingVideo />
            <div className="mb:my-28 my-14">
                <BlogSection 
                    title="Construye tus ideas con wireframes versátiles." 
                    text="
                    Utiliza nuestras herramientas de diseño para simplificar la creación de tus proyectos web. Explora una amplia variedad de elementos y disposiciones, y agrega interacciones para simular la experiencia del usuario final."
                />
            </div>
            <BlogSection 
                title="Diseña tu sitio web como un profesional" 
                text="Empieza a visualizar tus ideas en minutos con nuestro intuitivo creador de wireframes. Crea esquemas de lo que necesites, desde páginas de inicio hasta formularios y menús, con nuestro creador de wireframes. Visualiza la estructura de tu sitio web de manera clara y concisa."
                img="/placeholders/mapa-mental.png"
                side="right"
            />
            <BlogSection
                title="Descubre la Eficacia de los Wireframes en tu Proyecto de Diseño" 
                text="Los wireframes son la columna vertebral de cualquier proyecto de diseño. Estos esquemas visuales simplificados son como los cimientos de una casa, proporcionando una estructura sólida sobre la cual construir tu proyecto digital."
                img="/placeholders/improve-performance.png"
                side="right"
            />
            <BlogSection
                title="Por qué los Wireframes son Cruciales en el Proceso de Diseño Web"
                text="Los wireframes son más que simples bocetos. Son herramientas poderosas que te permiten visualizar la arquitectura de tu sitio web antes de sumergirte en el diseño visual. Con ellos, puedes planificar la disposición de los elementos, la navegación del usuario y la jerarquía de la información."
                img="/placeholders/diagrama-de-flujo.png"
                side="right"
            />
            <BlogSection
                title="Wireframes: El Secreto para una Colaboración Efectiva en Diseño" 
                text="Los wireframes no solo son para diseñadores. Son herramientas de comunicación efectivas que pueden ayudar a alinear a todo tu equipo, desde diseñadores hasta desarrolladores y clientes. Con wireframes claros y precisos, puedes garantizar que todos estén en la misma página y trabajen hacia un objetivo común."
                img="/placeholders/pizarra-online.png"
                side="right"
            />
            <div className="my-20">
                <PlatformYouCanTrust/>
            </div>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 xl:mx-[10%] lg:mx-[7%] md:mx-[5%] mx-[5%] gap-5 md:my-20 my-5">
                <BlogLinks blogTitle="Mapa Conceptual Online" blogImage="/placeholders/mapa-conceptual-online.png" blogHref="/mapa-conceptual" blogDescription="Descubre cómo desatar tu creatividad y potenciar la colaboración en tiempo real con Sketchlie."/>
                <BlogLinks blogTitle="Mapa de Procesos" blogImage="/placeholders/mapa-de-procesos.png" blogHref="/mapas-de-procesos" blogDescription="El mapa de procesos ayuda a los equipos a mapear y implementar mejoras. Registrate hoy con una 3 espacios de trabajo gratuitos para empezar a utilizar la mejor herramienta de mapa de procesos."/>
                <BlogLinks blogTitle="Mapas Mentales" blogImage="/placeholders/mapa-mental.png" blogHref="/mapa-mental-online" blogDescription="Explora nuestras herramientas para simplificar la creación de mapas mentales. Organiza tus ideas de manera jerárquica y potencia tu creatividad con nuestro intuitivo creador de mapas mentales."/>
            </div>
            <HowToCreate steps={steps} title="Cómo hacer un wireframe"/>
            <FaqSection accordionData={faqData} sectionTitle="los wireframes" />
        </div>

     );
}
 
export default LandingPage;