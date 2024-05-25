import { Metadata } from "next";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Image from "next/image";
import Link from "next/link";
import { BlogLinks } from "@/components/blog-links";

export const metadata: Metadata = {
    title: "¿Qué es un cronograma? Ejemplos y técnicas | Sketchlie",
    description: "Un cronograma es una representación visual de un conjunto de eventos o actividades organizados en secuencia temporal. Descubre cómo crear un cronograma efectivo y ejemplos de técnicas de cronograma en Sketchlie.",
    keywords: ["linea de tiempo", "cronograma", "ejemplos de cronograma", "técnicas de cronograma", "cómo hacer un cronograma", "cómo crear un cronograma", "cronograma en Sketchlie"],
    alternates: {
        canonical: "https://www.sketchlie.com/linea-de-tiempo/que-es-linea-de-tiempo/",
    }
};

const LandingPage = () => {
    return (
        <div className="xl:mx-[5%] lg:mx-[4%] md:mx-[3%] mx-[3%]">
            <div className="mt-[3%]">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <Link href="/">Home</Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <Link href="/linea-de-tiempo/">Línea de tiempo</Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>¿Qué es una línea de tiempo?</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <div className="md:flex mt-10 items-center justify-between">
                <h1 className="lg:text-6xl md:text-5xl text-4xl md:px-5 md:text-left text-center" style={{ lineHeight: "1.2" }}>
                    Línea de tiempo
                </h1>
                <Image
                    src="/placeholders/linea-de-tiempo.png"
                    alt="Linea de Tiempo"
                    width={1920}
                    height={1080}
                    className="rounded-2xl border border-black md:max-w-[60%] md:mt-0 mt-10"
                />
            </div>
            <div className="flex flex-col-reverse lg:flex-row justify-between mt-[3%]">
                <div className="lg:max-w-[70%] text-xl">
                    <p className="mb-10">En el mundo de la colaboración y la visualización de ideas, contar con herramientas adecuadas es fundamental. Desde <Link href="/pizarra-online/" className="text-custom-blue hover:underline">pizarras online</Link> hasta <Link className="text-custom-blue hover:underline" href="/mapa-mental-online/">mapas mentales</Link>, cada herramienta tiene su propio propósito y utilidad. En esta ocasión, nos adentraremos en el fascinante mundo de las líneas de tiempo, una herramienta esencial para comprender y comunicar eventos a lo largo del tiempo.</p>
                    <div id="1" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">¿Qué es una Línea de Tiempo?</h2>
                    <p className="mb-10">Una <Link className="text-custom-blue hover:underline" href="/linea-de-tiempo/">línea de tiempo</Link> es una representación visual de eventos ordenados cronológicamente. Puede abarcar desde momentos históricos hasta planificaciones futuras, permitiendo una comprensión clara y ordenada de la secuencia temporal de los acontecimientos.</p>
                    <p className="mb-10">Las líneas de tiempo son utilizadas en una amplia gama de disciplinas, desde la historia y la arqueología hasta la gestión de proyectos y la planificación estratégica. Su versatilidad y simplicidad las convierten en una herramienta invaluable para estudiantes, profesionales y entusiastas por igual.</p>
                    <div id="2" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">Ventajas de Utilizar una Línea de Tiempo</h2>
                    <p className="mb-10">Las líneas de tiempo ofrecen numerosas ventajas, tanto en el ámbito educativo como en el profesional:</p>
                    <ul style={{ listStyleType: 'disc' }}>
                        <li className="mb-10 ml-5">
                            <strong>Claridad Visual:</strong> Al presentar información de manera cronológica y estructurada, las líneas de tiempo facilitan la comprensión de eventos complejos.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Organización:</strong> Permite organizar eventos históricos, hitos de proyectos o fechas importantes de manera ordenada y accesible.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Análisis Comparativo:</strong> Facilita la comparación de eventos concurrentes o la identificación de patrones a lo largo del tiempo.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Comunicación Efectiva:</strong> Es una herramienta poderosa para comunicar ideas y conceptos temporales de manera clara y concisa.
                        </li>
                    </ul>
                    <div id="3" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">Aplicaciones Prácticas de las Líneas de Tiempo</h2>
                    <p className="mb-10">Las líneas de tiempo tienen una amplia gama de aplicaciones en diferentes contextos:</p>
                    <ol style={{ listStyleType: 'decimal' }}>
                        <li className="mb-10 ml-5">
                            <strong>Educación:</strong> En el aula, las líneas de tiempo son utilizadas para enseñar historia, ciencias sociales y literatura, ayudando a los estudiantes a contextualizar eventos y entender la secuencia de acontecimientos.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Investigación Histórica:</strong> Los historiadores y arqueólogos utilizan líneas de tiempo para visualizar y analizar períodos históricos, movimientos culturales y evoluciones sociales.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Gestión de Proyectos:</strong> En el ámbito empresarial, las líneas de tiempo son herramientas fundamentales para planificar y supervisar proyectos, identificar hitos importantes y gestionar recursos de manera eficiente.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Planificación Estratégica:</strong> Las organizaciones utilizan líneas de tiempo para trazar la evolución de sus estrategias a lo largo del tiempo, identificar tendencias y anticipar futuros desarrollos.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Seguimiento Personal: </strong> A nivel individual, las líneas de tiempo pueden ser utilizadas para llevar un registro de hitos personales, como viajes, logros académicos o metas profesionales.
                        </li>
                    </ol>
                    <div id="4" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">Herramientas para Crear Líneas de Tiempo</h2>
                    <p className="mb-10">Existen numerosas herramientas disponibles para crear líneas de tiempo de manera rápida y sencilla. Algunas opciones populares incluyen:</p>
                    <ul style={{ listStyleType: 'disc' }}>
                        <li className="mb-10 ml-5">
                            <strong>Software Especializado:</strong> Aplicaciones como <Link href="/" className="text-custom-blue hover:underline">Sketchlie</Link> ofrecen herramientas específicas para crear líneas de tiempo de manera colaborativa y visualmente atractiva.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Herramientas en Línea:</strong> Plataformas como <Link href="https://www.pizarraonline.com/" className="text-custom-blue hover:underline">Pizarra Online</Link> ofrecen funcionalidades para crear y compartir líneas de tiempo de forma remota, permitiendo la colaboración en tiempo real.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Plantillas Descargables:</strong> Muchos sitios web ofrecen plantillas de líneas de tiempo gratuitas que pueden ser personalizadas según las necesidades del usuario, como <Link href="/plantillas/linea-de-tiempo/" className="text-custom-blue hover:underline">plantilla de línea de tiempo</Link>
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Herramientas de Presentación:</strong> Software de presentación como PowerPoint o Google Slides también pueden ser utilizados para crear líneas de tiempo simples y efectivas.
                        </li>
                    </ul>
                    <div id="5" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">Conclusiones</h2>
                    <p className="mb-10">Las líneas de tiempo son herramientas poderosas que permiten visualizar y comprender eventos a lo largo del tiempo de manera clara y concisa. Ya sea en el aula, en el lugar de trabajo o en proyectos personales, su versatilidad las convierte en un recurso invaluable para estudiantes, profesionales y entusiastas por igual.</p>
                    <p className="mb-10">Incorporar líneas de tiempo en nuestra práctica diaria puede mejorar significativamente nuestra capacidad para analizar, planificar y comunicar ideas de manera efectiva. ¡Explora el fascinante mundo de las líneas de tiempo y descubre nuevas formas de visualizar el tiempo!</p>
                </div>
                <div className="lg:w-[30%] xl:ml-10 lg:ml-5 border border-black rounded-lg p-10 bg-[#FFF] lg:sticky lg:z-30 lg:top-24 lg:h-[50%] lg:mb-0 mb-10">
                    <h3 className="text-2xl mb-3">
                        Indice
                    </h3>
                    <ul>
                        <li className="mb-4">
                            <Link href="#1" className="text-custom-blue hover:underline mb-10">¿Qué es una Línea de Tiempo?</Link>
                        </li>
                        <li className="mb-4">
                            <Link href="#2" className="text-custom-blue hover:underline mb-10">Ventajas de Utilizar una Línea de Tiempo</Link>
                        </li>
                        <li className="mb-4">
                            <Link href="#3" className="text-custom-blue hover:underline mb-10">Aplicaciones Prácticas de las Líneas de Tiempo</Link>
                        </li>
                        <li className="mb-4">
                            <Link href="#4" className="text-custom-blue hover:underline mb-10">Herramientas para Crear Líneas de Tiempo</Link>
                        </li>
                        <li className="mb-4">
                            <Link href="#5" className="text-custom-blue hover:underline mb-10">Conclusiones</Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5 md:my-20 my-5">
                <BlogLinks blogTitle="Diagramas de flujo" blogImage="/placeholders/mapa-conceptual.png" blogHref="/diagrama-de-flujo/" blogDescription="Crea diagramas de flujo rápidamente y simplifica tus rutinas con el creador de diagramas de flujo de  con las herramientas de Sketchlie." />
                <BlogLinks blogTitle="Pizarra Online" blogImage="/placeholders/improve-performance.png" blogHref="/pizarra-online/" blogDescription="Sketchlie es una pizarra online rápida, gratuita y fácil de usar pensada para  ayudarte a colaborar con cualquier persona desde cualquier lugar." />
                <BlogLinks blogTitle="Wireframes" blogImage="/placeholders/wireframe.png" blogHref="/wireframe/" blogDescription="Empieza a visualizar tus ideas en minutos con nuestro intuitivo creador de wireframes. Crea esquemas de lo que necesites, desde páginas de inicio hasta formularios y menús, con nuestro creador de wireframes. " />
            </div>
        </div>
    );
}

export default LandingPage;
