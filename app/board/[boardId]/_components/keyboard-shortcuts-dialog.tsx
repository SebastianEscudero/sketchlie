import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Hint } from "@/components/hint";
import { CircleHelp } from "lucide-react";
import React from "react";
import { CanvasMode } from "@/types/canvas";

interface KeyboardShortcutsDialogProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    setCanvasState?: (state: any) => void;
}

export const KeyboardShortcutsDialog = ({
    isOpen,
    setIsOpen,
    setCanvasState
}: KeyboardShortcutsDialogProps) => {
    const shortcuts = [
        {
            section: "Editing",
            commands: [
                { key: "Backspace", description: "Delete" },
                { key: "Ctrl + Z", description: "Undo" },
                { key: "Ctrl + Shift + Z", description: "Redo" },
                { key: "Ctrl + C", description: "Copy layers" },
                { key: "Ctrl + V", description: "Paste layers" },
                { key: "Ctrl + A", description: "Select all" },
                { key: "Scroll Up", description: "Zoom In" },
                { key: "Scroll Down", description: "Zoom Out" },
                { key: "Right Click", description: "Move" },
            ],
        },
        {
            section: "Tools",
            commands: [
                { key: "D", description: "Draw" },
                { key: "E", description: "Eraser" },
                { key: "H", description: "Move" },
                { key: "R", description: "Rectangle" },
                { key: "C", description: "Circle" },
                { key: "N", description: "Note" },
                { key: "A", description: "Arrow" },
                { key: "T", description: "Text" },
                { key: "V", description: "Select" },
                { key: "L", description: "Line" },
                { key: "K", description: "Laser" },
            ],
        },
    ];

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="w-full max-w-[80%] md:max-w-[55%] max-h-[85%] xl:max-w-[30%] overflow-y-auto">
                <DialogTitle>Keyboard shortcuts</DialogTitle>
                <div className="flex flex-col md:flex-row justify-between md:space-x-10">
                    {shortcuts.map((section, index) => (
                        <div key={index} className="mb-4 w-full">
                            <h3 className="text-base text-zinc-400">{section.section}</h3>
                                {section.commands.map((command, commandIndex) => (
                                    <div key={commandIndex} className="mt-2 text-sm flex flex-row justify-between">
                                        <span className="font-semibold rounded">{command.description}</span>{command.key}
                                    </div>
                                ))}
                        </div>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    );
};