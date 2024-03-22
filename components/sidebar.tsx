import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { cn } from "@/lib/utils";
import { SheetClose } from "./ui/sheet";
import { useEffect, useRef } from "react";

const components: { title: string; href: string}[] = [
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
    title: "Mapeo de procesos",
    href: "/mapas-de-procesos",
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
    title: "Diagramas",
    href: "/diagrama",
  },
  {
    title: "Gestión de producto 🚧",
    href: "/gestion-producto",
  },
  {
    title: "Equipos de Ingeniería 🚧",
    href: "/equipos-de-ingenieria",
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
    title: "Diseño 🚧",
    href: "/diseno",
  },
  {
    title: "Ventas 🚧",
    href: "/ventas",
  },
  {
    title: "Lluvia de ideas ",
    href: "/lluvia-de-ideas",
  },
]

const Sidebar = ({ 
}) => {

  const pathname = usePathname();
  const closeRef = useRef<HTMLButtonElement>(null);
  const prevPathnameRef = useRef<string>();

  useEffect(() => {
    if (prevPathnameRef.current && prevPathnameRef.current !== pathname) {
      if (closeRef.current) {
        closeRef.current.click();
        console.log(pathname);
      }
    }
    prevPathnameRef.current = pathname;
  }, [pathname]);
  
  return ( 
      <div className="space-y-4 py-4 flex flex-col h-full bg-[#FFF] overflow-y-auto">
          <div className="px-3 py-2 flex-1">
              <div className="flex items-center pl-3 mb-14">
                  <div className="relative h-10 w-10 mr-4">
                      <Image 
                          fill
                          alt="Logo"
                          src="/logo.svg"
                      />
                  </div>
                  <h1 className="text-2xl font-bold">
                      Sketchlie
                  </h1>
                  <SheetClose ref={closeRef} />
              </div>
              <div className="space-y-1">
              <Accordion type="single" collapsible className="text-lg">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Producto</AccordionTrigger>
                        <AccordionContent>
                            <Link 
                                className="p-3 text-lg hover:underline ml-5"
                                href="/product-overview">
                                Descripción de Sketchlie 🚧
                            </Link>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>Soluciones</AccordionTrigger>
                        <AccordionContent>
                        <ul className="flex flex-col">
                            {components.map((component) => (
                                <Link
                                    className={cn(
                                      "text-lg p-3 w-full hover:underline hover:bg-zinc-400/10 ml-5",
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
                        </AccordionContent>
                    </AccordionItem>
                    <div className="py-4 text-lg border-b font-medium">
                        <Link
                            className="py-5 text-lg hover:underline ml-5"
                            href="/blog"
                        >
                            Blog 
                        </Link>
                    </div>
                    <div className="py-4 text-lg border-b font-medium">
                        <Link
                            className="py-5 text-lg hover:underline ml-5"
                            href="/precios"
                        >
                            Precios 🚧
                        </Link>
                    </div>
                </Accordion>
              </div>
          </div>
          <Link href="/dashboard" className="text-center">
            <Button
                variant="outline"
                className="w-[90%]"
            >
              Regístrate gratis
            </Button>
          </Link>
      </div>
   );
}

export default Sidebar;