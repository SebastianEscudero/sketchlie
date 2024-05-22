import Image from "next/image"
import { templates } from "../templates/templates"
import { cn } from "@/lib/utils";

interface ShowAllTemplatesProps {
    onClick: (templateName: string, templateLayerIds: any, templateLayers: any) => void;
    pending: boolean;
}

export const ShowAllTemplates = ({
    onClick,
    pending = false,
}: ShowAllTemplatesProps) => {
    return (
        <div className="p-2 flex flex-col justify-center items-center">
            <div className="flex flex-col justify-start">
                <h1 className="text-2xl font-bold text-center">Elige una plantilla</h1>
                <p className="text-center text-gray-600">Empieza con una plantilla para acelerar tu flujo de trabajo</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
                {templates.map((template, index) => (
                    <div key={index} className="rounded-lg flex flex-col">
                        <button
                            onClick={() => onClick(template.name, template.layerIds, template.layers)}
                            className={cn(
                                "flex flex-col hover:cursor-pointer",
                                (pending) && "opacity-50 cursor-not-allowed"
                            )}
                        >
                            <Image
                                className="border rounded-md hover:border-custom-blue"
                                src={`${template.image}`}
                                alt={template.name}
                                width={200}
                                height={155.5}
                                loading="lazy"
                            />
                            <h2 className="text-left font-semibold pt-2 text-xs sm:text-[13px] w-[140px] text-gray-700 hover:text-custom-blue flex-wrap">
                                + {template.name}
                            </h2>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}