import { MoonIcon, SunIcon, ToggleLeft, ToggleRight } from "lucide-react";
import { Button } from "../ui/button";
import { themeCheck, themeSwitch } from "@/lib/theme-utilts";
import { useEffect, useState } from "react";

export const ThemeDropdownMenu = () => {
    const [theme, setTheme] = useState("dark");
    const themeColors = {
        light: "#DAA520",
        dark: "#4F76E8",
    };

    useEffect(() => {
        setTheme(themeCheck());
    },[])

    const onClick = () => {
        const newTheme = themeSwitch();
        setTheme(newTheme);
    };

    return (
        <Button
            className="p-5 cursor-pointer w-full justify-start font-normal bg-white dark:bg-inherit hover:bg-accent dark:hover:bg-[#2C2C2C]"
            variant="ghost"
            onClick={onClick}
        >
            {theme === "dark" ? <MoonIcon className="mr-7" fill={themeColors.dark} /> : <SunIcon className="mr-7" fill={themeColors.light} />}
            {theme === "dark" ? <ToggleLeft fill={themeColors.dark}/> : <ToggleRight fill={themeColors.light}/>}
        </Button>
    );
};