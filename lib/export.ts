import { jsPDF } from "jspdf";
import { toast } from 'sonner';
import { domToSvg, domToPng, domToJpeg } from 'modern-screenshot'
import 'svg2pdf.js';

export const exportToPdf = async (title: string, isTransparent: boolean) => {
  try {
    const screenShot = document.querySelector("#canvas") as HTMLElement;

    // Convert the DOM to a JPEG
    const jpegDataUrl = await domToJpeg(screenShot, {
      quality: 1, // Adjust this value for size/quality trade-off
      scale: 3, // Increase scale for better quality
      backgroundColor: isTransparent ? '#FFFFFF' : (document.documentElement.classList.contains("dark") ? '#2C2C2C' : '#F4F4F4'),
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
      backgroundColor: isTransparent ? 'transparent' : (document.documentElement.classList.contains("dark") ? '#2C2C2C' : '#F4F4F4'),
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
      backgroundColor: isTransparent ? 'transparent' : (document.documentElement.classList.contains("dark") ? '#2C2C2C' : '#F4F4F4'),
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
      backgroundColor: isTransparent ? 'transparent' : (document.documentElement.classList.contains("dark") ? '#2C2C2C' : '#F4F4F4'),
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