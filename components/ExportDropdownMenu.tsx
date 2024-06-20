import { exportToJPG, exportToJSON, exportToPdf, exportToPNG, exportToSVG } from "@/lib/export";
import { useRoom } from "./room";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ArrowUpFromLine, ChevronRight } from "lucide-react";

interface ExportDropdownMenuProps {
    id: string;
    title: string;
}

export const ExportDropdownMenu = ({ id, title }: ExportDropdownMenuProps) => {
    const { liveLayers, liveLayerIds } = useRoom();

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
            <DropdownMenuContent side="right" sideOffset={8} className="w-[100px]">
                <DropdownMenuItem
                    onClick={() => exportToPdf(title)}
                    className="p-3 cursor-pointer"
                >
                    to PDF
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => exportToPNG(title)}
                    className="p-3 cursor-pointer"
                >
                    to PNG
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => exportToJPG(title)}
                    className="p-3 cursor-pointer"
                >
                    to JPG
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => exportToSVG(title)}
                    className="p-3 cursor-pointer"
                >
                    to SVG
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => exportToJSON(id, liveLayers, liveLayerIds)}
                    className="p-3 cursor-pointer"
                >
                    to JSON
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
