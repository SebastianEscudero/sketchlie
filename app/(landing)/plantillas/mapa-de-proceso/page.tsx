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
    title: "Plantillas gratuita de mapa de proceso | Sketchlie",
    description: "Mapea tu proceso con la plantilla de Sketchlie, puedes personalizar y invitar todo tu equipo para colaborar en tiempo real en tu mapa de proceso.",
    keywords: ["mapa de proceso", "plantilla de mapa de proceso", "mapa de proceso online", "mapa de proceso gratis", "mapa de proceso editable", "mapa de proceso colaborativo", "mapa de proceso en línea", "mapa de proceso interactivo", "mapa de proceso creativo", "mapa de proceso visual", "mapa de proceso digital", "mapa de proceso para imprimir", "mapa de proceso para descargar", "mapa de proceso para editar", "mapa de proceso para presentar", "mapa de proceso para compartir", "mapa de proceso para trabajar en equipo", "mapa de proceso para estudiantes", "mapa de proceso para profesores", "mapa de proceso para empresas", "mapa de proceso para organizaciones", "mapa de proceso para proyectos", "mapa de proceso para tareas", "mapa de proceso para planificación", "mapa de proceso para diagramar", "mapa de proceso para visualizar"],
    alternates: {
        canonical: "https://www.sketchlie.com/plantillas/mapa-de-proceso/",
    }
};
const LandingPage = () => {
    const steps = [
        {
            trigger: "1. Define el objetivo del mapa de proceso",
            text: "Determina claramente qué proceso deseas representar y cuál es el propósito del mapa de proceso. Esto asegura que el mapa sea relevante y útil para quienes lo utilizan."
        },
        {
            trigger: "2. Identifica las etapas principales del proceso",
            text: "Identifica y lista las etapas o fases clave del proceso que deseas documentar en el mapa. Estas etapas deben reflejar la secuencia lógica del proceso desde el inicio hasta el final."
        },
        {
            trigger: "3. Detalla las actividades y decisiones en cada etapa",
            text: "Para cada etapa identificada, describe las actividades específicas que ocurren y las decisiones que se toman. Esto ayudará a comprender cómo se desarrolla cada parte del proceso."
        },
        {
            trigger: "4. Establece las conexiones entre las etapas",
            text: "Dibuja conexiones claras y precisas que muestren cómo una etapa del proceso se conecta con la siguiente. Esto proporciona una visión holística del flujo general del proceso."
        },
        {
            trigger: "5. Revisa y valida el mapa de proceso",
            text: "Revisa el mapa de proceso con los stakeholders y usuarios relevantes para asegurarte de que todas las etapas, actividades y conexiones sean precisas y comprensibles. Realiza ajustes según sea necesario."
        }
    ];

    
    const faqData = [
        {
            value: "item-1",
            trigger: "¿Qué es un mapa de proceso?",
            content: "Un mapa de proceso es una representación visual que muestra las etapas y actividades de un proceso específico. Se utiliza para entender cómo funciona un proceso, identificar áreas de mejora y comunicar eficazmente los pasos involucrados."
        },
        {
            value: "item-2",
            trigger: "¿Cuáles son los beneficios de utilizar mapas de proceso?",
            content: "Los beneficios de los mapas de proceso incluyen la mejora de la eficiencia operativa, la identificación de cuellos de botella y áreas de mejora, la estandarización de procedimientos, y la comunicación clara de los pasos del proceso a todos los involucrados."
        },
        {
            value: "item-3",
            trigger: "¿Qué herramientas se pueden utilizar para crear mapas de proceso?",
            content: "Existen varias herramientas para crear mapas de proceso, como Microsoft Visio, Lucidchart, Bizagi, y Draw.io. Estas herramientas ofrecen funcionalidades específicas para dibujar diagramas de procesos de manera eficiente."
        },
        {
            value: "item-4",
            trigger: "¿Dónde puedo encontrar plantillas de mapas de proceso?",
            content: (
                <span>Sketchlie ofrece varias plantillas una de ellas siendo su <Link className="text-custom-blue hover:underline" href="/dashboard/">plantilla de mapa de proceso</Link> Esta plantilla proporcionará una estructura predefinida que puedes personalizar según tus necesidades específicas de proceso. </span>
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
                            <BreadcrumbPage>Mapa de Proceso</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <div className="xl:mt-[-30px] mb-14">
                <BlogStructure
                    title="Plantilla gratuita de mapa de procesos"
                    description="Dibuja el proceso de tu proyecto, empresa o tarea con nuestra plantilla de mapa de procesos. Personaliza, colabora y comparte en tiempo real con tu equipo."
                    img="/templates/mapa-de-proceso.png"
                    alt="Plantilla de Mapa de Proceso"
                    cta="Utilizar plantilla"
                />
            </div>
            <div className="flex flex-col-reverse lg:flex-row justify-between xl:mx-[10%] lg:mx-[7%] md:mx-[5%] mx-[5%] mt-5">
                <div className="lg:max-w-[70%] text-xl">
                    <div id="1" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">¿Qué es un mapa de proceso?</h2>

                    <p className="mb-10">Un <Link className="text-custom-blue hover:underline" href="/mapas-de-procesos/">mapa de proceso</Link> es una representación visual que muestra las diferentes etapas y actividades involucradas en un proceso específico dentro de una organización. Estos mapas son herramientas importantes en la gestión de procesos, ya que permiten comprender, analizar y mejorar la eficiencia y la calidad de un proceso. Los mapas de proceso pueden variar en complejidad, desde diagramas simples hasta representaciones más detalladas que incluyen información sobre roles, responsabilidades, recursos y tiempos.</p>


                    <div id="2" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">¿Para qué se utiliza un mapa de proceso?</h2>

                    <p className="mb-10">Un mapa de proceso se utiliza para varios propósitos, entre ellos:</p>

                    <ul style={{ listStyleType: 'disc' }}>
                        <li className="mb-10 ml-5">
                            <strong>Visualizar el proceso:</strong> Ayuda a comprender cómo se desarrolla un proceso y cómo interactúan sus diferentes componentes.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Identificar áreas de mejora:</strong> Permite identificar cuellos de botella, redundancias o ineficiencias en el proceso.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Comunicar y documentar:</strong> Sirve como una herramienta de comunicación que documenta claramente el flujo de trabajo para todas las partes interesadas.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Establecer estándares:</strong> Facilita el establecimiento de estándares para el proceso, lo que ayuda a mejorar la consistencia y la calidad.
                        </li>
                    </ul>

                    <div id="3" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">¿Cómo se crea un mapa de proceso?</h2>

                    <p className="mb-10">Crear un mapa de proceso generalmente implica los siguientes pasos:</p>

                    <ul style={{ listStyleType: 'disc' }}>
                        <li className="mb-10 ml-5">
                            <strong>Identificar el proceso:</strong> Definir claramente el alcance y los límites del proceso que se va a mapear.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Reunir datos:</strong> Recopilar información sobre las actividades, los recursos y los tiempos involucrados en el proceso.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Dibujar el mapa:</strong> Utilizar símbolos y diagramas para representar visualmente el flujo de trabajo, incluidas las decisiones, las bifurcaciones y los puntos de control.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Validar y mejorar:</strong> Revisar el mapa con las partes interesadas para garantizar su precisión y buscar formas de optimizar el proceso.
                        </li>
                    </ul>

                    <div id="4" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">¿Cuáles son los beneficios de usar mapas de proceso?</h2>

                    <p className="mb-10">Los mapas de proceso ofrecen una serie de beneficios importantes para las organizaciones:</p>

                    <ul style={{ listStyleType: 'disc' }}>
                        <li className="mb-10 ml-5">
                            <strong>Mejora de la eficiencia:</strong> Identifican áreas de desperdicio y permiten optimizar el flujo de trabajo.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Mayor calidad:</strong> Ayudan a estandarizar procesos y reducir errores y defectos.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Reducción de costos:</strong> Al eliminar actividades innecesarias o redundantes, se pueden reducir los costos operativos.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Mejora en la toma de decisiones:</strong> Proporcionan una comprensión clara del proceso, lo que facilita la identificación de áreas de mejora y la toma de decisiones informadas.
                        </li>
                    </ul>

                    <div id="5" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">¿Cuáles son los tipos de mapas de proceso?</h2>

                    <p className="mb-10">Existen varios tipos de <Link className="text-custom-blue hover:underline" href="/mapas-de-procesos/">mapas de proceso</Link>, cada uno adaptado a diferentes necesidades y niveles de detalle:</p>

                    <ul style={{ listStyleType: 'disc' }}>
                        <li className="mb-10 ml-5">
                            <strong>Diagrama de flujo:</strong> Representa el flujo secuencial de actividades en un proceso.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Diagrama de flujo de trabajo:</strong> Muestra el flujo de trabajo de un proceso, incluidas las tareas y las interacciones entre las personas o sistemas.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Mapa SIPOC:</strong> Identifica los Proveedores, Insumos, Procesos, Salidas y Clientes involucrados en un proceso.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Mapa de proceso de valor:</strong> Se centra en identificar actividades que agregan valor para el cliente y elimina las que no lo hacen.
                        </li>
                    </ul>
                    <div id="6" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">¿Cuál es la diferencia entre un mapa de proceso y un diagrama de flujo?</h2>

                    <p className="mb-10">Aunque ambos son herramientas de visualización, hay diferencias clave entre un <Link className="text-custom-blue hover:underline" href="/mapas-de-procesos/">mapa de proceso</Link> y un <Link className="text-custom-blue hover:underline" href="/diagrama-de-flujo/">diagrama de flujo</Link>:</p>

                    <ul style={{ listStyleType: 'disc' }}>
                        <li className="mb-10 ml-5">
                            <strong>Alcance:</strong> Un mapa de proceso se centra en representar un proceso específico de principio a fin, mientras que un diagrama de flujo puede ser más general y abarcar múltiples procesos o actividades.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Nivel de detalle:</strong> Los mapas de proceso tienden a ser más detallados e incluyen información sobre roles, responsabilidades y recursos, mientras que los diagramas de flujo pueden ser más simples y mostrar solo el flujo de actividades.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Enfoque:</strong> Los mapas de proceso a menudo se utilizan en la mejora y la gestión de procesos, mientras que los diagramas de flujo pueden ser utilizados en una variedad de contextos, como la representación de algoritmos o el diseño de sistemas.
                        </li>
                    </ul>

                </div>
                <div className="lg:w-[30%] xl:ml-10 lg:ml-5 border border-black rounded-lg p-10 bg-white lg:sticky lg:z-30 lg:top-24 lg:h-[50%] lg:mb-0 mb-10">
                    <h3 className="text-3xl mb-3 font-roobert font-semibold">
                        Comienza con nuestra plantilla
                    </h3>
                    <p className="text-lg text-zinc-600 mb-4 font-roobert">
                        Mapea tu proceso y hazlo con todo tu equipo, en un lugar seguro responsivo y para colaborar.
                    </p>
                    <Link href="/dashboard/">
                        <Button variant="auth" size="lg" className="text-lg">
                            Utilizar plantilla
                        </Button>
                    </Link>
                </div>
            </div>
            <div className="mt-10">
                <HowToCreate steps={steps} title="¿Cómo se crea un mapa de procesos?" img="/templates/mapa-de-proceso.png" alt="Mapa de procesos" cta="Crear mapa de procesos"/>
            </div>
            <TemplatesSlider />
            <FaqSection accordionData={faqData} sectionTitle="los mapas de procesos" />
        </div>
    );
}

export default LandingPage;
