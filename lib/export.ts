import { jsPDF } from "jspdf";
import { toast } from 'sonner';
import { domToSvg, domToPng, domToJpeg, domToCanvas } from 'modern-screenshot'
import { Layer, Layers, LayerType } from "@/types/canvas";
import "svg2pdf.js"
import { LayerPreview } from "@/app/board/[boardId]/_components/layer-preview";
import React from "react";
import ReactDOMServer from "react-dom/server";

export const exportFramesToPdf = async (title: string, isTransparent: boolean, liveLayers: Layers, liveLayerIds: string[]) => {
  try {
    const frames = Object.values(liveLayers).filter((layer: Layer) => layer.type === LayerType.Frame);

    if (frames.length === 0) {
      toast.error('Make sure to add frames to export to PDF!');
      return;
    }

    const A4_WIDTH = 595.276; // A4 width in points
    const A4_HEIGHT = 841.890; // A4 height in points

    const doc = new jsPDF({
      orientation: "portrait",
      unit: 'pt',
      format: 'a4',
      compress: true
    });

    let totalImageSize = 0;

    for (let i = 0; i < frames.length; i++) {
      const frame = frames[i];
      
      // If not the first page, add a new page
      if (i > 0) {
        doc.addPage('a4');
      }

      // Calculate aspect ratio and dimensions
      const frameAspectRatio = frame.width / frame.height;
      let finalWidth = A4_WIDTH;
      let finalHeight = A4_WIDTH / frameAspectRatio;

      // If height exceeds page height, scale down based on height
      if (finalHeight > A4_HEIGHT) {
        finalHeight = A4_HEIGHT;
        finalWidth = A4_HEIGHT * frameAspectRatio;
      }

      // Calculate centering offsets
      const xOffset = (A4_WIDTH - finalWidth) / 2;
      const yOffset = (A4_HEIGHT - finalHeight) / 2;

      const parser = new DOMParser();
      const htmlContent = generateFrameSvg(frame, liveLayers, liveLayerIds);
      const docParser = parser.parseFromString(htmlContent, 'text/html');
      const simulatedCanvas = docParser.body.firstChild as HTMLElement;

      const container = document.createElement('div');
      container.appendChild(simulatedCanvas);
      document.body.appendChild(container);

      try {
        const canvas = await domToCanvas(container, {
          backgroundColor: isTransparent ? 'rgba(0,0,0,0)' : (document.documentElement.classList.contains("dark") ? '#2C2C2C' : 'white'),
          scale: 1,
          quality: 1,
        });

        const imgData = canvas.toDataURL('image/jpeg', 0.8);
        totalImageSize += imgData.length;

        if (document.documentElement.classList.contains("dark")) {
          doc.setFillColor("#2c2c2c");
          doc.rect(xOffset, yOffset, finalWidth, finalHeight, 'F');
        }

        // Add image with calculated dimensions and positioning
        doc.addImage(imgData, 'JPEG', xOffset, yOffset, finalWidth, finalHeight, '', 'FAST');

      } catch (error) {
        console.error(`Error in domToCanvas for frame ${i}:`, error);
      } finally {
        document.body.removeChild(container);
      }
    }

    // Save single PDF with all frames
    doc.save(`${title}.pdf`);
    console.log(`Total image data size: ${totalImageSize / 1024} KB`);

  } catch (error) {
    toast.error('An error occurred while exporting the frames to PDF, try again.');
    console.error('Export frames to PDF error:', error);
  }
};

function generateFrameSvg(frame: Layer, liveLayers: Layers, liveLayerIds: string[]): string {
  const layersInFrame = liveLayerIds
    .map(id => liveLayers[id])
    .filter(layer => 
      layer !== frame && 
      // Check if there's any overlap between layer and frame
      layer.x < frame.x + frame.width && 
      layer.x + layer.width > frame.x && 
      layer.y < frame.y + frame.height && 
      layer.y + layer.height > frame.y
    );

  const layersHtml = layersInFrame.map(layer => 
    ReactDOMServer.renderToStaticMarkup(
      React.createElement(LayerPreview, {
        id: "",
        layer: layer,
        onLayerPointerDown: () => {},
        setLiveLayers: () => {},
        socket: null,
        expired: false,
        boardId: "",
        setCamera: () => {},
        setZoom: () => {},
      })
    )
  ).join('');

  return `
      <svg class="h-full w-full" viewBox="0 0 ${frame.width} ${frame.height}">
        <g style="transform: translate(${-frame.x}px, ${-frame.y}px);">
          ${layersHtml}
        </g>
      </svg>
  `;
}

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
