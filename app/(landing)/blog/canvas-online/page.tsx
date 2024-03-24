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
    title: "La Herramienta Perfecta para Diseñar Online | Sketchlie",
    description: "Descubre cómo usar Sketchlie, una pizarra online para diseñar y colaborar en tiempo real. Diseña mapas conceptuales, diagramas de flujo y más.",
    keywords: ["canvas online", "diseñar online", "pizarra online", "colaboración online"],
    alternates: {
        canonical: "https://www.sketchlie.com/blog/canvas-online",
    }
};

const LandingPage = () => {
    return (
        <div className="xl:mx-[10%] lg:mx-[7%] md:mx-[5%] mx-[3%]">
            <div className="mt-20">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <Link href="/">Home</Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <Link href="/blog">Blog</Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>La Herramienta Perfecta para Diseñar Online</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <h1 className="xl:text-6xl lg:text-5xl md:text-4xl text-3xl mt-20 lg:pr-20" style={{ lineHeight: "1.2" }}>
                La Herramienta Perfecta para Diseñar Online
            </h1>
            <Image
                src="/placeholders/improve-performance.png"
                alt="Mapa conceptual"
                width={1920}
                height={1080}
                className="rounded-2xl border border-black mt-20"
            />
            <div className="flex flex-col-reverse lg:flex-row justify-between mt-20">
                <div className="lg:max-w-[70%] text-xl">
                    <p className="mb-10">¿Estás buscando una forma eficiente de llevar tus ideas al mundo digital? ¡No busques más! Con <Link className="text-custom-blue hover:underline" href="/">Sketchlie</Link>, puedes diseñar online de manera colaborativa, permitiendo que tu equipo colabore y cree juntos desde cualquier lugar del mundo.</p>

                    <div id="1" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">1. Canvas Online: La Revolución del Diseño Colaborativo</h2>

                    <p className="mb-10">En el mundo digital actual, la colaboración es clave. Los equipos necesitan herramientas que les permitan trabajar juntos de manera eficiente, sin importar la distancia física que los separe. Es aquí donde entra en juego el concepto de <strong>canvas online</strong>.</p>

                    <p className="mb-10">Un <strong>canvas online</strong> es esencialmente una pizarra en línea donde los usuarios pueden dibujar, escribir, agregar imágenes y colaborar en tiempo real. Es una herramienta poderosa para la lluvia de ideas, la planificación de proyectos, el diseño de productos y mucho más.</p>

                    <p className="mb-10">Con <Link className="text-custom-blue hover:underline" href="/">Sketchlie</Link>, puedes acceder a un lienzo digital ilimitado donde puedes dar rienda suelta a tu creatividad y trabajar con tu equipo en proyectos conjuntos. Ya sea que estés creando un nuevo diseño, planificando una estrategia de marketing o simplemente compartiendo ideas, Sketchlie te proporciona las herramientas necesarias para hacerlo de manera efectiva.</p>

                    <div id="2" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">2. Diseñar Online: Más que una Tendencia, una Necesidad</h2>

                    <p className="mb-10">En un mundo cada vez más conectado, la capacidad de colaborar online se ha vuelto imprescindible. Ya no estamos limitados por las barreras físicas o geográficas; ahora podemos conectarnos con colegas, clientes y socios en cualquier parte del mundo con solo unos pocos clics.</p>

                    <p className="mb-10">Al diseñar online, no solo estás aprovechando la tecnología para mejorar la eficiencia y la productividad, sino que también estás fomentando un ambiente de colaboración y creatividad. Con herramientas como Sketchlie, puedes transformar la forma en que trabajas y crear resultados sorprendentes en menos tiempo.</p>

                    <div id="3" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">3. Beneficios de Utilizar Sketchlie para Diseñar Online</h2>

                    <ul style={{ listStyleType: 'disc' }}>
                        <li className="mb-10 ml-5">
                            <strong>Colaboración en Tiempo Real:</strong> Con Sketchlie, puedes trabajar en proyectos junto con tu equipo en tiempo real, sin importar dónde se encuentren.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Acceso desde Cualquier Dispositivo:</strong> Ya sea en tu computadora de escritorio, tableta o teléfono inteligente, puedes acceder a Sketchlie y comenzar a diseñar online en segundos.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Guardado Automático:</strong> Nunca más pierdas tu trabajo. Sketchlie guarda automáticamente tus proyectos en la nube, asegurando que siempre tengas acceso a tus diseños más recientes.
                        </li>
                    </ul>

                    <p className="mb-10">Estos son solo algunos de los muchos beneficios que ofrece Sketchlie. Descubre por ti mismo cómo esta plataforma puede transformar la forma en que colaboras y diseñas online.</p>

                    <div id="4" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">4. El Rol del Diseño Online en la Era Digital</h2>

                    <p className="mb-10">En la era digital actual, el diseño online se ha convertido en una herramienta indispensable para empresas, educadores, profesionales creativos y más. Ya sea que estés creando un logotipo para tu empresa, diseñando una presentación para clase o planificando el diseño de un sitio web, las herramientas de diseño online como Sketchlie te permiten hacerlo de manera rápida, eficiente y colaborativa.</p>

                    <div id="5" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">5. Transforma tu Creatividad con Sketchlie</h2>

                    <p className="mb-10">¿Listo para llevar tu creatividad al siguiente nivel? Descubre más sobre cómo diseñar online con Sketchlie y desbloquea todo tu potencial creativo.</p>

                    <blockquote className="mb-10 italic border-l-4 border-gray-500 pl-4">
                        La creatividad no tiene límites, y con Sketchlie, tampoco lo tiene la colaboración. Diseña, crea y comparte tus ideas con el mundo de manera rápida y sencilla.
                    </blockquote>

                    <div id="6" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">6. ¡Comienza a Diseñar Online Hoy Mismo!</h2>

                    <p className="mb-10">Ya sea que estés trabajando en un proyecto escolar, planificando una estrategia empresarial o simplemente explorando tus ideas creativas, Sketchlie es la herramienta perfecta para ayudarte a diseñar online de manera efectiva. ¡Comienza hoy mismo y descubre todo lo que puedes lograr con <Link className="text-custom-blue hover:underline" href="/">Sketchlie</Link>!</p>
                </div>
                <div className="lg:w-[30%] xl:ml-10 lg:ml-5 border border-black rounded-lg p-10 bg-[#FFF] lg:sticky lg:z-30 lg:top-24 lg:h-[50%] lg:mb-0 mb-10">
                    <h3 className="text-2xl mb-3">
                        Indice
                    </h3>
                    <ul>
                        <li className="mb-4">
                            <Link href="#1" className="text-custom-blue hover:underline mb-10">1. ¿Qué es un Diagrama?</Link>
                        </li>
                        <li className="mb-4">
                            <Link href="#2" className="text-custom-blue hover:underline mb-10">2. Herramientas para la Creación de Diagramas Online</Link>
                        </li>
                        <li className="mb-4">
                            <Link href="#3" className="text-custom-blue hover:underline mb-10">3. Ventajas del Uso de Diagramas Online</Link>
                        </li>
                        <li className="mb-4">
                            <Link href="#4" className="text-custom-blue hover:underline mb-10">4. El Rol del Diagrama en la Era Digital</Link>
                        </li>
                        <li className="mb-4">
                            <Link href="#5" className="text-custom-blue hover:underline mb-10">5. Transformación de Procesos con Diagramas</Link>
                        </li>
                        <li className="mb-4">
                            <Link href="#6" className="text-custom-blue hover:underline mb-10">6. Diagramas: La Clave para la Innovación</Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5 md:my-20 my-5">
                <BlogLinks blogTitle="Diagramas de flujo" blogImage="/placeholders/mapa-conceptual.png" blogHref="/diagrama-de-flujo" blogDescription="Crea diagramas de flujo rápidamente y simplifica tus rutinas con el creador de diagramas de flujo de  con las herramientas de Sketchlie." />
                <BlogLinks blogTitle="Pizarra Online" blogImage="/placeholders/improve-performance.png" blogHref="/pizarra-online" blogDescription="Sketchlie es una pizarra online rápida, gratuita y fácil de usar pensada para  ayudarte a colaborar con cualquier persona desde cualquier lugar." />
                <BlogLinks blogTitle="Wireframes" blogImage="/placeholders/wireframe.png" blogHref="/wireframe" blogDescription="Empieza a visualizar tus ideas en minutos con nuestro intuitivo creador de wireframes. Crea esquemas de lo que necesites, desde páginas de inicio hasta formularios y menús, con nuestro creador de wireframes. " />
            </div>
        </div>
    );
}

export default LandingPage;
