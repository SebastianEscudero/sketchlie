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
    title: "Plantillas de lluvia de ideas | Sketchlie",
    description: "Haz una lluvia de ideas, crea un plan de acción, organiza tus pensamientos. Nuestra plantilla de lluvia de ideas te permite capturar y organizar ideas de forma creativa y colaborativa.",
    keywords: ["plantillas", "lluvia de ideas", "brainstorming", "creatividad", "organización", "planificación", "ideas", "proyectos", "procesos", "estrategias", "innovación", "colaboración", "visualización", "diagramas", "mapas mentales", "mapas conceptuales", "plantillas de lluvia de ideas", "plantillas de brainstorming", "plantillas de mapas mentales", "plantillas de mapas conceptuales", "plantillas de organización de ideas", "plantillas de planificación de proyectos", "plantillas de estrategias", "plantillas de innovación", "plantillas de colaboración", "plantillas de visualización", "plantillas de diagramas"],
    alternates: {
        canonical: "https://www.sketchlie.com/plantillas/lluvia-de-ideas/",
    }
};
const LandingPage = () => {
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
                            <BreadcrumbPage>Lluvia de ideas</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <div className="xl:mt-[-30px] mb-14">
                <BlogStructure
                    title="Plantilla de lluvia de ideas"
                    description="Reune tu equipo y explora las ideas para diseñar el futuro, crea planes innovadores y estrategias efectivas. En Sketchlie nuestra prioridad es ayudarte a ir de idea a plan de acción."
                    img="/templates/lluvia-de-ideas.png"
                    alt="Plantilla de Lluvia de ideas"
                    cta="Utilizar plantilla"
                />
            </div>
            <div className="flex flex-col-reverse lg:flex-row justify-between xl:mx-[10%] lg:mx-[7%] md:mx-[5%] mx-[5%] mt-5">
                <div className="lg:max-w-[70%] text-xl">
                    <div id="1" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">¿Qué es una lluvia de ideas?</h2>

                    <p className="mb-10">Una <Link className="text-custom-blue hover:underline" href="/lluvia-de-ideas/">lluvia de ideas</Link>, también conocida como brainstorming, es una técnica utilizada para generar ideas de manera rápida y libre en un ambiente de colaboración. Consiste en reunir a un grupo de personas con diferentes perspectivas y experiencias para que aporten ideas sobre un tema específico. Durante una sesión de lluvia de ideas, se fomenta la creatividad y se suspende la crítica, permitiendo que las ideas fluyan libremente sin restricciones. El objetivo principal es generar la mayor cantidad posible de ideas, sin importar su viabilidad o originalidad en ese momento.</p>

                    <div id="2" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">¿Cuáles son las reglas básicas de una lluvia de ideas?</h2>

                    <ul style={{ listStyleType: 'disc' }}>
                        <li className="mb-10 ml-5">
                            <strong>Libertad de expresión:</strong> Todos los participantes deben sentirse libres de expresar cualquier idea, por más descabellada que parezca.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Posposición del juicio:</strong> Durante la sesión, no se permite juzgar ni criticar las ideas propuestas. El enfoque está en la generación de ideas, no en su evaluación.
                        </li>
                    </ul>

                    <div id="3" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">¿Quién inventó la lluvia de ideas?</h2>

                    <p className="mb-10">La técnica de la lluvia de ideas fue desarrollada por Alex Faickney Osborn, un publicista y escritor estadounidense, en la década de 1930. Osborn popularizó esta técnica en su libro Applied Imagination, publicado en 1953. A lo largo de los años, la lluvia de ideas ha sido ampliamente adoptada en diversas áreas, desde la publicidad y el diseño hasta la resolución de problemas en empresas y organizaciones.</p>

                    <div id="4" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">¿Cuáles son los beneficios de una lluvia de ideas?</h2>

                    <ul style={{ listStyleType: 'disc' }}>
                        <li className="mb-10 ml-5">
                            <strong>Fomenta la creatividad:</strong> Al permitir que las ideas fluyan libremente, se estimula la creatividad de los participantes.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Promueve la colaboración:</strong> La lluvia de ideas es una actividad colaborativa que fomenta la participación de todos los miembros del equipo.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Genera soluciones innovadoras:</strong> Al explorar una amplia gama de ideas, es más probable encontrar soluciones innovadoras a problemas complejos.
                        </li>
                    </ul>

                    <div id="5" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">¿Cómo se lleva a cabo una sesión de lluvia de ideas?</h2>

                    <p className="mb-10">Una sesión de <Link className="text-custom-blue hover:underline" href="/lluvia-de-ideas/">lluvia de ideas</Link> generalmente sigue estos pasos:</p>
                    <ul style={{ listStyleType: 'disc' }}>
                        <li className="mb-10 ml-5">
                            <strong>Definición del problema:</strong> Se establece claramente el problema o el objetivo que se desea abordar con la lluvia de ideas.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Generación de ideas:</strong> Los participantes proponen ideas de forma libre y sin restricciones durante un período de tiempo determinado.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Organización y evaluación:</strong> Una vez que se han generado suficientes ideas, se organizan y evalúan para identificar las más viables o prometedoras.
                        </li>
                    </ul>
                    <div id="6" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">¿Cuál es la diferencia entre una lluvia de ideas tradicional y una lluvia de ideas electrónica?</h2>

                    <p className="mb-10">La <Link className="text-custom-blue hover:underline" href="/lluvia-de-ideas/">lluvia de ideas</Link> tradicional y la lluvia de ideas electrónica son dos enfoques diferentes para generar ideas, cada uno con sus propias ventajas y desafíos:</p>

                    <ul style={{ listStyleType: 'disc' }}>
                        <li className="mb-10 ml-5">
                            <strong>Lluvia de ideas tradicional:</strong> En este enfoque, los participantes se reúnen físicamente en un lugar específico para colaborar en la generación de ideas. Se fomenta la interacción directa y la creatividad en tiempo real. Sin embargo, puede ser limitado por factores como la disponibilidad de tiempo y la ubicación geográfica de los participantes.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Lluvia de ideas electrónica:</strong> En este caso, los participantes utilizan herramientas digitales, como aplicaciones o plataformas en línea, para colaborar en la generación de ideas de forma remota. Esto permite la participación de personas ubicadas en diferentes lugares y en diferentes zonas horarias. Además, algunas herramientas electrónicas ofrecen funciones adicionales, como la capacidad de votar por ideas favoritas o comentar sobre las propuestas de otros participantes. Sin embargo, la lluvia de ideas electrónica puede carecer del mismo nivel de interacción y creatividad espontánea que se encuentra en las sesiones presenciales.
                        </li>
                    </ul>

                    <div id="7" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">¿Cómo se puede facilitar una lluvia de ideas efectiva?</h2>

                    <p className="mb-10">Facilitar una lluvia de ideas efectiva requiere atención a varios aspectos clave para garantizar que el proceso sea productivo y que se generen ideas de calidad:</p>

                    <ul style={{ listStyleType: 'disc' }}>
                        <li className="mb-10 ml-5">
                            <strong>Establecer un ambiente favorable:</strong> Es importante crear un entorno cómodo y libre de distracciones donde los participantes se sientan seguros para compartir sus ideas sin temor al juicio.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Definir claramente el problema:</strong> Antes de comenzar la lluvia de ideas, es fundamental tener una comprensión clara del problema o desafío que se desea abordar para enfocar la discusión de manera efectiva.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Establecer reglas claras:</strong> Comunicar las reglas básicas de la lluvia de ideas, como la posposición del juicio y la libertad de expresión, ayuda a guiar el proceso y a mantener el enfoque en la generación de ideas.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Utilizar técnicas de facilitación:</strong> El facilitador puede emplear diversas técnicas, como la lluvia de ideas dirigida o el mapeo de ideas, para estimular la creatividad y la colaboración entre los participantes.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Fomentar la participación equitativa:</strong> Es importante asegurarse de que todos los miembros del equipo tengan la oportunidad de contribuir con sus ideas y que se escuchen todas las voces.
                        </li>
                    </ul>

                </div>
                <div className="lg:w-[30%] xl:ml-10 lg:ml-5 border border-black rounded-lg p-10 bg-[#FFF] lg:sticky lg:z-30 lg:top-24 lg:h-[50%] lg:mb-0 mb-10">
                    <h3 className="text-3xl mb-3 font-roobert font-semibold">
                        Comienza con nuestra plantilla
                    </h3>
                    <p className="text-lg text-zinc-600 mb-4 font-roobert">
                        Colabora en línea, organiza tus ideas y crea planes ejecutable en el mínimo tiempo posible.
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
