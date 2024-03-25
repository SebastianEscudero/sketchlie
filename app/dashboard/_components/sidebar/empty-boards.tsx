"use client";

import { api } from "@/convex/_generated/api"

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useOrganization } from '@clerk/nextjs';
import { useApiMutation } from '@/hooks/use-api-mutation';
import { toast } from "sonner";
import { useRouter } from 'next/navigation';
import { ConfirmBoardModal } from '@/components/create-board-modal';
import { useState } from 'react';

export const EmptyBoards = () => {
    const router = useRouter();
    const [title, setTitle] = useState('New Board');

    const { organization } = useOrganization();
    const { mutate, pending } = useApiMutation(api.board.create);

    const onClick = () => {
        if (!organization) return;

        mutate({
            orgId: organization.id,
            title,
        })
            .then((id) => {
                toast.success("Board created");
                router.push(`/board/${id}`)
            })
            .catch(() => toast.error("Failed to create board"))
    }

    return (
        <ConfirmBoardModal
            header="Name your board!"
            description="You can also edit the board name in the canvas"
            disabled={pending}
            onConfirm={onClick}
            setTitle={setTitle}  // Pass setTitle to ConfirmBoardModal
        >
            <div className='h-full flex flex-col items-center justify-center'>
                <Image 
                    src="/note.svg"
                    alt="Empty"
                    width={110}
                    height={110}
                />
                <h2 className='text-2xl font-semibold mt-6'>
                    Create your first board
                </h2>
                <p className='text-muted-foreground textg-sm mt-2'>
                    Start creating your first board and get organized
                </p>
                <div className='mt-6'>
                    <Button disabled={pending} size="lg">
                        Create board
                    </Button>
                </div>
            </div>
        </ConfirmBoardModal>
    )
}