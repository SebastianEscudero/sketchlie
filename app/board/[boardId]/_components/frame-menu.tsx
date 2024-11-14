import { LayerType, ToolbarMenu } from "@/types/canvas";
import { AnimatedToolbarMenu } from "./toolbar";
import { getCenterOfScreen } from "@/lib/utils";

interface FrameMenuProps {
  isFrameMenuOpen: boolean;
  camera: { x: number; y: number };
  zoom: number;
  insertLayer: (layerType: LayerType, position: any, width: number, height: number) => void;
  setToolbarMenu: (menu: ToolbarMenu) => void;
}

const FRAME_TYPES = [
  { label: "16:9", ratio: 16/9 },
  { label: "4:3", ratio: 4/3 },
  { label: "1:1", ratio: 1 },
];

export const FrameMenu = ({
  isFrameMenuOpen,
  camera,
  zoom,
  insertLayer,
  setToolbarMenu
}: FrameMenuProps) => {
  const handleFrameSelect = (ratio: number) => {
    const baseHeight = window.innerHeight * 0.6;
    const height = baseHeight / zoom;
    const width = height * ratio;

    const centerPoint = getCenterOfScreen(camera, zoom);
    insertLayer(
      LayerType.Frame,
      { x: centerPoint.x - width/2, y: centerPoint.y - height/2 },
      width,
      height
    );
  };

  return (
    <AnimatedToolbarMenu
      isOpen={isFrameMenuOpen}
      className="bottom-16 left-[45%]"
    >
      <div className="flex flex-row space-x-2">
        {FRAME_TYPES.map((frameType) => (
          <button
            key={frameType.label}
            className="p-2 hover:bg-neutral-100 dark:hover:bg-zinc-700 rounded-lg transition-colors flex flex-col justify-between items-center space-y-2"
            onClick={() => {
              handleFrameSelect(frameType.ratio);
              setToolbarMenu(ToolbarMenu.None);
            }}
          >
            <div className="flex items-center justify-center h-[70%]">
                <div 
                    className="border-2 border-zinc-800 dark:border-zinc-100" 
                    style={{
                        width: frameType.ratio === 1 ? '24px' : '32px',
                    height: frameType.ratio === 1 ? '24px' : `${32 / frameType.ratio}px`,
                }}
                />
            </div>
            <span className="text-xs">{frameType.label}</span>
          </button>
        ))}
      </div>
    </AnimatedToolbarMenu>
  );
};
