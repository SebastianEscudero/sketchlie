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
} from "@/components/ui/alert-dialog"; // Adjust the import path as necessary

interface ImportDropdownMenuProps {
    id: string;
    usersRole: string;
    insertLayerCommand: any;
    performAction: any;
    setLiveLayers: any;
    setLiveLayerIds: any;
    liveLayers: any;
    liveLayerIds: any;
    socket: any;
}

interface ImportData {
    layers: Record<string, any>; // Adjust the type according to the actual structure of your layers
    layerIds: string[];
}

export const ImportDropdownMenu = (
    {
        id,
        usersRole,
        insertLayerCommand,
        performAction,
        setLiveLayers,
        setLiveLayerIds,
        liveLayers,
        liveLayerIds,
        socket
    }: ImportDropdownMenuProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
    const [importData, setImportData] = useState<ImportData | null>(null); // Updated this line

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
                    setImportData(json); // Save the data temporarily
                    setIsAlertDialogOpen(true); // Show the AlertDialog
                } else {
                    toast.error("File format is incorrect");
                }
            } catch (error) {
                toast.error("Error importing board");
            } finally {
                // Reset the file input after processing the file
                event.target.value = '';
            }
        };
        reader.readAsText(file);
    };

    const handleImport = () => {
        if (!importData) return;

        // Transform importData.layers object into an array matching the order of importData.layerIds
        const orderedLayers = importData.layerIds.map(id => importData.layers[id]);
        const imported = true

        const command = new insertLayerCommand(
            importData.layerIds,
            orderedLayers,
            liveLayers,
            liveLayerIds,
            setLiveLayers,
            setLiveLayerIds,
            id,
            socket,
            imported
        );

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
                className="p-3 cursor-pointer w-full justify-start text-black font-normal bg-white hover:bg-accent"
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