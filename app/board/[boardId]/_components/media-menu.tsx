import { Button } from "@/components/ui/button";
import { AnimatedToolbarMenu } from "./toolbar";
import { Upload, Library, Search, X, Loader2, MonitorUp } from "lucide-react";
import { useState, useRef, useCallback, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { LayerType, Point } from "@/types/canvas";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useDebounce } from "usehooks-ts";
import { themeCheck } from "@/lib/theme-utils";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn, getCenterOfScreen } from "@/lib/utils";
import { toast } from "sonner";
import { uploadFilesAndInsertThemIntoCanvas } from "../canvas-objects/utils/file-uploading-utils";
import { useCurrentUser } from "@/hooks/use-current-user";

interface MediaMenuProps {
  isMediaMenuOpen: boolean;
  org: any;
  isUploading: boolean;
  setIsUploading: React.Dispatch<React.SetStateAction<boolean>>;
  insertMedia: (mediaItems: { layerType: LayerType.Image | LayerType.Video | LayerType.Link | LayerType.Svg, position: Point, info: any, zoom: number }[]) => void;
  camera: any;
  svgRef: any;
  zoom: number;
}

export const MediaMenu: React.FC<MediaMenuProps> = ({
  isMediaMenuOpen,
  org,
  isUploading,
  setIsUploading,
  insertMedia,
  camera,
  svgRef,
  zoom
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [isSearching, setIsSearching] = useState(false);
  const [isDraggingFiles, setIsDraggingFiles] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const [theme, setTheme] = useState("dark");
  const [activeTab, setActiveTab] = useState<"gifs" | "images" | "videos" | "icons">("images");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const giphyLogo = theme === "dark" ? "/watermarks/giphy-black.png" : "/watermarks/giphy-white.png";
  const user = useCurrentUser();

  useEffect(() => {
    setTheme(themeCheck());
  }, [searchTerm]);

  useEffect(() => {
    setSearchResults([]);
    setSearchTerm("");
  }, [activeTab]);

  const getMediaSrc = (item: any) => {
    switch (activeTab) {
      case "gifs":
        return item.images?.fixed_height_small?.url || '';
      case "images":
        return item.src?.medium || '';
      case "videos":
        const sdVideo = item.video_files?.find((file: any) => file.quality === 'sd');
        return sdVideo ? sdVideo.link : '';
      default:
        return '';
    }
  };

  useEffect(() => {
    const handleSearch = async () => {
      if (debouncedSearchTerm) {
        setIsSearching(true);
        try {
          let response;
          switch (activeTab) {
            case "gifs":
              response = await fetch(`/api/media/giphy?q=${encodeURIComponent(debouncedSearchTerm)}`);
              break;
            case "images":
              response = await fetch(`/api/media/pexels/images?q=${encodeURIComponent(debouncedSearchTerm)}`);
              break;
            case "videos":
              response = await fetch(`/api/media/pexels/videos?q=${encodeURIComponent(debouncedSearchTerm)}`);
              break;
            case "icons":
              response = await fetch(`/api/media/icons?q=${encodeURIComponent(debouncedSearchTerm)}`);
              break;
          }
          if (!response.ok) {
            throw new Error(`Failed to fetch ${activeTab}`);
          }
          const data = await response.json();
          setSearchResults(data.icons || data.data || data.videos || data.photos);
        } catch (error) {
          console.error('Error:', error);
          toast.error(`Failed to search ${activeTab}`);
        } finally {
          setIsSearching(false);
        }
      } else {
        setSearchResults([]);
      }
    };

    handleSearch();
  }, [debouncedSearchTerm, activeTab]);

  const handleUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement> | { target: { files: File[] } }) => {
    setIsUploading(true);
    if (!e.target.files || e.target.files.length === 0) {
      setIsUploading(false);
      toast.error("No file selected, please try again.");
      return;
    }

    const files = Array.from(e.target.files);
    const centerPoint = getCenterOfScreen(camera, zoom, svgRef);
    
    setIsDialogOpen(false);

    await uploadFilesAndInsertThemIntoCanvas(
      files,
      org,
      user!,
      zoom,
      centerPoint.x,
      centerPoint.y,
      insertMedia
    );

    setIsUploading(false);
  }, [setIsUploading, insertMedia, camera, svgRef, zoom, org, user]);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.types.includes('Files')) {
      setIsDraggingFiles(true);
    }
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.currentTarget === e.target) {
      setIsDraggingFiles(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingFiles(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleUpload({ target: { files } } as any);
      setIsDialogOpen(false);
    }
  }, [handleUpload]);

  const handleMediaSelect = async (media: any) => {
    setIsUploading(true);

    try {
      let info;
      let originalWidth, originalHeight;
      const maxWidth = window.innerWidth / 4;
      const maxHeight = window.innerHeight / 4;

      const calculateDimensions = (width: number, height: number) => {
        const aspectRatio = width / height;
        let newWidth, newHeight;

        if (width > height) {
          newWidth = Math.min(width, maxWidth);
          newHeight = newWidth / aspectRatio;
        } else {
          newHeight = Math.min(height, maxHeight);
          newWidth = newHeight * aspectRatio;
        }

        return { width: newWidth, height: newHeight };
      };

      switch (activeTab) {
        case "gifs":
          originalWidth = parseInt(media.images.original.width);
          originalHeight = parseInt(media.images.original.height);
          info = {
            url: media.images.original.url,
            dimensions: calculateDimensions(originalWidth, originalHeight),
            type: 'image'
          };
          break;
        case "images":
          originalWidth = media.width;
          originalHeight = media.height;
          info = {
            url: media.src.original,
            dimensions: calculateDimensions(originalWidth, originalHeight),
            type: 'image'
          };
          break;
        case "videos":
          originalWidth = media.width;
          originalHeight = media.height;
          info = {
            url: media.video_files.find((file: any) => file.quality === 'hd').link,
            dimensions: calculateDimensions(originalWidth, originalHeight),
            type: 'video'
          };
          break;
        case "icons":
          return;
      }
      const centerPoint = getCenterOfScreen(camera, zoom, svgRef);
      const adjustedPoint = {
        x: centerPoint.x - info.dimensions.width / 2,
        y: centerPoint.y - info.dimensions.height / 2
      };

      insertMedia([{
        layerType: activeTab === "videos" ? LayerType.Video : LayerType.Image, 
        position: adjustedPoint, 
        info, 
        zoom
      }]);
      
      toast.success(`${activeTab.slice(0, -1).charAt(0).toUpperCase() + activeTab.slice(0, -1).slice(1)} added successfully`);
    } catch (error) {
      console.error('Error:', error);
      toast.error(`Failed to add ${activeTab.slice(0, -1)}`);
    } finally {
      setIsUploading(false);
      setIsDialogOpen(false);
    }
  };

  const handleIconSelect = async (icon: any) => {
    try {
      setIsUploading(true);

      if (!icon.icon_url) {
        throw new Error('Icon URL is missing');
      }

      const response = await fetch(icon.icon_url);

      if (!response.ok) {
        throw new Error('Failed to fetch SVG data');
      }
      const svgData = await response.text();

      const centerPoint = getCenterOfScreen(camera, zoom, svgRef);

      const desiredSize = 100;
      const info = {
        url: svgData,
        dimensions: {
          width: desiredSize / zoom,
          height: desiredSize / zoom
        },
        type: LayerType.Svg
      };

      insertMedia([{layerType: LayerType.Svg, position: centerPoint, info, zoom}]);
      toast.success('Icon added successfully');
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to add icon');
    } finally {
      setIsUploading(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <>
      <AnimatedToolbarMenu isOpen={isMediaMenuOpen} className="bottom-16 right-28">
        <div className="flex flex-col space-y-2">
          <Button onClick={() => inputFileRef.current?.click()} variant="ghost" className="justify-start">
            <MonitorUp className="mr-2 h-4 w-4" />
            My device
          </Button>
          <Button onClick={() => setIsDialogOpen(true)} variant="ghost" className="justify-start">
            <Library className="mr-2 h-4 w-4" />
            Library
          </Button>
        </div>
      </AnimatedToolbarMenu>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent
          ref={dialogRef}
          className={cn(
            "max-w-[90%] lg:max-w-[50%] xl:max-w-[30%] 2xl:max-w-[40%] w-full max-h-[90%] pt-10 relative",
            isDraggingFiles && "border-2 border-dashed border-blue-500"
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {isDraggingFiles && (
            <div className="absolute inset-0 bg-blue-100 bg-opacity-50 flex items-center justify-center z-10 pointer-events-none">
              <p className="text-blue-500 text-xl font-semibold">Drop files here</p>
            </div>
          )}
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Images, Videos, GIFs, and Icons</DialogTitle>
            <DialogDescription>
              We know you&apos;re a creative, so we&apos;ve made it as easy as possible to add images, videos, and GIFs to your boards.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <Tabs value={activeTab} onValueChange={(value) => {
              setActiveTab(value as "gifs" | "images" | "videos" | "icons");
              setSearchTerm("");
            }}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="images" className="data-[state=active]:border-b-2 border-blue-500">Images</TabsTrigger>
                <TabsTrigger value="gifs" className="data-[state=active]:border-b-2 border-blue-500">GIFs</TabsTrigger>
                <TabsTrigger value="videos" className="data-[state=active]:border-b-2 border-blue-500">Videos</TabsTrigger>
                <TabsTrigger value="icons" className="data-[state=active]:border-b-2 border-blue-500">Icons</TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="relative flex items-center">
              <Search className="absolute left-3 text-muted-foreground h-4 w-4" />
              <Input
                className="pl-9 pr-10"
                placeholder={`Search ${activeTab}...`}
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
                ) : searchResults.length > 0 ? (
                  <div className="grid grid-cols-4 gap-2 p-2">
                    {searchResults.map((item) => {
                      if (activeTab === "icons") {
                        return (
                          <img
                            key={item.id}
                            src={item.thumbnail_url}
                            alt={item.term}
                            onClick={() => handleIconSelect(item)}
                            className="cursor-pointer object-contain w-full h-16"
                          />
                        );
                      } else {
                        const mediaSrc = getMediaSrc(item);
                        return activeTab === "videos" ? (
                          mediaSrc ? (
                            <video
                              key={item.id}
                              src={mediaSrc}
                              onClick={() => handleMediaSelect(item)}
                              className="cursor-pointer object-cover w-full h-32"
                              muted
                              loop
                              onMouseOver={(e) => e.currentTarget.play()}
                              onMouseOut={(e) => e.currentTarget.pause()}
                            />
                          ) : null
                        ) : (
                          <img
                            key={item.id}
                            src={mediaSrc}
                            alt={activeTab === "gifs" ? item.title : item.alt}
                            onClick={() => handleMediaSelect(item)}
                            className="cursor-pointer object-cover w-full h-32"
                          />
                        );
                      }
                    })}
                  </div>
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center h-full">
                    <Search className="w-12 h-12 text-gray-400 mb-2" />
                    <p className="text-gray-500 mb-4">
                      {searchTerm ? `No results for "${searchTerm}"` : `Search ${activeTab}`}
                    </p>
                    <Button onClick={() => inputFileRef.current?.click()} variant="sketchlieBlue">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload {activeTab.slice(0, -1)}
                    </Button>
                  </div>
                )}
              </ScrollArea>
            </div>
            {activeTab === "gifs" && searchTerm && (
              <div className="pt-2 border-t">
                <img src={giphyLogo} alt="Powered by GIPHY" />
              </div>
            )}
            {(activeTab === "images" || activeTab === "videos") && searchTerm && (
              <div className="pt-2 border-t text-sm text-gray-500">
                {activeTab === "images" ? "Photos" : "Videos"} provided by <a href="https://pexels.com" target="_blank" rel="noopener noreferrer">Pexels</a>
              </div>
            )}
            {activeTab === "icons" && searchTerm && (
              <div className="pt-2 border-t text-sm text-gray-500">
                Icons provided by The Noun Project
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
      <input
        type="file"
        onChange={handleUpload}
        ref={inputFileRef}
        accept="image/*,video/*,application/pdf"
        style={{ display: 'none' }}
      />
    </>
  );
};