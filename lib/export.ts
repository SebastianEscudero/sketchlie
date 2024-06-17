import { toJpeg, toPng } from 'html-to-image';
import { jsPDF } from "jspdf";
import { toast } from 'sonner';

export const exportToPNG = async (title: string) => {
  try {
    const screenShot = document.getElementById("canvas") as HTMLElement;
    // Store the original background color
    
    const originalBackgroundColor = screenShot.style.backgroundColor;
    // Change the background color for the export
    screenShot.style.backgroundColor = '#F4F4F4';

    toPng(screenShot, {
      quality: 1,
    }).then((dataUrl) => {
      // Revert the background color after export
      screenShot.style.backgroundColor = originalBackgroundColor;

      var anchor = document.createElement("a");
      anchor.setAttribute("href", dataUrl);
      anchor.setAttribute("download", `${title}.png`);
      anchor.click();
      anchor.remove();
    })
  } catch (error) {
    toast.error('An error occurred while exporting the board. Please try a different browser.');
  }
};

export const exportToJSON = async (id: string, liveLayers: any, liveLayerIds: any) => {
  const serializedBoard = JSON.stringify({
    layers: liveLayers,
    layerIds: liveLayerIds,
  });
  const blob = new Blob([serializedBoard], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `board-${id}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const exportToSVG = async (title: string) => {
  // implement
};

export const exportToPdf = async (title: string) => {
  try {
    const screenShot = document.getElementById("canvas") as HTMLElement;
    // Store the original background color
    const originalBackgroundColor = screenShot.style.backgroundColor;
    // Change the background color for the export
    screenShot.style.backgroundColor = '#F4F4F4';

    toPng(screenShot, { quality: 1 }).then((dataUrl) => {
      // Revert the background color after export
      screenShot.style.backgroundColor = originalBackgroundColor;

      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [screenShot.clientWidth, screenShot.clientHeight]
      });

      pdf.addImage(dataUrl, 'PNG', 0, 0, screenShot.clientWidth, screenShot.clientHeight);
      pdf.save(`${title}.pdf`);
    });
  } catch (error) {
    toast.error('An error occurred while exporting the board. Please try a different browser.');
  }
};