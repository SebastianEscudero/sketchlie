"use client";

import { toast } from "sonner";
import { ArrowUpFromLine, Check, ChevronRight, Eye, Link2, Pencil, Trash2 } from "lucide-react";
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
import { useRenameModal } from "@/store/use-rename-modal";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/hooks/use-current-user";
import { ExportDropdownMenu } from "./ExportDropdownMenu";
import { ImportDropdownMenu } from "./ImportDropdownmenu";


interface ActionsProps {
  children: React.ReactNode;
  side?: DropdownMenuContentProps["side"];
  sideOffset?: DropdownMenuContentProps["sideOffset"];
  id: string;
  title: string;
  showGrid?: boolean;
  showExport?: boolean;
  showImport?: boolean;
  org: any;
  setIsBackgroundGridVisible?: (isVisible: boolean) => void;
  isBackgroundGridVisible?: boolean;
  insertLayerCommand: any;
  performAction: any;
  setLiveLayers: any;
  setLiveLayerIds: any;
  liveLayers: any;
  liveLayerIds: any;
  socket: any;
};

export const Actions = ({
  children,
  side,
  sideOffset,
  id,
  title,
  showGrid = false,
  showExport = false,
  showImport = false,
  org,
  setIsBackgroundGridVisible,
  isBackgroundGridVisible,
  insertLayerCommand,
  performAction,
  setLiveLayers,
  setLiveLayerIds,
  liveLayers,
  liveLayerIds,
  socket
}: ActionsProps) => {
  const { onOpen } = useRenameModal();
  const { mutate, pending } = useApiMutation(api.board.remove);

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
        return response.json(); // Assuming the server responds with JSON
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
          disabled={usersRole !== "Admin"}
          onClick={() => onOpen(id, title)}
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
            disabled={usersRole !== "Admin"}
            className="p-3 cursor-pointer w-full justify-start font-normal text-red-500 hover:text-red-700 bg-white hover:bg-accent"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            {usersRole === "Admin" ? "Delete" : "Delete (Admin)"}
          </Button>
        </ConfirmModal>
        {showImport && 
          <ImportDropdownMenu 
            id={id} 
            usersRole={usersRole}
            setLiveLayers={setLiveLayers}
            setLiveLayerIds={setLiveLayerIds}
            liveLayers={liveLayers}
            liveLayerIds={liveLayerIds}
            insertLayerCommand={insertLayerCommand}
            performAction={performAction} 
            socket={socket}
          />
        }
        {showExport && <ExportDropdownMenu id={id} title={title} />}
        {showGrid && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="h-[44px]">
              <DropdownMenuItem className="p-3 cursor-pointer flex justify-between">
                <div className="flex flex-row items-center">
                  <Eye className="h-4 w-4 mr-2" />
                  View
                </div>
                <ChevronRight className="h-4 w-4 ml-auto" />
              </DropdownMenuItem>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="right" sideOffset={10}>
              <Button
                variant="ghost"
                className="p-3 cursor-pointer text-sm w-full justify-start"
                onClick={() => {
                  setIsBackgroundGridVisible && setIsBackgroundGridVisible(!isBackgroundGridVisible)
                  localStorage.setItem("isBackgroundGridVisible", JSON.stringify(!isBackgroundGridVisible))
                }}
              >
                {isBackgroundGridVisible && (
                  <Check className="h-4 w-4 mr-2" />
                )}
                Show Grid
              </Button>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};