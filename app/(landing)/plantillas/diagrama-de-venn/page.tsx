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
    title: "Diagrama de Venn Online | Plantillas Gratuitas | Sketchlie",
    description: "Crea diagramas de Venn online con nuestras plantillas gratuitas. Visualiza relaciones, comparaciones y conjuntos de datos de forma efectiva. ¡Empieza a colaborar en línea hoy!",
    keywords: ["diagrama de Venn", "diagrama de Venn plantilla", "diagrama de Venn online", "plantillas de diagrama de Venn gratuitas", "crear diagrama de Venn en línea"],
    alternates: {
        canonical: "https://www.sketchlie.com/plantillas/diagrama-de-venn/",
    }
};

const LandingPage = () => {
    
    const steps = [
        {
            trigger: "1. Identifica los conjuntos a comparar",
            text: "Determina los elementos o grupos que deseas representar en tu diagrama de Venn. Estos pueden ser conceptos, categorías o cualquier conjunto de datos que quieras comparar."
        },
        {
            trigger: "2. Elige una plantilla de diagrama de Venn",
            text: "Selecciona una plantilla de diagrama de Venn adecuada en Sketchlie. Puedes optar por un diagrama de dos, tres o más círculos según tus necesidades."
        },
        {
            trigger: "3. Personaliza tu diagrama de Venn online",
            text: "Utiliza las herramientas de edición online para personalizar los círculos, colores y texto de tu diagrama de Venn. Asegúrate de que cada conjunto esté claramente etiquetado."
        },
        {
            trigger: "4. Agrega los elementos a cada conjunto",
            text: "Coloca los elementos en las secciones correspondientes del diagrama. Los elementos compartidos entre conjuntos se ubican en las intersecciones."
        },
        {
            trigger: "5. Revisa y finaliza tu diagrama de Venn",
            text: "Verifica que todos los elementos estén correctamente ubicados y que las relaciones entre conjuntos sean claras. Ajusta según sea necesario y guarda tu diagrama de Venn online."
        }
    ];
    
    const faqData = [
        {
            value: "item-1",
            trigger: "¿Qué es un diagrama de Venn?",
            content: "Un diagrama de Venn es una representación visual que muestra las relaciones lógicas entre diferentes conjuntos de elementos. Utiliza círculos superpuestos para ilustrar similitudes, diferencias y conexiones entre grupos de datos o conceptos."
        },
        {
            value: "item-2",
            trigger: "¿Cómo se crea un diagrama de Venn online?",
            content: "Para crear un diagrama de Venn online, elige una plantilla en Sketchlie, personaliza los círculos y colores, agrega etiquetas para cada conjunto, y coloca los elementos en las secciones correspondientes. Nuestra herramienta online facilita la creación y edición de diagramas de Venn de forma intuitiva."
        },
        {
            value: "item-3",
            trigger: "¿Cuáles son los usos de un diagrama de Venn?",
            content: "Los diagramas de Venn se utilizan para comparar y contrastar grupos de información, visualizar relaciones entre conjuntos, analizar datos en matemáticas y estadísticas, organizar ideas en lluvia de ideas, y explicar conceptos complejos de manera visual en educación y presentaciones."
        },
        {
            value: "item-4",
            trigger: "¿Qué ventajas ofrece usar una plantilla de diagrama de Venn?",
            content: "Usar una plantilla de diagrama de Venn ahorra tiempo, asegura una estructura profesional, facilita la personalización rápida, y permite enfocarse en el contenido en lugar de en el diseño. Nuestras plantillas online son flexibles y se adaptan a diferentes necesidades y complejidades de diagramas."
        },
        {
            value: "item-5",
            trigger: "¿Cómo puedo compartir mi diagrama de Venn creado online?",
            content: "Después de crear tu diagrama de Venn en Sketchlie, puedes compartirlo fácilmente a través de un enlace, exportarlo como imagen o PDF, o integrarlo directamente en presentaciones y documentos. Nuestra plataforma online facilita la colaboración y el intercambio de diagramas de Venn con tu equipo o audiencia."
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
                            <BreadcrumbPage>Diagrama de Venn</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <div className="xl:mt-[-30px] mb-14">
                <BlogStructure
                    title="Plantillas de Diagrama de Venn Online"
                    description="Crea diagramas de Venn efectivos con nuestras plantillas online. Visualiza relaciones y compara conjuntos de datos de manera clara y profesional. Ideal para presentaciones, análisis y educación."
                    img="/templates/diagrama-de-venn.png"
                    alt="Plantilla de Diagrama de Venn Online"
                    cta="Crear Diagrama de Venn"
                />
            </div>
            <div className="flex flex-col-reverse lg:flex-row justify-between xl:mx-[10%] lg:mx-[7%] md:mx-[5%] mx-[5%] mt-5">
                <div className="lg:max-w-[70%] text-xl">
                    <div id="1" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">¿Qué es un diagrama de Venn?</h2>

                    <p className="mb-10">Un <Link className="text-custom-blue hover:underline" href="/diagrama-de-venn/">diagrama de Venn</Link> es una herramienta visual poderosa que utiliza círculos superpuestos para representar relaciones lógicas entre diferentes conjuntos de elementos. Este tipo de diagrama es especialmente útil para mostrar similitudes, diferencias y conexiones entre grupos de datos o conceptos de manera clara y concisa.</p>

                    <div id="2" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">Ventajas de usar un diagrama de Venn online</h2>

                    <ul style={{ listStyleType: 'disc' }}>
                        <li className="mb-10 ml-5">
                            <strong>Facilidad de creación:</strong> Las herramientas online como Sketchlie permiten crear diagramas de Venn de forma rápida y sencilla, sin necesidad de software especializado.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Colaboración en tiempo real:</strong> Trabaja en tu diagrama de Venn con tu equipo, permitiendo una colaboración fluida y eficiente.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Personalización flexible:</strong> Adapta fácilmente colores, tamaños y estilos para crear un diagrama de Venn que se ajuste perfectamente a tus necesidades.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Accesibilidad:</strong> Accede a tu diagrama de Venn desde cualquier dispositivo con conexión a internet, facilitando su edición y presentación en cualquier momento.
                        </li>
                    </ul>

                    <div id="3" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">Cómo usar nuestra plantilla de diagrama de Venn</h2>

                    <p className="mb-10">Nuestra plantilla de diagrama de Venn online está diseñada para ser intuitiva y fácil de usar. Sigue estos pasos para crear tu diagrama:</p>

                    <ol style={{ listStyleType: 'decimal' }}>
                        <li className="mb-10 ml-5">
                            <strong>Selecciona la plantilla:</strong> Elige entre nuestras variadas plantillas de diagrama de Venn según tus necesidades.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Personaliza los círculos:</strong> Ajusta el tamaño, color y posición de los círculos para representar tus conjuntos.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Añade etiquetas y texto:</strong> Utiliza nuestras herramientas de texto para etiquetar cada conjunto y añadir los elementos correspondientes.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Refina y finaliza:</strong> Revisa tu diagrama, realiza ajustes finales y guárdalo o compártelo directamente desde la plataforma.
                        </li>
                    </ol>

                    <div id="4" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">Aplicaciones del diagrama de Venn</h2>

                    <p className="mb-10">Los diagramas de Venn tienen múltiples aplicaciones en diversos campos:</p>

                    <ul style={{ listStyleType: 'disc' }}>
                        <li className="mb-10 ml-5">
                            <strong>Educación:</strong> Para explicar conceptos complejos y relaciones entre temas.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Negocios:</strong> En análisis de mercado, segmentación de clientes y planificación estratégica.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Ciencias:</strong> Para visualizar relaciones entre especies, compuestos químicos o fenómenos naturales.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Tecnología:</strong> En lógica de programación y diseño de bases de datos.
                        </li>
                    </ul>

                    <div id="5" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">Optimiza tu diagrama de Venn con Sketchlie</h2>

                    <p className="mb-10">Nuestra plataforma ofrece funcionalidades únicas para mejorar tus diagramas de Venn:</p>

                    <ul style={{ listStyleType: 'disc' }}>
                        <li className="mb-10 ml-5">
                            <strong>Plantillas prediseñadas:</strong> Comienza rápidamente con nuestras plantillas profesionales de diagrama de Venn.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Herramientas de edición avanzadas:</strong> Personaliza cada aspecto de tu diagrama para una presentación perfecta.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Colaboración en tiempo real:</strong> Trabaja con tu equipo simultáneamente en el mismo diagrama.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Exportación versátil:</strong> Comparte tu diagrama de Venn en múltiples formatos para su uso en presentaciones o documentos.
                        </li>
                    </ul>

                </div>
                <div className="lg:w-[30%] xl:ml-10 lg:ml-5 border border-black rounded-lg p-10 bg-white dark:bg-[#020817] lg:sticky lg:z-30 lg:top-24 lg:h-[50%] lg:mb-0 mb-10">
                    <h3 className="text-3xl mb-3 font-roobert font-semibold">
                        Crea tu diagrama de Venn online
                    </h3>
                    <p className="text-lg text-zinc-600 mb-4 font-roobert">
                        Visualiza relaciones, compara conjuntos y optimiza tu análisis con nuestra plantilla de diagrama de Venn online.
                    </p>
                    <Link href="/dashboard/">
                        <Button variant="auth" size="lg" className="text-lg">
                            Crear diagrama de Venn
                        </Button>
                    </Link>
                </div>
            </div>
            <div className="mt-10">
                <HowToCreate steps={steps} title="Cómo crear un diagrama de Venn online" img="/templates/diagrama-de-venn.png" alt="Diagrama de Venn Online" cta="Crear diagrama de Venn"/>
            </div>
            <TemplatesSlider />
            <FaqSection accordionData={faqData} sectionTitle="los diagramas de Venn"/>
        </div >
    );
}

export default LandingPage;