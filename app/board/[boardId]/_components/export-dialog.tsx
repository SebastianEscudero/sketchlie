import { exportFramesToPdf, exportToJPG, exportToJSON, exportToPdf, exportToPNG, exportToSVG, previewFramesToPdf, previewToPNG } from "@/lib/export";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ExportIcon } from "@/public/custom-icons/export";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
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
    const [selectedFramesFormat, setSelectedFramesFormat] = useState<string>('PDF (frames)');
    const [pdfPreviewUrls, setPdfPreviewUrls] = useState<string[]>([]);
    const [activeTab, setActiveTab] = useState<'view' | 'frames'>('view');

    const viewExportOptions = [
        { label: 'PDF', action: () => exportToPdf(title, isTransparent) },
        { label: 'PNG', action: () => exportToPNG(title, isTransparent) },
        { label: 'JPG', action: () => exportToJPG(title, isTransparent) },
        { label: 'SVG', action: () => exportToSVG(title, isTransparent) },
        { label: 'JSON', action: () => exportToJSON(id, liveLayers, liveLayerIds) },
    ];

    const framesExportOptions = [
        { label: 'PDF (frames)', action: () => exportFramesToPdf(title, false, liveLayers, liveLayerIds, svgRef) },
    ];

    useEffect(() => {
        generatePreview();
    }, [isTransparent, theme, selectedViewFormat, selectedFramesFormat, activeTab]);

    const generatePreview = async () => {
        const screenShot = document.querySelector("#canvas") as HTMLElement;
        if (screenShot) {
            if (activeTab === 'frames') {
                const urls = await previewFramesToPdf(title, false, liveLayers, liveLayerIds, svgRef);
                setPdfPreviewUrls(urls);
                setPreviewUrl(null);
            } else {
                const dataUrl = await previewToPNG(title, isTransparent);
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

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="infoIcons" className="p-2">
                    <ExportIcon />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[900px] bg-white dark:bg-gray-800 overflow-y-auto max-h-[90%]">
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
                            <div className="flex-1 space-y-6">
                                <div className="flex items-center space-x-2">
                                    <Switch
                                        id="transparent-mode"
                                        checked={isTransparent}
                                        onCheckedChange={setIsTransparent}
                                    />
                                    <Label htmlFor="transparent-mode">Transparent background</Label>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="export-format">Export format</Label>
                                    <Select onValueChange={setSelectedViewFormat} value={selectedViewFormat}>
                                        <SelectTrigger id="export-format">
                                            <SelectValue placeholder="Select format" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {viewExportOptions.map((option) => (
                                                <SelectItem key={option.label} value={option.label}>
                                                    {option.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <Button onClick={handleExport} variant="sketchlieBlue" className="w-full">
                                    Export as {selectedViewFormat}
                                </Button>
                            </div>
                            <div className="flex-1 space-y-4">
                                <Label>Preview</Label>
                                <div 
                                    className="border rounded-md p-2 bg-gray-50 dark:bg-gray-700 overflow-y-auto max-h-[400px]"
                                    onWheel={(e) => e.stopPropagation()}
                                >
                                    {previewUrl && (
                                        <Image src={previewUrl} alt="Preview" width={500} height={300} className="w-full h-auto object-contain" />
                                    )}
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                    <TabsContent value="frames">
                        <div className="flex flex-col gap-8 py-4">
                            <div className="flex-1 space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="export-format">Export format</Label>
                                    <Select onValueChange={setSelectedFramesFormat} value={selectedFramesFormat}>
                                        <SelectTrigger id="export-format">
                                            <SelectValue placeholder="Select format" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {framesExportOptions.map((option) => (
                                                <SelectItem key={option.label} value={option.label}>
                                                    {option.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <Button onClick={handleExport} variant="sketchlieBlue" className="w-full">
                                    Export as {selectedFramesFormat}
                                </Button>
                            </div>
                            <div className="flex-1 space-y-4">
                                <Label>Preview</Label>
                                <div 
                                    className="border rounded-md p-2 bg-gray-50 dark:bg-gray-700 overflow-y-auto max-h-[400px]"
                                    onWheel={(e) => e.stopPropagation()}
                                >
                                    {pdfPreviewUrls.length > 0 && (
                                        pdfPreviewUrls.map((url, index) => (
                                            <div key={index} className="mb-8 last:mb-0">
                                                <div className="text-black dark:text-white mb-2 text-sm text-left">
                                                    Page {index + 1}
                                                </div>
                                                <div className="border border-gray-300 dark:border-gray-600 rounded-md">
                                                    <Image 
                                                        src={url} 
                                                        alt={`Page ${index + 1}`} 
                                                        width={500} 
                                                        height={300} 
                                                        className="w-full h-auto object-contain" 
                                                    />
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
};