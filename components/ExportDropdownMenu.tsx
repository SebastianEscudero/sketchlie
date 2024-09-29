import { exportToJPG, exportToJSON, exportToPdf, exportToPNG, exportToSVG } from "@/lib/export";
import { useRoom } from "./room";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Download } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface ExportDropdownMenuProps {
    id: string;
    title: string;
}

export const ExportDropdownMenu = ({ id, title }: ExportDropdownMenuProps) => {
    const { liveLayers, liveLayerIds } = useRoom();
    const [isTransparent, setIsTransparent] = useState(false); // State to manage transparency

    const exportOptions = [
        { label: 'to PDF', action: () => exportToPdf(title, isTransparent) },
        { label: 'to PNG', action: () => exportToPNG(title, isTransparent) },
        { label: 'to JPG', action: () => exportToJPG(title, isTransparent) },
        { label: 'to SVG', action: () => exportToSVG(title, isTransparent) },
        { label: 'to JSON', action: () => exportToJSON(id, liveLayers, liveLayerIds) },
    ];

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="infoIcons" className="p-2">
                    <Download className="h-6 w-6" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="bottom" sideOffset={8} className="w-[160px]">
                <DropdownMenuLabel className="p-2 text-sm font-semibold">Export</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {exportOptions.map((option, index) => (
                    <DropdownMenuItem
                        key={index}
                        onClick={option.action}
                        className="p-3 cursor-pointer"
                    >
                        {option.label}
                    </DropdownMenuItem>
                ))}
                <div className="border-t dark:border-zinc-500 pt-2 pb-1">
                    <div className="flex items-center space-x-2">
                        <Switch
                            id="transparent-mode"
                            checked={isTransparent}
                            onCheckedChange={setIsTransparent}
                            className="scale-75"
                        />
                        <Label htmlFor="transparent-mode">Transparent</Label>
                    </div>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};