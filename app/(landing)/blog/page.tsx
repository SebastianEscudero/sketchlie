import { BlogLinks } from "@/components/blog-links"
import { HeaderBlog } from "@/components/header-blog"
import { Metadata } from "next";


export const metadata: Metadata = {
    title: "Colabora, Diseña, Crea, Enseña | Sketchlie",
    description: "¡Bienvenido al blog de Sketchlie! Sumérgete en un mundo de creatividad colaborativa mientras exploramos consejos, trucos y casos de estudio para sacar el máximo provecho de nuestra plataforma de pizarra en línea. Desde técnicas de dibujo hasta estrategias de colaboración remota, nuestro blog es tu guía definitiva para potenciar tus proyectos y liberar tu creatividad. Únete a nuestra comunidad y comienza a dibujar el futuro hoy mismo.",
    keywords: ["sketchlie blog", "blog", "sketchlie"],
    alternates: {
        canonical: "https://www.sketchlie.com/blog",
    }
};

const BlogPage = () => {
    const blogLinksData = [
        {
            blogTitle: "Mapa Conceptual Online",
            blogImage: "/placeholders/mapa-conceptual.png",
            blogHref: "/mapa-conceptual",
            blogDescription: "Descubre cómo desatar tu creatividad y potenciar la colaboración en tiempo real con Sketchlie."
        },
        {
            blogTitle: "Mapa de Procesos",
            blogImage: "/placeholders/mapa-de-procesos.png",
            blogHref: "/mapas-de-procesos",
            blogDescription: "El mapa de procesos ayuda a los equipos a mapear y implementar mejoras. Registrate hoy con una 3 espacios de trabajo gratuitos para empezar a utilizar la mejor herramienta de mapa de procesos."
        },
        {
            blogTitle: "Wireframes",
            blogImage: "/placeholders/wireframe.png",
            blogHref: "/wireframe",
            blogDescription: "Empieza a visualizar tus ideas en minutos con nuestro intuitivo creador de wireframes. Crea esquemas de lo que necesites, desde páginas de inicio hasta formularios y menús, con nuestro creador de wireframes."
        },
        {
            blogTitle: "Mapa Mental",
            blogImage: "/placeholders/mapa-mental.png",
            blogHref: "/mapa-mental",
            blogDescription: "Crea mapas mentales en línea con Sketchlie. Nuestra herramienta de mapas mentales te permite capturar tus ideas y organizar la información de manera visual."
        },
        {
            blogTitle: "Diagrama de Flujo",
            blogImage: "/placeholders/diagrama-de-flujo.png",
            blogHref: "/diagrama-de-flujo",
            blogDescription: "Crea diagramas de flujo en línea con Sketchlie. Nuestra herramienta de diagramas de flujo te permite capturar tus ideas y organizar la información de manera visual."
        },
        {
            blogTitle: "Pizarra Online", 
            blogImage: "/placeholders/pizarra-online.png",
            blogHref: "/pizarra-online",
            blogDescription: "Crea pizarras en línea con Sketchlie. Nuestra herramienta de pizarras te permite capturar tus ideas y organizar la información de manera visual."
        }
    ];

    return (
        <div>
            <div className="xl:mx-[10%] lg:mx-[7%] md:mx-[5%] mx-[5%] mb-10 mt-20">
                <HeaderBlog
                    blogImage="/placeholders/improve-performance.png"
                    blogHref="/dashboard"
                    blogDescription="La mejor herramienta para colaborar."
                    blogTitle="Sketchlie"
                />
            </div>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 xl:mx-[10%] lg:mx-[7%] md:mx-[5%] mx-[5%]">
                {blogLinksData.map((blogLink, index) => (
                    <BlogLinks
                        key={index}
                        blogTitle={blogLink.blogTitle}
                        blogImage={blogLink.blogImage}
                        blogHref={blogLink.blogHref}
                        blogDescription={blogLink.blogDescription}
                    />
                ))}
            </div>
        </div>
    )
}

export default BlogPage