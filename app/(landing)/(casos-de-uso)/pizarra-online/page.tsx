import { BlogStructure } from "@/components/blog-structure";
import { Metadata } from "next";
import { BlogSection } from "@/components/blog-section";
import { LogoSlider } from "@/components/logo-slider";
import { FaqSection } from "@/components/faq-section";
import { BlogLinks } from "@/components/blog-links";
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
    title: "Crea tu Pizarra Online Gratis | Sketchlie",
    description: "Colabora de manera efectiva y presenta ideas con la pizarra online de Sketchlie. Mejora tus productos desde una plataforma segura diseñada para empresas.",
    keywords: ["pizarra online", "pizarra online gratis", "pizarra online colaborativa"],
    alternates: {
        canonical: "https://www.sketchlie.com/pizarra-online/",
    }
};

const LandingPage = () => {
    const faqData = [
        {
            value: "item-1",
            trigger: "¿Qué es una pizarra online?",
            content: "Una pizarra online es un espacio virtual donde se puede dibujar todo tipo de ideas, diseños, procesos etc. En Sketchlie trabajamos para que puedas tener la pizarra online colaborativa infinita más rápida para que sea ideal para todo tipo de equipos."
        },
        {
            value: "item-2",
            trigger: "¿La pizarra online de Sketchlie es grátis?",
            content: "Sí! Sketchlie es gratis y no requiere tarjeta de crédito para registrarte, para equipos que quieran ir más allá tenemos planes de pago, pero la versión gratuita es ideal para equipos pequeños."
        },
        {
            value: "item-3",
            trigger: "¿Se puede utilizar la pizarra online de Sketchlie para hacer clases?",
            content: "Sí! Sketchlie ofrece organizadores gráficos intuitivos y dinámicos, como líneas del tiempo, mapas mentales y diagramas de Venn que se adaptan a todos los estudiantes. Edita en tiempo real con tus alumnos, prepara clases, comparte materiales, haz videollamadas, comentarios, encuestas y muchas otras funciones para hacer que tus clases online sean aún más interesantes. Regístrate para estimular el pensamiento crítico y la creatividad de tus estudiantes."
        },
        {
            value: "item-4",
            trigger: "¿Por qué Sketchlie?",
            content: "Sketchlie ofrece simplemente la pizarra online más rápida y fácil de usar, con una interfaz intuitiva y una amplia gama de herramientas de colaboración. Nuestra pizarra online es ideal para equipos de cualquier tamaño, desde pequeñas empresas hasta grandes corporaciones. También es perfecta para profesores y estudiantes que buscan una forma más interactiva de enseñar y aprender."
        },
        {
            value: "item-5",
            trigger: "¿Cómo puedo empezar a usar la pizarra online de Sketchlie?",
            content: "Es muy sencillo, solo tienes que registrarte en Sketchlie y podrás empezar a usar la pizarra online gratuita. No necesitas tarjeta de crédito para registrarte."
        },
        {
            value: "item-6",
            trigger: "¿Puedo usar la pizarra online de Sketchlie para hacer presentaciones?",
            content: "Sí! Sketchlie es ideal para hacer presentaciones, puedes compartir tu pizarra online con otras personas y hacer presentaciones en tiempo real."
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
                        <BreadcrumbPage>Pizarra Online</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <BlogStructure
                title="La pizarra online para colaborar."
                description="Sketchlie es una pizarra online rápida, gratuita y fácil de usar pensada para  ayudarte a colaborar con cualquier persona desde cualquier lugar."
                cta="Crear tablero gratis"
                alt="Pizarra online"
                img="/placeholders/pizarra-online.png"
            />
            <LogoSlider />
            <LandingVideo />
            <div className="my-28">
                <BlogSection
                    title="Espacio de trabajo pensado en ti"
                    text="Sketchlie es más que una pizarra online, es un espacio virtual donde los usuarios pueden colaborar en tiempo real, compartir ideas, añadir notas, y desarrollar proyectos de forma conjunta, sin importar su ubicación geográfica. En Sketchlie, nuestra pizarra online va más allá al ofrecer una amplia gama de características diseñadas específicamente para potenciar la creatividad y la productividad de los equipos."
                />
            </div>
            <BlogSection
                title="La pizarra online para colaborar efectivamente"
                text="En el contexto actual, donde la colaboración remota es esencial, contar con herramientas que faciliten el trabajo en equipo y fomenten la creatividad se ha vuelto fundamental. Nuestra pizarra online no solo permite a los equipos colaborar de manera efectiva, sino que también proporciona un entorno dinámico donde las ideas pueden fluir libremente y los proyectos pueden cobrar vida."
                alt="Mapa mental"
                img="/placeholders/mapa-mental.png"
                side="right"
            />

            <BlogSection
                title="Colaboración en Tiempo Real"
                text="Con Sketchlie, la colaboración en tiempo real es más que una posibilidad: es una realidad. Nuestra pizarra online permite a los usuarios trabajar juntos en proyectos de forma instantánea, lo que facilita la comunicación instantánea, la toma de decisiones ágil y la maximización de la eficiencia del equipo."
                alt="Mapa de Proceso"
                img="/placeholders/improve-performance.png"
                side="right"
            />

            <BlogSection
                title="Planificación y Gestión de Proyectos"
                text="Equipada con herramientas de planificación integradas, nuestra pizarra online simplifica la organización de tareas, la asignación de responsabilidades y el seguimiento del progreso del proyecto. Desde la creación de listas de tareas hasta la visualización de cronogramas, Sketchlie te ofrece todo lo que necesitas para gestionar tus proyectos de manera eficaz en un solo lugar."
                alt="Diagrama de Flujo"
                img="/placeholders/diagrama-de-flujo.png"
                side="right"
            />

            <BlogSection
                title="La pizarra online única de Sketchlie."
                text="Invita a colegas a tu pizarra online para sesiones de lluvia de ideas, toma de notas y seguimiento de proyectos. Comparte tu pantalla, realiza videoconferencias y aprovecha el modo de presentación para reuniones estimulantes. La rapidez y versatilidad de Sketchlie permiten que múltiples usuarios trabajen simultáneamente sin esfuerzo, convirtiendo cada sesión en una experiencia colaborativa inigualable."
                alt="Mapa Conceptual"
                img="/placeholders/mapa-conceptual-online.png"
                side="right"
            />
            <TemplatesSlider />
            <FaqSection accordionData={faqData} sectionTitle="las pizarras online" />
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 xl:mx-[10%] lg:mx-[7%] md:mx-[5%] mx-[5%] gap-5 md:my-10 my-5">
                <VerMas title="Cómo Utilizar una Pizarra Online" href="/pizarra-online/que-es-pizarra-online/" />
                <VerMas title="Beneficios de una Pizarra Online" href="/pizarra-online/que-es-pizarra-online/" />
                <VerMas title="¿Qué es una Pizarra Online?" href="/pizarra-online/que-es-pizarra-online/" />
            </div>
        </div>

    );
}

export default LandingPage;