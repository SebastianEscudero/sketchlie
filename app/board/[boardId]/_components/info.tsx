"use client"

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Hint } from "@/components/hint";
import { ChevronDown, ChevronsLeft, LayoutTemplate, Rocket } from "lucide-react";
import { Actions } from "@/components/actions";
import { useProModal } from "@/hooks/use-pro-modal";
import { toast } from "sonner";
import { ShowAllTemplates } from "@/app/dashboard/_components/show-all-templates";
import { Layer, LayerType, User } from "@/types/canvas";
import { InsertLayerCommand } from "@/lib/commands";
import { memo } from "react";
import { RenameBoardInput } from "@/components/modals/rename-modal";
import { ExportDropdownMenu } from "@/components/ExportDropdownMenu";
import { CanvasOverlayWrapper } from "./canvas-overlay-wrapper";

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
    setForcedRender(forcedRender: boolean): void;
    User: User;
    quickInserting: boolean;
    setQuickInserting: (quickInserting: boolean) => void;
    eraserDeleteAnyLayer: boolean;
    setEraserDeleteAnyLayer: (eraserDeleteAnyLayer: boolean) => void;
}

const TabSeparator = () => {
    return (
        <div className="text-neutral-300 px-1">
            |
        </div>
    )
}


export const Info = memo(({
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
    setForcedRender,
    User,
    quickInserting,
    setQuickInserting,
    eraserDeleteAnyLayer,
    setEraserDeleteAnyLayer
}: InfoProps) => {
    const proModal = useProModal();
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
                } else if (layer.type !== LayerType.Image && layer.type !== LayerType.Line && layer.type !== LayerType.Comment) {
                    if (layer.connectedArrows) {
                        layer.connectedArrows = layer.connectedArrows.map((arrowId: string) => idMap.get(arrowId) || arrowId);
                    }
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

    return (
        <CanvasOverlayWrapper className="absolute top-2 left-2 xs:flex hidden px-2">
            <Hint label="Go to Dashboard" side="bottom" sideOffset={10}>
                <Button asChild variant="icon" className="px-2" size="sm">
                    <Link href="/dashboard/">
                        <ChevronsLeft className="h-5 w-5" />
                    </Link>
                </Button>
            </Hint>
            <div className="text-neutral-300 px-1 sm:flex hidden">
                |
            </div>
            <RenameBoardInput
                boardTitle={board.title}
                id={board._id}
            />
            <Actions
                id={board._id}
                title={board.title}
                side="bottom"
                sideOffset={10}
                org={org}
                canvasActions={true}
                setBackground={setBackground}
                Background={Background}
                setLiveLayers={setLiveLayers}
                setLiveLayerIds={setLiveLayerIds}
                performAction={performAction}
                socket={socket}
                selectedLayersRef={selectedLayersRef}
                setCanvasState={setCanvasState}
                setForcedRender={setForcedRender}
                User={User}
                isPrivate={board.private}
                quickInserting={quickInserting}
                setQuickInserting={setQuickInserting}
                eraserDeleteAnyLayer={eraserDeleteAnyLayer}
                setEraserDeleteAnyLayer={setEraserDeleteAnyLayer}
            >
                <div className="flex justify-center items-center">
                    <Hint label="Options" side="bottom" sideOffset={10}>
                        <Button className="px-1 w-8 h-7" variant="icon">
                            <ChevronDown className="h-4 w-4 text-zinc-500 dark:text-zinc-200" />
                        </Button>
                    </Hint>
                </div>
            </Actions>
            <TabSeparator />
            <div className="flex items-center space-x-1">
                {User.information.role !== "Guest" && (
                    <>
                        {(() => {
                            if (org.subscription) {
                                const now = new Date().getTime();
                                const expiration = new Date(org.subscription.mercadoPagoCurrentPeriodEnd).getTime();
                                if (now > expiration) {
                                    return null; // Don't show the templates if the subscription is expired
                                }
                            }
                            return (
                                <ShowAllTemplates onClick={onChooseTemplate}>
                                    <div className="justify-center items-center hover:cursor-pointer sm:flex hidden">
                                        <Hint label="Templates" side="bottom" sideOffset={10}>
                                            <Button variant="icon" className="px-2" size="sm">
                                                <LayoutTemplate className="w-5 h-5"/>
                                            </Button>
                                        </Hint>
                                    </div>
                                </ShowAllTemplates>
                            );
                        })()}
                    </>
                )}
                <ExportDropdownMenu id={board._id} title={board.title} />
                <Hint label="Upgrade" side="bottom" sideOffset={10}>
                    <Button 
                        className="px-2"
                        variant="icon"
                        onClick={() => proModal.onOpen()}
                        size="sm"
                    >
                        <Rocket className="w-4 h-4 fill-blue-600 stroke-blue-600 flex-shrink-0" />
                    </Button>
                </Hint>
            </div>
        </CanvasOverlayWrapper>
    )
});

Info.displayName = "Info";