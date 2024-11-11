import { ArrowType, CanvasMode, LayerType, ToolbarMenu } from "@/types/canvas";
import { ToolButton } from "./tool-button";
import { MoveUpRight, Redo, TrendingUp, LucideIcon } from "lucide-react";
import { AnimatedToolbarMenu } from "./toolbar";

interface ArrowMenuProps {
    setCanvasState: (state: any) => void;
    setArrowTypeInserting: (type: ArrowType) => void;
    arrowTypeInserting: ArrowType;
    isArrowsMenuOpen: boolean;
    setToolbarMenu: (menu: ToolbarMenu) => void;
}

interface ArrowOption {
    label: string;
    icon: LucideIcon;
    type: ArrowType;
}

const arrowOptions: ArrowOption[] = [
    {
        label: "Straight",
        icon: MoveUpRight,
        type: ArrowType.Straight
    },
    {
        label: "Curved",
        icon: Redo,
        type: ArrowType.Curved
    },
    {
        label: "Diagram",
        icon: TrendingUp,
        type: ArrowType.Diagram
    }
];

export const ArrowMenu = ({
    setCanvasState,
    setArrowTypeInserting,
    arrowTypeInserting,
    isArrowsMenuOpen,
    setToolbarMenu
}: ArrowMenuProps) => {
    return (
        <AnimatedToolbarMenu
            isOpen={isArrowsMenuOpen}
            className="left-[86px] bottom-16 flex flex-row space-x-1 items-center cursor-default"
        >
            {arrowOptions.map((option) => (
                <ToolButton
                    key={option.label}
                    label={option.label}
                    icon={option.icon}
                    onClick={() => {
                        setCanvasState({
                            mode: CanvasMode.Inserting,
                            layerType: LayerType.Arrow,
                        });
                        setArrowTypeInserting(option.type);
                        setToolbarMenu(ToolbarMenu.None);
                    }}
                    isActive={arrowTypeInserting === option.type}
                />
            ))}
        </AnimatedToolbarMenu>
    )
};
