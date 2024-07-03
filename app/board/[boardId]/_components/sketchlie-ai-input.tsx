import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InsertLayerCommand } from "@/lib/commands";
import { LoaderCircle, Sparkles } from "lucide-react";
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
        <div className="p-2 space-x-2 absolute h-[52px] w-[50%] bottom-2 left-[25%] bg-white rounded-md py-3 items-center drop-shadow-md md:h-600:flex hidden">
            <Input 
                placeholder="Create a diagram of the universe"
                className="w-full text-base"
                value={inputValue}
                onChange={handleInputChange}
            />
            <Button variant="auth" onClick={handleButtonClick} className="px-3" disabled={isLoading}>
                {isLoading ? <LoaderCircle className="animate-spin h-5 w-5 text-white"/> : <Sparkles className="h-5 w-5 fill-custom-blue text-white"/>}
            </Button>
        </div>
    )
};