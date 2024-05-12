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

export const metadata: Metadata = {
    title: "Creador de diagramas y plantillas gratuitas | Sketchlie",
    description: "Crea diagramas en línea de forma gratuita con Sketchlie. Utiliza nuestras plantillas de customer journey map, diagrama de flujo, diagrama de Gantt y más para visualizar tus ideas y proyectos. ¡Comienza a dibujar ahora!",
    keywords: ["diagramas", "plantillas", "diagrama de flujo", "diagrama de Gantt", "customer journey map", "mapa mental", "organigrama", "diagrama de Venn", "diagrama de red", "diagrama de PERT", "diagrama de Ishikawa", "diagrama de PEST", "diagrama de causa y efecto", "diagrama de secuencia", "diagrama de proceso", "diagrama de UML"],
    alternates: {
        canonical: "https://www.sketchlie.com/plantillas/diagrama/",
    }
};
const LandingPage = () => {
    return (
        <div>
            <div className="mt-[3%] xl:mx-[10%] lg:mx-[7%] md:mx-[5%] mx-[3%]">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <Link href="/">Home</Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <Link href="/plantillas/">Plantillas</Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Diagrama</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <div className="mt-[-70px]">
                <BlogStructure
                    title="Plantillas gratuitas de diagrama"
                    description="Utiliza nuestras plantillas de diagramas, diagramas de flujo y diagramas de ishikawa para mejorar tu flujo de trabajo y fomentar la colaboración en línea con tus compañeros."
                    img="/templates/diagrama.png"
                    alt="Plantilla de Diagrama"
                    cta="Utilizar plantilla"
                />
            </div>
            <div className="flex flex-col-reverse lg:flex-row justify-between mt-[3%] xl:mx-[10%] lg:mx-[7%] md:mx-[5%] mx-[3%]">
                <div className="lg:max-w-[70%] text-xl">
                    <div id="1" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">¿Qué es un Diagrama?</h2>
                    <p className="mb-10">Los <Link href="/diagrama/" className="text-custom-blue hover:underline">diagramas</Link> son representaciones visuales de información que ayudan a organizar ideas, procesos y datos de manera clara y efectiva. En el mundo digital, especialmente en entornos de colaboración en línea como Sketchlie, los diagramas se convierten en herramientas esenciales para comunicar conceptos complejos, planificar proyectos y fomentar la creatividad en equipo.</p>
                    <p className="mb-10">En Sketchlie, ofrecemos una variedad de plantillas de diagramas que se adaptan a diversas necesidades y escenarios de colaboración. Desde diagramas de flujo hasta organigramas y mapas mentales, nuestras plantillas están diseñadas para facilitar la visualización y la comunicación de ideas en tiempo real, lo que permite a los equipos trabajar de manera más eficiente y productiva.</p>
                    <div id="2" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">Beneficios de Utilizar Diagramas en Línea</h2>

                    <p className="mb-10">Al integrar diagramas en tu proceso de colaboración en línea, puedes disfrutar de una serie de beneficios significativos:</p>

                    <ul style={{ listStyleType: 'disc' }}>
                        <li className="mb-10 ml-5">
                            <strong>Claridad Visual:</strong> Los diagramas ayudan a simplificar ideas complejas y datos abrumadores al presentarlos de manera visual y estructurada.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Colaboración en Tiempo Real:</strong> Con las herramientas de colaboración en línea como Sketchlie, varios usuarios pueden trabajar juntos en un diagrama simultáneamente, fomentando la co-creación y la retroalimentación instantánea.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Facilita la Comprensión:</strong> Los diagramas permiten a los miembros del equipo comprender rápidamente conceptos y procesos, lo que agiliza la toma de decisiones y la resolución de problemas.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Organización Eficiente:</strong> Con la capacidad de agregar, mover y conectar elementos fácilmente, los diagramas en línea ayudan a organizar información de manera más efectiva que los métodos tradicionales.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Accesibilidad y Portabilidad:</strong> Al estar alojados en la nube, los diagramas en línea son accesibles desde cualquier lugar y en cualquier momento, lo que facilita la colaboración remota y el trabajo en movilidad.
                        </li>
                    </ul>

                    <div id="3" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">Usos Comunes de Nuestras Plantillas de Diagramas</h2>

                    <p className="mb-10">Nuestras plantillas de diagramas versátiles pueden adaptarse a una amplia gama de casos de uso en entornos de colaboración en línea. Algunos ejemplos comunes incluyen:</p>

                    <ul style={{ listStyleType: 'disc' }}>
                        <li className="mb-10 ml-5">
                            <strong>Planificación de Proyectos:</strong> Utiliza diagramas de Gantt y diagramas de flujo para visualizar el cronograma y los procesos de tu proyecto, identificando posibles cuellos de botella y optimizando la asignación de recursos.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Brainstorming Creativo:</strong> Los <Link href="/mapa-mental-online/" className="text-custom-blue hover:underline">mapas mentales</Link> y los diagramas de <Link href="/lluvia-de-ideas/" className="text-custom-blue hover:underline">lluvia de ideas</Link> son herramientas ideales para generar y organizar ideas de forma colaborativa, estimulando la creatividad y la innovación.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Análisis de Datos:</strong> Utiliza diagramas de Venn y diagramas de dispersión para visualizar relaciones entre conjuntos de datos y patrones estadísticos, facilitando la interpretación y la toma de decisiones informadas.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Presentaciones Visuales:</strong> Convierte datos y conceptos complejos en presentaciones visuales atractivas y fáciles de entender utilizando diagramas de barras, gráficos circulares y otros tipos de diagramas.
                        </li>
                    </ul>
                    <div id="4" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">¿Cómo puedo empezar a usar diagramas en línea para colaborar con mi equipo?</h2>
                    <p className="mb-10">En sketchlie tenemos variadas plantillas de diagramas estan incluyen: plantilla de <Link href="/plantillas//diagrama-ishikawa/" className="text-custom-blue hover:underline">diagrama de ishikawa</Link>, plantilla de <Link href="/plantillas/diagrama-de-flujo/" className="text-custom-blue hover:underline">diagrama de flujo</Link>. Elige la que necesites, invita a tu equipos y empieza a colaborar en línea de la manera más fácil posible.</p>
                    <p className="mb-10">Para empezar a utilizar diagramas en línea con tu equipo, sigue estos sencillos pasos:</p>

                    <ul style={{ listStyleType: 'disc' }}>
                        <li className="mb-10 ml-5">
                            <strong>Elige la plataforma adecuada:</strong> Busca una plataforma de colaboración en línea que ofrezca herramientas de diagramación integradas, como Sketchlie, que facilita la creación y el trabajo en equipo en diagramas en tiempo real.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Selecciona la plantilla apropiada:</strong> Explora las plantillas de diagramas disponibles y elige la que mejor se adapte a tu proyecto o necesidad de colaboración.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Invita a tu equipo:</strong> Invita a los miembros de tu equipo a unirse al espacio de trabajo y colaborar en el diagrama en tiempo real. Asegúrate de asignar roles y permisos adecuados para una colaboración fluida.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Empieza a crear y colaborar:</strong> Comienza a agregar contenido al diagrama y colabora con tu equipo en tiempo real. Aprovecha las herramientas de edición y comentarios para mejorar y refinir el diagrama juntos.
                        </li>
                    </ul>
                    <div id="5" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">¿Cuáles son las mejores prácticas para la colaboración efectiva en diagramas en línea?</h2>
                    <p className="mb-10">La colaboración efectiva en diagramas en línea requiere una combinación de comunicación clara, organización estructurada y trabajo en equipo coordinado. Aquí hay algunas mejores prácticas que puedes seguir:</p>

                    <ul style={{ listStyleType: 'disc' }}>
                        <li className="mb-10 ml-5">
                            <strong>Establece roles y responsabilidades:</strong> Define claramente quién es responsable de qué partes del diagrama y asigna roles y permisos en consecuencia.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Comunica de manera efectiva:</strong> Utiliza herramientas de comentarios y chat integradas para discutir cambios, hacer preguntas y resolver problemas en tiempo real.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Mantén la estructura:</strong> Organiza el diagrama de manera lógica y coherente, utilizando colores, formas y etiquetas para distinguir diferentes elementos y procesos.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Realiza revisiones periódicas:</strong> Programa sesiones de revisión regulares para evaluar el progreso del diagrama, identificar áreas de mejora y realizar ajustes según sea necesario.
                        </li>
                    </ul>
                </div>
                <div className="lg:w-[30%] xl:ml-10 lg:ml-5 border border-black rounded-lg p-10 bg-[#FFF] lg:sticky lg:z-30 lg:top-24 lg:h-[50%] lg:mb-0 mb-10">
                    <h3 className="text-3xl mb-3 font-roobert font-semibold">
                        Comienza con nuestra plantilla
                    </h3>
                    <p className="text-lg text-zinc-600 mb-4 font-roobert">
                        Utiliza nuestra plantilla de diagrama visualizar mejorar y optimizar tus procesos.
                    </p>
                    <Link href="/dashboard/">
                        <Button variant="auth" size="lg" className="text-lg">
                            Utilizar plantilla
                        </Button>
                    </Link>
                </div>
            </div>
            <TemplatesSlider />
        </div >
    );
}

export default LandingPage;
