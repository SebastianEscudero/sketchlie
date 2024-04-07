import { Card } from "@/components/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useProModal } from "@/hooks/use-pro-modal";
import { Check } from "lucide-react";
import { Badge } from "./ui/badge";
import { SubscriptionButton } from "./subscription-button";

const tools = [
    {
        label: "Gratis",
        description: "Todo lo que necesitas para empezar a colaborar.",
        price: "0$CLP/m",
        features: {
            "Boards": "3",
            'Carga de Imagenes': "Hasta 1MB",
            "Capas máximas": "200",
            "Herramientas": "Todas",
            "Equipos": "1",
        }
    },
    {
        label: "Starter",
        description: "Desbloquea espacios de trabajo infinitos con todas las herramientas que necesitas.",
        price: "14.990$CLP/m",
        features: {
            "Boards": "Ilimitados",
            'Carga de Imagenes': "Hasta 10MB",
            "Capas máximas": "1000",
            "Herramientas": "Todas",
            "Soporte": "Básico",
            "Export a PDF": "Sí",
            "Equipos": "10",
        },
    },
    {
        label: "Business",
        description: "Necesitas algo mas personalizado? Contacta con nosotros para obtener para tu empresa.",
        price: "19.990$CLP/m",
        features: {
            "Boards": "Ilimitados",
            'Carga de Imagenes': "Hasta 25MB",
            "Capas máximas": "Ilimitados",
            "Herramientas": "Todas",
            "Soporte": "Básico",
            "Export a PDF": "Sí",
            "Equipos": "Ilimitados",
        },
        extraFeatures: "Proteccón de datos con inicio de sesión único de NextAuth",
        recommended: true
    },
]


export const ProModal = () => {
    const proModal = useProModal();
    return (
        <div>
            <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
                <DialogContent className="max-w-[1080px] w-full">
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
                        <DialogDescription className="gap-4 text-zinc-900 font-medium flex flex-col md:flex-row overflow-y-auto max-h-[700px]">
                            {tools.map((tool) => (
                                <Card
                                    key={tool.label}
                                    className={`p-5 md:flex flex-col flex-1 ${tool.recommended && 'border-2 border-custom-blue'}`}>
                                    <div className="h-[120px]">
                                        <div className="gap-x-4 font-semibold text-xl mb-2 flex">
                                            {tool.recommended ?
                                                <>
                                                    {tool.label}
                                                    <Badge variant="outline" className="uppercase text-sm py-1">
                                                        Popular
                                                    </Badge>
                                                </>
                                                : tool.label}
                                        </div>
                                        <div className="font-normal text-sm mb-auto">
                                            {tool.description}
                                        </div>
                                    </div>
                                    <div className="flex font-bold text-xl">
                                        {tool.price}
                                    </div>
                                    <div className="flex flex-col gap-y-2 mt-8 flex-1 mb-2">
                                        <p>Todas las características del plan gratis más:</p>
                                        {Object.entries(tool.features).map(([feature, value]) => (
                                            <div key={feature} className="flex items-center gap-x-2">
                                                <Check className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                                <span className="text-black-5">{feature}:</span>
                                                <span className="text-black-5 font-bold">{value}</span>
                                            </div>
                                        ))}
                                        {tool.extraFeatures && (
                                            <div className="flex items-center gap-x-2">
                                                <Check className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                                <span className="text-black-5 font-bold">{tool.extraFeatures}</span>
                                            </div>
                                        )}
                                    </div>
                                    <SubscriptionButton />
                                </Card>
                            ))}
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}