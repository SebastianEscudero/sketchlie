"use client";

import { toast } from "sonner";
import { ArrowLeftRight, Link2, LockKeyhole, LockKeyholeOpen, Pencil, Trash2 } from "lucide-react";
import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";

import { ConfirmModal } from "@/components/confirm-modal";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/hooks/use-current-user";
import { ExportDropdownMenu } from "./ExportDropdownMenu";
import { ImportDropdownMenu } from "./ImportDropdownmenu";
import { BackgroundMenu } from "./background-menu";
import { useState } from "react";
import { RenameBoardDialog } from "./modals/rename-modal";
import { Layers, User } from "@/types/canvas";
import { KeyboardShortcutsDialog } from "@/app/board/[boardId]/_components/keyboard-shortcuts-dialog";
import { HelpDropdownMenu } from "./help-dropdown-menu";
import { PrivateBoardDialog } from "./private-board-dialog";
import { PreferencesMenu } from "./preferences-menu";


interface ActionsProps {
  children: React.ReactNode;
  side?: DropdownMenuContentProps["side"];
  sideOffset?: DropdownMenuContentProps["sideOffset"];
  id: string;
  title: string;
  org: any;
  canvasActions?: boolean;
  setBackground?: (background: string) => void;
  Background?: string;
  performAction?: any;
  setLiveLayers?: any;
  setLiveLayerIds?: any;
  socket?: any;
  selectedLayersRef?: any;
  liveLayers?: Layers;
  setCanvasState?: (state: any) => void;
  setForcedRender?: (forcedRender: boolean) => void;
  User?: User;
  isPrivate: boolean;
  quickInserting?: boolean;
  setQuickInserting?: (quickInserting: boolean) => void;
  eraserDeleteAnyLayer?: boolean;
  setEraserDeleteAnyLayer?: (eraserDeleteAnyLayer: boolean) => void;
};

export const Actions = ({
  children,
  side,
  sideOffset,
  id,
  title,
  canvasActions = false,
  org,
  setBackground,
  Background,
  performAction,
  setLiveLayers,
  setLiveLayerIds,
  socket,
  selectedLayersRef,
  setCanvasState,
  setForcedRender,
  User,
  isPrivate,
  quickInserting,
  setQuickInserting,
  eraserDeleteAnyLayer,
  setEraserDeleteAnyLayer
}: ActionsProps) => {
  const { mutate, pending } = useApiMutation(api.board.remove);
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
  const [isPrivateModalOpen, setIsPrivateModalOpen] = useState(false);

  const router = useRouter();
  const user = useCurrentUser();
  const usersRole = org.users.find((u: any) => u.id === user?.id)?.role;
  if (!user) {
    return null;
  }

  const onDelete = () => {
    mutate({ id, userId: user.id })
      .then(() => {
        // After mutate, call the server endpoint to delete the object
        return fetch('/api/r2-bucket/deleteBoard', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ boardId: id }),
        });
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to delete board from server');
        }
        return response.json();
      })
      .then(() => toast.success("Board deleted"))
      .then(() => router.push("/dashboard/"))
      .catch((error) => {
        console.error(error);
        toast.error("Failed to delete board");
      });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {children}
      </DropdownMenuTrigger>
      {isRenameModalOpen ? (
        <RenameBoardDialog
          isOpen={isRenameModalOpen}
          onClose={() => setIsRenameModalOpen(false)}
          id={id}
          boardTitle={title}
        />
      ) : isPrivateModalOpen ? (
        <PrivateBoardDialog
          isOpen={isPrivateModalOpen}
          setIsOpen={setIsPrivateModalOpen}
          isPrivate={isPrivate}
          boardId={id}
        />
      ) : (
        <DropdownMenuContent
          onClick={(e) => e.stopPropagation()}
          side={side}
          sideOffset={sideOffset}
          className="w-52 p-2 shadow-sm"
        >
          <DropdownMenuItem
            disabled={User !== undefined ? User.information.role !== "Admin" : usersRole !== "Admin"}
            onClick={() => setIsPrivateModalOpen(true)}
            className="p-3 cursor-pointer flex justify-between"
          >
            <span className="flex items-center">
              {isPrivate ? <LockKeyhole className="h-4 w-4 mr-2" /> : <LockKeyholeOpen className="h-4 w-4 mr-2" />}
              {isPrivate ? "Private" : "Public"}
            </span>
            <ArrowLeftRight className="h-4 w-4" />
          </DropdownMenuItem>
          {canvasActions ? (
            <>
              <ImportDropdownMenu
                id={id}
                usersRole={usersRole}
                setLiveLayers={setLiveLayers}
                setLiveLayerIds={setLiveLayerIds}
                org={org}
                performAction={performAction}
                socket={socket}
                selectedLayersRef={selectedLayersRef}
                User={User}
              />
              <BackgroundMenu setBackground={setBackground} background={Background} setForcedRender={setForcedRender} />
              <PreferencesMenu
                setQuickInserting={setQuickInserting}
                quickInserting={quickInserting}
                eraserDeleteAnyLayer={eraserDeleteAnyLayer}
                setEraserDeleteAnyLayer={setEraserDeleteAnyLayer}
              />
              <HelpDropdownMenu setCanvasState={setCanvasState} />
            </>
          ) : (
            <DropdownMenuItem
              disabled={User !== undefined ? User.information.role !== "Admin" : usersRole !== "Admin"}
              onClick={() => setIsRenameModalOpen(true)}
              className="p-3 cursor-pointer"
            >
              <Pencil className="h-4 w-4 mr-2" />
              Rename
            </DropdownMenuItem>
          )}
          <div className="pt-1 border-t border-zinc-200 dark:border-zinc-800">
            <ConfirmModal
              header="Delete board?"
              description="This will delete the board and all of its contents."
              disabled={pending}
              onConfirm={onDelete}
            >
              <Button
                disabled={User !== undefined ? User.information.role !== "Admin" : usersRole !== "Admin"}
                className="p-3 cursor-pointer w-full justify-start font-semibold text-red-500 bg-white dark:bg-inherit hover:bg-accent dark:hover:bg-[#2C2C2C]"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </ConfirmModal>
          </div>
        </DropdownMenuContent >
      )}
    </DropdownMenu>
  );
};