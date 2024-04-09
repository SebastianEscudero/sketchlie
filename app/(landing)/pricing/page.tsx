import { Card } from "@/components/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Zap } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

const tools = [
    {
        label: "Gratis",
        description: "Todo lo que necesitas para empezar a colaborar.",
        price: "0$CLP/m",
        features: {
            "Boards": "3",
            'Imagenes': "Hasta 1MB",
            "Capas máximas": "200",
            "Herramientas": "Basicas",
            "Teams": "1",
            "Team members": "Ilimitados",
        }
    },
    {
        label: "Starter",
        description: "Desbloquea espacios de trabajo infinitos con todas las herramientas que necesitas.",
        price: "14.990$CLP/m",
        features: {
            "Boards": "Ilimitados",
            'Imagenes': "Hasta 10MB",
            "Capas máximas": "1000",
            "Herramientas": "Todas",
            "Soporte": "Básico",
            "Export a PDF": "Sí",
            "Teams": "10",
            "Team members": "Ilimitados",
        },
    },
    {
        label: "Business",
        description: "Necesitas algo mas personalizado? Contacta con nosotros para obtener para tu empresa.",
        price: "19.990$CLP/m",
        features: {
            "Boards": "Ilimitados",
            'Imagenes': "Hasta 25MB",
            "Capas máximas": "Ilimitados",
            "Herramientas": "Todas",
            "Soporte": "Básico",
            "Export a PDF": "Sí",
            "Teams": "Ilimitados",
            "Team members": "Ilimitados",
        },
        extraFeatures: "Proteccón de datos con inicio de sesión único",
        recommended: true
    },
]

export const metadata: Metadata = {
    title: "Precios | Sketchlie",
    description: "Los planes de Sketchlie, Gratis, Starter, Business. Comienza gratis y desbloquea todas las herramientas que necesitas para colaborar en tus proyectos.",
    keywords: ["sketchlie pricing", "sketchlie precios", "sketchlie planes", "sketchlie planes precios"],
    alternates: {
        canonical: "https://www.sketchlie.com/pricing",
    }
};

const PricingPage = () => {
    return (
        <div className="flex flex-col justify-center items-center mt-14">
            <h1>
                <Badge className="uppercase text-xl py-1" variant="inProgress">
                    Pronto estará disponible
                </Badge>
                <div className="flex items-center text-xl gap-x-2 font-bold py-1 justify-center mt-2">
                    Sketchlie
                    <Badge className="uppercase text-sm py-1" variant="outline">
                        Pro
                    </Badge>
                </div>
            </h1>
            <div className="lg:gap-4 gap-x-2 gap-y-4 text-zinc-900 font-medium flex flex-col md:flex-row lg:mx-[5%] mx-[3%] mb-10 mt-14">
                {tools.map((tool) => (
                    <Card
                        key={tool.label}
                        className={`md:p-5 p-10 md:flex flex-col flex-1 border border-black ${tool.recommended && 'border-2 border-custom-blue'}`}>
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
                        <div className="flex flex-col gap-y-2 mt-8 flex-1 mb-4">
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
                        {tool.label === "Gratis" ? (
                            <Link
                                href='/auth/register'
                                className='w-full'
                            >
                                <Button variant="outline" className="w-full text-lg">
                                    Comienza gratis
                                </Button>
                            </Link>
                        ) : (
                            <Link
                                href='/dashboard'
                                className='w-full'
                            >
                                <Button variant="auth" className="w-full text-lg">
                                    Upgrade <Zap className="w-4 h-4 ml-2 fill-white" />
                                </Button>
                            </Link>
                        )}
                    </Card>
                ))}
            </div>
        </div>
    );
}

export default PricingPage;