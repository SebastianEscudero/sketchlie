import { MoonIcon, SunIcon } from "lucide-react";
import { themeCheck, themeSwitch } from "@/lib/theme-utils";
import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";

export const ThemeDropdownMenu = () => {
    const [theme, setTheme] = useState("dark");

    useEffect(() => {
        setTheme(themeCheck());
    }, [])

    const handleThemeChange = () => {
        const newTheme = themeSwitch();
        setTheme(newTheme);
    };

    return (
        <div className="flex items-center p-3 px-[18px] cursor-pointer w-full">
            {theme === "dark" ? (
                <MoonIcon className="h-5 w-5 mr-2 text-indigo-400 fill-indigo-400 theme-icon" />
            ) : (
                <SunIcon className="h-5 w-5 mr-2 text-amber-400 fill-amber-400 theme-icon" />
            )}
            <Switch
                className="ml-4"
                checked={theme === "dark"}
                onCheckedChange={handleThemeChange}
            />
        </div>
    );
};