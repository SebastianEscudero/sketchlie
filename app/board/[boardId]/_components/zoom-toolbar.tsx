import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";

interface ZoomToolbarProps {
    zoom: number;
    setZoom: (zoom: number) => void;
    camera: { x: number, y: number };
    setCamera: (camera: { x: number, y: number }) => void;
}

const PREDEFINED_ZOOMS = [0.3, 0.5, 0.75, 1, 2, 4, 7, 10];
const PREDEFINED_PERCENTAGES = [10, 25, 50, 100, 150, 200, 300, 400];

export const ZoomToolbar = ({
    zoom,
    setZoom,
    camera,
    setCamera
}: ZoomToolbarProps) => {

    const zoomToPercentage = (zoom: number) => {
        if (zoom < 2) {
            // Adjust the formula to map zoom 2 to 100%
            return Math.round(((zoom - 1) / (2 - 1)) * (100 - 50) + 50);
        } else {
            // For zoom levels above 2, adjust the scale accordingly
            return Math.round(((zoom - 2) / (10 - 2)) * (400 - 100) + 100);
        }
    };
    
    const percentageToZoom = (percentage: number) => {
        if (percentage <= 100) {
            // Adjust the formula to interpret 100% as zoom 2
            return ((percentage - 50) / (100 - 50)) * (2 - 1) + 1;
        } else {
            // For percentages above 100%, adjust the zoom level accordingly
            return ((percentage - 100) / (400 - 100)) * (10 - 2) + 2;
        }
    };

    const findClosestZoom = (currentZoom: number, direction: 'up' | 'down') => {
        const currentPercentage = zoomToPercentage(currentZoom);
        let closestPercentage;

        if (direction === 'up') {
            closestPercentage = PREDEFINED_PERCENTAGES.find(p => p > currentPercentage) || PREDEFINED_PERCENTAGES[PREDEFINED_PERCENTAGES.length - 1];
        } else {
            closestPercentage = [...PREDEFINED_PERCENTAGES].reverse().find(p => p < currentPercentage) || PREDEFINED_PERCENTAGES[0];
        }

        return percentageToZoom(closestPercentage);
    };

    const setZoomAndCamera = (newZoom: number) => {
        newZoom = Math.max(0.3, Math.min(10, newZoom));
        
        const zoomFactor = newZoom / zoom;
        const newX = window.innerWidth/2 - (window.innerWidth/2 - camera.x) * zoomFactor;
        const newY = window.innerHeight/2 - (window.innerHeight/2 - camera.y) * zoomFactor;

        setZoom(newZoom);
        setCamera({ x: newX, y: newY });
    }

    const handleZoomIn = () => {
        const newZoom = findClosestZoom(zoom, 'up');
        setZoomAndCamera(newZoom);
    };

    const handleZoomOut = () => {
        const newZoom = findClosestZoom(zoom, 'down');
        setZoomAndCamera(newZoom);
    };

    const handleResetZoom = () => {
        setZoomAndCamera(2); // 100% zoom
    };

    const zoomPercentage = zoomToPercentage(zoom);

    return (
        <div className="absolute h-[52px] bottom-2 left-2 bg-white dark:bg-[#383838] rounded-lg py-2 items-center shadow-custom-3 sm:flex hidden">
            <Hint label="Zoom out" sideOffset={4}>
                <Button onClick={handleZoomOut} className="ml-2 px-2" variant="board">
                    <Minus className="h-4 w-4" />
                </Button>
            </Hint>
            <Hint label="Reset zoom" sideOffset={4}>
                <Button onClick={handleResetZoom} variant="board" className="px-2 text-xs">
                    {zoomPercentage}%
                </Button>
            </Hint>
            <Hint label="Zoom in" sideOffset={4}>
                <Button onClick={handleZoomIn} className="mr-2 px-2" variant="board">
                    <Plus className="h-4 w-4" />
                </Button>
            </Hint>
        </div>
    )
}