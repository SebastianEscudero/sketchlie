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
    title: "Colaboración en Línea: El Espacio de Trabajo Ideal | Sketchlie",
    description: "Descubre cómo Sketchlie proporciona el espacio de trabajo perfecto para la colaboración en línea. Mejora la productividad y creatividad de tu equipo.",
    keywords: ["colaboracion", "espacio de trabajo", "colaboración en línea", "trabajo en equipo", "productividad"],
    alternates: {
        canonical: "https://www.sketchlie.com/blog/colaboracion/",
    }
};

const CollaborationPage = () => {
    return (
        <div className="xl:px-[15%] lg:px-[10%] md:px-[7%] px-[5%]">
            <div className="mt-[3%]">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <Link href="/" title="Home">Home</Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <Link href="/blog/">Blog</Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Colaboración en Línea: El Espacio de Trabajo Ideal</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <div className="md:flex mt-10 items-center justify-between">
                <h1 className="lg:text-6xl md:text-5xl text-4xl md:px-5 md:text-left text-center" style={{ lineHeight: "1.2" }}>
                    Colaboración en Línea: El Espacio de Trabajo Ideal
                </h1>
                <Image
                    src="/placeholders/modelo-canvas.png"
                    alt="Colaboración en línea"
                    width={1920}
                    height={1080}
                    className="rounded-2xl border border-black md:max-w-[60%] md:mt-0 mt-10"
                    loading="eager"
                />
            </div>
            <div className="flex flex-col-reverse lg:flex-row justify-between mt-[3%]">
                <div className="lg:max-w-[70%] text-xl">
                    <p className="mb-10">En el mundo digital actual, la <strong>colaboración en línea</strong> se ha convertido en la piedra angular del éxito empresarial. <Link className="text-custom-blue hover:underline" href="/">Sketchlie</Link> ofrece el <strong>espacio de trabajo ideal</strong> para que los equipos colaboren de manera eficiente, sin importar dónde se encuentren.</p>

                    <div id="1" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">1. La Revolución del Espacio de Trabajo Digital</h2>

                    <p className="mb-10">El concepto de <strong>espacio de trabajo</strong> ha evolucionado drásticamente en los últimos años. Ya no estamos limitados a oficinas físicas; ahora, el mundo digital nos ofrece posibilidades ilimitadas para colaborar y crear.</p>

                    <p className="mb-10">Sketchlie se posiciona a la vanguardia de esta revolución, proporcionando una plataforma versátil donde los equipos pueden reunirse, compartir ideas y trabajar juntos en tiempo real, sin importar su ubicación geográfica.</p>

                    <div id="2" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">2. Colaboración en Línea: Más que una Tendencia, una Necesidad</h2>

                    <p className="mb-10">La <strong>colaboración en línea</strong> ha pasado de ser una simple tendencia a convertirse en una necesidad fundamental para las empresas modernas. Con Sketchlie, los equipos pueden:</p>

                    <ul style={{ listStyleType: 'disc' }}>
                        <li className="mb-5 ml-5">Compartir ideas y conceptos en tiempo real</li>
                        <li className="mb-5 ml-5">Trabajar en proyectos de forma simultánea</li>
                        <li className="mb-5 ml-5">Mantener una comunicación fluida y efectiva</li>
                        <li className="mb-5 ml-5">Acceder a recursos compartidos desde cualquier lugar</li>
                    </ul>

                    <div id="3" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">3. Características Clave de Sketchlie para la Colaboración</h2>

                    <p className="mb-10">Sketchlie ofrece una serie de herramientas diseñadas específicamente para fomentar la colaboración efectiva:</p>

                    <ul style={{ listStyleType: 'disc' }}>
                        <li className="mb-5 ml-5">
                            <strong>Pizarra Digital Compartida:</strong> Un espacio virtual donde todos los miembros del equipo pueden dibujar, escribir y compartir ideas simultáneamente.
                        </li>
                        <li className="mb-5 ml-5">
                            <strong>Chat en Tiempo Real:</strong> Comunicación instantánea para discutir ideas y tomar decisiones rápidamente.
                        </li>
                        <li className="mb-5 ml-5">
                            <strong>Compartir Archivos:</strong> Fácil intercambio de documentos, imágenes y otros recursos directamente en la plataforma.
                        </li>
                        <li className="mb-5 ml-5">
                            <strong>Control de Versiones:</strong> Seguimiento de cambios y la capacidad de revertir a versiones anteriores si es necesario.
                        </li>
                    </ul>

                    <div id="4" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">4. Mejorando la Productividad a través de la Colaboración</h2>

                    <p className="mb-10">La colaboración efectiva no solo mejora la comunicación, sino que también impulsa significativamente la productividad. Con Sketchlie, los equipos pueden:</p>

                    <ul style={{ listStyleType: 'disc' }}>
                        <li className="mb-5 ml-5">Reducir el tiempo dedicado a reuniones innecesarias</li>
                        <li className="mb-5 ml-5">Acelerar los procesos de toma de decisiones</li>
                        <li className="mb-5 ml-5">Fomentar la innovación a través del intercambio de ideas</li>
                        <li className="mb-5 ml-5">Mantener a todos los miembros del equipo alineados con los objetivos del proyecto</li>
                    </ul>

                    <div id="5" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">5. El Futuro del Trabajo: Espacios de Colaboración Virtuales</h2>

                    <p className="mb-10">A medida que avanzamos hacia un futuro cada vez más digital, los <strong>espacios de trabajo virtuales</strong> como Sketchlie se están convirtiendo en la norma. Estos espacios ofrecen:</p>

                    <ul style={{ listStyleType: 'disc' }}>
                        <li className="mb-5 ml-5">Flexibilidad para trabajar desde cualquier lugar</li>
                        <li className="mb-5 ml-5">Reducción de costos asociados con oficinas físicas</li>
                        <li className="mb-5 ml-5">Mayor equilibrio entre trabajo y vida personal para los empleados</li>
                        <li className="mb-5 ml-5">Acceso a un pool de talento global</li>
                    </ul>

                    <div id="6" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">6. Comienza tu Viaje de Colaboración con Sketchlie</h2>

                    <p className="mb-10">Ya sea que estés gestionando un equipo pequeño o una gran organización, Sketchlie ofrece las herramientas necesarias para llevar tu colaboración al siguiente nivel. Descubre cómo nuestro <strong>espacio de trabajo virtual</strong> puede transformar la forma en que tu equipo trabaja junto.</p>

                    <blockquote className="mb-10 italic border-l-4 border-gray-500 pl-4">
                        La colaboración es la clave para desbloquear el potencial creativo de tu equipo. Con Sketchlie, proporcionamos el espacio ideal para que esa colaboración florezca.
                    </blockquote>

                    <p className="mb-10">¿Listo para revolucionar la forma en que tu equipo colabora? <Link className="text-custom-blue hover:underline" href="/">Comienza con Sketchlie hoy</Link> y descubre el poder de la verdadera colaboración en línea.</p>
                </div>
                <div className="lg:w-[30%] xl:ml-10 lg:ml-5 border border-black rounded-lg p-10 bg-white lg:sticky lg:z-30 lg:top-24 lg:h-[50%] lg:mb-0 mb-10">
                    <h3 className="text-2xl mb-3">
                        Índice
                    </h3>
                    <ul>
                        <li className="mb-4">
                            <Link href="#1" className="text-custom-blue hover:underline mb-10">1. La Revolución del Espacio de Trabajo Digital</Link>
                        </li>
                        <li className="mb-4">
                            <Link href="#2" className="text-custom-blue hover:underline mb-10">2. Colaboración en Línea: Una Necesidad</Link>
                        </li>
                        <li className="mb-4">
                            <Link href="#3" className="text-custom-blue hover:underline mb-10">3. Características Clave de Sketchlie</Link>
                        </li>
                        <li className="mb-4">
                            <Link href="#4" className="text-custom-blue hover:underline mb-10">4. Mejorando la Productividad</Link>
                        </li>
                        <li className="mb-4">
                            <Link href="#5" className="text-custom-blue hover:underline mb-10">5. El Futuro del Trabajo</Link>
                        </li>
                        <li className="mb-4">
                            <Link href="#6" className="text-custom-blue hover:underline mb-10">6. Comienza con Sketchlie</Link>
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

export default CollaborationPage;