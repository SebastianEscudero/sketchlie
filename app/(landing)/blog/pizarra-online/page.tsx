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
    title: "Desata tu Creatividad con la Pizarra Virtual Online de Sketchlie",
    description: "En un mundo cada vez más digitalizado, la necesidad de herramientas de colaboración efectivas se ha vuelto fundamental para empresas, educadores y equipos de trabajo. Descubre cómo la pizarra virtual online de Sketchlie puede ayudarte a potenciar tu creatividad y productividad en tiempo real.",
    keywords: ["pizarra virtual online", "colaboración en tiempo real", "herramientas de colaboración", "pizarra digital", "creatividad", "productividad", "trabajo en equipo", "herramientas colaborativas", "Sketchlie"],
    alternates: {
        canonical: "https://www.sketchlie.com/blog/pizarra-online/",
    }
};

const LandingPage = () => {
    return ( 
        <div className="xl:mx-[10%] lg:mx-[7%] md:mx-[5%] mx-[3%]">
           <div className="mt-20">
           <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                <Link href="/">Home</Link>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                <Link href="/blog">Blog</Link>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                <BreadcrumbPage>Desata tu Creatividad con la Pizarra Virtual Online de Sketchlie</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
            </Breadcrumb>
           </div>
           <h1 className="xl:text-6xl lg:text-5xl md:text-4xl text-3xl mt-20 lg:pr-20" style={{lineHeight: "1.2"}}>
                Colabora facilmente con la Pizarra Online de Sketchlie
            </h1>
           <Image
                src="/placeholders/pizarra-online.png"
                alt="Pizarra online"
                width={1920}
                height={1080}
                className="rounded-2xl border border-black mt-20" 
           />
           <div className="flex flex-col-reverse lg:flex-row justify-between mt-20">
                <div className="lg:max-w-[70%] text-xl">
                    <div id="1" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">1. Una Mirada a la Pizarra Virtual Online</h2>
                    <p className="mb-10">En un mundo cada vez más digitalizado, la necesidad de herramientas de colaboración efectivas se ha vuelto fundamental para empresas, educadores y equipos de trabajo. Es en este contexto que surge la pizarra virtual online, una plataforma innovadora que permite a los usuarios colaborar en tiempo real, independientemente de su ubicación geográfica.</p>
                    <p className="mb-10">En <Link className="text-custom-blue hover:underline" href="/">Sketchlie</Link>, entendemos la importancia de la colaboración sin fronteras, por lo que hemos desarrollado una pizarra virtual online que facilita la creación, edición y compartición de ideas de manera fluida y eficiente.</p>
                    <div id="2" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">2. Herramientas para la Creación en Tiempo Real</h2>
                    <p className="mb-10">Una de las características más destacadas de nuestra pizarra virtual es su conjunto de herramientas intuitivas, diseñadas para potenciar la creatividad y la productividad de los usuarios. Algunas de las herramientas más populares incluyen:</p>
                    <ul style={{ listStyleType: 'disc' }}>
                    <li className="mb-10 ml-5">
                            <strong>Pluma:</strong> Permite a los usuarios dibujar, resaltar y anotar en la pizarra con facilidad.
                    </li>
                    <li className="mb-10 ml-5">
                        <strong>Formas:</strong> Ofrece una variedad de formas predefinidas para estructurar ideas de manera visual y organizada.
                    </li>
                    <li className="mb-10 ml-5">
                        <strong>Texto:</strong> Permite agregar texto personalizado para contextualizar y explicar conceptos de forma clara.
                    </li>
                    </ul>
                    <p className="mb-10">Estas herramientas, combinadas con la capacidad de colaboración en tiempo real, transforman la experiencia de trabajo en equipo, permitiendo a los usuarios expresar sus ideas de manera creativa y colaborativa.</p>
                    <div id="3" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">3. Ventajas del Uso de la Pizarra Virtual Online</h2>
                    <p className="mb-10">La adopción de una pizarra virtual online como la ofrecida por Sketchlie conlleva una serie de beneficios significativos para individuos y equipos:</p>
                    <ul style={{ listStyleType: 'disc' }}>
                    <li className="mb-10 ml-5">
                            <strong>Colaboración Remota:</strong> Permite a equipos dispersos trabajar juntos en proyectos sin importar su ubicación geográfica.
                    </li>
                    <li className="mb-10 ml-5">
                        <strong>Registro de Cambios:</strong> Facilita el seguimiento de la evolución de ideas al mantener un registro de todas las modificaciones realizadas en la pizarra.
                    </li>
                    <li className="mb-10 ml-5">
                        <strong>Acceso Universal:</strong> Puede ser utilizado en cualquier dispositivo con conexión a Internet, lo que garantiza la accesibilidad en todo momento.
                    </li>
                    </ul>
                    <p className="mb-10">Estas ventajas no solo mejoran la eficiencia y la productividad, sino que también fomentan una cultura de colaboración y creatividad dentro de los equipos.</p>
                    <div id="4" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">4. El Rol de la Pizarra Virtual en la Era Digital</h2>
                    <p className="mb-10">En un entorno empresarial y educativo cada vez más digitalizado, la pizarra virtual online se ha convertido en una herramienta indispensable para la comunicación y la colaboración efectivas. Su capacidad para facilitar la creación y el intercambio de ideas en tiempo real la posiciona como una herramienta esencial para abordar los desafíos de la colaboración en un mundo globalizado.</p>
                    <p className="mb-10">En Sketchlie, estamos comprometidos a seguir innovando y mejorando nuestra pizarra virtual para satisfacer las necesidades cambiantes de nuestros usuarios. Creemos que la colaboración no tiene límites y estamos orgullosos de ofrecer una plataforma que refleja esa creencia.</p>
                    <p className="mb-10">Para obtener más información sobre cómo nuestra pizarra virtual online puede transformar la forma en que trabajas, visita <Link className="text-custom-blue hover:underline" href="/pizarra-online">Sketchlie</Link>.</p>
                    <div id="5" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">5. Explora Más Recursos</h2>
                    <p className="mb-10">¿Interesado en conocer otras herramientas de colaboración disponibles en Sketchlie? Echa un vistazo a nuestros recursos:</p>
                    <ul style={{ listStyleType: 'disc' }}>
                    <li className="mb-10 ml-5">
                            <strong><Link className="text-custom-blue hover:underline" href="/mapa-conceptual">Mapa Conceptual</Link>:</strong> Crea mapas conceptuales para visualizar relaciones entre ideas.
                    </li>
                    <li className="mb-10 ml-5">
                        <strong><Link className="text-custom-blue hover:underline" href="/diagrama-de-flujo">Diagrama de Flujo</Link>:</strong> Diseña procesos y flujos de trabajo de manera visual y estructurada.
                    </li>
                    <li className="mb-10 ml-5">
                        <strong><Link className="text-custom-blue hover:underline" href="/wireframe">Wireframe</Link>:</strong> Crea prototipos de páginas web y aplicaciones con facilidad.
                    </li>
                    <li className="mb-10 ml-5">
                        <strong><Link className="text-custom-blue hover:underline" href="/mapa-mental-online">Mapa Mental</Link>:</strong> Organiza ideas de forma jerárquica y visual.
                    </li>
                    <li className="mb-10 ml-5">
                        <strong><Link className="text-custom-blue hover:underline" href="/mapas-de-procesos">Mapas de Procesos</Link>:</strong> Visualiza y optimiza procesos empresariales de manera eficiente.
                    </li>
                    </ul>
                    <p className="mb-10">Visita nuestro <Link className="text-custom-blue hover:underline" href="/blog">blog</Link> para obtener consejos, tutoriales y casos de estudio sobre cómo aprovechar al máximo nuestras herramientas de colaboración.</p>
                    <div id="6" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">6. Conclusión</h2>
                    <p className="mb-10">La pizarra virtual online ha revolucionado la forma en que colaboramos y compartimos ideas en la era digital. En Sketchlie, estamos comprometidos a proporcionar una plataforma que permita a individuos y equipos trabajar juntos de manera más eficiente y creativa, sin importar la distancia.</p>
                    <p className="mb-10">¡Únete a nosotros en este viaje hacia una colaboración sin límites! Descubre más sobre nuestra pizarra virtual y otras herramientas de colaboración en <Link className="text-custom-blue hover:underline" href="/">Sketchlie</Link>.</p>
                </div>
                <div className="lg:w-[30%] xl:ml-10 lg:ml-5 border border-black rounded-lg p-10 bg-[#FFF] lg:sticky lg:z-30 lg:top-24 lg:h-[50%] lg:mb-0 mb-10">
                    <h3 className="text-2xl mb-3">
                        Indice
                    </h3>
                    <ul>
                        <li className="mb-4">
                            <Link href="#1" className="text-custom-blue hover:underline mb-10">1. Una Mirada a la Pizarra Virtual Online</Link>
                        </li>
                        <li className="mb-4">
                            <Link href="#2" className="text-custom-blue hover:underline mb-10">2. Herramientas para la Creación en Tiempo Real</Link>
                        </li>
                        <li className="mb-4">
                            <Link href="#3" className="text-custom-blue hover:underline mb-10">3. Ventajas del Uso de la Pizarra Virtual Online</Link>
                        </li>
                        <li className="mb-4">
                            <Link href="#4" className="text-custom-blue hover:underline mb-10">4. El Rol de la Pizarra Virtual en la Era Digital</Link>
                        </li>
                        <li className="mb-4">
                            <Link href="#5" className="text-custom-blue hover:underline mb-10">5. Explora Más Recursos</Link>
                        </li>
                        <li className="mb-4">
                            <Link href="#6" className="text-custom-blue hover:underline mb-10">6. Conclusión</Link>
                        </li>
                    </ul>
                </div>
           </div>
           <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5 md:my-20 my-5">
                <BlogLinks blogTitle="Wireframes Online: La Herramienta Esencial para Visualizar tus Ideas" blogImage="/placeholders/wireframe.png" blogHref="/blog/wireframes-online" blogDescription="Descubre cómo los wireframes online en Sketchlie pueden ayudarte a visualizar tus ideas." isNew={true}/>
                <BlogLinks blogTitle="Mapa Conceptual y su Importancia en el Mundo Online" blogImage="/placeholders/mapa-conceptual.png" blogHref="/blog/mapa-conceptual" blogDescription="En el mundo digital, las herramientas para la creación de mapas conceptuales han cobrado una relevancia sin precedente..." isNew={true}/>
                <BlogLinks blogTitle="Pizarra Online" blogImage="/placeholders/improve-performance.png" blogHref="/pizarra-online" blogDescription="Sketchlie es una pizarra online rápida, gratuita y fácil de usar pensada para  ayudarte a colaborar con cualquier persona desde cualquier lugar."/>
            </div>
        </div>    
     );
}
 
export default LandingPage;
