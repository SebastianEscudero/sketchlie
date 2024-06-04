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
    title: "Plantilla de línea de tiempo gratuita | Sketchlie",
    description: "Dibuja la historia de tu proyecto o evento con una plantilla de línea de tiempo gratuita. Personaliza y comparte tu línea de tiempo en línea con Sketchlie.",
    keywords: ["plantilla de línea de tiempo", "línea de tiempo", "plantilla de línea de tiempo gratuita", "plantilla de línea de tiempo en línea", "plantilla de línea de tiempo personalizable", "plantilla de línea de tiempo de proyecto", "plantilla de línea de tiempo de evento", "plantilla de línea de tiempo de historia", "plantilla de línea de tiempo de proyecto en línea", "plantilla de línea de tiempo de evento en línea", "plantilla de línea de tiempo de historia en línea", "plantilla de línea de tiempo de proyecto gratuita", "plantilla de línea de tiempo de evento gratuita", "plantilla de línea de tiempo de historia gratuita", "plantilla de línea de tiempo de proyecto personalizable", "plantilla de línea de tiempo de evento personalizable", "plantilla de línea de tiempo de historia personalizable", "plantilla de línea de tiempo de proyecto personalizable en línea", "plantilla de línea de tiempo de evento personalizable en línea", "plantilla de línea de tiempo de historia personalizable en línea"],
    alternates: {
        canonical: "https://www.sketchlie.com/plantillas/linea-de-tiempo/",
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
                            <BreadcrumbPage>Línea de tiempo</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <div className="mt-[-70px]">
                <BlogStructure
                    title="Plantilla de línea de tiempo gratis"
                    description="Haz una biografía, dibuja un proceso, analiza la historia de tu marca. Las líneas de tiempo o cronogramas son una forma visual de representar eventos en secuencia. Utiliza nuestra plantilla de línea de tiempo para crear una representación visual de la historia de tu proyecto o evento."
                    img="/templates/linea-de-tiempo.png"
                    alt="Plantilla de Línea de tiempo"
                    cta="Utilizar plantilla"
                />
            </div>
            <div className="flex flex-col-reverse lg:flex-row justify-between mt-[3%] xl:mx-[10%] lg:mx-[7%] md:mx-[5%] mx-[3%]">
                <div className="lg:max-w-[70%] text-xl">
                    <div id="1" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">¿Qué es una línea de tiempo?</h2>

                    <p className="mb-10">Una <Link className="text-custom-blue hover:underline" href="/linea-de-tiempo/">línea de tiempo</Link> es una representación gráfica que muestra eventos ordenados cronológicamente. Se utiliza para visualizar la secuencia temporal de acontecimientos importantes en un proyecto, proceso histórico, vida de una persona, evolución de una idea, entre otros. Las líneas de tiempo pueden variar en complejidad, desde simples diagramas lineales hasta representaciones más elaboradas con detalles y contextos adicionales.</p>

                    <div id="2" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">¿Cuál es la importancia de un cronograma en un proyecto?</h2>

                    <p className="mb-10">Un cronograma en un proyecto es crucial porque ayuda a planificar, organizar y monitorear el progreso de las actividades. Proporciona una estructura temporal clara que permite asignar recursos de manera eficiente, establecer hitos y fechas límite, identificar posibles conflictos de programación y realizar ajustes según sea necesario. Además, un cronograma bien elaborado facilita la comunicación entre los miembros del equipo, los interesados y otras partes involucradas, al proporcionar una visión general del plan de trabajo y los plazos establecidos.</p>

                    <div id="3" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">¿Cómo se crea una línea de tiempo efectiva?</h2>

                    <ul style={{ listStyleType: 'disc' }}>
                        <li className="mb-10 ml-5">
                            <strong>Identificar eventos clave:</strong> Determine los eventos más relevantes que deben incluirse en la línea de tiempo.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Establecer la escala temporal:</strong> Determine la escala de tiempo, ya sea días, semanas, meses o años, según la duración del proyecto o proceso.
                        </li>
                    </ul>

                    <div id="4" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">¿Qué software puedo usar para crear líneas de tiempo?</h2>

                    <ul style={{ listStyleType: 'disc' }}>
                        <li className="mb-10 ml-5">
                            <strong>Microsoft Excel:</strong> Es una opción popular para crear líneas de tiempo simples utilizando gráficos de barras.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Microsoft PowerPoint:</strong> Permite crear líneas de tiempo más visuales y atractivas utilizando herramientas de diseño.
                        </li>
                    </ul>

                    <div id="5" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">¿Cómo se elabora un cronograma efectivo?</h2>

                    <ul style={{ listStyleType: 'disc' }}>
                        <li className="mb-10 ml-5">
                            <strong>Descomposición del trabajo:</strong> Divida el proyecto en tareas más pequeñas y manejables.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Estimación de tiempos:</strong> Asigne duraciones realistas a cada tarea y considere los recursos disponibles.
                        </li>
                    </ul>
                    <div id="6" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">¿Cuáles son las ventajas de utilizar una línea de tiempo en la enseñanza?</h2>

                    <p className="mb-10">Las líneas de tiempo son herramientas educativas poderosas que ayudan a los estudiantes a visualizar la secuencia temporal de eventos históricos, procesos científicos, desarrollos literarios y más. Algunas ventajas de utilizar líneas de tiempo en la enseñanza incluyen:</p>

                    <ul style={{ listStyleType: 'disc' }}>
                        <li className="mb-10 ml-5">
                            <strong>Claridad visual:</strong> Facilitan la comprensión de la cronología de los eventos mediante representaciones gráficas claras y ordenadas.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Contextualización:</strong> Ayudan a contextualizar los eventos históricos o los conceptos abstractos dentro de un marco temporal concreto.
                        </li>
                    </ul>

                    <div id="7" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">¿Cuáles son los elementos comunes de un cronograma?</h2>

                    <p className="mb-10">Los elementos comunes de una <Link className="text-custom-blue hover:underline" href="/linea-de-tiempo/">línea de tiempo</Link> pueden variar según la naturaleza del proyecto o proceso, pero típicamente incluyen:</p>

                    <ul style={{ listStyleType: 'disc' }}>
                        <li className="mb-10 ml-5">
                            <strong>Tareas o actividades:</strong> Una lista de las actividades necesarias para completar el proyecto.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Duración estimada:</strong> El tiempo esperado para completar cada tarea.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Fecha de inicio y finalización:</strong> Las fechas programadas para comenzar y finalizar cada tarea.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Responsable:</strong> La persona o equipo responsable de llevar a cabo cada tarea.
                        </li>
                    </ul>

                </div>
                <div className="lg:w-[30%] xl:ml-10 lg:ml-5 border border-black rounded-lg p-10 bg-[#FFF] lg:sticky lg:z-30 lg:top-24 lg:h-[50%] lg:mb-0 mb-10">
                    <h3 className="text-3xl mb-3 font-roobert font-semibold">
                        Comienza con nuestra plantilla
                    </h3>
                    <p className="text-lg text-zinc-600 mb-4 font-roobert">
                        Haz una secuencia de eventos, y analiza tu historia.
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
