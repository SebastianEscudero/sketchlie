import { exportToJPG, exportToJSON, exportToPdf, exportToPNG, exportToSVG } from "@/lib/export";
import { useRoom } from "./room";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ArrowUpFromLine, ChevronRight, ToggleLeft, ToggleRight } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

interface ExportDropdownMenuProps {
    id: string;
    title: string;
}

export const ExportDropdownMenu = ({ id, title }: ExportDropdownMenuProps) => {
    const { liveLayers, liveLayerIds } = useRoom();
    const [isTransparent, setIsTransparent] = useState(false); // State to manage transparency

    const toggleTransparency = () => setIsTransparent(!isTransparent); // Toggle function

    const exportOptions = [
        { label: 'to PDF', action: () => exportToPdf(title, isTransparent) },
        { label: 'to PNG', action: () => exportToPNG(title, isTransparent) },
        { label: 'to JPG', action: () => exportToJPG(title, isTransparent) },
        { label: 'to SVG', action: () => exportToSVG(title, isTransparent) },
        { label: 'to JSON', action: () => exportToJSON(id, liveLayers, liveLayerIds) },
    ];

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className="h-[44px]">
                <DropdownMenuItem className="p-3 cursor-pointer flex justify-between">
                    <div className="flex flex-row items-center">
                        <ArrowUpFromLine className="h-4 w-4 mr-2" />
                        Export
                    </div>
                    <ChevronRight className="h-4 w-4" />
                </DropdownMenuItem>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="right" sideOffset={8} className="w-[140px]">
                {exportOptions.map((option, index) => (
                    <DropdownMenuItem
                        key={index}
                        onClick={option.action}
                        className="p-3 cursor-pointer"
                    >
                        {option.label}
                    </DropdownMenuItem>
                ))}
                <div className="border-t dark:border-zinc-500 pt-1">
                    <Button
                        onClick={toggleTransparency}
                        className="p-3 cursor-pointer w-full justify-start text-black dark:text-white font-normal bg-white dark:bg-inherit hover:bg-accent dark:hover:bg-[#2C2C2C]"
                        variant="ghost"
                    >
                        {isTransparent ? <ToggleRight className="mr-2" /> : <ToggleLeft className="mr-2 text-neutral-400" />} Transparent
                    </Button>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};