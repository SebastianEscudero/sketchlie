import { BlogStructure } from "@/components/blog-structure";
import { Metadata } from "next";
import { BlogSection } from "@/components/blog-section";
import { LogoSlider } from "@/components/logo-slider";
import { FaqSection } from "@/components/faq-section";
import { LandingVideo } from "@/components/landing-video";
import { HowToCreate } from "@/components/how-to-create";
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
import { BlogLinks } from "@/components/blog-links";

export const metadata: Metadata = {
    title: "Quiénes Somos | Sketchlie",
    description: "Descubre la historia detrás de Sketchlie. Fundada por ingenieros y diseñadores expertos, nuestra misión es convertir ideas en planes de acción concretos a través de la colaboración visual.",
    keywords: ["Sketchlie", "quiénes somos", "colaboración visual", "gestión de proyectos", "innovación", "startup tecnológica"],
    alternates: {
        canonical: "https://www.sketchlie.com/quienes-somos/",
    }
};

const LandingPage = () => {

    const steps = [
        {
            trigger: "1. Identificamos el problema",
            text: "Como ingenieros y diseñadores expertos, nos dimos cuenta de que muchas ideas brillantes se perdían en el proceso de ideación."
        },
        {
            trigger: "2. Desarrollamos la solución",
            text: "Creamos Sketchlie para transformar ideas abstractas en planes ejecutables, facilitando la colaboración y la visualización de conceptos."
        },
        {
            trigger: "3. Iteramos con feedback",
            text: "Trabajamos estrechamente con equipos creativos para refinar nuestras herramientas y asegurarnos de que satisfacen las necesidades reales de los usuarios."
        },
        {
            trigger: "4. Expandimos las capacidades",
            text: "Continuamente añadimos nuevas funciones y mejoras basadas en las últimas tendencias en gestión de proyectos y colaboración visual."
        },
        {
            trigger: "5. Construimos una comunidad",
            text: "Fomentamos una comunidad activa de usuarios que comparten ideas, plantillas y mejores prácticas para maximizar el potencial de Sketchlie."
        }
    ];

    const faqData = [
        {
            value: "item-1",
            trigger: "¿Cuándo y por qué se fundó Sketchlie?",
            content: "Sketchlie fue fundada en 2023 por un grupo de ingenieros y diseñadores expertos que identificaron la necesidad de una herramienta que pudiera transformar eficazmente las ideas en planes de acción concretos. Nuestra motivación surgió de la frustración de ver cómo muchas ideas brillantes se perdían en el proceso de ideación y ejecución."
        },
        {
            value: "item-2",
            trigger: "¿Qué experiencia tiene el equipo fundador de Sketchlie?",
            content: "Nuestro equipo fundador cuenta con una amplia experiencia en ingeniería de software, diseño de productos y gestión de proyectos. Hemos trabajado en empresas líderes del sector tecnológico y hemos enfrentado de primera mano los desafíos de la colaboración y la gestión de ideas en equipos distribuidos."
        },
        {
            value: "item-3",
            trigger: "¿Cómo se diferencia Sketchlie de otras herramientas de colaboración?",
            content: "Sketchlie se distingue por su enfoque en la visualización de ideas y la transformación de conceptos abstractos en planes accionables. Nuestra plataforma combina herramientas de mapeo mental, gestión de proyectos y colaboración en tiempo real, todo diseñado para fomentar la creatividad y mejorar la productividad de los equipos."
        },
        {
            value: "item-4",
            trigger: "¿Cuál es la visión a largo plazo de Sketchlie?",
            content: "Nuestra visión es convertirnos en la plataforma líder mundial para la ideación y ejecución de proyectos creativos. Aspiramos a empoderar a millones de profesionales y equipos para que desbloqueen todo su potencial creativo y lleven sus ideas a la realidad de manera más eficiente y colaborativa."
        },
        {
            value: "item-5",
            trigger: "¿Cómo contribuye Sketchlie a la innovación en las empresas?",
            content: "Sketchlie facilita la innovación al proporcionar un espacio virtual donde las ideas pueden fluir libremente, ser visualizadas, refinadas y convertidas en planes de acción concretos. Nuestras herramientas fomentan la colaboración multidisciplinaria, aceleran el proceso de ideación y ayudan a las empresas a llevar nuevas ideas al mercado más rápidamente."
        }
    ];

    return (
        <div>
            <Breadcrumb className="xl:mx-[10%] lg:mx-[7%] md:mx-[5%] mx-[5%] mt-5">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <Link href="/" title="Inicio">Inicio</Link>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Quiénes Somos</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <BlogStructure
                title="Quiénes Somos: La Historia detrás de Sketchlie"
                description="Descubre cómo un equipo de ingenieros y diseñadores expertos creó Sketchlie para transformar la manera en que las ideas se convierten en realidad."
                cta="Empieza a colaborar"
                alt="Equipo de Sketchlie colaborando"
                img="/placeholders/customer-journey-map.png"
            />
            <LogoSlider />
            <LandingVideo />
            <BlogSection
                title="Nuestra Misión"
                text="En Sketchlie, nos dedicamos a empoderar a equipos creativos y profesionales para que transformen sus ideas en planes de acción concretos. Creemos en el poder de la visualización y la colaboración para impulsar la innovación y el éxito de los proyectos."
                alt="Misión de Sketchlie"
                img="/placeholders/diagrama-ishikawa.png"
                side="right"
            />
            <BlogSection
                title="Nuestro Equipo"
                text="Somos un grupo diverso de ingenieros, diseñadores y expertos en product management unidos por la pasión de crear herramientas que fomenten la creatividad y la productividad. Nuestras experiencias en empresas líderes del sector tecnológico nos han dado una comprensión única de los desafíos que enfrentan los equipos modernos."
                alt="Equipo de Sketchlie"
                img="/placeholders/linea-de-tiempo.png"
                side="right"
            />
            <BlogSection
                title="Nuestra Tecnología"
                text="Sketchlie está construido sobre una base tecnológica robusta y flexible. Utilizamos las últimas tecnologías en desarrollo web y diseño de interfaces para garantizar una experiencia de usuario fluida y potente. Nuestro compromiso con la innovación nos impulsa a mejorar constantemente nuestras herramientas."
                alt="Tecnología de Sketchlie"
                img="/placeholders/mapa-mental.png"
                side="right"
            />
            <BlogSection
                title="Nuestro Impacto"
                text="Desde nuestro lanzamiento, hemos ayudado a miles de equipos en todo el mundo a mejorar su proceso creativo y de gestión de proyectos. Estamos orgullosos de ver cómo Sketchlie ha impulsado la innovación en startups, grandes empresas y organizaciones sin fines de lucro por igual."
                img="/placeholders/mapa-de-procesos.png"
                side="right"
            />
            <HowToCreate steps={steps} title="Nuestra Trayectoria" img="/templates/mapa-de-proceso.png" alt="Trayectoria de Sketchlie" cta="Únete a Nuestra Historia"/>
            <TemplatesSlider />
            <div className="mt-10 mb-20">
                <PlatformYouCanTrust />
            </div>
            <FaqSection accordionData={faqData} sectionTitle="Sketchlie y Nuestro Equipo" />
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5 md:my-20 my-5 xl:mx-[10%] lg:mx-[7%] md:mx-[5%] mx-[5%]">
                <BlogLinks blogTitle="Mapa Conceptual Online" blogImage="/placeholders/mapa-conceptual-online.png" blogHref="/mapa-conceptual/" blogDescription="Descubre cómo desatar tu creatividad y potenciar la colaboración en tiempo real con Sketchlie." />
                <BlogLinks blogTitle="Mapa de Procesos" blogImage="/placeholders/mapa-de-procesos.png" blogHref="/mapas-de-procesos" blogDescription="El mapa de procesos ayuda a los equipos a mapear y implementar mejoras. Regístrate hoy con tres espacios de trabajo gratuitos para empezar a utilizar la mejor herramienta de mapa de procesos." />
                <BlogLinks blogTitle="Mapas Mentales" blogImage="/placeholders/mapa-mental.png" blogHref="/mapa-mental-online/" blogDescription="Explora nuestras herramientas para simplificar la creación de mapas mentales. Organiza tus ideas de manera jerárquica y potencia tu creatividad con nuestro intuitivo creador de mapas mentales." />
            </div>
        </div>
    );
}

export default LandingPage;