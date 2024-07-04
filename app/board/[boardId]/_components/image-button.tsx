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
    setSelectedImage: (info: any) => void;
    icon: LucideIcon;
    onClick: () => void;
    isActive?: boolean;
    isDisabled?: boolean;
    setIsUploading: Dispatch<SetStateAction<boolean>>;
    label: string;
    org: any;
};

export const ImageButton = ({
    setIsUploading,
    icon: Icon,
    onClick,
    isActive,
    isDisabled,
    setSelectedImage,
    org,
    label
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
    
            const img = new Image();
            const imgLoad = new Promise<{ url: string, dimensions: { width: number, height: number } }>((resolve) => {
                img.onload = () => {
                    const dimensions = { width: img.width, height: img.height };
                    resolve({ url, dimensions });
                };
            });
            img.src = url;
            const info = await imgLoad;
            setSelectedImage(info);
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

    return (
        <Hint side="top" label={label} sideOffset={14}>
            <Button disabled={isDisabled} onClick={handleButtonClick} size="icon" variant={isActive ? "iconActive" : "icon"} className="h-10 w-10">
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