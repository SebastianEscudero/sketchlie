"use client";

import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogCancel,
    AlertDialogAction,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog"
import { Input } from "./ui/input";
import React from "react";

interface OnDropConfirmModalProps {
    disabled?: boolean;
    header: string;
    onConfirm: () => void;
    open: boolean;
    setOpen: (open: boolean) => void;
    placeHolderText?: string;
    description?: string;
    setTitle: (title: string) => void;
}

export const OnDropConfirmModal = ({ disabled, header, onConfirm, description, open, setOpen, placeHolderText, setTitle }: OnDropConfirmModalProps) => {

    const handleConfirm = (event: React.MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
        onConfirm();
        setOpen(false);
    }

    const handleCancel = (event: React.MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
        setOpen(false);
    }

    const handleInput = (event: React.MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
    }

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent className="max-w-[80%] sm:max-w-[60%] lg:max-w-[40%] xl:max-w-[30%] rounded-xl" onClick={handleInput}>
                <AlertDialogHeader>
                    <AlertDialogTitle>{header}</AlertDialogTitle>
                    <AlertDialogDescription>{description}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <Input type="text" placeholder={placeHolderText} onChange={(e) => setTitle(e.target.value || "New Board")} onClick={handleInput} className="py-1 text-base" maxLength={60}/>
                    <AlertDialogCancel onClick={handleCancel}>Cancel</AlertDialogCancel>
                    <AlertDialogAction 
                        className="bg-custom-blue dark:text-white dark:hover:bg-custom-blue-dark sm:mt-0 mt-2" 
                        disabled={disabled} 
                        onClick={handleConfirm}
                    >
                        Confirm
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}