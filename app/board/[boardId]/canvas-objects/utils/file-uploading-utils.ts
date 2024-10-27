import { getMaxImageSize } from "@/lib/planLimits";
import { LayerType, Point } from "@/types/canvas";
import { toast } from "sonner";

let pdfjs: any;

// Function to dynamically import and initialize pdfjs
async function initPdfjs() {
  if (!pdfjs) {
    const pdfModule = await import('react-pdf');
    pdfjs = pdfModule.pdfjs;
    pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
  }
  return pdfjs;
};

export const uploadFilesAndInsertThemIntoCanvas = async (
  files: File[],
  org: any,
  user: any,
  zoom: number,
  centerX: number,
  centerY: number,
  insertMedia: (mediaItems: MediaItem[]) => void
) => {
  const toastId = toast.loading("Uploading files, please wait...");
  try {
    const maxFileSize = getMaxImageSize(org);
    const formData = new FormData();
    const pdfPages: PDFPage[] = [];

    await Promise.all(files.map(file => processFile(file, maxFileSize, formData, pdfPages)));

    formData.append('userId', user.userId);

    const urls = await uploadFiles(formData);
    if (!urls) return;

    const mediaItems = await processUploadedFiles(urls, pdfPages, files, centerX, centerY, zoom);

    insertMedia(mediaItems);
    toast.success(`${mediaItems.length} items uploaded successfully`);
  } catch (error) {
    console.error('Error in uploadFilesAndInsertThemIntoCanvas:', error);
    toast.error('Failed to upload and insert files, try again.');
  } finally {
    toast.dismiss(toastId);
  }
};
async function processFile(file: File, maxFileSize: number, formData: FormData, pdfPages: PDFPage[]): Promise<void> {
  if (!isValidFileType(file) || isFileTooLarge(file, maxFileSize)) {
    toast.error(`File ${file.name} is not valid or too large.`);
    return;
  }

  if (file.type === 'application/pdf') {
    await processPDF(file, formData, pdfPages);
  } else {
    formData.append('file', file);
  }
}

const isValidFileType = (file: File): boolean =>
  file.type.startsWith('image/') || file.type.startsWith('video/') || file.type === 'application/pdf';

const isFileTooLarge = (file: File, maxFileSize: number): boolean =>
  file.size / (1024 * 1024) > maxFileSize;

async function processPDF(file: File, formData: FormData, pdfPages: PDFPage[]): Promise<void> {
  const pdfjs = await initPdfjs()
  const pdf = await pdfjs.getDocument(URL.createObjectURL(file)).promise;
  const numPages = pdf.numPages;

  const pagePromises = Array.from({ length: numPages }, (_, i) =>
    convertPDFPageToImage(pdf, i + 1, file.name)
      .then(imageFile => {
        formData.append('file', imageFile);
        pdfPages.push({ file: imageFile, pageNum: i + 1, totalPages: numPages });
      })
  );

  await Promise.all(pagePromises);
}

async function convertPDFPageToImage(pdf: any, pageNum: number, fileName: string): Promise<File> {
  const page = await pdf.getPage(pageNum);
  const scale = 1.5; // Increase scale for better quality
  const viewport = page.getViewport({ scale });
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d')!;
  canvas.height = viewport.height;
  canvas.width = viewport.width;
  const quality = 1;

  await page.render({ canvasContext: context, viewport }).promise;

  return new Promise<File>(resolve =>
    canvas.toBlob(
      blob => resolve(new File([blob!], `${fileName}_page_${pageNum}.jpg`, { type: 'image/jpeg' })),
      'image/jpeg',
      quality
    )
  );
}

async function uploadFiles(formData: FormData): Promise<string[] | null> {
  const maxPayloadSize = 4 * 1024 * 1024; // 4MB
  const files = formData.getAll('file') as File[];
  const userId = formData.get('userId') as string;

  const chunks: File[][] = [[]];
  let currentChunkSize = 0;
  let chunkIndex = 0;

  for (const file of files) {
    if (currentChunkSize + file.size > maxPayloadSize) {
      chunkIndex++;
      chunks[chunkIndex] = [];
      currentChunkSize = 0;
    }
    chunks[chunkIndex].push(file);
    currentChunkSize += file.size;
  }

  try {
    const allResults: string[] = [];

    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];
      const chunkFormData = new FormData();
      let chunkSize = 0;
      chunk.forEach(file => {
        chunkFormData.append('file', file);
        chunkSize += file.size;
      });
      chunkFormData.append('userId', userId);

      const payloadSizeMB = (chunkSize / (1024 * 1024)).toFixed(2);
      console.log(`Uploading chunk ${i + 1}/${chunks.length}, payload size: ${payloadSizeMB} MB`);

      const res = await fetch('/api/aws-s3-images', {
        method: 'POST',
        body: chunkFormData
      });

      if (!res.ok) throw new Error('Network response was not ok');

      const results = await res.json();
      allResults.push(...results);
    }

    console.log(`Total files uploaded: ${allResults.length}`);
    return allResults;
  } catch (error) {
    console.error('Error:', error);
    toast.error('Failed to upload media');
    return null;
  }
}

async function processUploadedFiles(
  urls: string[],
  pdfPages: PDFPage[],
  files: File[],
  centerX: number,
  centerY: number,
  zoom: number
): Promise<MediaItem[]> {
  if (urls.length === 0) return [];

  // Process all items in parallel
  const processedItems = await Promise.all(urls.map(async (url, index) => {
    const file = pdfPages[index]?.file || files[index - pdfPages.length];
    const isPdfPage = !!pdfPages[index]; // Check if this item is a PDF page
    const item = await processMediaItem(url, file.type, 0, 0, zoom, isPdfPage);
    return { item, originalIndex: index, pageNum: pdfPages[index]?.pageNum };
  }));

  // Sort items to maintain PDF page order
  processedItems.sort((a, b) => {
    if (a.pageNum && b.pageNum) {
      return a.pageNum - b.pageNum;
    }
    return a.originalIndex - b.originalIndex;
  });

  // Calculate grid dimensions
  const gridSize = Math.ceil(Math.sqrt(urls.length));
  const padding = 10 / zoom;

  // Use the first item for base dimensions
  const baseWidth = processedItems[0].item.info.dimensions.width / zoom;
  const baseHeight = processedItems[0].item.info.dimensions.height / zoom;

  // Calculate scaling factor to fit items in a square grid
  const maxGridWidth = window.innerWidth / zoom / 2; // Adjust this value to change the overall grid size
  const scaleFactor = Math.min(
    maxGridWidth / (baseWidth * gridSize + padding * (gridSize - 1)),
    maxGridWidth / (baseHeight * gridSize + padding * (gridSize - 1))
  );

  const itemWidth = baseWidth * scaleFactor;
  const itemHeight = baseHeight * scaleFactor;

  const startX = centerX - (itemWidth * gridSize + padding * (gridSize - 1)) / 2;
  const startY = centerY - (itemHeight * gridSize + padding * (gridSize - 1)) / 2;

  const mediaItems: MediaItem[] = [];

  processedItems.forEach(({ item }, i) => {
    const row = Math.floor(i / gridSize);
    const col = i % gridSize;

    const x = startX + col * (itemWidth + padding);
    const y = startY + row * (itemHeight + padding);

    item.position.x = x;
    item.position.y = y;
    item.info.dimensions.width = itemWidth;
    item.info.dimensions.height = itemHeight;

    mediaItems.push(item);
  });

  return mediaItems;
}

async function processMediaItem(
  url: string, 
  fileType: string, 
  x: number, 
  y: number, 
  zoom: number,
  isPdfPage?: boolean
): Promise<MediaItem> {
  if (fileType.startsWith('image/')) {
    return processImage(url, x, y, zoom, isPdfPage);
  } else if (fileType.startsWith('video/')) {
    return processVideo(url, x, y, zoom);
  } else {
    throw new Error(`Unsupported file type: ${fileType}`);
  }
}

async function processImage(
  url: string, 
  x: number, 
  y: number, 
  zoom: number,
  isPdfPage?: boolean
): Promise<MediaItem> {
  return new Promise<MediaItem>(resolve => {
    const img = new Image();
    img.onload = () => {
      const maxWidth = window.innerWidth * 0.8;
      const maxHeight = window.innerHeight * 0.8;
      const scaleFactor = Math.min(1, maxWidth / img.width, maxHeight / img.height);
      const width = img.width * scaleFactor;
      const height = img.height * scaleFactor;

      resolve({
        layerType: LayerType.Image,
        position: { x, y },
        info: { url, dimensions: { width, height }, type: 'image' },
        zoom,
        isPdfPage // Add the flag to indicate if this is a PDF page
      });
    };
    img.src = url;
  });
}

async function processVideo(url: string, x: number, y: number, zoom: number): Promise<MediaItem> {
  const video = document.createElement('video');
  const info = await new Promise<MediaInfo>(resolve => {
    video.onloadedmetadata = () => resolve({ url, dimensions: { width: video.videoWidth, height: video.videoHeight }, type: 'video' });
    video.src = url;
  });

  return { layerType: LayerType.Video, position: { x, y }, info, zoom };
}

type PDFPage = { file: File, pageNum: number, totalPages: number };
type MediaInfo = { url: string, dimensions: { width: number, height: number }, type: string };
type MediaItem = { 
    layerType: LayerType.Image | LayerType.Video | LayerType.Link, 
    position: Point, 
    info: MediaInfo, 
    zoom: number,
    isPdfPage?: boolean 
};
