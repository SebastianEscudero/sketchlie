import { Upload, FileImage, File, FileVideo } from "lucide-react";

interface DragIndicatorOverlayProps {
    isDraggingOverCanvas: boolean;
}

export const DragIndicatorOverlay = ({ isDraggingOverCanvas }: DragIndicatorOverlayProps) => {
    if (!isDraggingOverCanvas) return null;

    return (
        <div className="fixed inset-0 z-50 pointer-events-none bg-black bg-opacity-30 transition-all duration-300">
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white dark:bg-zinc-800 rounded-xl p-8 shadow-2xl flex flex-col items-center space-y-4 border-2 border-dashed border-blue-500">
                    <div className="flex flex-col items-center justify-center space-y-4">
                        <Upload className="w-16 h-16 text-blue-500" />
                        <div className="flex space-x-2">
                            <FileImage className="w-10 h-10 text-green-500" />
                            <File className="w-10 h-10 text-red-500" />
                            <FileVideo className="w-10 h-10 text-yellow-500" />
                        </div>
                    </div>
                    <p className="text-xl font-semibold text-gray-700 dark:text-gray-300">
                        Drop files to add to your board
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Supports images, videos, and PDFs
                    </p>
                </div>
            </div>
        </div>
    );
};
