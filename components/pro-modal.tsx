import { Card } from "@/components/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useProModal } from "@/hooks/use-pro-modal";
import { Check, Zap } from "lucide-react";
import { Badge } from "./ui/badge";

const tools = [
    {
        label: "Starter",
        description: "Desbloquea espacios de trabajo infinitos con todas las herramientas que necesitas",
        price: "14.990$CLP",
        features: {
            "Espacios de trabajo": "Ilimitados",
            "Capas máximas": "500",
            "Herramientas": "Todas",
            "Soporte": "Básico",
            "Export a PDF": "Sí",
            "Equipos": "3",
        }
    },
]

export const ProModal = () => {
    const proModal = useProModal();
    return (
        <div>
            <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
                            <Badge className="uppercase text-sm py-1" variant="inProgress">
                                Pronto estará disponible
                            </Badge>
                            <div className="flex items-center gap-x-2 font-bold py-1">
                                Sketchlie
                                <Badge className="uppercase text-sm py-1" variant="outline">
                                    Pro
                                </Badge>
                            </div>
                        </DialogTitle>
                        <DialogDescription className="gap-4 pt-2 space-y-2 text-zinc-900 font-medium">
                            {tools.map((tool) => (
                                <Card
                                    key={tool.label}
                                    className="p-5 border-black-5 items-center"
                                >
                                    <div className="flex items-center gap-x-4 font-semibold text-xl mb-2">
                                        {tool.label}
                                    </div>
                                    <div className="font-normal text-sm mb-4">
                                        {tool.description}
                                    </div>
                                    <div className="flex font-bold text-xl">
                                        {tool.price}
                                        <p className="font-bold text-base pt-[3px]">
                                            /m  
                                        </p>
                                    </div>
                                    <div className="flex flex-col gap-y-2 mt-8">
                                        <p>Todas las características del plan gratis más:</p>
                                        {Object.entries(tool.features).map(([feature, value]) => (
                                            <div key={feature} className="flex items-center gap-x-2">
                                                <Check className="w-4 h-4 text-blue-500"/>
                                                <span className="text-black-5">{feature}:</span>
                                                <span className="text-black-5 font-bold">{value}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <Button
                                        size="lg"
                                        className="w-full mt-10"
                                        variant="outline"
                                    >
                                        Mejorar Plan
                                        <Zap className="w-4 h-4 ml-2 fill-white"/>
                                    </Button>
                                </Card>
                            ))}
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}