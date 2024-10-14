import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { ChevronRight, EraserIcon, MousePointer2, Settings } from "lucide-react";
import { Switch } from "@/components/ui/switch";

interface PreferencesMenuProps {
    quickInserting?: boolean;
    setQuickInserting?: (quickInserting: boolean) => void;
    eraserDeleteAnyLayer?: boolean;
    setEraserDeleteAnyLayer?: (eraserDeleteAnyLayer: boolean) => void;
}

export const PreferencesMenu = ({
    quickInserting,
    setQuickInserting,
    eraserDeleteAnyLayer,
    setEraserDeleteAnyLayer
}: PreferencesMenuProps) => {

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className="h-[44px]">
                <DropdownMenuItem className="p-3 cursor-pointer flex justify-between">
                    <div className="flex flex-row items-center">
                        <Settings className="h-4 w-4 mr-2" />
                        Preferences
                    </div>
                    <ChevronRight className="h-4 w-4 ml-auto" />
                </DropdownMenuItem>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="right" sideOffset={10} className="w-[280px]">
                <DropdownMenuLabel className="p-2 text-sm font-semibold">Preferences</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="p-2 flex flex-col">
                    <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center">
                            <MousePointer2 className="h-4 w-4 mr-2" />
                            <span className="text-sm font-medium">Quick insert</span>
                        </div>
                        <Switch
                            checked={quickInserting}
                            onCheckedChange={setQuickInserting}
                        />
                    </div>
                    <p className="text-xs text-muted-foreground">
                        Lets you add layers continuously
                    </p>
                </div>
                <DropdownMenuSeparator />
                <div className="p-2 flex flex-col">
                    <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center">
                            <EraserIcon className="h-4 w-4 mr-2" />
                            <span className="text-sm font-medium">Eraser mode</span>
                        </div>
                        <Switch
                            checked={eraserDeleteAnyLayer}
                            onCheckedChange={setEraserDeleteAnyLayer}
                        />
                    </div>
                    <p className="text-xs text-muted-foreground">
                        Delete <span className="font-semibold underline">any</span> type of layer when using the eraser
                    </p>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
