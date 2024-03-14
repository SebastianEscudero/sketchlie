import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const routes: { title: string; href: string}[] = [
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
    title: "Lluvia de Ideas 🚧",
    href: "/lluvia-de-ideas",
  },
]

const Sidebar = ({
}) => {

  const pathname = usePathname();

  return ( 
      <div className="space-y-4 py-4 flex flex-col h-full bg-[#FFF] overflow-y-auto">
          <div className="px-3 py-2 flex-1">
              <Link href="/dashboard" className="flex items-center pl-3 mb-14">
                  <div className="relative h-8 w-8 mr-4">
                      <Image 
                          fill
                          alt="Logo"
                          src="/logo.png"
                      />
                  </div>
                  <h1 className="text-2xl font-bold">
                      Sketchlie
                  </h1>
              </Link>
              <div className="space-y-1">
                  {routes.map((route) => (
                      <Link
                          href={route.href}
                          key={route.href}
                          className={cn(
                              "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:underline hover:bg-zinc-400/10 rounded-lg transition",
                              pathname === route.href ? "text-custom-blue bg-white/10" : "text-black",
                          )}
                      >
                          <div className="flex items-center flex-1">
                              {route.title}
                          </div>
                      </Link>
                  ))}
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