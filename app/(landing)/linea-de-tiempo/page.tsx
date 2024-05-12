import { BlogStructure } from "@/components/blog-structure";
import { Metadata } from "next";
import { BlogSection } from "@/components/blog-section";
import { LogoSlider } from "@/components/logo-slider";
import { FaqSection } from "@/components/faq-section";
import { HowToCreate } from "@/components/how-to-create";
import { PlatformYouCanTrust } from "@/components/platform-you-can-trust";
import { LandingVideo } from "@/components/landing-video";
import { VerMas } from "@/components/ver-mas";
import Link from "next/link";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { TemplatesSlider } from "@/components/templates-slider";

export const metadata: Metadata = {
    title: "Crea una línea de tiempo | Sketchlie",
    description: "Crea una línea de tiempo con Sketchlie gratis, el mejor creador de líneas de tiempo. Explora nuestra plantilla de línea de tiempo para acelerar tu flujo de trabajo.",
    keywords: ["línea de tiempo", "crear línea de tiempo", "plantilla de línea de tiempo", "línea de tiempo online", "línea de tiempo gratis", "línea de tiempo colaborativa", "línea de tiempo interactiva", "línea de tiempo de eventos", "línea de tiempo de historia", "línea de tiempo de proyectos", "línea de tiempo de vida", "línea de tiempo de trabajo", "línea de tiempo de eventos históricos", "línea de tiempo de eventos importantes", "línea de tiempo de eventos personales", "línea de tiempo de eventos futuros", "línea de tiempo de eventos pasados", "línea de tiempo de eventos actuales", "línea de tiempo de eventos de la vida", "línea de tiempo de eventos de la historia", "línea de tiempo de eventos de proyectos", "línea de tiempo de eventos de trabajo", "línea de tiempo de eventos de vida", "línea de tiempo de eventos de eventos", "línea de tiempo de eventos de eventos históricos", "línea de tiempo de eventos de eventos importantes", "línea de tiempo de eventos de eventos personales", "línea de tiempo de eventos de eventos futuros", "línea de tiempo de eventos de eventos pasados", "línea de tiempo de eventos de eventos actuales", "línea de tiempo de eventos de eventos de la vida", "línea de tiempo de eventos de eventos de la historia", "línea de tiempo de eventos de eventos de proyectos", "línea de tiempo de eventos de eventos de trabajo", "línea de tiempo de eventos de eventos de vida", "línea de tiempo de eventos de eventos de eventos", "línea de tiempo de eventos de eventos de eventos históricos", "línea de tiempo de eventos de eventos de eventos importantes", "línea de tiempo de eventos de eventos de eventos personales", "línea de tiempo de eventos de eventos de eventos futuros", "línea de tiempo de eventos de eventos de eventos pasados", "línea de tiempo de eventos de eventos de eventos actuales", "línea de tiempo de eventos de eventos de eventos de la vida"],
    alternates: {
        canonical: "https://www.sketchlie.com/linea-de-tiempo/",
    }
};

const LandingPage = () => {
    const faqData = [
        {
            value: "item-1",
            trigger: "¿Qué es una línea de tiempo?",
            content: "Una línea de tiempo es una representación visual de eventos o procesos en orden cronológico. Se utiliza para mostrar la secuencia de eventos a lo largo del tiempo, desde el pasado hasta el presente y, en algunos casos, hacia el futuro. Las líneas de tiempo pueden ser simples o complejas, dependiendo de la cantidad de eventos que se desean representar y la cantidad de información que se desea incluir. Se utilizan en una variedad de contextos, incluyendo la historia, la ciencia, la tecnología, la educación y los negocios, entre otros. Las líneas de tiempo son una herramienta poderosa para visualizar y comprender la secuencia de eventos y su relación entre sí."
        },
        {
            value: "item-2",
            trigger: "¿Cómo se crea un cronograma?",
            content: "Para crear una línea de tiempo, sigue estos pasos: 1. Identifica los eventos o procesos que deseas representar en la línea de tiempo. 2. Organiza los eventos en orden cronológico, desde el pasado hasta el presente y, si es necesario, hacia el futuro. 3. Selecciona un formato de línea de tiempo que se adapte a tus necesidades, como una línea de tiempo lineal, una línea de tiempo de bloques o una línea de tiempo de puntos. 4. Agrega los eventos a la línea de tiempo, incluyendo fechas, descripciones y cualquier otra información relevante. 5. Personaliza la línea de tiempo con colores, fuentes y estilos para que se ajuste a tu estilo y necesidades. 6. Revisa y ajusta la línea de tiempo según sea necesario para asegurarte de que represente con precisión los eventos que deseas mostrar. 7. Comparte la línea de tiempo con otros para colaborar y comunicar de manera efectiva la secuencia de eventos."
        },
        {
            value: "item-3",
            trigger: "¿Cuáles son los tipos más comunes de diagramas de flujo?",
            content: "Hay cuatro tipos principales de diagramas de flujo. Un diagrama de flujo de permite comunicar un proceso o proyecto. Un diagrama de flujo muestra la forma en la que funciona un negocio o un proceso. Un diagrama de flujo de carriles permite separar personas o equipos cuando necesitas mostrar varios flujos de información uno al lado del otro. Un diagrama de flujo de datos muestra cómo se procesan los datos dentro de un sistema."
        },
        {
            value: "item-4",
            trigger: "¿Para qué se utilizan las líneas de tiempo?",
            content: "Las líneas de tiempo se utilizan para visualizar y comprender la secuencia de eventos a lo largo del tiempo. Son útiles en diversos contextos, como en la educación (para enseñar historia), en la investigación (para organizar eventos importantes) y en los negocios (para planificar proyectos y estrategias)."
        },
        {
            value: "item-5",
            trigger: "¿Cuáles son los elementos comunes de una línea de tiempo?",
            content: "Los elementos comunes de una línea de tiempo incluyen un eje horizontal que representa el tiempo, marcadores de tiempo (fechas) a lo largo del eje, eventos o hitos colocados en la línea de tiempo según su fecha y etiquetas que describen cada evento."
        },
        {
            value: "item-6",
            trigger: "¿Qué tipos de líneas de tiempo existen?",
            content: "Hay varios tipos de líneas de tiempo, incluyendo líneas de tiempo lineales, líneas de tiempo de bandas múltiples (que muestran eventos en diferentes categorías), líneas de tiempo circulares (que muestran eventos en un círculo) y líneas de tiempo históricas (que muestran eventos a lo largo de la historia)."
        }
    ];

    const steps = [
        {
            trigger: "1. Define el propósito y el tema",
            text: "Decide qué evento o período de tiempo quieres representar en tu línea de tiempo. Puede ser histórico, biográfico, científico, etc."
        },
        {
            trigger: "2. Recopila la información",
            text: "Reúne todos los eventos relevantes que quieres incluir en la línea de tiempo. Investiga y asegúrate de tener las fechas correctas y cualquier detalle adicional que desees agregar."
        },
        {
            trigger: "3. Abre el creador de líneas de tiempo de Sketchlie",
            text: "Puedes partir desde cero o elegir una plantilla de línea de tiempo para comenzar. Agrega los eventos, fechas y descripciones según sea necesario para crear tu línea de tiempo"
        },
        {
            trigger: "4. Organiza los eventos",
            text: "Ordena los eventos de manera cronológica, desde el inicio hasta el final, colocando las fechas en el eje horizontal y los eventos en el eje vertical."
        },
        {
            trigger: "5. Diseña y personaliza",
            text: "Añade detalles visuales como colores, iconos o imágenes para resaltar eventos importantes. Asegúrate de que la línea de tiempo sea fácil de entender y visualmente atractiva."
        },
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
                        <BreadcrumbPage>Línea de tiempo</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <BlogStructure
                title="Creador de líneas de tiempo gratuito"
                description="Crea una línea de tiempo con Sketchlie gratis, el mejor creador de líneas de tiempo. Explora nuestra plantilla de línea de tiempo para acelerar tu flujo de trabajo."
                cta="Crear línea de tiempo"
                alt="Linea de tiempo image"
                img="/placeholders/linea-de-tiempo.png"
            />
            <LogoSlider />
            <LandingVideo />
            <BlogSection
                title="¿Cómo funciona el creador de líneas de tiempo de Sketchlie?"
                text="Nuestro creador de líneas de tiempo es una herramienta poderosa y fácil de usar que te permite visualizar eventos y procesos en orden cronológico. Con una interfaz intuitiva y funciones avanzadas, puedes crear líneas de tiempo personalizadas en minutos."
                text2={
                    <>
                        Comienza seleccionando una <Link href="/plantillas/linea-de-tiempo" className="text-custom-blue" target="_blank">plantilla de línea de tiempo</Link> o creando una desde cero. Agrega eventos, fechas, descripciones y otros detalles para personalizar tu línea de tiempo
                    </>
                }
                img="/placeholders/mapa-mental.png"
                side="right"
            />
            <BlogSection
                title="Visualiza tus eventos en orden cronológico"
                text="En Sketchlie, damos vida a tus proyectos con líneas de tiempo dinámicas. Organiza tus tareas, fija plazos y presenta hitos de forma clara y atractiva. Ya sea para resumir reuniones, documentar procesos o presentar planes a clientes, nuestras líneas de tiempo son tu herramienta ideal."
                img="/placeholders/improve-performance.png"
                side="right"
            />
            <BlogSection
                title="Crea una línea cronológica de manera sencilla."
                text="Visualiza tu proyecto, evento o historia de manera clara y concisa con nuestro creador de líneas de tiempo. Crea un historial en minutos y personalízala con colores, fuentes y estilos para que se ajuste a tus necesidades. Comparte tu cronograma con otros para colaborar y comunicar de manera efectiva la secuencia de eventos."
                img="/placeholders/diagrama-de-flujo.png"
                side="right"
            />
            <TemplatesSlider />
            <div className="my-20">
                <PlatformYouCanTrust />
            </div>
            <HowToCreate steps={steps} title="Cómo hacer una línea de tiempo" />
            <FaqSection accordionData={faqData} sectionTitle="líneas de tiempo" />
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 xl:mx-[10%] lg:mx-[7%] md:mx-[5%] mx-[5%] gap-5 md:my-10 my-5">
                <VerMas title="Cómo hacer una línea de tiempo" href="/linea-de-tiempo/que-es-linea-de-tiempo/" />
                <VerMas title="Tipos de líneas de tiempo" href="/linea-de-tiempo/que-es-linea-de-tiempo/" />
                <VerMas title="Razones para hacer un cronograma" href="/linea-de-tiempo/que-es-linea-de-tiempo/" />
            </div>
        </div>

    );
}

export default LandingPage;