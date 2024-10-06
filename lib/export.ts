import { jsPDF } from "jspdf";
import { toast } from 'sonner';
import { domToSvg, domToPng, domToJpeg, domToCanvas } from 'modern-screenshot'
import { Layer, Layers, LayerType } from "@/types/canvas";
import "svg2pdf.js"

export const exportFramesToPdf = async (title: string, isTransparent: boolean, liveLayers: Layers, liveLayerIds: string[], svgRef: React.RefObject<SVGSVGElement>) => {
  try {
    const canvas = document.querySelector("#canvas") as HTMLElement;
    const frames = Object.values(liveLayers).filter((layer: Layer) => layer.type === LayerType.Frame);

    if (frames.length === 0) {
      toast.error('Add frames to export');
      return;
    }

    // Create a new jsPDF instance
    const doc = new jsPDF({
      orientation: "landscape",
      unit: 'px',
      format: 'a4'
    });

    const pdfWidth = doc.internal.pageSize.getWidth();
    const pdfHeight = doc.internal.pageSize.getHeight();

    const scale = 4; // Increase scale for better quality
    const quality = 1;

    // Capture the entire canvas as a Canvas element
    const capturedCanvas = await domToCanvas(canvas, {
      backgroundColor: isTransparent ? 'transparent' : (document.documentElement.classList.contains("dark") ? '#2C2C2C' : 'white'),
      scale: scale,
      quality: quality,
    });

    for (let i = 0; i < frames.length; i++) {
      const frameContentElement = canvas.querySelector(`[data-frame-content="frame-${i+1}-content"]`) as SVGGElement;
      if (frameContentElement) {
        const rect = frameContentElement.getBoundingClientRect();
        const canvasRect = canvas.getBoundingClientRect();

        // Calculate the relative position of the frame content within the canvas
        const relativeLeft = (rect.left - canvasRect.left) * scale;
        const relativeTop = (rect.top - canvasRect.top) * scale;

        // Create a new canvas for the cropped frame
        const croppedCanvas = document.createElement('canvas');
        croppedCanvas.width = rect.width * scale;
        croppedCanvas.height = rect.height * scale;
        const ctx = croppedCanvas.getContext('2d');

        // Draw the cropped portion of the captured canvas onto the new canvas
        ctx?.drawImage(
          capturedCanvas,
          relativeLeft, relativeTop, rect.width * scale, rect.height * scale,
          0, 0, rect.width * scale, rect.height * scale
        );

        // Add a new page for each frame (except the first one)
        if (i > 0) {
          doc.addPage();
        }

        // Calculate scaling to fit the frame within the PDF page while maintaining aspect ratio
        const pdfScale = Math.min(pdfWidth / rect.width, pdfHeight / rect.height);
        const scaledWidth = rect.width * pdfScale;
        const scaledHeight = rect.height * pdfScale;
        const xOffset = (pdfWidth - scaledWidth) / 2;
        const yOffset = (pdfHeight - scaledHeight) / 2;

        // Add the cropped canvas to the PDF
        const imgData = croppedCanvas.toDataURL('image/jpeg', 1);
        doc.addImage(imgData, 'JPEG', xOffset, yOffset, scaledWidth, scaledHeight, undefined, 'FAST');
      }
    }

    // Save the PDF
    doc.save(`${title}_frames.pdf`);

  } catch (error) {
    toast.error('An error occurred while exporting the frames to PDF, try again.');
    console.error('Export frames to PDF error:', error);
  }
};

export const exportToPdf = async (title: string, isTransparent: boolean) => {
  try {
    const screenShot = document.querySelector("#canvas") as HTMLElement;

    // Save the text content of the textarea elements
    const textareas = screenShot.querySelectorAll('textarea');
    const textareaContents = Array.from(textareas).map(textarea => textarea.textContent);

    // Clear the text content of the textarea elements
    textareas.forEach(textarea => {
      textarea.textContent = '';
    });


    // Convert the DOM to a JPEG
    const jpegDataUrl = await domToJpeg(screenShot, {
      quality: 1, // Adjust this value for size/quality trade-off
      scale: 3, // Increase scale for better quality
      backgroundColor: isTransparent ? 'transparent' : (document.documentElement.classList.contains("dark") ? '#2C2C2C' : 'white'),
    });

    // Create a new jsPDF instance
    const doc = new jsPDF({
      orientation: "landscape",
      unit: 'px',
      format: [screenShot.clientWidth, screenShot.clientHeight]
    });

    // Get PDF dimensions
    const pdfWidth = doc.internal.pageSize.getWidth();
    const pdfHeight = doc.internal.pageSize.getHeight();

    // Add the JPEG to the PDF
    doc.addImage(jpegDataUrl, 'JPEG', 0, 0, pdfWidth, pdfHeight);

    // Save the PDF
    doc.save(`${title}.pdf`);

    // Restore the text content of the textarea elements
    textareas.forEach((textarea, index) => {
      textarea.textContent = textareaContents[index];
    });

  } catch (error) {
    toast.error('An error occurred while exporting the board, try again.');
    console.error('Export to PDF error:', error);
  }
};

export const exportToPNG = async (title: string, isTransparent: boolean) => {
  try {
    const screenShot = document.querySelector("#canvas") as HTMLElement;

    // Save the text content of the textarea elements
    const textareas = screenShot.querySelectorAll('textarea');
    const textareaContents = Array.from(textareas).map(textarea => textarea.textContent);

    // Clear the text content of the textarea elements
    textareas.forEach(textarea => {
      textarea.textContent = '';
    });

    await domToPng(screenShot, {
      quality: 1,
      scale: 3,
      backgroundColor: isTransparent ? 'transparent' : (document.documentElement.classList.contains("dark") ? '#2C2C2C' : 'white'),
    }).then((dataUrl) => {
      var anchor = document.createElement("a");
      anchor.setAttribute("href", dataUrl);
      anchor.setAttribute("download", `${title}.png`);
      anchor.click();
      anchor.remove();
    });

    // Restore the text content of the textarea elements
    textareas.forEach((textarea, index) => {
      textarea.textContent = textareaContents[index];
    });

  } catch (error) {
    toast.error('An error occurred while exporting the board, try again.');
  }
};

export const exportToJPG = async (title: string, isTransparent: boolean) => {
  try {
    const screenShot = document.querySelector("#canvas") as HTMLElement;

    // Save the text content of the textarea elements
    const textareas = screenShot.querySelectorAll('textarea');
    const textareaContents = Array.from(textareas).map(textarea => textarea.textContent);

    // Clear the text content of the textarea elements
    textareas.forEach(textarea => {
      textarea.textContent = '';
    });

    await domToJpeg(screenShot, {
      quality: 1,
      scale: 3,
      backgroundColor: isTransparent ? 'transparent' : (document.documentElement.classList.contains("dark") ? '#2C2C2C' : 'white'),
    }).then((dataUrl) => {
      var anchor = document.createElement("a");
      anchor.setAttribute("href", dataUrl);
      anchor.setAttribute("download", `${title}.jpg`);
      anchor.click();
      anchor.remove();
    });

    // Restore the text content of the textarea elements
    textareas.forEach((textarea, index) => {
      textarea.textContent = textareaContents[index];
    });

  } catch (error) {
    toast.error('An error occurred while exporting the board, try again.');
  }
};

export const exportToSVG = async (title: string, isTransparent: boolean) => {
  try {
    const screenShot = document.querySelector("#canvas") as HTMLElement;

    // Save the text content of the textarea elements
    const textareas = screenShot.querySelectorAll('textarea');
    const textareaContents = Array.from(textareas).map(textarea => textarea.textContent);

    // Clear the text content of the textarea elements
    textareas.forEach(textarea => {
      textarea.textContent = '';
    });

    await domToSvg(screenShot, {
      quality: 1,
      scale: 3,
      backgroundColor: isTransparent ? 'transparent' : (document.documentElement.classList.contains("dark") ? '#2C2C2C' : 'white'),
    }).then((dataUrl) => {
      var anchor = document.createElement("a");
      anchor.setAttribute("href", dataUrl);
      anchor.setAttribute("download", `${title}.svg`);
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
    });

    // Restore the text content of the textarea elements
    textareas.forEach((textarea, index) => {
      textarea.textContent = textareaContents[index];
    });

  } catch (error) {
    toast.error('An error occurred while exporting the board, try again.');
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