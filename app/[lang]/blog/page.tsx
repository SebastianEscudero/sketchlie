import { BlogLinks } from "@/components/blog-links"
import { HeaderBlog } from "@/components/header-blog"
import { Metadata } from "next";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Link from "next/link";

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
            blogImage: "/placeholders/what-is-new-may-2024.png",
            blogHref: "/blog/what-is-new-may-2024/",
            blogDescription: "Sketchlie ha lanzado recientemente algunas emocionantes actualizaciones, plantillas, iconos, herramientas de diseño y más.",
            blogTitle: "Actualización Mayo 2024: Mejoras y Plantillas",
            isNew: true
        },
        {
            blogImage: "/placeholders/mapa-conceptual-online.png",
            blogHref: "/blog/mapa-conceptual/",
            blogDescription: "Que son los mapas conceptuales y cual es su Importancia en el Mundo Online...",
            blogTitle: "Mapa Conceptual y su Importancia en el Mundo Online",
            isNew: true
        },
        {
            blogTitle: "Mapas Mentales Online: Herramientas y Ventajas",
            blogImage: "/placeholders/mapa-mental.png",
            blogHref: "/blog/mapa-mental/",
            blogDescription: "Descubre cómo los mapas mentales online pueden potenciar tu creatividad y productividad. Conoce las herramientas disponibles y las ventajas que ofrecen en Sketchlie...",
            isNew: true
        },
        {
            blogTitle: "Diagrama de Flujo: Herramienta Esencial para la Colaboración Online",
            blogImage: "/placeholders/diagrama-de-flujo.png",
            blogHref: "/blog/diagrama-de-flujo/",
            blogDescription: "Descubre cómo los diagramas de flujo en línea pueden potenciar la colaboración y la creatividad. Explora las ventajas de usar Sketchlie...",
            isNew: true
        },
        {
            blogTitle: "Mapa de Procesos: La Herramienta Esencial para la Eficiencia Empresarial",
            blogImage: "/placeholders/mapa-de-procesos.png",
            blogHref: "/blog/mapa-de-procesos/",
            blogDescription: "Descubre cómo los mapas de procesos pueden ayudarte a visualizar y optimizar tus procesos empresariales de manera colaborativa y eficiente en Sketchlie...",
            isNew: true
        },
        {
            blogTitle: "Desata tu Creatividad con la Pizarra Virtual Online de Sketchlie",
            blogImage: "/placeholders/pizarra-online.png",
            blogHref: "/blog/pizarra-online/",
            blogDescription: "En un mundo cada vez más digitalizado, la necesidad de herramientas de colaboración efectivas se ha vuelto fundamental para empresas...",
            isNew: true
        },
        {
            blogTitle: "Wireframes Online: La Herramienta Esencial para Visualizar tus Ideas",
            blogImage: "/placeholders/wireframe.png",
            blogHref: "/blog/wireframes-online/",
            blogDescription: "Descubre cómo los wireframes online en Sketchlie pueden ayudarte a visualizar tus ideas.",
            isNew: true
        },
        {
            blogTitle: "Diseñar Online con Sketchlie: La Herramienta Perfecta para Colaborar",
            blogImage: "/placeholders/improve-performance.png",
            blogHref: "/blog/canvas-online/",
            blogDescription: "En el mundo digital actual, la colaboración es clave. Los equipos necesitan herramientas que les permitan trabajar juntos de manera eficiente, sin importar la distancia física que los separe...",
            isNew: true
        },
        {
            blogTitle: "Tutorial de la Pizarra Online",
            blogImage: "/placeholders/pizarra-online.png",
            blogHref: "/blog/pizarra-online-tutorial/",
            blogDescription: "La Pizarra Online de Sketchlie cuenta con una amplia gama de funcionalidades diseñadas para potenciar tu creatividad y aumentar tu productividad. En este tutorial, te guiaremos a través de las herramientas...",
            isNew: true
        },
    ];

    return (
        <div>
            <Breadcrumb className="xl:px-[15%] lg:px-[7%] md:px-[5%] px-[5%] mt-5">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <Link href="/" title="Home">Home</Link>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Blog</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="xl:px-[15%] lg:px-[7%] md:px-[5%] px-[5%] mb-10 mt-[3%]">
                <HeaderBlog
                    blogTitle="Tutorial de la Pizarra Online"
                    blogImage="/placeholders/pizarra-online.png"
                    blogHref="/blog/pizarra-online-tutorial/"
                    blogDescription="La Pizarra Online de Sketchlie cuenta con una amplia gama de funcionalidades en este tutorial, te guiaremos a través de las herramientas..."
                    isNew={true}
                />
            </div>
            <div className="mb-20 grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 xl:px-[15%] lg:px-[7%] md:px-[5%] px-[5%] gap-5">
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