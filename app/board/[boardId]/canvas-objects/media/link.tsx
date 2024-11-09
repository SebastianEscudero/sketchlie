import { LinkLayer } from "@/types/canvas";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { LoaderCircleIcon } from "lucide-react";
import { SiGooglesheets, SiGoogledocs, SiGoogleslides } from "react-icons/si";
import { FaYoutube } from "react-icons/fa";

interface LinkProps {
  id: string;
  layer: LinkLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  showOverlay: boolean;
  selectionColor?: string;
}

export const InsertLink = ({
  id,
  layer,
  onPointerDown,
  showOverlay,
  selectionColor,
}: LinkProps) => {
  const { x, y, width, height, src } = layer;
  const [showEditButton, setShowEditButton] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const minWidth = 1200;
  const minHeight = 675;
  const scale = Math.min(width / minWidth, height / minHeight);
  const buttonWidth = width * 0.2;
  const buttonHeight = height * 0.1;
  const fontSize = height * 0.04;
  const iconSize = width * 0.02;
  const spacing = height * 0.01;
  const borderRadius = Math.min(Math.max(width * 0.01, 4), 12);
  const padding = fontSize * 0.5;

  useEffect(() => {
    if (!showOverlay) setIsEditing(false);
  }, [showOverlay]);

  const getEmbedConfig = (url: string) => {
    try {
      const urlObj = new URL(url);
      const hostname = urlObj.hostname;

      if (hostname.includes('docs.google.com')) {
        if (url.includes('/spreadsheets/')) {
          return {
            Icon: () => <SiGooglesheets 
              className="text-[#34A853]" 
              size={iconSize} 
            />,
            buttonText: 'Edit sheet',
            title: 'Google Sheet'
          };
        }
        if (url.includes('/document/')) {
          return {
            Icon: () => <SiGoogledocs 
              className="text-[#4285F4]" 
              size={iconSize} 
            />,
            buttonText: 'Edit doc',
            title: 'Google Doc'
          };
        }
        if (url.includes('/presentation/')) {
          return {
            Icon: () => <SiGoogleslides 
              className="text-[#FBBC05]" 
              size={iconSize} 
            />,
            buttonText: 'Edit slide',
            title: 'Google Slides'
          };
        }
      }

      if (hostname.includes('youtube.com') || hostname.includes('youtu.be')) {
        return {
          Icon: () => <FaYoutube 
            className="text-[#FF0000]" 
            size={iconSize} 
          />,
          buttonText: 'Watch video',
          title: 'YouTube'
        };
      }

      return { buttonText: 'Edit', Icon: null, title: 'Link' };
    } catch {
      return { buttonText: 'Edit', Icon: null, title: 'Link' };
    }
  };

  const { buttonText, Icon, title } = getEmbedConfig(src);

  const handleAction = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  return (
    <div
      className="absolute group"
      style={{
        left: x,
        top: y,
        width: width,
        height: height,
        outline: selectionColor ? `1px solid ${selectionColor}` : isEditing ? '1px solid #3390FF' : 'none'
      }}
      onPointerDown={(e) => !isEditing && onPointerDown(e, id)}
      onMouseEnter={() => !isEditing && showOverlay && setShowEditButton(true)}
      onMouseLeave={() => setShowEditButton(false)}
    >
      <div className="relative w-full h-full">
        <iframe
          className="h-full w-full drop-shadow-md"
          style={{
            pointerEvents: isEditing ? "auto" : "none",
            backfaceVisibility: "hidden",
            WebkitFontSmoothing: "antialiased",
            transform: `scale(${scale})`,
            transformOrigin: "0 0",
            width: `${minWidth}px`,
            height: `${minHeight}px`,
            opacity: isLoading ? 0 : 1,
          }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          title="Link"
          allowFullScreen
          src={src}
          onLoad={() => setIsLoading(false)}
          onBlur={() => setIsEditing(false)}
        />
        {/* Title */}
        <div 
          className="absolute flex items-center justify-center"
          style={{
            top: -padding*4.5,
            left: padding * 4.5,
            transform: `scale(${1.5})`,
          }}
        >
          {Icon && <Icon />}
          {title && <span style={{ marginLeft: spacing, fontSize: fontSize }}>{title}</span>}
        </div>

        {!isEditing && showOverlay && (
          <div
            className={cn(
              "absolute w-full h-full flex items-center justify-center top-0 left-0",
              "bg-black bg-opacity-0 hover:bg-opacity-20",
              "shape-hover-effect"
            )}
          >
            <button
              className={cn(
                "flex items-center justify-center bg-black transition-all shadow-md hover:shadow-xl",
                "font-medium text-white rounded-full",
                showEditButton ? "opacity-100" : "opacity-0",
              )}
              style={{
                width: buttonWidth,
                height: buttonHeight,
                borderRadius: borderRadius,
                fontSize: fontSize,
              }}
              onPointerDown={handleAction}
            >
              {Icon && <Icon />}
              {buttonText && (
                <span style={{ marginLeft: spacing }}>
                  {buttonText}
                </span>
              )}            
              </button>
          </div>
        )}

        {isLoading && (
          <div className="absolute w-full h-full top-0 left-0 flex items-center justify-center bg-zinc-200">
            <LoaderCircleIcon className="animate-spin text-blue-500" size={iconSize * 2} />
          </div>
        )}
      </div>
    </div>
  );
};