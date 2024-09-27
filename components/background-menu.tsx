import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { ChevronRight, Eye, Grid, Circle, Square, Check } from "lucide-react";
import { MoonIcon, SunIcon } from "lucide-react";
import { themeCheck, themeSwitch } from "@/lib/theme-utils";
import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";

interface BackgroundMenuProps {
    background?: string;
    setBackground?: (background: string) => void;
    setForcedRender?: (forcedRender: any) => void;
}

export const BackgroundMenu = ({
    background,
    setBackground,
    setForcedRender,
}: BackgroundMenuProps) => {
    const [theme, setTheme] = useState("dark");

    useEffect(() => {
        setTheme(themeCheck());
    }, [])

    const backgroundOptions = [
        { value: 'none', label: 'No grid', icon: Square },
        { value: 'grid', label: 'Square grid', icon: Grid },
        { value: 'circular-grid', label: 'Dot grid', icon: Circle },
    ];

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
            <DropdownMenuContent side="right" sideOffset={10} className="w-[160px]">
                <DropdownMenuLabel className="p-2 text-sm font-semibold">Background</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {backgroundOptions.map(option => (
                    <DropdownMenuItem
                        key={option.value}
                        className={`p-2 cursor-pointer ${background === option.value ? 'bg-accent' : ''}`}
                        onClick={() => {
                            setBackground && setBackground(option.value)
                            localStorage.setItem("background", option.value)
                        }}
                    >
                        <div className="flex items-center w-full">
                            {option.icon && <option.icon className="h-4 w-4 mr-2" />}
                            <span>{option.label}</span>
                            {background === option.value && <Check className="h-4 w-4 ml-2" />}
                        </div>
                    </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <div className="flex items-center justify-between p-3 pl-4 cursor-pointer">
                    {theme === "dark" ? (
                        <MoonIcon className="h-5 w-5 mr-2 text-indigo-400 fill-indigo-400" />
                    ) : (
                        <SunIcon className="h-5 w-5 mr-2 text-amber-400 fill-amber-400" />
                    )}
                    <Switch
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