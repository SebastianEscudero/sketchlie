import Image from "next/image"
import { templates } from "../templates/templates"
import { cn } from "@/lib/utils";
import { Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState, useEffect, ChangeEvent } from "react";
import { useDebounce } from "usehooks-ts";

interface ShowAllTemplatesProps {
    onClick: (templateName: string, templateLayerIds: any, templateLayers: any) => void;
    pending?: boolean;
    usersRole?: string;
    children: React.ReactNode;
}

const searchTerms: { [key: string]: string[] } = {
    "mapa conceptual": ["concept map", "conceptual map"],
    "diagrama de flujo": ["flow chart", "flowchart"],
    "modelo canvas": ["canvas model", "business model canvas"],
    "customer journey map": ["mapa de experiencia del cliente"],
    "lluvia de ideas": ["brainstorming"],
    "diagrama de venn": ["venn diagram"],
    "low fidelity wireframe": ["wireframe de baja fidelidad"],
    "mapa de proceso": ["process map"],
    "diagrama": ["diagram"],
    "linea de tiempo": ["timeline"],
    "mapa mental": ["mind map"],
    "diagrama ishikawa": ["fishbone diagram", "cause and effect diagram"],
};

export const ShowAllTemplates = ({
    onClick,
    pending = false,
    usersRole = "Admin",
    children
}: ShowAllTemplatesProps) => {
    const [searchValue, setSearchValue] = useState("");
    const debouncedSearchValue = useDebounce(searchValue, 300);
    const [filteredTemplates, setFilteredTemplates] = useState(templates);

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    useEffect(() => {
        const searchLower = debouncedSearchValue.toLowerCase();
        const filtered = templates.filter(template => {
            const nameLower = template.name.toLowerCase();
            if (nameLower.includes(searchLower)) return true;
            
            for (const [key, values] of Object.entries(searchTerms)) {
                if (key.includes(searchLower) || values.some(v => v.includes(searchLower))) {
                    if (nameLower.includes(key) || values.some(v => nameLower.includes(v))) {
                        return true;
                    }
                }
            }
            return false;
        });
        setFilteredTemplates(filtered);
    }, [debouncedSearchValue]);

    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="w-full max-w-4xl max-h-[90vh] dark:bg-zinc-900 dark:text-white">
                <div className="p-3 border-b dark:border-zinc-700">
                    <DialogTitle className="text-2xl font-bold mb-2">Choose a template</DialogTitle>
                    <p className="text-zinc-400">Start with a template to accelerate your workflow</p>
                </div>
                    <div className="relative mb-6">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400" />
                        <Input
                            className="w-full pl-10 py-2 dark:bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500 focus:ring-2 focus:ring-blue-500"
                            placeholder="Search templates..."
                            onChange={handleSearchChange}
                            value={searchValue}
                        />
                    </div>
                    <ScrollArea className="h-[65vh]" onWheel={(e) => e.stopPropagation()}>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {filteredTemplates.map((template, index) => (
                                <DialogClose
                                key={index}
                                disabled={usersRole !== 'Admin'}
                                onClick={() => onClick(template.name, template.layerIds, template.layers)}
                                className={cn(
                                    "flex flex-col hover:cursor-pointer items-center justify-center",
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
                                <h2 className="text-left font-semibold pt-2 text-xs sm:text-sm w-[150px] sm:w-[200px] text-gray-700 dark:text-zinc-200 hover:text-custom-blue flex-wrap">
                                    + {template.name}
                                </h2>
                            </DialogClose>
                            ))}
                        </div>
                    </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}