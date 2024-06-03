import { BlogStructure } from "@/components/blog-structure";
import { Metadata } from "next";
import { BlogSection } from "@/components/blog-section";
import { LogoSlider } from "@/components/logo-slider";
import { FaqSection } from "@/components/faq-section";
import { BlogLinks } from "@/components/blog-links";
import { PlatformYouCanTrust } from "@/components/platform-you-can-trust";
import { LandingVideo } from "@/components/landing-video";
import { HowToCreate } from "@/components/how-to-create";
import { VerMas } from "@/components/ver-mas";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Link from "next/link";
import { TemplatesSlider } from "@/components/templates-slider";

export const metadata: Metadata = {
    title: "Crea tu customer journey map online | Sketchlie",
    description: "Crea customer journey maps de forma gratuita con Sketchlie. Comienza ahora y colabora con tu equipo.",
    keywords: ["Customer journey map", "Customer journey maps", "Customer journey map online", "Customer journey map gratis", "Customer journey map online gratis"],
    alternates: {
        canonical: "https://www.sketchlie.com/customer-journey-map/",
    }
};

const LandingPage = () => {

    const steps = [
        {
            trigger: "Paso 1: Identificar etapas clave",
            text: " Define las etapas principales del viaje del cliente, desde el descubrimiento hasta la postventa. Esto puede incluir etapas como descubrimiento, investigación, compra y postventa."
        },
        {
            trigger: "Paso 2: Comprender las emociones y acciones",
            text: "Para cada etapa, identifica las emociones y acciones que experimenta el cliente. ¿Están emocionados al descubrir tu producto? ¿Frustrados durante el proceso de compra? ¿Satisfechos después de recibir soporte?"
        },
        {
            trigger: "Paso 3: Identificar puntos de contacto",
            text: "Identifica todos los puntos de contacto entre el cliente y tu empresa en cada etapa del viaje. Estos pueden incluir el sitio web, redes sociales, tiendas físicas, servicio al cliente, entre otros."
        },
        {
            trigger: "Paso 4: Analizar y mejorar",
            text: "Una vez que hayas creado el mapa, analiza los puntos débiles y las oportunidades de mejora en la experiencia del cliente. Luego, desarrolla estrategias para mejorar esos aspectos y brindar una experiencia más satisfactoria."
        },
    ];




    const faqData = [
        {
            value: "item-1",
            trigger: "¿Qué es un customer journey map?",
            content: "Un customer journey map es una representación visual del proceso que sigue un cliente desde que interactúa por primera vez con una empresa hasta que completa su compra y más allá. Ayuda a comprender las experiencias, necesidades y emociones del cliente en cada etapa del viaje."
        },
        {
            value: "item-2",
            trigger: "¿Por qué son importantes los customer journey maps?",
            content: "Los customer journey maps son importantes porque ayudan a las empresas a comprender mejor las experiencias de sus clientes y a identificar oportunidades para mejorar la experiencia del cliente, lo que puede aumentar la satisfacción, la lealtad y las ventas."
        },
        {
            value: "item-3",
            trigger: "¿Qué información se incluye en un customer journey map?",
            content: "Un customer journey map incluye información sobre las diferentes etapas del viaje del cliente, las emociones y acciones del cliente en cada etapa, los puntos de contacto entre el cliente y la empresa, así como los puntos débiles y las oportunidades de mejora en la experiencia del cliente."
        },
        {
            value: "item-4",
            trigger: "¿Cuáles son los pasos para crear un customer journey map?",
            content: "Para crear un customer journey map, primero identifica las etapas clave del viaje del cliente. Luego, comprende las emociones y acciones del cliente en cada etapa, identifica los puntos de contacto entre el cliente y la empresa, y finalmente analiza y mejora los aspectos identificados."
        },
        {
            value: "item-5",
            trigger: "¿Cuándo se debe utilizar un customer journey map?",
            content: "Los customer journey maps se pueden utilizar en cualquier momento para comprender mejor la experiencia del cliente y mejorarla continuamente. Se pueden crear al lanzar un nuevo producto o servicio, al identificar problemas en la experiencia del cliente o como parte de una revisión regular de la estrategia de experiencia del cliente."
        },
        {
            value: "item-6",
            trigger: "¿Cómo se pueden utilizar los customer journey maps en una empresa?",
            content: "Los customer journey maps se pueden utilizar de varias maneras en una empresa, como para diseñar estrategias de marketing más efectivas, mejorar la usabilidad del sitio web, optimizar el servicio al cliente y desarrollar productos y servicios que satisfagan mejor las necesidades de los clientes."
        },
    ];

    return (
        <div>
            <Breadcrumb className="xl:mx-[10%] lg:mx-[7%] md:mx-[5%] mx-[5%] mt-5">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <Link href="/">Home</Link>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Customer journey map</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <BlogStructure
                title="Crea tu customer journey map online"
                description="Un customer journey map o mapa de experiencia del cliente es una representación visual del proceso por el que pasa un cliente, desde que descubre su producto o servicio hasta que se convierte en cliente leal. Esto permite identificar oportunidades para mejorar la experiencia del cliente y optimizar los procesos empresariales."
                cta="Crear CJA gratis"
                alt="Customer journey map"
                img="/placeholders/customer-journey-map.png"
            />
            <LogoSlider />
            <LandingVideo />
            <BlogSection
                title="Comprende el viaje de tus clientes"
                text={
                    <>
                        El principal objetivo al usar customer journey maps es mejorar la experiencia del cliente. Estas herramientas permiten comprender profundamente las necesidades y emociones de los clientes en cada etapa de su interacción con la marca, lo que facilita la identificación de puntos de mejora. Con Sketchlie puedes partir en segundos con nuestra <Link href="/plantillas/customer-journey-map/" className="text-custom-blue hover:underline">plantilla de customer journey map</Link>.
                    </>
                }
                text2="Al optimizar los procesos internos en función de estos mapas, las empresas pueden ofrecer una experiencia más satisfactoria, lo que puede conducir a una mayor lealtad del cliente, mayores conversiones y una ventaja competitiva en el mercado."
                alt="Lluvia de Ideas"
                img="/placeholders/lluvia-de-ideas.png"
                side="right"
            />
            <BlogSection
                title="Mejora tus procesos para tus clientes"
                text="Los customer journey maps ofrecen una visión detallada del proceso de interacción del cliente con la empresa. Al identificar puntos críticos y oportunidades para mejorar, permiten ajustar los procesos internos para satisfacer mejor las necesidades del cliente."
                alt="Mapa mental"
                img="/placeholders/mapa-mental.png"
                side="right"
            />
            <BlogSection
                title="La eficiencia es la clave"
                text="Estos mapas revelan dónde y cómo los clientes interactúan con la marca, facilitando una comprensión más profunda de sus expectativas. Ayudan a identificar puntos de fricción y áreas de mejora específicas, lo que permite implementar cambios centrados en el cliente. En última instancia, esto conduce a una experiencia del cliente más fluida y satisfactoria."
                alt="Mapa de Proceso"
                img="/placeholders/improve-performance.png"
                side="right"
            />
            <BlogSection
                title="Haz customer journey maps efectivo"
                text="Crear customer journey maps con Sketchlie es simple y efectivo. Con esta plataforma, puedes visualizar fácilmente el proceso completo de interacción del cliente con tu empresa, desde el descubrimiento hasta la postventa. Sketchlie te permite identificar puntos críticos y oportunidades de mejora en la experiencia del cliente de manera clara y colaborativa. Además, puedes compartir y colaborar en tiempo real con tu equipo para implementar cambios específicos y centrados en el cliente."
                alt="Pizarra Online"
                img="/placeholders/pizarra-online.png"
                side="right"
            />
            <TemplatesSlider />
            <div className="my-20">
                <PlatformYouCanTrust />
            </div>
            <HowToCreate steps={steps} title="Cómo hacer customer journey map online" />
            <FaqSection accordionData={faqData} sectionTitle="los customer journey maps" />
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 xl:mx-[10%] lg:mx-[7%] md:mx-[5%] mx-[5%] gap-5 md:my-10 my-5">
                <VerMas title="¿Qué es un customer journey map?" href="/customer-journey-map/que-es-customer-journey-map/" />
                <VerMas title="¿Cómo se crea un customer journey map?" href="/customer-journey-map/que-es-customer-journey-map/" />
                <VerMas title="¿Cómo se utiliza un customer journey map?" href="/customer-journey-map/que-es-customer-journey-map/" />
            </div>
        </div>

    );
}

export default LandingPage;
