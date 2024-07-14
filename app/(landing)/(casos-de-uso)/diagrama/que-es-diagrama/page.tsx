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
    title: "¿Qué es un diagrama? Tipos y ejemplos | Sketchlie",
    description: "Descubre qué es un diagrama, sus tipos y cómo crearlos online. Mejora la visualización de ideas con Sketchlie, herramienta gratuita de diagramación.",
    keywords: ["diagrama", "tipos de diagramas", "diagrama online", "herramienta de diagramación"],
    alternates: {
        canonical: "https://www.sketchlie.com/diagrama/que-es-diagrama/",
    },
};

const LandingPage = () => {
    return (
        <div className="xl:mx-[5%] lg:mx-[4%] md:mx-[3%] mx-[3%] text-black">
            <div className="mt-[3%]">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <Link href="/" title="Home">Home</Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <Link href="/diagrama/" title="Diagrama">Diagrama</Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>¿Qué es Diagrama?</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <div className="md:flex mt-10 items-center justify-between">
                <h1 className="lg:text-6xl md:text-5xl text-4xl md:px-5 md:text-left text-center" style={{ lineHeight: "1.2" }}>
                    ¿Qué es un diagrama?
                </h1>
                <Image
                    src="/placeholders/diagrama-de-flujo.png"
                    alt="Diagrama"
                    width={1920}
                    height={1080}
                    className="rounded-2xl border border-black md:max-w-[60%] md:mt-0 mt-10"
                    loading="eager"
                />
            </div>
            <div className="flex flex-col-reverse lg:flex-row justify-between mt-[3%]">
                <div className="lg:max-w-[70%] text-xl">
                    <p className="mb-10">Si estás buscando respuestas sobre <Link className="text-custom-blue hover:underline" href="/diagrama/">diagramas</Link>, estás en el lugar correcto. En Sketchlie, entendemos la importancia de la visualización de datos y conceptos, por eso ofrecemos una variedad de herramientas para ayudarte a crear diagramas de manera rápida y sencilla.</p>

                    <div id="1" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">1. ¿Qué es un diagrama?</h2>

                    <p className="mb-10">Un diagrama es una representación visual de información, datos o procesos. En Sketchlie, puedes crear diversos tipos de diagramas, como diagramas de flujo, mapas conceptuales, mapas mentales y más.</p>

                    <ul style={{ listStyleType: 'disc' }}>
                        <li className="mb-10 ml-5">
                            <strong>Diagrama de flujo:</strong> Un diagrama que muestra la secuencia de pasos de un proceso o sistema. Puedes aprender más sobre cómo crearlos en nuestra página de <Link className="text-custom-blue hover:underline" href="/diagrama-de-flujo/">diagrama de flujo</Link>.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Mapa conceptual:</strong> Una representación visual de ideas y conceptos, mostrando las relaciones entre ellos. Visita nuestra sección de <Link className="text-custom-blue hover:underline" href="/mapa-conceptual/">mapas conceptuales</Link> para obtener más información.
                        </li>
                    </ul>

                    <div id="2" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">2. ¿Cómo crear un diagrama?</h2>

                    <p className="mb-10">Crear un diagrama en Sketchlie es fácil y rápido. Simplemente selecciona la herramienta de diagramación que necesites y comienza a dibujar. Puedes arrastrar y soltar formas, añadir texto y conectar elementos para representar tus ideas de manera clara.</p>

                    <p className="mb-10">Para obtener más detalles sobre cómo comenzar, echa un vistazo a nuestra guía sobre <Link className="text-custom-blue hover:underline" href="/diagrama/">diagramas</Link> en nuestro blog.</p>

                    <div id="3" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">3. ¿Cuál es la utilidad de los diagramas?</h2>

                    <p className="mb-10">Los diagramas son herramientas poderosas para comunicar ideas de manera efectiva. Te permiten visualizar información compleja de manera clara y concisa, lo que facilita la comprensión y el análisis.</p>

                    <blockquote className="border-l-4 border-gray-300 italic pl-4 mb-10">Los diagramas son una excelente manera de organizar ideas, planificar proyectos y comunicar procesos de manera visual y comprensible.</blockquote>

                    <p className="mb-10">Para descubrir más sobre cómo aprovechar al máximo los diagramas, visita nuestra página de <Link className="text-custom-blue hover:underline" href="/diagrama/">diagramas</Link>.</p>

                    <div id="4" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">4. ¿Cuáles son los tipos de diagramas más comunes?</h2>

                    <p className="mb-10">Existen varios tipos de diagramas, cada uno con su propia aplicación y propósito. Algunos de los más comunes incluyen diagramas de flujo, mapas conceptuales, mapas mentales y diagramas de procesos.</p>

                    <ul style={{ listStyleType: 'disc' }}>
                        <li className="mb-10 ml-5">
                            <strong>Diagrama de flujo:</strong> Utilizado para representar la secuencia de pasos en un proceso o sistema.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Mapa mental:</strong> Ideal para organizar ideas y conceptos de manera no lineal.
                        </li>
                    </ul>

                    <p className="mb-10">Para explorar más sobre estos tipos de diagramas, visita nuestras páginas de <Link className="text-custom-blue hover:underline" href="/diagrama-de-flujo/">diagrama de flujo</Link> y <Link className="text-custom-blue hover:underline" href="/mapa-mental-online/">mapa mental</Link>.</p>

                    <div id="5" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">5. ¿Cómo usar un diagrama online?</h2>

                    <p className="mb-10">Usar un diagrama online en Sketchlie es muy intuitivo. Simplemente accede a nuestra plataforma y selecciona la herramienta de diagramación que necesites. Desde allí, puedes comenzar a dibujar, agregar elementos y colaborar en tiempo real con tu equipo.</p>

                    <p className="mb-10">Para obtener más consejos sobre cómo utilizar nuestros diagramas online, consulta nuestro artículo sobre <Link className="text-custom-blue hover:underline" href="/pizarra-online/">pizarras online</Link>.</p>

                    <p className="mb-10">Esperamos que esta guía te haya sido útil para comprender mejor el mundo de los diagramas. Si tienes más preguntas, ¡no dudes en contactarnos!</p>
                    <div id="6" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">6. ¿Cómo colaborar en la creación de diagramas?</h2>

                    <p className="mb-10">La colaboración en la creación de diagramas es una característica clave de Sketchlie. Con nuestra plataforma, puedes invitar a otros usuarios a colaborar en tiempo real en tus diagramas. Esto significa que múltiples personas pueden editar y trabajar en un diagrama simultáneamente, lo que facilita la colaboración y el trabajo en equipo.</p>

                    <p className="mb-10">Para obtener más información sobre cómo colaborar en la creación de diagramas, visita nuestra página de <Link className="text-custom-blue hover:underline" href="/pizarra-online/">pizarra online</Link>.</p>

                    <div id="7" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">7. ¿Cómo compartir y exportar diagramas?</h2>

                    <p className="mb-10">Compartir y exportar tus diagramas en Sketchlie es fácil. Puedes compartir tus diagramas con otras personas simplemente enviándoles el enlace único del proyecto. Además, también puedes exportar tus diagramas en varios formatos, como imagen o PDF, para compartirlos fuera de la plataforma.</p>

                    <p className="mb-10">Para obtener instrucciones detalladas sobre cómo compartir y exportar diagramas, visita nuestra sección de <Link className="text-custom-blue hover:underline" href="/pizarra-online/">pizarra online</Link>.</p>

                    <p className="mb-10">En resumen, los diagramas son una herramienta invaluable para visualizar información y comunicar ideas de manera efectiva. En Sketchlie, ofrecemos una variedad de herramientas para ayudarte a crear, colaborar y compartir diagramas de manera sencilla y eficiente. ¡Explora nuestras opciones y comienza a diagramar hoy mismo!</p>
                    <div id="8" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">8. ¿Cómo utilizar diagramas en proyectos de trabajo?</h2>

                    <p className="mb-10">Los diagramas son herramientas fundamentales en proyectos de trabajo, ya que ayudan a visualizar procesos, identificar problemas y comunicar ideas de manera clara. En Sketchlie, puedes integrar fácilmente tus diagramas en tus proyectos de trabajo y colaborar con tu equipo en tiempo real.</p>

                    <p className="mb-10">Para descubrir cómo utilizar diagramas en proyectos de trabajo de manera efectiva, visita nuestra página de <Link className="text-custom-blue hover:underline" href="/diagrama/">diagramas</Link>.</p>

                    <div id="9" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">9. ¿Qué beneficios ofrecen los diagramas en la educación?</h2>

                    <p className="mb-10">Los diagramas son herramientas valiosas en el ámbito educativo, ya que ayudan a los estudiantes a visualizar conceptos, organizar información y comprender procesos de manera más efectiva. En Sketchlie, ofrecemos herramientas específicas para educadores y estudiantes para facilitar el uso de diagramas en el aula.</p>

                    <p className="mb-10">Para conocer más sobre los beneficios de los diagramas en la educación, visita nuestra página de <Link className="text-custom-blue hover:underline" href="/mapa-mental-online/">mapas mentales online</Link>.</p>

                    <div id="10" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">10. ¿Cómo pueden los diagramas mejorar la productividad?</h2>

                    <p className="mb-10">Los diagramas pueden mejorar significativamente la productividad al proporcionar una manera clara y visual de organizar información, identificar áreas de mejora y comunicar ideas de manera efectiva. En Sketchlie, ofrecemos herramientas intuitivas para ayudarte a utilizar los diagramas para aumentar la productividad en tu trabajo diario.</p>

                    <p className="mb-10">Para descubrir más sobre cómo los diagramas pueden mejorar tu productividad, visita nuestra página de <Link className="text-custom-blue hover:underline" href="/diagrama/">diagramas</Link>.</p>

                    <p className="mb-10">Esperamos que estas respuestas hayan sido útiles y te hayan brindado una mejor comprensión sobre el mundo de los diagramas. Recuerda que en Sketchlie estamos aquí para ayudarte en cada paso del camino. ¡Empieza a crear tus propios diagramas hoy mismo!</p>

                </div>
                <div className="lg:w-[30%] xl:ml-10 lg:ml-5 border border-black rounded-lg p-10 bg-white lg:sticky lg:z-30 lg:top-24 lg:h-[50%] lg:mb-0 mb-10">
                    <h3 className="text-2xl mb-3">
                        Indice
                    </h3>
                    <ul style={{ listStyleType: 'none' }}>
                        <li className="mb-4">
                            <Link href="#1" className="text-custom-blue hover:underline mb-10">1. ¿Qué es un diagrama?</Link>
                        </li>
                        <li className="mb-4">
                            <Link href="#2" className="text-custom-blue hover:underline mb-10">2. ¿Cómo crear un diagrama?</Link>
                        </li>
                        <li className="mb-4">
                            <Link href="#3" className="text-custom-blue hover:underline mb-10">3. ¿Cuál es la utilidad de los diagramas?</Link>
                        </li>
                        <li className="mb-4">
                            <Link href="#4" className="text-custom-blue hover:underline mb-10">4. ¿Cuáles son los tipos de diagramas más comunes?</Link>
                        </li>
                        <li className="mb-4">
                            <Link href="#5" className="text-custom-blue hover:underline mb-10">5. ¿Cómo usar un diagrama online?</Link>
                        </li>
                        <li className="mb-4">
                            <Link href="#6" className="text-custom-blue hover:underline mb-10">6. ¿Cómo colaborar en la creación de diagramas?</Link>
                        </li>
                        <li className="mb-4">
                            <Link href="#7" className="text-custom-blue hover:underline mb-10">7. ¿Cómo compartir y exportar diagramas?</Link>
                        </li>
                        <li className="mb-4">
                            <Link href="#8" className="text-custom-blue hover:underline mb-10">8. ¿Cómo utilizar diagramas en proyectos de trabajo?</Link>
                        </li>
                        <li className="mb-4">
                            <Link href="#9" className="text-custom-blue hover:underline mb-10">9. ¿Qué beneficios ofrecen los diagramas en la educación?</Link>
                        </li>
                        <li className="mb-4">
                            <Link href="#10" className="text-custom-blue hover:underline mb-10">10. ¿Cómo pueden los diagramas mejorar la productividad?</Link>
                        </li>
                    </ul>

                </div>
            </div>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5 md:my-20 my-5">
                <BlogLinks blogTitle="Mapa Conceptual Online" blogImage="/placeholders/mapa-conceptual-online.png" blogHref="/mapa-conceptual/" blogDescription="Descubre cómo desatar tu creatividad y potenciar la colaboración en tiempo real con Sketchlie." />
                <BlogLinks blogTitle="Mapa de Procesos" blogImage="/placeholders/mapa-de-procesos.png" blogHref="/mapas-de-procesos" blogDescription="El mapa de procesos ayuda a los equipos a mapear y implementar mejoras. Registrate hoy con una 3 espacios de trabajo gratuitos para empezar a utilizar la mejor herramienta de mapa de procesos." />
                <BlogLinks blogTitle="Mapas Mentales" blogImage="/placeholders/mapa-mental.png" blogHref="/mapa-mental-online/" blogDescription="Explora nuestras herramientas para simplificar la creación de mapas mentales. Organiza tus ideas de manera jerárquica y potencia tu creatividad con nuestro intuitivo creador de mapas mentales." />
            </div>
        </div>
    );
}

export default LandingPage;
