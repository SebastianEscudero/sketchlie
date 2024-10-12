"use client";

import { useState, useEffect } from 'react';
import { Search, X, Loader2, LucideIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useDebounce } from 'usehooks-ts';
import { toast } from 'sonner';
import { LayerType, Point } from '@/types/canvas';
import { getCenterOfScreen } from "@/lib/utils";
import { Hint } from "@/components/hint";

interface IconButtonProps {
    insertMedia: (mediaItems: {layerType: LayerType.Image | LayerType.Video | LayerType.Link, position: Point, info: any, zoom: number}[]) => void;
    icon: LucideIcon;
    label: string;
    org: any;
    camera: any;
    svgRef: any;
    zoom: number;
}

export const IconButton = ({
    insertMedia,
    label,
    camera,
    svgRef,
    zoom,
    icon: Icon
}: IconButtonProps) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    const [isSearching, setIsSearching] = useState(false);
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const getProxiedUrl = (url: string) => `/api/media/proxy-image?url=${encodeURIComponent(url)}`;

    useEffect(() => {
        const searchIcons = async () => {
            if (debouncedSearchTerm) {
                setIsSearching(true);
                try {
                    const response = await fetch(`/api/icons?q=${encodeURIComponent(debouncedSearchTerm)}`);
                    if (!response.ok) {
                        throw new Error('Failed to fetch icons');
                    }
                    const data = await response.json();
                    setSearchResults(data.icons || []);
                } catch (error) {
                    console.error('Error:', error);
                    toast.error('Failed to search icons');
                } finally {
                    setIsSearching(false);
                }
            } else {
                setSearchResults([]);
            }
        };

        searchIcons();
    }, [debouncedSearchTerm]);

    const handleIconSelect = async (icon: any) => {
        try {
          // Get center point of the screen
          const centerPoint = getCenterOfScreen(camera, zoom, svgRef);
      
          if (!icon.thumbnail_url) {
            throw new Error('SVG URL is missing');
          }
      
          // Use the proxied URL for the SVG
          const proxiedSvgUrl = getProxiedUrl(icon.thumbnail_url);
      
          const desiredSize = 100;
          const info = {
            url: proxiedSvgUrl,
            dimensions: {
              width: desiredSize * zoom,
              height: desiredSize * zoom
            },
            type: LayerType.Image
          };

          insertMedia([{layerType: LayerType.Image, position: centerPoint, info, zoom}]);
          toast.success('Icon added successfully');
          setIsDialogOpen(false);
        } catch (error) {
          console.error('Error:', error);
          toast.error('Failed to add icon');
        }
    };

    return (
        <>
            <Hint side="top" label={label} sideOffset={14}>
                <Button size="icon" variant="icon" className="h-8 w-8 xs:h-10 xs:w-10" onClick={() => setIsDialogOpen(true)}>
                    <Icon className="h-5 w-5" />
                </Button>
            </Hint>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-[90%] lg:max-w-[50%] xl:max-w-[30%] 2xl:max-w-[40%] w-full max-h-[90%] pt-10">
                    <DialogHeader>
                        <DialogTitle>Search Icons</DialogTitle>
                        <DialogDescription>
                            Search for icons from the Noun Project
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col gap-4">
                        <div className="relative flex items-center">
                            <Search className="absolute left-3 text-muted-foreground h-4 w-4" />
                            <Input
                                className="pl-9 pr-10"
                                placeholder="Search icons..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            {searchTerm && (
                                <button
                                    onClick={() => setSearchTerm("")}
                                    className="absolute right-3 p-0 h-full aspect-square"
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
                                ) : searchResults.length > 0 ? (
                                    <div className="grid grid-cols-4 gap-2 p-2">
                                        {searchResults.map((icon) => (
                                            <img
                                                key={icon.id}
                                                src={icon.thumbnail_url}
                                                alt={icon.term}
                                                onClick={() => handleIconSelect(icon)}
                                                className="cursor-pointer object-contain w-full h-16"
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center h-full">
                                        <Search className="w-12 h-12 text-gray-400 mb-2" />
                                        <p className="text-gray-500 mb-4">
                                            {searchTerm ? `No results for "${searchTerm}"` : 'Search for icons'}
                                        </p>
                                    </div>
                                )}
                            </ScrollArea>
                        </div>
                        <div className="pt-2 border-t text-sm text-gray-500">
                            Icons provided by The Noun Project
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};