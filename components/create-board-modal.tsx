"use client";

import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogTrigger,
    AlertDialogDescription,
    AlertDialogCancel,
    AlertDialogAction,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog"
import { Input } from "./ui/input";

interface ConfirmModalProps {
    children: React.ReactNode;
    disabled?: boolean;
    header: string;
    onConfirm: () => void;
    placeHolderText?: string;
    description?: string;
    setTitle: (title: string) => void;
}

export const ConfirmBoardModal = ({ children, disabled, header, onConfirm, placeHolderText, description, setTitle }: ConfirmModalProps) => {

    const handleConfirm = () => {
        onConfirm();
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent className="max-w-[80%] sm:max-w-[60%] lg:max-w-[40%] xl:max-w-[30%] rounded-xl">
                <AlertDialogHeader>
                    <AlertDialogTitle>{header}</AlertDialogTitle>
                    <AlertDialogDescription>{description}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <Input type="text" placeholder={placeHolderText} onChange={(e) => setTitle(e.target.value || "New Board")}  className="py-1 text-base" maxLength={60}/>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction className="bg-blue-600 hover:bg-custom-blue sm:mt-0 mt-2 text-white" disabled={disabled} onClick={handleConfirm}>Confirm</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}