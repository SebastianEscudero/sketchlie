"use client";

import { Plus } from "lucide-react";
import { CreateOrganization, useOrganization } from "@clerk/nextjs";

import {
    Dialog,
    DialogContent,
    DialogTrigger
} from "@/components/ui/dialog";
import { Hint } from "@/components/hint";
import { useProModal } from "@/hooks/use-pro-modal";

export const NewButton = () => {
    const { organization } = useOrganization();

    const proModal = useProModal();

    const onClick = (event: any) => {
        if (organization) {
            event.stopPropagation();
            proModal.onOpen();
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="aspect-square">
                    <Hint label="Create Organization" side="right" align="start" sideOffset={18}>
                        <button onClick={onClick} className="bg-white/25 h-full w-full rounded-md flex items-center justify-center opacity-60 hover:opacity-100 transition">
                            <Plus className="text-white"/>
                        </button>
                    </Hint>
                </div>
            </DialogTrigger>
            <DialogContent className="p-0 bg-transparent border-none max-w-[480px]">
                <CreateOrganization />
            </DialogContent>
        </Dialog>
    );
};