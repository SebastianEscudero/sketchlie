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
import { SheetClose } from "./ui/sheet";

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
    {
        title: "Customer Journey Map ",
        href: "/customer-journey-map",
    },
]

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

const Sidebar = ({
}) => {

    const pathname = usePathname();

    return (
        <div className="space-y-4 py-4 flex flex-col h-full bg-[#FFF] overflow-y-auto">
            <div className="py-2 flex-1">
                <div className="flex items-center pl-8">
                    <div className="mr-4">
                        <Image
                            width={75}
                            height={75}
                            alt="Logo"
                            src="/logo.svg"
                        />
                    </div>
                    <h1 className="text-2xl font-semibold">
                        Sketchlie
                    </h1>
                </div>
                <div className="space-y-1 mt-2">
                    <Accordion type="single" collapsible className="text-lg">
                        <AccordionItem value="item-1" className="px-4">
                            <AccordionTrigger className="font-semibold">Producto</AccordionTrigger>
                            <AccordionContent className="flex flex-col w-full gap-1">
                                <SheetClose asChild>
                                    <Link
                                        href="/descripcion"
                                    >
                                        <Button
                                            className='w-full justify-start my-[2px] text-[16px]'
                                            variant={pathname === "/descripcion" ? 'auth' : 'ghost'}
                                        >
                                            Descripcion de Sketchlie 🚧
                                        </Button>
                                    </Link>
                                </SheetClose>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2" className="px-4">
                            <AccordionTrigger className="font-semibold">Soluciones</AccordionTrigger>
                            <AccordionContent className="flex flex-col w-full gap-1">
                                {porCasoDeUso.map((component) => (
                                    <SheetClose asChild key={component.title}>
                                        <Link
                                            href={component.href}
                                        >
                                            <Button
                                                className='w-full justify-start my-[2px] text-[16px]'
                                                variant={pathname === component.href ? 'auth' : 'ghost'}
                                            >
                                                {component.title}
                                            </Button>
                                        </Link>
                                    </SheetClose>
                                ))}
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3" className="px-4">
                            <AccordionTrigger className="font-semibold">Equipos</AccordionTrigger>
                            <AccordionContent className="flex flex-col w-full gap-1">
                                {porEquipo.map((component) => (
                                    <SheetClose asChild key={component.title}>
                                        <Link
                                            href={component.href}
                                        >
                                            <Button
                                                className='w-full justify-start my-[2px] text-[16px]'
                                                variant={pathname === component.href ? 'auth' : 'ghost'}
                                            >
                                                {component.title}
                                            </Button>
                                        </Link>
                                    </SheetClose>
                                ))}
                            </AccordionContent>
                        </AccordionItem>
                        <div className="flex flex-col w-full border-b">
                            <SheetClose asChild>
                                <Link
                                    className="my-2 text-lg hover:underline px-5"
                                    href="/blog"
                                >
                                    <Button
                                        className='w-full justify-start gap-1 text-lg font-semibold'
                                        variant={pathname === "/blog" ? 'auth' : 'ghost'}
                                    >
                                        Blog
                                    </Button>
                                </Link>
                            </SheetClose>
                        </div>
                        <div className="flex flex-col w-full border-b">
                            <SheetClose asChild>
                                <Link
                                    className="my-2 text-lg hover:underline px-5"
                                    href="/pricing"
                                >
                                    <Button
                                        className='w-full justify-start gap-1 text-lg font-semibold'
                                        variant={pathname === "/pricing" ? 'auth' : 'ghost'}
                                    >
                                        Precios  🚧
                                    </Button>
                                </Link>
                            </SheetClose>
                        </div>
                    </Accordion>
                </div>
            </div>
            <Link href="/auth/login" className="text-center">
                <Button
                    variant="outline"
                    className="w-[90%]"
                >
                    Login
                </Button>
            </Link>
            <Link href="/auth/register" className="text-center">
                <Button
                    variant="auth"
                    className="w-[90%]"
                >
                    Regístrate gratis
                </Button>
            </Link>
        </div>
    );
}

export default Sidebar;