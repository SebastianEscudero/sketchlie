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
    title: "Plantilla de diagrama de ishikawa gratuita | Sketchlie",
    description: "Crea un diagrama de ishikawa en línea con nuestra plantilla gratuita. Visualiza las causas y efectos de un problema de manera clara y efectiva.",
    keywords: ["plantilla", "diagrama de ishikawa", "causas y efectos", "problema", "plantilla gratuita", "diagrama de ishikawa en línea", "plantilla de diagrama de ishikawa", "plantilla de diagrama de ishikawa gratuita", "plantilla de diagrama de ishikawa en línea"],
    alternates: {
        canonical: "https://www.sketchlie.com/plantillas/diagrama-ishikawa/",
    }
};
const LandingPage = () => {
    const steps = [
        {
            trigger: "1. Identifica el problema central",
            text: "Define claramente el problema o efecto que deseas analizar y colócalo en la cabeza del diagrama de Ishikawa."
        },
        {
            trigger: "2. Identifica las categorías principales",
            text: "Identifica y enumera las categorías principales que podrían estar contribuyendo al problema (por ejemplo, personas, procesos, materiales, máquinas, entorno)."
        },
        {
            trigger: "3. Enumera las causas potenciales",
            text: "Bajo cada categoría, enumera todas las posibles causas que podrían contribuir al problema identificado."
        },
        {
            trigger: "4. Analiza y organiza las causas",
            text: "Analiza cada causa identificada para determinar su relevancia y relación con el problema. Organiza las causas de manera que muestren claramente sus interacciones y relaciones."
        },
        {
            trigger: "5. Finaliza y revisa",
            text: "Finaliza el diagrama de Ishikawa asegurándote de que todas las causas relevantes estén incluidas y revisa el diagrama con el equipo para validar y obtener perspectivas adicionales."
        }
    ];

    const faqData = [
        {
            value: "item-1",
            trigger: "¿Qué es un diagrama de Ishikawa?",
            content: "Un diagrama de Ishikawa, también conocido como diagrama de espina de pescado o diagrama de causa y efecto, es una herramienta visual utilizada para identificar y organizar las causas potenciales de un problema o efecto específico."
        },
        {
            value: "item-2",
            trigger: "¿Cómo se utiliza un diagrama de Ishikawa?",
            content: "Se utiliza colocando el problema o efecto en la cabeza del diagrama y categorizando las posibles causas bajo categorías principales como personas, procesos, materiales, máquinas y entorno. Esto facilita el análisis y la identificación de las causas raíz del problema."
        },
        {
            value: "item-3",
            trigger: "¿Cuáles son los beneficios de usar un diagrama de Ishikawa?",
            content: "Los beneficios incluyen la identificación sistemática de las causas potenciales de un problema, facilitando el trabajo en equipo y la comunicación, y permitiendo soluciones efectivas y preventivas."
        },
        {
            value: "item-4",
            trigger: "¿Dónde puedo encontrar plantillas de diagrama de Ishikawa?",
            content: "Puedes encontrar plantillas de diagrama de Ishikawa en herramientas como Lucidchart, Canva y Microsoft Office. Estas plantillas proporcionan un punto de partida para crear diagramas personalizados según tus necesidades específicas."
        },
        {
            value: "item-5",
            trigger: "¿Cómo puedo hacer un diagrama de Ishikawa efectivo?",
            content: (
                <span>Puedes encontrar plantillas del diagrama de ishikawa en plataformas como Sketchlie, utiliza nuestra  <Link className="text-custom-blue hover:underline" href="/dashboard/">plantilla de diagrama de espina</Link> para identificar problemas/causas y crear soluciones efectivas que mejoren el flujo de tu empresa.</span>
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
                            <BreadcrumbPage>Diagrama Ishikawa</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <div className="xl:mt-[-30px] mb-14">
                <BlogStructure
                    title="Plantilla de diagrama de ishikawa"
                    description="Analiza la causa y efecto de un problema con un diagrama de ishikawa, esencial para la mejora continua y la resolución de problemas. Utiliza nuestra plantilla gratuita para poder acelerar tu flujo de trabajo."
                    img="/templates/diagrama-ishikawa.png"
                    alt="Plantilla de Diagrama de Ishikawa"
                    cta="Utilizar plantilla"
                />
            </div>
            <div className="flex flex-col-reverse lg:flex-row justify-between xl:mx-[10%] lg:mx-[7%] md:mx-[5%] mx-[5%] mt-5">
                <div className="lg:max-w-[70%] text-xl">
                    <div id="1" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">¿Qué es un diagrama de Ishikawa?</h2>

                    <p className="mb-10">Un <Link className="text-custom-blue hover:underline" href="/diagrama-ishikawa/">diagrama de ishikawa</Link>, también conocido como diagrama de espina de pescado o diagrama de causa y efecto, es una herramienta utilizada para identificar y visualizar las posibles causas de un problema o efecto específico. Fue desarrollado por Kaoru Ishikawa en la década de 1960 y es ampliamente utilizado en la gestión de la calidad y la resolución de problemas. El diagrama se estructura con una línea principal que representa el problema o efecto en el extremo derecho y varias ramas que representan las categorías de posibles causas.</p>

                    <div id="2" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">¿Cuál es el propósito de un diagrama de Ishikawa?</h2>

                    <ul style={{ listStyleType: 'disc' }}>
                        <li className="mb-10 ml-5">
                            <strong>Identificar causas potenciales:</strong> El propósito principal de un diagrama de Ishikawa es identificar todas las posibles causas que podrían contribuir a un problema o efecto específico. Esto ayuda a comprender la complejidad del problema y a abordarlo de manera más efectiva.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Visualizar relaciones:</strong> Al visualizar las causas potenciales en un diagrama, se pueden identificar relaciones y patrones entre ellas, lo que facilita la comprensión de cómo interactúan diferentes factores para producir el efecto observado.
                        </li>
                    </ul>

                    <div id="3" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">¿Cómo se crea un diagrama de Ishikawa?</h2>

                    <p className="mb-10">Para crear un diagrama de Ishikawa, primero se debe definir claramente el problema o efecto que se está investigando. Luego, se dibuja una línea horizontal que representa el problema en el extremo derecho de una hoja de papel o pizarra. A partir de esta línea, se dibujan varias ramas que representan categorías de posibles causas, como personas, procesos, materiales, entorno, etc. A continuación, se identifican y se escriben todas las posibles causas bajo las categorías correspondientes.</p>

                    <div id="4" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">¿Cuáles son las ventajas de usar un diagrama de Ishikawa?</h2>

                    <ul style={{ listStyleType: 'disc' }}>
                        <li className="mb-10 ml-5">
                            <strong>Análisis exhaustivo:</strong> Permite un análisis exhaustivo de todas las posibles causas de un problema, lo que ayuda a evitar soluciones superficiales o parciales.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Comunicación efectiva:</strong> Facilita la comunicación entre los miembros del equipo al proporcionar una representación visual clara de las causas potenciales y sus relaciones.
                        </li>
                    </ul>

                    <div id="5" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">¿Cuándo se debe usar un diagrama de Ishikawa?</h2>

                    <p className="mb-10">Un <Link className="text-custom-blue hover:underline" href="/diagrama-ishikawa/">diagrama de ishikawa</Link> es útil en situaciones donde se necesita identificar y comprender las causas de un problema o efecto. Se puede utilizar en diversas áreas, como la fabricación, la salud, los servicios, etc. Se recomienda su uso cuando se enfrenta a problemas complejos que requieren un análisis detallado de las causas subyacentes para encontrar soluciones efectivas.</p>

                    <div id="6" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">¿Cómo se utiliza un diagrama de Ishikawa en la resolución de problemas?</h2>

                    <p className="mb-10">El diagrama de Ishikawa es una herramienta efectiva para la resolución de problemas porque ayuda a estructurar el proceso de análisis y a identificar soluciones potenciales. Aquí hay algunos pasos comunes para utilizar un diagrama de Ishikawa en la resolución de problemas:</p>

                    <ul style={{ listStyleType: 'disc' }}>
                        <li className="mb-10 ml-5">
                            <strong>Definir el problema:</strong> Identificar claramente el problema o efecto que se está investigando y establecer su impacto en el proceso o resultado deseado.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Crear el diagrama:</strong> Dibujar el diagrama de Ishikawa con la línea principal representando el problema y las ramas que representan las posibles categorías de causas.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Identificar causas potenciales:</strong> Con la participación del equipo, identificar todas las posibles causas que podrían contribuir al problema y escribirlas en el diagrama.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Análisis de las causas:</strong> Analizar cada causa potencial para determinar su relevancia y contribución al problema.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Desarrollar soluciones:</strong> Una vez identificadas las causas principales, desarrollar y priorizar soluciones para abordarlas.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Implementar y monitorear:</strong> Implementar las soluciones seleccionadas y monitorear su efectividad en la resolución del problema.
                        </li>
                    </ul>
                    <div id="7" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">¿Cuál es la historia detrás del diagrama de Ishikawa?</h2>

                    <p className="mb-10">El <Link className="text-custom-blue hover:underline" href="/diagrama-ishikawa/">diagrama de ishikawa</Link>, también conocido como diagrama de espina de pescado o diagrama de causa y efecto, fue desarrollado por el Dr. Kaoru Ishikawa, un ingeniero japonés y experto en control de calidad, en la década de 1960. Ishikawa era un defensor ferviente de la calidad total y fue una figura influyente en el desarrollo de la gestión de la calidad en Japón después de la Segunda Guerra Mundial.</p>

                    <p className="mb-10">El desarrollo del diagrama de Ishikawa se basó en la idea de que entender las causas de un problema es esencial para su resolución efectiva. Ishikawa adoptó un enfoque sistémico para identificar y abordar las causas fundamentales de los problemas en los procesos de fabricación. Se inspiró en las prácticas de gestión de calidad de otros expertos, como el estadístico W. Edwards Deming y el filósofo de la calidad Joseph Juran, así como en las técnicas de diagramación utilizadas en la gestión de proyectos.</p>

                    <p className="mb-10">El diagrama de Ishikawa se convirtió en una herramienta fundamental en la gestión de la calidad y la resolución de problemas en todo el mundo. Su enfoque en identificar y visualizar las causas potenciales de un problema ha demostrado ser invaluable en una variedad de industrias y contextos, desde la fabricación hasta los servicios de salud y más allá.</p>

                </div>
                <div className="lg:w-[30%] xl:ml-10 lg:ml-5 border border-black rounded-lg p-10 bg-white dark:bg-[#020817] lg:sticky lg:z-30 lg:top-24 lg:h-[50%] lg:mb-0 mb-10">
                    <h3 className="text-3xl mb-3 font-roobert font-semibold">
                        Comienza con nuestra plantilla
                    </h3>
                    <p className="text-lg text-zinc-600 mb-4 font-roobert">
                        Identifica las causas y efectos de un problema designado con nuestra plantilla de diagrama de ishikawa.
                    </p>
                    <Link href="/dashboard/">
                        <Button variant="auth" size="lg" className="text-lg">
                            Utilizar plantilla
                        </Button>
                    </Link>
                </div>
            </div>
            <div className="mt-10">
                <HowToCreate steps={steps} title="¿Cómo se crea un diagrama ishikawa?" img="/templates/diagrama-ishikawa.png" alt="Diagrama Ishikawa" cta="Crear diagrama"/>
            </div>
            <TemplatesSlider />
            <FaqSection accordionData={faqData} sectionTitle="los diagramas de espina de pescado" />
        </div >
    );
}

export default LandingPage;
