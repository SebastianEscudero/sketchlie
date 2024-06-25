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
    title: "¿Qué es un Diagrama de Venn? Definición, Usos y Ejemplos | Sketchlie",
    description: "Descubre qué es un Diagrama de Venn, sus usos, ejemplos y cómo crearlo. Aprende a representar relaciones entre conjuntos de manera visual y efectiva con Sketchlie.",
    keywords: ["diagrama de venn", "conjuntos", "lógica", "matemáticas", "visualización de datos"],
    alternates: {
        canonical: "https://www.sketchlie.com/diagrama-de-venn/que-es-diagrama-de-venn/",
    }
};

const LandingPage = () => {
    return (
        <div className="xl:mx-[5%] lg:mx-[4%] md:mx-[3%] mx-[3%]">
            <div className="mt-[3%]">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <Link href="/" title="Home">Home</Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <Link href="/diagrama-de-venn/" title="Diagrama de Venn">Diagrama de Venn</Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>¿Qué es un Diagrama de Venn?</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <div className="md:flex mt-10 items-center justify-between">
                <h1 className="lg:text-6xl md:text-5xl text-4xl md:px-5 md:text-left text-center" style={{ lineHeight: "1.2" }}>
                    ¿Qué es un Diagrama de Venn?
                </h1>
                <Image
                    src="/placeholders/diagrama-de-venn.png"
                    alt="Diagrama de Venn"
                    width={1920}
                    height={1080}
                    className="rounded-2xl border border-black md:max-w-[60%] md:mt-0 mt-10"
                />
            </div>
            <div className="flex flex-col-reverse lg:flex-row justify-between mt-[3%]">
            <div className="lg:max-w-[70%] text-xl">
                    <div id="1" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">¿Qué es un Diagrama de Venn?</h2>
                    <p className="mb-10">Un <Link href="/diagrama-de-venn/" className="text-custom-blue hover:underline">Diagrama de Venn</Link> es una representación gráfica que muestra las relaciones entre diferentes conjuntos de elementos. Desarrollado por John Venn en 1880, estos diagramas utilizan círculos superpuestos para ilustrar similitudes, diferencias y relaciones entre categorías o grupos. Su simplicidad y efectividad los han convertido en una herramienta esencial en diversos campos.</p>
                    
                    <div id="2" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">Usos y Aplicaciones de los Diagramas de Venn</h2>
                    <p className="mb-10">Los <Link href="/diagrama-de-venn/" className="text-custom-blue hover:underline">Diagramas de Venn</Link> tienen aplicaciones en múltiples campos. En matemáticas, se usan para visualizar operaciones de conjuntos. En lógica, representan proposiciones y argumentos. En estadística, muestran distribuciones de datos y probabilidades. En los negocios, son útiles para analizar mercados y segmentar clientes. En educación, son una herramienta valiosa para comparar y contrastar conceptos.</p>

                    <div id="3" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">Cómo Crear un Diagrama de Venn Efectivo</h2>
                    <p className="mb-10">Para crear un <Link href="/diagrama-de-venn/" className="text-custom-blue hover:underline">Diagrama de Venn</Link> efectivo, comienza identificando los conjuntos a comparar. Dibuja círculos que se superpongan adecuadamente y etiqueta cada uno claramente. Coloca los elementos en las secciones correspondientes y añade una leyenda si es necesario. En <Link href="/plantillas/diagrama-de-venn/" className="text-custom-blue hover:underline">Sketchlie</Link>, ofrecemos herramientas intuitivas y plantillas prediseñadas para facilitar este proceso.</p>

                    <div id="4" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">Ejemplos de Diagramas de Venn</h2>
                    <p className="mb-10">Los Diagramas de Venn se utilizan en diversos contextos. Algunos ejemplos incluyen: comparación de características de especies animales, análisis de segmentos de mercado para un producto, visualización de la relación entre géneros literarios, y representación de la composición nutricional de alimentos.</p>

                    <div id="5" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">Ventajas de Usar Diagramas de Venn</h2>
                    <p className="mb-10">Las ventajas de usar Diagramas de Venn incluyen: simplificación de conceptos complejos, mejora de la comprensión visual de relaciones, facilitación de la identificación de similitudes y diferencias, eficacia en la resolución de problemas y toma de decisiones, y fomento del pensamiento crítico y analítico.</p>

                    <div id="6" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">Tipos de Diagramas de Venn</h2>
                    <p className="mb-10">Los <Link href="/diagrama-de-venn/" className="text-custom-blue hover:underline">Diagramas de Venn</Link> se presentan en varios tipos:</p>
                    <ul style={{ listStyleType: 'disc' }}>
                        <li className="mb-5 ml-5"><strong>Diagrama de dos conjuntos:</strong> El más básico, con dos círculos superpuestos.</li>
                        <li className="mb-5 ml-5"><strong>Diagrama de tres conjuntos:</strong> Utiliza tres círculos para relaciones más complejas.</li>
                        <li className="mb-5 ml-5"><strong>Diagramas de cuatro o más conjuntos:</strong> Para representar múltiples categorías.</li>
                        <li className="mb-5 ml-5"><strong>Diagramas con formas no circulares:</strong> Usan otras formas geométricas para necesidades específicas.</li>
                    </ul>
                    <p className="mb-10">En <Link href="/plantillas/diagrama-de-venn/" className="text-custom-blue hover:underline">Sketchlie</Link>, ofrecemos plantillas para todos estos tipos, adaptándose a tus necesidades específicas.</p>

                    <div id="7" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">Diagramas de Venn en Educación</h2>
                    <p className="mb-10">En educación, los <Link href="/diagrama-de-venn/" className="text-custom-blue hover:underline">Diagramas de Venn</Link> son una herramienta pedagógica poderosa:</p>
                    <ul style={{ listStyleType: 'disc' }}>
                        <li className="mb-5 ml-5"><strong>Desarrollo de pensamiento crítico:</strong> Fomentan la comparación y el análisis.</li>
                        <li className="mb-5 ml-5"><strong>Enseñanza de teoría de conjuntos:</strong> Visualizan operaciones matemáticas.</li>
                        <li className="mb-5 ml-5"><strong>Análisis literario:</strong> Comparan obras, personajes o estilos.</li>
                        <li className="mb-5 ml-5"><strong>Ciencias naturales:</strong> Clasifican organismos y comparan ecosistemas.</li>
                    </ul>
                    <p className="mb-10"><Link href="/plantillas/diagrama-de-venn/" className="text-custom-blue hover:underline">Sketchlie</Link> ofrece plantillas educativas específicas para diversos propósitos pedagógicos.</p>

                    <div id="8" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">Usos de los Diagramas de Venn en Negocios</h2>
                    <p className="mb-10">En el ámbito empresarial, los <Link href="/diagrama-de-venn/" className="text-custom-blue hover:underline">Diagramas de Venn</Link> son una herramienta estratégica invaluable:</p>
                    <ul style={{ listStyleType: 'disc' }}>
                        <li className="mb-5 ml-5"><strong>Análisis de mercado:</strong> Visualizan segmentos de mercado y grupos de clientes.</li>
                        <li className="mb-5 ml-5"><strong>Desarrollo de productos:</strong> Identifican características de productos o líneas.</li>
                        <li className="mb-5 ml-5"><strong>Análisis FODA:</strong> Representan fortalezas, oportunidades, debilidades y amenazas.</li>
                        <li className="mb-5 ml-5"><strong>Gestión de recursos humanos:</strong> Comparan habilidades y roles en equipos.</li>
                    </ul>
                    <p className="mb-10">Por ejemplo, una empresa tecnológica podría usar un Diagrama de Venn para visualizar la superposición de habilidades entre equipos de desarrollo.</p>

                    <div id="9" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">Diagramas de Venn en la Era Digital</h2>
                    <p className="mb-10">La era digital ha transformado los <Link href="/diagrama-de-venn/" className="text-custom-blue hover:underline">Diagramas de Venn</Link>. Las herramientas digitales permiten crear visualizaciones interactivas y dinámicas, facilitando el análisis de datos y la colaboración en tiempo real. En educación, los diagramas digitales fomentan un aprendizaje más interactivo. En los negocios, se integran con herramientas de análisis de datos para tomar decisiones informadas.</p>

                    <p className="mb-10">En <Link href="/plantillas/diagrama-de-venn/" className="text-custom-blue hover:underline">Sketchlie</Link>, estamos a la vanguardia de esta evolución, ofreciendo una plataforma que facilita la creación de diagramas visualmente atractivos y permite una colaboración fluida, adaptándose a las necesidades de la era digital en diversos campos.</p>
                </div>
                <div className="lg:w-[30%] xl:ml-10 lg:ml-5 border border-black rounded-lg p-10 bg-[#FFF] lg:sticky lg:z-30 lg:top-24 lg:h-[50%] lg:mb-0 mb-10">
                <h3 className="text-2xl mb-3">
                        Índice
                    </h3>
                    <ul>
                        <li className="mb-4">
                            <Link href="#1" className="text-custom-blue hover:underline mb-10">¿Qué es un Diagrama de Venn?</Link>
                        </li>
                        <li className="mb-4">
                            <Link href="#2" className="text-custom-blue hover:underline mb-10">Usos y Aplicaciones</Link>
                        </li>
                        <li className="mb-4">
                            <Link href="#3" className="text-custom-blue hover:underline mb-10">Cómo Crear un Diagrama de Venn</Link>
                        </li>
                        <li className="mb-4">
                            <Link href="#4" className="text-custom-blue hover:underline mb-10">Ejemplos de Diagramas de Venn</Link>
                        </li>
                        <li className="mb-4">
                            <Link href="#5" className="text-custom-blue hover:underline mb-10">Ventajas de Usar Diagramas de Venn</Link>
                        </li>
                        <li className="mb-4">
                            <Link href="#6" className="text-custom-blue hover:underline mb-10">Tipos de Diagramas de Venn</Link>
                        </li>
                        <li className="mb-4">
                            <Link href="#7" className="text-custom-blue hover:underline mb-10">Diagramas de Venn en Educación</Link>
                        </li>
                        <li className="mb-4">
                            <Link href="#8" className="text-custom-blue hover:underline mb-10">Usos en Negocios</Link>
                        </li>
                        <li className="mb-4">
                            <Link href="#9" className="text-custom-blue hover:underline mb-10">Diagramas de Venn en la Era Digital</Link>
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