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
    title: "Mapa Conceptual y su Importancia en el Mundo Online",
    description: "Explora las herramientas versátiles de Sketchlie para crear mapas conceptuales online de forma colaborativa y eficiente. Potencia tu creatividad y productividad con nuestras herramientas gratuitas.",
    keywords: ["mapa conceptual", "herramientas para mapas conceptuales", "crear mapas conceptuales online", "herramientas colaborativas", "mapa mental", "mapas de procesos", "herramientas digitales", "creatividad", "productividad"],
    alternates: {
        canonical: "https://www.sketchlie.com/blog/mapa-conceptual",
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
                <BreadcrumbPage>Mapa Conceptual</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
            </Breadcrumb>
           </div>
         <h1 className="xl:text-6xl lg:text-5xl md:text-4xl text-3xl mt-20 lg:pr-20" style={{lineHeight: "1.2"}}>
             Mapa Conceptual y su Importancia en el Mundo Online
         </h1>
           <Image
                src="/placeholders/mapa-conceptual-online.png"
                alt="Mapa conceptual"
                width={1920}
                height={1080}
                className="rounded-2xl border border-black mt-20" 
           />
           <div className="flex flex-col-reverse lg:flex-row justify-between mt-20">
                <div className="lg:max-w-[70%] text-xl">
                    <p className="mb-10">En el vasto universo de la educación y la organización de ideas, el mapa conceptual emerge como una herramienta fundamental. En el contexto digital de hoy en día, donde la información fluye a velocidades vertiginosas, la capacidad de estructurar y visualizar conceptos es más crucial que nunca.</p>
                    <p className="mb-10">En <Link className="text-custom-blue hover:underline" href="/">Sketchlie</Link>, comprendemos la importancia de estas herramientas, por eso te ofrecemos una variedad de recursos para potenciar tu creatividad y productividad.</p>
                    <div id="1" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-5xl mb-10">1. ¿Qué es un Mapa Conceptual?</h2>
                    <p className="mb-10">Un mapa conceptual es una representación gráfica de ideas y conceptos interrelacionados. A través de nodos y enlaces, se construye una red que captura la esencia de un tema, permitiendo una comprensión más profunda y una organización más efectiva de la información.</p>
                    <p className="mb-10">Este método no lineal de representación facilita la exploración de ideas desde diferentes perspectivas, fomentando la creatividad y el pensamiento crítico.</p>
                    <div id="2" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-5xl mb-10">2. Herramientas para la Creación de Mapas Conceptuales Online</h2>
                    <p className="mb-10">En el mundo digital, las herramientas para la creación de mapas conceptuales han cobrado una relevancia sin precedentes. <Link className="text-custom-blue hover:underline" href="/">Sketchlie</Link> te ofrece una plataforma versátil y fácil de usar para dar vida a tus ideas de manera colaborativa y eficiente. Algunas de nuestras herramientas más destacadas incluyen:</p>
                    <ul style={{ listStyleType: 'disc' }}>
                        <li className="mb-10 ml-5">
                            <Link className="text-custom-blue hover:underline" href="/pizarra-online">
                                Pizarra Online
                            </Link>: Ideal para lluvias de ideas y sesiones de trabajo en equipo, nuestra pizarra online te permite plasmar tus conceptos de forma libre y flexible.
                        </li>
                        <li className="mb-10 ml-5">
                            <Link className="text-custom-blue hover:underline" href="/mapa-conceptual">
                                Mapa Conceptual
                            </Link>: Nuestra herramienta de creación de mapas conceptuales te permite organizar tus ideas de manera jerárquica, visualizando las relaciones entre conceptos de forma clara y concisa.
                        </li>
                        <li className="mb-10 ml-5">
                            <Link className="text-custom-blue hover:underline" href="/mapa-mental-online">
                                Mapa Mental Online
                            </Link>: Perfecto para estructurar ideas de forma no lineal, el mapa mental es una herramienta dinámica que estimula la creatividad y la asociación de ideas.
                        </li>
                        <li className="mb-10 ml-5">
                            <Link className="text-custom-blue hover:underline" href="/mapas-de-procesos">
                                Mapas de Procesos
                            </Link>: Para aquellos proyectos que requieren una visualización detallada de los pasos a seguir, los mapas de procesos son una herramienta invaluable para optimizar la eficiencia y la productividad.
                        </li>
                    </ul>
                    <div id="3" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-5xl mb-10">3. Ventajas del Uso de Mapas Conceptuales Online</h2>
                    <p className="mb-10">La adopción de herramientas digitales para la creación de mapas conceptuales ofrece una serie de ventajas significativas:</p>
                    <ul style={{ listStyleType: 'disc' }}>
                        <li className="mb-10 ml-5">
                            <strong>Accesibilidad: </strong>Con nuestras herramientas online, puedes acceder a tus mapas conceptuales desde cualquier lugar y en cualquier momento, facilitando la colaboración remota y el trabajo en equipo.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Flexibilidad: </strong>La versatilidad de nuestras herramientas te permite adaptar tus mapas conceptuales según tus necesidades específicas, añadiendo y modificando nodos y enlaces de forma rápida y sencilla.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Colaboración en Tiempo Real: </strong>Nuestras herramientas permiten la colaboración en tiempo real, lo que significa que puedes trabajar en tus mapas conceptuales junto con colegas o compañeros de clase, sin importar dónde se encuentren.
                        </li>
                    </ul>
                    <div id="4" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-5xl mb-10">4. El Rol del Mapa Conceptual en la Era Digital</h2>
                    <p className="mb-10">En un mundo dominado por la información, el mapa conceptual se erige como una brújula invaluable. Al proporcionar una estructura visual para la comprensión y organización de ideas, estas herramientas no solo facilitan el proceso de aprendizaje, sino que también potencian la creatividad y la innovación.</p>
                    <p className="mb-10">En <Link className="text-custom-blue hover:underline" href="/">Sketchlie</Link>, nos enorgullece ofrecer una gama de herramientas diseñadas para inspirar y empoderar a nuestros usuarios. Desde la creación de mapas conceptuales hasta la elaboración de diagramas de flujo y wireframes, estamos comprometidos a proporcionar las herramientas necesarias para llevar tus ideas al siguiente nivel.</p>
                    <p className="mb-10">Como parte de nuestra misión de fomentar el aprendizaje y la creatividad, también ofrecemos una variedad de recursos educativos en nuestro <Link className="text-custom-blue hover:underline" href="/blog">blog</Link>, donde puedes encontrar consejos, tutoriales y casos de estudio para sacar el máximo provecho de nuestras herramientas.</p>
                    <p className="mb-10">En resumen, en el mundo online de hoy, el mapa conceptual es más que una simple herramienta: es un faro de claridad en un mar de información. Con nuestro <Link className="text-custom-blue hover:underline" href="/blog">blog</Link>, puedes navegar este mar con confianza, sabiendo que tienes las herramientas necesarias para dar forma a tus ideas y alcanzar tus objetivos.</p>
                </div>
                <div className="lg:w-[30%] xl:ml-10 lg:ml-5 border border-black rounded-lg p-10 bg-[#FFF] lg:sticky lg:z-30 lg:top-24 lg:h-[50%] lg:mb-0 mb-10">
                    <h3 className="text-2xl mb-3">
                        Indice
                    </h3>
                    <ul>
                        <li className="mb-4">
                            <Link href="#1" className="text-custom-blue hover:underline mb-10">1. ¿Qué es un Mapa Conceptual?</Link>
                        </li>
                        <li className="mb-4">
                            <Link href="#2" className="text-custom-blue hover:underline mb-10">2. Herramientas para la Creación de Mapas Conceptuales Online</Link>
                        </li>
                        <li className="mb-4">
                            <Link href="#3" className="text-custom-blue hover:underline mb-10">3. Ventajas del Uso de Mapas Conceptuales Online</Link>
                        </li>
                        <li className="mb-4">
                            <Link href="#4" className="text-custom-blue hover:underline mb-10">4. El Rol del Mapa Conceptual en la Era Digital</Link>
                        </li>
                    </ul>
                </div>
           </div>
           <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1  md:my-20 my-5">
                <BlogLinks blogTitle="Diagramas de flujo" blogImage="/placeholders/mapa-conceptual.png" blogHref="/diagrama-de-flujo" blogDescription="Crea diagramas de flujo rápidamente y simplifica tus rutinas con el creador de diagramas de flujo de  con las herramientas de Sketchlie."/>
                <BlogLinks blogTitle="Pizarra Online" blogImage="/placeholders/improve-performance.png" blogHref="/pizarra-online" blogDescription="Sketchlie es una pizarra online rápida, gratuita y fácil de usar pensada para  ayudarte a colaborar con cualquier persona desde cualquier lugar."/>
                <BlogLinks blogTitle="Wireframes" blogImage="/placeholders/wireframe.png" blogHref="/wireframe" blogDescription="Empieza a visualizar tus ideas en minutos con nuestro intuitivo creador de wireframes. Crea esquemas de lo que necesites, desde páginas de inicio hasta formularios y menús, con nuestro creador de wireframes. "/>
            </div>
        </div>    
     );
}
 
export default LandingPage;
