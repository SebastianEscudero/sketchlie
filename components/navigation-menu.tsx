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

export function NavigationMenuLanding({ translations, lang }: { translations: any, lang: string }) {
    const pathname = usePathname();
    const t = translations;

    return (
        <NavigationMenu>
            <NavigationMenuList className="lg:flex hidden">
                <NavigationMenuItem>
                    <NavigationMenuTrigger>{t.menu.whatIsSketchlie}</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px]">
                            <ListItem href={`/${lang}/quienes-somos/`} title={t.menu.whatIsSketchlie}>
                                {t.menu.sketchlieDescription}
                            </ListItem>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>{t.menu.solutions}</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <div className="grid gap-3 p-6 md:w-[400px] md:grid-cols-2 lg:w-[600px]">
                            <div>
                                <h3 className="mb-2 text-sm font-medium">{t.menu.byTeam}</h3>
                                <ul className="space-y-2">
                                    {t.teams.map((item: any) => (
                                        <ListItem key={item.title} title={item.title} href={`/${lang}${item.href}`} active={pathname === `${lang}${item.href}`} />
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h3 className="mb-2 text-sm font-medium">{t.menu.byUseCase}</h3>
                                <ul className="space-y-2">
                                    {t.useCases.map((item: any) => (
                                        <ListItem key={item.title} title={item.title} href={`/${lang}${item.href}`} active={pathname === `${lang}${item.href}`} />
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>{t.menu.resources}</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                            {t.resources.map((recurso: any) => (
                                <ListItem key={recurso.title} title={recurso.title} href={`/${lang}${recurso.href}`} active={pathname === `${lang}${recurso.href}`}>
                                    {recurso.description}
                                </ListItem>
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link href={`/${lang}/pricing/`} legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            {t.menu.pricing}
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