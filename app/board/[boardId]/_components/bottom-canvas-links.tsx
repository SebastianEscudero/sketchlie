"use client"

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Hint } from "@/components/hint";
import { ChevronsUp } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const TabSeparator = () => {
    return(
        <div className="text-black px-1.5">
            |
        </div>
    )
}

export const BottomCanvasLinks = () => {
    return (
        <div className="absolute bottom-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md">
            <Hint label="Tutorial" side="bottom" sideOffset={10}>
                <Button asChild variant="board" className="px-2 font-bold">
                    <Link href="https://www.sketchlie.com/blog/pizarra-online-tutorial/" target="_blank">
                        Ayuda
                    </Link>
                </Button>
            </Hint>
            <TabSeparator />
            <DropdownMenu>
                <Hint label="¿Quiénes somos?" side="bottom" sideOffset={10}>
                    <Button asChild variant="board" className="px-2">
                        <DropdownMenuTrigger className="flex outline-none">
                            <ChevronsUp className="w-5 h-5"/>
                        </DropdownMenuTrigger>
                    </Button>
                </Hint>
                <DropdownMenuContent align="start" className="px-3 py-2 font-semibold space-y-1">
                    <DropdownMenuItem>
                        <Link href="https://www.sketchlie.com/" target="_blank">
                            Website
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Link href="https://www.twitter.com/sketchlieteam/" target="_blank">
                            Twitter
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Link href="https://www.linkedin.com/company/sketchlie/" target="_blank">
                            Linkedin
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Link href="https://www.instagram.com/sketchlieux/" target="_blank">
                            Instagram
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Link href="https://www.facebook.com/people/Sketchlie/61558420300592/" target="_blank">
                            Facebook
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}