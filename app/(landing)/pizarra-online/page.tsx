import { LandingNavbar } from "@/components/landing-navbar";
import { BotNavbar } from "@/components/bottom-navbar";
import { BlogStructure } from "@/components/blog-structure";
import { Metadata } from "next";
import { BlogSection } from "@/components/blog-section";
import { DashboardButton } from "@/components/register-button";
import { LogoSlider } from "@/components/logo-slider";
import { FaqSection } from "@/components/faq-section";
import { LandingVideo } from "@/components/landing-video";
import { BlogLinks } from "@/components/blog-links";

export const metadata: Metadata = {
    title: "Crea tu Pizarra Online Gratis | Sketchlie",
    description: "La pizarra online de Sketchlie ayuda a las personas a colaborar y presentar ideas de manera efectiva, logrando mejores productos todo desde una pizarra online. Segura y pensada para tu empresas.",
  };

const LandingPage = () => {
    const faqData = [
        {
            value: "item-1",
            trigger: "¿Qué es una pizarra online?",
            content: "Una pizarra online es un espacio virtual donde se puede dibujar todo tipo de ideas, diseños, procesos etc. En Sketchlie trabajamos para que puedas tener la pizarra online colaborativa infinita más rápida para que sea ideal para todo tipo de equipos."
        },
        {
            value: "item-2",
            trigger: "¿La pizarra online de Sketchlie es grátis?",
            content: "Sí! Sketchlie es gratis y no requiere tarjeta de crédito para registrarte, para equipos que quieran ir más allá tenemos planes de pago, pero la versión gratuita es ideal para equipos pequeños."
        },
        {
            value: "item-3",
            trigger: "¿Se puede utilizar la pizarra online de Sketchlie para hacer clases?",
            content: "Sí! Sketchlie ofrece organizadores gráficos intuitivos y dinámicos, como líneas del tiempo, mapas mentales y diagramas de Venn que se adaptan a todos los estudiantes. Edita en tiempo real con tus alumnos, prepara clases, comparte materiales, haz videollamadas, comentarios, encuestas y muchas otras funciones para hacer que tus clases online sean aún más interesantes. Regístrate para estimular el pensamiento crítico y la creatividad de tus estudiantes."
        },
        {
            value: "item-4",
            trigger: "¿Por qué Sketchlie?",
            content: "Sketchlie ofrece simplemente la pizarra online más rápida y fácil de usar, con una interfaz intuitiva y una amplia gama de herramientas de colaboración. Nuestra pizarra online es ideal para equipos de cualquier tamaño, desde pequeñas empresas hasta grandes corporaciones. También es perfecta para profesores y estudiantes que buscan una forma más interactiva de enseñar y aprender."
        },
        {
            value: "item-5",
            trigger: "¿Cómo puedo empezar a usar la pizarra online de Sketchlie?",
            content: "Es muy sencillo, solo tienes que registrarte en Sketchlie y podrás empezar a usar la pizarra online gratuita. No necesitas tarjeta de crédito para registrarte."
        },
        {
            value: "item-6",
            trigger: "¿Puedo usar la pizarra online de Sketchlie para hacer presentaciones?",
            content: "Sí! Sketchlie es ideal para hacer presentaciones, puedes compartir tu pizarra online con otras personas y hacer presentaciones en tiempo real."
        }
    ];
    return ( 
        <div className="h-full">
            <LandingNavbar />
            <BlogStructure
                title="La pizarra online para colaborar."
                description="Sketchlie es una pizarra online rápida, gratuita y fácil de usar pensada para  ayudarte a colaborar con cualquier persona desde cualquier lugar."
                cta="Ir a pizarra online"
            />
            <LogoSlider />
            <LandingVideo />
            <div className="my-28">
                <BlogSection 
                    title="Espacio de trabajo pensado en ti" 
                    text="Sketchlie es más que una pizarra online, es un espacio virtual donde los usuarios pueden colaborar en tiempo real, compartir ideas, añadir notas, y desarrollar proyectos de forma conjunta, sin importar su ubicación geográfica. En Sketchlie, nuestra pizarra online va más allá al ofrecer una amplia gama de características diseñadas específicamente para potenciar la creatividad y la productividad de los equipos."
                />
            </div>
            <BlogSection 
                title="La pizarra online para colaborar efectivamente" 
                text="En el mundo actual, donde la colaboración remota se ha vuelto esencial, contar con herramientas que faciliten el trabajo en equipo y fomenten la creatividad es fundamental."
                img="/placeholders/mapa-mental.png"
                side="right"
            />
            <BlogSection
                title="Colaboración en Tiempo Real" 
                text="Con nuestra pizarra online, los usuarios pueden trabajar juntos en proyectos en tiempo real, lo que permite una comunicación instantánea y una mayor eficiencia en la toma de decisiones."
                img="/placeholders/improve-performance.png"
                side="left"
            />
            <BlogSection
                title="Planificación y Gestión de Proyectos" 
                text="Equipado con funciones de planificación integradas, nuestra pizarra online facilita la organización de tareas, la asignación de responsabilidades y el seguimiento del progreso del proyecto, todo en un solo lugar."
                img="/placeholders/prototype-wireframe.png"
                side="right"
            />
            <BlogSection
                title="La pizarra online única Sketchlie." 
                text="Invita a colegas a tu pizarra online para sesiones de lluvia de ideas, toma de notas y seguimiento de proyectos. Comparte tu pantalla, realiza videoconferencias y aprovecha el modo de presentación para reuniones estimulantes. La rapidez de Sketchlie permite que múltiples usuarios trabajen simultáneamente sin esfuerzo."
                img="/placeholders/car-sales-grafic.png"
                side="left"
            />
            <div className="text-center md:my-28">
                <BlogSection
                    title="Empieza a colaborar hoy." 
                    text="Regístrate gratis y comienza a usar la pizarra online más rápida y fácil de usar."	
                />
                <DashboardButton />
            </div>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 lg:mx-[10%] mx-[5%]">
                <BlogLinks blogTitle="Mapa Conceptual Online" blogImage="/placeholders/mapa-conceptual.png" blogHref="/mapa-conceptual" blogDescription="Descubre cómo desatar tu creatividad y potenciar la colaboración en tiempo real con Sketchlie."/>
                <BlogLinks blogTitle="Mapa de Procesos" blogImage="/placeholders/mapa-de-procesos.png" blogHref="/mapas-de-procesos" blogDescription="El mapa de procesos ayuda a los equipos a mapear y implementar mejoras. Registrate hoy con una 3 espacios de trabajo gratuitos para empezar a utilizar la mejor herramienta de mapa de procesos."/>
                <BlogLinks blogTitle="Wireframes" blogImage="/placeholders/wireframe.png" blogHref="/wireframe" blogDescription="Empieza a visualizar tus ideas en minutos con nuestro intuitivo creador de wireframes. Crea esquemas de lo que necesites, desde páginas de inicio hasta formularios y menús, con nuestro creador de wireframes. "/>
            </div>
            <FaqSection accordionData={faqData} sectionTitle="las pizarras online"/>
            <BotNavbar />
        </div>

     );
}
 
export default LandingPage;