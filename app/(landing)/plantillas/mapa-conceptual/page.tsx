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
    title: "Plantillas gratuita de mapa conceptual | Sketchlie",
    description: "La plantilla de mapa conceptual de Sketchlie es una herramienta visual que te ayuda a organizar y representar ideas de manera clara y concisa. Utiliza nuestra plantilla gratuita para crear mapas conceptuales para proyectos de diseño, desarrollo, educación y más.",
    keywords: ["plantilla de mapa conceptual", "mapa conceptual", "plantilla gratuita", "mapa conceptual en línea"],
    alternates: {
        canonical: "https://www.sketchlie.com/plantillas/mapa-conceptual/",
    }
};
const LandingPage = () => {

    const steps = [
        {
            trigger: "1. Selecciona un Enfoque Central",
            text: "Identifica el tema o la pregunta principal que deseas explorar y colócalo en el centro de tu mapa conceptual."
        },
        {
            trigger: "2. Identifica los Conceptos Clave",
            text: "Haz una lluvia de ideas para listar todos los conceptos importantes relacionados con el tema central. Agrupa conceptos similares."
        },
        {
            trigger: "3. Organiza los Conceptos",
            text: "Organiza los conceptos desde el más general al más específico en una estructura jerárquica. Coloca los conceptos más generales cerca del centro y los más específicos en la periferia."
        },
        {
            trigger: "4. Conecta los Conceptos",
            text: "Dibuja líneas entre los conceptos y utiliza palabras enlace para describir las relaciones entre ellos. Asegúrate de que cada línea tenga una etiqueta que explique cómo los conceptos están conectados."
        },
        {
            trigger: "5. Revisa y Ajusta",
            text: "Revisa tu mapa conceptual para asegurarte de que todas las conexiones son claras y lógicas. Añade detalles adicionales o ejemplos si es necesario y ajusta la estructura según sea necesario para mejorar la claridad."
        }
    ];
    

    const faqData = [
        {
            value: "item-1",
            trigger: "¿Qué es un mapa conceptual?",
            content: "Un mapa conceptual es una herramienta visual que organiza y representa información. Utiliza nodos (conceptos) y enlaces (relaciones) para mostrar la conexión entre ideas. Es especialmente útil para comprender y recordar grandes cantidades de información compleja."
        },
        {
            value: "item-2",
            trigger: "¿Cuáles son los beneficios de usar mapas conceptuales?",
            content: "Los beneficios de los mapas conceptuales incluyen: mejorar la comprensión y la retención de la información, facilitar el aprendizaje visual, promover el pensamiento crítico, y ayudar a identificar relaciones complejas entre conceptos. Son útiles tanto en la educación como en el ámbito empresarial para planificar, organizar ideas y resolver problemas."
        },
        {
            value: "item-3",
            trigger: "¿Qué herramientas en línea puedo usar para crear mapas conceptuales?",
            content: (
                <span>Existen varias herramientas en línea para crear mapas conceptuales, en Sketchlie ofrecemos un tablero infinito donde puedes colaborar en tiempo real, parte con nuestra <Link className="text-custom-blue hover:underline" href="/dashboard/">plantilla de mapa conceptual</Link> o parte desde cero.</span>
            )
        },
        {
            value: "item-4",
            trigger: "¿Cómo se usan los mapas conceptuales en la educación?",
            content: "En la educación, los mapas conceptuales se utilizan para ayudar a los estudiantes a organizar y estructurar nuevos conocimientos, relacionar información previa con nueva, planificar proyectos de escritura, y crear guías de estudio. Los maestros pueden usarlos para planificar el currículo, evaluar la comprensión de los estudiantes, y explicar ideas complejas."
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
                            <BreadcrumbPage>Mapa Conceptual</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <div className="xl:mt-[-30px] mb-14">
                <BlogStructure
                    title="Plantilla de mapa conceptual gratis"
                    description="Haz que tus ideas cobren vida con nuestra plantilla de mapa conceptual gratuita. Organiza y representa tus pensamientos de manera clara y concisa para proyectos de diseño, desarrollo, educación y más."
                    img="/templates/mapa-conceptual.png"
                    alt="Plantilla de Mapa Conceptual"
                    cta="Utilizar plantilla"
                />
            </div>
            <div className="flex flex-col-reverse lg:flex-row justify-between xl:mx-[10%] lg:mx-[7%] md:mx-[5%] mx-[5%] mt-5">
                <div className="lg:max-w-[70%] text-xl">
                    <div id="1" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">¿Qué es un mapa conceptual?</h2>

                    <p className="mb-10">Un <Link className="text-custom-blue hover:underline" href="/mapa-conceptual/">mapa conceptual</Link> es una herramienta gráfica que se utiliza para organizar y representar el conocimiento de manera visual. Consiste en un diagrama que muestra conceptos y sus relaciones jerárquicas o de asociación. Estos conceptos se conectan mediante líneas o flechas que indican la relación entre ellos. Los mapas conceptuales son útiles para organizar información, facilitar la comprensión de conceptos complejos y promover el aprendizaje significativo.</p>


                    <div id="1" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">¿Cuáles son los elementos de un mapa conceptual?</h2>

                    <ul style={{ listStyleType: 'disc' }}>
                        <li className="mb-10 ml-5">
                            <strong>Conceptos:</strong> Son las ideas principales que se representan en el mapa conceptual. Pueden ser palabras, frases o imágenes que describen un tema o un conjunto de información.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Conexiones:</strong> Son las líneas o flechas que unen los conceptos y representan las relaciones entre ellos, como jerarquías, asociaciones o secuencias.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Palabras de enlace:</strong> Son términos que se utilizan para conectar conceptos y establecer relaciones más claras entre ellos, como causa, efecto, es parte de, entre otros.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Proposiciones:</strong> Son enunciados que describen la relación entre dos o más conceptos dentro del mapa conceptual.
                        </li>
                    </ul>


                    <div id="1" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">¿Cómo se hace un mapa conceptual?</h2>

                    <p className="mb-10">Para crear un mapa conceptual, sigue estos pasos:</p>

                    <ul style={{ listStyleType: 'disc' }}>
                        <li className="mb-10 ml-5">
                            <strong>Identifica el tema:</strong> Determina el tema principal que deseas representar en el mapa conceptual.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Elabora una lista de conceptos:</strong> Enumera los conceptos clave relacionados con el tema y organízalos de manera jerárquica.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Establece conexiones:</strong> Une los conceptos utilizando líneas o flechas y etiqueta cada conexión con una palabra de enlace que describa la relación.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Añade ejemplos:</strong> Incorpora ejemplos o detalles que ilustren cada concepto y su relación dentro del mapa conceptual.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Revisa y ajusta:</strong> Revisa tu mapa conceptual para asegurarte de que refleje de manera clara y precisa la información, y realiza los ajustes necesarios.
                        </li>
                    </ul>


                    <div id="1" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">¿Cuál es la importancia de los mapas conceptuales en el aprendizaje?</h2>

                    <p className="mb-10">Los mapas conceptuales son herramientas poderosas en el proceso de aprendizaje por varias razones:</p>

                    <ul style={{ listStyleType: 'disc' }}>
                        <li className="mb-10 ml-5">
                            <strong>Organizan la información:</strong> Ayudan a estructurar y organizar la información de manera clara y visual, lo que facilita su comprensión y retención.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Fomentan la comprensión profunda:</strong> Promueven el aprendizaje significativo al requerir que los estudiantes relacionen los conceptos entre sí y con su conocimiento previo.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Facilitan la conexión de ideas:</strong> Permiten identificar las relaciones entre diferentes conceptos, lo que ayuda a los estudiantes a ver el panorama general y a comprender cómo se relacionan los conceptos entre sí.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Promueven la creatividad:</strong> Al ser herramientas flexibles y personalizables, los mapas conceptuales estimulan la creatividad y permiten a los estudiantes expresar sus ideas de manera única.
                        </li>
                    </ul>


                    <div id="1" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">¿Cuál es la diferencia entre un mapa conceptual y un diagrama de flujo?</h2>

                    <p className="mb-10">Aunque ambos son diagramas que representan información de manera visual, hay diferencias clave entre un <Link className="text-custom-blue hover:underline" href="/mapa-conceptual/">mapa conceptual</Link> y un <Link className="text-custom-blue hover:underline" href="/diagrama-de-flujo/">diagrama de flujo</Link>:</p>

                    <ul style={{ listStyleType: 'disc' }}>
                        <li className="mb-10 ml-5">
                            <strong>Naturaleza de la información:</strong> Los mapas conceptuales representan ideas y conceptos, mientras que los diagramas de flujo muestran procesos y secuencias de acciones.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Enfoque:</strong> Los mapas conceptuales se centran en las relaciones entre conceptos y en la comprensión del tema, mientras que los diagramas de flujo se centran en la representación visual de pasos o decisiones en un proceso.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Uso de símbolos:</strong> Los mapas conceptuales suelen utilizar palabras y conexiones simples, mientras que los diagramas de flujo emplean símbolos específicos para representar acciones, decisiones, inicio y fin de un proceso, entre otros.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Flexibilidad:</strong> Los mapas conceptuales son más flexibles y permiten una representación más amplia de ideas y relaciones, mientras que los diagramas de flujo
                        </li>
                    </ul>
                    <div id="1" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">¿Cuál es la diferencia entre un mapa conceptual y un mapa mental?</h2>

                    <p className="mb-10">Aunque ambos son herramientas de visualización de ideas, existen diferencias significativas entre un mapa conceptual y un <Link className="text-custom-blue hover:underline" href="/mapa-mental-online/">mapa mental</Link>:</p>

                    <ul style={{ listStyleType: 'disc' }}>
                        <li className="mb-10 ml-5">
                            <strong>Organización:</strong> Los mapas conceptuales tienden a tener una estructura jerárquica, con conceptos principales y subordinados, mientras que los mapas mentales suelen ser más radiales, con una idea central y ramificaciones no jerárquicas.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Complejidad:</strong> Los mapas conceptuales pueden representar relaciones más complejas entre conceptos, mientras que los mapas mentales son más simples y están diseñados para capturar ideas de manera rápida y libre.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Uso de palabras clave:</strong> Los mapas conceptuales suelen utilizar palabras clave o frases cortas para representar conceptos, mientras que los mapas mentales pueden incorporar palabras, imágenes, colores y símbolos de manera más libre.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Propósito:</strong> Los mapas conceptuales son ideales para organizar y comprender conceptos complejos, mientras que los mapas mentales son más útiles para generar ideas, planificar proyectos y tomar notas rápidas.
                        </li>
                    </ul>


                    <div id="1" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">¿Cuáles son las ventajas de utilizar mapas conceptuales en el ámbito educativo?</h2>

                    <p className="mb-10">La utilización de mapas conceptuales en el ámbito educativo ofrece numerosas ventajas tanto para estudiantes como para docentes:</p>

                    <ul style={{ listStyleType: 'disc' }}>
                        <li className="mb-10 ml-5">
                            <strong>Facilitan el aprendizaje activo:</strong> Los mapas conceptuales fomentan la participación activa de los estudiantes en la construcción y organización del conocimiento.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Promueven la reflexión:</strong> Al requerir que los estudiantes identifiquen relaciones entre conceptos, los mapas conceptuales estimulan la reflexión y el pensamiento crítico.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Adaptabilidad:</strong> Los mapas conceptuales pueden adaptarse a diferentes estilos de aprendizaje y niveles de conocimiento, lo que los hace adecuados para diversas disciplinas y niveles educativos.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Mejoran la retención de información:</strong> La representación visual y organizada de la información en los mapas conceptuales facilita su comprensión y retención a largo plazo.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Promueven la colaboración:</strong> Los mapas conceptuales pueden ser utilizados de forma colaborativa en actividades grupales, lo que fomenta el trabajo en equipo y el intercambio de ideas entre los estudiantes.
                        </li>
                    </ul>

                </div>
                <div className="lg:w-[30%] xl:ml-10 lg:ml-5 border border-black rounded-lg p-10 bg-white dark:bg-[#020817] lg:sticky lg:z-30 lg:top-24 lg:h-[50%] lg:mb-0 mb-10">
                    <h3 className="text-3xl mb-3 font-roobert font-semibold">
                        Comienza con nuestra plantilla
                    </h3>
                    <p className="text-lg text-zinc-600 mb-4 font-roobert">
                        Reune tu equipo y colabora en tiempo real
                    </p>
                    <Link href="/dashboard/">
                        <Button variant="auth" size="lg" className="text-lg">
                            Utilizar plantilla
                        </Button>
                    </Link>
                </div>
            </div>
            <div className="mt-10">
                <HowToCreate steps={steps} title="¿Cómo crear un mapa conceptual?" img="/templates/mapa-conceptual.png" alt="Mapa conceptual" cta="Crear mapa conceptual"/>
            </div>
            <TemplatesSlider />
            <FaqSection accordionData={faqData} sectionTitle="los mapas conceptuales"/>
        </div >
    );
}

export default LandingPage;
