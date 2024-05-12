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
    title: "Customer Journey Map: Qué es, cómo hacer uno y ejemplos | Sketchlie",
    description: "Descubre cómo el customer journey maps puede mejorar la colaboración y la creatividad de tu equipo. Aprende sobre las técnicas, beneficios y tipos de customer journey maps con Sketchlie.",
    keywords: ["Customer journey map", "Customer journey maps", "Customer journey map online", "Customer journey map gratis", "Customer journey map online gratis"],
    alternates: {
        canonical: "https://www.sketchlie.com/customer-journey-map/que-es-customer-journey-map/",
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
                            <Link href="/diagrama/">Customer journey map</Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>¿Qué es un Customer journey map?</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <div className="md:flex mt-10 items-center justify-between">
                <h1 className="lg:text-6xl md:text-5xl text-4xl md:px-5" style={{ lineHeight: "1.2" }}>
                    Customer journey map
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
                    <h2 className="text-4xl md:text-5xl mb-10">1. ¿Qué es un customer journey map?</h2>

                    <p className="mb-10">Un <Link className="text-custom-blue hover:underline" href="/customer-journey-map/">customer journey map</Link> es una representación visual de la experiencia que tiene un cliente al interactuar con una marca o producto a lo largo de su ciclo de vida. Es una herramienta crucial para comprender las necesidades, emociones y puntos de dolor de los clientes en cada etapa del proceso.</p>

                    <p className="mb-10">En <Link className="text-custom-blue hover:underline" href="/">Sketchlie</Link>, entendemos la importancia de crear un customer journey map claro y detallado para optimizar la experiencia del usuario.</p>

                    <div id="2" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">2. ¿Cómo se crea un customer journey map?</h2>

                    <p className="mb-10">Para crear un customer journey map online efectivo, primero necesitas recopilar datos sobre las interacciones de los clientes con tu marca. Luego, identifica las distintas etapas del journey del cliente, como la conciencia, la consideración, la compra y la fidelización.</p>

                    <p className="mb-10">Utilizando herramientas como <Link className="text-custom-blue hover:underline" href="/blog/mapa-de-procesos/">mapa de procesos</Link>, <Link className="text-custom-blue hover:underline" href="/blog/diagrama-de-flujo/">diagramas de flujo</Link> y <Link className="text-custom-blue hover:underline" href="/blog/mapa-mental/">mapas mentales</Link>, puedes visualizar el viaje completo del cliente y encontrar oportunidades de mejora.</p>

                    <div id="3" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">3. ¿Cuáles son los beneficios de usar un customer journey map?</h2>

                    <ul style={{ listStyleType: 'disc' }}>
                        <li className="mb-10 ml-5">
                            <strong>Mejor comprensión del cliente:</strong> Al mapear todas las interacciones del cliente, puedes comprender mejor sus necesidades y expectativas en cada etapa del proceso.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Identificación de puntos de dolor:</strong> Un customer journey map te ayuda a identificar los momentos en que los clientes pueden experimentar frustración o insatisfacción, lo que te permite abordar esos problemas de manera proactiva.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Optimización de la experiencia del cliente:</strong> Con una comprensión más profunda del journey del cliente, puedes optimizar cada interacción para mejorar la experiencia general del cliente.
                        </li>
                    </ul>

                    <p className="mb-10">En <Link className="text-custom-blue hover:underline" href="/blog/mapa-conceptual/">Sketchlie</Link>, estamos comprometidos a ayudarte a crear customer journey maps efectivos para impulsar el éxito de tu negocio.</p>
                    <div id="4" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">4. ¿Cómo se utiliza un customer journey map?</h2>

                    <p className="mb-10">Una vez que hayas creado tu customer journey map, es importante utilizarlo como una guía para mejorar la experiencia del cliente. Aquí hay algunos pasos para utilizarlo eficazmente:</p>

                    <ol style={{ listStyleType: 'decimal' }}>
                        <li className="mb-10 ml-5">
                            <strong>Identifica áreas de mejora:</strong> Analiza el map para identificar áreas donde los clientes podrían enfrentar dificultades o fricciones en su viaje.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Implementa cambios:</strong> Utiliza la información del map para implementar cambios en tus procesos, productos o servicios que mejoren la experiencia del cliente.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Monitorea y ajusta:</strong> Sigue monitoreando el journey del cliente y ajusta el map según sea necesario para garantizar que siga siendo relevante y útil.
                        </li>
                    </ol>

                    <p className="mb-10">En <Link className="text-custom-blue hover:underline" href="/blog/pizarra-online/">Sketchlie</Link>, ofrecemos una plataforma de pizarra online donde puedes colaborar en tiempo real para crear y ajustar tu <Link className="text-custom-blue hover:underline" href="/customer-journey-map/">customer journey map online</Link> con facilidad.</p>

                    <div id="5" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">5. ¿Cuál es el impacto de un customer journey map en la fidelización del cliente?</h2>

                    <blockquote className="italic bg-gray-100 border-l-4 border-blue-500 text-gray-700 text-lg p-4 mb-10">
                        Un customer journey map bien diseñado puede aumentar significativamente la fidelización del cliente al garantizar que cada interacción sea fluida, relevante y satisfactoria.
                    </blockquote>

                    <p className="mb-10">Cuando los clientes tienen una experiencia positiva y sin problemas en cada etapa de su journey, es más probable que vuelvan a comprar y que recomienden tu marca a otros. Por lo tanto, invertir en la creación y optimización de un customer journey map puede tener un impacto directo en la fidelización del cliente y, en última instancia, en el éxito de tu negocio.</p>

                    <p className="mb-10">En <Link className="text-custom-blue hover:underline" href="/blog/">Sketchlie</Link>, estamos comprometidos a ayudarte a construir relaciones sólidas con tus clientes a través de un customer journey map bien diseñado y ejecutado.</p>
                    <div id="6" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">6. ¿Cómo puede Sketchlie ayudarte con tu customer journey map?</h2>

                    <p className="mb-10">En <Link className="text-custom-blue hover:underline" href="/">Sketchlie</Link>, entendemos la importancia de tener una herramienta efectiva para crear y gestionar tu customer journey map. Con nuestra plataforma de pizarra online, puedes:</p>

                    <ul style={{ listStyleType: 'disc' }}>
                        <li className="mb-10 ml-5">
                            <strong>Colaborar en tiempo real:</strong> Invita a tu equipo a colaborar en la creación y edición del <Link className="text-custom-blue hover:underline" href="/customer-journey-map/">customer journey map online</Link> en tiempo real, desde cualquier lugar del mundo.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Crear mapas visuales:</strong> Utiliza nuestras herramientas de dibujo y objetos para crear mapas de viaje del cliente visualmente atractivos y fáciles de entender.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Integrar datos:</strong> Importa datos de múltiples fuentes para enriquecer tu map con información relevante sobre el comportamiento y las preferencias del cliente.
                        </li>
                    </ul>

                    <p className="mb-10">No importa en qué industria te encuentres, Sketchlie puede ayudarte a mejorar la experiencia del cliente y a impulsar el crecimiento de tu negocio a través de un customer journey map bien elaborado.</p>

                    <div id="7" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">7. ¿Cuál es la diferencia entre un customer journey map y otros tipos de mapas?</h2>

                    <p className="mb-10">Aunque el customer journey map se centra específicamente en la experiencia del cliente, existen otros tipos de mapas que pueden ser útiles en diferentes contextos. Por ejemplo:</p>

                    <ul style={{ listStyleType: 'disc' }}>
                        <li className="mb-10 ml-5">
                            <strong>Mapa de procesos:</strong> Se centra en visualizar y optimizar los procesos internos de una empresa.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Mapa conceptual:</strong> Muestra relaciones entre ideas o conceptos.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Mapa mental:</strong> Ayuda a organizar ideas de forma visual y jerárquica.
                        </li>
                    </ul>

                    <p className="mb-10">Aunque estos mapas tienen propósitos diferentes, todos pueden ser útiles para comprender y mejorar aspectos específicos de un negocio.</p>

                    <div id="8" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">8. ¿Qué datos se deben incluir en un customer journey map?</h2>

                    <p className="mb-10">Un customer journey map efectivo debe incluir una variedad de datos para proporcionar una imagen completa de la experiencia del cliente. Algunos datos importantes a considerar son:</p>

                    <ol style={{ listStyleType: 'decimal' }}>
                        <li className="mb-10 ml-5">
                            <strong>Demográficos del cliente:</strong> Edad, género, ubicación, etc.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Comportamiento del cliente:</strong> Interacciones con la marca, preferencias de compra, etc.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Emociones del cliente:</strong> Sentimientos y actitudes en cada etapa del journey.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Puntos de contacto:</strong> Todos los puntos de interacción entre el cliente y la marca.
                        </li>
                    </ol>

                    <p className="mb-10">Al recopilar y analizar estos datos, puedes crear un customer journey map que refleje con precisión la experiencia de tus clientes y te ayude a tomar decisiones informadas para mejorarla.</p>
                    <div id="9" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">Conclusión</h2>

                    <p className="mb-10">El <Link className="text-custom-blue hover:underline" href="/customer-journey-map/">customer journey map</Link> es una herramienta esencial para entender y optimizar la experiencia del cliente en todas las etapas de su interacción con tu marca. Desde la conciencia hasta la lealtad, cada punto de contacto ofrece oportunidades para mejorar y fortalecer las relaciones con los clientes.</p>

                    <p className="mb-10">En <Link className="text-custom-blue hover:underline" href="/">Sketchlie</Link>, estamos comprometidos a proporcionarte las herramientas y recursos necesarios para crear customer journey maps efectivos y mejorar la experiencia del cliente en tu negocio.</p>

                    <p className="mb-10">¡Comienza a mapear el viaje de tus clientes hoy mismo y lleva tu negocio al siguiente nivel!</p>
                </div>
                <div className="lg:w-[30%] xl:ml-10 lg:ml-5 border border-black rounded-lg p-10 bg-[#FFF] lg:sticky lg:z-30 lg:top-24 lg:h-[50%] lg:mb-0 mb-10">
                    <h3 className="text-2xl mb-3">
                        Indice
                    </h3>
                    <ul style={{ listStyleType: 'none' }}>
                        <li className="mb-4">
                            <Link href="#1" className="text-custom-blue hover:underline mb-10">1. ¿Qué es un customer journey map?</Link>
                        </li>
                        <li className="mb-4">
                            <Link href="#2" className="text-custom-blue hover:underline mb-10">2. ¿Cómo se crea un customer journey map?</Link>
                        </li>
                        <li className="mb-4">
                            <Link href="#3" className="text-custom-blue hover:underline mb-10">3. ¿Cuáles son los beneficios de usar un customer journey map?</Link>
                        </li>
                        <li className="mb-4">
                            <Link href="#4" className="text-custom-blue hover:underline mb-10">4. ¿Cómo se utiliza un customer journey map?</Link>
                        </li>
                        <li className="mb-4">
                            <Link href="#5" className="text-custom-blue hover:underline mb-10">5. ¿Cuál es el impacto de un customer journey map en la fidelización del cliente?</Link>
                        </li>
                        <li className="mb-4">
                            <Link href="#6" className="text-custom-blue hover:underline mb-10">6. ¿Cómo puede Sketchlie ayudarte con tu customer journey map?</Link>
                        </li>
                        <li className="mb-4">
                            <Link href="#7" className="text-custom-blue hover:underline mb-10">7. ¿Cuál es la diferencia entre un customer journey map y otros tipos de mapas?</Link>
                        </li>
                        <li className="mb-4">
                            <Link href="#8" className="text-custom-blue hover:underline mb-10">8. ¿Qué datos se deben incluir en un customer journey map?</Link>
                        </li>
                        <li className="mb-4">
                            <Link href="#9" className="text-custom-blue hover:underline mb-10">Conclusión</Link>
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
