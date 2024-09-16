"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"

const porEquipo: { title: string; href: string }[] = [
    {
        title: "Diseño de Producto",
        href: "/diseno-de-producto/",
    },
    {
        title: "Equipos de Ingeniería",
        href: "/equipos-de-ingenieria/",
    },
    {
        title: "Diseño",
        href: "/diseno/",
    },
    {
        title: "Equipos de TI",
        href: "/equipos-de-ti/",
    },
    {
        title: "Marketing ",
        href: "/marketing/",
    },
     {
        title: "Agencias y Consultoras",
        href: "/agencias-y-consultoras/",
    },
    {
        title: "Ventas",
        href: "/ventas/",
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

export function NavigationMenuLanding() {
    const pathname = usePathname();

    return (
        <NavigationMenu>
            <NavigationMenuList className="lg:flex hidden">
                <NavigationMenuItem>
                    <NavigationMenuTrigger>¿Qué es Sketchlie?</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px]">
                            <ListItem href="/quienes-somos/" title="Descripción de Sketchlie">
                                Descubre qué es Sketchlie y cómo puede ayudarte.
                            </ListItem>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Soluciones</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <div className="grid gap-3 p-6 md:w-[400px] md:grid-cols-2 lg:w-[600px]">
                            <div>
                                <h3 className="mb-2 text-sm font-medium">Por Equipo</h3>
                                <ul className="space-y-2">
                                    {porEquipo.map((item) => (
                                        <ListItem key={item.title} title={item.title} href={item.href} active={pathname === item.href} />
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h3 className="mb-2 text-sm font-medium">Por Caso de Uso</h3>
                                <ul className="space-y-2">
                                    {porCasoDeUso.map((item) => (
                                        <ListItem key={item.title} title={item.title} href={item.href} active={pathname === item.href} />
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Recursos</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                            {Recursos.map((recurso) => (
                                <ListItem key={recurso.title} title={recurso.title} href={recurso.href} active={pathname === recurso.href}>
                                    Explora nuestros {recurso.title.toLowerCase()} para sacar el máximo provecho de Sketchlie.
                                </ListItem>
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link href="/pricing/" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            Precios
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a"> & { active?: boolean }
>(({ className, title, children, active, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        active && "text-blue-600 font-medium",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    {children && (
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            {children}
                        </p>
                    )}
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"