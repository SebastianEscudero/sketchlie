export const minZoom = 0.2;
export const maxZoom = 10;

export const getRestrictedZoom = (proposedZoom: number): number => {
  return Math.min(Math.max(proposedZoom, minZoom), maxZoom);
};

interface MoveCameraToLayerProps {
  targetX: number;
  targetY: number;
  targetWidth: number;
  targetHeight: number;
  setCamera: (camera: { x: number; y: number }) => void;
  setZoom: (zoom: number) => void;
  cameraRef?: React.RefObject<{ x: number; y: number }>;
  zoomRef?: React.RefObject<number>;
  padding?: number;
  duration?: number;
  toolbarHeight?: number;
}

export const MoveCameraToLayer = ({
  targetX,
  targetY,
  targetWidth,
  targetHeight,
  setCamera,
  setZoom,
  cameraRef,
  zoomRef,
  padding = 0.9,
  duration = 500,
  toolbarHeight = 0,
}: MoveCameraToLayerProps): Promise<void> => {
  return new Promise((resolve) => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight - toolbarHeight;

    const zoomX = (viewportWidth) / targetWidth * padding;
    const zoomY = (viewportHeight) / targetHeight * padding;
    let targetZoom = Math.min(zoomX, zoomY);

    targetZoom = Math.max(minZoom, Math.min(maxZoom, targetZoom));

    const targetCameraX = viewportWidth / 2 - (targetX + targetWidth / 2) * targetZoom;
    const targetCameraY = viewportHeight / 2 - (targetY + targetHeight / 2) * targetZoom - toolbarHeight / 2;

    const startCamera = cameraRef?.current || { x: 0, y: 0 };
    const startZoom = zoomRef?.current || 1;

    const startTime = Date.now();

    const animate = () => {
      const elapsedTime = Date.now() - startTime;
      const progress = Math.min(elapsedTime / duration, 1);

      const easeProgress = 1 - Math.pow(1 - progress, 3);

      const currentZoom = startZoom + (targetZoom - startZoom) * easeProgress;
      const currentCamera = {
        x: startCamera.x + (targetCameraX - startCamera.x) * easeProgress,
        y: startCamera.y + (targetCameraY - startCamera.y) * easeProgress
      };

      setCamera(currentCamera);
      setZoom(currentZoom);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        resolve(); // Resolve the promise when animation is complete
      }
    };

    requestAnimationFrame(animate);
  });
};