import { exportToJSON, exportToPdf, exportToPNG } from "@/lib/export";
import { useRoom } from "./room";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ArrowUpFromLine, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "./ui/badge";

interface ExportDropdownMenuProps {
    id: string;
    title: string;
}

export const ExportDropdownMenu = ({ id, title }: ExportDropdownMenuProps) => {
    const { liveLayers, liveLayerIds } = useRoom(); // Step 2: Use the hook here

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
            <DropdownMenuContent side="right" sideOffset={8}>
                <DropdownMenuItem
                    onClick={async () => {
                        try {
                            await exportToPdf(title);
                        } catch (error) {
                            toast.error("Failed to export to PNG, try a different browser.");
                        }
                    }}
                    className="p-3 cursor-pointer"
                >
                    to PDF
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={async () => {
                        try {
                            await exportToPNG(title);
                        } catch (error) {
                            toast.error("Failed to export to PNG, try a different browser.");
                        }
                    }}
                    className="p-3 cursor-pointer"
                >
                    to PNG
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => exportToJSON(id, liveLayers, liveLayerIds)}
                    className="p-3 cursor-pointer"
                >
                    to JSON
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => toast.info("Coming soon")}
                    className="p-3 cursor-pointer"
                >
                    to SVG <Badge className="ml-2" variant="inProgress">SOON</Badge>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
