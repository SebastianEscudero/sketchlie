"use client";

import { toast } from "sonner";
import { Pencil, Trash2 } from "lucide-react";
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
import { useCurrentUser } from "@/hooks/use-current-user";
import { useState } from "react";
import { User } from "@/types/canvas";
import { RenameFolderDialog } from "./modals/folder-rename-modal";


interface FolderActionsProps {
  children: React.ReactNode;
  id: string;
  title: string;
  org: any;
  side?: DropdownMenuContentProps["side"];
  sideOffset?: DropdownMenuContentProps["sideOffset"];
  User?: User;
};

export const FolderActions = ({
  children,
  side,
  sideOffset,
  id,
  title,
  org,
  User,
}: FolderActionsProps) => {
  const { mutate, pending } = useApiMutation(api.folders.deleteFolder);
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);

  const user = useCurrentUser();
  const usersRole = org.users.find((u: any) => u.id === user?.id)?.role;
  
  if (!user) {
    return null;
  }

  const onDelete = () => {
    mutate({ folderId: id, userId: user.id })
      .then(() => toast.success("Folder deleted"))
      .catch((error) => {
        console.error(error);
        toast.error("Failed to delete folder");
      });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {children}
      </DropdownMenuTrigger>
      {isRenameModalOpen ? (
        <RenameFolderDialog
          isOpen={isRenameModalOpen}
          onClose={() => setIsRenameModalOpen(false)}
          id={id}
          folderTitle={title}
        />
      ) : (
        <DropdownMenuContent
          onClick={(e) => e.stopPropagation()}
          side={side}
          sideOffset={sideOffset}
          className="w-60"
        >
          <DropdownMenuItem
            disabled={User !== undefined ? User.information.role !== "Admin" : usersRole !== "Admin"}
            onClick={() => setIsRenameModalOpen(true)}
            className="p-3 cursor-pointer"
          >
            <Pencil className="h-4 w-4 mr-2" />
            {usersRole === "Admin" ? "Rename" : "Rename (Admin)"}
          </DropdownMenuItem>
          <ConfirmModal
            header="Delte folder?"
            description="This will the folder and all the boards inside."
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
        </DropdownMenuContent >
      )}
    </DropdownMenu>
  );
};