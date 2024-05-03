"use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { usePathname } from "next/navigation"
import { Button } from "./ui/button"

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
    },
]

export function NavigationMenuLanding() {

    const pathname = usePathname();

    return (
        <NavigationMenu className="hidden lg:flex lg:flex-col">
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>¿Qué es Sketchlie</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <div className="grid w-[400px] gap-3 p-8 md:w-[500px] lg:w-[300px]">
                            <p className="px-3 text-[16px] mb-4 font-bold">Producto</p>
                            <NavigationMenuLink
                                href={"/descripcion"}
                            >
                                <Button
                                    className='w-full justify-start my-[3px] text-[16px]'
                                    variant={pathname === "/descripcion" ? 'auth' : 'ghost'}
                                >
                                    Descripcion de Sketchlie 🚧
                                </Button>
                            </NavigationMenuLink>
                        </div>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Soluciones</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <div className="grid w-[400px] gap-3 p-10 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                            <div>
                                <p className="px-3 text-[16px] mb-4 font-bold">Equipos</p>
                                {porEquipo.map((component) => (
                                    <NavigationMenuLink
                                        key={component.title}
                                        href={component.href}
                                    >
                                        <Button
                                            className='w-full justify-start my-[3px] text-[16px]'
                                            variant={pathname === component.href ? 'auth' : 'ghost'}
                                        >
                                            {component.title}
                                        </Button>
                                    </NavigationMenuLink>
                                ))}
                            </div>
                            <div>
                                <p className="px-3 text-[16px] mb-4 font-bold">Casos de uso</p>
                                {porCasoDeUso.map((component) => (
                                    <NavigationMenuLink
                                        key={component.title}
                                        href={component.href}
                                    >
                                        <Button
                                            className='w-full justify-start my-[3px] text-[16px]'
                                            variant={pathname === component.href ? 'auth' : 'ghost'}
                                        >
                                            {component.title}
                                        </Button>
                                    </NavigationMenuLink>
                                ))}
                            </div>
                        </div>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink
                        href={"/blog/"}
                    >
                        <Button
                            className='justify-start my-[3px] text-[16px] mr-2'
                            variant={pathname === "/blog/" ? 'auth' : 'ghost'}
                        >
                            Blog
                        </Button>
                    </NavigationMenuLink>
                    <NavigationMenuLink
                        href={"/pricing/"}
                    >
                        <Button
                            className='justify-start my-[3px] text-[16px]'
                            variant={pathname === "/pricing/" ? 'auth' : 'ghost'}
                        >
                            Precios
                        </Button>
                    </NavigationMenuLink>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground hover:underline",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"