import { exportFramesToPdf, exportToJPG, exportToJSON, exportToPdf, exportToPNG, exportToSVG, previewFramesToPdf, previewToSVG } from "@/lib/export";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ExportIcon } from "@/public/custom-icons/export";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRoom } from "@/components/room";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTheme } from "next-themes";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ExportDialogProps {
    id: string;
    title: string;
    svgRef: React.RefObject<SVGSVGElement>;
}

export const ExportDialog = ({ id, title, svgRef }: ExportDialogProps) => {
    const { liveLayers, liveLayerIds } = useRoom();
    const { theme } = useTheme();
    const [isTransparent, setIsTransparent] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [selectedViewFormat, setSelectedViewFormat] = useState<string>('PDF');
    const [selectedFramesFormat, setSelectedFramesFormat] = useState<string>('PDF');
    const [pdfPreviewUrls, setPdfPreviewUrls] = useState<string[]>([]);
    const [activeTab, setActiveTab] = useState<'view' | 'frames'>('view');
    const [open, setOpen] = useState(false);

    const viewExportOptions = [
        { label: 'PDF', action: () => exportToPdf(title, isTransparent) },
        { label: 'PNG', action: () => exportToPNG(title, isTransparent) },
        { label: 'JPG', action: () => exportToJPG(title, isTransparent) },
        { label: 'SVG', action: () => exportToSVG(title, isTransparent) },
        { label: 'JSON', action: () => exportToJSON(id, liveLayers, liveLayerIds) },
    ];

    const framesExportOptions = [
        { label: 'PDF', action: () => exportFramesToPdf(title, false, liveLayers, liveLayerIds, svgRef) },
    ];

    useEffect(() => {
        if (open) {
            generatePreview();
        }
    }, [isTransparent, theme, selectedViewFormat, selectedFramesFormat, activeTab, open]);

    const generatePreview = async () => {
        const screenShot = document.querySelector("#canvas") as HTMLElement;
        if (screenShot) {
            if (activeTab === 'frames') {
                const urls = await previewFramesToPdf(title, false, liveLayers, liveLayerIds, svgRef);
                setPdfPreviewUrls(urls);
                setPreviewUrl(null);
            } else {
                const dataUrl = await previewToSVG(title, isTransparent);
                if (dataUrl) {
                    setPreviewUrl(dataUrl);
                    setPdfPreviewUrls([]);
                }
            }
        }
    };

    const handleExport = () => {
        const options = activeTab === 'view' ? viewExportOptions : framesExportOptions;
        const selectedFormat = activeTab === 'view' ? selectedViewFormat : selectedFramesFormat;
        const selectedOption = options.find(option => option.label === selectedFormat);
        if (selectedOption) {
            selectedOption.action();
        }
    };

    const handleTabChange = (value: string) => {
        setActiveTab(value as 'view' | 'frames');
        if (value === 'frames' && !framesExportOptions.some(option => option.label === selectedFramesFormat)) {
            setSelectedFramesFormat(framesExportOptions[0].label);
        } else if (value === 'view' && !viewExportOptions.some(option => option.label === selectedViewFormat)) {
            setSelectedViewFormat(viewExportOptions[0].label);
        }
    };

    const renderExportOptions = () => {
        const options = activeTab === 'view' ? viewExportOptions : framesExportOptions;
        const selectedFormat = activeTab === 'view' ? selectedViewFormat : selectedFramesFormat;
        const setSelectedFormat = activeTab === 'view' ? setSelectedViewFormat : setSelectedFramesFormat;

        return (
            <div className="space-y-6">
                {activeTab === 'view' && (
                    <div className="flex items-center space-x-2">
                        <Switch
                            id="transparent-mode"
                            checked={isTransparent}
                            onCheckedChange={setIsTransparent}
                        />
                        <Label htmlFor="transparent-mode">Transparent background</Label>
                    </div>
                )}
                <div className="space-y-2">
                    <Label htmlFor="export-format">Export format</Label>
                    <Select onValueChange={setSelectedFormat} value={selectedFormat}>
                        <SelectTrigger id="export-format">
                            <SelectValue placeholder="Select format" />
                        </SelectTrigger>
                        <SelectContent>
                            {options.map((option) => (
                                <SelectItem key={option.label} value={option.label}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
        );
    };

    const renderPreview = () => (
        <div className="space-y-4">
            <Label>Preview</Label>
            <div 
                className="border rounded-md p-2 bg-zinc-100 dark:bg-zinc-700 overflow-y-auto max-h-[400px]"
                onWheel={(e) => e.stopPropagation()}
            >
                {previewUrl && (
                    <Image quality={100}src={previewUrl} alt="Preview" width={500} height={500} className="w-full h-auto object-contain" />
                )}
                {pdfPreviewUrls.length > 0 && (
                    pdfPreviewUrls.map((url, index) => (
                        <div key={index} className="mb-8 last:mb-0">
                            <div className="text-zinc-800 dark:text-zinc-200 mb-2 text-sm text-left">
                                Page {index + 1}
                            </div>
                            <div className="border rounded-md">
                                <Image 
                                    quality={100}   
                                    src={url} 
                                    alt={`Page ${index + 1}`} 
                                    width={500} 
                                    height={500} 
                                    className="w-full h-auto object-contain" 
                                />
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="infoIcons" className="p-2">
                    <ExportIcon />
                </Button>
            </DialogTrigger>
            <DialogContent className="overflow-y-auto h-full max-h-[90%] pt-10 w-[90vw] max-w-[900px]">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">Export Options</DialogTitle>
                </DialogHeader>
                <Tabs defaultValue="view" onValueChange={handleTabChange}>
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="view">Export View</TabsTrigger>
                        <TabsTrigger value="frames">Export Frames</TabsTrigger>
                    </TabsList>
                    <TabsContent value="view">
                        <div className="flex flex-col gap-8 py-4">
                            <div className="flex-1">{renderExportOptions()}</div>
                            <div className="flex-1">{renderPreview()}</div>
                        </div>
                    </TabsContent>
                    <TabsContent value="frames">
                        <div className="flex flex-col gap-8 py-4">
                            <div className="flex-1">{renderExportOptions()}</div>
                            <div className="flex-1">{renderPreview()}</div>
                        </div>
                    </TabsContent>
                </Tabs>
                <DialogFooter> 
                <Button onClick={handleExport} variant="sketchlieBlue" className="w-full max-w-[200px]">
                    Export as {activeTab === 'view' ? selectedViewFormat : selectedFramesFormat}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};