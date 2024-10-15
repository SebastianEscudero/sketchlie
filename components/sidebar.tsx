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

const Sidebar = ({ translations, lang }: { translations: any, lang: string }) => {
    const pathname = usePathname();
    const t = translations;
    return (
        <div className="space-y-4 py-4 flex flex-col h-full bg-amber-50 text-black overflow-y-auto">
            <div className="py-2 flex-1">
                <div className="flex items-center pl-8">
                    <div className="mr-4">
                        <Image
                            width={75}
                            height={75}
                            alt="Logo"
                            src="/logos/logo.svg"
                        />
                    </div>
                    <h1 className="text-2xl font-semibold">
                        {t.logo}
                    </h1>
                </div>
                <div className="space-y-1 mt-2">
                    <Accordion type="single" collapsible className="text-lg">
                        <AccordionItem value="item-1" className="px-4">
                            <AccordionTrigger className="font-semibold">{t.menu.product}</AccordionTrigger>
                            <AccordionContent className="flex flex-col w-full gap-1">
                                <SheetClose asChild>
                                    <Link
                                        title={t.menu.sketchlieDescription}
                                        href={`/${lang}/quienes-somos/`}
                                    >
                                        <Button
                                            className='w-full justify-start my-[2px] text-[16px] font-medium'
                                            variant={pathname === `${lang}/quienes-somos/` ? 'auth' : 'navbar'}
                                        >
                                            {t.menu.sketchlieDescription}
                                        </Button>
                                    </Link>
                                </SheetClose>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2" className="px-4">
                            <AccordionTrigger className="font-semibold">{t.menu.solutions}</AccordionTrigger>
                            <AccordionContent className="flex flex-col w-full gap-1">
                                {t.useCases.map((component: any) => (
                                    <SheetClose asChild key={component.title}>
                                        <Link
                                            title={component.title}
                                            href={`/${lang}${component.href}`}
                                        >
                                            <Button
                                                className='w-full justify-start my-[2px] text-[16px] font-medium'
                                                variant={pathname === `${lang}${component.href}` ? 'auth' : 'navbar'}
                                            >
                                                {component.title}
                                            </Button>
                                        </Link>
                                    </SheetClose>
                                ))}
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3" className="px-4">
                            <AccordionTrigger className="font-semibold">{t.menu.byTeam}</AccordionTrigger>
                            <AccordionContent className="flex flex-col w-full gap-1">
                                {t.teams.map((component: any) => (
                                    <SheetClose asChild key={component.title}>
                                        <Link
                                            title={component.title}
                                            href={`/${lang}${component.href}`}
                                        >
                                            <Button
                                                className='w-full justify-start my-[2px] text-[16px] font-medium'
                                                variant={pathname === `${lang}${component.href}` ? 'auth' : 'navbar'}
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
                                    href={`/${lang}/blog/`}
                                    title={t.menu.blog}
                                >
                                    <Button
                                        className='w-full justify-start gap-1 text-lg font-semibold'
                                        variant={pathname === `${lang}/blog/` ? 'auth' : 'navbar'}
                                    >
                                        {t.menu.blog}
                                    </Button>
                                </Link>
                            </SheetClose>
                        </div>
                        <div className="flex flex-col w-full border-b">
                            <SheetClose asChild>
                                <Link
                                    className="my-2 text-lg hover:underline px-5"
                                    href={`/${lang}/pricing/`}
                                    title={t.menu.pricing}
                                >
                                    <Button
                                        className='w-full justify-start gap-1 text-lg font-semibold'
                                        variant={pathname === `${lang}/pricing/` ? 'auth' : 'navbar'}
                                    >
                                        {t.menu.pricing}
                                    </Button>
                                </Link>
                            </SheetClose>
                        </div>
                    </Accordion>
                </div>
            </div>
            <Link href="/auth/login/" className="text-center" title={t.login}>
                <Button
                    variant="outline"
                    className="w-[90%]"
                >
                    {t.login}
                </Button>
            </Link>
            <Link href="/auth/register/" className="text-center" title={t.register}>
                <Button
                    variant="auth"
                    className="w-[90%]"
                >
                    {t.register}
                </Button>
            </Link>
        </div>
    );
}

export default Sidebar;