import { getMaxImageSize } from "@/lib/planLimits";
import { LayerType, Point } from "@/types/canvas";
import { toast } from "sonner";
import { pdfjs } from 'react-pdf';

// Initialize PDF.js once
export const initPdfjs = () => {
  if (!pdfjs.GlobalWorkerOptions.workerSrc) {
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
    const batchSize = 3; // Process files in smaller batches
    const allMediaItems: MediaItem[] = [];

    // Process files in batches
    for (let i = 0; i < files.length; i += batchSize) {
      const batch = files.slice(i, i + batchSize);
      const formData = new FormData();
      const pdfPages: PDFPage[] = [];

      await Promise.all(batch.map(file => processFile(file, maxFileSize, formData, pdfPages)));
      formData.append('userId', user.userId);

      const urls = await uploadFiles(formData);
      if (!urls) continue;

      const mediaItems = await processUploadedFiles(urls, pdfPages, batch, centerX, centerY, zoom);
      allMediaItems.push(...mediaItems);
    }

    if (allMediaItems.length > 0) {
      insertMedia(allMediaItems);
      toast.success(`${allMediaItems.length} items uploaded successfully`);
    }
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
  
  // Process PDF pages in smaller batches
  for (let i = 0; i < numPages; i += PDF_BATCH_SIZE) {
    const batchEnd = Math.min(i + PDF_BATCH_SIZE, numPages);
    const pagePromises = [];
    
    for (let pageNum = i + 1; pageNum <= batchEnd; pageNum++) {
      pagePromises.push(
        convertPDFPageToImage(pdf, pageNum, file.name)
          .then(imageFile => {
            // Optimize the image size before adding to formData
            return compressImage(imageFile);
          })
          .then(compressedFile => {
            formData.append('file', compressedFile);
            pdfPages.push({ 
              file: compressedFile, 
              pageNum: pageNum, 
              totalPages: numPages 
            });
          })
      );
    }
    
    await Promise.all(pagePromises);
    
    // If formData gets too large, trigger an upload
    if (getFormDataSize(formData) > 8 * 1024 * 1024) { // 8MB threshold
      const urls = await uploadFiles(formData);
      if (!urls) throw new Error('Failed to upload PDF pages');
      // Clear formData for next batch
      formData = new FormData();
    }
  }
}

// Helper function to compress images
async function compressImage(file: File): Promise<File> {
  if (!file.type.startsWith('image/')) return file;
  
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      
      // Calculate new dimensions (max 1500px width/height)
      const maxDim = 1500;
      let width = img.width;
      let height = img.height;
      
      if (width > maxDim || height > maxDim) {
        if (width > height) {
          height = (height / width) * maxDim;
          width = maxDim;
        } else {
          width = (width / height) * maxDim;
          height = maxDim;
        }
      }
      
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);
      
      canvas.toBlob(
        (blob) => {
          resolve(new File([blob!], file.name, { type: 'image/jpeg' }));
        },
        'image/jpeg',
        0.7 // Reduced quality for PDF pages
      );
    };
    img.src = URL.createObjectURL(file);
  });
}

// Helper function to estimate formData size
function getFormDataSize(formData: FormData): number {
  let size = 0;
  const entries = Array.from(formData.entries());
  for (const [_, value] of entries) {
    if (value instanceof File) {
      size += value.size;
    } else {
      size += new Blob([String(value)]).size;
    }
  }
  return size;
}

// Update the uploadFiles function to handle retries
async function uploadFiles(formData: FormData, retries = 3): Promise<string[] | null> {
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const res = await fetch('/api/aws-s3-images', { 
        method: 'POST', 
        body: formData,
        signal: AbortSignal.timeout(30000)
      });
      
      if (res.status === 413) {
        // If payload is too large, try with fewer files next time
        toast.error('Reducing batch size and retrying...');
        return null;
      }
      
      if (!res.ok) throw new Error('Network response was not ok');
      
      return await res.json();
    } catch (error) {
      console.error(`Upload attempt ${attempt + 1} failed:`, error);
      if (attempt === retries - 1) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          toast.error('Upload timed out. Try uploading fewer files or smaller files.');
        } else {
          toast.error('Failed to upload media');
        }
        return null;
      }
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
    }
  }
  return null;
}

async function convertPDFPageToImage(pdf: any, pageNum: number, fileName: string): Promise<File> {
  const page = await pdf.getPage(pageNum);
  const scale = 1.5; // Increase scale for better quality
  const viewport = page.getViewport({ scale });
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d')!;
  canvas.height = viewport.height;
  canvas.width = viewport.width;
  const quality = 0.95;

  await page.render({ canvasContext: context, viewport }).promise;

  return new Promise<File>(resolve =>
    canvas.toBlob(
      blob => resolve(new File([blob!], `${fileName}_page_${pageNum}.jpg`, { type: 'image/jpeg' })),
      'image/jpeg',
      quality // Use high quality (1) for JPEG compression
    )
  );
}

async function processUploadedFiles(
  urls: string[],
  pdfPages: PDFPage[],
  files: File[],
  centerX: number,
  centerY: number,
  zoom: number
): Promise<MediaItem[]> {
  const mediaItems: MediaItem[] = [];
  if (urls.length === 0) return mediaItems;

  // If there's only one image, scale it by 0.5
  if (urls.length === 1) {
    const file = pdfPages[0]?.file || files[0];
    const item = await processMediaItem(urls[0], file.type, 0, 0, zoom);
    item.info.dimensions.width *= 0.5;
    item.info.dimensions.height *= 0.5;
    
    // Adjust position so that the center of the image is at the mouse position
    item.position.x = centerX - item.info.dimensions.width / 2;
    item.position.y = centerY - item.info.dimensions.height / 2;
    
    return [item];
  }

  // Process all items first
  const processedItems = await Promise.all(urls.map(async (url, index) => {
    const file = pdfPages[index]?.file || files[index - pdfPages.length];
    const item = await processMediaItem(url, file.type, 0, 0, zoom);
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

async function processMediaItem(url: string, fileType: string, x: number, y: number, zoom: number): Promise<MediaItem> {
  if (fileType.startsWith('image/')) {
    return processImage(url, x, y, zoom);
  } else if (fileType.startsWith('video/')) {
    return processVideo(url, x, y, zoom);
  } else {
    throw new Error(`Unsupported file type: ${fileType}`);
  }
}

async function processImage(url: string, x: number, y: number, zoom: number): Promise<MediaItem> {
  const img = new Image();
  const info = await new Promise<MediaInfo>(resolve => {
    img.onload = () => resolve({ url, dimensions: { width: img.width, height: img.height }, type: 'image' });
    img.src = url;
  });

  return { layerType: LayerType.Image, position: { x, y }, info, zoom };
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
type MediaItem = { layerType: LayerType.Image | LayerType.Video | LayerType.Link, position: Point, info: MediaInfo, zoom: number };

// Constants for chunking
const PDF_BATCH_SIZE = 5; // Process 5 PDF pages at a time
const UPLOAD_CHUNK_SIZE = 3; // Upload 3 files at a time
