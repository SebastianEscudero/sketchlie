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
    title: "La herramienta para crear Mapas Mentales | Sketchlie",
    description: "Diseña mapas mentales en línea de forma sencilla con nuestra herramienta. Libera tu creatividad y mejora la organización.",
    keywords: ["mapa mental", "mapa mental online", "mapa mental gratis"],
    alternates: {
        canonical: "https://www.sketchlie.com/mapa-mental-online/",
    }
};

const LandingPage = () => {
    const faqData = [
        {
            value: "item-1",
            trigger: "¿Qué es un mapa mental?",
            content: "Los mapas mentales son representaciones visuales de ideas y conceptos interconectados. Son ideales para organizar información de manera jerárquica y comprender las relaciones entre diferentes temas o elementos. En un mapa mental, el concepto principal se coloca en el centro y se conecta con conceptos secundarios mediante líneas o ramificaciones, creando una estructura visualmente coherente."
        },
        {
            value: "item-2",
            trigger: "¿Qué características tiene un mapa mental?",
            content: "Los mapas mentales típicamente presentan una jerarquía clara, conexiones visuales entre los conceptos, y una organización en torno a un tema central. Son herramientas flexibles que puedes adaptar según tus necesidades, lo que los hace ideales para una variedad de usos, como la planificación de proyectos, la toma de decisiones y la generación de ideas creativas."
        },
        {
            value: "item-3",
            trigger: "¿Cuáles son los beneficios de usar mapas mentales?",
            content: "Los mapas mentales ofrecen numerosos beneficios, incluyendo una mejor organización y comprensión de la información, mayor creatividad y productividad, y una comunicación más efectiva. Son especialmente útiles para brainstorming, planificación de proyectos y estudio."
        },
        {
            value: "item-4",
            trigger: "¿Para qué se utiliza un mapa mental?",
            content: "Los mapas mentales se utilizan para una variedad de propósitos, incluyendo la organización de ideas, la planificación de proyectos, la toma de decisiones, la resolución de problemas, el estudio y la generación de ideas creativas. Son herramientas versátiles que puedes adaptar según tus necesidades."
        },
        {
            value: "item-5",
            trigger: "¿Qué son los mapas mentales en línea?",
            content: "Los mapas mentales en línea son versiones digitales de los mapas mentales tradicionales que puedes crear y editar en tu navegador web. Son ideales para colaborar con otros usuarios, acceder a tus mapas mentales desde cualquier dispositivo y disfrutar de funcionalidades adicionales, como la integración con otras herramientas de productividad."
        }
    ];

    const steps = [
        {
            trigger: "1. Identificar el tema central:",
            text: "Elige un tema principal sobre el cual desees organizar tus ideas. Puede ser un concepto, una tarea, un proyecto, etc."
        },
        {
            trigger: "2. Agregar conceptos relacionados:",
            text: "Comienza a agregar conceptos o ideas que estén directamente relacionados con el tema central. Estos pueden ser subtemas, detalles, o elementos clave que contribuyan a comprender el tema principal."
        },
        {
            trigger: "3. Conectar los conceptos:",
            text: "Utiliza líneas o flechas para conectar los conceptos entre sí y mostrar cómo se relacionan. Puedes usar diferentes tipos de líneas para representar distintos tipos de relaciones (causa-efecto, similitud, secuencia temporal, etc.)."
        },
        {
            trigger: "4. Enriquecer el mapa mental:",
            text: "Agrega colores, imágenes y notas adicionales para hacer el mapa mental más visualmente atractivo y comprensible. Usa colores para resaltar diferentes categorías o niveles de información. Incorpora imágenes relevantes que refuercen los conceptos. Además, añade notas para proporcionar detalles adicionales o explicaciones breves."
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
                        <BreadcrumbPage>Mapa mental</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <BlogStructure
                title="Herramienta para crear Mapas Mentales"
                description="Libera tu imaginación y organiza tus ideas de manera visual con nuestra herramienta para crear mapas mentales en línea. Descubre cómo el diseño de mapas mentales puede potenciar tu creatividad y mejorar tu productividad en proyectos personales y profesionales."
                cta="Crear mapa mental"
                alt="Mapa mental"
                img="/placeholders/mapa-mental.png"
            />
            <LogoSlider />
            <LandingVideo />
            <div className="mb:my-28 my-14">
                <BlogSection
                    title="Visualiza y Organiza tus Ideas con Mapas Mentales"
                    text="Explora nuestras herramientas de diseño para simplificar la creación de mapas mentales. Crea conexiones entre tus ideas, organízalas de manera jerárquica y potencia tu creatividad con nuestro intuitivo creador de mapas mentales."
                />
            </div>
            <BlogSection
                title="Explora la creatividad con mapas mentales"
                text="Libera tu creatividad y potencia tu pensamiento visual con mapas mentales. Esta técnica te permite representar tus ideas de manera no lineal, fomentando la conexión de conceptos de forma intuitiva y original. Descubre nuevas formas de expresión y resolución de problemas a través de la creación de mapas mentales creativos y estimulantes."
                alt="Wireframe"
                img="/placeholders/wireframe.png"
                side="right"
            />
            <BlogSection
                title="Mapas mentales: el secreto para potenciar tu creatividad"
                text="Desbloquea todo tu potencial creativo con el uso de mapas mentales. Desde la generación de ideas hasta la planificación de proyectos, los mapas mentales ofrecen una plataforma versátil para explorar y desarrollar nuevas ideas. Libera tu imaginación y encuentra soluciones innovadoras a través de esta técnica de visualización única."
                alt="Mapa de Proceso"
                img="/placeholders/improve-performance.png"
                side="right"
            />
            <BlogSection
                title="Haz tus mapas mentales más fáciles y efectivos"
                text={
                    <>
                        Optimiza tu proceso de estudio y organización con nuestra <Link href="/plantillas/mapa-mental/" className="text-custom-blue hover:underline">plantilla de mapa mental</Link>. Simplifica información compleja, identifica relaciones clave y mejora tu comprensión global de los temas. Convierte tus notas y apuntes en mapas mentales claros y concisos, facilitando la revisión y el recuerdo de la información cuando más lo necesitas.
                    </>
                }
                alt="Diagrama de Flujo"
                img="/placeholders/diagrama-de-flujo.png"
                side="right"
            />
            <BlogSection
                title="Simplifica tu vida con mapas mentales intuitivos"
                text="Haz que la organización y la planificación sean más simples y eficientes con mapas mentales intuitivos. Desde la gestión de tareas hasta la toma de decisiones, los mapas mentales te ayudan a estructurar la información de manera clara y accesible. Optimiza tu productividad y reduce el estrés utilizando esta herramienta práctica en tu vida diaria."
                alt="Pizarra Online"
                img="/placeholders/pizarra-online.png"
                side="right"
            />
            <HowToCreate steps={steps} title="¿Cómo se crea un mapa mental?" img="/templates/mapa-mental.png" alt="Mapa mental" cta="Crear mapa mental"/>
            <TemplatesSlider />
            <div className="my-20">
                <PlatformYouCanTrust />
            </div>
            <FaqSection accordionData={faqData} sectionTitle="mapas mentales" />
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 xl:mx-[10%] lg:mx-[7%] md:mx-[5%] mx-[5%] gap-5 md:my-10 my-5">
                <VerMas title="¿Cómo hacer un mapa mental?" href="/mapa-mental-online/que-es-mapa-mental/" />
                <VerMas title="Que es un mapa mental online?" href="/mapa-mental-online/que-es-mapa-mental/" />
                <VerMas title="¿Puedo utilizar un mapa mental online para la educación?" href="/mapa-mental-online/que-es-mapa-mental/" />
            </div>
        </div>
    );
}

export default LandingPage;