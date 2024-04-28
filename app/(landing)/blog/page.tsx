import { BlogLinks } from "@/components/blog-links"
import { HeaderBlog } from "@/components/header-blog"
import { Metadata } from "next";


export const metadata: Metadata = {
    title: "Colabora, Diseña, Crea, Enseña | Sketchlie Blog",
    description: "Innovación, diseño y colaboración convergen en el blog de Sketchlie. Descubre cómo potenciar tus proyectos y liberar tu creatividad en un solo lugar. Únete a nuestra comunidad y comienza a dibujar el futuro hoy mismo.",
    keywords: ["sketchlie blog", "blog", "sketchlie"],
    alternates: {
        canonical: "https://www.sketchlie.com/blog/",
    }
};

const BlogPage = () => {
    const blogLinksData = [
        {
            blogImage: "/placeholders/mapa-conceptual-online.png",
            blogHref: "/blog/mapa-conceptual",
            blogDescription: "Que son los mapas conceptuales y cual es su Importancia en el Mundo Online...",
            blogTitle: "Mapa Conceptual y su Importancia en el Mundo Online",
            isNew: true
        },
        {
            blogTitle: "Mapas Mentales Online: Herramientas y Ventajas",
            blogImage: "/placeholders/mapa-mental.png",
            blogHref: "/blog/mapa-mental",
            blogDescription: "Descubre cómo los mapas mentales online pueden potenciar tu creatividad y productividad. Conoce las herramientas disponibles y las ventajas que ofrecen en Sketchlie...",
            isNew: true
        },
        {
            blogTitle: "Diagrama de Flujo: Herramienta Esencial para la Colaboración Online",
            blogImage: "/placeholders/diagrama-de-flujo.png",
            blogHref: "/blog/diagrama-de-flujo",
            blogDescription: "Descubre cómo los diagramas de flujo en línea pueden potenciar la colaboración y la creatividad. Explora las ventajas de usar Sketchlie...",
            isNew: true
        },
        {
            blogTitle: "Mapa de Procesos: La Herramienta Esencial para la Eficiencia Empresarial",
            blogImage: "/placeholders/mapa-de-procesos.png",
            blogHref: "/blog/mapa-de-procesos",
            blogDescription: "Descubre cómo los mapas de procesos pueden ayudarte a visualizar y optimizar tus procesos empresariales de manera colaborativa y eficiente en Sketchlie...",
            isNew: true
        },
        {
            blogTitle: "Desata tu Creatividad con la Pizarra Virtual Online de Sketchlie",
            blogImage: "/placeholders/pizarra-online.png",
            blogHref: "/blog/pizarra-online",
            blogDescription: "En un mundo cada vez más digitalizado, la necesidad de herramientas de colaboración efectivas se ha vuelto fundamental para empresas...",
            isNew: true
        },
        {
            blogTitle: "Wireframes Online: La Herramienta Esencial para Visualizar tus Ideas",
            blogImage: "/placeholders/wireframe.png",
            blogHref: "/blog/wireframes-online",
            blogDescription: "Descubre cómo los wireframes online en Sketchlie pueden ayudarte a visualizar tus ideas.",
            isNew: true
        },
        {
            blogTitle: "Diseñar Online con Sketchlie: La Herramienta Perfecta para Colaborar",
            blogImage: "/placeholders/improve-performance.png",
            blogHref: "/blog/canvas-online",
            blogDescription: "En el mundo digital actual, la colaboración es clave. Los equipos necesitan herramientas que les permitan trabajar juntos de manera eficiente, sin importar la distancia física que los separe...",
            isNew: true
        },
        {
            blogTitle: "Tutorial de la Pizarra Online",
            blogImage: "/placeholders/pizarra-online.png",
            blogHref: "/blog/pizarra-online-tutorial",
            blogDescription: "La Pizarra Online de Sketchlie cuenta con una amplia gama de funcionalidades diseñadas para potenciar tu creatividad y aumentar tu productividad. En este tutorial, te guiaremos a través de las herramientas...",
            isNew: true
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
            blogHref: "/mapa-mental-online",
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
                    blogTitle= "Tutorial de la Pizarra Online"
                    blogImage= "/placeholders/pizarra-online.png"
                    blogHref= "/blog/pizarra-online-tutorial"
                    blogDescription= "La Pizarra Online de Sketchlie cuenta con una amplia gama de funcionalidades en este tutorial, te guiaremos a través de las herramientas..."
                    isNew = {true}
                />
            </div>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 xl:mx-[10%] lg:mx-[7%] md:mx-[5%] mx-[5%] gap-5">
                {blogLinksData.map((blogLink, index) => (
                    <BlogLinks
                        key={index}
                        blogTitle={blogLink.blogTitle}
                        blogImage={blogLink.blogImage}
                        blogHref={blogLink.blogHref}
                        blogDescription={blogLink.blogDescription}
                        isNew={blogLink.isNew}
                    />
                ))}
            </div>
        </div>
    )
}

export default BlogPage