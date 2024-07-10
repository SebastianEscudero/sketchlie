"use client"

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Hint } from "@/components/hint";
import { useRenameModal } from "@/store/use-rename-modal";
import { LayoutTemplate, Menu, Sparkles, Zap } from "lucide-react";
import { Actions } from "@/components/actions";
import { useProModal } from "@/hooks/use-pro-modal";
import { useCurrentUser } from "@/hooks/use-current-user";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ShowAllTemplates } from "@/app/dashboard/_components/show-all-templates";
import { CanvasMode, Layer, LayerType } from "@/types/canvas";
import { InsertLayerCommand } from "@/lib/commands";

interface InfoProps {
    board: any;
    org: any;
    setBackground: (background: string) => void;
    Background: string;
    performAction: any;
    setLiveLayers: any;
    setLiveLayerIds: any;
    socket: any;
    nanoid: any;
    camera: any;
    zoom: any;
    setCanvasState: any;
    selectedLayersRef: any;
    setIsShowingAIInput: any;
    isShowingAIInput: any;
}

const TabSeparator = () => {
    return(
        <div className="text-neutral-300 px-1">
            |
        </div>
    )
}


export const Info = ({
    board,
    org,
    setBackground,
    Background,
    performAction,
    setLiveLayers,
    setLiveLayerIds,
    socket,
    nanoid,
    camera,
    zoom,
    setCanvasState,
    selectedLayersRef,
    setIsShowingAIInput,
    isShowingAIInput,
}: InfoProps) => {

    const { onOpen } = useRenameModal();
    const proModal = useProModal();
    const orgId = board.orgId;
    const user = useCurrentUser();
    const usersRole = org.users.find((u: any) => u.id === user?.id)?.role;


    const onChooseTemplate = async (templateName: string, templateLayerIds: any, templateLayers: any) => {
        try {
          const idMap = new Map();
          const newTemplateLayerIds = templateLayerIds.map((id: any) => {
            const newId = nanoid();
            idMap.set(id, newId);
            return newId;
          });
          const viewportCenterX = window.innerWidth / 2;
          const viewportCenterY = window.innerHeight / 2;
      
          // Calculate the center of the template
          let templateMinX = Infinity, templateMaxX = -Infinity, templateMinY = Infinity, templateMaxY = -Infinity;
          templateLayerIds.forEach((id: any) => {
            const layer = templateLayers[id];
            templateMinX = Math.min(templateMinX, layer.x);
            templateMaxX = Math.max(templateMaxX, layer.x);
            templateMinY = Math.min(templateMinY, layer.y);
            templateMaxY = Math.max(templateMaxY, layer.y);
          });
          const templateCenterX = (templateMinX + templateMaxX) / 2;
          const templateCenterY = (templateMinY + templateMaxY) / 2;
      
          // Calculate the adjustments needed to center the template
          let adjustX = ((viewportCenterX - camera.x) / zoom) - templateCenterX;
          let adjustY = ((viewportCenterY - camera.y) / zoom) - templateCenterY;
      
          const orderedLayers = templateLayerIds.map((id: any) => {
            const newLayer = {
              ...templateLayers[id],
              x: templateLayers[id].x + adjustX,
              y: templateLayers[id].y + adjustY,
            };
      
            if (newLayer.center) {
              newLayer.center = {
                x: newLayer.center.x + adjustX,
                y: newLayer.center.y + adjustY,
              };
            }
      
            return newLayer;
          });
      
          // Update connected layer IDs using idMap
          orderedLayers.forEach((layer: Layer) => {
            if (layer.type === LayerType.Arrow) {
              if (layer.startConnectedLayerId && idMap.has(layer.startConnectedLayerId)) {
                layer.startConnectedLayerId = idMap.get(layer.startConnectedLayerId);
              } else {
                layer.startConnectedLayerId = "";
              }
              if (layer.endConnectedLayerId && idMap.has(layer.endConnectedLayerId)) {
                layer.endConnectedLayerId = idMap.get(layer.endConnectedLayerId);
              } else {
                layer.endConnectedLayerId = "";
              }
            } else if (layer.type === LayerType.Rectangle && layer.connectedArrows) {
              layer.connectedArrows = layer.connectedArrows.map((arrowId: string) => idMap.get(arrowId) || arrowId);
            }
          });
      
          const command = new InsertLayerCommand(newTemplateLayerIds, orderedLayers, setLiveLayers, setLiveLayerIds, board._id, socket, org, proModal);
          performAction(command);
      
          selectedLayersRef.current = newTemplateLayerIds;
      
          toast.success(`${templateName} inserted successfully!`);
        } catch (error) {
          toast.error("Unable to insert template. Please try again.");
        }
      }

    if (!board) return <InfoSkeleton />;

    return(
        <div className="absolute bg-white rounded-br-lg px-1 h-12 flex items-center shadow-custom-1">
            <Hint label="Go to Dashboard" side="bottom" sideOffset={10}>
                <Button asChild variant="board" className="px-2">
                    <Link href="/dashboard/">
                        <Image 
                        src="/logo.svg"
                        alt="Board logo"
                        height={40}
                        width={40}
                        />
                        <span className="font-semibold text-xl ml-2 text-black sm:flex hidden">
                            Sketchlie
                        </span>
                    </Link>
                </Button>
            </Hint>
            <div className="text-neutral-300 px-1 sm:flex hidden">
                |
            </div>
                <Hint label="Edit title" side="bottom" sideOffset={10}>
                    <Button disabled={usersRole !== 'Admin'} variant="board" className="text-base px-2 sm:max-w-[100px] md:max-w-[400px] max-w-[80px] overflow-hidden relative sm:flex hidden" onClick={() => onOpen(board._id, board.title)}>
                        <div className="w-full text-left truncate">
                            {board.title}
                        </div>
                    </Button>
                </Hint>
            <TabSeparator />
            <Actions 
                id={board._id} 
                title={board.title} 
                side="bottom" 
                sideOffset={10} 
                org={org} 
                showExport={true}
                showGrid={true}
                showImport={true}
                setBackground={setBackground}
                Background={Background}
                setLiveLayers={setLiveLayers}
                setLiveLayerIds={setLiveLayerIds}
                performAction={performAction}
                socket={socket}
                selectedLayersRef={selectedLayersRef}
            >
                <div className="w-10 flex justify-center items-center">
                    <Hint label="Main menu" side="bottom" sideOffset={10}>
                        <Button size="icon" variant="board">
                            <Menu />
                        </Button>
                    </Hint>
                </div>
            </Actions>
            <TabSeparator />
            <Dialog>
                <Hint label="Templates" side="bottom" sideOffset={10}>
                    <DialogTrigger className="justify-center items-center xs:flex hidden" onClick={() => setCanvasState({ mode: CanvasMode.None })}>
                        <Button asChild className="h-8 w-8 xs:h-10 xs:w-10 p-2" variant="board">
                            <LayoutTemplate className="h-5 w-5" />
                        </Button>
                    </DialogTrigger>
                </Hint>
                <DialogContent className="w-full max-w-[80%] max-h-[85%] xl:max-w-[50%] overflow-y-auto">
                    <ShowAllTemplates
                        usersRole={usersRole}
                        onClick={onChooseTemplate}
                    />
                </DialogContent>
            </Dialog>
            <div className="text-neutral-300 px-1 xs:flex hidden">
                |
            </div>
            <Hint label="Upgrade" side="bottom" sideOffset={10}>
                <Button variant="board"
                    size="icon"
                    onClick={() => proModal.onOpen(orgId)}
                >
                    <Zap className="h-5 w-5 fill-custom-blue text-custom-blue"/>
                </Button>
            </Hint>
            {/* <div className="text-neutral-300 px-1 md:flex hidden">
                |
            </div>
            <Hint label="Sketchlie AI" side="bottom" sideOffset={10}>
                <Button variant="board"
                    size="icon"
                    onClick={() => setIsShowingAIInput(!isShowingAIInput)}
                    className="md:flex hidden"
                >
                    <Sparkles className="h-5 w-5 fill-custom-blue text-custom-blue"/>
                </Button>
            </Hint> */}
        </div>
    )
}

export const InfoSkeleton = () => {
    return(
        <div className="absolute bg-white rounded-lg px-1 h-12 flex items-center shadow-custom-3 w-[300px]"/>
    );
};