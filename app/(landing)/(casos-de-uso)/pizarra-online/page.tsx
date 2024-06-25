import { BlogStructure } from "@/components/blog-structure";
import { Metadata } from "next";
import { BlogSection } from "@/components/blog-section";
import { LogoSlider } from "@/components/logo-slider";
import { FaqSection } from "@/components/faq-section";
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
    title: "Pizarra Online Gratis | Colaboración en Tiempo Real | Sketchlie",
    description: "Crea, colabora y comparte ideas en tiempo real con la pizarra online gratuita de Sketchlie. Ideal para lluvia de ideas, planificación visual y enseñanza remota. Fácil de usar, sin registro requerido.",
    keywords: [
        "pizarra online",
        "pizarra colaborativa",
        "pizarra virtual",
        "lluvia de ideas online",
        "mapas mentales",
        "diagramas online",
        "herramienta de colaboración",
        "planificación visual",
        "enseñanza remota",
        "Sketchlie"
    ],
    alternates: {
        canonical: "https://www.sketchlie.com/es/pizarra-online/",
    },
};

const LandingPage = () => {
    const faqData = [
        {
            value: "item-1",
            trigger: "¿Qué es una pizarra online y cómo funciona?",
            content: "Una pizarra online es un espacio digital interactivo que permite dibujar, escribir y colaborar en tiempo real. En Sketchlie, nuestra pizarra online ofrece un lienzo infinito donde puedes crear diagramas, mapas mentales, procesos y más. Funciona en cualquier dispositivo con conexión a internet, permitiendo la colaboración instantánea entre usuarios desde cualquier ubicación."
        },
        {
            value: "item-2",
            trigger: "¿La pizarra online de Sketchlie es realmente gratis?",
            content: "¡Absolutamente! Sketchlie ofrece una potente pizarra online totalmente gratis. No se requiere tarjeta de crédito para registrarse, y la versión gratuita incluye todas las funciones esenciales para colaboración efectiva. Para equipos que necesitan características avanzadas, ofrecemos planes premium, pero nuestra versión gratuita es ideal para la mayoría de los usuarios."
        },
        {
            value: "item-3",
            trigger: "¿Cómo puedo usar la pizarra online de Sketchlie en educación?",
            content: "Sketchlie es una herramienta versátil para la educación. Puedes crear lecciones interactivas, usar plantillas de organizadores gráficos, hacer lluvia de ideas en clase, y fomentar la colaboración entre estudiantes. Nuestras funciones de videollamada, comentarios y encuestas integradas hacen que las clases online sean más dinámicas y participativas. Es perfecta para estimular el pensamiento crítico y la creatividad en entornos educativos virtuales o híbridos."
        },
        {
            value: "item-4",
            trigger: "¿Por qué elegir la pizarra online de Sketchlie?",
            content: "Sketchlie destaca por ofrecer la pizarra online más rápida y fácil de usar del mercado. Nuestra interfaz intuitiva, combinada con potentes herramientas de colaboración, la hace ideal para equipos de cualquier tamaño. Además, nuestra pizarra se adapta perfectamente a diversos escenarios: desde reuniones empresariales hasta aulas virtuales, garantizando una experiencia fluida y productiva en cada uso."
        },
        {
            value: "item-5",
            trigger: "¿Cómo empiezo a usar la pizarra online de Sketchlie?",
            content: "Comenzar con Sketchlie es increíblemente sencillo. Solo necesitas registrarte gratuitamente en nuestra plataforma, sin necesidad de proporcionar datos de tarjeta de crédito. Una vez registrado, puedes crear tu primera pizarra online con un solo clic y empezar a colaborar de inmediato. Ofrecemos tutoriales y guías para ayudarte a aprovechar al máximo todas nuestras funciones."
        },
        {
            value: "item-6",
            trigger: "¿Puedo usar la pizarra online de Sketchlie para presentaciones profesionales?",
            content: "¡Definitivamente! La pizarra online de Sketchlie es una excelente herramienta para crear y realizar presentaciones dinámicas e interactivas. Puedes preparar tu presentación con anticipación, utilizar nuestras plantillas profesionales, y luego compartir tu pizarra en tiempo real durante reuniones o conferencias. Nuestro modo de presentación te permite guiar a tu audiencia a través del contenido de manera fluida y atractiva."
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
                title="Pizarra Online Gratis: Colaboración Sin Límites"
                description="Descubre Sketchlie: la pizarra online más rápida y versátil. Colabora en tiempo real, crea proyectos interactivos y potencia la productividad de tu equipo desde cualquier lugar. Gratis, fácil de usar y sin límites."
                cta="Crea tu pizarra online gratis"
                alt="Pizarra online colaborativa de Sketchlie"
                img="/placeholders/pizarra-online.png"
            />
            <LogoSlider />
            <LandingVideo />
            <div className="my-28">
                <BlogSection
                    title="Tu Espacio de Trabajo Digital Definitivo"
                    text="Sketchlie trasciende el concepto tradicional de pizarra online. Es un ecosistema digital completo donde la colaboración en tiempo real se fusiona con herramientas avanzadas de productividad. Aquí, los equipos pueden generar ideas, desarrollar proyectos y tomar decisiones de manera conjunta, sin importar su ubicación geográfica. Nuestra pizarra virtual está diseñada para potenciar la creatividad y eficiencia de tu equipo, ofreciendo un entorno intuitivo y flexible que se adapta a cualquier flujo de trabajo."
                />
            </div>
            <BlogSection
                title="Colaboración Efectiva en la Era Digital"
                text="En un mundo donde el trabajo remoto y la colaboración a distancia son la norma, Sketchlie se posiciona como la herramienta esencial para equipos modernos. Nuestra pizarra online no solo facilita la comunicación y el trabajo conjunto, sino que también crea un espacio donde las ideas pueden fluir libremente, transformándose en proyectos tangibles. Con Sketchlie, eliminas las barreras geográficas y temporales, permitiendo que tu equipo alcance su máximo potencial creativo y productivo."
                alt="Colaboración en pizarra online"
                img="/placeholders/modelo-canvas.png"
                side="right"
            />

            <BlogSection
                title="Colaboración en Tiempo Real sin Precedentes"
                text="La pizarra online de Sketchlie redefine la colaboración en tiempo real. Experimenta una sincronización instantánea que permite a múltiples usuarios trabajar simultáneamente en el mismo proyecto. Desde lluvia de ideas hasta la toma de decisiones críticas, nuestra plataforma facilita una comunicación fluida y una interacción sin fricciones. Con Sketchlie, cada miembro del equipo puede contribuir en tiempo real, acelerando los procesos creativos y mejorando la eficiencia general del proyecto."
                alt="Colaboración en tiempo real en pizarra virtual"
                img="/placeholders/diagrama-de-venn.png"
                side="right"
            />

            <BlogSection
                title="Gestión de Proyectos Visual e Intuitiva"
                text="Transforma la manera en que planificas y gestionas proyectos con la pizarra online de Sketchlie. Nuestras herramientas integradas permiten crear flujos de trabajo visuales, asignar tareas y seguir el progreso de manera intuitiva. Desde diagramas de Gantt hasta tableros Kanban, Sketchlie ofrece la flexibilidad para adaptar tu pizarra a cualquier metodología de gestión de proyectos. Centraliza la información, mejora la transparencia y mantén a tu equipo alineado con nuestro espacio de trabajo visual altamente personalizable."
                alt="Gestión de proyectos en pizarra online"
                img="/placeholders/mapa-de-procesos.png"
                side="right"
            />

            <BlogSection
                title="La Experiencia Única de la Pizarra Online de Sketchlie"
                text="Descubre una nueva dimensión de colaboración con Sketchlie. Nuestra pizarra online va más allá de las herramientas convencionales, ofreciendo un espacio donde la creatividad y la productividad convergen. Invita a colegas, realiza videoconferencias integradas, y utiliza nuestro modo de presentación para reuniones impactantes. La velocidad y versatilidad de Sketchlie permiten que múltiples usuarios trabajen sin esfuerzo en un lienzo infinito, convirtiendo cada sesión en una experiencia colaborativa inigualable. Con Sketchlie, no solo trabajas en proyectos; los llevas a la vida en un entorno dinámico y estimulante."
                alt="Experiencia única en pizarra virtual"
                img="/placeholders/lluvia-de-ideas.png"
                side="right"
            />
            <TemplatesSlider />
            <FaqSection accordionData={faqData} sectionTitle="Pizarra Online" />
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 xl:mx-[10%] lg:mx-[7%] md:mx-[5%] mx-[5%] gap-5 md:my-10 my-5">
                <VerMas title="Maximiza tu Productividad con Nuestra Pizarra Online" href="/pizarra-online/que-es-pizarra-online/" />
                <VerMas title="Ventajas de la Pizarra Online Colaborativa" href="/pizarra-online/beneficios-pizarra-online/" />
                <VerMas title="Guía Completa: Pizarra Online para Equipos" href="/pizarra-online/guia-pizarra-online/" />
            </div>
        </div>

    );
}

export default LandingPage;