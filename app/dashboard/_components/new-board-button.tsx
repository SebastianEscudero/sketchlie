"use client";

import { toast } from "sonner"
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { useRouter } from "next/navigation";
import { ConfirmBoardModal } from "@/components/create-board-modal";
import React, { useState } from 'react';
import { useQuery } from "convex/react";
import { useProModal } from "@/hooks/use-pro-modal";
import { useCurrentUser } from "@/hooks/use-current-user";
import { getMaxBoards } from "@/lib/planLimits";



interface NewBoardButtonProps {
    org: any
    disabled?: boolean;
}

export const NewBoardButton = ({
    org,
    disabled,
}: NewBoardButtonProps) => {

    const maxAmountOfBoards = getMaxBoards(org);

    const user = useCurrentUser();
    const data = useQuery(api.boards.get, { 
        orgId: org.id,
      });


    const proModal = useProModal();
    const router = useRouter();
    const [title, setTitle] = useState('New Board');
    const { mutate, pending} = useApiMutation(api.board.create);

    if (!user) {
        return null;
    }

    const onClick = () => {
        mutate({
            orgId: org.id,
            title,
            userId: user.id,
            userName: user.name,
        })
            .then((id) => {
                toast.success("Board created");
                router.push(`/board/${id}`);
            })
            .catch(() => {
                toast.error("Failed to create board");
            });
    }

    const onConfirm = () => {
        if (maxAmountOfBoards !== null && (data?.length ?? 0) < maxAmountOfBoards) {
            onClick();
        } else {
            proModal.onOpen(org.id);
        }
    }
    return (
        <ConfirmBoardModal
            header="Name your board!"
            description="You can also edit the board name in the canvas"
            disabled={pending}
            onConfirm={onConfirm}
            setTitle={setTitle}
        >
            <button
                disabled={pending || disabled}
                className={cn(
                    "col-span-1 aspect-[100/127] bg-blue-600 rounded-lg hover:bg-blue-800 flex flex-col items-center justify-center py-6",
                    (pending || disabled) && "opacity-75 hover:bg-blue-600 cursor-not-allowed" 
                )}
            >
                <div />
                <Plus className="w-12 h-12 text-white stroke-1" />
                <p className="text-sm text-white font-light">
                    New Board
                </p>
            </button>
        </ConfirmBoardModal>
    )
}