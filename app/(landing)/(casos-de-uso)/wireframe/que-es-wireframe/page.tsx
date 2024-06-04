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
    title: "Wireframes: Herramientas y Técnicas de Diseño de Interfaz | Sketchlie",
    description: "Descubre qué son los wireframes, cómo se utilizan, tipos, historia, consejos para crearlos y más. Mejora tu diseño de interfaz con Sketchlie.",
    keywords: ["wireframes", "diseño de interfaz", "diseño web", "UX", "Sketchlie"],
    alternates: {
        canonical: "https://www.sketchlie.com/wireframe/que-es-wireframe/",
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
                            <Link href="/wireframe/" title="Wireframe">Wireframe</Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>¿Qué es un Wireframe?</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <div className="md:flex mt-10 items-center justify-between">
                <h1 className="lg:text-6xl md:text-5xl text-4xl md:px-5 md:text-left text-center" style={{ lineHeight: "1.2" }}>
                    Wireframe
                </h1>
                <Image
                    src="/placeholders/wireframe.png"
                    alt="Wireframe"
                    width={1920}
                    height={1080}
                    className="rounded-2xl border border-black md:max-w-[60%] md:mt-0 mt-10"
                />
            </div>
            <div className="flex flex-col-reverse lg:flex-row justify-between mt-[3%]">
                <div className="lg:max-w-[70%] text-xl">
                    <div id="1" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">¿Qué es un wireframe?</h2>

                    <p className="mb-10">Un <Link className="text-custom-blue hover:underline" href="/wireframe/">wireframe</Link> es una representación visual de la estructura de una página web o una aplicación. Se trata de un esquema básico que muestra la distribución de los elementos en la interfaz, sin incluir detalles de diseño como colores o tipografías. En Sketchlie, entendemos la importancia de los wireframes para la planificación y el diseño de proyectos web y de aplicaciones móviles. Con nuestra herramienta de <Link className="text-custom-blue hover:underline" href="/pizarra-online/">pizarra online</Link>, puedes crear wireframes de forma colaborativa y en tiempo real.</p>

                    <p className="mb-10">Los wireframes son una herramienta fundamental en el proceso de diseño, ya que permiten visualizar la disposición de los elementos y la navegación del sitio antes de comenzar con el desarrollo. En nuestra pagina sobre<Link className="text-custom-blue hover:underline" href="/wireframe/">wireframes</Link>, encontrarás más información sobre cómo utilizar esta técnica para mejorar tus proyectos.</p>

                    <div id="2" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">¿Cuál es la importancia de los wireframes en el diseño web?</h2>

                    <p className="mb-10">Los wireframes son fundamentales en el proceso de diseño web porque permiten establecer la estructura y la disposición de los elementos de manera clara y concisa. Al crear un wireframe, los diseñadores pueden definir la arquitectura de la información y la experiencia del usuario antes de comenzar con el desarrollo.</p>

                    <p className="mb-10">En Sketchlie, ofrecemos una herramienta de <Link className="text-custom-blue hover:underline" href="/wireframe/">wireframes online</Link> que facilita la colaboración entre equipos y agiliza el proceso de diseño. Con nuestra <Link className="text-custom-blue hover:underline" href="/pizarra-online/">pizarra online</Link>, puedes crear y compartir wireframes de forma rápida y sencilla.</p>

                    <div id="3" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">¿Cómo puedo crear wireframes efectivos?</h2>

                    <p className="mb-10">Para crear wireframes efectivos, es importante tener en cuenta varios aspectos. En primer lugar, debes definir claramente los objetivos y requisitos del proyecto. Luego, puedes comenzar a esbozar la estructura básica del sitio o la aplicación, teniendo en cuenta la jerarquía de la información y la experiencia del usuario.</p>

                    <p className="mb-10">En Sketchlie, ofrecemos plantillas y herramientas que facilitan la creación de wireframes efectivos. Con nuestra <Link className="text-custom-blue hover:underline" href="/pizarra-online/">pizarra online</Link>, puedes arrastrar y soltar elementos para diseñar la interfaz de manera intuitiva. Además, puedes colaborar en tiempo real con otros miembros del equipo para obtener retroalimentación y realizar ajustes según sea necesario.</p>
                    <p className="mb-10">Explora nuestro <Link className="text-custom-blue hover:underline" href="/blog/">blog</Link> para obtener consejos y mejores prácticas sobre cómo crear wireframes efectivos y mejorar tus habilidades de diseño.</p>

                    <div id="4" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">¿Cuál es la diferencia entre un wireframe y un prototipo?</h2>

                    <p className="mb-10">Aunque a menudo se utilizan indistintamente, los wireframes y los prototipos son dos herramientas diferentes en el proceso de diseño. Un wireframe es una representación visual de la estructura y disposición de los elementos en una interfaz, mientras que un prototipo es una versión interactiva y funcional de la aplicación o sitio web.</p>

                    <p className="mb-10">En <Link className="text-custom-blue hover:underline" href="/wireframe/">Sketchlie</Link>, ofrecemos funcionalidades para crear tanto wireframes como prototipos. Nuestra plataforma te permite comenzar con un wireframe básico y luego agregar interactividad para convertirlo en un prototipo completo. Con nuestra herramienta de <Link className="text-custom-blue hover:underline" href="/pizarra-online/">pizarra online</Link>, puedes diseñar, colaborar y prototipar tus ideas en un solo lugar.</p>

                    <div id="5" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">¿Cómo puedo compartir y colaborar en wireframes?</h2>

                    <p className="mb-10">En Sketchlie, hemos simplificado el proceso de compartir y colaborar en wireframes. Nuestra plataforma de <Link className="text-custom-blue hover:underline" href="/pizarra-online/">pizarra online</Link> permite a los equipos trabajar juntos en tiempo real, desde cualquier lugar del mundo.</p>

                    <p className="mb-10">Para compartir un wireframe, simplemente puedes invitar a otros usuarios a colaborar en tu pizarra. Pueden ver tus diseños, realizar comentarios y sugerencias, e incluso editar el wireframe directamente. Esto facilita la comunicación y la iteración en el proceso de diseño.</p>

                    <p className="mb-10">Descubre más sobre nuestras características de colaboración en nuestro <Link className="text-custom-blue hover:underline" href="/blog/pizarra-online/">blog sobre pizarras online</Link>.</p>
                    <div id="6" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">¿Por qué debería utilizar wireframes en mi proceso de diseño?</h2>

                    <p className="mb-10">La utilización de wireframes en el proceso de diseño ofrece numerosos beneficios. En primer lugar, los wireframes permiten establecer la estructura y la navegación del sitio de manera clara y concisa, lo que facilita la comprensión del proyecto por parte de todo el equipo.</p>

                    <p className="mb-10">Además, los <Link className="text-custom-blue hover:underline" href="/blog/wireframes-online/">wireframes </Link> ayudan a identificar posibles problemas de usabilidad y diseño antes de comenzar con el desarrollo, lo que ahorra tiempo y recursos en etapas posteriores del proyecto. En Sketchlie, ofrecemos una amplia gama de herramientas y plantillas para crear wireframes que se adapten a tus necesidades específicas.</p>
                    <div id="7" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">¿Puedo utilizar wireframes en dispositivos móviles?</h2>

                    <p className="mb-10">Sí, los wireframes son una herramienta útil para diseñar interfaces tanto en dispositivos móviles como en escritorio. En Sketchlie, ofrecemos plantillas y herramientas específicamente diseñadas para la creación de wireframes para dispositivos móviles.</p>

                    <p className="mb-10">Con nuestra plataforma de <Link className="text-custom-blue hover:underline" href="/wireframe/">wireframes online</Link>, puedes diseñar y prototipar interfaces para una amplia variedad de dispositivos, desde teléfonos inteligentes hasta tabletas y computadoras de escritorio. Nuestra herramienta te permite previsualizar tus diseños en diferentes tamaños de pantalla y realizar ajustes según sea necesario.</p>

                    <p className="mb-10">Explora nuestras características para dispositivos móviles en <Link className="text-custom-blue hover:underline" href="/pizarra-online/">pizarra online</Link> y comienza a crear wireframes para tus aplicaciones móviles hoy mismo.</p>
                    <div id="8" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">¿Cómo puedo empezar a utilizar wireframes en Sketchlie?</h2>

                    <p className="mb-10">¡Es fácil empezar a utilizar wireframes en Sketchlie! Todo lo que necesitas hacer es registrarte para obtener una cuenta gratuita en nuestra plataforma. Una vez que hayas iniciado sesión, puedes crear una nueva pizarra y comenzar a diseñar tu wireframe.</p>

                    <p className="mb-10">Nuestra herramienta de <Link className="text-custom-blue hover:underline" href="/">pizarra online</Link> ofrece una variedad de elementos y herramientas para ayudarte a diseñar wireframes de forma rápida y sencilla. Puedes arrastrar y soltar elementos, ajustar tamaños y alinear objetos para crear la estructura perfecta para tu proyecto.</p>

                    <p className="mb-10">Para obtener más información sobre cómo utilizar wireframes en Sketchlie, consulta nuestra sección de ayuda o visita nuestro <Link className="text-custom-blue hover:underline" href="/blog/wireframes-online/">blog</Link> para obtener consejos y tutoriales útiles.</p>

                    <div id="9" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">Como hacer un Wireframe</h2>

                    <p className="mb-10">Crear un wireframe efectivo es crucial en el proceso de diseño web y de aplicaciones móviles. Aquí hay algunos pasos para ayudarte a hacer un wireframe claro y útil:</p>

                    <ol style={{ listStyleType: 'decimal' }}>
                        <li className="mb-10 ml-5">Define los objetivos del proyecto: Antes de comenzar, asegúrate de entender claramente qué es lo que quieres lograr con el diseño. Define los objetivos y requisitos del proyecto para guiar tu proceso de creación.</li>
                        <li className="mb-10 ml-5">Investiga y planifica: Realiza una investigación sobre tu audiencia, la competencia y las mejores prácticas de diseño. Utiliza esta información para planificar la estructura y la navegación de tu wireframe.</li>
                        <li className="mb-10 ml-5">Dibuja un esquema básico: Comienza dibujando un esquema básico de la página o la aplicación. Define dónde estarán ubicados los elementos principales, como el encabezado, el contenido y el pie de página.</li>
                        <li className="mb-10 ml-5">Agrega elementos y detalles: Una vez que tengas el esquema básico, comienza a agregar elementos más detallados, como botones, menús y campos de formulario. Asegúrate de mantener la simplicidad y la claridad en todo momento.</li>
                        <li className="mb-10 ml-5">Refina y prueba: Una vez que hayas creado tu wireframe inicial, tómate el tiempo para revisarlo y refinarlo. Prueba la navegación y la usabilidad para identificar cualquier problema o área de mejora.</li>
                    </ol>

                    <p className="mb-10">Con estos pasos simples, estarás en camino de crear wireframes efectivos que ayudarán a guiar el proceso de diseño y desarrollo de tu proyecto.</p>


                    <p className="mb-10">Sí, en Sketchlie ofrecemos la posibilidad de exportar tus wireframes a otros formatos para facilitar la colaboración y el intercambio de archivos. Puedes exportar tus diseños en formatos como PNG, JPEG, PDF y SVG.</p>
                    <p className="mb-10">Para obtener más información sobre cómo exportar tus <Link className="text-custom-blue hover:underline" href="/blog/wireframes-online/">wireframes</Link> de Sketchlie, consulta nuestra sección de ayuda o ponte en contacto con nuestro equipo de soporte.</p>
                    <div id="10" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10"> ¿Cómo puedo obtener ayuda adicional con mis wireframes en Sketchlie?</h2>

                    <p className="mb-10">Si necesitas ayuda adicional con tus wireframes en Sketchlie, estamos aquí para ayudarte. Contamos con un equipo de soporte dedicado que está disponible para responder a tus preguntas y proporcionarte asistencia técnica cuando la necesites.</p>

                    <p className="mb-10">Además, también ofrecemos recursos adicionales en nuestro <Link className="text-custom-blue hover:underline" href="/blog/">blog</Link> y en nuestra sección de ayuda, donde encontrarás tutoriales, guías y consejos útiles para sacar el máximo provecho de nuestra plataforma.</p>

                    <p className="mb-10">No dudes en ponerte en contacto con nosotros si tienes alguna pregunta o necesitas ayuda con tus wireframes. Estamos aquí para ayudarte a tener éxito en tus proyectos de diseño.</p>

                    <p className="mb-10">Explora todas las características y beneficios de Sketchlie hoy mismo y comienza a diseñar wireframes de manera más eficiente y colaborativa.</p>
                    <div id="11" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10"> ¿Cuáles son los beneficios de utilizar wireframes en Sketchlie?</h2>

                    <ul style={{ listStyleType: 'disc' }} className="mb-10">
                        <li className="mb-10 ml-5">Facilita la planificación y organización de proyectos web y de aplicaciones móviles.</li>
                        <li className="mb-10 ml-5">Permite identificar problemas de usabilidad y diseño antes de comenzar con el desarrollo.</li>
                        <li className="mb-10 ml-5">Facilita la comunicación y colaboración entre equipos de diseño y desarrollo.</li>
                        <li className="mb-10 ml-5">Agiliza el proceso de diseño al proporcionar una visión clara de la estructura del proyecto.</li>
                        <li className="mb-10 ml-5">Ofrece flexibilidad y personalización para adaptarse a las necesidades específicas de cada proyecto.</li>
                    </ul>

                    <p className="mb-10">En Sketchlie, nos esforzamos por ofrecer una plataforma de diseño colaborativo que simplifique el proceso de creación de wireframes y prototipos. Con nuestras herramientas intuitivas y nuestra funcionalidad de colaboración en tiempo real, puedes llevar tus ideas desde el concepto inicial hasta la realidad de forma rápida y eficiente.</p>

                    <p className="mb-10">Descubre todos los beneficios de utilizar <Link className="text-custom-blue hover:underline" href="/wireframe/">wireframes</Link>  en Sketchlie y únete a nuestra comunidad de diseñadores y desarrolladores hoy mismo.</p>

                </div>
                <div className="lg:w-[30%] xl:ml-10 lg:ml-5 border border-black rounded-lg p-10 bg-[#FFF] lg:sticky lg:z-30 lg:top-24 lg:h-[50%] lg:mb-0 mb-10">
                    <h3 className="text-2xl mb-3">
                        Indice
                    </h3>
                    <ul>
                        <li className="mb-4">
                            <Link href="#1" className="text-custom-blue hover:underline mb-10">Qué es un wireframe</Link>
                        </li>
                        <li className="mb-4">
                            <Link href="#2" className="text-custom-blue hover:underline mb-10">Cuál es la importancia de los wireframes en el diseño web</Link>
                        </li>
                        <li className="mb-4">
                            <Link href="#3" className="text-custom-blue hover:underline mb-10">Cómo puedo crear wireframes efectivos</Link>
                        </li>
                        <li className="mb-4">
                            <Link href="#4" className="text-custom-blue hover:underline mb-10">Cuál es la diferencia entre un wireframe y un prototipo</Link>
                        </li>
                        <li className="mb-4">
                            <Link href="#5" className="text-custom-blue hover:underline mb-10">Cómo puedo compartir y colaborar en wireframes</Link>
                        </li>
                        <li className="mb-4">
                            <Link href="#6" className="text-custom-blue hover:underline mb-10">Por qué debería utilizar wireframes en mi proceso de diseño</Link>
                        </li>
                        <li className="mb-4">
                            <Link href="#7" className="text-custom-blue hover:underline mb-10">Puedo utilizar wireframes en dispositivos móviles</Link>
                        </li>
                        <li className="mb-4">
                            <Link href="#8" className="text-custom-blue hover:underline mb-10">Cómo puedo empezar a utilizar wireframes en Sketchlie</Link>
                        </li>
                        <li className="mb-4">
                            <Link href="#9" className="text-custom-blue hover:underline mb-10">Cómo hacer un Wireframe</Link>
                        </li>
                        <li className="mb-4">
                            <Link href="#10" className="text-custom-blue hover:underline mb-10">Cómo puedo obtener ayuda adicional con mis wireframes?</Link>
                        </li>
                        <li className="mb-4">
                            <Link href="#11" className="text-custom-blue hover:underline mb-10">Cuáles son los beneficios de utilizar wireframes</Link>
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
