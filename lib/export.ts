import { toJpeg, toPng } from 'html-to-image';

export const exportToPNG = async (title: string) => {
  const screenShot = document.getElementById("canvas") as HTMLElement;
  // Store the original background color
  const originalBackgroundColor = screenShot.style.backgroundColor;
  // Change the background color for the export
  screenShot.style.backgroundColor = '#F4F4F4';
  
  toPng(screenShot, { quality: 1 }).then((dataUrl) => {
    // Revert the background color after export
    screenShot.style.backgroundColor = originalBackgroundColor;
    
    var anchor = document.createElement("a");
    anchor.setAttribute("href", dataUrl);
    anchor.setAttribute("download", `${title}.png`);
    anchor.click();
    anchor.remove();
  })
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