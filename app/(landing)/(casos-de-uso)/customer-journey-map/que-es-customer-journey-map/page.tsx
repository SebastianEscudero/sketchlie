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
    title: "Customer Journey Map: Guía Completa 2024 | Sketchlie",
    description: "Aprende a crear y optimizar tu customer journey map. Mejora la experiencia del cliente, aumenta la fidelización y potencia tu negocio con Sketchlie.",
    keywords: ["Customer journey map", "Mapa de experiencia del cliente", "CJM", "UX", "Fidelización de clientes", "Estrategia de negocio"],
    alternates: {
        canonical: "https://www.sketchlie.com/customer-journey-map/que-es-customer-journey-map/",
    },
};

const LandingPage = () => {
    return (
        <div className="xl:mx-[5%] lg:mx-[4%] md:mx-[3%] mx-[3%]">
            <div className="mt-[3%]">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <Link href="/" title="Home">Inicio</Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <Link href="/customer-journey-map/" title="Customer journey map">Customer journey map</Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Guía Completa</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <div className="md:flex mt-10 items-center justify-between">
                <h1 className="lg:text-6xl md:text-5xl text-4xl md:px-5 md:text-left text-center" style={{ lineHeight: "1.2" }}>
                    Customer Journey Map: La Guía Definitiva para Mejorar la Experiencia del Cliente
                </h1>
                <Image
                    src="/placeholders/customer-journey-map.png"
                    alt="Ejemplo de Customer Journey Map"
                    width={1920}
                    height={1080}
                    className="rounded-2xl border border-black md:max-w-[60%] md:mt-0 mt-10"
                />
            </div>
            <p className="text-xl mt-5 mb-10">
                Descubre cómo crear y utilizar un customer journey map para transformar la experiencia de tus clientes, aumentar la fidelización y potenciar el crecimiento de tu negocio. Esta guía completa te llevará paso a paso a través del proceso de mapeo del viaje del cliente, con ejemplos prácticos y consejos de expertos.
            </p>
            <div className="flex flex-col-reverse lg:flex-row justify-between mt-[3%]">
                <div className="lg:max-w-[70%] text-xl">
                    <div id="1" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">¿Qué es exactamente un customer journey map y por qué es crucial para tu negocio?</h2>

                    <p className="mb-10">Un <Link className="text-custom-blue hover:underline" href="/customer-journey-map/">customer journey map</Link> es una representación visual detallada de la experiencia completa que tiene un cliente al interactuar con tu marca o producto. Este mapa no solo muestra los puntos de contacto, sino que también captura las emociones, necesidades y expectativas del cliente en cada etapa de su viaje.</p>

                    <p className="mb-10">La importancia de un customer journey map radica en su capacidad para:</p>

                    <ul style={{ listStyleType: 'disc' }}>
                        <li className="mb-5 ml-5">Identificar oportunidades de mejora en la experiencia del cliente</li>
                        <li className="mb-5 ml-5">Alinear los equipos internos en torno a las necesidades del cliente</li>
                        <li className="mb-5 ml-5">Optimizar los recursos y esfuerzos de marketing</li>
                        <li className="mb-5 ml-5">Aumentar la satisfacción y fidelización del cliente</li>
                    </ul>

                    <p className="mb-10">En <Link className="text-custom-blue hover:underline" href="/">Sketchlie</Link>, entendemos que cada interacción cuenta. Por eso, proporcionamos las herramientas necesarias para crear customer journey maps detallados y accionables que impulsen el crecimiento de tu negocio.</p>

                    <div id="2" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">¿Cómo se crea un customer journey map efectivo paso a paso?</h2>

                    <p className="mb-10">Crear un customer journey map efectivo requiere un enfoque sistemático. Sigue estos pasos para desarrollar un mapa que realmente impulse la mejora de la experiencia del cliente:</p>

                    <ol style={{ listStyleType: 'decimal' }}>
                        <li className="mb-5 ml-5">
                            <strong>Recopila datos del cliente:</strong> Utiliza encuestas, entrevistas y análisis de datos para comprender profundamente a tus clientes.
                        </li>
                        <li className="mb-5 ml-5">
                            <strong>Define las personas:</strong> Crea perfiles detallados de tus clientes ideales basados en los datos recopilados.
                        </li>
                        <li className="mb-5 ml-5">
                            <strong>Identifica las etapas del journey:</strong> Determina las fases clave por las que pasa un cliente, desde el descubrimiento hasta la fidelización.
                        </li>
                        <li className="mb-5 ml-5">
                            <strong>Mapea los puntos de contacto:</strong> Enumera todas las interacciones que el cliente tiene con tu marca en cada etapa.
                        </li>
                        <li className="mb-5 ml-5">
                            <strong>Analiza las emociones y necesidades:</strong> En cada punto de contacto, identifica cómo se siente el cliente y qué necesita.
                        </li>
                        <li className="mb-5 ml-5">
                            <strong>Identifica oportunidades:</strong> Busca áreas de mejora y momentos clave para superar las expectativas del cliente.
                        </li>
                        <li className="mb-5 ml-5">
                            <strong>Visualiza el mapa:</strong> Crea una representación gráfica clara y atractiva de todo el journey.
                        </li>
                    </ol>

                    <p className="mb-10">Utilizando herramientas como <Link className="text-custom-blue hover:underline" href="/blog/mapa-de-procesos/">mapa de procesos</Link>, <Link className="text-custom-blue hover:underline" href="/blog/diagrama-de-flujo/">diagramas de flujo</Link> y <Link className="text-custom-blue hover:underline" href="/blog/mapa-mental/">mapas mentales</Link> de Sketchlie, puedes crear un customer journey map detallado y visualmente atractivo que capture todos los aspectos cruciales del viaje del cliente.</p>

                    <div id="3" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">¿Cuáles son los beneficios tangibles de implementar un customer journey map?</h2>

                    <p className="mb-10">La implementación de un customer journey map bien diseñado puede tener un impacto significativo en varios aspectos de tu negocio:</p>

                    <ul style={{ listStyleType: 'disc' }}>
                        <li className="mb-10 ml-5">
                            <strong>Mejora de la experiencia del cliente:</strong> Al comprender mejor las necesidades y puntos de dolor de los clientes, puedes crear experiencias más satisfactorias y personalizadas.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Aumento de la retención de clientes:</strong> Un journey optimizado conduce a una mayor satisfacción y lealtad del cliente, lo que puede aumentar las tasas de retención hasta en un 25%.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Optimización de recursos:</strong> Al identificar los puntos de contacto más críticos, puedes asignar recursos de manera más eficiente, potencialmente reduciendo costos operativos en un 15-20%.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Incremento en ventas:</strong> Un journey bien diseñado puede aumentar las tasas de conversión y el valor del tiempo de vida del cliente, con algunas empresas reportando aumentos de ingresos de hasta un 10-15%.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Mejora en la innovación de productos:</strong> Los insights obtenidos pueden impulsar el desarrollo de nuevos productos o servicios que se alineen mejor con las necesidades del cliente.
                        </li>
                    </ul>

                    <p className="mb-10">En <Link className="text-custom-blue hover:underline" href="/blog/mapa-conceptual/">Sketchlie</Link>, hemos visto cómo nuestros clientes han logrado estos beneficios y más al implementar customer journey maps efectivos utilizando nuestras herramientas colaborativas.</p>

                    <div id="4" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">¿Cómo se utiliza un customer journey map para impulsar mejoras concretas en el negocio?</h2>

                    <p className="mb-10">Un customer journey map no es solo una herramienta de visualización; es un catalizador para el cambio y la mejora continua. Aquí te explicamos cómo puedes utilizarlo para impulsar mejoras tangibles en tu negocio:</p>

                    <ol style={{ listStyleType: 'decimal' }}>
                        <li className="mb-10 ml-5">
                            <strong>Identifica y prioriza áreas de mejora:</strong> Analiza los puntos de dolor más críticos en el journey y clasifícalos según su impacto en la satisfacción del cliente y la facilidad de implementación.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Desarrolla planes de acción específicos:</strong> Para cada área de mejora prioritaria, crea un plan detallado que incluya objetivos, métricas, responsables y plazos.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Implementa cambios de forma iterativa:</strong> Comienza con mejoras pequeñas y medibles, y utiliza el feedback para refinar y expandir tus esfuerzos.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Mide el impacto:</strong> Utiliza KPIs específicos como Net Promoter Score (NPS), Customer Satisfaction (CSAT), y Customer Effort Score (CES) para evaluar el impacto de tus mejoras.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Actualiza el mapa regularmente:</strong> El journey del cliente evoluciona con el tiempo. Actualiza tu mapa al menos cada 6-12 meses para mantenerlo relevante.
                        </li>
                    </ol>

                    <p className="mb-10">En <Link className="text-custom-blue hover:underline" href="/blog/pizarra-online/">Sketchlie</Link>, ofrecemos una plataforma de pizarra online donde puedes colaborar en tiempo real para crear, actualizar y actuar sobre tu <Link className="text-custom-blue hover:underline" href="/customer-journey-map/">customer journey map online</Link> de manera eficiente y efectiva.</p>

                    <div id="5" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">¿Cómo impacta un customer journey map en la fidelización y el valor del tiempo de vida del cliente?</h2>

                    <blockquote className="italic bg-gray-100 border-l-4 border-blue-500 text-gray-700 text-lg p-4 mb-10">
                        Un aumento del 5% en la retención de clientes puede aumentar las ganancias entre un 25% y un 95%. - Frederick Reichheld, Bain & Company
                    </blockquote>

                    <p className="mb-10">El impacto de un customer journey map bien implementado en la fidelización y el valor del tiempo de vida del cliente (Customer Lifetime Value - CLV) es significativo y multifacético:</p>

                    <ul style={{ listStyleType: 'disc' }}>
                        <li className="mb-10 ml-5">
                            <strong>Mejora de la experiencia end-to-end:</strong> Al optimizar cada punto de contacto, creas una experiencia coherente y positiva que fomenta la lealtad a largo plazo.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Anticipación de necesidades:</strong> Un mapa detallado te permite anticipar y satisfacer las necesidades del cliente antes de que se conviertan en problemas, aumentando la satisfacción y la retención.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Personalización mejorada:</strong> Los insights del journey map permiten ofrecer experiencias más personalizadas, lo que puede aumentar el CLV hasta en un 20%.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Reducción de la tasa de abandono:</strong> Al identificar y abordar los puntos de fricción, puedes reducir significativamente la tasa de abandono de clientes.
                        </li>
                        <li className="mb-10 ml-5">
                        <strong>Aumento de las ventas cruzadas y upselling:</strong> Un conocimiento profundo del journey del cliente te permite identificar oportunidades para ofrecer productos o servicios adicionales de manera relevante y oportuna.
                        </li>
                    </ul>

                    <p className="mb-10">En <Link className="text-custom-blue hover:underline" href="/">Sketchlie</Link>, hemos visto cómo nuestros clientes han logrado aumentos significativos en la retención de clientes y el CLV mediante la implementación efectiva de customer journey maps.</p>

                    <div id="6" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">¿Cómo puede Sketchlie potenciar tu estrategia de customer journey mapping?</h2>

                    <p className="mb-10">En Sketchlie, entendemos que un customer journey map efectivo requiere colaboración, flexibilidad y herramientas potentes. Nuestra plataforma está diseñada para satisfacer estas necesidades y más:</p>

                    <ul style={{ listStyleType: 'disc' }}>
                        <li className="mb-10 ml-5">
                            <strong>Colaboración en tiempo real:</strong> Permite que equipos multidisciplinarios trabajen juntos en el mapa, independientemente de su ubicación física.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Plantillas personalizables:</strong> Ofrecemos una variedad de plantillas de customer journey map que puedes adaptar a las necesidades específicas de tu negocio.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Integración de datos:</strong> Conecta tu mapa con fuentes de datos en tiempo real para mantenerlo actualizado y relevante.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Visualización avanzada:</strong> Utiliza nuestras herramientas de diseño intuitivas para crear mapas visualmente atractivos y fáciles de entender.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Análisis y reportes:</strong> Genera informes detallados y análisis de insights para facilitar la toma de decisiones basada en datos.
                        </li>
                    </ul>

                    <p className="mb-10">Con Sketchlie, no solo creas un customer journey map, sino que desarrollas una herramienta dinámica y colaborativa que evoluciona con tu negocio y tus clientes.</p>

                    <div id="7" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">¿Cuáles son las mejores prácticas para mantener y actualizar tu customer journey map?</h2>

                    <p className="mb-10">Un customer journey map efectivo no es un documento estático, sino una herramienta viva que debe evolucionar con tu negocio y tus clientes. Aquí te presentamos las mejores prácticas para mantener tu mapa relevante y útil:</p>

                    <ol style={{ listStyleType: 'decimal' }}>
                        <li className="mb-10 ml-5">
                            <strong>Establece un cronograma de revisión regular:</strong> Programa revisiones trimestrales o semestrales de tu mapa para asegurar su precisión y relevancia.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Incorpora feedback continuo del cliente:</strong> Utiliza encuestas, entrevistas y análisis de datos para capturar cambios en las preferencias y comportamientos del cliente.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Monitorea las métricas clave:</strong> Establece KPIs para cada etapa del journey y úsalos para identificar áreas que requieren atención.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Involucra a múltiples departamentos:</strong> Asegúrate de que equipos de ventas, marketing, servicio al cliente y producto contribuyan con sus perspectivas.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Adapta el mapa a nuevos canales y tecnologías:</strong> A medida que surgen nuevos puntos de contacto, intégralos en tu mapa para mantenerlo completo.
                        </li>
                    </ol>

                    <p className="mb-10">Con las herramientas colaborativas de Sketchlie, mantener tu customer journey map actualizado y relevante es un proceso fluido y eficiente.</p>

                    <div id="8" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">¿Qué datos críticos debes incluir en tu customer journey map para maximizar su efectividad?</h2>

                    <p className="mb-10">Un customer journey map efectivo debe ser rico en datos relevantes que proporcionen una visión holística de la experiencia del cliente. Aquí están los elementos clave que debes incluir:</p>

                    <ul style={{ listStyleType: 'disc' }}>
                        <li className="mb-10 ml-5">
                            <strong>Perfiles de persona detallados:</strong> Incluye información demográfica, psicográfica y conductual de tus clientes ideales.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Etapas del journey:</strong> Define claramente cada fase del viaje del cliente, desde el descubrimiento hasta la post-compra.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Puntos de contacto:</strong> Enumera todos los momentos de interacción entre el cliente y tu marca, tanto online como offline.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Emociones del cliente:</strong> Captura cómo se siente el cliente en cada etapa del journey.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Objetivos y motivaciones:</strong> Identifica qué busca lograr el cliente en cada punto del journey.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Puntos de dolor:</strong> Destaca las frustraciones o dificultades que el cliente puede experimentar.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Oportunidades:</strong> Señala áreas donde puedes superar las expectativas del cliente o resolver problemas.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Métricas clave:</strong> Incluye KPIs relevantes para cada etapa del journey, como tasas de conversión o tiempo de resolución de problemas.
                        </li>
                    </ul>

                    <p className="mb-10">En Sketchlie, nuestras plantillas de customer journey map están diseñadas para capturar todos estos elementos críticos, asegurando que tu mapa sea una herramienta completa y accionable.</p>

                    <div id="9" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">Conclusión: Transformando tu negocio con customer journey mapping</h2>

                    <p className="mb-10">El <Link className="text-custom-blue hover:underline" href="/customer-journey-map/">customer journey map</Link> es mucho más que una herramienta de visualización; es un catalizador para la transformación del negocio. Al proporcionar una visión holística y centrada en el cliente de tu negocio, te permite:</p>

                    <ul style={{ listStyleType: 'disc' }}>
                        <li className="mb-5 ml-5">Mejorar significativamente la experiencia del cliente</li>
                        <li className="mb-5 ml-5">Aumentar la retención y fidelización de clientes</li>
                        <li className="mb-5 ml-5">Optimizar tus operaciones y reducir costos</li>
                        <li className="mb-5 ml-5">Identificar nuevas oportunidades de crecimiento</li>
                        <li className="mb-5 ml-5">Alinear a toda tu organización en torno a las necesidades del cliente</li>
                    </ul>

                    <p className="mb-10">En <Link className="text-custom-blue hover:underline" href="/">Sketchlie</Link>, estamos comprometidos a proporcionarte las herramientas y recursos necesarios para crear, mantener y actuar sobre customer journey maps efectivos. Nuestra plataforma colaborativa y flexible te permite no solo mapear el viaje de tus clientes, sino también transformarlo activamente para impulsar el crecimiento y el éxito de tu negocio.</p>

                    <p className="mb-10">¿Listo para llevar la experiencia de tus clientes al siguiente nivel? Comienza a crear tu customer journey map con Sketchlie hoy mismo y descubre cómo puedes transformar tu negocio centrándote en lo que realmente importa: tus clientes.</p>

                    <div id="10" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">Preguntas Frecuentes sobre Customer Journey Maps</h2>

                    <h3 className="text-2xl mb-5">¿Cuánto tiempo lleva crear un customer journey map completo?</h3>
                    <p className="mb-10">El tiempo para crear un customer journey map completo puede variar dependiendo de la complejidad de tu negocio y la cantidad de datos disponibles. Típicamente, el proceso puede llevar entre 2 y 6 semanas, incluyendo la recopilación de datos, el análisis, la creación del mapa y la validación con las partes interesadas.</p>

                    <h3 className="text-2xl mb-5">¿Con qué frecuencia debo actualizar mi customer journey map?</h3>
                    <p className="mb-10">Se recomienda revisar y actualizar tu customer journey map al menos cada 6 meses. Sin embargo, en industrias de rápido movimiento o durante períodos de cambios significativos en el comportamiento del cliente, podrías necesitar actualizarlo con mayor frecuencia, incluso trimestralmente.</p>

                    <h3 className="text-2xl mb-5">¿Cómo puedo medir el ROI de implementar un customer journey map?</h3>
                    <p className="mb-10">Puedes medir el ROI de tu customer journey map observando métricas clave antes y después de su implementación, incluyendo:
                    - Tasa de retención de clientes
                    - Net Promoter Score (NPS)
                    - Customer Lifetime Value (CLV)
                    - Tasas de conversión
                    - Costos de adquisición de clientes
                    La mejora en estas métricas, junto con el aumento de ingresos o la reducción de costos, te ayudará a calcular el ROI.</p>

                    <h3 className="text-2xl mb-5">¿Necesito un customer journey map diferente para cada segmento de clientes?</h3>
                    <p className="mb-10">Idealmente, sí. Diferentes segmentos de clientes pueden tener necesidades, comportamientos y puntos de dolor distintos. Crear mapas separados para cada segmento importante te permitirá personalizar mejor tu enfoque y mejorar la experiencia para cada grupo de clientes.</p>
                </div>
                <div className="lg:w-[30%] xl:ml-10 lg:ml-5 border border-black rounded-lg p-10 bg-white dark:bg-[#020817] lg:sticky lg:z-30 lg:top-24 lg:h-[50%] lg:mb-0 mb-10">
                    <h3 className="text-2xl mb-3">
                        Índice
                    </h3>
                    <ul style={{ listStyleType: 'none' }}>
                        <li className="mb-4">
                            <Link href="#1" className="text-custom-blue hover:underline mb-10">1. ¿Qué es un customer journey map?</Link>
                        </li>
                        <li className="mb-4">
                            <Link href="#2" className="text-custom-blue hover:underline mb-10">2. ¿Cómo se crea un customer journey map?</Link>
                        </li>
                        <li className="mb-4">
                            <Link href="#3" className="text-custom-blue hover:underline mb-10">3. Beneficios de usar un customer journey map</Link>
                        </li>
                        <li className="mb-4">
                            <Link href="#4" className="text-custom-blue hover:underline mb-10">4. Cómo utilizar un customer journey map</Link>
                        </li>
                        <li className="mb-4">
                            <Link href="#5" className="text-custom-blue hover:underline mb-10">5. Impacto en la fidelización del cliente</Link>
                        </li>
                        <li className="mb-4">
                            <Link href="#6" className="text-custom-blue hover:underline mb-10">6. Cómo Sketchlie potencia tu estrategia</Link>
                        </li>
                        <li className="mb-4">
                            <Link href="#7" className="text-custom-blue hover:underline mb-10">7. Mejores prácticas para mantener el mapa</Link>
                        </li>
                        <li className="mb-4">
                            <Link href="#8" className="text-custom-blue hover:underline mb-10">8. Datos críticos a incluir</Link>
                        </li>
                        <li className="mb-4">
                            <Link href="#9" className="text-custom-blue hover:underline mb-10">9. Conclusión</Link>
                        </li>
                        <li className="mb-4">
                            <Link href="#10" className="text-custom-blue hover:underline mb-10">10. Preguntas frecuentes</Link>
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