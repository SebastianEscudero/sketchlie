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
        if (zoom < 1) {
            return Math.round(((zoom - 0.3) / (1 - 0.3)) * (100 - 10) + 10);
        } else {
            return Math.round(((zoom - 1) / (10 - 1)) * (400 - 100) + 100);
        }
    };

    const percentageToZoom = (percentage: number) => {
        if (percentage <= 100) {
            return ((percentage - 10) / (100 - 10)) * (1 - 0.3) + 0.3;
        } else {
            return ((percentage - 100) / (400 - 100)) * (10 - 1) + 1;
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
        setZoomAndCamera(1); // 100% zoom
    };

    const zoomPercentage = zoomToPercentage(zoom);

    return (
        <div className="absolute h-12 bottom-2 left-2 bg-white rounded-md py-3 flex items-center shadow-md">
            <Hint label="Zoom out" sideOffset={4}>
                <Button onClick={handleZoomOut} className="ml-2 px-3" variant="board">
                    <Minus className="h-5 w-5" />
                </Button>
            </Hint>
            <Hint label="Reset zoom" sideOffset={4}>
                <Button onClick={handleResetZoom} variant="board" className="px-3">
                    {zoomPercentage}%
                </Button>
            </Hint>
            <Hint label="Zoom in" sideOffset={4}>
                <Button onClick={handleZoomIn} className="mr-2 px-3" variant="board">
                    <Plus className="h-5 w-5" />
                </Button>
            </Hint>
        </div>
    )
}