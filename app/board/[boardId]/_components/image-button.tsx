"use client";

import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { Loader2, LucideIcon, Search, Upload, X } from "lucide-react";
import { toast } from "sonner"
import { useRef, Dispatch, SetStateAction, useEffect, useCallback } from "react";
import { getMaxImageSize } from "@/lib/planLimits";
import { useCurrentUser } from "@/hooks/use-current-user";
import { LayerType, Point } from "@/types/canvas";
import { getCenterOfScreen } from "@/lib/utils";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useDebounce } from "usehooks-ts";
import { themeCheck } from "@/lib/theme-utils";

interface MediaButtonProps {
    isUploading: boolean;
    insertMedia: (layerType: LayerType.Image | LayerType.Video, position: Point, info: any, zoom: number) => void;
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
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [gifs, setGifs] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    const [isSearching, setIsSearching] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const dialogRef = useRef<HTMLDivElement>(null);
    const [theme, setTheme] = useState("dark");
    const giphyLogo = theme === "dark" ? "/watermarks/giphy-black.png" : "/watermarks/giphy-white.png";

    console.log(giphyLogo);

    useEffect(() => {
        setTheme(themeCheck());
    },[searchTerm])

    const handleUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement> | { target: { files: File[] } }) => {
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
        formData.append('userId', user?.id || '');

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
                    insertMedia(LayerType.Image, centerPoint, info, zoom);
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
                    insertMedia(LayerType.Video, centerPoint, info, zoom);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            })
            .finally(() => {
                toast.dismiss(toastId);
                setIsUploading(false);
                setIsDialogOpen(false);
                toast.success("Media uploaded successfully")
            });
    }, [setIsUploading, insertMedia, camera, svgRef, zoom, maxFileSize, user]);

    const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    }, []);

    const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    }, []);

    const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const files = Array.from(e.dataTransfer.files);
        if (files.length > 0) {
            handleUpload({ target: { files } } as any);
        }
    }, [handleUpload]);

    const handleButtonClick = () => {
        setIsDialogOpen(true);
    };

    useEffect(() => {
        const handleGifSearch = async () => {
            if (debouncedSearchTerm) {
                setIsSearching(true);
                try {
                    const response = await fetch(`/api/giphy?q=${encodeURIComponent(debouncedSearchTerm)}`);
                    if (!response.ok) {
                        throw new Error('Failed to fetch GIFs');
                    }
                    const data = await response.json();
                    setGifs(data.data);
                } catch (error) {
                    console.error('Error:', error);
                    toast.error("Failed to search GIFs");
                } finally {
                    setIsSearching(false);
                }
            } else {
                setGifs([]);
            }
        };

        handleGifSearch();
    }, [debouncedSearchTerm]);

    const handleGifSelect = async (gif: any) => {
        setIsUploading(true);

        try {
            const info = {
                url: gif.images.original.url,
                dimensions: {
                    width: gif.images.original.width,
                    height: gif.images.original.height
                },
                type: 'image'
            };
            const centerPoint = getCenterOfScreen(camera, zoom, svgRef);
            insertMedia(LayerType.Image, centerPoint, info, zoom);
            toast.success("GIF added successfully");
        } catch (error) {
            console.error('Error:', error);
            toast.error("Failed to add GIF");
        } finally {
            setIsUploading(false);
            setIsDialogOpen(false);
        }
    };

    if (!user) {
        return null;
    }

    return (
        <>
            <Hint side="top" label={label} sideOffset={14}>
                <Button disabled={isDisabled} onClick={handleButtonClick} size="icon" variant={isActive ? "iconActive" : "icon"} className="h-10 w-10">
                    <Icon />
                </Button>
            </Hint>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent
                    ref={dialogRef}
                    className={`max-w-[90%] lg:max-w-[50%] xl:max-w-[30%] 2xl:max-w-[40%] w-full max-h-[90%] pt-10 ${isDragging ? 'border-2 border-dashed border-blue-500' : ''}`}
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                >
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold">Images, Videos, and GIFs</DialogTitle>
                        <DialogDescription>
                            We know you&apos;re a creative, so we&apos;ve made it easy to add images, videos, and GIFs to your boards.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col gap-4">
                        <div className="relative flex items-center">
                            <Search
                                className="absolute left-3 text-muted-foreground h-4 w-4"
                            />
                            <Input
                                className="pl-9 pr-10"
                                placeholder="Search GIFs..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            {searchTerm && (
                                <button
                                    onClick={() => setSearchTerm("")}
                                    className="absolute right-0 p-0 h-full aspect-square"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            )}
                        </div>
                        <div className="relative h-[300px]">
                            <ScrollArea className="h-full" onWheel={(e) => e.stopPropagation()}>
                                {isSearching ? (
                                    <div className="absolute inset-0 flex justify-center items-center">
                                        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
                                    </div>
                                ) : gifs.length > 0 ? (
                                    <div className="grid grid-cols-3 gap-2 p-2">
                                        {gifs.map((gif) => (
                                            <img
                                                key={gif.id}
                                                src={gif.images.fixed_height_small.url}
                                                alt={gif.title}
                                                onClick={() => handleGifSelect(gif)}
                                                className="cursor-pointer"
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center h-full">
                                        <Search className="w-12 h-12 text-gray-400 mb-2" />
                                        <p className="text-gray-500 mb-4">
                                            {searchTerm ? `No results for "${searchTerm}"` : "Search images"}
                                        </p>
                                        <Button onClick={() => inputFileRef.current?.click()} variant="sketchlieBlue">
                                            <Upload className="w-4 h-4 mr-2" />
                                            Import Image
                                        </Button>
                                    </div>
                                )}
                            </ScrollArea>
                        </div>
                        {searchTerm && (
                            <div className="pt-2 border-t" onDrag={(e) => {e.stopPropagation(), e.preventDefault()}} onDragStart={(e) => {e.stopPropagation(), e.preventDefault()}}>
                                <img
                                    src={giphyLogo}
                                    alt="Powered by GIPHY"
                                />
                            </div>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
            <input
                type="file"
                onChange={handleUpload}
                ref={inputFileRef}
                accept="image/*,video/*"
                style={{ display: 'none' }}
            />
        </>
    )
}