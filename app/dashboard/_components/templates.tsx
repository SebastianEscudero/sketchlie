import Image from "next/image";
import { useProModal } from "@/hooks/use-pro-modal";
import { useRouter } from "next/navigation";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { useCurrentUser } from "@/hooks/use-current-user";
import { toast } from "sonner";
import { getMaxBoards } from "@/lib/planLimits";
import { ChevronsDown } from "lucide-react";
import { templates } from "../templates/templates";
import { ShowAllTemplates } from "./show-all-templates";
import { cn } from "@/lib/utils";
import { updateR2Bucket } from "@/lib/r2-bucket-functions";
import { Layers, LayerType } from "@/types/canvas";
import { useOrganization } from "@/app/contexts/organization-context";

export const Templates = () => {
    const user = useCurrentUser();
    const { currentOrganization, isLoading, userRole } = useOrganization();
    const router = useRouter();
    const proModal = useProModal();
    const { mutate, pending } = useApiMutation(api.board.create);
    
    const data = useQuery(api.boards.get, {
        orgId: currentOrganization?.id ?? "",
    });

    if (!user || !currentOrganization || isLoading) {
        return <TemplatesSkeleton />;
    }

    const maxAmountOfBoards = getMaxBoards(currentOrganization);

    const onClick = async (templateName: string, templateLayerIds: any, templateLayers: Layers) => {
        if (maxAmountOfBoards !== null && (data?.length ?? 0) < maxAmountOfBoards) {
            try {
                const id = await mutate({
                    orgId: currentOrganization.id,
                    title: templateName,
                    userId: user.id,
                    userName: user.name,
                });

                const screenWidth = window.innerWidth;
                const screenHeight = window.innerHeight;

                const screenCenterX = screenWidth / 2;
                const screenCenterY = screenHeight / 2;

                let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
                Object.values(templateLayers).forEach(layer => {
                    minX = Math.min(minX, layer.x);
                    minY = Math.min(minY, layer.y);
                    maxX = Math.max(maxX, layer.x + layer.width);
                    maxY = Math.max(maxY, layer.y + layer.height);
                });

                const layersCenterX = (minX + maxX) / 2;
                const layersCenterY = (minY + maxY) / 2;

                const offsetX = screenCenterX - layersCenterX;
                const offsetY = screenCenterY - layersCenterY;

                const centeredLayers = Object.fromEntries(
                    Object.entries(templateLayers).map(([id, layer]) => [
                        id,
                        {
                            ...layer,
                            x: layer.x + offsetX,
                            y: layer.y + offsetY,
                            ...((layer.type === LayerType.Arrow || layer.type === LayerType.Line) && layer.center && {
                                center: {
                                    x: layer.center.x + offsetX,
                                    y: layer.center.y + offsetY,
                                },
                            }),
                        },
                    ])
                );

                await updateR2Bucket('/api/r2-bucket/createBoard', id, templateLayerIds, centeredLayers);
                toast.success("Board created");
                await router.push(`/board/${id}`);
            } catch (error) {
                toast.error("Failed to create board");
            }
        } else {
            proModal.onOpen();
        }
    }

    return (
        <div className="px-4 lg:px-6 mt-4">
            <div className="flex flex-row justify-between items-center">
                <p className="text-xl font-semibold">Templates</p>
                <p className="dark:text-zinc-300 text-gray-600 mt-2 sm:flex hidden">Only Admins of the organization can choose a template</p>
            </div>
            <div className="flex mt-4 border dark:border-zinc-500 dark:bg-[#2C2C2C] bg-white rounded-md p-4 h-[170px] overflow-hidden">
                <div className="flex flex-wrap gap-x-5 gap-y-20">
                    {templates.map((template, index) => (
                        <div key={index} className="rounded-lg flex flex-col justify-between flex-1">
                            <button
                                onClick={() => onClick(template.name, template.layerIds, template.layers as Layers)}
                                disabled={pending || userRole !== 'Admin'}
                                className={cn(
                                    "text-left flex flex-col hover:cursor-pointer flex-1 min-w-[110px] min-h-[85.5px] max-w-[130px] max-h-[101.1px]",
                                    (pending) && "opacity-50 cursor-not-allowed"
                                )}
                            >
                                <Image
                                    className="border rounded-md object-contain w-[130px] h-[101px] hover:border-blue-500"
                                    src={`${template.image}`}
                                    alt={template.name}
                                    width={500}
                                    height={500}
                                />
                                <h2 className="font-semibold pt-2 text-[12px] dark:text-white dark:hover:text-blue-500 text-gray-700 hover:text-custom-blue">
                                    + {template.name}
                                </h2>
                            </button>
                        </div>
                    ))}
                </div>
                <ShowAllTemplates
                    pending={pending}
                    onClick={onClick}
                >
                    <div className="rounded-lg flex flex-col justify-between ml-2 flex-1 h-full">
                        <ChevronsDown className="h-6 w-6 text-blue-600 dark:text-blue-300 hover:cursor-pointer hover:text-blue-500" />
                    </div>
                </ShowAllTemplates>
            </div>
        </div>
    )
}

export const TemplatesSkeleton = () => {
    return (
      <div className="px-4 lg:px-6 mt-4">
        <div className="flex flex-row justify-between items-center">
          <div className="h-7 w-28 bg-zinc-200 dark:bg-zinc-700 rounded-md animate-pulse" />
          <div className="h-5 w-96 bg-zinc-200 dark:bg-zinc-700 rounded-md animate-pulse sm:flex hidden" />
        </div>
        <div className="flex mt-4 border dark:border-zinc-500 dark:bg-[#2C2C2C] bg-white rounded-md p-4 h-[170px] overflow-hidden">
          <div className="flex flex-wrap gap-x-5 gap-y-20">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((index) => (
              <div key={index} className="rounded-lg flex flex-col justify-between flex-1">
                <div className="flex flex-col flex-1 min-w-[110px] min-h-[85.5px] max-w-[130px] max-h-[101.1px]">
                  <div className="border rounded-md w-[130px] h-[101px] bg-zinc-200 dark:bg-zinc-700 animate-pulse" />
                  <div className="h-4 w-24 mt-2 bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse mx-auto" />
                </div>
              </div>
            ))}
          </div>
          <div className="rounded-lg flex flex-col justify-between ml-2 flex-1 h-full">
            <div className="h-6 w-6 bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse" />
          </div>
        </div>
      </div>
    );
  };