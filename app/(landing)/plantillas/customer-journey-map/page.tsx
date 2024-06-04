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
    title: "Plantilla de customer journey map | Sketchlie",
    description: "Utiliza nuestra plantilla de customer journey map para visualizar la experiencia de tus clientes. Invita tu equipo y colabora en línea.",
    keywords: ["plantilla", "customer journey map", "mapa de viaje del cliente", "plantilla de customer journey map", "plantilla de mapa de viaje del cliente", "plantilla de customer journey map en línea", "plantilla de mapa de viaje del cliente en línea", "plantilla de customer journey map colaborativa", "plantilla de customer journey map gratuita", "plantilla de customer journey map editable", "plantilla de customer journey map Sketchlie", "plantilla de customer journey map online", "plantilla de customer journey map para equipos", "plantilla de customer journey map para empresas", "plantilla de customer journey map para startups", "plantilla de customer journey map para pymes", "plantilla de customer journey map para emprendedores", "plantilla de customer journey map para diseñadores", "plantilla de customer journey map para desarrolladores", "plantilla de customer journey map para marketing", "plantilla de customer journey map para ventas", "plantilla de customer journey map para servicio al cliente", "plantilla de customer journey map para experiencia de usuario", "plantilla de customer journey map para UX", "plantilla de customer journey map para UI", "plantilla de customer journey map para diseño de productos", "plantilla de customer journey map para diseño de servicios", "plantilla de customer journey map para diseño de experiencias", "plantilla de customer journey map para diseño de interacciones", "plantilla de customer journey map para diseño de interfaces", "plantilla de customer journey map para diseño de apps", "plantilla de customer journey map para diseño de sitios web", "plantilla de customer journey map para diseño de plataformas", "plantilla de customer journey map para diseño de aplicaciones", "plantilla de customer journey map para diseño de productos digitales", "plantilla de customer journey map para diseño de servicios digitales", "plantilla de customer journey map para diseño de experiencias digitales", "plantilla de customer journey map para diseño de interacciones digitales", "plantilla de customer journey map para diseño de interfaces digitales", "plantilla de customer journey map para diseño de apps digitales", "plantilla de customer journey map para diseño de sitios web digitales", "plantilla de customer journey map para diseño de plataformas digitales", "plantilla de customer journey map para diseño de aplicaciones digitales", "plantilla de customer journey map para"],
    alternates: {
        canonical: "https://www.sketchlie.com/plantillas/customer-journey-map/",
    }
};
const LandingPage = () => {
    return (
        <div>
            <div className="mt-[3%] xl:mx-[10%] lg:mx-[7%] md:mx-[5%] mx-[3%]">
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
                            <BreadcrumbPage>Customer Journey Map</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <div className="mt-[-70px]">
                <BlogStructure
                    title="Plantilla de customer journey map"
                    description="Grafíca la experiencia de tus clientes con nuestra plantilla de customer journey map. Abre el dashboard, elige la plantilla y personaliza tu mapa de viaje del cliente en línea."
                    img="/templates/customer-journey-map.png"
                    alt="Plantilla Customer Journey Map"
                    cta="Utilizar plantilla"
                />
            </div>
            <div className="flex flex-col-reverse lg:flex-row justify-between mt-[3%] xl:mx-[10%] lg:mx-[7%] md:mx-[5%] mx-[3%]">
                <div className="lg:max-w-[70%] text-xl">
                    <p className="mb-10">En Sketchlie, entendemos la importancia de mapear el viaje del cliente para mejorar la experiencia y ofrecer un producto excepcional. Aquí te guiaremos a través del proceso de creación de un customer journey map, respondiendo a las preguntas más buscadas sobre este tema.</p>
                    <div id="1" className="h-[80px] mt-[-80px]"></div>

                    <h2 className="text-4xl md:text-5xl mb-10">¿Qué es un customer journey map?</h2>
                    <p className="mb-10">Un <Link className="text-custom-blue hover:underline" href="/customer-journey-map/">customer journey map</Link> es una representación visual del proceso que un cliente atraviesa al interactuar con una empresa, desde la etapa de conciencia hasta la de conversión y lealtad. Captura las emociones, acciones y puntos de contacto clave durante este recorrido.</p>
                    <div id="2" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">¿Por qué es importante crear un customer journey map?</h2>
                    <ul style={{ listStyleType: 'disc' }}>
                        <li className="mb-10 ml-5">
                            <strong>Identificación de puntos problemáticos:</strong> Un customer journey map revela los puntos de fricción que pueden afectar la experiencia del cliente, lo que permite a las empresas abordarlos de manera proactiva.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Mejora de la experiencia del cliente:</strong> Al comprender mejor las necesidades y deseos de los clientes en cada etapa, las empresas pueden diseñar experiencias personalizadas que generen lealtad y satisfacción.
                        </li>
                    </ul>
                    <div id="3" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">¿Cómo se crea un customer journey map?</h2>
                    <ol style={{ listStyleType: 'decimal' }}>
                        <li className="mb-10 ml-5">
                            <strong>Investigación:</strong> Comienza recopilando datos sobre tus clientes, sus necesidades y comportamientos. Esto puede implicar encuestas, entrevistas y análisis de datos.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Identificación de etapas:</strong> Divide el viaje del cliente en etapas clave, como conciencia, consideración, compra y posventa.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Creación del mapa:</strong> Utiliza herramientas como diagramas de flujo o software especializado para visualizar el viaje del cliente, incluyendo puntos de contacto, emociones y acciones.
                        </li>
                    </ol>
                    <div id="4" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">¿Cómo puede ayudar Sketchlie en este proceso?</h2>
                    <p className="mb-10">Sketchlie proporciona una plataforma intuitiva para colaborar en la creación de mapas del viaje del cliente. Con nuestras herramientas de dibujo en línea y funciones de colaboración en tiempo real, puedes trabajar de manera eficiente con tu equipo para visualizar y mejorar la experiencia del cliente.</p>
                    <p className="mb-10">Al utilizar Sketchlie, puedes:</p>
                    <ul style={{ listStyleType: 'disc' }}>
                        <li className="mb-10 ml-5">
                            <strong>Crear mapas detallados:</strong> Utiliza nuestra amplia gama de herramientas de dibujo para representar cada etapa del viaje del cliente con precisión.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Colaborar fácilmente:</strong> Invita a colegas y clientes a editar el mapa en tiempo real, facilitando la colaboración y la recopilación de comentarios.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Iterar y mejorar:</strong> Con la capacidad de realizar cambios sobre la marcha, puedes iterar rápidamente en tu customer journey map para optimizar la experiencia.
                        </li>
                    </ul>
                    <h2 className="text-4xl md:text-5xl mb-10">¿Cuáles son los elementos clave de un mapa del viaje del cliente?</h2>
                    <p className="mb-10">Un mapa del viaje del cliente efectivo incluye varios elementos importantes:</p>
                    <ul style={{ listStyleType: 'disc' }}>
                        <li className="mb-10 ml-5">
                            <strong>Puntos de contacto:</strong> Identifica los momentos en los que el cliente interactúa con la empresa, como visitar el sitio web, realizar una compra o contactar al servicio de atención al cliente.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Emociones:</strong> Captura las emociones y actitudes del cliente en cada etapa del viaje, desde la curiosidad inicial hasta la satisfacción después de la compra.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Acciones:</strong> Describe las acciones que realiza el cliente en cada punto de contacto, como investigar productos, comparar precios o dejar una reseña.
                        </li>
                    </ul>
                    <div id="6" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">¿Cómo se puede utilizar un mapa del viaje del cliente para mejorar la retención de clientes?</h2>
                    <p className="mb-10">Un mapa del viaje del cliente puede ayudar a mejorar la retención de clientes al identificar áreas problemáticas que pueden provocar la pérdida de clientes. Al abordar estos problemas y diseñar experiencias más satisfactorias, las empresas pueden fomentar la lealtad del cliente y aumentar la retención a largo plazo.</p>
                    <p className="mb-10">Además, al comprender mejor las necesidades y deseos de los clientes en cada etapa del viaje, las empresas pueden ofrecer comunicaciones más personalizadas y relevantes, lo que también contribuye a la retención.</p>
                    <div id="7" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">¿Cuál es la diferencia entre un mapa del viaje del cliente y un diagrama de flujo?</h2>
                    <p className="mb-10">Aunque ambos son herramientas visuales, hay diferencias clave entre un mapa del viaje del cliente y un diagrama de flujo:</p>
                    <ul style={{ listStyleType: 'disc' }}>
                        <li className="mb-10 ml-5">
                            <strong>Enfoque en el cliente:</strong> Un mapa del viaje del cliente se centra en la experiencia y las emociones del cliente en cada etapa, mientras que un diagrama de flujo se centra en los procesos y las acciones.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Contexto:</strong> Un mapa del viaje del cliente proporciona contexto sobre por qué y cómo los clientes interactúan con la empresa, mientras que un diagrama de flujo describe simplemente las acciones y decisiones.
                        </li>
                    </ul>
                </div>
                <div className="lg:w-[30%] xl:ml-10 lg:ml-5 border border-black rounded-lg p-10 bg-[#FFF] lg:sticky lg:z-30 lg:top-24 lg:h-[50%] lg:mb-0 mb-10">
                    <h3 className="text-3xl mb-3 font-roobert font-semibold">
                        Comienza con nuestra plantilla
                    </h3>
                    <p className="text-lg text-zinc-600 mb-4 font-roobert">
                        Utiliza nuestra plantilla de customer journey map para visualizar la experiencia de tus clientes y mejorar la interacción con tu marca.
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
