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
    title: "Plantillas de mapa mental gratuita | Sketchlie",
    description: "Crea un mapa mental con la plantilla personalizable de Sketchlie. Reune tu equipo y colabora en tiempo real en un lugar seguro y responsivo. ¡Comienza ahora!",
    keywords: ["mapa mental", "plantilla", "mapa mental plantilla", "mapa mental online", "mapa mental gratis", "mapa mental colaborativo", "mapa mental en línea", "mapa mental interactivo", "mapa mental creativo", "mapa mental para niños", "mapa mental para estudiantes", "mapa mental para trabajo", "mapa mental para proyectos", "mapa mental para presentaciones", "mapa mental para brainstorming", "mapa mental para planificación", "mapa mental para organización", "mapa mental para estudio", "mapa mental para resumen", "mapa mental para ideas", "mapa mental para diagrama", "mapa mental para visualización", "mapa mental para creatividad", "mapa mental para educación", "mapa mental para negocios", "mapa mental para marketing", "mapa mental para diseño", "mapa mental para desarrollo", "mapa mental para programación", "mapa mental para estrategia", "mapa mental para innovación", "mapa mental para análisis", "mapa mental para investigación", "mapa mental para planificación", "mapa mental para organización", "mapa mental para presentación", "mapa mental para estudio", "mapa mental para resumen", "mapa mental para ideas", "mapa mental para diagrama", "mapa mental para visualización", "mapa mental para creatividad", "mapa mental para educación", "mapa mental para negocios", "mapa mental para marketing", "mapa mental para diseño", "mapa mental para desarrollo", "mapa mental para programación", "mapa mental para estrategia", "mapa mental para innovación", "mapa mental para análisis", "mapa mental para investigación", "mapa mental para planificación", "mapa mental para organización", "mapa mental para presentación", "mapa mental para estudio", "mapa mental para resumen", "mapa mental para ideas", "mapa mental para diagrama", "mapa mental para visualización", "mapa mental para creatividad", "mapa mental para educación", "mapa mental para negocios", "mapa mental para marketing", "mapa mental para diseño", "mapa mental para desarrollo", "mapa mental para programación",],
    alternates: {
        canonical: "https://www.sketchlie.com/plantillas/mapa-mental/",
    }
};
const LandingPage = () => {
    const steps = [
        {
            trigger: "1. Selecciona un tema central",
            text: "Elige el tema o concepto principal que deseas explorar y colócalo en el centro de tu mapa mental."
        },
        {
            trigger: "2. Identifica conceptos clave",
            text: "Haz una lluvia de ideas para identificar y listar los conceptos o ideas principales relacionadas con el tema central."
        },
        {
            trigger: "3. Organiza los conceptos",
            text: "Organiza los conceptos de manera jerárquica, colocando los más generales cerca del centro y los más específicos en las ramas exteriores del mapa mental."
        },
        {
            trigger: "4. Conecta los conceptos",
            text: "Dibuja líneas o flechas para conectar los conceptos entre sí. Utiliza palabras clave o frases cortas para describir las relaciones."
        },
        {
            trigger: "5. Revisa y ajusta",
            text: "Revisa tu mapa mental para asegurarte de que sea claro y coherente. Añade colores, imágenes o iconos para mejorar la visualización y ajusta la estructura según sea necesario."
        }
    ];

    const faqData = [
        {
            value: "item-1",
            trigger: "¿Qué es un mapa mental?",
            content: "Un mapa mental es una representación gráfica que organiza información de manera visual. Utiliza nodos (conceptos o ideas) y conexiones (líneas) para mostrar cómo están relacionados entre sí."
        },
        {
            value: "item-2",
            trigger: "¿Cómo se utiliza un mapa mental?",
            content: "Los mapas mentales se utilizan para capturar y organizar ideas, facilitar la memorización y comprensión de conceptos complejos, y fomentar la creatividad en la planificación de proyectos y toma de decisiones."
        },
        {
            value: "item-3",
            trigger: "¿Cuáles son los beneficios de usar un mapa mental?",
            content: "Los beneficios incluyen mejorar la organización y comprensión de información, estimular la creatividad y el pensamiento lateral, y facilitar la planificación estratégica y la resolución de problemas."
        },
        {
            value: "item-4",
            trigger: "¿Qué herramientas online puedo usar para crear mapas mentales?",
            content: "Existen varias herramientas online como MindMeister, XMind, Coggle y Lucidchart que permiten crear, editar y colaborar en mapas mentales. Estas herramientas ofrecen plantillas y funciones para personalizar y compartir mapas."
        },
        {
            value: "item-5",
            trigger: "¿Dónde puedo encontrar plantillas de mapa mental?",
            content: (
                <span>Puedes encontrar plantillas de mapa mental en plataformas como Sketchlie, utiliza nuestra  <Link className="text-custom-blue hover:underline" href="/dashboard/">plantilla de mapa mental</Link> para acelerar el proceso de creación y personalización de tu mapa mental, o puedes optar por realizar tu propio diseño desde cero.</span>
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
                            <BreadcrumbPage>Mapa Mental</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <div className="xl:mt-[-30px] mb-14">
                <BlogStructure
                    title="Plantilla de mapa mental gratis"
                    description="La manera más rápida y sencilla de crear un mapa mental es utilizando una plantilla. Con nuestra plantilla de mapa mental, puedes organizar tus ideas, visualizar conceptos y estructurar información de manera clara y efectiva."
                    img="/templates/mapa-mental.png"
                    alt="Plantilla de Mapa Mental"
                    cta="Utilizar plantilla"
                />
            </div>
            <div className="flex flex-col-reverse lg:flex-row justify-between xl:mx-[10%] lg:mx-[7%] md:mx-[5%] mx-[5%] mt-5">
                <div className="lg:max-w-[70%] text-xl">
                    <p className="mb-10">Un <Link className="text-custom-blue hover:underline" href="/mapa-mental-online/">mapa mental</Link> es una herramienta gráfica que ayuda a organizar y visualizar información de manera creativa y estructurada. Se utiliza para brainstorming, planificación, toma de notas, estudio y resolución de problemas.</p>
                    <div id="1" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">1. ¿Qué es un mapa mental y para qué sirve?</h2>
                    <ul style={{ listStyleType: 'disc' }}>
                        <li className="mb-10 ml-5">
                            <strong>Definición: </strong>Un mapa mental es una representación visual de ideas, conceptos y conexiones entre ellos. Se estructura a partir de un tema central del cual se desprenden ramas con subtemas y detalles.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Usos: </strong>Los mapas mentales sirven para organizar información, estimular la creatividad, mejorar la memoria, facilitar la comprensión y planificar proyectos o procesos.
                        </li>
                    </ul>
                    <div id="2" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">2. ¿Cómo se hace un mapa mental?</h2>
                    <ul style={{ listStyleType: 'disc' }}>
                        <li className="mb-10 ml-5">
                            <strong>Centro: </strong>Empieza con un tema central o problema a resolver y escríbelo en el centro de la página.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Ramas: </strong>Dibuja ramas que salgan del centro y representen ideas principales o categorías relacionadas con el tema central.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Subramas: </strong>Añade subramas conectadas a las ramas principales para detallar información específica.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Imágenes y colores: </strong>Incorpora imágenes, colores y palabras clave para hacer el mapa mental más visual y memorable.
                        </li>
                    </ul>
                    <div id="3" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">3. ¿Cuáles son las ventajas de usar mapas mentales?</h2>
                    <ul style={{ listStyleType: 'disc' }}>
                        <li className="mb-10 ml-5">
                            <strong>Organización: </strong>Ayudan a organizar ideas de manera clara y jerárquica.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Creatividad: </strong>Fomentan la creatividad al permitir explorar conexiones no lineales entre conceptos.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Memoria: </strong>Facilitan la retención de información al emplear asociaciones visuales y palabras clave.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Productividad: </strong>Incrementan la productividad al simplificar la comprensión y planificación de tareas.
                        </li>
                    </ul>
                    <div id="4" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">4. ¿Quién inventó los mapas mentales?</h2>
                    <ul style={{ listStyleType: 'disc' }}>
                        <li className="mb-10 ml-5">
                            <strong>Origen: </strong>Los <Link className="text-custom-blue hover:underline" href="/mapa-mental-online/">mapas mentales</Link> fueron popularizados por Tony Buzan, un psicólogo y autor británico, en la década de 1970.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Innovación: </strong>Buzan desarrolló los mapas mentales como una técnica de aprendizaje basada en la creatividad y la asociación de ideas.
                        </li>
                    </ul>
                    <div id="5" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">5. ¿Cuál es el mejor software para crear mapas mentales?</h2>
                    <ul style={{ listStyleType: 'disc' }}>
                        <li className="mb-10 ml-5">
                            <strong>Opciones populares: </strong>Algunas opciones populares de software para crear mapas mentales incluyen MindMeister, XMind, y Coggle.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Características: </strong>Estos programas ofrecen características como colaboración en tiempo real, integración con otras aplicaciones y plantillas personalizables.
                        </li>
                    </ul>
                    <div id="6" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">6. ¿Cómo se diferencian los mapas mentales de otros tipos de diagramas?</h2>
                    <ul style={{ listStyleType: 'disc' }}>
                        <li className="mb-10 ml-5">
                            <strong>Estructura: </strong>Los mapas mentales se diferencias de otros tipos de diagramas como el <Link className="text-custom-blue hover:underline" href="/diagrama-de-flujo/">diagrama de flujo</Link> o del <Link className="text-custom-blue hover:underline" href="/diagrama-ishikawa/">diagrama de ishikawa</Link> por tener una estructura radial, con un tema central y ramas que se extienden hacia afuera.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Uso de colores e imágenes: </strong>Los mapas mentales suelen incorporar colores y elementos visuales para representar ideas y hacer el diagrama más atractivo y memorable.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Enfoque en la creatividad: </strong>A diferencia de otros diagramas más lineales y estructurados, los mapas mentales fomentan la creatividad y la asociación libre de ideas.
                        </li>
                    </ul>
                    <div id="7" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">7. ¿Cuáles son las aplicaciones prácticas de los mapas mentales en el ámbito educativo y profesional?</h2>
                    <ul style={{ listStyleType: 'disc' }}>
                        <li className="mb-10 ml-5">
                            <strong>Educación: </strong>En el ámbito educativo, los mapas mentales se utilizan para tomar notas, organizar información, preparar presentaciones y facilitar el estudio de temas complejos.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Profesional: </strong>En el ámbito profesional, los mapas mentales son herramientas útiles para la planificación de proyectos, la resolución de problemas, la toma de decisiones y la generación de ideas en reuniones o sesiones de trabajo colaborativo.
                        </li>
                    </ul>
                </div>
                <div className="lg:w-[30%] xl:ml-10 lg:ml-5 border border-black rounded-lg p-10 bg-[#FFF] lg:sticky lg:z-30 lg:top-24 lg:h-[50%] lg:mb-0 mb-10">
                    <h3 className="text-3xl mb-3 font-roobert font-semibold">
                        Comienza con nuestra plantilla
                    </h3>
                    <p className="text-lg text-zinc-600 mb-4 font-roobert">
                        Organiza tus ideas y hazlo con tu equipo de la manera más rápida y fácil posible.
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
                    title="¿Cómo se hace un mapa mental?"
                    steps={steps}
                />
            </div>
            <TemplatesSlider />
            <FaqSection accordionData={faqData} sectionTitle="los mapas mentales" />
        </div >
    );
}

export default LandingPage;
