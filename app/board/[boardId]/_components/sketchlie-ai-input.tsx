import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InsertLayerCommand } from "@/lib/commands";
import { Sparkles, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface SketchlieAiInputProps {
    setLiveLayers: (layers: any) => void;
    setLiveLayerIds: (layerIds: string[]) => void;
    boardId: string;
    socket: any;
    org: any;
    proModal: any;
    performAction: (command: any) => void;
}

export const SketchlieAiInput = ({
    setLiveLayers,
    setLiveLayerIds,
    boardId,
    socket,
    org,
    proModal,
    performAction,
}: SketchlieAiInputProps) => {
    const [inputValue, setInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (event: any) => {
        setInputValue(event.target.value);
    };

    const handleButtonClick = async () => {
        setIsLoading(true);

        try {
            const response = await fetch("/api/groq", {
                method: "POST",
                body: JSON.stringify(
                    {
                        inputValue,
                        type: "generation"
                    }
                ),
                headers: {
                    "Content-Type": "application/json",
                }
            });

            const data = await response.json();

            const layerIds = data.layerIds;
            const layers = layerIds.map((id: string) => data.layers[id]);

            const command = new InsertLayerCommand(layerIds, layers, setLiveLayers, setLiveLayerIds, boardId, socket, org, proModal);
            performAction(command);
        } catch (e: any) {
            toast.error(`An error occurred: ${e.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="pointer-events-auto absolute left-4 top-20 w-[300px] bg-white rounded-md shadow-md overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2 border-b">
                <span className="font-semibold">Generate</span>
                <span className="text-xs text-gray-500">AI beta</span>
                <Button variant="ghost" size="sm" className="p-0">
                    <X className="h-4 w-4" />
                </Button>
            </div>
            <div className="p-4">
                <textarea 
                    placeholder="Mind map of the plot themes and characters from The Great Gatsby"
                    className="w-full h-[200px] text-sm mb-2 p-2 border rounded-md resize-none"
                    value={inputValue}
                    onChange={handleInputChange}
                />
                <Button
                    onClick={handleButtonClick}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                    disabled={isLoading}
                >
                    {isLoading ? "Generating..." : "Generate"}
                    <Sparkles className="h-4 w-4 ml-2" />
                </Button>
            </div>
            <div className="px-4 py-2 bg-gray-100 text-xs text-gray-500">
                AI outputs can be misleading or wrong
            </div>
        </div>
    )
};