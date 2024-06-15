import { Metadata } from "next";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Link from "next/link";
import { BlogStructure } from "@/components/blog-structure";
import { TemplatesSlider } from "@/components/templates-slider";
import { Button } from "@/components/ui/button";
import { HowToCreate } from "@/components/how-to-create";
import { FaqSection } from "@/components/faq-section";

export const metadata: Metadata = {
    title: "Plantillas de Wireframes gratuitas | Sketchlie",
    description: "Crea prototipos de baja fidelidad para tus proyectos de diseño web y móvil con nuestras plantillas de wireframes gratuitas. Descarga y personaliza wireframes para planificar la estructura y el diseño de tus aplicaciones y sitios web.",
    keywords: ["plantillas de wireframes", "wireframes gratuitos", "plantillas de wireframes gratuitas", "plantillas de wireframes para móviles", "plantillas de wireframes para sitios web", "plantillas de wireframes de baja fidelidad", "plantillas de wireframes de alta fidelidad", "plantillas de wireframes de aplicaciones móviles", "plantillas de wireframes de sitios web", "plantillas de wireframes de diseño web", "plantillas de wireframes de diseño de aplicaciones", "plantillas de wireframes de UX", "plantillas de wireframes de UI", "plantillas de wireframes de prototipos", "plantillas de wireframes de proyectos de diseño", "plantillas de wireframes de proyectos de desarrollo", "plantillas de wireframes de proyectos de desarrollo de aplicaciones", "plantillas de wireframes de proyectos de desarrollo de sitios web", "plantillas de wireframes de proyectos de diseño de aplicaciones", "plantillas de wireframes de proyectos de diseño de sitios web", "plantillas de wireframes de proyectos de UX", "plantillas de wireframes de proyectos de UI", "plantillas de wireframes de proyectos de prototipos", "plantillas de wireframes de proyectos de diseño de UX", "plantillas de wireframes de proyectos de diseño de UI", "plantillas de wireframes de proyectos de diseño de prototipos", "plantillas de wireframes de proyectos de diseño de UX y UI", "plantillas de wireframes de proyectos de diseño de UX y UI y prototipos", "plantillas de wireframes de proyectos de diseño de UX y UI y prototipos de aplicaciones", "plantillas de wireframes de proyectos de diseño de UX y UI y prototipos de sitios web", "plantillas de wireframes de proyectos de diseño de UX y UI y prototipos de aplicaciones móviles", "plantillas de wireframes de proyectos de diseño de UX y UI y prototipos de sitios web y aplicaciones móviles", "plantillas de wireframes de proyectos de diseño de UX y UI y prototipos de aplicaciones móviles y sitios web", "plantillas de wireframes de proyectos de diseño de UX y UI y prototipos de sitios web y aplicaciones móviles", "plantillas de wireframes de proyectos de"],
    alternates: {
        canonical: "https://www.sketchlie.com/plantillas/low-fidelity-wireframe/",
    }
};
const LandingPage = () => {
    const steps = [
        {
            trigger: "1. Define los objetivos y requisitos del proyecto",
            text: "Antes de comenzar, asegúrate de comprender claramente los objetivos del proyecto y los requisitos específicos que debe cumplir el wireframe."
        },
        {
            trigger: "2. Dibuja los elementos básicos de la interfaz",
            text: "Utiliza herramientas de dibujo disponibles en herramientas como Figma, Adobe XD o Sketchlie para crear los elementos clave de la interfaz, como botones, campos de texto, imágenes y menús."
        },
        {
            trigger: "3. Organiza los elementos para reflejar la estructura y navegación",
            text: "Coloca y organiza los elementos de manera que reflejen la estructura y la navegación del sitio web o la aplicación. Decide la disposición y el flujo de la información de manera efectiva."
        },
        {
            trigger: "4. Añade anotaciones para explicar funcionalidades y comportamientos",
            text: "Incorpora anotaciones claras y concisas para describir funcionalidades específicas, interacciones o comportamientos esperados de los elementos de la interfaz."
        }
    ];
    
    const faqData = [
        {
            value: "item-1",
            trigger: "¿Qué es un wireframe?",
            content: "Un wireframe es un esquema visual básico que representa la estructura y el contenido de una página web o aplicación. Sirve para planificar la disposición de los elementos y funcionalidades antes de iniciar el diseño detallado."
        },
        {
            value: "item-2",
            trigger: "¿Qué herramientas online existen para crear wireframes?",
            content: "Existen varias herramientas online para crear wireframes, como Figma, Adobe XD, Sketchlie. Estas herramientas permiten diseñar interfaces de usuario de manera eficiente y colaborativa, ofreciendo funciones específicas para wireframing."
        },
        {
            value: "item-3",
            trigger: "¿Qué es una plantilla de wireframe de baja fidelidad?",
            content: "Una plantilla de wireframe de baja fidelidad es un diseño esquemático simple y no detallado que representa la estructura básica de una interfaz. Se utiliza para explorar y validar conceptos de diseño antes de invertir en el desarrollo completo."
        },
        {
            value: "item-4",
            trigger: "¿Dónde puedo encontrar plantillas de wireframe de baja fidelidad?",
            content: (
                <span>Sketchlie ofrece varias plantillas una de ellas siendo su <Link className="text-custom-blue hover:underline" href="/dashboard/">plantilla de wireframe de baja fidelidad</Link> Esta plantilla te ayudará a comenzar con estructuras predefinidas para explorar y validar tus ideas de diseño. </span>
            )
        }
    ];
    

    return (
        <div>
            <div className="xl:mx-[10%] lg:mx-[7%] md:mx-[5%] mx-[5%] mt-5">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <Link href="/" title="Home">Home</Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <Link href="/plantillas/">Plantillas</Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Low fidelity wireframes</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <div className="xl:mt-[-30px] mb-14">
                <BlogStructure
                    title="Plantillas de Wireframes de baja fidelidad"
                    description="Organiza tus ideas y haz un plan de tu proyecto con nuestras plantillas de wireframes de baja fidelidad. Utiliza nuestra plantilla personalizable para crear el futuro de tu proyecto de diseño web o móvil."
                    img="/templates/lowfidelity-wireframe.png"
                    alt="Plantilla de Wireframe baja fidelidad"
                    cta="Utilizar plantilla"
                />
            </div>
            <div className="flex flex-col-reverse lg:flex-row justify-between xl:mx-[10%] lg:mx-[7%] md:mx-[5%] mx-[5%] mt-5">
                <div className="lg:max-w-[70%] text-xl">
                    <p className="mb-10">Un <Link className="text-custom-blue hover:underline" href="/wireframe/">wireframe</Link> es un esquema visual que representa la estructura y funcionalidad básica de un sitio web o una aplicación. Se utiliza como una herramienta de diseño para planificar la disposición de los elementos en una interfaz, incluidos el contenido, los botones, los menús y otros elementos interactivos.</p>
                    <div id="1" className="h-[80px] mt-[-80px]"></div>

                    <h2 className="text-4xl md:text-5xl mb-10">¿Qué es un wireframe en diseño web?</h2>
                    <p className="mb-10">Un wireframe en diseño web es un boceto básico que representa la estructura y el diseño de una página web antes de que se apliquen los estilos visuales y el contenido final. Es una representación visual simplificada que se centra en la disposición de los elementos y las funcionalidades clave de la interfaz, permitiendo a los diseñadores y desarrolladores planificar la experiencia del usuario y la navegación del sitio de manera efectiva.</p>
                    <div id="1" className="h-[80px] mt-[-80px]"></div>

                    <h2 className="text-4xl md:text-5xl mb-10">¿Cuál es la función de un wireframe en el diseño de una página web?</h2>
                    <p className="mb-10">La función principal de un wireframe en el diseño de una página web es proporcionar una representación visual de la estructura y el diseño de la interfaz sin distracciones visuales. Ayuda a los diseñadores y desarrolladores a planificar la disposición de los elementos de la página, la navegación del sitio y las interacciones del usuario antes de comprometerse con el diseño final. Además, permite identificar y solucionar problemas de usabilidad y experiencia del usuario en las primeras etapas del proceso de diseño, lo que ahorra tiempo y recursos en el desarrollo posterior.</p>
                    <div id="1" className="h-[80px] mt-[-80px]"></div>

                    <h2 className="text-4xl md:text-5xl mb-10">¿Cuál es la diferencia entre un wireframe y un prototipo?</h2>
                    <p className="mb-10">La principal diferencia entre un <Link className="text-custom-blue hover:underline" href="/wireframe/">wireframe</Link> y un prototipo es el nivel de detalle y funcionalidad. Un wireframe es una representación estática y simplificada que se enfoca en la estructura y la disposición de los elementos de la interfaz, mientras que un prototipo es una versión interactiva y más avanzada que simula la funcionalidad y el flujo de la aplicación o el sitio web.</p>
                    <ul style={{ listStyleType: 'disc' }}>
                        <li className="mb-10 ml-5">
                            <strong>Detalle:</strong> Un wireframe proporciona un nivel básico de detalle, mostrando la disposición de los elementos sin incluir contenido o estilos visuales complejos. En cambio, un prototipo incluye detalles más refinados, como imágenes, texto real y estilos visuales.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Funcionalidad:</strong> Un wireframe no es interactivo y no simula ninguna funcionalidad real más allá de la disposición de los elementos. Por otro lado, un prototipo permite a los usuarios interactuar con la interfaz y simula el flujo de la aplicación o el sitio web.
                        </li>
                    </ul>
                    <div id="1" className="h-[80px] mt-[-80px]"></div>

                    <h2 className="text-4xl md:text-5xl mb-10">¿Por qué son importantes los wireframes en el diseño de una página web?</h2>
                    <p className="mb-10">Los <Link className="text-custom-blue hover:underline" href="/wireframe/">wireframes</Link> son importantes en el diseño de una página web porque proporcionan una hoja de ruta visual para el diseño y desarrollo del sitio. Al establecer la estructura y la disposición de los elementos de la interfaz de manera clara y concisa, los wireframes ayudan a garantizar que el diseño final cumpla con los objetivos del proyecto y las necesidades del usuario. Además, permiten a los diseñadores y desarrolladores identificar y abordar problemas de usabilidad y navegación en las primeras etapas del proceso de diseño, lo que resulta en un producto final más sólido y fácil de usar.</p>
                    <div id="1" className="h-[80px] mt-[-80px]"></div>

                    <h2 className="text-4xl md:text-5xl mb-10">¿Cómo se crea un wireframe?</h2>
                    <p className="mb-10">La creación de un wireframe generalmente implica los siguientes pasos:</p>
                    <ul style={{ listStyleType: 'disc' }}>
                        <li className="mb-10 ml-5">
                            <strong>Reunir requisitos:</strong> Comprender los objetivos del proyecto, las necesidades del usuario y los requisitos funcionales.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Estructurar la información:</strong> Organizar el contenido y definir la jerarquía de la información que se mostrará en la interfaz.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Dibujar el boceto:</strong> Utilizar herramientas de diseño o lápiz y papel para crear una representación visual básica de la interfaz, centrándose en la disposición de los elementos y las funcionalidades clave.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Obtener retroalimentación:</strong> Compartir el wireframe con el equipo y los interesados para recibir comentarios y realizar ajustes según sea necesario.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Iterar:</strong> Refinar el wireframe en función de la retroalimentación recibida y repetir el proceso hasta que se logre una solución satisfactoria.
                        </li>
                    </ul>
                    <div id="1" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">¿Cuáles son las ventajas de utilizar wireframes en el proceso de diseño de una página web?</h2>
                    <p className="mb-10">Utilizar wireframes en el proceso de diseño de una página web ofrece varias ventajas significativas:</p>
                    <ul style={{ listStyleType: 'disc' }}>
                        <li className="mb-10 ml-5">
                            <strong>Claridad en la comunicación:</strong> Los <Link className="text-custom-blue hover:underline" href="/wireframe/">wireframes</Link> proporcionan una representación visual clara de la estructura y la disposición de la interfaz, lo que facilita la comunicación entre diseñadores, desarrolladores y partes interesadas.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Identificación temprana de problemas:</strong> Al crear wireframes, es posible identificar y abordar problemas de usabilidad y diseño en las primeras etapas del proceso, lo que ayuda a ahorrar tiempo y recursos en el desarrollo posterior.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Ahorro de tiempo y dinero:</strong> Planificar la estructura y la disposición de la interfaz con wireframes ayuda a evitar cambios significativos durante las etapas posteriores del desarrollo, lo que reduce los costos y el tiempo de entrega del proyecto.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Enfoque en la experiencia del usuario:</strong> Los <Link className="text-custom-blue hover:underline" href="/wireframe/">wireframes</Link> permiten a los diseñadores centrarse en la experiencia del usuario y la navegación del sitio sin distraerse por el contenido y los estilos visuales.
                        </li>
                    </ul>
                </div>
                <div className="lg:w-[30%] xl:ml-10 lg:ml-5 border border-black rounded-lg p-10 bg-[#FFF] lg:sticky lg:z-30 lg:top-24 lg:h-[50%] lg:mb-0 mb-10">
                    <h3 className="text-3xl mb-3 font-roobert font-semibold">
                        Comienza con nuestra plantilla
                    </h3>
                    <p className="text-lg text-zinc-600 mb-4 font-roobert">
                        Colabora en línea y reune tu equipo para crear prototipos de tu sitio web.
                    </p>
                    <Link href="/dashboard/">
                        <Button variant="auth" size="lg" className="text-lg">
                            Utilizar plantilla
                        </Button>
                    </Link>
                </div>
            </div>
            <div className="my-20">
                <HowToCreate
                    title="¿Cómo se crea un wireframe online?"
                    steps={steps}
                />
            </div>
            <TemplatesSlider />
            <FaqSection accordionData={faqData} sectionTitle="los wireframes" />
        </div >
    );
}

export default LandingPage;
