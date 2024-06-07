"use client"

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Hint } from "@/components/hint";
import { useRenameModal } from "@/store/use-rename-modal";
import { Menu, Zap } from "lucide-react";
import { Actions } from "@/components/actions";
import { useProModal } from "@/hooks/use-pro-modal";
import { useCurrentUser } from "@/hooks/use-current-user";

interface InfoProps {
    board: any;
    org: any;
}

const TabSeparator = () => {
    return(
        <div className="text-neutral-300 px-1.5">
            |
        </div>
    )
}


export const Info = ({
    board,
    org
}: InfoProps) => {

    const { onOpen } = useRenameModal();
    const proModal = useProModal();
    const orgId = board.orgId;
    const user = useCurrentUser();
    const usersRole = org.users.find((u: any) => u.id === user?.id)?.role;

    if (!board) return <InfoSkeleton />;

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
            <div className="text-neutral-300 px-1.5 xs:flex hidden">
                |
            </div>
                <Hint label="Edit title" side="bottom" sideOffset={10}>
                    <Button disabled={usersRole !== 'Admin'} variant="board" className="text-base px-2 sm:max-w-[200px] md:max-w-[400px] max-w-[80px] overflow-hidden relative xs:flex hidden" onClick={() => onOpen(board._id, board.title)}>
                        <div className="w-full text-left truncate">
                            {board.title}
                        </div>
                    </Button>
                </Hint>
            <TabSeparator />
            <Actions id={board._id} title={board.title} side="bottom" sideOffset={10} org={org} showExport={true}>
                <div className="w-10 flex justify-center items-center">
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
                    size="icon"
                    onClick={() => proModal.onOpen(orgId)}
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