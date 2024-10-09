import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";

interface MoveBackToContentProps {
    setCamera: (camera: { x: number, y: number }) => void;
    setZoom: (zoom: number) => void;
    showButton: boolean;
}

export const MoveBackToContent = ({ setCamera, setZoom, showButton }: MoveBackToContentProps) => {
    return (
        <div className={`border dark:border-zinc-800 shadow-md bg-white dark:bg-zinc-800 absolute top-16 left-4 rounded-xl p-1 h-12 items-center pointer-events-auto ${showButton ? 'flex' : 'hidden'}`} >
            <Hint label="Go to content" side="bottom" sideOffset={10}>
            <Button
                variant="infoIcons"
                onClick={() => {
                    setCamera({ x: 0, y: 0 });
                    setZoom(1);
                }}
            >
                Go to content <ArrowRightIcon className="ml-2 w-4 h-4" />
            </Button>
            </Hint>
        </div>
    )
}