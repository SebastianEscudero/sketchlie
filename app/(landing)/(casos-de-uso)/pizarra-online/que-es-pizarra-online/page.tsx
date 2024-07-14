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
    title: "¿Qué es un Pizarra Online? Tipos y Ejemplos | Sketchlie",
    description: "Descubre cómo la Pizarra Online puede mejorar la colaboración y la creatividad de tu equipo. Aprende sobre las técnicas, beneficios y tipos de pizarras online con Sketchlie.",
    keywords: ["Pizarra Online", "colaboración online", "Pizarra Virtual"],
    alternates: {
        canonical: "https://www.sketchlie.com/pizarra-online/que-es-pizarra-online/",
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
                            <Link href="/pizarra-online/" title="Pizarra Online">Pizarra Online</Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>¿Qué es una Pizarra Online?</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <div className="md:flex mt-10 items-center justify-between">
                <h1 className="lg:text-6xl md:text-5xl text-4xl md:px-5 md:text-left text-center" style={{ lineHeight: "1.2" }}>
                    Pizarra online
                </h1>
                <Image
                    src="/placeholders/pizarra-online.png"
                    alt="Pizarra Online"
                    width={1920}
                    height={1080}
                    className="rounded-2xl border border-black md:max-w-[60%] md:mt-0 mt-10"
                />
            </div>
            <div className="flex flex-col-reverse lg:flex-row justify-between mt-[3%]">
                <div className="lg:max-w-[70%] text-xl">
                    <div id="introduccion" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-5">Introducción a la Pizarra Online</h2>
                    <p className="mb-5">Una <strong>pizarra online</strong> es una herramienta digital revolucionaria que permite a equipos y individuos colaborar en tiempo real, sin importar su ubicación física. En Sketchlie, hemos desarrollado una plataforma intuitiva que transforma la manera en que trabajamos juntos, facilitando la generación de ideas, la planificación de proyectos y la enseñanza remota.</p>
                    <p className="mb-10">En esta guía completa, exploraremos en detalle qué es una pizarra online, cómo puede beneficiar a tu equipo y las mejores prácticas para aprovechar al máximo esta poderosa herramienta de colaboración.</p>
                    
                    <div id="definicion" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-5">¿Qué es exactamente una Pizarra Online?</h2>
                    <p className="mb-5">Una pizarra online, también conocida como pizarra virtual o whiteboard digital, es un espacio de trabajo colaborativo en la nube que simula una pizarra física tradicional, pero con capacidades infinitamente superiores. Permite a los usuarios dibujar, escribir, añadir imágenes, y organizar ideas de forma visual, todo en un entorno digital compartido.</p>
                    <h3 className="text-3xl mb-3">Características principales de una pizarra online:</h3>
                    <ul style={{ listStyleType: 'disc' }}>
                        <li className="mb-3 ml-5">Colaboración en tiempo real entre múltiples usuarios</li>
                        <li className="mb-3 ml-5">Espacio de trabajo infinito y escalable</li>
                        <li className="mb-3 ml-5">Herramientas de dibujo y texto avanzadas</li>
                        <li className="mb-3 ml-5">Integración de multimedia (imágenes, videos, documentos)</li>
                        <li className="mb-3 ml-5">Guardado automático y acceso desde cualquier dispositivo</li>
                        <li className="mb-3 ml-5">Plantillas prediseñadas para diferentes tipos de proyectos</li>
                    </ul>
                    
                    <div id="como-usar" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-5">Cómo Utilizar una Pizarra Online</h2>
                    <p className="mb-5">Utilizar una pizarra online es intuitivo y accesible para cualquier persona con conexión a internet. Sigue estos pasos para comenzar:</p>
                    <ol className="list-decimal ml-5 mb-5">
                        <li className="mb-3"><strong>Accede a la plataforma:</strong> Visita <Link className="text-custom-blue hover:underline" href="/">Sketchlie.com</Link> y crea una cuenta gratuita.</li>
                        <li className="mb-3"><strong>Crea una nueva pizarra:</strong> Haz clic en Nueva Pizarra y elige una plantilla o comienza desde cero.</li>
                        <li className="mb-3"><strong>Invita colaboradores:</strong> Comparte el enlace de tu pizarra con tu equipo para colaboración en tiempo real.</li>
                        <li className="mb-3"><strong>Explora las herramientas:</strong> Familiarízate con las opciones de dibujo, texto, formas y multimedia.</li>
                        <li className="mb-3"><strong>Comienza a colaborar:</strong> Trabaja en tus ideas, comparte pensamientos y crea juntos en tiempo real.</li>
                    </ol>
                    
                    <div id="beneficios" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-5">Beneficios de Usar una Pizarra Online</h2>
                    <p className="mb-5">Las pizarras online ofrecen numerosas ventajas para equipos y organizaciones:</p>
                    <ul style={{ listStyleType: 'disc' }}>
                        <li className="mb-3 ml-5"><strong>Colaboración sin fronteras:</strong> Trabaja con equipos distribuidos globalmente en tiempo real.</li>
                        <li className="mb-3 ml-5"><strong>Mejora la comunicación visual:</strong> Expresa ideas complejas de forma clara y concisa.</li>
                        <li className="mb-3 ml-5"><strong>Aumenta la productividad:</strong> Centraliza la información y reduce el tiempo de reuniones.</li>
                        <li className="mb-3 ml-5"><strong>Fomenta la creatividad:</strong> Proporciona un espacio flexible para la lluvia de ideas y la innovación.</li>
                        <li className="mb-3 ml-5"><strong>Facilita el aprendizaje remoto:</strong> Ideal para educación a distancia y formación corporativa.</li>
                    </ul>
                    
                    <div id="mejores-practicas" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-5">Mejores Prácticas para Usar Pizarras Online</h2>
                    <p className="mb-5">Maximiza el potencial de tu pizarra online con estos consejos:</p>
                    <ol className="list-decimal ml-5 mb-5">
                        <li className="mb-3"><strong>Establece reglas claras:</strong> Define pautas para la colaboración y el uso de la pizarra.</li>
                        <li className="mb-3"><strong>Usa plantillas:</strong> Aprovecha las plantillas prediseñadas para ahorrar tiempo y mantener la consistencia.</li>
                        <li className="mb-3"><strong>Organiza el contenido:</strong> Utiliza colores, etiquetas y agrupaciones para estructurar la información.</li>
                        <li className="mb-3"><strong>Fomenta la participación:</strong> Anima a todos los miembros del equipo a contribuir activamente.</li>
                        <li className="mb-3"><strong>Guarda y comparte:</strong> Haz copias de seguridad regulares y comparte los resultados con los stakeholders.</li>
                    </ol>
                    
                    <div id="casos-de-uso" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-5">Casos de Uso de Pizarras Online</h2>
                    <p className="mb-5">Las pizarras online son versátiles y se adaptan a diversas situaciones:</p>
                    <ul style={{ listStyleType: 'disc' }}>
                        <li className="mb-3 ml-5"><strong>Reuniones virtuales:</strong> Facilita la toma de notas y la visualización de ideas en tiempo real.</li>
                        <li className="mb-3 ml-5"><strong>Planificación de proyectos:</strong> Crea mapas mentales, diagramas de Gantt y tableros Kanban.</li>
                        <li className="mb-3 ml-5"><strong>Diseño UX/UI:</strong> Elabora wireframes y prototipos colaborativos.</li>
                        <li className="mb-3 ml-5"><strong>Educación online:</strong> Imparte clases interactivas y crea materiales didácticos visuales.</li>
                        <li className="mb-3 ml-5"><strong>Brainstorming:</strong> Realiza sesiones de lluvia de ideas dinámicas y creativas.</li>
                    </ul>
                    
                    <div id="conclusion" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-5">Conclusión: El Futuro de la Colaboración</h2>
                    <p className="mb-5">Las pizarras online han revolucionado la forma en que los equipos colaboran, comunican ideas y gestionan proyectos. En Sketchlie, estamos comprometidos a proporcionar una plataforma intuitiva y potente que permita a los usuarios desbloquear todo su potencial creativo y colaborativo.</p>
                    <p className="mb-10">Ya sea que estés gestionando un equipo remoto, impartiendo clases online o planificando el próximo gran proyecto de tu empresa, una pizarra online es una herramienta indispensable en el toolkit de cualquier profesional moderno.</p>
                    <p className="mb-5">¿Listo para llevar tu colaboración al siguiente nivel? <Link className="text-custom-blue hover:underline" href="/dashboard/">Regístrate gratis en Sketchlie</Link> y comienza a experimentar el poder de las pizarras online hoy mismo.</p>
                </div>
                <div className="lg:w-[30%] xl:ml-10 lg:ml-5 border border-black rounded-lg p-10 bg-white dark:bg-[#020817] lg:sticky lg:z-30 lg:top-24 lg:h-[50%] lg:mb-0 mb-10">
                    <h3 className="text-2xl mb-3">
                        Índice
                    </h3>
                    <ul>
                        <li className="mb-4">
                            <Link href="#introduccion" className="text-custom-blue hover:underline">Introducción a la Pizarra Online</Link>
                        </li>
                        <li className="mb-4">
                            <Link href="#definicion" className="text-custom-blue hover:underline">¿Qué es exactamente una Pizarra Online?</Link>
                        </li>
                        <li className="mb-4">
                            <Link href="#como-usar" className="text-custom-blue hover:underline">Cómo Utilizar una Pizarra Online</Link>
                        </li>
                        <li className="mb-4">
                            <Link href="#beneficios" className="text-custom-blue hover:underline">Beneficios de Usar una Pizarra Online</Link>
                        </li>
                        <li className="mb-4">
                            <Link href="#mejores-practicas" className="text-custom-blue hover:underline">Mejores Prácticas para Usar Pizarras Online</Link>
                        </li>
                        <li className="mb-4">
                            <Link href="#casos-de-uso" className="text-custom-blue hover:underline">Casos de Uso de Pizarras Online</Link>
                        </li>
                        <li className="mb-4">
                            <Link href="#conclusion" className="text-custom-blue hover:underline">Conclusión: El Futuro de la Colaboración</Link>
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
