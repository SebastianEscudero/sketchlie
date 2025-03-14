"use client";

import { toast } from "sonner"
import { cn } from "@/lib/utils";
import { LoaderCircle, Plus } from "lucide-react";
import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { useRouter } from "next/navigation";
import { ConfirmBoardModal } from "@/components/create-board-modal";
import React, { useState } from 'react';
import { useQuery } from "convex/react";
import { useProModal } from "@/hooks/use-pro-modal";
import { getMaxBoards } from "@/lib/planLimits";
import { updateR2Bucket } from "@/lib/r2-bucket-functions";
import { useOrganization } from "@/app/contexts/organization-context";
import { useCurrentUser } from "@/hooks/use-current-user";

interface NewBoardButtonProps {
    disabled?: boolean;
    query?: {
        search?: string;
        favorites?: string;
        folderId?: string;
    }
}

export const NewBoardButton = ({
    disabled,
    query,
}: NewBoardButtonProps) => {
    const { currentOrganization, userRole } = useOrganization();
    const user = useCurrentUser();
    const maxAmountOfBoards = getMaxBoards(currentOrganization);
    const data = useQuery(api.boards.get, {
        orgId: currentOrganization?.id!,
    });

    const proModal = useProModal();
    const router = useRouter();
    const [title, setTitle] = useState('New Board');
    const { mutate, pending } = useApiMutation(api.board.create);

    if (!user || !currentOrganization) {
        return null;
    }

    const onClick = async () => {
        try {
            const id = await mutate({
                orgId: currentOrganization.id,
                title,
                userId: user.id,
                userName: user.name,
                folderId: query?.folderId,
            });
            await updateR2Bucket('/api/r2-bucket/createBoard', id, [], {});
            toast.success("Board created");
            await router.push(`/board/${id}`);
        } catch (error) {
            toast.error("Failed to create board");
        }
    }

    const onConfirm = () => {
        if (maxAmountOfBoards !== null && (data?.length ?? 0) < maxAmountOfBoards) {
            onClick();
        } else {
            proModal.onOpen();
        }
    }

    return (
        <ConfirmBoardModal
            header="Name your board!"
            description="You can also edit the board name in the canvas"
            placeHolderText="Part 1: Planning"
            disabled={pending}
            onConfirm={onConfirm}
            setTitle={setTitle}
        >
            <button
                disabled={pending || disabled || userRole !== 'Admin'}
                className={cn(
                    "col-span-1 aspect-[100/100] bg-blue-600 rounded-lg hover:bg-blue-800 flex flex-col items-center justify-center",
                    (pending || disabled || userRole !== 'Admin') && "opacity-75 hover:bg-blue-600 cursor-not-allowed"
                )}
            >
                {pending ? <LoaderCircle className="animate-spin w-12 h-12 text-white stroke-1" /> :
                    <>
                        <Plus className="w-12 h-12 text-white stroke-1" />
                        <p className="text-sm text-white font-light">
                            New Board
                        </p>
                    </>
                }
                {userRole !== 'Admin' &&
                    <p className="text-xs text-white font-light mx-[20%] pt-2">
                        Only <span className="font-bold">Admins</span> can create boards
                    </p>}
            </button>
        </ConfirmBoardModal>
    )
}