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
    title: "Plantillas gratuitas de diagrama de flujo | Sketchlie",
    description: "Utiliza nuestras plantillas de diagramas de flujo para visualizar procesos, identificar cuellos de botella y optimizar la eficiencia de tu equipo. ¡Empieza a colaborar en línea hoy!",
    keywords: ["plantillas de diagrama de flujo", "plantillas de diagrama", "plantillas de diagrama de flujo gratuitas", "plantillas de diagrama en línea", "plantillas de diagrama de flujo en línea", "plantillas de diagrama de flujo para colaboración en línea"],
    alternates: {
        canonical: "https://www.sketchlie.com/plantillas/diagrama-de-flujo/",
    }
};
const LandingPage = () => {
    
    const steps = [
        {
            trigger: "1. Define el propósito del diagrama",
            text: "Determina qué proceso deseas representar y cuál es el objetivo de crear el diagrama de flujo. Identifica los puntos de inicio y fin del proceso."
        },
        {
            trigger: "2. Reúne información",
            text: "Consulta con las partes interesadas para recopilar todos los pasos y decisiones involucrados en el proceso. Asegúrate de tener una comprensión completa del proceso antes de comenzar a diagramar."
        },
        {
            trigger: "3. Selecciona un formato o plantilla",
            text: "Elige una plantilla de diagrama de flujo adecuada o comienza con un lienzo en blanco. Herramientas en línea como Lucidchart, Mural y Canva ofrecen plantillas útiles para empezar."
        },
        {
            trigger: "4. Dibuja el diagrama",
            text: "Utiliza símbolos estándar para representar los diferentes tipos de acciones y decisiones en tu proceso. Conecta estos símbolos con flechas para mostrar la secuencia del flujo. Asegúrate de que el diagrama sea claro y fácil de seguir."
        },
        {
            trigger: "5. Revisa y valida el diagrama",
            text: "Revisa el diagrama de flujo con las partes interesadas para asegurar que todos los pasos estén correctamente representados y que el diagrama sea preciso. Haz ajustes según sea necesario y actualiza el diagrama conforme cambie el proceso."
        }
    ];
    
    

    const faqData = [
        {
            value: "item-1",
            trigger: "¿Qué es un diagrama de flujo?",
            content: "Un diagrama de flujo es una representación visual de los pasos y decisiones involucrados en un proceso. Utiliza símbolos y flechas para mostrar el flujo del proceso, facilitando la comprensión y comunicación de cómo funciona un sistema o proceso."
        },
        {
            value: "item-2",
            trigger: "¿Cuáles son los elementos básicos de un diagrama de flujo?",
            content: "Los elementos básicos de un diagrama de flujo incluyen puntos de inicio y fin, pasos del proceso, puntos de decisión, conectores o flechas que muestran el flujo del proceso y anotaciones o descripciones adicionales para proporcionar contexto."
        },
        {
            value: "item-3",
            trigger: "¿Cómo se crea un diagrama de flujo?",
            content: "Para crear un diagrama de flujo, primero identifica el proceso a representar y define sus puntos de inicio y fin. Luego, desglosa el proceso en pasos simples, usa símbolos para cada paso y conecta estos símbolos con flechas para mostrar el flujo. Finalmente, revisa y valida el diagrama con los stakeholders para asegurarte de su precisión."
        },
        {
            value: "item-4",
            trigger: "¿Cuáles son los usos de un diagrama de flujo?",
            content: "Los diagramas de flujo se usan para mapear y documentar procesos, analizar y optimizar flujos de trabajo, apoyar en la toma de decisiones, planificar y gestionar proyectos, desarrollar software y diseñar sistemas. Son herramientas versátiles aplicables en muchas áreas para mejorar la comprensión y la comunicación."
        },
        {
            value: "item-5",
            trigger: "¿Cuáles son las ventajas y desventajas de usar un diagrama de flujo?",
            content: "Las ventajas de los diagramas de flujo incluyen la visualización de procesos complejos, mejora de la comunicación y comprensión entre los miembros del equipo, identificación de cuellos de botella y facilitación de mejoras en el proceso. Las desventajas pueden incluir la posibilidad de simplificar en exceso los procesos complejos y el tiempo requerido para crearlos y mantenerlos actualizados."
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
                            <BreadcrumbPage>Diagrama de Flujo</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <div className="xl:mt-[-30px] mb-14">
                <BlogStructure
                    title="Plantillas de diagrama de flujo"
                    description="Desarrolla una ruta clara y eficiente para tus procesos con nuestras plantillas de diagramas de flujo. Nuestras plantillas te ayudarán a visualizar y comunicar tus ideas de manera efectiva."
                    img="/templates/diagrama-de-flujo.png"
                    alt="Plantilla de Diagrama de flujo"
                    cta="Utilizar plantilla"
                />
            </div>
            <div className="flex flex-col-reverse lg:flex-row justify-between xl:mx-[10%] lg:mx-[7%] md:mx-[5%] mx-[5%] mt-5">
                <div className="lg:max-w-[70%] text-xl">
                    <div id="1" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">¿Qué es un diagrama de flujo?</h2>

                    <p className="mb-10">Un <Link className="text-custom-blue hover:underline" href="/diagrama-de-flujo/">diagrama de flujo</Link> es una representación visual de los pasos secuenciales necesarios para realizar un proceso o resolver un problema. Se compone de diferentes formas geométricas conectadas por flechas que indican la dirección del flujo. Cada forma representa una acción específica o un estado dentro del proceso, mientras que las flechas muestran la secuencia en la que se llevan a cabo esas acciones. Los diagramas de flujo son herramientas ampliamente utilizadas en diversas industrias, como la ingeniería, la informática, la programación y la gestión de proyectos, para visualizar, analizar y mejorar procesos.</p>

                    <div id="2" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">¿Para qué se utiliza un diagrama de flujo?</h2>

                    <ul style={{ listStyleType: 'disc' }}>
                        <li className="mb-10 ml-5">
                            <strong>Visualización:</strong> Los diagramas de flujo proporcionan una representación visual clara de un proceso, lo que facilita la comprensión de sus etapas y flujos de trabajo.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Análisis:</strong> Son útiles para identificar áreas de mejora, cuellos de botella y redundancias en un proceso, lo que permite optimizar la eficiencia y la productividad.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Comunicación:</strong> Facilitan la comunicación entre diferentes equipos y departamentos al proporcionar una representación visual común de un proceso.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Documentación:</strong> Sirven como herramientas de documentación para registrar procesos y procedimientos de manera clara y concisa.
                        </li>
                    </ul>

                    <div id="3" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">¿Cuáles son los símbolos utilizados en un diagrama de flujo?</h2>

                    <p className="mb-10">Los símbolos utilizados en un diagrama de flujo representan diferentes elementos dentro de un proceso. Algunos de los símbolos más comunes incluyen:</p>

                    <ul style={{ listStyleType: 'disc' }}>
                        <li className="mb-10 ml-5">
                            <strong>Rectángulos:</strong> Representan pasos o acciones dentro del proceso.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Óvalos:</strong> Indican el inicio o el final del proceso.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Rombos:</strong> Se utilizan para decisiones, donde el proceso puede tomar diferentes caminos.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Flechas:</strong> Conectan los diferentes símbolos y muestran la dirección del flujo.
                        </li>
                    </ul>

                    <div id="4" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">¿Cómo se crea un diagrama de flujo?</h2>

                    <p className="mb-10">Para crear un diagrama de flujo, sigue estos pasos:</p>

                    <ol style={{ listStyleType: 'decimal' }}>
                        <li className="mb-10 ml-5">
                            <strong>Identifica el proceso:</strong> Determina qué proceso deseas representar y qué pasos implica.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Selecciona los símbolos:</strong> Elige los símbolos adecuados para representar cada paso, decisión o acción.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Dibuja el diagrama:</strong> Utiliza papel y lápiz o software de diagramación para dibujar el diagrama de flujo, colocando los símbolos en orden secuencial y conectándolos con flechas.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Revisa y mejora:</strong> Revisa el diagrama para asegurarte de que sea claro y preciso. Realiza ajustes según sea necesario para mejorar la claridad y la eficacia.
                        </li>
                    </ol>

                    <div id="5" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">¿Cuáles son los tipos de diagramas de flujo?</h2>

                    <p className="mb-10">Existen varios tipos de diagramas de flujo, cada uno con un propósito específico:</p>

                    <ul style={{ listStyleType: 'disc' }}>
                        <li className="mb-10 ml-5">
                            <strong>Diagrama de flujo de proceso:</strong> Representa la secuencia de pasos en un proceso.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Diagrama de flujo de trabajo:</strong> Muestra el flujo de trabajo entre diferentes personas, departamentos o equipos.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Diagrama de flujo de datos:</strong> Ilustra el movimiento de datos a través de un sistema o proceso.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Diagrama de flujo de programación:</strong> Representa la lógica de un algoritmo o programa.
                        </li>
                    </ul>
                    <div id="6" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">Beneficios de hacer diagramas de flujo</h2>

                    <p className="mb-10">Los diagramas de flujo ofrecen una serie de beneficios que pueden mejorar la eficiencia y la efectividad de un proceso o proyecto. Algunos de estos beneficios incluyen:</p>

                    <ul style={{ listStyleType: 'disc' }}>
                        <li className="mb-10 ml-5">
                            <strong>Claridad:</strong> Proporcionan una representación visual clara de un proceso, lo que facilita la comprensión de sus etapas y flujos de trabajo.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Análisis:</strong> Ayudan a identificar áreas de mejora, cuellos de botella y redundancias en un proceso, lo que permite optimizar la eficiencia y la productividad.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Comunicación:</strong> Facilitan la comunicación entre diferentes equipos y departamentos al proporcionar una representación visual común de un proceso.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Documentación:</strong> Sirven como herramientas de documentación para registrar procesos y procedimientos de manera clara y concisa.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Identificación de problemas:</strong> Permiten identificar rápidamente posibles problemas o puntos débiles en un proceso, lo que facilita su corrección antes de que se conviertan en problemas mayores.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Facilitan la toma de decisiones:</strong> Al visualizar claramente los pasos y las opciones disponibles en un proceso, los diagramas de flujo ayudan a tomar decisiones informadas y eficaces.
                        </li>
                    </ul>

                </div>
                <div className="lg:w-[30%] xl:ml-10 lg:ml-5 border border-black rounded-lg p-10 bg-white dark:bg-[#020817] lg:sticky lg:z-30 lg:top-24 lg:h-[50%] lg:mb-0 mb-10">
                    <h3 className="text-3xl mb-3 font-roobert font-semibold">
                        Comienza con nuestra plantilla
                    </h3>
                    <p className="text-lg text-zinc-600 mb-4 font-roobert">
                        Analiza tus procesos, mejora tus chokepoints y optimiza tus eventos, todo con nuestra plantilla de diagrama de flujo.
                    </p>
                    <Link href="/dashboard/">
                        <Button variant="auth" size="lg" className="text-lg">
                            Utilizar plantilla
                        </Button>
                    </Link>
                </div>
            </div>
            <div className="mt-10">
                <HowToCreate steps={steps} title="¿Cómo se crea un diagrama de flujo?" img="/templates/diagrama-de-flujo.png" alt="Diagrama de flujo" cta="Crear diagrama de flujo"/>
            </div>
            <TemplatesSlider />
            <FaqSection accordionData={faqData} sectionTitle="los diagramas de flujo"/>
        </div >
    );
}

export default LandingPage;
