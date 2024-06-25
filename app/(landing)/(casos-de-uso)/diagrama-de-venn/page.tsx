import { Metadata } from "next";
import { BlogStructure } from "@/components/blog-structure";
import { BlogSection } from "@/components/blog-section";
import { LogoSlider } from "@/components/logo-slider";
import { FaqSection } from "@/components/faq-section";
import { HowToCreate } from "@/components/how-to-create";
import { PlatformYouCanTrust } from "@/components/platform-you-can-trust";
import { LandingVideo } from "@/components/landing-video";
import { VerMas } from "@/components/ver-mas";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import Link from "next/link";
import { TemplatesSlider } from "@/components/templates-slider";

export const metadata: Metadata = {
    title: "Creador de Diagramas de Venn Online | Sketchlie",
    description: "Crea diagramas de Venn online con Sketchlie. Visualiza relaciones, compara conjuntos y colabora en tiempo real. Plantillas gratuitas y fáciles de usar.",
    keywords: ["diagrama de Venn", "diagrama de Venn online", "creador de diagramas de Venn", "plantillas de diagrama de Venn"],
    alternates: {
        canonical: "https://www.sketchlie.com/diagrama-de-venn/",
    }
};

const LandingPage = () => {
    const faqData = [
        {
            value: "item-1",
            trigger: "¿Qué es un diagrama de Venn?",
            content: "Un diagrama de Venn es una representación gráfica que muestra las relaciones lógicas entre diferentes conjuntos de elementos. Utiliza círculos superpuestos para ilustrar similitudes, diferencias y conexiones entre grupos de datos o conceptos. Es una herramienta visual poderosa para analizar y comparar información de manera clara y concisa."
        },
        {
            value: "item-2",
            trigger: "¿Cómo se crea un diagrama de Venn con Sketchlie?",
            content: "Crear un diagrama de Venn con Sketchlie es fácil y rápido: 1) Elige una plantilla de diagrama de Venn o comienza desde cero. 2) Personaliza los círculos y colores según tus necesidades. 3) Agrega texto para etiquetar cada conjunto y sus elementos. 4) Utiliza las herramientas de formato para ajustar el diseño. 5) Colabora en tiempo real con tu equipo para refinar el diagrama."
        },
        {
            value: "item-3",
            trigger: "¿Cuáles son los usos más comunes de los diagramas de Venn?",
            content: "Los diagramas de Venn se utilizan en diversos campos: 1) Matemáticas y lógica para representar operaciones de conjuntos. 2) Negocios para análisis de mercado y segmentación de clientes. 3) Educación para comparar y contrastar conceptos. 4) Ciencias para clasificar especies o mostrar relaciones entre grupos. 5) Resolución de problemas y toma de decisiones en proyectos."
        },
        {
            value: "item-4",
            trigger: "¿Qué ventajas ofrece crear diagramas de Venn online con Sketchlie?",
            content: "Sketchlie ofrece numerosas ventajas: 1) Plantillas personalizables y fáciles de usar. 2) Colaboración en tiempo real con tu equipo. 3) Acceso desde cualquier dispositivo. 4) Integración con otras herramientas de productividad. 5) Almacenamiento en la nube y fácil compartición. 6) Actualizaciones automáticas y nuevas funciones regularmente."
        },
        {
            value: "item-5",
            trigger: "¿Los diagramas de Venn de Sketchlie son gratuitos?",
            content: "Sí, puedes crear diagramas de Venn gratuitos con Sketchlie. Ofrecemos una versión gratuita que incluye plantillas básicas y funcionalidades esenciales. Para acceder a funciones avanzadas, plantillas premium y mayor capacidad de almacenamiento, también disponemos de planes de suscripción."
        }
    ];

    const steps = [
        {
            trigger: "1. Elige una plantilla o comienza desde cero",
            text: "Selecciona una de nuestras plantillas de diagrama de Venn prediseñadas o inicia un nuevo proyecto en blanco. Nuestras plantillas son totalmente personalizables y te ayudarán a comenzar rápidamente."
        },
        {
            trigger: "2. Personaliza los círculos y colores",
            text: "Ajusta el tamaño, la posición y el color de los círculos para representar tus conjuntos. Puedes agregar más círculos si necesitas comparar más de tres conjuntos."
        },
        {
            trigger: "3. Agrega texto y etiquetas",
            text: "Utiliza las herramientas de texto para etiquetar cada conjunto y agregar los elementos correspondientes. Personaliza las fuentes y tamaños para mejorar la legibilidad."
        },
        {
            trigger: "4. Refina el diseño",
            text: "Ajusta la disposición de los elementos, agrega iconos o imágenes si es necesario, y asegúrate de que la información esté claramente presentada. Utiliza nuestras herramientas de alineación para un aspecto profesional."
        },
        {
            trigger: "5. Colabora y comparte",
            text: "Invita a tu equipo a colaborar en tiempo real. Recibe comentarios, haz ajustes y finaliza tu diagrama de Venn. Comparte fácilmente tu creación o expórtala en varios formatos."
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
                        <BreadcrumbPage>Diagrama de Venn</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <BlogStructure
                title="Creador de Diagramas de Venn Online"
                description="Simplifica la visualización de relaciones y comparaciones con el creador de diagramas de Venn de Sketchlie. Crea diagramas profesionales en minutos, colabora en tiempo real y potencia tus análisis."
                cta="Crear Diagrama de Venn"
                alt="Diagrama de Venn Online"
                img="/placeholders/diagrama-de-venn.png"
            />
            <LogoSlider />
            <LandingVideo />
            <div className="mb:my-28 my-14">
                <BlogSection
                    title="Diagramas de Venn versátiles y poderosos"
                    text="Utiliza nuestras herramientas intuitivas para crear diagramas de Venn que simplifiquen datos complejos. Personaliza círculos, colores y etiquetas para representar claramente las relaciones entre conjuntos."
                />
            </div>
            <BlogSection
                title="Diseña diagramas de Venn profesionales en minutos"
                text="Nuestro creador intuitivo te permite elaborar diagramas de Venn impactantes sin esfuerzo. Ideal para presentaciones, análisis de datos, educación y más. Visualiza relaciones complejas de manera clara y efectiva."
                alt="Diagrama de Venn Profesional"
                img="/placeholders/modelo-canvas.png"
                side="right"
            />
            <BlogSection
                title="Colabora en tiempo real desde cualquier lugar"
                text="Accede y edita tus diagramas de Venn desde cualquier dispositivo. Trabaja con tu equipo en tiempo real, recibe feedback instantáneo y mejora la toma de decisiones. Con Sketchlie, la colaboración efectiva está a solo un clic de distancia."
                alt="Colaboración en Diagramas de Venn"
                img="/placeholders/lluvia-de-ideas.png"
                side="left"
            />
            <BlogSection
                title="Plantillas de diagramas de Venn para cada necesidad"
                text = {<>Explora nuestra amplia biblioteca de <Link href="/plantillas/diagrama-de-venn/" className="hover:underline text-custom-blue">plantillas de diagramas de Venn</Link>. Desde simples comparaciones de dos conjuntos hasta complejos diagramas multiconjunto, tenemos la plantilla perfecta para tu proyecto. Personaliza y adapta fácilmente a tus necesidades específicas.</>}
                alt="Plantillas de Diagramas de Venn"
                img="/placeholders/mapa-de-procesos.png"
                side="right"
            />
            <HowToCreate steps={steps} title="Cómo crear un diagrama de Venn" img="/templates/diagrama-de-venn.png" alt="Crear Diagrama de Venn" cta="Comenzar ahora"/>
            <TemplatesSlider />
            <div className="my-20">
                <PlatformYouCanTrust />
            </div>
            <FaqSection accordionData={faqData} sectionTitle="diagramas de Venn" />
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 xl:mx-[10%] lg:mx-[7%] md:mx-[5%] mx-[5%] gap-5 md:my-10 my-5">
                <VerMas title="Tipos de Diagramas de Venn" href="/diagrama-de-venn/que-es-diagrama-de-venn/" />
                <VerMas title="Usos de los Diagramas de Venn en Negocios" href="/diagrama-de-venn/que-es-diagrama-de-venn/" />
                <VerMas title="Diagramas de Venn en Educación" href="/diagrama-de-venn/que-es-diagrama-de-venn/" />
            </div>
        </div>
    );
}

export default LandingPage;