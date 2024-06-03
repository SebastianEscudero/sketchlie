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
    title: "¿Qué es un diagrama de flujo? Técnicas y beneficios | Sketchlie",
    description: "Descubre cómo la Diagrama de Flujo en línea puede mejorar la colaboración y la creatividad de tu equipo. Aprende sobre las técnicas, beneficios y tipos de mapas conceptuales con Sketchlie.",
    keywords: ["diagrama de flujo", "colaboración en línea", "diagrama de flujo online"],
    alternates: {
        canonical: "https://www.sketchlie.com/diagrama-de-flujo/que-es-diagrama-de-flujo/",
    }
};

const LandingPage = () => {
    return (
        <div className="xl:mx-[5%] lg:mx-[4%] md:mx-[3%] mx-[3%]">
            <div className="mt-[3%]">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <Link href="/">Home</Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <Link href="/diagrama-de-flujo/">Diagrama de Flujo</Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>¿Qué es un Diagrama de Flujo?</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <div className="md:flex mt-10 items-center justify-between">
                <h1 className="lg:text-6xl md:text-5xl text-4xl md:px-5 md:text-left text-center" style={{ lineHeight: "1.2" }}>
                    Diagrama de Flujo
                </h1>
                <Image
                    src="/placeholders/mapa-conceptual.png"
                    alt="Diagrama de Flujo"
                    width={1920}
                    height={1080}
                    className="rounded-2xl border border-black md:max-w-[60%] md:mt-0 mt-10"
                />
            </div>
            <div className="flex flex-col-reverse lg:flex-row justify-between mt-[3%]">
                <div className="lg:max-w-[70%] text-xl">
                    <div id="1" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">¿Qué es un Diagrama de Flujo?</h2>
                    <p className="mb-10">Un diagrama de flujo es una representación visual de un proceso o algoritmo. En esencia, es una secuencia de pasos ordenados que se presentan mediante símbolos gráficos para ilustrar la secuencia de decisiones que se toman para resolver un problema o ejecutar una tarea específica. Estos diagramas son una herramienta poderosa en diversos campos, desde la ingeniería y la programación hasta la gestión de proyectos y la educación.</p>
                    <p className="mb-10">Los diagramas de flujo son utilizados para describir de manera clara y concisa la secuencia de acciones necesarias para completar una tarea o alcanzar un objetivo específico. Al presentar visualmente el flujo de trabajo, estos <Link className="text-custom-blue hover:underline" href="/diagrama/">diagramas</Link> facilitan la comprensión y la comunicación entre individuos o equipos.</p>
                    <p className="mb-10">En <Link className="text-custom-blue hover:underline" href="/">Sketchlie</Link>, entendemos la importancia de los diagramas de flujo en la colaboración y la resolución de problemas. Puedes crear y compartir tus propios diagramas de flujo en nuestra plataforma, colaborando con tu equipo en tiempo real y aprovechando las herramientas intuitivas de dibujo y anotación.</p>
                    <div id="2" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">Cómo se utilizan los Diagramas de Flujo</h2>
                    <p className="mb-10">Los diagramas de flujo son una herramienta versátil que se utiliza en una variedad de contextos. Aquí hay algunas formas comunes en las que se utilizan:</p>
                    <ul style={{ listStyleType: 'disc' }}>
                        <li className="mb-10 ml-5">
                            <strong>Desarrollo de Software:</strong> En el desarrollo de software, los diagramas de flujo se utilizan para visualizar el proceso de un algoritmo o un programa, lo que facilita la comprensión del flujo de datos y la lógica del programa.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Gestión de Proyectos:</strong> En la gestión de proyectos, los diagramas de flujo ayudan a identificar las etapas clave del proyecto, las dependencias entre tareas y los posibles cuellos de botella, lo que permite una planificación más eficiente y una mejor asignación de recursos.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Procesos de Negocio:</strong> En el ámbito empresarial, los diagramas de flujo se utilizan para modelar y optimizar los procesos comerciales, identificando áreas de mejora y posibles puntos de fallo.
                        </li>
                    </ul>
                    <p className="mb-10">En Sketchlie, puedes utilizar los diagramas de flujo para cualquier fin que se adapte a tus necesidades. Desde planificar el desarrollo de un nuevo producto hasta optimizar los procesos de tu empresa, nuestra plataforma te brinda las herramientas necesarias para crear diagramas de flujo de manera colaborativa y eficiente.</p>
                    <h2 className="text-4xl md:text-5xl mb-10">¿Cuál es el objetivo principal de los Diagramas de Flujo?</h2>
                    <p className="mb-10">El principal objetivo de un <Link className="text-custom-blue hover:underline" href="/diagrama-de-flujo/">diagrama de flujo</Link> es representar de manera visual y clara el flujo de un proceso, sistema o algoritmo. Al hacerlo, se facilita la comprensión de la secuencia de pasos necesarios para completar una tarea o alcanzar un objetivo específico.</p>
                    <p className="mb-10">Además de proporcionar una representación visual del flujo de trabajo, los diagramas de flujo también tienen como objetivo identificar posibles áreas de mejora, optimizar procesos y facilitar la comunicación entre individuos o equipos involucrados en un proyecto.</p>
                    <p className="mb-10">En resumen, el objetivo principal de un diagrama de flujo es mejorar la comprensión, la eficiencia y la colaboración en torno a un proceso o tarea determinada.</p>
                    <div id="3" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">Cómo hacer un Diagrama de Flujo</h2>
                    <p className="mb-10">Crear un diagrama de flujo puede parecer una tarea complicada, pero con las herramientas adecuadas y un enfoque estructurado, puedes elaborar uno de manera sencilla. Aquí hay algunos pasos básicos para hacer un diagrama de flujo:</p>
                    <ol style={{ listStyleType: 'decimal' }}>
                        <li className="mb-10 ml-5">
                            <strong>Definir el proceso:</strong> Antes de comenzar a dibujar el diagrama, es importante tener una comprensión clara del proceso que se va a representar. Identifica los pasos clave y las decisiones involucradas en el proceso.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Seleccionar símbolos:</strong> Elige los símbolos y las formas que mejor representen cada paso del proceso. Los símbolos comunes incluyen rectángulos para acciones, rombos para decisiones y flechas para el flujo direccional.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Dibujar el diagrama:</strong> Utiliza una herramienta de dibujo, ya sea en papel o en un software especializado como la <Link className="text-custom-blue hover:underline" href="/pizarra-online/">pizarra online</Link> de Sketchlie, para crear el diagrama de flujo. Asegúrate de conectar los símbolos de manera lógica y clara.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Revisar y refinar:</strong> Una vez que hayas completado el diagrama, revísalo para asegurarte de que sea preciso y comprensible. Realiza los ajustes necesarios para mejorar la claridad y la coherencia del diagrama.
                        </li>
                    </ol>
                    <p className="mb-10">En Sketchlie, puedes seguir estos pasos para crear tus propios diagramas de flujo de manera rápida y sencilla. Nuestra plataforma te ofrece una amplia gama de herramientas de dibujo y símbolos predefinidos para facilitar el proceso de creación.</p>
                    <div id="4" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">Tipos de Técnicas de Diagramas de Flujo</h2>
                    <p className="mb-10">Existen varios tipos de técnicas de diagramas de flujo, cada una con sus propias características y aplicaciones específicas. Algunos de los tipos más comunes incluyen:</p>

                    <ul style={{ listStyleType: 'disc' }}>
                        <li className="mb-10 ml-5">
                            <strong>Diagrama de Flujo Secuencial:</strong> Este tipo de diagrama de flujo muestra el proceso en una secuencia lineal, donde cada paso se ejecuta en orden. Es útil para representar procesos simples y lineales.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Diagrama de Flujo de Decisión:</strong> En este tipo de diagrama, se utilizan símbolos de decisión (rombos) para representar puntos de decisión en el proceso. Dependiendo de la condición, el flujo se dirige hacia diferentes caminos.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Diagrama de Flujo Funcional:</strong> Este tipo de <Link className="text-custom-blue hover:underline" href="/diagrama/">diagramas</Link> se centra en las funciones o actividades realizadas en un proceso, mostrando cómo se relacionan entre sí. Es útil para comprender la estructura y la interacción de las funciones dentro de un sistema.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Diagrama de Flujo de Datos:</strong> En este tipo de diagrama, se representa el flujo de datos a través de un sistema, mostrando cómo se transforma y se procesa la información. Es útil para modelar sistemas de información y bases de datos.
                        </li>
                    </ul>
                    <p className="mb-10">Cada tipo de técnica de <Link className="text-custom-blue hover:underline" href="/diagrama-de-flujo/">diagrama de flujo</Link> tiene sus propias ventajas y se adapta mejor a ciertos tipos de procesos o sistemas. En Sketchlie, puedes elegir entre una variedad de plantillas prediseñadas que se ajusten a tus necesidades específicas, ya sea que estés creando un diagrama de flujo secuencial simple o un diagrama de flujo más complejo con múltiples decisiones y funciones.</p>
                    <div id="5" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">Tipos de Diagramas de Flujo</h2>
                    <p className="mb-10">Además de las técnicas de diagramación, existen diferentes tipos de diagramas de flujo que se utilizan para representar diversos procesos y sistemas. Algunos de los tipos más comunes incluyen:</p>
                    <ul style={{ listStyleType: 'disc' }}>
                        <li className="mb-10 ml-5">
                            <strong>Diagrama de Flujo de Proceso:</strong> Este tipo de diagrama muestra el flujo de actividades en un proceso específico, desde el inicio hasta la finalización. Es útil para visualizar y analizar el flujo de trabajo en un proceso determinado.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Diagrama de Flujo de Datos:</strong> En este tipo de diagrama, se representa el flujo de datos a través de un sistema o proceso, mostrando cómo se transforma y se utiliza la información. Es útil para modelar sistemas de información y comunicación.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Diagrama de Flujo de Programa:</strong> Este tipo de diagrama se utiliza en la programación para representar el flujo de control de un programa, mostrando la secuencia de instrucciones y decisiones. Es útil para diseñar, depurar y documentar algoritmos y programas.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Diagrama de Flujo de Datos de Entidad:</strong> En este tipo de diagrama, se representa la estructura y las relaciones entre las entidades en un sistema de información, incluyendo bases de datos y sistemas de información. Es útil para diseñar y documentar bases de datos y sistemas de información.
                        </li>
                    </ul>
                    <p className="mb-10">Cada tipo de diagrama de flujo tiene sus propias características y se utiliza en diferentes contextos y disciplinas. En Sketchlie, puedes acceder a una amplia variedad de plantillas de diagramas de flujo que cubren diferentes tipos y usos, permitiéndote crear diagramas personalizados para tus necesidades específicas.</p>
                    <div id="6" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">Historia del Diagrama de Flujo</h2>
                    <p className="mb-10">Los diagramas de flujo tienen una larga historia que se remonta al siglo XIX, cuando fueron utilizados por primera vez en la ingeniería y la gestión de procesos. Uno de los primeros sistemas de diagramación fue desarrollado por el ingeniero Frank Gilbreth, quien lo utilizó para analizar y mejorar los procesos de manufactura en la industria.</p>
                    <p className="mb-10">Durante el siglo XX, los diagramas de flujo se popularizaron aún más con el advenimiento de la informática y la programación. Se convirtieron en una herramienta estándar en el diseño y la documentación de algoritmos y programas de computadora, facilitando la comprensión y la comunicación entre los desarrolladores y los usuarios.</p>
                    <p className="mb-10">En la era digital actual, los diagramas de flujo han evolucionado con el desarrollo de software especializado y herramientas en línea que facilitan su creación y colaboración. En <Link className="text-custom-blue hover:underline" href="/">Sketchlie</Link>, estamos comprometidos a seguir innovando en el campo de los diagramas de flujo, brindando a nuestros usuarios las herramientas más avanzadas para la creación y colaboración en diagramas de flujo.</p>
                    <div id="7" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">Para qué sirve un Diagrama de Flujo</h2>
                    <p className="mb-10">Los diagramas de flujo tienen una variedad de aplicaciones y beneficios en diferentes áreas y disciplinas. Algunos de los usos más comunes incluyen:</p>
                    <ul style={{ listStyleType: 'disc' }}>
                        <li className="mb-10 ml-5">
                            <strong>Visualizar Procesos:</strong> Los diagramas de flujo permiten visualizar y comprender de manera clara y concisa los procesos y procedimientos, identificando pasos, decisiones y flujos de trabajo.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Análisis de Procesos:</strong> Son útiles para analizar y optimizar procesos, identificando áreas de mejora, cuellos de botella y redundancias en el flujo de trabajo.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Documentación:</strong> Los diagramas de flujo son una forma efectiva de documentar procesos y procedimientos, proporcionando una referencia visual que puede ser utilizada para capacitación, comunicación y auditoría.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Comunicación:</strong> Facilitan la comunicación entre diferentes equipos y partes interesadas al proporcionar una representación visual clara y concisa de un proceso o sistema.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Planificación de Proyectos:</strong> Se utilizan en la planificación y gestión de proyectos para identificar tareas, secuencias y dependencias, ayudando a asignar recursos y establecer plazos.
                        </li>
                    </ul>
                    <p className="mb-10">En resumen, los diagramas de flujo son una herramienta versátil y poderosa que se utiliza en una variedad de contextos para visualizar, analizar y comunicar procesos y sistemas. En Sketchlie, puedes aprovechar al máximo esta herramienta colaborativa, creando y compartiendo diagramas de flujo con tu equipo de manera eficiente y efectiva.</p>
                    <div id="8" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">Beneficios de Crear Diagramas de Flujo</h2>
                    <p className="mb-10">La creación de diagramas de flujo ofrece una serie de beneficios tanto a nivel individual como organizacional. Algunos de los principales beneficios incluyen:</p>
                    <ul style={{ listStyleType: 'disc' }}>
                        <li className="mb-10 ml-5">
                            <strong>Claridad y Comprensión:</strong> Los diagramas de flujo proporcionan una representación visual clara y concisa de un proceso, facilitando la comprensión y la comunicación entre individuos o equipos.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Identificación de Mejoras:</strong> Permiten identificar áreas de mejora y optimización en un proceso, ayudando a aumentar la eficiencia y reducir los tiempos de ejecución.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Colaboración:</strong> Facilitan la colaboración entre equipos al permitir la creación y edición colaborativa de diagramas de flujo en tiempo real, independientemente de la ubicación geográfica.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Documentación y Referencia:</strong> Sirven como una herramienta de documentación y referencia para procesos y procedimientos, proporcionando una guía visual que puede ser utilizada para capacitación y auditoría.
                        </li>
                    </ul>
                    <p className="mb-10">En Sketchlie, reconocemos los beneficios de crear diagramas de flujo y nos comprometemos a proporcionar a nuestros usuarios las herramientas necesarias para aprovechar al máximo esta poderosa herramienta de colaboración y comunicación.</p>
                    <div id="9" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10"> Consejos para Crear un Diagrama de Flujo Eficaz</h2>
                    <p className="mb-10">Crear un <Link className="text-custom-blue hover:underline" href="/diagrama-de-flujo/">diagrama de flujo</Link> efectivo requiere atención al detalle y un enfoque estructurado. Aquí hay algunos consejos para ayudarte a crear diagramas de flujo que sean claros, concisos y fáciles de entender:</p>
                    <ul style={{ listStyleType: 'disc' }}>
                        <li className="mb-10 ml-5">
                            <strong>Simplifica el Proceso:</strong> Identifica los pasos clave y elimina cualquier información o detalle innecesario para mantener el diagrama limpio y fácil de seguir.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Utiliza Símbolos Estándar:</strong> Utiliza símbolos estándar y convenciones reconocidas para representar acciones, decisiones y flujos de datos, lo que facilita la comprensión del diagrama.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Mantén la Consistencia:</strong> Mantén una estructura y un estilo consistentes en todo el <Link className="text-custom-blue hover:underline" href="/diagrama/">diagramas</Link>, utilizando tamaños y colores de fuente coherentes para mejorar la legibilidad.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Etiqueta Claramente:</strong> Asegúrate de etiquetar cada símbolo y conexión de manera clara y descriptiva, utilizando texto conciso pero informativo.
                        </li>
                    </ul>
                    <p className="mb-10">Siguiendo estos consejos, puedes crear diagramas de flujo que sean efectivos en comunicar y visualizar procesos y sistemas. En Sketchlie, te ofrecemos una variedad de herramientas y funcionalidades para ayudarte a aplicar estos consejos y crear diagramas de flujo de alta calidad.</p>
                    <div id="10" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10"> Ejemplos de Diagramas de Flujo</h2>
                    <p className="mb-10">Para comprender mejor cómo se ven y cómo se utilizan los diagramas de flujo en la práctica, aquí hay tres ejemplos de situaciones comunes en las que se pueden aplicar:</p>
                    <ul style={{ listStyleType: 'disc' }}>
                        <li className="mb-10 ml-5">
                            <strong>Proceso de Solicitud de Licencia:</strong> Un diagrama de flujo que muestra el proceso paso a paso para solicitar y aprobar una licencia, desde la presentación de la solicitud hasta la emisión de la licencia.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Proceso de Compra en Línea:</strong> Un diagrama de flujo que ilustra el flujo de trabajo en el proceso de compra en línea, desde la selección de productos hasta el pago y la confirmación del pedido.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Proceso de Resolución de Problemas:</strong> Un <Link className="text-custom-blue hover:underline" href="/diagrama-de-flujo/">diagrama de flujo</Link> que describe los pasos a seguir para resolver un problema específico, desde la identificación del problema hasta la implementación de una solución.
                        </li>
                    </ul>
                    <p className="mb-10">Estos ejemplos demuestran la versatilidad y la utilidad de los diagramas de flujo en una variedad de situaciones y contextos. En <Link className="text-custom-blue hover:underline" href="/">Sketchlie</Link>, puedes crear tus propios diagramas de flujo basados en estos ejemplos o adaptarlos para satisfacer tus necesidades específicas.</p>
                    <div id="11" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10"> Consejos para tus Actividades de Diagrama de Flujo</h2>
                    <p className="mb-10">Al llevar a cabo actividades relacionadas con diagramas de flujo, es importante tener en cuenta ciertos consejos que pueden mejorar la eficiencia y la efectividad de tu trabajo. Aquí hay algunas sugerencias útiles:</p>
                    <ul style={{ listStyleType: 'disc' }}>
                        <li className="mb-10 ml-5">
                            <strong>Colabora en Equipo:</strong> Fomenta la colaboración entre los miembros del equipo al crear y editar diagramas de flujo de manera conjunta, aprovechando las herramientas de colaboración en tiempo real.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Utiliza Plantillas:</strong> Aprovecha las plantillas prediseñadas disponibles en Sketchlie para acelerar el proceso de creación de diagramas de flujo y garantizar la consistencia en el diseño.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Recopila Retroalimentación:</strong> Solicita comentarios y sugerencias de otros miembros del equipo para mejorar la claridad y la precisión de tus diagramas de flujo.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Documenta Cambios:</strong> Mantén un registro de los cambios realizados en los diagramas de flujo, incluyendo la fecha y el responsable de cada modificación, para facilitar la gestión de versiones.
                        </li>
                    </ul>
                    <p className="mb-10">Siguiendo estos consejos, puedes optimizar tus actividades relacionadas con diagramas de flujo y obtener mejores resultados en tu trabajo colaborativo. En Sketchlie, te ofrecemos las herramientas y funcionalidades necesarias para aplicar estos consejos y maximizar tu productividad en la creación y edición de diagramas de flujo.</p>
                </div>
                <div className="lg:w-[30%] xl:ml-10 lg:ml-5 border border-black rounded-lg p-10 bg-[#FFF] lg:sticky lg:z-30 lg:top-24 lg:h-[50%] lg:mb-0 mb-10">
                    <h3 className="text-2xl mb-3">
                        Indice
                    </h3>
                    <ul>
                        <li className="mb-4">
                            <Link href="#1" className="text-custom-blue hover:underline mb-10">Qué es un Diagrama de Flujo?</Link>
                        </li>
                        <li className="mb-4">
                            <Link href="#2" className="text-custom-blue hover:underline mb-10">Cómo se utilizan los Diagramas de Flujo</Link>
                        </li>
                        <li className="mb-4">
                            <Link href="#3" className="text-custom-blue hover:underline mb-10">Cómo hacer un Diagrama de Flujo</Link>
                        </li>
                        <li className="mb-4">
                            <Link href="#4" className="text-custom-blue hover:underline mb-10">Tipos de Técnicas de Diagramas de Flujo</Link>
                        </li>
                        <li className="mb-4">
                            <Link href="#5" className="text-custom-blue hover:underline mb-10">Tipos de Diagramas de Flujo</Link>
                        </li>
                        <li className="mb-4">
                            <Link href="#6" className="text-custom-blue hover:underline mb-10">Historia del Diagrama de Flujo</Link>
                        </li>
                        <li className="mb-4">
                            <Link href="#7" className="text-custom-blue hover:underline mb-10">Para qué sirve un Diagrama de Flujo</Link>
                        </li>
                        <li className="mb-4">
                            <Link href="#8" className="text-custom-blue hover:underline mb-10">Beneficios de Crear Diagramas de Flujo</Link>
                        </li>
                        <li className="mb-4">
                            <Link href="#9" className="text-custom-blue hover:underline mb-10">Consejos para Crear un Diagrama de Flujo Eficaz</Link>
                        </li>
                        <li className="mb-4">
                            <Link href="#10" className="text-custom-blue hover:underline mb-10">Ejemplos de Diagramas de Flujo</Link>
                        </li>
                        <li className="mb-4">
                            <Link href="#11" className="text-custom-blue hover:underline mb-10">Consejos para tus Actividades de Diagrama de Flujo</Link>
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
