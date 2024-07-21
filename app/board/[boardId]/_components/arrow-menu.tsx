import { ArrowType, CanvasMode, LayerType } from "@/types/canvas";
import { ToolButton } from "./tool-button";
import { MoveUpRight, Redo, TrendingUp } from "lucide-react";

interface ArrowMenuProps {
    setCanvasState: (state: any) => void;
    setArrowTypeInserting: (type: ArrowType) => void;
    arrowTypeInserting: ArrowType;
}

export const ArrowMenu = ({
    setCanvasState,
    setArrowTypeInserting,
    arrowTypeInserting,
}: ArrowMenuProps) => {
    return (
        <div className="absolute left-32 bottom-16 p-2 bg-white dark:bg-[#383838] rounded-lg shadow-custom-1 flex flex-row space-x-1 items-center cursor-default">
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
                isActive={
                    arrowTypeInserting === ArrowType.Straight
                }
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
                isActive={
                    arrowTypeInserting === ArrowType.Curved
                }
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
                isActive={
                    arrowTypeInserting === ArrowType.Diagram
                }
            />
        </div>
    )
};