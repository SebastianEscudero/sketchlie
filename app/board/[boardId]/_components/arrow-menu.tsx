import { ArrowType, CanvasMode, LayerType } from "@/types/canvas";
import { ToolButton } from "./tool-button";
import { MoveUpRight, Redo, TrendingUp } from "lucide-react";
import { AnimatedToolbarMenu } from "./toolbar";

interface ArrowMenuProps {
    setCanvasState: (state: any) => void;
    setArrowTypeInserting: (type: ArrowType) => void;
    arrowTypeInserting: ArrowType;
    isArrowsMenuOpen: boolean;
}

export const ArrowMenu = ({
    setCanvasState,
    setArrowTypeInserting,
    arrowTypeInserting,
    isArrowsMenuOpen,
}: ArrowMenuProps) => {
    return (
        <AnimatedToolbarMenu
            isOpen={isArrowsMenuOpen}
            className="left-[86px] bottom-16 flex flex-row space-x-1 items-center cursor-default"
        >
            <ToolButton
                label="Straight"
                icon={MoveUpRight}
                onClick={() => {
                    setCanvasState({
                        mode: CanvasMode.Inserting,
                        layerType: LayerType.Arrow,
                    });
                    setArrowTypeInserting(ArrowType.Straight);
                }}
                isActive={arrowTypeInserting === ArrowType.Straight}
            />
            <ToolButton
                label="Curved"
                icon={Redo}
                onClick={() => {
                    setCanvasState({
                        mode: CanvasMode.Inserting,
                        layerType: LayerType.Arrow,
                    });
                    setArrowTypeInserting(ArrowType.Curved);
                }}
                isActive={arrowTypeInserting === ArrowType.Curved}
            />
            <ToolButton
                label="Diagram"
                icon={TrendingUp}
                onClick={() => {
                    setCanvasState({
                        mode: CanvasMode.Inserting,
                        layerType: LayerType.Arrow,
                    });
                    setArrowTypeInserting(ArrowType.Diagram);
                }}
                isActive={arrowTypeInserting === ArrowType.Diagram}
            />
        </AnimatedToolbarMenu>
    )
};
