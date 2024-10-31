import { ScribbleIcon } from "@/public/custom-icons/scribble";
import { AnimatedToolbarMenu } from "./toolbar";
import { Button } from "@/components/ui/button";

interface PathStrokeSizeMenuProps {
    onPathStrokeSizeChange: any;
    selectedStrokeSize: any;
}

const strokeSizes = [1, 2, 3, 4, 5];

export const PathStrokeSizeMenu: React.FC<PathStrokeSizeMenuProps> = ({ onPathStrokeSizeChange, selectedStrokeSize }) => {
    return (
        <AnimatedToolbarMenu isOpen={true} className="right-20 top-16 flex flex-col items-center cursor-default">
            <div className="grid grid-cols-5 gap-x-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                {strokeSizes.map((size) => (
                    <Button
                        key={size}
                        onClick={() => onPathStrokeSizeChange(size)}
                        variant={selectedStrokeSize === size ? "iconActive" : "icon"}
                        size="icon"
                        className="h-8 w-8"
                    >
                        <ScribbleIcon strokeWidth={size} className="h-5 w-5" />
                    </Button>
                ))}
            </div>
        </AnimatedToolbarMenu>
    )
}