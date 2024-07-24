import { FeedbackDialog } from "@/app/board/[boardId]/_components/feedback-dialog";
import { KeyboardShortcutsDialog } from "@/app/board/[boardId]/_components/keyboard-shortcuts-dialog";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ChevronRight, CircleHelp } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface HelpDropdownMenuProps {
    setCanvasState?: (state: any) => void;
}

export const HelpDropdownMenu = ({
    setCanvasState
}: HelpDropdownMenuProps) => {
    const [isKeyboardShortcutsDialogOpen, setIsKeyboardShortcutsDialogOpen] = useState(false);
    const [isFeedbackDialogOpen, setIsFeedbackDialogOpen] = useState(false);

    return (<>
        {isKeyboardShortcutsDialogOpen ? (
            <KeyboardShortcutsDialog
                setCanvasState={setCanvasState}
                isOpen={isKeyboardShortcutsDialogOpen}
                setIsOpen={setIsKeyboardShortcutsDialogOpen}
            />
        ) : isFeedbackDialogOpen ? (
            <FeedbackDialog
                isOpen={isFeedbackDialogOpen}
                setIsOpen={setIsFeedbackDialogOpen}
            />
        ) : (
            <DropdownMenu>
                <DropdownMenuTrigger asChild className="h-[44px]">
                    <DropdownMenuItem className="p-3 cursor-pointer flex justify-between">
                        <div className="flex flex-row items-center">
                            <CircleHelp className="h-4 w-4 mr-2" />
                            Help & Feedback
                        </div>
                        <ChevronRight className="h-4 w-4" />
                    </DropdownMenuItem>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="right" sideOffset={8} className="w-[170px]">
                    <DropdownMenuItem
                        onClick={() => setIsKeyboardShortcutsDialogOpen(true)}
                        className="p-3 cursor-pointer"
                    >
                        Keyboard Shortcuts
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="cursor-pointer"
                    >
                        <Link href="https://www.sketchlie.com/blog/pizarra-online-tutorial/" target="_blank" className="w-full h-full p-1">
                            Tutorial
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => setIsFeedbackDialogOpen(true)}
                        className="p-3 cursor-pointer"
                    >
                        Send Feedback
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        )}
    </>

    );
};