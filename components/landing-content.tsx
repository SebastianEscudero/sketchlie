"use client";

import { LogoSlider } from "./logo-slider";
import { BlogSection } from "./blog-section";
import { BlogTestimonials } from "./blog-testimonials";
import { PlatformYouCanTrust } from "./platform-you-can-trust";
import { BlogLinks } from "./blog-links";
import { LandingVideo } from "./landing-video";
import { TemplatesSlider } from "./templates-slider";

export const LandingContent = () => {
    return (
        <div>
            <LogoSlider />
            <LandingVideo />
            <div id="about" className="md:my-14 lg:my-16 my-10">
                <BlogSection
                    title="El punto de encuentro entre la planificación y la ejecución."
                />
            </div>
            <BlogSection
                title="Tu próxima gran idea comienza aquí."
                text="Te proporcionamos las herramientas necesarias para diseñar el futuro. Desde estrategias innovadoras hasta el desarrollo de productos y servicios, todo se simplifica cuando trabajas en un espacio sin límites como Sketchlie. Con nuestra plataforma, puedes transformar ideas abstractas en proyectos tangibles de manera fluida y eficiente. No esperes más para dar el primer paso hacia la realización de tus sueños."
                img="/placeholders/mapa-de-procesos.png"
                side="right"
            />
            <BlogSection
                title="Desarrolla soluciones a medida para tus clientes."
                text="Crea una cultura centrada en la satisfacción del cliente con un entorno colaborativo donde puedas generar, estructurar y compartir ideas con tu equipo, todo en un mismo lugar. En Sketchlie, no solo te proporcionamos las herramientas para desarrollar soluciones innovadoras, sino que también te brindamos el espacio y el apoyo necesario para convertirte en el héroe de tus clientes."
                img="/placeholders/diagrama-de-flujo.png"
                side="right"
            />
            <BlogSection
                title="Conecta toda tu empresa en un espacio seguro."
                text="La seguridad es nuestra prioridad, puedes estar tranquilo sabiendo que tus datos están protegidos con las más altas medidas de seguridad empresarial. Nuestra plataforma utiliza tecnología de vanguardia respaldada por los estándares de seguridad más estrictos, lo que garantiza que tus ideas y proyectos estén protegidos en todo momento. Conéctate con confianza y haz realidad tus ambiciones empresariales con nosotros."
                img="/placeholders/mapa-mental.png"
                side="right"
            />
            <TemplatesSlider />
            <div className="my-20">
                <PlatformYouCanTrust />
            </div>  
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 xl:mx-[10%] lg:mx-[7%] md:mx-[5%] mx-[5%] gap-5 my-10">
                <BlogLinks blogTitle="Mapa Conceptual y su Importancia en el Mundo Online" blogImage="/placeholders/mapa-conceptual-online.png" blogHref="/blog/mapa-conceptual/" blogDescription="Explora las herramientas versátiles de Sketchlie para crear mapas conceptuales online de forma colaborativa y eficiente..." isNew={true} />
                <BlogLinks blogTitle="Desata tu Creatividad con la Pizarra Virtual Online de Sketchlie" blogImage="/placeholders/pizarra-online.png" blogHref="/blog/pizarra-online/" blogDescription="En un mundo cada vez más digitalizado, la necesidad de herramientas de colaboración efectivas se ha vuelto fundamental para empresas..." isNew={true} />
                <BlogLinks blogTitle="Wireframes Online: La Herramienta Esencial para Visualizar tus Ideas" blogImage="/placeholders/wireframe.png" blogHref="/blog/wireframes-online/" blogDescription="Descubre cómo los wireframes online en Sketchlie pueden ayudarte a visualizar tus ideas." isNew={true} />
            </div>
            {/* <BlogTestimonials
                title="Itera y desarrolla productos y servicios de manera eficiente."
                text="Nuestras funciones avanzadas te permiten innovar y llevar tus proyectos al mercado más rápido. Desde diagramas hasta talleres, Sketchlie está diseñado para apoyar los procesos de desarrollo de productos de manera ágil y efectiva."
            /> */}
        </div>
    )
}