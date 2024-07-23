import { jsPDF } from "jspdf";
import { toast } from 'sonner';
import { domToJpeg, domToPng, domToSvg } from 'modern-screenshot'

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

    await domToPng(screenShot, {
      quality: 0.8,
      scale: 1,
      backgroundColor: isTransparent ? 'transparent' : (document.documentElement.classList.contains("dark") ? '#2C2C2C' : '#F4F4F4'),
    }).then((dataUrl) => {
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [screenShot.clientWidth, screenShot.clientHeight]
      });

      pdf.addImage(dataUrl, 'PNG', 0, 0, screenShot.clientWidth, screenShot.clientHeight);
      pdf.save(`${title}.pdf`);
    });

    // Restore the text content of the textarea elements
    textareas.forEach((textarea, index) => {
      textarea.textContent = textareaContents[index];
    });

  } catch (error) {
    toast.error('An error occurred while exporting the board. Please try a different browser.');
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
    toast.error('An error occurred while exporting the board. Please try a different browser.');
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
    toast.error('An error occurred while exporting the board. Please try a different browser.');
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