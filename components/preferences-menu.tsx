import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { ChevronRight, Settings } from "lucide-react";
import { Switch } from "@/components/ui/switch";

interface PreferencesMenuProps {
    returnToSelectionModeAfterInsert?: boolean;
    setReturnToSelectionModeAfterInsert?: (returnToSelectionModeAfterInsert: boolean) => void;
}

export const PreferencesMenu = ({
    returnToSelectionModeAfterInsert,
    setReturnToSelectionModeAfterInsert
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
                        <span className="text-sm font-medium">Quick mode</span>
                        <Switch
                            checked={returnToSelectionModeAfterInsert}
                            onCheckedChange={setReturnToSelectionModeAfterInsert}
                        />
                    </div>
                    <p className="text-xs text-muted-foreground">
                        Return to selection mode after inserting an element
                    </p>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
