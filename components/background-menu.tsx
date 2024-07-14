import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Check, ChevronRight, Eye } from "lucide-react";
import { Button } from "./ui/button";

interface BackgroundMenuProps {
    Background?: string;
    setBackground?: (Background: string) => void;
}

export const BackgroundMenu = ({
    Background,
    setBackground,
}: BackgroundMenuProps) => {
    const options = ['none', 'grid', 'line'];

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
            </DropdownMenuContent>
        </DropdownMenu>
    )
}