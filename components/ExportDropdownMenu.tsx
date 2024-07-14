import { exportToJPG, exportToJSON, exportToPdf, exportToPNG, exportToSVG } from "@/lib/export";
import { useRoom } from "./room";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuCheckboxItem,
    DropdownMenuGroup,
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
                <DropdownMenuItem className="p-3 cursor-pointer flex justify-between dark:bg-white dark:hover:bg-slate-100 dark:text-black">
                    <div className="flex flex-row items-center">
                        <ArrowUpFromLine className="h-4 w-4 mr-2" />
                        Export
                    </div>
                    <ChevronRight className="h-4 w-4" />
                </DropdownMenuItem>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="right" sideOffset={8} className="w-[140px] dark:bg-white dark:border-slate-200">
                {exportOptions.map((option, index) => (
                    <DropdownMenuItem
                        key={index}
                        onClick={option.action}
                        className="p-3 cursor-pointer dark:bg-white dark:hover:bg-slate-100 dark:text-black"
                    >
                        {option.label}
                    </DropdownMenuItem>
                ))}
                <div className="border-t border-zinc-300 pt-1">
                    <Button
                        onClick={toggleTransparency}
                        className="p-3 cursor-pointer w-full justify-start text-black font-normal dark:hover:text-black bg-white hover:bg-accent dark:hover:bg-slate-100"
                        variant="ghost"
                    >
                        {isTransparent ? <ToggleRight className="mr-2" /> : <ToggleLeft className="mr-2 text-neutral-400" />} Transparent
                    </Button>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};