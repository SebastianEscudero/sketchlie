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
    title: "Diseño UX: Qué es, cómo hacerlo y beneficios | Sketchlie",
    description: "Descubre qué es el diseño UX, cómo hacerlo, ejemplos y herramientas para mejorar la experiencia del usuario en tu sitio web o aplicación.",
    keywords: ["diseño ux", "diseño ui", "experiencia de usuario", "diseño de interfaz de usuario", "diseño de experiencia de usuario", "diseño de interfaces", "diseño de aplicaciones", "diseño de sitios web", "herramientas de diseño", "prototipado", "investigación de usuario", "mapas de calor", "pruebas de usabilidad", "diseño colaborativo", "sketchlie"],
    alternates: {
        canonical: "https://www.sketchlie.com/diseno/que-es-diseno/",
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
                            <Link href="/diseno/">Diseño</Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>¿Qué es Diseño UX/UI?</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <div className="md:flex mt-10 items-center justify-between">
                <h1 className="lg:text-6xl md:text-5xl text-4xl md:px-5" style={{ lineHeight: "1.2" }}>
                    ¿Qué es Diseño UX/UI?
                </h1>
                <Image
                    src="/placeholders/customer-journey-map.png"
                    alt="Customer journey map Image"
                    width={1920}
                    height={1080}
                    className="rounded-2xl border border-black md:max-w-[60%] md:mt-0 mt-10"
                />
            </div>
            <div className="flex flex-col-reverse lg:flex-row justify-between mt-[3%]">
                <div className="lg:max-w-[70%] text-xl">
                    <div id="1" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">¿Qué es el diseño UI?</h2>
                    <p className="mb-10">El <Link className="text-custom-blue hover:underline" href="/diseno/">diseño de interfaz de usuario (UI)</Link> se refiere al proceso de crear interfaces en software o dispositivos computacionales, centrándose en la apariencia y estilo. El objetivo principal del diseño UI es hacer que la interacción del usuario sea lo más eficiente y sencilla posible, en términos de lograr los objetivos del usuario. Un diseño UI efectivo es atractivo visualmente, intuitivo, y funcional. Los diseñadores UI trabajan con tipografía, colores, gráficos y diseño de elementos para construir interfaces cohesivas que mejoren la experiencia del usuario. El diseño UI es un componente crucial en el desarrollo de aplicaciones y sitios web, ya que una buena interfaz puede hacer la diferencia en la satisfacción y retención del usuario.</p>

                    <div id="2" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">¿Qué es el diseño UX?</h2>
                    <p className="mb-10">El diseño de experiencia de usuario (UX) abarca todos los aspectos de la interacción de un usuario con una empresa, sus servicios y productos. El objetivo del diseño UX es crear productos que proporcionen experiencias significativas y relevantes a los usuarios. Esto incluye el diseño de todo el proceso de adquisición e integración del producto, incluyendo aspectos de marca, diseño, usabilidad y función. Los diseñadores UX investigan y comprenden las necesidades y comportamientos del usuario, y utilizan esta información para crear interfaces y experiencias que sean útiles, accesibles y placenteras. Un buen diseño UX puede mejorar la satisfacción del cliente, aumentar la lealtad y diferenciar un producto en el mercado.</p>

                    <div id="3" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">¿Cuál es la diferencia entre diseño UI y UX?</h2>
                    <p className="mb-10">El diseño UI (interfaz de usuario) y el diseño UX (experiencia de usuario) son disciplinas complementarias, pero distintas. El diseño UI se centra en los aspectos visuales y de interacción de un producto, como botones, iconos, espaciado y colores. En contraste, el diseño UX se enfoca en la experiencia total del usuario con un producto o servicio, incluyendo aspectos de investigación de usuario, usabilidad, estructura de información y navegación. Mientras que el diseño UI trata de cómo se ve y se siente el producto, el diseño UX se preocupa por cómo se utiliza y se experimenta el producto. Ambos son esenciales para crear productos efectivos y agradables.</p>

                    <div id="4" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">¿Cómo mejorar la experiencia del cliente?</h2>
                    <ul style={{ listStyleType: 'disc' }}>
                        <li className="mb-10 ml-5">
                            <strong>Conocer a tus clientes:</strong> Realiza investigaciones y recopila feedback para entender las necesidades, deseos y problemas de tus clientes.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Personalización:</strong> Ofrece experiencias personalizadas basadas en los datos y preferencias del cliente para aumentar la relevancia y satisfacción.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Atención al cliente:</strong> Proporciona un soporte eficiente y amable, resolviendo problemas rápidamente y de manera satisfactoria.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Mejora continua:</strong> Evalúa y optimiza constantemente tus servicios y productos basándote en la retroalimentación y el análisis de datos.
                        </li>
                    </ul>

                    <div id="5" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">¿Qué herramientas se utilizan en el diseño UI/UX?</h2>
                    <p className="mb-10">En el diseño UI/UX, se utilizan diversas herramientas para diferentes etapas del proceso de diseño, desde la investigación hasta la implementación. Algunas de las herramientas más populares incluyen:</p>
                    <ul style={{ listStyleType: 'disc' }}>
                        <li className="mb-10 ml-5">
                            <strong><Link className="text-custom-blue hover:underline" href="/">Sketchlie:</Link></strong> Nuestro software de diseño colaborativo en tiempo real que permite a los equipos trabajar juntos en proyectos de diseño de forma remota.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Figma:</strong> Similar a Sketch, pero con capacidades de colaboración en tiempo real, lo que facilita el trabajo en equipo.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Adobe XD:</strong> Una herramienta de Adobe para diseñar y prototipar interfaces de usuario con integración con otros productos de Adobe.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>InVision:</strong> Se utiliza para crear prototipos interactivos y recolectar feedback de los usuarios y stakeholders.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>UserTesting:</strong> Una plataforma para realizar pruebas de usabilidad y obtener feedback directo de usuarios reales.
                        </li>
                    </ul>
                    <div id="6" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">¿Cómo realizar una investigación de usuario efectiva?</h2>
                    <p className="mb-10">Realizar una investigación de usuario efectiva implica varios pasos clave. Primero, define claramente los objetivos de tu investigación: qué preguntas necesitas responder y por qué. Luego, elige métodos de investigación adecuados, como entrevistas, encuestas, pruebas de usabilidad, y análisis de datos existentes. Asegúrate de seleccionar una muestra representativa de usuarios que refleje tu audiencia objetivo. Realiza las entrevistas o pruebas en un entorno natural para el usuario para obtener resultados más precisos. Analiza los datos recolectados para identificar patrones y tendencias, y documenta tus hallazgos de manera clara y accesible. Utiliza esta información para informar tus decisiones de diseño y mejorar la experiencia del usuario.</p>

                    <div id="7" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">¿Qué es un prototipo en diseño UX?</h2>
                    <p className="mb-10">Un prototipo en diseño UX es una representación interactiva del producto final que se utiliza para probar y validar conceptos de diseño antes de su desarrollo completo. Los prototipos pueden variar en fidelidad, desde bocetos de baja fidelidad hasta modelos interactivos de alta fidelidad que se asemejan al producto final. Crear un prototipo permite a los diseñadores y stakeholders visualizar cómo funcionará el producto, identificar problemas de usabilidad, y recibir feedback temprano en el proceso de desarrollo. Herramientas como <Link className="text-custom-blue hover:underline" href="/">Sketchlie</Link> son populares para la creación de prototipos, permitiendo a los diseñadores simular la interacción y flujo de usuario.</p>

                    <div id="8" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">¿Cómo medir la efectividad del diseño UX?</h2>
                    <ul style={{ listStyleType: 'disc' }}>
                        <li className="mb-10 ml-5">
                            <strong>Pruebas de usabilidad:</strong> Observa cómo los usuarios interactúan con tu producto para identificar problemas y áreas de mejora.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Encuestas y feedback:</strong> Recoge opiniones y sugerencias directamente de los usuarios para entender su satisfacción y experiencias.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Análisis de datos:</strong> Utiliza herramientas de análisis para rastrear métricas como tasa de conversión, tiempo en tarea y tasa de abandono.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Net Promoter Score (NPS):</strong> Mide la disposición de los usuarios a recomendar tu producto a otros, indicando la lealtad del cliente.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Mapas de calor:</strong> Visualiza las áreas donde los usuarios interactúan más en tu sitio o aplicación para identificar patrones de uso.
                        </li>
                    </ul>
                    <div id="9" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">Conclusión</h2>
                    <p className="mb-10">El diseño UI y UX, junto con la experiencia del cliente, son componentes críticos para el éxito de cualquier producto o servicio digital. Entender las diferencias y las intersecciones entre el <Link className="text-custom-blue hover:underline" href="/diseno/">diseño UI y UX</Link> es esencial para crear interfaces que no solo sean estéticamente agradables sino también intuitivas y fáciles de usar.</p>
                    <p className="mb-10">La investigación de usuario y la creación de prototipos son pasos fundamentales para asegurar que los diseños cumplan con las necesidades reales de los usuarios. Medir la efectividad del diseño UX mediante diversas herramientas y métodos permite realizar ajustes continuos para mejorar la satisfacción y lealtad del cliente.</p>

                </div>
                <div className="lg:w-[30%] xl:ml-10 lg:ml-5 border border-black rounded-lg p-10 bg-[#FFF] lg:sticky lg:z-30 lg:top-24 lg:h-[50%] lg:mb-0 mb-10">
                    <h3 className="text-2xl mb-3">Índice</h3>
                    <ul style={{ listStyleType: 'none' }}>
                        <li className="mb-4">
                            <a href="#1" className="text-custom-blue hover:underline mb-10">1. ¿Qué es el diseño UI?</a>
                        </li>
                        <li className="mb-4">
                            <a href="#2" className="text-custom-blue hover:underline mb-10">2. ¿Qué es el diseño UX?</a>
                        </li>
                        <li className="mb-4">
                            <a href="#3" className="text-custom-blue hover:underline mb-10">3. ¿Cuál es la diferencia entre diseño UI y UX?</a>
                        </li>
                        <li className="mb-4">
                            <a href="#4" className="text-custom-blue hover:underline mb-10">4. ¿Cómo mejorar la experiencia del cliente?</a>
                        </li>
                        <li className="mb-4">
                            <a href="#5" className="text-custom-blue hover:underline mb-10">5. ¿Qué herramientas se utilizan en el diseño UI/UX?</a>
                        </li>
                        <li className="mb-4">
                            <a href="#6" className="text-custom-blue hover:underline mb-10">6. ¿Cómo realizar una investigación de usuario efectiva?</a>
                        </li>
                        <li className="mb-4">
                            <a href="#7" className="text-custom-blue hover:underline mb-10">7. ¿Qué es un prototipo en diseño UX?</a>
                        </li>
                        <li className="mb-4">
                            <a href="#8" className="text-custom-blue hover:underline mb-10">8. ¿Cómo medir la efectividad del diseño UX?</a>
                        </li>
                        <li className="mb-4">
                            <a href="#9" className="text-custom-blue hover:underline mb-10">9. Conclusión</a>
                        </li>
                    </ul>
                </div>

            </div>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5 md:my-20 my-5">
                <BlogLinks blogTitle="Mapa Conceptual Online" blogImage="/placeholders/mapa-conceptual-online.png" blogHref="/mapa-conceptual/" blogDescription="Descubre cómo desatar tu creatividad y potenciar la colaboración en tiempo real con Sketchlie." />
                <BlogLinks blogTitle="Mapa de Procesos" blogImage="/placeholders/mapa-de-procesos.png" blogHref="/mapas-de-procesos" blogDescription="El mapa de procesos ayuda a los equipos a mapear y implementar mejoras. Registrate hoy con una 3 espacios de trabajo gratuitos para empezar a utilizar la mejor herramienta de mapa de procesos." />
                <BlogLinks blogTitle="Mapas Mentales" blogImage="/placeholders/mapa-mental.png" blogHref="/mapa-mental-online/" blogDescription="Explora nuestras herramientas para simplificar la creación de mapas mentales. Organiza tus ideas de manera jerárquica y potencia tu creatividad con nuestro intuitivo creador de mapas mentales." />
            </div>
        </div>
    );
}

export default LandingPage;
