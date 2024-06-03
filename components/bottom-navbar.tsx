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
import { usePathname } from "next/navigation";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

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
        title: "Diseño",
        href: "/diseno/",
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
        href: "/pizarra-online/",
    },
    {
        title: "Mapa Conceptual",
        href: "/mapa-conceptual/",
    },
    {
        title: "Diagrama de Flujo",
        href: "/diagrama-de-flujo/",
    },
    {
        title: "Wireframe",
        href: "/wireframe/",
    },
    {
        title: "Mapas mentales",
        href: "/mapa-mental-online/",
    },
    {
        title: "Mapa de procesos",
        href: "/mapas-de-procesos",
    },
    {
        title: "Diagramas",
        href: "/diagrama/",
    },
    {
        title: "Lluvia de ideas ",
        href: "/lluvia-de-ideas/",
    },
    {
        title: "Customer Journey Map ",
        href: "/customer-journey-map/",
    }
]

const blog: { title: string; href: string }[] = [
    {
        title: "Canvas Online",
        href: "/blog/canvas-online/"
    },
    {
        title: "Diagrama",
        href: "/blog/diagrama/"
    },
    {
        title: "Diagrama de Flujo",
        href: "/blog/diagrama-de-flujo/"
    },
    {
        title: "Mapa Conceptual",
        href: "/blog/mapa-conceptual/"
    },
    {
        title: "Mapas de Procesos",
        href: "/blog/mapa-de-procesos/"
    },
    {
        title: "Mapa Mental",
        href: "/blog/mapa-mental/"
    },
    {
        title: "Pizarra Online",
        href: "/blog/pizarra-online/"
    },
    {
        title: "Wireframe",
        href: "/blog/wireframes-online/"
    }
]

const queEs: { title: string; href: string }[] = [
    {
        title: "Lluvia de Ideas",
        href: "/lluvia-de-ideas/que-es-lluvia-de-ideas/"
    },
    {
        title: "Diagrama de Flujo",
        href: "/diagrama-de-flujo/que-es-diagrama-de-flujo/"
    },
    {
        title: "Diagrama",
        href: "/diagrama/que-es-diagrama/"
    },
    {
        title: "Mapa Conceptual",
        href: "/mapa-conceptual/que-es-mapa-conceptual/"
    },
    {
        title: "Mapa de Procesos",
        href: "/mapas-de-procesos/que-es-mapa-procesos"
    },
    {
        title: "Mapa Mental",
        href: "/mapa-mental-online/que-es-mapa-mental/"
    },
    {
        title: "Pizarra Online",
        href: "/pizarra-online/que-es-pizarra-online/"
    },
    {
        title: "Wireframe",
        href: "/wireframe/que-es-wireframe/"
    },
    {
        title: "Customer J. Map",
        href: "/customer-journey-map/que-es-customer-journey-map/",
    }
]

const Recursos = [
    {
        title: "Plantillas",
        href: "/plantillas/",
    },
    {
        title: "Blog",
        href: "/blog/",
    },
    {
        title: "Tutorial de Sketchlie",
        href: "/blog/pizarra-online-tutorial/",
    }
]

export const BotNavbar = () => {
    const pathname = usePathname();
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
                    <Link href={"/dashboard/"} title="Regístrate gratis">
                        <Button variant="auth" className="text-lg p-6 mt-10">
                            Regístrate gratis
                        </Button>
                    </Link>
                </div>
                <LogoSlider />
            </div>
            <div className="lg:flex xl:mx-[15%] lg:mx-[5%] text-xl justify-between hidden GAP-">
                <nav className="flex flex-col">
                    <h3 className="font-bold mb-2">Soluciones</h3>
                    {porCasoDeUso.map((component, index) => (
                        <Link key={index} title={component.title} href={component.href}><Button variant={pathname === component.href ? 'secondary' : 'ghostDark'} className="my-1 text-lg">{component.title}</Button></Link>
                    ))}
                </nav>
                <nav className="flex flex-col">
                    <h3 className="font-bold mb-2">Equipos</h3>
                    {porEquipo.map((component, index) => (
                        <Link key={index} title={component.title} href={component.href}><Button variant={pathname === component.href ? 'secondary' : 'ghostDark'} className="my-1 text-lg">{component.title}</Button></Link>
                    ))}
                </nav>
                <nav className="flex flex-col">
                    <h3 className="font-bold mb-2">Recursos</h3>
                    {Recursos.map((recurso, index) => (
                        <Link key={index} title={recurso.title} href={recurso.href}><Button variant={pathname === recurso.href ? 'secondary' : 'ghostDark'} className="my-1 text-lg">{recurso.title}</Button></Link>
                    ))}
                </nav>
                <nav className="flex flex-col">
                    <h3 className="font-bold mb-2">Contenido Informativo</h3>
                    {queEs.map((component, index) => (
                        <Link key={index} title={component.title} href={component.href}><Button variant={pathname === component.href ? 'secondary' : 'ghostDark'} className="my-1 text-lg">¿Qué es un {component.title}</Button></Link>
                    ))}
                </nav>
            </div>
            <Accordion type="single" collapsible className="text-lg xl:mx-[10%] lg:mx-[7%] md:mx-[5%] mx-[5%] lg:hidden">
                <AccordionItem value="item-1" className="px-4">
                    <AccordionTrigger className="font-semibold">Producto</AccordionTrigger>
                    <AccordionContent className="flex flex-col w-full gap-1">
                        <Link
                            href="/descripcion"
                        >
                            <Button
                                className='w-full justify-start my-[2px] text-[16px]'
                                variant={pathname === "/descripcion" ? 'secondary' : 'ghostDark'}
                            >
                                Descripcion de Sketchlie 🚧
                            </Button>
                        </Link>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2" className="px-4">
                    <AccordionTrigger className="font-semibold">Soluciones</AccordionTrigger>
                    <AccordionContent className="flex flex-col w-full gap-1">
                        {porCasoDeUso.map((component) => (
                            <Link
                                key={component.title}
                                href={component.href}
                                title={component.title}
                            >
                                <Button
                                    className='w-full justify-start my-[2px] text-[16px]'
                                    variant={pathname === component.href ? 'secondary' : 'ghostDark'}
                                >
                                    {component.title}
                                </Button>
                            </Link>
                        ))}
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3" className="px-4">
                    <AccordionTrigger className="font-semibold">Equipos</AccordionTrigger>
                    <AccordionContent className="flex flex-col w-full gap-1">
                        {porEquipo.map((component) => (
                                <Link
                                    key={component.title}
                                    href={component.href}
                                    title={component.title}
                                >
                                    <Button
                                        className='w-full justify-start my-[2px] text-[16px]'
                                        variant={pathname === component.href ? 'secondary' : 'ghostDark'}
                                    >
                                        {component.title}
                                    </Button>
                                </Link>
                        ))}
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4" className="px-4">
                    <AccordionTrigger className="font-semibold">Recursos</AccordionTrigger>
                    <AccordionContent className="flex flex-col w-full gap-1">
                        {Recursos.map((recurso) => (
                                <Link
                                    key={recurso.title}
                                    href={recurso.href}
                                    title={recurso.title}
                                >
                                    <Button
                                        className='w-full justify-start my-[2px] text-[16px]'
                                        variant={pathname === recurso.href ? 'secondary' : 'ghostDark'}
                                    >
                                        {recurso.title}
                                    </Button>
                                </Link>
                        ))}
                    </AccordionContent>
                </AccordionItem>
                <div className="flex flex-col w-full border-b">
                    <Link
                        className="py-[9.5px] text-lg hover:underline ml-5"
                        href="/pricing/"
                        title="Precios"
                    >
                        <Button
                            className='w-full justify-start gap-1 text-lg font-semibold'
                            variant={pathname === "/pricing/" ? 'secondary' : 'ghostDark'}
                        >
                            Precios
                        </Button>
                    </Link>
                </div>
            </Accordion>
            <div className="lg:text-lg text-lg mt-10 px-4 flex justify-center flex-col pb-10">
                <Link
                    href="/dashboard/"
                    className="flex justify-center"
                    title="Sketchlie"
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
                <div className="flex items-center flex-row justify-center space-x-4 mt-4">
                    <Link href="https://www.facebook.com/people/Sketchlie/61558420300592/" target="_blank" aria-label="Sketchlie on Facebook" title="Sketchlie on Facebook">
                        <FaFacebook className="text-2xl ml-2" />
                    </Link>
                    <Link href="https://twitter.com/sketchlieteam" target="_blank" aria-label="Sketchlie on Twitter" title="Sketchlie on Twitter">
                        <FaTwitter className="text-2xl ml-2" />
                    </Link>
                    <Link href="https://www.linkedin.com/company/sketchlie" target="_blank" aria-label="Sketchlie on LinkedIn" title="Sketchlie on LinkedIn">
                        <FaLinkedin className="text-2xl ml-2" />
                    </Link>
                    <Link href="http://www.instagram.com/sketchlieux" target="_blank" aria-label="Sketchlie on Instagram" title="Sketchlie on Instagram">
                        <FaInstagram className="text-2xl ml-2" />
                    </Link>
                </div>
                <p className="ml-2 text-center mt-3">
                    © 2024. Todos los derechos reservados.
                </p>
            </div>
        </footer>
    )
}