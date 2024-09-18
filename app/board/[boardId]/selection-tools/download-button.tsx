import { useState } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Hint } from "@/components/hint";

interface DownloadButtonProps {
  layers: any[];
}

export const DownloadButton = ({ layers }: DownloadButtonProps) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      for (const layer of layers) {
          const response = await fetch(layer.src);
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.style.display = "none";
          a.href = url;
          
          const fileExtension = layer.src.split('.').pop();
          const fileName = layer.src.split('/').pop();

          a.download = fileName || `${layer.type}_${Date.now()}.${fileExtension}`;
          
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error("Error downloading file:", error);
    }
    setIsDownloading(false);
  };

  return (
    <Hint label="Download">
      <Button
        onClick={handleDownload}
        variant="board"
        size="icon"
        disabled={isDownloading}
      >
        <Download />
      </Button>
    </Hint>
  );
};