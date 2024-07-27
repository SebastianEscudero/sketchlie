"use client";

import { toast } from "sonner";
import { Link2, LockKeyhole, LockKeyholeOpen, Pencil, Trash2 } from "lucide-react";
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
  isPrivate
}: ActionsProps) => {
  const { mutate, pending } = useApiMutation(api.board.remove);
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
  const [isPrivateModalOpen, setIsPrivateModalOpen] = useState(false);

  const onCopyLink = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}/board/${id}`,
    )
      .then(() => toast.success("Link copied"))
      .catch(() => toast.error("Failed to copy link"))
  };

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
          className="w-60"
        >
          <DropdownMenuItem
            onClick={onCopyLink}
            className="p-3 cursor-pointer"
          >
            <Link2 className="h-4 w-4 mr-2" />
            Copy board link
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={User !== undefined ? User.information.role !== "Admin" : usersRole !== "Admin"}
            onClick={() => setIsPrivateModalOpen(true)}
            className="p-3 cursor-pointer"
          >
            {isPrivate ? <LockKeyholeOpen className="h-4 w-4 mr-2" /> : <LockKeyhole className="h-4 w-4 mr-2" />}
            {isPrivate ? "Make Public" : "Make Private"}
            {(User?.information.role !== "Admin" && usersRole !== "Admin") &&
              <span className="text-sm ml-2">(Admin)</span>
            }
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={User !== undefined ? User.information.role !== "Admin" : usersRole !== "Admin"}
            onClick={() => setIsRenameModalOpen(true)}
            className="p-3 cursor-pointer"
          >
            <Pencil className="h-4 w-4 mr-2" />
            {usersRole === "Admin" ? "Rename" : "Rename (Admin)"}
          </DropdownMenuItem>
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
              {usersRole === "Admin" ? "Delete" : "Delete (Admin)"}
            </Button>
          </ConfirmModal>
          {canvasActions &&
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
              <ExportDropdownMenu id={id} title={title} />
              <BackgroundMenu setBackground={setBackground} Background={Background} setForcedRender={setForcedRender} />
              <HelpDropdownMenu setCanvasState={setCanvasState} />
            </>
          }
        </DropdownMenuContent >
      )}
    </DropdownMenu>
  );
};