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

export const metadata: Metadata = {
    title: "Plantilla de modelo canvas | Sketchlie",
    description: "Acelera tu flujo de trabajo con la metodologia canvas, crea tu modelo canvas con nuestra plantilla gratuita.",
    keywords: ["modelo canvas", "canvas", "plantilla", "plantilla canvas", "modelo de negocio", "plantilla modelo canvas", "plantilla canvas gratis", "plantilla canvas online", "plantilla canvas editable", "plantilla canvas pdf", "plantilla canvas word", "plantilla canvas ppt", "plantilla canvas powerpoint", "plantilla canvas excel", "plantilla canvas google slides", "plantilla canvas google docs", "plantilla canvas google sheets", "plantilla canvas sketchlie", "plantilla canvas sketchlie.com"],
    alternates: {
        canonical: "https://www.sketchlie.com/plantillas/modelo-canvas/",
    }
};
const LandingPage = () => {

    const steps = [
        {
            trigger: "1. Identifica los Segmentos de Clientes",
            text: "Define claramente quiénes son tus clientes potenciales y agrúpalos en segmentos basados en características comunes."
        },
        {
            trigger: "2. Define la Propuesta de Valor",
            text: "Determina qué problema estás resolviendo para tus clientes y qué beneficios específicos les ofreces que te diferencian de la competencia."
        },
        {
            trigger: "3. Selecciona los Canales",
            text: "Establece cómo llegarás a tus segmentos de clientes. Considera canales de distribución, comunicación y ventas."
        },
        {
            trigger: "4. Establece Relaciones con Clientes",
            text: "Define el tipo de relación que deseas mantener con cada segmento de clientes, ya sea personal, automatizada, autoservicio, etc."
        },
        {
            trigger: "5. Determina las Fuentes de Ingresos",
            text: "Describe cómo generará ingresos tu negocio. Considera las diferentes formas de monetización, como ventas directas, suscripciones, licencias, etc."
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
                            <BreadcrumbPage>Modelo Canvas</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
                <BlogStructure
                    title="Plantilla de modelo canvas"
                    description="Gestiona tu empresa de forma eficiente con el modelo canvas. Crea tu modelo de negocio con nuestra plantilla gratuita y colaborativa."
                    img="/templates/modelo-canvas.png"
                    alt="Plantilla de Modelo Canvas"
                    cta="Utilizar plantilla"
                />
            <div className="flex flex-col-reverse lg:flex-row justify-between xl:mx-[10%] lg:mx-[7%] md:mx-[5%] mx-[5%] mt-5">
                <div className="lg:max-w-[70%] text-xl">
                    <div id="1" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">1. ¿Qué es el Modelo Canvas?</h2>
                    <p className="mb-10">
                        El Modelo Canvas es una herramienta estratégica de gestión empresarial que permite diseñar, describir y pivotar modelos de negocio de manera visual y simplificada. Fue propuesto por Alexander Osterwalder e Yves Pigneur en su libro Business Model Generation.
                    </p>
                    <p className="mb-10">
                        Este modelo se representa en un lienzo dividido en nueve bloques que cubren las áreas esenciales de un negocio: segmentos de clientes, propuesta de valor, canales, relaciones con clientes, fuentes de ingresos, recursos clave, actividades clave, socios clave y estructura de costos. Cada bloque del Modelo Canvas ayuda a comprender mejor y a gestionar las distintas partes de una empresa, facilitando la alineación y comunicación de la estrategia entre los equipos.
                    </p>
                    <p className="mb-10">
                        Esta herramienta es ampliamente utilizada por startups y grandes empresas debido a su capacidad para simplificar conceptos complejos y su flexibilidad para adaptarse a diferentes tipos de negocios.
                    </p>

                    <div id="2" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">2. ¿Cómo se utiliza una plantilla del Modelo Canvas?</h2>
                    <p className="mb-10">
                        Utilizar una <Link className="text-custom-blue hover:underline" href="/dashboard/">plantilla de modelo canvas</Link> es sencillo y se centra en llenar los nueve bloques que componen el modelo. Primero, se debe definir claramente el segmento de clientes, identificando quiénes son los clientes potenciales. Luego, se establece la propuesta de valor, que es lo que diferencia al producto o servicio en el mercado.
                    </p>
                    <p className="mb-10">
                        Los canales describen cómo se llegará a los clientes, y las relaciones con clientes detallan cómo se interactuará y mantendrá la relación con ellos. Las fuentes de ingresos explican cómo el negocio generará dinero. En cuanto a los recursos clave, se identifican los activos necesarios para hacer funcionar el negocio. Las actividades clave son las acciones que deben realizarse para que el modelo de negocio funcione.
                    </p>
                    <p className="mb-10">
                        Los socios clave son las alianzas y colaboraciones necesarias. Finalmente, la estructura de costos abarca todos los gastos necesarios para operar el modelo de negocio. Completar esta plantilla permite tener una visión clara y concisa del negocio, ayudando en la toma de decisiones estratégicas.
                    </p>

                    <div id="3" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">3. ¿Cuáles son los componentes del Modelo Canvas?</h2>
                    <ul style={{ listStyleType: 'disc' }}>
                        <li className="mb-10 ml-5">
                            <strong>Segmentos de Clientes:</strong> Los diferentes grupos de personas u organizaciones a los que se dirige el negocio.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Propuesta de Valor:</strong> La razón por la cual los clientes eligen el producto o servicio en lugar de otros.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Canales:</strong> Los medios a través de los cuales se entrega la propuesta de valor a los clientes.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Relaciones con Clientes:</strong> El tipo de relación que se establece con los diferentes segmentos de clientes.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Fuentes de Ingresos:</strong> Cómo se generará dinero a partir de cada segmento de clientes.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Recursos Clave:</strong> Los activos esenciales para que el negocio funcione.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Actividades Clave:</strong> Las cosas más importantes que la empresa debe hacer para que su modelo de negocio funcione.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Socios Clave:</strong> Las alianzas y colaboraciones que ayudan a que el negocio funcione.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Estructura de Costos:</strong> Todos los costos en los que incurre la empresa para operar su modelo de negocio.
                        </li>
                    </ul>

                    <div id="4" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">4. ¿Qué ventajas ofrece el Modelo Canvas?</h2>
                    <p className="mb-10">
                        El Modelo Canvas ofrece numerosas ventajas para las empresas de todos los tamaños. En primer lugar, su formato visual facilita la comprensión y la comunicación de la estrategia empresarial entre todos los miembros del equipo, eliminando la necesidad de extensos documentos escritos.
                    </p>
                    <p className="mb-10">
                        Además, permite una visión holística del negocio, lo que facilita la identificación de áreas de mejora y la alineación de todos los aspectos del modelo de negocio. También fomenta la innovación, ya que permite experimentar con diferentes elementos del modelo de negocio de manera rápida y económica.
                    </p>
                    <p className="mb-10">
                        Otra ventaja es su flexibilidad, ya que puede adaptarse a cualquier tipo de industria o mercado. Finalmente, el Modelo Canvas ayuda en la toma de decisiones estratégicas, proporcionando una estructura clara para analizar y comparar diferentes opciones de negocio.
                    </p>
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
                <div className="lg:w-[30%] xl:ml-10 lg:ml-5 border border-black rounded-lg p-10 bg-[#FFF] lg:sticky lg:z-30 lg:top-24 lg:h-[50%] lg:mb-0 mb-10">
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
            <div className="my-20">
                <HowToCreate 
                    title="¿Cómo crear un Modelo Canvas?"
                    steps={steps}
                />
            </div>
            <TemplatesSlider />
        </div >
    );
}

export default LandingPage;
