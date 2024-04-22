"use client";

import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import { toast } from "sonner"
import { useUploadThing } from "@/lib/uploadthingutil";
import { useRef, Dispatch, SetStateAction } from "react";
import { getMaxImageSize } from "@/lib/planLimits";


interface ImageButtonProps {
    isUploading: boolean;
    onImageSelect: (src: string) => void;
    label: string;
    icon: LucideIcon;
    onClick: () => void;
    isActive?: boolean;
    isDisabled?: boolean;
    setIsUploading: Dispatch<SetStateAction<boolean>>;
    org: any;
};

export const ImageButton = ({
    setIsUploading,
    label,
    icon: Icon,
    onClick,
    isActive,
    isDisabled,
    onImageSelect,
    org
}: ImageButtonProps) => {
    const inputFileRef = useRef<HTMLInputElement>(null);
    const maxFileSize = org && getMaxImageSize(org) || 0;
    const subscriptionPlan = org && org.subscriptionPlan || null;
    const handleButtonClick = () => {
        inputFileRef.current?.click();
        console.log(maxFileSize)
        onClick();
    };

    const { startUpload } = useUploadThing(`${subscriptionPlan}`, {
        onClientUploadComplete: () => {
          toast.success("Image Processed, you can now add it to the board!");
        },
    });

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsUploading(true);
        if (!e.target.files?.[0]) {
            setIsUploading(false);
            toast.error("No file selected, please try again.");
            return;
        }
    
        // Check file size
        const fileSizeInMB = e.target.files[0].size / 1024 / 1024;
        if (fileSizeInMB > maxFileSize) {
            setIsUploading(false);
            toast.error(`File size has to be lower than ${maxFileSize}MB. Please try again.`);
            return;
        }
    
        const toastId = toast.loading("Image is being processed, please wait...");
        
        // Then start the upload of the compressed file
        await startUpload([e.target.files?.[0]])
        .then((res: any) => {
            onImageSelect(res?.[0].url);
        })
        .finally(() => {
            toast.dismiss(toastId);
            setIsUploading(false);
        })
    };

    return (
        <Hint label={label} side="right" sideOffset={14}>
                <Button disabled={isDisabled} onClick={handleButtonClick} size="icon" variant={isActive ? "boardActive" : "board"}>
                    <Icon />
                    <input 
                        type="file" 
                        onChange={handleUpload}
                        ref={inputFileRef}
                        accept="image/*" 
                        style={{display: 'none'}} 
                    />
                </Button>
        </Hint>
    )
}