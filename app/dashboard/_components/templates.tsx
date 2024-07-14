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
import { updateR2Bucket } from "@/lib/r2-bucket-functions";

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

    const onClick = async (templateName: string, templateLayerIds: any, templateLayers: any) => {
        if (maxAmountOfBoards !== null && (data?.length ?? 0) < maxAmountOfBoards) {
            try {
                const id = await mutate({
                    orgId: org.id,
                    title: templateName,
                    userId: user.id,
                    userName: user.name,
                });
                await updateR2Bucket('/api/r2-bucket/createBoard', id, templateLayerIds, templateLayers);
                toast.success("Board created");
                await router.push(`/board/${id}`);
            } catch (error) {
                toast.error("Failed to create board");
            }
        } else {
            proModal.onOpen(orgId);
        }
    }

    return (
        <div className="p-6 ">
            <p className="dark:text-zinc-300 text-gray-600 mt-2">Only <span className="font-bold dark:text-white">Admins</span> of the organization can choose a template</p>
            <div className="flex mt-4 border dark:border-zinc-500 dark:bg-[#2C2C2C] bg-white rounded-md p-4 h-[170px] overflow-hidden shadow-custom-1">
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
                <Dialog>
                    <div className="rounded-lg flex flex-col justify-between ml-2 flex-1">
                        <DialogTrigger className="flex justify-center">
                            <ChevronsDown className="h-6 w-6 text-white" />
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