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
    title: "Actualización Mayo 2024: Mejoras y Plantillas | Sketchlie",
    description: "Discover the latest features and upgrades we've launched in May 2024. From new templates to enhanced collaboration tools, Sketchlie is better than ever!",
    keywords: ["Sketchlie", "May 2024", "New Features", "Wireframes", "Collaboration Tools", "Design Templates", "Diagramming Tools", "Visual Collaboration", "Online Whiteboard", "Mind Mapping", "Mapa Conceptual", "Mapa de Procesos", "Mapas Mentales", "Wireframes Online", "Sketchlie Blog", "Sketchlie Updates", "Sketchlie Features", "Sketchlie News", "Sketchlie May 2024", "Sketchlie What's New", "Sketchlie Upgrades", "Sketchlie Improvements", "Sketchlie Enhancements", "Sketchlie Release Notes", "Sketchlie Release", "Sketchlie Product Updates", "Sketchlie Product News", "Sketchlie Product Features", "Sketchlie Product Improvements", "Sketchlie Product Enhancements", "Sketchlie Product Release Notes", "Sketchlie Product Release", "Sketchlie Product Updates May 2024", "Sketchlie Product News May 2024", "Sketchlie Product Features May 2024", "Sketchlie Product Improvements May 2024", "Sketchlie Product Enhancements May 2024", "Sketchlie Product Release Notes May 2024", "Sketchlie Product Release May 2024", "Sketchlie May 2024 Updates", "Sketchlie May 2024 News", "Sketchlie May 2024 Features", "Sketchlie May 2024 Improvements", "Sketchlie May 2024 Enhancements", "Sketchlie May 2024 Release Notes", "Sketchlie May 2024 Release", "Sketchlie May 2024 Product Updates", "Sketchlie May 2024 Product News", "Sketchlie May 2024 Product Features", "Sketchlie May 2024 Product Improvements", "Sketchlie May 2024 Product Enhancements", "Sketchlie May 2024 Product Release Notes", "Sketchlie May 2024 Product Release", "Sketchlie May 2024 Product Updates", "Sketchlie May 2024 Product News", "Sketchlie May 2024 Product Features", "Sketchlie May 2024 Product Improvements", "Sketchlie May 2024 Product Enhancements", "Sketchlie May 2024 Product Release Notes", "Sketchlie May 2024 Product Release", "Sketchlie May 2024 Release Notes", "Sketchlie May 2024 Release", "Sketchlie May 2024 Product Updates", "Sketchlie May 2024"],
    alternates: {
        canonical: "https://www.sketchlie.com/blog/what-is-new-may-2024/",
    }
};


const LandingPage = () => {
    return ( 
        <div className="xl:mx-[10%] lg:mx-[7%] md:mx-[5%] mx-[3%]">
           <div className="mt-[3%]">
           <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                <Link href="/" title="Home">Home</Link>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                <Link href="/blog/">Blog</Link>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                <BreadcrumbPage>Actualización Mayo 2024: Mejoras y Plantillas</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
            </Breadcrumb>
           </div>
         <h1 className="xl:text-6xl lg:text-5xl md:text-4xl text-3xl mt-[3%] lg:pr-20" style={{lineHeight: "1.2"}}>
            Actualización Mayo 2024: Mejoras y Plantillas
         </h1>
           <Image
                src="/placeholders/what-is-new-may-2024.png"
                alt="Icons Templates and Tools"
                width={1920}
                height={1080}
                className="rounded-2xl border border-black mt-[3%]" 
           />
           <div className="flex flex-col-reverse lg:flex-row justify-between mt-[3%]">
                <div className="lg:max-w-[70%] text-xl">
                    <p className="mb-10">¡Bienvenido al mundo de Sketchlie, donde la creatividad se encuentra con la funcionalidad! <Link className="text-custom-blue hover:underline" href="/">Sketchlie</Link> ha lanzado recientemente algunas emocionantes actualizaciones que seguramente revolucionarán la forma en que dibujas, generas ideas y colaboras en línea. Desde opciones de personalización mejoradas hasta una gran cantidad de nuevas plantillas, profundicemos en los detalles de estas emocionantes características nuevas.</p>
                    <div id="1" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">1. Arrastrar y Soltar Capas</h2>
                    <p className="mb-10">Una de las actualizaciones más esperadas es la capacidad de arrastrar e insertar capas personalizadas con ancho y alto variables. Ahora, los usuarios pueden ajustar sin esfuerzo sus dibujos a sus especificaciones exactas, brindándoles un control sin precedentes sobre sus diseños. Con un simple arrastre, puedes insertar capas de cualquier tamaño, haciendo que el proceso de dibujo sea más fluido e intuitivo.</p>
                    <div id="2" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">2. Vista Previa Antes de la Inserción</h2>
                    <p className="mb-10">Otra característica emocionante es la capacidad de previsualizar tus dibujos antes de insertarlos en tu <Link className="text-custom-blue hover:underline" href="https://www.pizarraonline.com/">pizarra online</Link>. Esta función te permite ver cómo se verá tu diseño en el contexto de tu proyecto antes de comprometerte a insertarlo. Con la vista previa antes de la inserción, puedes asegurarte de que tus dibujos se ajusten perfectamente a tus necesidades y expectativas.</p>
                    <div id="3" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">3. Biblioteca de Iconos Ampliada</h2>
                    <p className="mb-10">Los iconos son los elementos básicos de la comunicación visual, y Sketchlie comprende su importancia. Con una gran cantidad de nuevos iconos agregados a la biblioteca, los usuarios ahora tienen acceso a una gama aún más amplia de elementos visuales para transmitir sus ideas de manera efectiva. Desde formas básicas hasta símbolos intrincados, las posibilidades son infinitas.</p>
                    <div id="4" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">4. Área de Texto Dinámica</h2>
                    <p className="mb-10">El nuevo área de texto con límites dinámicos se adapta perfectamente al contenido, asegurando que tu texto siempre se muestre de manera legible. Ya sea que estés tomando notas o etiquetando elementos, el área de texto dinámica proporciona flexibilidad sin comprometer la legibilidad. Esta nueva área de texto esta pensada para que sea lo más intuitiva y fácil de utilizar.</p>
                    <div id="5" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">5. Personalización de Fuentes</h2>
                    <p className="mb-10">¡Personaliza tu texto con facilidad! Sketchlie ahora ofrece un botón de fuente que permite a los usuarios actualizar la fuente del texto con solo un clic. Ya sea que prefieras una fuente sans-serif elegante o una serif clásica, puedes elegir la fuente perfecta para complementar tu estética de diseño.</p>
                    <div id="6" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">6. Plantillas</h2>
                    <p className="mb-10">Presentamos una amplia variedad de plantillas para diversos propósitos, incluyendo diagrama, diagrama de flujo, mapa de viaje del cliente, wireframes, mapa conceptual y más. Estas plantillas pre-diseñadas proporcionan un punto de partida en tus dibujos, ahorrándote tiempo y esfuerzo mientras aseguras resultados profesionales. Ya sea que estés mapeando un proceso o creando un wireframe, hay una plantilla para satisfacer tus necesidades.</p>
                    <div id="7" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">7. Conclusión</h2>
                    <p className="mb-10">¡Estas actualizaciones son solo la punta del iceberg! Para explorar todas las nuevas funciones y mejoras, visita el sitio web de Sketchlie en <Link className="text-custom-blue hover:underline" href="/">sketchlie.com</Link>. No olvides visitar también <Link className="text-custom-blue hover:underline" href="https://www.pizarraonline.com/">pizarra online</Link>, una versión simplificada de Sketchlie para todos grátis</p>
                </div>
                <div className="lg:w-[30%] xl:ml-10 lg:ml-5 border border-black rounded-lg p-10 bg-white dark:bg-[#020817] lg:sticky lg:z-30 lg:top-24 lg:h-[50%] lg:mb-0 mb-10">
                    <h3 className="text-2xl mb-3">
                        Indice
                    </h3>
                    <ul>
                        <li className="mb-4">
                            <Link href="#1" className="text-custom-blue hover:underline mb-10">1. Arrastrar y Soltar Capas</Link>
                        </li>
                        <li className="mb-4">
                            <Link href="#2" className="text-custom-blue hover:underline mb-10">2. Vista Previa Antes de la Inserción</Link>
                        </li>
                        <li className="mb-4">
                            <Link href="#3" className="text-custom-blue hover:underline mb-10">3. Biblioteca de Iconos Ampliada</Link>
                        </li>
                        <li className="mb-4">
                            <Link href="#4" className="text-custom-blue hover:underline mb-10">4. Área de Texto Dinámica</Link>
                        </li>
                        <li className="mb-4">
                            <Link href="#5" className="text-custom-blue hover:underline mb-10">5 . Personalización de Fuentes</Link>
                        </li>
                        <li className="mb-4">
                            <Link href="#6" className="text-custom-blue hover:underline mb-10">6. Plantillas</Link>
                        </li>
                        <li className="mb-4">
                            <Link href="#7" className="text-custom-blue hover:underline mb-10">7. Conclusión</Link>
                        </li>
                    </ul>
                </div>
           </div>
           <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5 md:my-20 my-5">
                <BlogLinks blogTitle="Tutorial de la Pizarra Online" blogImage="/placeholders/pizarra-online.png" blogHref="/blog/pizarra-online-tutorial/" blogDescription="La Pizarra Online de Sketchlie cuenta con una amplia gama de funcionalidades en este tutorial, te guiaremos a través de las herramientas..." isNew={true}/>
                <BlogLinks blogTitle="Mapa de Procesos" blogImage="/placeholders/mapa-de-procesos.png" blogHref="/mapas-de-procesos" blogDescription="El mapa de procesos ayuda a los equipos a mapear y implementar mejoras. Registrate hoy con una 3 espacios de trabajo gratuitos para empezar a utilizar la mejor herramienta de mapa de procesos." isNew={true}/>
                <BlogLinks blogTitle="Mapas Mentales" blogImage="/placeholders/mapa-mental.png" blogHref="/mapa-mental-online/" blogDescription="Explora nuestras herramientas para simplificar la creación de mapas mentales. Organiza tus ideas de manera jerárquica y potencia tu creatividad con nuestro intuitivo creador de mapas mentales." isNew={true}/>
            </div>
        </div>    
     );
}
 
export default LandingPage;
