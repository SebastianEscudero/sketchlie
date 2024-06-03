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
    title: "Creador de Diagramas de Flujo | Sketchlie",
    description: "Crea diagramas de flujo online con Sketchlie en minutos y colabora con tu equipo. Simplifica tus flujos de trabajo con símbolos y plantillas gratuitas.",
    keywords: ["diagrama de flujo", "diagrama de flujo online", "diagrama de flujo gratis"],
    alternates: {
        canonical: "https://www.sketchlie.com/diagrama-de-flujo/",
    }
};

const LandingPage = () => {
    const faqData = [
        {
            value: "item-1",
            trigger: "¿Qué es un diagrama de flujo?",
            content: "Un diagrama de flujo es una representación visual de un proceso o sistema, que muestra los pasos o etapas del proceso, las decisiones que se toman en cada paso, y las relaciones entre los pasos. Los diagramas de flujo son útiles para visualizar y comprender procesos complejos, identificar cuellos de botella o ineficiencias, y comunicar ideas de manera clara y concisa. Los diagramas de flujo se utilizan en una amplia variedad de contextos, incluyendo la ingeniería, la informática, la gestión de proyectos, la planificación de procesos, la toma de decisiones y la comunicación de ideas. Los diagramas de flujo pueden ser simples o complejos, dependiendo de la naturaleza del proceso que se está representando, y pueden incluir una variedad de símbolos y elementos visuales para representar la información de manera efectiva."
        },
        {
            value: "item-2",
            trigger: "¿Cómo se crea un diagrama de flujo?",
            content: "Para crear un diagrama de flujo, sigue estos pasos:\n\n1. Identifica el proceso o sistema que deseas representar: Antes de comenzar a crear un diagrama de flujo, es importante tener una comprensión clara del proceso o sistema que deseas representar. Esto puede incluir identificar los pasos del proceso, las decisiones que se toman en cada paso, y las relaciones entre los pasos.\n\n2. Selecciona los símbolos y elementos visuales adecuados: Los diagramas de flujo utilizan una variedad de símbolos y elementos visuales para representar la información de manera efectiva. Estos símbolos incluyen formas geométricas (como círculos, rectángulos y diamantes) para representar pasos, decisiones y puntos de inicio/fin, así como líneas y flechas para mostrar las relaciones entre los pasos.\n\n3. Organiza los símbolos y elementos visuales en un diseño coherente: Una vez que hayas seleccionado los símbolos y elementos visuales adecuados, organízalos en un diseño coherente que represente claramente el proceso o sistema que estás representando. Esto puede incluir organizar los pasos en una secuencia lógica, conectar los pasos con líneas o flechas para mostrar las relaciones entre ellos, y agregar texto o etiquetas para proporcionar información adicional.\n\n4. Revisa y ajusta tu diagrama de flujo: Una vez que hayas creado tu diagrama de flujo, revísalo cuidadosamente para asegurarte de que represente con precisión el proceso o sistema que deseas representar. Realiza ajustes según sea necesario para mejorar la claridad y la precisión de tu diagrama de flujo. Estos son solo algunos pasos básicos para crear un diagrama de flujo. En general, la creación de un diagrama de flujo efectivo requiere una comprensión clara del proceso que se está representando, así como la selección y organización cuidadosa de los símbolos y elementos visuales adecuados para representar la información de manera efectiva."
        },
        {
            value: "item-3",
            trigger: "¿Cuáles son los tipos más comunes de diagramas de flujo?",
            content: "Hay cuatro tipos principales de diagramas de flujo. Un diagrama de flujo de permite comunicar un proceso o proyecto. Un diagrama de flujo muestra la forma en la que funciona un negocio o un proceso. Un diagrama de flujo de carriles permite separar personas o equipos cuando necesitas mostrar varios flujos de información uno al lado del otro. Un diagrama de flujo de datos muestra cómo se procesan los datos dentro de un sistema."
        },
        {
            value: "item-4",
            trigger: "¿Para qué sirve un diagrama de flujo?",
            content: "Los diagramas de flujo son útiles para una amplia variedad de propósitos, incluyendo: Visualización, Comunicación, Planificación, Análisis y Documentación. Son una herramienta versátil y poderosa para visualizar, comprender y comunicar información de manera efectiva."
        },
        {
            value: "item-5",
            trigger: "¿Cuáles son las ventajas de usar un diagrama de flujo?",
            content: "Utilizar un diagrama de flujo ofrece una serie de beneficios significativos. En primer lugar, facilita una comunicación más eficaz al visualizar claramente los pasos y las relaciones dentro de un proceso. Además, proporciona una herramienta invaluable para el control de calidad y análisis al identificar posibles áreas de mejora o ineficiencias. Por último, sirve como una documentación exhaustiva y sistemática de un sistema o proceso, lo que resulta fundamental para su comprensión y seguimiento a lo largo del tiempo."
        },
        {
            value: "item-6",
            trigger: "¿Cuáles son los tipos más comunes de diagramas de flujo?",
            content: "Hay cuatro tipos principales de diagramas de flujo. Un diagrama de flujo de permite comunicar un proceso o proyecto. Un diagrama de flujo muestra la forma en la que funciona un negocio o un proceso. Un diagrama de flujo de carriles permite separar personas o equipos cuando necesitas mostrar varios flujos de información uno al lado del otro. Un diagrama de flujo de datos muestra cómo se procesan los datos dentro de un sistema."
        },
        {
            value: "item-7",
            trigger: "¿Los diagramas de flujo de Sketchlie son gratuitos?",
            content: "Sí, puedes crear diagramas de flujo 100% gratuitos con Sketchlie. Además, puedes compartir tus diagramas de flujo online con otros usuarios para colaborar en tiempo real sin costo adicional."
        }
    ];

    const steps = [
        {
            trigger: "1. Identifica el proceso o sistema que deseas representar",
            text: "Antes de comenzar a crear un diagrama de flujo, es importante tener una comprensión clara del proceso o sistema que deseas representar. Esto puede incluir identificar los pasos del proceso, las decisiones que se toman en cada paso, y las relaciones entre los pasos."
        },
        {
            trigger: "2. Selecciona los símbolos y elementos visuales adecuados",
            text: "Los diagramas de flujo utilizan una variedad de símbolos y elementos visuales para representar la información de manera efectiva. Estos símbolos incluyen formas geométricas (como círculos, rectángulos y diamantes) para representar pasos, decisiones y puntos de inicio/fin, así como líneas y flechas para mostrar las relaciones entre los pasos."
        },
        {
            trigger: "3. Organiza los símbolos y elementos visuales en un diseño coherente",
            text: "Una vez que hayas seleccionado los símbolos y elementos visuales adecuados, organízalos en un diseño coherente que represente claramente el proceso o sistema que estás representando. Esto puede incluir organizar los pasos en una secuencia lógica, conectar los pasos con líneas o flechas para mostrar las relaciones entre ellos, y agregar texto o etiquetas para proporcionar información adicional."
        },
        {
            trigger: "4. Revisa y ajusta tu diagrama de flujo",
            text: "Una vez que hayas creado tu diagrama de flujo, revísalo cuidadosamente para asegurarte de que represente con precisión el proceso o sistema que deseas representar. Realiza ajustes según sea necesario para mejorar la claridad y la precisión de tu diagrama de flujo."
        }
    ]

    return (
        <div>
            <Breadcrumb className="xl:mx-[10%] lg:mx-[7%] md:mx-[5%] mx-[5%] mt-5">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <Link href="/">Home</Link>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Diagrama de flujo</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <BlogStructure
                title="Creador de diagramas de flujo online"
                description="Crea diagramas de flujo rápidamente y simplifica tus rutinas con el creador de diagramas de flujo de Sketchlie. Visualiza los pasos del proceso que estés creando, desde alinear a los equipos hasta pasar a la acción con toda la información."
                cta="Crear diagrama de flujo"
                alt="Diagrama de Flujo"
                img="/placeholders/diagrama-de-flujo.png"
            />
            <LogoSlider />
            <LandingVideo />
            <div className="mb:my-28 my-14">
                <BlogSection
                    title="Crea diagramas de flujo versátiles."
                    text="Utiliza nuestras herramientas de diseño para simplificar datos complicados. Explora nuestra variedad de íconos y colores, y agrega enlaces o incrusta elementos en tu diagrama de flujo."
                />
            </div>
            <BlogSection
                title="Diseña tu diagrama de flujo como un profesional"
                text="Empieza en minutos con nuestro intuitivo creador de diagramas de flujo. Crea diagramas de lo que necesites, desde sistemas y procesos hasta datos y programas, con nuestro creador de diagramas de flujo. Visualiza sistemas complejos en un solo lugar."
                alt="Mapa mental"
                img="/placeholders/mapa-mental.png"
                side="right"
            />
            <BlogSection
                title="Trabaja desde cualquier lugar"
                text="Tu flujograma guardado en la nube hace que puedas acceder desde cualquier lugar, en cualquier momento. Nuestro creador de diagramas de flujo es compatible con todos los dispositivos. Comienza trabajando en Sketchlie y desarrolla el proyecto con tu equipo para mejorar la claridad y dar resultados mucho más rápido."
                alt="Mapa de Proceso"
                img="/placeholders/improve-performance.png"
                side="right"
            />
            <BlogSection
                title="Crea un Diagrama de Flujo Online de Forma Intuitiva con Sketchlie"
                text="Descubre cómo crear diagramas de flujo de manera intuitiva y colaborativa con Sketchlie. Nuestra plataforma en línea te ofrece herramientas poderosas para visualizar procesos, organizar información y colaborar con tu equipo en tiempo real. Simplifica la comunicación y la planificación de proyectos con nuestras funciones intuitivas y fáciles de usar. ¡Comienza a mapear tus flujos hoy mismo con Sketchlie!"
                alt="Diagrama de Flujo"
                img="/placeholders/diagrama-de-flujo.png"
                side="right"
            />
            <BlogSection
                title="Potencia tus diagramas de flujo"
                text="Explora cómo Sketchlie puede llevar la colaboración a un nivel completamente nuevo. Desde sesiones de lluvia de ideas hasta reuniones de seguimiento de proyectos, esta herramienta versátil y fácil de usar está diseñada para potenciar la creatividad y la productividad de tu equipo. Únete a la revolución de la colaboración online. ¡Regístrate hoy mismo!"
                alt="Pizarra Online"
                img="/placeholders/pizarra-online.png"
                side="right"
            />
            <TemplatesSlider />
            <div className="my-20">
                <PlatformYouCanTrust />
            </div>
            <HowToCreate steps={steps} title="Cómo hacer un diagrama de flujo" />
            <FaqSection accordionData={faqData} sectionTitle="diagramas de flujo" />
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 xl:mx-[10%] lg:mx-[7%] md:mx-[5%] mx-[5%] gap-5 md:my-10 my-5">
                <VerMas title="Cómo hacer un Diagrama de Flujo" href="/diagrama-de-flujo/que-es-diagrama-de-flujo/" />
                <VerMas title="Tipos de Diagramas de Flujo" href="/diagrama-de-flujo/que-es-diagrama-de-flujo/" />
                <VerMas title="Beneficios de Crear Diagramas de Flujo" href="/diagrama-de-flujo/que-es-diagrama-de-flujo/" />
            </div>
        </div>

    );
}

export default LandingPage;