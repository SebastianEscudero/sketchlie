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
import { BringToFront, Circle, Hand, MousePointer2, Palette, Pencil, SendToBack, Square, StickyNote, Trash2, Type } from "lucide-react";

export const metadata: Metadata = {
    title: "Tutorial de la Pizarra Online | Sketchlie",
    description: "Un tutorial de cómo la pizarra online de Sketchlie puede ayudarte a potenciar tu creatividad y productividad en tiempo real. Aprende a utilizar sus herramientas de colaboración efectivas para empresas, educadores y equipos de trabajo.",
    keywords: ["pizarra virtual online", "colaboración en tiempo real", "herramientas de colaboración", "pizarra digital", "creatividad", "productividad", "trabajo en equipo", "herramientas colaborativas", "Sketchlie"],
    alternates: {
        canonical: "https://www.sketchlie.com/blog/pizarra-online-tutorial/",
    }
};

const LandingPage = () => {
    return (
        <div className="xl:mx-[10%] lg:mx-[7%] md:mx-[5%] mx-[3%]">
            <div className="mt-[3%]">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <Link href="/">Home</Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <Link href="/blog/">Blog</Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Tutorial de la Pizarra Online de Sketchlie</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <h1 className="xl:text-6xl lg:text-5xl md:text-4xl text-3xl mt-[3%] lg:pr-20" style={{ lineHeight: "1.2" }}>
                Tutorial de la Pizarra Online de Sketchlie
            </h1>
            <Image
                src="/placeholders/pizarra-online.png"
                alt="Pizarra online"
                width={1920}
                height={1080}
                className="rounded-2xl border border-black mt-[3%]"
            />
            <div className="flex flex-col-reverse lg:flex-row justify-between mt-[3%]">
                <div className="lg:max-w-[70%] text-xl">
                    <div id="1" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">1. Introducción</h2>
                    <p className="mb-10">La <Link className="text-custom-blue hover:underline" href="https://www.pizarraonline.com">Pizarra Online</Link> de Sketchlie cuenta con una amplia gama de funcionalidades diseñadas para potenciar tu creatividad y aumentar tu productividad. En este tutorial, te guiaremos a través de las herramientas y características clave de nuestra pizarra virtual, permitiéndote aprovechar al máximo esta poderosa plataforma de colaboración en tiempo real.</p>
                    <div id="2" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">2. Barra de Herramientas en tu Pizarra Online</h2>
                    <p className="mb-10">En tu pizarra en línea, la barra de herramientas te proporciona acceso rápido a diversas funciones para trabajar en tu tablero online. Vamos a revisar cada herramienta:</p>
                    <ul style={{ listStyleType: 'disc' }}>
                        <li className="mb-10 ml-5">
                            <strong><div className="flex flex-row items-center">Selección: <MousePointer2 className="ml-2 bg-white p-1 border border-black h-7 w-7"/></div> </strong> Esta herramienta te permite seleccionar y manipular objetos en tu tablero online. Haz clic en el botón de selección para activar esta herramienta. Puedes mover, redimensionar y manipular objetos una vez seleccionados.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong><div className="flex flex-row items-center">Mover: <Hand className="ml-2 bg-white p-1 border border-black h-7 w-7"/></div> </strong> La herramienta de mover te permite desplazar objetos seleccionados por tu pizarra online. Selecciona la herramienta de mover y arrastra los objetos seleccionados para cambiar su posición en el pizarra online.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong><div className="flex flex-row items-center">Texto: <Type className="ml-2 bg-white p-1 border border-black h-7 w-7"/></div> </strong> Con esta herramienta puedes agregar texto a tu pizarra online. Selecciona la herramienta de texto y haz clic en el pizarra online para comenzar a escribir. Puedes editar el texto una vez insertado.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong><div className="flex flex-row items-center">Sticky Note: <StickyNote className="ml-2 bg-white p-1 border border-black h-7 w-7"/></div> </strong> La herramienta de nota adhesiva te permite agregar notas rápidas a tu pizarra online. Selecciona esta herramienta y haz clic en el tablero para crear una nota adhesiva que puedes mover y editar según necesites.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong><div className="flex flex-row items-center">Rectángulo: <Square className="ml-2 bg-white p-1 border border-black h-7 w-7"/></div> </strong> Utiliza esta herramienta para dibujar rectángulos en tu tablero. Selecciona la herramienta de rectángulo y arrastra en el pizarra para crear un rectángulo con las dimensiones deseadas.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong><div className="flex flex-row items-center">Círculo: <Circle className="ml-2 bg-white p-1 border border-black h-7 w-7"/></div> </strong> La herramienta de elipse te permite dibujar elipses y círculos en tu pizarra. Selecciona esta herramienta y arrastra en el pizarra para crear una elipse o un círculo.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong><div className="flex flex-row items-center">Lápiz: <Pencil className="ml-2 bg-white p-1 border border-black h-7 w-7"/></div> </strong> Con la herramienta de lápiz, puedes dibujar trazos a mano alzada en tu tablero. Selecciona la herramienta de lápiz y dibuja libremente en el tablero para crear trazos personalizados.
                        </li>
                    </ul>
                    <p className="mb-10">Estas herramientas de la barra de herramientas proporcionan funcionalidades esenciales para dibujar, agregar texto y manipular objetos en tu pizarra en línea. ¡Experimenta con ellas para dar vida a tus ideas creativas!</p>
                    <div id="3" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">3. Herramientas de Selección en tu Pizarra en Línea</h2>
                    <p className="mb-10">En tu pizarra online, cuentas con un conjunto de herramientas de selección que te permiten manipular las capas en tu tablero. Veamos cada herramienta:</p>
                    <ul style={{ listStyleType: 'disc' }}>
                        <li className="mb-10 ml-5">
                            <strong><div className="flex flex-row items-center">Bring to Front: <BringToFront className="ml-2 bg-white p-1 border border-black h-7 w-7"/></div> </strong> Esta herramienta trae los objetos o capas seleccionados al frente de tu tablero.
                            Para usarla, selecciona el objeto o capa que deseas traer hacia adelante.
                            Luego, haz clic en el botón Bring to Front. Esto reorganizará las capas para que la seleccionada aparezca en la parte superior de todas las demás.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong><div className="flex flex-row items-center">Send to Back: <SendToBack className="ml-2 bg-white p-1 border border-black h-7 w-7"/></div> </strong> Por el contrario, la herramienta Send to Back envía los objetos o capas seleccionados al fondo de tu pizarra online.
                            Selecciona el objeto o capa que deseas enviar hacia atrás.
                            Haz clic en el botón Enviar al Fondo para reorganizar las capas, colocando la seleccionada detrás de todas las demás.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong><div className="flex flex-row items-center">Selector de Color: <Palette className="ml-2 bg-white p-1 border border-black h-7 w-7"/></div> </strong> La herramienta de selector de color te permite cambiar el color de relleno de los objetos o capas seleccionados.
                            Simplemente selecciona el objeto o capa cuyo color deseas cambiar.
                            Haz clic en la herramienta de selector de color y elige un nuevo color de la paleta. El color de relleno del objeto seleccionado se actualizará en consecuencia.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong><div className="flex flex-row items-center">Eliminar: <Trash2 className="ml-2 bg-white p-1 border border-black h-7 w-7"/></div> </strong> Por último, la herramienta de eliminar elimina los objetos o capas seleccionados de tu pizarra virtual.
                            Selecciona el objeto o capa que deseas eliminar.
                            Haz clic en el botón de eliminar para eliminarlo por completo del pizarra virtual.
                        </li>
                    </ul>
                    <p className="mb-10">Estas herramientas de selección proporcionan funcionalidades esenciales para administrar y editar el contenido en tu pizarra en línea.</p>
                    <div id="4" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">4. Copiar y Pegar Capas en tu Pizarra Virtual</h2>
                    <p className="mb-10">¿Interesado en conocer otras herramientas de colaboración disponibles en Sketchlie? Echa un vistazo a nuestros recursos:</p>
                    <ul style={{ listStyleType: 'disc' }}>
                        <li className="mb-10 ml-5">
                            <strong>Selecciona la Capa:</strong> Haz clic en la capa que deseas copiar en tu pizarra virtual. Asegúrate de que esté resaltada o seleccionada.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Copia la Capa:</strong> Utiliza el atajo de teclado Ctrl + C en Windows o Cmd + C en macOS para copiar la capa seleccionada. También puedes hacer clic derecho en la capa y seleccionar Copiar en el menú desplegable.
                        </li>
                        <li className="mb-10 ml-5">
                            <strong>Pega la Capa:</strong> Después de copiar la capa, mueve el cursor a la posición donde deseas pegarla en tu tablero online. Utiliza el atajo de teclado Ctrl + V en Windows o Cmd + V en macOS para pegar la capa copiada en la nueva ubicación. También puedes hacer clic derecho en el tablero online y seleccionar Pegar en el menú desplegable.
                        </li>
                    </ul>
                    <p className="mb-10">Una vez que hayas pegado la capa, puedes moverla y ajustar su posición según sea necesario. Utiliza las herramientas de selección y manipulación para editar la capa recién pegada como lo harías con cualquier otra capa en tu tablero online.</p>
                    <div id="5" className="h-[80px] mt-[-80px]"></div>
                    <h2 className="text-4xl md:text-5xl mb-10">5. Conclusión</h2>
                    <p className="mb-10">La pizarra virtual online ha revolucionado la forma en que colaboramos y compartimos ideas en la era digital. En Sketchlie, estamos comprometidos a proporcionar una plataforma que permita a individuos y equipos trabajar juntos de manera más eficiente y creativa, sin importar la distancia.</p>
                    <p className="mb-10">¡Únete a nosotros en este viaje hacia una colaboración sin límites! Descubre más sobre nuestra pizarra virtual y otras herramientas de colaboración en <Link className="text-custom-blue hover:underline" href="/">Sketchlie</Link>.</p>
                </div>
                <div className="lg:w-[30%] xl:ml-10 lg:ml-5 border border-black rounded-lg p-10 bg-[#FFF] lg:sticky lg:z-30 lg:top-24 lg:h-[50%] lg:mb-0 mb-10">
                    <h3 className="text-2xl mb-3">
                        Indice
                    </h3>
                    <ul>
                        <li className="mb-4">
                            <Link href="#1" className="text-custom-blue hover:underline mb-10">1. Introducción</Link>
                        </li>
                        <li className="mb-4">
                            <Link href="#2" className="text-custom-blue hover:underline mb-10">2. Barra de Herramientas en tu Pizarra en Línea</Link>
                        </li>
                        <li className="mb-4">
                            <Link href="#3" className="text-custom-blue hover:underline mb-10">3. Herramientas de Selección en tu Pizarra en Línea</Link>
                        </li>
                        <li className="mb-4">
                            <Link href="#4" className="text-custom-blue hover:underline mb-10">4. Copiar y Pegar Capas en tu Pizarra Virtual</Link>
                        </li>
                        <li className="mb-4">
                            <Link href="#5" className="text-custom-blue hover:underline mb-10">5. Conclusión</Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5 md:my-20 my-5">
                <BlogLinks blogTitle="Wireframes Online: La Herramienta Esencial para Visualizar tus Ideas" blogImage="/placeholders/wireframe.png" blogHref="/blog/wireframes-online/" blogDescription="Descubre cómo los wireframes online en Sketchlie pueden ayudarte a visualizar tus ideas." isNew={true} />
                <BlogLinks blogTitle="Mapa Conceptual y su Importancia en el Mundo Online" blogImage="/placeholders/mapa-conceptual.png" blogHref="/blog/mapa-conceptual/" blogDescription="En el mundo digital, las herramientas para la creación de mapas conceptuales han cobrado una relevancia sin precedente..." isNew={true} />
                <BlogLinks blogTitle="Diagrama" blogImage="/placeholders/diagrama-de-flujo.png" blogHref="/blog/diagrama/" blogDescription="Los diagramas pueden adoptar diversas formas, desde diagramas de flujo que muestran la secuencia de pasos en un proceso, hasta diagramas de Venn que comparan conjuntos de datos." isNew={true} />
            </div>
        </div>
    );
}

export default LandingPage;
