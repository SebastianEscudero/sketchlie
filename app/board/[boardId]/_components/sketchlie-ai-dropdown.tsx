import { Hint } from "@/components/hint"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { TranslateLayersCommand } from "@/lib/commands"
import { downloadTextAsPdf } from "@/lib/sketchlie-ai"
import { Layers, LayerType } from "@/types/canvas"
import { FileText, LoaderCircle, Sparkles, WandSparkles } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

interface SketchlieAiDropdownProps {
    liveLayers: Layers;
    title: string
    setLiveLayers: any;
    selectedLayersRef: any;
    boardId: string;
    socket: any;
    performAction: (command: any) => void;
}

export const SketchlieAiDropdown = ({
    liveLayers,
    title,
    setLiveLayers,
    selectedLayersRef,
    boardId,
    socket,
    performAction
}: SketchlieAiDropdownProps) => {
    const [isSummaryLoading, setIsSummaryLoading] = useState(false);
    const [isFillTextsLoading, setIsFillTextsLoading] = useState(false);

    const layers = selectedLayersRef.current.reduce((obj: any, id: string) => {
        obj[id] = liveLayers[id];
        return obj;
      }, {});

    const generateSummary = async (layers: any, title: string) => {
        setIsSummaryLoading(true);

        const layerDetails = Object.entries(layers).reduce((obj: any, [id, layer]: [string, any]) => {
            obj[id] = {
                x: layer.x,
                y: layer.y,
                value: layer.value,
                type: layer.type
            };
            return obj;
        }, {});

        const selectedLayers = JSON.stringify(layerDetails);

        try {
            const response = await fetch("/api/groq", {
                method: "POST",
                body: JSON.stringify(
                    {
                        selectedLayers,
                        title,
                        type: "summary"
                    }
                ),
                headers: {
                    "Content-Type": "application/json",
                }
            });
            const data = await response.text();
            downloadTextAsPdf(data, title);
        } catch {
            toast.error("Failed to generate summary, please try again.")
        } finally {
            setIsSummaryLoading(false);
        }
    }

    const fillTexts = async (layers: any, title: string) => {
        setIsFillTextsLoading(true);
    
        const layerDetails = Object.entries(layers).reduce((obj: any, [id, layer]: [string, any]) => {
            obj[id] = {
                x: layer.x,
                y: layer.y,
                value: layer.value,
                type: layer.type
            };

            if (layer.type === LayerType.Arrow) {
                if (layer.startConnectedLayerId) {
                    obj[id].startConnectedLayerId = layer.startConnectedLayerId;
                }
                if (layer.endConnectedLayerId) {
                    obj[id].endConnectedLayerId = layer.endConnectedLayerId;
                }
            }
            return obj;
        }, {});

        const selectedLayers = JSON.stringify(layerDetails);

        try {
            const response = await fetch("/api/groq", {
                method: "POST",
                body: JSON.stringify(
                    {
                        selectedLayers,
                        title,
                        type: "fillTexts"
                    }
                ),
                headers: {
                    "Content-Type": "application/json",
                }
            });
    
            const data = await response.json();

            const updatedLayers = Object.entries(layers).reduce((acc: any, [id, layer]: [string, any]) => {
                const updatedLayer = data.layers[id];
                if (updatedLayer) {
                    acc[id] = { ...layer, value: updatedLayer.value };
                } else {
                    acc[id] = layer;
                }
                return acc;
            }, {});
    
            const command = new TranslateLayersCommand(selectedLayersRef.current, layers, updatedLayers, setLiveLayers, boardId, socket);
            performAction(command);
        } catch {
            toast.error("Failed to generate text, please try again.")
        } finally {
            setIsFillTextsLoading(false);
        }        
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <div className="flex items-center pl-2 border-l border-neutral-200">
                    <Hint label="Sketchify">
                        <Button
                            asChild
                            variant="board"
                            size="icon"
                        >
                            <Sparkles className="text-purple-700 p-2 fill-purple-700 hover:text-purple-700" />
                        </Button>
                    </Hint>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent sideOffset={8}>
                <div className="p-2">
                    <div className="text-purple-700 text-base font-bold pl-3 flex flex-row items-center">
                        Sketchify
                        <Sparkles className="h-4 w-4 ml-2 fill-purple-700" />
                    </div>
                    <div className="flex flex-col">
                        <Button
                            variant="board"
                            size="sm"
                            disabled={layers.length < 2 || isSummaryLoading}
                            className="mt-1 justify-start"
                            onClick={() => generateSummary(layers, title)}
                        >
                            <div className="flex items-center">
                                {isSummaryLoading ? 'Generating summary...' : 'Generate summary'}
                                {isSummaryLoading ? <LoaderCircle className="animate-spin h-5 w-5 text-purple-700 ml-2"/> : <FileText className="h-5 w-5 ml-2 text-purple-700" />}
                            </div>
                        </Button>
                        <Button
                            variant="board"
                            size="sm"
                            disabled={!Object.values(layers).some((layer: any) => layer.value === "") || isFillTextsLoading || Object.keys(layers).length < 2}
                            className="mt-1 justify-start"
                            onClick={() => fillTexts(layers, title)}
                        >
                            <div className="flex items-center">
                                {isFillTextsLoading ? 'Generating text...' : 'Generate text'}
                                {isFillTextsLoading ? <LoaderCircle className="animate-spin h-5 w-5 text-purple-700 ml-2"/> : <WandSparkles className="h-5 w-5 ml-2 text-purple-700" />}
                            </div>
                        </Button>
                    </div>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}