"use client";

import { useState } from "react";
import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { LayerType, Point } from "@/types/canvas";
import { getCenterOfScreen } from "@/lib/utils";
import { convertToEmbedURL } from "@/lib/embedLinksUtils";

interface MediaButtonProps {
    icon: LucideIcon;
    label: string;
    camera: any;
    zoom: number;
    isActive?: boolean;
    isDisabled?: boolean;
    insertMedia: (mediaItems: {layerType: LayerType.Image | LayerType.Video | LayerType.Link, position: Point, info: any, zoom: number}[]) => void;
};

export const LinkButton = ({
    icon: Icon,
    label,
    camera,
    zoom,
    isActive,
    isDisabled,
    insertMedia
}: MediaButtonProps) => {

    const user = useCurrentUser();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [link, setLink] = useState("");

    if (!user) {
        return null;
    }

    const handleButtonClick = () => {
        setIsDialogOpen(true);
    };

    const handleConfirm = () => {
        const convertedLink = convertToEmbedURL(link);
        const centerPoint = getCenterOfScreen(camera, zoom);
        const dimensions = { width: 1200, height: 675 };
        const info = { dimensions, url: convertedLink };

        insertMedia([{layerType: LayerType.Link, position: centerPoint, info, zoom}]);
        setIsDialogOpen(false);
    };

    const handleCancel = () => {
        setIsDialogOpen(false);
    };

    return (
        <>
            <Hint side="top" label={label} sideOffset={14}>
                <Button disabled={isDisabled} onClick={handleButtonClick} size="icon" variant={isActive ? "iconActive" : "icon"} className="h-10 w-10 sm:flex hidden">
                    <Icon size={20}/>
                </Button>
            </Hint>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-[90%] md:max-w-[50%] lg:max-w-[40%] 2xl:max-w-[30%] w-full max-h-[90%] pt-10">
                    <DialogHeader>
                        <DialogTitle>Insert Link</DialogTitle>
                        <DialogDescription>Enter a link to embed</DialogDescription>
                    </DialogHeader>
                    <div className="space-x-4 flex flex-row items-center justify-center">
                        <Input
                            id="link-input"
                            type="url"
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                            placeholder="Enter your link here"
                        />
                    </div>
                    <DialogFooter className="flex justify-start" style={{ justifyContent: 'flex-start' }}>
                        <Button variant="outline" onClick={handleCancel} className="dark:text-black">Cancel</Button>
                        <Button variant="sketchlieBlue" onClick={handleConfirm}>Confirm</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};
