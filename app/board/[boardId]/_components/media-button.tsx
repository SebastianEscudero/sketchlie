import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import { CanvasMode, ToolbarMenu, CanvasState } from "@/types/canvas";

interface MediaButtonProps {
    icon: LucideIcon;
    isActive?: boolean;
    isDisabled?: boolean;
    label: string;
    toolbarMenu: ToolbarMenu;
    setToolbarMenu: (menu: ToolbarMenu) => void;
    setCanvasState: (state: CanvasState) => void;
}

export const MediaButton = ({
    icon: Icon,
    isActive,
    isDisabled,
    label,
    toolbarMenu,
    setToolbarMenu,
    setCanvasState,
}: MediaButtonProps) => {
    const handleClick = () => {
        setToolbarMenu(
            toolbarMenu === ToolbarMenu.Media 
                ? ToolbarMenu.None 
                : ToolbarMenu.Media
        );
        setCanvasState({ mode: CanvasMode.None });
    };

    return (
        <Hint side="top" label={label} sideOffset={14}>
            <Button 
                disabled={isDisabled} 
                onClick={handleClick} 
                size="icon" 
                variant={isActive ? "iconActive" : "icon"} 
                className="h-8 w-8 xs:h-10 xs:w-10"
            >
                <Icon className="h-5 w-5" />
            </Button>
        </Hint>
    );
};