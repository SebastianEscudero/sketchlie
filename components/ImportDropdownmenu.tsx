import React, { useRef, useState } from "react";
import { Import } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogTitle,
    AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { useProModal } from "@/hooks/use-pro-modal";
import { InsertLayerCommand } from "@/lib/commands";
interface ImportDropdownMenuProps {
    id: string;
    usersRole: string;
    performAction: any;
    setLiveLayers: any;
    setLiveLayerIds: any;
    org: any
    socket: any;
    selectedLayersRef: any;
}

interface ImportData {
    layers: Record<string, any>;
    layerIds: string[];
}

export const ImportDropdownMenu = (
    {
        id,
        usersRole,
        performAction,
        setLiveLayers,
        setLiveLayerIds,
        socket,
        org,
        selectedLayersRef
    }: ImportDropdownMenuProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
    const [importData, setImportData] = useState<ImportData | null>(null);
    const proModal = useProModal();


    const onImportClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const json = JSON.parse(e.target?.result as string);
                if (json.layers && Array.isArray(json.layerIds)) {
                    setImportData(json);
                    setIsAlertDialogOpen(true);
                } else {
                    toast.error("File format is incorrect");
                }
            } catch (error) {
                toast.error("Error importing board");
            } finally {
                event.target.value = '';
            }
        };
        reader.readAsText(file);
    };

    const handleImport = () => {
        if (!importData) return;

        const orderedLayers = importData.layerIds.map(id => importData.layers[id]);

        const command = new InsertLayerCommand(importData.layerIds, orderedLayers, setLiveLayers, setLiveLayerIds, id, socket, org, proModal);

        selectedLayersRef.current = importData.layerIds;

        performAction(command);
        setIsAlertDialogOpen(false);
        toast.success("Imported successfully");
    };

    return (
        <>
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                accept=".json"
                onChange={handleFileChange}
            />
            <Button
                disabled={usersRole !== "Admin"}
                onClick={onImportClick}
                className="p-3 cursor-pointer w-full justify-start text-black dark:text-white font-normal bg-white dark:bg-inherit hover:bg-accent dark:hover:bg-[#2C2C2C]"
            >
                <Import className="h-4 w-4 mr-2" />
                Import
            </Button>
            <AlertDialog open={isAlertDialogOpen} onOpenChange={setIsAlertDialogOpen}>
                <AlertDialogTrigger asChild>
                    <button style={{ display: "none" }} />
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogTitle>Heads up!</AlertDialogTitle>
                    <AlertDialogDescription>
                        The current layers will be replaced with the imported board, you can always undo to go back.
                    </AlertDialogDescription>
                    <AlertDialogAction className="bg-custom-blue hover:bg-custom-blue-dark" onClick={handleImport}>Proceed</AlertDialogAction>
                    <AlertDialogCancel onClick={() => {
                        setIsAlertDialogOpen(false);
                        if (fileInputRef.current) fileInputRef.current.value = ''; // Reset the file input when cancelling
                    }}>Cancel</AlertDialogCancel>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};