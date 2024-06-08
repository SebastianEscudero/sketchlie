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

export const metadata: Metadata = {
    title: "Herramienta para diseñar experiencias de usuario (UX) | Sketchlie",
    description: "Los diseñadores utilizan las herramientas de Sketchlie para bocetear ideas, crear prototipos y colaborar en tiempo real.",
    keywords: ["diseño de experiencia de usuario", "diseño de interfaz de usuario", "diseño de productos", "diseño de aplicaciones", "diseño de sitios web", "diseño de software", "diseño de UX", "diseño de UI", "diseño de UX/UI", "diseño de experiencia de usuario en línea", "diseño de interfaz de usuario en línea", "diseño de productos en línea", "diseño de aplicaciones en línea", "diseño de sitios web en línea", "diseño de software en línea", "diseño de UX en línea", "diseño de UI en línea", "diseño de UX/UI en línea", "herramienta de diseño de experiencia de usuario", "herramienta de diseño de interfaz de usuario", "herramienta de diseño de productos", "herramienta de diseño de aplicaciones", "herramienta de diseño de sitios web", "herramienta de diseño de software", "herramienta de diseño de UX", "herramienta de diseño de UI", "herramienta de diseño de UX/UI", "herramienta de diseño de experiencia de usuario en línea", "herramienta de diseño de interfaz de usuario en línea", "herramienta de diseño de productos en línea", "herramienta de diseño de aplicaciones en línea", "herramienta de diseño de sitios web en línea", "herramienta de diseño de software en línea", "herramienta de diseño de UX en línea", "herramienta de diseño de UI en línea", "herramienta de diseño de UX/UI en línea", "herramienta de diseño de experiencia de usuario en línea", "herramienta de diseño de interfaz de usuario en línea", "herramienta de diseño de productos en línea", "herramienta de diseño de aplicaciones en línea", "herramienta de diseño de sitios web en línea", "herramienta de diseño de software en línea", "herramienta de diseño de UX en línea", "herramienta de diseño de UI en línea", "herramienta de diseño de UX/UI en línea", "herramienta de diseño de experiencia de usuario"],
    alternates: {
        canonical: "https://www.sketchlie.com/diseno/",
    }
};

const LandingPage = () => {

    const steps = [
        {
            trigger: "Paso 1: Investigación y Entendimiento",
            text: "Comienza por entender a tus usuarios y sus necesidades. Realiza entrevistas, encuestas y análisis de la competencia. Utiliza herramientas como Google Forms y Hotjar para recopilar y analizar datos relevantes sobre los usuarios."
        },
        {
            trigger: "Paso 2: Definición y Planificación",
            text: "Clarifica los objetivos del proyecto y los requisitos del usuario. Crea user stories y realiza reuniones con stakeholders para asegurar que todos estén alineados. Herramientas como Trello y Asana pueden ayudarte en esta fase."
        },
        {
            trigger: "Paso 3: Diseño de la Experiencia de Usuario (UX)",
            text: "Estructura y organiza la información de manera lógica con mapas de sitio y flujos de usuario. Crea wireframes y prototipos de baja fidelidad para definir la estructura básica. Sketchlie es una excelente herramienta para crear wireframes colaborativos y almacenar tus proyectos en la nube."
        },
        {
            trigger: "Paso 4: Diseño de la Interfaz de Usuario (UI)",
            text: "Diseña una interfaz atractiva y consistente utilizando principios de diseño visual. Crea prototipos de alta fidelidad con herramientas como Sketchlie, que ofrece características colaborativas y de almacenamiento en la nube, facilitando el trabajo en equipo y el acceso desde cualquier lugar."
        },
        {
            trigger: "Paso 5: Pruebas y Mejora Continua",
            text: "Evalúa la efectividad y facilidad de uso del diseño mediante pruebas con usuarios y feedback. Utiliza herramientas como UsabilityHub y Hotjar. Itera y optimiza tu diseño basado en los comentarios recibidos, asegurando que el producto final sea funcional y centrado en el usuario."
        }
    ];



    const faqData = [
        {
            value: "item-1",
            trigger: "¿Qué es el diseño de experiencia de usuario (UX)?",
            content: "El diseño de experiencia de usuario (UX) se refiere al proceso de mejorar la satisfacción del usuario interactuando con un producto o servicio. Esto se logra mediante la mejora de la usabilidad, accesibilidad y placer proporcionado en la interacción con el producto. El diseño UX abarca todo el proceso de adquisición e integración de un producto, incluyendo aspectos de branding, diseño, usabilidad y función."
        },
        {
            value: "item-2",
            trigger: "¿Cómo se lleva a cabo la investigación de usuarios en UX?",
            content: "La investigación de usuarios en UX se lleva a cabo a través de varios métodos, incluyendo:\n\n• Entrevistas: Conversaciones individuales con usuarios para entender sus necesidades y problemas.\n\n• Encuestas: Cuestionarios que recopilan datos cuantitativos y cualitativos de una amplia audiencia.\n\n• Pruebas de Usabilidad: Observación de usuarios reales mientras interactúan con el producto para identificar problemas de usabilidad.\n\n• Análisis de Competencia: Estudio de productos similares en el mercado para entender sus fortalezas y debilidades.\n\n• Mapas de Empatía: Herramientas que ayudan a visualizar lo que los usuarios sienten, piensan, dicen y hacen."
        },
        {
            value: "item-3",
            trigger: "¿Qué es el diseño de interfaz de usuario (UI)?",
            content: "El diseño de interfaz de usuario (UI) se enfoca en la apariencia y la interactividad del producto. Incluye la creación de todos los elementos visuales que el usuario ve y con los que interactúa en la pantalla, como botones, iconos, tipografía, colores, y diseño de la página. El objetivo del diseño UI es hacer que la interacción del usuario con el producto sea lo más eficiente, fluida y agradable posible."
        },
        {
            value: "item-4",
            trigger: "¿Cuáles son las mejores prácticas para un buen diseño UI?",
            content: "Las mejores prácticas para un buen diseño UI incluyen:\n\n• Consistencia: Mantener un diseño consistente en todos los elementos para que los usuarios se sientan familiarizados con el producto.\n\n• Simplicidad: Evitar el desorden visual y mantener una interfaz limpia y sencilla.\n\n• Jerarquía Visual: Utilizar el tamaño, el color y la disposición de los elementos para guiar la atención del usuario a las partes más importantes.\n\n• Accesibilidad: Asegurarse de que el diseño sea accesible para todos los usuarios, incluyendo aquellos con discapacidades.\n\n• Feedback Inmediato: Proveer retroalimentación clara y inmediata a las acciones del usuario para que sepan que sus acciones han sido registradas."
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
                        <BreadcrumbPage>Diseño</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <BlogStructure
                title="La herramienta para diseñar experiencias de usuario (UX)"
                description="Crea experiencias de usuario (UX) excepcionales con Sketchlie. Los diseñadores utilizan las herramientas de Sketchlie para bocetear ideas, crear prototipos y colaborar en tiempo real."
                cta="Regístrate gratis"
                alt="Diagrama"
                img="/placeholders/customer-journey-map.png"
            />
            <LogoSlider />
            <LandingVideo />
            <BlogSection
                title="Mejora la experiencia del cliente con Customer Journey Maps"
                text={
                    <>
                        Analiza y mejora la experiencia del cliente con Customer Journey Maps. Estas herramientas visuales permiten a los equipos de diseño y marketing comprender mejor las necesidades y expectativas de los clientes en cada etapa de su interacción con la marca. Parte con nuestra <Link className="text-custom-blue hover:underline" href="/plantillas/customer-journey-map/">plantilla de customer journey map</Link> para acelerar el flujo de tu trabajo.
                    </>
                }
                alt="Wireframe"
                img="/placeholders/wireframe.png"
                side="right"
            />
            <BlogSection
                title="Diseña interfaces de usuario efectivas"
                text={
                    <>
                        Nuestra plataforma de diseño de UX/UI te permite crear <Link className="text-custom-blue hover:underline" href="/wireframe">wireframes</Link>, prototipos y mockups de alta calidad para aplicaciones web y móviles. Con una amplia gama de herramientas y funciones, puedes dar vida a tus ideas y colaborar con tu equipo en tiempo real.
                    </>
                }
                text2="Intercambia comentarios, realiza ajustes y mejora la usabilidad de tus diseños con Sketchlie. Regístrate gratis y comienza a diseñar interfaces de usuario efectivas hoy mismo."
                alt="Pizarra Online"
                img="/placeholders/pizarra-online.png"
                side="right"
            />
            <BlogSection
                title="Incluye tus equipos desde cualquier lugar"
                text="Involucra a tus equipos de diseño, desarrollo y marketing en el proceso de diseño de UX/UI con Sketchlie. Nuestra plataforma basada en la nube te permite colaborar en tiempo real, compartir comentarios y realizar ajustes en tus diseños desde cualquier lugar del mundo. Con una interfaz intuitiva y fácil de usar, puedes crear experiencias de usuario excepcionales y mejorar la eficiencia de tu equipo en cada proyecto."
                alt="Línea de Tiempo"
                img="/placeholders/linea-de-tiempo.png"
                side="right"
            />
            <BlogSection
                title="Lleva la experiencia de usuario al siguiente nivel con Sketchlie"
                text={
                    <>
                        Crea una cultura de equipo centrada en la innovación y la satisfacción del cliente, reúne a todo tu equipo en un lugar para unir las ideas y crear las soluciones del futuro, realiza sesiones de <Link className="text-custom-blue hover:underline" href="/lluvia-de-ideas">lluvia de ideas</Link>, revisa diseños y planifica proyectos de la manera más eficiente y rápida, todo en un espacio de trabajo online.
                    </>
                }
                img="/placeholders/diagrama-ishikawa.png"
                side="right"
            />
            <TemplatesSlider />
            <HowToCreate steps={steps} title="Cómo diseñar una experiencia de usuario (UX)" />
            <FaqSection accordionData={faqData} sectionTitle="el diseño UX/UI" />
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 xl:mx-[10%] lg:mx-[7%] md:mx-[5%] mx-[5%] gap-5 md:my-10 my-5">
                <VerMas title="¿Qué es el diseño UX?" href="/diseno/que-es-diseno/" />
                <VerMas title="¿Qué es el diseño UI?" href="/diseno/que-es-diseno/" />
                <VerMas title="¿Cuál es la diferencia entre diseño UI y UX?" href="/diseno/que-es-diseno/" />
            </div>
        </div>

    );
}

export default LandingPage;
