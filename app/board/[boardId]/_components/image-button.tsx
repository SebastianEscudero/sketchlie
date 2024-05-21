"use client";

import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import { toast } from "sonner"
import { useRef, Dispatch, SetStateAction } from "react";
import { getMaxImageSize } from "@/lib/planLimits";
import { useCurrentUser } from "@/hooks/use-current-user";

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
    
    const user = useCurrentUser();
    const inputFileRef = useRef<HTMLInputElement>(null);
    const maxFileSize = org && getMaxImageSize(org) || 0;

    if (!user) {
        return null;
    }

    const handleButtonClick = () => {
        inputFileRef.current?.click();
        onClick();
    };

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
        const formData = new FormData();
        formData.append('file', e.target.files?.[0]);
        formData.append('userId', user.id);

        fetch('/api/aws-s3-images', {
            method: 'POST',
            body: formData
        })
        .then(async (res: Response) => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            const url = await res.text();
            onImageSelect(url);
        })
        .catch(error => {
            console.error('Error:', error);
        })
        .finally(() => {
            e.target.value = '';
            toast.dismiss(toastId);
            setIsUploading(false);
            toast.success("Image uploaded successfully, you can now add it to the board.")
        });
    };

    let side: "right" | "top" | "bottom" | "left" | undefined = "right";
    if (window.innerHeight < 545) {
        side = "top";
    }

    return (
        <Hint label={label} side={side} sideOffset={14}>
            <Button disabled={isDisabled} onClick={handleButtonClick} size="icon" variant={isActive ? "boardActive" : "board"}>
                <Icon />
                <input
                    type="file"
                    onChange={handleUpload}
                    ref={inputFileRef}
                    accept="image/*"
                    style={{ display: 'none' }}
                />
            </Button>
        </Hint>
    )
}