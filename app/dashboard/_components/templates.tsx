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
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { templates } from "../templates/templates";
import { ShowAllTemplates } from "./show-all-templates";
import { cn } from "@/lib/utils";

interface TemplateProps {
    org: any
}

export const Templates = ({
    org,
}: TemplateProps) => {

    const user = useCurrentUser();
    const orgId = org.id;
    const data = useQuery(api.boards.get, {
        orgId: orgId,
    });

    const usersRole = org.users.find((u: any) => u.id === user?.id)?.role;
    const maxAmountOfBoards = getMaxBoards(org);
    const router = useRouter();
    const proModal = useProModal();
    const { mutate, pending } = useApiMutation(api.board.create);

    if (!user) {
        return null;
    }

    const onClick = (templateName: string, templateLayerIds: any, templateLayers: any) => {
        if (maxAmountOfBoards !== null && (data?.length ?? 0) < maxAmountOfBoards) {
            mutate({
                orgId: orgId,
                title: templateName,
                userId: user.id,
                userName: user.name,
                layerIds: templateLayerIds,
                layers: templateLayers,
            })
                .then((id) => {
                    toast.success("Board created");
                    router.push(`/board/${id}`);
                })
                .catch(() => {
                    toast.error("Failed to create board");
                });
        } else {
            proModal.onOpen(orgId);
        }
    }

    return (
        <div className="p-6">
            <h2 className="text-3xl font-semibold">Choose a Template</h2>
            {usersRole !== 'Admin' && (
                <p className="text-gray-600">Only <span className="font-bold">Admins</span> can choose a template</p>
            )}
            <div className="flex mt-8 border rounded-md p-4 h-[170px] overflow-hidden">
                <div className="flex flex-wrap gap-x-5 gap-y-20">
                    {templates.map((template, index) => (
                        <div key={index} className="rounded-lg flex flex-col justify-between flex-1">
                            <button
                                onClick={() => onClick(template.name, template.layerIds, template.layers)}
                                disabled={pending || usersRole !== 'Admin'}
                                className={cn(
                                    "text-left flex flex-col hover:cursor-pointer flex-1 min-w-[110px] min-h-[85.5px] max-w-[130px] max-h-[101.1px]",
                                    (pending) && "opacity-50 cursor-not-allowed"
                                )}
                            >
                                <Image
                                    className="border rounded-md object-contain w-[130px] h-[101px] hover:border-custom-blue"
                                    src={`${template.image}`}
                                    alt={template.name}
                                    width={500}
                                    height={500}
                                />
                                <h2 className="font-semibold pt-2 text-[12px] text-gray-700 hover:text-custom-blue">
                                    + {template.name}
                                </h2>
                            </button>
                        </div>
                    ))}
                </div>
                <Dialog>
                    <div className="rounded-lg flex flex-col justify-between ml-2 flex-1">
                        <DialogTrigger className="flex justify-center">
                            <ChevronsDown className="h-6 w-6 text-custom-blue" />
                        </DialogTrigger>
                    </div>
                    <DialogContent className="w-full max-w-[80%] max-h-[85%] xl:max-w-[50%] overflow-y-auto">
                        <ShowAllTemplates
                            usersRole={usersRole}
                            pending={pending}
                            onClick={onClick}
                        />
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}

export default Templates;