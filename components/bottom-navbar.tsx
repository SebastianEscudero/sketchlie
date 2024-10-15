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
import { usePathname } from "next/navigation";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import bottomNavbarTranslations from "@/public/locales/bottom-navbar";
import { Language } from "@/types/canvas";
import { LanguageContext } from "@/providers/language-provider";
import { useContext } from "react";

export const BotNavbar = () => {
    const pathname = usePathname();
    const lang = useContext(LanguageContext);
    const t = bottomNavbarTranslations[lang as Language];

    return (
        <footer className="bg-[#1C1C1E] text-white xl:px-[15%] lg:px-[7%] md:px-[5%] px-[5%]">
            <div className="py-10">
                <div className="text-center mt-10 xl:mx-[10%] lg:mx-[8%] md:mx-[10%] mx-[0%]">
                    <h2 className="mb-10 text-4xl md:text-5xl lg:text-6xl">
                        {t.startCollaborating}
                    </h2>
                    <p className="mx-[10%]">
                        {t.joinCommunity}
                    </p>
                    <Link href={"/dashboard/"} title={t.signUpFree}>
                        <Button variant="sketchlieBlue" className="text-lg p-6 mt-10">
                            {t.signUpFree}
                        </Button>
                    </Link>
                </div>
                <LogoSlider />
            </div>
            <div className="lg:flex text-xl justify-between hidden">
                <nav className="flex flex-col">
                    <h3 className="font-bold mb-2">{t.solutions}</h3>
                    {t.useCases.map((component, index) => (
                        <Link key={index} title={component.title} href={`/${lang}${component.href}`}>
                            <Button variant={pathname === `${lang}${component.href}` ? 'secondary' : 'ghostDark'} className="my-1 text-lg">
                                {component.title}

                            </Button>
                        </Link>
                    ))}
                </nav>
                <nav className="flex flex-col">
                    <h3 className="font-bold mb-2">{t.teams}</h3>
                    {t.teamTypes.map((component, index) => (
                        <Link key={index} title={component.title} href={`/${lang}${component.href}`}>
                            <Button variant={pathname === `${lang}${component.href}` ? 'secondary' : 'ghostDark'} className="my-1 text-lg">
                                {component.title}

                            </Button>
                        </Link>
                    ))}
                </nav>
                <nav className="flex flex-col">
                    <h3 className="font-bold mb-2">{t.resources}</h3>
                    {t.resourceLinks.map((recurso, index) => (
                        <Link key={index} title={recurso.title} href={`/${lang}${recurso.href}`}>
                            <Button variant={pathname === `${lang}${recurso.href}` ? 'secondary' : 'ghostDark'} className="my-1 text-lg">
                                {recurso.title}
                            </Button>
                        </Link>
                    ))}
                </nav>
                <nav className="flex flex-col">
                    <h3 className="font-bold mb-2">{t.informativeContent}</h3>
                    {t.whatIsLinks.map((component, index) => (
                        <Link key={index} title={component.title} href={`/${lang}${component.href}`}>
                            <Button variant={pathname === `${lang}${component.href}` ? 'secondary' : 'ghostDark'} className="my-1 text-lg">
                                {t.whatIs} {component.title}?
                           </Button>
                        </Link>
                    ))}
                </nav>
            </div>
            <Accordion type="single" collapsible className="text-lg lg:hidden">
                <AccordionItem value="item-1" className="px-4">
                    <AccordionTrigger className="font-semibold">{t.product}</AccordionTrigger>
                    <AccordionContent className="flex flex-col w-full gap-1">
                        <Link href={`/${lang}/quienes-somos/`}>
                            <Button
                                className='w-full justify-start my-[2px] text-[16px]'
                                variant={pathname === `${lang}/quienes-somos/` ? 'secondary' : 'ghostDark'}
                            >
                                {t.sketchlieDescription}

                            </Button>
                        </Link>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2" className="px-4">
                    <AccordionTrigger className="font-semibold">{t.solutions}</AccordionTrigger>
                    <AccordionContent className="flex flex-col w-full gap-1">
                        {t.useCases.map((component) => (
                            <Link
                                key={component.title}
                                href={`/${lang}${component.href}`}
                                title={component.title}
                            >
                                <Button
                                    className='w-full justify-start my-[2px] text-[16px]'
                                    variant={pathname === `${lang}${component.href}` ? 'secondary' : 'ghostDark'}
                                >
                                    {component.title}
                                </Button>
                            </Link>
                        ))}
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3" className="px-4">
                    <AccordionTrigger className="font-semibold">{t.teams}</AccordionTrigger>
                    <AccordionContent className="flex flex-col w-full gap-1">
                        {t.teamTypes.map((component) => (
                            <Link
                                key={component.title}
                                href={`/${lang}${component.href}`}
                                title={component.title}
                            >
                                <Button
                                    className='w-full justify-start my-[2px] text-[16px]'
                                    variant={pathname === `${lang}${component.href}` ? 'secondary' : 'ghostDark'}
                                >
                                    {component.title}
                                </Button>
                            </Link>
                        ))}
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4" className="px-4">
                    <AccordionTrigger className="font-semibold">{t.resources}</AccordionTrigger>
                    <AccordionContent className="flex flex-col w-full gap-1">
                        {t.resourceLinks.map((recurso) => (
                            <Link
                                key={recurso.title}
                                href={`/${lang}${recurso.href}`}
                                title={recurso.title}
                            >
                                <Button
                                    className='w-full justify-start my-[2px] text-[16px]'
                                    variant={pathname === `${lang}${recurso.href}` ? 'secondary' : 'ghostDark'}
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
                        href={`/${lang}/pricing/`}
                        title={t.pricing}
                    >

                        <Button
                            className='w-full justify-start gap-1 text-lg font-semibold'
                            variant={pathname === `${lang}/pricing/` ? 'secondary' : 'ghostDark'}
                        >
                            {t.pricing}
                        </Button>
                    </Link>
                </div>
            </Accordion>
            <div className="lg:text-lg text-lg mt-10 px-4 flex justify-center flex-col pb-10">
                <Link
                    href="/dashboard/"
                    className="flex justify-center items-center"
                    title="Sketchlie"
                >
                    <Image
                        src="/logos/logo-dark-mode.svg"
                        width={40}
                        height={40}
                        alt="Logo"
                    />
                    <p className="ml-2 hover:underline font-semibold">
                        Sketchlie
                    </p>
                </Link>
                <div className="flex items-center flex-row justify-center space-x-4 mt-4">
                    <Link href="https://www.facebook.com/people/Sketchlie/61558420300592/" target="_blank" aria-label={t.socialLinks.facebook} title={t.socialLinks.facebook}>
                        <FaFacebook className="text-2xl ml-2" />
                    </Link>
                    <Link href="https://twitter.com/sketchlieteam" target="_blank" aria-label={t.socialLinks.twitter} title={t.socialLinks.twitter}>
                        <FaTwitter className="text-2xl ml-2" />
                    </Link>
                    <Link href="https://www.linkedin.com/company/sketchlie" target="_blank" aria-label={t.socialLinks.linkedin} title={t.socialLinks.linkedin}>
                        <FaLinkedin className="text-2xl ml-2" />
                    </Link>
                    <Link href="http://www.instagram.com/sketchlieux" target="_blank" aria-label={t.socialLinks.instagram} title={t.socialLinks.instagram}>
                        <FaInstagram className="text-2xl ml-2" />
                    </Link>
                </div>
                <p className="ml-2 text-center mt-3">
                    {t.copyright}
                </p>
            </div>
        </footer>
    )
}