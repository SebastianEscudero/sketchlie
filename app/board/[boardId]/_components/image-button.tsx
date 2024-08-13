"use client";

import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import { toast } from "sonner"
import { useRef, Dispatch, SetStateAction } from "react";
import { getMaxImageSize } from "@/lib/planLimits";
import { useCurrentUser } from "@/hooks/use-current-user";
import { LayerType, Point } from "@/types/canvas";
import { getCenterOfScreen } from "@/lib/utils";

interface MediaButtonProps {
    isUploading: boolean;
    insertMedia: (layerType: LayerType.Image | LayerType.Video, position: Point, info: any) => void;
    icon: LucideIcon;
    isActive?: boolean;
    isDisabled?: boolean;
    setIsUploading: Dispatch<SetStateAction<boolean>>;
    label: string;
    org: any;
    camera: any;
    svgRef: any;
    zoom: number;
};

export const ImageButton = ({
    setIsUploading,
    icon: Icon,
    isActive,
    isDisabled,
    insertMedia,
    org,
    label,
    camera,
    svgRef,
    zoom
}: MediaButtonProps) => {
    
    const user = useCurrentUser();
    const inputFileRef = useRef<HTMLInputElement>(null);
    const maxFileSize = org && getMaxImageSize(org) || 0;

    if (!user) {
        return null;
    }

    const handleButtonClick = () => {
        inputFileRef.current?.click();
    };

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsUploading(true);
        if (!e.target.files?.[0]) {
            setIsUploading(false);
            toast.error("No file selected, please try again.");
            return;
        }

        const file = e.target.files[0];
        const fileSizeInMB = file.size / 1024 / 1024;
        if (fileSizeInMB > maxFileSize) {
            setIsUploading(false);
            toast.error(`File size has to be lower than ${maxFileSize}MB. Please try again.`);
            return;
        }

        const toastId = toast.loading("Media is being processed, please wait...");
        const formData = new FormData();
        formData.append('file', file);
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
    
            if (file.type.startsWith('image/')) {
                const img = new Image();
                const imgLoad = new Promise<{ url: string, dimensions: { width: number, height: number }, type: string }>((resolve) => {
                    img.onload = () => {
                        const dimensions = { width: img.width, height: img.height };
                        resolve({ url, dimensions, type: 'image' });
                    };
                });
                img.src = url;
                const info = await imgLoad;
                const centerPoint = getCenterOfScreen(camera, zoom, svgRef);
                insertMedia(LayerType.Image, centerPoint, info);
            } else if (file.type.startsWith('video/')) {
                const video = document.createElement('video');
                const videoLoad = new Promise<{ url: string, dimensions: { width: number, height: number }, type: string }>((resolve) => {
                    video.onloadedmetadata = () => {
                        const dimensions = { width: video.videoWidth, height: video.videoHeight };
                        resolve({ url, dimensions, type: 'video' });
                    };
                });
                video.src = url;
                const info = await videoLoad;
                const centerPoint = getCenterOfScreen(camera, zoom, svgRef);
                insertMedia(LayerType.Video, centerPoint, info);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        })
        .finally(() => {
            e.target.value = '';
            toast.dismiss(toastId);
            setIsUploading(false);
            toast.success("Media uploaded successfully")
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
                    accept="image/*,video/*"
                    style={{ display: 'none' }}
                />
            </Button>
        </Hint>
    )
}