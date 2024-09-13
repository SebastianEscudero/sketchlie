import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Check, ChevronRight, Eye } from "lucide-react";
import { Button } from "./ui/button";
import { MoonIcon, SunIcon } from "lucide-react";
import { themeCheck, themeColors, themeSwitch } from "@/lib/theme-utils";
import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";

interface BackgroundMenuProps {
    Background?: string;
    setBackground?: (Background: string) => void;
    setForcedRender?: (forcedRender: any) => void;
}

export const BackgroundMenu = ({
    Background,
    setBackground,
    setForcedRender,
}: BackgroundMenuProps) => {
    const options = ['none', 'grid', 'line'];
    const [theme, setTheme] = useState("dark");

    useEffect(() => {
        setTheme(themeCheck());
    }, [])

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className="h-[44px]">
                <DropdownMenuItem className="p-3 cursor-pointer flex justify-between">
                    <div className="flex flex-row items-center">
                        <Eye className="h-4 w-4 mr-2" />
                        View
                    </div>
                    <ChevronRight className="h-4 w-4 ml-auto" />
                </DropdownMenuItem>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="right" sideOffset={10} className="w-[140px]">
                {options.map(option => (
                    <Button
                        key={option}
                        variant="ghost"
                        className="p-3 cursor-pointer text-sm w-full justify-start"
                        onClick={() => {
                            setBackground && setBackground(option)
                            localStorage.setItem("background", option)
                        }}
                    >
                        {option.charAt(0).toUpperCase() + option.slice(1)}
                        {(Background === option) && (
                            <Check className="h-4 w-4 mr-2 ml-auto" />
                        )}
                    </Button>
                ))}
                <div className="flex items-center justify-between p-3 pl-4 cursor-pointer">
                    {theme === "dark" ? (
                        <MoonIcon className="h-5 w-5 mr-2 text-indigo-400 fill-indigo-400" />
                    ) : (
                        <SunIcon className="h-5 w-5 mr-2 text-amber-400 fill-amber-400" />
                    )}                    <Switch
                        checked={theme === "dark"}
                        onCheckedChange={() => {
                            const newTheme = themeSwitch();
                            setTheme(newTheme);
                            setForcedRender && setForcedRender((prev: any) => !prev);
                        }}
                    />
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}