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
    title: "¿Qué es un modelo canvas? Qué es y como hacerlo | Sketchlie",
    description: "Descubre cómo el Modelo Canvas puede transformar tu estrategia empresarial. Aprende a crear, implementar y optimizar tu modelo de negocio con Sketchlie.",
    keywords: ["modelo canvas", "business model canvas", "estrategia empresarial"],
    alternates: {
        canonical: "https://www.sketchlie.com//modelo-canvas/",
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
                            <Link href="/modelo-canvas/" title="Modelo canvas">Modelo canvas</Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>¿Qué es un modelo canvas?</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <div className="md:flex mt-10 items-center justify-between">
                <h1 className="lg:text-6xl md:text-5xl text-4xl md:px-5 md:text-left text-center" style={{ lineHeight: "1.2" }}>
                    Modelo Canvas
                </h1>
                <Image
                    src="/placeholders/modelo-canvas.png"
                    alt="Modelo Canvas"
                    width={1920}
                    height={1080}
                    className="rounded-2xl border border-black md:max-w-[60%] md:mt-0 mt-10"
                />
            </div>
            <div className="flex flex-col-reverse lg:flex-row justify-between mt-[3%]">
                <div className="lg:max-w-[70%] text-xl">
                    <div id="1" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">¿Qué es el Modelo Canvas?</h2>

                    <p className="mb-10">El <Link className="text-custom-blue hover:underline" href="/modelo-canvas/">modelo canvas</Link>, también conocido como Business Model Canvas, es una herramienta estratégica de gestión empresarial que permite describir, diseñar, desafiar, inventar y pivotar tu modelo de negocio de manera visual y sencilla. En <Link className="text-custom-blue hover:underline" href="/">Sketchlie</Link>, entendemos la importancia de esta herramienta para el éxito de tu negocio.</p>

                    <p className="mb-10">Creado por Alexander Osterwalder, el Modelo Canvas se ha convertido en una herramienta esencial para emprendedores y empresas establecidas que buscan innovar y optimizar sus modelos de negocio.</p>

                    <div id="2" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">Los 9 bloques del Modelo Canvas</h2>

                    <p className="mb-10">El Modelo Canvas se compone de 9 bloques fundamentales que representan las áreas clave de un negocio:</p>

                    <ul style={{ listStyleType: 'disc' }}>
                        <li className="mb-5 ml-5">
                            <strong>Segmentos de clientes:</strong> Define a quién va dirigido tu producto o servicio.
                        </li>
                        <li className="mb-5 ml-5">
                            <strong>Propuesta de valor:</strong> Describe qué ofreces para resolver los problemas o satisfacer las necesidades de tus clientes.
                        </li>
                        <li className="mb-5 ml-5">
                            <strong>Canales:</strong> Determina cómo entregarás tu propuesta de valor a tus clientes.
                        </li>
                        <li className="mb-5 ml-5">
                            <strong>Relación con clientes:</strong> Establece cómo interactúas con tus clientes.
                        </li>
                        <li className="mb-5 ml-5">
                            <strong>Fuentes de ingresos:</strong> Define cómo y por qué tus clientes pagarán por tu propuesta de valor.
                        </li>
                        <li className="mb-5 ml-5">
                            <strong>Recursos clave:</strong> Identifica los activos más importantes para que tu modelo de negocio funcione.
                        </li>
                        <li className="mb-5 ml-5">
                            <strong>Actividades clave:</strong> Describe las acciones más importantes que debe realizar tu empresa.
                        </li>
                        <li className="mb-5 ml-5">
                            <strong>Socios clave:</strong> Define quiénes son tus aliados estratégicos.
                        </li>
                        <li className="mb-5 ml-5">
                            <strong>Estructura de costes:</strong> Describe todos los costes en los que incurre tu empresa.
                        </li>
                    </ul>

                    <div id="3" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">Beneficios de utilizar el Modelo Canvas</h2>

                    <p className="mb-10">Implementar el Modelo Canvas en tu estrategia empresarial puede aportar numerosos beneficios:</p>

                    <ul style={{ listStyleType: 'disc' }}>
                        <li className="mb-5 ml-5">
                            <strong>Visión holística:</strong> Proporciona una visión completa de tu negocio en una sola página.
                        </li>
                        <li className="mb-5 ml-5">
                            <strong>Flexibilidad:</strong> Permite realizar cambios rápidos y visualizar su impacto en todo el modelo.
                        </li>
                        <li className="mb-5 ml-5">
                            <strong>Colaboración:</strong> Facilita la comunicación y el trabajo en equipo al presentar ideas de forma visual.
                        </li>
                        <li className="mb-5 ml-5">
                            <strong>Innovación:</strong> Fomenta la generación de nuevas ideas y la identificación de oportunidades.
                        </li>
                    </ul>

                    <p className="mb-10">En <Link className="text-custom-blue hover:underline" href="/">Sketchlie</Link>, ofrecemos herramientas intuitivas para crear y colaborar en tu Modelo Canvas, maximizando estos beneficios para tu negocio.</p>

                    <div id="4" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">Cómo crear tu Modelo Canvas con Sketchlie</h2>

                    <p className="mb-10">Crear tu Modelo Canvas en <Link className="text-custom-blue hover:underline" href="/">Sketchlie</Link> es sencillo y efectivo:</p>

                    <ol style={{ listStyleType: 'decimal' }}>
                        <li className="mb-5 ml-5">
                            <strong>Selecciona la plantilla:</strong> Elige nuestra plantilla prediseñada de Modelo Canvas.
                        </li>
                        <li className="mb-5 ml-5">
                            <strong>Completa los bloques:</strong> Utiliza nuestras herramientas de edición para llenar cada sección con la información relevante de tu negocio.
                        </li>
                        <li className="mb-5 ml-5">
                            <strong>Colabora en tiempo real:</strong> Invita a tu equipo a contribuir y refinar el modelo juntos.
                        </li>
                        <li className="mb-5 ml-5">
                            <strong>Itera y mejora:</strong> Aprovecha la flexibilidad de nuestra plataforma para actualizar y perfeccionar tu modelo continuamente.
                        </li>
                    </ol>

                    <div id="5" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">Consejos para optimizar tu Modelo Canvas</h2>

                    <p className="mb-10">Para sacar el máximo provecho de tu Modelo Canvas, considera estos consejos:</p>

                    <ul style={{ listStyleType: 'disc' }}>
                        <li className="mb-5 ml-5">
                            <strong>Sé conciso:</strong> Utiliza frases cortas y palabras clave para mantener la claridad.
                        </li>
                        <li className="mb-5 ml-5">
                            <strong>Prioriza:</strong> Enfócate en los elementos más críticos para tu negocio en cada bloque.
                        </li>
                        <li className="mb-5 ml-5">
                            <strong>Actualiza regularmente:</strong> Revisa y actualiza tu modelo periódicamente para reflejar los cambios en tu negocio y el mercado.
                        </li>
                        <li className="mb-5 ml-5">
                            <strong>Utiliza el color:</strong> Aprovecha las opciones de personalización de Sketchlie para destacar conexiones y prioridades.
                        </li>
                    </ul>

                    <p className="mb-10">Con <Link className="text-custom-blue hover:underline" href="/">Sketchlie</Link>, tienes todas las herramientas necesarias para crear, optimizar y compartir tu Modelo Canvas de manera eficiente.</p>

                    <div id="6" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">Conclusión</h2>

                    <p className="mb-10">El Modelo Canvas es una herramienta poderosa para visualizar, analizar y mejorar tu modelo de negocio. Al utilizar <Link className="text-custom-blue hover:underline" href="/">Sketchlie</Link> para crear y gestionar tu Modelo Canvas, estás dando un paso importante hacia la optimización de tu estrategia empresarial y el éxito de tu negocio.</p>

                    <p className="mb-10">Comienza hoy mismo a explorar las posibilidades del Modelo Canvas con Sketchlie y descubre cómo puede transformar tu enfoque empresarial.</p>

                </div>
                <div className="lg:w-[30%] xl:ml-10 lg:ml-5 border border-black rounded-lg p-10 bg-[#FFF] lg:sticky lg:z-30 lg:top-24 lg:h-[50%] lg:mb-0 mb-10">
                    <h3 className="text-2xl mb-3">
                        Índice
                    </h3>
                    <ul>
                        <li className="mb-4">
                            <Link href="#1" className="text-custom-blue hover:underline mb-10">¿Qué es el Modelo Canvas?</Link>
                        </li>
                        <li className="mb-4">
                            <Link href="#2" className="text-custom-blue hover:underline mb-10">Los 9 bloques del Modelo Canvas</Link>
                        </li>
                        <li className="mb-4">
                            <Link href="#3" className="text-custom-blue hover:underline mb-10">Beneficios de utilizar el Modelo Canvas</Link>
                        </li>
                        <li className="mb-4">
                            <Link href="#4" className="text-custom-blue hover:underline mb-10">Cómo crear tu Modelo Canvas con Sketchlie</Link>
                        </li>
                        <li className="mb-4">
                            <Link href="#5" className="text-custom-blue hover:underline mb-10">Consejos para optimizar tu Modelo Canvas</Link>
                        </li>
                        <li className="mb-4">
                            <Link href="#6" className="text-custom-blue hover:underline mb-10">Conclusión</Link>
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