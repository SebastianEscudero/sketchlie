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
    title: "Tus Ideas Visualizadas: Wireframes Online | Sketchlie",
    description: "Explora cómo los wireframes online en Sketchlie pueden dar vida a tus ideas de manera colaborativa y eficiente. ¡Regístrate hoy para iniciar tus proyectos!",
    keywords: ["wireframes online", "herramientas de diseño", "colaboración en línea", "diseño web", "diseño de aplicaciones", "Sketchlie"],
    alternates: {
        canonical: "https://www.sketchlie.com/blog/wireframes-online/",
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
                <BreadcrumbPage>Wireframes Online: La Herramienta Esencial para Visualizar tus Ideas</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
            </Breadcrumb>
           </div>
         <h1 className="xl:text-6xl lg:text-5xl md:text-4xl text-3xl mt-20 lg:pr-20" style={{lineHeight: "1.2"}}>
            Wireframes Online: La Herramienta Esencial para Visualizar tus Ideas
         </h1>
           <Image
                src="/placeholders/wireframe.png"
                alt="Mapa conceptual"
                width={1920}
                height={1080}
                className="rounded-2xl border border-black mt-20" 
           />
           <div className="flex flex-col-reverse lg:flex-row justify-between mt-20">
                <div className="lg:max-w-[70%] text-xl">
                    <p className="mb-10">Los wireframes son la columna vertebral de cualquier proyecto de diseño. Son esquemas visuales que representan la estructura y funcionalidad básica de una página web o aplicación. En Sketchlie, entendemos la importancia de crear <Link className="text-custom-blue hover:underline" href="/wireframe">wireframes</Link> sólidos y eficientes para dar vida a tus ideas de forma colaborativa y efectiva.</p>
                    <div id="1" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">1. ¿Qué son los Wireframes?</h2>
                    <p className="mb-10">Los wireframes son como los planos de una casa antes de construirla. Son representaciones visuales de la disposición de los elementos en una interfaz, sin preocuparse por los detalles visuales o estilos de diseño. Estos esquemas proporcionan una guía clara sobre la distribución de contenido, funciones y navegación de una aplicación o sitio web.</p>
                    <div id="2" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">2. Beneficios de Utilizar Wireframes:</h2>
                    <ul style={{ listStyleType: 'disc' }}>
                        <li className="mb-10 ml-5">
                            <strong>Claridad Visual: </strong>Los wireframes permiten a los equipos de diseño y desarrollo comprender la estructura y el flujo de una interfaz de manera clara y concisa.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Identificación de Problemas: </strong>Al crear wireframes, es más fácil identificar posibles problemas de usabilidad o navegación antes de comenzar con el desarrollo completo.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Ahorro de Tiempo y Recursos: </strong>Al tener una representación visual de la interfaz, se reduce la necesidad de hacer cambios importantes durante las etapas posteriores del desarrollo.
                        </li>
                    </ul>
                    <div id="3" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">3. La Importancia de los Wireframes Online</h2>
                    <p className="mb-10">En el mundo digital actual, donde la colaboración remota es cada vez más común, contar con herramientas para crear wireframes online se vuelve crucial. En <Link className="text-custom-blue hover:underline" href="/">Sketchlie</Link>, ofrecemos una plataforma intuitiva y poderosa para colaborar en tiempo real en la creación de wireframes y otros diagramas.</p>
                    <div id="4" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">4. ¿Por qué Utilizar Sketchlie para tus Wireframes?</h2>
                    <ul style={{ listStyleType: 'disc' }}>
                        <li className="mb-10 ml-5">
                            <strong>Colaboración en Tiempo Real: </strong>Con Sketchlie, varios miembros del equipo pueden trabajar simultáneamente en un mismo proyecto, lo que agiliza el proceso de diseño y fomenta la creatividad colectiva.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Variedad de Plantillas: </strong>Nuestra plataforma ofrece una amplia variedad de plantillas de wireframes para adaptarse a diferentes tipos de proyectos y necesidades de diseño.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Facilidad de Uso: </strong>Con una interfaz intuitiva y herramientas fáciles de manejar, <Link className="text-custom-blue hover:underline" href="/">Sketchlie</Link> es accesible para usuarios de todos los niveles de experiencia en diseño.
                        </li>
                    </ul>
                    <div id="5" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">5. Ejemplos Prácticos de Wireframes en Sketchlie</h2>
                    <p className="mb-10">Wireframes para Páginas Web:</p>
                    <ul style={{ listStyleType: 'disc' }}>
                        <li className="mb-10 ml-5">
                            <strong>Página de Inicio: </strong>Utiliza nuestras herramientas de arrastrar y soltar para diseñar la disposición de elementos clave como el encabezado, el menú de navegación y los llamados a la acción.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Página de Producto: </strong>Crea wireframes detallados para mostrar la disposición de imágenes, descripciones y botones de compra en la página de producto.
                        </li>
                    </ul>
                    <p className="mb-10">Wireframes para Aplicaciones Móviles:</p>
                    <ul style={{ listStyleType: 'disc' }}>
                        <li className="mb-10 ml-5">
                            <strong>Flujo de Registro: </strong>Diseña el flujo de registro de tu aplicación móvil, desde la pantalla de inicio de sesión hasta la verificación de correo electrónico y la creación de perfil.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Navegación Principal: </strong>Define la estructura de navegación de tu aplicación, incluyendo menús desplegables, botones de navegación y pestañas.
                        </li>
                    </ul>
                    <div id="6" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">6. Conclusión</h2>
                    <p className="mb-10">Los wireframes son una herramienta esencial en el proceso de diseño de cualquier proyecto web o móvil. Con <Link className="text-custom-blue hover:underline" href="/">Sketchlie</Link>, puedes llevar tus ideas desde conceptos iniciales hasta diseños detallados de forma colaborativa y eficiente. ¡Regístrate hoy en <Link className="text-custom-blue hover:underline" href="/">Sketchlie</Link> y comienza a dar vida a tus proyectos!</p>
                </div>
                <div className="lg:w-[30%] xl:ml-10 lg:ml-5 border border-black rounded-lg p-10 bg-[#FFF] lg:sticky lg:z-30 lg:top-24 lg:h-[50%] lg:mb-0 mb-10">
                    <h3 className="text-2xl mb-3">
                        Indice
                    </h3>
                    <ul>
                        <li className="mb-4">
                            <Link href="#1" className="text-custom-blue hover:underline mb-10">1. ¿Qué son los Wireframes?</Link>
                        </li>
                        <li className="mb-4">
                            <Link href="#2" className="text-custom-blue hover:underline mb-10">2. Beneficios de Utilizar Wireframes</Link>
                        </li>
                        <li className="mb-4">
                            <Link href="#3" className="text-custom-blue hover:underline mb-10">3. La Importancia de los Wireframes Online</Link>
                        </li>
                        <li className="mb-4">
                            <Link href="#4" className="text-custom-blue hover:underline mb-10">4. ¿Por qué Utilizar Sketchlie para tus Wireframes?</Link>
                        </li>
                        <li className="mb-4">
                            <Link href="#5" className="text-custom-blue hover:underline mb-10">5. Ejemplos Prácticos de Wireframes en Sketchlie</Link>
                        </li>
                        <li className="mb-4">
                            <Link href="#6" className="text-custom-blue hover:underline mb-10">6. Conclusión</Link>
                        </li>
                    </ul>
                </div>
           </div>
           <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5 md:my-20 my-5">
                <BlogLinks blogTitle="Mapa Conceptual Online" blogImage="/placeholders/mapa-conceptual-online.png" blogHref="/mapa-conceptual" blogDescription="Descubre cómo desatar tu creatividad y potenciar la colaboración en tiempo real con Sketchlie."/>
                <BlogLinks blogTitle="Mapa de Procesos" blogImage="/placeholders/mapa-de-procesos.png" blogHref="/mapas-de-procesos" blogDescription="El mapa de procesos ayuda a los equipos a mapear y implementar mejoras. Registrate hoy con una 3 espacios de trabajo gratuitos para empezar a utilizar la mejor herramienta de mapa de procesos."/>
                <BlogLinks blogTitle="Mapas Mentales" blogImage="/placeholders/mapa-mental.png" blogHref="/mapa-mental-online" blogDescription="Explora nuestras herramientas para simplificar la creación de mapas mentales. Organiza tus ideas de manera jerárquica y potencia tu creatividad con nuestro intuitivo creador de mapas mentales."/>
            </div>
        </div>    
     );
}
 
export default LandingPage;
