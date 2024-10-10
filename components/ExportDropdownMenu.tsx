import { exportFramesToPdf, exportToJPG, exportToJSON, exportToPdf, exportToPNG, exportToSVG } from "@/lib/export";
import { useRoom } from "./room";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { Button } from "./ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ExportIcon } from "@/public/custom-icons/export";
import { Hint } from "./hint";

interface ExportDropdownMenuProps {
    id: string;
    title: string;
    svgRef: React.RefObject<SVGSVGElement>;
}

export const ExportDropdownMenu = ({ id, title, svgRef }: ExportDropdownMenuProps) => {
    const { liveLayers, liveLayerIds } = useRoom();
    const [isTransparent, setIsTransparent] = useState(false);

    const imageExportOptions = [
        { label: 'Export as PNG', action: () => exportToPNG(title, isTransparent) },
        { label: 'Export as JPG', action: () => exportToJPG(title, isTransparent) },
        { label: 'Export as SVG', action: () => exportToSVG(title, isTransparent) },
    ];

    const documentExportOptions = [
        { label: 'Export as PDF', action: () => exportFramesToPdf(title, isTransparent, liveLayers, liveLayerIds, svgRef) },
    ];

    const dataExportOptions = [
        { label: 'Export as JSON', action: () => exportToJSON(id, liveLayers, liveLayerIds) },
    ];

    return (
        <DropdownMenu>
            <Hint label="Export" side="bottom" sideOffset={10}>
                <DropdownMenuTrigger asChild>
                    <Button variant="infoIcons" className="p-2">
                        <ExportIcon />
                    </Button>
                </DropdownMenuTrigger>
            </Hint>
            <DropdownMenuContent side="bottom" sideOffset={8} className="w-[200px]">
                <DropdownMenuLabel className="p-2 text-sm font-semibold">Export Options</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuLabel className="px-2 py-1 text-xs text-gray-500">Images</DropdownMenuLabel>
                    {imageExportOptions.map((option, index) => (
                        <DropdownMenuItem key={index} onClick={option.action} className="p-2 cursor-pointer">
                            {option.label}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuLabel className="px-2 py-1 text-xs text-gray-500">Documents</DropdownMenuLabel>
                    {documentExportOptions.map((option, index) => (
                        <DropdownMenuItem key={index} onClick={option.action} className="p-2 cursor-pointer">
                            {option.label}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuLabel className="px-2 py-1 text-xs text-gray-500">Data</DropdownMenuLabel>
                    {dataExportOptions.map((option, index) => (
                        <DropdownMenuItem key={index} onClick={option.action} className="p-2 cursor-pointer">
                            {option.label}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <div className="p-2">
                    <div className="flex items-center space-x-2">
                        <Switch
                            id="transparent-mode"
                            checked={isTransparent}
                            onCheckedChange={setIsTransparent}
                            className="scale-75"
                        />
                        <Label htmlFor="transparent-mode" className="text-sm">Transparent</Label>
                    </div>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};