import { ChevronsLeft, LaptopMinimalIcon, MoonIcon, SunIcon, ToggleLeft, ToggleRight } from "lucide-react";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent } from "../ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";

interface ThemeDropdownMenuProps {
    theme: string;
    setTheme: (theme: string) => void;
}

export const ThemeDropdownMenu = ({
    theme,
    setTheme
}: ThemeDropdownMenuProps) => {
    const inactiveColor = "#A0AEC0";

    const themeColors = {
        light: "#DAA520",
        dark: "#4F76E8",
    };

    const handleSetLightTheme = () => {
        setTheme("light");
        localStorage.setItem("theme", "light");
    };
    const handleSetDarkTheme = () => {
        setTheme("dark")
        localStorage.setItem("theme", "dark");
    };

    return (
        // <DropdownMenu>
        //     <DropdownMenuTrigger className="w-full">
        //         <Button
        //             className="p-5 cursor-pointer w-full justify-start font-normal bg-white hover:bg-accent"
        //             variant="ghost"
        //         >
        //             <ChevronsLeft className="w-5 h-5 mr-7"/> Theme
        //         </Button>
        //     </DropdownMenuTrigger>
        //     <DropdownMenuContent side="left" align="start" sideOffset={5} className="rounded-lg drop-shadow-md flex flex-col justify-start">
        //         <Button variant="board" className="flex flex-row items-center justify-start" style={{color: theme === "light" ? themeColors.light : inactiveColor, opacity: theme === "light" ? 1 : 0.8}} onClick={handleSetLightTheme}>
        //             Light
        //             <SunIcon className="w-4 h-4 ml-4" fill={theme === "light" ? themeColors.light : inactiveColor} stroke={theme === "light" ? themeColors.light : inactiveColor}/>
        //         </Button>
        //         <Button variant="board" className="flex flex-row items-center justify-start" style={{color: theme === "dark" ? themeColors.dark : inactiveColor, opacity: theme === "dark" ? 1 : 0.8}} onClick={handleSetDarkTheme}>
        //             Dark
        //             <MoonIcon className="w-4 h-4 ml-4" fill={theme === "dark" ? themeColors.dark : inactiveColor} stroke={theme === "dark" ? themeColors.dark : inactiveColor}/>
        //         </Button>
        //     </DropdownMenuContent>
        // </DropdownMenu>
        <Button
            className="p-5 cursor-pointer w-full justify-start font-normal bg-white hover:bg-accent"
            variant="ghost"
            onClick={theme === "dark" ? handleSetLightTheme : handleSetDarkTheme}
        >
            {theme === "dark" ? <MoonIcon className="mr-7" fill={themeColors.dark} /> : <SunIcon className="mr-7" fill={themeColors.light} />}
            {theme === "dark" ? <ToggleLeft fill={themeColors.dark}/> : <ToggleRight fill={themeColors.light}/>}
        </Button>
    );
};