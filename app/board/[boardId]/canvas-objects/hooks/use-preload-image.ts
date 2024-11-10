const imageCache = new Map<string, HTMLImageElement>();

export const useImagePreloader = () => {
  const preloadImage = (src: string): Promise<HTMLImageElement> => {
    if (imageCache.has(src)) {
      return Promise.resolve(imageCache.get(src)!);
    }

    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = src;
      
      img.onload = () => {
        imageCache.set(src, img);
        resolve(img);
      };
      
      img.onerror = () => {
        reject(new Error(`Failed to load image: ${src}`));
      };
    });
  };

  return { preloadImage, imageCache };
};