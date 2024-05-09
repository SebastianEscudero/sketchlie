"use client"

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import Image from "next/image";
import Link from "next/link";
import { Hint } from "@/components/hint";
import { useRenameModal } from "@/store/use-rename-modal";
import { Menu, Zap } from "lucide-react";
import { Actions } from "@/components/actions";
import { useProModal } from "@/hooks/use-pro-modal";

interface InfoProps {
    boardId: string;
}

const TabSeparator = () => {
    return(
        <div className="text-neutral-300 sm:px-1.5">
            |
        </div>
    )
}


export const Info = ({
    boardId,
}: InfoProps) => {

    const { onOpen } = useRenameModal();
    const proModal = useProModal();
    const data = useQuery(api.board.get, {
        id: boardId as Id<"boards">
    });

    if (!data) return <InfoSkeleton />;

    return(
        <div className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md">
            <Hint label="Go to Dashboard" side="bottom" sideOffset={10}>
                <Button asChild variant="board" className="px-2">
                    <Link href="/dashboard/">
                        <Image 
                        src="/logo.svg"
                        alt="Board logo"
                        height={40}
                        width={40}
                        />
                        <span className="font-semibold text-xl ml-2 text-black sm:flex hidden">
                            Sketchlie
                        </span>
                    </Link>
                </Button>
            </Hint>
            <TabSeparator />
                <Hint label="Edit title" side="bottom" sideOffset={10}>
                    <Button variant="board" className="text-base px-2 sm:w-auto w-[80px] overflow-hidden relative" onClick={() => onOpen(data._id, data.title)}>
                        <div className="w-full text-left truncate">
                            {data.title}
                        </div>
                    </Button>
                </Hint>
            <TabSeparator />
            <Actions id={data._id} title={data.title} side="bottom" sideOffset={10}>
                <div>
                    <Hint label="Main menu" side="bottom" sideOffset={10}>
                        <Button size="icon" variant="board">
                            <Menu />
                        </Button>
                    </Hint>
                </div>
            </Actions>
            <TabSeparator />
            <Hint label="Upgrade" side="bottom" sideOffset={10}>
                <Button variant="board"
                    onClick={proModal.onOpen}
                >
                    <Zap className="h-5 w-5 fill-custom-blue text-custom-blue"/>
                </Button>
            </Hint>
        </div>
    )
}

export const InfoSkeleton = () => {
    return(
        <div className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md w-[300px]"/>
    );
};