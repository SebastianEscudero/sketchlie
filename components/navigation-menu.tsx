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
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { usePathname } from "next/navigation"

const porEquipo: { title: string; href: string}[] = [
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

const porCasoDeUso: { title: string; href: string}[] = [
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

export function NavigationMenuLanding() {

  const pathname = usePathname();

  return (
    <NavigationMenu className="hidden lg:flex lg:flex-col">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>¿Qué es Sketchlie</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-8 md:w-[500px] lg:w-[300px]">
              <p className="px-3 text-[16px]">Producto</p>
              <ListItem href="/product-overview" title="Descripción de Sketchlie 🚧"/>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Soluciones</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid w-[400px] gap-3 p-10 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                <div>
                    <p className="px-3 text-[16px] mb-4">Equipos</p>
                    <ul className="flex flex-col">
                          {porEquipo.map((component) => (
                              <Link
                                  className={cn(
                                    "p-3 w-full hover:underline hover:bg-zinc-400/10",
                                    pathname === component.href ? "text-custom-blue bg-white/10" : "text-black",
                                )}
                                  key={component.title}
                                  title={component.title}
                                  href={component.href}
                              >
                                  {component.title}
                              </Link>
                          ))}
                      </ul>
                </div>
                <div>
                    <p className="px-3 text-[16px] mb-4">Casos de uso</p>
                    <ul className="flex flex-col">
                          {porCasoDeUso.map((component) => (
                              <Link
                                  className={cn(
                                    "p-3 w-full hover:underline hover:bg-zinc-400/10",
                                    pathname === component.href ? "text-custom-blue bg-white/10" : "text-black",
                                )}
                                  key={component.title}
                                  title={component.title}
                                  href={component.href}
                              >
                                  {component.title}
                              </Link>
                          ))}
                      </ul>
                </div>
            </div>
        </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
        <Link href="/blog">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Blog
            </NavigationMenuLink>
          </Link>
          <Link href="/pricing" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Precios 🚧
            </NavigationMenuLink>
          </Link>
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
