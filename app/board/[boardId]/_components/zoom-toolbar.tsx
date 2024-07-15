import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";

interface ZoomToolbarProps {
    zoom: number;
    setZoom: (zoom: number) => void;
    camera: { x: number, y: number };
    setCamera: (camera: { x: number, y: number }) => void;
}

const PREDEFINED_PERCENTAGES = [10, 25, 50, 100, 150, 200, 300, 400];

export const ZoomToolbar = ({
    zoom,
    setZoom,
    camera,
    setCamera
}: ZoomToolbarProps) => {

    const baseZoom = 1;

    const zoomToPercentage = (zoom: number) => {
        if (zoom < baseZoom) {
            return Math.round(((zoom - 0.3) / (baseZoom - 0.3)) * (100 - 10) + 10);
        } else {
            return Math.round(((zoom - baseZoom) / (10 - baseZoom)) * (400 - 100) + 100);
        }
    };

    const percentageToZoom = (percentage: number) => {
        if (percentage <= 100) {
            return ((percentage - 10) / (100 - 10)) * (baseZoom - 0.3) + 0.3;
        } else {
            return ((percentage - 100) / (400 - 100)) * (10 - baseZoom) + baseZoom;
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
        setZoomAndCamera(baseZoom); // 100% zoom
    };

    const zoomPercentage = zoomToPercentage(zoom);

    return (
        <div className="absolute h-[52px] bottom-2 left-2 rounded-lg py-2 items-center shadow-custom-3 sm:flex hidden">
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