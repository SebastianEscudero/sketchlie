"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { LogoSlider } from "./logo-slider";
import { useCurrentUser } from "@/hooks/use-current-user";

const porEquipo: { title: string; href: string }[] = [
    {
        title: "Gestión de producto 🚧",
        href: "/gestion-producto",
    },
    {
        title: "Equipos de Ingeniería 🚧",
        href: "/equipos-de-ingenieria",
    },
    {
        title: "Diseño 🚧",
        href: "/diseno",
    },
    {
        title: "Equipos de IT 🚧",
        href: "/equipos-de-it",
    },
    {
        title: "Marketing 🚧",
        href: "/marketing",
    },
    {
        title: "Agencias y Consultorías 🚧",
        href: "/agencias-consultorías",
    },
    {
        title: "Ventas 🚧",
        href: "/ventas",
    },
]

const porCasoDeUso: { title: string; href: string }[] = [
    {
        title: "Pizarra Online",
        href: "/pizarra-online",
    },
    {
        title: "Mapa Conceptual",
        href: "/mapa-conceptual",
    },
    {
        title: "Diagrama de Flujo",
        href: "/diagrama-de-flujo",
    },
    {
        title: "Wireframe",
        href: "/wireframe",
    },
    {
        title: "Mapas mentales",
        href: "/mapa-mental-online",
    },
    {
        title: "Mapa de procesos",
        href: "/mapas-de-procesos",
    },
    {
        title: "Diagramas",
        href: "/diagrama",
    },
    {
        title: "Lluvia de ideas ",
        href: "/lluvia-de-ideas",
    },
]

const blog: { title: string; href: string }[] = [
    {
        title: "Canvas Online",
        href: "/blog/canvas-online"
    },
    {
        title: "Diagrama",
        href: "/blog/diagrama"
    },
    {
        title: "Diagrama de Flujo",
        href: "/blog/diagrama-de-flujo"
    },
    {
        title: "Mapa Conceptual",
        href: "/blog/mapa-conceptual"
    },
    {
        title: "Mapeo de Procesos",
        href: "/blog/mapeo-de-procesos"
    },
    {
        title: "Mapa Mental",
        href: "/blog/mapa-mental"
    },
    {
        title: "Pizarra Online",
        href: "/blog/pizarra-online"
    },
    {
        title: "Wireframe",
        href: "/blog/wireframe"
    }
]

const queEs: { title: string; href: string }[] = [
    {
        title: "Lluvia de Ideas",
        href: "/lluvia-de-ideas/que-es-lluvia-de-ideas"
    },
    {
        title: "Diagrama de Flujo",
        href: "/diagrama-de-flujo/que-es-diagrama-de-flujo"
    },
    {
        title: "Diagrama",
        href: "/diagrama/que-es-diagrama"
    },
    {
        title: "Mapa Conceptual",
        href: "/mapa-conceptual/que-es-mapa-conceptual"
    },
    {
        title: "Mapa de Procesos",
        href: "/mapas-de-procesos/que-es-mapa-procesos"
    },
    {
        title: "Mapa Mental",
        href: "/mapa-mental-online/que-es-mapa-mental"
    },
    {
        title: "Pizarra Online",
        href: "/pizarra-online/que-es-pizarra-online"
    },
    {
        title: "Wireframe",
        href: "/wireframe/que-es-wireframe"
    }
]

export const BotNavbar = () => {
    const user = useCurrentUser();

    return (
        <footer className="bg-[#1C1C1E] text-white">
            <div className="py-10">
                <div className="text-center mt-10 xl:mx-[25%] lg:mx-[20%] md:mx-[15%] mx-[5%]">
                    <h2 className="mb-10 text-4xl md:text-5xl lg:text-6xl">
                        Empieza hoy mismo y comienza a colaborar con tu equipo.
                    </h2>
                    <p className="mx-[10%]">
                        Sé parte de la comunidad que impulsa la innovación y la colaboración con Sketchlie. Regístrate ahora con tu correo electrónico laboral y comienza a transformar tus ideas en realidad.
                    </p>
                    <Link href={"/dashboard"}>
                        <Button variant="auth" className="text-lg p-6 font-normal mt-10">
                            {user ? "Ir al Tablero" : "Regístrate gratis"}
                        </Button>
                    </Link>
                </div>
                <LogoSlider/>
            </div>
            <div className="lg:flex xl:mx-[15%] lg:mx-[5%] text-xl justify-between hidden">
                <nav className="flex flex-col">
                    <h6 className="font-bold">Soluciones</h6>
                    {porCasoDeUso.map((component, index) => (
                        <Link key={index} href={component.href} className="py-3 hover:underline font-semibold">{component.title}</Link>
                    ))}
                </nav>
                <nav className="flex flex-col">
                    <h6 className="font-bold">Equipos</h6>
                    {porEquipo.map((component, index) => (
                        <Link key={index} href={component.href} className="py-3 hover:underline font-semibold">{component.title}</Link>
                    ))}
                </nav>
                <nav className="flex flex-col">
                    <h6 className="font-bold">Blogs</h6>
                    {blog.map((component, index) => (
                        <Link key={index} href={component.href} className="py-3 hover:underline font-semibold">{component.title}</Link>
                    ))}
                </nav>
                <nav className="flex flex-col">
                    <h6 className="font-bold">Contenido Informativo</h6>
                    {queEs.map((component, index) => (
                        <Link key={index} href={component.href} className="py-3 hover:underline font-semibold">¿Qué es un {component.title}?</Link>
                    ))}
                </nav>
            </div>
            <Accordion type="single" collapsible className="text-lg xl:mx-[10%] lg:mx-[7%] md:mx-[5%] mx-[5%] lg:hidden">
                <AccordionItem value="item-1">
                    <AccordionTrigger className="text-xl">Producto</AccordionTrigger>
                    <AccordionContent>
                        <Link
                            className="p-3 text-lg hover:underline ml-5 font-semibold"
                            href="/product-overview">
                            Descripción de Sketchlie 🚧
                        </Link>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger className="text-xl">Soluciones</AccordionTrigger>
                    <AccordionContent>
                        <ul className="flex flex-col font-semibold">
                            {porCasoDeUso.map((component) => (
                                <Link
                                    className="p-3 text-lg hover:underline ml-5"
                                    key={component.title}
                                    title={component.title}
                                    href={component.href}
                                >
                                    {component.title}
                                </Link>
                            ))}
                            {porEquipo.map((component) => (
                                <Link
                                    className="p-3 text-lg hover:underline ml-5"
                                    key={component.title}
                                    title={component.title}
                                    href={component.href}
                                >
                                    {component.title}
                                </Link>
                            ))}
                        </ul>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger className="text-xl">Blogs</AccordionTrigger>
                    <AccordionContent>
                        <ul className="flex flex-col font-semibold">
                            {blog.map((component) => (
                                <Link
                                    className="p-3 text-lg hover:underline ml-5"
                                    key={component.title}
                                    title={component.title}
                                    href={component.href}
                                >
                                    {component.title}
                                </Link>
                            ))}
                        </ul>
                    </AccordionContent>
                </AccordionItem>
                <div className="py-4 border-b font-medium text-xl">
                    <Link
                        className="py-5 hover:underline ml-5"
                        href="/precios"
                    >
                        Precios 🚧
                    </Link>
                </div>
            </Accordion>
            <div className="lg:text-lg text-lg mt-10 px-4 flex justify-center flex-col pb-10">
                <Link
                    href="/dashboard"
                    className="flex justify-center"
                >
                    <Image
                        src="/logo.svg"
                        width={50}
                        height={50}
                        alt="Logo"
                    />
                    <p className="ml-2 hover:underline">
                        Sketchlie
                    </p>
                </Link>
                <p className="ml-2 text-center mt-3">
                    © 2024. Todos los derechos reservados.
                </p>
            </div>
        </footer>
    )
}