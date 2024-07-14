import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Check, ChevronRight, Eye } from "lucide-react";
import { Button } from "./ui/button";
import { MoonIcon, SunIcon } from "lucide-react";
import { themeCheck, themeSwitch } from "@/lib/theme-utilts";
import { useEffect, useState } from "react";
import { Color } from "@/types/canvas";

interface BackgroundMenuProps {
    Background?: string;
    setBackground?: (Background: string) => void;
    setLiveLayers: (layers: any) => void;
    liveLayers: any;
}

export const BackgroundMenu = ({
    Background,
    setBackground,
    setLiveLayers,
    liveLayers,
}: BackgroundMenuProps) => {
    const options = ['none', 'grid', 'line'];
    const [theme, setTheme] = useState("dark");
    const themeColors = {
        light: "#DAA520",
        dark: "#4F76E8",
    };

    useEffect(() => {
        setTheme(themeCheck());
    }, [])

    const onClick = () => {
        const newTheme = themeSwitch();
        setTheme(newTheme);
        const newLayers = { ...liveLayers };
        for (const layer in newLayers) {
            const newLayer = { ...newLayers[layer] };
            const darkColor = { r: 29, g: 29, b: 29, a: 1 };
            const lightColor = { r: 255, g: 255, b: 255, a: 1 };
            
            const matchesColor = (color: Color, targetColor: Color) => color.r === targetColor.r && color.g === targetColor.g && color.b === targetColor.b && color.a === targetColor.a;

            const inverseColor = newTheme === "light" ? darkColor : lightColor;

            if (matchesColor(newLayer.fill, darkColor) || matchesColor(newLayer.fill, lightColor)) {
                newLayer.fill = inverseColor;
            }

            if (newLayer.outlineFill && (matchesColor(newLayer.outlineFill, darkColor) || matchesColor(newLayer.outlineFill, lightColor))) {
                newLayer.outlineFill = inverseColor;
            }
            newLayers[layer] = newLayer;

        }
        setLiveLayers(newLayers);
    };

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
                <Button
                    className="p-3 cursor-pointer w-full justify-start bg-white dark:bg-inherit hover:bg-accent dark:hover:bg-[#2C2C2C]"
                    variant="ghost"
                    onClick={onClick}
                >
                    Theme
                    {theme === "dark" ? <MoonIcon className="ml-auto" fill={themeColors.dark} /> : <SunIcon className="ml-auto" fill={themeColors.light} />}
                </Button>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}